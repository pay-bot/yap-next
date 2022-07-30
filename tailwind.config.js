module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: { '3xl': '1600px' },
      colors: {
        primary: '#01D1ED',
        text: '#22343D',
      },
      boxShadow: { borderShadow: '0px 2px 8px rgba(0, 0, 0, 0.25)' },
    },
  },
  variants: {fill: ['hover', 'focus'], // this line does the trick
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')],
};
