// Libreria esercizi di STILL: solo dati (la logica è in app.js, sezione GUIDA ESERCIZI).
// Serve a chi si allena senza personal trainer: esercizi consigliati per muscolo, in palestra o a casa,
// programmi pronti e esercizi mirati per chi fa uno sport. Tutto si può aggiungere alle proprie schede.
//
// Esercizio: id · n = nome · m = gruppo muscolare · w = dove ('gym' palestra, 'home' casa/corpo libero)
//   forza:  s = serie · r = ripetizioni · rec = recupero (secondi)
//   cardio: t: 'cardio' · d = durata (minuti) · i = intensità
//   tip = consiglio di esecuzione (breve)
// Valori pensati per chi inizia o ha un livello intermedio: non sostituiscono un professionista.

const MUSCLE_GROUPS = [
  { id: 'petto', name: 'Petto', icon: '🫁' },
  { id: 'schiena', name: 'Schiena', icon: '🦅' },
  { id: 'spalle', name: 'Spalle', icon: '🏋️' },
  { id: 'braccia', name: 'Braccia', icon: '💪' },
  { id: 'gambe', name: 'Gambe', icon: '🦵' },
  { id: 'glutei', name: 'Glutei', icon: '🍑' },
  { id: 'addome', name: 'Addome', icon: '🧱' },
  { id: 'cardio', name: 'Cardio', icon: '❤️' },
  { id: 'atletici', name: 'Atletici', icon: '⚡' },
  { id: 'mobilita', name: 'Mobilità', icon: '🧘' }
];

