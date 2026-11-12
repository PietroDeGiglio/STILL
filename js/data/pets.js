// ---------------------------------------------------------------
// COMPAGNI DELLA SERIE: personaggi che crescono con i giorni di fila.
// Ogni serie parte da un uovo misterioso; al primo giorno attivo si schiude
// un personaggio a caso (diverso da persona a persona e da serie a serie).
// Disegni in SVG (viewBox 120×120): nitidi nell'app e nelle storie.
// ---------------------------------------------------------------

// Giorni di fila per ogni evoluzione: 0 = uovo, poi 6 forme
const PET_THRESHOLDS = [0, 1, 3, 7, 14, 30, 60];
const PET_LEGEND_DAYS = 100;

const PET_SPECIES = [
  { id: 'sprout', name: 'Germoglio', color: '#22C55E', stages: ['Semino', 'Germoglio', 'Piantina', 'Bocciolo', 'Fiorellino', 'Fiore arcobaleno'] },
  { id: 'dragon', name: 'Draghetto', color: '#8B5CF6', stages: ['Cucciolo di drago', 'Draghetto', 'Draghetto alato', 'Drago', 'Drago di fuoco', 'Drago leggendario'] },
  { id: 'avocado', name: 'Avocado', color: '#65A30D', stages: ['Nocciolo', 'Nocciolo germogliato', 'Avocadino', 'Avocado', 'Avocado palestrato', 'Avocado d\'oro'] },
  { id: 'drop', name: 'Gocciolina', color: '#0EA5E9', stages: ['Gocciolina', 'Goccia', 'Goccia frizzante', 'Nuvoletta', 'Nuvola', 'Nuvola arcobaleno'] }
];

// Vestiti: si sbloccano con la serie migliore di sempre
const PET_ITEMS = [
  { id: 'cap', slot: 'hat', name: 'Cappellino', icon: '🧢', unlock: 0 },
  { id: 'headband', slot: 'hat', name: 'Fascia', icon: '🎽', unlock: 3 },
  { id: 'sunglasses', slot: 'eyes', name: 'Occhiali da sole', icon: '🕶️', unlock: 5 },
  { id: 'scarf', slot: 'neck', name: 'Sciarpa', icon: '🧣', unlock: 7 },
  { id: 'beanie', slot: 'hat', name: 'Berretto', icon: '🧶', unlock: 10 },
  { id: 'bowtie', slot: 'neck', name: 'Papillon', icon: '🎀', unlock: 14 },
  { id: 'round', slot: 'eyes', name: 'Occhialini', icon: '👓', unlock: 21 },
  { id: 'headphones', slot: 'hat', name: 'Cuffie', icon: '🎧', unlock: 30 },
  { id: 'party', slot: 'hat', name: 'Cappello da festa', icon: '🥳', unlock: 45 },
  { id: 'medal', slot: 'neck', name: 'Medaglia', icon: '🏅', unlock: 60 },
  { id: 'chain', slot: 'neck', name: 'Catena d\'oro', icon: '⛓️', unlock: 75 },
  { id: 'crown', slot: 'hat', name: 'Corona', icon: '👑', unlock: 100 }
];
const PET_SLOTS = [
  { id: 'hat', label: 'Testa' },
  { id: 'eyes', label: 'Occhi' },
  { id: 'neck', label: 'Collo' }
];

const petStageFor = (days) => {
  let stage = 0;
  PET_THRESHOLDS.forEach((t, i) => { if (days >= t) stage = i; });
  return stage;
};
const petHash = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
};
const petSpeciesIndex = (seed, startKey) => petHash(String(seed) + '|' + String(startKey)) % PET_SPECIES.length;
const petStageName = (speciesIdx, stage) => (stage === 0 ? 'Uovo misterioso' : PET_SPECIES[speciesIdx].stages[stage - 1]);

// --- Disegno ---
const PD = '#2B2233';                       // tratto scuro (occhi, bocca)
const pn = (v) => Math.round(v * 10) / 10;  // numeri corti nell'SVG

