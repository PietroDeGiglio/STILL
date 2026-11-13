// ---------------------------------------------------------------
// CONDIVISIONE: disegno delle card social su canvas (immagine e video).
// Funzioni pure: ricevono i dati già pronti da app.js e disegnano.
// ---------------------------------------------------------------

// Foto scelta dall'utente per il tema "Foto": resta solo in memoria
let sharePhoto = null;

const LOGO_PATH = 'M 234.00 426.38 C209.86,423.32 189.38,417.67 171.50,409.10 C150.37,398.99 135.05,387.90 117.65,370.14 L 107.81 360.08 L 110.05 356.93 C111.29,355.19 114.68,351.24 117.59,348.14 L 122.88 342.50 L 133.69 353.06 C150.85,369.83 160.49,377.15 176.15,385.28 C218.15,407.09 263.50,409.97 306.06,393.53 C330.63,384.04 351.53,369.28 370.15,348.25 C372.71,345.36 375.28,343.00 375.85,343.00 C376.42,343.00 380.06,346.65 383.92,351.12 C389.32,357.36 390.74,359.61 390.06,360.89 C388.22,364.32 363.11,387.73 355.47,393.14 C325.52,414.33 290.89,425.70 254.00,426.47 C244.93,426.66 235.93,426.62 234.00,426.38 ZM 393.50 342.35 C385.86,332.80 373.11,317.43 350.46,290.45 C333.50,270.25 332.38,269.00 331.24,269.00 C330.66,269.00 327.50,271.92 324.22,275.50 C320.95,279.08 317.78,282.00 317.19,282.00 C316.60,282.00 310.58,275.18 303.81,266.84 C281.27,239.09 251.20,204.00 249.96,204.00 C249.50,204.00 240.77,213.87 230.57,225.92 C220.36,237.98 211.44,248.44 210.74,249.17 C210.05,249.90 203.96,257.09 197.21,265.15 C190.46,273.21 184.27,280.36 183.46,281.04 C182.21,282.07 180.91,281.14 175.55,275.39 C169.91,269.34 168.95,268.68 167.71,270.00 C166.94,270.83 161.19,277.58 154.94,285.00 C148.70,292.42 140.16,302.33 135.97,307.00 C131.77,311.67 121.50,323.49 113.14,333.25 C104.77,343.01 97.59,351.00 97.17,351.00 C95.69,351.00 83.00,336.72 83.00,335.06 C83.00,334.62 91.66,324.15 102.25,311.78 C112.84,299.42 130.95,278.12 142.50,264.45 C154.05,250.78 164.67,238.25 166.11,236.61 L 168.72 233.63 L 171.11 236.11 C172.42,237.48 175.27,240.56 177.43,242.95 L 181.35 247.29 L 183.93 244.31 C185.34,242.67 192.80,233.51 200.50,223.95 C224.17,194.55 248.95,165.00 249.91,165.00 C250.92,165.00 281.50,201.36 303.94,229.25 C311.80,239.01 318.40,247.00 318.61,247.00 C318.82,247.00 322.10,243.74 325.91,239.75 C329.71,235.76 333.02,232.73 333.26,233.00 C333.50,233.27 339.72,240.93 347.07,250.00 C354.42,259.08 364.94,271.93 370.46,278.56 C382.52,293.06 412.95,330.42 414.87,333.09 C416.11,334.81 415.76,335.55 411.37,340.59 C408.69,343.66 405.35,347.53 403.94,349.19 L 401.38 352.21 L 393.50 342.35 ZM 85.20 303.25 C76.77,281.09 73.91,265.36 73.87,241.00 C73.81,196.87 89.64,155.67 119.93,121.15 C142.72,95.17 179.94,73.76 215.78,66.01 C292.38,49.46 372.46,90.48 407.47,164.22 C420.13,190.90 425.81,218.66 424.61,248.00 C423.89,265.31 422.28,275.89 418.18,290.00 C414.57,302.44 411.37,310.00 409.70,310.00 C407.93,310.00 395.00,296.03 395.00,294.12 C395.00,293.21 396.14,288.88 397.54,284.49 C409.05,248.24 404.28,203.23 385.00,166.29 C368.00,133.71 337.00,106.60 302.00,93.69 C256.43,76.88 208.04,82.59 166.00,109.73 C118.50,140.39 92.19,194.06 96.01,252.50 C96.94,266.74 97.67,271.04 101.45,284.50 C102.84,289.45 103.98,293.99 103.99,294.60 C103.99,295.20 101.09,298.80 97.53,302.60 C93.97,306.39 91.05,309.84 91.03,310.25 C91.01,310.66 90.36,311.00 89.57,311.00 C88.71,311.00 86.97,307.92 85.20,303.25 Z';
const BRAND = ['#20C997', '#F5A623', '#7A4DF1'];
const APP_URL = 'https://pietrodegiglio.github.io/STILL/';   // cambiare qui quando l'app avrà il suo dominio
const APP_URL_SHORT = 'pietrodegiglio.github.io/STILL';
const SHARE_FONT = '"Plus Jakarta Sans", sans-serif';
const VIDEO_SECONDS = 6;     // durata dell'animazione d'ingresso (e ciclo dello sfondo)
const VIDEO_TOTAL = 15;      // durata totale del video esportato: il resto mostra i risultati

// --- Utilità di disegno ---
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const easeOut = (v) => 1 - Math.pow(1 - clamp01(v), 3);
const roundRect = (ctx, x, y, w, h, r) => {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
};
const setFont = (ctx, weight, size) => { ctx.font = `${weight} ${size}px ${SHARE_FONT}`; };
const fitFont = (ctx, text, weight, size, maxWidth, min = 20) => {
  let s = size;
  setFont(ctx, weight, s);
  while (s > min && ctx.measureText(text).width > maxWidth) { s -= 4; setFont(ctx, weight, s); }
  return s;
};
const ellipsize = (ctx, text, maxWidth) => {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(t + '…').width > maxWidth) t = t.slice(0, -1);
  return t + '…';
};
const spacedText = (ctx, text, x, y, spacing, align = 'left') => {
  const chars = [...text];
  const width = chars.reduce((w, ch) => w + ctx.measureText(ch).width, 0) + spacing * (chars.length - 1);
  let cx = align === 'center' ? x - width / 2 : (align === 'right' ? x - width : x);
  const prevAlign = ctx.textAlign;
  ctx.textAlign = 'left';
  chars.forEach(ch => { ctx.fillText(ch, cx, y); cx += ctx.measureText(ch).width + spacing; });
  ctx.textAlign = prevAlign;
  return width;
};
// Gradiente del brand che scorre (come .cangiante nell'app): phase 0..1
const brandGradient = (ctx, x0, y0, x1, y1, phase = 0) => {
  const dx = x1 - x0, dy = y1 - y0;
  const g = ctx.createLinearGradient(x0 - dx * 0.5 * phase, y0 - dy * 0.5 * phase, x0 + dx * (1.5 - 0.5 * phase), y0 + dy * (1.5 - 0.5 * phase));
  g.addColorStop(0, BRAND[0]); g.addColorStop(1 / 3, BRAND[1]); g.addColorStop(2 / 3, BRAND[2]); g.addColorStop(1, BRAND[0]);
  return g;
};
const blob = (ctx, x, y, r, color, alpha) => {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color + Math.round(alpha * 255).toString(16).padStart(2, '0'));
  g.addColorStop(1, color + '00');
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
};
// Conta da 0 al valore (prima cifra della stringa), mantenendo decimali e suffisso
const countUp = (text, k) => {
  if (k >= 1) return text;
  const m = /^([+−-]?)([\d.]+(?:,\d+)?)(.*)$/.exec(text);
  if (!m) return text;
  const target = parseFloat(m[2].replace(/\./g, '').replace(',', '.'));
  if (!isFinite(target)) return text;
  const decimals = (m[2].split(',')[1] || '').length;
  const v = target * easeOut(k);
  return m[1] + v.toLocaleString('it-IT', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + m[3];
};
const drawLogo = (ctx, x, y, size, fill) => {
  // Trasforma il path (non il contesto) così un gradiente in coordinate canvas resta allineato
  const s = size / 500;
  const p = new Path2D();
  p.addPath(new Path2D(LOGO_PATH), new DOMMatrix([s, 0, 0, s, x, y]));
  ctx.save();
  ctx.fillStyle = fill;
  ctx.fill(p);
  ctx.restore();
};
// Curva morbida (monotona) passante per i punti
const smoothPath = (ctx, pts) => {
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
    const cx = (x0 + x1) / 2;
    ctx.bezierCurveTo(cx, y0, cx, y1, x1, y1);
  }
};

