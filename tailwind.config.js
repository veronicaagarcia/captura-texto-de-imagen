/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx}",
];
export const theme = {
  extend: {
    colors: {
      naranjaprincipal: "#f59a55",
      naranjahover: "#D47F42",
      beige: "#FBF5E9",
      verde: "#2A9D8F",
      coral: "#CD7D64",
      grisfiguras: "#dedede",
      negrohover: "#525353",
      blanco: "#FFFDFA",
      negro: "#3a3b38",
    },
    fontFamily: {
      sans: ["Inter Variable", "ui-sans-serif", "system-ui"], // Fuente por defecto
      primary: ["League Gothic", "sans-serif"],
      secondary: ["Montserrat Variable", "sans-serif"],
      tertiary: ["Caveat Variable", "cursive"],
    },
  },
};
export const plugins = [];

