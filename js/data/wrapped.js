// Riepilogo dell'anno (stile "wrapped"): paragoni divertenti, sport e tipi di atleta. Solo dati e testi;
// i conti sono in app.js, sezione IL TUO ANNO. Le stime per gli sport (salti, km, colpi…) sono medie
// indicative per un'ora di allenamento o partita amatoriale: servono a divertirsi, non a misurare.

const wfmt = (n) => Math.round(n).toLocaleString(i18nIntl());
const wtimes = (x) => (x >= 1.5 ? wfmt(x) + ' volte' : '');

// Distanze per i paragoni (dalla più lunga): "come Milano–Roma 3 volte"
const WRAPPED_DISTANCES = [
  { km: 1300, label: 'l\'Italia da Aosta a Reggio Calabria' },
  { km: 575, label: 'Milano–Roma' },
  { km: 42.195, label: 'una maratona' },
  { km: 21.1, label: 'una mezza maratona' },
  { km: 10, label: 'una 10 km' },
  { km: 0.4, label: 'un giro di pista' }
];
const wDistance = (km) => {
  const d = WRAPPED_DISTANCES.find(item => km >= item.km) || WRAPPED_DISTANCES[WRAPPED_DISTANCES.length - 1];
  const t = wtimes(km / d.km);
  return 'come ' + d.label + (t ? ' ' + t : '');
};

// Calorie per ora: MET (dispendio rispetto al riposo) × peso in kg
const WRAPPED_METS = {
  gym: 5, 'Calcio': 7, 'Pallavolo': 4.5, 'Basket': 6.5, 'Lotta': 6, 'Tennis': 7, 'Padel': 6, 'Nuoto': 7,
  'Corsa': 9.8, 'Ciclismo': 7.5, 'Boxe': 9, 'Rugby': 8.3, 'Arti marziali': 7, 'Altro': 5
};

// Uno sport in numeri: h = ore dell'anno. big + caption vanno anche nel video (brevi), fun solo nell'app.
const WRAPPED_SPORT_FUN = {
  'Calcio': (h) => {
    const km = h * 6;
    return { emoji: '⚽', big: wfmt(km) + ' km', caption: 'corsi sul campo', fun: 'Circa ' + wfmt(km) + ' km, ' + wDistance(km) + '. Sono come ' + wfmt(h / 1.5) + ' partite da 90 minuti: un titolare di Serie A ne gioca una quarantina a stagione.' };
  },
  'Pallavolo': (h) => {
    const jumps = h * 40;
    const meters = jumps * 0.5;
    const pisa = meters / 56;
    return { emoji: '🏐', big: wfmt(jumps), caption: 'salti', fun: 'Mezzo metro a salto fanno ' + wfmt(meters) + ' metri in verticale: ' + (pisa >= 1 ? 'come salire in cima alla Torre di Pisa ' + (pisa >= 1.5 ? wfmt(pisa) + ' volte' : 'una volta') : 'quasi in cima alla Torre di Pisa') + '. Un canguro ti guarda con rispetto.' };
  },
  'Basket': (h) => {
    const jumps = h * 30;
    return { emoji: '🏀', big: wfmt(jumps), caption: 'stacchi da terra', fun: 'Sono circa ' + wfmt(h * 60 / 48) + ' partite da 48 minuti. Il ferro del canestro ormai ti saluta per nome.' };
  },
  'Tennis': (h) => {
    const shots = h * 60 * 8;
    return { emoji: '🎾', big: wfmt(shots), caption: 'colpi di racchetta', fun: 'Come giocare ' + wfmt(h * 60 / 45) + ' set di fila. Le palline consumate non le contiamo.' };
  },
  'Padel': (h) => {
    const shots = h * 60 * 10;
    return { emoji: '🎾', big: wfmt(shots), caption: 'colpi in campo', fun: 'Sono ' + wfmt(h / 1.5) + ' partite da un\'ora e mezza. La pala ormai è un prolungamento del tuo braccio.' };
  },
  'Nuoto': (h) => {
    const km = h * 2.5;
    const strait = km / 3.3;
    return { emoji: '🏊', big: wfmt(km * 20), caption: 'vasche da 50 metri', fun: 'Circa ' + wfmt(km) + ' km a nuoto: ' + (strait >= 1 ? 'come attraversare lo Stretto di Messina ' + (strait >= 1.5 ? wfmt(strait) + ' volte' : 'una volta') : 'quasi uno Stretto di Messina intero') + '. I delfini prendono appunti.' };
  },
  'Corsa': (h) => {
    const km = h * 10;
    return { emoji: '🏃', big: wfmt(km) + ' km', caption: 'di corsa', fun: 'Hai corso circa ' + wfmt(km) + ' km, ' + wDistance(km) + '. Le tue scarpe meritano una medaglia.' };
  },
  'Ciclismo': (h) => {
    const km = h * 25;
    return { emoji: '🚴', big: wfmt(km) + ' km', caption: 'in sella', fun: 'Circa ' + wfmt(km) + ' km pedalati, ' + wDistance(km) + '. La salita ha più paura di te.' };
  },
  'Boxe': (h) => {
    const rounds = h * 20;
    return { emoji: '🥊', big: wfmt(rounds), caption: 'round da 3 minuti', fun: 'Sono ' + wfmt(rounds / 12) + ' incontri da 12 round e circa ' + wfmt(h * 60 * 40) + ' pugni tirati. Il sacco chiede una tregua.' };
  },
  'Lotta': (h) => {
    return { emoji: '🤼', big: wfmt(h * 10), caption: 'incontri da 6 minuti', fun: 'Ore e ore sul tappeto: la tua presa ormai è leggenda in palestra.' };
  },
  'Rugby': (h) => {
    return { emoji: '🏉', big: wfmt(h * 60 / 80), caption: 'partite da 80 minuti', fun: 'Placcaggi, mischie e corse palla in mano. In terza linea ti vogliono tutti.' };
  },
  'Arti marziali': (h) => {
    return { emoji: '🥋', big: wfmt(h * 60 * 30), caption: 'tecniche eseguite', fun: 'Calci, pugni e proiezioni: ' + wfmt(h) + ' ore sul tatami. Il maestro annuisce in silenzio.' };
  }
};

