// STILL: logica dell'app (Vue 3). Il markup è in index.html.
// Vue Application Setup
const { createApp, ref, onMounted, watch, nextTick, computed } = Vue;

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
      'still_workout_sheets', 'still_training_sessions', 'still_comments', 'still_settings'
    ];
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
        } catch (e) {
          console.error(`Salvataggio non riuscito per ${key}`, e);
        }
      },
      remove(key) {
        try { localStorage.removeItem(key); } catch (e) { /* ignora */ }
      },
      exportAll() {
        const data = {};
        STORAGE_KEYS.forEach(key => {
          const raw = this.getRaw(key);
          if (raw !== null) data[key] = JSON.parse(raw);
        });
        return data;
      },
      importAll(data) {
        STORAGE_KEYS.forEach(key => {
          if (key in data) localStorage.setItem(key, JSON.stringify(data[key]));
        });
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
    const savedPlans = storage.getRaw('still_plans');
    const plans = ref(savedPlans ? JSON.parse(savedPlans) : []);

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
             calories: normalizeCalories(m.calories) !== null ? normalizeCalories(m.calories) : '-',
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

    // Trasforma i pasti del builder nel formato usato da dashboard e calendario
    const mapDayMeals = (dayMeals) => {
      return (dayMeals || []).map((m, i) => {
        const typeInfo = mealTypes.find(t => t.id === m.type) || mealTypes[0];
        return {
          id: m.type + '_' + i,
          type: m.type,
          name: typeInfo.label,
          icon: typeInfo.icon,
          calories: normalizeCalories(m.calories),
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
    const savedMealLogs = storage.getRaw('still_meal_logs');
    const mealLogs = ref(savedMealLogs ? JSON.parse(savedMealLogs) : {});

    watch(mealLogs, (logs) => {
      storage.save('still_meal_logs', logs);
    }, { deep: true });

    const todayDateKey = computed(() => toISODate(new Date()));
    const todayMealLogs = computed(() => mealLogs.value[todayDateKey.value] || {});

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
        hasExisting: existing?.status === 'skipped'
      };
    };

    const saveMealSkip = () => {
      const modal = mealCommentModal.value;
      const dayLogs = mealLogs.value[modal.dateKey] || {};
      dayLogs[modal.mealId] = { status: 'skipped', comment: modal.text.trim() };
      mealLogs.value[modal.dateKey] = dayLogs;
      mealCommentModal.value.isOpen = false;
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
      const mealsForDay = getMealsForDate(date);
      if (mealsForDay.length === 0) return 'empty';

      const dayLogs = mealLogs.value[toISODate(date)] || {};
      const statuses = mealsForDay.map(meal => dayLogs[meal.id]?.status).filter(Boolean);
      if (statuses.length === 0) return 'empty';

      const done = statuses.filter(status => status === 'done').length;
      const skipped = statuses.filter(status => status === 'skipped').length;

      if (skipped === 0 && done === mealsForDay.length) return 'perfect';
      if (skipped === 1) return 'small_cheat';
      if (skipped >= 2) return 'cheat';
      return 'partial';
    };

    const dayStatusLabel = (status) => {
      return {
        perfect: 'Giornata perfetta',
        small_cheat: 'Piccolo sgarro',
        cheat: 'Giornata di sgarro',
        partial: 'Giornata parziale',
        empty: 'Non tracciata'
      }[status] || 'Non tracciata';
    };

    const dayStatusClasses = (status) => {
      return {
        perfect: 'bg-salvia/10 text-salvia',
        small_cheat: 'bg-viola/10 text-viola',
        cheat: 'bg-red-50 text-red-500',
        partial: 'bg-gray-100 text-gray-400',
        empty: 'bg-gray-100 text-gray-400'
      }[status] || 'bg-gray-100 text-gray-400';
    };

    // Calorie reali: somma dei pasti segnati come eseguiti
    const todayConsumedCalories = computed(() => {
      return todayActiveMeals.value.reduce((sum, meal) => {
        if (meal.calories === null) return sum;
        return todayMealLogs.value[meal.id]?.status === 'done' ? sum + meal.calories : sum;
      }, 0);
    });

    const todayTargetCalories = computed(() => {
      return todayActiveMeals.value.reduce((sum, meal) => sum + (meal.calories || 0), 0);
    });

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
      if (!activePlan.value) {
        nutritionView.value = 'list';
        showToastMessage("Nessun piano attivo. Crea o attiva un piano alimentare.");
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
    const savedMeasurements = storage.getRaw('still_measurements');
    const measurements = ref(savedMeasurements ? JSON.parse(savedMeasurements) : []);

    // Auto-salvataggio delle misurazioni nella memoria del telefono
    watch(measurements, (newMeasurements) => {
      storage.save('still_measurements', newMeasurements);
    }, { deep: true });

    // Log allenamenti: la sezione Allenamento scriverà qui le sessioni delle schede.
    // Formato consigliato: { id, date, sheetId, sheetName, exerciseId, exerciseName, weight, reps }
    const savedWorkoutLogs = storage.getRaw('still_workout_logs');
    const workoutLogs = ref(savedWorkoutLogs ? JSON.parse(savedWorkoutLogs) : []);

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
    const savedSheets = storage.getRaw('still_workout_sheets');
    const workoutSheets = ref(savedSheets ? JSON.parse(savedSheets) : []);

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

    const savedTrainingSessions = storage.getRaw('still_training_sessions');
    const trainingSessions = ref(savedTrainingSessions ? JSON.parse(savedTrainingSessions) : []);

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
    // "18:00–19:30" per gli sport con orario di fine, altrimenti solo l'inizio
    const sessionTimeLabel = (session) => {
      if (!session || !session.time) return '';
      return session.kind === 'sport' && session.endTime ? session.time + '–' + session.endTime : session.time;
    };
    // Secondi di allenamento tra due date (incluse): palestra dal report, sport solo se segnati "fatto"
    const trainingSecondsBetween = (start, end) => {
      let gym = 0, sport = 0;
      trainingSessions.value.forEach(s => {
        if (s.kind === 'gym' && s.date && s.date >= start && s.date <= end) {
          // Palestra: durata misurata dall'allenamento guidato, oppure inizio→fine se segnata a mano come fatta
          if (s.report) gym += s.report.totalSeconds || 0;
          else if (s.statusByDate && s.statusByDate[s.date] === 'done') gym += sportDurationMin(s) * 60;
          return;
        }
        if (s.kind === 'sport' && s.statusByDate) {
          const min = sportDurationMin(s);
          if (!min) return;
          Object.entries(s.statusByDate).forEach(([key, status]) => {
            if (status === 'done' && key >= start && key <= end) sport += min * 60;
          });
        }
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
          sheetId: session.sheetId !== undefined && session.sheetId !== null ? session.sheetId : (workoutSheets.value[0] ? workoutSheets.value[0].id : null),
          dayName: session.dayName || '',
          note: session.note || '',
          error: ''
        };
        return;
      }
      const date = dateKey || toISODate();
      const firstSheet = workoutSheets.value[0];
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
        dayName: '',
        note: '',
        error: ''
      };
    };

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
        if (form.date <= today && form.pastStatus) map[form.date] = form.pastStatus;
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
      selectedSheetDayIdx.value = 0;
      workoutView.value = 'detail';
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
      if (target.id && log.exerciseId) return String(log.exerciseId) === String(target.id);
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
    const weightConfirmModal = ref({ isOpen: false, exerciseId: null, exerciseName: '', value: null, unit: 'kg', isCardio: false });

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
        isCardio: exercise.type === 'cardio'
      };
    };

    const applyExerciseValue = (exercise, rounded) => {
      if (exercise.type === 'cardio') {
        upsertTodayExerciseLog(exercise, { weight: null, reps: null, duration: rounded, intensity: exercise.intensity || '' });
        showToastMessage(exercise.name + ': ' + formatNumber(rounded) + ' min registrati per oggi.');
      } else {
        upsertTodayExerciseLog(exercise, { weight: rounded, reps: parseOptionalNumber(exercise.reps) });
        showToastMessage(exercise.name + ': ' + formatNumber(rounded) + ' kg registrati per oggi.');
      }
      exerciseInputs.value[exercise.id] = '';
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
      upsertTodayExerciseLog(exercise, {
        weight: rounded,
        reps: parseOptionalNumber(topSet.reps),
        setsDetail: cleaned.map(set => ({ weight: Math.round(set.weight * 10) / 10, reps: set.reps }))
      });
      modal.isOpen = false;
      showToastMessage(exercise.name + ': peso massimo ' + formatNumber(rounded) + ' kg registrato per oggi.');
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
    const closeSportCheck = () => { sportCheckModal.value.isOpen = false; };

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

    // Sport degli ultimi 7 giorni ancora da segnare (oggi solo se l'orario è passato da un'ora e mezza)
    const pendingSportChecks = () => {
      const out = [];
      const now = new Date();
      const todayKey = toISODate(now);
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      const sports = trainingSessions.value.filter(s => s.kind === 'sport');
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
            if (start + (dur || 90) > nowMinutes) return;
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
    
    const savedComments = storage.getRaw('still_comments');
    const commentsMap = ref(savedComments ? JSON.parse(savedComments) : {});

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
    const savedProfile = storage.getRaw('still_profile');
    const profile = ref(savedProfile ? JSON.parse(savedProfile) : null);
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
    const profileFromForm = (form) => ({
      firstName: String(form.firstName).trim(),
      lastName: String(form.lastName || '').trim(),
      birthDate: form.birthDate || '',
      height: parseOptionalNumber(form.height)
    });

    const onboarding = ref({
      step: 0, error: '', firstName: '', lastName: '', birthDate: '', height: '',
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

    const enterApp = () => {
      isAuthenticated.value = true;
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
    };

    // Modifica profilo (dalla modale Profilo)
    const profileEdit = ref({ isOpen: false, firstName: '', lastName: '', birthDate: '', height: '', error: '' });
    const openProfileEdit = () => {
      const current = profile.value || {};
      profileEdit.value = {
        isOpen: true,
        firstName: current.firstName || '',
        lastName: current.lastName || '',
        birthDate: current.birthDate || '',
        height: current.height !== null && current.height !== undefined ? String(current.height) : '',
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
          window.location.reload();
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
      isOpen: false, kind: 'progress', sessionId: null, period: 30, recapMonth: 0, focus: 'total', hero: 'auto',
      theme: 'night', format: 'story', output: 'video', showName: true, weightMode: 'percent', loadMode: 'percent',
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
        total: ['loads', 'workouts', 'time', 'weight', 'sport', 'nutrition', 'improved', 'active', 'sets'],
        training: ['loads', 'time', 'workouts', 'sport', 'improved', 'perWeek', 'sets', 'exercises'],
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
        stats: FOCUS.total.filter(k => M[k]).slice(0, 4).map(k => ({ label: M[k].tileLabel, value: M[k].tile })),
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

    const shareRecapData = (offset, opts) => {
      const r = recapRange(offset);
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

      const scenes = [{ type: 'intro', kicker: name ? 'Il mese di ' + name : 'Il mio mese', big: r.month, caption: 'su STILL' }];
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
      if (M.sport) {
        scenes.push({ kicker: 'Sport', big: M.sport.hero, caption: M.sport.label });
        tiles.push({ label: M.sport.tileLabel, value: M.sport.tile });
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
        scenes.push({ kicker: 'Peso corporeo', big: M.weight.hero, caption: 'nel mese' });
        tiles.push({ label: 'Peso', value: M.weight.tile });
      }
      if (bestRun >= 2) {
        scenes.push({ kicker: 'Serie migliore', big: bestRun + ' giorni', caption: 'di fila senza fermarti' });
        tiles.push({ label: 'Serie migliore', value: bestRun + ' giorni' });
      }

      return {
        kind: 'recap', empty: !activeDays, available: [], focusAvailable: [],
        kicker: name ? 'Il ' + r.month.toLowerCase() + ' di ' + name : 'Il mio ' + r.month.toLowerCase(),
        dateLabel: r.month + ' ' + r.year,
        month: r.month, activeDays, totalDays: calendar.length, calendar, tiles, scenes
      };
    };

    const shareData = computed(() => {
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
      if (st.kind === 'recap') return shareRecapData(st.recapMonth || 0, opts);
      return st.kind === 'workout' ? shareWorkoutData(st.sessionId, opts) : shareProgressData(st.period, opts);
    });

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
      return [st.isOpen, st.kind, st.sessionId, st.period, st.recapMonth, st.focus, st.hero, st.theme, st.format, st.output, st.showName, st.weightMode, st.loadMode, st.hasPhoto];
    }, () => { if (shareStudio.value.isOpen) refreshSharePreview(); else stopShareAnimation(); });

    const openShareStudio = (kind, sessionId = null) => {
      const st = shareStudio.value;
      shareStudio.value = {
        ...st,
        isOpen: true, kind, sessionId, hero: 'auto', focus: 'total', ready: false, error: '', busy: false, recording: false,
        output: shareVideoSupported ? st.output : 'image',
        theme: st.theme === 'photo' && !sharePhoto ? 'night' : st.theme
      };
    };
    const openRecap = (offset = 0) => {
      openShareStudio('recap');
      shareStudio.value.recapMonth = offset;
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
    const shareBaseName = () => `still-${({ workout: 'allenamento', quote: 'frase-del-giorno', recap: 'il-mio-mese' })[shareStudio.value.kind] || 'progressi'}-${toISODate()}`;
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
        recap: 'Il mio mese su STILL 🎬 #STILL'
      })[st.kind] || 'Ieri. Oggi. Domani. Ancora. 💪 #STILL';
      try {
        file = await buildShareFile();
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], text: shareText + ' ' + APP_URL });
        } else {
          downloadBlob(file, file.name);
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
    // BACKUP: esporta / importa tutti i dati in un file JSON
    // ---------------------------------------------------------------
    const backupModal = ref({ isOpen: false, error: '' });
    const backupFileInput = ref(null);
    const openBackupModal = () => { backupModal.value = { isOpen: true, error: '' }; };
    const closeBackupModal = () => { backupModal.value.isOpen = false; };

    const exportBackup = () => {
      const payload = { app: 'STILL', version: 1, exportedAt: new Date().toISOString(), data: storage.exportAll() };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `still-backup-${toISODate()}.json`;
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
        const when = payload.exportedAt ? new Date(payload.exportedAt).toLocaleString('it-IT') : 'data sconosciuta';
        onValid(data, when);
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
        storage.importAll(data);
        window.location.reload();
      });
    };

    const handleBackupFile = (event) => {
      readBackupFile(event, (msg) => { backupModal.value.error = msg; }, (data, when) => {
        backupModal.value.isOpen = false;
        showConfirm(
          'Ripristinare il backup?',
          `Backup del ${when}. I dati attuali verranno sostituiti con quelli del file. L'operazione non si può annullare.`,
          () => {
            storage.importAll(data);
            window.location.reload();
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
      workoutLogs.value.forEach(log => { if (log.date) set.add(log.date); });
      trainingSessions.value.forEach(s => {
        if (s.kind === 'gym' && s.date && (s.report || (s.statusByDate && s.statusByDate[s.date] === 'done'))) set.add(s.date);
        if (s.kind === 'sport' && s.statusByDate) {
          Object.entries(s.statusByDate).forEach(([key, status]) => { if (status === 'done') set.add(key); });
        }
      });
      Object.entries(mealLogs.value).forEach(([key, logs]) => {
        if (Object.values(logs || {}).some(l => l && l.status === 'done')) set.add(key);
      });
      return set;
    });

    // PROTEGGI SERIE: se salti UN giorno la serie non si azzera (il giorno salvato non si conta).
    // Si ricarica dopo SHIELD_RECHARGE giorni attivi. Calcolato sempre dallo storico: niente stato da salvare.
    const SHIELD_RECHARGE = 7;
    const streakInfo = computed(() => {
      const set = activeDaySet.value;
      const today = toISODate();
      const keys = [...set].filter(k => k <= today).sort();
      let current = 0, best = 0, shields = 1, sinceUse = SHIELD_RECHARGE;
      const protectedDays = new Set();
      const activeDay = () => {
        current++; sinceUse++;
        if (!shields && sinceUse >= SHIELD_RECHARGE) shields = 1;
        best = Math.max(best, current);
      };
      if (keys.length) {
        const d = new Date(keys[0] + 'T12:00:00');
        let guard = 0;
        while (toISODate(d) < today && guard++ < 5000) {
          const key = toISODate(d);
          if (set.has(key)) activeDay();
          else if (current > 0 && shields) { shields = 0; sinceUse = 0; protectedDays.add(key); }
          else current = 0;
          d.setDate(d.getDate() + 1);
        }
        if (set.has(today)) activeDay();
      }
      const todayDone = set.has(today);
      const y = new Date(); y.setHours(12, 0, 0, 0); y.setDate(y.getDate() - 1);
      const protectedYesterday = protectedDays.has(toISODate(y));

      const week = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - i);
        const key = toISODate(d);
        week.push({ key, label: ['D', 'L', 'M', 'M', 'G', 'V', 'S'][d.getDay()], active: set.has(key), protected: protectedDays.has(key), today: i === 0 });
      }

      let message;
      if (todayDone) message = current > 1 ? 'Oggi è fatto. Domani si continua.' : 'Primo giorno fatto. Domani si continua.';
      else if (protectedYesterday) message = 'Ieri il proteggi serie ha salvato la tua serie: segna qualcosa oggi per non perderla.';
      else if (current > 0) message = 'Segna un pasto o un allenamento oggi per non perdere la serie.';
      else message = 'Segna un pasto o un allenamento e inizia la tua serie.';
      return {
        current, best, todayDone, week, message, protectedYesterday,
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

    // ---------------------------------------------------------------
    // PROMEMORIA: pasti, allenamenti e serie in pericolo.
    // Nell'APK (Capacitor) diventano notifiche locali vere; sul sito
    // arrivano solo finché l'app è aperta.
    // ---------------------------------------------------------------
    const DEFAULT_REMINDERS = {
      enabled: false, meals: true, workouts: true, checkins: true, streak: true, workoutLead: 60, streakTime: '21:00',
      mealTimes: { colazione: '08:00', spuntino_mattina: '10:30', pranzo: '13:00', spuntino_pomeriggio: '16:30', post_workout: '', cena: '20:00' }
    };
    const savedSettings = (() => { try { return JSON.parse(storage.getRaw('still_settings') || '{}'); } catch (e) { return {}; } })();
    const settings = ref({
      ...savedSettings,
      reminders: {
        ...DEFAULT_REMINDERS,
        ...(savedSettings.reminders || {}),
        mealTimes: { ...DEFAULT_REMINDERS.mealTimes, ...((savedSettings.reminders || {}).mealTimes || {}) }
      }
    });
    watch(settings, (v) => storage.save('still_settings', v), { deep: true });

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
    const CHECKIN_TITLES = ['Hai spaccato anche oggi?', 'Sei stato un fenomeno anche oggi?', 'Missione compiuta?', 'Allenamento chiuso?'];
    const CHECKIN_BODIES = ['Faccelo sapere: segnalo in app e tieni viva la serie.', 'Entra e segnalo: ogni allenamento conta.', 'Raccontacelo in app, la tua serie ti aspetta.'];
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
            const after = isSport && sportDurationMin(session) ? sportDurationMin(session) + 15 : SPORT_CHECK_DELAY;   // 15 min dopo la fine
            const at = Math.min(start + after * 60000, atTime(key, '23:30'));
            if (!already && at > start && at > now) {
              const what = isSport ? (session.sport || 'sport').toLowerCase() : 'in palestra';
              out.push({
                id: reminderId('check' + key + session.id), at,
                title: emoji + ' ' + pickText(CHECKIN_TITLES, key + session.id),
                body: (isSport ? 'Com\'è andata a ' + what + '? ' : 'Com\'è andata ' + what + '? ') + pickText(CHECKIN_BODIES, 'b' + key + session.id)
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
      try { new Notification(n.title, { body: n.body, tag: String(n.id) }); } catch (e) { /* alcuni browser non le permettono senza service worker */ }
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
      openRecap,
      recapMonthName,
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
      exportBackup,
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
      selectedPlanDayCalories,
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
      totalSheetExercises,
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
      trainingFormModal,
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
      shareGroceryReady
    };
  }
}).mount('#app');
