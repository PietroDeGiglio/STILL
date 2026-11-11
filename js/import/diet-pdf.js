// ---------------------------------------------------------------
// IMPORT DEL PIANO ALIMENTARE DA PDF
// Legge il testo del PDF sul dispositivo (pdf.js, caricato solo quando serve)
// e lo trasforma nelle settimane del menù di STILL. Capisce due formati:
//  - elenco: "LUNEDÌ" → "Colazione: …" → alimenti
//  - tabella: giorni in colonna, pasti in riga
// Il risultato va sempre ricontrollato dall'utente nel menù prima di salvare.
// ---------------------------------------------------------------
const PDFJS_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
let pdfJsLoading = null;
const loadPdfJs = () => {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (!pdfJsLoading) {
    pdfJsLoading = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = PDFJS_BASE + 'pdf.min.js';
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_BASE + 'pdf.worker.min.js';
        resolve(window.pdfjsLib);
      };
      script.onerror = () => { pdfJsLoading = null; reject(new Error('pdfjs')); };
      document.head.appendChild(script);
    });
  }
  return pdfJsLoading;
};

// Pezzi di testo di ogni pagina con la loro posizione (y dall'alto)
const readPdfPages = async (file) => {
  const lib = await loadPdfJs();
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await lib.getDocument({ data }).promise;
  const pages = [];
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const viewport = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();
    const items = content.items
      .filter(it => it.str && it.str.trim())
      .map(it => ({
        str: it.str.replace(/\s+/g, ' ').trim(),
        x: it.transform[4],
        y: viewport.height - it.transform[5],
        w: it.width || 0,
        h: Math.abs(it.transform[3]) || 10
      }));
    pages.push({ width: viewport.width, items });
  }
  return pages;
};

// --- Riconoscimento di giorni, pasti e settimane ---
const PDF_DAYS = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
const pdfNorm = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
const DAY_FULL = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
const DAY_SHORT = ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom'];

// Indice del giorno se il testo È (o inizia con) un giorno della settimana
const pdfDayAt = (text, allowShort) => {
  const t = pdfNorm(text).replace(/[^a-z0-9 ]/g, ' ').trim();
  for (let i = 0; i < 7; i++) {
    if (t === DAY_FULL[i] || t.startsWith(DAY_FULL[i] + ' ')) return i;
  }
  if (allowShort) for (let i = 0; i < 7; i++) if (t === DAY_SHORT[i] || t === DAY_SHORT[i] + '.') return i;
  const g = /^giorno\s*(\d{1,2})\b/.exec(t);
  if (g) return (parseInt(g[1], 10) - 1) % 7;
  return -1;
};
const pdfWeekAt = (text) => {
  const t = pdfNorm(text);
  const m = /settimana\s*(?:n\.?|numero)?\s*(\d{1,2})\b/.exec(t) || /\b(\d{1,2})\s*(?:a|°|ª|\^)?\s*settimana\b/.exec(t);
  return m ? parseInt(m[1], 10) - 1 : -1;
};
// Tipo di pasto se il testo inizia con il nome di un pasto; rest = quello che segue (es. dopo i due punti)
const pdfMealAt = (text) => {
  const t = pdfNorm(text);
  const rules = [
    [/^(prima )?colazione\b/, 'colazione'],
    [/^(spuntino|snack|merenda)\s*(di\s*)?(meta|a meta|della)?\s*mattin\w*\b/, 'spuntino_mattina'],
    [/^(spuntino|snack)\s*(del\s*|di\s*|nel\s*)?(pomerig|pomerid)\w*\b|^merenda\b/, 'spuntino_pomeriggio'],
    [/^(spuntino\s*)?(pre|post|dopo)[ -]?(workout|allenamento|wo|training)\b/, 'post_workout'],
    [/^(spuntino|snack|spuntini)\b/, 'spuntino'],
    [/^pranzo\b/, 'pranzo'],
    [/^cena\b/, 'cena']
  ];
  for (const [re, type] of rules) {
    const m = re.exec(t);
    if (m) {
      // Testo originale dopo il nome del pasto (senza "ore 8:00", due punti, trattini)
      const rest = String(text).slice(m[0].length).replace(/^[\s:–\-—)(.]*(ore\s*)?\d{1,2}[:.]\d{2}\)?/i, '').replace(/^[\s:–\-—]+/, '').trim();
      return { type, rest };
    }
  }
  return null;
};
// Righe da non considerare alimenti (intestazioni, note, numeri di pagina…)
const PDF_STOP = /^(note|nota|consigli|indicazioni|avvertenze|integrazione|integratori|osservazioni|raccomandazioni|regole generali|totale|tot\.?)\b/;
const PDF_SKIP = /^(pagina|pag\.?|dott|dr\.?|dottssa|dott\.ssa|biologo|nutrizionista|dietista|paziente|nome|cognome|data|piano alimentare|schema alimentare|dieta|programma alimentare)\b/;

