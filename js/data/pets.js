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
  { id: 'drop', name: 'Gocciolina', color: '#0EA5E9', stages: ['Gocciolina', 'Goccia', 'Goccia frizzante', 'Nuvoletta', 'Nuvola', 'Nuvola arcobaleno'] },
  // Da sbloccare: uno nuovo ogni volta che un compagno arriva alla forma finale
  { id: 'shroom', name: 'Funghetto', color: '#EF4444', locked: true, stages: ['Spora', 'Funghetto', 'Fungo a pois', 'Fungo saltellante', 'Fungo gigante', 'Fungo stellato'] },
  { id: 'star', name: 'Stellina', color: '#F59E0B', locked: true, stages: ['Polvere di stelle', 'Stellina', 'Stella', 'Stella cadente', 'Cometa', 'Supernova'] },
  { id: 'cat', name: 'Gattino', color: '#F97316', locked: true, stages: ['Gattino', 'Micio', 'Micio birbante', 'Gattone', 'Gatto atleta', 'Gatto cosmico'] }
];
const PET_BASE_IDS = PET_SPECIES.filter(s => !s.locked).map(s => s.id);
const petSpeciesById = (id) => Math.max(0, PET_SPECIES.findIndex(s => s.id === id));

// Vestiti: si sbloccano con la serie migliore di sempre
const PET_ITEMS = [
  { id: 'cap', slot: 'hat', name: 'Cappellino', icon: '🧢', unlock: 0 },
  { id: 'flower', slot: 'hat', name: 'Fiorellino', icon: '🌼', unlock: 2 },
  { id: 'headband', slot: 'hat', name: 'Fascia', icon: '🎽', unlock: 3 },
  { id: 'cape', slot: 'back', name: 'Mantello', icon: '🦸', unlock: 4 },
  { id: 'sunglasses', slot: 'eyes', name: 'Occhiali da sole', icon: '🕶️', unlock: 5 },
  { id: 'scarf', slot: 'neck', name: 'Sciarpa', icon: '🧣', unlock: 7 },
  { id: 'beanie', slot: 'hat', name: 'Berretto', icon: '🧶', unlock: 10 },
  { id: 'backpack', slot: 'back', name: 'Zainetto', icon: '🎒', unlock: 12 },
  { id: 'bowtie', slot: 'neck', name: 'Papillon', icon: '🎀', unlock: 14 },
  { id: 'mask', slot: 'eyes', name: 'Maschera da eroe', icon: '🦹', unlock: 18 },
  { id: 'round', slot: 'eyes', name: 'Occhialini', icon: '👓', unlock: 21 },
  { id: 'whistle', slot: 'neck', name: 'Fischietto', icon: '📯', unlock: 25 },
  { id: 'headphones', slot: 'hat', name: 'Cuffie', icon: '🎧', unlock: 30 },
  { id: 'stars', slot: 'eyes', name: 'Occhiali a stella', icon: '⭐', unlock: 35 },
  { id: 'lei', slot: 'neck', name: 'Collana di fiori', icon: '🌺', unlock: 40 },
  { id: 'party', slot: 'hat', name: 'Cappello da festa', icon: '🥳', unlock: 45 },
  { id: 'wings', slot: 'back', name: 'Ali', icon: '🪽', unlock: 50 },
  { id: 'medal', slot: 'neck', name: 'Medaglia', icon: '🏅', unlock: 60 },
  { id: 'tophat', slot: 'hat', name: 'Cilindro', icon: '🎩', unlock: 65 },
  { id: 'chain', slot: 'neck', name: 'Catena d\'oro', icon: '⛓️', unlock: 75 },
  { id: 'rainbowcape', slot: 'back', name: 'Mantello arcobaleno', icon: '🌈', unlock: 90 },
  { id: 'crown', slot: 'hat', name: 'Corona', icon: '👑', unlock: 100 }
];
const PET_SLOTS = [
  { id: 'hat', label: 'Testa' },
  { id: 'eyes', label: 'Occhi' },
  { id: 'neck', label: 'Collo' },
  { id: 'back', label: 'Schiena' }
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
// Specie "di partenza" calcolata dal seme (usata solo per chi aveva già un compagno prima che la specie venisse salvata)
const petSpeciesIndex = (seed, startKey) => petSpeciesById(PET_BASE_IDS[petHash(String(seed) + '|' + String(startKey)) % PET_BASE_IDS.length]);
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
const petShadow = (rx) => `<ellipse data-shadow="1" cx="60" cy="109" rx="${pn(rx)}" ry="4" fill="#000" opacity=".13"/>`;
const petBlobBody = (uid, cx, cy, r, light, dark, squash = 0.94) =>
  `<defs><radialGradient id="${uid}b" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></radialGradient></defs>` +
  `<ellipse cx="${pn(cx)}" cy="${pn(cy)}" rx="${pn(r)}" ry="${pn(r * squash)}" fill="url(#${uid}b)"/>` +
  `<ellipse cx="${pn(cx - r * 0.38)}" cy="${pn(cy - r * 0.48)}" rx="${pn(r * 0.22)}" ry="${pn(r * 0.13)}" fill="#fff" opacity=".35" transform="rotate(-25 ${pn(cx - r * 0.38)} ${pn(cy - r * 0.48)})"/>`;

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
    body: petShadow(r * 0.85) + petBlobBody(uid, 60, cy, r, '#86EFAC', g1) + front + petFace(60, cy - r * 0.05, r / 30, mood),
    top: topF,
    limbs: { x: r * 0.95, y: cy + r * 0.2, hip: r * 0.4, bottom: 106, color: g2, s: r / 28 },
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
    body: petShadow(r * 0.9) + petBlobBody(uid, 60, cy, r, p1, '#8B5CF6') + front + petFace(60, faceY, r / 30, mood) + shell,
    top: topF,
    limbs: { x: r * 0.95, y: cy + r * 0.2, hip: r * 0.4, bottom: 106, color: p2, s: r / 28, legs: stage > 1 },
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
    if (stage === 2) topF = `<path d="M60 ${pn(top + 2)} Q61 ${pn(top - 6)} 60 ${pn(top - 10)}" stroke="#4D7C0F" stroke-width="2.5" fill="none" stroke-linecap="round"/>` + petLeaf(60, top - 8, 15, -130, '#84CC16') + petLeaf(60, top - 9, 15, -50, '#84CC16');
    return {
      back: '',
      body: petShadow(r * 0.85) + petBlobBody(uid, 60, cy, r, pitL, pit, 0.95) + petFace(60, cy - r * 0.05, r / 30, mood),
      top: topF,
      limbs: { x: r * 0.95, y: cy + r * 0.2, hip: r * 0.4, bottom: 106, color: '#7C4A26', s: r / 28 },
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
  let back = '';
  const armC = gold ? '#B45309' : '#3F6212';
  if (gold) back += `<circle cx="60" cy="${pn(ty + h * 0.55)}" r="${pn(h * 0.62)}" fill="#FCD34D" opacity=".22"/>` + petSparkle(24, 36, 5) + petSparkle(98, 44, 4) + petSparkle(30, 92, 3, '#F5A623');
  const faceY = ty + h * 0.36;
  return {
    back,
    body: petShadow(wb * 0.95) +
      `<defs><radialGradient id="${uid}a" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="${gold ? '#FDE68A' : '#ECFCCB'}"/><stop offset="1" stop-color="${gold ? '#FBBF24' : '#BEF264'}"/></radialGradient></defs>` +
      `<path d="${pear(1)}" fill="${skin}"/><path d="${pear(0.84)}" fill="url(#${uid}a)"/>` +
      `<circle cx="60" cy="${pn(ty + h * 0.7)}" r="${pn(wb * 0.42)}" fill="${pit}"/><circle cx="${pn(60 - wb * 0.13)}" cy="${pn(ty + h * 0.66)}" r="${pn(wb * 0.11)}" fill="${pitL}" opacity=".7"/>` +
      petFace(60, faceY, h / 76, mood),
    top: '',
    // Da "palestrato" mostra i bicipiti; quello d'oro tiene anche un manubrio
    limbs: { x: wb * 0.9, y: ty + h * 0.62, hip: wb * 0.42, bottom: 106, color: armC, s: h / 66, pose: stage >= 5 ? 'flex' : 'down', dumbbell: gold },
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
      limbs: { x: r * 0.97, y: by + r * 0.25, hip: r * 0.4, bottom: 107, color: '#0284C7', s: r / 26 },
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
    limbs: { x: 34 * s, y: 106 - 22 * s, hip: 14 * s, bottom: 106, color: '#38BDF8', s: s * 1.05 },
    anchors: { top: { x: 60, y: topY + 6, w: 30 * s }, eyes: { x: 60, y: faceY, d: 9.5 * s, s }, neck: { x: 60, y: faceY + 16 * s, w: 34 * s } }
  };
};

// 5) Spora → Fungo stellato
const drawShroom = (uid, stage, mood) => {
  const sw = [0, 30, 34, 38, 40, 42, 44][stage], sh = [0, 24, 27, 30, 32, 34, 36][stage];
  const cw = [0, 24, 29, 34, 38, 42, 46][stage], ch = [0, 17, 21, 25, 28, 31, 34][stage];
  const stemTop = 106 - sh;
  const base = stemTop + 7;
  const capTop = base - ch;
  const gold = stage >= 6;
  const c1 = gold ? '#FDE68A' : '#FCA5A5', c2 = gold ? '#F59E0B' : '#DC2626';
  let back = '', front = '';
  if (stage >= 4) back += [-1, 1].map(k => `<path d="M${pn(60 + k * (sw / 2 + 8))} ${pn(stemTop + 8)} l${pn(k * 6)} -3 M${pn(60 + k * (sw / 2 + 9))} ${pn(stemTop + 15)} l${pn(k * 7)} 0" stroke="#FCA5A5" stroke-width="2.4" stroke-linecap="round"/>`).join('');
  if (gold) back += `<circle cx="60" cy="${pn(capTop + ch * 0.6)}" r="${pn(cw * 1.15)}" fill="#FDE68A" opacity=".25"/>` + petSparkle(20, 34, 5) + petSparkle(100, 40, 4, '#EF4444') + petSparkle(94, 92, 3, '#7A4DF1');
  // Gambo (corpo con la faccia)
  const stem = `<defs><linearGradient id="${uid}s" x1="0" x2="1"><stop offset="0" stop-color="#FFF7ED"/><stop offset="1" stop-color="#F5DEC4"/></linearGradient></defs>` +
    `<rect x="${pn(60 - sw / 2)}" y="${pn(stemTop)}" width="${pn(sw)}" height="${pn(sh)}" rx="${pn(sw * 0.42)}" fill="url(#${uid}s)" stroke="#E7C9A5" stroke-width="1.2"/>`;
  // Cappello a cupola con i pois
  const cap = `<defs><radialGradient id="${uid}c" cx="40%" cy="25%" r="85%"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient></defs>` +
    `<path d="M${pn(60 - cw)} ${pn(base)} C${pn(60 - cw)} ${pn(capTop - ch * 0.1)} ${pn(60 + cw)} ${pn(capTop - ch * 0.1)} ${pn(60 + cw)} ${pn(base)} Q60 ${pn(base + 5)} ${pn(60 - cw)} ${pn(base)}Z" fill="url(#${uid}c)"/>`;
  const dots = stage >= 2
    ? [[-0.5, 0.45, 0.17], [0.15, 0.22, 0.14], [0.6, 0.55, 0.13], [-0.1, 0.7, 0.1], [0.42, 0.85, 0.08], [-0.75, 0.85, 0.08]]
    : [[-0.35, 0.5, 0.16], [0.4, 0.45, 0.14]];
  const spots = dots.map(([kx, ky, kr]) => gold
    ? petSparkle(60 + kx * cw, capTop + ky * ch, kr * cw * 1.3, '#FFFFFF')
    : `<ellipse cx="${pn(60 + kx * cw)}" cy="${pn(capTop + ky * ch)}" rx="${pn(kr * cw)}" ry="${pn(kr * cw * 0.85)}" fill="#fff" opacity=".92"/>`).join('');
  const faceY = stemTop + 7 + (sh - 7) * 0.42;
  const s = sw / 44;
  return {
    back,
    body: petShadow(Math.max(sw * 0.7, cw * 0.7)) + stem + front + petFace(60, faceY, s, mood) + cap + spots,
    top: '',
    limbs: { x: sw * 0.47, y: stemTop + sh * 0.6, hip: sw * 0.27, bottom: 106, color: '#C9A27A', s: sw / 38 },
    anchors: { top: { x: 60, y: capTop + 3, w: cw * 0.95 }, eyes: { x: 60, y: faceY, d: 9.5 * s, s }, neck: { x: 60, y: faceY + 13 * s, w: sw * 1.05 } }
  };
};

// 6) Polvere di stelle → Supernova
const drawStar = (uid, stage, mood) => {
  const R = [0, 22, 26, 30, 33, 36, 39][stage];
  const cy = 104 - R * 0.809;
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? R * 0.52 : R;
    pts.push(`${pn(60 + Math.cos(a) * rr)},${pn(cy + Math.sin(a) * rr)}`);
  }
  const nova = stage >= 6;
  let back = '';
  if (stage >= 4) {
    // Scia dietro (stella cadente, poi cometa)
    const L = stage === 4 ? 26 : 42;
    back += `<defs><linearGradient id="${uid}t" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FBBF24" stop-opacity=".9"/><stop offset="1" stop-color="#FBBF24" stop-opacity="0"/></linearGradient></defs>` +
      [-0.35, 0, 0.35].map(k => `<path d="M${pn(60 - R * 0.35 + k * 10)} ${pn(cy - R * 0.2 - k * 10)} l${pn(-L)} ${pn(-L * 0.62)}" stroke="url(#${uid}t)" stroke-width="${k ? 5 : 8}" stroke-linecap="round"/>`).join('');
  }
  if (nova) {
    back = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA', '#F472B6'].map((c, i) => {
      const a = (i / 6) * Math.PI * 2 + 0.3;
      return `<path d="M${pn(60 + Math.cos(a) * R * 0.9)} ${pn(cy + Math.sin(a) * R * 0.9)} L${pn(60 + Math.cos(a) * R * 1.45)} ${pn(cy + Math.sin(a) * R * 1.45)}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`;
    }).join('') + `<circle cx="60" cy="${pn(cy)}" r="${pn(R * 1.25)}" fill="#FDE68A" opacity=".22"/>` + petSparkle(20, 28, 5, '#A78BFA') + petSparkle(102, 30, 4) + petSparkle(16, 92, 3, '#F472B6');
  }
  if (stage <= 2) back += petSparkle(60 - R - 6, cy - R * 0.6, 3.5) + petSparkle(60 + R + 5, cy - R * 0.2, 2.6, '#FDE68A');
  const fillA = nova ? '#FEF3C7' : '#FEF08A', fillB = nova ? '#F472B6' : '#F59E0B';
  const body = `<defs><radialGradient id="${uid}st" cx="42%" cy="35%" r="75%"><stop offset="0" stop-color="${fillA}"/><stop offset="1" stop-color="${fillB}"/></radialGradient></defs>` +
    `<polygon points="${pts.join(' ')}" fill="url(#${uid}st)" stroke="url(#${uid}st)" stroke-width="${pn(R * 0.28)}" stroke-linejoin="round"/>` +
    `<ellipse cx="${pn(60 - R * 0.3)}" cy="${pn(cy - R * 0.32)}" rx="${pn(R * 0.14)}" ry="${pn(R * 0.08)}" fill="#fff" opacity=".6" transform="rotate(-30 ${pn(60 - R * 0.3)} ${pn(cy - R * 0.32)})"/>`;
  const s = R / 38;
  const faceY = cy + R * 0.02;
  return {
    back,
    body: petShadow(R * 0.75) + body + petFace(60, faceY, s, mood),
    top: '',
    limbs: { x: 0, y: 0, hip: R * 0.42, bottom: cy + R * 0.62, color: '#D97706', s: R / 32, arms: false },
    anchors: { top: { x: 60, y: cy - R * 0.62, w: R * 0.75 }, eyes: { x: 60, y: faceY, d: 9.5 * s, s }, neck: { x: 60, y: cy + R * 0.42, w: R * 0.95 } }
  };
};

