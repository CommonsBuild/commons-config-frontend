module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        neon: '#DEFB48',
        black: '#0A0A06',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
