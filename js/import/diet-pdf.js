// ---------------------------------------------------------------
// IMPORT DEL PIANO ALIMENTARE DA PDF O WORD (.docx)
// Legge il file sul dispositivo e lo trasforma nelle settimane del menù di STILL.
//
// Come funziona:
//  1) il file diventa un elenco di righe, ognuna divisa in "blocchi" (colonne) con la loro posizione
//     - PDF: testo di pdf.js (caricato solo quando serve), con le lettere legate ("ff", "fi") ricucite
//     - Word: tabelle e paragrafi del documento, disposti come su una pagina
//  2) le righe vengono lette in ordine, riconoscendo:
//     - giorni ("Lunedì", "giorno 3", anche con errori di battitura: "comenica")
//     - pasti ("Colazione:", "SPUNTINO MATTINA", "post allenamento", "colaizone"…)
//     - griglie: pasti in colonna (con i giorni come titolo o come righe) oppure giorni in colonna
//     - settimane ("Settimana 2", oppure un giorno che ricomincia dopo la domenica)
//     - sezioni da ignorare (note, guide, condimenti, elenchi di alimenti, intestazioni ripetute)
//  3) il testo di ogni pasto diventa una lista di alimenti (le parentesi restano unite,
//     le note lunghe spariscono, "uguale" copia il pasto del giorno prima, "a scelta tra" → "oppure")
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

// --- 1a) PDF → pagine di pezzi di testo { str, x, y, w, h } (y dall'alto) ---
const pdfPageItems = (content, viewport) => {
  const items = [];
  content.items.forEach(it => {
    if (!it.str) return;
    const x = it.transform[4];
    const y = viewport.height - it.transform[5];
    const h = Math.abs(it.transform[3]) || Math.abs(it.transform[0]) || 10;
    const w = it.width || 0;
    // Colonne separate solo da tanti spazi dentro lo stesso pezzo: si dividono
    const parts = it.str.split(/(\s{3,})/);
    if (parts.length === 1 || !w) { items.push({ str: it.str, x, y, w, h }); return; }
    const perChar = w / it.str.length;
    let off = 0;
    parts.forEach(p => {
      if (p.trim()) items.push({ str: p, x: x + off * perChar, y, w: p.length * perChar, h });
      off += p.length;
    });
  });
  return items;
};

const readPdfPages = async (file, lib) => {
  const pdfLib = lib || await loadPdfJs();
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfLib.getDocument({ data }).promise;
  const pages = [];
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const viewport = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();
    pages.push({ width: viewport.width, height: viewport.height, items: pdfPageItems(content, viewport) });
  }
  return pages;
};

