# STILL

Dieta, allenamento e progressi in un'unica app. Ieri. Oggi. Domani. Ancora.

Online: https://pietrodegiglio.github.io/STILL/

## Com'è fatta

- App web (PWA) in Vue 3, senza server: tutti i dati restano sul telefono (`localStorage`), con backup in JSON dal Profilo.
- Nessuna dipendenza da siti esterni: Vue, pdf.js e il font sono in `js/vendor` e `assets/fonts`, le classi Tailwind in `css/tailwind.css`.
- Le foto degli esercizi (`assets/exercises`) vengono da [Free Exercise DB](https://github.com/yuhonas/free-exercise-db), pubblico dominio (Unlicense).
- `index.html`: pagina e schermata di avvio · `src/app-template.html`: interfaccia (compilata in `js/app-render.js`) · `js/app.js`: logica · `js/data`, `js/utils`, `js/import`, `js/share`: moduli · `sw.js`: funzionamento offline.

## Quando si modifica qualcosa

Serve Node.js solo per rigenerare i file locali (l'app gira senza):

```
npm install          # una volta sola
npm run build:template  # dopo ogni modifica a src/app-template.html (crea js/app-render.js)
npm run build:css    # dopo aver usato classi Tailwind nuove in src/app-template.html, index.html o nei .js
npm run test:import  # prove del lettore delle schede
npm run vendor       # dopo aver aggiornato Vue, pdf.js o il font in package.json
```

Se si aggiunge un file all'app va messo anche in `APP_FILES` di `sw.js`, cambiando `VERSION`.
