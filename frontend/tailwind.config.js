/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        primero: "rgba(39, 43, 55, .9)",
        segundo: "rgba(0, 0, 0, .5)",
        blue_dash: "rgba(0,51,173,1)",
        card: "rgba(12,15,20,1)",
      },
   
    },
  },
  plugins: [],
};
