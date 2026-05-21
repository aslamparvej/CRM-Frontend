/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
   content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
       colors: {
        primary: {
          color: "#EEB30D"
        },

        navy: {
          50: "#E8EDF5",
          100: "#C2CEDE",
          500: "#2D4A72",
          700: "#162B4D",
          900: "#080F1E",
        },
      },
    },
  },
  plugins: [],
}