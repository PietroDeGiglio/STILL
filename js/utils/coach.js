// Calcoli "da coach" di STILL, solo funzioni pure (la parte che usa i dati dell'utente è in app.js):
// - consumo calorico reale ricavato da quello che mangi e da come cambia il peso (calorie adattive)
// - recupero dei muscoli dopo gli allenamenti, per consigliare cosa allenare oggi
// - mappa del corpo colorata (muscoli riposati / stanchi, o quanto li hai allenati in settimana)
// - attività dei giorni leggeri (bastano 10 minuti per non perdere la serie)

const coachDayDiff = (a, b) => Math.round((Date.parse(b + 'T12:00:00') - Date.parse(a + 'T12:00:00')) / 86400000);

// ---------------------------------------------------------------
// CONSUMO REALE (calorie adattive)
// Se in 3 settimane mangi in media 2000 kcal e perdi mezzo chilo, il tuo consumo è più alto di 2000:
// consumo = calorie medie mangiate − variazione del peso × 7700 kcal/kg.
// Con pochi dati il risultato si avvicina alla formula; più giorni segni, più conta il dato reale.
// ---------------------------------------------------------------
const ADAPTIVE_MIN_DAYS = 10;     // giornate segnate per intero (con tutti i pasti)
const ADAPTIVE_MIN_SPAN = 10;     // giorni tra la prima e l'ultima pesata
const KCAL_PER_KG = 7700;

// days: [{ date, kcal }] giornate complete · weights: [{ date, weight }] · formula: fabbisogno stimato (kcal)
const adaptiveExpenditure = ({ days, weights, formula }) => {
  const ws = (weights || []).filter(w => w && w.weight > 0).sort((a, b) => a.date.localeCompare(b.date));
  const span = ws.length >= 2 ? coachDayDiff(ws[0].date, ws[ws.length - 1].date) : 0;
  const status = {
    days: days.length, weighIns: ws.length, span,
    needDays: Math.max(0, ADAPTIVE_MIN_DAYS - days.length),
    needWeighIns: Math.max(0, 2 - ws.length),
    needSpan: ws.length >= 2 ? Math.max(0, ADAPTIVE_MIN_SPAN - span) : ADAPTIVE_MIN_SPAN
  };
  if (status.needDays || status.needWeighIns || status.needSpan) {
    const parts = [Math.min(1, days.length / ADAPTIVE_MIN_DAYS), Math.min(1, ws.length / 2), ws.length >= 2 ? Math.min(1, span / ADAPTIVE_MIN_SPAN) : 0];
    return { ready: false, ...status, progress: Math.round(parts.reduce((s, v) => s + v, 0) / parts.length * 100) };
  }
  // Andamento del peso: retta che passa meglio tra tutte le pesate (una pesata "storta" pesa poco)
  const xs = ws.map(w => coachDayDiff(ws[0].date, w.date));
  const ys = ws.map(w => Number(w.weight));
  const mx = xs.reduce((s, v) => s + v, 0) / xs.length;
  const my = ys.reduce((s, v) => s + v, 0) / ys.length;
  let num = 0, den = 0;
  xs.forEach((x, i) => { num += (x - mx) * (ys[i] - my); den += (x - mx) * (x - mx); });
  const slope = den ? num / den : 0;                    // kg al giorno
  const avgIntake = days.reduce((s, d) => s + d.kcal, 0) / days.length;
  const raw = avgIntake - slope * KCAL_PER_KG;
  const confidence = Math.min(1, days.length / 21) * Math.min(1, span / 21);
  // Mangiato molto meno del previsto ma il peso scende poco: probabilmente non tutto viene segnato
  // (condimenti, bevande, assaggi). In quel caso il dato reale conta meno e l'app lo dice.
  const suspicious = !!formula && raw < formula * 0.75;
  const trust = suspicious ? 0.4 : 0.5 + 0.5 * confidence;   // quanto conta il dato reale rispetto alla formula
  let tdee = formula ? formula + (raw - formula) * trust : raw;
  tdee = Math.max(1200, Math.min(5000, tdee));
  tdee = Math.round(tdee / 10) * 10;
  return {
    ready: true, ...status,
    tdee, raw: Math.round(raw), avgIntake: Math.round(avgIntake), perWeek: slope * 7,
    confidence: suspicious ? confidence * 0.4 : confidence, diff: formula ? tdee - formula : 0, suspicious
  };
};

// ---------------------------------------------------------------
// RECUPERO DEI MUSCOLI
// Dopo un allenamento un muscolo ha bisogno di ~48 ore (piccoli) o ~72 ore (grandi) per essere pronto.
// ---------------------------------------------------------------
const MUSCLE_GROUP_OF = {
  petto: 'petto', dorsali: 'schiena', trapezio: 'schiena', lombari: 'schiena',
  spalle: 'spalle', 'spalle-post': 'spalle', bicipiti: 'braccia', tricipiti: 'braccia', avambracci: 'braccia',
  quadricipiti: 'gambe', femorali: 'gambe', polpacci: 'gambe', adduttori: 'gambe', glutei: 'glutei', addome: 'addome', obliqui: 'addome'
};
const MUSCLE_RECOVERY_HOURS = { petto: 72, dorsali: 72, lombari: 72, quadricipiti: 72, femorali: 72, glutei: 72 };
const recoveryHoursFor = (muscle) => MUSCLE_RECOVERY_HOURS[muscle] || 48;

