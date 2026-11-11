// Stima automatica delle calorie dal testo degli alimenti (es. "80g pasta", "2 uova", "1 cucchiaio di olio").
// Usa la tabella FOODS di js/data/foods.js. Funzioni pure: nessun accesso ai dati dell'app.

// Testo semplificato: minuscolo, senza accenti e punteggiatura (l'apostrofo diventa spazio)
const normFood = (text) => String(text || '').toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[’'`]/g, ' ')
  .replace(/(\d),(\d)/g, '$1.$2')
  .replace(/[^a-z0-9.%/ ]+/g, ' ')
  .replace(/%/g, ' ')
  .replace(/\s+/g, ' ').trim();

// Indice dei nomi (dal più lungo al più corto: "pasta integrale" vince su "pasta")
const FOOD_INDEX = (() => {
  const list = [];
  (typeof FOODS !== 'undefined' ? FOODS : []).forEach(food => {
    food.n.forEach(name => list.push({ name: ' ' + normFood(name) + ' ', food }));
  });
  return list.sort((a, b) => b.name.length - a.name.length);
})();

const findFood = (text) => {
  const t = ' ' + normFood(text) + ' ';
  const hit = FOOD_INDEX.find(entry => t.includes(entry.name));
  return hit ? hit.food : null;
};

const WORD_NUMBERS = { un: 1, uno: 1, una: 1, mezzo: 0.5, mezza: 0.5, due: 2, tre: 3, quattro: 4, cinque: 5, sei: 6, };

// Grammi indicati nel testo di un alimento; null se non si capisce
const foodGrams = (text, food) => {
  const t = normFood(text);
  let m;
  // Peso esplicito: 80g, 80 gr, 80 grammi, 1.5 kg, 200 ml, 2 dl, 1 l
  if ((m = /(\d+(?:\.\d+)?)\s*(kg|g|gr|grammi|grammo|gramm)\b/.exec(t))) return parseFloat(m[1]) * (m[2] === 'kg' ? 1000 : 1);
  if ((m = /(\d+(?:\.\d+)?)\s*(ml|cl|dl|l|lt|litri|litro)\b/.exec(t))) return parseFloat(m[1]) * ({ ml: 1, cl: 10, dl: 100 }[m[2]] || 1000);
  // Quantità a parole o in numero prima dell'unità
  const qty = (s) => (s === undefined || s === '' ? 1 : (WORD_NUMBERS[s] !== undefined ? WORD_NUMBERS[s] : parseFloat(s)));
  const Q = '(\\d+(?:\\.\\d+)?|un|uno|una|mezzo|mezza|due|tre|quattro|cinque|sei)?\\s*';
  if ((m = new RegExp(Q + '(cucchiaini|cucchiaino)\\b').exec(t))) return qty(m[1]) * ((food && food.cuo) || 5);
  if ((m = new RegExp(Q + '(cucchiai|cucchiaio)\\b').exec(t))) return qty(m[1]) * ((food && food.cu) || 10);
  if ((m = new RegExp(Q + '(fette|fetta|fettine|fettina)\\b').exec(t))) return qty(m[1]) * ((food && (food.fetta || food.pz)) || 30);
  if ((m = new RegExp(Q + '(vasetti|vasetto|vasetto da)\\b').exec(t))) return qty(m[1]) * ((food && food.pz) || 125);
  if ((m = new RegExp(Q + '(tazze|tazza|bicchieri|bicchiere)\\b').exec(t))) return qty(m[1]) * 200;
  if ((m = new RegExp(Q + '(misurini|misurino|scoop)\\b').exec(t))) return qty(m[1]) * 30;
  if ((m = new RegExp(Q + '(pugni|pugno|manciata|manciate)\\b').exec(t))) return qty(m[1]) * 30;
  if ((m = new RegExp(Q + '(quadratini|quadratino)\\b').exec(t))) return qty(m[1]) * 10;
  // Numero da solo: pezzi se l'alimento si conta (uova, frutti…), altrimenti grammi
  if ((m = /(?:^|\s)(\d+(?:\.\d+)?)(?:\s|$)/.exec(t))) {
    const n = parseFloat(m[1]);
    if (food && food.pz && n > 0 && n <= 12) return n * food.pz;
    if (n >= 5) return n;
  }
  if ((m = /(?:^|\s)(un|uno|una|mezzo|mezza|due|tre|quattro|cinque|sei)\s/.exec(t + ' ')) && food && food.pz) return qty(m[1]) * food.pz;
  // Niente quantità: porzione tipica (un frutto, un'insalata…)
  if (food && food.def) return food.def;
  if (food && food.pz && food.pz >= 20) return food.pz;
  return null;
};

// Calorie di un alimento scritto a testo: { kcal, food } oppure null se non riconosciuto
const estimateFoodKcal = (text) => {
  // Con le alternative ("pasta oppure riso") si considera la prima
  const first = String(text || '').split(/\s+oppure\s+|\s+in alternativa\s+|\//i)[0];
  if (!normFood(first)) return null;
  const food = findFood(first);
  if (!food) return null;
  if (food.k === 0) return { kcal: 0, grams: 0, food };   // caffè, spezie, aceto…
  const grams = foodGrams(first, food);
  if (grams === null) return null;
  return { kcal: Math.round((food.k * grams) / 100), grams: Math.round(grams), food };
};

// Somma di un pasto: { kcal, found, total } (kcal null se nessun alimento è riconosciuto)
const estimateMealKcal = (items) => {
  const list = (items || []).map(i => String(i || '').trim()).filter(Boolean);
  let kcal = 0, found = 0;
  list.forEach(item => {
    const e = estimateFoodKcal(item);
    if (e) { kcal += e.kcal; found++; }
  });
  return { kcal: found ? Math.round(kcal / 5) * 5 : null, found, total: list.length };
};
