/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
     fontFamily: {
         inter: ['Inter', 'sans-serif'],
        opensans: ['"Open Sans"', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
         archivon: ['"Archivo Narrow"', 'sans-serif'],
          figtree: ['Figtree', 'sans-serif'],
          archivo: ['Archivo', 'sans-serif'],
      },
        screens: {
        xxxl: '1920px',    
        hd:'1440px' ,
        laptop: '1280px',  

          },
      colors: {
        primary: "#ff7f50",
        desktopBg: '#F2F2F2',
        secondary: "#4b5563",
        sidebar:"#FFC490",
        topbar:"#3A261A",
        background:"#f2e3d6",
         inputBox: '#FFEBDF',
         loginBtn: '#F6630A',

      },
      boxShadow: {
        'around': '0 4px 20px rgba(0, 0, 0, 0.08), 0 -4px 20px rgba(0, 0, 0, 0.06), 4px 0 20px rgba(0, 0, 0, 0.06), -4px 0 20px rgba(0, 0, 0, 0.06)',
        'around-soft': '0 2px 8px rgba(0,0,0,0.08), 0 -2px 8px rgba(0,0,0,0.05), 2px 0 8px rgba(0,0,0,0.05), -2px 0 8px rgba(0,0,0,0.05)',
      },
     
    },
  },
  plugins: [],
};