// --- 1b) Word (.docx) → stessa forma: paragrafi uno sotto l'altro, tabelle a colonne ---
// Il .docx è uno zip: si estrae word/document.xml con il DecompressionStream del browser
const unzipEntry = async (buffer, wanted) => {
  const view = new DataView(buffer);
  let eocd = -1;
  for (let i = buffer.byteLength - 22; i >= Math.max(0, buffer.byteLength - 70000); i--) {
    if (view.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('zip');
  const count = view.getUint16(eocd + 10, true);
  let ptr = view.getUint32(eocd + 16, true);
  const decoder = new TextDecoder();
  for (let n = 0; n < count; n++) {
    if (view.getUint32(ptr, true) !== 0x02014b50) break;
    const method = view.getUint16(ptr + 10, true);
    const size = view.getUint32(ptr + 20, true);
    const nameLen = view.getUint16(ptr + 28, true);
    const extraLen = view.getUint16(ptr + 30, true);
    const commentLen = view.getUint16(ptr + 32, true);
    const local = view.getUint32(ptr + 42, true);
    const name = decoder.decode(new Uint8Array(buffer, ptr + 46, nameLen));
    ptr += 46 + nameLen + extraLen + commentLen;
    if (name !== wanted) continue;
    const start = local + 30 + view.getUint16(local + 26, true) + view.getUint16(local + 28, true);
    const raw = new Uint8Array(buffer, start, size);
    if (method === 0) return decoder.decode(raw);
    if (method !== 8 || typeof DecompressionStream === 'undefined') throw new Error('zip-method');
    const stream = new Blob([raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return await new Response(stream).text();
  }
  throw new Error('docx-missing');
};

const xmlText = (s) => s.replace(/&(lt|gt|amp|quot|apos|#x[0-9a-f]+|#\d+);/gi, (m, e) => {
  const k = e.toLowerCase();
  if (k === 'lt') return '<'; if (k === 'gt') return '>'; if (k === 'amp') return '&';
  if (k === 'quot') return '"'; if (k === 'apos') return "'";
  return String.fromCodePoint(k[1] === 'x' ? parseInt(k.slice(2), 16) : parseInt(k.slice(1), 10));
});

// Struttura del documento: [{ type: 'p', lines: [...] } | { type: 'table', rows: [[{ span, paras: [...] }]] }]
const docxBlocks = (xml) => {
  const body = (/<w:body[^>]*>([\s\S]*)<\/w:body>/.exec(xml) || [, xml])[1];
  const blocks = [];
  const tables = [];          // pila delle tabelle aperte (anche annidate)
  let row = null, cell = null, para = null, inText = false;
  const re = /<(\/?)(w:tbl|w:tr|w:tc|w:p|w:t|w:tab|w:br|w:cr|w:gridSpan)(?=[\s/>])([^>]*?)(\/?)>|([^<]+)/g;
  let m;
  while ((m = re.exec(body))) {
    const [, close, tag, attrs, selfClose, text] = m;
    if (text !== undefined) { if (inText && para) para[para.length - 1] += xmlText(text); continue; }
    if (tag === 'w:t') { inText = !close && !selfClose; continue; }
    if (tag === 'w:tab') { if (para && !close) para[para.length - 1] += '   '; continue; }
    if (tag === 'w:br' || tag === 'w:cr') { if (para && !close) para.push(''); continue; }
    if (tag === 'w:gridSpan') { const v = /w:val="(\d+)"/.exec(attrs); if (cell && v) cell.span = parseInt(v[1], 10); continue; }
    if (tag === 'w:tbl') {
      if (!close) { tables.push({ rows: [], outer: { row, cell } }); row = null; cell = null; }
      else {
        const t = tables.pop();
        if (!t) continue;
        ({ row, cell } = t.outer);
        if (cell) t.rows.forEach(r => r.forEach(c => cell.paras.push(...c.paras)));   // tabella dentro una cella: solo il testo
        else blocks.push({ type: 'table', rows: t.rows });
      }
      continue;
    }
    if (tag === 'w:tr') { if (!close && tables.length) { row = []; tables[tables.length - 1].rows.push(row); } else if (close) row = null; continue; }
    if (tag === 'w:tc') { if (!close && row) { cell = { span: 1, paras: [] }; row.push(cell); } else if (close) cell = null; continue; }
    if (tag === 'w:p') {
      if (!close && !selfClose) para = [''];
      else if (selfClose) { if (cell) cell.paras.push(''); }
      else if (para) {
        const lines = para.map(s => s.replace(/\s+$/, '')).filter((s, i, a) => s.trim() || a.length === 1);
        if (cell) cell.paras.push(...lines);
        else if (!tables.length) blocks.push({ type: 'p', lines });
        para = null;
      }
    }
  }
  return blocks;
};

// Disposizione "come su carta": 20 punti per riga, colonne larghe 120 (testo centrato nella colonna)
const docxToPages = (blocks) => {
  const H = 10, LINE = 20, COL = 120, CHAR = 4.5;
  const items = [];
  let y = 40;
  blocks.forEach(b => {
    if (b.type === 'p') {
      b.lines.forEach(line => {
        if (line.trim()) items.push({ str: line, x: 40, y, w: Math.min(line.length * CHAR, 900), h: H });
        y += LINE;
      });
      return;
    }
    y += LINE / 2;
    b.rows.forEach(r => {
      let col = 0, tall = 1;
      r.forEach(c => {
        const left = 40 + col * COL;
        const width = c.span * COL - 30;
        const cellId = 'c' + items.length + '_' + col;
        let ly = y;
        c.paras.forEach(text => {
          if (text.trim()) {
            const w = Math.min(text.length * CHAR, width);
            items.push({ str: text, x: left + (width - w) / 2, y: ly, w, h: H, cell: cellId });
          }
          ly += LINE;
        });
        tall = Math.max(tall, c.paras.length);
        col += c.span;
      });
      y += tall * LINE + LINE / 2;
    });
    y += LINE / 2;
  });
  return [{ width: 1000, height: y + 40, items }];
};

const readDocxPages = async (file) => {
  const xml = await unzipEntry(await file.arrayBuffer(), 'word/document.xml');
  return docxToPages(docxBlocks(xml));
};

// --- 2) Righe e blocchi ---
// Pezzi alla stessa altezza → una riga; pezzi vicini → un blocco (ricuce "Ca"+"ff"+"è" → "Caffè")
const pdfLines = (items) => {
  const sorted = items.filter(i => i.str).sort((a, b) => a.y - b.y || a.x - b.x);
  const lines = [];
  sorted.forEach(it => {
    let line = null;
    for (let i = lines.length - 1; i >= 0 && i >= lines.length - 4; i--) {
      if (Math.abs(lines[i].y - it.y) <= Math.max(2, Math.min(lines[i].h, it.h) * 0.5)) { line = lines[i]; break; }
    }
    if (line) { line.items.push(it); line.h = Math.max(line.h, it.h); } else lines.push({ y: it.y, h: it.h, items: [it] });
  });
  lines.forEach(l => {
    l.items.sort((a, b) => a.x - b.x);
    const segs = [];
    let cur = null, space = false;
    l.items.forEach(it => {
      if (!it.str.trim()) { space = true; return; }
      const gap = cur ? it.x - cur.x2 : 0;
      const hh = Math.max(it.h, cur ? cur.h : 0);
      // Spazio tra colonne: più largo di quasi un'altezza di carattere (tra parole è circa un quarto)
      if (!cur || gap > Math.max(7, hh * 0.9) || cur.cell !== it.cell) {
        cur = { text: it.str, x: it.x, x2: it.x + it.w, h: it.h, cell: it.cell };
        segs.push(cur);
      } else {
        const glue = space || /\s$/.test(cur.text) || /^\s/.test(it.str) || gap > hh * 0.12 ? ' ' : '';
        cur.text += glue + it.str;
        cur.x2 = Math.max(cur.x2, it.x + it.w);
        cur.h = Math.max(cur.h, it.h);
      }
      space = false;
    });
    segs.forEach(s => { s.text = s.text.replace(/\s+/g, ' ').trim(); s.cx = (s.x + s.x2) / 2; });
    l.segs = segs.filter(s => s.text);
    l.text = l.segs.map(s => s.text).join(' ');
  });
  return lines.filter(l => l.segs.length).sort((a, b) => a.y - b.y);
};

// --- Riconoscimento di giorni, pasti e settimane ---
const PDF_DAYS = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
const pdfNorm = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’`]/g, "'").replace(/\s+/g, ' ').trim();
const DAY_FULL = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
const DAY_SHORT = ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom'];
const DAY_EN = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

// Distanza tra parole (con lettere scambiate: "colaizone" → "colazione" = 1)
const pdfEditDistance = (a, b) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
};
const pdfFuzzy = (word, list) => {
  if (!word || word.length < 5) return -1;
  const max = word.length >= 8 ? 2 : 1;
  let best = -1, bestD = max + 1;
  list.forEach((w, i) => { const dd = pdfEditDistance(word, w); if (dd < bestD) { bestD = dd; best = i; } });
  return best;
};
// Punti elenco e numerazioni all'inizio ("• ", "- ", "1) ")
const pdfStripBullet = (t) => String(t || '').replace(/^[\s•●▪◦·*\-–—>»✓✔☐□■○]+/, '').replace(/^\d{1,2}[.)]\s+(?=\D)/, '').trim();

// Giorno all'inizio del testo: { day, rest } oppure null
const pdfDayAt = (text, { short = false, fuzzy = false } = {}) => {
  const clean = pdfStripBullet(text);
  const t = pdfNorm(clean).replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim();
  const words = t.split(' ');
  const restAfter = (n) => clean.split(/\s+/).slice(n).join(' ').replace(/^[\s:,;.\-–—]+/, '');
  let i = DAY_FULL.indexOf(words[0]);
  if (i < 0) i = DAY_EN.indexOf(words[0]);
  if (i >= 0) return { day: i, rest: restAfter(1) };
  if (short && words.length === 1) { i = DAY_SHORT.indexOf(words[0]); if (i >= 0) return { day: i, rest: '' }; }
  const g = /^(?:giorno|day|g)\s*(\d{1,2})$/.exec(words.slice(0, 2).join(' ')) || /^(?:giorno|day)(\d{1,2})$/.exec(words[0]);
  if (g && parseInt(g[1], 10) >= 1) return { day: (parseInt(g[1], 10) - 1) % 7, rest: restAfter(/\d$/.test(words[0]) ? 1 : 2) };
  if (fuzzy && words.length <= 3) { i = pdfFuzzy(words[0], DAY_FULL); if (i >= 0) return { day: i, rest: restAfter(1) }; }
  return null;
};
const pdfWeekAt = (text) => {
  const t = pdfNorm(text);
  const m = /^(?:settimana|sett\.?|week)\s*(?:n\.?|n°|numero)?\s*(\d{1,2})\b/.exec(t) || /^(\d{1,2})\s*(?:a|°|ª|\^)?\s*settimana\b/.exec(t);
  return m ? parseInt(m[1], 10) - 1 : -1;
};

// Tipo di pasto se il testo inizia con il nome di un pasto; rest = quello che segue (alimenti)
const MEAL_RULES = [
  [/^(prima )?colazione\b|^breakfast\b/, 'colazione'],
  [/^(spuntino|snack|merenda|break)\s*(di |del |della |a |nel |nella |in )?(meta |a meta )?(mattin\w*|mattutino|mattino)\b/, 'spuntino_mattina'],
  [/^(spuntino|snack|break)\s*(di |del |della |a |nel |nella |in )?(meta |a meta )?(pomerig\w*|pomerid\w*)\b|^merenda\b/, 'spuntino_pomeriggio'],
  [/^(integrazione |spuntino |snack |pasto )?(pre|post|dopo|prima)[ -]?(il |l'|dell')?(workout|allenamento|wo|training|gara|palestra|partita)\b/, 'post_workout'],
  [/^(spuntino|snack|spuntini)\b/, 'spuntino'],
  [/^(pranzo|lunch)\b/, 'pranzo'],
  [/^(cena|dinner)\b/, 'cena']
];
const MEAL_WORDS = ['colazione', 'spuntino', 'pranzo', 'merenda', 'spuntini'];
// Come pdfNorm, ma ricorda per ogni lettera la posizione nel testo originale
const pdfNormMap = (s) => {
  let t = '';
  const map = [];
  for (let i = 0; i < s.length; i++) {
    let c = s[i].toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    if (/[’`]/.test(c)) c = "'";
    if (/\s/.test(c)) { if (!t.length || t.endsWith(' ')) continue; c = ' '; }
    for (const ch of c) { t += ch; map.push(i); }
  }
  if (t.endsWith(' ')) { t = t.slice(0, -1); map.pop(); }
  map.push(s.length);
  return { t, map };
};
const pdfMealAt = (text, { fuzzy = true } = {}) => {
  const clean = pdfStripBullet(text);
  const { t: base, map } = pdfNormMap(clean);
  let t = base, shift = 0;
  let rule = MEAL_RULES.find(([re]) => re.test(t));
  if (!rule && fuzzy) {
    // Errori di battitura nel nome del pasto ("colaizone", "spuntno"): solo come prima parola
    const first = /^([a-z]+)([\s:,.;]|$)/.exec(t);
    const i = first ? pdfFuzzy(first[1], MEAL_WORDS) : -1;
    if (i >= 0 && (first[2] !== ' ' || clean.length < 50)) {
      t = MEAL_WORDS[i] + t.slice(first[1].length);
      shift = MEAL_WORDS[i].length - first[1].length;
      rule = MEAL_RULES.find(([re]) => re.test(t));
    }
  }
  if (!rule) return null;
  const end = Math.max(0, rule[0].exec(t)[0].length - shift);
  let rest = clean.slice(map[Math.min(end, map.length - 1)]);
  rest = rest
    .replace(/^[\s:,;.\-–—]+/, '')
    .replace(/^\(?\s*(ore|h)?\s*\d{1,2}[:.,]\d{2}\s*\)?/i, '')
    .replace(/^\(?\s*(ore|h)\s*\d{1,2}\s*\)?/i, '')
    .replace(/^[\s:,;.\-–—]+/, '')
    .trim();
  return { type: rule[1], rest };
};
// Solo il nome del pasto (al massimo orario o calorie): titolo di colonna o di sezione
const pdfMealOnly = (text) => {
  const mm = pdfMealAt(text, { fuzzy: true });
  if (!mm) return null;
  const left = mm.rest.replace(/\(?\s*~?\d{2,4}\s*(kcal|cal|calorie)\s*\)?/i, '').replace(/[\s()\-–:.,]/g, '');
  return left ? null : mm;
};

