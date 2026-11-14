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

const errors = [];
const { code } = compile(source, {
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
console.log('js/app-render.js: ' + Math.round(out.length / 1024) + ' KB');
