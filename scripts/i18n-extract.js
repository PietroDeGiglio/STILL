// Lingue (js/i18n/): trova i testi fissi dell'interfaccia e li fa passare da $t('testo italiano').
// Usato da scripts/build-template.js prima di compilare src/app-template.html.
//
// Il testo italiano resta la "chiave": le traduzioni stanno in js/i18n/<lingua>.js come { 'italiano': 'traduzione' }.
// - Testo con valori dentro ("{{ n }} giorni di fila") → una sola frase con segnaposto: '{0} giorni di fila'
// - Attributi placeholder, title, aria-label, alt → :attributo="$t('...')"
// - Solo valori ({{ opt.label }}, {{ x ? 'Oggi' : 'Ieri' }}) → $tv(...): il risultato si cerca nel dizionario
//   (se non c'è resta com'è). Le frasi tra apici dentro queste espressioni finiscono nel catalogo.
const { parse, createSimpleExpression, NodeTypes } = require('@vue/compiler-dom');

const WORDY = /[A-Za-zÀ-ÿ]{2}/;
const TRANSLATED_ATTRS = new Set(['placeholder', 'title', 'aria-label', 'alt']);
const SKIP_TAGS = new Set(['script', 'style', 'svg', 'path', 'textarea']);

const clean = (s) => s.replace(/\s+/g, ' ');

const i18nTransform = (source, parserOptions = {}) => {
  const ast = parse(source, parserOptions);
  const keys = new Map();   // testo → riga (per il catalogo)
  const addKey = (key, loc) => { if (!keys.has(key)) keys.set(key, loc ? loc.start.line : 0); return key; };
  // Frasi tra apici dentro un'espressione (risultati possibili di $tv)
  const literals = (exp, loc) => {
    for (const m of exp.matchAll(/'((?:[^'\\\n]|\\.)*)'/g)) {
      const v = m[1].replace(/\\'/g, "'").trim();
      if (WORDY.test(v) && !/^[a-z0-9]+[-_][\w-]*$/.test(v)) addKey(v, loc);
    }
  };
  const tv = (exp, loc) => { literals(exp, loc); return createSimpleExpression(`$tv(${exp})`, false, loc); };

  const visit = (node) => {
    if (node.type !== NodeTypes.ELEMENT && node.type !== NodeTypes.ROOT) return;
    if (node.type === NodeTypes.ELEMENT) {
      if (SKIP_TAGS.has(node.tag)) return;
      if (node.props.some(p => p.type === NodeTypes.DIRECTIVE && (p.name === 'pre' || p.name === 'html' || p.name === 'text'))) return;
      // Attributi da tradurre
      node.props = node.props.map(p => {
        // :placeholder="espressione" → $tv(...)
        if (p.type === NodeTypes.DIRECTIVE && p.name === 'bind' && p.arg && p.arg.isStatic && TRANSLATED_ATTRS.has(p.arg.content) && p.exp) {
          return { ...p, exp: tv(p.exp.content, p.loc) };
        }
        if (p.type !== NodeTypes.ATTRIBUTE || !TRANSLATED_ATTRS.has(p.name) || !p.value || !WORDY.test(p.value.content)) return p;
        const key = addKey(clean(p.value.content).trim(), p.loc);
        return {
          type: NodeTypes.DIRECTIVE, name: 'bind', rawName: ':' + p.name, loc: p.loc, modifiers: [],
          arg: createSimpleExpression(p.name, true, p.loc),
          exp: createSimpleExpression(`$t(${JSON.stringify(key)})`, false, p.loc)
        };
      });
    }
    // Figli: gruppi di testo e {{ }} consecutivi diventano una frase sola
    const out = [];
    let run = [];
    const flush = () => {
      if (!run.length) return;
      const hasWords = run.some(n => n.type === NodeTypes.TEXT && WORDY.test(n.content));
      if (!hasWords) {
        run.forEach(n => out.push(n.type === NodeTypes.INTERPOLATION ? { ...n, content: tv(n.content.content, n.loc) } : n));
        run = []; return;
      }
      const exprs = [];
      let text = '';
      run.forEach(n => {
        if (n.type === NodeTypes.TEXT) text += n.content;
        else { text += '{' + exprs.length + '}'; exprs.push(n.content.content); literals(n.content.content, n.loc); }
      });
      const lead = /^\s/.test(text), trail = /\s$/.test(text);
      const key = addKey(clean(text).trim(), run[0].loc);
      const loc = run[0].loc;
      if (lead && out.length) out.push({ type: NodeTypes.TEXT, content: ' ', loc });
      const args = exprs.length ? `, [${exprs.map(e => '(' + e + ')').join(', ')}]` : '';
      out.push({ type: NodeTypes.INTERPOLATION, loc, content: createSimpleExpression(`$t(${JSON.stringify(key)}${args})`, false, loc) });
      if (trail) out.push({ type: NodeTypes.TEXT, content: ' ', loc });
      run = [];
    };
    node.children.forEach(ch => {
      if (ch.type === NodeTypes.TEXT || ch.type === NodeTypes.INTERPOLATION) run.push(ch);
      else { flush(); out.push(ch); }
    });
    flush();
    // Un testo finito come ultimo figlio con solo spazio non serve
    while (out.length && out[out.length - 1].type === NodeTypes.TEXT && !out[out.length - 1].content.trim() && node.type === NodeTypes.ROOT) out.pop();
    node.children = out;
    node.children.forEach(visit);
  };
  visit(ast);
  return { ast, keys };
};

module.exports = { i18nTransform };
