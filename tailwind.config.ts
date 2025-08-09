import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        decoration: {
          pink: "#EC4899",
          blue: "#60A5FA",
          orange: "#F97316",
          yellow: "#F59E0B",
        },
      },
      boxShadow: {
        button: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
        "card-hover": "0 10px 25px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;