const petFace = (x, y, s, mood) => {
  const dx = 9.5 * s;
  let eyes = '', brows = '', mouth = '';
  const eye = (ex) => `<ellipse cx="${pn(ex)}" cy="${pn(y)}" rx="${pn(3.3 * s)}" ry="${pn(4 * s)}" fill="${PD}"/><circle cx="${pn(ex + 1.2 * s)}" cy="${pn(y - 1.5 * s)}" r="${pn(1.3 * s)}" fill="#fff"/>`;
  if (mood === 'happy') {
    eyes = [-1, 1].map(k => `<path d="M${pn(x + k * dx - 4 * s)} ${pn(y + 1.5 * s)} Q${pn(x + k * dx)} ${pn(y - 4.5 * s)} ${pn(x + k * dx + 4 * s)} ${pn(y + 1.5 * s)}" stroke="${PD}" stroke-width="${pn(2.6 * s)}" fill="none" stroke-linecap="round"/>`).join('');
    mouth = `<path d="M${pn(x - 5.5 * s)} ${pn(y + 5.5 * s)} Q${pn(x)} ${pn(y + 13 * s)} ${pn(x + 5.5 * s)} ${pn(y + 5.5 * s)} Z" fill="#8B2F45"/><path d="M${pn(x - 2.6 * s)} ${pn(y + 9.2 * s)} Q${pn(x)} ${pn(y + 7.2 * s)} ${pn(x + 2.6 * s)} ${pn(y + 9.2 * s)} Q${pn(x)} ${pn(y + 11.4 * s)} ${pn(x - 2.6 * s)} ${pn(y + 9.2 * s)}Z" fill="#FF8FA3"/>`;
  } else if (mood === 'sleepy') {
    eyes = [-1, 1].map(k => `<path d="M${pn(x + k * dx - 3.6 * s)} ${pn(y)} Q${pn(x + k * dx)} ${pn(y + 3.2 * s)} ${pn(x + k * dx + 3.6 * s)} ${pn(y)}" stroke="${PD}" stroke-width="${pn(2.2 * s)}" fill="none" stroke-linecap="round"/>`).join('');
    mouth = `<ellipse cx="${pn(x)}" cy="${pn(y + 7.5 * s)}" rx="${pn(1.8 * s)}" ry="${pn(2.2 * s)}" fill="${PD}" opacity=".75"/>`;
  } else if (mood === 'worried') {
    eyes = eye(x - dx) + eye(x + dx);
    brows = `<path d="M${pn(x - dx - 4 * s)} ${pn(y - 6 * s)} L${pn(x - dx + 3 * s)} ${pn(y - 8.6 * s)}" stroke="${PD}" stroke-width="${pn(2 * s)}" stroke-linecap="round"/><path d="M${pn(x + dx + 4 * s)} ${pn(y - 6 * s)} L${pn(x + dx - 3 * s)} ${pn(y - 8.6 * s)}" stroke="${PD}" stroke-width="${pn(2 * s)}" stroke-linecap="round"/>`;
    mouth = `<path d="M${pn(x - 3.8 * s)} ${pn(y + 9.5 * s)} Q${pn(x)} ${pn(y + 6 * s)} ${pn(x + 3.8 * s)} ${pn(y + 9.5 * s)}" stroke="${PD}" stroke-width="${pn(2 * s)}" fill="none" stroke-linecap="round"/>`;
  } else {
    eyes = eye(x - dx) + eye(x + dx);
    mouth = `<path d="M${pn(x - 3.8 * s)} ${pn(y + 6 * s)} Q${pn(x)} ${pn(y + 9.6 * s)} ${pn(x + 3.8 * s)} ${pn(y + 6 * s)}" stroke="${PD}" stroke-width="${pn(2.1 * s)}" fill="none" stroke-linecap="round"/>`;
  }
  const cheeks = [-1, 1].map(k => `<ellipse cx="${pn(x + k * (dx + 5.8 * s))}" cy="${pn(y + 5 * s)}" rx="${pn(3.6 * s)}" ry="${pn(2.3 * s)}" fill="#FF7A9A" opacity=".45"/>`).join('');
  return brows + eyes + cheeks + mouth;
};

const petLeaf = (x, y, len, angle, color, vein = true) =>
  `<g transform="translate(${pn(x)} ${pn(y)}) rotate(${angle})"><path d="M0 0 Q${pn(len * 0.5)} ${pn(-len * 0.42)} ${pn(len)} 0 Q${pn(len * 0.5)} ${pn(len * 0.42)} 0 0Z" fill="${color}"/>${vein ? `<path d="M${pn(len * 0.12)} 0 L${pn(len * 0.82)} 0" stroke="#fff" stroke-opacity=".35" stroke-width="1.2" stroke-linecap="round"/>` : ''}</g>`;
const petSparkle = (x, y, r, color = '#FBBF24') =>
  `<path d="M${pn(x)} ${pn(y - r)} Q${pn(x + r * 0.18)} ${pn(y - r * 0.18)} ${pn(x + r)} ${pn(y)} Q${pn(x + r * 0.18)} ${pn(y + r * 0.18)} ${pn(x)} ${pn(y + r)} Q${pn(x - r * 0.18)} ${pn(y + r * 0.18)} ${pn(x - r)} ${pn(y)} Q${pn(x - r * 0.18)} ${pn(y - r * 0.18)} ${pn(x)} ${pn(y - r)}Z" fill="${color}"/>`;
const petShadow = (rx) => `<ellipse cx="60" cy="109" rx="${pn(rx)}" ry="4" fill="#000" opacity=".13"/>`;
const petBlobBody = (uid, cx, cy, r, light, dark, squash = 0.94) =>
  `<defs><radialGradient id="${uid}b" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></radialGradient></defs>` +
  `<ellipse cx="${pn(cx)}" cy="${pn(cy)}" rx="${pn(r)}" ry="${pn(r * squash)}" fill="url(#${uid}b)"/>` +
  `<ellipse cx="${pn(cx - r * 0.38)}" cy="${pn(cy - r * 0.48)}" rx="${pn(r * 0.22)}" ry="${pn(r * 0.13)}" fill="#fff" opacity=".35" transform="rotate(-25 ${pn(cx - r * 0.38)} ${pn(cy - r * 0.48)})"/>`;
const petFeet = (cx, bottom, r, color) => [-1, 1].map(k => `<ellipse cx="${pn(cx + k * r * 0.42)}" cy="${pn(bottom - 1)}" rx="${pn(r * 0.26)}" ry="${pn(r * 0.13)}" fill="${color}"/>`).join('');

