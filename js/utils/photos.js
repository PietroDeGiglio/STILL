// ---------------------------------------------------------------
// FOTO DEI PROGRESSI: archivio sul dispositivo (IndexedDB) e compressione.
// Le foto restano solo su questo telefono: non vanno su nessun server e non entrano nel backup JSON
// (peserebbero troppo). Si possono salvare a parte con "Salva le foto" e ricaricare: la data si legge dal nome.
// localStorage tiene ~5 MB in tutto, per questo le foto stanno in IndexedDB (centinaia di MB).
// Ogni foto: { id, date: 'AAAA-MM-GG', pose: 'fronte'|'lato'|'retro'|'altro', note, createdAt, w, h, blob, thumb }
// ---------------------------------------------------------------

const PHOTO_DB = 'still_photos';
const PHOTO_STORE = 'photos';
const PHOTO_MAX_SIDE = 1440;   // lato lungo della foto salvata: nitida sul telefono, ~200-400 KB
const PHOTO_THUMB_SIDE = 360;  // miniatura per la galleria
const PHOTO_POSES = [
  { id: 'fronte', label: 'Fronte' },
  { id: 'lato', label: 'Lato' },
  { id: 'retro', label: 'Retro' },
  { id: 'altro', label: 'Altro' }
];

let photoDbPromise = null;
const photoDb = () => {
  if (!photoDbPromise) {
    photoDbPromise = new Promise((resolve, reject) => {
      if (typeof indexedDB === 'undefined') { reject(new Error('indexeddb')); return; }
      const req = indexedDB.open(PHOTO_DB, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(PHOTO_STORE)) {
          const store = db.createObjectStore(PHOTO_STORE, { keyPath: 'id' });
          store.createIndex('date', 'date');
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    photoDbPromise.catch(() => { photoDbPromise = null; });
  }
  return photoDbPromise;
};
const photoTx = async (mode, fn) => {
  const db = await photoDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PHOTO_STORE, mode);
    const store = tx.objectStore(PHOTO_STORE);
    let result;
    Promise.resolve(fn(store, (r) => { result = r; })).catch(reject);
    tx.oncomplete = () => resolve(result);
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error || new Error('abort'));
  });
};
const reqResult = (req, set) => { req.onsuccess = () => set(req.result); };

const photoStore = {
  // Tutte le foto senza l'immagine grande (solo miniatura): per la galleria
  async list() {
    const all = await photoTx('readonly', (store, set) => reqResult(store.getAll(), set));
    return (all || []).map(({ blob, ...rest }) => rest)
      .sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.createdAt || 0) - (a.createdAt || 0));
  },
  async get(id) { return photoTx('readonly', (store, set) => reqResult(store.get(id), set)); },
  async put(photo) { return photoTx('readwrite', (store) => { store.put(photo); }); },
  async update(id, changes) {
    return photoTx('readwrite', (store) => {
      const req = store.get(id);
      req.onsuccess = () => { if (req.result) store.put({ ...req.result, ...changes }); };
    });
  },
  async remove(id) { return photoTx('readwrite', (store) => { store.delete(id); }); },
  async clear() { return photoTx('readwrite', (store) => { store.clear(); }); },
  async count() { return photoTx('readonly', (store, set) => reqResult(store.count(), set)); }
};

// --- Compressione ---
// Legge un file immagine (con l'orientamento giusto delle foto del telefono) e lo ridimensiona
const loadImageSource = async (file) => {
  if (typeof createImageBitmap === 'function') {
    try { return await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch (e) { /* si prova con <img> */ }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    await img.decode();
    return img;
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
};
const canvasToBlob = (canvas, type, quality) => new Promise((resolve, reject) => {
  canvas.toBlob(b => (b ? resolve(b) : reject(new Error('blob'))), type, quality);
});
const resizeTo = async (source, maxSide, quality) => {
  const sw = source.width, sh = source.height;
  const scale = Math.min(1, maxSide / Math.max(sw, sh));
  const w = Math.max(1, Math.round(sw * scale)), h = Math.max(1, Math.round(sh * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, 0, 0, w, h);
  return { blob: await canvasToBlob(canvas, 'image/jpeg', quality), w, h };
};
const compressPhoto = async (file) => {
  const source = await loadImageSource(file);
  try {
    const big = await resizeTo(source, PHOTO_MAX_SIDE, 0.85);
    const small = await resizeTo(source, PHOTO_THUMB_SIDE, 0.75);
    return { blob: big.blob, thumb: small.blob, w: big.w, h: big.h };
  } finally {
    if (source.close) source.close();
  }
};

// --- Data della foto ---
// Dal nome del file ("still-2026-03-14-fronte.jpg", "IMG_20260314_093012.jpg", "PXL_20260314…")
// oppure dalla data di modifica del file. Restituisce 'AAAA-MM-GG' o ''.
const photoDateFromFile = (file) => {
  const name = String((file && file.name) || '');
  const valid = (y, m, d) => {
    const dt = new Date(Number(y), Number(m) - 1, Number(d));
    return dt.getFullYear() === Number(y) && dt.getMonth() === Number(m) - 1 && Number(y) >= 2000 && dt.getTime() <= Date.now() + 86400000;
  };
  let m = /(20\d\d)[-_.]?(0[1-9]|1[0-2])[-_.]?(0[1-9]|[12]\d|3[01])/.exec(name);
  if (m && valid(m[1], m[2], m[3])) return `${m[1]}-${m[2]}-${m[3]}`;
  if (file && file.lastModified) {
    const d = new Date(file.lastModified);
    if (!isNaN(d) && d.getTime() <= Date.now() + 86400000) {
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
  }
  return '';
};
const photoPoseFromFile = (file) => {
  const n = String((file && file.name) || '').toLowerCase();
  return (PHOTO_POSES.find(p => p.id !== 'altro' && n.includes(p.id)) || {}).id || '';
};
// Nome del file quando si salvano le foto: così ricaricandole si ritrovano data e posa
const photoFileName = (photo, index = 0) => `still-${photo.date}-${photo.pose || 'foto'}${index ? '-' + index : ''}.jpg`;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { photoDateFromFile, photoPoseFromFile, photoFileName, PHOTO_POSES };
}
