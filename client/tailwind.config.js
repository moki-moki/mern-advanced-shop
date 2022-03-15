module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkmode: false,
  theme: {
    screens: {
      xsm: { min: "300px", max: "500px" },

      sm: { min: "505px", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }
    },
    fontSize: {
      "7xl": "84px",
      "6xl": "72px",
      "5xl": "60px",
      "4xl": "48px",
      "3xl": "36px",
      "2xl": "30px",
      xl: "24px",
      lg: "18px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      // BACKGROUND COLORS
      primary: "#ECECEC",
      "card-color": "#fdfdfd",
      // TEXT COLORS
      "sub-heading": "#E87A12",
      "p-primary": "#030303",
      "link-color": "#2DD4BF",
      "link-hover": "#6fffe9",
      // BORDER COLORS
      "border-color": "#2DD4BF",
      "sale-primary": "#C72222",
      "price-primary": "#19B43B",
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(calc(-140px * 6))" },
        },
      },
      animation: {
        slide: "slide 20s linear infinite",
      },
    },
  },
  plugins: [],
};
