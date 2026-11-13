// Stima automatica di calorie e proteine dal testo degli alimenti (es. "80g pasta", "2 uova", "1 cucchiaio di olio").
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

const findFoodEntry = (text) => {
  const t = ' ' + normFood(text) + ' ';
  return FOOD_INDEX.find(entry => t.includes(entry.name)) || null;
};
const findFood = (text) => {
  const hit = findFoodEntry(text);
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

// Calorie e proteine di un alimento scritto a testo: { kcal, protein, grams, food } oppure null se non riconosciuto
const estimateFoodKcal = (text, guess = false) => {
  // Con le alternative ("pasta oppure riso") si considera la prima
  const first = String(text || '').split(/\s+oppure\s+|\s+in alternativa\s+|\//i)[0];
  if (!normFood(first)) return null;
  const food = findFood(first);
  if (!food) return null;
  if (food.k === 0) return { kcal: 0, protein: 0, grams: 0, food };   // caffè, spezie, aceto…
  // La quantità può stare dopo l'alternativa: "pasta oppure riso 80g"
  let grams = foodGrams(first, food);
  if (grams === null && first !== String(text)) grams = foodGrams(text, food);
  // Nel diario la quantità spesso non c'è: porzione tipica (un cucchiaio di miele, 70 g di muesli…)
  let guessed = false;
  if (grams === null && guess) {
    grams = food.cu ? food.cu * (food.k >= 500 ? 1 : 2) : food.k >= 500 ? 20 : food.k >= 300 ? 80 : 120;
    guessed = true;
  }
  if (grams === null) return null;
  return {
    kcal: Math.round((food.k * grams) / 100),
    protein: Math.round(((food.p || 0) * grams) / 100 * 10) / 10,
    grams: Math.round(grams),
    guessed,
    food
  };
};

// Somma di un pasto: { kcal, protein, found, total } (kcal e protein null se nessun alimento è riconosciuto)
const estimateMealKcal = (items) => {
  const list = (items || []).map(i => String(i || '').trim()).filter(Boolean);
  let kcal = 0, protein = 0, found = 0;
  list.forEach(item => {
    const e = estimateFoodKcal(item);
    if (e) { kcal += e.kcal; protein += e.protein; found++; }
  });
  return {
    kcal: found ? Math.round(kcal / 5) * 5 : null,
    protein: found ? Math.round(protein) : null,
    found, total: list.length
  };
};

// Diario: una frase libera ("pasta al pomodoro, 2 arancini e una birra") divisa in alimenti.
// Si divide su virgole e a capo; "e" / "con" dividono solo se non fanno parte del nome di un piatto
// ("pasta e fagioli", "panino con prosciutto" restano interi, "riso e pollo" diventa riso + pollo).
// Restituisce { items: [{ text, kcal, protein, known }], kcal, protein, unknown }
const splitFoodText = (text) => {
  const out = [];
  String(text || '').split(/[\n,;+]|\s+-\s+/).map(s => s.trim()).filter(Boolean).forEach(chunk => {
    const parts = chunk.split(/\s+(?:e|ed|con|piu|più|poi|insieme a)\s+/i).map(s => s.trim()).filter(Boolean);
    if (parts.length < 2) { out.push(chunk); return; }
    const whole = findFoodEntry(chunk);
    if (whole && /\s(e|ed|con)\s/.test(whole.name)) { out.push(chunk); return; }
    // Le parti che da sole non dicono niente ("e basta") si riattaccano a quella prima
    parts.forEach(part => {
      if (!findFoodEntry(part) && out.length && !/\d/.test(part) && part.split(' ').length <= 2) out[out.length - 1] += ' ' + part;
      else out.push(part);
    });
  });
  return out;
};
const estimateFoodText = (text) => {
  const items = splitFoodText(text).map(part => {
    const e = estimateFoodKcal(part, true);
    return { text: part, kcal: e ? e.kcal : null, protein: e ? e.protein : null, known: !!e, guessed: !!(e && e.guessed) };
  });
  const known = items.filter(i => i.known);
  return {
    items,
    kcal: known.length ? Math.round(known.reduce((s, i) => s + i.kcal, 0) / 5) * 5 : null,
    protein: known.length ? Math.round(known.reduce((s, i) => s + i.protein, 0)) : null,
    unknown: items.length - known.length
  };
};
