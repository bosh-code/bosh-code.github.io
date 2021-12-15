module.exports = {
  prefix: '',
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    typography: {
      DEFAULT: {
        css: {
          color: 'colors.terminal-text'
        }
      }
    },
    extend: {
      fontFamily: {
        mono: ['Fira Code']
      },
      colors: {
        'terminal-bg': {
          DEFAULT: '#414141',
        },
        'terminal-header': {
          DEFAULT: '#2b2b2b',
        },
        'terminal-text': {
          DEFAULT: '#FFFFFF',
        },
        'terminal-string': {
          DEFAULT: '#f7d18b',
        },
        'terminal-folder': {
          DEFAULT: '#a3c3de',
        },
        'terminal-input': {
          DEFAULT: '#b8ca7e',
        },
        'terminal-chevron': {
          DEFAULT: '#ed73be'
        },
        'terminal-tilde': {
          DEFAULT: '#76c3f9'
        },
        'terminal-cursor': {
          DEFAULT: '#dedede'
        },
      }
    },
  },
  corePlugins: {
    preflight: true,
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
