/*
  v-reveal: fades and lifts an element in as it scrolls into view, in both directions.
  Scrolling down, things rise in from below; scrolling back up, they drop in from above.
  Once an element is completely off screen it quietly resets, ready to play again.
  Elements that arrive together are staggered top-to-bottom, left-to-right.
  Optional value: extra delay in ms, e.g. v-reveal="200".
*/
import { prefersReducedMotion } from "../composables/motion.js";

const STAGGER_MS = 90;
const MAX_STEPS = 6;
let enter = null;
let leave = null;

function observers() {
  if (enter) return;
  /* arriving: 8% of it showing, or (for very tall elements) a good slice of it */
  enter = new IntersectionObserver(
    (entries) => {
      const arrived = entries
        .filter((e) => e.isIntersecting && !e.target.classList.contains("in") && (e.intersectionRatio >= 0.08 || e.intersectionRect.height >= 160))
        .map((e) => ({ el: e.target, box: e.boundingClientRect }))
        .sort((a, b) => a.box.top - b.box.top || a.box.left - b.box.left);
      arrived.forEach(({ el }, i) => {
        const delay = Math.min(i, MAX_STEPS) * STAGGER_MS + Number(el.dataset.revealDelay || 0);
        if (delay) {
          el.style.setProperty("--d", `${delay}ms`);
          setTimeout(() => el.style.removeProperty("--d"), delay + 1600);
        }
        el.classList.add("in");
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: [0, 0.02, 0.05, 0.08] }
  );
  /* gone: entirely off screen, so resetting it is never seen; remember which side it left by */
  leave = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting || !e.target.classList.contains("in")) continue;
        e.target.dataset.from = e.boundingClientRect.top < 0 ? "above" : "below";
        e.target.classList.remove("in");
      }
    },
    { rootMargin: "60px 0px" }
  );
}

export default {
  mounted(el, binding) {
    el.classList.add("reveal");
    if (binding.value) el.dataset.revealDelay = binding.value;
    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      el.classList.add("in");
      return;
    }
    observers();
    enter.observe(el);
    leave.observe(el);
  },
  unmounted(el) {
    if (enter) enter.unobserve(el);
    if (leave) leave.unobserve(el);
  },
};
