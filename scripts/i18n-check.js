// Lingue: elenca le frasi dell'interfaccia (src/i18n-keys.json) che mancano nei dizionari js/i18n/<lingua>.js.
// Si lancia con: npm run i18n:check (dopo npm run build:template). Quello che manca si vede in italiano.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const keys = JSON.parse(fs.readFileSync(path.join(root, 'src', 'i18n-keys.json'), 'utf8'));
// Parole tecniche raccolte dalle espressioni del template, non testi da tradurre
const SKIP = /^(active|down|up|gym|home|quote|recap|week|year|rgba\(.*\))$/;

const dir = path.join(root, 'js', 'i18n');
let total = 0;
fs.readdirSync(dir).filter(f => f !== 'i18n.js' && f.endsWith('.js')).forEach(f => {
  const sandbox = { I18N_DICTS: {} };
  vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), sandbox);
  const lang = f.replace('.js', '');
  const dict = sandbox.I18N_DICTS[lang] || {};
  const missing = keys.filter(k => !SKIP.test(k) && !(k in dict) && /[a-zà-ù]{3}/i.test(k));
  // Nomi propri (autori, film) restano uguali: non contano come mancanti se iniziano con maiuscola e sono brevi
  const real = missing.filter(k => !/^[A-ZÀ-Ý][\w'’.]*( [A-ZÀ-Ý·][\w'’.]*)*$/.test(k));
  total += real.length;
  console.log(lang + ': ' + Object.keys(dict).length + ' tradotte, ' + real.length + ' da tradurre');
  real.forEach(k => console.log('  ' + JSON.stringify(k)));
});
process.exit(total ? 1 : 0);