// Ore di allenamento di un professionista in una stagione (indicative)
const WRAPPED_PRO_HOURS = 400;
const wProLine = (pct) => (pct >= 100 ? 'Sei a livello pro. Il procuratore ti chiamerà presto.'
  : pct >= 50 ? 'Più di metà strada: manca solo il contratto.'
  : pct >= 20 ? 'Niente male per chi ha anche una vita fuori dal campo.'
  : 'Ogni campione ha iniziato da qui.');

// Pesi per i paragoni del volume sollevato (kg)
const WRAPPED_WEIGHTS = [
  { kg: 6000, one: 'elefante', many: 'elefanti', emoji: '🐘' },
  { kg: 1300, one: 'automobile', many: 'automobili', emoji: '🚗' },
  { kg: 300, one: 'pianoforte', many: 'pianoforti', emoji: '🎹' },
  { kg: 30, one: 'cucciolo di foca', many: 'cuccioli di foca', emoji: '🦭' }
];

// Che atleta sei: il primo che corrisponde vince
const WRAPPED_TYPES = [
  { id: 'unstoppable', emoji: '🔥', name: 'L\'Inarrestabile', text: 'Una serie di giorni di fila che fa paura. Tu non salti, tu continui.' },
  { id: 'machine', emoji: '🏭', name: 'Lo Stakanovista', text: 'Quattro o più allenamenti a settimana. La palestra ha le tue chiavi.' },
  { id: 'early', emoji: '🌅', name: 'Il Mattiniero', text: 'Ti alleni quando gli altri dormono. Il caffè lo bevi dopo.' },
  { id: 'night', emoji: '🌙', name: 'Il Nottambulo', text: 'Le luci della palestra la sera sono tue. Il buio non ti ferma.' },
  { id: 'weekend', emoji: '⚔️', name: 'Il Guerriero del weekend', text: 'Sabato e domenica sono i tuoi giorni di battaglia.' },
  { id: 'sport', emoji: '🏆', name: 'Lo Sportivo vero', text: 'Il campo è casa tua: per te l\'allenamento è un mezzo, la partita il fine.' },
  { id: 'steady', emoji: '🐢', name: 'Il Costante', text: 'Piano piano si va lontano. E tu, intanto, sei andato.' }
];

const WRAPPED_MONTHS = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
const WRAPPED_DAYS = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];

// Sfondi delle slide (gradienti del brand e dintorni)
const WRAPPED_BACKGROUNDS = [
  'linear-gradient(160deg, #7A4DF1 0%, #20C997 100%)',
  'linear-gradient(160deg, #F5A623 0%, #EC4899 100%)',
  'linear-gradient(160deg, #0E0E11 0%, #7A4DF1 100%)',
  'linear-gradient(160deg, #20C997 0%, #0EA5E9 100%)',
  'linear-gradient(160deg, #EC4899 0%, #7A4DF1 100%)',
  'linear-gradient(160deg, #1D1D1D 0%, #F5A623 100%)',
  'linear-gradient(160deg, #0EA5E9 0%, #7A4DF1 100%)',
  'linear-gradient(160deg, #10B981 0%, #F5A623 100%)'
];
