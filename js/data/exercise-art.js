// Immagini dimostrative degli esercizi: omino animato che fa il movimento + mappa del corpo
// con i muscoli allenati evidenziati (principali pieni, secondari più chiari).
// Tutto in SVG generato qui, niente immagini esterne. Usato da app.js (GUIDA ESERCIZI).

// --- Muscoli (mappa fronte / retro, viewBox 0 0 120 104) ---
const MUSCLE_NAMES = {
  petto: 'Petto', spalle: 'Spalle', 'spalle-post': 'Spalle (dietro)', bicipiti: 'Bicipiti', tricipiti: 'Tricipiti',
  avambracci: 'Avambracci', addome: 'Addome', obliqui: 'Obliqui', trapezio: 'Trapezio', dorsali: 'Dorsali',
  lombari: 'Lombari', glutei: 'Glutei', quadricipiti: 'Quadricipiti', femorali: 'Femorali', adduttori: 'Adduttori', polpacci: 'Polpacci'
};

// Ogni muscolo: forme (ellissi [cx, cy, rx, ry, rotazione] o path 'd') sulle due figure
const MUSCLE_SHAPES = {
  // Fronte (figura centrata in x = 30)
  spalle: [[17.5, 23, 4.6, 4, -20], [42.5, 23, 4.6, 4, 20], [77.5, 23, 3.6, 3.6, 0], [102.5, 23, 3.6, 3.6, 0]],
  petto: [[25.2, 28, 5.6, 4.4, 8], [34.8, 28, 5.6, 4.4, -8]],
  bicipiti: [[15, 33, 2.8, 6, 12], [45, 33, 2.8, 6, -12]],
  avambracci: [[12, 47, 2.4, 7, 10], [48, 47, 2.4, 7, -10], [72, 47, 2.4, 7, 10], [108, 47, 2.4, 7, -10]],
  addome: ['M26.5 33.5 h7 a1.5 1.5 0 0 1 1.5 1.5 v14 a3 3 0 0 1 -3 3 h-4 a3 3 0 0 1 -3 -3 v-14 a1.5 1.5 0 0 1 1.5 -1.5z'],
  obliqui: [[22.6, 42, 2.1, 6.5, 6], [37.4, 42, 2.1, 6.5, -6]],
  quadricipiti: [[25, 67, 4.7, 12.5, 4], [35, 67, 4.7, 12.5, -4]],
  adduttori: [[28.6, 62, 1.5, 6.5, 0], [31.4, 62, 1.5, 6.5, 0]],
  polpacci: [[24.6, 89, 2.6, 7.5, 0], [35.4, 89, 2.6, 7.5, 0], [84.6, 88, 3.4, 8, 0], [95.4, 88, 3.4, 8, 0]],
  // Retro (figura centrata in x = 90)
  trapezio: ['M84 18.5 L96 18.5 L93.5 27 L90 31 L86.5 27Z'],
  'spalle-post': [[77.5, 23, 4.6, 4, -20], [102.5, 23, 4.6, 4, 20]],
  dorsali: [[83.2, 36, 4.8, 9, 14], [96.8, 36, 4.8, 9, -14]],
  tricipiti: [[75, 33, 2.8, 6, 12], [105, 33, 2.8, 6, -12]],
  lombari: [[90, 47, 5, 3.8, 0]],
  glutei: [[85.3, 57, 5.4, 5, 0], [94.7, 57, 5.4, 5, 0]],
  femorali: [[85, 71, 4.5, 10, 3], [95, 71, 4.5, 10, -3]]
};

// Sagoma di base (una per lato), disegnata sotto i muscoli
const bodySilhouette = (cx) => {
  const x = (v) => cx + v;
  return `<circle cx="${cx}" cy="10" r="6"/>` +
    `<rect x="${x(-2.2)}" y="15" width="4.4" height="5" rx="1.5"/>` +
    `<path d="M${x(-13.5)} 20 Q${cx} 17.5 ${x(13.5)} 20 L${x(11)} 36 L${x(8)} 53 L${x(-8)} 53 L${x(-11)} 36Z"/>` +
    `<ellipse cx="${x(-15)}" cy="33" rx="3.6" ry="9" transform="rotate(12 ${x(-15)} 33)"/><ellipse cx="${x(15)}" cy="33" rx="3.6" ry="9" transform="rotate(-12 ${x(15)} 33)"/>` +
    `<ellipse cx="${x(-18)}" cy="48" rx="3" ry="8.5" transform="rotate(10 ${x(-18)} 48)"/><ellipse cx="${x(18)}" cy="48" rx="3" ry="8.5" transform="rotate(-10 ${x(18)} 48)"/>` +
    `<circle cx="${x(-19.5)}" cy="58" r="2.4"/><circle cx="${x(19.5)}" cy="58" r="2.4"/>` +
    `<path d="M${x(-8.5)} 51 L${x(8.5)} 51 L${x(9.5)} 60 L${x(-9.5)} 60Z"/>` +
    `<ellipse cx="${x(-5)}" cy="68" rx="5.2" ry="14"/><ellipse cx="${x(5)}" cy="68" rx="5.2" ry="14"/>` +
    `<ellipse cx="${x(-5.4)}" cy="89" rx="3.6" ry="10"/><ellipse cx="${x(5.4)}" cy="89" rx="3.6" ry="10"/>` +
    `<ellipse cx="${x(-6)}" cy="100" rx="3.6" ry="1.8"/><ellipse cx="${x(6)}" cy="100" rx="3.6" ry="1.8"/>`;
};

const muscleShape = (sh) => (typeof sh === 'string'
  ? `<path d="${sh}"/>`
  : `<ellipse cx="${sh[0]}" cy="${sh[1]}" rx="${sh[2]}" ry="${sh[3]}"${sh[4] ? ` transform="rotate(${sh[4]} ${sh[0]} ${sh[1]})"` : ''}/>`);

// Mappa dei muscoli: primary e secondary sono liste di id di MUSCLE_SHAPES
const muscleMapSvg = (primary = [], secondary = []) => {
  const groups = Object.keys(MUSCLE_SHAPES).map(id => {
    const cls = primary.includes(id) ? 'mm-on' : secondary.includes(id) ? 'mm-sec' : 'mm-m';
    return `<g class="${cls}">${MUSCLE_SHAPES[id].map(muscleShape).join('')}</g>`;
  }).join('');
  return `<svg viewBox="0 0 120 104" xmlns="http://www.w3.org/2000/svg" class="muscle-map">` +
    `<g class="mm-base">${bodySilhouette(30)}${bodySilhouette(90)}</g>${groups}` +
    `<text x="30" y="104" text-anchor="middle" class="mm-label">davanti</text><text x="90" y="104" text-anchor="middle" class="mm-label">dietro</text></svg>`;
};

