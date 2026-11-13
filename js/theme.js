// Tema scuro applicato subito (prima che parta l'app), così non c'è il lampo bianco.
// File separato e non inline: la Content-Security-Policy di index.html non permette script scritti nella pagina.
(function () {
  try {
    var theme = (JSON.parse(localStorage.getItem('still_settings') || '{}') || {}).theme;
    var dark = theme === 'dark' || (theme === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) {
      document.documentElement.classList.add('dark');
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0E0E11');
    }
  } catch (e) {}
})();