const SHARE_THEMES = {
  night:   { text: '#FFFFFF', sub: 'rgba(255,255,255,0.58)', tile: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.10)', faint: 'rgba(255,255,255,0.12)', accent: '#F5A623', accent2: '#8B5CF6', meal: '#10B981', good: '#34D399', bad: '#F87171', glow: 'rgba(245,166,35,0.55)', brand: true },
  aurora:  { text: '#FFFFFF', sub: 'rgba(255,255,255,0.80)', tile: 'rgba(0,0,0,0.16)', border: 'rgba(255,255,255,0.22)', faint: 'rgba(255,255,255,0.28)', accent: '#FFFFFF', accent2: 'rgba(255,255,255,0.6)', meal: 'rgba(255,255,255,0.6)', good: '#FFFFFF', bad: '#FFFFFF', glow: 'rgba(255,255,255,0.6)', brand: false },
  light:   { text: '#1D1D1D', sub: 'rgba(29,29,29,0.55)', tile: '#FFFFFF', border: 'rgba(0,0,0,0.06)', faint: 'rgba(0,0,0,0.08)', accent: '#F5A623', accent2: '#8B5CF6', meal: '#10B981', good: '#059669', bad: '#DC2626', glow: 'rgba(245,166,35,0.35)', brand: true },
  photo:   { text: '#FFFFFF', sub: 'rgba(255,255,255,0.78)', tile: 'rgba(0,0,0,0.32)', border: 'rgba(255,255,255,0.16)', faint: 'rgba(255,255,255,0.22)', accent: '#F5A623', accent2: '#A78BFA', meal: '#34D399', good: '#34D399', bad: '#F87171', glow: 'rgba(245,166,35,0.6)', brand: true },
  sticker: { text: '#FFFFFF', sub: 'rgba(255,255,255,0.88)', tile: 'rgba(0,0,0,0)', border: 'rgba(0,0,0,0)', faint: 'rgba(255,255,255,0.35)', accent: '#FFFFFF', accent2: 'rgba(255,255,255,0.7)', meal: 'rgba(255,255,255,0.7)', good: '#FFFFFF', bad: '#FFFFFF', glow: 'rgba(255,255,255,0.5)', brand: false, shadow: true }
};

// time: secondi dall'inizio (Infinity = fotogramma finale statico)
const drawShareBackground = (ctx, W, H, theme, time) => {
  const live = isFinite(time);
  const t = live ? time : 0;
  const phase = live ? (1 - Math.cos((2 * Math.PI * t) / VIDEO_SECONDS)) / 2 : 0;
  if (theme === 'sticker') { ctx.clearRect(0, 0, W, H); return; }
  if (theme === 'aurora') {
    ctx.fillStyle = brandGradient(ctx, 0, 0, W, H, phase);
    ctx.fillRect(0, 0, W, H);
    blob(ctx, W * (0.8 - 0.25 * phase), H * (0.15 + 0.1 * Math.sin(t)), W * 0.75, '#FFFFFF', 0.18);
    const shade = ctx.createLinearGradient(0, H * 0.45, 0, H);
    shade.addColorStop(0, 'rgba(0,0,0,0)'); shade.addColorStop(1, 'rgba(0,0,0,0.38)');
    ctx.fillStyle = shade; ctx.fillRect(0, 0, W, H);
    return;
  }
  if (theme === 'photo' && sharePhoto) {
    const iw = sharePhoto.naturalWidth || sharePhoto.width;
    const ih = sharePhoto.naturalHeight || sharePhoto.height;
    const zoom = 1 + (live ? 0.06 * clamp01(t / VIDEO_TOTAL) : 0);
    const scale = Math.max(W / iw, H / ih) * zoom;
    ctx.drawImage(sharePhoto, (W - iw * scale) / 2, (H - ih * scale) / 2, iw * scale, ih * scale);
    const shade = ctx.createLinearGradient(0, 0, 0, H);
    shade.addColorStop(0, 'rgba(0,0,0,0.55)'); shade.addColorStop(0.28, 'rgba(0,0,0,0.10)');
    shade.addColorStop(0.5, 'rgba(0,0,0,0.30)'); shade.addColorStop(1, 'rgba(0,0,0,0.85)');
    ctx.fillStyle = shade; ctx.fillRect(0, 0, W, H);
    return;
  }
  const light = theme === 'light';
  ctx.fillStyle = light ? '#F6F5F2' : '#0E0E10';
  ctx.fillRect(0, 0, W, H);
  const a = (2 * Math.PI * t) / VIDEO_SECONDS;
  blob(ctx, W * (0.05 + 0.12 * Math.sin(a)), H * (0.08 + 0.05 * Math.cos(a)), W * 0.78, '#10B981', light ? 0.20 : 0.34);
  blob(ctx, W * (1.0 - 0.15 * Math.sin(a + 1)), H * (0.42 + 0.06 * Math.sin(a)), W * 0.72, '#F5A623', light ? 0.18 : 0.28);
  blob(ctx, W * (0.10 + 0.14 * Math.cos(a + 2)), H * (0.95 - 0.05 * Math.sin(a)), W * 0.82, '#8B5CF6', light ? 0.18 : 0.34);
};