const EXERCISE_LIBRARY = [
  // --- Petto ---
  { id: 'panca-piana', n: 'Panca piana con bilanciere', m: 'petto', w: 'gym', s: 4, r: '8-10', rec: 90, tip: 'Scapole strette e piedi a terra; il bilanciere scende a metà petto.' },
  { id: 'panca-inclinata-manubri', n: 'Panca inclinata con manubri', m: 'petto', w: 'gym', s: 3, r: '10', rec: 90, tip: 'Panca a 30°: lavora la parte alta del petto.' },
  { id: 'chest-press', n: 'Chest press', m: 'petto', w: 'gym', s: 3, r: '10-12', rec: 75, tip: 'Ottima per iniziare: la macchina guida il movimento.' },
  { id: 'croci-cavi', n: 'Croci ai cavi', m: 'petto', w: 'gym', s: 3, r: '12-15', rec: 60, tip: 'Gomiti leggermente piegati, chiudi le mani davanti al petto.' },
  { id: 'dip-parallele', n: 'Dip alle parallele', m: 'petto', w: 'gym', s: 3, r: '8-12', rec: 90, tip: 'Busto inclinato in avanti per spostare il lavoro sul petto.' },
  { id: 'push-up', n: 'Piegamenti (push-up)', m: 'petto', w: 'home', s: 4, r: '10-15', rec: 60, tip: 'Corpo in linea dalla testa ai talloni, petto quasi a terra.' },
  { id: 'push-up-ginocchia', n: 'Piegamenti sulle ginocchia', m: 'petto', w: 'home', s: 3, r: '10-15', rec: 45, tip: 'La versione per iniziare: quando ne fai 15 facili, passa ai piegamenti normali.' },
  { id: 'push-up-larghi', n: 'Piegamenti a presa larga', m: 'petto', w: 'home', s: 3, r: '10-15', rec: 60, tip: 'Mani più larghe delle spalle: più petto, meno tricipiti.' },
  { id: 'push-up-declinati', n: 'Piegamenti declinati (piedi rialzati)', m: 'petto', w: 'home', s: 3, r: '8-12', rec: 60, tip: 'Piedi su sedia o divano: lavora la parte alta del petto.' },
  { id: 'dip-sedie', n: 'Dip tra due sedie', m: 'petto', w: 'home', s: 3, r: '8-12', rec: 60, tip: 'Sedie stabili e contro il muro. Scendi finché i gomiti fanno 90°.' },

  // --- Schiena ---
  { id: 'lat-machine', n: 'Lat machine', m: 'schiena', w: 'gym', s: 4, r: '10', rec: 75, tip: 'Tira la barra al petto portando i gomiti verso i fianchi.' },
  { id: 'rematore-bilanciere', n: 'Rematore con bilanciere', m: 'schiena', w: 'gym', s: 4, r: '8-10', rec: 90, tip: 'Schiena dritta, busto inclinato; tira verso l\'ombelico.' },
  { id: 'pulley', n: 'Pulley basso', m: 'schiena', w: 'gym', s: 3, r: '10-12', rec: 75, tip: 'Petto alto, stringi le scapole alla fine di ogni ripetizione.' },
  { id: 'rematore-manubrio', n: 'Rematore con manubrio a un braccio', m: 'schiena', w: 'gym', s: 3, r: '10 per lato', rec: 60, tip: 'Ginocchio e mano sulla panca, tira il manubrio verso il fianco.' },
  { id: 'trazioni', n: 'Trazioni alla sbarra', m: 'schiena', w: 'gym', s: 3, r: 'max', rec: 90, tip: 'Se non riesci ancora, usa l\'elastico o la macchina assistita.' },
  { id: 'stacco', n: 'Stacco da terra', m: 'schiena', w: 'gym', s: 4, r: '5-6', rec: 120, tip: 'Esercizio tecnico: impara con pesi leggeri, schiena sempre neutra.' },
  { id: 'rematore-zaino', n: 'Rematore con zaino', m: 'schiena', w: 'home', s: 4, r: '12', rec: 60, tip: 'Riempi lo zaino di libri o bottiglie e tiralo verso l\'ombelico.' },
  { id: 'rematore-inverso', n: 'Rematore inverso sotto il tavolo', m: 'schiena', w: 'home', s: 3, r: '8-12', rec: 60, tip: 'Sdraiato sotto un tavolo robusto, tira il petto verso il bordo.' },
  { id: 'superman', n: 'Superman', m: 'schiena', w: 'home', s: 3, r: '12-15', rec: 45, tip: 'A pancia in giù, solleva braccia e gambe e tieni 2 secondi.' },
  { id: 'ytw', n: 'Y-T-W a terra', m: 'schiena', w: 'home', s: 3, r: '8 per lettera', rec: 45, tip: 'A pancia in giù, disegna con le braccia le lettere Y, T e W.' },
  { id: 'trazioni-casa', n: 'Trazioni alla sbarra da porta', m: 'schiena', w: 'home', s: 3, r: 'max', rec: 90, tip: 'Se non ne fai ancora una, parti dalla discesa lenta (5 secondi).' },

  // --- Spalle ---
  { id: 'military-press', n: 'Military press', m: 'spalle', w: 'gym', s: 4, r: '8', rec: 90, tip: 'In piedi, glutei e addome contratti; spingi il bilanciere sopra la testa.' },
  { id: 'arnold-press', n: 'Arnold press', m: 'spalle', w: 'gym', s: 3, r: '10', rec: 75, tip: 'Ruota i palmi mentre spingi i manubri verso l\'alto.' },
  { id: 'alzate-laterali', n: 'Alzate laterali con manubri', m: 'spalle', w: 'gym', s: 3, r: '12-15', rec: 60, tip: 'Peso leggero, sali fino all\'altezza delle spalle senza slanci.' },
  { id: 'alzate-posteriori', n: 'Alzate posteriori', m: 'spalle', w: 'gym', s: 3, r: '12-15', rec: 60, tip: 'Busto inclinato in avanti: lavora la parte dietro della spalla.' },
  { id: 'face-pull', n: 'Face pull ai cavi', m: 'spalle', w: 'gym', s: 3, r: '15', rec: 60, tip: 'Tira la corda verso la fronte aprendo i gomiti: ottimo per la postura.' },
  { id: 'pike-push-up', n: 'Pike push-up', m: 'spalle', w: 'home', s: 3, r: '8-12', rec: 60, tip: 'Bacino alto a V rovesciata, la testa scende tra le mani.' },
  { id: 'alzate-bottiglie', n: 'Alzate laterali con bottiglie', m: 'spalle', w: 'home', s: 3, r: '15-20', rec: 45, tip: 'Due bottiglie d\'acqua da 1,5 L vanno benissimo.' },
  { id: 'plank-tocco-spalle', n: 'Plank con tocco delle spalle', m: 'spalle', w: 'home', s: 3, r: '20', rec: 45, tip: 'In posizione di piegamento, tocca la spalla opposta senza ruotare il bacino.' },
  { id: 'verticale-muro', n: 'Verticale al muro (tenuta)', m: 'spalle', w: 'home', s: 3, r: '20-30 s', rec: 60, tip: 'Pancia verso il muro, braccia tese: tieni la posizione.' },

  // --- Braccia ---
  { id: 'curl-bilanciere', n: 'Curl con bilanciere', m: 'braccia', w: 'gym', s: 3, r: '10', rec: 60, tip: 'Gomiti fermi lungo i fianchi, niente slanci con la schiena.' },
  { id: 'curl-martello', n: 'Curl a martello', m: 'braccia', w: 'gym', s: 3, r: '12', rec: 60, tip: 'Palmi uno di fronte all\'altro: bicipiti e avambracci.' },
  { id: 'curl-cavi', n: 'Curl ai cavi', m: 'braccia', w: 'gym', s: 3, r: '12-15', rec: 45, tip: 'Tensione costante: scendi lento.' },
  { id: 'pushdown', n: 'Pushdown ai cavi', m: 'braccia', w: 'gym', s: 3, r: '12', rec: 60, tip: 'Gomiti attaccati ai fianchi, distendi completamente le braccia.' },
  { id: 'french-press', n: 'French press', m: 'braccia', w: 'gym', s: 3, r: '10', rec: 60, tip: 'Sdraiato, porta il bilanciere verso la fronte piegando solo i gomiti.' },
  { id: 'diamond-push-up', n: 'Piegamenti a diamante', m: 'braccia', w: 'home', s: 3, r: '8-12', rec: 60, tip: 'Mani vicine a formare un rombo: lavorano i tricipiti.' },
  { id: 'dip-sedia', n: 'Dip su una sedia', m: 'braccia', w: 'home', s: 3, r: '10-15', rec: 60, tip: 'Mani sul bordo della sedia dietro di te, scendi piegando i gomiti.' },
  { id: 'curl-zaino', n: 'Curl con zaino o borsa', m: 'braccia', w: 'home', s: 3, r: '12-15', rec: 45, tip: 'Tieni lo zaino per le maniglie e piega i gomiti.' },
  { id: 'curl-elastico', n: 'Curl con elastico', m: 'braccia', w: 'home', s: 3, r: '15', rec: 45, tip: 'Elastico sotto i piedi: più lo accorci, più è duro.' },

  // --- Gambe ---
  { id: 'squat', n: 'Squat con bilanciere', m: 'gambe', w: 'gym', s: 4, r: '6-8', rec: 120, tip: 'Petto alto, ginocchia nella direzione delle punte, scendi almeno a 90°.' },
  { id: 'leg-press', n: 'Leg press', m: 'gambe', w: 'gym', s: 4, r: '10-12', rec: 90, tip: 'Non staccare la schiena dallo schienale e non bloccare le ginocchia.' },
  { id: 'affondi-manubri', n: 'Affondi camminati con manubri', m: 'gambe', w: 'gym', s: 3, r: '10 per gamba', rec: 75, tip: 'Passo lungo, il ginocchio dietro sfiora il pavimento.' },
  { id: 'leg-extension', n: 'Leg extension', m: 'gambe', w: 'gym', s: 3, r: '12-15', rec: 60, tip: 'Sali controllato e tieni un secondo in alto.' },
  { id: 'leg-curl', n: 'Leg curl', m: 'gambe', w: 'gym', s: 3, r: '12', rec: 60, tip: 'Per i femorali: scendi lento, non lasciar cadere il peso.' },
  { id: 'calf-macchina', n: 'Calf raise in piedi', m: 'gambe', w: 'gym', s: 4, r: '15', rec: 45, tip: 'Sali sulle punte e scendi oltre il gradino per allungare.' },
  { id: 'squat-libero', n: 'Squat a corpo libero', m: 'gambe', w: 'home', s: 4, r: '15-20', rec: 60, tip: 'Come sederti su una sedia che non c\'è: peso sui talloni.' },
  { id: 'affondi', n: 'Affondi alternati', m: 'gambe', w: 'home', s: 3, r: '12 per gamba', rec: 60, tip: 'Busto dritto, entrambe le ginocchia a 90°.' },
  { id: 'bulgaro', n: 'Squat bulgaro (piede sulla sedia)', m: 'gambe', w: 'home', s: 3, r: '10 per gamba', rec: 75, tip: 'Piede dietro su una sedia: uno dei migliori esercizi a casa.' },
  { id: 'wall-sit', n: 'Sedia al muro (wall sit)', m: 'gambe', w: 'home', s: 3, r: '30-45 s', rec: 60, tip: 'Schiena al muro, cosce parallele al pavimento: tieni.' },
  { id: 'calf-gradino', n: 'Calf raise sul gradino', m: 'gambe', w: 'home', s: 4, r: '20', rec: 45, tip: 'Su un gradino, una mano al muro per l\'equilibrio.' },
  { id: 'squat-pistol-assistito', n: 'Squat su una gamba assistito', m: 'gambe', w: 'home', s: 3, r: '6-8 per gamba', rec: 75, tip: 'Tieniti a una porta e scendi su una gamba sola.' },

  // --- Glutei ---
  { id: 'hip-thrust', n: 'Hip thrust con bilanciere', m: 'glutei', w: 'gym', s: 4, r: '10', rec: 90, tip: 'Schiena sulla panca, spingi il bacino in alto e stringi i glutei.' },
  { id: 'stacco-rumeno', n: 'Stacco rumeno', m: 'glutei', w: 'gym', s: 3, r: '8-10', rec: 90, tip: 'Ginocchia appena piegate, spingi il sedere indietro: senti i femorali.' },
  { id: 'abductor', n: 'Abductor machine', m: 'glutei', w: 'gym', s: 3, r: '15', rec: 45, tip: 'Apri le gambe controllando anche il ritorno.' },
  { id: 'kickback-cavi', n: 'Slanci dietro ai cavi', m: 'glutei', w: 'gym', s: 3, r: '12 per lato', rec: 45, tip: 'Busto fermo, spingi la gamba indietro con il gluteo.' },
  { id: 'ponte-glutei', n: 'Ponte glutei', m: 'glutei', w: 'home', s: 4, r: '15', rec: 45, tip: 'A terra, piedi vicini al sedere: sali e tieni 2 secondi.' },
  { id: 'ponte-una-gamba', n: 'Ponte glutei a una gamba', m: 'glutei', w: 'home', s: 3, r: '10 per lato', rec: 45, tip: 'Come il ponte, ma con una gamba tesa in aria.' },
  { id: 'donkey-kick', n: 'Slanci a quattro zampe', m: 'glutei', w: 'home', s: 3, r: '15 per lato', rec: 45, tip: 'Ginocchio piegato a 90°, spingi il tallone verso il soffitto.' },
  { id: 'clamshell', n: 'Conchiglia (clamshell)', m: 'glutei', w: 'home', s: 3, r: '15 per lato', rec: 30, tip: 'Sul fianco, ginocchia piegate: apri il ginocchio di sopra. Con l\'elastico è più duro.' },

  // --- Addome ---
  { id: 'plank', n: 'Plank', m: 'addome', w: 'home', s: 3, r: '30-60 s', rec: 45, tip: 'Gomiti sotto le spalle, pancia in dentro, bacino né alto né basso.' },
  { id: 'plank-laterale', n: 'Plank laterale', m: 'addome', w: 'home', s: 3, r: '20-30 s per lato', rec: 45, tip: 'Corpo dritto sul fianco, bacino in alto.' },
  { id: 'crunch', n: 'Crunch', m: 'addome', w: 'home', s: 3, r: '15-20', rec: 45, tip: 'Solleva solo le spalle, senza tirare il collo con le mani.' },
  { id: 'russian-twist', n: 'Russian twist', m: 'addome', w: 'home', s: 3, r: '20', rec: 45, tip: 'Busto inclinato indietro, ruota da un lato all\'altro.' },
  { id: 'leg-raise', n: 'Sollevamento gambe a terra', m: 'addome', w: 'home', s: 3, r: '12', rec: 45, tip: 'Schiena incollata al pavimento, scendi lento.' },
  { id: 'mountain-climber', n: 'Mountain climber', m: 'addome', w: 'home', s: 3, r: '30 s', rec: 45, tip: 'In posizione di piegamento, porta le ginocchia al petto alternandole veloce.' },
  { id: 'dead-bug', n: 'Dead bug', m: 'addome', w: 'home', s: 3, r: '10 per lato', rec: 45, tip: 'Sulla schiena, allunga braccio e gamba opposti senza inarcare.' },
  { id: 'crunch-cavi', n: 'Crunch ai cavi', m: 'addome', w: 'gym', s: 3, r: '12-15', rec: 45, tip: 'In ginocchio, arrotola il busto verso il basso.' },
  { id: 'hanging-leg-raise', n: 'Sollevamento gambe alla sbarra', m: 'addome', w: 'gym', s: 3, r: '10', rec: 60, tip: 'Appeso alla sbarra, porta le ginocchia al petto senza dondolare.' },
  { id: 'ab-wheel', n: 'Ruota per addominali', m: 'addome', w: 'gym', s: 3, r: '8-12', rec: 60, tip: 'Parti dalle ginocchia; vai avanti solo finché la schiena resta dritta.' },

  // --- Cardio ---
  { id: 'tapis', n: 'Tapis roulant', m: 'cardio', w: 'gym', t: 'cardio', d: 20, i: 'Moderata, 9-10 km/h', tip: 'Ritmo a cui riesci ancora a parlare.' },
  { id: 'cyclette', n: 'Cyclette', m: 'cardio', w: 'gym', t: 'cardio', d: 25, i: 'Moderata', tip: 'Ottima se hai fastidi alle ginocchia o alla schiena.' },
  { id: 'ellittica', n: 'Ellittica', m: 'cardio', w: 'gym', t: 'cardio', d: 20, i: 'Moderata', tip: 'Muove anche le braccia: brucia molto senza impatto.' },
  { id: 'vogatore', n: 'Vogatore', m: 'cardio', w: 'gym', t: 'cardio', d: 15, i: '24-28 colpi al minuto', tip: 'La spinta parte dalle gambe, poi tiri con le braccia.' },
  { id: 'hiit-bici', n: 'HIIT in bici', m: 'cardio', w: 'gym', t: 'cardio', d: 15, i: '30 s forte / 30 s piano', tip: 'Breve ma intenso: fallo a fine allenamento, non tutti i giorni.' },
  { id: 'corsa', n: 'Corsa all\'aperto', m: 'cardio', w: 'home', t: 'cardio', d: 25, i: 'Ritmo comodo', tip: 'Se inizi, alterna 2 minuti di corsa e 1 di camminata.' },
  { id: 'camminata-veloce', n: 'Camminata veloce', m: 'cardio', w: 'home', t: 'cardio', d: 40, i: '6 km/h', tip: 'Il cardio più sottovalutato: facile da fare ogni giorno.' },
  { id: 'corda', n: 'Salto della corda', m: 'cardio', w: 'home', t: 'cardio', d: 10, i: '1 min salto / 30 s pausa', tip: 'Salti piccoli sulle punte, polsi che girano la corda.' },
  { id: 'jumping-jack', n: 'Jumping jack', m: 'cardio', w: 'home', s: 3, r: '45 s', rec: 30, tip: 'Apri e chiudi braccia e gambe saltando: perfetto per scaldarsi.' },
  { id: 'burpees', n: 'Burpees', m: 'cardio', w: 'home', s: 4, r: '10', rec: 60, tip: 'Giù a terra, piegamento, su con un salto: il re del cardio a casa.' },

  // --- Atletici e prevenzione (usati soprattutto negli sport) ---
  { id: 'squat-jump', n: 'Squat jump', m: 'atletici', w: 'home', s: 4, r: '8', rec: 75, tip: 'Scendi in squat ed esplodi verso l\'alto; atterra morbido.' },
  { id: 'box-jump', n: 'Salti sul box', m: 'atletici', w: 'gym', s: 4, r: '6', rec: 90, tip: 'Salta sul box e scendi camminando: conta l\'esplosività, non la fatica.' },
  { id: 'salti-laterali', n: 'Salti laterali', m: 'atletici', w: 'home', s: 3, r: '20', rec: 60, tip: 'Salta a destra e sinistra di una linea, veloce e leggero.' },
  { id: 'skip-alto', n: 'Skip alto', m: 'atletici', w: 'home', s: 4, r: '20 s', rec: 45, tip: 'Ginocchia alte e braccia che accompagnano, sul posto o in avanti.' },
  { id: 'scatti', n: 'Scatti brevi', m: 'atletici', w: 'home', s: 6, r: '20 m', rec: 60, tip: 'Partenza esplosiva, recupero completo camminando.' },
  { id: 'navette', n: 'Navette (cambi di direzione)', m: 'atletici', w: 'home', s: 5, r: '5-10-5 m', rec: 60, tip: 'Scatta, tocca la linea, cambia direzione abbassando il baricentro.' },
  { id: 'nordic-curl', n: 'Nordic curl', m: 'atletici', w: 'home', s: 3, r: '5', rec: 90, tip: 'Caviglie bloccate, scendi in avanti il più lento possibile: protegge i femorali.' },
  { id: 'copenhagen', n: 'Copenhagen plank', m: 'atletici', w: 'home', s: 3, r: '15-20 s per lato', rec: 45, tip: 'Plank laterale con la gamba di sopra su una panca: protegge l\'inguine.' },
  { id: 'extrarotazioni', n: 'Extrarotazioni con elastico', m: 'atletici', w: 'home', s: 3, r: '15 per lato', rec: 30, tip: 'Gomito al fianco, ruota l\'avambraccio verso l\'esterno: spalle sane.' },
  { id: 'pallof-press', n: 'Pallof press con elastico', m: 'atletici', w: 'home', s: 3, r: '10 per lato', rec: 45, tip: 'Spingi l\'elastico davanti al petto senza farti ruotare: core anti-rotazione.' },
  { id: 'rotazioni-elastico', n: 'Rotazioni del busto con elastico', m: 'atletici', w: 'home', s: 3, r: '12 per lato', rec: 45, tip: 'Ruota partendo dai fianchi, come in un colpo di racchetta.' },
  { id: 'lanci-palla-medica', n: 'Lanci della palla medica al muro', m: 'atletici', w: 'gym', s: 4, r: '8', rec: 60, tip: 'Lancia forte con tutto il corpo, non solo con le braccia.' },
  { id: 'farmer-walk', n: 'Camminata del contadino', m: 'atletici', w: 'gym', s: 3, r: '30 m', rec: 60, tip: 'Due manubri pesanti, cammina dritto: presa e core d\'acciaio.' },
  { id: 'equilibrio-una-gamba', n: 'Equilibrio su una gamba', m: 'atletici', w: 'home', s: 3, r: '30 s per lato', rec: 30, tip: 'Occhi chiusi per renderlo più difficile: previene le distorsioni.' },
  { id: 'shadow-boxing', n: 'Shadow boxing', m: 'atletici', w: 'home', t: 'cardio', d: 9, i: '3 round da 3 min', tip: 'Combinazioni nell\'aria con guardia sempre alta.' },
  { id: 'polsi-avambracci', n: 'Rafforzamento dei polsi con bottiglia', m: 'atletici', w: 'home', s: 3, r: '15 per lato', rec: 30, tip: 'Avambraccio appoggiato, muovi solo il polso su e giù.' },
  { id: 'nuoto-dorsali', n: 'Bracciate con elastico', m: 'atletici', w: 'home', s: 3, r: '15', rec: 45, tip: 'Elastico fissato in alto, simula la bracciata spingendo fino alla coscia.' },

  // --- In palestra, pensati per chi fa sport ---
  { id: 'step-up-manubri', n: 'Step-up sul box con manubri', m: 'gambe', w: 'gym', s: 3, r: '8 per gamba', rec: 75, tip: 'Sali spingendo con la gamba sul box, senza aiutarti con quella a terra.' },
  { id: 'leg-press-una-gamba', n: 'Leg press a una gamba', m: 'gambe', w: 'gym', s: 3, r: '10 per gamba', rec: 75, tip: 'Metà del peso che usi a due gambe: corregge le differenze tra destra e sinistra.' },
  { id: 'calf-seduto', n: 'Calf raise seduto', m: 'gambe', w: 'gym', s: 3, r: '15', rec: 45, tip: 'Lavora il polpaccio profondo (soleo): utile a chi corre e salta.' },
  { id: 'adductor-machine', n: 'Adductor machine', m: 'gambe', w: 'gym', s: 3, r: '15', rec: 45, tip: 'Chiudi le gambe controllando anche il ritorno: interno coscia e inguine più forti.' },
  { id: 'girata-kettlebell', n: 'Kettlebell swing', m: 'glutei', w: 'gym', s: 4, r: '15', rec: 60, tip: 'Il movimento parte dalle anche, non dalle braccia: spingi il bacino in avanti.' },
  { id: 'woodchop-cavi', n: 'Taglialegna ai cavi', m: 'addome', w: 'gym', s: 3, r: '12 per lato', rec: 45, tip: 'In diagonale dall\'alto in basso, ruotando busto e anche insieme.' },
  { id: 'pallof-cavi', n: 'Pallof press ai cavi', m: 'addome', w: 'gym', s: 3, r: '10 per lato', rec: 45, tip: 'Di fianco al cavo, spingi le mani avanti e non farti ruotare.' },
  { id: 'extrarotazioni-cavi', n: 'Extrarotazioni ai cavi', m: 'spalle', w: 'gym', s: 3, r: '15 per lato', rec: 30, tip: 'Gomito incollato al fianco, ruota l\'avambraccio verso l\'esterno. Peso leggero.' },
  { id: 'spinta-slitta', n: 'Spinta della slitta', m: 'atletici', w: 'gym', s: 5, r: '15 m', rec: 90, tip: 'Busto inclinato, passi corti e potenti: accelerazione senza impatti.' },
  { id: 'curl-polsi', n: 'Curl per i polsi con manubrio', m: 'braccia', w: 'gym', s: 3, r: '15', rec: 30, tip: 'Avambraccio sulla panca, muovi solo il polso: previene i fastidi al gomito.' },
  { id: 'rematore-cavi-una-mano', n: 'Rematore ai cavi a un braccio', m: 'schiena', w: 'gym', s: 3, r: '12 per lato', rec: 60, tip: 'Tira verso il fianco ruotando appena il busto.' },
  { id: 'panca-presa-stretta', n: 'Panca presa stretta', m: 'braccia', w: 'gym', s: 3, r: '8-10', rec: 90, tip: 'Mani alla larghezza delle spalle, gomiti vicini al corpo: tricipiti e spinta.' },
  // --- Petto (altri esercizi) ---
  { id: 'panca-manubri', n: 'Panca piana con manubri', m: 'petto', w: 'gym', s: 4, r: '8-10', rec: 90, tip: 'Manubri sopra il petto, scendi lento fino a sentire l\'allungamento.' },
  { id: 'panca-inclinata-bilanciere', n: 'Panca inclinata con bilanciere', m: 'petto', w: 'gym', s: 4, r: '8', rec: 90, tip: 'Panca a 30°, bilanciere sotto le clavicole: lavora la parte alta del petto.' },
  { id: 'panca-declinata', n: 'Panca declinata', m: 'petto', w: 'gym', s: 3, r: '8-10', rec: 90, tip: 'Piedi bloccati, bilanciere verso la parte bassa del petto.' },
  { id: 'croci-manubri', n: 'Croci con manubri', m: 'petto', w: 'gym', s: 3, r: '12', rec: 60, tip: 'Braccia aperte con gomiti morbidi, come se abbracciassi un albero.' },
  { id: 'croci-inclinate', n: 'Croci su panca inclinata', m: 'petto', w: 'gym', s: 3, r: '12', rec: 60, tip: 'Come le croci, ma con la panca a 30° per la parte alta del petto.' },
  { id: 'pectoral-machine', n: 'Pectoral machine (butterfly)', m: 'petto', w: 'gym', s: 3, r: '12-15', rec: 60, tip: 'Chiudi le braccia davanti al petto e stringi un secondo.' },
  { id: 'panca-multipower', n: 'Panca al multipower', m: 'petto', w: 'gym', s: 3, r: '10', rec: 75, tip: 'Il bilanciere è guidato: ottimo per spingere in sicurezza anche da solo.' },
  { id: 'pullover-manubrio', n: 'Pullover con manubrio', m: 'petto', w: 'gym', s: 3, r: '12', rec: 60, tip: 'Sdraiato, porta il manubrio dietro la testa a braccia quasi tese e torna su.' },
  { id: 'push-up-inclinati', n: 'Piegamenti inclinati (mani rialzate)', m: 'petto', w: 'home', s: 3, r: '12-15', rec: 45, tip: 'Mani su tavolo o divano: più facili dei piegamenti a terra.' },
  { id: 'push-up-esplosivi', n: 'Piegamenti esplosivi', m: 'petto', w: 'home', s: 3, r: '6-8', rec: 75, tip: 'Spingi forte da staccare le mani da terra; atterra morbido.' },

  // --- Schiena (altri esercizi) ---
  { id: 't-bar', n: 'Rematore T-bar', m: 'schiena', w: 'gym', s: 4, r: '8-10', rec: 90, tip: 'Petto in fuori e schiena dritta, tira la maniglia verso lo sterno.' },
  { id: 'lat-presa-stretta', n: 'Lat machine presa stretta', m: 'schiena', w: 'gym', s: 3, r: '10-12', rec: 75, tip: 'Maniglia stretta, tira verso il petto portando giù i gomiti.' },
  { id: 'trazioni-supine', n: 'Trazioni a presa supina (chin-up)', m: 'schiena', w: 'gym', s: 3, r: 'max', rec: 90, tip: 'Palmi verso di te: lavorano molto anche i bicipiti.' },
  { id: 'pulldown-braccia-tese', n: 'Pulldown a braccia tese', m: 'schiena', w: 'gym', s: 3, r: '12-15', rec: 60, tip: 'Braccia quasi tese, spingi la barra fino alle cosce usando i dorsali.' },
  { id: 'iperestensioni', n: 'Iperestensioni (panca lombare)', m: 'schiena', w: 'gym', s: 3, r: '12-15', rec: 60, tip: 'Scendi lento e risali fino ad avere il corpo in linea, non oltre.' },
  { id: 'scrollate-bilanciere', n: 'Scrollate con bilanciere', m: 'schiena', w: 'gym', s: 3, r: '12-15', rec: 60, tip: 'Alza le spalle verso le orecchie e tieni un secondo, braccia tese.' },
  { id: 'scrollate-manubri', n: 'Scrollate con manubri', m: 'schiena', w: 'gym', s: 3, r: '12-15', rec: 60, tip: 'Spalle su dritte verso le orecchie, senza ruotarle.' },
  { id: 'rematore-macchina', n: 'Rematore alla macchina', m: 'schiena', w: 'gym', s: 3, r: '10-12', rec: 75, tip: 'Petto contro il supporto, tira e stringi le scapole.' },
  { id: 'stacco-sumo', n: 'Stacco sumo', m: 'schiena', w: 'gym', s: 4, r: '5-6', rec: 120, tip: 'Piedi larghi e punte in fuori, mani dentro le gambe; spingi il pavimento.' },
  { id: 'good-morning', n: 'Good morning', m: 'schiena', w: 'gym', s: 3, r: '10', rec: 90, tip: 'Bilanciere leggero sulle spalle, piega il busto in avanti con la schiena dritta.' },

  // --- Spalle (altri esercizi) ---
  { id: 'lento-manubri', n: 'Lento avanti con manubri', m: 'spalle', w: 'gym', s: 4, r: '8-10', rec: 90, tip: 'Seduto con lo schienale dritto, spingi i manubri sopra la testa.' },
  { id: 'lento-seduto-bilanciere', n: 'Lento avanti seduto con bilanciere', m: 'spalle', w: 'gym', s: 4, r: '8', rec: 90, tip: 'Schiena appoggiata, il bilanciere passa davanti al viso.' },
  { id: 'shoulder-press-macchina', n: 'Shoulder press alla macchina', m: 'spalle', w: 'gym', s: 3, r: '10-12', rec: 75, tip: 'La macchina guida il movimento: ottima per iniziare.' },
  { id: 'alzate-frontali', n: 'Alzate frontali con manubri', m: 'spalle', w: 'gym', s: 3, r: '12', rec: 60, tip: 'Sali davanti fino all\'altezza delle spalle, senza dondolare.' },
  { id: 'alzate-laterali-cavi', n: 'Alzate laterali ai cavi', m: 'spalle', w: 'gym', s: 3, r: '12-15', rec: 45, tip: 'Il cavo tiene la tensione anche in basso: movimento lento.' },
  { id: 'tirate-mento', n: 'Tirate al mento', m: 'spalle', w: 'gym', s: 3, r: '10-12', rec: 60, tip: 'Presa media, gomiti alti ma non oltre le spalle.' },
  { id: 'reverse-fly-macchina', n: 'Reverse fly alla macchina', m: 'spalle', w: 'gym', s: 3, r: '12-15', rec: 45, tip: 'Apri le braccia all\'indietro: lavora la spalla dietro e la postura.' },
  { id: 'aperture-elastico', n: 'Aperture con elastico', m: 'spalle', w: 'home', s: 3, r: '15-20', rec: 30, tip: 'Braccia tese davanti, apri l\'elastico fino al petto stringendo le scapole.' },

  // --- Braccia (altri esercizi) ---
  { id: 'curl-concentrato', n: 'Curl concentrato', m: 'braccia', w: 'gym', s: 3, r: '10-12', rec: 45, tip: 'Seduto, gomito appoggiato all\'interno della coscia: niente slanci.' },
  { id: 'curl-panca-scott', n: 'Curl alla panca Scott', m: 'braccia', w: 'gym', s: 3, r: '10', rec: 60, tip: 'Braccia appoggiate sul cuscino: scendi fin quasi a braccio teso.' },
  { id: 'curl-inclinato', n: 'Curl su panca inclinata', m: 'braccia', w: 'gym', s: 3, r: '10-12', rec: 60, tip: 'Braccia lasciate cadere dietro il busto: allungamento massimo del bicipite.' },
  { id: 'curl-ez', n: 'Curl con bilanciere EZ', m: 'braccia', w: 'gym', s: 3, r: '10', rec: 60, tip: 'La barra sagomata è più comoda per i polsi del bilanciere dritto.' },
  { id: 'curl-inverso', n: 'Curl inverso', m: 'braccia', w: 'gym', s: 3, r: '12', rec: 45, tip: 'Presa con i palmi in giù: lavora avambracci e brachiale.' },
  { id: 'estensioni-sopra-testa', n: 'Estensioni tricipiti sopra la testa', m: 'braccia', w: 'gym', s: 3, r: '10-12', rec: 60, tip: 'Manubrio dietro la testa, gomiti fermi e puntati in alto.' },
  { id: 'kickback-tricipiti', n: 'Kickback per tricipiti', m: 'braccia', w: 'gym', s: 3, r: '12-15', rec: 45, tip: 'Busto inclinato, gomito fermo vicino al fianco: distendi il braccio indietro.' },
  { id: 'pushdown-corda', n: 'Pushdown con la corda', m: 'braccia', w: 'gym', s: 3, r: '12-15', rec: 45, tip: 'In fondo apri la corda verso l\'esterno e stringi.' },
  { id: 'estensioni-cavi-sopra-testa', n: 'Estensioni ai cavi sopra la testa', m: 'braccia', w: 'gym', s: 3, r: '12', rec: 45, tip: 'Di spalle al cavo, distendi le braccia in avanti sopra la testa.' },

  // --- Gambe (altri esercizi) ---
  { id: 'front-squat', n: 'Front squat', m: 'gambe', w: 'gym', s: 4, r: '6-8', rec: 120, tip: 'Bilanciere davanti sulle spalle e gomiti alti: busto più dritto.' },
  { id: 'goblet-squat', n: 'Goblet squat', m: 'gambe', w: 'gym', s: 3, r: '10-12', rec: 75, tip: 'Manubrio al petto: il modo più semplice per imparare lo squat.' },
  { id: 'hack-squat', n: 'Hack squat', m: 'gambe', w: 'gym', s: 4, r: '8-10', rec: 90, tip: 'Schiena contro lo schienale, scendi finché le cosce sono parallele.' },
  { id: 'squat-multipower', n: 'Squat al multipower', m: 'gambe', w: 'gym', s: 3, r: '8-10', rec: 90, tip: 'Il bilanciere guidato aiuta a stare stabili: piedi un po\' avanti.' },
  { id: 'squat-sumo-manubrio', n: 'Squat sumo con manubrio', m: 'gambe', w: 'gym', s: 3, r: '12', rec: 60, tip: 'Piedi larghi e punte in fuori: lavorano anche interno coscia e glutei.' },
  { id: 'affondi-indietro', n: 'Affondi indietro con manubri', m: 'gambe', w: 'gym', s: 3, r: '10 per gamba', rec: 75, tip: 'Il passo indietro carica meno il ginocchio degli affondi in avanti.' },
  { id: 'leg-curl-seduto', n: 'Leg curl seduto', m: 'gambe', w: 'gym', s: 3, r: '12', rec: 60, tip: 'Piega le gambe fino in fondo e torna su lentamente.' },
  { id: 'stacco-gambe-tese-manubri', n: 'Stacco a gambe tese con manubri', m: 'gambe', w: 'gym', s: 3, r: '10', rec: 90, tip: 'Gambe quasi tese, manubri vicini alle gambe; senti tirare dietro le cosce.' },
  { id: 'affondi-saltati', n: 'Affondi saltati', m: 'gambe', w: 'home', s: 3, r: '8 per gamba', rec: 75, tip: 'Dall\'affondo salta e cambia gamba in aria; atterra morbido.' },
  { id: 'affondi-incrociati', n: 'Affondi incrociati indietro', m: 'gambe', w: 'home', s: 3, r: '10 per gamba', rec: 60, tip: 'La gamba va indietro in diagonale: più lavoro per il gluteo laterale.' },

  // --- Glutei (altri esercizi) ---
  { id: 'pull-through', n: 'Pull through ai cavi', m: 'glutei', w: 'gym', s: 3, r: '12-15', rec: 60, tip: 'Di spalle al cavo, la corda tra le gambe: spingi il bacino in avanti.' },
  { id: 'ponte-bilanciere', n: 'Ponte glutei con bilanciere', m: 'glutei', w: 'gym', s: 4, r: '12', rec: 75, tip: 'Schiena a terra e bilanciere sul bacino: sali e stringi i glutei.' },
  { id: 'affondi-camminati-bilanciere', n: 'Affondi camminati con bilanciere', m: 'glutei', w: 'gym', s: 3, r: '10 per gamba', rec: 90, tip: 'Passi lunghi e busto dritto: più lungo il passo, più lavorano i glutei.' },

  // --- Addome (altri esercizi) ---
  { id: 'bicicletta', n: 'Crunch a bicicletta', m: 'addome', w: 'home', s: 3, r: '20', rec: 45, tip: 'Gomito verso il ginocchio opposto, lentamente: lavora anche gli obliqui.' },
  { id: 'crunch-inverso', n: 'Crunch inverso', m: 'addome', w: 'home', s: 3, r: '12-15', rec: 45, tip: 'Ginocchia al petto e solleva il bacino da terra, senza slancio.' },
  { id: 'ginocchia-parallele', n: 'Ginocchia al petto alle parallele', m: 'addome', w: 'gym', s: 3, r: '12', rec: 60, tip: 'Appoggiato sugli avambracci, porta le ginocchia verso il petto.' },
  { id: 'sit-up', n: 'Sit-up', m: 'addome', w: 'home', s: 3, r: '15', rec: 45, tip: 'Piedi bloccati, sali fino a sederti e scendi controllando.' },
  { id: 'flutter-kick', n: 'Sforbiciate (flutter kick)', m: 'addome', w: 'home', s: 3, r: '30 s', rec: 45, tip: 'Schiena attaccata a terra, gambe tese che si alternano su e giù.' },
  { id: 'jackknife', n: 'Jackknife (sit-up a libro)', m: 'addome', w: 'home', s: 3, r: '10-12', rec: 60, tip: 'Braccia e gambe tese si chiudono insieme sopra la pancia.' },
  { id: 'crunch-obliqui', n: 'Crunch per gli obliqui', m: 'addome', w: 'home', s: 3, r: '15 per lato', rec: 45, tip: 'Su un fianco o ruotando il busto: porta la spalla verso l\'anca.' },
  { id: 'crunch-declinato', n: 'Crunch su panca declinata', m: 'addome', w: 'gym', s: 3, r: '12-15', rec: 45, tip: 'Piedi bloccati sulla panca inclinata: più difficile del crunch a terra.' },
  { id: 'crunch-macchina', n: 'Crunch alla macchina', m: 'addome', w: 'gym', s: 3, r: '12-15', rec: 45, tip: 'Arrotonda la schiena portando il petto verso il bacino.' },

  // --- Cardio (altri esercizi) ---
  { id: 'stepper', n: 'Stepper (scale)', m: 'cardio', w: 'gym', t: 'cardio', d: 15, i: 'Moderata', tip: 'Come salire le scale: busto dritto, non appoggiarti troppo alle maniglie.' },
  { id: 'bici-reclinata', n: 'Bici reclinata', m: 'cardio', w: 'gym', t: 'cardio', d: 25, i: 'Moderata', tip: 'Schiena appoggiata: perfetta se hai mal di schiena o sei all\'inizio.' },
  { id: 'battle-rope', n: 'Corde (battle rope)', m: 'cardio', w: 'gym', s: 5, r: '30 s', rec: 45, tip: 'Gambe piegate e busto fermo: fai onde veloci con le braccia.' },

  // --- Mobilità e stretching (giorni leggeri, riscaldamento e defaticamento) ---
  { id: 'gatto-mucca', n: 'Gatto e mucca', m: 'mobilita', w: 'home', s: 2, r: '10', rec: 15, tip: 'A quattro zampe, inarca e arrotonda la schiena con il respiro.' },
  { id: 'posizione-bambino', n: 'Posizione del bambino', m: 'mobilita', w: 'home', s: 2, r: '30-45 s', rec: 15, tip: 'Seduto sui talloni, allunga le braccia avanti e rilassa la schiena.' },
  { id: 'flessori-anca', n: 'Allungamento flessori dell\'anca', m: 'mobilita', w: 'home', s: 2, r: '30 s per lato', rec: 15, tip: 'In affondo con il ginocchio a terra, spingi il bacino in avanti.' },
  { id: 'allungamento-femorali', n: 'Allungamento femorali', m: 'mobilita', w: 'home', s: 2, r: '30 s per lato', rec: 15, tip: 'Gamba tesa davanti, piegati in avanti con la schiena dritta.' },
  { id: 'allungamento-quadricipiti', n: 'Allungamento quadricipiti', m: 'mobilita', w: 'home', s: 2, r: '30 s per lato', rec: 15, tip: 'In piedi, porta il tallone al gluteo tenendo le ginocchia vicine.' },
  { id: 'allungamento-polpacci', n: 'Allungamento polpacci al muro', m: 'mobilita', w: 'home', s: 2, r: '30 s per lato', rec: 15, tip: 'Mani al muro, gamba dietro tesa e tallone a terra.' },
  { id: 'allungamento-petto', n: 'Allungamento petto e spalle', m: 'mobilita', w: 'home', s: 2, r: '30 s', rec: 15, tip: 'Mani dietro la schiena o al muro, apri il petto senza inarcare.' },
  { id: 'allungamento-spalle', n: 'Allungamento spalle', m: 'mobilita', w: 'home', s: 2, r: '30 s per lato', rec: 15, tip: 'Porta il braccio teso davanti al petto e tiralo piano con l\'altra mano.' },
  { id: 'allungamento-glutei', n: 'Allungamento glutei a terra', m: 'mobilita', w: 'home', s: 2, r: '30 s per lato', rec: 15, tip: 'Sdraiato, caviglia sul ginocchio opposto e tira la gamba verso il petto.' },
  { id: 'worlds-greatest', n: 'Allungamento completo (world\'s greatest)', m: 'mobilita', w: 'home', s: 2, r: '5 per lato', rec: 20, tip: 'Affondo, mano a terra e rotazione del busto verso l\'alto: scioglie tutto.' },
  { id: 'cerchi-braccia', n: 'Cerchi con le braccia', m: 'mobilita', w: 'home', s: 2, r: '15 per verso', rec: 15, tip: 'Braccia tese di lato, cerchi piccoli che diventano grandi.' },
  { id: 'rotazioni-busto', n: 'Rotazioni del busto', m: 'mobilita', w: 'home', s: 2, r: '10 per lato', rec: 15, tip: 'In piedi, ruota busto e braccia da un lato all\'altro senza spostare i piedi.' }
];

