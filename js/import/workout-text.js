// ---------------------------------------------------------------
// IMPORT DELLA SCHEDA DI ALLENAMENTO da PDF, Word (.docx), file di testo o testo incollato (es. dalle Note)
// Il testo diventa giorni ed esercizi della scheda; il risultato si ricontrolla nell'editor prima di salvare.
//
// Cosa riconosce, riga per riga:
//  - giorni: "Giorno A", "Giorno 1", "Day 2", "Lunedì", "Allenamento B", "Push", "Pull", "Legs", "Upper", "Lower",
//    "Full body", oppure una riga corta senza numeri che finisce con ":" o è tutta MAIUSCOLA ("PETTO E TRICIPITI")
//  - serie e ripetizioni: "4x8", "4 x 8-10", "3×12", "4 serie da 10", "3 serie x 12 rip", "4x max", "3x30s", "4x 12/10/8/6"
//  - peso: "60kg", "60 kg", "@60", "kg 60" · recupero: "rec 90", "recupero 1'30", "90''", "pausa 2 min"
//  - cardio: "Tapis 20 min", "corsa 30'" (con le parole del cardio e i minuti)
//  - superserie: "Panca + croci" sulla stessa riga, oppure righe che iniziano con "+" o "SS"
//  - numeri da soli sulla riga dopo il nome ("Panca piana" a capo "4x8") vanno all'esercizio sopra
//  - schede dettagliate: "1. Leg press" con sotto "Serie e ripetizioni 3 x 10-12", "Recupero 90''", "Peso 20 kg"
// Cosa NON prende: una riga diventa esercizio solo se lo dimostra (serie x ripetizioni, nome della libreria,
// titolo numerato seguito dalle serie). Frasi, regole, calendario, spiegazioni dell'esecuzione e righe andate a capo
// si scartano; le sezioni come riscaldamento, regole, progressione, piscina e note si saltano fino al giorno dopo
// e vengono elencate in "skipped", così l'app può dire cosa ha lasciato fuori.
// Funzioni pure (niente accesso ai dati dell'app); i file si leggono con le funzioni di js/import/diet-pdf.js.
// ---------------------------------------------------------------