const drawShareChart = (ctx, chart, x, y, w, h, th, k, time) => {
  if (!chart) return;
  const live = isFinite(time);
  const phase = live ? (1 - Math.cos((2 * Math.PI * time) / VIDEO_SECONDS)) / 2 : 0;
  setFont(ctx, 800, 24);
  ctx.fillStyle = th.sub;
  spacedText(ctx, ellipsize(ctx, (chart.label || '').toUpperCase(), w * 0.62), x, y + 22, 4);
  const top = y + 58;
  const ch = h - 58;

  // Legenda (a destra dell'etichetta)
  const legend = (items) => {
    setFont(ctx, 700, 22);
    let lx = x + w;
    ctx.textAlign = 'right';
    items.slice().reverse().forEach(it => {
      ctx.fillStyle = th.sub; ctx.fillText(it.label, lx, y + 22);
      lx -= ctx.measureText(it.label).width + 12;
      ctx.beginPath(); ctx.arc(lx - 7, y + 14, 8, 0, Math.PI * 2); ctx.fillStyle = it.color; ctx.fill();
      lx -= 34;
    });
    ctx.textAlign = 'left';
  };

  if (chart.type === 'line') {
    const s = chart.series;
    const min = Math.min(...s), max = Math.max(...s);
    const range = max - min || 1;
    const px = (i) => x + 16 + (i * (w - 32)) / (s.length - 1);
    const py = (v) => top + 24 + (1 - (v - min) / range) * (ch - 64);
    const pts = s.map((v, i) => [px(i), py(v)]);
    // Linea di partenza tratteggiata
    ctx.save();
    ctx.setLineDash([10, 12]); ctx.lineWidth = 3; ctx.strokeStyle = th.faint;
    ctx.beginPath(); ctx.moveTo(x, pts[0][1]); ctx.lineTo(x + w, pts[0][1]); ctx.stroke();
    ctx.restore();
    setFont(ctx, 700, 22); ctx.fillStyle = th.sub;
    ctx.fillText('inizio', x, pts[0][1] + (chart.down ? -14 : 34));
    // Disegno progressivo (clip da sinistra)
    ctx.save();
    ctx.beginPath(); ctx.rect(x - 30, top - 30, (w + 60) * easeOut(k), ch + 60); ctx.clip();
    const area = ctx.createLinearGradient(0, top, 0, top + ch);
    area.addColorStop(0, th.brand ? 'rgba(245,166,35,0.32)' : 'rgba(255,255,255,0.32)');
    area.addColorStop(1, th.brand ? 'rgba(245,166,35,0)' : 'rgba(255,255,255,0)');
    ctx.beginPath(); smoothPath(ctx, pts);
    ctx.lineTo(pts[pts.length - 1][0], top + ch); ctx.lineTo(pts[0][0], top + ch); ctx.closePath();
    ctx.fillStyle = area; ctx.fill();
    ctx.save();
    ctx.shadowColor = th.glow; ctx.shadowBlur = 28;
    ctx.beginPath(); smoothPath(ctx, pts);
    ctx.strokeStyle = th.brand ? brandGradient(ctx, x, 0, x + w, 0, phase) : th.accent;
    ctx.lineWidth = 9; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
    ctx.restore();
    pts.slice(0, -1).forEach(p => {
      ctx.save(); ctx.globalAlpha *= 0.85;
      ctx.beginPath(); ctx.arc(p[0], p[1], 7, 0, Math.PI * 2); ctx.fillStyle = th.text; ctx.fill();
      ctx.restore();
    });
    ctx.restore();
    // Punto finale con alone pulsante
    if (k >= 1) {
      const last = pts[pts.length - 1];
      const pulse = live ? (Math.sin(time * 4) + 1) / 2 : 0.5;
      ctx.beginPath(); ctx.arc(last[0], last[1], 26 + 14 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = th.brand ? 'rgba(122,77,241,' + (0.18 + 0.12 * (1 - pulse)) + ')' : 'rgba(255,255,255,0.22)'; ctx.fill();
      ctx.beginPath(); ctx.arc(last[0], last[1], 17, 0, Math.PI * 2);
      ctx.fillStyle = th.brand ? BRAND[2] : '#FFFFFF'; ctx.fill();
      ctx.lineWidth = 6; ctx.strokeStyle = th.text; ctx.stroke();
    }
    return;
  }

  if (chart.type === 'rhythm') {
    const bars = chart.bars;
    const groups = new Set(bars.map(b => b.group)).size;
    const groupGap = 26;
    const gap = 8;
    const bw = Math.max(6, (w - gap * (bars.length - 1) - (groups - 1) * (groupGap - gap)) / bars.length);
    const maxSec = Math.max(...bars.map(b => b.sec), 1);
    const avg = bars.reduce((s, b) => s + b.sec, 0) / bars.length;
    let cx = x;
    bars.forEach((b, i) => {
      if (i && bars[i - 1].group !== b.group) cx += groupGap - gap;
      const kk = easeOut(k * 1.6 - (i / bars.length) * 0.6);
      const bh = Math.max(16, (b.sec / maxSec) * ch) * kk;
      const g = ctx.createLinearGradient(0, top + ch - bh, 0, top + ch);
      const c = b.group % 2 ? th.accent2 : th.accent;
      g.addColorStop(0, c); g.addColorStop(1, th.brand ? (b.group % 2 ? 'rgba(139,92,246,0.35)' : 'rgba(245,166,35,0.35)') : 'rgba(255,255,255,0.35)');
      ctx.fillStyle = g;
      roundRect(ctx, cx, top + ch - bh, bw, bh, Math.min(12, bw / 2));
      ctx.fill();
      cx += bw + gap;
    });
    if (k >= 1) {
      const ay = top + ch - (avg / maxSec) * ch;
      ctx.save(); ctx.setLineDash([8, 10]); ctx.lineWidth = 3; ctx.strokeStyle = th.sub;
      ctx.beginPath(); ctx.moveTo(x, ay); ctx.lineTo(x + w, ay); ctx.stroke(); ctx.restore();
      setFont(ctx, 800, 22);
      const label = 'media ' + formatClock(avg);
      const lw = ctx.measureText(label).width + 28;
      const ly = Math.max(top - 6, ay - 50);
      ctx.fillStyle = th.brand ? 'rgba(14,14,16,0.82)' : 'rgba(0,0,0,0.45)';
      roundRect(ctx, x + w - lw, ly, lw, 38, 19); ctx.fill();
      ctx.fillStyle = '#FFFFFF'; ctx.textAlign = 'right';
      ctx.fillText(label, x + w - 14, ly + 27); ctx.textAlign = 'left';
    }
    return;
  }

  // Barre per giorno o per settimana (attività / aderenza alimentare)
  const adherence = chart.type === 'adherence';
  let cols;
  if (chart.weekly) {
    cols = [];
    for (let i = 0; i < chart.days.length; i += 7) {
      const wk = chart.days.slice(i, i + 7);
      if (adherence) {
        const vals = wk.map(d => d.pct).filter(v => v !== null);
        cols.push({ value: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null });
      } else {
        cols.push({ value: wk.filter(d => d.workout).length / 7, meals: wk.some(d => d.meals) });
      }
    }
  } else {
    cols = chart.days.map(d => (adherence ? { value: d.pct, dow: d.dow } : { value: d.workout ? 1 : 0, meals: d.meals, dow: d.dow }));
  }
  if (adherence) legend([{ label: 'Giorno perfetto', color: th.brand ? BRAND[0] : '#FFFFFF' }]);
  else if (chart.mealsLayer) legend([{ label: 'Allenamento', color: th.accent }, { label: 'Pasti', color: th.meal }]);
  const labels = !chart.weekly && cols.length <= 7;
  const area = labels ? ch - 48 : ch;
  const gap = cols.length > 20 ? 8 : 18;
  const bw = (w - gap * (cols.length - 1)) / cols.length;
  cols.forEach((col, i) => {
    const cx = x + i * (bw + gap);
    const kk = easeOut(k * 1.8 - (i / cols.length) * 0.8);
    const r = Math.min(16, bw / 2);
    // binario di sfondo
    ctx.save(); ctx.globalAlpha *= 0.5; ctx.fillStyle = th.faint;
    roundRect(ctx, cx, top, bw, area, r); ctx.fill(); ctx.restore();
    let bh = 0, fill = null;
    if (adherence) {
      if (col.value !== null && col.value !== undefined) {
        bh = Math.max(bw, col.value * area);
        const perfect = col.value >= 0.999;
        fill = perfect ? (th.brand ? BRAND[0] : '#FFFFFF') : (th.brand ? 'rgba(16,185,129,0.55)' : 'rgba(255,255,255,0.55)');
      }
    } else if (col.value > 0) {
      bh = chart.weekly ? Math.max(bw, col.value * area) : area;
      const g = ctx.createLinearGradient(0, top + area - bh, 0, top + area);
      g.addColorStop(0, th.accent); g.addColorStop(1, th.brand ? '#F97316' : th.accent2);
      fill = g;
    } else if (col.meals) {
      bh = area * 0.42; fill = th.meal;
    }
    if (fill && bh) {
      bh *= kk;
      ctx.fillStyle = fill;
      roundRect(ctx, cx, top + area - bh, bw, bh, r); ctx.fill();
    }
    if (labels) {
      setFont(ctx, 700, 26); ctx.fillStyle = th.sub; ctx.textAlign = 'center';
      ctx.fillText(['D', 'L', 'M', 'M', 'G', 'V', 'S'][col.dow], cx + bw / 2, top + ch - 6);
      ctx.textAlign = 'left';
    }
  });
};

// Disegna la card. time = secondi dall'inizio dell'animazione (Infinity = immagine finale)
// Piè di pagina comune: motto + indirizzo dell'app (chi vede la storia sa dove trovarla)
const drawShareFooter = (ctx, W, M, foot, story, th, phase) => {
  setFont(ctx, 900, story ? 28 : 24);
  ctx.fillStyle = th.brand ? brandGradient(ctx, M, 0, W - M, 0, phase) : th.text;
  spacedText(ctx, 'IERI. OGGI. DOMANI. ANCORA.', W / 2, foot - (story ? 22 : 20), 6, 'center');
  setFont(ctx, 700, story ? 24 : 21);
  ctx.fillStyle = th.sub;
  spacedText(ctx, APP_URL_SHORT, W / 2, foot + (story ? 26 : 22), 2, 'center');
};

// Corpo della card "Frase del giorno": parole che entrano una alla volta, parte forte in gradiente
const drawQuoteBody = (ctx, data, o) => {
  const { W, H, M, story, th, phase, at, reveal, live, time } = o;
  const maxW = W - M * 2;
  const stats = (data.stats || []).slice(0, 4);
  const hasStats = stats.length > 0;
  const top = hasStats ? (story ? 470 : 300) : (story ? 560 : 330);
  const bottom = hasStats
    ? (story ? (data.attribution ? 1060 : 1130) : (data.attribution ? 680 : 740))
    : (story ? (data.attribution ? 1500 : 1600) : (data.attribution ? 1040 : 1120));

  // Parole con stile: hi = parte evidenziata
  const words = [];
  (data.pre || '').split(/\s+/).filter(Boolean).forEach(w => words.push({ w, hi: false }));
  (data.hi || '').split(/\s+/).filter(Boolean).forEach(w => words.push({ w, hi: true }));

  // Trova la dimensione più grande che entra nello spazio
  const layout = (size) => {
    const lines = [[]];
    let lineW = 0;
    const space = size * 0.28;
    words.forEach(word => {
      setFont(ctx, word.hi ? 900 : 800, size);
      const ww = ctx.measureText(word.w).width;
      if (lineW > 0 && lineW + space + ww > maxW) { lines.push([]); lineW = 0; }
      lines[lines.length - 1].push({ ...word, x: lineW ? lineW + space : 0, ww });
      lineW += (lineW ? space : 0) + ww;
    });
    return lines;
  };
  let size = story ? 104 : 88, lines = layout(size);
  while (size > 44 && lines.length * size * 1.18 > bottom - top) { size -= 4; lines = layout(size); }
  const lh = size * 1.18;
  const blockH = lines.length * lh;
  const y0 = top + (bottom - top - blockH) / 2 + size;

  // Kicker
  reveal(at(0.25, 0.5), 30, () => {
    setFont(ctx, 900, story ? 34 : 30);
    ctx.fillStyle = th.brand ? brandGradient(ctx, M, 0, W - M, 0, phase) : th.text;
    spacedText(ctx, (data.kicker || '').toUpperCase(), M, y0 - size - (story ? 150 : 110), 6);
  });

  // Compagno in alto a destra, in piedi sulla riga del titolo
  {
    const ps = story ? 270 : 200;
    drawCornerPet(ctx, data, W - M - ps * 0.42, y0 - size - (story ? 150 : 110) + 14, ps, live, at(0.5, 0.5));
  }

  // Virgolette grandi
  reveal(at(0.4, 0.5), 20, () => {
    setFont(ctx, 900, story ? 260 : 200);
    ctx.fillStyle = th.brand ? brandGradient(ctx, M, y0 - size - 140, M + 160, y0, phase) : th.faint;
    ctx.globalAlpha *= th.brand ? 0.9 : 1;
    ctx.fillText('“', M - 14, y0 - size + (story ? 120 : 90));
  });

  // Testo, parola per parola
  let idx = 0;
  const step = Math.min(0.11, 2.4 / Math.max(1, words.length)); // frasi lunghe entrano più veloci
  const gradFill = th.brand ? brandGradient(ctx, M, y0 - size, W - M, y0 + blockH, phase) : th.text;
  lines.forEach((line, li) => {
    line.forEach(word => {
      const k = at(0.7 + idx * step, 0.35);
      idx++;
      reveal(k, 24, () => {
        setFont(ctx, word.hi ? 900 : 800, size);
        ctx.fillStyle = word.hi ? gradFill : th.text;
        ctx.fillText(word.w, M + word.x, y0 + li * lh);
      });
    });
  });
  const textEnd = 0.7 + idx * step;

  // Firma (artista · canzone) per le barre personali
  if (data.attribution) {
    reveal(at(textEnd + 0.2, 0.5), 20, () => {
      setFont(ctx, 800, story ? 36 : 30); ctx.fillStyle = th.sub;
      ctx.fillText(ellipsize(ctx, '— ' + data.attribution, maxW), M, y0 + blockH + (story ? 50 : 36));
    });
  }

  // Risultati del periodo: riquadri 2 per riga
  let statsEnd = textEnd;
  if (hasStats) {
    const headY = story ? 1270 : 830;
    const gap = story ? 24 : 20;
    const tileH = story ? 170 : 130;
    const tw = (maxW - gap) / 2;
    const single = stats.length === 1;
    reveal(at(textEnd + 0.3, 0.45), 20, () => {
      setFont(ctx, 800, story ? 24 : 21); ctx.fillStyle = th.sub;
      spacedText(ctx, ellipsize(ctx, (data.statsLabel || '').toUpperCase(), maxW - 40), M, headY, 4);
    });
    stats.forEach((s, i) => {
      const start = textEnd + 0.45 + i * 0.15;
      statsEnd = start + 0.9;
      reveal(at(start, 0.45), 30, () => {
        const w = single ? maxW : tw;
        const tx = M + (i % 2) * (tw + gap);
        const ty = headY + (story ? 34 : 26) + Math.floor(i / 2) * (tileH + gap);
        if (!th.shadow) {
          ctx.fillStyle = th.tile; roundRect(ctx, tx, ty, w, tileH, story ? 36 : 30); ctx.fill();
          ctx.lineWidth = 2; ctx.strokeStyle = th.border; ctx.stroke();
        }
        setFont(ctx, 800, story ? 22 : 19); ctx.fillStyle = th.sub;
        spacedText(ctx, ellipsize(ctx, s.label.toUpperCase(), w - 80), tx + 32, ty + (story ? 54 : 42), 3);
        fitFont(ctx, s.value, 900, story ? 64 : 50, w - 64, 28);
        ctx.fillStyle = th.brand ? brandGradient(ctx, tx, ty, tx + w, ty + tileH, phase) : th.text;
        ctx.fillText(countUp(s.value, live ? clamp01((time - start) / 0.9) : 1), tx + 30, ty + tileH - (story ? 34 : 26));
      });
    });
  }

  // Firma persona + motto
  reveal(at(Math.max(textEnd + 0.5, statsEnd - 0.4), 0.6), 0, () => {
    if (data.signature) {
      setFont(ctx, 700, story ? 30 : 26); ctx.fillStyle = th.sub; ctx.textAlign = 'center';
      ctx.fillText(data.signature, W / 2, o.foot - (story ? 70 : 56));
      ctx.textAlign = 'left';
    }
  });
};

// ---------------------------------------------------------------
// RIEPILOGO DEL MESE: video a scene (una per risultato) + riepilogo finale
// ---------------------------------------------------------------
const RECAP_SCENE = 2.4;     // secondi per scena
const RECAP_HOLD = 3.5;      // riepilogo finale fermo prima della fine del video
const recapDuration = (data) => Math.min(24, data.scenes.length * RECAP_SCENE + RECAP_HOLD);

const drawRecapCalendar = (ctx, data, x, y, w, th, k, phase) => {
  const cols = 7, gap = 14;
  const cell = (w - gap * (cols - 1)) / cols;
  const size = Math.min(cell, 118);
  const offX = x + (w - (size * cols + gap * (cols - 1))) / 2;
  setFont(ctx, 800, 22); ctx.fillStyle = th.sub; ctx.textAlign = 'center';
  ['L', 'M', 'M', 'G', 'V', 'S', 'D'].forEach((d, i) => ctx.fillText(d, offX + i * (size + gap) + size / 2, y));
  ctx.textAlign = 'left';
  const shown = Math.ceil(data.calendar.length * clamp01(k));
  const fill = th.brand ? brandGradient(ctx, offX, y, offX + w, y + 600, phase) : th.text;
  data.calendar.forEach((day, i) => {
    const pos = day.lead + i;
    const cx = offX + (pos % 7) * (size + gap);
    const cy = y + 26 + Math.floor(pos / 7) * (size + gap);
    roundRect(ctx, cx, cy, size, size, size * 0.3);
    ctx.fillStyle = day.active && i < shown ? fill : th.faint;
    ctx.fill();
  });
};

const drawRecapBody = (ctx, data, o) => {
  const { W, H, M, story, th, phase, live, time } = o;
  const maxW = W - M * 2;
  const grad = (y0, y1) => (th.brand ? brandGradient(ctx, M, y0, W - M, y1, phase) : th.text);
  const finalStart = live ? data.scenes.length * RECAP_SCENE : 0;

  // Scene una alla volta (solo nel video)
  if (live && time < finalStart) {
    // Il primo fotogramma può arrivare con un tempo appena negativo
    const i = Math.max(0, Math.min(data.scenes.length - 1, Math.floor(time / RECAP_SCENE)));
    const sc = data.scenes[i];
    const local = Math.max(0, time - i * RECAP_SCENE);
    const kIn = easeOut(local / 0.45);
    const kOut = 1 - clamp01((local - (RECAP_SCENE - 0.35)) / 0.35);
    const a = Math.min(kIn, kOut);
    if (a <= 0) return;
    ctx.save();
    ctx.globalAlpha = a;
    const cy = story ? H * 0.46 : H * 0.47;
    if (sc.type === 'intro') {
      setFont(ctx, 900, story ? 34 : 30); ctx.fillStyle = th.sub;
      spacedText(ctx, (sc.kicker || '').toUpperCase(), W / 2, cy - (story ? 190 : 150), 6, 'center');
      ctx.translate(0, (1 - kIn) * 40);
      fitFont(ctx, sc.big, 900, story ? 200 : 160, maxW, 60);
      ctx.fillStyle = grad(cy - 200, cy);
      ctx.textAlign = 'center';
      ctx.fillText(sc.big, W / 2, cy);
      // "su" piccolo, poi logo + STILL in gradiente (il link è sempre in basso)
      let y = cy + (story ? 80 : 62);
      setFont(ctx, 700, story ? 34 : 28); ctx.fillStyle = '#FFFFFF';
      ctx.fillText('su', W / 2, y);
      const logo = story ? 150 : 110;
      y += story ? 28 : 20;
      const tight = (y0, y1, half) => (th.brand ? brandGradient(ctx, W / 2 - half, y0, W / 2 + half, y1, phase) : th.text);
      drawLogo(ctx, W / 2 - logo / 2, y, logo, tight(y, y + logo, logo * 0.4));
      y += logo * 0.86 + (story ? 62 : 48);
      setFont(ctx, 900, story ? 56 : 44); ctx.fillStyle = tight(y - 50, y, story ? 130 : 100);
      spacedText(ctx, 'STILL', W / 2, y, story ? 14 : 11, 'center');
      ctx.textAlign = 'left';
      drawCornerPet(ctx, data, W / 2, y + (story ? 330 : 230), story ? 270 : 190, live, easeOut((local - 0.3) / 0.5));
    } else {
      setFont(ctx, 900, story ? 30 : 26); ctx.fillStyle = th.sub;
      const top = sc.calendar ? (story ? 360 : 260) : cy - (story ? 300 : 230);
      spacedText(ctx, (sc.kicker || '').toUpperCase(), M, top, 6);
      const bigSize = story ? 300 : 220;
      fitFont(ctx, sc.big, 900, bigSize, maxW, 70);
      ctx.fillStyle = grad(top, top + bigSize);
      ctx.fillText(countUp(sc.big, clamp01((local - 0.15) / 1.1)), M - 6, top + bigSize + 10);
      setFont(ctx, 800, story ? 42 : 34); ctx.fillStyle = th.text;
      ctx.fillText(ellipsize(ctx, sc.caption || '', maxW), M, top + bigSize + (story ? 125 : 95));
      if (sc.sub) {
        setFont(ctx, 700, story ? 32 : 28); ctx.fillStyle = th.sub;
        ctx.fillText(ellipsize(ctx, sc.sub, maxW), M, top + bigSize + (story ? 180 : 140));
      }
      if (sc.calendar) {
        drawRecapCalendar(ctx, data, M, top + bigSize + (story ? 250 : 180), maxW, th, (local - 0.3) / 1.2, phase);
      }
    }
    ctx.restore();
    return;
  }

  // Riepilogo finale (anche immagine statica)
  const t = live ? time - finalStart : Infinity;
  const at = (start, dur = 0.5) => (live ? easeOut((t - start) / dur) : 1);
  const rev = (k, dy, fn) => { if (k <= 0) return; ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * dy); fn(); ctx.restore(); };
  const top = story ? 330 : 250;
  rev(at(0, 0.5), 30, () => {
    setFont(ctx, 900, story ? 34 : 30); ctx.fillStyle = grad(0, 0);
    spacedText(ctx, (data.kicker || '').toUpperCase(), M, top, 6);
  });
  rev(at(0.15, 0.5), 40, () => {
    const size = story ? 220 : 170;
    setFont(ctx, 900, size); ctx.fillStyle = grad(top, top + size);
    const big = String(data.activeDays);
    ctx.fillText(big, M - 6, top + size + 10);
    const bw = ctx.measureText(big).width;
    setFont(ctx, 800, story ? 40 : 34); ctx.fillStyle = th.text;
    ctx.fillText('giorni attivi', M + bw + 24, top + size - (story ? 60 : 46));
    setFont(ctx, 700, story ? 30 : 26); ctx.fillStyle = th.sub;
    ctx.fillText('su ' + data.totalDays, M + bw + 24, top + size - (story ? 14 : 8));
  });
  {
    const ps = story ? 310 : 230;
    drawCornerPet(ctx, data, W - M - ps * 0.42, top + (story ? 240 : 185), ps, live, at(0.35, 0.5));
  }
  if (story && data.calendar.length) {
    rev(at(0.3, 0.5), 20, () => drawRecapCalendar(ctx, data, M + 120, top + 330, maxW - 240, th, 1, phase));
  }
  // Sotto il calendario (1 riga per la settimana, fino a 6 per il mese) vanno i riquadri;
  // se il mese occupa tante righe se ne mostrano 4 invece di 6 per non toccare il piè di pagina
  const calRows = data.calendar.length ? Math.ceil(((data.calendar[0].lead || 0) + data.calendar.length) / 7) : 0;
  const calStep = Math.min((maxW - 240 - 14 * 6) / 7, 118) + 14;
  const gridY = story ? (calRows ? top + 330 + 26 + calRows * calStep + 70 : 760) : 560;
  const tiles = data.tiles.slice(0, story ? (gridY > 1150 ? 4 : 6) : 4);
  const gap = story ? 24 : 20, tileH = story ? 150 : 140;
  const tw = (maxW - gap) / 2;
  tiles.forEach((tile, i) => {
    rev(at(0.45 + i * 0.12, 0.45), 30, () => {
      const tx = M + (i % 2) * (tw + gap);
      const ty = gridY + Math.floor(i / 2) * (tileH + gap);
      if (!th.shadow) {
        ctx.fillStyle = th.tile; roundRect(ctx, tx, ty, tw, tileH, 34); ctx.fill();
        ctx.lineWidth = 2; ctx.strokeStyle = th.border; ctx.stroke();
      }
      setFont(ctx, 800, story ? 22 : 20); ctx.fillStyle = th.sub;
      spacedText(ctx, ellipsize(ctx, tile.label.toUpperCase(), tw - 80), tx + 30, ty + (story ? 48 : 44), 3);
      fitFont(ctx, tile.value, 900, story ? 58 : 52, tw - 60, 26);
      ctx.fillStyle = th.text;
      ctx.fillText(tile.value, tx + 28, ty + tileH - (story ? 30 : 28));
    });
  });
  if (!data.activeDays) {
    rev(at(0.5, 0.5), 20, () => {
      setFont(ctx, 800, story ? 44 : 36); ctx.fillStyle = th.text;
      ctx.fillText(data.emptyText || 'Il prossimo mese è tuo.', M, gridY + 40);
    });
  }
};


