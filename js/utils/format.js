// Formattazioni condivise (caricato prima di app.js)

// Secondi → "m:ss" oppure "h:mm:ss"
const formatClock = (totalSeconds) => {
  const sec = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const mmss = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  return h ? h + ':' + mmss : mmss;
};
