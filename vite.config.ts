import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import UnFonts from "unplugin-fonts/vite"; 


export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    
    UnFonts({
      google: {
        families: [
          {
            name: "Poppins",
            styles: "wght@300;400;500;600;700;800",
            defer: true,
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));  
