/*
  v-reveal: fades and lifts an element in the first time it scrolls into view.
  Elements that arrive together are staggered top-to-bottom, left-to-right.
  Optional value: extra delay in ms, e.g. v-reveal="200".
*/
import { prefersReducedMotion } from "../composables/motion.js";

const STAGGER_MS = 90;
const MAX_STEPS = 6;
let io = null;

function getObserver() {
  if (io) return io;
  io = new IntersectionObserver(
    (entries) => {
      const arrived = entries
        .filter((e) => e.isIntersecting)
        .map((e) => ({ el: e.target, box: e.boundingClientRect }))
        .sort((a, b) => a.box.top - b.box.top || a.box.left - b.box.left);
      arrived.forEach(({ el }, i) => {
        io.unobserve(el);
        const delay = Math.min(i, MAX_STEPS) * STAGGER_MS + Number(el.dataset.revealDelay || 0);
        if (delay) {
          el.style.setProperty("--d", `${delay}ms`);
          setTimeout(() => el.style.removeProperty("--d"), delay + 1600);
        }
        el.classList.add("in");
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  return io;
}

export default {
  mounted(el, binding) {
    el.classList.add("reveal");
    if (binding.value) el.dataset.revealDelay = binding.value;
    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      el.classList.add("in");
      return;
    }
    getObserver().observe(el);
  },
  unmounted(el) {
    if (io) io.unobserve(el);
  },
};
