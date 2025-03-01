import { defineConfig } from "vite";

// https://vite.dev/config/

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "ui-libraries": [
            "@mui/material",
            "@mui/icons-material",
            "framer-motion",
          ],
          "ui-lib": ["lodash", "axios"], // Divide bibliotecas pesadas
        },
      },
    },
  },
});