// Programmi pronti: diventano una scheda nuova con un tocco
const WORKOUT_PROGRAMS = [
  {
    id: 'fullbody-casa', name: 'Full body a casa', icon: '🏠', level: 'Principiante', place: 'home',
    desc: '3 allenamenti a settimana, senza attrezzi. Circa 35 minuti.',
    days: [
      { name: 'Giorno A', ex: ['squat-libero', 'push-up', 'rematore-zaino', 'ponte-glutei', 'plank', 'jumping-jack'] },
      { name: 'Giorno B', ex: ['affondi', 'pike-push-up', 'superman', 'dip-sedia', 'dead-bug', 'burpees'] },
      { name: 'Giorno C', ex: ['bulgaro', 'push-up-larghi', 'rematore-inverso', 'ponte-una-gamba', 'plank-laterale', 'mountain-climber'] }
    ]
  },
  {
    id: 'fullbody-palestra', name: 'Full body in palestra', icon: '🏋️', level: 'Principiante', place: 'gym',
    desc: 'Due giorni da alternare, 3 volte a settimana. Perfetto per i primi 3 mesi.',
    days: [
      { name: 'Giorno A', ex: ['leg-press', 'chest-press', 'lat-machine', 'alzate-laterali', 'leg-curl', 'plank'] },
      { name: 'Giorno B', ex: ['squat', 'panca-inclinata-manubri', 'pulley', 'hip-thrust', 'pushdown', 'curl-martello'] }
    ]
  },
  {
    id: 'ppl', name: 'Push · Pull · Legs', icon: '🔁', level: 'Intermedio', place: 'gym',
    desc: 'Spinta, tirata e gambe: 3 giorni (o 6 ripetendo il giro).',
    days: [
      { name: 'Push', ex: ['panca-piana', 'panca-inclinata-manubri', 'military-press', 'alzate-laterali', 'croci-cavi', 'pushdown'] },
      { name: 'Pull', ex: ['trazioni', 'rematore-bilanciere', 'pulley', 'face-pull', 'curl-bilanciere', 'curl-martello'] },
      { name: 'Legs', ex: ['squat', 'stacco-rumeno', 'leg-press', 'leg-extension', 'leg-curl', 'calf-macchina'] }
    ]
  },
  {
    id: 'tonificazione-20', name: 'Tonificazione in 20 minuti', icon: '⏱️', level: 'Tutti', place: 'home',
    desc: 'Un circuito veloce per le giornate piene: niente scuse.',
    days: [
      { name: 'Circuito', ex: ['jumping-jack', 'squat-libero', 'push-up-ginocchia', 'ponte-glutei', 'mountain-climber', 'plank'] }
    ]
  },
  {
    id: 'glutei-gambe', name: 'Gambe e glutei', icon: '🍑', level: 'Principiante', place: 'gym',
    desc: 'Due giorni dedicati alla parte bassa, da abbinare a un giorno per la parte alta.',
    days: [
      { name: 'Giorno A', ex: ['hip-thrust', 'squat', 'affondi-manubri', 'abductor', 'calf-macchina'] },
      { name: 'Giorno B', ex: ['stacco-rumeno', 'leg-press', 'kickback-cavi', 'leg-curl', 'plank'] }
    ]
  }
];

