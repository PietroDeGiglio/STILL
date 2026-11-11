// Tema di Tailwind: colori e font del brand STILL
tailwind.config = {
  theme: {
    extend: {
      colors: {
        antracite: '#1D1D1D',
        salvia: '#10B981', /* Verde più vivace e allegro (Smeraldo) */
        viola: '#8B5CF6',  /* Viola più luminoso e vibrante */
        arancione: '#F5A623',
        bianco: '#F6F5F2'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'salvia-glow': '0 0 15px rgba(16, 185, 129, 0.4)'
      }
    }
  }
}
