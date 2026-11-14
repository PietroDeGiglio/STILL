// Lingue dell'app. Il testo italiano è la "chiave": i dizionari (js/i18n/en.js, es.js, ...) dicono
// { 'testo italiano': 'traduzione' }. Quello che manca in un dizionario resta in italiano.
// L'elenco dei testi dell'interfaccia lo genera npm run build:template in src/i18n-keys.json.
const LOCALES = [
  { id: 'it', name: 'Italiano', flag: '🇮🇹' },
  { id: 'en', name: 'English', flag: '🇬🇧' },
  { id: 'es', name: 'Español', flag: '🇪🇸' }
];
const I18N_DICTS = {};
const LANG_KEY = 'still_lang';

// Lingua scelta, altrimenti quella del telefono (se c'è), altrimenti italiano
const detectLocale = () => {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && LOCALES.some(l => l.id === saved)) return saved;
  } catch (e) {}
  const langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'it']);
  for (const l of langs) {
    const id = String(l || '').slice(0, 2).toLowerCase();
    if (LOCALES.some(x => x.id === id)) return id;
  }
  return 'it';
};
const i18nLocale = Vue.ref(detectLocale());
document.documentElement.lang = i18nLocale.value;

const setLocale = (id) => {
  if (!LOCALES.some(l => l.id === id)) return;
  i18nLocale.value = id;
  document.documentElement.lang = id;
  try { localStorage.setItem(LANG_KEY, id); } catch (e) {}
};

// Lingua per date e numeri (Intl / toLocaleString)
const INTL_LOCALES = { it: 'it-IT', en: 'en-GB', es: 'es-ES' };
const i18nIntl = () => INTL_LOCALES[i18nLocale.value] || 'it-IT';

// Un valore qualsiasi: se è un testo presente nel dizionario lo traduce, altrimenti lo lascia com'è
const i18nTv = (v) => {
  if (typeof v !== 'string' || i18nLocale.value === 'it') return v;
  const dict = I18N_DICTS[i18nLocale.value];
  return (dict && dict[v.trim()] !== undefined) ? v.replace(v.trim(), dict[v.trim()]) : v;
};
// Frase con segnaposto {0}, {1}... riempiti con params (tradotti anche loro se sono testi noti)
const i18nT = (key, params) => {
  const dict = i18nLocale.value === 'it' ? null : I18N_DICTS[i18nLocale.value];
  const s = (dict && dict[key] !== undefined) ? dict[key] : key;
  if (!params) return s;
  return s.replace(/\{(\d+)\}/g, (m, i) => {
    const v = i18nTv(params[i]);
    return v == null ? '' : (typeof v === 'object' ? JSON.stringify(v) : String(v));
  });
};