// --- Omino animato (viewBox 0 0 100 100, pavimento a y = 98) ---
// Giunti: h testa · n spalle · p bacino · k1/f1 ginocchio/piede avanti · k2/f2 dietro · e1/w1 gomito/polso avanti · e2/w2 dietro
// Ogni movimento ha due pose (a, b) e l'omino va avanti e indietro tra le due.
// Se k2/f2/e2/w2 mancano, l'arto dietro è uguale a quello avanti (vista di lato).
const POSE_STAND = { h: [50, 15], n: [50, 25], p: [50, 55], k1: [51, 76], f1: [50, 97], e1: [51, 40], w1: [52, 54] };
const eaPose = (over) => ({ ...POSE_STAND, ...over });

const EXERCISE_PATTERNS = {
  squat: { eq: 'bar-back', a: eaPose({ e1: [42, 30], w1: [47, 25] }), b: eaPose({ h: [55, 37], n: [50, 45], p: [36, 70], k1: [57, 73], f1: [51, 97], e1: [41, 50], w1: [46, 44] }) },
  'squat-free': { a: eaPose({ e1: [55, 38], w1: [64, 34] }), b: eaPose({ h: [55, 37], n: [50, 45], p: [36, 70], k1: [57, 73], f1: [51, 97], e1: [60, 48], w1: [70, 45] }) },
  'leg-press': { eq: 'legpress', a: { h: [24, 52], n: [30, 58], p: [44, 76], k1: [56, 58], f1: [72, 52], e1: [36, 70], w1: [42, 74] }, b: { h: [24, 52], n: [30, 58], p: [44, 76], k1: [66, 62], f1: [86, 50], e1: [36, 70], w1: [42, 74] } },
  hinge: { eq: 'bar-hands', a: eaPose({ e1: [50, 40], w1: [50, 56] }), b: eaPose({ h: [74, 44], n: [66, 48], p: [40, 56], k1: [48, 76], f1: [48, 97], e1: [66, 62], w1: [65, 76] }) },
  deadlift: { eq: 'bar-hands', a: eaPose({ e1: [50, 40], w1: [50, 56] }), b: eaPose({ h: [72, 52], n: [65, 56], p: [40, 64], k1: [58, 78], f1: [50, 97], e1: [64, 72], w1: [63, 86] }) },
  lunge: { eq: 'db', a: eaPose({ e1: [50, 40], w1: [50, 54] }), b: eaPose({ h: [50, 34], n: [50, 44], p: [50, 72], k1: [66, 76], f1: [66, 97], k2: [40, 92], f2: [28, 97], e1: [50, 58], w1: [50, 72] }) },
  'step-up': { eq: 'box', a: eaPose({ k1: [62, 72], f1: [64, 82], e1: [50, 40], w1: [50, 54] }), b: eaPose({ h: [58, 4], n: [58, 14], p: [58, 44], k1: [61, 63], f1: [64, 82], k2: [52, 64], f2: [48, 84], e1: [58, 29], w1: [58, 43] }) },
  'leg-ext': { eq: 'seat', a: { h: [40, 18], n: [40, 28], p: [42, 58], k1: [62, 60], f1: [62, 88], e1: [44, 44], w1: [48, 58] }, b: { h: [40, 18], n: [40, 28], p: [42, 58], k1: [62, 60], f1: [86, 54], e1: [44, 44], w1: [48, 58] } },
  'leg-curl': { eq: 'bench-low', a: { h: [84, 70], n: [76, 72], p: [50, 72], k1: [28, 72], f1: [8, 72], e1: [82, 80], w1: [88, 78] }, b: { h: [84, 70], n: [76, 72], p: [50, 72], k1: [28, 72], f1: [24, 50], e1: [82, 80], w1: [88, 78] } },
  calf: { a: eaPose({ e1: [50, 40], w1: [50, 54] }), b: eaPose({ h: [50, 10], n: [50, 20], p: [50, 50], k1: [51, 71], f1: [52, 92], e1: [50, 35], w1: [50, 49] }) },
  bridge: { a: { h: [84, 92], n: [76, 93], p: [50, 93], k1: [36, 74], f1: [30, 97], e1: [64, 96], w1: [54, 96] }, b: { h: [84, 92], n: [76, 92], p: [52, 74], k1: [36, 72], f1: [30, 97], e1: [64, 96], w1: [54, 96] } },
  'hip-thrust': { eq: 'bench-side bar-hip', a: { h: [84, 66], n: [76, 70], p: [54, 90], k1: [36, 76], f1: [30, 97], e1: [64, 80], w1: [56, 86] }, b: { h: [84, 66], n: [76, 70], p: [54, 70], k1: [36, 70], f1: [30, 97], e1: [64, 70], w1: [56, 68] } },
  kickback: { a: { h: [76, 62], n: [70, 68], p: [44, 70], k1: [44, 92], f1: [30, 96], k2: [44, 92], f2: [30, 96], e1: [70, 82], w1: [70, 96] }, b: { h: [76, 62], n: [70, 68], p: [44, 70], k1: [44, 92], f1: [30, 96], k2: [30, 64], f2: [18, 48], e1: [70, 82], w1: [70, 96] } },
  clamshell: { a: { h: [86, 84], n: [78, 88], p: [50, 90], k1: [38, 80], f1: [28, 92], k2: [38, 82], f2: [28, 93], e1: [80, 96], w1: [88, 90] }, b: { h: [86, 84], n: [78, 88], p: [50, 90], k1: [38, 70], f1: [28, 92], k2: [38, 84], f2: [28, 93], e1: [80, 96], w1: [88, 90] } },
  bench: { eq: 'bench bar-hands', a: { h: [76, 62], n: [68, 66], p: [38, 66], k1: [26, 70], f1: [24, 97], e1: [68, 52], w1: [68, 38] }, b: { h: [76, 62], n: [68, 66], p: [38, 66], k1: [26, 70], f1: [24, 97], e1: [60, 62], w1: [66, 56] } },
  incline: { eq: 'bench-incline db', a: { h: [74, 44], n: [66, 52], p: [42, 70], k1: [28, 72], f1: [26, 97], e1: [72, 40], w1: [74, 26] }, b: { h: [74, 44], n: [66, 52], p: [42, 70], k1: [28, 72], f1: [26, 97], e1: [58, 50], w1: [66, 44] } },
  fly: { front: true, eq: 'db', a: eaPose({ e1: [36, 32], w1: [22, 36], e2: [64, 32], w2: [78, 36], k1: [46, 76], f1: [45, 97], k2: [54, 76], f2: [55, 97] }), b: eaPose({ e1: [40, 34], w1: [47, 30], e2: [60, 34], w2: [53, 30], k1: [46, 76], f1: [45, 97], k2: [54, 76], f2: [55, 97] }) },
  pushup: { a: { h: [78, 64], n: [70, 68], p: [42, 82], k1: [28, 89], f1: [14, 96], e1: [70, 82], w1: [70, 96] }, b: { h: [78, 80], n: [70, 84], p: [42, 90], k1: [28, 93], f1: [14, 96], e1: [60, 82], w1: [70, 96] } },
  'pushup-knee': { a: { h: [78, 64], n: [70, 68], p: [44, 82], k1: [32, 96], f1: [18, 90], e1: [70, 82], w1: [70, 96] }, b: { h: [78, 80], n: [70, 84], p: [44, 90], k1: [32, 96], f1: [18, 90], e1: [60, 82], w1: [70, 96] } },
  pike: { a: { h: [68, 72], n: [64, 64], p: [46, 40], k1: [36, 68], f1: [28, 96], e1: [66, 80], w1: [68, 96] }, b: { h: [70, 90], n: [62, 80], p: [46, 46], k1: [36, 70], f1: [28, 96], e1: [56, 86], w1: [68, 96] } },
  dip: { eq: 'dip', a: eaPose({ h: [50, 10], n: [50, 20], p: [50, 50], k1: [44, 68], f1: [50, 84], e1: [50, 34], w1: [52, 48] }), b: eaPose({ h: [52, 22], n: [50, 32], p: [48, 62], k1: [42, 80], f1: [48, 94], e1: [38, 40], w1: [52, 48] }) },
  'dip-chair': { eq: 'chair', a: { h: [44, 30], n: [44, 40], p: [44, 62], k1: [66, 64], f1: [66, 96], e1: [36, 50], w1: [36, 62] }, b: { h: [44, 44], n: [44, 54], p: [44, 76], k1: [66, 70], f1: [66, 96], e1: [30, 56], w1: [36, 62] } },
  press: { eq: 'db', a: eaPose({ e1: [40, 36], w1: [45, 26] }), b: eaPose({ e1: [46, 14], w1: [48, 2] }) },
  lateral: { front: true, eq: 'db', a: eaPose({ e1: [43, 40], w1: [42, 54], e2: [57, 40], w2: [58, 54], k1: [46, 76], f1: [45, 97], k2: [54, 76], f2: [55, 97] }), b: eaPose({ e1: [36, 27], w1: [22, 27], e2: [64, 27], w2: [78, 27], k1: [46, 76], f1: [45, 97], k2: [54, 76], f2: [55, 97] }) },
  'rear-delt': { eq: 'db', a: eaPose({ h: [72, 40], n: [64, 44], p: [42, 56], k1: [48, 76], f1: [48, 97], e1: [64, 58], w1: [64, 70] }), b: eaPose({ h: [72, 40], n: [64, 44], p: [42, 56], k1: [48, 76], f1: [48, 97], e1: [56, 42], w1: [50, 34] }) },
  'face-pull': { eq: 'cable-high', a: eaPose({ e1: [64, 30], w1: [78, 26] }), b: eaPose({ e1: [44, 22], w1: [58, 18] }) },
  pullup: { eq: 'pullbar', a: { h: [50, 24], n: [50, 32], p: [50, 60], k1: [52, 78], f1: [50, 94], e1: [50, 20], w1: [50, 7] }, b: { h: [51, 8], n: [50, 18], p: [50, 46], k1: [53, 64], f1: [50, 80], e1: [42, 20], w1: [50, 7] } },
  pulldown: { eq: 'seat cable-high', a: { h: [44, 30], n: [44, 40], p: [44, 66], k1: [64, 66], f1: [66, 92], e1: [48, 24], w1: [50, 8] }, b: { h: [44, 30], n: [44, 40], p: [44, 66], k1: [64, 66], f1: [66, 92], e1: [38, 50], w1: [48, 40] } },
  row: { eq: 'bar-hands', a: eaPose({ h: [72, 38], n: [64, 44], p: [40, 58], k1: [48, 77], f1: [46, 97], e1: [64, 58], w1: [64, 72] }), b: eaPose({ h: [72, 38], n: [64, 44], p: [40, 58], k1: [48, 77], f1: [46, 97], e1: [50, 50], w1: [58, 60] }) },
  'row-seated': { eq: 'cable-low', a: { h: [42, 36], n: [42, 46], p: [36, 76], k1: [56, 66], f1: [74, 88], e1: [58, 58], w1: [74, 60] }, b: { h: [38, 34], n: [38, 44], p: [36, 76], k1: [56, 66], f1: [74, 88], e1: [26, 56], w1: [42, 60] } },
  'row-inverted': { eq: 'table', a: { h: [80, 78], n: [72, 80], p: [46, 86], k1: [32, 90], f1: [16, 96], e1: [72, 68], w1: [74, 56] }, b: { h: [80, 62], n: [72, 64], p: [46, 76], k1: [32, 86], f1: [16, 96], e1: [62, 56], w1: [74, 56] } },
  superman: { a: { h: [80, 90], n: [72, 93], p: [46, 94], k1: [30, 95], f1: [14, 95], e1: [84, 93], w1: [94, 93] }, b: { h: [80, 84], n: [72, 88], p: [46, 94], k1: [30, 90], f1: [14, 84], e1: [84, 84], w1: [94, 78] } },
  curl: { eq: 'db', a: eaPose({ e1: [51, 40], w1: [53, 56] }), b: eaPose({ e1: [51, 40], w1: [58, 28] }) },
  pushdown: { eq: 'cable-high', a: eaPose({ e1: [52, 40], w1: [60, 30] }), b: eaPose({ e1: [52, 40], w1: [54, 56] }) },
  'french-press': { eq: 'bench bar-hands', a: { h: [76, 62], n: [68, 66], p: [38, 66], k1: [26, 70], f1: [24, 97], e1: [68, 40], w1: [70, 26] }, b: { h: [76, 62], n: [68, 66], p: [38, 66], k1: [26, 70], f1: [24, 97], e1: [68, 40], w1: [80, 52] } },
  wrist: { eq: 'db', a: eaPose({ e1: [56, 42], w1: [68, 42] }), b: eaPose({ e1: [56, 42], w1: [68, 36] }) },
  plank: { a: { h: [78, 74], n: [70, 78], p: [44, 84], k1: [30, 90], f1: [14, 96], e1: [70, 96], w1: [80, 96] }, b: { h: [78, 73], n: [70, 77], p: [44, 82], k1: [30, 89], f1: [14, 96], e1: [70, 96], w1: [80, 96] } },
  'side-plank': { front: true, a: { h: [74, 46], n: [68, 54], p: [46, 74], k1: [32, 86], f1: [20, 96], e1: [68, 70], w1: [70, 84], e2: [68, 40], w2: [68, 26] }, b: { h: [74, 44], n: [68, 52], p: [46, 70], k1: [32, 84], f1: [20, 96], e1: [68, 70], w1: [70, 84], e2: [68, 38], w2: [68, 24] } },
  'plank-tap': { a: { h: [78, 64], n: [70, 68], p: [42, 82], k1: [28, 89], f1: [14, 96], e1: [70, 82], w1: [70, 96] }, b: { h: [78, 64], n: [70, 68], p: [42, 82], k1: [28, 89], f1: [14, 96], e1: [76, 72], w1: [70, 68], e2: [70, 82], w2: [70, 96] } },
  crunch: { a: { h: [80, 90], n: [72, 93], p: [48, 94], k1: [36, 76], f1: [26, 96], e1: [80, 84], w1: [82, 90] }, b: { h: [72, 76], n: [66, 84], p: [48, 94], k1: [36, 76], f1: [26, 96], e1: [74, 72], w1: [74, 78] } },
  'leg-raise': { a: { h: [82, 92], n: [74, 94], p: [48, 94], k1: [32, 94], f1: [16, 94], e1: [62, 96], w1: [54, 96] }, b: { h: [82, 92], n: [74, 94], p: [48, 94], k1: [42, 76], f1: [40, 58], e1: [62, 96], w1: [54, 96] } },
  'hanging-raise': { eq: 'pullbar', a: { h: [50, 24], n: [50, 32], p: [50, 60], k1: [51, 78], f1: [50, 95], e1: [50, 20], w1: [50, 7] }, b: { h: [50, 24], n: [50, 32], p: [48, 60], k1: [64, 54], f1: [62, 72], e1: [50, 20], w1: [50, 7] } },
  twist: { front: true, a: { h: [50, 40], n: [50, 50], p: [50, 80], k1: [40, 70], f1: [30, 82], k2: [60, 70], f2: [70, 82], e1: [40, 62], w1: [34, 70], e2: [44, 64], w2: [34, 70] }, b: { h: [50, 40], n: [50, 50], p: [50, 80], k1: [40, 70], f1: [30, 82], k2: [60, 70], f2: [70, 82], e1: [60, 62], w1: [66, 70], e2: [56, 64], w2: [66, 70] } },
  'dead-bug': { a: { h: [84, 92], n: [76, 94], p: [50, 94], k1: [40, 76], f1: [28, 76], k2: [40, 76], f2: [28, 76], e1: [76, 84], w1: [76, 72], e2: [76, 84], w2: [76, 72] }, b: { h: [84, 92], n: [76, 94], p: [50, 94], k1: [40, 76], f1: [28, 76], k2: [34, 92], f2: [18, 92], e1: [86, 86], w1: [96, 84], e2: [76, 84], w2: [76, 72] } },
  'ab-wheel': { eq: 'wheel', a: { h: [60, 66], n: [54, 72], p: [36, 76], k1: [26, 96], f1: [12, 96], e1: [58, 84], w1: [60, 94] }, b: { h: [74, 82], n: [66, 84], p: [36, 86], k1: [26, 96], f1: [12, 96], e1: [76, 90], w1: [84, 94] } },
  climber: { a: { h: [78, 64], n: [70, 68], p: [44, 80], k1: [58, 82], f1: [50, 92], k2: [30, 88], f2: [16, 96], e1: [70, 82], w1: [70, 96] }, b: { h: [78, 64], n: [70, 68], p: [44, 80], k1: [30, 88], f1: [16, 96], k2: [58, 82], f2: [50, 92], e1: [70, 82], w1: [70, 96] } },
  run: { a: eaPose({ h: [54, 15], n: [52, 25], k1: [62, 72], f1: [58, 90], k2: [42, 76], f2: [32, 88], e1: [60, 38], w1: [66, 28], e2: [42, 38], w2: [40, 50] }), b: eaPose({ h: [54, 15], n: [52, 25], k1: [42, 76], f1: [32, 88], k2: [62, 72], f2: [58, 90], e1: [42, 38], w1: [40, 50], e2: [60, 38], w2: [66, 28] }) },
  walk: { a: eaPose({ k1: [55, 76], f1: [58, 97], k2: [46, 76], f2: [42, 97], e1: [54, 40], w1: [56, 54], e2: [47, 40], w2: [45, 54] }), b: eaPose({ k1: [46, 76], f1: [42, 97], k2: [55, 76], f2: [58, 97], e1: [47, 40], w1: [45, 54], e2: [54, 40], w2: [56, 54] }) },
  carry: { eq: 'db', a: eaPose({ k1: [55, 76], f1: [58, 97], k2: [46, 76], f2: [42, 97], e1: [50, 40], w1: [50, 56] }), b: eaPose({ k1: [46, 76], f1: [42, 97], k2: [55, 76], f2: [58, 97], e1: [50, 40], w1: [50, 56] }) },
  bike: { eq: 'bike', a: { h: [58, 20], n: [54, 28], p: [38, 50], k1: [56, 56], f1: [52, 76], k2: [46, 66], f2: [40, 84], e1: [64, 36], w1: [72, 42] }, b: { h: [58, 20], n: [54, 28], p: [38, 50], k1: [46, 66], f1: [40, 84], k2: [56, 56], f2: [52, 76], e1: [64, 36], w1: [72, 42] } },
  rower: { eq: 'rower', a: { h: [52, 44], n: [50, 54], p: [40, 80], k1: [56, 64], f1: [70, 82], e1: [62, 64], w1: [74, 66] }, b: { h: [30, 46], n: [34, 54], p: [26, 80], k1: [50, 74], f1: [70, 82], e1: [28, 66], w1: [40, 64] } },
  jump: { a: eaPose({ h: [55, 37], n: [50, 45], p: [36, 70], k1: [57, 73], f1: [51, 97], e1: [42, 58], w1: [36, 66] }), b: eaPose({ h: [50, 2], n: [50, 11], p: [50, 40], k1: [51, 60], f1: [50, 80], e1: [56, 4], w1: [60, -4] }) },
  'box-jump': { eq: 'box', a: eaPose({ h: [40, 37], n: [35, 45], p: [22, 70], k1: [42, 73], f1: [36, 97], e1: [28, 58], w1: [22, 66] }), b: eaPose({ h: [64, 32], n: [60, 40], p: [50, 64], k1: [68, 66], f1: [64, 82], e1: [70, 46], w1: [76, 40] }) },
  'jumping-jack': { front: true, a: eaPose({ e1: [44, 40], w1: [42, 54], e2: [56, 40], w2: [58, 54], k1: [47, 76], f1: [46, 97], k2: [53, 76], f2: [54, 97] }), b: eaPose({ e1: [38, 16], w1: [34, 4], e2: [62, 16], w2: [66, 4], k1: [40, 76], f1: [32, 97], k2: [60, 76], f2: [68, 97] }) },
  lateral_hop: { front: true, a: eaPose({ h: [40, 18], n: [40, 28], p: [40, 56], k1: [38, 76], f1: [38, 96], k2: [42, 76], f2: [42, 96], e1: [34, 42], w1: [32, 54], e2: [46, 42], w2: [48, 54] }), b: eaPose({ h: [60, 12], n: [60, 22], p: [60, 50], k1: [58, 70], f1: [58, 88], k2: [62, 70], f2: [62, 88], e1: [54, 36], w1: [50, 46], e2: [66, 36], w2: [70, 46] }) },
  skip: { a: eaPose({ k1: [64, 56], f1: [60, 76], k2: [50, 76], f2: [50, 97], e1: [44, 38], w1: [42, 50], e2: [58, 36], w2: [64, 26] }), b: eaPose({ k1: [50, 76], f1: [50, 97], k2: [64, 56], f2: [60, 76], e1: [58, 36], w1: [64, 26], e2: [44, 38], w2: [42, 50] }) },
  sprint: { a: eaPose({ h: [62, 22], n: [58, 30], p: [48, 56], k1: [64, 66], f1: [60, 84], k2: [38, 74], f2: [28, 90], e1: [66, 40], w1: [72, 30], e2: [44, 42], w2: [38, 54] }), b: eaPose({ h: [62, 22], n: [58, 30], p: [48, 56], k1: [38, 74], f1: [28, 90], k2: [64, 66], f2: [60, 84], e1: [44, 42], w1: [38, 54], e2: [66, 40], w2: [72, 30] }) },
  nordic: { a: { h: [52, 22], n: [52, 32], p: [52, 62], k1: [52, 94], f1: [28, 96], e1: [56, 46], w1: [62, 56] }, b: { h: [86, 70], n: [80, 74], p: [62, 86], k1: [52, 94], f1: [28, 96], e1: [88, 84], w1: [92, 94] } },
  copenhagen: { eq: 'bench-low', a: { h: [86, 66], n: [80, 72], p: [56, 82], k1: [36, 76], f1: [16, 72], e1: [80, 88], w1: [84, 96] }, b: { h: [86, 60], n: [80, 66], p: [56, 74], k1: [36, 73], f1: [16, 72], e1: [80, 82], w1: [84, 96] } },
  balance: { a: eaPose({ k2: [60, 64], f2: [58, 82], e1: [38, 30], w1: [26, 32], e2: [62, 30], w2: [74, 32] }), b: eaPose({ h: [51, 15], n: [51, 25], k2: [60, 64], f2: [58, 82], e1: [38, 32], w1: [26, 36], e2: [62, 28], w2: [74, 28] }) },
  rotation: { front: true, eq: 'cable-mid', a: eaPose({ e1: [36, 38], w1: [26, 42], e2: [40, 40], w2: [26, 42], k1: [44, 76], f1: [42, 97], k2: [56, 76], f2: [58, 97] }), b: eaPose({ e1: [64, 38], w1: [74, 42], e2: [60, 40], w2: [74, 42], k1: [44, 76], f1: [42, 97], k2: [56, 76], f2: [58, 97] }) },
  woodchop: { front: true, eq: 'cable-high', a: eaPose({ e1: [62, 18], w1: [72, 8], e2: [58, 20], w2: [72, 8], k1: [44, 76], f1: [42, 97], k2: [56, 76], f2: [58, 97] }), b: eaPose({ h: [48, 18], n: [48, 28], e1: [38, 44], w1: [30, 58], e2: [42, 46], w2: [30, 58], k1: [44, 76], f1: [42, 97], k2: [56, 76], f2: [58, 97] }) },
  pallof: { eq: 'cable-mid', a: eaPose({ e1: [56, 38], w1: [56, 34] }), b: eaPose({ e1: [64, 34], w1: [76, 34] }) },
  extrot: { front: true, a: eaPose({ e1: [44, 40], w1: [56, 42], k1: [46, 76], f1: [45, 97], k2: [54, 76], f2: [55, 97] }), b: eaPose({ e1: [44, 40], w1: [32, 42], k1: [46, 76], f1: [45, 97], k2: [54, 76], f2: [55, 97] }) },
  throw: { eq: 'ball', a: eaPose({ h: [48, 16], n: [48, 26], e1: [40, 12], w1: [44, 2] }), b: eaPose({ h: [54, 18], n: [54, 28], p: [50, 56], e1: [66, 24], w1: [80, 22] }) },
  boxing: { a: eaPose({ e1: [62, 34], w1: [78, 30], e2: [52, 38], w2: [58, 26], k1: [58, 76], f1: [60, 97], k2: [44, 76], f2: [40, 97] }), b: eaPose({ e1: [52, 38], w1: [58, 26], e2: [62, 34], w2: [78, 30], k1: [58, 76], f1: [60, 97], k2: [44, 76], f2: [40, 97] }) },
  swim: { eq: 'cable-high', a: eaPose({ h: [58, 20], n: [56, 28], p: [48, 56], e1: [70, 24], w1: [82, 18] }), b: eaPose({ h: [58, 20], n: [56, 28], p: [48, 56], e1: [58, 44], w1: [54, 58] }) },
  ytw: { a: { h: [82, 90], n: [74, 93], p: [48, 94], k1: [32, 95], f1: [16, 95], e1: [84, 88], w1: [94, 82] }, b: { h: [82, 90], n: [74, 93], p: [48, 94], k1: [32, 95], f1: [16, 95], e1: [72, 82], w1: [80, 76] } },
  handstand: { eq: 'wall', a: { h: [70, 90], n: [70, 80], p: [72, 50], k1: [74, 30], f1: [76, 10], e1: [70, 88], w1: [70, 97] }, b: { h: [70, 90], n: [70, 80], p: [73, 50], k1: [75, 30], f1: [78, 10], e1: [70, 88], w1: [70, 97] } },
  'wall-sit': { eq: 'wall', a: { h: [36, 34], n: [34, 44], p: [32, 72], k1: [56, 72], f1: [56, 97], e1: [42, 56], w1: [48, 70] }, b: { h: [36, 33], n: [34, 43], p: [32, 71], k1: [56, 72], f1: [56, 97], e1: [42, 55], w1: [48, 69] } },
  bulgarian: { eq: 'chair-back', a: eaPose({ k1: [58, 76], f1: [58, 97], k2: [40, 78], f2: [24, 72], e1: [50, 40], w1: [50, 54] }), b: eaPose({ h: [50, 30], n: [50, 40], p: [48, 68], k1: [64, 76], f1: [60, 97], k2: [40, 92], f2: [24, 72], e1: [50, 54], w1: [50, 68] }) },
  pistol: { eq: 'door', a: eaPose({ k2: [58, 76], f2: [62, 92], e1: [58, 34], w1: [70, 32] }), b: eaPose({ h: [56, 40], n: [50, 48], p: [38, 72], k1: [56, 74], f1: [50, 97], k2: [56, 80], f2: [74, 80], e1: [62, 50], w1: [70, 44] }) },
  'shrug-down': { a: eaPose({ e1: [50, 40], w1: [50, 54] }), b: eaPose({ e1: [50, 40], w1: [50, 54] }) }
};

