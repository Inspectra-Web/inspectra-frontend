/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mindesktop: { max: "75em" } /* 1,200px */,
      bigtablet: { max: "73.13em" } /* 1,170.08px */,
      midtablet: { max: "70.6em" } /* 1,129.6px */,
      smtablet: { max: "59.4em" } /* 950.4px */,
      bigmobile: { max: "50em" } /* 800px */,
      midmobile: { max: "37.5em" } /* 600px */,
      smmobile: { max: "30em" } /* 480px */,
      sm: { max: "23.4em" } /* 374.4px */,
      xsm: { max: "21.875em" } /* 350px */,
    },
    extend: {
      colors: {
        grey: "#a8b2b5",
        // blue: "#1DB2FF",
        // darkBlue: "#0D6EFC",
      },
      backgroundColor: {
        grey: "#29323A",
        lightGrey: "#F9F9FC",
      },
      fontSize: {
        sm: "1.4rem",
        bt: "1.6rem",
        lg: "1.8rem",
        elg: "2rem",
        xlg: "2.8rem",
        heading: "2.4rem",
        huge: "3.2rem",
      },
      boxShadow: {
        shadowcustom: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
      },
    },
  },
  plugins: [],
};