// ---------------------------------------------------------------
// COMPAGNO DELLA SERIE nelle storie: appoggiato coi piedi su "bottom", fa il suo balletto nel video
// (mosse in js/data/pets.js → petDancePose). k = ingresso (0..1).
// ---------------------------------------------------------------
const drawSharePet = (ctx, img, id, cx, bottom, size, live, k = 1) => {
  if (!img || !img.complete || !img.naturalWidth || k <= 0) return;
  const pose = live && typeof petDancePose === 'function'
    ? petDancePose(id, performance.now() / 1000)
    : { dx: 0, dy: 0, rot: 0, sx: 1, sy: 1, flip: false };
  const u = size / 240;   // le mosse sono pensate per un compagno di 240 px
  const pop = k < 1 ? easeOut(k) * (1 + 0.2 * Math.sin(k * Math.PI)) : 1;
  ctx.save();
  ctx.shadowColor = 'transparent';
  ctx.globalAlpha *= Math.min(1, k * 1.5);
  ctx.translate(cx + pose.dx * u, bottom + pose.dy * u);
  ctx.rotate(pose.rot);
  ctx.scale(pose.sx * pop * (pose.flip ? -1 : 1), pose.sy * pop);
  // Nel disegno (120×120) i piedi toccano terra a y≈108
  ctx.drawImage(img, -size / 2, -size * (108 / 120), size, size);
  ctx.restore();
};
const drawCornerPet = (ctx, data, cx, bottom, size, live, k) => {
  if (data.pet) drawSharePet(ctx, data.pet.img, data.pet.id, cx, bottom, size, live, k);
};