// Esercizi mirati per sport: complementari agli allenamenti dello sport, 2 volte a settimana.
// focus = cosa serve in quello sport · gym = versione in palestra · home = versione a casa (esercizi con il motivo)
const SPORT_PROGRAMS = {
  'Calcio': {
    focus: 'Scatto, cambi di direzione e prevenzione di femorali e inguine.',
    gym: [
      { id: 'squat', why: 'Gambe più forti = scatto e tiro più potenti.' },
      { id: 'stacco-rumeno', why: 'Femorali forti e meno stiramenti.' },
      { id: 'box-jump', why: 'Esplosività per i contrasti aerei e i primi metri.' },
      { id: 'leg-press-una-gamba', why: 'Equilibra la gamba che calcia e quella d\'appoggio.' },
      { id: 'nordic-curl', why: 'Riduce di molto gli stiramenti ai femorali.' },
      { id: 'copenhagen', why: 'Protegge l\'inguine (pubalgia).' },
      { id: 'pallof-cavi', why: 'Core stabile nei contrasti spalla a spalla.' }
    ],
    home: [
      { id: 'scatti', why: 'Lo scatto breve decide le partite.' },
      { id: 'navette', why: 'Cambi di direzione più rapidi e sicuri.' },
      { id: 'nordic-curl', why: 'Riduce di molto gli stiramenti ai femorali.' },
      { id: 'copenhagen', why: 'Protegge l\'inguine (pubalgia).' },
      { id: 'bulgaro', why: 'Forza su una gamba, come quando calci.' },
      { id: 'equilibrio-una-gamba', why: 'Caviglie più stabili, meno distorsioni.' }
    ]
  },
  'Pallavolo': {
    focus: 'Salto più alto, spalle sane per schiacciare e battere, atterraggi sicuri.',
    gym: [
      { id: 'squat', why: 'La forza nelle gambe è la base del salto.' },
      { id: 'box-jump', why: 'Allena l\'esplosività senza l\'impatto della discesa.' },
      { id: 'step-up-manubri', why: 'Spinta su una gamba, come nella rincorsa.' },
      { id: 'calf-macchina', why: 'Polpacci forti per staccare e atterrare.' },
      { id: 'extrarotazioni-cavi', why: 'La spalla che schiaccia ha bisogno di equilibrio: previene i dolori.' },
      { id: 'face-pull', why: 'Spalle e postura per battute e schiacciate.' },
      { id: 'lanci-palla-medica', why: 'Potenza del braccio che parte da gambe e busto.' }
    ],
    home: [
      { id: 'squat-jump', why: 'Più potenza nelle gambe = salto più alto a muro e in attacco.' },
      { id: 'skip-alto', why: 'Piedi rapidi per arrivare sotto la palla.' },
      { id: 'calf-gradino', why: 'Polpacci forti per staccare e atterrare.' },
      { id: 'extrarotazioni', why: 'La spalla che schiaccia ha bisogno di equilibrio: previene i dolori.' },
      { id: 'bulgaro', why: 'Forza su una gamba per la rincorsa e gli atterraggi.' },
      { id: 'plank-laterale', why: 'Core stabile per colpire in aria.' }
    ]
  },
  'Basket': {
    focus: 'Elevazione, primo passo esplosivo e caviglie solide.',
    gym: [
      { id: 'squat', why: 'La forza nelle gambe è la base del salto.' },
      { id: 'box-jump', why: 'Elevazione per rimbalzi e tiri.' },
      { id: 'step-up-manubri', why: 'Spinta su una gamba per l\'arresto e il terzo tempo.' },
      { id: 'hip-thrust', why: 'Glutei potenti per il primo passo.' },
      { id: 'calf-seduto', why: 'Caviglie e polpacci pronti a mille salti.' },
      { id: 'pallof-cavi', why: 'Core solido per i contatti.' },
      { id: 'farmer-walk', why: 'Presa e stabilità a tutto il corpo.' }
    ],
    home: [
      { id: 'squat-jump', why: 'Elevazione per rimbalzi e tiri.' },
      { id: 'salti-laterali', why: 'Piedi veloci in difesa.' },
      { id: 'navette', why: 'Il primo passo che ti fa battere l\'avversario.' },
      { id: 'bulgaro', why: 'Forza su una gamba per l\'arresto e il terzo tempo.' },
      { id: 'equilibrio-una-gamba', why: 'Caviglie più stabili, meno distorsioni.' },
      { id: 'pallof-press', why: 'Core solido per i contatti.' }
    ]
  },
  'Tennis': {
    focus: 'Rotazione del busto, spalle e gomiti protetti, spostamenti laterali.',
    gym: [
      { id: 'woodchop-cavi', why: 'La potenza del dritto e del rovescio nasce dalla rotazione.' },
      { id: 'extrarotazioni-cavi', why: 'Spalla protetta in servizio.' },
      { id: 'curl-polsi', why: 'Previene il gomito del tennista.' },
      { id: 'rematore-cavi-una-mano', why: 'Schiena forte per frenare il braccio dopo il colpo.' },
      { id: 'affondi-manubri', why: 'Arrivi bassi sulla palla senza perdere equilibrio.' },
      { id: 'lanci-palla-medica', why: 'Trasferisci la forza dalle gambe alla racchetta.' },
      { id: 'face-pull', why: 'Spalle in equilibrio dopo tanti servizi.' }
    ],
    home: [
      { id: 'rotazioni-elastico', why: 'La potenza del dritto e del rovescio nasce dalla rotazione.' },
      { id: 'extrarotazioni', why: 'Spalla protetta in servizio.' },
      { id: 'polsi-avambracci', why: 'Previene il gomito del tennista.' },
      { id: 'salti-laterali', why: 'Spostamenti laterali più rapidi.' },
      { id: 'affondi', why: 'Arrivi bassi sulla palla senza perdere equilibrio.' },
      { id: 'pallof-press', why: 'Core che trasmette la forza al braccio.' }
    ]
  },
  'Padel': {
    focus: 'Rotazione, gambe basse e spalle per bandeja e smash.',
    gym: [
      { id: 'woodchop-cavi', why: 'Più potenza nei colpi con meno sforzo del braccio.' },
      { id: 'extrarotazioni-cavi', why: 'Spalle protette nei colpi sopra la testa.' },
      { id: 'curl-polsi', why: 'Previene i fastidi al gomito.' },
      { id: 'leg-press', why: 'Gambe che reggono la posizione bassa in difesa.' },
      { id: 'affondi-manubri', why: 'Recuperi bassi e veloci.' },
      { id: 'pallof-cavi', why: 'Core stabile nei recuperi in parete.' },
      { id: 'face-pull', why: 'Spalle in equilibrio per bandeja e vibora.' }
    ],
    home: [
      { id: 'rotazioni-elastico', why: 'Più potenza nei colpi con meno sforzo del braccio.' },
      { id: 'extrarotazioni', why: 'Spalle protette nei colpi sopra la testa.' },
      { id: 'polsi-avambracci', why: 'Previene i fastidi al gomito.' },
      { id: 'wall-sit', why: 'Gambe che reggono la posizione bassa in difesa.' },
      { id: 'salti-laterali', why: 'Spostamenti rapidi in campo piccolo.' },
      { id: 'plank-laterale', why: 'Core stabile nei recuperi in parete.' }
    ]
  },
  'Nuoto': {
    focus: 'Dorsali e spalle forti ma sane, core per restare in linea in acqua.',
    gym: [
      { id: 'lat-machine', why: 'La trazione della bracciata viene dai dorsali.' },
      { id: 'trazioni', why: 'Forza di trazione con tutto il corpo.' },
      { id: 'pulley', why: 'Schiena forte per la fase di spinta.' },
      { id: 'extrarotazioni-cavi', why: 'La spalla del nuotatore va protetta.' },
      { id: 'face-pull', why: 'Postura e scapole stabili.' },
      { id: 'box-jump', why: 'Partenze e virate più potenti.' },
      { id: 'dead-bug', why: 'Corpo in linea = meno resistenza in acqua.' }
    ],
    home: [
      { id: 'trazioni-casa', why: 'La trazione della bracciata viene dai dorsali.' },
      { id: 'nuoto-dorsali', why: 'Simula la bracciata anche fuori dall\'acqua.' },
      { id: 'extrarotazioni', why: 'La spalla del nuotatore va protetta.' },
      { id: 'ytw', why: 'Postura e scapole stabili.' },
      { id: 'dead-bug', why: 'Corpo in linea = meno resistenza in acqua.' },
      { id: 'squat-jump', why: 'Spinte e virate più potenti.' }
    ]
  },
  'Corsa': {
    focus: 'Gambe resistenti, piedi e caviglie forti, meno infortuni.',
    gym: [
      { id: 'squat', why: 'Gambe forti = passo più economico.' },
      { id: 'leg-press-una-gamba', why: 'Correre è spingere su una gamba alla volta.' },
      { id: 'stacco-rumeno', why: 'Femorali e glutei che reggono i chilometri.' },
      { id: 'step-up-manubri', why: 'Forza per le salite.' },
      { id: 'calf-seduto', why: 'Polpacci e tendine d\'Achille più resistenti.' },
      { id: 'hip-thrust', why: 'Glutei attivi = ginocchia protette.' },
      { id: 'plank-laterale', why: 'Bacino stabile quando la fatica arriva.' }
    ],
    home: [
      { id: 'calf-gradino', why: 'Polpacci e tendine d\'Achille più resistenti.' },
      { id: 'bulgaro', why: 'Correre è saltare su una gamba alla volta.' },
      { id: 'ponte-una-gamba', why: 'Glutei attivi = ginocchia protette.' },
      { id: 'skip-alto', why: 'Tecnica di corsa e frequenza del passo.' },
      { id: 'plank-laterale', why: 'Bacino stabile quando la fatica arriva.' },
      { id: 'equilibrio-una-gamba', why: 'Caviglie pronte per sterrati e marciapiedi.' }
    ]
  },
  'Ciclismo': {
    focus: 'Spinta sui pedali, schiena e core per le ore in sella.',
    gym: [
      { id: 'squat', why: 'Più forza in ogni pedalata.' },
      { id: 'leg-press-una-gamba', why: 'Equilibra le due gambe.' },
      { id: 'hip-thrust', why: 'I glutei sono il motore della spinta.' },
      { id: 'stacco-rumeno', why: 'Schiena e femorali per le ore in sella.' },
      { id: 'face-pull', why: 'Contrasta le spalle chiuse da ciclista.' },
      { id: 'plank', why: 'Core che tiene la posizione aerodinamica.' }
    ],
    home: [
      { id: 'squat-libero', why: 'Più forza in ogni pedalata.' },
      { id: 'affondi', why: 'Equilibra le due gambe.' },
      { id: 'ponte-glutei', why: 'I glutei sono il motore della spinta.' },
      { id: 'superman', why: 'Schiena forte contro il mal di schiena in sella.' },
      { id: 'plank', why: 'Core che tiene la posizione aerodinamica.' },
      { id: 'ytw', why: 'Contrasta le spalle chiuse da ciclista.' }
    ]
  },
  'Boxe': {
    focus: 'Pugni più potenti, fiato e core per incassare.',
    gym: [
      { id: 'lanci-palla-medica', why: 'La potenza del pugno parte dalle gambe e passa dal busto.' },
      { id: 'woodchop-cavi', why: 'Ganci e montanti più veloci.' },
      { id: 'panca-presa-stretta', why: 'Spinta e tricipiti per il diretto.' },
      { id: 'rematore-bilanciere', why: 'Schiena forte per ritirare il pugno e la guardia.' },
      { id: 'box-jump', why: 'Gambe esplosive, il pugno parte da lì.' },
      { id: 'hiit-bici', why: 'Fiato da round con ginocchia al sicuro.' }
    ],
    home: [
      { id: 'shadow-boxing', why: 'Tecnica e fiato insieme.' },
      { id: 'corda', why: 'Il classico: piedi leggeri e resistenza.' },
      { id: 'rotazioni-elastico', why: 'Ganci e montanti più veloci.' },
      { id: 'push-up', why: 'Spinta e resistenza delle braccia.' },
      { id: 'burpees', why: 'Fiato per l\'ultimo round.' },
      { id: 'plank', why: 'Addome pronto a incassare.' }
    ]
  },
  'Lotta': {
    focus: 'Forza totale, presa, collo e core: vince chi tiene di più.',
    gym: [
      { id: 'stacco', why: 'Forza per sollevare e proiettare.' },
      { id: 'farmer-walk', why: 'Presa d\'acciaio.' },
      { id: 'trazioni', why: 'Tirare l\'avversario verso di te.' },
      { id: 'squat', why: 'Forza nelle gambe per i cambi di livello.' },
      { id: 'rematore-bilanciere', why: 'Schiena per le prese e i controlli.' },
      { id: 'pallof-cavi', why: 'Resistere alle torsioni.' }
    ],
    home: [
      { id: 'trazioni-casa', why: 'Tirare l\'avversario verso di te.' },
      { id: 'rematore-inverso', why: 'Schiena per le prese e i controlli.' },
      { id: 'bulgaro', why: 'Forza nelle gambe per i cambi di livello.' },
      { id: 'pallof-press', why: 'Resistere alle torsioni.' },
      { id: 'superman', why: 'Schiena che regge i ponti.' },
      { id: 'burpees', why: 'Fiato per gli ultimi secondi del match.' }
    ]
  },
  'Rugby': {
    focus: 'Forza, potenza nei placcaggi e scatto.',
    gym: [
      { id: 'squat', why: 'La base della forza nella mischia.' },
      { id: 'stacco', why: 'Forza di tutta la catena posteriore.' },
      { id: 'panca-piana', why: 'Spinta per placcaggi e hand-off.' },
      { id: 'spinta-slitta', why: 'Accelerazione con un peso addosso, come in mischia.' },
      { id: 'farmer-walk', why: 'Presa e core per i contatti.' },
      { id: 'nordic-curl', why: 'Femorali protetti negli scatti.' }
    ],
    home: [
      { id: 'scatti', why: 'Accelerazione palla in mano.' },
      { id: 'nordic-curl', why: 'Femorali protetti negli scatti.' },
      { id: 'push-up', why: 'Spinta per placcaggi e hand-off.' },
      { id: 'bulgaro', why: 'Gambe forti per spingere in mischia.' },
      { id: 'burpees', why: 'Rialzarsi da terra, mille volte a partita.' },
      { id: 'plank', why: 'Core per i contatti.' }
    ]
  },
  'Arti marziali': {
    focus: 'Esplosività, mobilità, equilibrio e core.',
    gym: [
      { id: 'box-jump', why: 'Calci e spostamenti più esplosivi.' },
      { id: 'woodchop-cavi', why: 'Più potenza nei colpi rotatori.' },
      { id: 'kickback-cavi', why: 'Glutei forti per calciare alto.' },
      { id: 'stacco-rumeno', why: 'Anche forti e femorali elastici.' },
      { id: 'lanci-palla-medica', why: 'Potenza che parte da terra.' },
      { id: 'hanging-leg-raise', why: 'Addome e flessori per alzare le ginocchia.' }
    ],
    home: [
      { id: 'squat-jump', why: 'Calci e spostamenti più esplosivi.' },
      { id: 'equilibrio-una-gamba', why: 'Stabilità quando calci.' },
      { id: 'rotazioni-elastico', why: 'Più potenza nei colpi rotatori.' },
      { id: 'shadow-boxing', why: 'Tecnica e resistenza.' },
      { id: 'ponte-una-gamba', why: 'Anche e glutei forti per calciare alto.' },
      { id: 'mountain-climber', why: 'Fiato e core.' }
    ]
  }
};
