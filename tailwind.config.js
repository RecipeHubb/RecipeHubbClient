const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    content: [
      './public/index.html',
      './src/**/*.{vue,js}',
    ],
    // Safelist classes used in dynamic concatenation or by third-party libs
    options: {
      safelist: [],
    },
  },
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    // The previous stylesheet also shipped preflight; keep it (artifacts match).
    preflight: true,
  },
}
