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
// Funzioni pure (niente accesso ai dati dell'app); i file si leggono con le funzioni di js/import/diet-pdf.js.
// ---------------------------------------------------------------

const wNorm = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[’`]/g, "'").replace(/[×]/g, 'x').replace(/\s+/g, ' ').trim();

const W_WEEKDAYS = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
const W_WEEKDAY_NAMES = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
const W_DAY_WORDS = /^(giorno|giornata|day|allenamento|workout|seduta|sessione|scheda|wod)\s*(n\.?|nr\.?|numero)?\s*([a-z]|\d{1,2})\b/;
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
  const R = "(max|\\d+(?:\\s*[-–/]\\s*\\d+)*(?:\\s*(?:s|sec|secondi|''|\"|min|per (?:lato|gamba|braccio)))?)";
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
    let duration = '';
    const isCardio = !sr.sets && W_CARDIO_WORDS.test(t);
    if (isCardio) { const mm = wTakeMinutes(t); duration = mm.duration; t = mm.text; }
    // Il nome si prende dal testo originale (maiuscole e accenti) togliendo i pezzi numerici riconosciuti
    const name = wCleanName(wNameFrom(original, t));
    return { name: wCap(name), sets: sr.sets, reps: sr.reps, weight: w.weight, rest: r.rest, duration, cardio: isCardio, superset };
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
    if (keep.has(n) && !/^\d/.test(n)) { out.push(wd); return; }
    // Al primo numero riconosciuto (serie, peso…) il nome finisce, se ha già almeno una parola
    if (/\d/.test(n) && out.join('').trim()) stop = true;
  });
  return out.join('').trim() || cleaned;
};

// Righe con soli numeri ("4x8 60kg rec 90"): vanno all'esercizio sopra
const wOnlyNumbers = (ex) => !ex.name || /^(x|rip|reps?|serie|kg)?$/i.test(ex.name);

const parseWorkoutText = (text, fileName = '') => {
  const lines = String(text || '').replace(/\r/g, '').split('\n').map(l => l.replace(/\t+/g, ' ').trim());
  const days = [];
  let day = null;
  let ssCount = 0, ssOpen = null;
  let title = '';
  // Titolo in prima riga ("Scheda Palestra Ottobre", "Il mio programma"): senza numeri,
  // e la riga piena dopo è un giorno oppure inizia con scheda/programma/allenamento
  const filled = lines.map((l, i) => [l, i]).filter(([l]) => l && !/^[-=_*~.\s]+$/.test(l));
  let titleIdx = -1;
  if (filled.length > 1) {
    const [first, i0] = filled[0];
    const f = wNorm(first);
    const looksTitle = !/\d+\s*[x×*]\s*\d|\d+\s*(kg|min|serie|rip)/.test(f) && first.length <= 50;
    if (looksTitle && !wDayName(first) && (/^(scheda|programma|allenamento|workout|piano|il mio|la mia)/.test(f) || wDayName(filled[1][0]))) {
      title = first.replace(/[:.]+$/, '').trim();
      titleIdx = i0;
    }
  }
  const ensureDay = () => {
    if (!day) { day = { name: 'Giorno ' + String.fromCharCode(65 + days.length), exercises: [] }; days.push(day); }
    return day;
  };
  lines.forEach((line, idx) => {
    if (idx === titleIdx) return;
    if (!line || /^[-=_*~.\s]+$/.test(line)) { ssOpen = null; return; }
    const n = wNorm(line);
    if (W_SKIP.test(n) && !/\d+\s*x\s*\d/.test(n)) {
      if (!title && idx < 3 && /^scheda/.test(n)) title = line.replace(/[:.]+$/, '').trim();
      return;
    }
    if (line.length > 90 && !/\d+\s*[x×*]\s*\d/.test(line)) return;   // note lunghe
    const dayName = wDayName(line);
    if (dayName) {
      // Il primo titolo senza esercizi prima e senza parole da giorno può essere il nome della scheda
      day = { name: dayName.slice(0, 30), exercises: [] };
      days.push(day);
      ssOpen = null;
      return;
    }
    const parsed = wParseLine(line);
    if (!parsed.length) return;
    const d = ensureDay();
    const prev = d.exercises[d.exercises.length - 1];
    if (parsed.length === 1 && wOnlyNumbers(parsed[0]) && prev) {
      const p = parsed[0];
      if (!prev.sets && p.sets) { prev.sets = p.sets; prev.reps = p.reps; }
      if (!prev.weight && p.weight) prev.weight = p.weight;
      if (!prev.rest && p.rest) prev.rest = p.rest;
      if (!prev.duration && p.duration) prev.duration = p.duration;
      return;
    }
    const valid = parsed.filter(p => p.name && /[a-zà-ú]/i.test(p.name) && p.name.length <= 60);
    if (!valid.length) return;
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
  return { name, days: kept, exercises, withNumbers: kept.reduce((s, dd) => s + dd.exercises.filter(e => e.sets || e.duration).length, 0) };
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
  if (kind === 'txt') return { text: await file.text() };
  if (kind === 'rtf') {
    // RTF semplice: via i comandi, restano le parole
    const raw = await file.text();
    return { text: raw.replace(/\\par[d]?/g, '\n').replace(/\{\\[^{}]*\}/g, '').replace(/\\[a-z]+-?\d* ?/g, '').replace(/[{}]/g, '') };
  }
  if (kind === 'doc') return { error: 'doc' };
  if (kind !== 'pdf' && kind !== 'docx') return { error: 'type' };
  const pages = kind === 'pdf' ? await readPdfPages(file) : await readDocxPages(file);
  const text = pages.map(p => pdfLines(p.items).map(l => l.text).join('\n')).join('\n');
  if (text.replace(/\s/g, '').length < 10) return { error: kind === 'pdf' ? 'scan' : 'empty' };
  return { text };
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { parseWorkoutText, wParseLine, wDayName };
}
