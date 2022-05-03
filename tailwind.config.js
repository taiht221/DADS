module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '15px',
    },
    screens: {
      sx: '320px',

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      customTablet: '1090px',
    },
  },
  plugins: [require('tailwind-scrollbar-hide'), require('tailwind-scrollbar')],
}
