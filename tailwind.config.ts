import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        surface: "#111827",
        "surface-card": "rgba(31, 41, 55, 0.6)",
        accent: {
          indigo: "#6366F1",
          emerald: "#10B981",
          amber: "#F59E0B",
          pink: "#EC4899",
          violet: "#8B5CF6",
          rose: "#F43F5E",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
