/** @type {import('tailwindcss').Config} */

import { tailwindColors } from "./src/constants/colors";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: { colors: tailwindColors },
  },
  plugins: [],
};