// ---------------------------------------------------------------
// TRAGUARDO (trofeo sbloccato o nuovo record): medaglia che entra con
// un "pop", raggi che girano, coriandoli e il numero che conta.
// ---------------------------------------------------------------
const EMOJI_FONT = '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
const drawAchievementBody = (ctx, data, o) => {
  const { W, M, story, th, phase, at, reveal, live, time } = o;
  const maxW = W - M * 2;
  const cx = W / 2;
  const sc = story ? 1 : 0.72;
  const Y = story
    ? { kicker: 330, badge: 700, pill: 985, big: 1200, cap: 1298, sub: 1358, tiles: 1440 }
    : { kicker: 235, badge: 490, pill: 685, big: 845, cap: 918, sub: 963, tiles: 1000 };
  const R = 210 * sc;
  const color = data.color || BRAND[1];
  const text = (fill) => (th.brand ? fill : th.text);

  reveal(at(0.1, 0.5), 20, () => {
    fitFont(ctx, (data.kicker || '').toUpperCase(), 900, story ? 36 : 30, maxW, 22);
    ctx.fillStyle = text(brandGradient(ctx, M, 0, W - M, 0, phase));
    spacedText(ctx, (data.kicker || '').toUpperCase(), cx, Y.kicker, 6, 'center');
  });

  // Medaglia
  const k = live ? clamp01((time - 0.3) / 0.7) : 1;
  if (k > 0) {
    const pop = k < 1 ? easeOut(k) * (1 + 0.15 * Math.sin(k * Math.PI)) : 1;
    ctx.save();
    ctx.globalAlpha = Math.min(1, k * 1.6);
    ctx.translate(cx, Y.badge);
    ctx.save();
    ctx.rotate(live ? time * 0.25 : 0.2);
    for (let i = 0; i < 14; i++) {
      ctx.rotate((Math.PI * 2) / 14);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, R * 1.5 * pop, -0.08, 0.08); ctx.closePath();
      ctx.fillStyle = color + '24'; ctx.fill();
    }
    ctx.restore();
    // Alone e raggi restano entro 1,5 volte il raggio: non arrivano alla scritta sopra
    const glow = ctx.createRadialGradient(0, 0, R * 0.4, 0, 0, R * 1.45);
    glow.addColorStop(0, color + '66'); glow.addColorStop(1, color + '00');
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(0, 0, R * 1.45, 0, Math.PI * 2); ctx.fill();
    ctx.scale(pop, pop);
    ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.fillStyle = color + '33'; ctx.fill();
    ctx.lineWidth = 16 * sc;
    ctx.strokeStyle = th.brand ? brandGradient(ctx, -R, -R, R, R, phase) : color;
    ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, R - 30 * sc, 0, Math.PI * 2);
    ctx.lineWidth = 4 * sc; ctx.strokeStyle = color + '99'; ctx.stroke();
    ctx.shadowColor = 'transparent';
    ctx.font = Math.round(R * 0.95) + 'px ' + EMOJI_FONT;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#FFFFFF';
    // Compagno della serie al posto dell'emoji: più grande della medaglia, nel video balla
    if (data.petImg && data.petImg.complete && data.petImg.naturalWidth) {
      drawSharePet(ctx, data.petImg, data.petDance, 0, R * 0.86, R * 2.25, live && k >= 1);
    } else ctx.fillText(data.icon || '🏆', 0, R * 0.06);
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.restore();
  }

  // Compagno accanto alla medaglia (trofei, livelli, benvenuto...)
  drawCornerPet(ctx, data, cx + R * 1.22, Y.badge + R * 1.08, R * 1.3, live, at(0.8, 0.5));

  // Coriandoli che esplodono dalla medaglia (solo nel video)
  if (live) {
    const colors = [BRAND[0], BRAND[1], BRAND[2], color, '#FFFFFF'];
    for (let i = 0; i < 70; i++) {
      const r1 = ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;
      const r2 = ((Math.sin(i * 78.233) * 12345.6789) % 1 + 1) % 1;
      const tt = time - (0.55 + r2 * 0.35);
      if (tt < 0 || tt > 2.6) continue;
      const a = r1 * Math.PI * 2;
      const v = (500 + r2 * 800) * sc;
      const x = cx + Math.cos(a) * v * tt;
      const y = Y.badge + Math.sin(a) * v * tt + 900 * sc * tt * tt;
      ctx.save();
      ctx.globalAlpha = clamp01(1 - tt / 2.6);
      ctx.translate(x, y); ctx.rotate(tt * (4 + r1 * 6));
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(-8 * sc, -14 * sc, 16 * sc, 28 * sc);
      ctx.restore();
    }
  }

  // Etichetta (Oro, Record personale, ...)
  if (data.badge) {
    reveal(at(0.9, 0.4), 16, () => {
      const label = data.badge.toUpperCase();
      const fs = story ? 28 : 22;
      setFont(ctx, 900, fs);
      const tw = [...label].reduce((w, ch) => w + ctx.measureText(ch).width, 0) + 5 * (label.length - 1);
      const ph = fs * 2, pw = tw + fs * 2.4;
      roundRect(ctx, cx - pw / 2, Y.pill - ph / 2, pw, ph, ph / 2);
      ctx.fillStyle = color; ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      spacedText(ctx, label, cx, Y.pill + fs * 0.36, 5, 'center');
    });
  }

  // Numero + descrizione
  reveal(at(1.1, 0.5), 30, () => {
    fitFont(ctx, data.big || '', 900, story ? 190 : 140, maxW, 60);
    ctx.fillStyle = text(brandGradient(ctx, M, Y.big - 180, W - M, Y.big, phase));
    ctx.textAlign = 'center';
    ctx.fillText(countUp(data.big || '', live ? clamp01((time - 1.1) / 1.2) : 1), cx, Y.big);
    fitFont(ctx, data.caption || '', 800, story ? 50 : 40, maxW, 24);
    ctx.fillStyle = th.text;
    ctx.fillText(data.caption || '', cx, Y.cap);
    if (data.sub) {
      setFont(ctx, 700, story ? 32 : 26); ctx.fillStyle = th.sub;
      ctx.fillText(ellipsize(ctx, data.sub, maxW), cx, Y.sub);
    }
    ctx.textAlign = 'left';
  });

  // Data d'inizio in evidenza (benvenuto): etichetta piccola bianca + data grande arcobaleno, senza riquadri
  if (data.startDate) {
    reveal(at(1.6, 0.5), 30, () => {
      const ly = Y.tiles + (story ? 40 : 30);
      ctx.textAlign = 'center';
      setFont(ctx, 800, story ? 26 : 22); ctx.fillStyle = th.text;
      spacedText(ctx, (data.startLabel || '').toUpperCase(), cx, ly, 5, 'center');
      const dy = ly + (story ? 120 : 92);
      fitFont(ctx, data.startDate, 900, story ? 110 : 84, maxW, 40);
      const dw = ctx.measureText(data.startDate).width;
      ctx.fillStyle = text(brandGradient(ctx, cx - dw / 2, dy - 100, cx + dw / 2, dy, phase));
      ctx.textAlign = 'center';
      ctx.fillText(data.startDate, cx, dy);
      ctx.textAlign = 'left';
    });
  }

  // Riquadri (livello, trofei, ...)
  const tiles = (data.tiles || []).slice(0, 2);
  const gap = story ? 24 : 20, tileH = story ? 150 : 120;
  const tw = (maxW - gap) / 2;
  tiles.forEach((tile, i) => {
    reveal(at(1.6 + i * 0.15, 0.45), 30, () => {
      const tx = M + i * (tw + gap);
      const ty = Y.tiles;
      if (!th.shadow) {
        ctx.fillStyle = th.tile; roundRect(ctx, tx, ty, tw, tileH, 34); ctx.fill();
        ctx.lineWidth = 2; ctx.strokeStyle = th.border; ctx.stroke();
      }
      setFont(ctx, 800, story ? 22 : 18); ctx.fillStyle = th.sub;
      spacedText(ctx, ellipsize(ctx, tile.label.toUpperCase(), tw - 80), tx + 30, ty + (story ? 48 : 40), 3);
      fitFont(ctx, tile.value, 900, story ? 52 : 42, tw - 60, 22);
      ctx.fillStyle = th.text;
      ctx.fillText(tile.value, tx + 28, ty + tileH - (story ? 32 : 26));
    });
  });
};

