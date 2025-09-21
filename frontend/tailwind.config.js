/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Libre Baskerville", "serif"],
      },
      colors: {
        primaryTeal: "#00CED1",
        darkTealBlue: "#215D6E",
        secondaryTeal: "#48B98B",
        softGlow: "#60C2DF",
        lightText: "#E9EFF1",
        darkBg: "#0A0A0A",
      },
      boxShadow: {
        "glow-primary":
          "0 0 10px rgba(0,206,209,0.7), 0 0 30px rgba(0,206,209,0.4)",
        "glow-hover":
          "0 0 20px rgba(0,206,209,0.8), 0 0 40px rgba(0,206,209,0.5)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { textShadow: "0 0 8px #00CED1, 0 0 16px #00CED1" },
          "50%": { textShadow: "0 0 20px #00CED1, 0 0 40px #00CED1" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradientX: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },

        waveMotion: {
          "0%, 100%": { transform: "translateY(0px)" },
          "25%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(0px)" },
          "75%": { transform: "translateY(10px)" },
        },

        slideInLeft: {
          "0%": { opacity: 0, transform: "translateX(-50px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        fadeUp: "fadeUp 1s ease-out forwards",
        float: "float 4s ease-in-out infinite",
        "gradient-x": "gradientX 15s ease infinite",
        waveMotion: "waveMotion 1.5s ease-in-out infinite",
        "spin-slow": "spin 10s linear infinite",
        slideInLeft: "slideInLeft 1s ease forwards",
        slideUp: "slideUp 1s ease forwards",
      },
      backgroundSize: {
        "200%": "200% 200%",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-glow": {
          textShadow: "0 0 8px #00CED1, 0 0 16px #00CED1",
        },
        ".text-glow-lg": {
          textShadow: "0 0 12px #00CED1, 0 0 24px #00CED1",
        },
        ".text-glow-cyan": {
          textShadow: "0 0 10px #00FFFF, 0 0 20px #00FFFF",
        },
      });
    },
  ],
};
