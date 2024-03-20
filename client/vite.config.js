import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // Proxy configuration for API requests
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Target URL for proxying API requests
        secure: false, // Disable SSL certificate validation
      },
    },
  },
  plugins: [react()],
});