// ---------------------------------------------------------------
// MUSCOLI DELLA SETTIMANA: mappa del corpo colorata (più scuro = più allenato)
// e la classifica dei muscoli più allenati con le barre che crescono.
// ---------------------------------------------------------------
const drawMusclesBody = (ctx, data, o) => {
  const { W, M, story, th, phase, at, reveal, live, time } = o;
  const maxW = W - M * 2;
  const cx = W / 2;
  const Y = story
    ? { kicker: 300, mapTop: 345, mapW: 860, big: 1235, cap: 1300, list: 1385, row: 70, rows: 4 }
    : { kicker: 225, mapTop: 250, mapW: 600, big: 868, cap: 920, list: 985, row: 60, rows: 3 };
  const text = (fill) => (th.brand ? fill : th.text);

  reveal(at(0.1, 0.5), 20, () => {
    fitFont(ctx, (data.kicker || '').toUpperCase(), 900, story ? 36 : 30, maxW, 22);
    ctx.fillStyle = text(brandGradient(ctx, M, 0, W - M, 0, phase));
    spacedText(ctx, (data.kicker || '').toUpperCase(), cx, Y.kicker, 6, 'center');
  });

  // Mappa del corpo: entra con un piccolo "pop"
  const img = data.mapImg;
  const mapH = Y.mapW * 104 / 120;
  if (img && img.complete && img.naturalWidth) {
    const k = live ? clamp01((time - 0.3) / 0.8) : 1;
    if (k > 0) {
      const s = 0.9 + 0.1 * easeOut(k);
      ctx.save();
      ctx.shadowColor = 'transparent';
      ctx.globalAlpha *= Math.min(1, k * 1.4);
      ctx.translate(cx, Y.mapTop + mapH / 2);
      ctx.scale(s, s);
      ctx.drawImage(img, -Y.mapW / 2, -mapH / 2, Y.mapW, mapH);
      ctx.restore();
    }
  }

  if (data.empty) {
    reveal(at(1.0, 0.5), 30, () => {
      ctx.textAlign = 'center';
      fitFont(ctx, 'La mappa si colora quando ti alleni', 800, story ? 46 : 36, maxW, 24);
      ctx.fillStyle = th.text;
      ctx.fillText('La mappa si colora quando ti alleni', cx, Y.big);
      ctx.textAlign = 'left';
    });
    return;
  }

  // Serie totali + giorni
  reveal(at(1.0, 0.5), 30, () => {
    ctx.textAlign = 'center';
    fitFont(ctx, data.big || '', 900, story ? 150 : 104, maxW, 50);
    ctx.fillStyle = text(brandGradient(ctx, M, Y.big - 150, W - M, Y.big, phase));
    ctx.fillText(countUp(data.big || '', live ? clamp01((time - 1.0) / 1.2) : 1), cx, Y.big);
    fitFont(ctx, data.caption || '', 800, story ? 42 : 32, maxW, 22);
    ctx.fillStyle = th.text;
    ctx.fillText(data.caption || '', cx, Y.cap);
    ctx.textAlign = 'left';
  });

  // I muscoli più allenati
  (data.top || []).slice(0, Y.rows).forEach((t, i) => {
    reveal(at(1.5 + i * 0.15, 0.4), 20, () => {
      const y = Y.list + i * Y.row;
      setFont(ctx, 800, story ? 32 : 26);
      ctx.fillStyle = th.text;
      ctx.textAlign = 'right';
      const vw = ctx.measureText(t.value).width;
      ctx.fillText(t.value, W - M, y);
      ctx.textAlign = 'left';
      ctx.fillText(ellipsize(ctx, t.name, maxW - vw - 30), M, y);
      const by = y + (story ? 16 : 13), bh = story ? 12 : 10;
      roundRect(ctx, M, by, maxW, bh, bh / 2);
      ctx.fillStyle = th.faint || 'rgba(150,150,160,0.25)';
      ctx.fill();
      const grow = live ? easeOut((time - 1.6 - i * 0.15) / 0.8) : 1;
      const bw = Math.max(bh, maxW * (t.k || 0) * grow);
      roundRect(ctx, M, by, bw, bh, bh / 2);
      ctx.fillStyle = th.brand ? brandGradient(ctx, M, 0, M + maxW, 0, phase) : '#F5A623';
      ctx.fill();
    });
  });
};

