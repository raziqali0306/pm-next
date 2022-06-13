module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffc0ad',
        primaryHeading: '#271c19',
        primaryParagraph: '#271c19',
        secondary: '#503d38',
        secondary_light: '#55423d',
        secondaryHeading: '#fffffe',
        secondaryParagraph: '#fff3ec',
        highlight: '#9656a1',
      },
    },
  },
  plugins: [],
};

// colors: {
//   primary: '#55423d',
//   secondary: '#ffc0ad',
//   primaryHeading: '#fffffe',
//   primaryParagraph: '#fff3ec',
//   secondaryHeading: '#271c19',
//   secondaryParagraph: '#271c19',
//   highlight: '#9656a1',
// },