const wNorm = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[’`]/g, "'").replace(/[×]/g, 'x').replace(/\s+/g, ' ').trim();

const W_WEEKDAYS = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
const W_WEEKDAY_NAMES = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
const W_DAY_WORDS = /^(giorno|giornata|day|allenamento|workout|seduta|sessione|scheda|wod|palestra|gym|circuito|routine)\s*(n\.?|nr\.?|numero)?\s*([a-z]|\d{1,2})\b/;
// Titoli fatti solo di nomi di split o muscoli ("Push", "Petto e tricipiti", "Gambe + glutei", "Upper body")
const W_SPLIT_TOKENS = new Set(['push', 'pull', 'leg', 'legs', 'gambe', 'gamba', 'upper', 'lower', 'body', 'full', 'fullbody', 'total', 'parte', 'alta', 'bassa',
  'petto', 'schiena', 'spalle', 'spalla', 'braccia', 'dorso', 'dorsali', 'glutei', 'addome', 'addominali', 'core', 'cardio', 'tirata', 'spinta',
  'bicipiti', 'tricipiti', 'quadricipiti', 'femorali', 'polpacci', 'trapezio', 'deltoidi', 'pettorali', 'abs', 'chest', 'back', 'shoulders', 'arms',
  'e', 'ed', '&', '+', '/', '-', '–', 'giorno', 'day', 'a', 'b', 'c', 'd', '1', '2', '3', '4', '5']);
const wIsSplitTitle = (t) => {
  const tokens = t.replace(/[:.,()]/g, ' ').split(/\s+/).filter(Boolean);
  return tokens.length > 0 && tokens.length <= 6 && tokens.every(x => W_SPLIT_TOKENS.has(x)) && tokens.some(x => x.length > 2);
};
const W_CARDIO_WORDS = /(tapis|treadmill|corsa|correre|running|bici|cyclette|spinning|ellittica|vogatore|rower|camminata|walk|cardio|stepper|step mill|nuoto|salto della corda|corda|hiit)/;
const W_SKIP = /^(note?\b|nb\b|n\.b\.|riscaldamento|stretching|defaticamento|warm ?up|cool ?down|legenda|data\b|nome\b|cognome|trainer|istruttore|personal|palestra\b|scheda (di|n)|ripetere|ogni \d)/;

const wSecs = (num, unit) => {
  const n = parseFloat(String(num).replace(',', '.'));
  if (isNaN(n)) return '';
  const u = (unit || '').toLowerCase();
  if (/^(min|minuti|m|')$/.test(u)) return Math.round(n * 60);
  return Math.round(n);
};

// Recupero: "rec 90", "recupero: 1'30", "90''", "90\"", "pausa 2 min", "1:30 rec"
const wTakeRest = (t) => {
  let m = /(?:rec(?:upero|\.)?|pausa|riposo|rest)\s*:?\s*(\d+)\s*[':]\s*(\d{1,2})\b/.exec(t);
  if (m) return { rest: Number(m[1]) * 60 + Number(m[2]), text: t.replace(m[0], ' ') };
  m = /(?:rec(?:upero|\.)?|pausa|riposo|rest)\s*:?\s*(\d+(?:[.,]\d+)?)\s*(''|"|s|sec|secondi|min|minuti|m|')?/.exec(t);
  if (m) return { rest: wSecs(m[1], m[2] === "''" || m[2] === '"' ? 's' : (m[2] || (Number(m[1]) <= 5 ? 'min' : 's'))), text: t.replace(m[0], ' ') };
  m = /(\d+)\s*(''|")(?!\w)/.exec(t);
  if (m) return { rest: Number(m[1]), text: t.replace(m[0], ' ') };
  return { rest: '', text: t };
};

// Peso: "60kg", "kg 60", "@60", "60 chili"
const wTakeWeight = (t) => {
  let m = /(\d+(?:[.,]\d+)?)\s*(kg|chili|chilo)\b/.exec(t) || /\bkg\s*(\d+(?:[.,]\d+)?)/.exec(t) || /@\s*(\d+(?:[.,]\d+)?)/.exec(t);
  if (m) return { weight: m[1].replace(',', '.'), text: t.replace(m[0], ' ') };
  return { weight: '', text: t };
};

// Superserie "A + B 3x12": i numeri scritti una volta valgono per tutti e due
const wShareNumbers = (list) => {
  const src = list.find(e => e.sets) || {};
  list.forEach(e => { if (!e.sets && src.sets) { e.sets = src.sets; e.reps = src.reps; } if (!e.rest && src.rest) e.rest = src.rest; });
  return list;
};
// Serie e ripetizioni
const wReps = (r) => String(r).replace(/\s*([-–/])\s*/g, '$1').replace(/\s+/g, ' ').trim();
const wTakeSetsReps = (t) => {
  const R = "(max|\\d+(?:\\s*[-–/]\\s*\\d+)*(?:\\s*(?:s|sec|secondi|''|\"|min|m|metri|passi|per (?:lato|gamba|braccio)))?)";
  let m = new RegExp('\\b(\\d{1,2})\\s*(?:serie|set|sets)?\\s*[x*]\\s*' + R).exec(t);
  if (m) return { sets: m[1], reps: wReps(m[2]), text: t.replace(m[0], ' ') };
  m = new RegExp('\\b(\\d{1,2})\\s*(?:serie|set|sets)\\s*(?:da|di|x|per)?\\s*' + R + '\\s*(?:rip(?:etizioni|\\.)?|reps?)?').exec(t);
  if (m) return { sets: m[1], reps: wReps(m[2]), text: t.replace(m[0], ' ') };
  // Solo piramide di ripetizioni "12-10-8-6" → serie = quante sono
  m = /\b(\d{1,2}(?:\s*[-/]\s*\d{1,2}){2,})\b/.exec(t);
  if (m) { const parts = m[1].split(/[-/]/); return { sets: String(parts.length), reps: parts.map(x => x.trim()).join('/'), text: t.replace(m[0], ' ') }; }
  return { sets: '', reps: '', text: t };
};

// Minuti del cardio: "20 min", "30'", "20 minuti"
const wTakeMinutes = (t) => {
  const m = /(\d+(?:[.,]\d+)?)\s*(min|minuti|mins|')(?!\w)/.exec(t);
  return m ? { duration: m[1].replace(',', '.'), text: t.replace(m[0], ' ') } : { duration: '', text: t };
};

// Pulizia del nome: elenchi puntati, numerazione, punteggiatura rimasta
const wCleanName = (raw) => String(raw)
  .replace(/^[\s•●▪◦·*\-–—>»✓✔☐□■○+]+/, '')
  .replace(/^\d{1,2}\s*[.)\-]\s*/, '')
  .replace(/\b(rip(?:etizioni)?|reps?|serie|sets?|x)\b\s*$/i, '')
  .replace(/[\s:;,.\-–|()]+$/, '')
  .replace(/^[\s:;,.\-–|()]+/, '')
  .replace(/\s{2,}/g, ' ')
  .trim();

const wCap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Una riga è un titolo di giorno?
// "GIORNO 1 - PETTO" → "Giorno 1 - Petto": i titoli tutti maiuscoli diventano normali
const wTidy = (s) => (s === s.toUpperCase() && /[A-Z]/.test(s) ? wCap(s.toLowerCase()) : wCap(s));
const wDayName = (line) => {
  const raw = String(line).trim().replace(/^[#*\s•\-–—=_]+|[#*\s=_]+$/g, '');
  const t = wNorm(raw).replace(/[:.]+$/, '');
  if (!t || t.length > 40) return null;
  // "4. Dorso", "1) Panca": un elenco numerato è di esercizi, non di giorni
  if (/^\d{1,2}\s*[.)]\s/.test(raw)) return null;
  const hasNumbers = /\d+\s*[x*]\s*\d|\d+\s*(kg|serie|rip)/.test(t);
  if (hasNumbers) return null;
  const wd = W_WEEKDAYS.findIndex(d => t === d || t.startsWith(d + ' ') || t.startsWith(d + ':') || t.startsWith(d.slice(0, 3) + ' ') && t.length < 30);
  if (wd > -1 && t.length < 30) return raw.length <= 30 ? wTidy(raw.replace(/[:.]+$/, '')) : W_WEEKDAY_NAMES[wd];
  const m = W_DAY_WORDS.exec(t);
  if (m) return wTidy(raw.replace(/[:.]+$/, ''));
  if (/^[a-e]\s*[):.-]?$/.test(t)) return 'Giorno ' + t.charAt(0).toUpperCase();
  if (wIsSplitTitle(t)) return wTidy(raw.replace(/[:.]+$/, ''));
  if (raw.endsWith(':') && t.split(' ').length <= 5) return wTidy(raw.replace(/[:.]+$/, ''));
  if (raw.length >= 3 && raw === raw.toUpperCase() && /[A-Z]/.test(raw) && t.split(' ').length <= 5) return wCap(raw.toLowerCase());
  return null;
};

// Una riga → uno o più esercizi (più di uno se è una superserie "A + B")
const wParseLine = (line) => {
  let raw = String(line).trim();
  let superset = /^(\+|ss\b|superserie\b|superset\b)/i.test(raw);
  raw = raw.replace(/^(ss|superserie|superset)\s*[:\-–]?\s*/i, '');
  const parts = raw.split(/\s\+\s|\s&\s/).filter(p => p.trim());
  if (parts.length > 1) superset = true;
  return wShareNumbers(parts.map(part => {
    let t = wNorm(part);
    const original = part;
    const sr = wTakeSetsReps(t); t = sr.text;
    const w = wTakeWeight(t); t = w.text;
    const r = wTakeRest(t); t = r.text;
    // Numeri senza la "x" in fondo alla riga, come nelle tabelle copiate: "Leg extension 3 12" → 3 serie da 12
    if (!sr.sets) {
      const m = /(?:^|\s)(\d{1,2})\s+(\d{1,2}(?:\s*[-/]\s*\d{1,2})*)\s*$/.exec(t);
      if (m && Number(m[1]) >= 1 && Number(m[1]) <= 10 && /[a-z]/.test(t.slice(0, m.index))) {
        sr.sets = m[1]; sr.reps = wReps(m[2]); t = t.slice(0, m.index) + ' ' + m[1] + ' ';
      }
    }
    let duration = '';
    const isCardio = !sr.sets && W_CARDIO_WORDS.test(t);
    if (isCardio) { const mm = wTakeMinutes(t); duration = mm.duration; t = mm.text; }
    // Il nome si prende dal testo originale (maiuscole e accenti) togliendo i pezzi numerici riconosciuti
    const name = wCleanName(wNameFrom(original, t));
    return { name: wCap(name), sets: sr.sets, reps: sr.reps, weight: w.weight, rest: r.rest, duration, cardio: isCardio, superset, restText: t };
  }));
};

// Nome con le lettere originali: si tengono le parole dell'originale che sono rimaste nel testo ripulito
const wNameFrom = (original, cleaned) => {
  const keep = new Set(wNorm(cleaned).split(/[^a-z0-9']+/).filter(Boolean));
  const words = String(original).split(/(\s+)/);
  const out = [];
  let stop = false;
  words.forEach(wd => {
    if (stop) return;
    const n = wNorm(wd).replace(/[^a-z0-9']+/g, '');
    if (!n) { out.push(wd); return; }
    const parts = wNorm(wd).split(/[^a-z0-9']+/).filter(Boolean);
    if (parts.every(x => keep.has(x)) && !/^\d/.test(n)) { out.push(wd); return; }
    // Al primo numero riconosciuto (serie, peso…) il nome finisce, se ha già almeno una parola
    if (/\d/.test(n) && out.join('').trim()) stop = true;
  });
  return out.join('').trim() || cleaned;
};

// Righe con soli numeri ("4x8 60kg rec 90"): vanno all'esercizio sopra
const wOnlyNumbers = (ex) => !ex.name || /^(x|rip|reps?|serie|kg)?$/i.test(ex.name);

// --- Cosa NON è un esercizio ---
// Sezioni da saltare per intero (fino al prossimo giorno): regole, riscaldamento, piscina, note…
const W_SECTION_SKIP = /^(riscaldamento|attivazione|warm ?up|defaticamento|cool ?down|stretching|allungamento finale|regole|indicazioni|istruzioni|avvertenz[ae]|attenzione|progressione|periodizzazione|note?|nota|nb|n\.b\.|legenda|calendario|programma settimanale|settimana tipo|alimentazione|dieta|integrazione|idratazione|piscina|nuoto|in acqua|obiettiv[oi]|premessa|introduzione|valutazione|test iniziali)\b/;
// Etichette dentro la scheda di un esercizio: le righe dopo sono spiegazioni, non esercizi
const W_DETAIL_LABEL = /^(posizione( di partenza| iniziale)?|partenza|esecuzione( passo passo)?|come si fa|respirazione( e ritmo)?|ritmo|errori( da evitare| comuni)?|per te( in particolare)?|consigli?|attenzione|note?|immagini( e video)?|video|link|muscoli( coinvolti| allenati)?|varianti?|alternativ[ae]|obiettivo|perche|sensazioni)\b/;
// Etichette con i numeri dell'esercizio sopra ("Serie e ripetizioni | 3 x 10-12", "Recupero: 90''")
const W_SETS_LABEL = /^(serie\s*(?:e|x|\/|-)\s*rip(?:etizioni|\.)?|serie|ripetizioni|rip\.?|reps?|sets?|volume|durata|tempo)\s*:?\s*/;
const W_REST_LABEL = /^(recupero|rec\.?|riposo|pausa|rest)\s*:?\s*/;
const W_WEIGHT_LABEL = /^(peso|carico|kg)\s*:?\s*/;
const W_STRIP_LEAD = (s) => String(s).trim().replace(/^[\s•●▪◦·*\-–—>»✓✔☐□■○+]+/, '');
const W_NUMBERED = /^\d{1,2}\s*[.)]\s+\S/;
// Una frase (spiegazione, regola, nota) e non il nome di un esercizio
const wIsProse = (raw, leftover) => {
  const s = W_STRIP_LEAD(raw).replace(/^\d{1,2}\s*[.)]\s*/, '');
  const words = wNorm(leftover).split(/[^a-z0-9à-ú']+/).filter(w => w && !/^\d+$/.test(w));
  if (words.length > 7) return true;
  if (/[.!?;]$/.test(s) && !/\b(rip|rec|sec|min|max|kg)\.$/i.test(s)) return true;
  if (/,\s*\S/.test(leftover)) return true;
  if (/:\s*\S/.test(s) && words.length > 4) return true;
  return false;
};
// Riga che continua quella sopra (testo andato a capo): inizia con la minuscola
const wIsContinuation = (raw) => /^[a-zà-ú(]/.test(W_STRIP_LEAD(raw));
// Titolo corto (giorno, sezione) e non una riga di esercizio
const wIsHeading = (raw) => {
  const t = wNorm(W_STRIP_LEAD(raw)).replace(/\([^)]*\)/g, ' ');
  return !/\d\s*[x*]\s*\d/.test(t) && t.split(/\s+/).filter(Boolean).length <= 8 && !/[.;]$/.test(raw.trim());
};
const W_WATER = /\b(acqua|vasca|piscina|bordo vasca|tavoletta|stile libero|dorso|rana|delfino)\b/;

const parseWorkoutText = (text, fileName = '', library = (typeof EXERCISE_LIBRARY !== 'undefined' ? EXERCISE_LIBRARY : null)) => {
  const lines = String(text || '').replace(/\r/g, '').split('\n').map(l => l.replace(/\t+/g, ' ').trim());
  const days = [];
  const skipped = [];
  let day = null;
  let ssCount = 0, ssOpen = null;
  let title = '';
  let skipping = false;   // dentro una sezione da saltare (regole, riscaldamento, piscina…)
  let details = false;    // dentro le spiegazioni di un esercizio
  const libMatch = (name) => (library && typeof matchExerciseName === 'function' ? matchExerciseName(name, library) : null);
  // Titolo in prima riga ("Scheda Palestra Ottobre", "Il mio programma"): senza numeri,
  // e la riga piena dopo è un giorno oppure inizia con scheda/programma/allenamento
  const filled = lines.map((l, i) => [l, i]).filter(([l]) => l && !/^[-=_*~.\s]+$/.test(l));
  const titleIdx = new Set();
  if (filled.length > 1) {
    const [first, i0] = filled[0];
    const f = wNorm(first);
    const looksTitle = !/\d+\s*[x×*]\s*\d|\d+\s*(kg|min|serie|rip)/.test(f) && first.length <= 60;
    if (looksTitle && !wDayName(first) && (/^(scheda|programma|allenamento|workout|piano|il mio|la mia)/.test(f) || wDayName(filled[1][0]))) {
      title = first.replace(/[:.]+$/, '').trim();
      titleIdx.add(i0);
      // Titolo andato a capo: "Scheda di allenamento: palestra e" + "piscina"
      const [second, i1] = filled[1];
      if (wIsContinuation(second) && second.length <= 30 && !/\d/.test(second)) { title += ' ' + second.trim(); titleIdx.add(i1); }
    }
  }
  const ensureDay = () => {
    if (!day) { day = { name: 'Giorno ' + String.fromCharCode(65 + days.length), exercises: [] }; days.push(day); }
    return day;
  };
  const lastEx = () => (day && day.exercises.length ? day.exercises[day.exercises.length - 1] : null);
  // Prossima riga piena (per capire se un titolo numerato è seguito da "Serie e ripetizioni")
  const nextFilled = (idx) => { for (let j = idx + 1; j < lines.length; j++) if (lines[j] && !/^[-=_*~.\s]+$/.test(lines[j])) return lines[j]; return ''; };
  // "Serie e ripetizioni 3 x 10-12", "Recupero 90''", "Peso 20 kg" → all'esercizio sopra
  const takeLabel = (n) => {
    const ex = lastEx();
    let m = W_SETS_LABEL.exec(n);
    if (m && /\d|max/.test(n.slice(m[0].length))) {
      const rest = n.slice(m[0].length);
      if (!ex) return true;
      const p = wParseLine('x ' + rest)[0] || {};
      if (!ex.sets && p.sets) { ex.sets = p.sets; ex.reps = p.reps; }
      else if (!ex.sets && !ex.reps) {
        const mm = /(\d+(?:\s*[-–/]\s*\d+)*)\s*(minuti|min|'|secondi|sec|s\b|ripetizioni|rip|passi|m\b|metri)?(.*)$/.exec(rest);
        if (mm && /^(minuti|min|')$/.test(mm[2] || '')) ex.duration = ex.duration || mm[1];
        else if (mm) ex.reps = wReps(mm[1] + (mm[2] && !/^rip/.test(mm[2]) ? ' ' + mm[2] : '') + (/per (lato|gamba|braccio)/.test(mm[3]) ? ' per ' + /per (lato|gamba|braccio)/.exec(mm[3])[1] : ''));
      }
      if (!ex.rest && p.rest) ex.rest = p.rest;
      if (!ex.weight && p.weight) ex.weight = p.weight;
      return true;
    }
    m = W_REST_LABEL.exec(n);
    if (m && /\d/.test(n.slice(m[0].length))) { if (ex && !ex.rest) ex.rest = wTakeRest('rec ' + n.slice(m[0].length)).rest; return true; }
    m = W_WEIGHT_LABEL.exec(n);
    if (m && /\d/.test(n.slice(m[0].length))) { if (ex && !ex.weight) ex.weight = wTakeWeight(n.slice(m[0].length) + ' kg').weight; return true; }
    return false;
  };

  lines.forEach((line, idx) => {
    if (titleIdx.has(idx)) return;
    if (!line || /^[-=_*~.\s]+$/.test(line)) { ssOpen = null; return; }
    const n = wNorm(W_STRIP_LEAD(line));
    // Giorno: chiude sezioni saltate e spiegazioni
    const dayName = wIsHeading(line) && !wIsContinuation(line) ? wDayName(line) : null;
    const sectionSkip = W_SECTION_SKIP.test(n) && wIsHeading(line);
    if (dayName && !sectionSkip) {
      day = { name: dayName.length > 40 ? dayName.slice(0, 40).replace(/\s+\S*$/, '') : dayName, exercises: [] };
      days.push(day);
      skipping = false; details = false; ssOpen = null;
      return;
    }
    if (sectionSkip) {
      skipping = true; details = false;
      const label = wCap(W_STRIP_LEAD(line).replace(/[:.]+$/, '').replace(/\s*\(.*$/, '').trim()).slice(0, 30);
      if (label && !skipped.includes(label)) skipped.push(label);
      return;
    }
    if (W_SKIP.test(n) && !/\d+\s*x\s*\d/.test(n)) return;
    // Numeri dell'esercizio sopra scritti come etichetta
    if (!skipping && takeLabel(n)) return;
    if (W_DETAIL_LABEL.test(n)) { details = true; return; }
    if (line.length > 120 && !/\d+\s*[x×*]\s*\d/.test(line)) return;   // note lunghe

    const parsed = wParseLine(line);
    if (!parsed.length) return;
    const prev = lastEx();
    if (parsed.length === 1 && wOnlyNumbers(parsed[0]) && prev && !skipping && !details) {
      const p = parsed[0];
      if (!prev.sets && p.sets) { prev.sets = p.sets; prev.reps = p.reps; }
      if (!prev.weight && p.weight) prev.weight = p.weight;
      if (!prev.rest && p.rest) prev.rest = p.rest;
      if (!prev.duration && p.duration) prev.duration = p.duration;
      return;
    }
    // Ogni pezzo deve dimostrare di essere un esercizio
    const numbered = W_NUMBERED.test(W_STRIP_LEAD(line)) || W_NUMBERED.test(line);
    const valid = parsed.filter(p => {
      if (!p.name || !/[a-zà-ú]/i.test(p.name) || p.name.length > 60) return false;
      const words = p.name.split(/\s+/).length;
      const restWords = wNorm(p.restText).split(/[^a-z0-9']+/).filter(w => w && !/^\d+$/.test(w)).length;
      const prose = wIsProse(line, p.restText);
      const strong = !!p.sets || (p.cardio && !!p.duration);
      if (strong) {
        if (words > 7 || restWords > 8 || (prose && restWords > 4)) return false;
        // Dopo il riscaldamento si riprende solo con un esercizio vero (serie x ripetizioni, nome conosciuto)
        if (skipping) return !!p.sets && !!libMatch(p.name) && !W_WATER.test(wNorm(line));
        return true;
      }
      if (skipping || prose || words > 6) return false;
      // Titolo numerato con i numeri subito sotto ("3. Squat al box" + "Serie e ripetizioni 3 x 10")
      if (W_SETS_LABEL.test(wNorm(W_STRIP_LEAD(nextFilled(idx)))) && /\d/.test(nextFilled(idx))) return true;
      if (details) return false;
      // Nome riconosciuto nella libreria, su una riga corta che non continua una frase
      if (!wIsContinuation(line) && words <= 5 && libMatch(p.name)) return true;
      return numbered && words <= 5 && !!libMatch(p.name);
    });
    if (!valid.length) return;
    if (skipping) skipping = false;   // un esercizio vero dopo il riscaldamento: si riprende
    details = false;
    const d = ensureDay();
    let label = '';
    if (valid.length > 1 || valid[0].superset) {
      if (/^\+/.test(line) && ssOpen) label = ssOpen;
      else { ssCount++; label = 'SS' + ssCount; }
      if (/^\+/.test(line) && prev && !prev.superset) prev.superset = label;
      ssOpen = label;
    } else ssOpen = null;
    valid.forEach(p => d.exercises.push({ ...p, superset: label }));
  });
  const kept = days.filter(dd => dd.exercises.length);
  const exercises = kept.reduce((s, dd) => s + dd.exercises.length, 0);
  const name = title || String(fileName).replace(/\.(pdf|docx?|txt|md|rtf)$/i, '').replace(/[_-]+/g, ' ').trim().slice(0, 40);
  return { name, days: kept, exercises, skipped, withNumbers: kept.reduce((s, dd) => s + dd.exercises.filter(e => e.sets || e.duration).length, 0) };
};

// ---------------------------------------------------------------
// TABELLE (PDF e Word): "Esercizio | Serie | Ripetizioni | Recupero | Peso"
// Nelle tabelle i numeri stanno in colonne separate ("Leg extension   4   12   90''   40"): senza
// l'intestazione non si sa cosa sia cosa. Si trova la riga d'intestazione, si ricorda dove sta ogni
// colonna e ogni riga sotto diventa testo che il lettore capisce: "Leg extension 4x12 40kg rec 90''".
// ---------------------------------------------------------------
const W_COLUMNS = [
  ['sr', /^(serie|set|sets)\s*(x|\/|e|-|×|\*)\s*(rip|ripetizioni|ripet|reps?)\.?$/],
  ['name', /^(esercizi[oi]?|exercises?|nome|movimento)\b/],
  ['sets', /^(n\.?\s*)?(serie|set|sets|n\.? serie)\.?$/],
  ['reps', /^(rip|ripetizioni|ripet|reps?|ripetiz|n\.? rip|ripetizioni\/tempo|tempo\/rip)\.?$/],
  ['rest', /^(rec|recupero|recuperi|riposo|pausa|rest|buffer rec)\.?(\s*\(.*\))?$/],
  ['weight', /^(peso|pesi|kg|carico|carichi|load|weight)\.?(\s*\(.*\))?$/],
  ['skip', /^(note?|tecnica|tut|tempo|rpe|rir|buffer|intensita|esecuzione|video|link|mod|modalita)\.?$/]
];
const wColumnKind = (text) => {
  const t = wNorm(text).replace(/[:]+$/, '').trim();
  const hit = W_COLUMNS.find(([, re]) => re.test(t));
  return hit ? hit[0] : '';
};
// Riga d'intestazione: almeno due colonne riconosciute, di cui una con i numeri (serie, ripetizioni…)
const wHeader = (line) => {
  const cols = line.segs.map(s => ({ kind: wColumnKind(s.text), x: s.x, x2: s.x2, cx: s.cx }));
  const known = cols.filter(c => c.kind);
  if (known.length < 2 || known.length < cols.length - 1) return null;
  if (!known.some(c => ['sets', 'reps', 'sr'].includes(c.kind))) return null;
  return cols;
};
// Colonna di un pezzo di riga: quella con l'intestazione che si sovrappone di più, altrimenti la più vicina
const wColumnOf = (seg, cols) => {
  let best = null, bestScore = -Infinity;
  cols.forEach(c => {
    const overlap = Math.min(seg.x2, c.x2) - Math.max(seg.x, c.x);
    const score = overlap > 0 ? 1000 + overlap : -Math.abs(seg.cx - c.cx);
    if (score > bestScore) { bestScore = score; best = c; }
  });
  return best;
};
const W_EMPTY_CELL = /^[-–—\/.x*]*$|^(libero|corpo libero|cl|bw|n\.?d\.?|max)$/;
const wRowText = (cells) => {
  const v = (k) => (cells[k] || '').trim();
  let out = v('name');
  const sr = v('sr'), sets = v('sets').replace(/\s*serie$/i, ''), reps = v('reps').replace(/\s*(rip(etizioni)?|reps?)$/i, '');
  if (sr) out += ' ' + (/^\d{1,2}\s*$/.test(sr) ? sr + ' serie' : sr);
  else if (/^\d{1,2}$/.test(sets) && reps && !W_EMPTY_CELL.test(wNorm(reps)) || /^\d{1,2}$/.test(sets) && /^max$/i.test(reps)) out += ' ' + sets + 'x' + reps;
  else if (/^\d{1,2}$/.test(sets)) out += ' ' + sets + ' serie';
  else if (reps && /^\d/.test(reps)) out += ' 1x' + reps;
  const weight = v('weight');
  if (weight && !W_EMPTY_CELL.test(wNorm(weight))) {
    const n = /(\d+(?:[.,]\d+)?)/.exec(weight);
    if (n) out += ' ' + n[1] + 'kg';
  }
  const rest = v('rest');
  if (rest && /\d/.test(rest)) out += ' rec ' + (/^\d+$/.test(rest) ? rest + (Number(rest) <= 5 ? ' min' : "''") : rest);
  return out.replace(/\s+/g, ' ').trim();
};
// Righe del lettore PDF/Word (con i pezzi e le loro posizioni) → testo, una riga per esercizio
const workoutLinesToText = (lines) => {
  const out = [];
  let cols = null;
  const cellsOf = (segs) => {
    const cells = {};
    segs.forEach(s => {
      const c = wColumnOf(s, cols);
      const kind = c && c.kind ? c.kind : (c === cols[0] ? 'name' : 'skip');
      cells[kind] = cells[kind] ? cells[kind] + ' ' + s.text : s.text;
    });
    return cells;
  };
  const NUM_COLS = ['sets', 'reps', 'sr', 'weight', 'rest'];
  lines.forEach(line => {
    const segs = line.segs || [];
    const header = segs.length >= 2 ? wHeader(line) : null;
    if (header) { cols = header; return; }
    if (!cols) { out.push({ text: line.text }); return; }
    const cells = cellsOf(segs);
    const hasNumbers = NUM_COLS.some(k => cells[k] && /\d|max/i.test(cells[k]));
    const prev = out[out.length - 1];
    // Cella andata a capo ("Rematore petto" + "appoggiato", "3 x 10 per" + "lato", "...escursione" + "parziale."):
    // pezzi senza numeri che iniziano con la minuscola si attaccano, ognuno alla sua colonna, alla riga sopra
    if (prev && prev.cells && !hasNumbers && segs.every(s => /^[a-zà-ú(]/.test(s.text))) {
      Object.keys(cells).forEach(k => { prev.cells[k] = prev.cells[k] ? prev.cells[k] + ' ' + cells[k] : cells[k]; });
      return;
    }
    // Nessun numero nelle colonne: è un titolo o una nota scritta di traverso, si tiene com'è
    if (segs.length < 2 || !hasNumbers) { out.push({ text: line.text }); return; }
    out.push({ cells });
  });
  return out.map(o => (o.cells ? wRowText(o.cells) : o.text)).join('\n');
};

// ---------------------------------------------------------------
// ABBINAMENTO CON LA LIBRERIA (js/data/exercises.js)
// Il nome scritto dal personal trainer quasi mai è identico a quello della libreria:
// "Leg extension a gamba singola", "LEG EXTENSIONS", "Pressa 45°", "Lat pulldown presa larga".
// Si confrontano le parole importanti (senza articoli, singolare/plurale, italiano/inglese):
//  1) la libreria è contenuta nel nome scritto ("Leg extension" in "Leg extension a gamba singola") → la più specifica
//  2) il nome scritto è contenuto nella libreria ("Panca piana" → "Panca piana con bilanciere") → solo se è una sola
//  3) altrimenti quella con più parole in comune (almeno due)
// Risultato: { item, kind } con kind 'same' (stesso esercizio, si può usare il nome della libreria)
// o 'variant' (è una variante: si tiene il nome scritto, ma consigli e muscoli vengono dalla libreria).
// ---------------------------------------------------------------
const XM_STOP = new Set(['con', 'al', 'ai', 'alla', 'alle', 'allo', 'agli', 'di', 'da', 'e', 'ed', 'il', 'la', 'le', 'lo', 'gli', 'i', 'a', 'ad', 'in', 'su',
  'sul', 'sulla', 'sulle', 'sui', 'sugli', 'del', 'della', 'delle', 'dei', 'degli', 'dal', 'dalla', 'per', 'tra', 'fra', 'o', 'the', 'with', 'of', 'on', 'at', 'to', 'and', 'or',
  'esercizio', 'macchinario', 'attrezzo']);
// Parole che dicono "come" (una gamba, alternato, seduto…): non cambiano l'esercizio, contano poco
const XM_MOD = new Set(['singola', 'singolo', 'singole', 'singoli', 'unilaterale', 'unilaterali', 'mono', 'single', 'one', 'una', 'un', 'uno',
  'alternato', 'alternata', 'alternati', 'alternate', 'alternando', 'alternated', 'unilateral', 'bilaterale', 'leggero', 'pesante', 'controllato',
  'fermo', 'pausa', 'isometria', 'isometrico', 'parziale', 'parziali', 'completo', 'presa', 'neutra', 'normale', 'classico', 'classica', 'variante',
  'sx', 'dx', 'destra', 'sinistra', 'lato', 'side', 'bicipiti', 'tricipiti', 'leggero', 'leggera']);
// Sinonimi → una parola sola (dopo minuscole e senza accenti)
const XM_SYN = {
  abduzione: 'abductor', adduzione: 'adductor', farmer: 'camminata contadino', carry: 'camminata', appoggiato: 'panca inclinata',
  monopodalico: 'una gamba', monopodalica: 'una gamba', monopodalici: 'una gamba',
  estensione: 'extension', estensioni: 'extension', extensions: 'extension', ext: 'extension',
  pressa: 'leg press', 'leg-press': 'leg press', legpress: 'leg press',
  manubrio: 'manubri', dumbbell: 'manubri', dumbbells: 'manubri', db: 'manubri', manubi: 'manubri',
  barbell: 'bilanciere', bb: 'bilanciere', bilancere: 'bilanciere', ez: 'ez', sbarra: 'sbarra',
  cavo: 'cavi', cable: 'cavi', cables: 'cavi', ercolina: 'cavi', croce: 'croci', crossover: 'croci', cross: 'croci', fly: 'croci', flyes: 'croci', flies: 'croci',
  machine: 'macchina', macchine: 'macchina', smith: 'multipower',
  bench: 'panca', chest: 'chest', deadlift: 'stacco', stacchi: 'stacco', romanian: 'rumeno', rdl: 'stacco rumeno', sldl: 'stacco gambe tese',
  row: 'rematore', rowing: 'rematore', rematori: 'rematore', pulldown: 'pulldown', lat: 'lat',
  pullup: 'trazioni', pullups: 'trazioni', trazione: 'trazioni', chinup: 'chin', chinups: 'chin', lunge: 'affondi', lunges: 'affondi', affondo: 'affondi',
  raise: 'alzate', raises: 'alzate', alzata: 'alzate', lateral: 'laterali', laterale: 'laterali', front: 'frontali', frontale: 'frontali', rear: 'posteriori',
  posteriore: 'posteriori', hammer: 'martello', triceps: 'tricipiti', tricep: 'tricipiti', tricipite: 'tricipiti', biceps: 'bicipiti', bicep: 'bicipiti',
  glute: 'glutei', glutes: 'glutei', gluteo: 'glutei', bridge: 'ponte', calves: 'calf', polpacci: 'calf', polpaccio: 'calf',
  pushup: 'piegamenti', pushups: 'piegamenti', piegamento: 'piegamenti', flessioni: 'piegamenti', flessione: 'piegamenti',
  dips: 'dip', crunches: 'crunch', squats: 'squat', curls: 'curl', presses: 'press',
  gambe: 'gamba', legs: 'leg', abductor: 'abductor', abduttori: 'abductor', abduzioni: 'abductor', adductor: 'adductor', adduttori: 'adductor', adduzioni: 'adductor',
  seated: 'seduto', standing: 'piedi', inclinata: 'inclinata', incline: 'inclinata', decline: 'declinata', flat: 'piana',
  shrug: 'scrollate', shrugs: 'scrollate', scrollata: 'scrollate', hyperextension: 'iperestensioni', hyperextensions: 'iperestensioni', iperestensione: 'iperestensioni',
  kickbacks: 'kickback', pushdowns: 'pushdown', facepull: 'face pull', overhead: 'sopra testa', ohp: 'military press', military: 'military',
  goblet: 'goblet', hack: 'hack', thrust: 'thrust', hipthrust: 'hip thrust', peck: 'pectoral', deck: 'pectoral', butterfly: 'pectoral',
  walking: 'camminati', camminato: 'camminati', reverse: 'inverso', inversi: 'inverso', inversa: 'inverso',
  treadmill: 'tapis', tapis: 'tapis', bike: 'cyclette', elliptical: 'ellittica', rower: 'vogatore'
};
// Singolare e plurale insieme: "affondi"/"affondo" → "affond", "manubri" → "manubr"
const xmStem = (w) => (w.length > 4 ? w.replace(/[aeiou]+$/, '') : w).replace(/(?<=.{3})s$/, '');
const xmWords = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/\b(pull|chin|push)\s*-\s*ups?\b/g, '$1up').replace(/\b45\s*°/g, ' ')
  .replace(/\b(push|pull)\s+down\b/g, '$1down').replace(/\blat\s+pulldown\b/g, 'lat machine')
  .split(/[^a-z0-9]+/).filter(w => w && !/^\d+$/.test(w))
  .flatMap(w => (XM_SYN[w] || w).split(' '))
  .filter(w => !XM_STOP.has(w));
const xmTokens = (s) => {
  const core = new Set(), mod = new Set();
  xmWords(s).forEach(w => (XM_MOD.has(w) ? mod : core).add(xmStem(w)));
  return { core, mod };
};
// Attrezzi e dettagli che la libreria aggiunge al nome ("Hip thrust" → "Hip thrust con bilanciere"): non cambiano l'esercizio
const XM_EQUIP = new Set(['bilanciere', 'manubri', 'cavi', 'macchina', 'multipower', 'elastico', 'sbarra', 'parallele', 'corda', 'kettlebell', 'ez', 'terra', 'piedi', 'seduto']
  .map(w => xmStem(w)));
let xmIndexCache = null;
const xmIndex = (library) => {
  if (xmIndexCache && xmIndexCache.library === library) return xmIndexCache;
  const items = library.map((item, i) => ({ item, i, ...xmTokens(item.n) })).filter(x => x.core.size);
  // Peso delle parole: rare (bulgaro, polsi, martello) contano più di quelle comuni (squat, manubri)
  const df = {};
  items.forEach(x => x.core.forEach(t => { df[t] = (df[t] || 0) + 1; }));
  const idf = (t) => Math.log(1 + items.length / (df[t] || 0.5));
  xmIndexCache = { library, items, idf, df };
  return xmIndexCache;
};
const matchExerciseName = (name, library) => {
  if (!name || !Array.isArray(library) || !library.length) return null;
  const key = String(name).trim().toLowerCase();
  const exact = library.find(item => item.n.trim().toLowerCase() === key);
  if (exact) return { item: exact, kind: 'same' };
  const want = xmTokens(name);
  if (!want.core.size) return null;
  const wantAll = new Set([...want.core, ...want.mod]);
  const { items: index, idf, df } = xmIndex(library);
  const covers = (big, small) => [...small].every(t => big.has(t));
  const weight = (list) => [...list].reduce((s, t) => s + idf(t), 0);
  // Stesse parole importanti → stesso esercizio scritto in un altro modo
  const same = index.filter(x => x.core.size === want.core.size && covers(x.core, want.core));
  if (same.length) return { item: same[0].item, kind: covers(new Set([...same[0].core, ...same[0].mod]), want.mod) ? 'same' : 'variant' };
  // 1) La libreria è dentro il nome scritto: la più specifica, poi la prima della libreria
  const inside = index.filter(x => covers(want.core, x.core) && (x.core.size >= 2 || want.core.size <= 2 || idf([...x.core][0]) > 2.5))
    .map(x => ({ x, score: weight(x.core) + [...x.mod].filter(t => wantAll.has(t)).length * 0.5 - [...x.mod].filter(t => !wantAll.has(t)).length * 0.5 }))
    .sort((a, b) => b.score - a.score || a.x.i - b.x.i);
  // ...ma se resta fuori una parola rara, si preferisce l'esercizio che ha anche quella, purché sia lo stesso movimento:
  // "Squat bulgaro con manubri" → Squat bulgaro (non Squat con manubri); "Croci ai cavi alti" resta Croci ai cavi
  if (inside.length) {
    const top = inside[0].x;
    const key = [...top.core].filter(t => !XM_EQUIP.has(t));
    const rare = [...want.core].filter(t => !top.core.has(t) && df[t] > 0 && df[t] <= 2);
    const better = rare.length ? index.filter(x => x !== top && rare.some(t => x.core.has(t)) && key.every(t => x.core.has(t)))
      .map(x => ({ x, w: weight([...want.core].filter(t => x.core.has(t))) })).sort((m, n) => n.w - m.w || m.x.i - n.x.i) : [];
    return { item: (better.length ? better[0].x : top).item, kind: 'variant' };
  }
  // 2) Il nome scritto è dentro la libreria, che aggiunge solo l'attrezzo ("Panca piana" → "… con bilanciere")
  const outside = index.filter(x => covers(x.core, want.core) && [...x.core].every(t => want.core.has(t) || XM_EQUIP.has(t)));
  if (outside.length === 1) return { item: outside[0].item, kind: 'same' };
  if (outside.length > 1) return { item: outside[0].item, kind: 'variant' };
  // 3) Il più simile per parole in comune, pesate per quanto sono rare
  const wantW = weight(want.core);
  const scored = index.map(x => {
    const common = [...want.core].filter(t => x.core.has(t));
    return { x, score: common.length ? weight(common) / Math.sqrt(wantW * weight(x.core)) : 0 };
  }).filter(s => s.score >= 0.5).sort((a, b) => b.score - a.score || a.x.i - b.x.i);
  if (!scored.length) return null;
  const [best, second] = scored;
  // Pari merito tra esercizi di muscoli diversi: meglio non indovinare
  if (second && second.score > best.score - 0.02 && second.x.item.m !== best.x.item.m) return null;
  return { item: best.x.item, kind: 'variant' };
};

// File → testo (riga per riga). PDF e Word usano i lettori dell'import della dieta.
const workoutFileKind = (file) => {
  const name = String(file.name || '').toLowerCase();
  if (/\.(txt|md|text|csv)$/.test(name) || /^text\//.test(file.type || '')) return 'txt';
  if (/\.rtf$/.test(name)) return 'rtf';
  const k = typeof dietFileKind === 'function' ? dietFileKind(file) : '';
  return k;
};
const readWorkoutFileText = async (file) => {
  const kind = workoutFileKind(file);
  if (file.size > IMPORT_MAX_BYTES) return { error: 'big' };
  if (kind === 'txt') return { text: await file.text() };
  if (kind === 'rtf') {
    // RTF semplice: via i comandi, restano le parole
    const raw = await file.text();
    return { text: raw.replace(/\\par[d]?/g, '\n').replace(/\{\\[^{}]*\}/g, '').replace(/\\[a-z]+-?\d* ?/g, '').replace(/[{}]/g, '') };
  }
  if (kind === 'doc') return { error: 'doc' };
  if (kind !== 'pdf' && kind !== 'docx') return { error: 'type' };
  const pages = kind === 'pdf' ? await readPdfPages(file) : await readDocxPages(file);
  // Ogni pagina a sé: le colonne di una tabella valgono fino alla pagina dopo
  const text = pages.map(p => workoutLinesToText(pdfLines(p.items))).join('\n');
  if (text.replace(/\s/g, '').length < 10) return { error: kind === 'pdf' ? 'scan' : 'empty' };
  return { text };
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { parseWorkoutText, wParseLine, wDayName, workoutLinesToText, matchExerciseName };
}
