module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        lp: "url('/landing_page.png')",
        dash: "url('/dash.png')",
        chart: "url('/chart-bg.svg')",
        learn: "url('/assets/learn-circle-bg.png')",
        dialog: "url('/dialog.png')",
      }),

      colors: {
        neon: {
          DEFAULT: '#DEFB48',
          50: '#DEFB48',
          100: '#C8E241',
          200: '#B2C93B',
          300: '#9BB032',
          400: '#85972B',
          500: '#6F7E24',
          600: '#59641D',
          700: '#434B16',
          800: '#2C320E',
          900: '#161907',
        },
        'neon-light': {
          DEFAULT: '#FFFFFF',
          50: '#FFFFFF',
          100: '#FCFFED',
          200: '#F8FEDA',
          300: '#F5FEC8',
          400: '#F2FDB6',
          500: '#EFFDA4',
          600: '#EDFD91',
          700: '#E8FC7F',
          800: '#E5FC6D',
          900: '#E1FB5A',
        },
        blue: {
          DEFAULT: '#0F2EEE',
          50: '#0F2EEE',
          100: '#0E29D6',
          200: '#0C25BE',
          300: '#0B20A7',
          400: '#091C8F',
          500: '#081777',
          600: '#06125F',
          700: '#040E47',
          800: '#030930',
          900: '#010518',
        },
        'light-blue': {
          DEFAULT: '#E7EAFD',
          50: '#E7EAFD',
          100: '#CFD5FC',
          200: '#B7C0FA',
          300: '#9FABF8',
          400: '#8797F7',
          500: '#6F82F5',
          600: '#576DF3',
          700: '#3F58F1',
          800: '#2743F0',
          900: '#0F2EEE',
        },
        pink: {
          DEFAULT: '#FE40B7',
          50: '#FD40FE',
          100: '#E43AE5',
          200: '#CA33CB',
          300: '#B12DB2',
          400: '#982698',
          500: '#7F207F',
          600: '#651A66',
          700: '#4C134C',
          800: '#330D33',
          900: '#190619',
        },
        'light-pink': {
          DEFAULT: '#FFECFF',
          50: '#FFECFF',
          100: '#FFD9FF',
          200: '#FEC6FF',
          300: '#FEB3FF',
          400: '#FEA0FF',
          500: '#FE8CFE',
          600: '#FE79FE',
          700: '#FD66FE',
          800: '#FD53FE',
          900: '#FD40FE',
        },
        red: {
          DEFAULT: '#FFF1F0',
          50: '#FFF1F0',
          100: '#FFCCC7',
          200: '#FFA39E',
          300: '#FF7875',
          400: '#FF4D4F',
          500: '#F5222D',
          600: '#CF1322',
          700: '#A8071A',
          800: '#820014',
          900: '#5C0011',
        },
        orange: {
          DEFAULT: '#FFF7E6',
          50: '#FFF7E6',
          100: '#FFE7BA',
          200: '#FFD591',
          300: '#FFC069',
          400: '#FFA940',
          500: '#FA8C16',
          600: '#D46B08',
          700: '#AD4E00',
          800: '#873800',
          900: '#612500',
        },
        green: {
          DEFAULT: '#F6FFED',
          50: '#F6FFED',
          100: '#D9F7BE',
          200: '#B7EB8F',
          300: '#95DE64',
          400: '#73D13D',
          500: '#52C41A',
          600: '#389E0D',
          700: '#237804',
          800: '#135200',
          900: '#092B00',
        },
        gray: {
          DEFAULT: '#FAFAFA',
          50: '#F5F5F5',
          100: '#F0F0F0',
          200: '#D9D9D9',
          300: '#BFBFBF',
          400: '#8C8C8C',
          500: '#595959',
          600: '#434343',
          700: '#262626',
          800: '#1F1F1F',
          900: '#141414',
        },
        cyan: {
          DEFAULT: '#03B3FF',
          50: '#03B3FF',
          700: '#002535',
        },
        magenta: '#7622A8',
        black: {
          DEFAULT: '#0A0A06',
          50: '#0A0A06',
          100: '#0B0A15',
          200: '#191728',
          300: '#000001',
        },
        chart: {
          yellow: '#FBC948',
          orange: '#FB9E48',
          turquoise: '#03FFD2',
          'dark-blue': '#028FCC',
          blue: '#03D2FF',
          purple: '#8D15C5',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        bj: ['Bai Jamjuree', 'sans-serif'],
      },
      fontSize: {
        xxs: '0.625rem',
      },
      height: {
        144: '36rem',
        lp: '1828px',
      },
      maxWidth: {
        144: '9rem',
      },
      minWidth: {
        '2/4': '50%',
        '3/4': '75%',
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['checked'],
      gridColumnStart: ['last'],
      width: ['first'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
