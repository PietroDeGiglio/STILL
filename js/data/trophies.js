// Trofei e livelli: solo dati (la logica che li calcola è in app.js, sezione GAMIFICATION).
// Ogni gruppo ha dei gradini: raggiunto il numero, si sblocca il trofeo di quel livello.
const TROPHY_TIERS = [
  { name: 'Bronzo', color: '#CD7F32' },
  { name: 'Argento', color: '#A8B2BD' },
  { name: 'Oro', color: '#F5A623' },
  { name: 'Platino', color: '#20C997' },
  { name: 'Diamante', color: '#38BDF8' },
  { name: 'Leggenda', color: '#8B5CF6' },
  { name: 'Mito', color: '#EC4899' }
];

const TROPHY_GROUPS = [
  { id: 'workouts', icon: '💪', name: 'Allenamenti', unit: 'allenamenti', one: 'allenamento', steps: [1, 10, 25, 50, 100, 250, 500],
    hint: 'Palestra e sport segnati come fatti' },
  { id: 'hours', icon: '⏱️', name: 'Ore di allenamento', unit: 'ore', one: 'ora', steps: [1, 10, 25, 50, 100, 250, 500],
    hint: 'Il tempo passato ad allenarti' },
  { id: 'streak', icon: '🔥', name: 'Serie', unit: 'giorni di fila', one: 'giorno di fila', steps: [3, 7, 14, 30, 60, 100, 365],
    hint: 'La tua serie migliore di giorni attivi' },
  { id: 'active', icon: '📅', name: 'Giorni attivi', unit: 'giorni attivi', one: 'giorno attivo', steps: [7, 30, 60, 100, 200, 365, 730],
    hint: 'Giorni con almeno un pasto o un allenamento' },
  { id: 'meals', icon: '🥗', name: 'Pasti nel piano', unit: 'pasti', one: 'pasto', steps: [10, 50, 100, 250, 500, 1000, 2000],
    hint: 'Pasti segnati come fatti' },
  { id: 'records', icon: '🏋️', name: 'Record personali', unit: 'record', one: 'record', steps: [1, 5, 10, 25, 50, 100, 200],
    hint: 'Volte in cui hai superato il tuo carico migliore' },
  { id: 'weeks', icon: '🏅', name: 'Settimane piene', unit: 'settimane piene', one: 'settimana piena', steps: [1, 4, 12, 26, 52, 104, 156],
    hint: 'Settimane (lun–dom) con almeno 3 allenamenti' },
  { id: 'shares', icon: '📣', name: 'Storie condivise', unit: 'condivisioni', one: 'condivisione', steps: [1, 5, 10, 25, 50, 100, 200],
    hint: 'Card e video condivisi o salvati' }
];

// Punti esperienza (XP): ogni cosa fatta vale punti, i punti fanno salire di livello
const XP_RULES = { workout: 50, hour: 10, activeDay: 10, meal: 5, record: 30, share: 25, trophy: 100 };
// Titolo in base al livello (ogni 5 livelli)
const LEVEL_TITLES = ['Principiante', 'In cammino', 'Costante', 'Determinato', 'Atleta', 'Guerriero', 'Campione', 'Leggenda'];
