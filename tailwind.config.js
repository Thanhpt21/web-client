/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      //main: ["Poppins", "sans-serif;"],
      main: ["Varela", "sans-serif;"],
    },
    extend: {
      gridTemplateRows: {
        10: "repeat(10, minmax(0, 1fr))",
        layout: "200px minmax(900px, 1fr) 100px",
      },
      gridRow: {
        "span-7": "span 7" / "span 7",
      },
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "#1F2937",
      },
      colors: {
        main: "#747c8c",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
      },
      keyframes: {
        "silde-top": {
          "0%": {
            transform: "translateY(20px)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
        "silde-top-input": {
          "0%": {
            transform: "translateY(4px)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
        "scale-up-center": {
          "0%": {
            "-webkit-transform": "scale(0.5)",
            transform: "scale(0.5)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
        },
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
        wave: {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: 1,
          },
          "50%": {
            transform: "scale(1.5)",
            opacity: 0.5,
          },
        },
      },
      animation: {
        "slide-top": " slide-top 0.5s cubic-bezier(.25,.46,.45,.94) both",
        "slide-top-input": " slide-top-input 0.2s linear both",
        "scale-up-center":
          "scale-up-center 0.15s cubic-bezier(.25,.46,.45,.94) both",
        shake: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
        wave: "wave 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};
