// eslint-disable-next-line import/no-extraneous-dependencies
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      // TODO: Should think of better design tokens
      colors: {
        // Base colors
        // ---
        'ofs-blue': '#007bff',
        'ofs-cyan': '#17a2b8',
        'ofs-green': '#28a745',
        'ofs-indigo': '#6610f2',
        'ofs-orange': '#fd7e14',
        'ofs-pink': '#e83e8c',
        'ofs-purple': '#6f42c1',
        'ofs-red': '#dc3545',
        'ofs-teal': '#20c997',
        'ofs-yellow': '#ffc107',
        'ofs-yellowish': '#fff59f',

        // Brand colors
        // ---
        'ofs-primary': '#25a88a',
        'ofs-secondary': '#0d61a7',
        'ofs-tertiary': '#dadada',
        'ofs-quaternary': '#045e1b',

        // Body background color
        'ofs-base': '#fff',
        'ofs-border': '#dadada',

        'ofs-dark': '#000',
        'ofs-light': '#fff',

        'ofs-text': '#333',
        'ofs-subtext': '#888',

        'ofs-danger': '#dc3545',
        'ofs-info': '#007bff',
        'ofs-success': '#28a745',
        'ofs-warning': '#ffc107',
      },
      height: {
        navbarDesktop: '88px',
        navbarMobile: '100%',
      },
      padding: {
        navbarWidth: '45px',
      },
      width: {
        navbarDesktop: '100%',
        navbarMobile: '45px',
      },
    },
    fontFamily: {
      mono: [
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
        '!default',
      ],
      primary: ['"Courier"', 'monospace'],
      secondary: ['"Barlow Condensed"', 'sans-serif'],
      tertiary: ['"Dynalight"', 'sans-serif'],
    },
    screens: {
      sm: '576px',
      // => @media (min-width: 576px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '992px',
      // => @media (min-width: 992px) { ... }

      xl: '1200px',
      // => @media (min-width: 1200px) { ... }

      '2xl': '1400px',
      // => @media (min-width: 1400px) { ... }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
