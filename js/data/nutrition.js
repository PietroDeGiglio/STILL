// Consigli per mangiare meglio: solo dati (la logica è in app.js, sezione MANGIARE MEGLIO).
// Non sono diete personalizzate: aiutano chi vuole iniziare, in attesa di andare da un nutrizionista.
// Le giornate tipo usano alimenti riconosciuti da js/utils/calories.js, così kcal e proteine si calcolano da sole.

const NUTRITION_TIPS = [
  { icon: '🍽️', title: 'Il piatto unico', text: 'A pranzo e a cena: metà piatto verdura, un quarto proteine (carne, pesce, uova, legumi), un quarto carboidrati (pasta, riso, pane, patate). Funziona sempre, anche al ristorante.' },
  { icon: '🥩', title: 'Proteine a ogni pasto', text: 'Saziano più a lungo e proteggono i muscoli mentre ti alleni. A colazione basta uno yogurt greco o due uova.', stat: 'protein' },
  { icon: '💧', title: 'Bevi acqua', text: 'Spesso la "fame" tra un pasto e l\'altro è sete. Tieni una bottiglia sempre in vista.', stat: 'water' },
  { icon: '🥦', title: 'Verdura due volte al giorno', text: 'A pranzo e a cena, e 2-3 frutti al giorno. Fibre, vitamine e tanto volume con poche calorie.' },
  { icon: '🫘', title: 'Legumi 3 volte a settimana', text: 'Ceci, lenticchie, fagioli: proteine e fibre a basso costo. Anche in scatola vanno benissimo (sciacquati).' },
  { icon: '🫒', title: 'L\'olio fa bene, ma pesa', text: 'Un cucchiaio sono circa 90 kcal. Misuralo invece di versarlo "a occhio": è il modo più facile per togliere calorie senza accorgersene.' },
  { icon: '🥤', title: 'Attenzione a quello che bevi', text: 'Bibite, succhi e alcol sono calorie che non saziano. Una lattina di cola sono 140 kcal; meglio la versione zero o l\'acqua frizzante con limone.' },
  { icon: '🛒', title: 'La spesa decide la dieta', text: 'Quello che hai in casa è quello che mangi. Fai la spesa con la lista (STILL te la prepara dal piano) e mai a stomaco vuoto.' },
  { icon: '🐢', title: 'Mangia con calma', text: 'Il senso di sazietà arriva dopo circa 20 minuti. Mangiare lentamente, senza telefono, aiuta a mangiare il giusto.' },
  { icon: '😴', title: 'Dormi 7-8 ore', text: 'Chi dorme poco ha più fame il giorno dopo, soprattutto di dolci. Il sonno fa parte della dieta.' },
  { icon: '🍕', title: 'Lo sgarro non rovina niente', text: 'Conta quello che fai la maggior parte dei giorni. Una pizza il sabato va benissimo: il giorno dopo si riparte normale, senza "compensare".' },
  { icon: '👩‍⚕️', title: 'Poi vai da un nutrizionista', text: 'Questi consigli servono per iniziare. Per un piano su misura vai da un professionista: portagli i tuoi progressi di STILL (peso, misure, allenamenti), gli saranno utili.' }
];

