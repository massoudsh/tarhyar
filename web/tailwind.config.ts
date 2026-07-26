import type { Config } from "tailwindcss";

// طرح‌یار design system — industrial architecture / material grid
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          white: "#FEFCF9",
          grey: "#F0E5D3",
          "grey-deep": "#cfc7ba",
        },
        charcoal: "#222222",
        accent: {
          olive: "#5B5B5D",
          bronze: "#6D8598",
        },
        espresso: {
          DEFAULT: "#222222",
          light: "#303032",
          border: "#5B5B5D",
        },
        material: {
          plaster: "#FEFCF9",
          glass: "#6D8598",
          asphalt: "#222222",
          sand: "#F0E5D3",
          concrete: "#5B5B5D",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        persian: ["var(--font-persian)", "Tahoma", "sans-serif"],
        display: ["var(--font-display)", "var(--font-persian)", "Tahoma", "sans-serif"],
      },
      maxWidth: {
        content: "86rem",
      },
      borderRadius: {
        "arch-sm": "var(--radius-sm)",
        "arch-md": "var(--radius-md)",
        "arch-lg": "var(--radius-lg)",
        "arch-xl": "var(--radius-xl)",
      },
      boxShadow: {
        "arch-sm": "var(--shadow-sm)",
        "arch-md": "var(--shadow-md)",
        "arch-lg": "var(--shadow-lg)",
      },
    },
  },
  plugins: [],
} satisfies Config;
