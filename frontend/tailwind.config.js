module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,vue}"],
  plugins: [require("daisyui")],
  // purge: [
  //   "./components/**/*.{vue,js}",
  //   "./layouts/**/*.vue",
  //   "./pages/**/*.vue",
  //   "./plugins/**/*.{js,ts}",
  //   "./nuxt.config.{js,ts}",
  // ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#070707",
        success: "#a991f7",
        color1: "#a991f7",
        color2: "#37cdbe",
        color3: "#3d4451",
        color4: "#ffffff",
      },
    },
  },
};

/* @import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

body,
html {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
} */