// Giornate tipo per obiettivo: 3 giornate (A, B, C) che si alternano nella settimana
const NUTRITION_GOALS = [
  {
    id: 'lose', name: 'Perdere peso', icon: '🔥', range: '1600-1750 kcal',
    desc: 'Leggera ma sazia: tante proteine e verdure, carboidrati a pranzo e a cena in porzioni piccole.',
    days: [
      { name: 'Giornata A', meals: {
        colazione: ['170g yogurt greco 0', '40g fiocchi d avena', '100g frutti di bosco'],
        spuntino_mattina: ['1 mela', '1 yogurt magro'],
        pranzo: ['80g pasta integrale', '150g petto di pollo', 'verdure grigliate', '1 cucchiaio di olio'],
        spuntino_pomeriggio: ['30g mandorle'],
        cena: ['200g merluzzo', '250g patate', 'insalata', '1 cucchiaio di olio']
      } },
      { name: 'Giornata B', meals: {
        colazione: ['2 uova strapazzate', '60g pane integrale', '1 kiwi'],
        spuntino_mattina: ['1 yogurt greco 0'],
        pranzo: ['70g riso basmati', '200g lenticchie lessate', 'verdura cotta', '1 cucchiaio di olio'],
        spuntino_pomeriggio: ['1 banana', '10g mandorle'],
        cena: ['150g salmone', 'verdure al vapore', '60g pane integrale']
      } },
      { name: 'Giornata C', meals: {
        colazione: ['150g skyr', '40g muesli', '1 pera'],
        spuntino_mattina: ['30g bresaola', '2 gallette di riso'],
        pranzo: ['80g farro', '150g petto di tacchino', 'pomodori', '1 cucchiaio di olio'],
        spuntino_pomeriggio: ['1 arancia', '20g mandorle'],
        cena: ['2 uova', '100g albumi', '200g zucchine', '70g pane integrale', '1 cucchiaio di olio']
      } }
    ]
  },
  {
    id: 'keep', name: 'Mangiare sano', icon: '🥗', range: '2050-2200 kcal',
    desc: 'Equilibrata per chi vuole mantenere il peso e sentirsi meglio, anche allenandosi qualche volta a settimana.',
    days: [
      { name: 'Giornata A', meals: {
        colazione: ['250ml latte parzialmente scremato', '40g fiocchi d avena', '1 banana', '10g burro di arachidi', '1 cucchiaino di miele'],
        spuntino_mattina: ['1 yogurt greco 0'],
        pranzo: ['100g pasta', '150g petto di pollo', 'verdure grigliate', '1 cucchiaio di olio'],
        spuntino_pomeriggio: ['1 mela', '30g mandorle'],
        cena: ['200g orata', '300g patate', 'insalata', '1 cucchiaio di olio']
      } },
      { name: 'Giornata B', meals: {
        colazione: ['2 uova', '80g pane integrale', '1 kiwi', '1 cucchiaino di miele'],
        spuntino_mattina: ['30g grana', '2 gallette di riso'],
        pranzo: ['90g riso basmati', '200g ceci lessati', 'verdura cotta', '1 cucchiaio di olio'],
        spuntino_pomeriggio: ['150g yogurt greco 0', '100g frutti di bosco', '30g muesli'],
        cena: ['150g salmone', 'verdure al vapore', '90g pane integrale', '1 cucchiaino di olio']
      } },
      { name: 'Giornata C', meals: {
        colazione: ['170g yogurt greco 0', '50g muesli', '1 pera'],
        spuntino_mattina: ['1 banana', '20g mandorle'],
        pranzo: ['100g pasta integrale', '150g tonno al naturale', 'pomodori', '1 cucchiaio di olio'],
        spuntino_pomeriggio: ['50g prosciutto crudo', '70g pane'],
        cena: ['150g manzo', '300g patate', 'insalata', '1 cucchiaio di olio']
      } }
    ]
  },
  {
    id: 'gain', name: 'Mettere massa', icon: '💪', range: '2750-2900 kcal',
    desc: 'Per chi si allena forte e vuole crescere: più carboidrati intorno all\'allenamento e proteine alte.',
    days: [
      { name: 'Giornata A', meals: {
        colazione: ['250ml latte parzialmente scremato', '80g fiocchi d avena', '1 banana', '20g burro di arachidi'],
        spuntino_mattina: ['170g yogurt greco 0', '30g mandorle'],
        pranzo: ['140g pasta', '150g petto di pollo', 'verdure grigliate', '1 cucchiaio di olio'],
        post_workout: ['30g whey', '1 banana'],
        cena: ['200g salmone', '350g patate', 'insalata', '1 cucchiaio di olio', '50g pane']
      } },
      { name: 'Giornata B', meals: {
        colazione: ['3 uova', '100g pane integrale', '1 kiwi', '1 cucchiaino di miele'],
        spuntino_mattina: ['50g bresaola', '4 gallette di riso', '20g mandorle'],
        pranzo: ['130g riso basmati', '200g ceci lessati', '100g petto di pollo', 'verdura cotta', '1 cucchiaio di olio'],
        post_workout: ['30g whey', '50g fiocchi d avena'],
        cena: ['200g manzo', '120g pane', 'verdure al vapore', '1 cucchiaio di olio']
      } },
      { name: 'Giornata C', meals: {
        colazione: ['200g skyr', '80g muesli', '1 banana', '20g burro di arachidi'],
        spuntino_mattina: ['80g pane integrale', '60g prosciutto crudo'],
        pranzo: ['140g pasta integrale', '150g tonno al naturale', 'pomodori', '1 cucchiaio di olio'],
        post_workout: ['30g whey', '1 mela', '30g mandorle'],
        cena: ['200g tacchino', '350g patate dolci', 'insalata', '1 cucchiaio di olio']
      } }
    ]
  }
];