// Un testo di alimenti → lista di alimenti (separati da virgole, +, punti elenco…)
const pdfSplitFoods = (text) => String(text || '')
  .replace(/(\d),(\d)/g, '$1§$2')
  .split(/[,;•●▪·]|\s\+\s|\s[–—-]\s|\n/)
  .map(s => s.replace(/§/g, ',').replace(/^[\s\-–—*o•·]+(?=\S)/, '').replace(/^\d+[.)]\s+/, '').trim())
  .filter(s => s.length > 1 && !/^(e|ed|o|oppure)$/i.test(s));

// Calorie scritte nel testo ("450 kcal"): le toglie e le restituisce
const pdfTakeKcal = (text) => {
  const m = /(\d{2,4})\s*(kcal|calorie|cal)\b/i.exec(text);
  if (!m) return { text, kcal: '' };
  return { text: (text.slice(0, m.index) + text.slice(m.index + m[0].length)).replace(/[()\[\]]\s*[()\[\]]/g, '').trim(), kcal: m[1] };
};

// Righe della pagina (pezzi alla stessa altezza), da sinistra a destra
const pdfLines = (items) => {
  const sorted = items.slice().sort((a, b) => a.y - b.y || a.x - b.x);
  const lines = [];
  sorted.forEach(it => {
    const line = lines.find(l => Math.abs(l.y - it.y) <= Math.max(2, it.h * 0.45));
    if (line) line.items.push(it); else lines.push({ y: it.y, items: [it] });
  });
  lines.forEach(l => {
    l.items.sort((a, b) => a.x - b.x);
    l.text = l.items.map(i => i.str).join(' ').replace(/\s+/g, ' ').trim();
  });
  return lines.sort((a, b) => a.y - b.y);
};

// --- Costruzione del risultato ---
const pdfNewWeek = () => { const days = {}; PDF_DAYS.forEach(d => { days[d] = []; }); return { days }; };