// Sezioni da non considerare alimenti (note, guide, regole, elenchi…)
const PDF_STOP = /^(note?\b|nota bene|n\.?\s?b\.?\b|consigli|indicazioni|avvertenz|integrazione\b|integratori|osservazioni|raccomandazioni|regole|totale|tot\.|guida|suggeriment|variazion|sostituzion|alternative|preparazion|condiment|bevande|dolcificant|alimenti|lista |elenco|verdure e ortaggi|legenda|attenzione|importante|ricorda|esempi|idee per|frutta fresca e|cosa (evitare|mangiare)|da evitare|vietat|consentit|ammess)/;
const PDF_SKIP = /^(pagina|pag\.?\s*\d|dott\b|dr\.?\s|dott\.?ssa|biolog|nutrizionist|dietist|paziente|sig\.?\b|sig\.ra|nome\b|cognome|data\b|piano alimentare|schema (alimentare|nutrizionale)|dieta\b|programma alimentare|www\.|https?:|tel\.?\b|e-?mail)/;
const PDF_DAILY_NOTE = /(nella giornata|durante la giornata|\bal giorno\b|tutti i giorni|ogni giorno|giornalier)/;
const isCapsHeading = (line) => {
  if (line.segs.length !== 1) return false;
  const t = line.text;
  if (/[a-zà-ÿ]/.test(t) || /\d/.test(t)) return false;
  return (t.match(/[A-ZÀ-Ý]/g) || []).length >= 6 && /\s/.test(t.trim());
};

