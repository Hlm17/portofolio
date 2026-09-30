import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Palet hilmi.work. Dipakai bersama oleh halaman profil dan halaman
        // produk supaya keduanya terasa satu tangan yang sama.
        // Sumber: gradien Aurora di halaman profil (#3A29FF, #FF94B4, #FF3232)
        // plus chip cyan pada teks berputar.
        brand: {
          blue: "#3A29FF",
          pink: "#FF94B4",
          red: "#FF3232",
          cyan: "#67E8F9",
          ink: "#08080C",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(90deg, #3A29FF 0%, #FF94B4 55%, #FF3232 100%)",
      },
      fontFamily: {
        display: ["var(--font-geist-sans)", "Outfit", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
export default config;