// Esercizio della libreria → [movimento, muscoli principali, muscoli secondari]
const EXERCISE_ART = {
  'panca-piana': ['bench', ['petto'], ['spalle', 'tricipiti']],
  'panca-inclinata-manubri': ['incline', ['petto'], ['spalle', 'tricipiti']],
  'chest-press': ['bench', ['petto'], ['spalle', 'tricipiti']],
  'croci-cavi': ['fly', ['petto'], ['spalle']],
  'dip-parallele': ['dip', ['petto', 'tricipiti'], ['spalle']],
  'push-up': ['pushup', ['petto'], ['tricipiti', 'spalle', 'addome']],
  'push-up-ginocchia': ['pushup-knee', ['petto'], ['tricipiti', 'spalle']],
  'push-up-larghi': ['pushup', ['petto'], ['spalle']],
  'push-up-declinati': ['pushup', ['petto', 'spalle'], ['tricipiti']],
  'dip-sedie': ['dip', ['petto', 'tricipiti'], ['spalle']],
  'lat-machine': ['pulldown', ['dorsali'], ['bicipiti', 'spalle-post']],
  'rematore-bilanciere': ['row', ['dorsali', 'trapezio'], ['bicipiti', 'lombari']],
  pulley: ['row-seated', ['dorsali', 'trapezio'], ['bicipiti']],
  'rematore-manubrio': ['row', ['dorsali'], ['bicipiti', 'spalle-post']],
  trazioni: ['pullup', ['dorsali'], ['bicipiti', 'avambracci']],
  stacco: ['deadlift', ['lombari', 'glutei', 'femorali'], ['trapezio', 'quadricipiti', 'avambracci']],
  'rematore-zaino': ['row', ['dorsali'], ['bicipiti']],
  'rematore-inverso': ['row-inverted', ['dorsali', 'trapezio'], ['bicipiti']],
  superman: ['superman', ['lombari'], ['glutei', 'spalle-post']],
  ytw: ['ytw', ['trapezio', 'spalle-post'], ['lombari']],
  'trazioni-casa': ['pullup', ['dorsali'], ['bicipiti', 'avambracci']],
  'military-press': ['press', ['spalle'], ['tricipiti', 'trapezio']],
  'arnold-press': ['press', ['spalle'], ['tricipiti']],
  'alzate-laterali': ['lateral', ['spalle'], ['trapezio']],
  'alzate-posteriori': ['rear-delt', ['spalle-post'], ['trapezio']],
  'face-pull': ['face-pull', ['spalle-post', 'trapezio'], []],
  'pike-push-up': ['pike', ['spalle'], ['tricipiti']],
  'alzate-bottiglie': ['lateral', ['spalle'], []],
  'plank-tocco-spalle': ['plank-tap', ['addome', 'spalle'], ['obliqui']],
  'verticale-muro': ['handstand', ['spalle'], ['tricipiti', 'addome']],
  'curl-bilanciere': ['curl', ['bicipiti'], ['avambracci']],
  'curl-martello': ['curl', ['bicipiti', 'avambracci'], []],
  'curl-cavi': ['curl', ['bicipiti'], ['avambracci']],
  pushdown: ['pushdown', ['tricipiti'], []],
  'french-press': ['french-press', ['tricipiti'], []],
  'diamond-push-up': ['pushup', ['tricipiti'], ['petto']],
  'dip-sedia': ['dip-chair', ['tricipiti'], ['spalle']],
  'curl-zaino': ['curl', ['bicipiti'], ['avambracci']],
  'curl-elastico': ['curl', ['bicipiti'], []],
  squat: ['squat', ['quadricipiti', 'glutei'], ['femorali', 'lombari', 'addome']],
  'leg-press': ['leg-press', ['quadricipiti', 'glutei'], ['femorali']],
  'affondi-manubri': ['lunge', ['quadricipiti', 'glutei'], ['femorali']],
  'leg-extension': ['leg-ext', ['quadricipiti'], []],
  'leg-curl': ['leg-curl', ['femorali'], ['polpacci']],
  'calf-macchina': ['calf', ['polpacci'], []],
  'squat-libero': ['squat-free', ['quadricipiti', 'glutei'], ['femorali']],
  affondi: ['lunge', ['quadricipiti', 'glutei'], ['femorali']],
  bulgaro: ['bulgarian', ['quadricipiti', 'glutei'], ['femorali', 'adduttori']],
  'wall-sit': ['wall-sit', ['quadricipiti'], ['glutei']],
  'calf-gradino': ['calf', ['polpacci'], []],
  'squat-pistol-assistito': ['pistol', ['quadricipiti', 'glutei'], ['addome']],
  'hip-thrust': ['hip-thrust', ['glutei'], ['femorali']],
  'stacco-rumeno': ['hinge', ['femorali', 'glutei'], ['lombari']],
  abductor: ['clamshell', ['glutei'], []],
  'kickback-cavi': ['kickback', ['glutei'], ['femorali']],
  'ponte-glutei': ['bridge', ['glutei'], ['femorali', 'lombari']],
  'ponte-una-gamba': ['bridge', ['glutei'], ['femorali']],
  'donkey-kick': ['kickback', ['glutei'], []],
  clamshell: ['clamshell', ['glutei'], []],
  plank: ['plank', ['addome'], ['spalle', 'obliqui']],
  'plank-laterale': ['side-plank', ['obliqui'], ['addome', 'spalle']],
  crunch: ['crunch', ['addome'], []],
  'russian-twist': ['twist', ['obliqui'], ['addome']],
  'leg-raise': ['leg-raise', ['addome'], []],
  'mountain-climber': ['climber', ['addome'], ['spalle', 'quadricipiti']],
  'dead-bug': ['dead-bug', ['addome'], ['obliqui']],
  'crunch-cavi': ['crunch', ['addome'], ['obliqui']],
  'hanging-leg-raise': ['hanging-raise', ['addome'], ['avambracci']],
  'ab-wheel': ['ab-wheel', ['addome'], ['dorsali', 'spalle']],
  tapis: ['run', ['quadricipiti', 'polpacci'], ['glutei', 'femorali']],
  cyclette: ['bike', ['quadricipiti'], ['glutei', 'polpacci']],
  ellittica: ['walk', ['quadricipiti', 'glutei'], ['spalle', 'dorsali']],
  vogatore: ['rower', ['dorsali', 'quadricipiti'], ['bicipiti', 'glutei']],
  'hiit-bici': ['bike', ['quadricipiti'], ['glutei', 'polpacci']],
  corsa: ['run', ['quadricipiti', 'polpacci'], ['glutei', 'femorali']],
  'camminata-veloce': ['walk', ['quadricipiti', 'polpacci'], ['glutei']],
  corda: ['jump', ['polpacci'], ['spalle', 'quadricipiti']],
  'jumping-jack': ['jumping-jack', ['polpacci', 'spalle'], ['quadricipiti']],
  burpees: ['jump', ['quadricipiti', 'petto'], ['spalle', 'addome']],
  'squat-jump': ['jump', ['quadricipiti', 'glutei'], ['polpacci']],
  'box-jump': ['box-jump', ['quadricipiti', 'glutei'], ['polpacci']],
  'salti-laterali': ['lateral_hop', ['polpacci', 'adduttori'], ['quadricipiti']],
  'skip-alto': ['skip', ['quadricipiti', 'polpacci'], ['addome']],
  scatti: ['sprint', ['quadricipiti', 'femorali', 'glutei'], ['polpacci']],
  navette: ['sprint', ['quadricipiti', 'adduttori'], ['glutei', 'polpacci']],
  'nordic-curl': ['nordic', ['femorali'], ['glutei']],
  copenhagen: ['copenhagen', ['adduttori'], ['obliqui']],
  extrarotazioni: ['extrot', ['spalle-post'], []],
  'pallof-press': ['pallof', ['obliqui', 'addome'], []],
  'rotazioni-elastico': ['rotation', ['obliqui'], ['addome', 'spalle']],
  'lanci-palla-medica': ['throw', ['spalle', 'addome'], ['petto', 'tricipiti']],
  'farmer-walk': ['carry', ['avambracci', 'trapezio'], ['addome']],
  'equilibrio-una-gamba': ['balance', ['polpacci', 'glutei'], ['addome']],
  'shadow-boxing': ['boxing', ['spalle'], ['addome', 'tricipiti']],
  'polsi-avambracci': ['wrist', ['avambracci'], []],
  'nuoto-dorsali': ['swim', ['dorsali'], ['tricipiti']],
  // Esercizi da palestra per gli sport
  'step-up-manubri': ['step-up', ['quadricipiti', 'glutei'], ['polpacci']],
  'woodchop-cavi': ['woodchop', ['obliqui'], ['addome', 'spalle']],
  'extrarotazioni-cavi': ['extrot', ['spalle-post'], []],
  'pallof-cavi': ['pallof', ['obliqui', 'addome'], []],
  'leg-press-una-gamba': ['leg-press', ['quadricipiti', 'glutei'], []],
  'spinta-slitta': ['sprint', ['quadricipiti', 'glutei'], ['polpacci', 'spalle']],
  'curl-polsi': ['wrist', ['avambracci'], []],
  'adductor-machine': ['clamshell', ['adduttori'], []],
  'girata-kettlebell': ['hinge', ['glutei', 'femorali'], ['lombari', 'spalle']],
  'calf-seduto': ['calf', ['polpacci'], []],
  'rematore-cavi-una-mano': ['row-seated', ['dorsali'], ['bicipiti', 'obliqui']],
  'panca-presa-stretta': ['bench', ['tricipiti', 'petto'], ['spalle']]
};