// --- 3) Dal testo di un pasto agli alimenti ---
const PDF_NOTE_WORDS = /(distribui|consider|supporto|se vuoi|a piacere|facoltativ|riproponi|ad esempio|\bes\.|consiglio|ricorda|tutti i giorni|ogni giorno)/i;
// Toglie le parentesi di commento (lunghe o con parole da nota); quelle brevi ("130g", "Fage") restano
const pdfStripNotes = (text) => {
  let out = '', buf = '', depth = 0;
  for (const ch of text) {
    if (ch === '(') { if (depth === 0) buf = ''; depth++; buf += ch; continue; }
    if (depth > 0) {
      buf += ch;
      if (ch === ')') {
        depth--;
        if (depth === 0) {
          const inner = buf.slice(1, -1);
          const note = PDF_NOTE_WORDS.test(inner) || inner.length > 120 || (inner.trim().length > 40 && !/\d/.test(inner));
          if (!note) out += buf;
          buf = '';
        }
      }
      continue;
    }
    out += ch;
  }
  if (depth > 0) out += buf.length > 60 && PDF_NOTE_WORDS.test(buf) ? '' : buf;
  return out.replace(/\s+([,.;])/g, '$1').replace(/\s+/g, ' ').trim();
};

// Divide in alimenti su virgole, "+", punti elenco, " - " (ma non dentro le parentesi né in "1,5")
const pdfSplitFoods = (text) => {
  const split = (source, ignoreParens, commas) => {
    const parts = [];
    let cur = '', depth = 0;
    const s = String(source || '');
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (!ignoreParens) { if (ch === '(') depth++; else if (ch === ')') depth = Math.max(0, depth - 1); }
      const prev = s[i - 1] || '', next = s[i + 1] || '';
      const sep = depth === 0 && (
        /[;•●▪\n]/.test(ch)
        || (commas && ch === ',' && !(/\d/.test(prev) && /\d/.test(next)))
        || ch === '+'
        || (/[-–—]/.test(ch) && /\s/.test(prev) && /\s/.test(next))
      );
      if (sep) { parts.push(cur); cur = ''; } else cur += ch;
    }
    parts.push(cur);
    return { parts, balanced: depth === 0 };
  };
  const opens = (String(text).match(/\(/g) || []).length, closes = (String(text).match(/\)/g) || []).length;
  const loose = opens !== closes;
  // Prima su "+", ";", punti elenco; poi sulle virgole, tranne nei piatti descritti
  // ("Insalata di polpo con zucchine, basilico…", "Insalatona: uova, lattuga…") che restano una voce sola
  const isDish = (p) => {
    if (/^[^,(]{3,30}:\s/.test(p.trim())) return true;
    const [head, ...rest] = p.split(',');
    return rest.length > 0 && /\scon\s/i.test(head) && rest.every(r => !/\d/.test(r) && r.trim().split(/\s+/).length <= 5);
  };
  let parts = split(text, loose, false).parts.flatMap(p => (isDish(p) ? [p] : split(p, loose, true).parts));
  // Pezzi fatti solo di parentesi ("(2 sottilette)") si uniscono all'alimento prima
  const out = [];
  parts.map(p => p.trim()).forEach(p => {
    if (!p) return;
    if (/^\(/.test(p) && out.length && (/\)\s*$/.test(p) || !/\)/.test(p))) out[out.length - 1] += ' ' + p;
    else out.push(p);
  });
  return out
    .map(p => {
      let s = p.replace(/^[\s\-–—*•·]+(?=\S)/, '').replace(/^\d{1,2}[.)]\s+(?=\D)/, '').replace(/[\s.,;:]+$/, '').trim();
      const diff = (s.match(/\(/g) || []).length - (s.match(/\)/g) || []).length;
      if (diff > 0) s += ')'.repeat(diff);
      if (diff < 0) s = s.replace(/^\)+/, '').trim();
      return s;
    })
    .filter(s => s.replace(/[^a-zà-ÿ0-9]/gi, '').length > 1 && !/^(e|ed|o|oppure|con)$/i.test(s))
    .map(s => s.charAt(0).toUpperCase() + s.slice(1));
};