// Muscoli che lavorano di più negli sport (per chi segna partite e allenamenti di squadra)
const SPORT_MUSCLES = {
  Calcio: ['quadricipiti', 'femorali', 'polpacci', 'glutei', 'adduttori'],
  Corsa: ['quadricipiti', 'femorali', 'polpacci', 'glutei'],
  Ciclismo: ['quadricipiti', 'glutei', 'polpacci'],
  Basket: ['quadricipiti', 'polpacci', 'glutei'],
  Pallavolo: ['quadricipiti', 'polpacci', 'spalle'],
  Tennis: ['quadricipiti', 'polpacci', 'spalle', 'obliqui'],
  Padel: ['quadricipiti', 'polpacci', 'spalle', 'obliqui'],
  Rugby: ['quadricipiti', 'femorali', 'glutei', 'spalle', 'trapezio'],
  Nuoto: ['dorsali', 'spalle', 'tricipiti'],
  Boxe: ['spalle', 'addome', 'obliqui', 'polpacci'],
  Lotta: ['dorsali', 'trapezio', 'avambracci', 'addome', 'quadricipiti'],
  'Arti marziali': ['quadricipiti', 'glutei', 'addome', 'spalle']
};

// events: [{ time (ms), primary: [...], secondary: [...] }] → stanchezza 0..1 per muscolo
const muscleFatigue = (events, now) => {
  const out = {};
  Object.keys(MUSCLE_GROUP_OF).forEach(m => { out[m] = 0; });
  events.forEach(ev => {
    const hours = (now - ev.time) / 3600000;
    if (hours < 0) return;
    const hit = (m, weight) => {
      if (!(m in out)) return;
      const f = Math.max(0, 1 - hours / recoveryHoursFor(m)) * weight;
      out[m] = Math.max(out[m], f);
    };
    (ev.primary || []).forEach(m => hit(m, 1));
    (ev.secondary || []).forEach(m => hit(m, 0.5));
  });
  return out;
};
// Ore che mancano perché il muscolo torni pronto (stanchezza sotto il 20%)
const muscleReadyIn = (fatigue, muscle) => Math.max(0, Math.ceil((fatigue - 0.2) * recoveryHoursFor(muscle)));

// ---------------------------------------------------------------
// MAPPA DEL CORPO COLORATA (disegno di bodyMapSvg in exercise-art.js)
// colors: { muscolo: '#colore' }. Con inline: true è un'immagine a sé (per le storie): niente classi CSS.
// opts.sex 'F' = figura femminile
// ---------------------------------------------------------------
const muscleColorSvg = (colors, opts = {}) => {
  const labels = opts.labels === false ? null : BODY_LABELS;
  if (!opts.inline) {
    return bodyMapSvg({ ...BODY_CSS, sex: opts.sex, labels, cls: 'muscle-map',
      paint: (m) => (colors[m] ? `fill="${colors[m]}"` : 'class="mm-m"') });
  }
  return bodyMapSvg({
    sex: opts.sex, size: opts.size, labels,
    base: `fill="${opts.base}"`, hair: `fill="${opts.hair || opts.base}"`,
    line: `stroke="${opts.line || opts.label}" stroke-width="3" stroke-opacity=".45"`,
    labelAttr: `font-size="64" font-weight="700" font-family="sans-serif" fill="${opts.label}"`,
    paint: (m) => `fill="${colors[m] || opts.empty}"`
  });
};
// Pronto (verde) → in recupero (giallo) → stanco (rosso)
const fatigueColor = (f) => (f < 0.2 ? '#20C997' : f < 0.55 ? '#F5C042' : '#EF6B5B');
// Quanto è stato allenato in settimana: da arancio chiaro a arancio scuro
const volumeColor = (k) => (k <= 0 ? null : k < 0.34 ? '#FBD38D' : k < 0.67 ? '#F5A623' : '#E8590C');

// ---------------------------------------------------------------
// GIORNI LEGGERI: anche 10 minuti contano per la serie
// ---------------------------------------------------------------
const LIGHT_ACTIVITIES = [
  { id: 'walk', icon: '🚶', label: 'Camminata' },
  { id: 'stretch', icon: '🧘', label: 'Stretching' },
  { id: 'mobility', icon: '🤸', label: 'Mobilità' },
  { id: 'stairs', icon: '🪜', label: 'Scale' },
  { id: 'bike', icon: '🚲', label: 'Bici tranquilla' },
  { id: 'dance', icon: '💃', label: 'Ballo' },
  { id: 'yoga', icon: '🕉️', label: 'Yoga' },
  { id: 'other', icon: '✨', label: 'Altro' }
];
const LIGHT_MINUTES = [10, 15, 20, 30, 45];

if (typeof module !== 'undefined') {
  module.exports = { adaptiveExpenditure, muscleFatigue, muscleReadyIn, MUSCLE_GROUP_OF, SPORT_MUSCLES, coachDayDiff };
}