// Movimento di ripiego per gruppo muscolare (esercizi scritti a mano o senza voce sopra)
const ART_BY_GROUP = {
  petto: ['bench', ['petto'], ['tricipiti']], schiena: ['row', ['dorsali'], ['bicipiti']], spalle: ['press', ['spalle'], ['tricipiti']],
  braccia: ['curl', ['bicipiti'], ['avambracci']], gambe: ['squat-free', ['quadricipiti', 'glutei'], []], glutei: ['bridge', ['glutei'], ['femorali']],
  addome: ['crunch', ['addome'], []], cardio: ['run', ['quadricipiti', 'polpacci'], []], atletici: ['jump', ['quadricipiti', 'glutei'], ['polpacci']]
};

const exerciseArt = (item) => {
  if (!item) return null;
  const a = EXERCISE_ART[item.id] || ART_BY_GROUP[item.m];
  if (!a) return null;
  return { pattern: a[0], primary: a[1], secondary: a[2] || [] };
};

// --- Disegno dell'omino ---
const eaXY = (pt) => pt[0] + ' ' + pt[1];
const eaLimbPath = (a, b, c) => `M${eaXY(a)} L${eaXY(b)} L${eaXY(c)}`;

// Attrezzi fissi (non si muovono) e attrezzi in mano (seguono i polsi)
const propsStatic = (eq) => {
  let s = '';
  if (eq.includes('bench-incline')) s += '<path d="M24 74 L76 74 M30 74 L30 97 M70 74 L70 97 M44 74 L74 46" class="ea-prop-line"/>';
  else if (eq.includes('bench-side')) s += '<rect x="68" y="72" width="26" height="6" rx="2" class="ea-prop"/><path d="M74 78 L74 97 M90 78 L90 97" class="ea-prop-line"/>';
  else if (eq.includes('bench-low')) s += '<rect x="56" y="76" width="40" height="5" rx="2" class="ea-prop"/><path d="M62 81 L62 97 M90 81 L90 97" class="ea-prop-line"/>';
  else if (eq.includes('bench')) s += '<rect x="20" y="70" width="62" height="5" rx="2" class="ea-prop"/><path d="M28 75 L28 97 M74 75 L74 97" class="ea-prop-line"/>';
  if (eq.includes('seat')) s += '<rect x="30" y="60" width="26" height="5" rx="2" class="ea-prop"/><path d="M34 65 L34 97 M52 65 L52 97 M30 60 L28 26" class="ea-prop-line"/>';
  if (eq.includes('legpress')) s += '<path d="M14 80 L48 80 L52 97 M14 80 L18 50" class="ea-prop-line"/><path d="M70 40 L96 62" class="ea-prop-line" stroke-width="3"/>';
  if (eq.includes('pullbar')) s += '<path d="M20 6 L80 6" class="ea-prop-line" stroke-width="3"/><path d="M22 6 L22 0 M78 6 L78 0" class="ea-prop-line"/>';
  if (eq.includes('dip')) s += '<path d="M38 48 L66 48 M42 48 L42 97 M62 48 L62 97" class="ea-prop-line" stroke-width="2.5"/>';
  if (eq.includes('chair-back')) s += '<rect x="12" y="70" width="18" height="4" rx="1.5" class="ea-prop"/><path d="M14 74 L14 97 M28 74 L28 97 M12 70 L12 46" class="ea-prop-line"/>';
  else if (eq.includes('chair')) s += '<rect x="22" y="60" width="20" height="4" rx="1.5" class="ea-prop"/><path d="M24 64 L24 97 M40 64 L40 97 M22 60 L22 36" class="ea-prop-line"/>';
  if (eq.includes('box')) s += '<rect x="54" y="82" width="26" height="15" rx="2" class="ea-prop"/>';
  if (eq.includes('table')) s += '<path d="M60 56 L96 56 M64 56 L64 97 M92 56 L92 97" class="ea-prop-line" stroke-width="2.5"/>';
  if (eq.includes('wall')) s += '<path d="M24 0 L24 97" class="ea-prop-line" stroke-width="3"/>';
  if (eq.includes('door')) s += '<path d="M80 6 L80 97" class="ea-prop-line" stroke-width="3"/>';
  if (eq.includes('bike')) s += '<circle cx="28" cy="84" r="12" class="ea-prop-line"/><circle cx="78" cy="84" r="12" class="ea-prop-line"/><path d="M28 84 L46 84 L72 44 M38 50 L46 84 L78 84" class="ea-prop-line"/>';
  if (eq.includes('rower')) s += '<path d="M8 86 L92 86" class="ea-prop-line" stroke-width="3"/><rect x="74" y="78" width="8" height="10" rx="2" class="ea-prop"/>';
  return s;
};