// 7) Gattino → Gatto cosmico
const drawCat = (uid, stage, mood) => {
  const r = [0, 19, 22, 25.5, 28, 30.5, 33][stage];
  const cy = 106 - r * 0.94;
  const top = cy - r * 0.94;
  const cosmic = stage >= 6;
  const c1 = cosmic ? '#C4B5FD' : '#FDBA74', c2 = cosmic ? '#4C1D95' : '#EA580C', dark = cosmic ? '#3B0764' : '#C2410C';
  let back = '', front = '';
  // Coda
  if (stage >= 2) {
    const L = stage === 2 ? 0.9 : 1.15;
    back += `<path d="M${pn(60 + r * 0.7)} ${pn(cy + r * 0.55)} Q${pn(60 + r * (1.1 + L * 0.3))} ${pn(cy + r * 0.5)} ${pn(60 + r * (1 + L * 0.25))} ${pn(cy - r * 0.15)} Q${pn(60 + r * (0.95 + L * 0.2))} ${pn(cy - r * 0.55)} ${pn(60 + r * (1.2 + L * 0.2))} ${pn(cy - r * 0.6)}" stroke="${c2}" stroke-width="${pn(r * 0.22)}" fill="none" stroke-linecap="round"/>`;
    if (stage === 5) back += `<rect x="${pn(60 + r * (1.02 + L * 0.25) - 5)}" y="${pn(cy - r * 0.05)}" width="10" height="5" rx="2" fill="#3B82F6"/>`;
  }
  if (cosmic) back = `<circle cx="60" cy="${pn(cy)}" r="${pn(r * 1.5)}" fill="#A78BFA" opacity=".2"/>` + back + petSparkle(22, 32, 5, '#FDE68A') + petSparkle(98, 30, 4, '#F472B6') + petSparkle(100, 92, 3, '#60A5FA');
  // Orecchie (dietro alla testa, parte del corpo così il cappello le copre)
  const ears = [-1, 1].map(k => `<path d="M${pn(60 + k * r * 0.25)} ${pn(top + r * 0.18)} L${pn(60 + k * r * 0.78)} ${pn(top - r * 0.38)} L${pn(60 + k * r * 0.88)} ${pn(top + r * 0.5)}Z" fill="${c2}" stroke="${c2}" stroke-width="3" stroke-linejoin="round"/><path d="M${pn(60 + k * r * 0.45)} ${pn(top + r * 0.2)} L${pn(60 + k * r * 0.74)} ${pn(top - r * 0.15)} L${pn(60 + k * r * 0.78)} ${pn(top + r * 0.32)}Z" fill="#FDA4AF"/>`).join('');
  // Strisce sulla fronte, baffi, zampette
  const stripes = [-1, 0, 1].map(k => `<path d="M${pn(60 + k * r * 0.2)} ${pn(top + r * 0.12)} l0 ${pn(r * (k ? 0.18 : 0.26))}" stroke="${dark}" stroke-width="${pn(r * 0.08)}" stroke-linecap="round" opacity="${cosmic ? 0 : 0.6}"/>`).join('');
  const s = r / 30;
  const faceY = cy - r * 0.05;
  const whiskers = [-1, 1].map(k => `<path d="M${pn(60 + k * r * 0.62)} ${pn(faceY + r * 0.28)} l${pn(k * r * 0.4)} ${pn(-r * 0.06)} M${pn(60 + k * r * 0.62)} ${pn(faceY + r * 0.36)} l${pn(k * r * 0.4)} ${pn(r * 0.06)}" stroke="${dark}" stroke-width="1.3" stroke-linecap="round" opacity=".55"/>`).join('');
  if (stage >= 3) front += `<ellipse cx="60" cy="${pn(cy + r * 0.5)}" rx="${pn(r * 0.42)}" ry="${pn(r * 0.3)}" fill="${cosmic ? '#EDE9FE' : '#FFEDD5'}"/>`;
  if (cosmic) front += [[-0.4, -0.35], [0.35, 0.1], [-0.15, 0.55], [0.5, -0.45]].map(([kx, ky]) => `<circle cx="${pn(60 + kx * r)}" cy="${pn(cy + ky * r)}" r="1.4" fill="#fff" opacity=".85"/>`).join('');
  return {
    back,
    body: petShadow(r * 0.85) + ears + petBlobBody(uid, 60, cy, r, c1, c2) + stripes + front + whiskers + petFace(60, faceY, s, mood),
    top: '',
    limbs: { x: r * 0.95, y: cy + r * 0.2, hip: r * 0.4, bottom: 106, color: dark, s: r / 28 },
    anchors: { top: { x: 60, y: top, w: r * 1.35 }, eyes: { x: 60, y: faceY, d: 9.5 * s, s }, neck: { x: 60, y: cy + r * 0.5, w: r * 1.3 } }
  };
};