// Calorie scritte nel testo ("450 kcal"): le toglie e le restituisce
const pdfTakeKcal = (text) => {
  const m = /\(?\s*(?:~|circa\s*)?(\d{2,4})\s*(kcal|calorie|cal)\b\.?\s*\)?/i.exec(text);
  if (!m) return { text, kcal: '' };
  return { text: (text.slice(0, m.index) + ' ' + text.slice(m.index + m[0].length)).replace(/\s+/g, ' ').trim(), kcal: m[1] };
};

const PDF_EMPTY = /^(no|nessuno|nessuna|niente|nulla|non previsto|saltare|salta|-+|—|\/|x)$/i;
const PDF_FREE = /^(fai tu|a tua scelta|a scelta( libera)?|libero|libera|inseriscilo|inseriscila|da inserire|a piacere|quello che vuoi)$/i;
const PDF_SAME = /^(uguale|ugule|uguali|idem|come sopra|stess[oa]|identic[oa]|come (il giorno )?prima|come (lunedi|martedi|mercoledi|giovedi|venerdi|sabato|domenica)|uguale a (lunedi|martedi|mercoledi|giovedi|venerdi|sabato|domenica|ieri|sopra|prima))\b/;

// Testo grezzo di un pasto (righe) → { items, kcal, same, sameDay, allDays }
const pdfMealContent = (lines) => {
  // Righe → voci: una riga che continua la precedente (minuscola, parentesi, dopo "+", "di", "con"…) si unisce
  const entries = [];
  let prev = null;
  // Una riga minuscola continua la precedente solo se quella arrivava quasi a fine colonna (andata a capo)
  const maxW = Math.max(0, ...lines.map(l => Math.max(l.w || 0, l.colW || 0)));
  const wrapped = (l) => !maxW || !l.w || l.w >= maxW * 0.6;
  lines.forEach(l => {
    const text = l.text.trim();
    if (!text) return;
    const close = prev && l.y - prev.y <= Math.max(prev.h, l.h) * 1.6;
    const continues = prev && close && (
      (/^[a-zà-ÿ&]/.test(text) && wrapped(prev))
      || /^[(+]/.test(text)
      || /^[A-Z]{2,5}\b(?![a-z])/.test(text) && !/[.;:]$/.test(prev.text)
      || /[,+(\-–&/]$/.test(prev.text)
      || /\b(di|con|e|ed|o|al|alla|allo|ai|alle|in|da|per|tra|fra|oppure|a|su|del|della|dei|delle)$/i.test(prev.text)
      || /^\d+([.,]\d+)?\s*(g|gr|ml|kg)\b\.?\)?$/i.test(text)
      || (prev.text.split('(').length > prev.text.split(')').length)
    );
    if (continues) { entries[entries.length - 1] += ' ' + text; prev = { ...l, text: prev.text + ' ' + text }; }
    else { entries.push(text); prev = { ...l, text }; }
  });
  const full = entries.join('\n');
  const n = pdfNorm(full);
  const allDays = /(uguale|stess[oa]|identic[oa]|valid[oa]|vale)\s*(per\s*)?(tutti i giorni|ogni giorno|tutta la settimana)/.test(n);
  let kcal = '';
  const items = [];
  let same = false, sameDay = -1, free = false;
  entries.forEach(entry => {
    let e = pdfStripNotes(entry);
    const k = pdfTakeKcal(e);
    if (k.kcal && !kcal) kcal = k.kcal;
    e = k.text;
    const en = pdfNorm(e).replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!en || PDF_EMPTY.test(en)) return;
    if (PDF_SAME.test(en) && en.split(' ').length <= 5) {
      same = true;
      const d = DAY_FULL.findIndex(dn => en.includes(dn));
      if (d >= 0) sameDay = d;
      return;
    }
    if (PDF_FREE.test(en)) { free = true; return; }
    // Alternative: "(a scelta tra) A, B, C" → "A oppure B oppure C"
    const alt = /^\(?\s*(a scelta|scegli(ere)?|in alternativa)\s*(tra|fra)?\s*\)?\s*:?\s*/i.exec(e);
    if (alt && alt[0].trim().length > 3) {
      const options = pdfSplitFoods(e.slice(alt[0].length).replace(/\s+(oppure|o)\s+/gi, ', '));
      if (options.length) { items.push(options.join(' oppure ')); return; }
    }
    pdfSplitFoods(e).forEach(f => items.push(f));
  });
  if (!items.length && free) items.push('A scelta');
  return { items, kcal, same: same && !items.length, sameDay, allDays };
};

// --- Costruzione del risultato ---
const MEAL_ORDER = ['colazione', 'spuntino_mattina', 'pranzo', 'spuntino_pomeriggio', 'post_workout', 'cena'];
const pdfNewWeek = () => { const days = {}; PDF_DAYS.forEach(d => { days[d] = []; }); return { days }; };