const handProps = (eq, w1) => {
  const at = (w, inner) => `<g transform="translate(${eaXY(w)})">${inner}</g>`;
  let s = '';
  if (eq.includes('bar-back') || eq.includes('bar-hands') || eq.includes('bar-hip')) s += at(w1, '<circle r="8.5" class="ea-plate"/><circle r="2.2" class="ea-hub"/>');
  if (eq.includes('db')) s += at(w1, '<rect x="-5" y="-2.5" width="10" height="5" rx="2" class="ea-db"/>');
  if (eq.includes('ball')) s += at(w1, '<circle r="6" class="ea-ball"/>');
  if (eq.includes('wheel')) s += at(w1, '<circle r="4.5" class="ea-plate"/>');
  return s;
};

const CABLE_ANCHOR = { 'cable-high': [92, 2], 'cable-low': [96, 62], 'cable-mid': [96, 34] };

let exerciseArtUid = 0;
// Omino animato. animate = false per le miniature (posa ferma a metà movimento)
const exercisePoseSvg = (patternId, animate = true) => {
  const P = EXERCISE_PATTERNS[patternId] || EXERCISE_PATTERNS['squat-free'];
  const eq = P.eq || '';
  const full = (q) => ({ ...q, k2: q.k2 || [q.k1[0] - 2, q.k1[1]], f2: q.f2 || [q.f1[0] - 2, q.f1[1]], e2: q.e2 || [q.e1[0] - 2, q.e1[1] + 1], w2: q.w2 || [q.w1[0] - 2, q.w1[1] + 1] });
  const A = full(P.a), B = full(P.b);
  const dur = '2.4s';
  const anim = (attr, va, vb) => (animate ? `<animate attributeName="${attr}" values="${va};${vb};${va}" dur="${dur}" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines=".45 0 .55 1;.45 0 .55 1"/>` : '');
  const path = (cls, fn) => {
    const a = fn(A), b = fn(B);
    return `<path d="${animate ? a : b}" class="${cls}">${anim('d', a, b)}</path>`;
  };
  const still = animate ? A : B;
  const cable = CABLE_ANCHOR[Object.keys(CABLE_ANCHOR).find(k => eq.includes(k))];
  const cableSvg = cable ? path('ea-cable', q => `M${eaXY(cable)} L${eaXY(q.w1)}`) : '';
  // Attrezzi in mano: un gruppo che si sposta con il polso (anche con l'altra mano se si vede di fronte)
  const plain = handProps(eq, [0, 0]);
  const follow = (wa, wb) => `<g transform="translate(${eaXY(animate ? wa : wb)})">${animate ? `<animateTransform attributeName="transform" type="translate" values="${eaXY(wa)};${eaXY(wb)};${eaXY(wa)}" dur="${dur}" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines=".45 0 .55 1;.45 0 .55 1"/>` : ''}${plain}</g>`;
  const hand = plain ? follow(A.w1, B.w1) + (P.front && eq.includes('db') ? follow(A.w2, B.w2) : '') : '';
  const head = `<circle r="6.2" cx="${still.h[0]}" cy="${still.h[1]}" class="ea-head">${anim('cx', A.h[0], B.h[0])}${anim('cy', A.h[1], B.h[1])}</circle>`;
  const uid = 'ea' + (++exerciseArtUid);
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="exercise-pose" data-uid="${uid}">` +
    `<path d="M2 98 L98 98" class="ea-floor"/>` + propsStatic(eq) + cableSvg +
    path('ea-limb ea-back', q => eaLimbPath(q.p, q.k2, q.f2)) + path('ea-limb ea-back', q => eaLimbPath(q.n, q.e2, q.w2)) +
    path('ea-torso', q => `M${eaXY(q.n)} L${eaXY(q.p)}`) +
    path('ea-limb', q => eaLimbPath(q.p, q.k1, q.f1)) + head + hand + path('ea-limb', q => eaLimbPath(q.n, q.e1, q.w1)) +
    `</svg>`;
};