const PET_DRAW = [drawSprout, drawDragon, drawAvocado, drawDrop, drawShroom, drawStar, drawCat];

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
  if (id === 'flower') {
    const fx = x + w * 0.28, fy = y + 1;
    return [0, 1, 2, 3, 4].map(i => { const a = (i / 5) * Math.PI * 2; return `<circle cx="${pn(fx + Math.cos(a) * 4.6)}" cy="${pn(fy + Math.sin(a) * 4.6)}" r="3.6" fill="#FDE047"/>`; }).join('') + `<circle cx="${pn(fx)}" cy="${pn(fy)}" r="3" fill="#F97316"/>` + petLeaf(fx - 4, fy + 4, 8, 150, '#4ADE80', false);
  }
  if (id === 'tophat') return `<rect x="${pn(x - w * 0.45)}" y="${pn(y)}" width="${pn(w * 0.9)}" height="5" rx="2.5" fill="#1F2937"/><rect x="${pn(x - w * 0.28)}" y="${pn(y - w * 0.55)}" width="${pn(w * 0.56)}" height="${pn(w * 0.57)}" rx="2" fill="#111827"/><rect x="${pn(x - w * 0.28)}" y="${pn(y - w * 0.12)}" width="${pn(w * 0.56)}" height="${pn(w * 0.1)}" fill="#7A4DF1"/>`;
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
  if (id === 'mask') return `<path d="M${pn(x - d - 9 * s)} ${pn(y - 2 * s)} Q${pn(x - d)} ${pn(y - 8 * s)} ${pn(x)} ${pn(y - 3.5 * s)} Q${pn(x + d)} ${pn(y - 8 * s)} ${pn(x + d + 9 * s)} ${pn(y - 2 * s)} Q${pn(x + d + 8 * s)} ${pn(y + 6 * s)} ${pn(x + d)} ${pn(y + 5.5 * s)} Q${pn(x)} ${pn(y + 4 * s)} ${pn(x - d)} ${pn(y + 5.5 * s)} Q${pn(x - d - 8 * s)} ${pn(y + 6 * s)} ${pn(x - d - 9 * s)} ${pn(y - 2 * s)}Z" fill="#2563EB"/>` +
    [-1, 1].map(k => `<ellipse cx="${pn(x + k * d)}" cy="${pn(y)}" rx="${pn(3.6 * s)}" ry="${pn(3 * s)}" fill="#fff"/><circle cx="${pn(x + k * d)}" cy="${pn(y)}" r="${pn(1.7 * s)}" fill="${PD}"/>`).join('') +
    `<path d="M${pn(x + d + 8 * s)} ${pn(y - 1 * s)} l${pn(7 * s)} ${pn(-3 * s)} M${pn(x + d + 8 * s)} ${pn(y + 1.5 * s)} l${pn(7 * s)} ${pn(3 * s)}" stroke="#2563EB" stroke-width="${pn(2.2 * s)}" stroke-linecap="round"/>`;
  if (id === 'stars') {
    const star = (cx, r) => { const p = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5; const rr = i % 2 ? r * 0.5 : r; p.push(`${pn(cx + Math.cos(a) * rr)},${pn(y + Math.sin(a) * rr)}`); } return `<polygon points="${p.join(' ')}" fill="#F472B6" fill-opacity=".85" stroke="#DB2777" stroke-width="${pn(1.2 * s)}" stroke-linejoin="round"/>`; };
    return star(x - d, 9 * s) + star(x + d, 9 * s) + `<path d="M${pn(x - d + 5 * s)} ${pn(y - 1 * s)} L${pn(x + d - 5 * s)} ${pn(y - 1 * s)}" stroke="#DB2777" stroke-width="${pn(1.6 * s)}"/>`;
  }
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
  if (id === 'whistle') return `<path d="M${pn(x - w * 0.36)} ${pn(y - 2)} Q${pn(x)} ${pn(y + 9)} ${pn(x + w * 0.36)} ${pn(y - 2)}" stroke="#EF4444" stroke-width="1.8" fill="none"/><g transform="translate(${pn(x)} ${pn(y + 9)})"><rect x="-3" y="-1" width="11" height="6" rx="3" fill="#D1D5DB" stroke="#6B7280" stroke-width="1"/><circle cx="-1" cy="3" r="4.2" fill="#E5E7EB" stroke="#6B7280" stroke-width="1"/><circle cx="-1" cy="3" r="1.4" fill="#6B7280"/></g>`;
  if (id === 'lei') {
    let s = '';
    const cols = ['#F472B6', '#FDE047', '#A78BFA', '#FB923C', '#34D399'];
    for (let i = 0; i <= 6; i++) {
      const t = i / 6, fx = x - w * 0.42 + t * w * 0.84, fy = y - 1 + Math.sin(t * Math.PI) * 5;
      s += [0, 1, 2, 3, 4].map(j => { const a = (j / 5) * Math.PI * 2; return `<circle cx="${pn(fx + Math.cos(a) * 2.6)}" cy="${pn(fy + Math.sin(a) * 2.6)}" r="2.3" fill="${cols[i % cols.length]}"/>`; }).join('') + `<circle cx="${pn(fx)}" cy="${pn(fy)}" r="1.4" fill="#fff"/>`;
    }
    return s;
  }
  return '';
};
// Schiena: dietro al corpo (back) + dettagli davanti (front)
const petBack = (id, a) => {
  if (!a || !id) return { back: '', front: '' };
  const { x, y, w } = a;
  if (id === 'cape' || id === 'rainbowcape') {
    const rainbow = id === 'rainbowcape';
    const fill = rainbow ? `url(#capeRb)` : '#DC2626';
    const defs = rainbow ? `<defs><linearGradient id="capeRb" x1="0" x2="1"><stop offset="0" stop-color="#F87171"/><stop offset=".25" stop-color="#FBBF24"/><stop offset=".5" stop-color="#34D399"/><stop offset=".75" stop-color="#60A5FA"/><stop offset="1" stop-color="#A78BFA"/></linearGradient></defs>` : '';
    return {
      back: defs + `<path d="M${pn(x - w * 0.42)} ${pn(y - 2)} Q${pn(x - w * 0.95)} ${pn(y + 22)} ${pn(x - w * 1.02)} 104 Q${pn(x - w * 0.5)} 99 ${pn(x)} 104 Q${pn(x + w * 0.5)} 99 ${pn(x + w * 1.02)} 104 Q${pn(x + w * 0.95)} ${pn(y + 22)} ${pn(x + w * 0.42)} ${pn(y - 2)}Z" fill="${fill}"/>`,
      front: `<circle cx="${pn(x - w * 0.36)}" cy="${pn(y)}" r="3" fill="#FBBF24"/><circle cx="${pn(x + w * 0.36)}" cy="${pn(y)}" r="3" fill="#FBBF24"/>`
    };
  }
  if (id === 'backpack') return {
    back: `<rect x="${pn(x + w * 0.25)}" y="${pn(y - 6)}" width="${pn(w * 0.62)}" height="${pn(w * 0.72)}" rx="7" fill="#20C997"/><rect x="${pn(x + w * 0.55)}" y="${pn(y + w * 0.22)}" width="${pn(w * 0.3)}" height="${pn(w * 0.26)}" rx="4" fill="#0F9F78"/>`,
    front: [-1, 1].map(k => `<path d="M${pn(x + k * w * 0.3)} ${pn(y - 5)} L${pn(x + k * w * 0.27)} ${pn(y + w * 0.45)}" stroke="#0F9F78" stroke-width="3.2" stroke-linecap="round"/>`).join('')
  };
  if (id === 'wings') {
    const wing = (k) => {
      const bx = x + k * w * 0.35, by = y - 8;
      return `<path d="M${pn(bx)} ${pn(by)} Q${pn(bx + k * 30)} ${pn(by - 34)} ${pn(bx + k * 46)} ${pn(by - 22)} Q${pn(bx + k * 40)} ${pn(by - 12)} ${pn(bx + k * 44)} ${pn(by - 6)} Q${pn(bx + k * 34)} ${pn(by)} ${pn(bx + k * 38)} ${pn(by + 8)} Q${pn(bx + k * 24)} ${pn(by + 10)} ${pn(bx)} ${pn(by + 14)}Z" fill="#FFFFFF" stroke="#C7D2FE" stroke-width="1.6" stroke-linejoin="round"/>` +
        `<path d="M${pn(bx + k * 10)} ${pn(by - 2)} Q${pn(bx + k * 24)} ${pn(by - 14)} ${pn(bx + k * 34)} ${pn(by - 14)} M${pn(bx + k * 10)} ${pn(by + 5)} Q${pn(bx + k * 22)} ${pn(by)} ${pn(bx + k * 30)} ${pn(by + 1)}" stroke="#C7D2FE" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
    };
    return { back: wing(-1) + wing(1), front: '' };
  }
  return { back: '', front: '' };
};

// --- Movimenti nei video da condividere (canvas, js/share/draw.js → drawSharePet) ---
// Il compagno è diviso in pezzi (petImage → img.rig): ombra, gambe, corpo e braccia si muovono
// ognuno per conto suo, come nell'app. Unità = viewBox 120 (dy negativo = verso l'alto), gradi.
// Posa: dx, dy (tutto il corpo), rot (tutto, dai piedi), flip, legs (altezza gambe, 1 = dritte),
// lean (busto), usx/usy (schiacciamento del busto), aL/aR (braccia alzate: 0 giù, 150 in alto),
// lL/lR (gambe aperte), pop (scala d'ingresso), alpha.
const petPose = () => ({ dx: 0, dy: 0, rot: 0, flip: false, legs: 1, lean: 0, usx: 1, usy: 1, aL: 0, aR: 0, lL: 0, lR: 0, pop: 1, alpha: 1 });

// Valore al punto p (0..1) passando per le tappe [[p, v], ...], con curve morbide tra una tappa e l'altra
const petKey = (p, keys) => {
  if (p <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (p <= keys[i][0]) {
      const [p0, v0] = keys[i - 1], [p1, v1] = keys[i];
      const u = (p - p0) / ((p1 - p0) || 1);
      return v0 + (v1 - v0) * u * u * (3 - 2 * u);
    }
  }
  return keys[keys.length - 1][1];
};

// Salto vero: si piega (preparazione), spinge, vola, atterra schiacciandosi e torna su.
// p = 0..1 dentro il salto, h = altezza. Le braccia salgono con la spinta.
const petHop = (P, p, h, arms = 140) => {
  const air = p > 0.24 && p < 0.76 ? (p - 0.24) / 0.52 : -1;
  P.dy += air >= 0 ? -h * 4 * air * (1 - air) : 0;
  P.legs = petKey(p, [[0, 1], [0.18, 0.66], [0.26, 1.1], [0.4, 1], [0.72, 0.98], [0.8, 0.68], [0.92, 1.03], [1, 1]]);
  P.usx = petKey(p, [[0, 1], [0.18, 1.08], [0.27, 0.93], [0.45, 1], [0.78, 1], [0.82, 1.1], [0.93, 0.97], [1, 1]]);
  P.usy = 2 - P.usx;
  const a = petKey(p, [[0, 0], [0.18, -20], [0.32, arms], [0.62, arms * 0.85], [0.82, 20], [1, 0]]);
  P.aL = a; P.aR = a;
  const tuck = air >= 0 ? Math.sin(air * Math.PI) * 12 : 0;
  P.lL = tuck; P.lR = tuck;
  return P;
};

const PET_HELLO = 1.5;   // secondi di saluto prima del balletto

// t = secondi da quando è atterrato; k = ingresso (0..1, già "addolcito" come gli altri elementi)
const petMotion = (id, t, k = 1) => {
  const P = petPose();
  // Ingresso: cade dall'alto con le braccia su, atterra schiacciandosi
  if (k < 1) {
    const raw = 1 - Math.cbrt(1 - Math.max(0, k));   // tempo lineare
    if (raw < 0.6) {
      const q = raw / 0.6;
      P.dy = -70 * (1 - q * q); P.alpha = Math.min(1, q * 3);
      P.aL = P.aR = 150; P.lL = P.lR = 8; P.usx = 0.94; P.usy = 1.06; P.legs = 1.08;
    } else {
      const q = (raw - 0.6) / 0.4;
      P.legs = petKey(q, [[0, 0.62], [0.5, 1.06], [1, 1]]);
      P.usx = petKey(q, [[0, 1.16], [0.5, 0.95], [1, 1]]); P.usy = 2 - P.usx;
      P.aL = P.aR = petKey(q, [[0, 70], [0.5, 30], [1, 0]]);
    }
    return P;
  }
  // Saluto: si gira un po' e fa ciao con la mano
  if (t < PET_HELLO) {
    const w = petKey(t / PET_HELLO, [[0, 0], [0.15, 1], [0.85, 1], [1, 0]]);
    P.lean = -5 * w;
    P.aR = w * (100 + 22 * Math.sin(t * 15));
    P.aL = w * 12;
    P.usy = 1 + 0.02 * Math.sin(t * 7); P.usx = 2 - P.usy;
    return P;
  }
  const d = t - PET_HELLO;
  const loop = (period) => (d % period) / period;
  const S = Math.sin, PI2 = Math.PI * 2;
  switch (id) {
    case 'sprout': {     // ondeggia al vento a braccia alzate, battendo i piedi a tempo
      const p = loop(1.4), s = S(p * PI2);
      P.lean = s * 11; P.dx = s * 3;
      P.aL = 125 + 25 * s; P.aR = 125 - 25 * s;
      const b = Math.abs(S(p * PI2 * 2));
      P.legs = 1 - 0.1 * b; P.usy = 1 + 0.03 * (1 - b); P.usx = 2 - P.usy;
      P.lL = Math.max(0, s) * 12; P.lR = Math.max(0, -s) * 12;
      break;
    }
    case 'dragon': {     // due saltelli, poi un salto grande sbattendo le ali (braccia) e un ruggito
      const p = loop(3);
      if (p < 0.2) petHop(P, p / 0.2, 8, 60);
      else if (p < 0.4) petHop(P, (p - 0.2) / 0.2, 8, 60);
      else if (p < 0.75) {
        const q = (p - 0.4) / 0.35;
        petHop(P, q, 26, 120);
        if (q > 0.25 && q < 0.75) { const f = S(q * 40) * 30; P.aL = 110 + f; P.aR = 110 + f; P.lean = S(q * Math.PI) * 6; }
      } else {
        const q = (p - 0.75) / 0.25, r = petKey(q, [[0, 0], [0.25, 1], [0.8, 1], [1, 0]]);
        P.lean = -8 * r; P.usx = 1 + 0.08 * r; P.usy = 1 + 0.05 * r;
        P.aL = P.aR = 85 * r + S(q * 30) * 6 * r; P.lL = P.lR = 10 * r;
      }
      break;
    }
    case 'avocado': {    // squat da palestra a braccia tese, poi mostra i muscoli
      const p = loop(3.2);
      if (p < 0.6) {
        const q = (p % 0.3) / 0.3, dn = petKey(q, [[0, 0], [0.4, 1], [0.6, 1], [1, 0]]);
        P.legs = 1 - 0.36 * dn; P.usx = 1 + 0.05 * dn; P.usy = 1 - 0.03 * dn;
        P.aL = P.aR = 90 * petKey(q, [[0, 0], [0.3, 1], [0.7, 1], [1, 0]]);
        P.lL = P.lR = 9 * dn; P.lean = 3 * dn;
      } else {
        const q = (p - 0.6) / 0.4, r = petKey(q, [[0, 0], [0.15, 1], [0.85, 1], [1, 0]]);
        const pump = (S(q * 26) + 1) / 2;
        P.aL = P.aR = r * (115 + 25 * pump);
        P.usx = 1 + 0.06 * r * pump; P.usy = 1 + 0.03 * r;
        P.dx = S(q * PI2) * 4 * r; P.lean = S(q * PI2 * 2) * 4 * r;
      }
      break;
    }
    case 'drop': {       // gelatina che galleggia, braccia a onda
      const p = loop(1.6), s = S(p * PI2);
      P.dy = -6 - 6 * s;
      P.usx = 1 + 0.09 * S(p * PI2 * 2); P.usy = 2 - P.usx;
      P.aL = 70 + 55 * S(p * PI2 * 2); P.aR = 70 + 55 * S(p * PI2 * 2 + Math.PI);
      P.lL = 6 + 6 * S(p * PI2 * 2); P.lR = 6 - 6 * S(p * PI2 * 2);
      P.lean = s * 5;
      break;
    }
    case 'shroom': {     // molla: salti continui, schiacciandosi bene a terra
      const p = loop(0.8);
      petHop(P, p, 18, 150);
      const n = Math.floor(d / 0.8);
      P.lean = (n % 2 ? 1 : -1) * 7 * S(p * Math.PI);
      break;
    }
    case 'star': {       // ondeggia e brilla, saltellando a destra e a sinistra
      const p = loop(1.6), s = S(p * PI2);
      const hop = Math.abs(S(p * PI2));
      P.dy = -10 * hop; P.dx = s * 6;
      P.lean = s * 16;
      P.usx = P.usy = 1 + 0.05 * S(p * PI2 * 4);
      P.legs = 1 - 0.18 * (1 - hop) * (1 - hop);
      P.lL = Math.max(0, s) * 16; P.lR = Math.max(0, -s) * 16;
      break;
    }
    case 'cat': {        // passo laterale: due passi a destra, si gira, due a sinistra; braccia a tempo
      const p = loop(2.4), side = p < 0.5 ? 1 : -1, q = (p % 0.5) / 0.5;
      const step = (q * 2) % 1, phase = q < 0.5 ? 0 : 1;
      P.flip = side < 0;
      P.dx = side * (-8 + 16 * ((phase + petKey(step, [[0, 0], [0.8, 1], [1, 1]])) / 2));
      P.dy = -7 * S(Math.min(1, step / 0.8) * Math.PI);
      P.legs = petKey(step, [[0, 0.82], [0.2, 1.04], [0.8, 1], [1, 0.82]]);
      const sw = S(step * Math.PI) * (phase ? -1 : 1);
      P.aL = 30 + 35 * sw; P.aR = 30 - 35 * sw;
      P.lL = Math.max(0, sw) * 14; P.lR = Math.max(0, -sw) * 14;
      P.lean = 5;
      break;
    }
    default:             // uovo: dondola
      P.rot = S(d * 4) * 0.12;
  }
  // Primo mezzo secondo: entra nel balletto senza scatti
  const ease = Math.min(1, d / 0.5);
  if (ease < 1) {
    const base = petPose();
    for (const key of ['dx', 'dy', 'rot', 'legs', 'lean', 'usx', 'usy', 'aL', 'aR', 'lL', 'lR']) P[key] = base[key] + (P[key] - base[key]) * ease;
  }
  return P;
};

// --- Braccine e gambette stilizzate ---
// Il corpo viene rimpicciolito un po' e alzato (PET_LIFT) per fare spazio alle gambe.
// Ogni arto è un gruppo con classe (pl-al, pl-ar, pl-ll, pl-lr) e perno sulla spalla/anca:
// in app lo muove il CSS (saluta, cammina, balla); nelle immagini da condividere resta fermo.
const PET_LIFT = { s: 0.9, y: 108, base: 118 };
const petLiftX = (x) => 60 + PET_LIFT.s * (x - 60);
const petLiftY = (y) => PET_LIFT.y + PET_LIFT.s * (y - PET_LIFT.base);
const petLimb = (cls, x, y, inner) => `<g class="pl ${cls}" style="transform-origin:${pn(x)}px ${pn(y)}px">${inner}</g>`;
const petLimbs = (L) => {
  const c = L.color, s = Math.max(0.7, Math.min(1.25, L.s || 1));
  const w = pn(4.2 * s);
  let legs = '', arms = '', legLen = 0;
  if (L.legs !== false) {
    const top = petLiftY(L.bottom) - 2;
    legLen = 106 - top;
    legs = [-1, 1].map(k => {
      const x = 60 + k * L.hip * PET_LIFT.s;
      const inner = `<path d="M${pn(x)} ${pn(top)} L${pn(x + k * 0.6)} 104.5" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>` +
        `<ellipse cx="${pn(x + k * 2.2 * s)}" cy="106" rx="${pn(4.4 * s)}" ry="${pn(2.6 * s)}" fill="${c}"/>`;
      return petLimb(k < 0 ? 'pl-ll' : 'pl-lr', x, top, inner);
    }).join('');
  }
  if (L.arms !== false) {
    const y = petLiftY(L.y);
    arms = [-1, 1].map(k => {
      const x = petLiftX(60 + k * L.x * 0.94);
      let inner;
      if (L.pose === 'flex') {
        // Braccio piegato con il bicipite in vista
        const ex = x + k * 10 * s, ey = y - 1, hx = x + k * 9 * s, hy = y - 13 * s;
        inner = `<path d="M${pn(x)} ${pn(y)} Q${pn(ex)} ${pn(ey + 1)} ${pn(ex)} ${pn(ey - 3)} Q${pn(ex + k * 1)} ${pn(hy + 3)} ${pn(hx)} ${pn(hy)}" stroke="${c}" stroke-width="${pn(4.6 * s)}" fill="none" stroke-linecap="round"/>` +
          `<ellipse cx="${pn(x + k * 6.5 * s)}" cy="${pn(y - 3.5 * s)}" rx="${pn(4.2 * s)}" ry="${pn(3.4 * s)}" fill="${c}"/><circle cx="${pn(hx)}" cy="${pn(hy)}" r="${pn(3.2 * s)}" fill="${c}"/>`;
        if (L.dumbbell && k > 0) inner += `<g transform="translate(${pn(hx)} ${pn(hy - 1)}) rotate(-20)"><rect x="-8" y="-1.4" width="16" height="2.8" rx="1.4" fill="#6B7280"/><rect x="-11" y="-4.5" width="3.6" height="9" rx="1.4" fill="#374151"/><rect x="7.4" y="-4.5" width="3.6" height="9" rx="1.4" fill="#374151"/></g>`;
      } else {
        const hx = x + k * 7.5 * s, hy = y + 10 * s;
        inner = `<path d="M${pn(x)} ${pn(y)} Q${pn(x + k * 6 * s)} ${pn(y + 2 * s)} ${pn(hx)} ${pn(hy)}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/>` +
          `<circle cx="${pn(hx)}" cy="${pn(hy)}" r="${pn(2.9 * s)}" fill="${c}"/>`;
      }
      return petLimb((k < 0 ? 'pl-al' : 'pl-ar') + (L.pose === 'flex' ? ' pl-flex' : ''), x, y, inner);
    }).join('');
  }
  return { legs, arms, legLen };
};
// Ritardo diverso per ogni compagno: in una griglia non si muovono tutti insieme
const petDelay = (uid) => { let h = 0; for (const ch of String(uid)) h = (h * 31 + ch.charCodeAt(0)) % 997; return -(h % 80) / 10; };

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
  const backItem = a ? petBack(o.back, a.neck) : { back: '', front: '' };
  const wear = a ? backItem.front + petNeck(o.neck, a.neck) + petEyes(o.eyes, a.eyes) : '';
  // Il cappello va sopra al corpo ma sotto a foglie, fiori e corna
  const hat = a && o.hat ? petHat(o.hat, a.top, a.eyes) : '';
  const size = opts.size ? ` width="${opts.size}" height="${opts.size}"` : '';
  const silhouette = opts.silhouette ? `filter: brightness(0); opacity: .18;` : '';
  const inner = `${art.back}${backItem.back}${art.body}${wear}${hat}${art.top}`;
  if (!art.limbs) return `<svg viewBox="0 0 120 120"${size} xmlns="http://www.w3.org/2000/svg"${silhouette ? ` style="${silhouette}"` : ''}>${aura}${inner}</svg>`;
  // Con gli arti: l'ombra resta a terra, il corpo sale sulle gambe
  const shadow = (inner.match(/<ellipse data-shadow="1"[^>]*\/>/) || [''])[0];
  const limbs = petLimbs(art.limbs);
  const lifted = `<g transform="translate(60 ${PET_LIFT.y}) scale(${PET_LIFT.s}) translate(-60 -${PET_LIFT.base})">${inner.replace(shadow, '')}</g>`;
  // Pezzi separati per le mosse (css/style.css): ombra a terra, tutto il corpo (salti),
  // gambe (si piegano dal piede) e parte alta (si abbassa quando le gambe si piegano, si gira, respira)
  const style = `--leg:${pn(limbs.legLen)}px;--pd:${petDelay(uid)}s;${silhouette}`;
  return `<svg viewBox="0 0 120 120"${size} xmlns="http://www.w3.org/2000/svg" style="${style}">${aura}` +
    `<g class="pet-sh" style="transform-origin:60px 109px">${shadow}</g>` +
    `<g class="pet-all" style="transform-origin:60px 107px"><g class="pet-legs" style="transform-origin:60px 106px">${limbs.legs}</g>` +
    `<g class="pet-up" style="transform-origin:60px 100px">${lifted}${limbs.arms}</g></g></svg>`;
};

