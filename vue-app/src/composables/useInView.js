import { ref, onMounted, onBeforeUnmount } from "vue";
import { prefersReducedMotion } from "./motion.js";

/* Becomes true once (and stays true) when the element first scrolls into view. */
export function useInView(target, { threshold = 0.35 } = {}) {
  const seen = ref(false);
  let io = null;

  onMounted(() => {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      seen.value = true;
      return;
    }
    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          seen.value = true;
          io.disconnect();
        }
      },
      { threshold }
    );
    if (target.value) io.observe(target.value);
  });
  onBeforeUnmount(() => io && io.disconnect());

  return seen;
}
