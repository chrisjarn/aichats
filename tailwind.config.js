module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["rubik", "sans-serif" ],
        rubikreg: ["rubikreg", "sans-serif" ],
        rubikitalic: ["rubikitalic", "sans-serif" ],
        rubiklight: ["rubiklight", "sans-serif" ],
        rubikbold: ["rubikbold", "sans-serif" ],
        rubikblack: ["rubikblack", "sans-serif" ],
        rubikblackitalic: ["rubikblackitalic", "sans-serif" ],
        rubikextrabolditalic: ["rubikextrabolditalic", "sans-serif" ],
        SFRegular: ["SFRegular", "sans-serif" ],
        SFMedium: ["SFMedium", "sans-serif" ],
        SFSemibold: ["SFSemibold", "sans-serif" ],
        SFLight: ["SFLight", "sans-serif" ],
      },
      colors: {
        'red': '#E53935',
        'brown': '#202023',
      }, 
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
  variants: {
    scrollbar: ['rounded']
}
}
