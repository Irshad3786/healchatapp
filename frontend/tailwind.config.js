/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        mycolor:{
          950:"#5356FF"
        },
        mycolortwo:{
          950:"#378CE7"
        },
        mycolorthree:{
          950:"#67C6E3"
        },
        mycolorfour:{
          950:"#DFF5FF"
        }
      }
    },
    fontFamily:{
      Lexend:['Lexend','sans-serif'],
      OpenSans:['Open Sans','sans-serif'],
      AnonymousPro:['Anonymous Pro','monospace']
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}