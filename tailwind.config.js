/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: { raw: "(min-height: 800px) and (min-width:1280px)" },
    },
    extend: {
      colors: {
        yellow:"#FEAA1A",
        red: {
          100: "rgba(210, 4, 45,0.1)",
          500: "rgba(210, 4, 45,0.5)",
          1: "rgb(210, 4, 45)",
        },
        blue: "#77CCFF",
        white: "#F6F4F4",
        purple: {
          500: "rgba(134,133,239,0.5)",
          1: "rgb(134,133,239)",
        },
        black: "#020202",
        gray: {
          100: "rgba(89, 89, 89,0.1)",
          1: "rgb(	89, 89, 89)",
        },
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        bolder: "800",
        black: "900",
      },
      fontFamily: {
        "antic-didone": "Antic Didone, ui-san-serif",
        lato: "Lato, ui-san-serif",
      },
      zIndex: {
        0: 0,
        1: 1,
        2: 2,
        999: 999,
        9999: 9999,
      },
      spacing: {
        0: 0,
        1: "1px",
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        24: "24px",
        32: "32px",
        40: "40px",
        48: "48px",
        64: "64px",
        72: "72px",
        80: "80px",
        96: "96px",
        128: "128px",
        192: "192px",
        256: "256px",
        320: "320px",
        416: "416px",
        512: "512px",
        768: "768px",
        1024: "1024px",
      },
      minHeight: {
        128: "128px",
        192: "192px",
        256: "256px",
        320: "320px",
        416: "416px",
        512: "512px",
        768: "768px",
        1024: "1024px",
      },
    },
  },
  plugins: [],
};
