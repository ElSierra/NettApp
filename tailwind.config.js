/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#806101",
        secondary: "#002C8B",
        lightText: "#E5E5EA",
        lightBorder: "#404040",
        primaryLight: "#564e38",
        secondaryLight: "#2779bd",
        darkTheme: "#111111",
        dark: "#333",
        slate: "#8A939E",
        authDark: "#767680",
        borderColor: "#CCCCCC",
        darkNeutral: "#1C1C1E",
        successAlert: "#bdf3bd",
        errorAlert: "#ff0000",
        warningAlert: "#f0f078",
        infoAlert: "#ddddff",
        successText: "#0e610e",
        errorText: "#f08e8e",
        warningText: "#f0f078",
        infoText: "#5151ff",
      },
      fontFamily: {
        OSReg: ["OpenSans-Regular"],
        OSBold: ["OpenSans-Bold"],
        OSRSemiB: ["OpenSans-SemiBold"],
        OSLight: ["OpenSans-Light"],
      },
    },
  },
  plugins: [],
};
