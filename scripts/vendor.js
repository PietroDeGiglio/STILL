// Copia le librerie da node_modules dentro l'app, così STILL non dipende da nessun sito esterno
// (funziona offline dal primo avvio e sarà pronta per l'APK). Si lancia con: npm run vendor
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const nm = (p) => path.join(root, 'node_modules', p);
const copy = (from, to) => {
  const dest = path.join(root, to);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(nm(from), dest);
  console.log('  ' + to);
};

console.log('Librerie copiate:');
copy('vue/dist/vue.global.prod.js', 'js/vendor/vue.global.prod.js');
copy('pdfjs-dist/build/pdf.min.js', 'js/vendor/pdfjs/pdf.min.js');
copy('pdfjs-dist/build/pdf.worker.min.js', 'js/vendor/pdfjs/pdf.worker.min.js');
['latin', 'latin-ext'].forEach(set => ['normal', 'italic'].forEach(style =>
  copy(`@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-${set}-wght-${style}.woff2`,
       `assets/fonts/plus-jakarta-sans-${set}-${style}.woff2`)));
