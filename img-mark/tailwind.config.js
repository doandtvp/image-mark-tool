/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        overlay: "rgba(24, 24, 24, 0.40)",
        modal: "#F8F8F8",
        header: "#404A60",
        description: "#8FA0C5",
        wrapper: "#F8F8F8",
        textBlack: "#333333",
        borderTop: "#E3E3E3",
        buttonConfirm: "#3E93E8",
        buttonPreview: "#2EA2C7",
        borderRight: "#ECECEC",
        textTab: "#666666",
      },
      boxShadow: {
        modalBox: "0px 2px 8px 0px rgba(51, 51, 51, 0.12)",
        imgBox: "0px 0px 4px 0px rgba(0, 0, 0, 0.12)",
        footerBox: "0px -2px 4px 0px rgba(0, 0, 0, 0.06)",
      },
      padding: {
        space6: "6px",
        sm: "10px",
      },
      borderWidth: {
        borderMin: "1px",
      },
    },
  },
  plugins: [],
};