// Uovo misterioso (serie a zero): uguale per tutti
const drawEgg = (uid, mood) => {
  const spots = [[48, 60, 5, '#20C997'], [71, 54, 4, '#F5A623'], [66, 82, 5.5, '#7A4DF1'], [47, 85, 3.5, '#F5A623'], [75, 72, 3, '#20C997']]
    .map(([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity=".55"/>`).join('');
  return {
    back: '',
    body: petShadow(24) + `<defs><radialGradient id="${uid}e" cx="38%" cy="30%" r="80%"><stop offset="0" stop-color="#FFFDF7"/><stop offset="1" stop-color="#F3E3C3"/></radialGradient></defs>` +
      `<path d="M60 34 C78 34 87 62 87 79 C87 97 75 107 60 107 C45 107 33 97 33 79 C33 62 42 34 60 34Z" fill="url(#${uid}e)" stroke="#E2CC9F" stroke-width="1.5"/>` + spots +
      petFace(60, 78, 0.85, mood === 'happy' ? 'happy' : 'sleepy'),
    top: mood === 'happy' ? '' : `<text x="84" y="40" font-family="sans-serif" font-weight="800" font-size="11" fill="#8A8A94">z</text><text x="92" y="30" font-family="sans-serif" font-weight="800" font-size="8" fill="#8A8A94">z</text>`,
    anchors: null
  };
};

// 1) Germoglio → Fiore arcobaleno
const drawSprout = (uid, stage, mood) => {
  const r = [0, 19, 22, 25.5, 28, 30.5, 33][stage];
  const cy = 106 - r * 0.94;
  const top = cy - r * 0.94;
  let back = '', topF = '', front = '';
  const g1 = '#22C55E', g2 = '#15803D';
  if (stage >= 3) front += [-1, 1].map(k => `<ellipse cx="${pn(60 + k * r * 0.98)}" cy="${pn(cy + r * 0.15)}" rx="${pn(r * 0.17)}" ry="${pn(r * 0.27)}" fill="${g2}" transform="rotate(${k * -20} ${pn(60 + k * r * 0.98)} ${pn(cy + r * 0.15)})"/>`).join('');
  if (stage === 1) topF = petLeaf(60, top + 2, 15, -70, '#4ADE80');
  if (stage === 2) topF = petLeaf(59, top + 2, 17, -125, '#4ADE80') + petLeaf(61, top + 2, 17, -55, '#4ADE80');
  if (stage === 3) topF = petLeaf(59, top + 2, 19, -140, '#4ADE80') + petLeaf(61, top + 2, 19, -40, '#4ADE80') + petLeaf(60, top + 1, 17, -90, '#86EFAC');
  if (stage >= 4) {
    const stemH = stage === 4 ? 14 : 16;
    topF = `<path d="M60 ${pn(top + 3)} Q62 ${pn(top - stemH / 2)} 60 ${pn(top - stemH)}" stroke="${g2}" stroke-width="3" fill="none" stroke-linecap="round"/>` +
      petLeaf(60, top - 3, 14, -150, '#4ADE80') + petLeaf(60, top - 6, 13, -30, '#4ADE80');
    const fy = top - stemH - 6;
    if (stage === 4) {
      topF += `<path d="M60 ${pn(fy - 9)} C67 ${pn(fy - 3)} 66 ${pn(fy + 6)} 60 ${pn(fy + 7)} C54 ${pn(fy + 6)} 53 ${pn(fy - 3)} 60 ${pn(fy - 9)}Z" fill="#F472B6"/><path d="M60 ${pn(fy - 6)} C63 ${pn(fy - 1)} 63 ${pn(fy + 4)} 60 ${pn(fy + 6)}" stroke="#FBCFE8" stroke-width="1.5" fill="none"/>`;
    } else {
      const n = stage === 5 ? 6 : 8;
      const pr = stage === 5 ? 8 : 10;
      const cols = stage === 5 ? ['#F9A8D4', '#F472B6'] : ['#20C997', '#F5A623', '#7A4DF1', '#F472B6'];
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        topF += `<ellipse cx="${pn(60 + Math.cos(a) * pr)}" cy="${pn(fy + Math.sin(a) * pr)}" rx="${pn(pr * 0.62)}" ry="${pn(pr * 0.42)}" fill="${cols[i % cols.length]}" transform="rotate(${pn(a * 180 / Math.PI)} ${pn(60 + Math.cos(a) * pr)} ${pn(fy + Math.sin(a) * pr)})"/>`;
      }
      topF += `<circle cx="60" cy="${pn(fy)}" r="${pn(pr * 0.6)}" fill="#FCD34D"/><circle cx="58" cy="${pn(fy - 1.5)}" r="${pn(pr * 0.18)}" fill="#fff" opacity=".6"/>`;
      if (stage === 6) back += petSparkle(26, 40, 5) + petSparkle(95, 52, 4, '#F5A623') + petSparkle(90, 26, 3, '#7A4DF1');
    }
  }
  return {
    back,
    body: petShadow(r * 0.85) + petBlobBody(uid, 60, cy, r, '#86EFAC', g1) + petFeet(60, 107, r, g2) + front + petFace(60, cy - r * 0.05, r / 30, mood),
    top: topF,
    anchors: { top: { x: 60, y: top, w: r * 1.35 }, eyes: { x: 60, y: cy - r * 0.05, d: 9.5 * r / 30, s: r / 30 }, neck: { x: 60, y: cy + r * 0.52, w: r * 1.3 } }
  };
};

// 2) Draghetto → Drago leggendario
const drawDragon = (uid, stage, mood) => {
  const r = [0, 19, 22, 25.5, 28, 30.5, 33][stage];
  const cy = 106 - r * 0.94;
  const top = cy - r * 0.94;
  const p1 = '#C4B5FD', p2 = '#7C3AED';
  let back = '', front = '', topF = '';
  // Ali e coda (dietro)
  if (stage >= 3) {
    const w = stage === 3 ? 0.75 : stage === 4 ? 0.95 : 1.15;
    back += [-1, 1].map(k => `<path d="M${pn(60 + k * r * 0.55)} ${pn(cy - r * 0.2)} Q${pn(60 + k * r * (0.9 + w * 0.5))} ${pn(cy - r * (0.9 + w * 0.2))} ${pn(60 + k * r * (1.2 + w * 0.55))} ${pn(cy - r * (0.55 + w * 0.3))} Q${pn(60 + k * r * (1.05 + w * 0.3))} ${pn(cy - r * 0.15)} ${pn(60 + k * r * (1.15 + w * 0.35))} ${pn(cy + r * 0.05)} Q${pn(60 + k * r * 0.95)} ${pn(cy + r * 0.05)} ${pn(60 + k * r * 0.6)} ${pn(cy + r * 0.25)}Z" fill="${stage >= 6 ? '#F59E0B' : '#A78BFA'}" stroke="${p2}" stroke-width="1.5" stroke-linejoin="round"/>`).join('');
    back += `<path d="M${pn(60 + r * 0.6)} ${pn(cy + r * 0.6)} Q${pn(60 + r * 1.35)} ${pn(cy + r * 0.85)} ${pn(60 + r * 1.3)} ${pn(cy + r * 0.25)}" stroke="${p2}" stroke-width="${pn(r * 0.22)}" fill="none" stroke-linecap="round"/><path d="M${pn(60 + r * 1.3)} ${pn(cy + r * 0.12)} l${pn(r * 0.16)} ${pn(r * 0.2)} l${pn(-r * 0.26)} ${pn(r * 0.04)}Z" fill="#F59E0B"/>`;
  }
  if (stage >= 6) {
    back = [0, 1, 2, 3, 4].map(i => { const x = 60 + (i - 2) * r * 0.42; return `<path d="M${pn(x)} ${pn(top + r * 0.6)} Q${pn(x - 9)} ${pn(top + r * 0.1)} ${pn(x)} ${pn(top - r * (0.35 + (i % 2) * 0.25))} Q${pn(x + 9)} ${pn(top + r * 0.1)} ${pn(x)} ${pn(top + r * 0.6)}Z" fill="${i % 2 ? '#F97316' : '#FBBF24'}" opacity=".85"/>`; }).join('') + back;
  }
  // Spuntoni sul dorso
  if (stage >= 5) topF += [-1, 0, 1].map(k => `<path d="M${pn(60 + k * r * 0.32 - 4)} ${pn(top + 3 + Math.abs(k) * 3)} L${pn(60 + k * r * 0.32)} ${pn(top - 6 + Math.abs(k) * 3)} L${pn(60 + k * r * 0.32 + 4)} ${pn(top + 3 + Math.abs(k) * 3)}Z" fill="#F59E0B"/>`).join('');
  // Corna
  if (stage >= 2) {
    const hc = stage >= 6 ? '#FBBF24' : '#FEF3C7';
    const hl = stage >= 4 ? 10 : 7;
    topF += [-1, 1].map(k => `<path d="M${pn(60 + k * r * 0.42)} ${pn(top + r * 0.22)} Q${pn(60 + k * r * 0.5)} ${pn(top - hl * 0.4)} ${pn(60 + k * r * 0.62)} ${pn(top - hl)} Q${pn(60 + k * r * 0.62)} ${pn(top + r * 0.12)} ${pn(60 + k * r * 0.62)} ${pn(top + r * 0.3)}Z" fill="${hc}" stroke="#D97706" stroke-width="1"/>`).join('');
  }
  // Pancia
  if (stage >= 2) front += `<ellipse cx="60" cy="${pn(cy + r * 0.42)}" rx="${pn(r * 0.5)}" ry="${pn(r * 0.4)}" fill="#EDE9FE"/>` + [0, 1, 2].map(i => `<path d="M${pn(60 - r * 0.32 + i * 0.02)} ${pn(cy + r * (0.24 + i * 0.17))} Q60 ${pn(cy + r * (0.32 + i * 0.17))} ${pn(60 + r * 0.32)} ${pn(cy + r * (0.24 + i * 0.17))}" stroke="#C4B5FD" stroke-width="1.3" fill="none"/>`).join('');
  // Guscio (appena nato)
  let shell = '';
  if (stage === 1) shell = `<g transform="translate(0 ${pn(r * 0.16)})"><path d="M${pn(60 - r * 1.05)} ${pn(cy + r * 0.05)} L${pn(60 - r * 0.7)} ${pn(cy - r * 0.18)} L${pn(60 - r * 0.38)} ${pn(cy + r * 0.08)} L${pn(60)} ${pn(cy - r * 0.2)} L${pn(60 + r * 0.38)} ${pn(cy + r * 0.08)} L${pn(60 + r * 0.7)} ${pn(cy - r * 0.18)} L${pn(60 + r * 1.05)} ${pn(cy + r * 0.05)} C${pn(60 + r * 1.05)} ${pn(cy + r * 1.1)} ${pn(60 - r * 1.05)} ${pn(cy + r * 1.1)} ${pn(60 - r * 1.05)} ${pn(cy + r * 0.05)}Z" fill="#FFF7E8" stroke="#E2CC9F" stroke-width="1.5"/><circle cx="${pn(60 - r * 0.45)}" cy="${pn(cy + r * 0.5)}" r="3" fill="#20C997" opacity=".5"/><circle cx="${pn(60 + r * 0.4)}" cy="${pn(cy + r * 0.6)}" r="2.5" fill="#F5A623" opacity=".5"/></g>`;
  // Sbuffo di fumo
  if (stage >= 5) front += `<circle cx="${pn(60 + r * 0.95)}" cy="${pn(cy - r * 0.05)}" r="3" fill="#E5E7EB" opacity=".9"/><circle cx="${pn(60 + r * 1.15)}" cy="${pn(cy - r * 0.2)}" r="2.2" fill="#E5E7EB" opacity=".7"/>`;
  const faceY = stage === 1 ? cy - r * 0.32 : cy - r * 0.12;
  return {
    back: back + (stage >= 6 ? petSparkle(22, 30, 4) + petSparkle(98, 34, 5, '#F97316') : ''),
    body: petShadow(r * 0.9) + petBlobBody(uid, 60, cy, r, p1, '#8B5CF6') + (stage > 1 ? petFeet(60, 107, r, p2) : '') + front + petFace(60, faceY, r / 30, mood) + shell,
    top: topF,
    anchors: { top: { x: 60, y: top, w: r * 1.35 }, eyes: { x: 60, y: faceY, d: 9.5 * r / 30, s: r / 30 }, neck: { x: 60, y: cy + r * 0.3, w: r * 1.35 } }
  };
};

// 3) Nocciolo → Avocado d'oro
const drawAvocado = (uid, stage, mood) => {
  const pit = '#A0663C', pitL = '#C98B5B';
  if (stage <= 2) {
    const r = stage === 1 ? 19 : 22;
    const cy = 106 - r * 0.95;
    const top = cy - r * 0.95;
    let topF = '';
    if (stage === 1) topF = `<path d="M60 107 q-3 4 -6 5 M60 107 q3 4 6 4" stroke="#7C4A26" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
    if (stage === 2) topF = `<path d="M60 ${pn(top + 2)} Q61 ${pn(top - 6)} 60 ${pn(top - 10)}" stroke="#4D7C0F" stroke-width="2.5" fill="none" stroke-linecap="round"/>` + petLeaf(60, top - 8, 15, -130, '#84CC16') + petLeaf(60, top - 9, 15, -50, '#84CC16');
    return {
      back: '',
      body: petShadow(r * 0.85) + petBlobBody(uid, 60, cy, r, pitL, pit, 0.95) + petFace(60, cy - r * 0.05, r / 30, mood),
      top: topF,
      anchors: { top: { x: 60, y: top, w: r * 1.35 }, eyes: { x: 60, y: cy - r * 0.05, d: 9.5 * r / 30, s: r / 30 }, neck: { x: 60, y: cy + r * 0.5, w: r * 1.3 } }
    };
  }
  const h = [0, 0, 0, 62, 68, 72, 76][stage];
  const ty = 106 - h;
  const wt = h * 0.25, wb = h * 0.43;
  const pear = (sc) => {
    const H = h * sc, T = ty + (h - H) * 0.55, a = wt * sc, b = wb * sc;
    return `M60 ${pn(T)} C${pn(60 + a * 1.1)} ${pn(T)} ${pn(60 + a * 1.2)} ${pn(T + H * 0.3)} ${pn(60 + b * 0.8)} ${pn(T + H * 0.5)} C${pn(60 + b * 1.2)} ${pn(T + H * 0.72)} ${pn(60 + b)} ${pn(T + H)} 60 ${pn(T + H)} C${pn(60 - b)} ${pn(T + H)} ${pn(60 - b * 1.2)} ${pn(T + H * 0.72)} ${pn(60 - b * 0.8)} ${pn(T + H * 0.5)} C${pn(60 - a * 1.2)} ${pn(T + H * 0.3)} ${pn(60 - a * 1.1)} ${pn(T)} 60 ${pn(T)}Z`;
  };
  const gold = stage >= 6;
  const skin = gold ? '#B45309' : '#3F6212';
  let back = '', front = '', arms = '';
  const armC = gold ? '#B45309' : '#3F6212';
  if (stage === 4) arms = [-1, 1].map(k => `<path d="M${pn(60 + k * wb * 0.95)} ${pn(ty + h * 0.62)} q${pn(k * 8)} 4 ${pn(k * 9)} 12" stroke="${armC}" stroke-width="4" fill="none" stroke-linecap="round"/>`).join('');
  if (stage >= 5) {
    // Braccia piegate con bicipiti
    arms = [-1, 1].map(k => `<path d="M${pn(60 + k * wb * 0.92)} ${pn(ty + h * 0.62)} q${pn(k * 10)} -1 ${pn(k * 12)} -10 q${pn(k * 1)} -5 ${pn(-k * 2)} -9" stroke="${armC}" stroke-width="4.5" fill="none" stroke-linecap="round"/><ellipse cx="${pn(60 + k * (wb * 0.92 + 9))}" cy="${pn(ty + h * 0.53)}" rx="5" ry="4" fill="${armC}"/><circle cx="${pn(60 + k * (wb * 0.92 + 10))}" cy="${pn(ty + h * 0.62 - 20)}" r="3.4" fill="${armC}"/>`).join('');
  }
  if (gold) {
    back += `<circle cx="60" cy="${pn(ty + h * 0.55)}" r="${pn(h * 0.62)}" fill="#FCD34D" opacity=".22"/>` + petSparkle(24, 36, 5) + petSparkle(98, 44, 4) + petSparkle(30, 92, 3, '#F5A623');
    // Manubrio
    front += `<g transform="translate(${pn(60 + wb * 0.92 + 10)} ${pn(ty + h * 0.62 - 26)}) rotate(-20)"><rect x="-9" y="-1.5" width="18" height="3" rx="1.5" fill="#6B7280"/><rect x="-12" y="-5" width="4" height="10" rx="1.5" fill="#374151"/><rect x="8" y="-5" width="4" height="10" rx="1.5" fill="#374151"/></g>`;
  }
  const faceY = ty + h * 0.36;
  const legs = [-1, 1].map(k => `<path d="M${pn(60 + k * wb * 0.4)} ${pn(ty + h - 2)} l${pn(k * 1)} 5" stroke="${armC}" stroke-width="4" stroke-linecap="round"/>`).join('');
  return {
    back,
    body: petShadow(wb * 0.95) + (stage >= 4 ? legs : '') + arms +
      `<defs><radialGradient id="${uid}a" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="${gold ? '#FDE68A' : '#ECFCCB'}"/><stop offset="1" stop-color="${gold ? '#FBBF24' : '#BEF264'}"/></radialGradient></defs>` +
      `<path d="${pear(1)}" fill="${skin}"/><path d="${pear(0.84)}" fill="url(#${uid}a)"/>` +
      `<circle cx="60" cy="${pn(ty + h * 0.7)}" r="${pn(wb * 0.42)}" fill="${pit}"/><circle cx="${pn(60 - wb * 0.13)}" cy="${pn(ty + h * 0.66)}" r="${pn(wb * 0.11)}" fill="${pitL}" opacity=".7"/>` +
      front + petFace(60, faceY, h / 76, mood),
    top: '',
    anchors: { top: { x: 60, y: ty + 2, w: wt * 2.3 }, eyes: { x: 60, y: faceY, d: 9.5 * h / 76, s: h / 76 }, neck: { x: 60, y: ty + h * 0.5, w: wb * 1.3 } }
  };
};

// 4) Gocciolina → Nuvola arcobaleno
const drawDrop = (uid, stage, mood) => {
  if (stage <= 3) {
    const r = [0, 18, 21, 23][stage];
    const ty = 107 - r * 2.45;
    const by = ty + r * 1.45;
    let back = '', topF = '';
    if (stage >= 3) {
      back = [[-1.5, 0.7, 3], [1.55, 0.95, 2.4], [-1.25, 1.75, 2]].map(([kx, ky, rr]) => `<path d="M${pn(60 + kx * r)} ${pn(ty + ky * r - rr * 1.8)} C${pn(60 + kx * r + rr)} ${pn(ty + ky * r)} ${pn(60 + kx * r + rr)} ${pn(ty + ky * r + rr)} ${pn(60 + kx * r)} ${pn(ty + ky * r + rr)} C${pn(60 + kx * r - rr)} ${pn(ty + ky * r + rr)} ${pn(60 + kx * r - rr)} ${pn(ty + ky * r)} ${pn(60 + kx * r)} ${pn(ty + ky * r - rr * 1.8)}Z" fill="#7DD3FC"/>`).join('');
    }
    const shape = `M60 ${pn(ty)} C${pn(60 + r * 0.3)} ${pn(ty + r * 0.55)} ${pn(60 + r)} ${pn(ty + r * 0.95)} ${pn(60 + r)} ${pn(by)} A${pn(r)} ${pn(r)} 0 0 1 ${pn(60 - r)} ${pn(by)} C${pn(60 - r)} ${pn(ty + r * 0.95)} ${pn(60 - r * 0.3)} ${pn(ty + r * 0.55)} 60 ${pn(ty)}Z`;
    const bubbles = stage >= 2 ? `<circle cx="${pn(60 + r * 0.5)}" cy="${pn(by + r * 0.45)}" r="${pn(r * 0.09)}" fill="#fff" opacity=".6"/><circle cx="${pn(60 + r * 0.32)}" cy="${pn(by + r * 0.62)}" r="${pn(r * 0.06)}" fill="#fff" opacity=".5"/>` : '';
    return {
      back,
      body: petShadow(r * 0.85) + `<defs><radialGradient id="${uid}d" cx="38%" cy="45%" r="75%"><stop offset="0" stop-color="#BAE6FD"/><stop offset="1" stop-color="#0EA5E9"/></radialGradient></defs><path d="${shape}" fill="url(#${uid}d)"/>` +
        `<ellipse cx="${pn(60 - r * 0.45)}" cy="${pn(by - r * 0.35)}" rx="${pn(r * 0.16)}" ry="${pn(r * 0.3)}" fill="#fff" opacity=".45" transform="rotate(18 ${pn(60 - r * 0.45)} ${pn(by - r * 0.35)})"/>` + bubbles +
        petFace(60, by + r * 0.05, r / 30, mood),
      top: topF,
      anchors: { top: { x: 60, y: ty + r * 0.75, w: r * 1.05 }, eyes: { x: 60, y: by + r * 0.05, d: 9.5 * r / 30, s: r / 30 }, neck: { x: 60, y: by + r * 0.55, w: r * 1.3 } }
    };
  }
  // Nuvola: cerchi uniti (contorno = cerchi più grandi dietro)
  const s = [0, 0, 0, 0, 0.92, 1.02, 1.12][stage];
  const C = [[60, 74, 22], [40, 82, 15], [80, 82, 15], [49, 66, 14], [71, 66, 15], [60, 90, 16]].map(([x, y, r]) => [60 + (x - 60) * s, 106 - (106 - y) * s, r * s]);
  const out = C.map(([x, y, r]) => `<circle cx="${pn(x)}" cy="${pn(y)}" r="${pn(r + 1.8)}" fill="#7DD3FC"/>`).join('');
  const fill = C.map(([x, y, r]) => `<circle cx="${pn(x)}" cy="${pn(y)}" r="${pn(r)}" fill="#F0F9FF"/>`).join('');
  let back = '';
  if (stage >= 5) {
    const R = stage === 6 ? 46 : 40;
    back += ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA'].map((c, i) => `<path d="M${pn(60 - R + i * 4)} ${pn(92)} A${pn(R - i * 4)} ${pn(R - i * 4)} 0 0 1 ${pn(60 + R - i * 4)} 92" stroke="${c}" stroke-width="4" fill="none"/>`).join('');
  }
  if (stage >= 6) back = `<circle cx="60" cy="52" r="48" fill="#FDE68A" opacity=".25"/>` + back + petSparkle(18, 30, 5) + petSparkle(102, 36, 4, '#A78BFA');
  const topY = Math.min(...C.map(([, y, r]) => y - r));
  const faceY = 78 - (1 - s) * 10;
  const rain = stage === 4 ? [44, 60, 76].map((x, i) => `<path d="M${x} ${112 + i % 2 * 2} l-1.5 4" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"/>`).join('') : '';
  return {
    back,
    body: petShadow(30 * s) + out + fill + `<ellipse cx="${pn(46 * s + 60 * (1 - s))}" cy="${pn(64)}" rx="5" ry="3" fill="#fff" opacity=".9"/>` + rain + petFace(60, faceY, s, mood),
    top: '',
    anchors: { top: { x: 60, y: topY + 6, w: 30 * s }, eyes: { x: 60, y: faceY, d: 9.5 * s, s }, neck: { x: 60, y: faceY + 16 * s, w: 34 * s } }
  };
};

const PET_DRAW = [drawSprout, drawDragon, drawAvocado, drawDrop];

// --- Vestiti ---
const petHat = (id, a, e) => {
  const { x, y, w } = a;
  if (id === 'cap') return `<path d="M${pn(x - w / 2)} ${pn(y + 6)} Q${pn(x - w / 2)} ${pn(y - w * 0.42)} ${pn(x)} ${pn(y - w * 0.42)} Q${pn(x + w / 2)} ${pn(y - w * 0.42)} ${pn(x + w / 2)} ${pn(y + 6)}Z" fill="#F5A623"/><path d="M${pn(x + w * 0.05)} ${pn(y + 6)} Q${pn(x + w * 0.85)} ${pn(y + 1)} ${pn(x + w * 0.82)} ${pn(y + 9)} Q${pn(x + w * 0.4)} ${pn(y + 11)} ${pn(x + w * 0.05)} ${pn(y + 6)}Z" fill="#D97706"/><circle cx="${pn(x)}" cy="${pn(y - w * 0.42)}" r="2" fill="#D97706"/><path d="M${pn(x - w * 0.12)} ${pn(y - w * 0.1)} l${pn(w * 0.12)} ${pn(-w * 0.14)} l${pn(w * 0.12)} ${pn(w * 0.14)}" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  if (id === 'headband') return `<rect x="${pn(x - w * 0.52)}" y="${pn(y + w * 0.12)}" width="${pn(w * 1.04)}" height="${pn(w * 0.17)}" rx="${pn(w * 0.08)}" fill="#EF4444"/><rect x="${pn(x - w * 0.52)}" y="${pn(y + w * 0.17)}" width="${pn(w * 1.04)}" height="${pn(w * 0.05)}" fill="#fff" opacity=".85"/><path d="M${pn(x + w * 0.5)} ${pn(y + w * 0.2)} l7 -5 l1 7Z M${pn(x + w * 0.5)} ${pn(y + w * 0.22)} l8 3 l-5 5Z" fill="#DC2626"/>`;
  if (id === 'beanie') return `<path d="M${pn(x - w * 0.56)} ${pn(y + w * 0.2)} Q${pn(x - w * 0.56)} ${pn(y - w * 0.5)} ${pn(x)} ${pn(y - w * 0.5)} Q${pn(x + w * 0.56)} ${pn(y - w * 0.5)} ${pn(x + w * 0.56)} ${pn(y + w * 0.2)}Z" fill="#8B5CF6"/><rect x="${pn(x - w * 0.6)}" y="${pn(y + w * 0.05)}" width="${pn(w * 1.2)}" height="${pn(w * 0.2)}" rx="${pn(w * 0.08)}" fill="#6D28D9"/>${[-0.3, 0, 0.3].map(k => `<path d="M${pn(x + k * w)} ${pn(y - w * 0.38)} L${pn(x + k * w)} ${pn(y + w * 0.02)}" stroke="#A78BFA" stroke-width="1.5"/>`).join('')}<circle cx="${pn(x)}" cy="${pn(y - w * 0.55)}" r="${pn(w * 0.13)}" fill="#F5A623"/>`;
  if (id === 'crown') {
    const b = y + 3, t = y - w * 0.38;
    return `<path d="M${pn(x - w * 0.4)} ${pn(b)} L${pn(x - w * 0.44)} ${pn(t + 4)} L${pn(x - w * 0.2)} ${pn(b - w * 0.17)} L${pn(x)} ${pn(t)} L${pn(x + w * 0.2)} ${pn(b - w * 0.17)} L${pn(x + w * 0.44)} ${pn(t + 4)} L${pn(x + w * 0.4)} ${pn(b)}Z" fill="#FBBF24" stroke="#D97706" stroke-width="1.2" stroke-linejoin="round"/><circle cx="${pn(x)}" cy="${pn(b - 4)}" r="2.4" fill="#EF4444"/><circle cx="${pn(x - w * 0.24)}" cy="${pn(b - 3.5)}" r="1.8" fill="#3B82F6"/><circle cx="${pn(x + w * 0.24)}" cy="${pn(b - 3.5)}" r="1.8" fill="#10B981"/>`;
  }
  if (id === 'party') return `<path d="M${pn(x - w * 0.3)} ${pn(y + 4)} L${pn(x + w * 0.05)} ${pn(y - w * 0.85)} L${pn(x + w * 0.32)} ${pn(y + 4)}Z" fill="#20C997"/><path d="M${pn(x - w * 0.2)} ${pn(y - w * 0.2)} L${pn(x + w * 0.24)} ${pn(y - w * 0.14)} M${pn(x - w * 0.08)} ${pn(y - w * 0.5)} L${pn(x + w * 0.16)} ${pn(y - w * 0.46)}" stroke="#F5A623" stroke-width="3" stroke-linecap="round"/><circle cx="${pn(x + w * 0.05)}" cy="${pn(y - w * 0.88)}" r="3" fill="#7A4DF1"/>`;
  if (id === 'headphones' && e) {
    const L = x - e.d - 13 * e.s, R = x + e.d + 13 * e.s;
    return `<path d="M${pn(L + 2)} ${pn(e.y)} Q${pn(L - 2)} ${pn(y - w * 0.32)} ${pn(x)} ${pn(y - w * 0.32)} Q${pn(R + 2)} ${pn(y - w * 0.32)} ${pn(R - 2)} ${pn(e.y)}" stroke="#2B2233" stroke-width="3.5" fill="none" stroke-linecap="round"/>${[L, R].map(cx => `<rect x="${pn(cx - 4.5)}" y="${pn(e.y - 7)}" width="9" height="14" rx="4" fill="#EF4444"/><rect x="${pn(cx - 2)}" y="${pn(e.y - 4)}" width="4" height="8" rx="2" fill="#FCA5A5"/>`).join('')}`;
  }
  return '';
};
const petEyes = (id, e) => {
  if (!e) return '';
  const { x, y, d, s } = e;
  if (id === 'sunglasses') return [-1, 1].map(k => `<rect x="${pn(x + k * d - 6.5 * s)}" y="${pn(y - 4.5 * s)}" width="${pn(13 * s)}" height="${pn(9.5 * s)}" rx="${pn(4 * s)}" fill="#111827"/><path d="M${pn(x + k * d - 3.5 * s)} ${pn(y - 2 * s)} l${pn(3 * s)} ${pn(-1 * s)}" stroke="#fff" stroke-opacity=".6" stroke-width="${pn(1.4 * s)}" stroke-linecap="round"/>`).join('') + `<path d="M${pn(x - d + 6.5 * s)} ${pn(y - 2 * s)} Q${pn(x)} ${pn(y - 4.5 * s)} ${pn(x + d - 6.5 * s)} ${pn(y - 2 * s)}" stroke="#111827" stroke-width="${pn(2 * s)}" fill="none"/>`;
  if (id === 'round') return [-1, 1].map(k => `<circle cx="${pn(x + k * d)}" cy="${pn(y)}" r="${pn(6.6 * s)}" fill="#fff" fill-opacity=".18" stroke="#B45309" stroke-width="${pn(1.8 * s)}"/>`).join('') + `<path d="M${pn(x - d + 6.6 * s)} ${pn(y)} Q${pn(x)} ${pn(y - 3 * s)} ${pn(x + d - 6.6 * s)} ${pn(y)}" stroke="#B45309" stroke-width="${pn(1.8 * s)}" fill="none"/>`;
  return '';
};
const petNeck = (id, a) => {
  if (!a) return '';
  const { x, y, w } = a;
  if (id === 'scarf') return `<rect x="${pn(x - w * 0.48)}" y="${pn(y - 3.5)}" width="${pn(w * 0.96)}" height="8" rx="4" fill="#EF4444"/>${[-0.3, 0, 0.3].map(k => `<rect x="${pn(x + k * w - 1.5)}" y="${pn(y - 3.5)}" width="3" height="8" fill="#fff" opacity=".8"/>`).join('')}<path d="M${pn(x + w * 0.18)} ${pn(y + 2)} l3 13 l7 -2 l-3 -12Z" fill="#DC2626"/>`;
  if (id === 'bowtie') return `<path d="M${pn(x)} ${pn(y)} L${pn(x - 9)} ${pn(y - 5.5)} L${pn(x - 9)} ${pn(y + 5.5)}Z M${pn(x)} ${pn(y)} L${pn(x + 9)} ${pn(y - 5.5)} L${pn(x + 9)} ${pn(y + 5.5)}Z" fill="#7A4DF1"/><circle cx="${pn(x)}" cy="${pn(y)}" r="2.8" fill="#5B21B6"/>`;
  if (id === 'medal') return `<path d="M${pn(x - 7)} ${pn(y - 3)} L${pn(x)} ${pn(y + 7)} L${pn(x + 7)} ${pn(y - 3)}" stroke="#3B82F6" stroke-width="3.5" fill="none" stroke-linejoin="round"/><circle cx="${pn(x)}" cy="${pn(y + 12)}" r="6.5" fill="#FBBF24" stroke="#D97706" stroke-width="1.2"/>${petSparkle(x, y + 12, 3.5, '#FEF3C7')}`;
  if (id === 'chain') {
    let s = '';
    for (let i = 0; i <= 8; i++) { const t = i / 8; s += `<circle cx="${pn(x - w * 0.42 + t * w * 0.84)}" cy="${pn(y - 1 + Math.sin(t * Math.PI) * 6)}" r="2.3" fill="none" stroke="#FBBF24" stroke-width="1.6"/>`; }
    return s + `<circle cx="${pn(x)}" cy="${pn(y + 9)}" r="3.5" fill="#FBBF24"/>`;
  }
  return '';
};

// SVG completo. opts: { species, stage, mood, outfit: { hat, eyes, neck }, legendary, uid, size }
let petUidCounter = 0;
const petSvg = (opts = {}) => {
  const stage = Math.max(0, Math.min(6, opts.stage || 0));
  const uid = opts.uid || ('pet' + (++petUidCounter));
  const mood = opts.mood || 'normal';
  const art = stage === 0 ? drawEgg(uid, mood) : PET_DRAW[(opts.species || 0) % PET_DRAW.length](uid, stage, mood);
  const o = opts.outfit || {};
  const a = art.anchors;
  const aura = opts.legendary && stage > 0
    ? `<defs><radialGradient id="${uid}g"><stop offset="0" stop-color="#FDE68A" stop-opacity=".7"/><stop offset="1" stop-color="#FDE68A" stop-opacity="0"/></radialGradient></defs><circle cx="60" cy="64" r="56" fill="url(#${uid}g)"/>`
    : '';
  const wear = a ? petNeck(o.neck, a.neck) + petEyes(o.eyes, a.eyes) : '';
  // Il cappello va sopra al corpo ma sotto a foglie, fiori e corna
  const hat = a && o.hat ? petHat(o.hat, a.top, a.eyes) : '';
  const size = opts.size ? ` width="${opts.size}" height="${opts.size}"` : '';
  const silhouette = opts.silhouette ? ` style="filter: brightness(0); opacity: .18"` : '';
  return `<svg viewBox="0 0 120 120"${size} xmlns="http://www.w3.org/2000/svg"${silhouette}>${aura}${art.back}${art.body}${wear}${hat}${art.top}</svg>`;
};

// Immagine (per le card da condividere su canvas)
const petImage = (opts) => new Promise((resolve) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = () => resolve(null);
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(petSvg({ ...opts, size: 480 }));
});
