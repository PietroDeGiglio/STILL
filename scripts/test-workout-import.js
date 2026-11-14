// Prove del lettore della scheda (js/import/workout-text.js): modi tipici di scrivere una scheda nelle Note o in un PDF.
// Si lancia con: npm run test:import
// Ogni caso dice quali giorni e quanti esercizi devono uscire. Esce con errore se un caso non torna.
const fs = require('fs'), vm = require('vm');
const root = process.cwd();
const ctx = { console, module: { exports: {} } };
vm.createContext(ctx);
vm.runInContext(['js/data/exercises.js', 'js/import/workout-text.js'].map(f => fs.readFileSync(root + '/' + f, 'utf8')).join('\n;\n') + ';globalThis.P = parseWorkoutText;', ctx);

const cases = [
  ['Note semplici', `Giorno A
Panca piana 4x8 60kg
Croci ai cavi 3x12
Lat machine 4x10 rec 90
Giorno B
Squat 5x5 100kg
Leg extension a gamba singola 3x12
Tapis 20 min`, [['Giorno A', 3], ['Giorno B', 3]]],
  ['Numeri a capo', `LUNEDÌ
Panca piana
4x8
Military press
3 x 10
MERCOLEDÌ
Stacco da terra
5x5 120 kg`, [['Lunedì', 2], ['Mercoledì', 1]]],
  ['Superserie e piramidi', `Day 1 - Push
Panca inclinata manubri 4 x 12/10/8/6
Alzate laterali + alzate frontali 3x12
Pushdown corda 3x15 rec 60''`, [['Day 1 - Push', 4]]],
  ['Senza giorni', `panca 3x10
rematore 3x10
curl 3x12`, [['Giorno A', 3]]],
  ['Con note e regole', `Scheda massa ottobre
Note: aumenta il peso ogni settimana se completi tutte le ripetizioni.
Riscaldamento: 10 minuti di cyclette.
Giorno A - Petto e tricipiti
Panca piana 4x8
Dip 3x max
Recupero sempre 90 secondi tra le serie, mai a cedimento.
Giorno B - Schiena
Trazioni 4x6
Pulley 3x12`, [['Giorno A - Petto e tricipiti', 2], ['Giorno B - Schiena', 2]]],
  ['Elenco numerato', `Allenamento A
1. Leg press 4x12
2. Affondi 3x10 per gamba
3. Leg curl 3x12
Allenamento B
1) Lat machine 4x10
2) Rematore manubrio 3x10`, [['Allenamento A', 3], ['Allenamento B', 2]]],
  ['Serie da', `Giorno 1
Squat 4 serie da 10
Pressa 3 serie x 12 rip
Calf 4 serie da 15`, [['Giorno 1', 3]]],
  ['Riscaldamento poi esercizi senza giorno', `Riscaldamento
5 min cyclette
Panca piana 4x8
Rematore 4x10`, [['Giorno A', 2]]],
  // Scheda "dettagliata": regole, calendario, riscaldamento e spiegazioni passo passo da non prendere come esercizi
  ['Scheda dettagliata', `Scheda di allenamento: palestra e
piscina
Programma di 12 settimane, prudente e progressivo.
Regole di base
Intensità: RPE 6-7 su 10, cioè 2-3 ripetizioni di riserva. Mai a cedimento.
Da evitare: stacchi pesanti da terra, squat con bilanciere, crunch.
Calendario settimanale
Giorno Attività
Lunedì Palestra A: gambe e core
Martedì Piscina 1: nuoto
Domenica Riposo
Progressione
Settimane 1-4: 2 serie per esercizio, RPE 6, per imparare la tecnica.
Riscaldamento (8-10 minuti)
1. Cyclette o ellittica leggera
Serie e ripetizioni 5 minuti
Esecuzione passo passo 1. Pedala a resistenza minima, ritmo facile.
2. Ponte glutei
Serie e ripetizioni 10 ripetizioni
Palestra A (lunedì): gambe e core
Fasi: settimane 1-4 con 2 serie, 5-8 con 3 serie. RPE 6-7: restano 2-3 ripetizioni in riserva.
1. Leg press
Serie e ripetizioni 3 x 10-12
Posizione di partenza Siediti con schiena e glutei ben appoggiati.
Esecuzione passo passo 1. Sblocca il carrello e spingi senza estendere del tutto le ginocchia.
2. Scendi lentamente per 3 secondi fino a circa 80-90° di flessione.
3. Spingi con tutta la pianta del piede.
Respirazione e ritmo Inspira in discesa, espira in spinta.
Immagini e video Guarda le immagini | Guarda i video
2. Leg curl da seduta
Serie e ripetizioni 3 x 12
Esecuzione passo passo 1. Piega le ginocchia portando i talloni sotto di te in 2 secondi.
2. Tieni 1 secondo in contrazione.
3. Pallof press
Serie e ripetizioni 3 x 10 per lato
Piscina 1: nuoto (40 min)
4 x 25 m gambata con tavoletta
3 x 10 affondi corti in acqua
Nota finale
Alternative concrete: parlane con il medico.`, [['Palestra A (lunedì): gambe e core', 3]]],
  // Tabella del PDF letta per colonne: "Leg press | 3 x 10-12 | Piedi a metà pedana..."
  ['Tabella con esecuzione', `Palestra B: parte alta
Chest press alla macchina 3 x 10-12
Rematore petto appoggiato 3 x 10-12
Plank laterale sulle ginocchia 2 x 20 s per lato
Farmer carry leggero 3 x 20 m
Defaticamento (5 minuti)
Respirazione diaframmatica per 2 minuti, poi allungamento.`, [['Palestra B: parte alta', 4]]]
];

let fail = 0;
cases.forEach(([name, text, want]) => {
  const r = ctx.P(text, '');
  const got = r.days.map(d => [d.name, d.exercises.length]);
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) fail++;
  console.log((ok ? 'OK  ' : 'FAIL') + ' ' + name + (ok ? '' : '\n     voluto ' + JSON.stringify(want) + '\n     avuto  ' + JSON.stringify(got) + '\n     ' + r.days.map(d => d.exercises.map(e => e.name + ' ' + e.sets + 'x' + e.reps).join(' | ')).join(' || ')));
});
console.log(fail ? fail + ' falliti' : 'tutti ok');
if (fail) process.exit(1);