// I tuoi gusti: cosa escludere dalle giornate tipo (gli alimenti esclusi vengono sostituiti da soli)
const EAT_EXCLUDES = [
  { id: 'vegetariano', label: 'Vegetariano', icon: '🥦', tags: ['carne', 'pesce'] },
  { id: 'vegano', label: 'Vegano', icon: '🌱', tags: ['carne', 'pesce', 'uova', 'latticini'] },
  { id: 'carne', label: 'Niente carne', icon: '🥩', tags: ['carne'] },
  { id: 'pesce', label: 'Niente pesce', icon: '🐟', tags: ['pesce'] },
  { id: 'latticini', label: 'Niente latticini', icon: '🥛', tags: ['latticini'] },
  { id: 'uova', label: 'Niente uova', icon: '🥚', tags: ['uova'] },
  { id: 'legumi', label: 'Niente legumi', icon: '🫘', tags: ['legumi'] },
  { id: 'fruttasecca', label: 'Niente frutta secca', icon: '🥜', tags: ['fruttasecca'] }
];

// Alimenti intercambiabili: toccando un alimento di una giornata tipo si sceglie un'alternativa dello stesso gruppo.
// La porzione si ricalcola da sola: a parità di proteine (by: 'protein') o di calorie.
// t = nome (riconosciuto da js/utils/calories.js) · tags = per le esclusioni · c = si conta a pezzi (uova, frutti, vasetti)
const FOOD_SWAPS = [
  { id: 'secondo', by: 'protein', max: 300, meals: ['pranzo', 'cena'], items: [
    { t: 'petto di pollo', tags: ['carne'] }, { t: 'petto di tacchino', tags: ['carne'] }, { t: 'manzo', tags: ['carne'] },
    { t: 'merluzzo', tags: ['pesce'] }, { t: 'salmone', tags: ['pesce'] }, { t: 'orata', tags: ['pesce'] }, { t: 'tonno al naturale', tags: ['pesce'] }, { t: 'gamberi', tags: ['pesce'] },
    { t: 'lenticchie lessate', tags: ['legumi'] }, { t: 'ceci lessati', tags: ['legumi'] }, { t: 'fagioli lessati', tags: ['legumi'] },
    { t: 'tofu', tags: ['legumi'] }, { t: 'tempeh', tags: ['legumi'] }, { t: 'seitan', tags: [] },
    { t: 'uova', one: 'uovo', tags: ['uova'], c: true }, { t: 'albumi', tags: ['uova'] }, { t: 'mozzarella', tags: ['latticini'] }, { t: 'ricotta', tags: ['latticini'] }, { t: 'fiocchi di latte', tags: ['latticini'] }
  ] },
  { id: 'affettato', by: 'protein', max: 120, meals: ['colazione', 'spuntino_mattina', 'spuntino_pomeriggio', 'post_workout'], items: [
    { t: 'bresaola', tags: ['carne'] }, { t: 'prosciutto crudo', tags: ['carne'] }, { t: 'prosciutto cotto', tags: ['carne'] }, { t: 'grana', tags: ['latticini'] },
    { t: 'tonno al naturale', tags: ['pesce'] }, { t: 'hummus', tags: ['legumi'] }, { t: 'edamame', tags: ['legumi'] }, { t: 'uova', one: 'uovo', tags: ['uova'], c: true }
  ] },
  { id: 'carboidrati', by: 'kcal', max: 450, items: [
    { t: 'pasta', tags: [] }, { t: 'pasta integrale', tags: [] }, { t: 'riso basmati', tags: [] }, { t: 'riso integrale', tags: [] }, { t: 'farro', tags: [] },
    { t: 'quinoa', tags: [] }, { t: 'cous cous', tags: [] }, { t: 'orzo', tags: [] }, { t: 'patate', tags: [] }, { t: 'patate dolci', tags: [] },
    { t: 'pane integrale', tags: [] }, { t: 'pane', tags: [] }
  ] },
  { id: 'colazione', by: 'protein', max: 300, items: [
    { t: 'yogurt greco 0', tags: ['latticini'] }, { t: 'skyr', tags: ['latticini'] }, { t: 'yogurt magro', tags: ['latticini'] }, { t: 'latte parzialmente scremato', tags: ['latticini'] },
    { t: 'yogurt di soia', tags: [] }, { t: 'latte di soia', tags: [] }, { t: 'fiocchi di latte', tags: ['latticini'] }
  ] },
  { id: 'cereali', by: 'kcal', max: 120, items: [
    { t: 'fiocchi d avena', tags: [] }, { t: 'muesli', tags: [] }, { t: 'corn flakes', tags: [] }, { t: 'pane integrale', tags: [] },
    { t: 'gallette di riso', tags: [], c: true }, { t: 'fette biscottate', tags: [], c: true }
  ] },
  { id: 'frutta', by: 'kcal', max: 300, items: [
    { t: 'mela', many: 'mele', tags: [], c: true }, { t: 'banana', many: 'banane', tags: [], c: true }, { t: 'pera', many: 'pere', tags: [], c: true }, { t: 'kiwi', tags: [], c: true }, { t: 'arancia', many: 'arance', tags: [], c: true },
    { t: 'frutti di bosco', tags: [] }, { t: 'fragole', tags: [] }, { t: 'ananas', tags: [] }, { t: 'uva', tags: [] }
  ] },
  { id: 'grassi', by: 'kcal', max: 40, items: [
    { t: 'mandorle', tags: ['fruttasecca'] }, { t: 'noci', tags: ['fruttasecca'] }, { t: 'nocciole', tags: ['fruttasecca'] }, { t: 'anacardi', tags: ['fruttasecca'] },
    { t: 'burro di arachidi', tags: ['fruttasecca'] }, { t: 'semi di zucca', tags: [] }, { t: 'cioccolato fondente', tags: [] }
  ] },
  { id: 'proteine', by: 'protein', max: 250, items: [
    { t: 'whey', tags: ['latticini'] }, { t: 'proteine vegetali', tags: [] }, { t: 'yogurt greco 0', tags: ['latticini'] }, { t: 'skyr', tags: ['latticini'] }, { t: 'yogurt di soia', tags: [] }
  ] },
  { id: 'verdure', by: 'none', items: [
    { t: 'verdure grigliate', tags: [] }, { t: 'insalata', tags: [] }, { t: 'verdura cotta', tags: [] }, { t: 'verdure al vapore', tags: [] }, { t: 'zucchine', tags: [] },
    { t: 'pomodori', tags: [] }, { t: 'broccoli', tags: [] }, { t: 'spinaci', tags: [] }, { t: 'carote', tags: [] }, { t: 'finocchi', tags: [] }, { t: 'fagiolini', tags: [] }
  ] },
  { id: 'dolce', by: 'kcal', max: 30, items: [
    { t: 'miele', tags: [] }, { t: 'marmellata', tags: [] }
  ] }
];
