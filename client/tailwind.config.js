module.exports = {
  content: ['./src/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      blue: '#1fb6ff',
      indigo: '#1e1b4b',
      purple: '#2e1065',
      'purple-dark': '',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      red: '#ef4444',
      white: '#fafafa',
      gray: '#27272a', //zinc 800
      gray2: '#71717a', //zinc 400
      'gray-dark': '#09090b', //zinc 950
      'gray-dark2': '#18181b', //zinc 900
      'gray-light': '#d4d4d8', //zinc 300
      'gray-light2': '#52525b' //zinc 600
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  variants: {
    extend: {
      borderWidth: {
        1: '1px'
      }
    },
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui']
    }
  },
  plugins: []
};
