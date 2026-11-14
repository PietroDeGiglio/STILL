// Compila l'interfaccia dell'app (src/app-template.html) in js/app-render.js. Si lancia con: npm run build:template
// Va rilanciato ogni volta che si modifica src/app-template.html (come build:css per le classi nuove).
//
// Perché: prima Vue trasformava i ~440 KB di HTML dell'interfaccia in codice a ogni avvio, sul telefono.
// Finché non aveva finito, il tasto "Entra" si vedeva ma non rispondeva. Compilato qui una volta sola,
// l'app parte subito, usa la versione di Vue senza compilatore (più leggera) e non serve più 'unsafe-eval'.
const fs = require('fs');
const path = require('path');
const { compile } = require('@vue/compiler-dom');

const root = path.join(__dirname, '..');
const srcPath = path.join(root, 'src', 'app-template.html');
const outPath = path.join(root, 'js', 'app-render.js');
const source = fs.readFileSync(srcPath, 'utf8');

// Lingue: i testi fissi passano da $t(...) (scripts/i18n-extract.js); l'elenco va in src/i18n-keys.json
const { i18nTransform } = require('./i18n-extract');
const { ast, keys } = i18nTransform(source, { comments: false, prefixIdentifiers: true });
// Anche le etichette e i messaggi fissi scritti in js/app.js (arrivano all'interfaccia e passano da $tv)
const appSrc = fs.readFileSync(path.join(root, 'js', 'app.js'), 'utf8');
const appRe = /\b(?:label|title|sub|hint|desc|text|short|name|msg|tip|why|note|message|kicker|badge|unit):\s*'((?:[^'\\\n]|\\.)*)'|\b(?:message|msg)\s*=\s*'((?:[^'\\\n]|\\.)*)'|\b(?:showToastMessage|showConfirm)\(\s*(?:'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)")/g;
for (const m of appSrc.matchAll(appRe)) {
  const v = (m[1] || m[2] || m[3] || m[4] || '').replace(/\\(['"])/g, '$1').trim();
  if (/[A-Za-zÀ-ÿ]{2}/.test(v) && !/^[a-z0-9]+[-_][\w-]*$/.test(v) && !keys.has(v)) keys.set(v, 0);
}
// E i testi dei dati mostrati così come sono: trofei, livelli, compagni, frasi del giorno, mappa del corpo
const STR = String.raw`'((?:[^'\\\n]|\\.)*)'`;
const DATA_STRINGS = {
  'js/data/trophies.js': new RegExp(String.raw`\b(?:name|unit|one|hint):\s*` + STR + String.raw`|LEVEL_TITLES = \[([^\]]*)\]`, 'g'),
  'js/data/pets.js': new RegExp(String.raw`\b(?:name|label):\s*` + STR + String.raw`|stages:\s*\[([^\]]*)\]`, 'g'),
  'js/data/quotes.js': new RegExp(String.raw`\b(?:pre|hi|by):\s*` + STR, 'g'),
  'js/data/exercise-art.js': new RegExp(String.raw`()BODY_LABELS = \[([^\]]*)\]`, 'g')
};
const addData = (v) => { v = v.replace(/\\(['"])/g, '$1').trim(); if (/[A-Za-zÀ-ÿ]{2}/.test(v) && !keys.has(v)) keys.set(v, 0); };
Object.entries(DATA_STRINGS).forEach(([file, re]) => {
  const src = fs.readFileSync(path.join(root, file), 'utf8');
  for (const m of src.matchAll(re)) {
    if (m[1] !== undefined) addData(m[1]);
    if (m[2] !== undefined) for (const q of m[2].matchAll(new RegExp(STR, 'g'))) addData(q[1]);
  }
});
fs.writeFileSync(path.join(root, 'src', 'i18n-keys.json'), JSON.stringify([...keys.keys()].sort((x, y) => x.localeCompare(y, 'it')), null, 1).replace(/\n/g, '\r\n') + '\r\n');

const errors = [];
const { code } = compile(ast, {
  mode: 'function',          // codice che prende gli helper dalla variabile globale Vue
  prefixIdentifiers: true,   // _ctx.nome invece di with(...): più veloce
  hoistStatic: true,         // le parti che non cambiano si creano una volta sola
  cacheHandlers: true,       // i @click non si ricreano a ogni aggiornamento
  comments: false,
  onError: (e) => errors.push(e),
  onWarn: () => {}
});
if (errors.length) {
  errors.forEach(e => console.error('src/app-template.html:' + (e.loc ? e.loc.start.line + ':' + e.loc.start.column : '?') + ' ' + e.message));
  process.exit(1);
}

const out = '// GENERATO da scripts/build-template.js partendo da src/app-template.html: non modificare a mano.\n' +
  '// eslint-disable-next-line\n' +
  'var STILL_RENDER = (function () {\n' + code + '\n})();\n';
fs.writeFileSync(outPath, out.replace(/\r?\n/g, '\r\n'));
console.log('js/app-render.js: ' + Math.round(out.length / 1024) + ' KB · testi da tradurre: ' + keys.size);
