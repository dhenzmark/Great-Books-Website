import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import reveal from "./directives/reveal.js";
import parallax from "./directives/parallax.js";
import "./styles/style.css";
import "./styles/motion.css";

createApp(App)
  .use(router)
  .directive("reveal", reveal)
  .directive("parallax", parallax)
  .mount("#app");

/* cache the site's files and fonts for faster repeat visits (built site only, not in dev) */
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {}));
}
