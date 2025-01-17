import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          main: "#00a0af",
          50: "#BEDEE1",
          100: "#cdfffd",
          200: "#a1fffe",
          300: "#60feff",
          400: "#18f2f8",
          500: "#00d5de",
          600: "#00a0af",
          700: "#088696",
          800: "#106b7a",
          900: "#125967",
        },
        secondary: {
          main: "#666666",
          100: "#E6F6F7",
          200: "#c8c8c8",
          300: "#a4a4a4",
          400: "#818181",
          500: "#666666",
          600: "#515151",
          700: "#434343",
          800: "#383838",
          900: "#313131",
        },
        danger: {
          main: "#d30030",
          100: "#ffe1e3",
          200: "#ffc8ce",
          300: "#ff9ba6",
          400: "#ff6378",
          500: "#ff2c4e",
          600: "#f60838",
          700: "#d30030",
          800: "#ae032f",
          900: "#940730",
        },
        warning: {
          main: "#ffc000",
          50: "#fefce8",
          100: "#fffbc5",
          200: "#fff885",
          300: "#ffee46",
          400: "#ffdf1b",
          500: "#ffc000",
          600: "#e29400",
          700: "#bb6902",
          800: "#985108",
          900: "#7c420b",
        },
        success: {
          main: "#2e994d",
          100: "#e1f7e6",
          200: "#c4eed0",
          300: "#95e0aa",
          400: "#60c87e",
          500: "#3aad5b",
          600: "#2e994d",
          700: "#25703b",
          800: "#225933",
          900: "#1d4a2b",
        },
        info: {
          main: "#308aaa",
          50: "#f0fafb",
          100: "#d9eff4",
          200: "#b7dfea",
          300: "#85c7db",
          400: "#4ca6c4",
          500: "#308aaa",
          600: "#2e7899",
          700: "#295c75",
          800: "#294e61",
          900: "#264253",
          950: "#142a38",
        },
        "gray-scale": {
          600: "#aaaaaa",
          700: "#888888",
          800: "#444444",
          900: "#000000",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), nextui()],
  safelist: [
    "bg-primary",
    "fill-gray-scale-800",
    "fill-gray-scale-900",
    {
      pattern:
        /(bg|border|text|fill)-(primary|secondary|danger|warning|success|info|amber|violet|rose|fuchsia)-(main|800|600|500|50)/,
      variants: ["hover", "focus", "active"],
    },
  ],
} satisfies Config;

export default config;
