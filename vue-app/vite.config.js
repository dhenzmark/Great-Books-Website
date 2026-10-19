import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  /* "/" on Vercel; the GitHub Pages workflow sets BASE_PATH=/Great-Books-Website/ */
  base: process.env.BASE_PATH || "/",
});
