import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Cấu hình cổng
    open: true, // Mở trình duyệt tự động
  },
  silenceDeprecations: ["legacy-js-api"],
});