const drawShareCard = (canvas, data, opts, time = Infinity) => {
  const story = opts.format === 'story';
  const W = 1080, H = story ? 1920 : 1350;
  if (canvas.width !== W) canvas.width = W;
  if (canvas.height !== H) canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  const th = SHARE_THEMES[opts.theme] || SHARE_THEMES.night;
  const live = isFinite(time);
  const phase = live ? (1 - Math.cos((2 * Math.PI * time) / VIDEO_SECONDS)) / 2 : 0;
  const at = (start, dur = 0.5) => (live ? easeOut((time - start) / dur) : 1);
  const M = 88;
  const L = story
    ? { head: 150, kicker: 330, title: 395, heroBase: 690, heroSize: 250, heroLabel: 790, chartY: 860, chartH: 290, gridY: 1210, tileH: 190, gap: 26, hlY: 1665, foot: 1840 }
    : { head: 120, kicker: 250, title: 308, heroBase: 515, heroSize: 190, heroLabel: 600, chartY: 650, chartH: 200, gridY: 890, tileH: 150, gap: 22, hlY: null, foot: 1268 };
  if (!data.title) L.kicker += 30;

  const reveal = (k, dy, fn) => {
    if (k <= 0) return;
    ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * dy); fn(); ctx.restore();
  };

  drawShareBackground(ctx, W, H, opts.theme, time);
  if (th.shadow) { ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 3; }
  ctx.textBaseline = 'alphabetic';

  // Intestazione
  reveal(at(0, 0.5), -20, () => {
    // Logo + nome con un unico gradiente che scorre (come il motto in fondo)
    setFont(ctx, 900, 44);
    const nameW = [...'STILL'].reduce((w, ch) => w + ctx.measureText(ch).width, 0) + 14 * 4;
    const headFill = th.brand ? brandGradient(ctx, M - 6, 0, M + 104 + nameW, 0, phase) : th.text;
    drawLogo(ctx, M - 6, L.head - 70, 92, headFill);
    ctx.fillStyle = headFill;
    spacedText(ctx, 'STILL', M + 104, L.head - 8, 14);
    setFont(ctx, 700, 28); ctx.fillStyle = th.sub; ctx.textAlign = 'right';
    ctx.fillText(ellipsize(ctx, data.dateLabel || '', 460), W - M, L.head - 10);
    ctx.textAlign = 'left';
    // Piè di pagina (motto + link di STILL): sempre visibile, dal primo all'ultimo fotogramma
    drawShareFooter(ctx, W, M, L.foot, story, th, phase);
  });

  if (data.kind === 'recap') {
    drawRecapBody(ctx, data, { W, H, M, story, th, phase, live, time, foot: L.foot });
    ctx.shadowColor = 'transparent';
    return;
  }
  if (data.kind === 'quote') {
    drawQuoteBody(ctx, data, { W, H, M, story, th, phase, at, reveal, live, time, foot: L.foot });
    ctx.shadowColor = 'transparent';
    return;
  }
  if (data.kind === 'achievement') {
    drawAchievementBody(ctx, data, { W, H, M, story, th, phase, at, reveal, live, time });
    ctx.shadowColor = 'transparent';
    return;
  }
  if (data.kind === 'muscles') {
    drawMusclesBody(ctx, data, { W, H, M, story, th, phase, at, reveal, live, time });
    ctx.shadowColor = 'transparent';
    return;
  }

  // Kicker (con il nome) + titolo
  reveal(at(0.25, 0.5), 30, () => {
    fitFont(ctx, (data.kicker || '').toUpperCase(), 900, story ? 40 : 34, W - M * 2 - 120, 24);
    ctx.fillStyle = th.brand ? brandGradient(ctx, M, 0, W - M, 0, phase) : th.text;
    spacedText(ctx, (data.kicker || '').toUpperCase(), M, L.kicker, 6);
    if (data.title) {
      fitFont(ctx, data.title, 800, story ? 56 : 46, W - M * 2, 30);
      ctx.fillStyle = th.text;
      ctx.fillText(ellipsize(ctx, data.title, W - M * 2), M, L.title);
    }
  });

  // Numero protagonista (conta da zero)
  reveal(at(0.45, 0.45), 40, () => {
    const value = countUp(data.hero.value, live ? clamp01((time - 0.45) / 1.3) : 1);
    fitFont(ctx, data.hero.value, 900, L.heroSize, W - M * 2 - (data.pet ? (story ? 270 : 210) : 0), 80);
    ctx.fillStyle = th.brand ? brandGradient(ctx, M, L.heroBase - L.heroSize, W - M, L.heroBase, phase) : th.text;
    ctx.fillText(value, M - 6, L.heroBase);
    setFont(ctx, 800, story ? 36 : 30); ctx.fillStyle = th.sub;
    ctx.fillText(ellipsize(ctx, (data.hero.label || '').toUpperCase(), W - M * 2), M, L.heroLabel);
  });

  // Compagno a destra del numero protagonista
  {
    const ps = story ? 290 : 220;
    drawCornerPet(ctx, data, W - M - ps * 0.42, L.heroBase + 8, ps, live, at(0.7, 0.5));
  }

  // Grafico (si disegna progressivamente)
  reveal(at(0.9, 0.4), 20, () => {
    drawShareChart(ctx, data.chart, M, L.chartY, W - M * 2, L.chartH, th, live ? clamp01((time - 0.9) / 1.4) : 1, time);
  });

  // Riquadri
  const tiles = data.tiles.slice(0, 4);
  const tw = (W - M * 2 - L.gap) / 2;
  tiles.forEach((tile, i) => {
    reveal(at(1.5 + i * 0.15, 0.45), 40, () => {
      const tx = M + (i % 2) * (tw + L.gap);
      const ty = L.gridY + Math.floor(i / 2) * (L.tileH + L.gap);
      if (!th.shadow) {
        ctx.fillStyle = th.tile; roundRect(ctx, tx, ty, tw, L.tileH, 40); ctx.fill();
        ctx.lineWidth = 2; ctx.strokeStyle = th.border; ctx.stroke();
      }
      setFont(ctx, 800, story ? 24 : 21); ctx.fillStyle = th.sub;
      spacedText(ctx, ellipsize(ctx, tile.label.toUpperCase(), tw - 90), tx + 36, ty + (story ? 62 : 50), 3);
      fitFont(ctx, tile.value, 900, story ? 70 : 56, tw - 72, 30);
      ctx.fillStyle = th.text;
      ctx.fillText(countUp(tile.value, live ? clamp01((time - 1.5 - i * 0.15) / 0.9) : 1), tx + 34, ty + L.tileH - (story ? 40 : 32));
    });
  });

  // In evidenza (solo storia)
  if (L.hlY && data.highlights && data.highlights.length) {
    reveal(at(2.2, 0.45), 30, () => {
      setFont(ctx, 800, 24); ctx.fillStyle = th.sub;
      spacedText(ctx, (data.highlightsLabel || '').toUpperCase(), M, L.hlY, 4);
      data.highlights.slice(0, 2).forEach((h, i) => {
        const y = L.hlY + 56 + i * 52;
        ctx.beginPath(); ctx.arc(M + 10, y - 11, 9, 0, Math.PI * 2);
        ctx.fillStyle = h.positive ? th.good : (h.positive === false ? th.bad : th.faint); ctx.fill();
        setFont(ctx, 900, 34); ctx.fillStyle = th.text; ctx.textAlign = 'right';
        const vw = ctx.measureText(h.value).width;
        ctx.fillText(h.value, W - M, y);
        ctx.textAlign = 'left';
        setFont(ctx, 700, 34);
        ctx.fillText(ellipsize(ctx, h.name, W - M * 2 - vw - 70), M + 36, y);
      });
    });
  }

  ctx.shadowColor = 'transparent';
};