const pdfRepeatedLines = (pages) => {
  // Intestazioni e piè di pagina ripetuti (nome del medico, "Pagina 1 di 3"…): si ignorano
  const repeated = new Set();
  if (pages.length < 2) return repeated;
  const count = new Map();
  pages.forEach(page => {
    const seen = new Set();
    page.lines.forEach(l => {
      const edge = l.y < page.height * 0.15 || l.y > page.height * 0.85;
      if (!edge) return;
      // Titoli di giorni e pasti non sono intestazioni, anche se si ripetono su ogni pagina
      if (l.segs.some(sg => pdfDayAt(sg.text) || pdfMealAt(sg.text, { fuzzy: false }))) return;
      const key = pdfNorm(l.text).replace(/\d+/g, '#');
      if (seen.has(key)) return;
      seen.add(key);
      count.set(key, (count.get(key) || 0) + 1);
    });
  });
  const need = Math.max(2, Math.ceil(pages.length * 0.5));
  count.forEach((c, key) => { if (c >= need) repeated.add(key); });
  return repeated;
};

const parseDietPages = (rawPages) => {
  const pages = rawPages.map(p => ({ ...p, height: p.height || 842, lines: pdfLines(p.items) }));
  const repeated = pdfRepeatedLines(pages);

  // Pasti trovati, nell'ordine del documento: { week, day (null = tutti i giorni), type, lines }
  const meals = [];
  let week = 0, explicitWeeks = false, day = null, seenDays = new Set();
  let meal = null, stopped = false, grid = null, format = 'elenco';

  const lineWidth = (l) => l.segs[l.segs.length - 1].x2 - l.segs[0].x;
  const newMeal = (type, d = day, w = week) => { const m = { week: w, day: d, type, lines: [] }; meals.push(m); return m; };
  const setDay = (d) => {
    if (!explicitWeeks && seenDays.has(d)) { week++; seenDays = new Set(); }
    seenDays.add(d);
    day = d;
  };

  // Griglia: colonne = pasti (o giorni), righe = giorni (o pasti) se scritti a sinistra
  const flushGrid = () => {
    if (!grid) return;
    const g = grid;
    grid = null;
    if (!g.cells.length) return;
    // Colonna di ogni cella: il testo di una colonna è allineato a sinistra, quindi i pezzi che
    // iniziano alla stessa x stanno insieme e vanno nella colonna più vicina al loro centro medio
    // (così "vetro)" o "(15g)", corti e a inizio cella, non scivolano nella colonna accanto)
    const nearestCol = (cx) => g.cols.reduce((b, c) => (Math.abs(c.cx - cx) < Math.abs(b.cx - cx) ? c : b), g.cols[0]);
    const clusters = [];
    g.cells.forEach(c => {
      let cl = clusters.find(k => Math.abs(k.x - c.x) <= 3);
      if (!cl) { cl = { x: c.x, cells: [] }; clusters.push(cl); }
      cl.cells.push(c);
    });
    clusters.forEach(cl => {
      const wsum = cl.cells.reduce((a, c) => a + Math.max(1, c.w), 0);
      const cx = cl.cells.reduce((a, c) => a + c.cx * Math.max(1, c.w), 0) / wsum;
      const col = nearestCol(cx);
      cl.cells.forEach(c => { c.col = col; });
    });
    const rows = g.rows.slice().sort((a, b) => a.y - b.y);
    const rowOf = (y) => {
      if (!rows.length) return null;
      // Etichette centrate in verticale (c'è testo sopra la prima): confine a metà tra un'etichetta e l'altra
      const centered = g.cells.some(c => c.y < rows[0].y - 3);
      let r = rows[0];
      rows.forEach((row, i) => {
        const top = centered ? (i ? (rows[i - 1].y + row.y) / 2 : -Infinity) : row.y - 3;
        if (y >= top) r = row;
      });
      return r;
    };
    const buckets = new Map();
    g.cells.forEach(c => {
      const row = rowOf(c.y);
      let d, type;
      if (g.kind === 'meal') { type = c.col.key; d = row ? row.key : g.day; }
      else { d = c.col.key; type = row ? row.key : null; }
      if (type === null || type === undefined) return;
      const w = row && row.week !== undefined ? row.week : g.week;
      const key = w + '|' + d + '|' + type + '|' + (g.kind === 'meal' ? c.col.idx : (row ? row.idx : 0));
      if (!buckets.has(key)) buckets.set(key, { w, d, type, order: (row ? row.idx : 0) * 100 + (g.kind === 'meal' ? c.col.idx : 0), lines: [] });
      buckets.get(key).lines.push(c);
    });
    // Larghezza di ogni colonna (la riga più lunga): serve a capire se una riga è andata a capo
    const colW = new Map();
    g.cells.forEach(c => colW.set(c.col, Math.max(colW.get(c.col) || 0, c.w || 0)));
    [...buckets.values()].sort((a, b) => a.order - b.order).forEach(b => {
      const m = newMeal(b.type, b.d, b.w);
      m.lines = b.lines.sort((a, c) => a.y - c.y || a.x - c.x).reduce((acc, c) => {
        const last = acc[acc.length - 1];
        if (last && Math.abs(last.y - c.y) <= Math.max(2, c.h * 0.5)) { last.text += ' ' + c.text; last.w = c.x + c.w - last.x; }
        else acc.push({ y: c.y, h: c.h, x: c.x, w: c.w, colW: colW.get(c.col), text: c.text });
        return acc;
      }, []);
    });
  };

  const startGrid = (kind, cols, line) => {
    flushGrid();
    meal = null; stopped = false;
    format = kind === 'meal' ? 'tabella (pasti in colonna)' : 'tabella (giorni in colonna)';
    const minCx = Math.min(...cols.map(c => c.cx));
    const spacing = cols.length > 1 ? (Math.max(...cols.map(c => c.cx)) - minCx) / (cols.length - 1) : 100;
    grid = { kind, cols: cols.map((c, idx) => ({ ...c, idx })), rows: [], cells: [], day, week, labelLimit: minCx - spacing * 0.5, y: line.y };
  };

  const gridLabel = (seg) => {
    // Etichetta di riga: a sinistra delle colonne e riconosciuta come giorno (o pasto)
    if (!grid || seg.cx >= grid.labelLimit + 4) return null;
    if (grid.kind === 'meal') { const d = pdfDayAt(seg.text, { short: true, fuzzy: true }); return d && d.rest.length < 25 ? { key: d.day } : null; }
    const mm = pdfMealAt(seg.text);
    return mm ? { key: mm.type === 'spuntino' ? null : mm.type, raw: mm.type, rest: mm.rest } : null;
  };

  const addGridCells = (line, segs) => {
    segs.forEach(seg => {
      let best = grid.cols[0], bestD = Infinity;
      grid.cols.forEach(c => { const dd = Math.abs(c.cx - seg.cx); if (dd < bestD) { bestD = dd; best = c; } });
      grid.cells.push({ col: best, x: seg.x, w: seg.x2 - seg.x, cx: seg.cx, y: line.y, h: line.h, text: seg.text });
    });
  };

  pages.forEach((page, pageIdx) => {
    if (pageIdx > 0) flushGrid();
    page.lines.forEach(line => {
      const text = line.text;
      const n = pdfNorm(pdfStripBullet(text));
      if (!n || /^[\d\s/.\-–]+$/.test(n)) return;
      if (repeated.has(pdfNorm(text).replace(/\d+/g, '#'))) return;

      // Settimana
      const wk = pdfWeekAt(pdfStripBullet(text));
      if (wk >= 0 && text.length < 50) {
        flushGrid();
        week = wk; explicitWeeks = true; seenDays = new Set(); meal = null;
        return;
      }

      // Intestazione con 3+ giorni → giorni in colonna
      const daySegs = line.segs.map(s => ({ s, d: pdfDayAt(s.text, { short: true }) })).filter(x => x.d && x.d.rest.length < 20);
      if (new Set(daySegs.map(x => x.d.day)).size >= 3 && daySegs.length >= line.segs.length - 1) {
        startGrid('day', daySegs.map(x => ({ key: x.d.day, cx: x.s.cx })), line);
        return;
      }

      // Intestazione con 2+ pasti (tutti i blocchi sono nomi di pasto, al massimo un'etichetta a sinistra)
      const mealSegs = line.segs.map(s => ({ s, m: pdfMealOnly(s.text) }));
      const mealCount = mealSegs.filter(x => x.m).length;
      const others = mealSegs.filter(x => !x.m);
      if (mealCount >= 2 && (others.length === 0 || (others.length === 1 && others[0] === mealSegs[0] && others[0].s.text.length <= 14))) {
        let snack = 0;
        const cols = mealSegs.filter(x => x.m).map(x => {
          let type = x.m.type;
          if (type === 'spuntino') type = snack++ === 0 && !mealSegs.some(y => y.m && y.m.type === 'pranzo' && y.s.cx < x.s.cx) ? 'spuntino_mattina' : 'spuntino_pomeriggio';
          return { key: type, cx: x.s.cx };
        });
        startGrid('meal', cols, line);
        return;
      }

      // Dentro una griglia: etichette di riga e celle
      if (grid) {
        const label = gridLabel(line.segs[0]);
        const isDayHeader = !label && line.segs.length <= 2 && pdfDayAt(line.segs[0].text, { fuzzy: true });
        if (label && (grid.rows.length || line.segs.length > 1 || grid.kind === 'day')) {
          let key = label.key;
          if (grid.kind === 'day' && label.raw === 'spuntino') key = grid.rows.some(r => r.key === 'pranzo') ? 'spuntino_pomeriggio' : 'spuntino_mattina';
          if (grid.kind === 'meal' && !explicitWeeks && grid.rows.some(r => r.key === key)) week++;
          grid.rows.push({ key, y: line.y, idx: grid.rows.length, week });
          const rest = [];
          if (label.rest) rest.push({ ...line.segs[0], text: label.rest });
          addGridCells(line, rest.concat(line.segs.slice(1)));
          return;
        }
        // Testo a sinistra delle colonne che non è un'etichetta (nota a piè di tabella): la tabella è finita
        const outside = line.segs.length === 1 && line.segs[0].cx < grid.labelLimit;
        const stop = PDF_STOP.test(n) || isCapsHeading(line) || outside;
        const mealHead = !isDayHeader && line.segs.length === 1 && pdfMealAt(line.segs[0].text);
        if (!isDayHeader && !stop && !mealHead) { addGridCells(line, line.segs); return; }
        flushGrid();
      }

      // Giorno
      const dh = line.segs.length <= 3 ? pdfDayAt(line.segs[0].text, { fuzzy: line.segs[0].text.length <= 25 }) : null;
      if (dh && line.segs[0].text.length <= 60) {
        setDay(dh.day);
        meal = null; stopped = false;
        const mm = dh.rest ? pdfMealAt(dh.rest) : null;
        if (mm) { meal = newMeal(mm.type); if (mm.rest) meal.lines.push({ y: line.y, h: line.h, w: lineWidth(line), text: mm.rest }); }
        return;
      }

      // Pasto
      const mm = pdfMealAt(line.segs[0].text);
      if (mm) {
        stopped = false;
        meal = newMeal(mm.type);
        const rest = [mm.rest, ...line.segs.slice(1).map(s => s.text)].filter(Boolean).join(' ');
        if (rest) meal.lines.push({ y: line.y, h: line.h, w: lineWidth(line), text: rest });
        return;
      }

      // Sezioni da ignorare
      if (PDF_SKIP.test(n) && !meal) return;
      if (PDF_STOP.test(n) || (isCapsHeading(line) && !meal)) { stopped = true; meal = null; return; }
      if (meal && /^[A-ZÀ-Ý0-9]/.test(pdfStripBullet(text)) && PDF_DAILY_NOTE.test(n)) { stopped = true; meal = null; return; }

      if (meal && !stopped) meal.lines.push({ y: line.y, h: line.h, w: lineWidth(line), text: line.segs.map(s => s.text).join(' ') });
    });
  });
  flushGrid();

  // --- Dai pasti grezzi alle settimane del menù ---
  const weeks = [];
  const ensureWeek = (w) => { while (weeks.length <= w) weeks.push(pdfNewWeek()); return weeks[w]; };
  const everyDay = [];          // pasti validi per tutti i giorni
  const placed = [];            // pasti già messi, per "uguale"
  meals.forEach(m => {
    const c = pdfMealContent(m.lines);
    let type = m.type;
    const list = m.day === null ? null : ensureWeek(m.week).days[PDF_DAYS[m.day]];
    if (type === 'spuntino') type = list && list.some(x => x.type === 'pranzo' || x.type === 'cena') ? 'spuntino_pomeriggio' : 'spuntino_mattina';
    let items = c.items;
    if (c.same) {
      // "uguale": stesso pasto del giorno indicato, altrimenti dell'ultimo giorno che lo aveva
      const src = [...placed].reverse().find(p => p.type === type && (c.sameDay < 0 || p.day === c.sameDay) && !(p.week === m.week && p.day === m.day))
        || everyDay.find(p => p.type === type);
      if (!src) return;
      items = src.items.slice();
    }
    if (!items.length) return;
    const entry = { type, items, calories: c.kcal || '' };
    if (m.day === null || c.allDays) everyDay.push({ type, items: items.slice(), calories: entry.calories });
    if (list) { list.push(entry); placed.push({ week: m.week, day: m.day, type, items }); }
  });

  // Pasti "per tutti i giorni" nei giorni che non li hanno, al posto giusto
  if (everyDay.length) {
    if (!weeks.length) ensureWeek(0);
    weeks.forEach(wk => PDF_DAYS.forEach(d => {
      const list = wk.days[d];
      everyDay.forEach(tpl => {
        if (list.some(x => x.type === tpl.type)) return;
        const at = list.findIndex(x => MEAL_ORDER.indexOf(x.type) > MEAL_ORDER.indexOf(tpl.type));
        const copy = { type: tpl.type, items: tpl.items.slice(), calories: tpl.calories };
        if (at < 0) list.push(copy); else list.splice(at, 0, copy);
      });
    }));
  }

  // Pulizia: alimenti vuoti o ripetuti, pasti vuoti
  weeks.forEach(wk => PDF_DAYS.forEach(d => {
    wk.days[d] = wk.days[d]
      .map(m => ({ ...m, items: m.items.map(i => i.trim()).filter((i, idx, a) => i && a.findIndex(x => x.toLowerCase() === i.toLowerCase()) === idx) }))
      .filter(m => m.items.length);
    // Ordine della giornata (il post allenamento resta dove l'ha messo il nutrizionista)
    let lastKey = -1;
    wk.days[d] = wk.days[d]
      .map((m, i) => {
        const k = m.type === 'post_workout' ? lastKey + 0.5 : MEAL_ORDER.indexOf(m.type);
        if (m.type !== 'post_workout') lastKey = k;
        return { m, k, i };
      })
      .sort((a, b) => a.k - b.k || a.i - b.i)
      .map(x => x.m);
  }));
  const usedWeeks = weeks.filter(wk => PDF_DAYS.some(d => wk.days[d].length));
  const mealCount = usedWeeks.reduce((s, wk) => s + PDF_DAYS.reduce((a, d) => a + wk.days[d].length, 0), 0);
  const foods = usedWeeks.reduce((s, wk) => s + PDF_DAYS.reduce((a, d) => a + wk.days[d].reduce((x, m) => x + m.items.length, 0), 0), 0);
  const missing = [];
  usedWeeks.forEach((wk, i) => PDF_DAYS.forEach(d => { if (!wk.days[d].length) missing.push((usedWeeks.length > 1 ? 'Sett. ' + (i + 1) + ' ' : '') + d); }));
  return { weeks: usedWeeks, meals: mealCount, foods, missing, format };
};
// Compatibilità con il nome precedente
const parseDietPdf = parseDietPages;

// Tutto insieme: file (PDF o Word) → menù
const dietFileKind = (file) => {
  const name = String(file.name || '').toLowerCase();
  if (/\.pdf$/.test(name) || file.type === 'application/pdf') return 'pdf';
  if (/\.docx$/.test(name) || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'docx';
  if (/\.doc$/.test(name) || file.type === 'application/msword') return 'doc';
  return '';
};
const importDietFile = async (file) => {
  const kind = dietFileKind(file);
  if (kind === 'doc') return { error: 'doc' };
  if (!kind) return { error: 'type' };
  const pages = kind === 'pdf' ? await readPdfPages(file) : await readDocxPages(file);
  const chars = pages.reduce((n, p) => n + p.items.reduce((s, i) => s + i.str.trim().length, 0), 0);
  if (chars < 20) return { error: kind === 'pdf' ? 'scan' : 'empty' };
  const result = parseDietPages(pages);
  if (!result.meals) return { error: 'empty' };
  return result;
};
const importDietPdf = importDietFile;

// Per i test fuori dal browser (Node)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { parseDietPages, readPdfPages, docxBlocks, docxToPages, unzipEntry, pdfPageItems, pdfMealContent, pdfSplitFoods };
}