// Immagine (per le card da condividere su canvas). Se il compagno ha braccia e gambe,
// img.rig contiene anche i pezzi separati (stesso disegno, un pezzo per immagine) con i perni,
// così nei video ogni parte si muove per conto suo.
const PET_RIG_PARTS = {
  shadow: '.pet-sh, .pet-sh *',
  legL: '.pl-ll, .pl-ll *',
  legR: '.pl-lr, .pl-lr *',
  body: 'svg > circle, .pet-up > g:not(.pl), .pet-up > g:not(.pl) *',
  armL: '.pl-al, .pl-al *',
  armR: '.pl-ar, .pl-ar *'
};
const petSvgImage = (svg) => new Promise((resolve) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = () => resolve(null);
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
});
const petRig = async (svg) => {
  const pivots = {};
  svg.replace(/class="pl (pl-\w\w)[^"]*" style="transform-origin:([\d.-]+)px ([\d.-]+)px"/g, (m, cls, x, y) => { pivots[cls] = [+x, +y]; return m; });
  const leg = +((svg.match(/--leg:([\d.-]+)px/) || [])[1] || 0);
  const names = Object.keys(PET_RIG_PARTS);
  const imgs = await Promise.all(names.map(name => {
    if ((name === 'armL' || name === 'armR') && !pivots[name === 'armL' ? 'pl-al' : 'pl-ar']) return null;
    if ((name === 'legL' || name === 'legR') && !pivots[name === 'legL' ? 'pl-ll' : 'pl-lr']) return null;
    const style = `<style>*{visibility:hidden}${PET_RIG_PARTS[name]}{visibility:visible}</style>`;
    return petSvgImage(svg.replace(/^<svg[^>]*>/, (open) => open + style));
  }));
  if (!imgs[names.indexOf('body')]) return null;
  const rig = { leg, flex: svg.includes('pl-flex'), pivots: { armL: pivots['pl-al'], armR: pivots['pl-ar'], legL: pivots['pl-ll'], legR: pivots['pl-lr'] } };
  names.forEach((name, i) => { rig[name] = imgs[i]; });
  return rig;
};
const petImage = async (opts) => {
  const svg = petSvg({ ...opts, size: 480 });
  const img = await petSvgImage(svg);
  if (img && svg.includes('class="pet-up"')) {
    try { img.rig = await petRig(svg); } catch (e) { img.rig = null; }
  }
  return img;
};
