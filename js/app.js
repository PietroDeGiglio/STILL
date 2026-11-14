// STILL: logica dell'app (Vue 3). L'interfaccia è in src/app-template.html (compilata in js/app-render.js).
// Vue Application Setup
const { createApp, ref, shallowRef, onMounted, watch, nextTick, computed } = Vue;

createApp({
  setup() {
    // App State
    const activeTab = ref('dashboard');

    // Data locale in formato YYYY-MM-DD (usata da pasti, progressi e calendario)
    const toISODate = (date = new Date()) => {
      const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return local.toISOString().split('T')[0];
    };

    // ---------------------------------------------------------------
    // ARCHIVIO DATI: unico punto di accesso alla memoria del dispositivo.
    // (Per la futura APK basterà sostituire l'implementazione qui.)
    // ---------------------------------------------------------------
    const STORAGE_KEYS = [
      'still_profile', 'still_plans', 'still_meal_logs', 'still_measurements', 'still_workout_logs',
      'still_workout_sheets', 'still_training_sessions', 'still_comments', 'still_settings', 'still_food_diary'
    ];
    // Che forma deve avere ogni dato: un backup modificato o rovinato non deve poter bloccare l'app
    const STORAGE_SHAPES = {
      still_profile: 'object', still_plans: 'array', still_meal_logs: 'object', still_measurements: 'array',
      still_workout_logs: 'array', still_workout_sheets: 'array', still_training_sessions: 'array',
      still_comments: 'object', still_settings: 'object', still_food_diary: 'object'
    };
    const hasShape = (key, value) => {
      const shape = STORAGE_SHAPES[key];
      if (shape === 'array') return Array.isArray(value);
      if (shape === 'object') return (value === null && key === 'still_profile') || (!!value && typeof value === 'object' && !Array.isArray(value));
      return true;
    };
    // Se il telefono non riesce a salvare (memoria piena o bloccata) l'utente deve saperlo subito:
    // avviso a schermo, al massimo una volta al minuto per non bloccare l'app.
    let lastSaveWarning = 0;
    function warnSaveFailed() {
      const now = Date.now();
      if (now - lastSaveWarning < 60000) return;
      lastSaveWarning = now;
      try {
        customModal.value = {
          isOpen: true, type: 'alert', title: 'Salvataggio non riuscito',
          message: "Il telefono non ha salvato le ultime modifiche (memoria piena o bloccata dal browser). Esporta subito un backup dal Profilo e libera spazio, poi riprova.",
          onConfirm: null
        };
      } catch (e) { /* l'app non è ancora pronta: resta l'errore in console */ }
    }
    const storage = {
      // Restituisce il JSON grezzo, oppure null se mancante o corrotto
      getRaw(key) {
        try {
          const raw = localStorage.getItem(key);
          if (raw === null) return null;
          JSON.parse(raw);
          return raw;
        } catch (e) {
          console.warn(`Dati non leggibili per ${key}`, e);
          return null;
        }
      },
      save(key, value) {
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch (e) {
          console.error(`Salvataggio non riuscito per ${key}`, e);
          warnSaveFailed();
          return false;
        }
      },
      remove(key) {
        try { localStorage.removeItem(key); } catch (e) { /* ignora */ }
      },
      // Legge un dato già controllato: se manca o ha una forma sbagliata usa il valore di partenza
      load(key, fallback) {
        const raw = this.getRaw(key);
        if (raw === null) return fallback;
        const value = JSON.parse(raw);
        if (hasShape(key, value)) return value;
        console.warn(`Dati con forma inattesa per ${key}: ignorati`);
        return fallback;
      },
      exportAll() {
        const data = {};
        STORAGE_KEYS.forEach(key => {
          const raw = this.getRaw(key);
          if (raw !== null) data[key] = JSON.parse(raw);
        });
        return data;
      },
      // Ripristino tutto-o-niente: se un dato non entra, rimette com'era prima e restituisce false
      importAll(data) {
        const before = {};
        STORAGE_KEYS.forEach(key => { before[key] = localStorage.getItem(key); });
        try {
          // Sostituisce tutto: quello che nel backup non c'è viene tolto (niente dati mescolati)
          STORAGE_KEYS.forEach(key => {
            if (key in data) localStorage.setItem(key, JSON.stringify(data[key]));
            else localStorage.removeItem(key);
          });
          return true;
        } catch (e) {
          console.error('Ripristino non riuscito', e);
          STORAGE_KEYS.forEach(key => {
            try {
              if (before[key] === null) localStorage.removeItem(key); else localStorage.setItem(key, before[key]);
            } catch (err) { /* ignora */ }
          });
          return false;
        }
      },
      // Spazio occupato dai dati di STILL, in KB (il browser ne concede circa 5000)
      sizeKB() {
        let chars = 0;
        STORAGE_KEYS.forEach(key => { const raw = localStorage.getItem(key); if (raw) chars += raw.length + key.length; });
        return Math.round(chars * 2 / 1024);
      }
    };
    
    // Auth State
    const isAuthenticated = ref(false);
    const authLoading = ref(true); // Start loading while checking auth

    // Nutrition Feature States
    const nutritionView = ref('list'); // 'list', 'detail', 'calendar', 'create', 'builder'
    
    // Modals State
    const customModal = ref({ isOpen: false, type: 'alert', title: '', message: '', onConfirm: null });
    const commentModal = ref({ isOpen: false, date: null, key: null, text: '' });
    const groceryModal = ref({ isOpen: false });
    
    // Toast Notification State (Simple)
    const showToastMessage = (msg) => {
       // Replacing native alerts with a simple custom modal alert
       customModal.value = { isOpen: true, type: 'alert', title: 'Notifica', message: msg, onConfirm: null };
    };

    const showConfirm = (title, message, onConfirmCallback) => {
        customModal.value = { isOpen: true, type: 'confirm', title, message, onConfirm: onConfirmCallback };
    }

    const executeConfirm = () => {
        if (customModal.value.onConfirm) customModal.value.onConfirm();
        customModal.value.isOpen = false;
    }

    // App Features State
    const showGroceryReminder = ref(true);
    const mealsContainer = ref(null);
    const currentMealId = ref(null);

    const weekDays = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
    const mealTypes = [
      { id: 'colazione', label: 'Colazione', icon: '🥣' },
      { id: 'spuntino_mattina', label: 'Spuntino Mattina', icon: '🍏' },
      { id: 'pranzo', label: 'Pranzo', icon: '🍗' },
      { id: 'spuntino_pomeriggio', label: 'Spuntino Pom.', icon: '🍌' },
      { id: 'post_workout', label: 'Post Workout', icon: '💪' },
      { id: 'cena', label: 'Cena', icon: '🐟' }
    ];

    const scrollToCurrentMeal = () => {
      nextTick(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 10) currentMealId.value = 'colazione';
        else if (currentHour >= 10 && currentHour < 12) currentMealId.value = 'spuntino_mattina';
        else if (currentHour >= 12 && currentHour < 15) currentMealId.value = 'pranzo';
        else if (currentHour >= 15 && currentHour < 19) currentMealId.value = 'spuntino_pomeriggio';
        else if (currentHour >= 19 && currentHour < 21) currentMealId.value = 'cena';
        else currentMealId.value = 'post_workout';

        if (!mealsContainer.value) return;
        // Tenta di scrollare al pasto con l'id (usando l'id standard se presente nel piano di oggi)
        const targetElement = document.querySelector(`[id^='meal-${currentMealId.value}']`);
        if (targetElement) {
          const scrollPos = targetElement.offsetLeft - mealsContainer.value.offsetLeft - 20;
          mealsContainer.value.scrollTo({ left: scrollPos, behavior: 'smooth' });
        }
      });
    };

    // Nutritional Plans Logic
    const plans = ref(storage.load('still_plans', []));

    // Auto-salvataggio dei piani nella memoria del telefono
    watch(plans, (newPlans) => {
      storage.save('still_plans', newPlans);
    }, { deep: true });
    
    const selectedPlan = ref(null);

    // Selettore dei giorni nel dettaglio del piano (parte da oggi)
    const shortDayLabels = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    const todayWeekDay = weekDays[(new Date().getDay() + 6) % 7];
    const selectedNutritionDay = ref(todayWeekDay);
    
    // Builder Data State
    const editingPlanId = ref(null);
    const newPlanData = ref({ name: '', startDate: '', endDate: '', makeActive: true });
    const newPlanBuilder = ref({ currentWeekIdx: 0, currentDay: 'Lunedì', weeks: [] });

    const createEmptyWeek = () => {
      const daysObj = {};
      weekDays.forEach(d => daysObj[d] = []);
      return { days: daysObj };
    };

    const startNewPlan = () => {
      editingPlanId.value = null;
      pdfImport.value = { busy: false, error: '', summary: null };
      newPlanBuilder.value = { currentWeekIdx: 0, currentDay: 'Lunedì', weeks: [] };
      const today = new Date();
      const nextMonth = new Date(today);
      nextMonth.setMonth(today.getMonth() + 1);

      newPlanData.value = {
        name: '', startDate: toISODate(today), endDate: toISODate(nextMonth), makeActive: true
      };
      nutritionView.value = 'create';
    };

    const editPlan = (plan) => {
      editingPlanId.value = plan.id;
      pdfImport.value = { busy: false, error: '', summary: null };
      newPlanData.value = {
        name: plan.name,
        startDate: plan.startDate,
        endDate: plan.endDate,
        makeActive: plan.status === 'active'
      };
      
      if (plan.weeks && plan.weeks.length > 0) {
        // Carica la struttura esistente copiandola in profondità
        newPlanBuilder.value = {
          currentWeekIdx: 0,
          currentDay: 'Lunedì',
          weeks: JSON.parse(JSON.stringify(plan.weeks))
        };
      } else {
        // Se si tenta di modificare un piano "legacy", inizializza vuoto
        newPlanBuilder.value = {
          currentWeekIdx: 0,
          currentDay: 'Lunedì',
          weeks: [createEmptyWeek()]
        };
      }
      
      nutritionView.value = 'create';
    };

    const goToBuilder = () => {
      if (!newPlanData.value.name.trim()) return showToastMessage("Dai un nome al tuo nuovo piano!");
      if (!newPlanData.value.startDate || !newPlanData.value.endDate) return showToastMessage("Inserisci date valide.");
      
      // Inizializza il builder solo se stiamo creando un piano ex-novo, 
      // se stiamo modificando (editingPlanId != null) manteniamo la struttura pre-caricata in editPlan()
      if (editingPlanId.value === null && (!newPlanBuilder.value.weeks || newPlanBuilder.value.weeks.length === 0)) {
        newPlanBuilder.value = {
          currentWeekIdx: 0,
          currentDay: 'Lunedì',
          weeks: [createEmptyWeek()]
        };
      }
      nutritionView.value = 'builder';
    };

    // Importa la dieta da un PDF o da un documento Word (.docx) del nutrizionista (js/import/diet-pdf.js).
    // Riempie il builder: l'utente controlla, corregge e salva come sempre.
    const pdfImport = ref({ busy: false, error: '', summary: null });
    const DIET_IMPORT_ERRORS = {
      scan: 'Questo PDF sembra una scansione (un\'immagine): non riesco a leggere il testo. Se hai la versione Word o un PDF esportato dal computer, carica quello; altrimenti inserisci la dieta a mano qui sotto.',
      doc: 'Questo è un file Word del vecchio formato (.doc). Aprilo e salvalo come .docx o come PDF, poi caricalo di nuovo.',
      type: 'Il file deve essere un PDF o un documento Word (.docx).',
      big: 'Il file è troppo grande (massimo 20 MB). Prova a esportare solo le pagine della dieta.',
      empty: 'Non ho trovato pasti nel file. Puoi inserire la dieta a mano qui sotto.'
    };
    const importPlanPdf = async (event) => {
      const input = event.target;
      const file = input.files && input.files[0];
      input.value = '';
      if (!file) return;
      const kind = dietFileKind(file);
      if (!kind) {
        pdfImport.value = { busy: false, error: DIET_IMPORT_ERRORS.type, summary: null };
        return;
      }
      pdfImport.value = { busy: true, error: '', summary: null };
      try {
        const res = await importDietFile(file);
        if (res.error) {
          pdfImport.value = { busy: false, summary: null, error: DIET_IMPORT_ERRORS[res.error] || DIET_IMPORT_ERRORS.empty };
          return;
        }
        newPlanBuilder.value = { currentWeekIdx: 0, currentDay: 'Lunedì', weeks: res.weeks };
        if (!newPlanData.value.name.trim()) {
          newPlanData.value.name = file.name.replace(/\.(pdf|docx?)$/i, '').replace(/[_-]+/g, ' ').trim().slice(0, 40) || 'Dieta';
        }
        pdfImport.value = { busy: false, error: '', summary: { file: file.name, weeks: res.weeks.length, meals: res.meals, foods: res.foods, missing: res.missing } };
        goToBuilder();
      } catch (e) {
        console.error(e);
        pdfImport.value = { busy: false, summary: null, error: kind === 'pdf' && navigator.onLine === false
          ? 'Per leggere il PDF serve la connessione la prima volta. Riprova online o inserisci la dieta a mano.'
          : 'Non sono riuscito ad aprire il file. Se è protetto da password toglila e riprova, altrimenti inserisci la dieta a mano qui sotto.' };
      }
    };

    const addWeekToBuilder = () => newPlanBuilder.value.weeks.push(createEmptyWeek());
    
    const currentBuilderMeals = computed(() => {
       return newPlanBuilder.value.weeks[newPlanBuilder.value.currentWeekIdx].days[newPlanBuilder.value.currentDay];
    });

    const addMealToBuilder = () => {
       const currentDayMeals = newPlanBuilder.value.weeks[newPlanBuilder.value.currentWeekIdx].days[newPlanBuilder.value.currentDay];
       let nextType = mealTypes[0].id; // Predefinito: Colazione
       
       // Se ci sono già pasti in questo giorno, trova il tipo dell'ultimo inserito
       if (currentDayMeals.length > 0) {
         const lastMealType = currentDayMeals[currentDayMeals.length - 1].type;
         const lastIndex = mealTypes.findIndex(t => t.id === lastMealType);
         
         // Se non è l'ultimo tipo della lista, imposta quello successivo
         if (lastIndex !== -1 && lastIndex < mealTypes.length - 1) {
           nextType = mealTypes[lastIndex + 1].id;
         }
       }

       currentDayMeals.push({
         type: nextType, items: [''], calories: ''
       });
    };

    const removeMealFromBuilder = (idx) => {
       newPlanBuilder.value.weeks[newPlanBuilder.value.currentWeekIdx].days[newPlanBuilder.value.currentDay].splice(idx, 1);
    };

    // Stima delle calorie mentre si scrive il menù
    const builderMealEstimate = (meal) => estimateMealKcal(meal.items);
    const itemKcalLabel = (item) => {
      if (!item || !String(item).trim()) return '';
      const e = estimateFoodKcal(item);
      return e ? '≈' + e.kcal : '?';
    };

    const addSlotToMeal = (meal) => {
      meal.items.push('');
    };

    const removeSlotFromMeal = (meal, idx) => {
      meal.items.splice(idx, 1);
    };

    const isPlanBuilderComplete = computed(() => {
      if (!newPlanBuilder.value || !newPlanBuilder.value.weeks || newPlanBuilder.value.weeks.length === 0) return false;
      
      for (let wIdx = 0; wIdx < newPlanBuilder.value.weeks.length; wIdx++) {
        const week = newPlanBuilder.value.weeks[wIdx];
        for (let dIdx = 0; dIdx < weekDays.length; dIdx++) {
          const day = weekDays[dIdx];
          if (!week.days[day] || week.days[day].length === 0) {
            return false;
          }
        }
      }
      return true;
    });

    const executeSavePlan = () => {
      if (newPlanData.value.makeActive) {
        plans.value.forEach(p => {
          if (p.status === 'active') { p.status = 'inactive'; p.results = 'Terminato'; }
        });
      }

      // [NUOVO] Generazione dinamica Lista della Spesa da tutti gli alimenti inseriti!
      const uniqueItems = new Set();
      newPlanBuilder.value.weeks.forEach(week => {
        Object.values(week.days).forEach(dayMeals => {
          dayMeals.forEach(meal => {
            meal.items.forEach(item => {
              const trimmed = item.trim();
              if (trimmed) uniqueItems.add(trimmed);
            });
          });
        });
      });
      const generatedGroceryList = Array.from(uniqueItems);

      // Genera un menu "legacy compatibile" per il dettaglio prendendo i pasti del Lunedì della prima settimana
      const mockMealsForDetail = [];
      if (newPlanBuilder.value.weeks[0].days['Lunedì']) {
         newPlanBuilder.value.weeks[0].days['Lunedì'].forEach((m, i) => {
           const tInfo = mealTypes.find(t => t.id === m.type) || mealTypes[0];
           mockMealsForDetail.push({
             id: m.type + '_' + i, name: tInfo.label, icon: tInfo.icon,
             calories: normalizeCalories(m.calories) !== null ? normalizeCalories(m.calories) : (estimateMealKcal(m.items).kcal ?? '-'),
             description: m.items.filter(it => it.trim()!=='').join(', ') || 'Nessun dettaglio'
           });
         });
      }

      if (editingPlanId.value !== null) {
        // Modifica piano esistente
        const planToUpdate = plans.value.find(p => p.id === editingPlanId.value);
        if (planToUpdate) {
          planToUpdate.name = newPlanData.value.name;
          if (newPlanData.value.makeActive) {
            planToUpdate.status = 'active';
            planToUpdate.results = 'In corso';
          } else if (planToUpdate.status === 'active') {
            planToUpdate.status = 'inactive';
            planToUpdate.results = 'Terminato';
          }
          planToUpdate.startDate = newPlanData.value.startDate;
          planToUpdate.endDate = newPlanData.value.endDate;
          planToUpdate.grocery = generatedGroceryList.length > 0 ? generatedGroceryList : ['Nessun alimento inserito'];
          planToUpdate.weeks = JSON.parse(JSON.stringify(newPlanBuilder.value.weeks));
          planToUpdate.meals = mockMealsForDetail;
        }
        showToastMessage(`Piano "${newPlanData.value.name}" modificato con successo! ✏️`);
        editingPlanId.value = null; // Resetta stato
      } else {
        // Creazione nuovo piano
        const nextId = Math.max(...plans.value.map(p => p.id), 0) + 1;
        plans.value.unshift({
          id: nextId,
          name: newPlanData.value.name,
          status: newPlanData.value.makeActive ? 'active' : 'inactive',
          results: newPlanData.value.makeActive ? 'Appena Iniziato' : 'In Programma',
          startDate: newPlanData.value.startDate,
          endDate: newPlanData.value.endDate,
          grocery: generatedGroceryList.length > 0 ? generatedGroceryList : ['Nessun alimento inserito'],
          weeks: JSON.parse(JSON.stringify(newPlanBuilder.value.weeks)), // Salva struttura complessa
          meals: mockMealsForDetail // Fallback per le vecchie viste
        });
        showToastMessage(`Piano "${newPlanData.value.name}" creato con successo! 🚀`);
      }

      nutritionView.value = 'list';
    };

    const finalizeNewPlan = () => {
      // VALIDAZIONE: Controllo che tutti i giorni di tutte le settimane abbiano almeno un pasto
      let hasEmptyDays = false;
      let firstEmptyDayMsg = '';

      for (let wIdx = 0; wIdx < newPlanBuilder.value.weeks.length; wIdx++) {
        const week = newPlanBuilder.value.weeks[wIdx];
        for (let dIdx = 0; dIdx < weekDays.length; dIdx++) {
          const day = weekDays[dIdx];
          if (!week.days[day] || week.days[day].length === 0) {
            hasEmptyDays = true;
            firstEmptyDayMsg = `Settimana ${wIdx + 1}: manca il menù di ${day}.`;
            break;
          }
        }
        if (hasEmptyDays) break;
      }

      if (hasEmptyDays) {
        // Blocca il salvataggio se manca qualche giorno
        showToastMessage(`Devi inserire i pasti per tutta la settimana prima di salvare! 🛑 ${firstEmptyDayMsg}`);
        return;
      }

      // VALIDAZIONE: le calorie sono opzionali, ma se inserite devono essere numeriche
      for (let wIdx = 0; wIdx < newPlanBuilder.value.weeks.length; wIdx++) {
        const week = newPlanBuilder.value.weeks[wIdx];
        for (let dIdx = 0; dIdx < weekDays.length; dIdx++) {
          const day = weekDays[dIdx];
          const dayMeals = week.days[day] || [];
          for (let mIdx = 0; mIdx < dayMeals.length; mIdx++) {
            if (isInvalidNumber(dayMeals[mIdx].calories)) {
              showToastMessage(`Settimana ${wIdx + 1}, ${day}: calorie non valide nel pasto ${mIdx + 1}.`);
              return;
            }
          }
        }
      }

      // CONFERMA: Se tutto è compilato, chiedi conferma
      const confirmTitle = editingPlanId.value ? "Salva Modifiche" : "Salva Piano Definitivo";
      const confirmMsg = editingPlanId.value 
         ? "Sei sicuro di voler salvare le modifiche a questo piano?" 
         : "Hai completato l'inserimento? Sei sicuro di voler salvare e attivare questo nuovo piano?";
         
      showConfirm(confirmTitle, confirmMsg, () => {
           executeSavePlan();
      });
    };

    const promptDeletePlan = () => {
      showConfirm("Elimina Piano", "Sei sicuro di voler eliminare definitivamente questo piano? L'azione non è reversibile.", () => {
         deletePlan();
      });
    };

    const deletePlan = () => {
      if (editingPlanId.value !== null) {
        const index = plans.value.findIndex(p => p.id === editingPlanId.value);
        if (index > -1) {
          plans.value.splice(index, 1);
          showToastMessage(`Piano eliminato con successo. 🗑️`);
          editingPlanId.value = null;
          nutritionView.value = 'list';
        }
      }
    };

    const activePlan = computed(() => plans.value.find(p => p.status === 'active'));

    const normalizeCalories = (value) => {
      if (value === null || value === undefined || value === '') return null;
      const parsed = parseFloat(String(value).replace(',', '.'));
      return Number.isFinite(parsed) ? parsed : null;
    };

    // Trasforma i pasti del builder nel formato usato da dashboard e calendario.
    // Se le calorie non sono scritte, si stimano dagli alimenti (js/utils/calories.js)
    const mapDayMeals = (dayMeals) => {
      return (dayMeals || []).map((m, i) => {
        const typeInfo = mealTypes.find(t => t.id === m.type) || mealTypes[0];
        const written = normalizeCalories(m.calories);
        const auto = estimateMealKcal(m.items);
        const estimate = written === null ? auto.kcal : null;
        return {
          id: m.type + '_' + i,
          type: m.type,
          name: typeInfo.label,
          icon: typeInfo.icon,
          calories: written !== null ? written : estimate,
          caloriesEstimated: written === null && estimate !== null,
          protein: auto.protein,   // grammi stimati dagli alimenti (null se nessuno è riconosciuto)
          description: (m.items || []).filter(it => it && it.trim() !== '').join(', ') || 'Nessun dettaglio.'
        };
      });
    };

    // Menu del giorno per una data specifica del piano attivo
    const getMealsForDate = (date = new Date()) => {
      const plan = activePlan.value;
      if (!plan) return [];

      if (plan.weeks && plan.weeks.length > 0) {
        const day = new Date(date);
        day.setHours(0, 0, 0, 0);

        const startDate = new Date(plan.startDate + 'T00:00:00');
        if (Number.isNaN(startDate.getTime())) return [];
        if (day < startDate) return [];

        if (plan.endDate) {
          const endDate = new Date(plan.endDate + 'T00:00:00');
          if (!Number.isNaN(endDate.getTime()) && day > endDate) return [];
        }

        const diffDays = Math.floor((day.getTime() - startDate.getTime()) / 86400000);
        const weekIdx = Math.floor(diffDays / 7) % plan.weeks.length;
        const dayOfWeek = day.getDay();
        const mappedDay = dayOfWeek === 0 ? 'Domenica' : weekDays[dayOfWeek - 1];
        const dayMeals = plan.weeks[weekIdx]?.days?.[mappedDay] || [];
        return mapDayMeals(dayMeals);
      }

      // Fallback ai piani nel vecchio formato
      return (plan.meals || []).map((m, i) => ({
        id: m.id || 'pasto_' + i,
        type: m.id ? String(m.id).split('_')[0] : 'pasto',
        name: m.name || 'Pasto',
        icon: m.icon || '🍽️',
        calories: normalizeCalories(m.calories),
        description: m.description || ''
      }));
    };

    // Computed per Dashboard: pasti di oggi
    const todayActiveMeals = computed(() => getMealsForDate(new Date()));

    // ---------------------------------------------------------------
    // PASTI: check giornaliero, commenti e calendario dashboard
    // ---------------------------------------------------------------
    const mealLogs = ref(storage.load('still_meal_logs', {}));

    watch(mealLogs, (logs) => {
      storage.save('still_meal_logs', logs);
    }, { deep: true });

    // DIARIO ALIMENTARE: per chi non segue un piano (o per i fuori pasto di chi lo segue).
    // { 'YYYY-MM-DD': { colazione: { text, kcal, protein, manual, unknown }, pranzo: {…}, … } }
    const foodDiary = ref(storage.load('still_food_diary', {}));
    watch(foodDiary, (d) => storage.save('still_food_diary', d), { deep: true });
    const DIARY_MEALS = [
      { id: 'colazione', label: 'Colazione', icon: '🥣', from: 5 },
      { id: 'spuntino_mattina', label: 'Spuntino', icon: '🍏', from: 10 },
      { id: 'pranzo', label: 'Pranzo', icon: '🍝', from: 12 },
      { id: 'spuntino_pomeriggio', label: 'Merenda', icon: '🍌', from: 15.5 },
      { id: 'cena', label: 'Cena', icon: '🍽️', from: 19 },
      { id: 'extra', label: 'Fuori pasto', icon: '🍫', from: 99 }
    ];

    // Obiettivo calorico del diario: dal profilo (mantenere / dimagrire / crescere) o scritto a mano
    const diaryGoal = computed(() => (settings.value.diary && settings.value.diary.goal) || suggestedEatGoal.value);
    // Consumo reale (sezione CONSUMO REALE, più sotto): qui si legge da un contenitore perché è definito dopo
    const realExpHolder = shallowRef(null);
    const diaryTarget = computed(() => {
      const custom = settings.value.diary && Number(settings.value.diary.kcal);
      if (custom > 0) return { kcal: Math.round(custom), custom: true };
      const real = realExpHolder.value && realExpHolder.value.value;
      if (settings.value.diary && settings.value.diary.adaptive && real && real.ready) {
        const g = diaryGoal.value;
        return { kcal: g === 'lose' ? real.lose : g === 'gain' ? real.gain : real.tdee, adaptive: true };
      }
      const e = bodyStats.value.energy;
      if (!e) return { kcal: 2000, fallback: true };
      const g = diaryGoal.value;
      return { kcal: g === 'lose' ? e.lose : g === 'gain' ? e.gain : e.tdee };
    });
    const setDiaryGoal = (goal) => { settings.value.diary = { ...(settings.value.diary || {}), goal, kcal: null }; };
    const toggleDiaryAdaptive = () => {
      const d = settings.value.diary || {};
      settings.value.diary = { ...d, adaptive: !d.adaptive, kcal: null };
    };
    const setDiaryKcal = (value) => {
      const n = parseOptionalNumber(value);
      settings.value.diary = { ...(settings.value.diary || {}), kcal: n && n >= 800 && n <= 6000 ? Math.round(n) : null };
    };

    // Quello che hai mangiato in un giorno: pasti del piano segnati (fatti o "altro") + diario
    const dayIntake = (dateKey) => {
      const meals = getMealsForDate(new Date(dateKey + 'T00:00:00'));
      const logs = mealLogs.value[dateKey] || {};
      let kcal = 0, protein = 0, logged = 0, unknown = 0;
      meals.forEach(m => {
        const l = logs[m.id];
        if (!l) return;
        logged++;
        if (l.status === 'done') { kcal += m.calories || 0; protein += m.protein || 0; }
        else if (l.status === 'other') { if (l.kcal !== null && l.kcal !== undefined) kcal += l.kcal; else unknown++; protein += l.protein || 0; }
      });
      const diary = foodDiary.value[dateKey] || {};
      const entries = Object.keys(diary).filter(k => diary[k] && (diary[k].text || diary[k].kcal));
      entries.forEach(k => { const e = diary[k]; if (e.kcal !== null && e.kcal !== undefined) kcal += e.kcal; else unknown++; protein += e.protein || 0; });
      const planTarget = meals.reduce((s, m) => s + (m.calories || 0), 0);
      return {
        plan: meals.length > 0, meals, logs, diary, entries: entries.length, logged, unknown,
        kcal: Math.round(kcal), protein: Math.round(protein),
        target: meals.length && planTarget ? planTarget : diaryTarget.value.kcal
      };
    };
    // Colore delle calorie: verde entro l'obiettivo, viola fino al 10% in più, rosso oltre
    const intakeLevel = (kcal, target) => (!target ? 'ok' : kcal > target * 1.1 ? 'over' : kcal > target ? 'little' : 'ok');
    const intakeBarClass = (kcal, target) => ({ ok: 'bg-salvia', little: 'bg-viola', over: 'bg-red-500' })[intakeLevel(kcal, target)];
    const intakeTextClass = (kcal, target) => ({ ok: 'text-salvia', little: 'text-viola', over: 'text-red-500' })[intakeLevel(kcal, target)];
    // Pasto diverso dal piano: non è uno sgarro se sta nelle calorie del pasto (margine del 5% per le stime)
    // o se a fine giornata tutto il giorno sta nel totale del piano
    const kcalWithin = (kcal, planned) => kcal <= planned * 1.05 + 20;
    const otherMealWithin = (meal, log) => log && log.kcal !== null && log.kcal !== undefined && meal.calories
      && kcalWithin(log.kcal, meal.calories);

    const todayDateKey = computed(() => toISODate(new Date()));
    const todayMealLogs = computed(() => mealLogs.value[todayDateKey.value] || {});

    const mealProteinLabel = (meal) => (meal && meal.protein ? ' · ' + meal.protein + ' g prot' : '');

    // Proteine di oggi: quelle del menù e quelle dei pasti già segnati come fatti
    const todayProtein = computed(() => {
      const meals = todayActiveMeals.value.filter(m => m.protein !== null && m.protein !== undefined);
      if (!meals.length) return null;
      const planned = meals.reduce((sum, m) => sum + m.protein, 0);
      const eaten = meals.reduce((sum, m) => {
        const l = todayMealLogs.value[m.id] || {};
        return sum + (l.status === 'done' ? m.protein : l.status === 'other' ? (l.protein || 0) : 0);
      }, 0) + Object.values(foodDiary.value[todayDateKey.value] || {}).reduce((s, e) => s + ((e && e.protein) || 0), 0);
      return { planned, eaten };
    });

    // Si possono segnare solo pasti di oggi o dei giorni passati
    const isFutureDateKey = (dateKey) => !!dateKey && dateKey > todayDateKey.value;

    const cleanupMealLogsDay = (dateKey) => {
      const dayLogs = mealLogs.value[dateKey];
      if (dayLogs && Object.keys(dayLogs).length === 0) delete mealLogs.value[dateKey];
    };

    const mealLogFor = (dateKey, mealId) => mealLogs.value[dateKey]?.[mealId] || null;

    const setMealDone = (dateKey, meal) => {
      if (isFutureDateKey(dateKey)) {
        showToastMessage('Non puoi segnare pasti futuri. Puoi modificare solo oggi e i giorni passati.');
        return;
      }
      const dayLogs = mealLogs.value[dateKey] || {};
      if (dayLogs[meal.id]?.status === 'done') {
        delete dayLogs[meal.id];
      } else {
        dayLogs[meal.id] = { status: 'done', comment: '' };
      }
      mealLogs.value[dateKey] = dayLogs;
      cleanupMealLogsDay(dateKey);
    };

    const mealCommentModal = ref({
      isOpen: false, dateKey: '', mealId: '', mealName: '', dateLabel: '', text: '', hasExisting: false
    });

    const formatDayLabel = (dateKey) => {
      const [year, month, day] = dateKey.split('-').map(Number);
      return new Date(year, month - 1, day).toLocaleDateString('it-IT', {
        weekday: 'long', day: 'numeric', month: 'long'
      });
    };

    const promptSkipMeal = (dateKey, meal) => {
      if (isFutureDateKey(dateKey)) {
        showToastMessage('Non puoi segnare pasti futuri. Puoi modificare solo oggi e i giorni passati.');
        return;
      }
      const existing = mealLogFor(dateKey, meal.id);
      mealCommentModal.value = {
        isOpen: true,
        dateKey,
        mealId: meal.id,
        mealName: meal.name,
        dateLabel: formatDayLabel(dateKey),
        text: existing?.comment || '',
        mode: existing?.status === 'other' ? 'other' : existing?.status === 'skipped' ? 'skipped' : 'choose',
        food: existing?.status === 'other' ? (existing.text || '') : '',
        manualKcal: existing?.status === 'other' && existing.manual ? String(existing.kcal) : '',
        planned: meal.calories,
        hasExisting: existing?.status === 'skipped' || existing?.status === 'other'
      };
    };

    const saveMealSkip = () => {
      const modal = mealCommentModal.value;
      const dayLogs = mealLogs.value[modal.dateKey] || {};
      dayLogs[modal.mealId] = { status: 'skipped', comment: modal.text.trim() };
      mealLogs.value[modal.dateKey] = dayLogs;
      mealCommentModal.value.isOpen = false;
    };

    // "Ho mangiato altro": stima dal testo (o calorie scritte a mano) e verdetto
    const mealOffEstimate = computed(() => (mealCommentModal.value.isOpen && mealCommentModal.value.mode === 'other'
      ? estimateFoodText(mealCommentModal.value.food) : { items: [], kcal: null, protein: null, unknown: 0 }));
    const mealOffKcal = computed(() => {
      const manual = parseOptionalNumber(mealCommentModal.value.manualKcal);
      return manual !== null && manual >= 0 ? Math.round(manual) : mealOffEstimate.value.kcal;
    });
    const mealOffVerdict = computed(() => {
      const kcal = mealOffKcal.value, planned = mealCommentModal.value.planned;
      if (kcal === null) return { tone: 'none', text: 'Scrivi cosa hai mangiato (o le calorie) e ti dico se rientra.' };
      if (!planned) return { tone: 'none', text: 'Il piano non ha le calorie di questo pasto: conterà sul totale della giornata.' };
      if (kcal <= planned) return { tone: 'ok', text: 'Rientra nelle calorie del pasto (≈ ' + kcal + ' su ' + planned + ' kcal): non è uno sgarro 👍' };
      if (kcalWithin(kcal, planned)) return { tone: 'ok', text: '≈ ' + kcal + ' kcal contro ' + planned + ': praticamente uguale, non è uno sgarro 👍' };
      return { tone: 'over', text: '≈ ' + kcal + ' kcal, ' + (kcal - planned) + ' più del previsto. Non conta come sgarro solo se a fine giornata rientri nel totale del piano.' };
    });
    const saveMealOther = () => {
      const modal = mealCommentModal.value;
      const text = (modal.food || '').trim();
      const manual = parseOptionalNumber(modal.manualKcal);
      if (!text && manual === null) { showToastMessage('Scrivi cosa hai mangiato oppure le calorie.'); return; }
      const dayLogs = mealLogs.value[modal.dateKey] || {};
      dayLogs[modal.mealId] = {
        status: 'other', comment: '', text,
        kcal: mealOffKcal.value, protein: mealOffEstimate.value.protein,
        manual: manual !== null
      };
      mealLogs.value[modal.dateKey] = dayLogs;
      mealCommentModal.value.isOpen = false;
    };

    // --- Diario: scrivere un pasto ---
    const diaryEditor = ref({ isOpen: false, dateKey: '', slot: 'pranzo', text: '', manualKcal: '' });
    const diaryMealInfo = (slot) => DIARY_MEALS.find(m => m.id === slot) || DIARY_MEALS[0];
    const openDiaryEditor = (dateKey, slot) => {
      if (isFutureDateKey(dateKey)) { showToastMessage('Puoi scrivere solo quello che hai già mangiato (oggi o nei giorni passati).'); return; }
      const e = (foodDiary.value[dateKey] || {})[slot];
      diaryEditor.value = { isOpen: true, dateKey, slot, text: e ? e.text || '' : '', manualKcal: e && e.manual ? String(e.kcal) : '', existing: !!e };
    };
    // Pasto da proporre in base all'ora (in home: "Aggiungi")
    const diarySlotNow = () => {
      const h = new Date().getHours() + new Date().getMinutes() / 60;
      let slot = 'colazione';
      DIARY_MEALS.forEach(m => { if (m.from <= h) slot = m.id; });
      return slot;
    };
    const diaryEstimate = computed(() => (diaryEditor.value.isOpen ? estimateFoodText(diaryEditor.value.text) : { items: [], kcal: null, protein: null, unknown: 0 }));
    const diaryEditorKcal = computed(() => {
      const manual = parseOptionalNumber(diaryEditor.value.manualKcal);
      return manual !== null && manual >= 0 ? Math.round(manual) : diaryEstimate.value.kcal;
    });
    const saveDiaryEntry = () => {
      const ed = diaryEditor.value;
      const text = (ed.text || '').trim();
      const manual = parseOptionalNumber(ed.manualKcal);
      if (!text && manual === null) { deleteDiaryEntry(); return; }
      const day = { ...(foodDiary.value[ed.dateKey] || {}) };
      day[ed.slot] = { text, kcal: diaryEditorKcal.value, protein: diaryEstimate.value.protein, manual: manual !== null, unknown: diaryEstimate.value.unknown };
      foodDiary.value[ed.dateKey] = day;
      diaryEditor.value.isOpen = false;
    };
    const deleteDiaryEntry = () => {
      const ed = diaryEditor.value;
      const day = { ...(foodDiary.value[ed.dateKey] || {}) };
      delete day[ed.slot];
      if (Object.keys(day).length) foodDiary.value[ed.dateKey] = day; else delete foodDiary.value[ed.dateKey];
      diaryEditor.value.isOpen = false;
    };
    // Pasti che scrivi spesso: un tocco e sono segnati
    const diaryFrequent = computed(() => {
      if (!diaryEditor.value.isOpen) return [];
      const slot = diaryEditor.value.slot;
      const count = (onlySlot) => {
        const map = {};
        Object.keys(foodDiary.value).sort().forEach(dateKey => {
          const day = foodDiary.value[dateKey] || {};
          Object.keys(day).forEach(s => {
            const e = day[s];
            if (!e || !e.text || (onlySlot && s !== slot)) return;
            const key = e.text.trim().toLowerCase();
            map[key] = { text: e.text.trim(), kcal: e.kcal, n: ((map[key] && map[key].n) || 0) + 1, last: dateKey };
          });
        });
        return Object.values(map).sort((a, b) => b.n - a.n || b.last.localeCompare(a.last));
      };
      let list = count(true);
      if (list.length < 3) list = list.concat(count(false).filter(x => !list.some(y => y.text.toLowerCase() === x.text.toLowerCase())));
      return list.filter(x => x.text.toLowerCase() !== (diaryEditor.value.text || '').trim().toLowerCase()).slice(0, 6);
    });
    const useDiaryFrequent = (item) => { diaryEditor.value.text = item.text; diaryEditor.value.manualKcal = ''; };

    // --- Diario: la giornata e la settimana ---
    const diaryDate = ref(toISODate(new Date()));
    const diaryShift = (days) => {
      const d = new Date(diaryDate.value + 'T00:00:00');
      d.setDate(d.getDate() + days);
      const key = toISODate(d);
      if (key > todayDateKey.value) return;
      diaryDate.value = key;
    };
    // "Come ieri": copia i pasti del giorno prima negli spazi ancora vuoti
    const diaryPrevKey = (key) => { const d = new Date(key + 'T00:00:00'); d.setDate(d.getDate() - 1); return toISODate(d); };
    const diaryHas = (e) => !!(e && (e.text || e.kcal));
    const diaryCopySource = (key) => {
      const from = diaryPrevKey(key);
      const src = foodDiary.value[from] || {};
      const dest = foodDiary.value[key] || {};
      const slots = DIARY_MEALS.map(m => m.id).filter(k => diaryHas(src[k]) && !diaryHas(dest[k]));
      if (!slots.length) return null;
      return { from, slots, kcal: slots.reduce((s, k) => s + (src[k].kcal || 0), 0), unknown: slots.some(k => src[k].kcal === null || src[k].kcal === undefined) };
    };
    const copyDiaryFromPrev = (key) => {
      const info = diaryCopySource(key);
      if (!info || isFutureDateKey(key)) return;
      const src = foodDiary.value[info.from];
      const dest = { ...(foodDiary.value[key] || {}) };
      info.slots.forEach(k => { dest[k] = { ...src[k], copied: true }; });
      foodDiary.value[key] = dest;
    };
    const diaryDay = computed(() => {
      const info = dayIntake(diaryDate.value);
      return { ...info, status: dayStatusFor(new Date(diaryDate.value + 'T00:00:00')), label: diaryDate.value === todayDateKey.value ? 'Oggi' : formatDayLabel(diaryDate.value) };
    });
    const diaryWeek = computed(() => {
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i);
        const key = toISODate(d);
        const info = dayIntake(key);
        const tracked = info.entries > 0 || info.logged > 0;
        days.push({
          key, tracked, kcal: info.kcal, target: info.target, status: tracked ? dayStatusFor(d) : 'empty',
          letter: d.toLocaleDateString('it-IT', { weekday: 'narrow' }).toUpperCase(),
          pct: tracked && info.target ? Math.min(100, Math.round(info.kcal / (info.target * 1.25) * 100)) : 0
        });
      }
      const tracked = days.filter(d => d.tracked);
      // Media solo sulle giornate complete (con pranzo e cena): quelle a metà la abbasserebbero
      const complete = tracked.filter(d => d.status !== 'partial');
      return {
        days,
        avg: complete.length ? Math.round(complete.reduce((s, d) => s + d.kcal, 0) / complete.length / 10) * 10 : null,
        good: tracked.filter(d => d.status === 'perfect').length,
        tracked: tracked.length
      };
    });
    const openDiary = (dateKey) => {
      activeTab.value = 'nutrition';
      nutritionView.value = 'diary';
      diaryDate.value = dateKey || todayDateKey.value;
    };


    const clearMealStatus = () => {
      const modal = mealCommentModal.value;
      if (mealLogs.value[modal.dateKey]) {
        delete mealLogs.value[modal.dateKey][modal.mealId];
        cleanupMealLogsDay(modal.dateKey);
      }
      mealCommentModal.value.isOpen = false;
    };

    const dayStatusFor = (date) => {
      const dateKey = toISODate(date);
      const info = dayIntake(dateKey);
      if (info.plan) {
        if (!info.logged && !info.entries) return 'empty';
        const allLogged = info.logged === info.meals.length;
        // Giornata intera nel totale del piano: i pasti cambiati non contano come sgarro
        const withinDay = allLogged && info.unknown === 0 && info.kcal <= info.target * 1.05;
        let cheats = 0;
        info.meals.forEach(m => {
          const l = info.logs[m.id];
          if (!l) return;
          if (l.status === 'skipped') cheats++;
          else if (l.status === 'other' && !withinDay && !otherMealWithin(m, l)) cheats++;
        });
        // Fuori pasto che fanno sforare il totale del giorno
        if (info.entries && !withinDay && info.kcal > info.target * 1.1) cheats++;
        if (cheats === 0 && allLogged) return 'perfect';
        if (cheats === 1) return 'small_cheat';
        if (cheats >= 2) return 'cheat';
        return 'partial';
      }
      // Diario: conta il totale delle calorie
      if (!info.entries) return 'empty';
      const level = intakeLevel(info.kcal, info.target);
      if (level === 'over') return 'cheat';
      if (level === 'little') return 'small_cheat';
      // Senza pranzo e cena la giornata non è completa: non si giudica (chi non segna tutto non "mangia poco")
      if (!info.diary.pranzo || !info.diary.cena) return 'partial';
      // Molto sotto il fabbisogno (solo per i giorni finiti): non è "perfetto"
      if (dateKey < todayDateKey.value && info.kcal < info.target * 0.6) return 'under';
      return 'perfect';
    };

    const dayStatusLabel = (status) => {
      return {
        perfect: 'Giornata perfetta',
        small_cheat: 'Piccolo sgarro',
        cheat: 'Giornata di sgarro',
        partial: 'Giornata parziale',
        under: 'Hai mangiato poco',
        empty: 'Non tracciata'
      }[status] || 'Non tracciata';
    };

    const dayStatusClasses = (status) => {
      return {
        perfect: 'bg-salvia/10 text-salvia',
        small_cheat: 'bg-viola/10 text-viola',
        cheat: 'bg-red-50 text-red-500',
        partial: 'bg-gray-100 text-gray-400',
        under: 'bg-amber-50 text-amber-600',
        empty: 'bg-gray-100 text-gray-400'
      }[status] || 'bg-gray-100 text-gray-400';
    };

    // Calorie reali di oggi: pasti del piano fatti (o cambiati) + diario
    const todayIntake = computed(() => dayIntake(todayDateKey.value));
    const todayConsumedCalories = computed(() => todayIntake.value.kcal);
    const todayTargetCalories = computed(() => todayIntake.value.target);

    const todayCaloriesPct = computed(() => {
      if (todayTargetCalories.value <= 0) return 0;
      return Math.min(100, Math.round((todayConsumedCalories.value / todayTargetCalories.value) * 100));
    });

    // Calendario dashboard (mese indipendente da quello della nutrizione)
    const dashToday = new Date();
    const dashYear = ref(dashToday.getFullYear());
    const dashMonth = ref(dashToday.getMonth());

    const dashMonthName = computed(() => {
      return new Intl.DateTimeFormat('it-IT', { month: 'long' }).format(new Date(dashYear.value, dashMonth.value, 1));
    });

    const dashDaysInMonth = computed(() => new Date(dashYear.value, dashMonth.value + 1, 0).getDate());

    const dashFirstDayOfMonth = computed(() => {
      const firstDay = new Date(dashYear.value, dashMonth.value, 1).getDay();
      return firstDay === 0 ? 6 : firstDay - 1;
    });

    const dashPrevMonth = () => {
      if (dashMonth.value === 0) { dashMonth.value = 11; dashYear.value--; }
      else dashMonth.value--;
    };

    const dashNextMonth = () => {
      if (dashMonth.value === 11) { dashMonth.value = 0; dashYear.value++; }
      else dashMonth.value++;
    };

    const dashIsToday = (day) => {
      return day === dashToday.getDate()
        && dashMonth.value === dashToday.getMonth()
        && dashYear.value === dashToday.getFullYear();
    };

    const dashboardDayStatus = (day) => dayStatusFor(new Date(dashYear.value, dashMonth.value, day));

    const dashHasTraining = (day) => hasTrainingOnDateKey(`${dashYear.value}-${String(dashMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);

    const dashboardDayClasses = (day) => {
      const status = dashboardDayStatus(day);
      const ring = dashHasTraining(day) ? 'ring-2 ring-arancione' : '';
      if (status === 'perfect') return 'bg-salvia text-white shadow-sm ' + ring;
      if (status === 'small_cheat') return 'bg-viola text-white shadow-sm ' + ring;
      if (status === 'cheat') return 'bg-red-500 text-white shadow-sm ' + ring;
      if (status === 'under') return 'bg-amber-100 text-amber-700 ' + ring;
      if (dashIsToday(day)) return 'bg-gray-100 text-salvia font-extrabold ' + (ring || 'ring-2 ring-salvia/20');
      return 'text-gray-600 hover:bg-gray-50 ' + ring;
    };

    // Calendario nutrizione: sincronizzato con il calendario dashboard
    const nutritionDayStatus = (day) => dayStatusFor(new Date(currentYear.value, currentMonth.value, day));

    const nutritionHasTraining = (day) => hasTrainingOnDateKey(`${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);

    const nutritionDayClasses = (day) => {
      const status = nutritionDayStatus(day);
      const ring = nutritionHasTraining(day) ? 'ring-2 ring-arancione' : '';
      if (status === 'perfect') return 'bg-salvia text-white shadow-sm ' + ring;
      if (status === 'small_cheat') return 'bg-viola text-white shadow-sm ' + ring;
      if (status === 'cheat') return 'bg-red-500 text-white shadow-sm ' + ring;
      if (status === 'under') return 'bg-amber-100 text-amber-700 ' + ring;
      if (isToday(day)) return 'bg-gray-100 text-salvia font-extrabold ' + (ring || 'ring-2 ring-salvia/20');
      if (isSunday(day)) return 'text-salvia bg-salvia/5 hover:bg-salvia/10 ' + ring;
      return 'text-gray-600 hover:bg-gray-50 ' + ring;
    };

    // Nota su un giorno del calendario dashboard (stesso archivio del calendario nutrizione)
    const dashHasComment = (day) => !!commentsMap.value[`${dashYear.value}-${dashMonth.value}-${day}`];

    // Modale con il menu di uno specifico giorno
    const dayMenuModal = ref({ isOpen: false, date: null, dateKey: '' });

    const openDayMenuForDate = (date) => {
      const normalized = new Date(date);
      normalized.setHours(0, 0, 0, 0);
      dayMenuModal.value = {
        isOpen: true,
        date: normalized,
        dateKey: toISODate(normalized)
      };
    };

    const openDayMenu = (day) => {
      openDayMenuForDate(new Date(dashYear.value, dashMonth.value, day));
    };

    const closeDayMenu = () => {
      dayMenuModal.value.isOpen = false;
    };

    const dayMenuMeals = computed(() => {
      if (!dayMenuModal.value.isOpen || !dayMenuModal.value.date) return [];
      return getMealsForDate(dayMenuModal.value.date);
    });

    // Nota del giorno selezionato: stesso archivio del calendario nutrizione
    const dayMenuNote = computed(() => {
      if (!dayMenuModal.value.isOpen || !dayMenuModal.value.date) return '';
      const d = dayMenuModal.value.date;
      return commentsMap.value[`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`] || '';
    });

    // Allenamenti del giorno selezionato (sincronizzati col calendario Allenamento)
    const dayMenuTrainingSessions = computed(() => {
      if (!dayMenuModal.value.isOpen || !dayMenuModal.value.dateKey) return [];
      return trainingSessionsOnDateKey(dayMenuModal.value.dateKey);
    });

    const dayMenuLogs = computed(() => {
      if (!dayMenuModal.value.isOpen) return {};
      return mealLogs.value[dayMenuModal.value.dateKey] || {};
    });

    const dayMenuStatus = computed(() => {
      if (!dayMenuModal.value.isOpen || !dayMenuModal.value.date) return 'empty';
      return dayStatusFor(dayMenuModal.value.date);
    });

    const goToTodayNutrition = () => {
      activeTab.value = 'nutrition';
      if (!activePlan.value || !todayActiveMeals.value.length) {
        openDiary();
        return;
      }
      selectedPlan.value = activePlan.value;
      selectedNutritionDay.value = todayWeekDay;
      nutritionView.value = 'detail';
      openDayMenuForDate(new Date());
    };
    
    const checklistItems = ref([]);

    // [NUOVO] Calcola solo la spesa di domani
    const getTomorrowGrocery = (plan) => {
      if (!plan) return [];
      
      if (plan.weeks && plan.weeks.length > 0) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const startDate = new Date(plan.startDate);
        startDate.setHours(0, 0, 0, 0);

        let weeksElapsed = 0;
        if (tomorrow >= startDate) {
           const diffTime = tomorrow.getTime() - startDate.getTime();
           const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
           weeksElapsed = Math.floor(diffDays / 7);
        }

        const weekIdx = weeksElapsed % plan.weeks.length;
        const dayOfWeek = tomorrow.getDay(); // 0 Domenica, 1 Lunedì...
        const mappedDay = dayOfWeek === 0 ? 'Domenica' : weekDays[dayOfWeek - 1];

        const tomorrowMeals = plan.weeks[weekIdx].days[mappedDay] || [];
        const seenItems = new Set();
        const items = [];
        tomorrowMeals.forEach(meal => {
           const typeInfo = mealTypes.find(t => t.id === meal.type) || mealTypes[0];
           (meal.items || []).forEach(item => {
              const trimmed = item.trim();
              if (trimmed && !seenItems.has(trimmed)) {
                 seenItems.add(trimmed);
                 items.push({ name: trimmed, icon: typeInfo.icon });
              }
           });
        });
        return items;
      }
      return (plan.grocery || []).map(name => ({ name, icon: '🍽️' })); // legacy fallback
    };

    const openGroceryModal = () => {
       const itemsForTomorrow = getTomorrowGrocery(activePlan.value);
       
       // Mantiene la spunta sugli elementi che avevi già checkato prima di chiudere la modale
       const currentChecked = new Set(checklistItems.value.filter(i => i.checked).map(i => i.name));
       
       checklistItems.value = itemsForTomorrow.map(item => ({
           name: item.name,
           icon: item.icon,
           checked: currentChecked.has(item.name)
       }));
       
       if(checklistItems.value.length === 0) {
          showToastMessage("Nessun pasto programmato per domani. Giornata libera!");
          return;
       }

       groceryModal.value.isOpen = true;
    };
    
    const sortedPlans = computed(() => {
      return [...plans.value].sort((a, b) => {
        if (a.status === 'active') return -1;
        if (b.status === 'active') return 1;
        return b.id - a.id;
      });
    });

    const selectedPlanTotalCalories = computed(() => {
      if (!selectedPlan.value) return 0;
      return (selectedPlan.value.meals || []).reduce((sum, meal) => {
        const calories = Number(meal.calories);
        return sum + (Number.isFinite(calories) ? calories : 0);
      }, 0);
    });

    // Pasti del giorno selezionato nella vista dettaglio (usa la settimana in rotazione odierna)
    const selectedPlanDayMeals = computed(() => {
      const plan = selectedPlan.value;
      if (!plan) return [];
      if (plan.weeks && plan.weeks.length > 0) {
        const now = new Date(); now.setHours(0, 0, 0, 0);
        const startDate = new Date((plan.startDate || '') + 'T00:00:00');
        let weekIdx = 0;
        if (!Number.isNaN(startDate.getTime()) && now >= startDate) {
          const diffDays = Math.floor((now.getTime() - startDate.getTime()) / 86400000);
          weekIdx = Math.floor(diffDays / 7) % plan.weeks.length;
        }
        return mapDayMeals(plan.weeks[weekIdx]?.days?.[selectedNutritionDay.value] || []);
      }
      return plan.meals || [];
    });

    const selectedPlanDayProtein = computed(() => {
      const list = selectedPlanDayMeals.value.filter(m => m.protein !== null && m.protein !== undefined);
      return list.length ? list.reduce((sum, m) => sum + m.protein, 0) : null;
    });

    const selectedPlanDayCalories = computed(() => {
      return selectedPlanDayMeals.value.reduce((sum, meal) => {
        const calories = Number(meal.calories);
        return sum + (Number.isFinite(calories) ? calories : 0);
      }, 0);
    });

    const openPlan = (plan) => {
      selectedPlan.value = plan;
      selectedNutritionDay.value = todayWeekDay;
      nutritionView.value = 'detail';
    };

    const formatDate = (dateStr) => {
      const d = new Date(dateStr);
      return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
    };

    const formatDateParts = (dateStr) => {
      const d = new Date(String(dateStr) + 'T00:00:00');
      if (Number.isNaN(d.getTime())) return { day: '--', month: '---', weekday: '', year: '' };
      const months = ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC'];
      const weekdays = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
      return {
        day: String(d.getDate()).padStart(2, '0'),
        month: months[d.getMonth()],
        weekday: weekdays[d.getDay()],
        year: String(d.getFullYear())
      };
    };

    // Clipboard Sharing
    const copyToClipboard = async (text, successMsg) => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          let textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        showToastMessage(successMsg);
      } catch (err) {
        console.error('Failed to copy: ', err);
        showToastMessage("Errore durante la copia.");
      }
    };

    const sharePendingGrocery = () => {
      const pending = checklistItems.value.filter(item => !item.checked).map(item => `${item.icon || '🍽️'} ${item.name}`);
      if(pending.length === 0) {
         showToastMessage("Hai già tutto! Frigo al completo. 🚀");
         groceryModal.value.isOpen = false;
         return;
      }
      const text = `🛒 *Spesa STILL - Mancanti*\n\nMi manca da comprare:\n- ${pending.join('\n- ')}\n\nIl frigo piange, aiutiamolo! 🏃‍♂️💨`;
      copyToClipboard(text, "Lista della spesa (da comprare) copiata negli appunti!");
      groceryModal.value.isOpen = false;
    };

    // Tasto "Il frigo è pronto": quando tutta la checklist è spuntata
    const allGroceryChecked = computed(() => checklistItems.value.length > 0 && checklistItems.value.every(item => item.checked));

    const shareGroceryReady = () => {
      // Nessuna copia: frigo al completo, si chiude solo la checklist
      groceryModal.value.isOpen = false;
      showToastMessage("Il tuo frigo è pronto! 🧊");
    };

    // Plan Actions
    const promptTerminatePlan = () => {
      showConfirm("Termina Piano", "Sei sicuro di voler terminare il piano attualmente attivo?", () => {
         selectedPlan.value.status = 'inactive';
         selectedPlan.value.results = 'Terminato';
         showToastMessage("Piano terminato con successo.");
      });
    };

    const reactivatePlan = (planToActivate) => {
      const currentActive = plans.value.find(p => p.status === 'active');
      if (currentActive) {
        showToastMessage("C'è un piano già attivo. Disattivalo prima di poterne attivare uno nuovo.");
        return;
      }
      planToActivate.status = 'active';
      planToActivate.results = 'In corso';
      showToastMessage(`Piano "${planToActivate.name}" riattivato.`);
    };


    // ---------------------------------------------------------------
    // PROGRESSI: misurazioni corpo + carichi allenamento
    // ---------------------------------------------------------------
    const measurements = ref(storage.load('still_measurements', []));

    // Auto-salvataggio delle misurazioni nella memoria del telefono
    watch(measurements, (newMeasurements) => {
      storage.save('still_measurements', newMeasurements);
    }, { deep: true });

    // Log allenamenti: la sezione Allenamento scriverà qui le sessioni delle schede.
    // Formato consigliato: { id, date, sheetId, sheetName, exerciseId, exerciseName, weight, reps }
    const workoutLogs = ref(storage.load('still_workout_logs', []));

    watch(workoutLogs, (newLogs) => {
      storage.save('still_workout_logs', newLogs);
    }, { deep: true });

    // Migrazione: i vecchi carichi inseriti dalla scheda misurazione diventano log allenamento
    const legacyWorkoutEntries = measurements.value.filter(m => m.exercise && m.load !== null && m.load !== undefined);
    if (legacyWorkoutEntries.length > 0) {
      const existingLogIds = new Set(workoutLogs.value.map(log => log.id));
      legacyWorkoutEntries.forEach(entry => {
        if (!existingLogIds.has('legacy_' + entry.id)) {
          workoutLogs.value.push({
            id: 'legacy_' + entry.id,
            date: entry.date,
            exerciseName: entry.exercise,
            weight: entry.load,
            reps: entry.reps
          });
        }
        entry.exercise = '';
        entry.load = null;
        entry.reps = null;
      });
    }

    // ---------------------------------------------------------------
    // ALLENAMENTO: schede, giorni, esercizi e progressi
    // ---------------------------------------------------------------
    const workoutSheets = ref(storage.load('still_workout_sheets', []));

    watch(workoutSheets, (sheets) => {
      storage.save('still_workout_sheets', sheets);
    }, { deep: true });

    // ---------------------------------------------------------------
    // CALENDARIO ALLENAMENTI: sport e sessioni in palestra
    // ---------------------------------------------------------------
    const trainingSports = ['Calcio', 'Pallavolo', 'Basket', 'Lotta', 'Tennis', 'Padel', 'Nuoto', 'Corsa', 'Ciclismo', 'Boxe', 'Rugby', 'Arti marziali', 'Altro'];
    const trainingWeekdays = [
      { label: 'L', value: 1 }, { label: 'M', value: 2 }, { label: 'M', value: 3 },
      { label: 'G', value: 4 }, { label: 'V', value: 5 }, { label: 'S', value: 6 }, { label: 'D', value: 0 }
    ];

    const trainingSessions = ref(storage.load('still_training_sessions', []));

    watch(trainingSessions, (sessions) => {
      storage.save('still_training_sessions', sessions);
    }, { deep: true });

    const trainingToday = new Date();
    const trainingYear = ref(trainingToday.getFullYear());
    const trainingMonth = ref(trainingToday.getMonth());

    const trainingMonthName = computed(() => new Intl.DateTimeFormat('it-IT', { month: 'long' }).format(new Date(trainingYear.value, trainingMonth.value, 1)));
    const trainingDaysInMonth = computed(() => new Date(trainingYear.value, trainingMonth.value + 1, 0).getDate());
    const trainingFirstDayOfMonth = computed(() => {
      const firstDay = new Date(trainingYear.value, trainingMonth.value, 1).getDay();
      return firstDay === 0 ? 6 : firstDay - 1;
    });

    const trainingPrevMonth = () => {
      if (trainingMonth.value === 0) { trainingMonth.value = 11; trainingYear.value--; }
      else trainingMonth.value--;
    };
    const trainingNextMonth = () => {
      if (trainingMonth.value === 11) { trainingMonth.value = 0; trainingYear.value++; }
      else trainingMonth.value++;
    };

    const trainingDateKey = (day) => `${trainingYear.value}-${String(trainingMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const trainingSessionOccursOn = (session, dateKey) => {
      if (!session) return false;
      if (!session.recurring) return session.date === dateKey;
      if (session.date && dateKey < session.date) return false;
      if (session.endDate && dateKey > session.endDate) return false;
      const d = new Date(dateKey + 'T00:00:00');
      return (session.weekdays || []).includes(d.getDay());
    };

    const trainingSessionsOnDateKey = (dateKey) => trainingSessions.value
      .filter(session => trainingSessionOccursOn(session, dateKey))
      .sort((a, b) => (a.time || '').localeCompare(b.time || ''));

    const trainingSessionsForDay = (day) => trainingSessionsOnDateKey(trainingDateKey(day));

    const hasTrainingOnDateKey = (dateKey) => trainingSessions.value.some(session => trainingSessionOccursOn(session, dateKey));

    const trainingHasSessions = (day) => trainingSessionsForDay(day).length > 0;

    const trainingIsToday = (day) => day === trainingToday.getDate()
      && trainingMonth.value === trainingToday.getMonth()
      && trainingYear.value === trainingToday.getFullYear();

    const trainingDayClasses = (day) => {
      if (trainingHasSessions(day)) return 'bg-arancione text-white shadow-sm';
      if (trainingIsToday(day)) return 'bg-arancione/10 text-arancione font-extrabold ring-2 ring-arancione/20';
      return 'text-gray-600 hover:bg-gray-50';
    };

    // Durata di uno sport (minuti) da orario di inizio e fine; passa la mezzanotte se la fine è prima dell'inizio
    const hhmmToMin = (v) => {
      const m = /^(\d{1,2}):(\d{2})$/.exec(v || '');
      return m ? Number(m[1]) * 60 + Number(m[2]) : null;
    };
    const sportDurationMin = (session) => {
      if (!session) return 0;
      const a = hhmmToMin(session.time), b = hhmmToMin(session.endTime);
      if (a === null || b === null || a === b) return 0;
      return b > a ? b - a : b + 1440 - a;
    };
    // Orologio che avanza ogni minuto: serve per capire se l'allenamento di oggi è già iniziato o finito
    const clockNow = ref(Date.now());
    const SESSION_DEFAULT_MIN = 90;   // durata se non c'è l'orario di fine
    const nowMinutesOf = (ms) => { const d = new Date(ms); return d.getHours() * 60 + d.getMinutes(); };
    // Orario non ancora arrivato oggi (es. allenamento alle 17:30 e sono le 10)
    const timeIsAhead = (hhmm) => { const m = hhmmToMin(hhmm); return m !== null && m > nowMinutesOf(clockNow.value); };
    // Allenamento di oggi già finito? (fine indicata, altrimenti inizio + 1h30)
    const sessionEndedToday = (session) => {
      const start = hhmmToMin(session && session.time);
      if (start === null) return false;
      return start + (sportDurationMin(session) || SESSION_DEFAULT_MIN) <= nowMinutesOf(clockNow.value);
    };
    // I carichi aggiornati oggi nella scheda contano come allenamento solo se oggi non c'è una palestra
    // in programma ancora da confermare: puoi sistemare i pesi la mattina e andarci la sera.
    const todayLogsCount = computed(() => {
      const today = toISODate(new Date(clockNow.value));
      return !trainingSessionsOnDateKey(today).some(s => s.kind === 'gym'
        && !(s.report && s.date === today) && !(s.statusByDate && s.statusByDate[today] === 'done'));
    });
    const logCountsAsTraining = (log) => !!log.date && (log.date !== toISODate(new Date(clockNow.value)) || todayLogsCount.value);

    // "18:00–19:30" per gli sport con orario di fine, altrimenti solo l'inizio
    const sessionTimeLabel = (session) => {
      if (!session || !session.time) return '';
      return session.kind === 'sport' && session.endTime ? session.time + '–' + session.endTime : session.time;
    };
    // Durata stimata quando manca l'orario di fine (o l'allenamento è stato registrato solo con i carichi)
    const DEFAULT_TRAINING_MIN = 60;
    // Secondi di allenamento tra due date (incluse), contando solo ciò che è stato fatto:
    // palestra = durata dell'allenamento guidato, oppure inizio→fine se segnata a mano, oppure 1h stimata
    // per i giorni con carichi registrati; sport = inizio→fine (o 1h) per ogni giorno segnato "fatto"
    const trainingSecondsBetween = (start, end) => {
      let gym = 0, sport = 0;
      const gymDays = new Set();
      const inRange = (key) => key && key >= start && key <= end;
      trainingSessions.value.forEach(s => {
        if (s.kind === 'gym' && inRange(s.date)) {
          if (s.report) { gym += s.report.totalSeconds || 0; gymDays.add(s.date); }
          else if (s.statusByDate && s.statusByDate[s.date] === 'done') {
            gym += (sportDurationMin(s) || DEFAULT_TRAINING_MIN) * 60;
            gymDays.add(s.date);
          }
          return;
        }
        if (s.kind === 'sport' && s.statusByDate) {
          const min = sportDurationMin(s) || DEFAULT_TRAINING_MIN;
          Object.entries(s.statusByDate).forEach(([key, status]) => {
            if (status === 'done' && inRange(key)) sport += min * 60;
          });
        }
      });
      // Giorni di palestra registrati solo con i carichi (senza sessione nel calendario)
      new Set(workoutLogs.value.map(log => log.date).filter(inRange)).forEach(key => {
        if (!gymDays.has(key)) gym += DEFAULT_TRAINING_MIN * 60;
      });
      return { gym, sport, total: gym + sport };
    };

    // Ore di allenamento per la scheda Progressi: questa settimana, questo mese e da sempre
    const trainingTimeSummary = computed(() => {
      const today = toISODate();
      const week = new Date(); week.setHours(12, 0, 0, 0); week.setDate(week.getDate() - ((week.getDay() + 6) % 7));
      const month = new Date(); month.setHours(12, 0, 0, 0); month.setDate(1);
      const all = trainingSecondsBetween('0000-01-01', today);
      return {
        week: trainingSecondsBetween(toISODate(week), today).total,
        month: trainingSecondsBetween(toISODate(month), today).total,
        total: all.total, gym: all.gym, sport: all.sport
      };
    });

    const trainingSessionLabel = (session) => {
      if (!session) return '';
      return session.kind === 'gym' ? (session.sheetName || 'Palestra') : (session.sport || 'Sport');
    };

    const trainingSessionSubtitle = (session) => {
      if (!session) return '';
      if (session.kind === 'gym') return 'Palestra' + (session.dayName ? ' • ' + session.dayName : '');
      return 'Sport' + (session.recurring ? ' • ogni settimana' : '');
    };

    const formatDateLong = (dateStr) => {
      const d = new Date(String(dateStr) + 'T00:00:00');
      if (Number.isNaN(d.getTime())) return String(dateStr);
      const label = new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: 'numeric', month: 'long' }).format(d);
      return label.charAt(0).toUpperCase() + label.slice(1);
    };

    const upcomingTrainingSessions = computed(() => {
      const out = [];
      const base = new Date();
      base.setHours(0, 0, 0, 0);
      for (let offset = 0; offset < 60 && out.length < 12; offset++) {
        const d = new Date(base);
        d.setDate(base.getDate() + offset);
        const key = toISODate(d);
        trainingSessions.value.forEach(session => {
          if (trainingSessionOccursOn(session, key)) {
            out.push({ ...session, occurrenceDate: key });
          }
        });
      }
      return out
        .sort((a, b) => (a.occurrenceDate + (a.time || '')).localeCompare(b.occurrenceDate + (b.time || '')))
        .slice(0, 12);
    });

    const trainingDayModal = ref({ isOpen: false, dateKey: '', dateLabel: '' });
    const openTrainingDay = (day) => {
      const key = trainingDateKey(day);
      trainingDayModal.value = { isOpen: true, dateKey: key, dateLabel: formatDateLong(key) };
    };
    const closeTrainingDay = () => { trainingDayModal.value.isOpen = false; };

    const trainingDaySessions = computed(() => {
      if (!trainingDayModal.value.isOpen) return [];
      return trainingSessions.value
        .filter(session => trainingSessionOccursOn(session, trainingDayModal.value.dateKey))
        .sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    });

    const trainingFormModal = ref({ isOpen: false, editingId: null, fromDate: '', pastStatus: '', date: '', time: '18:00', endTime: '19:30', kind: 'gym', sport: 'Calcio', weekdays: [], recurring: true, sheetId: null, dayName: '', note: '', error: '' });

    const openTrainingForm = (dateKey, session = null, fromDate = '') => {
      if (session) {
        trainingFormModal.value = {
          isOpen: true,
          editingId: session.id,
          // Giorno da cui si è aperta la modifica: i cambi d'orario valgono da lì in avanti
          fromDate: fromDate || '',
          date: session.date || toISODate(),
          time: session.time || '18:00',
          endTime: session.endTime || '',
          pastStatus: (!session.recurring && session.statusByDate && session.statusByDate[session.date]) || '',
          kind: session.kind || 'gym',
          sport: session.sport || 'Calcio',
          weekdays: (session.weekdays || []).slice(),
          recurring: !!session.recurring,
          sheetId: session.sheetId !== undefined && session.sheetId !== null ? session.sheetId : ((activeSheet.value || workoutSheets.value[0] || {}).id ?? null),
          dayName: session.dayName || '',
          note: session.note || '',
          error: ''
        };
        return;
      }
      const date = dateKey || toISODate();
      const firstSheet = activeSheet.value || workoutSheets.value[0];
      const weekday = new Date(date + 'T00:00:00').getDay();
      trainingFormModal.value = {
        isOpen: true,
        editingId: null,
        fromDate: '',
        date,
        time: '18:00',
        endTime: '19:30',
        pastStatus: '',
        kind: firstSheet ? 'gym' : 'sport',
        sport: 'Calcio',
        weekdays: [weekday],
        recurring: true,
        sheetId: firstSheet ? firstSheet.id : null,
        dayName: firstSheet ? suggestSheetDay(firstSheet, date) : '',
        note: '',
        error: ''
      };
    };

    // Giorni della scheda (A, B, Gambe...) per il calendario: nome mostrato, anche se il giorno non ce l'ha
    const sheetDayLabel = (day, i) => ((day && day.name) || '').trim() || ('Giorno ' + (i + 1));
    const sheetDayByLabel = (sheet, label) => {
      const days = (sheet && sheet.days) || [];
      const i = days.findIndex((d, k) => sheetDayLabel(d, k) === label);
      return i > -1 ? days[i] : (days.length === 1 ? days[0] : null);
    };
    // Quale giorno della scheda è stato fatto in una data (dal calendario o dagli esercizi registrati)
    const sheetDayDoneOn = (sheet, dateKey) => {
      const s = trainingSessions.value.find(x => x.kind === 'gym' && String(x.sheetId) === String(sheet.id) && x.date === dateKey && x.dayName);
      if (s) return s.dayName;
      const ids = new Set(workoutLogs.value.filter(l => l.date === dateKey).map(l => String(l.exerciseId)));
      const days = sheet.days || [];
      const i = days.findIndex(day => (day.exercises || []).some(e => ids.has(String(e.id))));
      return i > -1 ? sheetDayLabel(days[i], i) : '';
    };
    // Proposta: il giorno dopo l'ultimo fatto prima di quella data (A → B → C → A...)
    const suggestSheetDay = (sheet, dateKey) => {
      const days = (sheet && sheet.days) || [];
      if (!days.length) return '';
      if (days.length === 1) return sheetDayLabel(days[0], 0);
      const dates = new Set();
      workoutLogs.value.forEach(l => { if (l.date && l.date < dateKey) dates.add(l.date); });
      trainingSessions.value.forEach(x => { if (x.kind === 'gym' && String(x.sheetId) === String(sheet.id) && x.date < dateKey) dates.add(x.date); });
      for (const d of [...dates].sort().reverse().slice(0, 15)) {
        const name = sheetDayDoneOn(sheet, d);
        const i = days.findIndex((day, k) => sheetDayLabel(day, k) === name);
        if (i > -1) return sheetDayLabel(days[(i + 1) % days.length], (i + 1) % days.length);
      }
      return sheetDayLabel(days[0], 0);
    };
    const trainingFormSheetDays = computed(() => {
      const sheet = workoutSheets.value.find(item => String(item.id) === String(trainingFormModal.value.sheetId));
      return ((sheet && sheet.days) || []).map((d, i) => sheetDayLabel(d, i));
    });
    // Cambiando scheda nel modulo: proponi il giorno giusto di quella scheda
    watch(() => trainingFormModal.value.isOpen && trainingFormModal.value.sheetId, () => {
      const form = trainingFormModal.value;
      if (!form.isOpen || form.kind !== 'gym') return;
      if (trainingFormSheetDays.value.includes(form.dayName)) return;
      const sheet = workoutSheets.value.find(item => String(item.id) === String(form.sheetId));
      form.dayName = sheet ? suggestSheetDay(sheet, form.date || toISODate()) : '';
    });

    const editTrainingSession = (session, fromDate = '') => {
      if (!session) return;
      openTrainingForm(session.date || toISODate(), session, fromDate);
    };

    const closeTrainingForm = () => { trainingFormModal.value.isOpen = false; };

    const setTrainingKind = (kind) => {
      const form = trainingFormModal.value;
      form.kind = kind;
      form.error = '';
      if (kind === 'sport' && (!form.weekdays || !form.weekdays.length)) {
        form.weekdays = [new Date(form.date + 'T00:00:00').getDay()];
      }
    };

    const toggleTrainingWeekday = (value) => {
      const list = trainingFormModal.value.weekdays;
      const idx = list.indexOf(value);
      if (idx > -1) list.splice(idx, 1);
      else list.push(value);
    };

    const saveTrainingSession = () => {
      const form = trainingFormModal.value;
      if (!form.date) { form.error = 'Scegli una data.'; return; }
      if (form.endTime && form.endTime === form.time) { form.error = "L'orario di fine deve essere diverso dall'inizio."; return; }
      const today = toISODate();
      const previous = form.editingId ? trainingSessions.value.find(item => item.id === form.editingId) : null;
      const base = {
        id: form.editingId || newTrainingId(),
        date: form.date,
        time: form.time || '',
        endTime: form.time ? (form.endTime || '') : '',
        kind: form.kind,
        sport: '',
        sheetId: null,
        sheetName: '',
        dayName: '',
        note: (form.note || '').trim(),
        recurring: false,
        weekdays: []
      };
      if (previous && previous.statusByDate) base.statusByDate = { ...previous.statusByDate };
      if (previous && previous.report) { base.report = previous.report; base.completed = previous.completed; }
      if (previous && previous.endDate) base.endDate = previous.endDate;
      if (form.kind === 'gym') {
        const sheet = workoutSheets.value.find(item => String(item.id) === String(form.sheetId));
        if (!sheet) { form.error = 'Crea prima una scheda per la palestra.'; return; }
        base.sheetId = sheet.id;
        base.sheetName = sheet.name;
        base.dayName = form.dayName || '';
      } else {
        if (!form.sport) { form.error = 'Scegli uno sport.'; return; }
        base.sport = form.sport;
        if (form.recurring) {
          if (!form.weekdays.length) { form.error = 'Scegli almeno un giorno della settimana.'; return; }
          base.recurring = true;
          base.weekdays = form.weekdays.slice();
        }
      }
      // Singolo allenamento passato (o di oggi): com'è andata
      if (!base.recurring) {
        const map = {};
        if (form.date <= today && form.pastStatus && !(form.date === today && timeIsAhead(form.time))) map[form.date] = form.pastStatus;
        base.statusByDate = map;
      }

      // Cambio di giorni/orari di una serie già iniziata: lo storico resta com'era.
      // Le nuove impostazioni valgono dal giorno da cui si è aperta la modifica (se futuro), altrimenti da oggi
      const splitFrom = form.fromDate && form.fromDate > today ? form.fromDate : today;
      const scheduleChanged = previous && previous.recurring && base.recurring
        && (!previous.endDate || previous.endDate >= splitFrom)
        && previous.date < splitFrom && form.date === previous.date
        && (previous.time !== base.time || (previous.endTime || '') !== base.endTime || previous.sport !== base.sport
          || [...(previous.weekdays || [])].sort().join() !== [...base.weekdays].sort().join());
      if (scheduleChanged) {
        // Se oggi è già stato segnato sulla vecchia serie, quella vale fino a oggi e la nuova parte da domani
        const keepToday = splitFrom === today && !!(previous.statusByDate && previous.statusByDate[today]) && trainingSessionOccursOn(previous, today);
        const cut = new Date(splitFrom + 'T12:00:00');
        if (!keepToday) cut.setDate(cut.getDate() - 1);
        const endKey = toISODate(cut);
        const next = new Date(cut); next.setDate(next.getDate() + 1);
        const oldMap = {}, newMap = {};
        Object.entries(previous.statusByDate || {}).forEach(([k, v]) => { (k <= endKey ? oldMap : newMap)[k] = v; });
        previous.endDate = endKey;
        previous.statusByDate = oldMap;
        trainingSessions.value.push({ ...base, id: newTrainingId(), date: toISODate(next), statusByDate: newMap });
        form.isOpen = false;
        showToastMessage(splitFrom > today
          ? 'Nuovi orari attivi dal ' + formatDate(toISODate(next)) + '. 🗓️ I giorni prima restano come sono.'
          : 'Nuovi orari attivi da oggi. 🗓️ I giorni passati restano come prima.');
        return;
      }

      let saved = base;
      if (previous) {
        const idx = trainingSessions.value.findIndex(item => item.id === form.editingId);
        if (idx > -1) trainingSessions.value[idx] = base;
        saved = trainingSessions.value[idx] || base;
      } else {
        trainingSessions.value.push(base);
        saved = trainingSessions.value[trainingSessions.value.length - 1];
      }
      form.isOpen = false;
      // Serie che parte nel passato: chiedi subito com'è andata nei giorni già trascorsi
      if (saved.recurring && pastOccurrences(saved).some(o => !o.status)) {
        openPastChecks(saved);
        return;
      }
      showToastMessage(previous ? 'Allenamento aggiornato. ✏️' : 'Allenamento aggiunto al calendario. 🗓️');
    };

    const newTrainingId = () => 'ts_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

    // Giorni passati (fino a oggi) di una serie, dal più recente; massimo 120
    const pastOccurrences = (session) => {
      const out = [];
      const today = toISODate();
      const d = new Date(); d.setHours(12, 0, 0, 0);
      let guard = 0;
      while (out.length < 120 && guard++ < 800) {
        const key = toISODate(d);
        if (session.date && key < session.date) break;
        if (key <= today && trainingSessionOccursOn(session, key)) {
          out.push({ dateKey: key, status: (session.statusByDate && session.statusByDate[key]) || '' });
        }
        d.setDate(d.getDate() - 1);
      }
      return out;
    };

    // Segna in blocco i giorni passati di uno sport
    const pastChecksModal = ref({ isOpen: false, sessionId: null, items: [] });
    const openPastChecks = (session) => {
      pastChecksModal.value = { isOpen: true, sessionId: session.id, items: pastOccurrences(session) };
    };
    const pastChecksSession = computed(() => trainingSessions.value.find(s => s.id === pastChecksModal.value.sessionId) || null);
    const setPastCheck = (item, status) => { item.status = item.status === status ? '' : status; };
    const setAllPastChecks = (status) => { pastChecksModal.value.items.forEach(item => { if (!item.status) item.status = status; }); };
    const openPastFromCheck = () => {
      const session = sportCheckSession.value;
      closeSportCheck();
      if (session) openPastChecks(session);
    };
    const openPastFromForm = () => {
      const session = trainingSessions.value.find(s => s.id === trainingFormModal.value.editingId);
      if (!session) return;
      trainingFormModal.value.isOpen = false;
      openPastChecks(session);
    };
    const savePastChecks = () => {
      const session = pastChecksSession.value;
      if (session) {
        const map = { ...(session.statusByDate || {}) };
        pastChecksModal.value.items.forEach(item => {
          if (item.status) map[item.dateKey] = item.status;
          else delete map[item.dateKey];
        });
        session.statusByDate = map;
      }
      pastChecksModal.value.isOpen = false;
      showToastMessage('Storico aggiornato. 💪');
    };

    const removeTrainingSession = (session) => {
      const message = session.recurring
        ? "Vuoi eliminare l'intera serie settimanale di " + trainingSessionLabel(session) + '?'
        : 'Vuoi eliminare ' + trainingSessionLabel(session) + ' del ' + formatDate(session.date) + '?';
      showConfirm('Elimina allenamento', message, () => {
        const idx = trainingSessions.value.findIndex(item => item.id === session.id);
        if (idx > -1) trainingSessions.value.splice(idx, 1);
        showToastMessage('Allenamento eliminato. 🗑️');
      });
    };

    const openSheetForTraining = (session) => {
      const sheet = workoutSheets.value.find(item => String(item.id) === String(session.sheetId));
      if (!sheet) return;
      trainingDayModal.value.isOpen = false;
      openSheet(sheet);
    };

    const workoutView = ref('list'); // 'list' | 'detail' | 'builder'
    const selectedSheet = ref(null);
    const selectedSheetDayIdx = ref(0);
    const editingSheetId = ref(null);
    const newSheet = ref({ name: '', days: [] });

    const dayLetter = (idx) => String.fromCharCode(65 + (idx % 26));

    const createEmptyDay = (name) => ({ name, exercises: [] });

    const createEmptyExercise = () => ({
      id: 'ex_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      type: 'strength', name: '', weight: '', rest: '', sets: '', reps: '',
      duration: '', intensity: '', superset: '', pyramid: false, setsDetail: []
    });

    const startNewSheet = () => {
      editingSheetId.value = null;
      newSheet.value = { name: '', days: [createEmptyDay('Giorno A')] };
      workoutView.value = 'builder';
    };

    const editSheet = (sheet) => {
      editingSheetId.value = sheet.id;
      newSheet.value = JSON.parse(JSON.stringify({ name: sheet.name, days: sheet.days }));
      workoutView.value = 'builder';
    };

    const addSheetDay = () => {
      newSheet.value.days.push(createEmptyDay('Giorno ' + dayLetter(newSheet.value.days.length)));
    };

    const removeSheetDay = (idx) => newSheet.value.days.splice(idx, 1);

    const addExercise = (day) => day.exercises.push(createEmptyExercise());

    const removeExercise = (day, idx) => {
      const removed = day.exercises[idx];
      day.exercises.splice(idx, 1);
      if (removed && removed.superset) {
        const remaining = day.exercises.filter(item => item.superset === removed.superset);
        if (remaining.length < 2) remaining.forEach(item => { item.superset = ''; });
      }
    };

    // --- Superserie: coppia di 2 esercizi diversi, senza pausa ---
    const addSupersetPair = (day, idx) => {
      const first = day.exercises[idx];
      if (!first) return;
      const key = 'ss_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
      first.superset = key;
      const second = createEmptyExercise();
      second.type = first.type;
      second.superset = key;
      day.exercises.splice(idx + 1, 0, second);
    };

    const removeSuperset = (day, idx) => {
      const exercise = day.exercises[idx];
      if (!exercise || !exercise.superset) return;
      const key = exercise.superset;
      day.exercises.forEach(item => {
        if (item.superset === key) item.superset = '';
      });
    };

    const supersetPairCount = (day, exercise) => {
      if (!day || !exercise || !exercise.superset) return 0;
      return day.exercises.filter(item => item.superset === exercise.superset).length;
    };

    const totalSheetExercises = (sheet) => (sheet.days || []).reduce((sum, day) => sum + (day.exercises || []).length, 0);

    const saveSheet = () => {
      const draft = newSheet.value;
      if (!draft.name.trim()) return showToastMessage("Dai un nome alla scheda!");
      if (!draft.days.length) return showToastMessage("Aggiungi almeno un giorno alla scheda.");

      for (const day of draft.days) {
        if (!day.name.trim()) return showToastMessage("Ogni giorno deve avere un nome.");
        if (!day.exercises.length) return showToastMessage('Aggiungi almeno un esercizio in "' + day.name + '".');
        for (const ex of day.exercises) {
          if (!ex.name.trim()) return showToastMessage('Completa il nome di tutti gli esercizi in "' + day.name + '".');
          if (ex.type === 'strength' && ex.pyramid) {
            const sets = ex.setsDetail || [];
            if (!sets.length) return showToastMessage('Configura le serie piramidali di "' + ex.name + '".');
            if (!sets.some(set => parseOptionalNumber(set.weight) !== null)) return showToastMessage('Inserisci almeno un peso nelle serie di "' + ex.name + '".');
            if (sets.some(set => isInvalidNumber(set.weight))) return showToastMessage('Peso non valido nelle serie di "' + ex.name + '".');
          }
          if (ex.type === 'strength' && isInvalidNumber(ex.weight)) return showToastMessage('Peso non valido in "' + ex.name + '".');
          if (ex.type === 'strength' && isInvalidNumber(ex.rest)) return showToastMessage('Recupero non valido in "' + ex.name + '".');
          if (ex.type === 'cardio' && isInvalidNumber(ex.duration)) return showToastMessage('Durata non valida in "' + ex.name + '".');
        }
      }

      const cleaned = {
        name: draft.name.trim(),
        days: draft.days.map(day => ({
          name: day.name.trim(),
          exercises: day.exercises.map(ex => ({
            id: ex.id || ('ex_' + Date.now() + '_' + Math.floor(Math.random() * 1000)),
            type: ex.type,
            name: ex.name.trim(),
            weight: ex.type === 'strength' ? (parseOptionalNumber(ex.weight) ?? '') : '',
            rest: ex.type === 'strength' ? (parseOptionalNumber(ex.rest) ?? '') : '',
            sets: ex.type === 'strength' ? (ex.pyramid ? String((ex.setsDetail || []).length) : ex.sets) : '',
            reps: ex.type === 'strength' && !ex.pyramid ? ex.reps : '',
            duration: ex.type === 'cardio' ? (parseOptionalNumber(ex.duration) ?? '') : '',
            intensity: ex.type === 'cardio' ? ex.intensity : '',
            superset: (ex.superset || '').trim(),
            pyramid: ex.type === 'strength' ? !!ex.pyramid : false,
            setsDetail: ex.type === 'strength' && ex.pyramid
              ? (ex.setsDetail || []).map(set => ({
                  weight: parseOptionalNumber(set.weight) ?? '',
                  reps: (set.reps || '').trim()
                }))
              : []
          }))
        }))
      };

      if (editingSheetId.value !== null) {
        const target = workoutSheets.value.find(sheet => sheet.id === editingSheetId.value);
        if (target) {
          Object.assign(target, cleaned);
          if (selectedSheet.value && selectedSheet.value.id === target.id) selectedSheet.value = target;
        }
        editingSheetId.value = null;
        showToastMessage('Scheda "' + cleaned.name + '" aggiornata! ✏️');
      } else {
        const nextId = Math.max(Date.now(), ...workoutSheets.value.map(sheet => (Number(sheet.id) || 0) + 1));
        workoutSheets.value.unshift({ id: nextId, createdAt: toISODate(), ...cleaned });
        showToastMessage('Scheda "' + cleaned.name + '" creata! 💪');
      }

      newSheet.value = { name: '', days: [] };
      workoutView.value = 'list';
    };

    const deleteSheetById = (sheetId) => {
      const idx = workoutSheets.value.findIndex(sheet => sheet.id === sheetId);
      if (idx > -1) workoutSheets.value.splice(idx, 1);
      if (String(settings.value.activeSheetId) === String(sheetId)) settings.value.activeSheetId = null;
      if (selectedSheet.value && selectedSheet.value.id === sheetId) {
        selectedSheet.value = null;
        workoutView.value = 'list';
      }
    };

    const promptDeleteSheet = () => {
      if (editingSheetId.value === null) return;
      const sheetId = editingSheetId.value;
      showConfirm("Elimina Scheda", "Sei sicuro di voler eliminare questa scheda? I progressi già registrati resteranno nello storico.", () => {
        deleteSheetById(sheetId);
        editingSheetId.value = null;
        workoutView.value = 'list';
        showToastMessage("Scheda eliminata. 🗑️");
      });
    };

    const promptDeleteSelectedSheet = () => {
      if (!selectedSheet.value) return;
      const sheetId = selectedSheet.value.id;
      showConfirm("Elimina Scheda", "Sei sicuro di voler eliminare questa scheda? I progressi già registrati resteranno nello storico.", () => {
        deleteSheetById(sheetId);
        showToastMessage("Scheda eliminata. 🗑️");
      });
    };

    const openSheet = (sheet) => {
      selectedSheet.value = sheet;
      selectedSheetDayIdx.value = activeSheet.value && activeSheet.value.id === sheet.id ? activeSheetNext.value.idx : 0;
      workoutView.value = 'detail';
    };

    // Scheda attiva: quella che stai seguendo ora (settings.activeSheetId, finisce nel backup).
    // Il prossimo giorno è quello dopo l'ultimo fatto; se l'hai fatto oggi resta quello di oggi.
    const activeSheet = computed(() => {
      const id = settings.value.activeSheetId;
      return id == null ? null : workoutSheets.value.find(sheet => String(sheet.id) === String(id)) || null;
    });
    const isActiveSheet = (sheet) => !!sheet && !!activeSheet.value && String(activeSheet.value.id) === String(sheet.id);
    const activeSheetNext = computed(() => {
      const sheet = activeSheet.value;
      if (!sheet || !sheet.days.length) return { idx: 0, day: null, doneToday: false, lastDate: null, upcoming: null };
      let last = null;
      workoutLogs.value.forEach(log => {
        if (String(log.sheetId ?? '') !== String(sheet.id) || !log.date) return;
        if (!last || log.date > last.date || (log.date === last.date && (Number(log.id) || 0) > (Number(last.id) || 0))) last = log;
      });
      const lastIdx = last ? sheet.days.findIndex(day => day.name === last.dayName) : -1;
      const doneToday = !!last && last.date === toISODate() && lastIdx > -1;
      const idx = lastIdx < 0 ? 0 : doneToday ? lastIdx : (lastIdx + 1) % sheet.days.length;
      // upcoming: il giorno della prossima sessione (se oggi l'hai già fatta, quello dopo)
      const upcoming = sheet.days[doneToday ? (idx + 1) % sheet.days.length : idx];
      return { idx, day: sheet.days[idx], doneToday, lastDate: last ? last.date : null, upcoming };
    });
    const sortedWorkoutSheets = computed(() => {
      const active = activeSheet.value;
      return active ? [active, ...workoutSheets.value.filter(sheet => sheet !== active)] : workoutSheets.value;
    });
    const toggleActiveSheet = (sheet) => {
      if (isActiveSheet(sheet)) {
        settings.value.activeSheetId = null;
        showToastMessage('"' + sheet.name + '" non è più la scheda attiva.');
      } else {
        settings.value.activeSheetId = sheet.id;
        showToastMessage('"' + sheet.name + '" è la tua scheda attiva! 💪 La trovi in home con il giorno da fare.');
      }
    };
    // Dalla home: apre la scheda attiva sul giorno giusto e prepara la sessione
    const startActiveSheet = () => {
      const sheet = activeSheet.value;
      if (!sheet) return goTrainNow();
      activeTab.value = 'allenamento';
      openSheet(sheet);
      openSessionPreview();
    };

    // ---------------------------------------------------------------
    // GUIDA ESERCIZI (js/data/exercises.js): per chi si allena senza personal trainer.
    // Esercizi per muscolo (palestra o casa), esercizi mirati per sport e programmi pronti;
    // si scelgono e si aggiungono a una scheda esistente o nuova.
    // ---------------------------------------------------------------
    const EXERCISE_BY_ID = {};
    EXERCISE_LIBRARY.forEach(item => { EXERCISE_BY_ID[item.id] = item; });
    const EXERCISE_BY_NAME = {};
    EXERCISE_LIBRARY.forEach(item => { EXERCISE_BY_NAME[item.n.trim().toLowerCase()] = item; });

    const guide = ref({ isOpen: false, tab: 'muscle', muscle: 'petto', place: 'gym', sport: '', selected: [], picker: false, sheetId: 'new', dayIdx: 0, newName: '' });

    // Sport dell'utente (dal calendario) prima degli altri
    const userSports = computed(() => {
      const mine = [];
      trainingSessions.value.forEach(s => { if (s.kind === 'sport' && s.sport && SPORT_PROGRAMS[s.sport] && !mine.includes(s.sport)) mine.push(s.sport); });
      return mine;
    });
    const guideSports = computed(() => [...userSports.value, ...Object.keys(SPORT_PROGRAMS).filter(s => !userSports.value.includes(s))]);

    const openGuide = (tab = 'muscle', extra = {}) => {
      guide.value = {
        ...guide.value, isOpen: true, tab, selected: [], picker: false,
        sport: guide.value.sport || userSports.value[0] || 'Calcio',
        place: workoutSheets.value.length ? guide.value.place : 'home',
        ...extra
      };
    };
    const closeGuide = () => { guide.value.isOpen = false; guide.value.picker = false; };
    const setGuideTab = (tab) => { guide.value.tab = tab; guide.value.selected = []; guide.value.picker = false; };

    // In palestra si possono fare anche gli esercizi a corpo libero: se quelli da palestra sono pochi, si aggiungono
    const guideExercises = computed(() => {
      const g = guide.value;
      if (g.tab === 'sport') {
        const program = SPORT_PROGRAMS[g.sport];
        const list = program ? (program[g.place] || program.home) : [];
        return list.map(item => ({ ...EXERCISE_BY_ID[item.id], why: item.why })).filter(item => item.id);
      }
      if (g.tab !== 'muscle') return [];
      const own = EXERCISE_LIBRARY.filter(item => item.m === g.muscle && item.w === g.place);
      if (g.place === 'gym' && own.length < 5) return [...own, ...EXERCISE_LIBRARY.filter(item => item.m === g.muscle && item.w === 'home')];
      return own;
    });

    const guidePrescription = (item) => {
      if (!item) return '';
      if (item.t === 'cardio') return item.d + ' min · ' + item.i;
      return item.s + ' × ' + item.r + (item.rec ? ' · rec. ' + item.rec + 's' : '');
    };

    const toggleGuideSelect = (id) => {
      const list = guide.value.selected;
      const i = list.indexOf(id);
      if (i > -1) list.splice(i, 1); else list.push(id);
    };
    const selectAllGuide = () => {
      const all = guideExercises.value.map(item => item.id);
      guide.value.selected = guide.value.selected.length === all.length ? [] : all;
    };

    // Esercizio della libreria → esercizio di una scheda
    const libraryToExercise = (item) => {
      const ex = createEmptyExercise();
      ex.name = item.n;
      if (item.t === 'cardio') {
        ex.type = 'cardio';
        ex.duration = item.d;
        ex.intensity = item.i || '';
      } else {
        ex.type = 'strength';
        ex.sets = String(item.s);
        ex.reps = String(item.r);
        ex.rest = item.rec || '';
      }
      return ex;
    };

    const guideDefaultName = () => {
      const g = guide.value;
      if (g.tab === 'sport') return g.sport + ' · Preparazione';
      const muscle = MUSCLE_GROUPS.find(m => m.id === g.muscle);
      return (muscle ? muscle.name : 'Allenamento') + (g.place === 'home' ? ' · Casa' : ' · Palestra');
    };
    const guideDayName = () => {
      const g = guide.value;
      if (g.tab === 'sport') return g.sport;
      const muscle = MUSCLE_GROUPS.find(m => m.id === g.muscle);
      return muscle ? muscle.name : 'Giorno A';
    };

    const openGuidePicker = () => {
      if (!guide.value.selected.length) return;
      const first = workoutSheets.value[0];
      guide.value.picker = true;
      guide.value.sheetId = first ? first.id : 'new';
      guide.value.dayIdx = 0;
      guide.value.newName = guideDefaultName();
    };
    const guidePickerSheet = computed(() => workoutSheets.value.find(sheet => sheet.id === guide.value.sheetId) || null);

    const confirmGuideAdd = () => {
      const g = guide.value;
      const items = g.selected.map(id => EXERCISE_BY_ID[id]).filter(Boolean);
      if (!items.length) return;
      let sheet;
      if (g.sheetId === 'new') {
        const name = (g.newName || '').trim() || guideDefaultName();
        const nextId = Math.max(Date.now(), ...workoutSheets.value.map(item => (Number(item.id) || 0) + 1));
        sheet = { id: nextId, createdAt: toISODate(), name, days: [{ name: guideDayName(), exercises: items.map(libraryToExercise) }] };
        workoutSheets.value.unshift(sheet);
        sheet = workoutSheets.value[0];
      } else {
        sheet = guidePickerSheet.value;
        if (!sheet) return;
        if (g.dayIdx === 'new') sheet.days.push({ name: guideDayName(), exercises: [] });
        const day = g.dayIdx === 'new' ? sheet.days[sheet.days.length - 1] : sheet.days[g.dayIdx];
        if (!day) return;
        const existing = new Set(day.exercises.map(ex => (ex.name || '').trim().toLowerCase()));
        items.forEach(item => { if (!existing.has(item.n.toLowerCase())) day.exercises.push(libraryToExercise(item)); });
      }
      closeGuide();
      openSheet(sheet);
      showToastMessage(items.length + (items.length === 1 ? ' esercizio aggiunto' : ' esercizi aggiunti') + ' a "' + sheet.name + '". Nella scheda puoi cambiare serie, ripetizioni e pesi. 💪');
    };

    // Programma pronto → nuova scheda
    const createProgramSheet = (program) => {
      const nextId = Math.max(Date.now(), ...workoutSheets.value.map(item => (Number(item.id) || 0) + 1));
      workoutSheets.value.unshift({
        id: nextId, createdAt: toISODate(), name: program.name,
        days: program.days.map(day => ({ name: day.name, exercises: day.ex.map(id => EXERCISE_BY_ID[id]).filter(Boolean).map(libraryToExercise) }))
      });
      closeGuide();
      openSheet(workoutSheets.value[0]);
      showToastMessage('Scheda "' + program.name + '" creata! Inserisci i pesi la prima volta che la fai. 💪');
    };
    const programExerciseNames = (day) => day.ex.map(id => (EXERCISE_BY_ID[id] || {}).n).filter(Boolean).join(' · ');

    // Nome scritto → esercizio della libreria, anche se scritto diverso (js/import/workout-text.js):
    // "Leg extension a gamba singola" → Leg extension (variante), "Pressa 45°" → Leg press (stesso esercizio)
    const libMatchCache = new Map();
    const libraryMatch = (name) => {
      const key = String(name || '').trim().toLowerCase();
      if (!key) return null;
      if (!libMatchCache.has(key)) {
        if (libMatchCache.size > 500) libMatchCache.clear();
        libMatchCache.set(key, EXERCISE_BY_NAME[key] ? { item: EXERCISE_BY_NAME[key], kind: 'same' } : matchExerciseName(name, EXERCISE_LIBRARY));
      }
      return libMatchCache.get(key);
    };
    const libraryItem = (name) => { const m = libraryMatch(name); return m ? m.item : null; };
    const matchLibraryName = libraryItem;

    // Mentre scrivi una scheda: se il nome è nella libreria, completa serie, ripetizioni e recupero vuoti
    const fillFromLibrary = (ex) => {
      const item = libraryItem(ex.name);
      if (!item) return;
      if (item.t === 'cardio') {
        if (ex.type !== 'cardio') return;
        if (!ex.duration) ex.duration = item.d;
        if (!ex.intensity) ex.intensity = item.i || '';
      } else {
        if (ex.type !== 'strength') return;
        if (!ex.sets) ex.sets = String(item.s);
        if (!ex.reps) ex.reps = String(item.r);
        if (!ex.rest) ex.rest = item.rec || '';
      }
    };
    const libraryTip = (name) => {
      const item = libraryItem(name);
      return item ? item.tip : '';
    };

    // Importa scheda (js/import/workout-text.js): da PDF, Word, testo o incollata dalle Note
    const workoutImport = ref({ isOpen: false, busy: false, error: '', text: '' });
    const WORKOUT_IMPORT_ERRORS = {
      doc: 'I file .doc vecchi non si leggono: salvalo come .docx o PDF, oppure copia e incolla il testo qui sotto.',
      scan: 'Il PDF sembra una foto o una scansione e non contiene testo. Copia e incolla gli esercizi qui sotto.',
      empty: 'Il file è vuoto o non contiene esercizi riconoscibili.',
      type: 'Formato non supportato: usa PDF, Word (.docx) o testo (.txt).',
      big: 'Il file è troppo grande (massimo 20 MB). Copia e incolla il testo qui sotto.',
      none: 'Non ho trovato esercizi. Scrivi un esercizio per riga, tipo "Panca piana 4x8 60kg".'
    };
    const openWorkoutImport = () => { workoutImport.value = { isOpen: true, busy: false, error: '', text: '' }; };
    const closeWorkoutImport = () => { workoutImport.value.isOpen = false; };
    // Stesso esercizio scritto diverso ("LEG EXTENSIONS", "Pressa 45°") → nome della libreria;
    // una variante ("Leg extension a gamba singola") tiene il nome della scheda, ma consigli, muscoli e
    // valori di partenza vengono comunque dall'esercizio della libreria
    const importedToExercise = (row, ssPrefix) => {
      const ex = createEmptyExercise();
      const match = libraryMatch(row.name);
      const lib = match ? match.item : null;
      ex.name = match && match.kind === 'same' ? lib.n : row.name;
      if (row.cardio || (lib && lib.t === 'cardio' && !row.sets)) {
        ex.type = 'cardio';
        ex.duration = String(row.duration || (lib && lib.d) || '');
        ex.intensity = (lib && lib.i) || '';
      } else {
        ex.sets = String(row.sets || '');
        ex.reps = String(row.reps || '');
        ex.weight = String(row.weight || '');
        ex.rest = row.rest ? String(row.rest) : '';
        ex.superset = row.superset ? ssPrefix + row.superset : '';
      }
      return ex;
    };
    const applyWorkoutImport = (parsed) => {
      const days = (parsed.days || []).filter(d => d.exercises.length);
      if (!days.length) { workoutImport.value.error = WORKOUT_IMPORT_ERRORS.none; return; }
      editingSheetId.value = null;
      const stamp = Date.now();
      newSheet.value = {
        name: (parsed.name || 'Scheda importata').slice(0, 40),
        days: days.map((d, i) => ({ name: d.name || 'Giorno ' + dayLetter(i), exercises: d.exercises.map(row => importedToExercise(row, 'ss_' + stamp + '_' + i + '_')) }))
      };
      workoutImport.value.isOpen = false;
      workoutView.value = 'builder';
      const n = days.reduce((sum, d) => sum + d.exercises.length, 0);
      // Parti lasciate fuori (regole, riscaldamento, piscina…): meglio dirlo che farle sparire in silenzio
      const skipped = parsed.skipped || [];
      const skippedText = skipped.length
        ? ' Ho lasciato fuori: ' + skipped.slice(0, 3).join(', ') + (skipped.length > 3 ? ' e altre ' + (skipped.length - 3) + ' parti' : '') + '.'
        : '';
      showToastMessage('Ho letto ' + n + (n === 1 ? ' esercizio' : ' esercizi') + ' in ' + days.length + (days.length === 1 ? ' giorno' : ' giorni') +
        '.' + skippedText + ' Controlla che sia tutto giusto, poi salva la scheda.');
    };
    const importWorkoutFile = async (event) => {
      const file = event.target.files && event.target.files[0];
      event.target.value = '';
      if (!file) return;
      workoutImport.value.busy = true;
      workoutImport.value.error = '';
      try {
        const res = await readWorkoutFileText(file);
        if (res.error) { workoutImport.value.error = WORKOUT_IMPORT_ERRORS[res.error] || WORKOUT_IMPORT_ERRORS.empty; return; }
        applyWorkoutImport(parseWorkoutText(res.text, file.name, EXERCISE_LIBRARY));
      } catch (e) {
        console.error(e);
        workoutImport.value.error = 'Non riesco a leggere questo file. Prova a copiare e incollare il testo qui sotto.';
      } finally {
        workoutImport.value.busy = false;
      }
    };
    const importWorkoutText = () => {
      const text = workoutImport.value.text || '';
      if (!text.trim()) { workoutImport.value.error = WORKOUT_IMPORT_ERRORS.none; return; }
      workoutImport.value.error = '';
      applyWorkoutImport(parseWorkoutText(text, '', EXERCISE_LIBRARY));
    };

    // Come si fa (js/data/exercise-art.js): omino animato + muscoli allenati evidenziati
    const exerciseThumbCache = {};
    const exerciseThumb = (item) => {
      if (!item) return '';
      if (!exerciseThumbCache[item.id]) {
        const art = exerciseArt(item);
        exerciseThumbCache[item.id] = art ? exercisePoseSvg(art.pattern, false) : '';
      }
      return exerciseThumbCache[item.id];
    };
    const exercisePhoto = (item) => { const ph = exercisePhotos(item); return ph ? ph[0] : ''; };
    const exerciseInfo = ref({ isOpen: false, item: null, photos: null, pose: '', map: '', primary: [], secondary: [] });
    const openExerciseInfo = (item) => {
      const art = exerciseArt(item);
      if (!art) return;
      const photos = exercisePhotos(item);
      exerciseInfo.value = {
        isOpen: true, item, photos,
        pose: photos ? '' : exercisePoseSvg(art.pattern, true),
        map: muscleMapSvg(art.primary, art.secondary, { sex: bodySex.value }),
        primary: art.primary.map(id => MUSCLE_NAMES[id]),
        secondary: art.secondary.map(id => MUSCLE_NAMES[id])
      };
    };

    const currentSheetDay = computed(() => {
      if (!selectedSheet.value) return null;
      return selectedSheet.value.days?.[selectedSheetDayIdx.value] || selectedSheet.value.days?.[0] || null;
    });

    // Raggruppa gli esercizi: quelli con la stessa etichetta SS formano una superserie
    const selectedDayGroups = computed(() => {
      const day = currentSheetDay.value;
      if (!day || !day.exercises) return [];
      const groups = [];
      const seen = new Set();
      day.exercises.forEach((ex) => {
        const key = (ex.superset || '').trim();
        if (!key) {
          groups.push({ key: 'single_' + ex.id, label: '', exercises: [ex] });
          return;
        }
        if (seen.has(key)) return;
        seen.add(key);
        const groupExercises = day.exercises.filter(item => (item.superset || '').trim() === key);
        if (groupExercises.length < 2) {
          groups.push({ key: 'single_' + ex.id, label: '', exercises: [ex] });
          return;
        }
        groups.push({ key: 'ss_' + key, label: 'Superserie', exercises: groupExercises });
      });
      return groups;
    });

    // --- Storico e progressi per esercizio ---
    // Un log appartiene a un esercizio tramite il suo ID (stabile anche se rinomini l'esercizio).
    // Solo i log vecchi senza ID vengono abbinati per nome.
    const sameExercise = (log, target) => {
      if (!log || !target) return false;
      const auto = String(target.id || '').startsWith('auto-') || String(log.exerciseId || '').startsWith('auto-');
      if (target.id && log.exerciseId && !auto) return String(log.exerciseId) === String(target.id);
      const a = (log.exerciseName || log.exercise || '').trim().toLowerCase();
      const b = (target.name || '').trim().toLowerCase();
      return !!b && a === b;
    };
    const logTarget = (log) => ({ id: log && log.exerciseId, name: log && (log.exerciseName || log.exercise) });

    const exerciseLogsFor = (target) => {
      if (!target) return [];
      return workoutLogs.value
        .filter(log => sameExercise(log, target))
        .slice()
        .sort((a, b) => String(a.date).localeCompare(String(b.date)) || (Number(a.id) || 0) - (Number(b.id) || 0));
    };

    const lastExerciseLog = (exercise) => {
      const logs = exerciseLogsFor(exercise);
      return logs.length ? logs[logs.length - 1] : null;
    };

    // Per i piramidali conta solo il peso maggiore tra le serie
    const pyramidTopWeight = (exercise) => {
      const weights = ((exercise && exercise.setsDetail) || [])
        .map(set => parseOptionalNumber(set && set.weight))
        .filter(value => value !== null);
      return weights.length ? Math.max(...weights) : null;
    };

    const currentExerciseWeight = (exercise) => {
      const last = lastExerciseLog(exercise);
      const lastWeight = parseOptionalNumber(last && last.weight);
      if (lastWeight !== null) return lastWeight;
      if (exercise && exercise.pyramid) {
        const top = pyramidTopWeight(exercise);
        if (top !== null) return top;
      }
      return parseOptionalNumber(exercise && exercise.weight);
    };

    const currentExerciseDuration = (exercise) => {
      const last = lastExerciseLog(exercise);
      const lastDuration = parseOptionalNumber(last && last.duration);
      if (lastDuration !== null) return lastDuration;
      return parseOptionalNumber(exercise && exercise.duration);
    };

    // Valore di partenza dell'esercizio (kg per la forza, minuti per il cardio)
    const exerciseStartValue = (exercise) => {
      if (!exercise) return null;
      if (exercise.type === 'cardio') return parseOptionalNumber(exercise.duration);
      if (exercise.pyramid) {
        const top = pyramidTopWeight(exercise);
        if (top !== null) return top;
      }
      return parseOptionalNumber(exercise.weight);
    };

    // Ultimo valore registrato (o partenza se non ci sono log)
    const exerciseCurrentValue = (exercise) => {
      if (!exercise) return null;
      return exercise.type === 'cardio'
        ? currentExerciseDuration(exercise)
        : currentExerciseWeight(exercise);
    };

    const exerciseUnit = (exercise) => (exercise && exercise.type === 'cardio' ? 'min' : 'kg');

    const exerciseDeltaValue = (exercise) => {
      const start = exerciseStartValue(exercise);
      const current = exerciseCurrentValue(exercise);
      if (start === null || current === null) return null;
      return Math.round((current - start) * 10) / 10;
    };

    // ---------------------------------------------------------------
    // PROSSIMA VOLTA: consiglio di carico (sovraccarico progressivo) per gli esercizi di forza.
    // Si basa sugli ultimi pesi registrati e, se c'è, su "com'è andata" (facile / giusto / duro).
    //  - facile → sali · giusto due volte di fila allo stesso peso → sali · giusto una volta → ripeti
    //  - duro → resta · duro due volte di fila allo stesso peso → scendi un po'
    //  - senza risposta: dopo 3 sessioni allo stesso peso → sali
    // ---------------------------------------------------------------
    const EXERCISE_FEELS = [
      { id: 'easy', icon: '😌', label: 'Facile' },
      { id: 'ok', icon: '💪', label: 'Giusto' },
      { id: 'hard', icon: '🥵', label: 'Duro' }
    ];
    const loadStep = (weight) => (weight < 20 ? 1 : 2.5);
    const roundLoad = (value, step) => Math.max(0, Math.round(value / step) * step);
    const exerciseSuggestion = (exercise) => {
      if (!exercise || exercise.type === 'cardio') return null;
      const logs = exerciseLogsFor(exercise).filter(log => parseOptionalNumber(log.weight) !== null);
      if (!logs.length) return null;
      const last = logs[logs.length - 1];
      const prev = logs.length > 1 ? logs[logs.length - 2] : null;
      const w = parseOptionalNumber(last.weight);
      if (w <= 0) return null;
      const step = loadStep(w);
      const up = roundLoad(w + step, step);
      const down = roundLoad(w - step, step);
      const samePrev = prev && parseOptionalNumber(prev.weight) === w;
      const top = exercise.pyramid ? ' (serie più pesante)' : '';
      const fw = formatNumber(w) + ' kg';
      const make = (value, kind, reason) => ({ value, kind, reason, unit: 'kg', delta: Math.round((value - w) * 10) / 10, top });
      if (last.feel === 'easy') return make(up, 'up', `L'ultima volta ${fw} era facile: è ora di salire.`);
      if (last.feel === 'hard') {
        if (samePrev && prev.feel === 'hard' && down > 0) return make(down, 'down', `${fw} è stato duro due volte di fila: scendi un po' e cura la tecnica.`);
        return make(w, 'same', `${fw} è stato duro: resta qui finché non diventa giusto.`);
      }
      if (last.feel === 'ok') {
        if (samePrev && (prev.feel === 'ok' || prev.feel === 'easy')) return make(up, 'up', `Due sessioni solide a ${fw}: prova a salire.`);
        return make(w, 'same', `Ripeti ${fw}: se va di nuovo bene, la prossima volta sali.`);
      }
      // Nessuna risposta: conta le sessioni di fila allo stesso peso
      let streak = 0;
      for (let i = logs.length - 1; i >= 0 && parseOptionalNumber(logs[i].weight) === w; i--) streak++;
      if (streak >= 3) return make(up, 'up', `Sei a ${fw} da ${streak} sessioni: prova a salire.`);
      return make(w, 'same', `Consolida ${fw} (${streak} di 3 sessioni prima di salire). Dimmi com'è andata per consigli più precisi.`);
    };

    // ---------------------------------------------------------------
    // ALTERNATIVE DEL COACH: esercizi della libreria per gli stessi muscoli, in palestra o a casa.
    //  - esercizio fermo da un po' → cambia stimolo con una variante
    //  - "Oggi niente palestra?" → lo stesso giorno della scheda, fatto a casa
    // ---------------------------------------------------------------
    const libraryAlternatives = (item, place, avoid = new Set()) => {
      if (!item) return [];
      const isCardio = item.t === 'cardio' || item.m === 'cardio';
      const prim = (exerciseArt(item) || {}).primary || [];
      return EXERCISE_LIBRARY
        .filter(x => x.id !== item.id && x.w === place && !avoid.has(x.id) && x.m !== 'mobilita'
          && ((x.t === 'cardio' || x.m === 'cardio') === isCardio))
        .map(x => {
          const p = (exerciseArt(x) || {}).primary || [];
          const shared = prim.filter(m => p.includes(m)).length;
          // Più punti a chi lavora gli stessi muscoli (e meno a chi ne aggiunge tanti altri)
          return { x, score: shared * 3 + (x.m === item.m ? 2 : 0) + (prim[0] && p[0] === prim[0] ? 2 : 0) - 0.5 * Math.max(0, p.length - shared) + (familiarLibraryIds.value.has(x.id) ? 0.5 : 0) };
        })
        .filter(o => o.score >= 2)
        .sort((a, b) => b.score - a.score)
        .map(o => o.x);
    };
    // Fermo: 4 sessioni o più allo stesso peso in almeno 10 giorni, oppure "duro" due volte di fila
    const exerciseStall = (exercise) => {
      if (!exercise || exercise.type === 'cardio') return null;
      const logs = exerciseLogsFor(exercise).filter(log => parseOptionalNumber(log.weight) !== null);
      if (logs.length < 2) return null;
      const last = logs[logs.length - 1], prev = logs[logs.length - 2];
      const w = parseOptionalNumber(last.weight);
      let n = 0;
      for (let i = logs.length - 1; i >= 0 && parseOptionalNumber(logs[i].weight) === w; i--) n++;
      const longFlat = n >= 4 && coachDayDiff(logs[logs.length - n].date, last.date) >= 10 && last.feel !== 'easy';
      const hardTwice = last.feel === 'hard' && prev.feel === 'hard';
      if (!longFlat && !hardTwice) return null;
      const item = libraryForName(exercise.name);
      if (!item) return null;
      const gym = libraryAlternatives(item, 'gym')[0] || null;
      const home = libraryAlternatives(item, 'home')[0] || null;
      if (!gym && !home) return null;
      return { sessions: n, hard: hardTwice && !longFlat, gym, home };
    };
    const homeSwap = ref({ isOpen: false });
    const homeDayPlan = computed(() => {
      const day = currentSheetDay.value;
      if (!day || !Array.isArray(day.exercises) || !day.exercises.length) return null;
      const used = new Set();
      let gym = 0;
      // Prima quelli già fattibili a casa, così le alternative non li ripetono
      const items = day.exercises.map(ex => libraryForName(ex.name));
      items.forEach(item => { if (item && item.w === 'home') used.add(item.id); });
      const rows = day.exercises.map((ex, i) => {
        const item = items[i];
        if (item && item.w === 'home') return { ex, alt: item, same: true };
        if (item) gym++;
        const alt = item ? (libraryAlternatives(item, 'home', used)[0] || null) : null;
        if (alt) used.add(alt.id);
        return { ex, alt, same: false };
      });
      if (!gym) return null;
      return { name: day.name || 'Allenamento', rows, count: rows.filter(r => r.alt).length };
    });
    const openHomeSwap = () => { homeSwap.value = { isOpen: true }; };
    const startHomeDay = () => {
      const plan = homeDayPlan.value;
      if (!plan || !plan.count) return;
      const exercises = plan.rows.filter(r => r.alt).map(r => ({ ...libraryToExercise(r.alt), id: 'auto-' + r.alt.id }));
      let sheet = workoutSheets.value.find(s => s.auto === 'today');
      if (!sheet) {
        const nextId = Math.max(Date.now(), ...workoutSheets.value.map(item => (Number(item.id) || 0) + 1));
        workoutSheets.value.push({ id: nextId, createdAt: toISODate(), name: 'Allenamento del giorno', auto: 'today', days: [] });
        sheet = workoutSheets.value[workoutSheets.value.length - 1];
      }
      sheet.days = [{ name: plan.name + ' · a casa', exercises }];
      homeSwap.value.isOpen = false;
      activeTab.value = 'allenamento';
      openSheet(sheet);
      openSessionPreview();
    };

    // Salva "com'è andata" sulla registrazione di oggi dell'esercizio
    const setExerciseFeel = (exercise, feel) => {
      if (!exercise) return;
      const log = workoutLogs.value.find(item => item.date === toISODate() && sameExercise(item, exercise));
      if (log) log.feel = log.feel === feel ? '' : feel;
    };
    const todayExerciseFeel = (exercise) => {
      if (!exercise) return '';
      const log = workoutLogs.value.find(item => item.date === toISODate() && sameExercise(item, exercise));
      return (log && log.feel) || '';
    };

    // Crea o aggiorna la registrazione di oggi per l'esercizio (una per giorno)
    const upsertTodayExerciseLog = (exercise, payload) => {
      const date = toISODate();
      const sheet = selectedSheet.value;
      const existing = workoutLogs.value.find(log => log.date === date && sameExercise(log, exercise));
      if (existing) {
        Object.assign(existing, payload, { exerciseId: exercise.id, exerciseName: exercise.name });
        return;
      }
      workoutLogs.value.push({
        id: Date.now() + Math.floor(Math.random() * 1000),
        date,
        sheetId: sheet ? sheet.id : null,
        sheetName: sheet ? sheet.name : '',
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        ...payload
      });
    };

    // Valore digitato dall'utente per ogni esercizio (bozza input)
    const exerciseInputs = ref({});

    // Richiesta di conferma prima di aggiornare peso/durata
    const weightConfirmModal = ref({ isOpen: false, exerciseId: null, exerciseName: '', value: null, unit: 'kg', isCardio: false, feel: '' });

    const setExerciseValue = (exercise) => {
      const value = parseOptionalNumber(exerciseInputs.value[exercise.id]);
      if (value === null || value < 0) {
        showToastMessage('Scrivi un valore valido per ' + exercise.name + '.');
        return;
      }
      const rounded = Math.round(value * 10) / 10;
      weightConfirmModal.value = {
        isOpen: true,
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        value: rounded,
        unit: exerciseUnit(exercise),
        isCardio: exercise.type === 'cardio',
        feel: ''
      };
    };

    const applyExerciseValue = (exercise, rounded) => {
      if (exercise.type === 'cardio') {
        upsertTodayExerciseLog(exercise, { weight: null, reps: null, duration: rounded, intensity: exercise.intensity || '' });
        showToastMessage(exercise.name + ': ' + formatNumber(rounded) + ' min registrati per oggi.');
      } else {
        const record = newRecordFor(exercise, rounded);
        upsertTodayExerciseLog(exercise, { weight: rounded, reps: parseOptionalNumber(exercise.reps) });
        if (record) celebrateRecord(record);
        else showToastMessage(exercise.name + ': ' + formatNumber(rounded) + ' kg registrati per oggi.');
      }
      exerciseInputs.value[exercise.id] = '';
    };

    // Nuovo record personale: il carico di oggi supera il migliore dei giorni precedenti
    const recordModal = ref({ isOpen: false, record: null });
    const newRecordFor = (exercise, value) => {
      if (!exercise || exercise.type === 'cardio' || !(value > 0)) return null;
      const today = toISODate();
      const before = exerciseLogsFor(exercise).filter(log => log.date < today)
        .map(log => parseOptionalNumber(log.weight)).filter(v => v !== null && v > 0);
      if (!before.length) return null;
      const best = Math.max(...before);
      return value > best ? { type: 'record', name: exercise.name, value, prev: best, unit: 'kg', date: today } : null;
    };
    const celebrateRecord = (record) => {
      recordModal.value = { isOpen: true, record };
      vibrate([60, 40, 60, 40, 220]);
    };
    const shareRecordFromModal = () => {
      const record = recordModal.value.record;
      recordModal.value.isOpen = false;
      if (record) openAchievementShare(record);
    };

    const cancelExerciseValue = () => {
      weightConfirmModal.value.isOpen = false;
    };

    const confirmExerciseValue = () => {
      const modal = weightConfirmModal.value;
      const exercise = findSelectedExerciseById(modal.exerciseId);
      if (!exercise) {
        modal.isOpen = false;
        return;
      }
      applyExerciseValue(exercise, modal.value);
      if (modal.feel && !modal.isCardio) setExerciseFeel(exercise, modal.feel);
      modal.isOpen = false;
    };

    // --- Piramidali: peso e ripetizioni per singola serie ---
    const defaultPyramidSets = (exercise) => {
      const count = Math.max(1, parseInt(exercise && exercise.sets, 10) || 3);
      const baseReps = exercise && exercise.reps ? exercise.reps : '';
      // Ogni serie va compilata singolarmente: peso e ripetizioni per ogni ripetizione
      return Array.from({ length: count }, () => ({ weight: '', reps: baseReps }));
    };

    const pyramidSummary = (exercise) => {
      const sets = (exercise && exercise.setsDetail) || [];
      if (!sets.length) return 'Nessuna serie configurata';
      return sets.map(set => {
        const weight = parseOptionalNumber(set && set.weight);
        return (weight !== null ? formatNumber(weight) : '—') + ' kg × ' + ((set && set.reps) || '—');
      }).join(' · ');
    };

    const togglePyramid = (exercise, dayIdx, exIdx) => {
      exercise.pyramid = !exercise.pyramid;
      if (!exercise.pyramid) return;
      if (!exercise.setsDetail || !exercise.setsDetail.length) {
        exercise.setsDetail = defaultPyramidSets(exercise);
      }
      // Apri subito la modale: il peso va inserito serie per serie
      if (dayIdx !== undefined && exIdx !== undefined) openPyramidModal(dayIdx, exIdx);
    };

    const pyramidModal = ref({ isOpen: false, dayIdx: null, exIdx: null, sets: [], error: '' });

    const pyramidExerciseName = computed(() => {
      const modal = pyramidModal.value;
      const exercise = newSheet.value.days?.[modal.dayIdx]?.exercises?.[modal.exIdx];
      return exercise && exercise.name ? exercise.name : 'Esercizio';
    });

    const openPyramidModal = (dayIdx, exIdx) => {
      const exercise = newSheet.value.days?.[dayIdx]?.exercises?.[exIdx];
      if (!exercise) return;
      const sets = (exercise.setsDetail && exercise.setsDetail.length)
        ? exercise.setsDetail
        : defaultPyramidSets(exercise);
      pyramidModal.value = {
        isOpen: true,
        dayIdx,
        exIdx,
        sets: sets.map(set => ({
          weight: set && set.weight !== undefined ? set.weight : '',
          reps: (set && set.reps) || ''
        })),
        error: ''
      };
    };

    const addPyramidSet = () => {
      // Nuova serie vuota: peso e ripetizioni vanno inseriti singolarmente
      pyramidModal.value.sets.push({ weight: '', reps: '' });
    };

    const removePyramidSet = (idx) => {
      if (pyramidModal.value.sets.length <= 1) return;
      pyramidModal.value.sets.splice(idx, 1);
    };

    const savePyramidModal = () => {
      const modal = pyramidModal.value;
      const exercise = newSheet.value.days?.[modal.dayIdx]?.exercises?.[modal.exIdx];
      if (!exercise) return;
      const cleaned = modal.sets.map(set => ({
        weight: parseOptionalNumber(set.weight) ?? '',
        reps: (set.reps || '').trim()
      }));
      if (!cleaned.some(set => set.weight !== '')) {
        modal.error = 'Inserisci almeno un peso nelle serie.';
        return;
      }
      exercise.setsDetail = cleaned;
      exercise.sets = String(cleaned.length);
      exercise.weight = cleaned.reduce((max, set) => (set.weight !== '' && set.weight > max ? set.weight : max), 0) || '';
      exercise.pyramid = true;
      modal.isOpen = false;
      showToastMessage('Serie piramidali salvate per ' + (exercise.name || "l'esercizio") + '.');
    };

    // --- Registrazione di una sessione piramidale: un peso per ogni serie ---
    const pyramidLogModal = ref({ isOpen: false, exerciseId: null, exerciseName: '', sets: [], error: '' });

    const findSelectedExerciseById = (id) => {
      const sheet = selectedSheet.value;
      if (!sheet) return null;
      for (const day of (sheet.days || [])) {
        for (const ex of (day.exercises || [])) {
          if (ex.id === id) return ex;
        }
      }
      return null;
    };

    const openPyramidLogModal = (exercise) => {
      if (!exercise) return;
      const configured = (exercise.setsDetail && exercise.setsDetail.length)
        ? exercise.setsDetail
        : defaultPyramidSets(exercise);
      const today = toISODate();
      const todayLog = workoutLogs.value.find(log => log.date === today && sameExercise(log, exercise));
      const source = (todayLog && Array.isArray(todayLog.setsDetail) && todayLog.setsDetail.length)
        ? todayLog.setsDetail
        : configured;
      pyramidLogModal.value = {
        isOpen: true,
        exerciseId: exercise.id,
        exerciseName: exercise.name || 'Esercizio',
        sets: source.map(set => ({
          weight: set && set.weight !== undefined && set.weight !== '' ? set.weight : '',
          reps: (set && set.reps) || ''
        })),
        error: ''
      };
    };

    const pyramidLogTopWeight = computed(() => {
      const weights = pyramidLogModal.value.sets
        .map(set => parseOptionalNumber(set.weight))
        .filter(value => value !== null);
      return weights.length ? Math.max(...weights) : null;
    });

    const addPyramidLogSet = () => {
      pyramidLogModal.value.sets.push({ weight: '', reps: '' });
    };

    const confirmPyramidLog = () => {
      const modal = pyramidLogModal.value;
      const exercise = findSelectedExerciseById(modal.exerciseId);
      if (!exercise) return;
      const cleaned = modal.sets.map(set => ({
        weight: parseOptionalNumber(set.weight),
        reps: String(set.reps || '').trim()
      }));
      if (cleaned.some(set => set.weight === null || set.weight < 0)) {
        modal.error = 'Inserisci un peso valido in ogni serie.';
        return;
      }
      const top = cleaned.reduce((max, set) => Math.max(max, set.weight), -Infinity);
      const topSet = cleaned.find(set => set.weight === top) || cleaned[0];
      const rounded = Math.round(top * 10) / 10;
      const record = newRecordFor(exercise, rounded);
      upsertTodayExerciseLog(exercise, {
        weight: rounded,
        reps: parseOptionalNumber(topSet.reps),
        setsDetail: cleaned.map(set => ({ weight: Math.round(set.weight * 10) / 10, reps: set.reps }))
      });
      modal.isOpen = false;
      if (record) celebrateRecord(record);
      else showToastMessage(exercise.name + ': peso massimo ' + formatNumber(rounded) + ' kg registrato per oggi.');
    };

    const sheetSessionDates = computed(() => {
      if (!selectedSheet.value) return [];
      const dates = new Set(
        workoutLogs.value
          .filter(log => String(log.sheetId ?? '') === String(selectedSheet.value.id))
          .map(log => log.date)
          .filter(Boolean)
      );
      return Array.from(dates).sort((a, b) => b.localeCompare(a));
    });

    const sheetLastSessionDate = (sheet) => {
      if (!sheet) return null;
      const dates = workoutLogs.value
        .filter(log => String(log.sheetId ?? '') === String(sheet.id))
        .map(log => log.date)
        .filter(Boolean)
        .sort((a, b) => b.localeCompare(a));
      return dates[0] || null;
    };

    const exerciseHistoryModal = ref({ isOpen: false, exerciseId: null, exerciseName: '', sheetName: '' });

    const openExerciseHistory = (exercise) => {
      exerciseChartActive.value = null;
      exerciseHistoryModal.value = {
        isOpen: true,
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        sheetName: selectedSheet.value ? selectedSheet.value.name : ''
      };
    };

    // Trova l'esercizio di un log in una qualsiasi scheda (per ID, o per nome sui log vecchi)
    const findExerciseInfo = (log) => {
      const target = logTarget(log);
      for (const sheet of workoutSheets.value) {
        for (const day of (sheet.days || [])) {
          for (const ex of (day.exercises || [])) {
            const match = target.id ? String(ex.id) === String(target.id)
              : (!!target.name && (ex.name || '').trim().toLowerCase() === target.name.trim().toLowerCase());
            if (match) return { exercise: ex, dayName: day.name || 'Esercizi', sheet };
          }
        }
      }
      return null;
    };

    // Aggiunge a un log i valori di confronto con la partenza
    const decorateLog = (log) => {
      const isCardio = log.duration !== null && log.duration !== undefined && log.duration !== '';
      const unit = isCardio ? 'min' : 'kg';
      const current = parseOptionalNumber(isCardio ? log.duration : log.weight);
      const info = findExerciseInfo(log);
      const ex = info ? info.exercise : null;
      let start = parseOptionalNumber(isCardio ? (ex && ex.duration) : (ex && ex.weight));
      if (!isCardio && ex && ex.pyramid) {
        const top = pyramidTopWeight(ex);
        if (top !== null) start = top;
      }
      if (start === null) {
        const firstLogs = exerciseLogsFor(logTarget(log)).filter(item => {
          const value = isCardio ? item.duration : item.weight;
          return value !== null && value !== undefined && value !== '';
        });
        if (firstLogs.length) start = parseOptionalNumber(isCardio ? firstLogs[0].duration : firstLogs[0].weight);
      }
      const delta = (start === null || current === null) ? null : Math.round((current - start) * 10) / 10;
      const logSets = Array.isArray(log.setsDetail) ? log.setsDetail : [];
      return {
        ...log,
        isCardio,
        isPyramid: !!(ex && ex.pyramid),
        dayName: info ? info.dayName : 'Esercizi',
        unit,
        displayStart: start,
        displayCurrent: current,
        displayDelta: delta,
        logSets
      };
    };

    const exerciseHistoryLogs = computed(() => {
      if (!exerciseHistoryModal.value.isOpen) return [];
      const modal = exerciseHistoryModal.value;
      return exerciseLogsFor({ id: modal.exerciseId, name: modal.exerciseName }).slice().reverse().map(decorateLog);
    });

    // Consiglio di carico nello storico (l'esercizio può essere di un'altra scheda)
    const exerciseHistorySuggestion = computed(() => {
      const modal = exerciseHistoryModal.value;
      if (!modal.isOpen) return null;
      const target = { id: modal.exerciseId, name: modal.exerciseName };
      const logs = exerciseLogsFor(target);
      if (!logs.length) return null;
      const info = findExerciseInfo(logs[logs.length - 1]);
      return exerciseSuggestion(info ? info.exercise : { ...target, type: 'strength' });
    });

    // Grafico andamento esercizio (ordine cronologico, un punto per sessione)
    const exerciseChartActive = ref(null);
    const CHART_W = 300, CHART_X0 = 16, CHART_X1 = 284, CHART_Y0 = 22, CHART_Y1 = 122;
    const exerciseChart = computed(() => {
      const logs = exerciseHistoryLogs.value.filter(log => log.displayCurrent !== null).slice().reverse();
      if (logs.length < 2) return null;
      const values = logs.map(log => log.displayCurrent);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const pad = Math.max((max - min) * 0.15, max === min ? Math.max(1, max * 0.05) : 0);
      const lo = min - pad;
      const hi = max + pad;
      const yFor = (v) => CHART_Y1 - ((v - lo) / (hi - lo)) * (CHART_Y1 - CHART_Y0);
      const bestIdx = values.lastIndexOf(max);
      const points = logs.map((log, i) => ({
        x: Number((CHART_X0 + (i * (CHART_X1 - CHART_X0)) / (logs.length - 1)).toFixed(1)),
        y: Number(yFor(log.displayCurrent).toFixed(1)),
        value: log.displayCurrent,
        date: log.date,
        reps: log.reps,
        label: i === logs.length - 1 || (i === bestIdx && max !== values[values.length - 1])
      }));
      const line = points.map(pt => `${pt.x},${pt.y}`).join(' ');
      const unit = logs[0].unit;
      const first = values[0];
      const last = values[values.length - 1];
      const delta = Math.round((last - first) * 10) / 10;
      return {
        points,
        line,
        area: `${points[0].x},${CHART_Y1} ${line} ${points[points.length - 1].x},${CHART_Y1}`,
        grid: [max, (min + max) / 2, min]
          .filter((v, i, arr) => arr.indexOf(v) === i)
          .map(v => ({ y: Number(yFor(v).toFixed(1)), label: formatNumber(Math.round(v * 10) / 10) })),
        unit,
        color: unit === 'min' ? '#0EA5E9' : '#F5A623',
        first, last, best: max, delta,
        sessions: logs.length,
        firstDate: logs[0].date,
        lastDate: logs[logs.length - 1].date
      };
    });

    // Tocco / passaggio del mouse: evidenzia la sessione più vicina
    const onExerciseChartPointer = (event) => {
      const chart = exerciseChart.value;
      if (!chart) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * CHART_W;
      let nearest = 0;
      chart.points.forEach((pt, i) => {
        if (Math.abs(pt.x - x) < Math.abs(chart.points[nearest].x - x)) nearest = i;
      });
      exerciseChartActive.value = nearest;
    };
    const onExerciseChartLeave = (event) => {
      if (event.pointerType === 'mouse') exerciseChartActive.value = null;
    };

    // Dai Progressi: apre lo storico (con grafico) dell'esercizio
    const openExerciseHistoryFromGroup = (group) => {
      exerciseChartActive.value = null;
      exerciseHistoryModal.value = {
        isOpen: true,
        exerciseId: group.key.startsWith('id:') ? group.key.slice(3) : null,
        exerciseName: group.name,
        sheetName: group.sheetName || ''
      };
    };

    const deleteWorkoutLog = (log) => {
      showConfirm("Elimina registrazione", 'Vuoi eliminare la registrazione del ' + formatDate(log.date) + '?', () => {
        const idx = workoutLogs.value.findIndex(item => item.id === log.id);
        if (idx > -1) workoutLogs.value.splice(idx, 1);
        showToastMessage("Registrazione eliminata. 🗑️");
      });
    };

    const sheetHistoryModal = ref({ isOpen: false });

    const sheetHistorySessions = computed(() => {
      if (!sheetHistoryModal.value.isOpen || !selectedSheet.value) return [];
      const sheetId = String(selectedSheet.value.id);
      const byDate = {};
      workoutLogs.value
        .filter(log => String(log.sheetId ?? '') === sheetId && log.date)
        .forEach(log => {
          if (!byDate[log.date]) byDate[log.date] = [];
          byDate[log.date].push(log);
        });
      return Object.keys(byDate)
        .sort((a, b) => b.localeCompare(a))
        .map(date => {
          const logs = byDate[date].map(decorateLog);
          const dayGroups = [];
          const indexByDay = {};
          logs.forEach(log => {
            const key = log.dayName || 'Esercizi';
            if (indexByDay[key] === undefined) {
              indexByDay[key] = dayGroups.length;
              dayGroups.push({ name: key, logs: [] });
            }
            dayGroups[indexByDay[key]].logs.push(log);
          });
          return {
            date,
            ...formatDateParts(date),
            logs,
            dayGroups,
            strengthCount: logs.filter(log => !log.isCardio).length,
            cardioCount: logs.filter(log => log.isCardio).length
          };
        });
    });

    // ---------------------------------------------------------------
    // SESSIONE GUIDATA: conferma → 3-2-1 → serie, cronometro, recupero
    // ---------------------------------------------------------------
    const sessionPreviewModal = ref({ isOpen: false, sessionId: null });

    // Sessione palestra di oggi già presente nel calendario per questa scheda/giorno
    const findTodayGymSession = () => {
      const sheet = selectedSheet.value;
      if (!sheet) return null;
      const dayName = currentSheetDay.value ? currentSheetDay.value.name : '';
      return trainingSessions.value.find(session =>
        session.kind === 'gym'
        && session.date === toISODate()
        && String(session.sheetId) === String(sheet.id)
        && (session.dayName || '') === dayName
      ) || null;
    };

    const openSessionPreview = () => {
      if (!selectedSheet.value) return;
      if (!currentSheetDay.value || !(currentSheetDay.value.exercises || []).length) {
        showToastMessage('Questo giorno non ha esercizi. Modifica la scheda per aggiungerne.');
        return;
      }
      const existing = findTodayGymSession();
      sessionPreviewModal.value = { isOpen: true, sessionId: existing ? existing.id : null };
    };

    const closeSessionPreview = () => { sessionPreviewModal.value.isOpen = false; };

    const editSessionFromPreview = () => {
      const session = trainingSessions.value.find(item => item.id === sessionPreviewModal.value.sessionId);
      if (!session) return;
      sessionPreviewModal.value.isOpen = false;
      editTrainingSession(session);
    };

    // Crea la sessione nel calendario di oggi (se non c'è già) e ne restituisce l'id
    const ensureTodayGymSession = () => {
      const existing = findTodayGymSession();
      if (existing) return existing.id;
      const sheet = selectedSheet.value;
      const now = new Date();
      const session = {
        id: 'ts_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        date: toISODate(now),
        time: String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0'),
        kind: 'gym',
        sport: '',
        sheetId: sheet.id,
        sheetName: sheet.name,
        dayName: currentSheetDay.value ? currentSheetDay.value.name : '',
        note: '',
        recurring: false,
        weekdays: []
      };
      trainingSessions.value.push(session);
      return session.id;
    };

    // --- Suoni, vibrazione e schermo acceso ---
    let audioCtx = null;
    const unlockAudio = () => {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
      } catch (e) { audioCtx = null; }
    };
    const beep = (freq = 880, duration = 0.15) => {
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        const t = audioCtx.currentTime;
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
        osc.start(t);
        osc.stop(t + duration);
      } catch (e) { /* audio non disponibile */ }
    };
    const vibrate = (pattern) => { try { navigator.vibrate && navigator.vibrate(pattern); } catch (e) { /* ignora */ } };

    let wakeLock = null;
    const requestWakeLock = async () => {
      try { if ('wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen'); } catch (e) { wakeLock = null; }
    };
    const releaseWakeLock = () => {
      try { if (wakeLock) wakeLock.release(); } catch (e) { /* ignora */ }
      wakeLock = null;
    };
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && workoutPlayer.value.isOpen && workoutPlayer.value.phase !== 'done') requestWakeLock();
    });

    // --- Costruzione della sequenza di serie ---
    const DEFAULT_REST = 90;
    const exerciseSetCount = (ex) => {
      if (ex.type === 'cardio') return 1;
      if (ex.pyramid) return Math.max(1, (ex.setsDetail || []).length);
      return Math.max(1, parseInt(ex.sets, 10) || 3);
    };
    const exerciseRest = (ex) => {
      const rest = parseInt(ex && ex.rest, 10);
      return rest > 0 ? rest : (ex && ex.type === 'cardio' ? 60 : DEFAULT_REST);
    };
    const stepReps = (ex, setIdx) => {
      if (ex.type === 'cardio') return '';
      if (ex.pyramid) return String((ex.setsDetail || [])[setIdx]?.reps || ex.reps || '');
      return String(ex.reps || '');
    };

    // Le superserie alternano gli esercizi della coppia: A1 → B1 → recupero → A2 → B2 ...
    const buildWorkoutSteps = () => {
      const steps = [];
      selectedDayGroups.value.forEach(group => {
        const exercises = group.exercises;
        const rounds = Math.max(...exercises.map(exerciseSetCount));
        for (let s = 0; s < rounds; s++) {
          const round = exercises.filter(ex => s < exerciseSetCount(ex));
          round.forEach((ex, i) => {
            const isRoundEnd = i === round.length - 1;
            steps.push({
              exId: ex.id,
              setIdx: s,
              setsTotal: exerciseSetCount(ex),
              reps: stepReps(ex, s),
              superset: !!group.label,
              restAfter: isRoundEnd ? Math.max(...round.map(exerciseRest)) : 0
            });
          });
        }
      });
      if (steps.length) steps[steps.length - 1].restAfter = 0;
      steps.forEach((step, idx) => {
        step.isLastSetOfExercise = !steps.slice(idx + 1).some(next => next.exId === step.exId);
      });
      return steps;
    };

    const emptyPlayer = () => ({
      isOpen: false, phase: 'countdown', steps: [], stepIdx: 0,
      phaseStartedAt: 0, sessionStartedAt: 0, restEndsAt: 0, restTotal: 0,
      restJustEnded: false, values: {}, startValues: {}, setDurations: [], sessionId: null,
      sheetName: '', dayName: '', sheetId: null, dayIdx: 0, lastBeepSecond: null, summary: null
    });
    const workoutPlayer = ref(emptyPlayer());
    const playerNow = ref(Date.now());
    let playerTimer = null;

    const playerStep = computed(() => workoutPlayer.value.steps[workoutPlayer.value.stepIdx] || null);
    const playerNextStep = computed(() => workoutPlayer.value.steps[workoutPlayer.value.stepIdx + 1] || null);
    const playerExercise = computed(() => playerStep.value ? findSelectedExerciseById(playerStep.value.exId) : null);
    // Esercizio di forza appena concluso: durante il recupero dopo l'ultima serie, o a fine allenamento
    const playerFeelExercise = computed(() => {
      const p = workoutPlayer.value;
      let step = null;
      if (p.phase === 'rest' && playerStep.value && playerStep.value.isLastSetOfExercise) step = playerStep.value;
      else if (p.phase === 'done' && p.steps.length) step = p.steps[p.steps.length - 1];
      const ex = step ? findSelectedExerciseById(step.exId) : null;
      return ex && ex.type !== 'cardio' && todayExerciseLogExists(ex) ? ex : null;
    });
    const todayExerciseLogExists = (exercise) => workoutLogs.value.some(item => item.date === toISODate() && sameExercise(item, exercise));
    // Consiglio di carico per l'esercizio in arrivo (solo prima di registrarlo oggi)
    const playerSuggestion = computed(() => {
      const ex = playerTargetExercise.value;
      if (!ex || ex.type === 'cardio' || ex.pyramid || todayExerciseLogExists(ex)) return null;
      const sugg = exerciseSuggestion(ex);
      return sugg && sugg.value !== playerCurrentValue.value ? sugg : null;
    });
    const playerNextExercise = computed(() => playerNextStep.value ? findSelectedExerciseById(playerNextStep.value.exId) : null);
    const playerProgressPct = computed(() => {
      const p = workoutPlayer.value;
      if (!p.steps.length) return 0;
      const done = p.phase === 'done' ? p.steps.length : p.stepIdx + (p.phase === 'rest' ? 1 : 0);
      return Math.round((done / p.steps.length) * 100);
    });


    const playerCountdown = computed(() => Math.max(1, 3 - Math.floor((playerNow.value - workoutPlayer.value.phaseStartedAt) / 1000)));
    const playerElapsed = computed(() => (playerNow.value - workoutPlayer.value.phaseStartedAt) / 1000);
    const playerRestLeft = computed(() => Math.max(0, (workoutPlayer.value.restEndsAt - playerNow.value) / 1000));
    const playerRestPct = computed(() => {
      const total = workoutPlayer.value.restTotal;
      return total ? Math.min(100, (playerRestLeft.value / total) * 100) : 0;
    });
    const playerSessionElapsed = computed(() => (playerNow.value - workoutPlayer.value.sessionStartedAt) / 1000);

    // Valore in uso nella sessione (kg per la forza, min per il cardio)
    const playerValueFor = (step) => {
      if (!step) return null;
      const value = workoutPlayer.value.values[step.exId];
      if (Array.isArray(value)) return value[step.setIdx] ?? null;
      return value ?? null;
    };
    // Durante il recupero si modifica già il peso della serie successiva
    const playerTargetStep = computed(() => workoutPlayer.value.phase === 'rest' ? playerNextStep.value : playerStep.value);
    const playerTargetExercise = computed(() => playerTargetStep.value ? findSelectedExerciseById(playerTargetStep.value.exId) : null);
    const playerCurrentValue = computed(() => playerValueFor(playerTargetStep.value));
    const playerUnit = computed(() => exerciseUnit(playerTargetExercise.value));
    const playerValueDraft = ref('');
    watch([() => workoutPlayer.value.stepIdx, () => workoutPlayer.value.phase, () => workoutPlayer.value.isOpen], () => {
      playerValueDraft.value = playerCurrentValue.value === null ? '' : String(playerCurrentValue.value);
    });

    // Ripetizioni e serie che restano, compresa quella corrente
    const playerRemaining = computed(() => {
      const step = playerStep.value;
      if (!step) return { sets: 0, reps: null };
      const rest = workoutPlayer.value.steps.slice(workoutPlayer.value.stepIdx).filter(s => s.exId === step.exId);
      const repsList = rest.map(s => parseInt(s.reps, 10));
      const allNumeric = repsList.length && repsList.every((r, i) => !isNaN(r) && String(r) === String(rest[i].reps).trim());
      return { sets: rest.length, reps: allNumeric ? repsList.reduce((a, b) => a + b, 0) : null };
    });

    // Salva subito nei log di oggi il valore della sessione: lo vedi ovunque (scheda, storico, progressi)
    const logPlayerExercise = (exercise) => {
      if (!exercise) return;
      const value = workoutPlayer.value.values[exercise.id];
      if (exercise.type === 'cardio') {
        if (value === null || value === undefined) return;
        upsertTodayExerciseLog(exercise, { weight: null, reps: null, duration: value, intensity: exercise.intensity || '' });
      } else if (Array.isArray(value)) {
        const sets = value.map((weight, i) => ({ weight, reps: stepReps(exercise, i) }));
        const valid = sets.filter(set => set.weight !== null);
        if (!valid.length) return;
        const top = Math.max(...valid.map(set => set.weight));
        const topSet = valid.find(set => set.weight === top);
        upsertTodayExerciseLog(exercise, { weight: top, reps: parseOptionalNumber(topSet.reps), setsDetail: sets });
      } else {
        if (value === null || value === undefined) return;
        upsertTodayExerciseLog(exercise, { weight: value, reps: parseOptionalNumber(exercise.reps) });
      }
    };

    const playerSetValue = (raw) => {
      const step = playerTargetStep.value;
      const exercise = playerTargetExercise.value;
      if (!step || !exercise) return;
      const parsed = parseOptionalNumber(raw);
      if (parsed === null || parsed < 0) {
        playerValueDraft.value = playerCurrentValue.value === null ? '' : String(playerCurrentValue.value);
        return;
      }
      const rounded = Math.round(parsed * 10) / 10;
      const values = workoutPlayer.value.values;
      if (Array.isArray(values[exercise.id])) {
        values[exercise.id].splice(step.setIdx, 1, rounded);
      } else {
        values[exercise.id] = rounded;
      }
      playerValueDraft.value = String(rounded);
      logPlayerExercise(exercise);
    };

    const playerAdjustValue = (direction) => {
      const exercise = playerTargetExercise.value;
      if (!exercise) return;
      const step = exercise.type === 'cardio' ? 1 : 2.5;
      const current = playerCurrentValue.value ?? 0;
      playerSetValue(Math.max(0, current + direction * step));
    };

    const stopPlayerTimer = () => {
      if (playerTimer) clearInterval(playerTimer);
      playerTimer = null;
    };

    const playerTick = () => {
      playerNow.value = Date.now();
      const p = workoutPlayer.value;
      if (p.phase === 'countdown') {
        const n = playerCountdown.value;
        if (p.lastBeepSecond !== n) { p.lastBeepSecond = n; beep(660); vibrate(60); }
        if (playerElapsed.value >= 3) {
          beep(1040, 0.3);
          vibrate(200);
          setPlayerPhase('ready');
        }
      } else if (p.phase === 'rest') {
        const left = Math.ceil(playerRestLeft.value);
        if (left <= 3 && left > 0 && p.lastBeepSecond !== left) { p.lastBeepSecond = left; beep(660); }
        if (playerRestLeft.value <= 0) {
          beep(1040, 0.4);
          vibrate([200, 100, 200]);
          p.restJustEnded = true;
          p.stepIdx += 1;
          setPlayerPhase('ready');
        }
      }
    };

    const setPlayerPhase = (phase) => {
      const p = workoutPlayer.value;
      p.phase = phase;
      p.phaseStartedAt = Date.now();
      p.lastBeepSecond = null;
      playerNow.value = p.phaseStartedAt;
    };

    const startGuidedWorkout = () => {
      const steps = buildWorkoutSteps();
      if (!steps.length) {
        showToastMessage('Questo giorno non ha esercizi.');
        return;
      }
      // Valori di partenza: l'ultimo registrato (per i piramidali, serie per serie)
      const values = {};
      steps.forEach(step => {
        if (step.exId in values) return;
        const ex = findSelectedExerciseById(step.exId);
        if (ex.type === 'strength' && ex.pyramid) {
          const last = lastExerciseLog(ex);
          const source = (last && Array.isArray(last.setsDetail) && last.setsDetail.length) ? last.setsDetail : (ex.setsDetail || []);
          values[ex.id] = Array.from({ length: exerciseSetCount(ex) }, (_, i) => parseOptionalNumber(source[i]?.weight) ?? null);
        } else {
          values[ex.id] = exerciseCurrentValue(ex);
        }
      });
      unlockAudio();
      requestWakeLock();
      const sessionId = ensureTodayGymSession();
      sessionPreviewModal.value.isOpen = false;
      const now = Date.now();
      workoutPlayer.value = {
        ...emptyPlayer(),
        isOpen: true,
        steps,
        values,
        startValues: JSON.parse(JSON.stringify(values)),
        sessionId,
        sessionStartedAt: now,
        sheetName: selectedSheet.value.name,
        dayName: currentSheetDay.value ? currentSheetDay.value.name : '',
        sheetId: selectedSheet.value.id,
        dayIdx: selectedSheetDayIdx.value
      };
      setPlayerPhase('countdown');
      stopPlayerTimer();
      playerTimer = setInterval(playerTick, 250);
    };

    // L'utente avvia la serie (o l'esercizio): parte il cronometro di esecuzione
    const playerStartSet = () => {
      unlockAudio();
      workoutPlayer.value.restJustEnded = false;
      setPlayerPhase('working');
    };

    // Serie completata: registra il tempo e passa al recupero / esercizio successivo / fine
    const playerCompleteSet = () => {
      const p = workoutPlayer.value;
      const step = playerStep.value;
      if (!step) return;
      p.setDurations.push({ exId: step.exId, seconds: Math.round(playerElapsed.value) });
      if (step.isLastSetOfExercise) logPlayerExercise(playerExercise.value);

      if (!playerNextStep.value) {
        finishGuidedWorkout();
        return;
      }
      if (step.restAfter > 0) {
        p.restTotal = step.restAfter;
        p.restEndsAt = Date.now() + step.restAfter * 1000;
        setPlayerPhase('rest');
      } else {
        // Superserie: si passa subito all'esercizio abbinato
        p.restJustEnded = false;
        p.stepIdx += 1;
        setPlayerPhase('ready');
      }
    };

    const playerAddRest = (seconds) => {
      const p = workoutPlayer.value;
      p.restEndsAt += seconds * 1000;
      p.restTotal += seconds;
    };

    const playerSkipRest = () => {
      const p = workoutPlayer.value;
      p.restJustEnded = false;
      p.stepIdx += 1;
      setPlayerPhase('ready');
    };

    const motivationalQuotes = [
      { title: 'Fatto. Ancora.', text: 'Ieri hai detto "domani". Oggi l\'hai fatto. Domani lo rifai.' },
      { title: 'Questo è carattere.', text: 'La motivazione ti ha portato in palestra, la disciplina ti ha fatto finire. Tienitela stretta.' },
      { title: 'Un mattone in più.', text: 'Nessuno costruisce un fisico in un giorno, ma oggi hai messo un mattone. Ancora uno domani.' },
      { title: 'Hai vinto tu.', text: 'Quella voce che diceva "salta oggi" ha perso un\'altra volta. Bel lavoro.' },
      { title: 'Più forte di ieri.', text: 'Non devi battere nessuno, solo la versione di te di ieri. Oggi ce l’hai fatta.' },
      { title: 'Costanza > talento.', text: 'Ogni serie conta, anche quelle che nessuno vede. Recupera bene, mangia bene, e si riparte.' }
    ];

    const finishGuidedWorkout = () => {
      const p = workoutPlayer.value;
      const totalSeconds = Math.round((Date.now() - p.sessionStartedAt) / 1000);
      const workSeconds = p.setDurations.reduce((sum, item) => sum + item.seconds, 0);
      const exerciseIds = [...new Set(p.steps.map(step => step.exId))];
      saveSessionReport(true);
      p.summary = {
        records: findSessionRecords(p.sessionId),
        totalSeconds,
        workSeconds,
        exercises: exerciseIds.length,
        sets: p.setDurations.length,
        quote: motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
      };
      setPlayerPhase('done');
      stopPlayerTimer();
      releaseWakeLock();
      beep(880, 0.15); setTimeout(() => beep(1175, 0.3), 180);
      vibrate([100, 60, 100, 60, 300]);
    };

    // Statistiche della sessione: salvate dentro l'allenamento del calendario
    const playerTopValue = (value) => {
      if (!Array.isArray(value)) return value ?? null;
      const valid = value.filter(v => v !== null && v !== undefined);
      return valid.length ? Math.max(...valid) : null;
    };

    const buildSessionReport = (completed) => {
      const p = workoutPlayer.value;
      const exerciseIds = [...new Set(p.steps.map(step => step.exId))];
      const exercises = exerciseIds.map(id => {
        const ex = findSelectedExerciseById(id);
        if (!ex) return null;
        const steps = p.steps.filter(step => step.exId === id);
        const durations = p.setDurations.filter(item => item.exId === id).map(item => item.seconds);
        const end = p.values[id];
        let volume = 0;
        if (ex.type !== 'cardio') {
          durations.forEach((_, i) => {
            const weight = Array.isArray(end) ? end[i] : end;
            const reps = String(steps[i]?.reps || '').trim();
            if (weight && /^\d+$/.test(reps)) volume += weight * parseInt(reps, 10);
          });
        }
        return {
          id,
          name: ex.name,
          type: ex.type,
          pyramid: !!(ex.type === 'strength' && ex.pyramid),
          superset: !!steps[0]?.superset,
          unit: exerciseUnit(ex),
          intensity: ex.intensity || '',
          reps: steps.map(step => step.reps),
          setsPlanned: steps.length,
          setsDone: durations.length,
          setDurations: durations,
          startValue: playerTopValue(p.startValues[id]),
          endValue: playerTopValue(end),
          setsWeights: Array.isArray(end) ? [...end] : null,
          baseValue: exerciseStartValue(ex),
          firstTime: !exerciseLogsFor(ex).some(log => log.date < toISODate(new Date(p.sessionStartedAt))),
          volume: Math.round(volume)
        };
      }).filter(Boolean);
      const now = Date.now();
      return {
        completed,
        startedAt: new Date(p.sessionStartedAt).toISOString(),
        endedAt: new Date(now).toISOString(),
        totalSeconds: Math.round((now - p.sessionStartedAt) / 1000),
        workSeconds: p.setDurations.reduce((sum, item) => sum + item.seconds, 0),
        sets: p.setDurations.length,
        setsPlanned: p.steps.length,
        exercises
      };
    };

    const saveSessionReport = (completed) => {
      const p = workoutPlayer.value;
      const session = trainingSessions.value.find(item => item.id === p.sessionId);
      if (!session) return;
      const report = buildSessionReport(completed);
      session.completed = completed;
      session.durationMin = Math.max(1, Math.round(report.totalSeconds / 60));
      session.report = report;
    };

    const closeGuidedWorkout = () => {
      stopPlayerTimer();
      releaseWakeLock();
      workoutPlayer.value = emptyPlayer();
    };

    const promptQuitGuidedWorkout = () => {
      if (workoutPlayer.value.phase === 'done') {
        closeGuidedWorkout();
        return;
      }
      showConfirm(
        'Interrompere l\'allenamento?',
        'I pesi già registrati restano salvati. La sessione rimane nel calendario di oggi con le statistiche fin qui.',
        () => {
          if (workoutPlayer.value.setDurations.length) saveSessionReport(false);
          closeGuidedWorkout();
        }
      );
    };

    // ---------------------------------------------------------------
    // SESSIONE IN CORSO: salvata a ogni passaggio, si riprende se l'app si chiude
    // ---------------------------------------------------------------
    const ACTIVE_WORKOUT_KEY = 'still_active_workout';
    watch(workoutPlayer, (p) => {
      if (p.isOpen && p.phase !== 'done') storage.save(ACTIVE_WORKOUT_KEY, p);
      else storage.remove(ACTIVE_WORKOUT_KEY);
    }, { deep: true });

    const resumeModal = ref({ isOpen: false, saved: null });

    // Ripristina la scheda e lo stato salvato (senza far partire i timer)
    const restoreSavedWorkout = (saved) => {
      const sheet = workoutSheets.value.find(item => String(item.id) === String(saved.sheetId));
      if (!sheet) return false;
      selectedSheet.value = sheet;
      selectedSheetDayIdx.value = Math.min(saved.dayIdx || 0, Math.max(0, (sheet.days || []).length - 1));
      // Esercizi eliminati nel frattempo: si saltano
      const steps = (saved.steps || []).filter(step => findSelectedExerciseById(step.exId));
      if (!steps.length) return false;
      const nextValid = saved.steps.slice(saved.stepIdx || 0).find(step => findSelectedExerciseById(step.exId));
      const stepIdx = nextValid ? steps.indexOf(nextValid) : steps.length - 1;
      workoutPlayer.value = { ...emptyPlayer(), ...saved, steps, stepIdx, isOpen: true };
      return true;
    };

    const checkSavedWorkout = () => {
      const raw = storage.getRaw(ACTIVE_WORKOUT_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      const sheetExists = saved && workoutSheets.value.some(item => String(item.id) === String(saved.sheetId));
      if (!saved || !saved.isOpen || !sheetExists) {
        storage.remove(ACTIVE_WORKOUT_KEY);
        return;
      }
      resumeModal.value = { isOpen: true, saved };
    };

    const resumeSavedWorkout = () => {
      const saved = resumeModal.value.saved;
      resumeModal.value = { isOpen: false, saved: null };
      if (!saved || !restoreSavedWorkout(saved)) {
        storage.remove(ACTIVE_WORKOUT_KEY);
        showToastMessage("Non è stato possibile riprendere l'allenamento: la scheda è cambiata.");
        return;
      }
      activeTab.value = 'allenamento';
      workoutView.value = 'detail';
      unlockAudio();
      requestWakeLock();
      playerNow.value = Date.now();
      stopPlayerTimer();
      playerTimer = setInterval(playerTick, 250);
    };

    // Chiude l'allenamento lasciato a metà, salvando le statistiche fin qui
    const discardSavedWorkout = () => {
      const saved = resumeModal.value.saved;
      resumeModal.value = { isOpen: false, saved: null };
      if (saved && restoreSavedWorkout(saved) && workoutPlayer.value.setDurations.length) {
        saveSessionReport(false);
      }
      closeGuidedWorkout();
      storage.remove(ACTIVE_WORKOUT_KEY);
    };

    const resumeInfo = computed(() => {
      const saved = resumeModal.value.saved;
      if (!saved) return null;
      const started = new Date(saved.sessionStartedAt);
      const sameDay = toISODate(started) === toISODate();
      const time = String(started.getHours()).padStart(2, '0') + ':' + String(started.getMinutes()).padStart(2, '0');
      return {
        title: (saved.sheetName || 'Allenamento') + (saved.dayName ? ' · ' + saved.dayName : ''),
        when: (sameDay ? 'oggi' : formatDate(toISODate(started))) + ' alle ' + time,
        done: (saved.setDurations || []).length,
        total: (saved.steps || []).length
      };
    });

    // ---------------------------------------------------------------
    // STATISTICHE ALLENAMENTO (dal calendario)
    // ---------------------------------------------------------------
    const sessionStatsModal = ref({ isOpen: false, sessionId: null, dateKey: '' });

    const openSessionStats = (session, dateKey) => {
      if (!session) return;
      sessionStatsModal.value = { isOpen: true, sessionId: session.id, dateKey: dateKey || session.occurrenceDate || session.date };
    };
    const closeSessionStats = () => { sessionStatsModal.value.isOpen = false; };

    // ---------------------------------------------------------------
    // SPORT: fatto / non fatto per ogni giorno in calendario
    // session.statusByDate = { 'YYYY-MM-DD': 'done' | 'skipped' }
    // ---------------------------------------------------------------
    const sportStatus = (session, dateKey) => {
      if (!session || !dateKey) return null;
      const original = trainingSessions.value.find(item => item.id === session.id) || session;
      return (original.statusByDate && original.statusByDate[dateKey]) || null;
    };
    const sportCanCheck = (session, dateKey) => !!session && !!dateKey && dateKey <= toISODate()
      && !(dateKey === toISODate() && timeIsAhead(session.time))
      && (session.kind === 'sport' || !(session.report && session.date === dateKey));

    const sportCheckModal = ref({ isOpen: false, sessionId: null, dateKey: '', queue: [], index: 0, total: 0 });
    const sportCheckSnoozed = new Set();   // "Più tardi": non richiedere di nuovo in questa apertura dell'app

    const sportCheckSession = computed(() => {
      const modal = sportCheckModal.value;
      if (!modal.isOpen) return null;
      return trainingSessions.value.find(item => item.id === modal.sessionId) || null;
    });

    const openSportCheck = (session, dateKey, queue = []) => {
      sportCheckModal.value = { isOpen: true, sessionId: session.id, dateKey, queue, index: 1, total: queue.length + 1 };
    };
    const closeSportCheck = () => {
      const modal = sportCheckModal.value;
      if (modal.sessionId) sportCheckSnoozed.add(modal.sessionId + '|' + modal.dateKey);   // non richiederlo subito di nuovo
      modal.isOpen = false;
    };

    const nextSportCheck = () => {
      const modal = sportCheckModal.value;
      const next = modal.queue.shift();
      if (!next) { closeSportCheck(); return; }
      modal.sessionId = next.sessionId;
      modal.dateKey = next.dateKey;
      modal.index++;
    };

    const setSportStatus = (status) => {
      const modal = sportCheckModal.value;
      const session = trainingSessions.value.find(item => item.id === modal.sessionId);
      if (!session) { nextSportCheck(); return; }
      const map = { ...(session.statusByDate || {}) };
      if (status) map[modal.dateKey] = status;
      else delete map[modal.dateKey];
      session.statusByDate = map;
      if (status) nextSportCheck();
    };

    const snoozeSportChecks = () => {
      const modal = sportCheckModal.value;
      sportCheckSnoozed.add(modal.sessionId + '|' + modal.dateKey);
      modal.queue.forEach(item => sportCheckSnoozed.add(item.sessionId + '|' + item.dateKey));
      closeSportCheck();
    };

    const editFromSportCheck = () => {
      const session = sportCheckSession.value;
      closeSportCheck();
      if (session) editTrainingSession(session);
    };

    // Allenamenti degli ultimi 7 giorni ancora da segnare (oggi solo a sessione finita).
    // Sport e palestra senza allenamento guidato: l'app non può sapere se ci sei andato, quindi chiede.
    const pendingSportChecks = () => {
      const out = [];
      const now = new Date();
      const todayKey = toISODate(now);
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const sports = trainingSessions.value.filter(s => s.kind === 'sport' || (s.kind === 'gym' && !s.report));
      if (!sports.length) return out;
      for (let offset = 7; offset >= 0; offset--) {
        const d = new Date(now);
        d.setDate(now.getDate() - offset);
        const key = toISODate(d);
        sports.forEach(session => {
          if (!trainingSessionOccursOn(session, key)) return;
          if (session.statusByDate && session.statusByDate[key]) return;
          if (sportCheckSnoozed.has(session.id + '|' + key)) return;
          if (key === todayKey) {
            // Si chiede solo a sport finito (orario di fine, oppure inizio + 1h30)
            const start = hhmmToMin(session.time);
            if (start === null) return;
            const dur = sportDurationMin(session);
            if (start + (dur || SESSION_DEFAULT_MIN) > nowMinutes) return;
          }
          out.push({ sessionId: session.id, dateKey: key });
        });
      }
      return out;
    };

    const promptPendingSportChecks = () => {
      if (sportCheckModal.value.isOpen || customModal.value.isOpen) return;
      const pending = pendingSportChecks();
      if (!pending.length) return;
      const first = pending.shift();
      const session = trainingSessions.value.find(item => item.id === first.sessionId);
      if (session) openSportCheck(session, first.dateKey, pending);
    };

    // Apre la sessione: palestra → statistiche, sport passato/di oggi → fatto/non fatto, sport futuro → modifica
    const openTrainingSessionItem = (session, dateKey) => {
      if (session.kind === 'gym' && (session.report || dateKey >= toISODate())) openSessionStats(session, dateKey);
      else if (sportCanCheck(session, dateKey)) openSportCheck(session, dateKey);
      else editTrainingSession(session, dateKey);
    };

    // ---------------------------------------------------------------
    // DASHBOARD: card "Allenamento di oggi"
    // free = niente in programma · planned = promemoria · done = recap
    // ---------------------------------------------------------------
    const minutesLabel = (min) => {
      const m = Math.max(1, Math.round(min));
      if (m < 60) return m + ' min';
      const h = Math.floor(m / 60), r = m % 60;
      return h + 'h' + (r ? ' ' + String(r).padStart(2, '0') + 'm' : '');
    };

    const todayWorkout = computed(() => {
      const now = new Date(clockNow.value);
      const today = toISODate(now);
      const nowMin = now.getHours() * 60 + now.getMinutes();
      const done = [], planned = [];
      let totalMin = 0;
      trainingSessionsOnDateKey(today).forEach(session => {
        const status = session.statusByDate && session.statusByDate[today];
        const hasReport = session.kind === 'gym' && session.report && session.date === today;
        if (hasReport || status === 'done') {
          const min = hasReport ? session.report.totalSeconds / 60 : (sportDurationMin(session) || DEFAULT_TRAINING_MIN);
          totalMin += min;
          let detail = '';
          if (hasReport) {
            const r = session.report;
            detail = (r.exercises || []).length + ' esercizi · ' + (r.sets || 0) + ' serie';
          } else detail = session.kind === 'gym' ? 'Palestra' : 'Sport';
          done.push({ id: session.id, kind: session.kind, title: trainingSessionLabel(session), dayName: session.kind === 'gym' ? session.dayName || '' : '', detail, duration: minutesLabel(min) });
        } else if (status !== 'skipped') {
          const start = hhmmToMin(session.time);
          planned.push({
            session,
            kind: session.kind,
            title: trainingSessionLabel(session),
            dayName: session.kind === 'gym' ? session.dayName || '' : '',
            time: sessionTimeLabel(session),
            started: start !== null && nowMin >= start,
            ended: sessionEndedToday(session)
          });
        }
      });
      // Carichi registrati a mano oggi, senza un allenamento guidato salvato
      // (non se la palestra di oggi deve ancora essere confermata: aggiornare i pesi non vuol dire esserci andati)
      if (!done.some(item => item.kind === 'gym') && todayLogsCount.value) {
        const logs = workoutLogs.value.filter(log => log.date === today);
        if (logs.length) {
          totalMin += DEFAULT_TRAINING_MIN;
          done.push({ id: 'logs', kind: 'gym', title: logs[0].sheetName || 'Palestra', dayName: '', detail: logs.length + (logs.length === 1 ? ' esercizio registrato' : ' esercizi registrati'), duration: '' });
        }
      }
      const state = done.length ? 'done' : (planned.length ? 'planned' : 'free');
      return { state, done, planned, totalLabel: totalMin ? minutesLabel(totalMin) : '' };
    });

    // Tocco su un allenamento in programma oggi
    const openTodayPlanned = (item) => {
      const session = item && item.session;
      if (!session) return;
      // Palestra già finita (senza allenamento guidato): chiede se ci sei andato
      if (session.kind === 'gym' && item.ended && sportCanCheck(session, toISODate())) { openSportCheck(session, toISODate()); return; }
      activeTab.value = 'allenamento';
      if (session.kind === 'gym') {
        const sheet = workoutSheets.value.find(s => String(s.id) === String(session.sheetId));
        if (sheet) {
          openSheet(sheet);
          const idx = (sheet.days || []).findIndex(d => d.name && d.name === session.dayName);
          if (idx > -1) selectedSheetDayIdx.value = idx;
          return;
        }
      } else if (item.started) {
        openSportCheck(session, toISODate());
        return;
      }
      workoutView.value = 'calendar';
    };

    const goTrainNow = () => {
      activeTab.value = 'allenamento';
      workoutView.value = 'list';
    };

    // ---------------------------------------------------------------
    // ALLENAMENTO DI OGGI SU MISURA (js/utils/coach.js): dai muscoli che hai allenato (schede e sport)
    // capisce quali sono riposati e propone l'allenamento di oggi con gli esercizi della libreria.
    // ---------------------------------------------------------------
    const libFromLogCache = new Map();
    const libraryForName = (name) => {
      const key = String(name || '').trim().toLowerCase();
      if (!key) return null;
      if (!libFromLogCache.has(key)) libFromLogCache.set(key, matchLibraryName(name) || null);
      return libFromLogCache.get(key);
    };
    // Si sa il giorno ma non l'ora: si conta come allenamento delle 18 (o di adesso, se è oggi prima delle 18)
    const logTime = (dateKey, now) => Math.min(now, new Date(dateKey + 'T18:00:00').getTime());
    const sheetSetsFor = (log) => {
      if (!log.exerciseId) return 0;
      for (const sheet of workoutSheets.value) {
        for (const day of (sheet.days || [])) {
          const ex = (day.exercises || []).find(item => String(item.id) === String(log.exerciseId));
          if (ex) return parseInt(ex.sets, 10) || 0;
        }
      }
      return 0;
    };
    const muscleEvents = (fromKey, now) => {
      const events = [];
      workoutLogs.value.forEach(log => {
        if (!log.date || log.date < fromKey) return;
        const item = libraryForName(log.exerciseName || log.exercise);
        const art = item && item.t !== 'cardio' ? exerciseArt(item) : null;
        if (art) events.push({ time: logTime(log.date, now), date: log.date, primary: art.primary, secondary: art.secondary, item, log });
      });
      // Palestra segnata "fatto" dal calendario senza carichi registrati: contano gli esercizi del giorno della scheda
      trainingSessions.value.forEach(s => {
        if (s.kind !== 'gym' || !s.statusByDate) return;
        Object.entries(s.statusByDate).forEach(([key, status]) => {
          if (status !== 'done' || key < fromKey) return;
          if (workoutLogs.value.some(l => l.date === key)) return;   // già contati dai carichi registrati
          const sheet = workoutSheets.value.find(x => String(x.id) === String(s.sheetId));
          const day = sheet && sheetDayByLabel(sheet, s.dayName);
          if (!day) return;
          (day.exercises || []).forEach(ex => {
            const item = libraryForName(ex.name);
            const art = item && item.t !== 'cardio' && ex.type !== 'cardio' ? exerciseArt(item) : null;
            if (art) events.push({ time: logTime(key, now), date: key, primary: art.primary, secondary: art.secondary, item, log: { date: key, exerciseId: ex.id, exerciseName: ex.name, sheetId: sheet.id } });
          });
        });
      });
      trainingSessions.value.forEach(s => {
        const muscles = s.kind === 'sport' && SPORT_MUSCLES[s.sport];
        if (!muscles || !s.statusByDate) return;
        Object.entries(s.statusByDate).forEach(([key, status]) => {
          if (status === 'done' && key >= fromKey) events.push({ time: logTime(key, now), date: key, primary: muscles, secondary: [], sport: s.sport });
        });
      });
      return events;
    };
    const muscleRecovery = computed(() => {
      const now = petNow.value;
      const fatigue = muscleFatigue(muscleEvents(toISODate(new Date(now - 4 * 86400000)), now), now);
      const groups = {};
      Object.entries(MUSCLE_GROUP_OF).forEach(([m, g]) => { groups[g] = Math.max(groups[g] || 0, fatigue[m]); });
      // Ultima volta (in ms) che ogni gruppo è stato allenato nelle ultime 2 settimane
      const last = {};
      muscleEvents(toISODate(new Date(now - 14 * 86400000)), now).forEach(ev => {
        ev.primary.forEach(m => { const g = MUSCLE_GROUP_OF[m]; if (g) last[g] = Math.max(last[g] || 0, ev.time); });
      });
      const colors = {};
      Object.keys(fatigue).forEach(m => { colors[m] = fatigueColor(fatigue[m]); });
      return { fatigue, groups, last, colors };
    });
    // Figura maschile o femminile secondo il profilo
    const bodySex = computed(() => (profile.value && profile.value.sex) || '');
    const muscleRecoverySvg = computed(() => muscleColorSvg(muscleRecovery.value.colors, { sex: bodySex.value }));

    const TODAY_SPLITS = [
      { id: 'push', title: 'Spinta: petto, spalle e tricipiti', groups: ['petto', 'spalle', 'braccia'], slots: [['petto', 2], ['spalle', 1, 'spalle'], ['braccia', 1, 'tricipiti'], ['addome', 1]] },
      { id: 'pull', title: 'Tirata: schiena e bicipiti', groups: ['schiena', 'braccia'], slots: [['schiena', 3], ['spalle', 1, 'spalle-post'], ['braccia', 1, 'bicipiti']] },
      { id: 'legs', title: 'Gambe e glutei', groups: ['gambe', 'glutei'], slots: [['gambe', 2], ['glutei', 2], ['addome', 1]] },
      { id: 'full', title: 'Total body', groups: ['petto', 'schiena', 'gambe', 'spalle', 'glutei'], slots: [['gambe', 1], ['petto', 1], ['schiena', 1], ['glutei', 1], ['spalle', 1, 'spalle'], ['addome', 1]] },
      { id: 'recovery', title: 'Recupero attivo: cardio leggero e mobilità', groups: [], slots: [['cardio', 1], ['mobilita', 4]] }
    ];
    const LIGHT_CARDIO = ['camminata-veloce', 'cyclette', 'bici-reclinata', 'ellittica'];
    const todayPlanVariant = ref(0);
    const trainPlace = computed(() => settings.value.trainPlace || (workoutSheets.value.some(s => !s.auto) ? 'gym' : 'home'));
    const setTrainPlace = (place) => { settings.value.trainPlace = place; todayPlanVariant.value = 0; };
    const shuffleTodayPlan = () => { todayPlanVariant.value += 1; };
    const seededRank = (text) => {
      let h = 2166136261;
      for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
      return (h >>> 0) / 4294967296;
    };
    const familiarLibraryIds = computed(() => {
      const ids = new Set();
      workoutLogs.value.forEach(log => { const item = libraryForName(log.exerciseName || log.exercise); if (item) ids.add(item.id); });
      return ids;
    });
    const todaySuggestion = computed(() => {
      const now = petNow.value;
      const today = toISODate(new Date(now));
      const rec = muscleRecovery.value;
      const place = trainPlace.value;
      const fresh = (g) => 1 - (rec.groups[g] || 0);
      // Sport in programma domani: i muscoli che usa restano riposati (es. pallavolo domani → oggi niente gambe e spalle)
      const tomorrowKey = toISODate(new Date(now + 86400000));
      const tomorrowSports = trainingSessionsOnDateKey(tomorrowKey).filter(s => s.kind === 'sport' && sportStatus(s, tomorrowKey) !== 'skipped');
      const spare = new Set();
      tomorrowSports.forEach(s => (SPORT_MUSCLES[s.sport] || []).forEach(m => { if (MUSCLE_GROUP_OF[m]) spare.add(MUSCLE_GROUP_OF[m]); }));
      const pickFresh = (g) => fresh(g) * (spare.has(g) ? 0.5 : 1);
      const trainedDays = new Set(muscleEvents(toISODate(new Date(now - 14 * 86400000)), now).map(ev => ev.date)).size;
      const beginner = trainedDays < 3 && !spare.size;
      const scored = TODAY_SPLITS.filter(s => s.id !== 'recovery').map(s => ({
        split: s, score: Math.min(...s.groups.map(pickFresh)), last: Math.max(0, ...s.groups.map(g => rec.last[g] || 0))
      }));
      // Chi si allena poco fa tutto il corpo; chi si allena spesso alterna spinta, tirata e gambe
      let pick = beginner ? scored.find(x => x.split.id === 'full')
        : scored.filter(x => x.split.id !== 'full').sort((a, b) => (b.score - a.score) || (a.last - b.last))[0];
      const recovery = !pick || pick.score < 0.6;
      const split = recovery ? TODAY_SPLITS.find(s => s.id === 'recovery') : pick.split;
      const used = new Set();
      const items = [];
      split.slots.forEach(([group, count, muscle]) => {
        const okPlace = (it) => group === 'mobilita' || it.w === place;
        let pool = EXERCISE_LIBRARY.filter(it => it.m === group && okPlace(it) && !used.has(it.id)
          && (group === 'cardio' ? LIGHT_CARDIO.includes(it.id) : it.t !== 'cardio'));
        if (muscle) {
          const narrowed = pool.filter(it => { const a = exerciseArt(it); return a && a.primary.includes(muscle); });
          if (narrowed.length) pool = narrowed;
        }
        if (!pool.length) pool = EXERCISE_LIBRARY.filter(it => it.m === group && !used.has(it.id) && (group === 'cardio' ? LIGHT_CARDIO.includes(it.id) : it.t !== 'cardio'));
        pool.map(it => ({ it, r: (familiarLibraryIds.value.has(it.id) ? 0 : 0.5) + seededRank(today + ':' + todayPlanVariant.value + ':' + it.id) * 0.9 }))
          .sort((a, b) => a.r - b.r).slice(0, count)
          .forEach(x => { used.add(x.it.id); items.push(x.it); });
      });
      const seconds = items.reduce((s, it) => s + (it.t === 'cardio' ? (it.d || 15) * 60 : (it.s || 3) * (40 + (it.rec || 60))), 0);
      const groupName = (g) => (MUSCLE_GROUPS.find(x => x.id === g) || {}).name || g;
      return {
        id: split.id, title: split.title, recovery, place, items,
        minutes: Math.max(10, Math.round(seconds / 60 / 5) * 5),
        groups: split.groups.map(g => ({ id: g, name: groupName(g), fresh: Math.round(fresh(g) * 100) })),
        tired: Object.entries(rec.groups).filter(([, f]) => f >= 0.45).map(([g]) => groupName(g)),
        beginner,
        spareFor: tomorrowSports.length ? tomorrowSports[0].sport : '',
        spared: [...spare].filter(g => !split.groups.includes(g)).map(groupName)
      };
    });
    // Oggi c'è già un allenamento (in programma o fatto): nessun consiglio in più
    const todayBusy = computed(() => {
      const w = todayWorkout.value;
      if (w.state === 'free') return '';
      return ([...w.planned, ...w.done].map(x => x.title)[0]) || 'un allenamento';
    });
    // Il consiglio resta chiuso finché non lo apri
    const suggestOpen = ref(false);
    const openSuggestion = () => {
      activeTab.value = 'allenamento';
      workoutView.value = 'list';
      suggestOpen.value = true;
    };
    const startTodaySuggestion = () => {
      const plan = todaySuggestion.value;
      if (!plan || !plan.items.length) return;
      const exercises = plan.items.map(item => ({ ...libraryToExercise(item), id: 'auto-' + item.id }));
      let sheet = workoutSheets.value.find(s => s.auto === 'today');
      if (!sheet) {
        const nextId = Math.max(Date.now(), ...workoutSheets.value.map(item => (Number(item.id) || 0) + 1));
        workoutSheets.value.push({ id: nextId, createdAt: toISODate(), name: 'Allenamento del giorno', auto: 'today', days: [] });
        sheet = workoutSheets.value[workoutSheets.value.length - 1];
      }
      sheet.days = [{ name: plan.title, exercises }];
      activeTab.value = 'allenamento';
      openSheet(sheet);
      openSessionPreview();
    };

    // Mappa dei muscoli della settimana: quante serie per muscolo negli ultimi 7 giorni
    const weekMuscles = computed(() => {
      const now = petNow.value;
      const from = toISODate(new Date(now - 6 * 86400000));
      const vol = {};
      const days = new Set();
      let sets = 0, sports = 0;
      muscleEvents(from, now).forEach(ev => {
        days.add(ev.date);
        if (ev.sport) { sports++; return; }
        const n = (Array.isArray(ev.log.setsDetail) && ev.log.setsDetail.length) || sheetSetsFor(ev.log) || 3;
        sets += n;
        ev.primary.forEach(m => { vol[m] = (vol[m] || 0) + n; });
        ev.secondary.forEach(m => { vol[m] = (vol[m] || 0) + n / 2; });
      });
      const max = Math.max(0, ...Object.values(vol));
      const colors = {};
      Object.entries(vol).forEach(([m, v]) => { const c = volumeColor(max ? v / max : 0); if (c) colors[m] = c; });
      const top = Object.entries(vol).sort((a, b) => b[1] - a[1]).slice(0, 5)
        .map(([id, v]) => ({ id, name: MUSCLE_NAMES[id] || id, sets: Math.round(v), k: max ? v / max : 0 }));
      return { sets, days: days.size, sports, top, colors, empty: !sets };
    });
    const weekMusclesSvg = computed(() => muscleColorSvg(weekMuscles.value.colors, { sex: bodySex.value }));
    const muscleShareImg = shallowRef(null);
    const loadMuscleShareImage = () => {
      const img = new Image();
      img.onload = () => { muscleShareImg.value = img; };
      img.onerror = () => { muscleShareImg.value = null; };
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(muscleColorSvg(weekMuscles.value.colors, {
        inline: true, size: 960, sex: bodySex.value, base: 'rgba(150,150,160,0.28)', empty: 'rgba(150,150,160,0.5)', label: 'rgba(150,150,160,0.95)'
      }));
    };
    const openMuscleShare = () => {
      muscleShareImg.value = null;
      loadMuscleShareImage();
      openShareStudio('muscles');
    };

    const sessionStats = computed(() => {
      const modal = sessionStatsModal.value;
      if (!modal.isOpen) return null;
      const session = trainingSessions.value.find(item => item.id === modal.sessionId);
      if (!session) return null;
      const dateKey = modal.dateKey || session.date;
      const base = { session, dateKey, dateLabel: formatDateLong(dateKey) };

      if (session.report && session.date === dateKey) {
        const r = session.report;
        return {
          ...base,
          status: r.completed ? 'completed' : 'stopped',
          totalSeconds: r.totalSeconds, workSeconds: r.workSeconds,
          sets: r.sets, setsPlanned: r.setsPlanned,
          volume: r.exercises.reduce((sum, ex) => sum + (ex.volume || 0), 0),
          exercises: r.exercises
        };
      }

      // Sessioni senza statistiche salvate: si ricostruiscono dai pesi registrati quel giorno
      const logs = workoutLogs.value.filter(log =>
        log.date === dateKey && String(log.sheetId ?? '') === String(session.sheetId ?? ''));
      if (!logs.length) {
        return { ...base, status: dateKey > toISODate() ? 'planned' : 'nodata', exercises: [] };
      }
      const exercises = logs.map(log => {
        const isCardio = !!log.isCardio || ((log.weight === null || log.weight === undefined) && log.duration !== null && log.duration !== undefined);
        const prev = exerciseLogsFor(logTarget(log)).filter(item => item.date < dateKey).pop();
        const pick = (item) => item ? parseOptionalNumber(isCardio ? item.duration : item.weight) : null;
        return {
          id: log.id, name: log.exerciseName, type: isCardio ? 'cardio' : 'strength',
          pyramid: !!(log.setsDetail && log.setsDetail.length), superset: false,
          unit: isCardio ? 'min' : 'kg', intensity: log.intensity || '',
          reps: [], setsPlanned: null, setsDone: null, setDurations: [],
          startValue: pick(prev), endValue: pick(log),
          setsWeights: log.setsDetail ? log.setsDetail.map(set => set.weight) : null,
          baseValue: null, volume: 0
        };
      });
      return { ...base, status: 'logs', exercises, volume: 0 };
    });

    const statsDelta = (ex) => {
      if (!ex || ex.startValue === null || ex.startValue === undefined || ex.endValue === null || ex.endValue === undefined) return null;
      return Math.round((ex.endValue - ex.startValue) * 10) / 10;
    };
    const statsBaseDelta = (ex) => {
      if (!ex || ex.baseValue === null || ex.baseValue === undefined || ex.endValue === null || ex.endValue === undefined) return null;
      return Math.round((ex.endValue - ex.baseValue) * 10) / 10;
    };
    const statsAvgSet = (ex) => {
      const list = (ex && ex.setDurations) || [];
      return list.length ? list.reduce((a, b) => a + b, 0) / list.length : null;
    };
    const statsRepsLabel = (ex) => {
      const reps = ((ex && ex.reps) || []).map(r => String(r || '').trim()).filter(Boolean);
      if (!reps.length || (ex && ex.type === 'cardio')) return '';
      return reps.every(r => r === reps[0]) ? reps[0] : reps.join('·');
    };
    const statsImproved = computed(() => (sessionStats.value ? sessionStats.value.exercises.filter(ex => !ex.firstTime && (statsDelta(ex) || 0) > 0).length : 0));

    const openSheetFromStats = () => {
      const stats = sessionStats.value;
      const sheet = stats && workoutSheets.value.find(item => String(item.id) === String(stats.session.sheetId));
      sessionStatsModal.value.isOpen = false;
      if (!sheet) { showToastMessage('La scheda di questo allenamento non esiste più.'); return; }
      trainingDayModal.value.isOpen = false;
      dayMenuModal.value.isOpen = false;
      activeTab.value = 'allenamento';
      openSheet(sheet);
      const dayIdx = (sheet.days || []).findIndex(day => day.name === stats.session.dayName);
      if (dayIdx > -1) selectedSheetDayIdx.value = dayIdx;
    };

    const measurementModal = ref({ isOpen: false, error: '' });
    const editingMeasurementId = ref(null);
    const historyModal = ref({ isOpen: false, type: 'weight' });

    const emptyMeasurementForm = () => ({
      date: toISODate(), weight: '', chest: '', arms: '', waist: '', thighs: '', belly: ''
    });

    const newMeasurement = ref(emptyMeasurementForm());

    const openMeasurementModal = (entry = null) => {
      editingMeasurementId.value = entry ? entry.id : null;
      newMeasurement.value = entry ? {
        date: entry.date,
        weight: entry.weight ?? '',
        chest: entry.chest ?? '',
        arms: entry.arms ?? '',
        waist: entry.waist ?? '',
        thighs: entry.thighs ?? '',
        belly: entry.belly ?? ''
      } : emptyMeasurementForm();
      measurementModal.value = { isOpen: true, error: '' };
    };

    const editMeasurement = (entry) => {
      historyModal.value.isOpen = false;
      openMeasurementModal(entry);
    };

    const parseOptionalNumber = (value) => {
      const parsed = parseFloat(String(value).replace(',', '.'));
      return Number.isFinite(parsed) ? parsed : null;
    };

    // Un campo vuoto è valido; se contiene testo deve essere segnalato all'utente
    const isInvalidNumber = (value) => {
      const trimmed = String(value ?? '').trim();
      if (trimmed === '') return false;
      return !/^\d+(?:[.,]\d+)?$/.test(trimmed);
    };

    const formatNumber = (value) => {
      if (value === null || value === undefined || Number.isNaN(Number(value))) return '-';
      return Number(value).toLocaleString('it-IT', { maximumFractionDigits: 1 });
    };

    const daysBetween = (fromDate, toDate) => {
      const from = new Date(fromDate + 'T00:00:00');
      const to = new Date(toDate + 'T00:00:00');
      return Math.max(0, Math.round((to - from) / 86400000));
    };

    const saveMeasurement = () => {
      const data = newMeasurement.value;

      const numericFields = [
        { label: 'Peso', value: data.weight },
        { label: 'Petto', value: data.chest },
        { label: 'Braccia', value: data.arms },
        { label: 'Vita', value: data.waist },
        { label: 'Cosce', value: data.thighs },
        { label: 'Pancia', value: data.belly }
      ];

      const invalidField = numericFields.find(field => isInvalidNumber(field.value));
      if (invalidField) {
        measurementModal.value.error = `${invalidField.label}: inserisci un numero valido (es. 79,4).`;
        return;
      }

      const entry = {
        date: data.date || toISODate(),
        weight: parseOptionalNumber(data.weight),
        chest: parseOptionalNumber(data.chest),
        arms: parseOptionalNumber(data.arms),
        waist: parseOptionalNumber(data.waist),
        thighs: parseOptionalNumber(data.thighs),
        belly: parseOptionalNumber(data.belly)
      };

      const hasBodyMeasurement = [entry.weight, entry.chest, entry.arms, entry.waist, entry.thighs, entry.belly].some(v => v !== null);

      if (!hasBodyMeasurement) {
        measurementModal.value.error = "Inserisci almeno una misurazione.";
        return;
      }

      if (editingMeasurementId.value !== null) {
        const index = measurements.value.findIndex(m => m.id === editingMeasurementId.value);
        if (index > -1) {
          measurements.value[index] = { ...measurements.value[index], ...entry };
        }
        editingMeasurementId.value = null;
        measurementModal.value.isOpen = false;
        showToastMessage("Misurazione aggiornata! ✏️");
        return;
      }

      measurements.value.push({ id: Date.now(), ...entry });
      measurementModal.value.isOpen = false;
      showToastMessage("Misurazione salvata! 📈");
    };

    const removeMeasurement = (entry) => {
      const index = measurements.value.findIndex(m => m.id === entry.id);
      if (index > -1) measurements.value.splice(index, 1);
    };

    const confirmDeleteMeasurement = (entry) => {
      showConfirm(
        "Elimina misurazione",
        `Vuoi eliminare la misurazione del ${formatDate(entry.date)}? Verranno rimosse tutte le misure registrate in quella scheda.`,
        () => {
          removeMeasurement(entry);
          showToastMessage("Misurazione eliminata. 🗑️");
        }
      );
    };

    const promptDeleteEditingMeasurement = () => {
      const entry = measurements.value.find(m => m.id === editingMeasurementId.value);
      if (!entry) return;

      showConfirm(
        "Elimina misurazione",
        `Vuoi eliminare la misurazione del ${formatDate(entry.date)}? Verranno rimosse tutte le misure registrate in quella scheda.`,
        () => {
          removeMeasurement(entry);
          measurementModal.value.isOpen = false;
          editingMeasurementId.value = null;
          showToastMessage("Misurazione eliminata. 🗑️");
        }
      );
    };

    const sortedMeasurements = computed(() => {
      return [...measurements.value].sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id);
    });

    const weightEntries = computed(() => {
      return sortedMeasurements.value.filter(m => m.weight !== null && m.weight !== undefined);
    });

    const latestWeight = computed(() => {
      const entries = weightEntries.value;
      return entries.length > 0 ? entries[entries.length - 1] : null;
    });

    const weightDelta = computed(() => {
      const entries = weightEntries.value;
      if (entries.length < 2) return null;

      const first = entries[0];
      const last = entries[entries.length - 1];
      const diff = last.weight - first.weight;

      return {
        value: diff,
        days: daysBetween(first.date, last.date),
        text: `${diff > 0 ? '+' : ''}${formatNumber(diff)} kg`,
        classes: diff <= 0 ? 'bg-salvia/10 text-salvia' : 'bg-arancione/10 text-arancione'
      };
    });

    const weightChart = computed(() => {
      const entries = weightEntries.value;
      if (entries.length === 0) return { points: [], line: '', area: '' };

      const values = entries.map(entry => entry.weight);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = Math.max(max - min, 1);

      const xStart = 20;
      const xEnd = 270;
      const yTop = 25;
      const yBottom = 120;
      const labelStep = Math.ceil(entries.length / 6);

      const points = entries.map((entry, index) => {
        const x = entries.length === 1
          ? (xStart + xEnd) / 2
          : xStart + (index * (xEnd - xStart)) / (entries.length - 1);
        const y = entries.length === 1
          ? (yTop + yBottom) / 2
          : yBottom - ((entry.weight - min) / range) * (yBottom - yTop);

        return {
          x: Number(x.toFixed(1)),
          y: Number(y.toFixed(1)),
          label: formatNumber(entry.weight),
          showLabel: entries.length <= 7 || index === 0 || index === entries.length - 1 || index % labelStep === 0
        };
      });

      const line = points.map(point => `${point.x},${point.y}`).join(' ');
      const area = `${points[0].x},140 ${line} ${points[points.length - 1].x},140`;

      return { points, line, area };
    });

    const circumferenceFields = [
      { key: 'chest', label: 'Petto', icon: '👕' },
      { key: 'arms', label: 'Braccia', icon: '💪' },
      { key: 'waist', label: 'Vita', icon: '📏' },
      { key: 'thighs', label: 'Cosce', icon: '🦵' },
      { key: 'belly', label: 'Pancia', icon: '🧍' }
    ];

    // Regola colori circonferenze (vale per tutte le misure):
    // verde  = sotto la partenza e sotto l'ultima misurazione
    // giallo = sotto la partenza ma sopra l'ultima misurazione
    // viola  = sotto la partenza ma sopra le ultime 2 misurazioni
    // rosso  = sopra la misurazione di partenza
    const circumferenceTrendColor = (entries, key) => {
      if (!entries || entries.length < 2) return 'text-gray-400';
      const values = entries.map(entry => entry[key]);
      const start = values[0];
      const current = values[values.length - 1];
      const last = values[values.length - 2];
      const beforeLast = values.length >= 3 ? values[values.length - 3] : null;

      if (current > start) return 'text-red-500';
      if (current < start) {
        if (current < last) return 'text-salvia';
        if (current === last) return 'text-gray-400';
        if (beforeLast !== null && current > beforeLast) return 'text-viola';
        return 'text-arancione';
      }
      return 'text-gray-400';
    };

    const circumferenceRows = computed(() => {
      return circumferenceFields.map(field => {
        const entries = sortedMeasurements.value.filter(m => m[field.key] !== null && m[field.key] !== undefined);
        if (entries.length === 0) return null;

        const first = entries[0];
        const last = entries[entries.length - 1];
        const delta = last[field.key] - first[field.key];
        const days = daysBetween(first.date, last.date);
        const color = circumferenceTrendColor(entries, field.key);

        return {
          key: field.key,
          label: field.label,
          icon: field.icon,
          initial: first[field.key],
          initialDate: first.date,
          current: last[field.key],
          date: last.date,
          count: entries.length,
          delta,
          days,
          arrowUp: delta > 0,
          deltaText: `${delta > 0 ? '+' : ''}${formatNumber(delta)} cm`,
          currentColor: color,
          deltaColor: color
        };
      }).filter(Boolean);
    });

    // Storico dettagliato (peso o singola circonferenza)
    const historyRows = computed(() => {
      const type = historyModal.value.type;
      const list = type === 'weight'
        ? weightEntries.value
        : sortedMeasurements.value.filter(m => m[type] !== null && m[type] !== undefined);

      const rows = list.map((entry, index) => {
        const value = type === 'weight' ? entry.weight : entry[type];
        const previousEntry = index > 0 ? list[index - 1] : null;
        const previousValue = previousEntry
          ? (type === 'weight' ? previousEntry.weight : previousEntry[type])
          : null;
        const delta = previousValue !== null ? value - previousValue : null;
        const trendColor = type === 'weight'
          ? (delta === null || delta === 0 ? 'text-gray-400' : (delta <= 0 ? 'text-salvia' : 'text-arancione'))
          : circumferenceTrendColor(list.slice(0, index + 1), type);

        return {
          entry,
          value,
          delta,
          deltaText: delta === null
            ? ''
            : `${delta > 0 ? '+' : ''}${formatNumber(delta)} ${type === 'weight' ? 'kg' : 'cm'}`,
          deltaColor: trendColor
        };
      });

      return rows.reverse();
    });

    const historyField = computed(() => {
      if (historyModal.value.type === 'weight') {
        return { label: 'Peso', icon: '⚖️', unit: 'kg' };
      }
      return circumferenceFields.find(f => f.key === historyModal.value.type) || circumferenceFields[0];
    });

    const historyIcon = computed(() => historyField.value.icon);
    const historyLabel = computed(() => historyField.value.label);
    const historyUnit = computed(() => historyField.value.unit || 'cm');

    const openHistory = (type) => {
      historyModal.value = { isOpen: true, type };
    };

    const closeHistory = () => {
      historyModal.value.isOpen = false;
    };

    // I progressi allenamento derivano automaticamente dai log scritti nella sezione Allenamento
    const workoutGroups = computed(() => {
      const byExercise = {};

      workoutLogs.value.forEach(log => {
        const logName = (log.exerciseName || log.exercise || '').trim();
        const load = parseOptionalNumber(log.weight ?? log.load);
        if (!logName || load === null || !log.date) return;

        const key = log.exerciseId ? 'id:' + log.exerciseId : 'name:' + logName.toLowerCase();
        if (!byExercise[key]) {
          const info = findExerciseInfo(log);
          byExercise[key] = {
            key,
            name: info ? info.exercise.name : logName,
            sheetName: info ? info.sheet.name : (log.sheetName || ''),
            entries: []
          };
        }
        byExercise[key].entries.push({
          date: log.date,
          load,
          reps: parseOptionalNumber(log.reps)
        });
      });

      return Object.values(byExercise).map(group => {
        // Prende il miglior set di ogni giornata
        const bestByDate = {};
        group.entries.forEach(entry => {
          if (!bestByDate[entry.date] || entry.load > bestByDate[entry.date].load) {
            bestByDate[entry.date] = entry;
          }
        });

        const sessions = Object.values(bestByDate).sort((a, b) => a.date.localeCompare(b.date));
        const first = sessions[0];
        const last = sessions[sessions.length - 1];
        const delta = last.load - first.load;

        return {
          key: group.key,
          name: group.name,
          sheetName: group.sheetName,
          sessions: sessions.length,
          firstLoad: first.load,
          lastLoad: last.load,
          lastReps: last.reps,
          lastDate: last.date,
          delta,
          deltaText: delta === 0 ? 'Stabile' : `${delta > 0 ? '+' : ''}${formatNumber(delta)} kg`,
          classes: delta > 0 ? 'bg-salvia/10 text-salvia' : (delta < 0 ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400')
        };
      }).sort((a, b) => b.lastDate.localeCompare(a.lastDate))
        .map((group, _, all) => ({
          ...group,
          // Stesso nome in schede diverse: si mostra anche la scheda
          label: all.some(other => other.key !== group.key && other.name.toLowerCase() === group.name.toLowerCase()) && group.sheetName
            ? group.name + ' · ' + group.sheetName
            : group.name
        }));
    });


    // Calendar Logic
    const todayDate = new Date();
    const currentYear = ref(todayDate.getFullYear());
    const currentMonth = ref(todayDate.getMonth());
    
    const currentMonthName = computed(() => {
      return new Intl.DateTimeFormat('it-IT', { month: 'long' }).format(new Date(currentYear.value, currentMonth.value, 1));
    });
    
    const daysInMonth = computed(() => {
      return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
    });
    
    const firstDayOfMonth = computed(() => {
      let firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
      return firstDay === 0 ? 6 : firstDay - 1; 
    });

    const nextMonth = () => {
      if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value++;
      } else {
        currentMonth.value++;
      }
    };

    const prevMonth = () => {
      if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
      } else {
        currentMonth.value--;
      }
    };

    const exportMode = ref(false);
    const exportSelectedDates = ref([]);
    
    const commentsMap = ref(storage.load('still_comments', {}));

    // Auto-salvataggio delle note nella memoria del telefono
    watch(commentsMap, (newComments) => {
      storage.save('still_comments', newComments);
    }, { deep: true });

    // ---------------------------------------------------------------
    // FRASE DEL GIORNO: una sola al giorno, uguale per tutta la giornata.
    // A giorni alterni, se ne hai salvate, tocca a una delle tue barre.
    // ---------------------------------------------------------------
    // STILL_BARS: vedi js/data/quotes.js

    const dayNumber = () => {
      const d = new Date();
      return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
    };
    // Permutazione stabile: lo stesso giorno mostra sempre la stessa frase, giorni vicini frasi diverse
    const pickIndex = (n, len) => ((n * 7919) % len + len) % len;

    const dailyBar = computed(() => STILL_BARS[pickIndex(dayNumber(), STILL_BARS.length)]);

    const noteForToday = computed(() => {
      return commentsMap.value[`${todayDate.getFullYear()}-${todayDate.getMonth()}-${todayDate.getDate()}`];
    });

    const isToday = (day) => {
      return day === todayDate.getDate() && currentMonth.value === todayDate.getMonth() && currentYear.value === todayDate.getFullYear();
    };

    const isSunday = (day) => {
      return new Date(currentYear.value, currentMonth.value, day).getDay() === 0;
    };

    const hasComment = (day) => !!commentsMap.value[`${currentYear.value}-${currentMonth.value}-${day}`];

    const handleDayClick = (day) => {
      if (exportMode.value) {
        const index = exportSelectedDates.value.indexOf(day);
        if (index > -1) {
          exportSelectedDates.value.splice(index, 1);
        } else {
          exportSelectedDates.value.push(day);
          exportSelectedDates.value.sort((a,b) => a - b);
        }
      } else {
        commentModal.value.date = day;
        commentModal.value.key = `${currentYear.value}-${currentMonth.value}-${day}`;
        commentModal.value.text = commentsMap.value[commentModal.value.key] || '';
        commentModal.value.isOpen = true;
      }
    };

    const closeCommentModal = () => {
      commentModal.value.isOpen = false;
    };

    const saveComment = () => {
      if (commentModal.value.text.trim() === '') {
        delete commentsMap.value[commentModal.value.key];
      } else {
        commentsMap.value[commentModal.value.key] = commentModal.value.text;
      }
      closeCommentModal();
    };

    // Modale commenti (calendario nutrizione): menu e stato sincronizzati col calendario dashboard
    const commentModalMeals = computed(() => {
      if (!commentModal.value.isOpen || commentModal.value.date === null) return [];
      const planMeals = getMealsForDate(new Date(currentYear.value, currentMonth.value, commentModal.value.date));
      return planMeals.length > 0 ? planMeals : (selectedPlan.value?.meals || []);
    });

    const commentModalStatus = computed(() => {
      if (!commentModal.value.isOpen || commentModal.value.date === null) return 'empty';
      return nutritionDayStatus(commentModal.value.date);
    });

    const commentModalTrainingSessions = computed(() => {
      if (!commentModal.value.isOpen || commentModal.value.date === null) return [];
      const key = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(commentModal.value.date).padStart(2, '0')}`;
      return trainingSessionsOnDateKey(key);
    });

    const exportSelectedMenu = () => {
       if(exportSelectedDates.value.length === 0 || !selectedPlan.value) return;
       
       let text = `🗓️ *Menù STILL - Esportazione Giornate*\n\n`;
       
       exportSelectedDates.value.forEach(day => {
          text += `--- Giorno ${day} ${currentMonthName.value} ---\n`;
          selectedPlan.value.meals.forEach(m => {
            const kcal = m.calories !== null && m.calories !== undefined && m.calories !== '-'
              ? `${m.calories} kcal`
              : 'kcal n.d.';
            text += `${m.icon || '🍽️'} ${m.name} (${kcal})\n   ${m.description}\n`;
          });
          const key = `${currentYear.value}-${currentMonth.value}-${day}`;
          if(commentsMap.value[key]) {
             text += `💡 Nota: ${commentsMap.value[key]}\n`;
          }
          text += `\n`;
       });

       text += `Totale giornaliero: ${selectedPlanTotalCalories.value} kcal\n`;
       text += `STILL App. Ancora in movimento.`;

       copyToClipboard(text, `Menù di ${exportSelectedDates.value.length} giorni copiato negli appunti!`);
       exportMode.value = false;
       exportSelectedDates.value = [];
    };

    // Watchers
    watch(activeTab, (newTab) => {
      if (newTab === 'dashboard') {
        scrollToCurrentMeal();
      }
    });

    // ---------------------------------------------------------------
    // PROFILO E REGISTRAZIONE INIZIALE
    // ---------------------------------------------------------------
    const profile = ref(storage.load('still_profile', null));
    watch(profile, (value) => { if (value) storage.save('still_profile', value); }, { deep: true });

    const calcAge = (birthDate) => {
      if (!birthDate) return null;
      const birth = new Date(birthDate + 'T00:00:00');
      if (Number.isNaN(birth.getTime())) return null;
      const now = new Date();
      let age = now.getFullYear() - birth.getFullYear();
      if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) age--;
      return age >= 0 ? age : null;
    };
    const profileInitial = computed(() => ((profile.value && profile.value.firstName) || '?').trim().charAt(0).toUpperCase());
    const profileFullName = computed(() => profile.value ? [profile.value.firstName, profile.value.lastName].filter(Boolean).join(' ') : '');
    const profileAge = computed(() => calcAge(profile.value && profile.value.birthDate));

    // Validazione comune a registrazione e modifica profilo
    const validateProfileFields = (form) => {
      if (!String(form.firstName || '').trim()) return 'Scrivi il tuo nome per continuare.';
      if (form.birthDate && form.birthDate > toISODate()) return 'La data di nascita non può essere nel futuro.';
      if (isInvalidNumber(form.height)) return "L'altezza deve essere un numero (es. 178).";
      const height = parseOptionalNumber(form.height);
      if (height !== null && (height < 80 || height > 250)) return "Controlla l'altezza: va indicata in centimetri.";
      return '';
    };
    const sexOptions = [{ id: 'M', label: 'Uomo' }, { id: 'F', label: 'Donna' }];
    const profileFromForm = (form) => ({
      firstName: String(form.firstName).trim(),
      lastName: String(form.lastName || '').trim(),
      birthDate: form.birthDate || '',
      height: parseOptionalNumber(form.height),
      sex: form.sex === 'M' || form.sex === 'F' ? form.sex : ''
    });

    const onboarding = ref({
      step: 0, error: '', firstName: '', lastName: '', birthDate: '', height: '', sex: '',
      weight: '', chest: '', arms: '', waist: '', thighs: '', belly: ''
    });
    const onboardingFileInput = ref(null);

    const onboardingNext = () => {
      const error = validateProfileFields(onboarding.value);
      onboarding.value.error = error;
      if (!error) onboarding.value.step = 2;
    };
    const onboardingBack = () => {
      onboarding.value.error = '';
      onboarding.value.step = Math.max(0, onboarding.value.step - 1);
    };

    // Ogni minuto: aggiorna l'orologio e, se un allenamento è appena finito, chiede se ti sei allenato
    const autoPromptChecks = () => {
      if (!isAuthenticated.value || document.visibilityState !== 'visible') return;
      if (workoutPlayer.value && workoutPlayer.value.isOpen) return;
      if (trainingFormModal.value.isOpen || pastChecksModal.value.isOpen || lightDayModal.value.isOpen || recordModal.value.isOpen) return;
      promptPendingSportChecks();
    };
    setInterval(() => { clockNow.value = Date.now(); autoPromptChecks(); }, 60 * 1000);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') return;
      clockNow.value = Date.now();
      setTimeout(autoPromptChecks, 500);
    });

    const enterApp = () => {
      isAuthenticated.value = true;
      requestPersistentStorage();
      if (activeTab.value === 'dashboard') scrollToCurrentMeal();
      checkSavedWorkout();
      // Chiede com'è andato lo sport dei giorni scorsi (dopo eventuali altri avvisi)
      setTimeout(() => {
        if (workoutPlayer.value && workoutPlayer.value.isOpen) return;
        promptPendingSportChecks();
      }, 700);
    };

    const completeOnboarding = () => {
      const form = onboarding.value;
      const bodyFields = [
        { key: 'weight', label: 'Peso' }, { key: 'chest', label: 'Petto' }, { key: 'arms', label: 'Braccia' },
        { key: 'waist', label: 'Vita' }, { key: 'thighs', label: 'Cosce' }, { key: 'belly', label: 'Pancia' }
      ];
      const invalid = bodyFields.find(field => isInvalidNumber(form[field.key]));
      if (invalid) {
        form.error = invalid.label + ': inserisci un numero valido.';
        return;
      }
      profile.value = { ...profileFromForm(form), createdAt: toISODate() };
      const entry = { date: toISODate() };
      bodyFields.forEach(field => { entry[field.key] = parseOptionalNumber(form[field.key]); });
      if (bodyFields.some(field => entry[field.key] !== null)) {
        measurements.value.push({ id: Date.now(), ...entry });
      }
      enterApp();
      // Primo accesso: benvenuto con la card da condividere nelle storie
      setTimeout(() => { welcomeModal.value.isOpen = true; }, 400);
    };

    // Benvenuto dopo la registrazione
    const welcomeModal = ref({ isOpen: false });
    const closeWelcome = () => { welcomeModal.value.isOpen = false; };
    const shareWelcome = () => {
      welcomeModal.value.isOpen = false;
      openAchievementShare({ type: 'welcome' });
      if (shareVideoSupported) shareStudio.value.output = 'video';
      shareStudio.value.format = 'story';
    };

    // ---------------------------------------------------------------
    // IL TUO CORPO: statistiche calcolate da profilo, misure e allenamenti.
    // Stime con formule standard (non sostituiscono il parere di un professionista).
    // ---------------------------------------------------------------
    const bodyInfoOpen = ref('');
    const toggleBodyInfo = (key) => { bodyInfoOpen.value = bodyInfoOpen.value === key ? '' : key; };
    const roundTo = (v, step) => Math.round(v / step) * step;

    const bodyStats = computed(() => {
      const p = profile.value || {};
      const weightEntry = latestWeight.value;
      const weight = weightEntry ? Number(weightEntry.weight) : null;
      const height = p.height ? Number(p.height) : null;
      const age = profileAge.value;
      const sex = p.sex === 'M' || p.sex === 'F' ? p.sex : '';
      const waistEntry = [...sortedMeasurements.value].reverse().find(m => m.waist !== null && m.waist !== undefined && m.waist !== '');
      const waist = waistEntry ? Number(waistEntry.waist) : null;
      const missing = [];
      if (!weight) missing.push('peso');
      if (!height) missing.push('altezza');
      if (age === null) missing.push('data di nascita');
      if (!sex) missing.push('sesso');
      const out = { missing, weight, height, age, sex, waist, tiles: {} };
      const h = height ? height / 100 : null;

      // BMI
      if (weight && h) {
        const bmi = weight / (h * h);
        const cat = bmi < 18.5 ? { label: 'Sottopeso', color: 'text-sky-600' }
          : bmi < 25 ? { label: 'Normopeso', color: 'text-salvia' }
          : bmi < 30 ? { label: 'Sovrappeso', color: 'text-arancione' }
          : { label: 'Obesità', color: 'text-red-500' };
        // Posizione sulla barra 15 → 35
        out.bmi = { value: bmi, ...cat, pos: Math.max(0, Math.min(100, ((bmi - 15) / 20) * 100)) };
        out.idealWeight = { min: 18.5 * h * h, max: 24.9 * h * h };
        out.idealWeight.delta = weight < out.idealWeight.min ? weight - out.idealWeight.min : (weight > out.idealWeight.max ? weight - out.idealWeight.max : 0);
      }

      // Rapporto vita / altezza
      if (waist && height) {
        const r = waist / height;
        out.whtr = { value: r, ...(r < 0.4 ? { label: 'Molto basso', color: 'text-sky-600' } : r < 0.5 ? { label: 'Ottimo', color: 'text-salvia' } : r < 0.6 ? { label: 'Da tenere d\'occhio', color: 'text-arancione' } : { label: 'Alto', color: 'text-red-500' }) };
      }

      // Massa grassa stimata: RFM (dalla vita) oppure Deurenberg (da BMI ed età)
      if (sex && weight && h) {
        let pct = null, method = '';
        if (waist && height) { pct = (sex === 'M' ? 64 : 76) - 20 * (height / waist); method = 'dalla circonferenza vita'; }
        else if (age !== null && out.bmi) { pct = 1.2 * out.bmi.value + 0.23 * age - 10.8 * (sex === 'M' ? 1 : 0) - 5.4; method = 'da BMI ed età'; }
        if (pct !== null) {
          pct = Math.max(3, Math.min(60, pct));
          const bands = sex === 'M' ? [6, 14, 18, 25] : [14, 21, 25, 32];
          const labels = ['Molto bassa', 'Da atleta', 'In forma', 'Nella media', 'Alta'];
          const colors = ['text-sky-600', 'text-salvia', 'text-salvia', 'text-arancione', 'text-red-500'];
          const i = bands.findIndex(b => pct < b);
          const idx = i < 0 ? 4 : i;
          out.bodyFat = { value: pct, fatKg: weight * pct / 100, leanKg: weight * (1 - pct / 100), label: labels[idx], color: colors[idx], method };
        }
      }

      // Attività: ore di allenamento a settimana nelle ultime 4 settimane (palestra + sport segnati)
      const today = toISODate();
      const from = new Date(); from.setHours(12, 0, 0, 0); from.setDate(from.getDate() - 27);
      const weeklyHours = trainingSecondsBetween(toISODate(from), today).total / 3600 / 4;
      const level = weeklyHours < 1 ? { factor: 1.2, label: 'Sedentario' }
        : weeklyHours < 3 ? { factor: 1.375, label: 'Poco attivo' }
        : weeklyHours < 5 ? { factor: 1.55, label: 'Attivo' }
        : weeklyHours < 8 ? { factor: 1.725, label: 'Molto attivo' }
        : { factor: 1.9, label: 'Atleta' };
      out.activity = { weeklyHours, ...level };

      // Metabolismo basale (Mifflin-St Jeor) e fabbisogno giornaliero
      if (weight && height && age !== null && sex) {
        const bmr = 10 * weight + 6.25 * height - 5 * age + (sex === 'M' ? 5 : -161);
        const tdee = bmr * level.factor;
        out.energy = {
          bmr: roundTo(bmr, 10),
          tdee: roundTo(tdee, 10),
          lose: roundTo(Math.max(bmr, tdee - 500), 10),
          gain: roundTo(tdee + 300, 10)
        };
      }

      // Acqua e proteine
      if (weight) {
        out.water = Math.round((weight * 0.035 + (weeklyHours / 7) * 0.5) * 10) / 10;
        const active = weeklyHours >= 2;
        out.protein = { min: roundTo(weight * (active ? 1.6 : 1.0), 5), max: roundTo(weight * (active ? 2.0 : 1.2), 5), active };
      }

      // Il piano a confronto: calorie medie dei prossimi 7 giorni del piano attivo
      if (activePlan.value && out.energy) {
        let total = 0, days = 0;
        for (let i = 0; i < 7; i++) {
          const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + i);
          const kcal = getMealsForDate(d).reduce((s, m) => s + (m.calories || 0), 0);
          if (kcal > 0) { total += kcal; days++; }
        }
        if (days) {
          const planKcal = Math.round(total / days);
          const balance = planKcal - out.energy.tdee;
          out.plan = { kcal: planKcal, balance, perWeek: (balance * 7) / 7700 };
        }
      }

      // Andamento reale del peso (ultime ~8 settimane)
      const recent = weightEntries.value.filter(e => daysBetween(e.date, today) <= 60);
      if (recent.length >= 2) {
        const first = recent[0], last = recent[recent.length - 1];
        const days = daysBetween(first.date, last.date);
        if (days >= 7) out.trend = { perWeek: ((last.weight - first.weight) / days) * 7, days };
      }
      return out;
    });

    // ---------------------------------------------------------------
    // CONSUMO REALE (calorie adattive, js/utils/coach.js): dalle giornate segnate per intero
    // e dalle pesate delle ultime 4 settimane calcola quanto consumi davvero.
    // ---------------------------------------------------------------
    // Calorie di una giornata segnata per intero (tutti i pasti del piano, oppure almeno pranzo e cena), altrimenti null
    const dayEatenComplete = (dateKey) => {
      const meals = getMealsForDate(new Date(dateKey + 'T00:00:00'));
      const logs = mealLogs.value[dateKey] || {};
      const diary = foodDiary.value[dateKey] || {};
      let kcal = 0, unknown = 0, logged = 0;
      meals.forEach(m => {
        const l = logs[m.id];
        if (!l) return;
        logged++;
        if (l.status === 'done') { if (m.calories) kcal += m.calories; else unknown++; }
        else if (l.status === 'other') { if (l.kcal !== null && l.kcal !== undefined) kcal += l.kcal; else unknown++; }
      });
      Object.values(diary).forEach(e => {
        if (!e || !(e.text || e.kcal)) return;
        if (e.kcal !== null && e.kcal !== undefined) kcal += e.kcal; else unknown++;
      });
      const complete = unknown === 0 && (meals.length ? logged === meals.length : !!(diary.pranzo && diary.cena));
      return complete && kcal > 0 ? Math.round(kcal) : null;
    };
    const realExpenditure = computed(() => {
      const today = todayDateKey.value;
      const days = [];
      for (let i = 1; i <= 28; i++) {
        const d = new Date(today + 'T12:00:00');
        d.setDate(d.getDate() - i);
        const key = toISODate(d);
        const kcal = dayEatenComplete(key);
        if (kcal !== null) days.push({ date: key, kcal });
      }
      const weights = weightEntries.value.filter(e => daysBetween(e.date, today) <= 31)
        .map(e => ({ date: e.date, weight: Number(e.weight) }));
      const energy = bodyStats.value.energy;
      const r = adaptiveExpenditure({ days, weights, formula: energy ? energy.tdee : null });
      if (r.ready) {
        r.lose = Math.round(Math.max(energy ? energy.bmr : 1200, r.tdee - 500) / 10) * 10;
        r.gain = r.tdee + 300;
      }
      return r;
    });
    realExpHolder.value = realExpenditure;
    const realExpNeedText = computed(() => {
      const r = realExpenditure.value;
      if (r.ready) return '';
      const parts = [];
      if (r.needDays) parts.push(r.needDays + (r.needDays === 1 ? ' giornata segnata' : ' giornate segnate') + ' per intero');
      if (r.needWeighIns === 2) parts.push('2 pesate a distanza di almeno 10 giorni');
      else if (r.needWeighIns === 1) parts.push('un\'altra pesata, almeno 10 giorni dopo la prima');
      else if (r.needSpan) parts.push('una pesata tra ' + r.needSpan + (r.needSpan === 1 ? ' giorno' : ' giorni'));
      return 'Mi servono ancora ' + parts.join(' e ') + '.';
    });

    // ---------------------------------------------------------------
    // MANGIARE MEGLIO (js/data/nutrition.js): consigli pratici e giornate tipo per chi vuole iniziare.
    // Non sostituisce il nutrizionista: una giornata tipo si può provare per una settimana come piano.
    // ---------------------------------------------------------------
    const eatGuide = ref({ isOpen: false, tab: 'tips', goal: 'keep' });
    const suggestedEatGoal = computed(() => {
      const s = bodyStats.value;
      if (s.bmi && s.bmi.value >= 25) return 'lose';
      if (s.activity && s.activity.weeklyHours >= 4 && s.bmi && s.bmi.value < 22) return 'gain';
      return 'keep';
    });
    const openEatGuide = (tab = 'tips') => { eatGuide.value = { isOpen: true, tab, goal: suggestedEatGoal.value }; };

    const eatTipStat = (tip) => {
      const s = bodyStats.value;
      if (tip.stat === 'protein' && s.protein) return 'Per te: ' + s.protein.min + '–' + s.protein.max + ' g al giorno.';
      if (tip.stat === 'water' && s.water) return 'Per te: circa ' + formatNumber(s.water) + ' litri al giorno.';
      return '';
    };

    // Il tuo menù sotto la lente: media dei prossimi 7 giorni del piano attivo
    const menuCheck = computed(() => {
      if (!activePlan.value) return null;
      let kcal = 0, protein = 0, days = 0, kcalDays = 0, proteinDays = 0;
      for (let i = 0; i < 7; i++) {
        const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + i);
        const meals = getMealsForDate(d);
        if (!meals.length) continue;
        days++;
        const k = meals.reduce((sum, m) => sum + (Number(m.calories) || 0), 0);
        const p = meals.filter(m => m.protein !== null && m.protein !== undefined);
        if (k > 0) { kcal += k; kcalDays++; }
        if (p.length) { protein += p.reduce((sum, m) => sum + m.protein, 0); proteinDays++; }
      }
      if (!days) return null;
      const s = bodyStats.value;
      const notes = [];
      const avgProtein = proteinDays ? Math.round(protein / proteinDays) : null;
      const avgKcal = kcalDays ? Math.round(kcal / kcalDays / 10) * 10 : null;
      if (avgProtein !== null && s.protein) {
        if (avgProtein < s.protein.min) notes.push({ ok: false, text: 'Proteine: in media ≈ ' + avgProtein + ' g al giorno, sotto il tuo obiettivo di ' + s.protein.min + '–' + s.protein.max + ' g. Prova ad aggiungere uno yogurt greco o delle uova.' });
        else notes.push({ ok: true, text: 'Proteine: in media ≈ ' + avgProtein + ' g al giorno, in linea con il tuo obiettivo.' });
      }
      if (avgKcal !== null && s.energy) {
        const diff = avgKcal - s.energy.tdee;
        if (diff < -900) notes.push({ ok: false, text: 'Calorie: ≈ ' + avgKcal + ' kcal al giorno, molto sotto il tuo fabbisogno (≈ ' + s.energy.tdee + '). Mangiare troppo poco rallenta i risultati: parlane con un nutrizionista.' });
        else if (diff < -200) notes.push({ ok: true, text: 'Calorie: ≈ ' + avgKcal + ' kcal al giorno, un po\' sotto il fabbisogno (≈ ' + s.energy.tdee + '): adatto per dimagrire.' });
        else if (diff > 400) notes.push({ ok: true, text: 'Calorie: ≈ ' + avgKcal + ' kcal al giorno, sopra il fabbisogno (≈ ' + s.energy.tdee + '): adatto per mettere massa.' });
        else notes.push({ ok: true, text: 'Calorie: ≈ ' + avgKcal + ' kcal al giorno, vicino al tuo fabbisogno (≈ ' + s.energy.tdee + '): adatto per mantenere.' });
      }
      return notes.length ? { notes, name: activePlan.value.name } : null;
    });

    const MEAL_ORDER = ['colazione', 'spuntino_mattina', 'pranzo', 'spuntino_pomeriggio', 'post_workout', 'cena'];
    const eatGoal = computed(() => NUTRITION_GOALS.find(g => g.id === eatGuide.value.goal) || NUTRITION_GOALS[0]);

    // --- Porzioni su misura: le giornate tipo si adattano al fabbisogno calcolato dal profilo ---
    const eatTarget = computed(() => {
      const e = bodyStats.value.energy;
      if (!e) return null;
      const g = eatGuide.value.goal;
      return g === 'lose' ? e.lose : g === 'gain' ? e.gain : e.tdee;
    });
    const eatBaseKcal = (goal) => {
      const days = goal.days.map(day => Object.values(day.meals).reduce((sum, items) => sum + (estimateMealKcal(items).kcal || 0), 0));
      return days.reduce((a, b) => a + b, 0) / days.length;
    };
    // Si scala al massimo del 25% in meno o del 40% in più: oltre serve un piano fatto da un professionista
    const eatFactor = computed(() => (eatTarget.value ? Math.max(0.75, Math.min(1.4, eatTarget.value / eatBaseKcal(eatGoal.value))) : 1));
    const roundGrams = (g) => (g < 50 ? Math.max(5, Math.round(g / 5) * 5) : Math.round(g / 10) * 10);
    const scaleFoodText = (text, f) => {
      const t = String(text).trim();
      if (Math.abs(f - 1) < 0.04) return t;
      let m = /^(\d+(?:[.,]\d+)?)\s*(g|ml)\b/i.exec(t);
      if (m) return roundGrams(parseFloat(m[1].replace(',', '.')) * f) + m[2] + t.slice(m[0].length);
      m = /^(\d+)\s+(?!cucchia)/i.exec(t);
      if (m) return Math.max(1, Math.round(parseInt(m[1], 10) * f)) + ' ' + t.slice(m[0].length);
      return t;
    };

    // --- I tuoi gusti: esclusioni, alimenti che non piacciono, sostituzioni scelte (salvati nelle impostazioni) ---
    const eatPrefs = computed(() => settings.value.eatPrefs || { exclude: [], dislikes: [], swaps: {} });
    const eatBlockedTags = computed(() => {
      const tags = new Set();
      EAT_EXCLUDES.forEach(x => { if (eatPrefs.value.exclude.includes(x.id)) x.tags.forEach(t => tags.add(t)); });
      return tags;
    });
    const SWAP_INDEX = FOOD_SWAPS.flatMap(g => g.items.map(it => ({ g, it, key: ' ' + normFood(it.t) + ' ', food: findFood(it.t) })))
      .sort((a, b) => b.key.length - a.key.length);
    const swapEntryFor = (text, mealType) => {
      const t = ' ' + normFood(text) + ' ';
      const fits = (e) => !e.g.meals || e.g.meals.includes(mealType);
      let hit = SWAP_INDEX.find(e => fits(e) && t.includes(e.key));
      if (!hit) {
        const food = findFood(text);
        if (food) hit = SWAP_INDEX.find(e => fits(e) && e.food === food);
      }
      return hit || null;
    };
    const swapBlocked = (it) => it.tags.some(t => eatBlockedTags.value.has(t)) || eatPrefs.value.dislikes.includes(it.t);
    // Testo dell'alternativa con la porzione equivalente (stesse proteine o stesse calorie dell'originale)
    const swapText = (group, it, orig) => {
      const food = findFood(it.t);
      if (!food || group.by === 'none' || !orig || !orig.kcal) return it.t;
      let grams = group.by === 'protein' && orig.protein > 0 && food.p > 0 ? (orig.protein * 100) / food.p : (orig.kcal * 100) / food.k;
      if (group.max) grams = Math.min(grams, group.max);
      if (it.c && food.pz) {
        const n = Math.max(1, Math.round(grams / food.pz));
        return n + ' ' + (n === 1 ? (it.one || it.t) : (it.many || it.t));
      }
      return roundGrams(grams) + 'g ' + it.t;
    };
    const swapOptions = (group, current, orig) => group.items
      .filter(it => it.t !== current && !swapBlocked(it))
      .map(it => {
        const text = swapText(group, it, orig);
        const e = estimateFoodKcal(text);
        return { t: it.t, text, kcal: e ? e.kcal : null, protein: e ? Math.round(e.protein) : null };
      });

    // Un alimento della giornata tipo, già adattato: porzione scalata, poi sostituito se escluso o se hai scelto un'alternativa
    const personalizeFood = (text, meal, key, seed) => {
      const scaled = scaleFoodText(text, eatFactor.value);
      const entry = swapEntryFor(scaled, meal);
      if (!entry) return { text: scaled, key, swappable: false };
      const orig = estimateFoodKcal(scaled);
      const chosenName = eatPrefs.value.swaps[key];
      let target = chosenName ? entry.g.items.find(it => it.t === chosenName && !swapBlocked(it)) : null;
      let auto = false;
      if (!target && swapBlocked(entry.it)) {
        const allowed = entry.g.items.filter(it => !swapBlocked(it));
        if (allowed.length) { target = allowed[seed % allowed.length]; auto = true; }
      }
      const base = { key, meal, swappable: true, group: entry.g.id, original: entry.it.t, scaled };
      if (!target || target.t === entry.it.t) return { ...base, text: scaled, current: entry.it.t, blocked: swapBlocked(entry.it) };
      return { ...base, text: swapText(entry.g, target, orig), current: target.t, swapped: true, auto };
    };

    const eatGoalDays = computed(() => eatGoal.value.days.map((day, dayIdx) => {
      const meals = MEAL_ORDER.filter(type => day.meals[type]).map(type => {
        const info = mealTypes.find(t => t.id === type) || mealTypes[0];
        const foods = day.meals[type].map((text, i) => personalizeFood(text, type, eatGoal.value.id + '|' + dayIdx + '|' + type + '|' + i, dayIdx * 3 + i));
        const est = estimateMealKcal(foods.map(f => f.text));
        return { type, label: info.label, icon: info.icon, foods, items: foods.map(f => f.text), kcal: est.kcal, protein: est.protein };
      });
      return {
        name: day.name, meals,
        kcal: Math.round(meals.reduce((sum, m) => sum + (m.kcal || 0), 0) / 10) * 10,
        protein: meals.reduce((sum, m) => sum + (m.protein || 0), 0)
      };
    }));
    const eatSwapCount = computed(() => eatGoalDays.value.reduce((n, d) => n + d.meals.reduce((k, m) => k + m.foods.filter(f => f.swapped).length, 0), 0));

    const toggleEatExclude = (id) => {
      const prefs = { exclude: [], dislikes: [], swaps: {}, ...(settings.value.eatPrefs || {}) };
      prefs.exclude = prefs.exclude.includes(id) ? prefs.exclude.filter(x => x !== id) : [...prefs.exclude, id];
      settings.value.eatPrefs = prefs;
    };
    const removeEatDislike = (name) => {
      const prefs = settings.value.eatPrefs;
      if (prefs) prefs.dislikes = prefs.dislikes.filter(x => x !== name);
    };

    // Finestra "cambia alimento"
    const eatSwap = ref({ isOpen: false, food: null, options: [] });
    const openEatSwap = (food) => {
      if (!food.swappable) return;
      const group = FOOD_SWAPS.find(g => g.id === food.group);
      eatSwap.value = { isOpen: true, food, options: swapOptions(group, food.current, estimateFoodKcal(food.scaled)) };
    };
    const ensureEatPrefs = () => {
      if (!settings.value.eatPrefs) settings.value.eatPrefs = { exclude: [], dislikes: [], swaps: {} };
      return settings.value.eatPrefs;
    };
    const chooseEatSwap = (name) => {
      const prefs = ensureEatPrefs();
      const food = eatSwap.value.food;
      if (name === food.original) delete prefs.swaps[food.key]; else prefs.swaps[food.key] = name;
      eatSwap.value.isOpen = false;
    };
    const resetEatSwap = () => { delete ensureEatPrefs().swaps[eatSwap.value.food.key]; eatSwap.value.isOpen = false; };
    const dislikeEatFood = () => {
      const prefs = ensureEatPrefs();
      const name = eatSwap.value.food.current;
      if (!prefs.dislikes.includes(name)) prefs.dislikes.push(name);
      Object.keys(prefs.swaps).forEach(k => { if (prefs.swaps[k] === name) delete prefs.swaps[k]; });
      eatSwap.value.isOpen = false;
      showToastMessage('Ok, niente più ' + name + ': l\'abbiamo sostituito in tutte le giornate tipo. Lo ritrovi in "I tuoi gusti" se cambi idea. 👍');
    };

    // Prova per una settimana: le 3 giornate (già adattate a te) si alternano dal lunedì alla domenica
    const createTrialPlan = () => {
      const goal = eatGoal.value;
      const personal = eatGoalDays.value;
      const build = () => {
        const toMeals = (day) => day.meals.map(m => ({ type: m.type, items: [...m.items], calories: '' }));
        const days = {};
        weekDays.forEach((name, i) => { days[name] = toMeals(personal[i % personal.length]); });
        const grocery = [];
        personal.forEach(day => day.meals.forEach(m => m.items.forEach(item => { if (!grocery.includes(item)) grocery.push(item); })));
        plans.value.forEach(p => { if (p.status === 'active') { p.status = 'inactive'; p.results = 'Terminato'; } });
        const end = new Date(); end.setDate(end.getDate() + 6);
        const nextId = Math.max(...plans.value.map(p => p.id), 0) + 1;
        plans.value.unshift({
          id: nextId,
          name: 'Settimana di prova · ' + goal.name,
          status: 'active',
          results: 'Appena Iniziato',
          startDate: toISODate(),
          endDate: toISODate(end),
          grocery,
          weeks: [{ days }],
          meals: mapDayMeals(days[weekDays[0]]),
          trial: goal.id
        });
        eatGuide.value.isOpen = false;
        nutritionView.value = 'list';
        showToastMessage('Settimana di prova "' + goal.name + '" attiva da oggi! La trovi in dashboard, con la lista della spesa. Se qualcosa non ti piace, modifica il piano. 🥗');
      };
      if (activePlan.value) {
        showConfirm('Provare questa settimana?', 'Diventerà il piano in corso al posto di "' + activePlan.value.name + '" (che resta salvato e puoi riattivare quando vuoi).', build);
      } else {
        build();
      }
    };

    // Obiettivo di proteine per la barra in dashboard: il minimo consigliato, altrimenti quanto prevede il menù
    const proteinGoal = computed(() => (bodyStats.value.protein ? bodyStats.value.protein.min : (todayProtein.value ? todayProtein.value.planned : 0)));

    const openProfileCompletion = () => { openBackupModal(); openProfileEdit(); };

    // Modifica profilo (dalla modale Profilo)
    const profileEdit = ref({ isOpen: false, firstName: '', lastName: '', birthDate: '', height: '', sex: '', error: '' });
    const openProfileEdit = () => {
      const current = profile.value || {};
      profileEdit.value = {
        isOpen: true,
        firstName: current.firstName || '',
        lastName: current.lastName || '',
        birthDate: current.birthDate || '',
        height: current.height !== null && current.height !== undefined ? String(current.height) : '',
        sex: current.sex || '',
        error: ''
      };
    };
    const saveProfileEdit = () => {
      const error = validateProfileFields(profileEdit.value);
      profileEdit.value.error = error;
      if (error) return;
      profile.value = { ...(profile.value || {}), ...profileFromForm(profileEdit.value) };
      profileEdit.value.isOpen = false;
    };

    const promptResetAllData = () => {
      backupModal.value.isOpen = false;
      showConfirm(
        'Eliminare tutti i dati?',
        'Profilo, schede, piani, pasti, misurazioni e allenamenti verranno cancellati da questo dispositivo. Se vuoi conservarli, esporta prima un backup.',
        () => {
          [...STORAGE_KEYS, ACTIVE_WORKOUT_KEY].forEach(key => storage.remove(key));
          // Anche le foto dei progressi (IndexedDB)
          photoStore.clear().catch(() => {}).finally(() => window.location.reload());
        }
      );
    };

    // Avvio: schermata con il logo. Chi ha già il profilo entra con "Entra", gli altri partono con la registrazione
    const hasProfile = computed(() => !!(profile.value && profile.value.firstName));
    onMounted(() => {
      authLoading.value = false;
    });

    // ---------------------------------------------------------------
    // CONDIVISIONE: card social (immagine o video) generate sul dispositivo
    // ---------------------------------------------------------------
    // Costanti e disegno delle card: vedi js/share/draw.js

    const shareStudio = ref({
      isOpen: false, kind: 'progress', sessionId: null, period: 30, recapMonth: 0, recapType: 'month', achievement: null, focus: 'total', hero: 'auto',
      theme: 'night', format: 'story', output: 'video', showName: true, showPet: true, weightMode: 'percent', loadMode: 'percent',
      hasPhoto: false, ready: false, busy: false, recording: false, recordProgress: 0, error: ''
    });
    const sharePreviewCanvas = ref(null);
    let shareAnimFrame = null;
    let shareAnimStart = 0;

    // --- Formattazione ---
    const signed = (value, digits = 1) => {
      const rounded = Math.round(value * Math.pow(10, digits)) / Math.pow(10, digits);
      if (rounded === 0) return '=';
      return (rounded > 0 ? '+' : '−') + formatNumber(Math.abs(rounded));
    };
    const pct = (from, to) => (from ? ((to - from) / from) * 100 : null);
    const shortDuration = (sec) => {
      const s = Math.max(0, Math.round(sec || 0));
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      if (h) return h + 'h ' + String(m).padStart(2, '0') + 'm';
      if (s < 60) return s + ' s';
      return m + ' min';
    };
    const shareFirstName = () => (shareStudio.value.showName && profile.value && profile.value.firstName ? profile.value.firstName.trim() : '');
    // "Il mio mese" → "Il mese di Pietro"
    const periodKicker = (days, name) => {
      const base = { 7: ['La mia settimana', 'La settimana di'], 30: ['Il mio mese', 'Il mese di'], 90: ['I miei 3 mesi', 'I 3 mesi di'], 0: ['Il mio percorso', 'Il percorso di'] }[days] || ['Il mio percorso', 'Il percorso di'];
      return name ? base[1] + ' ' + name : base[0];
    };
    const periodLabel = (days) => ({ 7: 'Ultimi 7 giorni', 30: 'Ultimi 30 giorni', 90: 'Ultimi 3 mesi', 0: 'Da sempre' }[days] || '');

    // --- Dati: card PROGRESSI (Totale / Allenamento / Alimentazione / Corpo) ---
    // range (facoltativo): { start, end } in YYYY-MM-DD, per un mese preciso
    const shareProgressData = (periodDays, opts, range = null) => {
      const today = range ? range.end : toISODate();
      const sportSessions = trainingSessions.value.filter(s => s.kind === 'sport');
      const allDates = [
        ...workoutLogs.value.map(log => log.date),
        ...sportSessions.map(s => s.date),
        ...measurements.value.map(m => m.date),
        ...Object.keys(mealLogs.value)
      ].filter(Boolean).sort();
      let start;
      if (range) {
        start = range.start;
      } else if (periodDays) {
        const d = new Date(); d.setDate(d.getDate() - (periodDays - 1));
        start = toISODate(d);
      } else {
        start = (profile.value && profile.value.createdAt) || allDates[0] || today;
        if (allDates[0] && allDates[0] < start) start = allDates[0];
      }
      const inRange = (date) => date && date >= start && date <= today;

      // Allenamento
      const reportSessions = trainingSessions.value.filter(s => s.kind === 'gym' && s.report && inRange(s.date));
      const manualGymDates = trainingSessions.value
        .filter(s => s.kind === 'gym' && !s.report && inRange(s.date) && s.statusByDate && s.statusByDate[s.date] === 'done')
        .map(s => s.date);
      const workoutDates = new Set([
        ...workoutLogs.value.filter(log => inRange(log.date)).map(log => log.date),
        ...reportSessions.map(s => s.date),
        ...manualGymDates
      ]);
      // Sport (calcio, nuoto, ...): contano solo le sessioni segnate come fatte
      let sportTotal = 0;
      const sportBy = {};
      if (sportSessions.length) {
        const sc = new Date(start + 'T00:00:00');
        const se = new Date(today + 'T00:00:00');
        let sg = 0;
        while (sc <= se && sg++ < 800) {
          const key = toISODate(sc);
          sportSessions.forEach(s => {
            if (!trainingSessionOccursOn(s, key)) return;
            if (!s.statusByDate || s.statusByDate[key] !== 'done') return;   // solo se segnato "fatto"
            sportTotal++;
            const name = s.sport || 'Sport';
            sportBy[name] = (sportBy[name] || 0) + 1;
            workoutDates.add(key);
          });
          sc.setDate(sc.getDate() + 1);
        }
      }
      // Tempo: palestra (durata registrata) + sport segnati come fatti (inizio → fine)
      const trainedSeconds = trainingSecondsBetween(start, today).total;
      const sets = reportSessions.reduce((sum, s) => sum + (s.report.sets || 0), 0);

      const byExercise = {};
      workoutLogs.value.forEach(log => {
        const w = parseOptionalNumber(log.weight);
        if (w === null || !log.date || log.date > today) return;
        const key = log.exerciseId ? 'id:' + log.exerciseId : 'n:' + String(log.exerciseName || '').toLowerCase();
        (byExercise[key] = byExercise[key] || { log, items: [] }).items.push({ date: log.date, w });
      });
      const lifts = Object.values(byExercise).map(group => {
        const items = group.items.sort((a, b) => a.date.localeCompare(b.date));
        const base = items.filter(i => i.date < start).pop() || items.find(i => inRange(i.date));
        const last = items.filter(i => inRange(i.date)).pop();
        if (!base || !last || base === last) return null;
        const info = findExerciseInfo(group.log);
        return {
          name: info ? info.exercise.name : group.log.exerciseName,
          kg: last.w - base.w,
          pct: pct(base.w, last.w),
          series: [base.w, ...items.filter(i => inRange(i.date) && i !== base).map(i => i.w)]
        };
      }).filter(Boolean).sort((a, b) => (b.pct || 0) - (a.pct || 0));
      const improved = lifts.filter(l => l.kg > 0).length;

      // Corpo: solo variazioni, mai il peso attuale
      const weights = measurements.value.filter(m => m.weight !== null && m.weight !== undefined && m.date <= today)
        .slice().sort((a, b) => a.date.localeCompare(b.date));
      const before = weights.filter(m => m.date < start).pop();
      const within = weights.filter(m => inRange(m.date));
      const weightSeries = (before ? [before] : []).concat(within);
      let weight = null;
      if (weightSeries.length >= 2) {
        const from = weightSeries[0].weight;
        const to = weightSeries[weightSeries.length - 1].weight;
        const spanDays = Math.max(1, (new Date(weightSeries[weightSeries.length - 1].date) - new Date(weightSeries[0].date)) / 86400000);
        weight = { kg: to - from, pct: pct(from, to), series: weightSeries.map(m => m.weight), weeks: spanDays / 7 };
      }

      // Alimentazione
      let planned = 0, done = 0, perfectDays = 0, run = 0, bestRun = 0, trackedDays = 0;
      const mealDays = new Set();
      const nutritionDays = [];
      const days = [];
      const cursor = new Date(start + 'T00:00:00');
      const end = new Date(today + 'T00:00:00');
      let guard = 0;
      while (cursor <= end && guard++ < 800) {
        const key = toISODate(cursor);
        const meals = getMealsForDate(cursor);
        const logs = mealLogs.value[key] || {};
        let dayPct = null;
        if (meals.length && Object.keys(logs).length) {
          const d = meals.filter(m => logs[m.id] && logs[m.id].status === 'done').length;
          planned += meals.length; done += d; trackedDays++;
          dayPct = d / meals.length;
          if (d) mealDays.add(key);
          if (d === meals.length) { perfectDays++; run++; bestRun = Math.max(bestRun, run); } else run = 0;
        } else run = 0;
        nutritionDays.push({ key, dow: cursor.getDay(), pct: dayPct });
        days.push({ key, dow: cursor.getDay(), workout: workoutDates.has(key), meals: mealDays.has(key) });
        cursor.setDate(cursor.getDate() + 1);
      }
      const nutrition = planned ? Math.round((done / planned) * 100) : null;
      const activeDays = days.filter(d => d.workout || d.meals).length;

      // Metriche
      const M = {};
      const best = lifts[0];
      const loadTxt = (l) => (opts.loadMode === 'kg' ? signed(l.kg) + ' kg' : signed(l.pct) + '%');
      if (best && best.kg > 0) M.loads = { hero: loadTxt(best), label: 'Carico · ' + best.name, tile: loadTxt(best), tileLabel: 'Top · ' + best.name, chart: { type: 'line', series: best.series, label: 'Andamento · ' + best.name } };
      if (improved) M.improved = { hero: String(improved), label: improved === 1 ? 'Esercizio con carico in crescita' : 'Esercizi con carico in crescita', tile: improved + (improved === 1 ? ' esercizio' : ' esercizi'), tileLabel: 'Carichi in crescita' };
      if (workoutDates.size) M.workouts = { hero: String(workoutDates.size), label: workoutDates.size === 1 ? 'Allenamento' : 'Allenamenti', tile: String(workoutDates.size), tileLabel: 'Allenamenti' };
      if (sportTotal) {
        const names = Object.keys(sportBy);
        const one = names.length === 1 ? names[0] : '';
        M.sport = {
          hero: String(sportTotal),
          label: one ? (sportTotal === 1 ? 'Sessione di ' : 'Sessioni di ') + one.toLowerCase() : (sportTotal === 1 ? 'Sessione di sport' : 'Sessioni di sport'),
          tile: String(sportTotal),
          tileLabel: one || 'Sport'
        };
      }
      if (workoutDates.size && days.length >= 7) {
        const perWeek = Math.round((workoutDates.size / (days.length / 7)) * 10) / 10;
        M.perWeek = { hero: formatNumber(perWeek), label: 'Allenamenti a settimana', tile: formatNumber(perWeek), tileLabel: 'A settimana' };
      }
      const exercisesTrained = new Set(workoutLogs.value.filter(log => inRange(log.date)).map(log => log.exerciseId || String(log.exerciseName || '').toLowerCase())).size;
      if (exercisesTrained) M.exercises = { hero: String(exercisesTrained), label: 'Esercizi allenati', tile: String(exercisesTrained), tileLabel: 'Esercizi' };
      if (trainedSeconds > 0) M.time = { hero: shortDuration(trainedSeconds), label: 'Di allenamento', tile: shortDuration(trainedSeconds), tileLabel: 'Ore di allenamento' };
      if (sets) M.sets = { hero: String(sets), label: 'Serie completate', tile: String(sets), tileLabel: 'Serie' };
      if (weight && opts.weightMode !== 'off' && Math.abs(weight.kg) >= 0.1) {
        const main = opts.weightMode === 'kg' ? signed(weight.kg) + ' kg' : signed(weight.pct) + '%';
        const perWeek = weight.weeks >= 1 ? (opts.weightMode === 'kg' ? signed(weight.kg / weight.weeks) + ' kg' : signed(weight.pct / weight.weeks) + '%') : null;
        M.weight = { hero: main, label: 'Peso corporeo', tile: main, tileLabel: 'Peso', chart: { type: 'line', series: weight.series, label: 'Andamento peso', down: weight.kg < 0 } };
        if (perWeek) M.weightRate = { hero: perWeek, label: 'A settimana', tile: perWeek, tileLabel: 'A settimana' };
        M.weighIns = { hero: String(weightSeries.length), label: 'Pesate', tile: String(weightSeries.length), tileLabel: 'Pesate' };
      }
      if (nutrition !== null) {
        M.nutrition = { hero: nutrition + '%', label: 'Piano alimentare rispettato', tile: nutrition + '%', tileLabel: 'Alimentazione' };
        M.meals = { hero: done + '/' + planned, label: 'Pasti rispettati', tile: done + '/' + planned, tileLabel: 'Pasti rispettati' };
        M.perfect = { hero: String(perfectDays), label: perfectDays === 1 ? 'Giorno perfetto' : 'Giorni perfetti', tile: String(perfectDays), tileLabel: 'Giorni perfetti' };
        if (bestRun >= 2) M.streak = { hero: bestRun + ' giorni', label: 'Di fila senza sgarri', tile: bestRun + ' giorni', tileLabel: 'Serie migliore' };
      }
      if (activeDays) M.active = { hero: String(activeDays), label: 'Giorni attivi', tile: activeDays + (periodDays ? '/' + days.length : ''), tileLabel: 'Giorni attivi' };

      const FOCUS = {
        // Gli sport non hanno un riquadro a parte: contano già negli allenamenti e nelle ore
        total: ['loads', 'workouts', 'time', 'weight', 'nutrition', 'improved', 'active', 'sets'],
        training: ['loads', 'time', 'workouts', 'improved', 'perWeek', 'sets', 'exercises'],
        nutrition: ['nutrition', 'perfect', 'streak', 'meals'],
        body: ['weight', 'weightRate', 'weighIns']
      };
      const focusAvailable = Object.keys(FOCUS).filter(f => f === 'total' || FOCUS[f].some(k => M[k]));
      const focus = focusAvailable.includes(opts.focus) ? opts.focus : 'total';
      const available = FOCUS[focus].filter(k => M[k]);
      const heroKey = (opts.hero !== 'auto' && available.includes(opts.hero)) ? opts.hero : available[0];
      const heroMetric = heroKey ? M[heroKey] : null;

      let chart;
      if (heroMetric && heroMetric.chart && heroMetric.chart.series.length >= 2) chart = heroMetric.chart;
      else if (focus === 'body' && M.weight) chart = M.weight.chart;
      else if (focus === 'nutrition' || ['nutrition', 'perfect', 'streak', 'meals'].includes(heroKey)) chart = { type: 'adherence', days: nutritionDays, weekly: nutritionDays.length > 31, label: 'Aderenza al piano' };
      else chart = { type: 'activity', days, weekly: days.length > 31, mealsLayer: focus === 'total', label: focus === 'training' ? 'Giorni di allenamento' : 'Attività' };

      const name = shareFirstName();
      return {
        kind: 'progress',
        empty: !heroMetric,
        focus,
        focusAvailable,
        available,
        heroKey,
        kicker: periodKicker(periodDays, name),
        title: { total: '', training: 'Allenamento', nutrition: 'Alimentazione', body: 'Corpo' }[focus],
        dateLabel: periodLabel(periodDays),
        hero: heroMetric ? { value: heroMetric.hero, label: heroMetric.label } : { value: '0', label: 'Si parte da qui' },
        tiles: available.filter(k => k !== heroKey).slice(0, 4).map(k => ({ label: M[k].tileLabel, value: M[k].tile })),
        // Risultati principali (usati anche dalla card "Frase del giorno")
        // (allenamenti e ore sempre per primi)
        stats: ['workouts', 'time', 'loads', 'weight', 'nutrition', 'improved', 'active', 'sets'].filter(k => M[k]).slice(0, 4).map(k => ({ label: M[k].tileLabel, value: M[k].tile })),
        metrics: M,
        bestLift: lifts.find(l => l.kg > 0) || null,
        activeDays,
        totalDays: days.length,
        chart,
        highlights: (focus === 'total' || focus === 'training') ? lifts.filter(l => l.kg !== 0).slice(0, 2).map(l => ({ name: l.name, value: loadTxt(l), positive: l.kg > 0 })) : [],
        highlightsLabel: 'Carichi'
      };
    };

    // --- Dati: card ALLENAMENTO ---
    const shareWorkoutData = (sessionId, opts) => {
      const session = trainingSessions.value.find(s => s.id === sessionId);
      const r = session && session.report;
      if (!r) return { empty: true, kind: 'workout', available: [], focusAvailable: [], hero: { value: '—', label: '' }, tiles: [], highlights: [] };
      const volume = r.exercises.reduce((sum, ex) => sum + (ex.volume || 0), 0);
      const improved = r.exercises.filter(ex => !ex.firstTime && ex.startValue !== null && ex.endValue !== null && ex.endValue > ex.startValue).length;
      const tiles = [
        { label: 'Serie', value: r.sets + (r.setsPlanned && r.sets !== r.setsPlanned ? '/' + r.setsPlanned : '') },
        { label: 'Esercizi', value: String(r.exercises.length) },
        opts.loadMode === 'kg' && volume ? { label: 'Volume', value: formatNumber(volume) + ' kg' } : { label: 'Sotto sforzo', value: shortDuration(r.workSeconds) },
        { label: 'Carichi in crescita', value: String(improved) }
      ];
      const highlights = r.exercises.map(ex => {
        let value = '✓';
        let positive = null;
        if (ex.firstTime) value = 'prima volta';
        else if (ex.startValue !== null && ex.endValue !== null && ex.endValue !== ex.startValue) {
          const d = ex.endValue - ex.startValue;
          value = (opts.loadMode === 'kg' || ex.type === 'cardio') ? signed(d) + ' ' + ex.unit : signed(pct(ex.startValue, ex.endValue)) + '%';
          positive = d > 0;
        }
        return { name: ex.name, value, positive, rank: positive ? 2 : (positive === false ? 0 : 1) };
      }).sort((a, b) => b.rank - a.rank).slice(0, 2);
      const bars = r.exercises.flatMap((ex, i) => (ex.setDurations || []).map(sec => ({ sec, group: i })));
      const name = shareFirstName();
      return {
        kind: 'workout',
        empty: false,
        available: [],
        focusAvailable: [],
        kicker: name ? "L'allenamento di " + name : (r.completed ? 'Allenamento completato' : 'Allenamento'),
        title: [session.sheetName, session.dayName].filter(Boolean).join(' · '),
        dateLabel: formatDateLong(session.date),
        hero: { value: formatClock(r.totalSeconds), label: r.completed ? 'Durata · completato' : 'Durata' },
        tiles,
        chart: bars.some(b => b.sec > 0) ? { type: 'rhythm', bars, label: 'Ritmo delle serie' } : null,
        highlights,
        highlightsLabel: 'Esercizi'
      };
    };

    // Dati del riepilogo: mese corrente (offset 0) o precedente (offset 1)
    const recapRange = (offset) => {
      const first = new Date(); first.setHours(0, 0, 0, 0); first.setDate(1); first.setMonth(first.getMonth() - offset);
      const last = new Date(first.getFullYear(), first.getMonth() + 1, 0);
      const today = toISODate();
      const end = toISODate(last) > today ? today : toISODate(last);
      const month = first.toLocaleDateString('it-IT', { month: 'long' });
      return { start: toISODate(first), end, first, month: month.charAt(0).toUpperCase() + month.slice(1), year: first.getFullYear() };
    };
    const recapMonthName = (offset) => recapRange(offset).month;
    // Settimana da lunedì a domenica: corrente (offset 0) o precedente (offset 1)
    const weekRange = (offset) => {
      const first = new Date(); first.setHours(0, 0, 0, 0);
      first.setDate(first.getDate() - ((first.getDay() + 6) % 7) - offset * 7);
      const last = new Date(first); last.setDate(last.getDate() + 6);
      const today = toISODate();
      const end = toISODate(last) > today ? today : toISODate(last);
      const m1 = first.toLocaleDateString('it-IT', { month: 'short' }).replace('.', '');
      const m2 = last.toLocaleDateString('it-IT', { month: 'short' }).replace('.', '');
      const label = first.getDate() + (m1 !== m2 ? ' ' + m1 : '') + '–' + last.getDate() + ' ' + m2;
      return { start: toISODate(first), end, first, month: label, year: last.getFullYear() };
    };
    const recapPeriodName = (type, offset) => (type === 'year' ? String(new Date().getFullYear() - offset) + (offset ? '' : ' (finora)') : type === 'week'
      ? (offset ? 'Settimana scorsa' : 'Questa settimana')
      : recapRange(offset).month + (offset ? '' : ' (in corso)'));

    const shareRecapData = (offset, opts, type = 'month') => {
      if (type === 'year') return shareYearData(offset);
      const week = type === 'week';
      const r = week ? weekRange(offset) : recapRange(offset);
      const recapKicker = (n) => (week ? (n ? 'La settimana di ' + n : 'La mia settimana') : (n ? 'Il mese di ' + n : 'Il mio mese'));
      const p = shareProgressData(0, { ...opts, focus: 'total', hero: 'auto' }, { start: r.start, end: r.end });
      const M = p.metrics;
      const name = shareFirstName();
      const set = activeDaySet.value;

      // Calendario del mese (fino a oggi) e serie migliore nel mese
      const calendar = [];
      const lead = (r.first.getDay() + 6) % 7;   // lunedì = 0
      let run = 0, bestRun = 0;
      const d = new Date(r.first);
      while (toISODate(d) <= r.end) {
        const key = toISODate(d);
        const active = set.has(key);
        run = active ? run + 1 : 0; bestRun = Math.max(bestRun, run);
        calendar.push({ key, active, lead });
        d.setDate(d.getDate() + 1);
      }
      const activeDays = calendar.filter(c => c.active).length;

      const scenes = [{ type: 'intro', kicker: recapKicker(name), big: r.month, caption: 'su STILL' }];
      const tiles = [];
      if (activeDays) {
        scenes.push({ kicker: 'Giorni attivi', big: String(activeDays), caption: 'su ' + calendar.length + ' giorni', calendar: true });
      }
      if (M.workouts) {
        scenes.push({ kicker: 'Allenamenti', big: M.workouts.hero, caption: M.workouts.hero === '1' ? 'sessione completata' : 'sessioni completate', sub: M.sets ? M.sets.tile + ' serie in palestra' : '' });
        tiles.push({ label: 'Allenamenti', value: M.workouts.tile });
      }
      if (M.time) {
        const split = trainingSecondsBetween(r.start, r.end);
        const parts = [split.gym ? shortDuration(split.gym) + ' in palestra' : '', split.sport ? shortDuration(split.sport) + ' di sport' : ''].filter(Boolean);
        scenes.push({ kicker: 'Ore di allenamento', big: M.time.hero, caption: 'passate ad allenarti', sub: parts.length > 1 ? parts.join(' · ') : '' });
        tiles.push({ label: 'Ore di allenamento', value: M.time.tile });
      }
      if (M.nutrition) {
        scenes.push({ kicker: 'Alimentazione', big: M.nutrition.hero, caption: 'del piano rispettato', sub: M.perfect && M.perfect.hero !== '0' ? M.perfect.hero + ' ' + M.perfect.label.toLowerCase() : '' });
        tiles.push({ label: 'Alimentazione', value: M.nutrition.tile });
      }
      if (M.loads && p.bestLift) {
        scenes.push({ kicker: 'Miglior progresso', big: M.loads.hero, caption: p.bestLift.name });
        tiles.push({ label: 'Miglior carico', value: M.loads.tile });
      }
      if (M.weight) {
        scenes.push({ kicker: 'Peso corporeo', big: M.weight.hero, caption: week ? 'nella settimana' : 'nel mese' });
        tiles.push({ label: 'Peso', value: M.weight.tile });
      }
      if (bestRun >= 2) {
        scenes.push({ kicker: 'Serie migliore', big: bestRun + ' giorni', caption: 'di fila senza fermarti' });
        tiles.push({ label: 'Serie migliore', value: bestRun + ' giorni' });
      }

      return {
        kind: 'recap', empty: !activeDays, available: [], focusAvailable: [],
        kicker: week ? recapKicker(name) : (name ? 'Il ' + r.month.toLowerCase() + ' di ' + name : 'Il mio ' + r.month.toLowerCase()),
        emptyText: week ? 'La prossima settimana è tua.' : 'Il prossimo mese è tuo.',
        dateLabel: r.month + ' ' + r.year,
        month: r.month, activeDays, totalDays: calendar.length, calendar, tiles, scenes
      };
    };

    // Compagno della serie in ogni storia (si può nascondere): immagine + specie per il balletto nel video
    const petCornerImg = shallowRef(null);
    const petShareImg = shallowRef(null);   // compagno protagonista (card del compagno e "salva la serie")
    const petPrevShareImg = shallowRef(null);   // forma di prima, per la storia dell'evoluzione
    const loadPetCornerImage = async () => {
      const st = petState.value;
      if (!st.stage) { petCornerImg.value = null; return; }
      try {
        petCornerImg.value = await petImage({ species: st.species, stage: st.stage, mood: 'happy', legendary: st.legendary, outfit: settings.value.pet.outfit, uid: 'petCorner' });
      } catch (e) { petCornerImg.value = null; }
    };
    const toggleSharePet = () => {
      shareStudio.value.showPet = !shareStudio.value.showPet;
      settings.value.sharePet = shareStudio.value.showPet;
    };
    const shareData = computed(() => {
      const data = shareDataFor();
      const st = shareStudio.value;
      if (!data) return data;
      if (data.petImg) data.petDance = PET_SPECIES[data.petSpecies != null ? data.petSpecies : petState.value.species].id;
      else if (st.showPet && petCornerImg.value && petState.value.stage > 0) data.pet = { img: petCornerImg.value, id: PET_SPECIES[petState.value.species].id };
      return data;
    });
    const shareDataFor = () => {
      const st = shareStudio.value;
      if (!st.isOpen) return null;
      const opts = { loadMode: st.loadMode, weightMode: st.weightMode, hero: st.hero, focus: st.focus, showName: st.showName };
      if (st.kind === 'quote') {
        const q = dailyBar.value;
        const name = shareFirstName();
        const progress = shareProgressData(st.period, { ...opts, focus: 'total', hero: 'auto' });
        return {
          kind: 'quote', empty: false, available: [], focusAvailable: [],
          kicker: name ? 'La frase del giorno di ' + name : 'La frase del giorno',
          dateLabel: formatDateLong(toISODate()),
          pre: q.pre, hi: q.hi, attribution: q.by || '',
          stats: progress.stats,
          statsLabel: (name ? 'I risultati di ' + name : 'I miei risultati') + ' · ' + periodLabel(st.period).toLowerCase()
        };
      }
      if (st.kind === 'recap') return shareRecapData(st.recapMonth || 0, opts, st.recapType);
      if (st.kind === 'achievement') return shareAchievementData(st.achievement);
      if (st.kind === 'muscles') {
        const w = weekMuscles.value;
        const name = shareFirstName();
        return {
          kind: 'muscles', empty: w.empty, available: [], focusAvailable: [],
          kicker: name ? 'La settimana di ' + name : 'La mia settimana di allenamento',
          dateLabel: 'Ultimi 7 giorni',
          mapImg: muscleShareImg.value,
          big: w.sets + ' serie',
          caption: w.days + (w.days === 1 ? ' giorno' : ' giorni') + ' di allenamento' + (w.sports ? ' · ' + w.sports + ' sport' : ''),
          top: w.top.slice(0, 4).map(t => ({ name: t.name, value: t.sets + (t.sets === 1 ? ' serie' : ' serie'), k: t.k }))
        };
      }
      return st.kind === 'workout' ? shareWorkoutData(st.sessionId, opts) : shareProgressData(st.period, opts);
    };

    const shareThemeOptions = [
      { id: 'night', label: 'Notte', icon: '', swatch: 'background: radial-gradient(circle at 25% 25%, rgba(16,185,129,.55), transparent 55%), radial-gradient(circle at 80% 80%, rgba(139,92,246,.6), transparent 55%), #0E0E10;' },
      { id: 'aurora', label: 'Aurora', icon: '', swatch: 'background: linear-gradient(135deg, #20C997, #F5A623, #7A4DF1);' },
      { id: 'light', label: 'Chiaro', icon: '', swatch: 'background: radial-gradient(circle at 25% 25%, rgba(16,185,129,.35), transparent 55%), radial-gradient(circle at 80% 80%, rgba(245,166,35,.35), transparent 55%), #F6F5F2;' },
      { id: 'photo', label: 'Foto', icon: '📷', swatch: 'background: #2b2b2e;' },
      { id: 'sticker', label: 'Sticker', icon: '✨', swatch: 'background-image: repeating-conic-gradient(#4a4a4a 0 25%, #333 0 50%); background-size: 12px 12px;' }
    ];
    const shareHeroLabels = { improved: 'Carichi in crescita', perWeek: 'A settimana', exercises: 'Esercizi', loads: 'Miglior carico', weight: 'Peso', weightRate: 'A settimana', weighIns: 'Pesate', workouts: 'Allenamenti', sport: 'Sport', nutrition: 'Aderenza', meals: 'Pasti', perfect: 'Giorni perfetti', streak: 'Serie migliore', time: 'Ore di allenamento', active: 'Giorni attivi', sets: 'Serie' };
    const shareFocusLabels = { total: 'Totale', training: 'Allenamento', nutrition: 'Alimentazione', body: 'Corpo' };

    // Video disponibile se il browser sa registrare il canvas (lo sticker è trasparente: solo immagine)
    const videoMime = (() => {
      try {
        if (typeof MediaRecorder === 'undefined' || !HTMLCanvasElement.prototype.captureStream) return '';
        return ['video/mp4;codecs=avc1.42E01E', 'video/mp4;codecs=avc1', 'video/mp4', 'video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm']
          .find(type => MediaRecorder.isTypeSupported(type)) || '';
      } catch (e) { return ''; }
    })();
    const shareVideoSupported = !!videoMime;
    const shareWantsVideo = computed(() => shareVideoSupported && shareStudio.value.output === 'video' && shareStudio.value.theme !== 'sticker');

    // --- Anteprima: statica o animata in loop ---
    const stopShareAnimation = () => {
      if (shareAnimFrame) cancelAnimationFrame(shareAnimFrame);
      shareAnimFrame = null;
    };
    const drawSharePreview = () => {
      const canvas = sharePreviewCanvas.value;
      const st = shareStudio.value;
      if (!canvas || !st.isOpen || !shareData.value) return;
      stopShareAnimation();
      if (!shareWantsVideo.value) {
        drawShareCard(canvas, shareData.value, st, Infinity);
        st.ready = true;
        return;
      }
      shareAnimStart = performance.now();
      let lastDraw = 0;
      const loop = (now) => {
        if (!shareStudio.value.isOpen) return;
        if (now - lastDraw < 32) { shareAnimFrame = requestAnimationFrame(loop); return; }   // ~30 fps
        lastDraw = now;
        const elapsed = (now - shareAnimStart) / 1000;
        const data = shareData.value;
        const len = data.kind === 'recap' ? data.scenes.length * RECAP_SCENE + 2.5 : VIDEO_SECONDS;
        const t = elapsed % (len + 1);   // 1 s di pausa sul finale prima di ripartire
        drawShareCard(canvas, data, shareStudio.value, Math.min(t, len));
        shareAnimFrame = requestAnimationFrame(loop);
      };
      st.ready = true;
      shareAnimFrame = requestAnimationFrame(loop);
    };
    const refreshSharePreview = async () => {
      try {
        if (document.fonts && document.fonts.load) {
          await Promise.all([document.fonts.load(`900 100px ${SHARE_FONT}`), document.fonts.load(`700 40px ${SHARE_FONT}`), document.fonts.load(`800 40px ${SHARE_FONT}`)]);
        }
      } catch (e) { /* font di sistema */ }
      await nextTick();
      if (!shareStudio.value.recording) drawSharePreview();
    };
    watch(() => {
      const st = shareStudio.value;
      return [st.isOpen, st.kind, st.sessionId, st.period, st.recapMonth, st.recapType, st.achievement, st.focus, st.hero, st.theme, st.format, st.output, st.showName, st.showPet, petCornerImg.value, petShareImg.value, petPrevShareImg.value, muscleShareImg.value, st.weightMode, st.loadMode, st.hasPhoto];
    }, () => { if (shareStudio.value.isOpen) refreshSharePreview(); else stopShareAnimation(); });

    const openShareStudio = (kind, sessionId = null) => {
      const st = shareStudio.value;
      loadPetCornerImage();
      shareStudio.value = {
        ...st,
        isOpen: true, kind, sessionId, hero: 'auto', focus: 'total', ready: false, error: '', busy: false, recording: false,
        showPet: settings.value.sharePet !== false,
        output: shareVideoSupported ? st.output : 'image',
        theme: st.theme === 'photo' && !sharePhoto ? 'night' : st.theme
      };
    };
    const openRecap = (offset = 0, type = 'month') => {
      openShareStudio('recap');
      shareStudio.value.recapMonth = offset;
      shareStudio.value.recapType = type;
      if (shareVideoSupported) shareStudio.value.output = 'video';
    };
    const closeShareStudio = () => {
      if (shareStudio.value.recording) return;
      stopShareAnimation();
      shareStudio.value.isOpen = false;
    };
    const setShareFocus = (focus) => { shareStudio.value.focus = focus; shareStudio.value.hero = 'auto'; };

    const sharePhotoInput = ref(null);
    const pickSharePhoto = () => {
      if (sharePhotoInput.value) { sharePhotoInput.value.value = ''; sharePhotoInput.value.click(); }
    };
    const handleSharePhoto = (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const img = new Image();
      img.onload = () => {
        sharePhoto = img;
        shareStudio.value.theme = 'photo';
        shareStudio.value.hasPhoto = !shareStudio.value.hasPhoto;   // forza il ridisegno
      };
      img.onerror = () => { shareStudio.value.error = 'Immagine non valida.'; };
      img.src = URL.createObjectURL(file);
    };
    const setShareTheme = (theme) => {
      if (theme === 'photo' && !sharePhoto) { pickSharePhoto(); return; }
      shareStudio.value.theme = theme;
    };

    // --- Esportazione ---
    const shareBaseName = () => {
      const st = shareStudio.value;
      const kind = st.kind === 'recap' && st.recapType === 'year' ? 'il-mio-anno' : st.kind === 'recap' && st.recapType === 'week' ? 'la-mia-settimana'
        : ({ workout: 'allenamento', quote: 'frase-del-giorno', recap: 'il-mio-mese', achievement: 'traguardo' })[st.kind] || 'progressi';
      return 'still-' + kind + '-' + toISODate();
    };
    const downloadBlob = (blobFile, name) => {
      const url = URL.createObjectURL(blobFile);
      const a = document.createElement('a');
      a.href = url; a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    };
    const buildShareImage = () => new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      drawShareCard(canvas, shareData.value, shareStudio.value, Infinity);
      canvas.toBlob(b => (b ? resolve(new File([b], shareBaseName() + '.png', { type: 'image/png' })) : reject(new Error('blob'))), 'image/png');
    });
    // Registra il video (animazione 6 s + risultati in vista fino a 15 s) direttamente dall'anteprima
    const buildShareVideo = () => new Promise((resolve, reject) => {
      const canvas = sharePreviewCanvas.value;
      if (!canvas) return reject(new Error('canvas'));
      const st = shareStudio.value;
      stopShareAnimation();
      st.recording = true; st.recordProgress = 0;
      const stream = canvas.captureStream(30);
      let recorder;
      try {
        recorder = new MediaRecorder(stream, { mimeType: videoMime, videoBitsPerSecond: 8000000 });
      } catch (e) {
        st.recording = false; return reject(e);
      }
      const chunks = [];
      recorder.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        st.recording = false;
        const type = videoMime.split(';')[0];
        const ext = type === 'video/mp4' ? 'mp4' : 'webm';
        drawSharePreview();
        const blobFile = new Blob(chunks, { type });
        if (!blobFile.size) return reject(new Error('empty'));
        resolve(new File([blobFile], shareBaseName() + '.' + ext, { type }));
      };
      const data = shareData.value;
      const total = data.kind === 'recap' ? recapDuration(data) : VIDEO_TOTAL;
      const start = performance.now();
      drawShareCard(canvas, data, st, 0);
      recorder.start(250);
      const frame = (now) => {
        const t = (now - start) / 1000;
        // Dopo l'animazione i risultati restano fermi, lo sfondo continua a muoversi piano
        drawShareCard(canvas, data, st, Math.min(t, total));
        st.recordProgress = Math.min(100, Math.round((t / total) * 100));
        if (t < total) requestAnimationFrame(frame);
        else recorder.stop();
      };
      requestAnimationFrame(frame);
    });
    const buildShareFile = () => (shareWantsVideo.value ? buildShareVideo() : buildShareImage());

    const downloadShareImage = async () => {
      const st = shareStudio.value;
      if (st.busy) return;
      st.busy = true; st.error = '';
      try {
        const file = await buildShareFile();
        downloadBlob(file, file.name);
        countShare();
      } catch (e) {
        st.error = shareWantsVideo.value ? 'Impossibile creare il video su questo dispositivo: prova con "Immagine".' : "Impossibile salvare l'immagine.";
      }
      st.busy = false;
    };

    const shareImage = async () => {
      const st = shareStudio.value;
      if (st.busy) return;
      st.busy = true; st.error = '';
      let file = null;
      // Link copiato subito (serve il tocco dell'utente): su Instagram si incolla nello sticker "Link"
      try { if (navigator.clipboard) navigator.clipboard.writeText(APP_URL).catch(() => {}); } catch (e) { /* ignora */ }
      const shareText = ({
        quote: 'La mia carica di oggi 🔥 #STILL #fraseDelGiorno',
        recap: st.recapType === 'year' ? 'Il mio anno su STILL 🎁 #STILL #STILLwrapped' : st.recapType === 'week' ? 'La mia settimana su STILL 🎬 #STILL' : 'Il mio mese su STILL 🎬 #STILL',
        achievement: 'Nuovo traguardo su STILL 🏆 #STILL'
      })[st.kind] || 'Ieri. Oggi. Domani. Ancora. 💪 #STILL';
      try {
        file = await buildShareFile();
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], text: shareText + ' ' + APP_URL });
          countShare();
        } else {
          downloadBlob(file, file.name);
          countShare();
          showToastMessage((file.type.startsWith('video') ? 'Video salvato' : 'Immagine salvata') + ': caricala nella tua storia o nel tuo post.');
        }
      } catch (e) {
        if (e && e.name === 'AbortError') { /* condivisione annullata */ }
        else if (file) downloadBlob(file, file.name);
        else st.error = 'Impossibile creare il file da condividere.';
      }
      st.busy = false;
    };

    // ---------------------------------------------------------------
    // FOTO DEI PROGRESSI (js/utils/photos.js): galleria, confronto prima/dopo, storia da condividere.
    // Le foto restano solo su questo telefono (IndexedDB). Qui si tengono solo i dati leggeri e le miniature.
    // ---------------------------------------------------------------
    const photos = shallowRef([]);            // { id, date, pose, note, createdAt, w, h, thumbUrl }
    const photosReady = ref(false);
    const photoUnavailable = ref(false);      // browser senza IndexedDB (es. alcune finestre private)
    const photoInput = ref(null);
    const photoThumbUrls = new Map();
    const loadPhotos = async () => {
      try {
        const list = await photoStore.list();
        const alive = new Set(list.map(p => p.id));
        photoThumbUrls.forEach((url, id) => { if (!alive.has(id)) { URL.revokeObjectURL(url); photoThumbUrls.delete(id); } });
        photos.value = list.map(({ thumb, ...p }) => {
          if (!photoThumbUrls.has(p.id) && thumb) photoThumbUrls.set(p.id, URL.createObjectURL(thumb));
          return { ...p, thumbUrl: photoThumbUrls.get(p.id) || '' };
        });
        // Per il promemoria in Dashboard (senza dover aprire le foto all'avvio)
        settings.value.photoLast = photos.value.length ? photos.value[0].date : '';
      } catch (e) {
        photoUnavailable.value = true;
      }
      photosReady.value = true;
    };
    // Peso del giorno della foto (o la misurazione più vicina entro 4 giorni)
    const photoWeight = (date) => {
      let best = null, bestGap = 5;
      weightEntries.value.forEach(m => {
        const gap = Math.abs(Math.round((new Date(m.date + 'T00:00:00') - new Date(date + 'T00:00:00')) / 86400000));
        if (gap < bestGap) { best = m; bestGap = gap; }
      });
      return best ? Number(best.weight) : null;
    };
    const MONTHS_LONG = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
    const MONTHS_SHORT = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
    const photoDateLabel = (date) => {
      const d = new Date(date + 'T00:00:00');
      return isNaN(d) ? '' : d.getDate() + ' ' + MONTHS_SHORT[d.getMonth()] + ' ' + d.getFullYear();
    };
    const poseLabel = (pose) => (PHOTO_POSES.find(p => p.id === pose) || {}).label || '';

    // Galleria: filtro per posa e foto raggruppate per mese
    const gallery = ref({ isOpen: false, pose: 'tutte', selecting: false, selected: [] });
    const galleryPhotos = computed(() => (gallery.value.pose === 'tutte' ? photos.value : photos.value.filter(p => p.pose === gallery.value.pose)));
    const galleryMonths = computed(() => {
      const groups = [];
      galleryPhotos.value.forEach(p => {
        const key = (p.date || '').slice(0, 7);
        let g = groups[groups.length - 1];
        if (!g || g.key !== key) {
          const [y, m] = key.split('-');
          g = { key, label: (MONTHS_LONG[Number(m) - 1] || '') + ' ' + y, items: [] };
          groups.push(g);
        }
        g.items.push(p);
      });
      return groups;
    });
    const galleryPoses = computed(() => {
      const used = new Set(photos.value.map(p => p.pose));
      return PHOTO_POSES.filter(p => used.has(p.id));
    });
    // Ultime foto per la card in Progressi, e da quanto non ne fai una
    const recentPhotos = computed(() => photos.value.slice(0, 4));
    const daysSinceLastPhoto = computed(() => (photos.value.length ? daysBetween(photos.value[0].date, toISODate()) : null));
    // FOTO DEL MESE: ogni 4 settimane un promemoria in Dashboard (solo per chi ha già iniziato)
    const photoDue = computed(() => {
      const s = settings.value;
      if (!s.photoLast) return 0;
      const today = toISODate();
      if (s.photoSnoozeUntil && s.photoSnoozeUntil > today) return 0;
      const days = daysBetween(s.photoLast, today);
      return days >= 28 ? days : 0;
    });
    const snoozePhoto = () => { settings.value.photoSnoozeUntil = toISODate(new Date(Date.now() + 4 * DAY_MS)); };
    // Dopo una foto nuova: se c'è una foto di almeno 2 settimane prima nella stessa posa,
    // la storia "Prima e dopo" (con la prima foto in assoluto) è già pronta da condividere
    const photoStory = ref({ isOpen: false, beforeId: null, afterId: null });
    const photoStoryPair = computed(() => {
      const st = photoStory.value;
      const b = photos.value.find(p => p.id === st.beforeId), a = photos.value.find(p => p.id === st.afterId);
      if (!b || !a) return null;
      const wb = photoWeight(b.date), wa = photoWeight(a.date);
      const diff = wb !== null && wa !== null ? Math.round((wa - wb) * 10) / 10 : null;
      return { before: b, after: a, days: daysBetween(b.date, a.date), diffText: diff ? (diff > 0 ? '+' : '−') + formatNumber(Math.abs(diff)) + ' kg' : '' };
    });
    const offerPhotoStory = (addedIds) => {
      const added = photos.value.filter(p => addedIds.includes(p.id));
      if (!added.length) return false;
      const after = added[0];   // la più recente tra quelle aggiunte
      const same = photos.value.filter(p => p.pose === after.pose && !addedIds.includes(p.id));
      const first = same[same.length - 1];
      if (!first || daysBetween(first.date, after.date) < 14) return false;
      photoStory.value = { isOpen: true, beforeId: first.id, afterId: after.id };
      return true;
    };
    const sharePhotoStory = async () => {
      const st = photoStory.value;
      photoCompare.value = { ...photoCompare.value, isOpen: false, beforeId: st.beforeId, afterId: st.afterId, busy: false };
      await shareCompare();
      photoStory.value.isOpen = false;
    };
    const viewPhotoStory = () => {
      const st = photoStory.value;
      photoStory.value.isOpen = false;
      openCompare(st.beforeId, st.afterId);
    };
    const openGallery = async (pose = 'tutte') => {
      gallery.value = { isOpen: true, pose, selecting: false, selected: [] };
      if (!photosReady.value) await loadPhotos();
    };
    const closeGallery = () => { gallery.value.isOpen = false; };

    // Aggiunta: si scelgono una o più foto (o si scatta), poi si conferma posa e data
    const photoAdd = ref({ isOpen: false, files: [], previews: [], pose: 'fronte', date: '', busy: false, done: 0, error: '' });
    const triggerPhotoInput = () => {
      if (photoUnavailable.value) { showToastMessage('Questo browser non permette di salvare foto (forse sei in una finestra privata). Apri STILL normalmente o dall\'app installata.'); return; }
      if (photoInput.value) { photoInput.value.value = ''; photoInput.value.click(); }
    };
    const onPhotoFiles = (event) => {
      const files = [...(event.target.files || [])].filter(f => /^image\//.test(f.type) || /\.(jpe?g|png|heic|heif|webp)$/i.test(f.name));
      event.target.value = '';
      if (!files.length) return;
      if (files.length > 40) { showToastMessage('Puoi aggiungere fino a 40 foto alla volta.'); return; }
      const one = files.length === 1;
      photoAdd.value.previews.forEach(u => URL.revokeObjectURL(u));
      photoAdd.value = {
        isOpen: true, files, previews: files.slice(0, 6).map(f => URL.createObjectURL(f)),
        pose: (one && photoPoseFromFile(files[0])) || 'fronte',
        // Una foto: data modificabile (di solito oggi). Più foto: ognuna con la sua data (dal nome o dal file)
        date: one ? (photoDateFromFile(files[0]) || toISODate()) : '',
        busy: false, done: 0, error: ''
      };
    };
    const closePhotoAdd = () => {
      if (photoAdd.value.busy) return;
      photoAdd.value.previews.forEach(u => URL.revokeObjectURL(u));
      photoAdd.value = { isOpen: false, files: [], previews: [], pose: 'fronte', date: '', busy: false, done: 0, error: '' };
    };
    const savePhotoAdd = async () => {
      const st = photoAdd.value;
      if (st.busy) return;
      st.busy = true; st.done = 0; st.error = '';
      const today = toISODate();
      let saved = 0, failed = 0;
      const addedIds = [];
      for (const file of st.files) {
        try {
          const { blob, thumb, w, h } = await compressPhoto(file);
          const date = st.files.length === 1 ? (st.date || today) : (photoDateFromFile(file) || today);
          const pose = st.files.length === 1 ? st.pose : (photoPoseFromFile(file) || st.pose);
          const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
          await photoStore.put({ id, date: date > today ? today : date, pose, note: '', createdAt: Date.now(), w, h, blob, thumb });
          addedIds.push(id);
          saved++;
        } catch (e) {
          console.error(e);
          failed++;
          if (e && e.name === 'QuotaExceededError') break;
        }
        st.done++;
      }
      st.busy = false;
      await loadPhotos();
      if (!saved) {
        st.error = 'Non sono riuscito a salvare le foto. Se sono in formato HEIC, sceglile dalla Galleria/Foto (il telefono le converte) oppure fai uno screenshot.';
        return;
      }
      requestPersistentStorage();
      closePhotoAdd();
      // Si vedono subito nella galleria: il messaggio serve solo se qualcuna non è entrata
      if (failed) showToastMessage(saved + ' foto salvate, ' + failed + ' non leggibili (forse HEIC: sceglile dalla Galleria/Foto).');
      settings.value.photoSnoozeUntil = '';
      if (offerPhotoStory(addedIds)) return;
      if (!gallery.value.isOpen && photos.value.length >= 2) openGallery();
    };

    // Visualizzatore: foto grande, scorre avanti e indietro nell'elenco filtrato
    const photoViewer = ref({ isOpen: false, id: null, url: '', editing: false, date: '', pose: '' });
    const viewerPhoto = computed(() => photos.value.find(p => p.id === photoViewer.value.id) || null);
    const viewerIndex = computed(() => galleryPhotos.value.findIndex(p => p.id === photoViewer.value.id));
    const fullUrlCache = new Map();
    const photoFullUrl = async (id) => {
      if (fullUrlCache.has(id)) return fullUrlCache.get(id);
      const rec = await photoStore.get(id);
      if (!rec || !rec.blob) return '';
      // Tiene in memoria solo le ultime foto grandi aperte
      if (fullUrlCache.size >= 6) { const [k, u] = fullUrlCache.entries().next().value; URL.revokeObjectURL(u); fullUrlCache.delete(k); }
      const url = URL.createObjectURL(rec.blob);
      fullUrlCache.set(id, url);
      return url;
    };
    const openPhoto = async (photo) => {
      if (gallery.value.selecting) { togglePhotoSelect(photo); return; }
      photoViewer.value = { isOpen: true, id: photo.id, url: photo.thumbUrl, editing: false, date: photo.date, pose: photo.pose };
      const url = await photoFullUrl(photo.id);
      if (photoViewer.value.id === photo.id && url) photoViewer.value.url = url;
    };
    const stepPhoto = (dir) => {
      const list = galleryPhotos.value;
      const next = list[viewerIndex.value + dir];
      if (next) openPhoto(next);
    };
    const closePhotoViewer = () => { photoViewer.value.isOpen = false; };
    const savePhotoEdit = async () => {
      const v = photoViewer.value;
      if (!v.date) return;
      await photoStore.update(v.id, { date: v.date > toISODate() ? toISODate() : v.date, pose: v.pose });
      v.editing = false;
      await loadPhotos();
    };
    const deletePhoto = (photo) => {
      showConfirm('Eliminare la foto?', 'La foto verrà cancellata da questo telefono. Non si può annullare.', async () => {
        await photoStore.remove(photo.id);
        if (fullUrlCache.has(photo.id)) { URL.revokeObjectURL(fullUrlCache.get(photo.id)); fullUrlCache.delete(photo.id); }
        photoViewer.value.isOpen = false;
        await loadPhotos();
      });
    };

    // Confronto: due foto scelte (o la prima e l'ultima della stessa posa), con cursore da trascinare
    const photoCompare = ref({ isOpen: false, beforeId: null, afterId: null, beforeUrl: '', afterUrl: '', split: 50, mode: 'slider', busy: false });
    const togglePhotoSelect = (photo) => {
      const sel = gallery.value.selected;
      const i = sel.indexOf(photo.id);
      if (i > -1) sel.splice(i, 1);
      else { if (sel.length >= 2) sel.shift(); sel.push(photo.id); }
    };
    const startCompareSelect = () => { gallery.value.selecting = true; gallery.value.selected = []; };
    const cancelCompareSelect = () => { gallery.value.selecting = false; gallery.value.selected = []; };
    const openCompare = async (idA, idB) => {
      const a = photos.value.find(p => p.id === idA), b = photos.value.find(p => p.id === idB);
      if (!a || !b) return;
      // La più vecchia è sempre "prima"
      const [before, after] = (a.date < b.date || (a.date === b.date && a.createdAt < b.createdAt)) ? [a, b] : [b, a];
      photoCompare.value = { isOpen: true, beforeId: before.id, afterId: after.id, beforeUrl: before.thumbUrl, afterUrl: after.thumbUrl, split: 50, mode: 'slider', busy: false };
      gallery.value.selecting = false; gallery.value.selected = [];
      const [bu, au] = await Promise.all([photoFullUrl(before.id), photoFullUrl(after.id)]);
      if (photoCompare.value.beforeId === before.id) { photoCompare.value.beforeUrl = bu || before.thumbUrl; photoCompare.value.afterUrl = au || after.thumbUrl; }
    };
    const confirmCompareSelect = () => {
      const [a, b] = gallery.value.selected;
      if (a && b) openCompare(a, b);
    };
    // Confronto veloce: la prima e l'ultima foto della posa più fotografata
    const quickCompare = computed(() => {
      const byPose = {};
      photos.value.forEach(p => { (byPose[p.pose] = byPose[p.pose] || []).push(p); });
      const best = Object.values(byPose).filter(l => l.length >= 2).sort((x, y) => y.length - x.length)[0];
      if (!best) return photos.value.length >= 2 ? { before: photos.value[photos.value.length - 1], after: photos.value[0] } : null;
      return { before: best[best.length - 1], after: best[0] };
    });
    const openQuickCompare = () => { const q = quickCompare.value; if (q) openCompare(q.before.id, q.after.id); };
    const compareBefore = computed(() => photos.value.find(p => p.id === photoCompare.value.beforeId) || null);
    const compareAfter = computed(() => photos.value.find(p => p.id === photoCompare.value.afterId) || null);
    const compareStats = computed(() => {
      const b = compareBefore.value, a = compareAfter.value;
      if (!b || !a) return null;
      const days = daysBetween(b.date, a.date);
      const wb = photoWeight(b.date), wa = photoWeight(a.date);
      const diff = wb !== null && wa !== null ? Math.round((wa - wb) * 10) / 10 : null;
      return {
        days, wb, wa, diff,
        diffText: diff === null ? '' : (diff > 0 ? '+' : diff < 0 ? '−' : '') + formatNumber(Math.abs(diff)) + ' kg'
      };
    });
    // Il cursore si trascina con il dito su tutta la foto
    const dragCompare = (event) => {
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
      photoCompare.value.split = Math.max(0, Math.min(100, (x / rect.width) * 100));
    };
    const closeCompare = () => { photoCompare.value.isOpen = false; };

    // Storia "Prima e dopo" (js/share/draw.js → drawPhotoCompare)
    const loadForCanvas = (url) => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
    const shareCompare = async () => {
      const st = photoCompare.value;
      const b = compareBefore.value, a = compareAfter.value, stats = compareStats.value;
      if (st.busy || !b || !a) return;
      st.busy = true;
      let file = null;
      try { if (navigator.clipboard) navigator.clipboard.writeText(APP_URL).catch(() => {}); } catch (e) { /* ignora */ }
      try {
        const [ib, ia] = await Promise.all([loadForCanvas(await photoFullUrl(b.id)), loadForCanvas(await photoFullUrl(a.id))]);
        if (document.fonts && document.fonts.ready) await document.fonts.ready;
        const canvas = document.createElement('canvas');
        drawPhotoCompare(canvas, {
          before: { img: ib, date: photoDateLabel(b.date), weight: stats && stats.wb !== null ? formatNumber(stats.wb) + ' kg' : '' },
          after: { img: ia, date: photoDateLabel(a.date), weight: stats && stats.wa !== null ? formatNumber(stats.wa) + ' kg' : '' },
          days: stats ? stats.days : 0,
          change: stats && stats.diff ? stats.diffText : ''
        });
        const blobFile = await new Promise((res, rej) => canvas.toBlob(x => (x ? res(x) : rej(new Error('blob'))), 'image/jpeg', 0.92));
        file = new File([blobFile], 'still-prima-e-dopo-' + toISODate() + '.jpg', { type: 'image/jpeg' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], text: 'Il mio percorso su STILL 💪 #STILL #primaedopo ' + APP_URL });
        } else {
          downloadBlob(file, file.name);
          showToastMessage('Immagine salvata: caricala nella tua storia.');
        }
        countShare();
      } catch (e) {
        if (e && e.name === 'AbortError') { /* annullato */ }
        else if (file) downloadBlob(file, file.name);
        else showToastMessage("Non sono riuscito a creare l'immagine.");
      }
      st.busy = false;
    };

    // Salva tutte le foto (per tenerle al sicuro o passarle a un altro telefono): il nome ha data e posa
    const exportPhotos = async () => {
      if (!photos.value.length) return;
      const files = [];
      const seen = {};
      for (const p of [...photos.value].reverse()) {
        const rec = await photoStore.get(p.id);
        if (!rec || !rec.blob) continue;
        const base = photoFileName(p);
        seen[base] = (seen[base] || 0) + 1;
        files.push(new File([rec.blob], photoFileName(p, seen[base] - 1), { type: 'image/jpeg' }));
      }
      try {
        if (navigator.canShare && navigator.canShare({ files })) { await navigator.share({ files, title: 'Foto dei progressi STILL' }); return; }
      } catch (e) { if (e && e.name === 'AbortError') return; }
      files.forEach((f, i) => setTimeout(() => downloadBlob(f, f.name), i * 350));
      showToastMessage('Sto salvando ' + files.length + ' foto nei download. Per rimetterle in STILL basta aggiungerle di nuovo: data e posa si leggono dal nome.');
    };
    // Le foto si leggono solo quando servono (scheda Progressi), così l'avvio resta veloce
    watch(activeTab, (tab) => { if (tab === 'progress' && !photosReady.value) loadPhotos(); }, { immediate: true });

    // ---------------------------------------------------------------
    // BACKUP: esporta / importa tutti i dati in un file JSON
    // ---------------------------------------------------------------
    const backupModal = ref({ isOpen: false, error: '', sizeKB: 0 });
    // Nel backup serve sapere se ci sono foto da salvare a parte
    watch(() => backupModal.value.isOpen, (open) => { if (open && !photosReady.value) loadPhotos(); });
    const backupFileInput = ref(null);
    const openBackupModal = () => {
      let sizeKB = 0;
      try { sizeKB = storage.sizeKB(); } catch (e) { /* ignora */ }
      backupModal.value = { isOpen: true, error: '', sizeKB };
    };
    const closeBackupModal = () => { backupModal.value.isOpen = false; };

    // --- Protezione dei dati ---
    // 1) Memoria "persistente": chiede al browser di non cancellare i dati di STILL quando
    //    serve spazio o se l'app non si apre per un po' (Safari altrimenti li cancella dopo ~7 giorni).
    const storagePersisted = ref(null); // null = non si sa / non supportato
    const requestPersistentStorage = async () => {
      try {
        if (!navigator.storage || !navigator.storage.persist) return;
        let ok = await navigator.storage.persisted();
        if (!ok) ok = await navigator.storage.persist();
        storagePersisted.value = !!ok;
      } catch (e) { /* non supportato */ }
    };

    // 2) Promemoria di backup: la prima volta dopo una settimana d'uso, poi ogni 2 settimane.
    const DAY_MS = 86400000;
    const lastBackupLabel = computed(() => {
      const at = settings.value.lastBackupAt;
      if (!at) return 'mai';
      const days = Math.floor((Date.now() - new Date(at).getTime()) / DAY_MS);
      if (days <= 0) return 'oggi';
      if (days === 1) return 'ieri';
      return `${days} giorni fa`;
    });
    const backupDue = computed(() => {
      const now = Date.now();
      const s = settings.value;
      if (s.backupSnoozeUntil && new Date(s.backupSnoozeUntil).getTime() > now) return false;
      if (s.lastBackupAt) return now - new Date(s.lastBackupAt).getTime() > 14 * DAY_MS;
      return now - new Date(s.firstUseAt).getTime() > 7 * DAY_MS;
    });
    const snoozeBackup = () => { settings.value.backupSnoozeUntil = new Date(Date.now() + 3 * DAY_MS).toISOString(); };

    // Versione mostrata nel profilo e nelle segnalazioni (aggiornarla insieme a VERSION in sw.js)
    const APP_VERSION = 'beta 18';
    // Segnalazione: messaggio pronto da mandare in chat a chi ha fatto provare l'app (nessun contatto nell'app)
    const sendFeedback = async () => {
      const ua = navigator.userAgent;
      const device = /iPhone|iPad/.test(ua) ? 'iPhone/iPad' : /Android/.test(ua) ? 'Android' : 'Computer';
      const installed = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches ? 'app installata' : 'dal browser';
      const text = ['Segnalazione STILL (' + APP_VERSION + ', ' + device + ', ' + installed + ')', '',
        'Cosa stavo facendo:', '', 'Cosa è successo (o la mia idea):', '', ''].join('\n');
      try {
        if (navigator.share) { await navigator.share({ text }); return; }
      } catch (e) { if (e && e.name === 'AbortError') return; }
      try { await navigator.clipboard.writeText(text); showToastMessage('Messaggio copiato! Incollalo in chat a chi ti ha fatto provare STILL. 🙏'); }
      catch (e) { showToastMessage('Scrivi a chi ti ha fatto provare STILL indicando: ' + APP_VERSION + ', ' + device + '.'); }
    };

    const exportBackup = async () => {
      const markDone = () => {
        settings.value.lastBackupAt = new Date().toISOString();
        delete settings.value.backupSnoozeUntil;
        storage.save('still_settings', settings.value);
      };
      // La data del backup va dentro il file stesso
      const previous = { at: settings.value.lastBackupAt, snooze: settings.value.backupSnoozeUntil };
      markDone();
      const payload = { app: 'STILL', version: 1, exportedAt: new Date().toISOString(), data: storage.exportAll() };
      const name = `still-backup-${toISODate()}.json`;
      const text = JSON.stringify(payload, null, 2);
      // Sul telefono (soprattutto iPhone con l'app sulla Home) il download spesso non parte:
      // si apre il menu di condivisione per salvarlo in File, Drive, WhatsApp…
      const touch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      if (touch && navigator.canShare) {
        try {
          const file = new File([text], name, { type: 'application/json' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: 'Backup STILL' });
            showToastMessage('Backup salvato! 💾 Tienilo in un posto sicuro (File, Drive o una chat con te stesso).');
            return;
          }
        } catch (e) {
          if (e && e.name === 'AbortError') {
            // Annullato: il backup non è stato fatto
            settings.value.lastBackupAt = previous.at;
            if (previous.snooze) settings.value.backupSnoozeUntil = previous.snooze;
            storage.save('still_settings', settings.value);
            return;
          }
        }
      }
      const blob = new Blob([text], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    const triggerImportBackup = () => {
      backupModal.value.error = '';
      if (backupFileInput.value) {
        backupFileInput.value.value = '';
        backupFileInput.value.click();
      }
    };

    // Legge e valida un file di backup; onValid riceve i dati e la data del backup
    const readBackupFile = (event, onError, onValid) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      // Un backup vero pesa pochi MB (il browser ne tiene circa 5): oltre è sicuramente sbagliato
      if (file.size > 15 * 1024 * 1024) { onError('Il file è troppo grande per essere un backup di STILL.'); return; }
      const reader = new FileReader();
      reader.onload = () => {
        let payload;
        try {
          payload = JSON.parse(reader.result);
        } catch (e) {
          onError('Il file non è un backup valido.');
          return;
        }
        const data = payload && payload.app === 'STILL' ? payload.data : null;
        const validKeys = data && typeof data === 'object' ? Object.keys(data).filter(k => STORAGE_KEYS.includes(k)) : [];
        if (!validKeys.length) {
          onError('Il file non contiene dati di STILL.');
          return;
        }
        if (validKeys.some(k => !hasShape(k, data[k]))) {
          onError('Il backup è rovinato o è stato modificato: non lo carico per non perdere i tuoi dati.');
          return;
        }
        // Solo le chiavi di STILL: il resto del file viene ignorato
        const clean = {};
        validKeys.forEach(k => { clean[k] = data[k]; });
        const when = payload.exportedAt ? new Date(payload.exportedAt).toLocaleString('it-IT') : 'data sconosciuta';
        onValid(clean, when);
      };
      reader.onerror = () => onError('Impossibile leggere il file.');
      reader.readAsText(file);
    };

    const triggerOnboardingImport = () => {
      onboarding.value.error = '';
      if (onboardingFileInput.value) {
        onboardingFileInput.value.value = '';
        onboardingFileInput.value.click();
      }
    };

    // Primo avvio: non ci sono dati da sovrascrivere, si ripristina subito
    const handleOnboardingBackup = (event) => {
      readBackupFile(event, (msg) => { onboarding.value.error = msg; }, (data) => {
        if (storage.importAll(data)) window.location.reload();
        else onboarding.value.error = 'Spazio insufficiente sul dispositivo: il backup non è stato ripristinato.';
      });
    };

    const handleBackupFile = (event) => {
      readBackupFile(event, (msg) => { backupModal.value.error = msg; }, (data, when) => {
        backupModal.value.isOpen = false;
        showConfirm(
          'Ripristinare il backup?',
          `Backup del ${when}. I dati attuali verranno sostituiti con quelli del file. L'operazione non si può annullare.`,
          () => {
            if (storage.importAll(data)) window.location.reload();
            else setTimeout(() => showToastMessage('Spazio insufficiente sul dispositivo: il backup non è stato ripristinato e i tuoi dati attuali sono rimasti com\'erano.'), 50);
          }
        );
      });
    };

    // ---------------------------------------------------------------
    // SERIE DI GIORNI ATTIVI: un giorno è attivo se hai segnato almeno
    // un pasto, un allenamento in palestra o uno sport fatto.
    // ---------------------------------------------------------------
    const activeDaySet = computed(() => {
      const set = new Set();
      workoutLogs.value.forEach(log => { if (logCountsAsTraining(log)) set.add(log.date); });
      trainingSessions.value.forEach(s => {
        if (s.kind === 'gym' && s.date && (s.report || (s.statusByDate && s.statusByDate[s.date] === 'done'))) set.add(s.date);
        if (s.kind === 'sport' && s.statusByDate) {
          Object.entries(s.statusByDate).forEach(([key, status]) => { if (status === 'done') set.add(key); });
        }
      });
      Object.entries(mealLogs.value).forEach(([key, logs]) => {
        if (Object.values(logs || {}).some(l => l && (l.status === 'done' || l.status === 'other'))) set.add(key);
      });
      Object.entries(foodDiary.value).forEach(([key, day]) => {
        if (Object.values(day || {}).some(e => e && (e.text || e.kcal))) set.add(key);
      });
      // Giorni leggeri: anche 10 minuti di camminata o stretching tengono viva la serie
      Object.keys(settings.value.lightDays || {}).forEach(key => set.add(key));
      return set;
    });

    // GIORNO LEGGERO: niente sensi di colpa, basta poco movimento (js/utils/coach.js, LIGHT_ACTIVITIES)
    const lightDayModal = ref({ isOpen: false, type: 'walk', min: 15 });
    const lightToday = computed(() => (settings.value.lightDays || {})[todayDateKey.value] || null);
    const lightActivity = (id) => LIGHT_ACTIVITIES.find(a => a.id === id) || LIGHT_ACTIVITIES[LIGHT_ACTIVITIES.length - 1];
    const openLightDay = () => {
      const cur = lightToday.value;
      lightDayModal.value = { isOpen: true, type: cur ? cur.type : 'walk', min: cur ? cur.min : 15 };
    };
    const saveLightDay = () => {
      const m = lightDayModal.value;
      const wasDone = streakInfo.value.todayDone;
      settings.value.lightDays = { ...(settings.value.lightDays || {}), [todayDateKey.value]: { type: m.type, min: m.min } };
      m.isOpen = false;
      if (!wasDone) showToastMessage('Fatto! Anche i giorni piccoli contano: la serie continua. 🌱');
    };
    const removeLightDay = () => {
      const days = { ...(settings.value.lightDays || {}) };
      delete days[todayDateKey.value];
      settings.value.lightDays = days;
      lightDayModal.value.isOpen = false;
    };

    // PROTEGGI SERIE: se salti UN giorno la serie non si azzera (il giorno salvato non si conta).
    // Si ricarica dopo SHIELD_RECHARGE giorni attivi. Calcolato sempre dallo storico: niente stato da salvare.
    const SHIELD_RECHARGE = 7;
    // RECUPERO SERIE: se la serie si è appena interrotta (1 o 2 giorni saltati) si può salvare
    // condividendo una storia. I giorni salvati sono in settings.streakRepairs (contano come protetti).
    const STREAK_REPAIR_COOLDOWN = 14;   // giorni tra un recupero e l'altro
    const streakInfo = computed(() => {
      const set = activeDaySet.value;
      const repairs = new Set(settings.value.streakRepairs || []);
      const today = toISODate();
      const keys = [...set].filter(k => k <= today).sort();
      let current = 0, best = 0, shields = 1, sinceUse = SHIELD_RECHARGE;
      let startKey = '', lastActive = '', lastBreak = null;
      const protectedDays = new Set();
      const activeDay = (key) => {
        if (current === 0) startKey = key;  // inizio della serie in corso
        current++; sinceUse++;
        lastActive = key;
        if (!shields && sinceUse >= SHIELD_RECHARGE) shields = 1;
        best = Math.max(best, current);
      };
      if (keys.length) {
        const d = new Date(keys[0] + 'T12:00:00');
        let guard = 0;
        while (toISODate(d) < today && guard++ < 5000) {
          const key = toISODate(d);
          if (set.has(key)) activeDay(key);
          else if (current > 0 && repairs.has(key)) protectedDays.add(key);
          else if (current > 0 && shields) { shields = 0; sinceUse = 0; protectedDays.add(key); }
          else {
            if (current > 0) lastBreak = { length: current, lastActive, brokeAt: key, startKey };
            current = 0;
          }
          d.setDate(d.getDate() + 1);
        }
        if (set.has(today)) activeDay(today);
      }
      const todayDone = set.has(today);
      const y = new Date(); y.setHours(12, 0, 0, 0); y.setDate(y.getDate() - 1);
      const yesterday = toISODate(y);
      const protectedYesterday = protectedDays.has(yesterday);

      // Serie appena persa: interrotta ieri o l'altro ieri, e dopo nessun altro giorno attivo (a parte oggi)
      let recoverable = null;
      if (lastBreak && lastBreak.length >= 2 && current <= 1) {
        const missed = [];
        const d = new Date(lastBreak.lastActive + 'T12:00:00');
        d.setDate(d.getDate() + 1);
        while (toISODate(d) < today) { const k = toISODate(d); if (!set.has(k) && !protectedDays.has(k)) missed.push(k); d.setDate(d.getDate() + 1); }
        const lastRepair = settings.value.lastRepairAt || '';
        const cooledDown = !lastRepair || daysBetween(lastRepair, today) >= STREAK_REPAIR_COOLDOWN;
        if (missed.length && missed.length <= 2 && daysBetween(lastBreak.brokeAt, today) <= 2 && cooledDown) {
          recoverable = { length: lastBreak.length, missed, restored: lastBreak.length + (todayDone ? 1 : 0), startKey: lastBreak.startKey };
        }
      }

      const week = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - i);
        const key = toISODate(d);
        week.push({ key, label: ['D', 'L', 'M', 'M', 'G', 'V', 'S'][d.getDay()], active: set.has(key), protected: protectedDays.has(key), today: i === 0 });
      }

      let message;
      if (todayDone) message = current > 1 ? 'Oggi è fatto. Domani si continua.' : 'Primo giorno fatto. Domani si continua.';
      else if (protectedYesterday) message = 'Ieri il proteggi serie ha salvato la tua serie: segna qualcosa oggi per non perderla.';
      else if (current > 0) message = 'Segna un pasto, un allenamento o anche solo 10 minuti di movimento per non perdere la serie.';
      else message = 'Segna un pasto, un allenamento o 10 minuti di movimento e inizia la tua serie.';
      return {
        current, best, todayDone, week, message, protectedYesterday, startKey, recoverable,
        shieldReady: !!shields,
        shieldIn: shields ? 0 : Math.max(1, SHIELD_RECHARGE - sinceUse)
      };
    });

    // Riepilogo del mese scorso in evidenza nei primi giorni del mese
    const recapBanner = computed(() => {
      if (new Date().getDate() > 7) return null;
      const r = recapRange(1);
      let active = 0;
      const d = new Date(r.first);
      while (toISODate(d) <= r.end) { if (activeDaySet.value.has(toISODate(d))) active++; d.setDate(d.getDate() + 1); }
      return active ? { month: r.month, active } : null;
    });

    // Riepilogo della settimana: domenica quella in corso, lunedì quella appena finita
    const weekBanner = computed(() => {
      const dow = new Date().getDay();
      if (dow !== 0 && dow !== 1) return null;
      const offset = dow === 0 ? 0 : 1;
      const r = weekRange(offset);
      let active = 0;
      const d = new Date(r.first);
      while (toISODate(d) <= r.end) { if (activeDaySet.value.has(toISODate(d))) active++; d.setDate(d.getDate() + 1); }
      return active ? { offset, active, label: r.month } : null;
    });

    // ---------------------------------------------------------------
    // IL TUO ANNO (stile "wrapped"): racconto a storie dell'anno su STILL, con paragoni divertenti
    // (js/data/wrapped.js). Nell'app è un racconto a schermo intero; nelle storie diventa un video.
    // ---------------------------------------------------------------
    const buildWrapped = (year) => {
      const start = year + '-01-01';
      const yearEnd = year + '-12-31';
      const today = toISODate();
      const end = yearEnd < today ? yearEnd : today;
      const inRange = (d) => !!d && d >= start && d <= end;
      const fmt = (n) => Math.round(n).toLocaleString('it-IT');

      // Giorni attivi, mese e giorno preferiti, serie migliore
      const set = activeDaySet.value;
      const perMonth = Array(12).fill(0);
      const perDow = Array(7).fill(0);
      let activeDays = 0, run = 0, bestRun = 0, totalDays = 0;
      const c = new Date(start + 'T12:00:00');
      while (toISODate(c) <= end && totalDays < 400) {
        const k = toISODate(c);
        totalDays++;
        if (set.has(k)) { activeDays++; perMonth[c.getMonth()]++; perDow[c.getDay()]++; run++; bestRun = Math.max(bestRun, run); } else run = 0;
        c.setDate(c.getDate() + 1);
      }

      // Allenamenti: palestra (log, sessioni guidate, sessioni segnate) + sport segnati come fatti
      const secs = trainingSecondsBetween(start, end);
      const gymDates = new Set(workoutLogs.value.filter(log => inRange(log.date)).map(log => log.date));
      const times = [];
      const sports = {};
      trainingSessions.value.forEach(s => {
        if (s.kind === 'gym') {
          if (s.report && inRange(s.date)) { gymDates.add(s.date); if (s.time) times.push(s.time); }
          Object.keys(s.statusByDate || {}).forEach(k => {
            if (s.statusByDate[k] === 'done' && inRange(k)) { if (!gymDates.has(k) && s.time) times.push(s.time); gymDates.add(k); }
          });
        } else if (s.kind === 'sport') {
          Object.keys(s.statusByDate || {}).forEach(k => {
            if (s.statusByDate[k] !== 'done' || !inRange(k)) return;
            const name = s.sport || 'Altro';
            const sp = sports[name] || (sports[name] = { name, sessions: 0, hours: 0 });
            sp.sessions++;
            sp.hours += (sportDurationMin(s) || DEFAULT_TRAINING_MIN) / 60;
            if (s.time) times.push(s.time);
          });
        }
      });
      const sportList = Object.values(sports).sort((a, b) => b.hours - a.hours);
      const sportSessions = sportList.reduce((sum, sp) => sum + sp.sessions, 0);
      const workouts = gymDates.size + sportSessions;
      const hours = secs.total / 3600;
      const weeks = Math.max(1, totalDays / 7);

      // Volume sollevato ed esercizio preferito
      let volume = 0;
      const exCount = {};
      workoutLogs.value.forEach(log => {
        if (!inRange(log.date)) return;
        const info = findExerciseInfo(log);
        const ex = info ? info.exercise : null;
        const name = (ex && ex.name) || log.exerciseName || '';
        if (name) exCount[name] = (exCount[name] || 0) + 1;
        const w = parseOptionalNumber(log.weight);
        if (!w) return;
        if (Array.isArray(log.setsDetail) && log.setsDetail.length) {
          log.setsDetail.forEach(item => { const sw = parseOptionalNumber(item.weight); const r = parseInt(item.reps, 10); if (sw && r) volume += sw * r; });
        } else {
          const sets = parseInt(ex && ex.sets, 10) || 3;
          const reps = parseInt(log.reps, 10) || parseInt(ex && ex.reps, 10) || 10;
          volume += w * sets * reps;
        }
      });
      const topExercise = Object.entries(exCount).sort((a, b) => b[1] - a[1])[0] || null;
      const progress = shareProgressData(0, { focus: 'total', hero: 'auto', loadMode: 'kg', weightMode: 'percent', showName: false }, { start, end });
      const bestLift = progress.bestLift;

      // Alimentazione: pasti fatti e proteine stimate
      let mealsDone = 0, protein = 0;
      Object.keys(mealLogs.value).forEach(k => {
        if (!inRange(k)) return;
        const logs = mealLogs.value[k] || {};
        getMealsForDate(new Date(k + 'T12:00:00')).forEach(m => {
          if (logs[m.id] && logs[m.id].status === 'done') { mealsDone++; protein += m.protein || 0; }
        });
      });

      // Calorie bruciate (stima): MET × peso × ore
      const lastWeight = measurements.value.filter(m => m.weight).slice().sort((a, b) => a.date.localeCompare(b.date)).pop();
      const kg = lastWeight ? Number(lastWeight.weight) : 70;
      const kcal = (secs.gym / 3600) * WRAPPED_METS.gym * kg + sportList.reduce((sum, sp) => sum + sp.hours * (WRAPPED_METS[sp.name] || 5) * kg, 0);

      // Orario e giorno preferiti
      const hourCount = {};
      times.forEach(t => { const h = parseInt(String(t).split(':')[0], 10); if (!isNaN(h)) hourCount[h] = (hourCount[h] || 0) + 1; });
      const favHour = Object.entries(hourCount).sort((a, b) => b[1] - a[1])[0];
      const favDow = perDow.indexOf(Math.max(...perDow));
      const favMonth = perMonth.indexOf(Math.max(...perMonth));
      const morning = times.filter(t => parseInt(t, 10) < 10).length;
      const evening = times.filter(t => parseInt(t, 10) >= 20).length;
      const weekend = perDow[0] + perDow[6];

      // Che atleta sei
      const typeId = bestRun >= 30 ? 'unstoppable'
        : gymDates.size / weeks >= 4 ? 'machine'
        : times.length >= 5 && morning / times.length > 0.5 ? 'early'
        : times.length >= 5 && evening / times.length > 0.5 ? 'night'
        : activeDays >= 8 && weekend / activeDays > 0.45 ? 'weekend'
        : sportList.length && secs.sport > secs.gym ? 'sport'
        : 'steady';
      const type = WRAPPED_TYPES.find(t => t.id === typeId);

      // --- Le slide ---
      const slides = [];
      const add = (slide) => slides.push({ bg: WRAPPED_BACKGROUNDS[slides.length % WRAPPED_BACKGROUNDS.length], ...slide });
      add({ id: 'intro', emoji: '🎁', kicker: 'Il tuo ' + year, big: String(year), caption: 'su STILL', fun: activeDays ? 'Pronto a rivivere il tuo anno? Tocca per andare avanti.' : 'Quest\'anno è appena iniziato per te: il prossimo racconto sarà enorme.' });
      if (activeDays) {
        add({ id: 'days', emoji: '📅', kicker: 'Giorni attivi', big: fmt(activeDays), caption: 'giorni in movimento', sub: 'su ' + totalDays,
          fun: 'Il tuo mese migliore è stato ' + WRAPPED_MONTHS[favMonth] + ', con ' + perMonth[favMonth] + ' giorni attivi.', scene: true });
      }
      if (workouts) {
        const parts = [gymDates.size ? fmt(gymDates.size) + ' in palestra' : '', sportSessions ? fmt(sportSessions) + ' di sport' : ''].filter(Boolean).join(' · ');
        add({ id: 'workouts', emoji: '💪', kicker: 'Allenamenti', big: fmt(workouts), caption: 'allenamenti fatti', sub: parts,
          fun: 'In media ' + formatNumber(Math.round(workouts / weeks * 10) / 10) + ' a settimana. ' + (workouts / weeks >= 3 ? 'Costanza da atleta vero.' : 'Ogni allenamento conta, e tu li hai contati tutti.'), scene: true });
      }
      if (hours >= 1) {
        const pct = Math.round(hours / WRAPPED_PRO_HOURS * 100);
        add({ id: 'hours', emoji: '⏱️', kicker: 'Ore di allenamento', big: fmt(hours) + ' ore', caption: 'passate ad allenarti', sub: pct + '% di un professionista',
          fun: 'Un calciatore di Serie A si allena circa ' + WRAPPED_PRO_HOURS + ' ore a stagione: tu sei al ' + pct + '%. ' + wProLine(pct), scene: true });
      }
      if (kcal >= 800) {
        add({ id: 'kcal', emoji: '🍕', kicker: 'Calorie bruciate', big: fmt(kcal / 800), caption: kcal / 800 >= 2 ? 'pizze margherita' : 'pizza margherita', sub: '≈ ' + fmt(kcal) + ' kcal',
          fun: 'Allenandoti hai bruciato circa ' + fmt(kcal) + ' kcal: l\'equivalente di ' + fmt(kcal / 800) + ' pizze margherita. Una te la sei meritata.', scene: true });
      }
      if (volume >= 30) {
        const ref = WRAPPED_WEIGHTS.find(item => volume >= item.kg) || WRAPPED_WEIGHTS[WRAPPED_WEIGHTS.length - 1];
        const n = Math.max(1, Math.round(volume / ref.kg));
        add({ id: 'volume', emoji: ref.emoji, kicker: 'Peso sollevato', big: fmt(n), caption: n === 1 ? ref.one : ref.many, sub: '≈ ' + fmt(volume / 1000) + ' tonnellate',
          fun: 'Sommando serie e ripetizioni hai sollevato circa ' + fmt(volume) + ' kg: come alzare ' + fmt(n) + ' ' + (n === 1 ? ref.one : ref.many) + '. Senza gru.', scene: true });
      }
      if (bestLift) {
        const first = bestLift.series[0], last = bestLift.series[bestLift.series.length - 1];
        add({ id: 'lift', emoji: '🏆', kicker: 'Miglior progresso', big: '+' + formatNumber(Math.round(bestLift.kg * 10) / 10) + ' kg', caption: bestLift.name,
          fun: 'Da ' + formatNumber(first) + ' a ' + formatNumber(last) + ' kg. ' + (topExercise ? 'E il tuo esercizio del cuore è ' + topExercise[0] + ', registrato ' + topExercise[1] + ' volte.' : ''), scene: true });
      } else if (topExercise) {
        add({ id: 'fav', emoji: '❤️', kicker: 'Il tuo esercizio', big: topExercise[0], caption: 'registrato ' + topExercise[1] + ' volte', fun: 'Tra voi è amore vero.', scene: true });
      }
      sportList.slice(0, 2).forEach(sp => {
        const funFn = WRAPPED_SPORT_FUN[sp.name];
        const f = funFn ? funFn(sp.hours) : { emoji: '🏅', big: fmt(sp.hours) + ' ore', caption: 'di ' + sp.name.toLowerCase(), fun: fmt(sp.sessions) + ' sessioni segnate. Continua così.' };
        add({ id: 'sport-' + sp.name, emoji: f.emoji, kicker: sp.name + ' · ' + fmt(sp.sessions) + ' sessioni', big: f.big, caption: f.caption, sub: fmt(sp.hours) + ' ore in campo', fun: f.fun + ' (stima)', scene: true });
      });
      if (activeDays >= 3) {
        add({ id: 'when', emoji: favHour && parseInt(favHour[0], 10) < 12 ? '🌅' : '🌙', kicker: 'Il tuo momento', big: WRAPPED_DAYS[favDow].charAt(0).toUpperCase() + WRAPPED_DAYS[favDow].slice(1), caption: 'il tuo giorno preferito',
          sub: favHour ? 'di solito alle ' + favHour[0] : '', fun: 'Il ' + WRAPPED_DAYS[favDow] + ' è il giorno in cui sei stato più attivo' + (favHour ? ', e l\'orario che scegli più spesso è intorno alle ' + favHour[0] + '.' : '.'), scene: true });
      }
      if (bestRun >= 2) {
        const pet = petState.value;
        add({ id: 'streak', emoji: '🔥', kicker: 'Serie migliore', big: bestRun + ' giorni', caption: 'di fila senza fermarti', sub: pet.stage ? 'con ' + pet.name + ' al tuo fianco' : '',
          fun: bestRun >= 30 ? 'Più di un mese senza saltare un giorno. Questo non è un caso, è un carattere.' : 'La costanza batte il talento quando il talento non è costante.', scene: true });
      }
      if (mealsDone) {
        const chicken = protein / 35;
        add({ id: 'food', emoji: '🥗', kicker: 'Alimentazione', big: fmt(mealsDone), caption: 'pasti del piano fatti', sub: protein ? '≈ ' + formatNumber(Math.round(protein / 100) / 10) + ' kg di proteine' : '',
          fun: protein ? 'Circa ' + fmt(protein) + ' g di proteine: come ' + fmt(chicken) + ' petti di pollo. I tuoi muscoli ringraziano.' : 'Un pasto alla volta si costruisce tutto.', scene: true });
      }
      // Collezione dei compagni della serie (forma più alta raggiunta da ognuno)
      const pets = PET_SPECIES.map((sp, i) => ({ sp, i, max: (settings.value.pet.album || {})[sp.id] || 0 })).filter(p => p.max)
        .map(p => ({ id: p.sp.id, name: p.sp.stages[p.max - 1], svg: petSvg({ species: p.i, stage: p.max, mood: 'happy', uid: 'wp' + p.sp.id }) }));
      if (pets.length) {
        const missing = PET_SPECIES.length - pets.length;
        add({ id: 'pets', emoji: '🥚', kicker: 'La tua collezione', big: pets.length + ' su ' + PET_SPECIES.length, caption: pets.length === 1 ? 'compagno trovato' : 'compagni trovati', pets,
          fun: missing ? 'Ne mancano ' + missing + ': ogni nuova serie fa schiudere un uovo. Chi sarà il prossimo?' : 'Li hai trovati tutti. Collezionista leggendario. 👑', scene: true });
      }
      const trophies = unlockedTrophies.value.length;
      if (trophies) {
        add({ id: 'trophies', emoji: '🏅', kicker: 'Trofei', big: String(trophies), caption: trophies === 1 ? 'trofeo sbloccato' : 'trofei sbloccati', sub: 'livello ' + playerLevel.value.level + ' · ' + playerLevel.value.title,
          fun: 'La bacheca si sta riempiendo. Il prossimo anno serve una mensola nuova.' });
      }
      if (activeDays) {
        add({ id: 'type', emoji: type.emoji, kicker: 'Che atleta sei', big: type.name, caption: 'ecco chi sei stato nel ' + year, fun: type.text, scene: true });
      }

      const tiles = [];
      if (workouts) tiles.push({ label: 'Allenamenti', value: fmt(workouts), emoji: '💪', color: '#F5A623' });
      if (hours >= 1) tiles.push({ label: 'Ore', value: fmt(hours), emoji: '⏱️', color: '#7A4DF1' });
      if (bestRun >= 2) tiles.push({ label: 'Serie migliore', value: bestRun + ' gg', emoji: '🔥', color: '#EF4444' });
      if (mealsDone) tiles.push({ label: 'Pasti fatti', value: fmt(mealsDone), emoji: '🥗', color: '#20C997' });
      if (kcal >= 800) tiles.push({ label: 'Pizze bruciate', value: fmt(kcal / 800), emoji: '🍕', color: '#EC4899' });
      if (trophies) tiles.push({ label: 'Trofei', value: String(trophies), emoji: '🏅', color: '#0EA5E9' });

      const name = profile.value && profile.value.firstName ? profile.value.firstName.trim() : '';
      return { year, start, end, activeDays, totalDays, workouts, hours, bestRun, type, slides, tiles, pets, name };
    };

    // Coriandoli del finale: posizioni fisse (niente calcoli a ogni render)
    const wrappedConfetti = Array.from({ length: 28 }, (_, i) => ({
      left: (i * 37) % 100,
      delay: ((i * 0.53) % 4).toFixed(2),
      duration: (3.5 + (i % 5) * 0.6).toFixed(1),
      color: ['#F5A623', '#20C997', '#7A4DF1', '#EC4899', '#0EA5E9', '#FDE68A'][i % 6],
      round: i % 3 === 0
    }));

    // Racconto a schermo intero: si avanza toccando a destra, si torna indietro a sinistra
    const WRAPPED_SLIDE_MS = 6000;
    const wrapped = ref({ isOpen: false, data: null, idx: 0, t0: 0, now: 0 });
    let wrappedTimer = null;
    const wrappedYearFor = (offset = 0) => new Date().getFullYear() - offset;
    const openWrapped = (offset = 0) => {
      const data = buildWrapped(wrappedYearFor(offset));
      data.offset = offset;
      wrapped.value = { isOpen: true, data, idx: 0, t0: Date.now(), now: Date.now() };
      clearInterval(wrappedTimer);
      wrappedTimer = setInterval(() => {
        const w = wrapped.value;
        if (!w.isOpen) { clearInterval(wrappedTimer); return; }
        w.now = Date.now();
        if (w.idx < w.data.slides.length && w.now - w.t0 >= WRAPPED_SLIDE_MS) wrappedGo(1);
      }, 100);
    };
    const closeWrapped = () => { wrapped.value.isOpen = false; clearInterval(wrappedTimer); };
    // L'ultima "slide" (indice = numero di slide) è il riepilogo finale con i tasti
    const wrappedGo = (dir) => {
      const w = wrapped.value;
      const last = w.data.slides.length;
      w.idx = Math.max(0, Math.min(last, w.idx + dir));
      w.t0 = Date.now(); w.now = w.t0;
      if (dir > 0) vibrate(15);
    };
    const wrappedTap = (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      wrappedGo(event.clientX - rect.left < rect.width * 0.3 ? -1 : 1);
    };
    const wrappedProgress = (i) => {
      const w = wrapped.value;
      if (i < w.idx) return 1;
      if (i > w.idx) return 0;
      return Math.min(1, (w.now - w.t0) / WRAPPED_SLIDE_MS);
    };
    const shareWrapped = () => {
      const offset = wrapped.value.data ? wrapped.value.data.offset : 0;
      closeWrapped();
      openRecap(offset, 'year');
    };

    // Banner in dashboard: da dicembre a fine gennaio (a gennaio, l'anno appena finito)
    // Il racconto dell'anno si apre solo a dicembre (e a gennaio per l'anno appena finito)
    const wrappedSeason = computed(() => {
      const month = new Date().getMonth();
      if (month !== 11 && month !== 0) return null;
      const offset = month === 0 ? 1 : 0;
      return { offset, year: wrappedYearFor(offset) };
    });
    const wrappedBanner = computed(() => {
      const now = new Date();
      const month = now.getMonth();
      if (month !== 11 && month !== 0) return null;
      const offset = month === 0 ? 1 : 0;
      const year = wrappedYearFor(offset);
      const start = year + '-01-01', end = year + '-12-31';
      let active = 0;
      activeDaySet.value.forEach(k => { if (k >= start && k <= end) active++; });
      return active ? { year, offset, active } : null;
    });

    // Video per le storie: intro + le scene principali dell'anno (al massimo 8 in tutto)
    const shareYearData = (offset) => {
      const W = buildWrapped(wrappedYearFor(offset));
      const name = shareFirstName();
      const scenes = [{ type: 'intro', kicker: name ? 'Il ' + W.year + ' di ' + name : 'Il mio ' + W.year, big: String(W.year), caption: 'su STILL' }]
        .concat(W.slides.filter(s => s.scene).slice(0, 7).map(s => ({ kicker: s.kicker, big: s.big, caption: s.caption, sub: s.sub || '' })));
      return {
        kind: 'recap', empty: !W.activeDays, available: [], focusAvailable: [],
        kicker: name ? 'Il ' + W.year + ' di ' + name : 'Il mio ' + W.year,
        emptyText: 'Il prossimo anno è tuo.',
        dateLabel: String(W.year), month: String(W.year),
        activeDays: W.activeDays, totalDays: W.totalDays, calendar: [], tiles: W.tiles, scenes
      };
    };

    // ---------------------------------------------------------------
    // PROMEMORIA: pasti, allenamenti e serie in pericolo.
    // Nell'APK (Capacitor) diventano notifiche locali vere; sul sito
    // arrivano solo finché l'app è aperta.
    // ---------------------------------------------------------------
    const DEFAULT_REMINDERS = {
      enabled: false, meals: true, workouts: true, checkins: true, streak: true, workoutLead: 60, streakTime: '21:00',
      mealTimes: { colazione: '08:00', spuntino_mattina: '10:30', pranzo: '13:00', spuntino_pomeriggio: '16:30', post_workout: '', cena: '20:00' }
    };
    const savedSettings = storage.load('still_settings', {});
    const settings = ref({
      ...savedSettings,
      reminders: {
        ...DEFAULT_REMINDERS,
        ...(savedSettings.reminders || {}),
        mealTimes: { ...DEFAULT_REMINDERS.mealTimes, ...((savedSettings.reminders || {}).mealTimes || {}) }
      }
    });
    watch(settings, (v) => storage.save('still_settings', v), { deep: true });
    // Giorno del primo uso: serve al promemoria di backup (sezione BACKUP)
    if (!settings.value.firstUseAt) settings.value.firstUseAt = (profile.value && profile.value.createdAt) || new Date().toISOString();

    // ---------------------------------------------------------------
    // ASPETTO: chiaro, scuro o automatico (segue il telefono). Colori scuri in css/style.css
    // ---------------------------------------------------------------
    if (!['light', 'dark', 'system'].includes(settings.value.theme)) settings.value.theme = 'light';
    const darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const systemDark = ref(!!(darkQuery && darkQuery.matches));
    if (darkQuery) {
      const onChange = (e) => { systemDark.value = e.matches; };
      if (darkQuery.addEventListener) darkQuery.addEventListener('change', onChange); else if (darkQuery.addListener) darkQuery.addListener(onChange);
    }
    const isDark = computed(() => settings.value.theme === 'dark' || (settings.value.theme === 'system' && systemDark.value));
    watch(isDark, (dark) => {
      document.documentElement.classList.toggle('dark', dark);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', dark ? '#0E0E11' : '#F6F5F2');
    }, { immediate: true });
    // ---------------------------------------------------------------
    // COMPAGNO DELLA SERIE (js/data/pets.js): uovo → personaggio a caso che si evolve con i giorni di fila.
    // In settings.pet: seme personale, vestiti scelti, album delle specie incontrate, ultima forma vista.
    // ---------------------------------------------------------------
    if (!settings.value.pet || typeof settings.value.pet !== 'object') settings.value.pet = {};
    {
      const pet = settings.value.pet;
      if (!pet.seed) pet.seed = Math.random().toString(36).slice(2, 10);
      if (!pet.outfit) pet.outfit = { hat: '', eyes: '', neck: '', back: '' };
      if (pet.outfit.back === undefined) pet.outfit.back = '';
      if (!pet.album) pet.album = {};
      if (!Array.isArray(pet.unlocked)) pet.unlocked = [...PET_BASE_IDS];
    }

    // Specie della serie: decisa alla schiusa e SALVATA (pet.run), così non cambia più finché la serie continua,
    // anche se la data d'inizio si sposta (giorni segnati dopo, serie salvata, proteggi serie).
    // pet.prevRun = compagno della serie precedente, per riaverlo se quella serie viene recuperata.
    const rollPetSpecies = () => {
      const pet = settings.value.pet;
      let pool = PET_SPECIES.filter(sp => pet.unlocked.includes(sp.id)).map(sp => sp.id);
      if (!pool.length) pool = [...PET_BASE_IDS];
      const last = pet.run && pet.run.species;
      if (pool.length > 1 && last) pool = pool.filter(id => id !== last);
      const unseen = pool.filter(id => !pet.album[id]);
      const pick = unseen.length && Math.random() < 0.6 ? unseen : pool;
      return pick[Math.floor(Math.random() * pick.length)];
    };
    watch(() => [streakInfo.value.current, streakInfo.value.startKey], ([current, startKey]) => {
      const pet = settings.value.pet;
      if (!current || !startKey) return;
      const run = pet.run;
      if (run && run.start === startKey) return;
      if (!run) {
        // Prima volta (o compagno nato prima di questo salvataggio): tiene quello che si vedeva
        pet.run = { start: startKey, species: PET_SPECIES[petSpeciesIndex(pet.seed, startKey)].id };
        return;
      }
      if (startKey < run.start) {
        // Stessa serie che si allunga all'indietro: se si ricongiunge con la serie precedente torna quel compagno
        if (pet.prevRun && pet.prevRun.start === startKey) { const cur = pet.run; pet.run = pet.prevRun; pet.prevRun = cur; }
        else pet.run = { ...run, start: startKey };
        return;
      }
      // Serie nuova: nuovo uovo, nuovo compagno a sorpresa
      pet.prevRun = run;
      pet.run = { start: startKey, species: rollPetSpecies() };
    }, { immediate: true });

    const petNow = ref(Date.now());
    setInterval(() => { petNow.value = Date.now(); }, 5 * 60 * 1000);

    // ---------------------------------------------------------------
    // ACQUA E DIGIUNO: facoltativi, si attivano in Profilo o nel Diario (settings.habits).
    // Acqua: bicchieri da 250 ml al giorno (settings.waterLog). Digiuno: inizio, obiettivo e storico (settings.fasting).
    // ---------------------------------------------------------------
    const habitOn = (id) => !!(settings.value.habits && settings.value.habits[id]);
    const toggleHabit = (id) => { settings.value.habits = { ...(settings.value.habits || {}), [id]: !habitOn(id) }; };
    const waterGoal = computed(() => Math.max(6, Math.min(16, Math.round((bodyStats.value.water || 2) / 0.25))));
    const waterToday = computed(() => (settings.value.waterLog || {})[todayDateKey.value] || 0);
    const setWater = (count) => {
      const key = todayDateKey.value;
      const log = { ...(settings.value.waterLog || {}) };
      const value = Math.max(0, Math.min(30, count));
      if (value) log[key] = value; else delete log[key];
      // Si tengono solo gli ultimi 4 mesi
      const oldest = toISODate(new Date(Date.now() - 120 * 86400000));
      Object.keys(log).forEach(k => { if (k < oldest) delete log[k]; });
      const reached = value >= waterGoal.value && (settings.value.waterLog || {})[key] < waterGoal.value;
      settings.value.waterLog = log;
      if (reached) vibrate([60, 40, 120]);
    };
    const tapWaterGlass = (i) => setWater(waterToday.value === i + 1 ? i : i + 1);

    const FAST_GOALS = [12, 14, 16, 18];
    const fastNow = ref(Date.now());
    let fastTimer = null;
    const fasting = computed(() => {
      const f = settings.value.fasting || {};
      const goal = f.goal || 16;
      const last = (f.log || [])[0] || null;
      if (!f.start) return { running: false, goal, last };
      const elapsed = Math.max(0, (fastNow.value - f.start) / 3600000);
      return { running: true, goal, last, start: f.start, elapsed, pct: Math.min(100, Math.round(elapsed / goal * 100)), endsAt: f.start + goal * 3600000, done: elapsed >= goal };
    });
    watch(() => !!(settings.value.fasting && settings.value.fasting.start), (running) => {
      if (fastTimer) { clearInterval(fastTimer); fastTimer = null; }
      if (running) { fastNow.value = Date.now(); fastTimer = setInterval(() => { fastNow.value = Date.now(); }, 30 * 1000); }
    }, { immediate: true });
    const hoursLabel = (h) => {
      const total = Math.floor(h * 60);
      return Math.floor(total / 60) + ' h ' + String(total % 60).padStart(2, '0') + ' min';
    };
    const clockLabel = (ms) => new Date(ms).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    const startFast = (goal) => {
      settings.value.fasting = { ...(settings.value.fasting || {}), start: Date.now(), goal };
      fastNow.value = Date.now();
    };
    const setFastGoal = (goal) => { settings.value.fasting = { ...(settings.value.fasting || {}), goal }; };
    const endFast = () => {
      const f = settings.value.fasting || {};
      if (!f.start) return;
      const hours = (Date.now() - f.start) / 3600000;
      const goal = f.goal || 16;
      const entry = { start: f.start, end: Date.now(), goal, hours: Math.round(hours * 10) / 10 };
      settings.value.fasting = { goal, start: null, log: [entry, ...(f.log || [])].slice(0, 60) };
      if (hours >= goal) { vibrate([80, 50, 160]); showToastMessage('Digiuno completato: ' + hoursLabel(hours) + '. 💪'); }
      else showToastMessage('Digiuno chiuso dopo ' + hoursLabel(hours) + '. Va bene così: la prossima volta un po\' di più.');
    };
    const petState = computed(() => {
      const s = streakInfo.value;
      const pet = settings.value.pet;
      const stage = s.current > 0 ? petStageFor(s.current) : 0;
      const species = s.current > 0 && pet.run ? petSpeciesById(pet.run.species) : 0;
      const hour = new Date(petNow.value).getHours();
      const mood = stage === 0 ? 'sleepy' : s.todayDone ? 'happy' : (s.protectedYesterday || hour >= 18 ? 'worried' : 'normal');
      const nextAt = PET_THRESHOLDS[stage + 1];
      const prevAt = PET_THRESHOLDS[stage];
      return {
        stage, species, mood,
        legendary: s.current >= PET_LEGEND_DAYS,
        name: petStageName(species, stage),
        speciesName: stage ? PET_SPECIES[species].name : 'Uovo misterioso',
        color: stage ? PET_SPECIES[species].color : '#F5A623',
        nextIn: nextAt ? nextAt - s.current : null,
        nextName: nextAt ? (stage === 0 ? 'una sorpresa' : petStageName(species, stage + 1)) : null,
        progress: nextAt ? Math.round(((s.current - prevAt) / (nextAt - prevAt)) * 100) : 100
      };
    });
    const petMarkup = (opts = {}) => {
      const st = petState.value;
      return petSvg({ species: st.species, stage: st.stage, mood: st.mood, legendary: st.legendary, outfit: settings.value.pet.outfit, ...opts });
    };
    const petMainSvg = computed(() => petMarkup({ uid: 'petMain' }));

    // Album: forma più alta raggiunta per ogni specie
    watch(() => [petState.value.species, petState.value.stage], ([species, stage]) => {
      if (!stage) return;
      const id = PET_SPECIES[species].id;
      const album = settings.value.pet.album;
      if ((album[id] || 0) < stage) album[id] = stage;
    }, { immediate: true });

    // Forma finale raggiunta: si sblocca un nuovo compagno, che potrà nascere dalle prossime uova
    const petUnlockModal = ref({ isOpen: false, species: 0 });
    watch(() => petState.value.stage, (stage) => {
      const pet = settings.value.pet;
      if (stage < 6 || !pet.run || pet.run.maxed) return;
      pet.run.maxed = true;
      const next = PET_SPECIES.find(sp => !pet.unlocked.includes(sp.id));
      if (!next) return;
      pet.unlocked.push(next.id);
      petUnlockModal.value = { isOpen: true, species: PET_SPECIES.indexOf(next) };
    }, { immediate: true });
    const petUnlockSvg = computed(() => petSvg({ species: petUnlockModal.value.species, stage: 3, mood: 'happy', uid: 'petUnlock' }));

    // Evoluzione: festa quando cambia forma (non alla prima apertura)
    const petEvolveModal = ref({ isOpen: false });
    watch(() => petState.value.stage + '|' + streakInfo.value.startKey, () => {
      const st = petState.value;
      const pet = settings.value.pet;
      const run = streakInfo.value.startKey;
      if (pet.lastStage !== undefined && pet.lastRun === run && st.stage > pet.lastStage) {
        petEvolveModal.value = { isOpen: true, hatched: pet.lastStage === 0 || st.stage === 1, prevStage: pet.lastStage };
      } else if (pet.lastStage !== undefined && pet.lastRun !== run && st.stage >= 1 && pet.lastStage === 0) {
        petEvolveModal.value = { isOpen: true, hatched: true, prevStage: 0 };
      }
      pet.lastStage = st.stage;
      pet.lastRun = run;
    }, { immediate: true });

    // Finestra del compagno: evoluzioni, vestiti, album
    const petModal = ref({ isOpen: false, tab: 'hat' });
    const openPetModal = () => { petModal.value = { isOpen: true, tab: petModal.value.tab || 'hat' }; };
    const petItems = computed(() => PET_ITEMS.map(item => ({ ...item, unlocked: streakInfo.value.best >= item.unlock, worn: settings.value.pet.outfit[item.slot] === item.id })));
    const togglePetItem = (item) => {
      if (!item.unlocked) { showToastMessage(item.name + ': si sblocca con una serie di ' + item.unlock + ' giorni. 🔒'); return; }
      const outfit = settings.value.pet.outfit;
      outfit[item.slot] = outfit[item.slot] === item.id ? '' : item.id;
    };
    const petItemPreview = (item) => petMarkup({ uid: 'pi' + item.id, stage: Math.max(petState.value.stage, 3), mood: 'happy', outfit: { hat: '', eyes: '', neck: '', back: '', [item.slot]: item.id } });
    // Tocco sul compagno: fa il suo balletto, con le stesse mosse dei video (petPlayDance in js/data/pets.js)
    const petDancing = ref(false);
    const petMainBox = ref(null);
    let petDanceStop = null;
    const petDance = () => {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (petDanceStop) petDanceStop();
      const id = petState.value.stage ? PET_SPECIES[petState.value.species].id : 'egg';
      petDancing.value = true;
      nextTick(() => {
        petDanceStop = petPlayDance(petMainBox.value, id, 3.2, () => { petDancing.value = false; petDanceStop = null; });
      });
    };
    const petDanceClass = computed(() => (petDancing.value ? 'pet-dance-js' : ''));
    const petEvolutionPath = computed(() => {
      const st = petState.value;
      return PET_THRESHOLDS.map((days, stage) => ({
        stage, days,
        reached: stage <= st.stage,
        current: stage === st.stage,
        name: stage === 0 || stage <= st.stage ? petStageName(st.species, stage) : '???',
        svg: petSvg({ species: st.species, stage, mood: 'happy', uid: 'pe' + stage, silhouette: stage > st.stage && st.stage > 0 || (st.stage === 0 && stage > 0) })
      }));
    });
    const petAlbum = computed(() => PET_SPECIES.map((sp, i) => {
      const max = settings.value.pet.album[sp.id] || 0;
      const locked = !settings.value.pet.unlocked.includes(sp.id);
      return { id: sp.id, name: max ? sp.name : (locked ? 'Bloccato' : '???'), max, locked, svg: petSvg({ species: i, stage: max || 6, mood: 'happy', uid: 'pa' + sp.id, silhouette: !max }) };
    }));
    const petAlbumFound = computed(() => petAlbum.value.filter(a => a.max).length);

    // Immagine del compagno per le card da condividere (canvas)
    // L'immagine va caricata PRIMA di aprire la card, altrimenti il canvas disegna l'emoji
    const loadPetShareImage = async (over = {}) => {
      const st = petState.value;
      try {
        petShareImg.value = await petImage({ species: st.species, stage: Math.max(1, st.stage), mood: 'happy', legendary: st.legendary, outfit: settings.value.pet.outfit, uid: 'petShare', ...over });
      } catch (e) { petShareImg.value = null; }
    };
    const sharePet = async () => {
      petModal.value.isOpen = false;
      petEvolveModal.value.isOpen = false;
      await loadPetShareImage();
      openAchievementShare({ type: 'pet' });
    };
    // Storia dell'evoluzione: nel video la forma di prima trema, brilla e si trasforma in quella nuova
    const sharePetEvolution = async () => {
      const prevStage = petEvolveModal.value.prevStage || 0;
      petEvolveModal.value.isOpen = false;
      const st = petState.value;
      await loadPetShareImage();
      try {
        petPrevShareImg.value = await petImage({ species: st.species, stage: prevStage, mood: 'happy', outfit: settings.value.pet.outfit, uid: 'petPrev' });
      } catch (e) { petPrevShareImg.value = null; }
      openAchievementShare({ type: 'petEvolve', prevStage });
    };
    // Storia "salva la serie": mostra il compagno della serie persa, nella forma che aveva raggiunto
    const shareStreakSave = async () => {
      const rec = streakInfo.value.recoverable;
      const pet = settings.value.pet;
      const lostRun = rec && [pet.run, pet.prevRun].find(r => r && r.start === rec.startKey);
      const species = rec ? (lostRun ? petSpeciesById(lostRun.species) : petSpeciesIndex(pet.seed, rec.startKey)) : petState.value.species;
      await loadPetShareImage(rec ? { species, stage: Math.max(1, petStageFor(rec.length)), legendary: rec.length >= PET_LEGEND_DAYS } : {});
      openAchievementShare({ type: 'streakSave', species });
    };
    // Dopo la condivisione della storia: i giorni saltati diventano protetti e la serie torna
    const applyStreakRepair = () => {
      const rec = streakInfo.value.recoverable;
      if (!rec) return;
      settings.value.streakRepairs = [...new Set([...(settings.value.streakRepairs || []), ...rec.missed])];
      settings.value.lastRepairAt = toISODate();
      // Il compagno torna com'era: niente festa di "nascita"
      settings.value.pet.lastRun = rec.startKey;
      settings.value.pet.lastStage = petStageFor(rec.restored);
      showToastMessage('Serie salvata! 🔥 Sei di nuovo a ' + rec.restored + (rec.restored === 1 ? ' giorno' : ' giorni') + ' di fila.');
    };

    const themeOptions = [
      { id: 'light', label: 'Chiaro', icon: '☀️' },
      { id: 'dark', label: 'Scuro', icon: '🌙' },
      { id: 'system', label: 'Automatico', icon: '📱' }
    ];

    // ---------------------------------------------------------------
    // GAMIFICATION: trofei, livelli (XP) e record personali.
    // Tutto si calcola dallo storico: si salvano solo i trofei già
    // festeggiati e il numero di condivisioni (in still_settings).
    // Gruppi, gradini e punti: vedi js/data/trophies.js
    // ---------------------------------------------------------------
    // ---------------------------------------------------------------
    // INSTALLAZIONE (PWA): tasto "Installa" su Android/Chrome, istruzioni su iPhone
    // ---------------------------------------------------------------
    const installPrompt = ref(null);
    const isStandalone = ref(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true);
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installPrompt.value = e; });
    window.addEventListener('appinstalled', () => {
      installPrompt.value = null;
      isStandalone.value = true;
      showToastMessage('STILL è installata! 📲 La trovi nella schermata Home.');
    });
    const canInstall = computed(() => !isStandalone.value && !window.Capacitor && (!!installPrompt.value || isIOS));
    const installBanner = computed(() => canInstall.value && !settings.value.installDismissed);
    const installApp = async () => {
      if (installPrompt.value) {
        const ev = installPrompt.value;
        ev.prompt();
        try { await ev.userChoice; } catch (e) { /* ignora */ }
        installPrompt.value = null;
      } else if (isIOS) {
        showToastMessage('Su iPhone: apri il sito con Safari, tocca Condividi (il quadrato con la freccia) e poi "Aggiungi alla schermata Home".');
      }
    };
    const dismissInstall = () => { settings.value.installDismissed = true; };

    const countShare = () => {
      settings.value.shares = (settings.value.shares || 0) + 1;
      // Storia per salvare la serie: condivisa (o salvata) → serie recuperata
      const st = shareStudio.value;
      if (st.kind === 'achievement' && st.achievement && st.achievement.type === 'streakSave') applyStreakRepair();
    };

    // Giorni di allenamento da sempre (palestra + sport fatti)
    const trainingDaySet = computed(() => {
      const set = new Set();
      const today = toISODate();
      workoutLogs.value.forEach(log => { if (log.date <= today && logCountsAsTraining(log)) set.add(log.date); });
      trainingSessions.value.forEach(s => {
        if (s.kind === 'gym' && s.date && s.date <= today && (s.report || (s.statusByDate && s.statusByDate[s.date] === 'done'))) set.add(s.date);
        if (s.kind === 'sport' && s.statusByDate) {
          Object.entries(s.statusByDate).forEach(([key, status]) => { if (status === 'done' && key <= today) set.add(key); });
        }
      });
      return set;
    });

    // Record personali: ogni volta che un esercizio supera il suo carico migliore
    const personalRecords = computed(() => {
      const byExercise = {};
      workoutLogs.value.forEach(log => {
        const w = parseOptionalNumber(log.weight);
        if (w === null || w <= 0 || !log.date) return;
        const key = log.exerciseId ? 'id:' + log.exerciseId : 'n:' + String(log.exerciseName || '').toLowerCase();
        (byExercise[key] = byExercise[key] || []).push({ date: log.date, w, name: log.exerciseName });
      });
      const list = [];
      Object.values(byExercise).forEach(items => {
        items.sort((a, b) => a.date.localeCompare(b.date));
        let best = null;
        items.forEach(item => {
          if (best !== null && item.w > best) list.push({ date: item.date, name: item.name, value: item.w, prev: best });
          best = best === null ? item.w : Math.max(best, item.w);
        });
      });
      return list;
    });

    // Record battuti nell'allenamento guidato appena finito (rispetto ai giorni precedenti)
    const findSessionRecords = (sessionId) => {
      const session = trainingSessions.value.find(item => item.id === sessionId);
      const report = session && session.report;
      if (!report) return [];
      const today = toISODate();
      return report.exercises.map(ex => {
        if (ex.type === 'cardio' || !ex.endValue) return null;
        const exercise = findSelectedExerciseById(ex.id);
        const before = exercise ? exerciseLogsFor(exercise).filter(log => log.date < today)
          .map(log => parseOptionalNumber(log.weight)).filter(v => v !== null && v > 0) : [];
        if (!before.length) return null;
        const best = Math.max(...before);
        return ex.endValue > best ? { type: 'record', name: ex.name, value: ex.endValue, prev: best, unit: 'kg', date: today } : null;
      }).filter(Boolean).sort((a, b) => (b.value - b.prev) / b.prev - (a.value - a.prev) / a.prev);
    };

    // Settimane (da lunedì) con almeno 3 giorni di allenamento
    const fullWeeks = computed(() => {
      const perWeek = {};
      trainingDaySet.value.forEach(key => {
        const d = new Date(key + 'T12:00:00');
        d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
        const monday = toISODate(d);
        perWeek[monday] = (perWeek[monday] || 0) + 1;
      });
      return Object.values(perWeek).filter(n => n >= 3).length;
    });

    const mealsDoneCount = computed(() => Object.values(mealLogs.value)
      .reduce((n, logs) => n + Object.values(logs || {}).filter(l => l && l.status === 'done').length, 0));

    const gameStats = computed(() => {
      const today = toISODate();
      return {
        workouts: trainingDaySet.value.size,
        hours: Math.floor(trainingTimeSummary.value.total / 3600),
        streak: streakInfo.value.best,
        active: [...activeDaySet.value].filter(k => k <= today).length,
        meals: mealsDoneCount.value,
        records: personalRecords.value.length,
        weeks: fullWeeks.value,
        shares: settings.value.shares || 0
      };
    });

    const trophyGroups = computed(() => {
      const st = gameStats.value;
      return TROPHY_GROUPS.map(g => {
        const value = st[g.id] || 0;
        const tiers = g.steps.map((target, index) => ({ id: g.id + '_' + target, target, index, tier: TROPHY_TIERS[index], unlocked: value >= target }));
        const level = tiers.filter(t => t.unlocked).length;
        const next = tiers[level] || null;
        const from = level ? tiers[level - 1].target : 0;
        return {
          ...g, value, tiers, level,
          current: level ? tiers[level - 1] : null,
          next,
          progress: next ? Math.max(0, Math.min(1, (value - from) / (next.target - from))) : 1
        };
      });
    });
    const unlockedTrophies = computed(() => trophyGroups.value.flatMap(g => g.tiers.filter(t => t.unlocked).map(t => ({ ...t, group: g }))));
    const TROPHY_TOTAL = TROPHY_GROUPS.reduce((n, g) => n + g.steps.length, 0);

    // Livelli: dal livello L al successivo servono 100 + 50·(L−1) XP
    const playerLevel = computed(() => {
      const st = gameStats.value;
      const xp = st.workouts * XP_RULES.workout + st.hours * XP_RULES.hour + st.active * XP_RULES.activeDay
        + st.meals * XP_RULES.meal + st.records * XP_RULES.record + st.shares * XP_RULES.share
        + unlockedTrophies.value.length * XP_RULES.trophy;
      let level = 1, floor = 0, need = 100;
      while (xp >= floor + need && level < 999) { floor += need; level++; need = 100 + (level - 1) * 50; }
      return {
        xp, level, need, into: xp - floor, progress: (xp - floor) / need,
        title: LEVEL_TITLES[Math.min(LEVEL_TITLES.length - 1, Math.floor((level - 1) / 5))],
        trophies: unlockedTrophies.value.length, trophyTotal: TROPHY_TOTAL
      };
    });

    // Festa per i trofei nuovi (la prima volta si segnano come già visti quelli esistenti)
    const trophyModal = ref({ isOpen: false, ids: [], levelUp: 0 });
    const trophyModalItems = computed(() => trophyModal.value.ids
      .map(id => unlockedTrophies.value.find(t => t.id === id)).filter(Boolean)
      .sort((a, b) => b.index - a.index));
    const closeTrophyModal = () => { trophyModal.value.isOpen = false; };
    const checkTrophies = () => {
      if (!isAuthenticated.value) return;
      const s = settings.value;
      const ids = unlockedTrophies.value.map(t => t.id);
      const level = playerLevel.value.level;
      if (!Array.isArray(s.trophiesSeen)) { s.trophiesSeen = ids; s.lastLevel = level; return; }
      const busy = trophyModal.value.isOpen || (workoutPlayer.value && workoutPlayer.value.isOpen) || shareStudio.value.isOpen
        || sportCheckModal.value.isOpen || pastChecksModal.value.isOpen || customModal.value.isOpen;
      if (busy) return;
      const fresh = ids.filter(id => !s.trophiesSeen.includes(id));
      const levelUp = level > (s.lastLevel || 0) ? level : 0;
      if (!fresh.length && !levelUp) return;
      s.trophiesSeen = [...s.trophiesSeen, ...fresh];
      s.lastLevel = level;
      trophyModal.value = { isOpen: true, ids: fresh, levelUp };
      vibrate([60, 40, 120]);
    };
    let trophyTimer = null;
    watch(() => [unlockedTrophies.value.length, playerLevel.value.level, isAuthenticated.value,
      workoutPlayer.value && workoutPlayer.value.isOpen, shareStudio.value.isOpen,
      sportCheckModal.value.isOpen, pastChecksModal.value.isOpen, customModal.value.isOpen], () => {
      clearTimeout(trophyTimer);
      trophyTimer = setTimeout(checkTrophies, 700);
    });

    // Dettaglio di un gruppo di trofei
    const trophyDetail = ref({ isOpen: false, groupId: null });
    const trophyDetailGroup = computed(() => trophyGroups.value.find(g => g.id === trophyDetail.value.groupId) || null);
    const openTrophyDetail = (group) => { trophyDetail.value = { isOpen: true, groupId: group.id }; };
    const closeTrophyDetail = () => { trophyDetail.value.isOpen = false; };
    const openTrophies = () => { activeTab.value = 'trophies'; };
    // I traguardi più vicini da sbloccare (per la scheda Trofei)
    const nextChallenges = computed(() => trophyGroups.value.filter(g => g.next)
      .sort((a, b) => b.progress - a.progress).slice(0, 3));

    // Card social di un traguardo (trofeo o record)
    const openAchievementShare = (spec) => {
      trophyModal.value.isOpen = false;
      trophyDetail.value.isOpen = false;
      shareStudio.value.achievement = spec;
      openShareStudio('achievement');
    };
    const shareAchievementData = (spec) => {
      const name = shareFirstName();
      const lv = playerLevel.value;
      const base = { kind: 'achievement', empty: false, available: [], focusAvailable: [] };
      if (spec && spec.type === 'level') {
        return {
          ...base,
          kicker: name ? 'Nuovo livello per ' + name : 'Nuovo livello',
          dateLabel: formatDateLong(toISODate()),
          icon: '⭐', color: '#8B5CF6', badge: 'Livello raggiunto',
          big: 'Livello ' + lv.level,
          caption: lv.title,
          sub: formatNumber(lv.xp) + ' XP guadagnati su STILL',
          tiles: [{ label: 'Trofei', value: lv.trophies + ' su ' + lv.trophyTotal }, { label: 'Serie migliore', value: streakInfo.value.best + (streakInfo.value.best === 1 ? ' giorno' : ' giorni') }]
        };
      }
      if (spec && (spec.type === 'pet' || spec.type === 'petEvolve' || spec.type === 'streakSave')) {
        const ps = petState.value;
        const sk = streakInfo.value;
        const activeDays = activeDaySet.value.size;
        const since = (profile.value && profile.value.createdAt) || [...activeDaySet.value].sort()[0] || toISODate();
        const petBase = { ...base, dateLabel: formatDateLong(toISODate()), icon: '🔥', color: ps.color, petImg: petShareImg.value, petSpecies: spec.species != null ? spec.species : ps.species };
        if (spec.type === 'petEvolve') {
          const prevName = petStageName(petBase.petSpecies, spec.prevStage || 0);
          const hatched = !spec.prevStage;
          return {
            ...petBase,
            petPrevImg: petPrevShareImg.value,
            kicker: hatched ? (name ? 'È nato il compagno di ' + name : 'È nato il mio compagno') : (name ? 'Il compagno di ' + name + ' si è evoluto' : 'Il mio compagno si è evoluto'),
            badge: hatched ? 'Si è schiuso!' : 'Evoluzione!',
            big: String(sk.current),
            caption: (sk.current === 1 ? 'giorno' : 'giorni') + ' di fila su STILL',
            sub: prevName + ' → ' + ps.name,
            tiles: [
              { label: 'Forma', value: ps.stage + ' di 6' },
              ps.nextIn ? { label: 'Prossima forma', value: 'tra ' + ps.nextIn + (ps.nextIn === 1 ? ' giorno' : ' giorni') } : { label: 'Evoluzione', value: 'Completa' }
            ]
          };
        }
        if (spec.type === 'pet') {
          // Numero grande senza "giorni" (la g scendeva sulla riga sotto); riquadri con informazioni diverse dal numero
          const items = petItems.value.filter(i => i.unlocked).length;
          return {
            ...petBase,
            kicker: name ? 'Il compagno di ' + name : 'Il mio compagno su STILL',
            badge: ps.name,
            big: String(sk.current),
            caption: (sk.current === 1 ? 'giorno' : 'giorni') + ' di fila su STILL',
            sub: ps.speciesName + ' · forma ' + ps.stage + ' di 6',
            tiles: [
              ps.nextIn ? { label: 'Prossima forma', value: 'tra ' + ps.nextIn + (ps.nextIn === 1 ? ' giorno' : ' giorni') } : { label: 'Evoluzione', value: 'Completa' },
              { label: 'Vestiti sbloccati', value: items + ' su ' + PET_ITEMS.length }
            ]
          };
        }
        // Storia per salvare la serie: da quanto sei attivo e cosa hai ottenuto
        const rec = sk.recoverable;
        const tiles = [];
        if (weightDelta.value && Math.abs(weightDelta.value.value) >= 0.1) tiles.push({ label: 'Peso', value: weightDelta.value.text });
        if (trainingDaySet.value.size) tiles.push({ label: 'Allenamenti', value: String(trainingDaySet.value.size) });
        if (tiles.length < 2 && trainingTimeSummary.value.total >= 3600) tiles.push({ label: 'Ore di allenamento', value: Math.round(trainingTimeSummary.value.total / 3600) + ' h' });
        if (tiles.length < 2) tiles.push({ label: 'Serie migliore', value: sk.best + (sk.best === 1 ? ' giorno' : ' giorni') });
        return {
          ...petBase,
          kicker: name ? name + ' non molla' : 'Non mollo',
          badge: 'Serie salvata',
          big: String(activeDays),
          caption: (activeDays === 1 ? 'giorno' : 'giorni') + ' di attività su STILL',
          sub: 'Dal ' + formatDate(since) + (rec ? ' · serie di ' + rec.restored + ' giorni salvata' : ''),
          tiles: tiles.slice(0, 2)
        };
      }
      if (spec && spec.type === 'welcome') {
        const start = (profile.value && profile.value.createdAt) || toISODate();
        return {
          ...base,
          kicker: name ? name + ' ha iniziato il suo percorso' : 'Ho iniziato il mio percorso',
          dateLabel: formatDateLong(start),
          icon: '🌱', color: '#20C997', badge: 'Nuovo inizio',
          big: 'Giorno 1',
          caption: 'Il mio percorso su STILL inizia oggi',
          sub: 'Non serve essere perfetti, serve esserci. Ogni giorno.',
          startLabel: 'Si parte il', startDate: formatDate(start),
          tiles: []
        };
      }
      if (spec && spec.type === 'record') {
        return {
          ...base,
          kicker: name ? 'Nuovo record di ' + name : 'Nuovo record personale',
          dateLabel: formatDateLong(spec.date || toISODate()),
          icon: '🏋️', color: '#F5A623', badge: 'Record personale',
          big: formatNumber(spec.value) + ' ' + (spec.unit || 'kg'),
          caption: spec.name || '',
          sub: 'Prima ' + formatNumber(spec.prev) + ' kg · ' + signed(spec.value - spec.prev) + ' kg',
          tiles: [{ label: 'Livello', value: lv.level + ' · ' + lv.title }, { label: 'Record personali', value: String(personalRecords.value.length) }]
        };
      }
      const t = unlockedTrophies.value.find(x => spec && x.id === spec.id);
      if (!t) return { ...base, empty: true, kicker: 'Trofeo', dateLabel: '', icon: '🏆', color: '#F5A623', badge: '', big: '—', caption: '', sub: '', tiles: [] };
      return {
        ...base,
        kicker: name ? 'Trofeo sbloccato da ' + name : 'Trofeo sbloccato',
        dateLabel: formatDateLong(toISODate()),
        icon: t.group.icon, color: t.tier.color, badge: t.tier.name,
        big: formatNumber(t.target),
        caption: t.target === 1 ? t.group.one : t.group.unit,
        sub: t.group.name + ' · trofeo ' + t.tier.name,
        tiles: [{ label: 'Livello', value: lv.level + ' · ' + lv.title }, { label: 'Trofei', value: lv.trophies + ' su ' + lv.trophyTotal }]
      };
    };

    const nativeNotifications = () => (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications) || null;
    const remindersNative = !!nativeNotifications();
    const remindersSupported = remindersNative || typeof Notification !== 'undefined';

    const atTime = (dateKey, hhmm) => {
      const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm || '');
      if (!m) return null;
      const d = new Date(dateKey + 'T00:00:00');
      d.setHours(Number(m[1]), Number(m[2]), 0, 0);
      return d.getTime();
    };
    const reminderId = (text) => {
      let h = 0;
      for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0;
      return Math.abs(h) % 2000000000 + 1;
    };

    // Testi delle notifiche: variano di giorno in giorno (scelta stabile per data)
    const pickText = (list, seed) => list[reminderId(seed) % list.length];
    const MEAL_TITLES = {
      colazione: 'È ora di colazione', spuntino_mattina: 'È l\'ora dello spuntino', pranzo: 'È ora di pranzo',
      spuntino_pomeriggio: 'È l\'ora della merenda', post_workout: 'Ricarica post allenamento', cena: 'È ora di cena'
    };
    const MEAL_OUTROS = ['Facci sapere com\'è andata.', 'Segnalo in app quando hai finito.', 'Un pasto alla volta si arriva lontano.', 'Spunta il pasto e tieni viva la serie.'];
    const SPORT_EMOJI = { Calcio: '⚽', Pallavolo: '🏐', Basket: '🏀', Lotta: '🤼', Tennis: '🎾', Padel: '🎾', Nuoto: '🏊', Corsa: '🏃', Ciclismo: '🚴', Boxe: '🥊', Rugby: '🏉', 'Arti marziali': '🥋' };
    const CHECKIN_BODIES = ['Tocca qui e segna fatto o non fatto: conta per la serie.', 'Entra e segnalo: ogni allenamento conta.', 'Dicci com\'è andata, la tua serie ti aspetta.'];
    const SPORT_CHECK_DELAY = 120;   // minuti dopo l'inizio

    // Elenco dei promemoria dei prossimi 3 giorni
    const buildReminders = () => {
      const r = settings.value.reminders;
      const out = [];
      const now = Date.now();
      const streak = streakInfo.value;
      const todayKey = toISODate();
      const todayActive = activeDaySet.value.has(todayKey);
      for (let off = 0; off < 3; off++) {
        const day = new Date(); day.setHours(12, 0, 0, 0); day.setDate(day.getDate() + off);
        const key = toISODate(day);

        // Pasti: cosa mangiare + "facci sapere"
        if (r.meals) {
          const logs = mealLogs.value[key] || {};
          const byType = {};
          getMealsForDate(day).forEach(meal => { (byType[meal.type] = byType[meal.type] || []).push(meal); });
          Object.entries(byType).forEach(([type, meals]) => {
            if (meals.every(m => logs[m.id] && logs[m.id].status === 'done')) return;
            const at = atTime(key, r.mealTimes[type]);
            if (!at || at <= now) return;
            const items = meals.map(m => m.description).filter(d => d && d !== 'Nessun dettaglio.').join(', ');
            out.push({
              id: reminderId('meal' + key + type), at,
              title: meals[0].icon + ' ' + (MEAL_TITLES[type] || meals[0].name),
              body: (items ? 'Oggi: ' + items + '. ' : '') + pickText(MEAL_OUTROS, key + type)
            });
          });
        }

        trainingSessions.value.forEach(session => {
          if (!session.time || !trainingSessionOccursOn(session, key)) return;
          const start = atTime(key, session.time);
          if (!start) return;
          const isSport = session.kind === 'sport';
          const emoji = isSport ? (SPORT_EMOJI[session.sport] || '🔥') : '💪';
          const label = trainingSessionLabel(session);

          // Prima: si parte
          if (r.workouts) {
            const doneGym = !isSport && session.report && session.date === key;
            const at = start - (Number(r.workoutLead) || 0) * 60000;
            if (!doneGym && at > now) {
              out.push({
                id: reminderId('train' + key + session.id), at,
                title: emoji + ' ' + label + ' alle ' + session.time,
                body: Number(r.workoutLead) ? 'Tra ' + (r.workoutLead >= 60 ? (r.workoutLead / 60) + (r.workoutLead === 60 ? ' ora' : ' ore') : r.workoutLead + ' minuti') + ' si parte. Preparati.' : 'Si parte. Dai tutto.'
              });
            }
          }

          // Dopo: com'è andata? (solo se non l'hai già segnato)
          if (r.checkins) {
            const already = !!sportStatus(session, key) || !!(session.report && session.date === key);
            // Mai dopo mezzanotte: al massimo alle 23:30 dello stesso giorno
            const after = sportDurationMin(session) ? sportDurationMin(session) + 15 : SPORT_CHECK_DELAY;   // 15 min dopo la fine
            const at = Math.min(start + after * 60000, atTime(key, '23:30'));
            if (!already && at > start && at > now) {
              out.push({
                id: reminderId('check' + key + session.id), at,
                title: emoji + ' Ti sei allenato?',
                body: label + (session.time ? ' delle ' + session.time : '') + ' è finito. ' + pickText(CHECKIN_BODIES, 'b' + key + session.id)
              });
            }
          }
        });

        if (r.streak) {
          // Sera: serie in pericolo
          const evening = atTime(key, r.streakTime);
          if (!(off === 0 && todayActive) && evening && evening > now) {
            const n = off === 0 ? streak.current : 0;
            const lastChance = off === 0 && n > 0 && !streak.shieldReady;
            out.push({
              id: reminderId('streak' + key), at: evening,
              title: n > 0 ? '🔥 ' + n + (n === 1 ? ' giorno' : ' giorni') + ' di fila' : '🔥 Non fermarti oggi',
              body: lastChance
                ? 'Il proteggi serie è già stato usato: se salti oggi perdi la serie. Segna un pasto o un allenamento.'
                : (n > 0 ? 'Segna un pasto o un allenamento per non perdere la serie.' : 'Segna un pasto o un allenamento: ogni giorno conta.')
            });
          }
          // Mattina dopo un giorno saltato: il proteggi serie ti ha salvato
          const morning = atTime(key, '10:00');
          const savedToday = off === 0 && streak.protectedYesterday && !todayActive;
          const savedTomorrow = off === 1 && !todayActive && streak.current > 0 && streak.shieldReady;
          if ((savedToday || savedTomorrow) && morning > now) {
            const n = streak.current;
            out.push({
              id: reminderId('shield' + key), at: morning,
              title: '🛡️ Proteggi serie attivato',
              body: 'Ieri non sei passato: il proteggi serie ha salvato i tuoi ' + n + (n === 1 ? ' giorno' : ' giorni') + ' di fila. Entra oggi per non perderla.'
            });
          }
        }
      }
      return out.sort((a, b) => a.at - b.at).slice(0, 60);
    };

    let webReminderTimers = [];
    const showWebNotification = (n) => {
      try {
        const notif = new Notification(n.title, { body: n.body, tag: String(n.id) });
        // Tocco sulla notifica: apre l'app e chiede subito fatto / non fatto
        notif.onclick = () => { try { window.focus(); } catch (e) { /* ignora */ } notif.close(); clockNow.value = Date.now(); promptPendingSportChecks(); };
      } catch (e) { /* alcuni browser non le permettono senza service worker */ }
    };
    const applyReminders = async () => {
      webReminderTimers.forEach(clearTimeout);
      webReminderTimers = [];
      const list = settings.value.reminders.enabled ? buildReminders() : [];
      const native = nativeNotifications();
      if (native) {
        try {
          const pending = await native.getPending();
          if (pending && pending.notifications && pending.notifications.length) {
            await native.cancel({ notifications: pending.notifications.map(n => ({ id: n.id })) });
          }
          if (list.length) {
            await native.schedule({ notifications: list.map(n => ({ id: n.id, title: n.title, body: n.body, schedule: { at: new Date(n.at), allowWhileIdle: true } })) });
          }
        } catch (e) { console.warn('Promemoria non programmati', e); }
        return;
      }
      if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
      list.forEach(n => {
        const delay = n.at - Date.now();
        if (delay > 0 && delay < 2147483647) webReminderTimers.push(setTimeout(() => showWebNotification(n), delay));
      });
    };
    let reminderDebounce = null;
    const scheduleReminders = () => {
      clearTimeout(reminderDebounce);
      reminderDebounce = setTimeout(applyReminders, 800);
    };
    watch([settings, plans, mealLogs, trainingSessions], scheduleReminders, { deep: true });
    onMounted(() => {
      scheduleReminders();
      // App per telefono: tocco sulla notifica "Ti sei allenato?" → si apre la domanda
      const native = nativeNotifications();
      if (native && native.addListener) {
        try { native.addListener('localNotificationActionPerformed', () => { clockNow.value = Date.now(); setTimeout(promptPendingSportChecks, 600); }); } catch (e) { /* ignora */ }
      }
      setInterval(scheduleReminders, 60 * 60 * 1000);   // sposta avanti la finestra dei 3 giorni
    });

    const toggleReminders = async () => {
      const r = settings.value.reminders;
      if (r.enabled) { r.enabled = false; return; }
      try {
        const native = nativeNotifications();
        if (native) {
          const p = await native.requestPermissions();
          if (p.display !== 'granted') { showToastMessage('Notifiche non consentite: attivale dalle impostazioni del telefono.'); return; }
        } else if (typeof Notification !== 'undefined') {
          const p = await Notification.requestPermission();
          if (p !== 'granted') { showToastMessage('Notifiche bloccate: attivale dalle impostazioni del browser per questo sito.'); return; }
        } else {
          showToastMessage('Questo browser non supporta le notifiche.');
          return;
        }
      } catch (e) {
        showToastMessage('Impossibile attivare le notifiche su questo dispositivo.');
        return;
      }
      r.enabled = true;
    };
    const reminderMealTypes = mealTypes;

    return {
      activeTab,
      todayBusy, suggestOpen, openSuggestion,
      timeIsAhead,
      realExpenditure, realExpNeedText, toggleDiaryAdaptive, diaryCopySource, copyDiaryFromPrev,
      recordModal, shareRecordFromModal,
      muscleRecovery, muscleRecoverySvg, todaySuggestion, trainPlace, setTrainPlace, shuffleTodayPlan, startTodaySuggestion,
      weekMuscles, weekMusclesSvg, openMuscleShare,
      LIGHT_ACTIVITIES, LIGHT_MINUTES, lightDayModal, lightToday, lightActivity, openLightDay, saveLightDay, removeLightDay,
      habitOn, toggleHabit, waterGoal, waterToday, setWater, tapWaterGlass,
      FAST_GOALS, fasting, startFast, setFastGoal, endFast, hoursLabel, clockLabel,
      pastChecksModal,
      pastChecksSession,
      setPastCheck,
      setAllPastChecks,
      savePastChecks,
      openPastFromCheck,
      openPastFromForm,
      shortDuration,
      sessionTimeLabel,
      trainingTimeSummary,
      streakInfo,
      recapBanner,
      weekBanner,
      openRecap, wrapped, openWrapped, closeWrapped, wrappedGo, wrappedSeason, wrappedTap, wrappedProgress, shareWrapped, wrappedBanner, wrappedConfetti,
      recapMonthName,
      recapPeriodName,
      trophyGroups,
      playerLevel,
      trophyModal,
      trophyModalItems,
      closeTrophyModal,
      trophyDetail,
      trophyDetailGroup,
      openTrophyDetail,
      closeTrophyDetail,
      openTrophies,
      builderMealEstimate,
      pdfImport,
      importPlanPdf,
      itemKcalLabel,
      canInstall,
      isStandalone,
      installBanner,
      installApp,
      dismissInstall,
      nextChallenges,
      openAchievementShare,
      settings,
      toggleReminders,
      remindersSupported,
      remindersNative,
      reminderMealTypes,
      isAuthenticated,
      authLoading,
      hasProfile,
      enterApp,
      showGroceryReminder,
      mealsContainer,
      currentMealId,
      todayActiveMeals,
      todayDateKey,
      todayMealLogs,
      isFutureDateKey,
      setMealDone,
      promptSkipMeal,
      mealCommentModal,
      saveMealSkip,
      clearMealStatus,
      todayConsumedCalories,
      todayTargetCalories,
      todayCaloriesPct,
      dashYear,
      dashMonth,
      dashMonthName,
      dashDaysInMonth,
      dashFirstDayOfMonth,
      dashPrevMonth,
      dashNextMonth,
      dashboardDayStatus,
      dashboardDayClasses,
      nutritionDayStatus,
      nutritionDayClasses,
      dashHasComment,
      openDayMenu,
      dayMenuModal,
      closeDayMenu,
      dayMenuMeals,
      dayMenuLogs,
      dayMenuNote,
      dayMenuTrainingSessions,
      dayMenuStatus,
      dayStatusLabel,
      dayStatusClasses,
      formatDayLabel,
      goToTodayNutrition,
      backupModal,
      backupFileInput,
      openBackupModal,
      closeBackupModal,
      exportBackup, storagePersisted, lastBackupLabel, backupDue, snoozeBackup,
      triggerImportBackup,
      handleBackupFile,
      profile,
      profileInitial,
      profileFullName,
      profileAge,
      onboarding,
      onboardingFileInput,
      onboardingNext,
      onboardingBack,
      completeOnboarding,
      sexOptions,
      petState,
      petMainSvg,
      petModal,
      openPetModal,
      petItems,
      togglePetItem,
      petItemPreview,
      petEvolutionPath,
      petAlbum,
      petEvolveModal, sharePetEvolution,
      petUnlockModal,
      toggleSharePet,
      petUnlockSvg,
      petAlbumFound,
      petDance, petMainBox,
      petDanceClass,
      PET_SPECIES,
      sharePet,
      shareStreakSave,
      PET_SLOTS,
      PET_THRESHOLDS,
      bodyStats,
      bodyInfoOpen,
      toggleBodyInfo,
      openProfileCompletion,
      themeOptions,
      isDark,
      welcomeModal,
      closeWelcome,
      shareWelcome,
      triggerOnboardingImport,
      handleOnboardingBackup,
      profileEdit,
      openProfileEdit,
      saveProfileEdit,
      promptResetAllData,
      shareStudio,
      shareData,
      shareThemeOptions,
      shareHeroLabels,
      openShareStudio,
      closeShareStudio,
      sharePhotoInput,
      pickSharePhoto,
      handleSharePhoto,
      setShareTheme,
      downloadShareImage,
      shareImage,
      sharePreviewCanvas,
      shareFocusLabels,
      setShareFocus,
      shareVideoSupported,
      shareWantsVideo,
      nutritionView,
      sortedPlans,
      plans,
      selectedPlan,
      editingPlanId, // <-- Esportato per poterlo usare in HTML
      newPlanData,
      startNewPlan,
      editPlan,      // <-- Esportato per poterlo usare in HTML
      goToBuilder,
      newPlanBuilder,
      weekDays,
      mealTypes,
      addWeekToBuilder,
      currentBuilderMeals,
      addMealToBuilder,
      removeMealFromBuilder,
      addSlotToMeal,
      removeSlotFromMeal,
      isPlanBuilderComplete,
      finalizeNewPlan,
      promptDeletePlan,
      selectedPlanTotalCalories,
      shortDayLabels,
      todayWeekDay,
      selectedNutritionDay,
      selectedPlanDayMeals,
      selectedPlanDayCalories, selectedPlanDayProtein, todayProtein, mealProteinLabel, proteinGoal,
      NUTRITION_TIPS, NUTRITION_GOALS, eatGuide, openEatGuide, eatTipStat, menuCheck, eatGoalDays, createTrialPlan, suggestedEatGoal, EAT_EXCLUDES, eatPrefs, eatTarget, eatFactor, eatSwapCount, toggleEatExclude, removeEatDislike, eatSwap, openEatSwap, chooseEatSwap, resetEatSwap, dislikeEatFood,
      EXERCISE_LIBRARY, MUSCLE_GROUPS, WORKOUT_PROGRAMS, SPORT_PROGRAMS, guide, userSports, guideSports, openGuide, closeGuide, setGuideTab, guideExercises, guidePrescription, toggleGuideSelect, selectAllGuide, openGuidePicker, guidePickerSheet, confirmGuideAdd, createProgramSheet, programExerciseNames, fillFromLibrary, libraryTip, libraryItem, exerciseThumb, exercisePhoto, exerciseInfo, openExerciseInfo, workoutImport, openWorkoutImport, closeWorkoutImport, importWorkoutFile, importWorkoutText,
      EXERCISE_FEELS, exerciseHistorySuggestion, exerciseSuggestion, exerciseStall, homeSwap, homeDayPlan, openHomeSwap, startHomeDay, setExerciseFeel, todayExerciseFeel, playerFeelExercise, playerSuggestion,
      openPlan,
      formatDate,
      sharePendingGrocery,
      promptTerminatePlan,
      reactivatePlan,
      currentYear,
      currentMonth,
      currentMonthName,
      daysInMonth,
      firstDayOfMonth,
      nextMonth,
      prevMonth,
      exportMode,
      exportSelectedDates,
      isToday,
      isSunday,
      hasComment,
      commentModalMeals,
      commentModalStatus,
      commentModalTrainingSessions,
      handleDayClick,
      exportSelectedMenu,
      noteForToday,
      measurements,
      measurementModal,
      newMeasurement,
      editingMeasurementId,
      openMeasurementModal,
      editMeasurement,
      saveMeasurement,
      confirmDeleteMeasurement,
      promptDeleteEditingMeasurement,
      historyModal,
      historyRows,
      historyIcon,
      historyLabel,
      historyUnit,
      openHistory,
      closeHistory,
      formatNumber,
      weightEntries,
      latestWeight,
      weightDelta,
      weightChart,
      circumferenceRows,
      workoutLogs,
      workoutGroups,
      workoutView,
      workoutSheets,
      selectedSheet,
      selectedSheetDayIdx,
      newSheet,
      editingSheetId,
      startNewSheet,
      editSheet,
      addSheetDay,
      removeSheetDay,
      addExercise,
      removeExercise,
      addSupersetPair,
      removeSuperset,
      supersetPairCount,
      totalSheetExercises, APP_VERSION, sendFeedback,
      foodDiary, DIARY_MEALS, diaryGoal, diaryTarget, setDiaryGoal, setDiaryKcal, dayIntake, intakeBarClass, intakeTextClass, todayIntake,
      mealOffEstimate, mealOffKcal, mealOffVerdict, saveMealOther,
      diaryEditor, diaryMealInfo, openDiaryEditor, diarySlotNow, diaryEstimate, diaryEditorKcal, saveDiaryEntry, deleteDiaryEntry, diaryFrequent, useDiaryFrequent,
      diaryDate, diaryShift, diaryDay, diaryWeek, openDiary, openDayMenuForDate,
      activeSheet, isActiveSheet, activeSheetNext, sortedWorkoutSheets, toggleActiveSheet, startActiveSheet,
      saveSheet,
      promptDeleteSheet,
      promptDeleteSelectedSheet,
      openSheet,
      currentSheetDay,
      selectedDayGroups,
      exerciseHistoryModal,
      exerciseChart,
      exerciseChartActive,
      onExerciseChartPointer,
      onExerciseChartLeave,
      openExerciseHistoryFromGroup,
      openExerciseHistory,
      exerciseHistoryLogs,
      deleteWorkoutLog,
      sheetHistoryModal,
      sheetHistorySessions,
      sessionPreviewModal,
      openSessionPreview,
      closeSessionPreview,
      editSessionFromPreview,
      workoutPlayer,
      playerStep,
      playerNextStep,
      playerExercise,
      playerNextExercise,
      playerTargetStep,
      playerTargetExercise,
      playerProgressPct,
      formatClock,
      playerCountdown,
      playerElapsed,
      playerRestLeft,
      playerRestPct,
      playerSessionElapsed,
      playerCurrentValue,
      playerUnit,
      playerValueDraft,
      playerRemaining,
      playerSetValue,
      playerAdjustValue,
      startGuidedWorkout,
      playerStartSet,
      playerCompleteSet,
      playerAddRest,
      playerSkipRest,
      closeGuidedWorkout,
      promptQuitGuidedWorkout,
      resumeModal,
      resumeSavedWorkout,
      discardSavedWorkout,
      resumeInfo,
      sessionStatsModal,
      openSessionStats,
      closeSessionStats,
      openTrainingSessionItem,
      todayWorkout,
      openTodayPlanned,
      goTrainNow,
      sessionStats,
      statsDelta,
      statsBaseDelta,
      statsAvgSet,
      statsImproved,
      openSheetFromStats,
      statsRepsLabel,
      formatDateLong,
      exerciseRest,
      currentExerciseWeight,
      currentExerciseDuration,
      exerciseStartValue,
      exerciseCurrentValue,
      exerciseUnit,
      exerciseDeltaValue,
      exerciseInputs,
      setExerciseValue,
      weightConfirmModal,
      confirmExerciseValue,
      cancelExerciseValue,
      pyramidModal,
      openPyramidModal,
      addPyramidSet,
      removePyramidSet,
      savePyramidModal,
      togglePyramid,
      pyramidSummary,
      pyramidExerciseName,
      pyramidLogModal,
      openPyramidLogModal,
      addPyramidLogSet,
      pyramidLogTopWeight,
      confirmPyramidLog,
      lastExerciseLog,
      sheetSessionDates,
      sheetLastSessionDate,
      trainingSports,
      trainingWeekdays,
      trainingMonthName,
      trainingYear,
      trainingDaysInMonth,
      trainingFirstDayOfMonth,
      trainingPrevMonth,
      trainingNextMonth,
      trainingSessionsForDay,
      trainingDayClasses,
      trainingDayModal,
      openTrainingDay,
      closeTrainingDay,
      trainingDaySessions,
      trainingFormModal, trainingFormSheetDays,
      openTrainingForm,
      sportStatus,
      sportCanCheck,
      sportCheckModal,
      sportCheckSession,
      openSportCheck,
      closeSportCheck,
      setSportStatus,
      snoozeSportChecks,
      editFromSportCheck,
      editTrainingSession,
      closeTrainingForm,
      setTrainingKind,
      toggleTrainingWeekday,
      saveTrainingSession,
      removeTrainingSession,
      trainingSessionLabel,
      trainingSessionSubtitle,
      upcomingTrainingSessions,
      openSheetForTraining,
      customModal,
      executeConfirm,
      commentModal,
      dailyBar,
      closeCommentModal,
      saveComment,
      activePlan,
      groceryModal,
      openGroceryModal,
      checklistItems,
      allGroceryChecked,
      shareGroceryReady,
      photos, photosReady, photoUnavailable, photoInput, PHOTO_POSES, poseLabel, photoDateLabel, photoWeight,
      gallery, galleryPhotos, galleryMonths, galleryPoses, recentPhotos, daysSinceLastPhoto, openGallery, closeGallery,
      photoAdd, triggerPhotoInput, onPhotoFiles, closePhotoAdd, savePhotoAdd,
      photoViewer, viewerPhoto, viewerIndex, openPhoto, stepPhoto, closePhotoViewer, savePhotoEdit, deletePhoto,
      photoCompare, togglePhotoSelect, startCompareSelect, cancelCompareSelect, confirmCompareSelect, quickCompare, openQuickCompare,
      compareBefore, compareAfter, compareStats, dragCompare, closeCompare, shareCompare, exportPhotos,
      photoDue, snoozePhoto, photoStory, photoStoryPair, sharePhotoStory, viewPhotoStory
    };
  },
  // Interfaccia già compilata (src/app-template.html → js/app-render.js, npm run build:template)
  render: STILL_RENDER
}).mount('#app');

// App installabile e uso offline: il service worker funziona solo da un indirizzo web (non da file e non nell'APK)
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !window.Capacitor) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
}
