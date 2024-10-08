import type { Config } from "tailwindcss";

import baseConfig from "@chooseresto/tailwind-config";

export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend Deca", "sans-serif"],
      },
    },
  },
} satisfies Config;
