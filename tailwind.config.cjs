const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  safelist: [{pattern: /bg-.+-.+/}],

  theme: {
    extend: {}
  },

  daisyui: {
    themes: [
      {
        yale: {
          primary: "#00356b",
          "primary-content": "#ffffff",
          secondary: "#7D919B",
          "secondary-content": "#ffffff",
          accent: "#EB6B47",
          "accent-content": "#163835",
          neutral: "#3d4451",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#F2F2F2",
          "base-300": "#E5E6E6",
          "base-content": "#1f2937",
        },
      },
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter'
    ]
  },

  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};

module.exports = config;