const parseDietPdf = (pages) => {
  const weeks = [];
  const ensureWeek = (w) => { while (weeks.length <= w) weeks.push(pdfNewWeek()); return weeks[w]; };
  const allDays = [];                // pasti senza giorno: valgono per tutta la settimana
  let tableMode = false;

  const addMeal = (week, dayIdx, type, foods, kcal) => {
    const list = dayIdx === null ? allDays : ensureWeek(week).days[PDF_DAYS[dayIdx]];
    // Spuntino senza indicazione: mattina se il pranzo non c'è ancora, altrimenti pomeriggio
    let t = type;
    if (t === 'spuntino') t = list.some(m => m.type === 'pranzo' || m.type === 'cena') ? 'spuntino_pomeriggio' : 'spuntino_mattina';
    const meal = { type: t, items: [], calories: kcal || '' };
    list.push(meal);
    foods.forEach(f => meal.items.push(f));
    return meal;
  };
  const addFoods = (meal, text) => {
    const k = pdfTakeKcal(text);
    if (k.kcal && !meal.calories) meal.calories = k.kcal;
    pdfSplitFoods(k.text).forEach(f => meal.items.push(f));
  };

  // 1) Formato TABELLA: una riga con almeno 3 giorni fa da intestazione delle colonne
  let week = 0;
  pages.forEach(page => {
    const lines = pdfLines(page.items);
    let cols = null, headerY = 0, rows = [], cells = [];
    const flush = () => {
      if (!cols || !rows.length) return;
      rows.sort((a, b) => a.y - b.y);
      rows.forEach((row, r) => {
        const top = row.y - 4, bottom = r + 1 < rows.length ? rows[r + 1].y - 4 : Infinity;
        cols.forEach(col => {
          const parts = cells.filter(c => c.col === col && c.y >= top && c.y < bottom).sort((a, b) => a.y - b.y || a.x - b.x);
          if (!parts.length) return;
          // Righe della cella: una per riga di testo; una riga che continua la precedente viene unita
          const cellLines = [];
          parts.forEach(p => {
            const last = cellLines[cellLines.length - 1];
            if (last && Math.abs(last.y - p.y) <= Math.max(2, p.h * 0.45)) { last.text += ' ' + p.str; return; }
            const continues = last && (/^[a-zà-ù(]/.test(p.str) && !/^(e|o)\s/.test(p.str) || /\b(di|con|e|al|alla|allo|ai|in)$/i.test(last.text) || /^\d+([.,]\d+)?\s*(g|gr|ml|kg)\b\.?$/i.test(p.str.trim()));
            if (continues) last.text += ' ' + p.str; else cellLines.push({ y: p.y, text: p.str });
          });
          const meal = addMeal(week, col.day, row.type, [], '');
          cellLines.forEach(l => addFoods(meal, l.text));
          if (!meal.items.length) ensureWeek(week).days[PDF_DAYS[col.day]].pop();
        });
      });
      rows = []; cells = [];
    };
    lines.forEach(line => {
      const w = pdfWeekAt(line.text);
      if (w >= 0 && line.text.length < 40) { flush(); week = w; ensureWeek(week); }
      const dayItems = line.items.map(it => ({ it, day: pdfDayAt(it.str, true) })).filter(d => d.day >= 0);
      if (new Set(dayItems.map(d => d.day)).size >= 3) {
        flush();
        tableMode = true;
        cols = dayItems.map(d => ({ day: d.day, x: d.it.x + d.it.w / 2 }));
        headerY = line.y;
        return;
      }
      if (!cols) return;
      const minX = Math.min(...cols.map(c => c.x));
      const colGap = cols.length > 1 ? (Math.max(...cols.map(c => c.x)) - minX) / (cols.length - 1) : 100;
      line.items.forEach(it => {
        const cx = it.x + it.w / 2;
        if (it.x + it.w < minX - colGap * 0.45) {
          const meal = pdfMealAt(it.str);
          if (meal) rows.push({ y: it.y, type: meal.type });
          return;
        }
        let best = cols[0], bestD = Infinity;
        cols.forEach(c => { const d = Math.abs(c.x - cx); if (d < bestD) { bestD = d; best = c; } });
        cells.push({ col: best, x: it.x, y: it.y, h: it.h, str: it.str });
      });
    });
    flush();
  });

  // 2) Formato ELENCO (se non c'erano tabelle)
  if (!tableMode) {
    let w = 0, day = null, meal = null, stopped = false;
    pages.forEach(page => {
      pdfLines(page.items).forEach(line => {
        const text = line.text;
        const n = pdfNorm(text);
        if (!n || /^\d+$/.test(n) || PDF_SKIP.test(n)) return;
        const wk = pdfWeekAt(text);
        if (wk >= 0 && text.length < 40) { w = wk; ensureWeek(w); meal = null; return; }
        const d = pdfDayAt(text, false);
        if (d >= 0 && text.length < 60) {
          day = d; meal = null; stopped = false;
          ensureWeek(w);
          const rest = text.replace(/^\S+\s*/, '').replace(/^[\s:–\-—]+/, '');
          const mm = rest ? pdfMealAt(rest) : null;
          if (mm) { meal = addMeal(w, day, mm.type, [], ''); if (mm.rest) addFoods(meal, mm.rest); }
          return;
        }
        const mm = pdfMealAt(text);
        if (mm) {
          stopped = false;
          meal = addMeal(w, day, mm.type, [], '');
          if (mm.rest) addFoods(meal, mm.rest);
          return;
        }
        if (PDF_STOP.test(n)) { stopped = true; meal = null; return; }
        if (meal && !stopped) addFoods(meal, text);
      });
    });
  }

  // Pasti senza giorno → uguali per tutti i giorni (dieta "fissa")
  if (allDays.length) {
    const w0 = ensureWeek(0);
    PDF_DAYS.forEach(d => { if (!w0.days[d].length) w0.days[d] = JSON.parse(JSON.stringify(allDays)); });
  }
  // Pulizia: alimenti doppi o vuoti, pasti vuoti
  weeks.forEach(wk => PDF_DAYS.forEach(d => {
    wk.days[d] = wk.days[d]
      .map(m => ({ ...m, items: m.items.map(i => i.trim()).filter(Boolean) }))
      .filter(m => m.items.length);
  }));
  const usedWeeks = weeks.filter(wk => PDF_DAYS.some(d => wk.days[d].length));
  const meals = usedWeeks.reduce((n, wk) => n + PDF_DAYS.reduce((s, d) => s + wk.days[d].length, 0), 0);
  const foods = usedWeeks.reduce((n, wk) => n + PDF_DAYS.reduce((s, d) => s + wk.days[d].reduce((a, m) => a + m.items.length, 0), 0), 0);
  const missing = [];
  usedWeeks.forEach((wk, i) => PDF_DAYS.forEach(d => { if (!wk.days[d].length) missing.push((usedWeeks.length > 1 ? 'Sett. ' + (i + 1) + ' ' : '') + d); }));
  return { weeks: usedWeeks, meals, foods, missing, format: tableMode ? 'tabella' : 'elenco' };
};

// Tutto insieme: file PDF → menù
const importDietPdf = async (file) => {
  const pages = await readPdfPages(file);
  const chars = pages.reduce((n, p) => n + p.items.reduce((s, i) => s + i.str.length, 0), 0);
  if (chars < 20) return { error: 'scan' };
  const result = parseDietPdf(pages);
  if (!result.meals) return { error: 'empty' };
  return result;
};
