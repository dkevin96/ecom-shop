module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "landscape": "url('/src/img/login.jpg')",
        "landscape5": "url('/src/img/landscape5.svg')",
        "register" : "url('/src/img/register.jpg')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
