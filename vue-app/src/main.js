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
