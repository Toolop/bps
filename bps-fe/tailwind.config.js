/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        monserrat: ["Monserrat"],
      },
      fontWeight: {
        medium: 500,
        regular: 400,
      },
      colors: {
        primary: "#435FA5",
        "primary-variant": "#408EFD",
        tertiary: "#6574cd",
        background: "#F3F4F6",
      },
      backgroundImage: {
        login: "url('/public/login.svg')",
      },
    },
  },
  plugins: [],
};
