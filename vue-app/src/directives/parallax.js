/*
  v-parallax: put on an <img> inside a clipped frame. As the frame scrolls through
  the screen the picture drifts slightly against it. Value = strength as a share of
  the frame height (default 0.05). Pass false to switch it off.

  Kept cheap on purpose: only pictures near the screen are updated, all measuring
  happens before any writing (one layout per frame at most), and only `transform`
  changes, which the browser can move without repainting.
*/
import { prefersReducedMotion } from "../composables/motion.js";

const visible = new Set();
let io = null;
let queued = false;

function update() {
  queued = false;
  const vh = window.innerHeight;
  const boxes = [];
  for (const el of visible) boxes.push([el, el.parentElement.getBoundingClientRect()]);
  for (const [el, box] of boxes) {
    const progress = (box.top + box.height / 2 - vh / 2) / (vh / 2 + box.height / 2);
    const p = Math.max(-1, Math.min(1, progress));
    el.style.transform = `translate3d(0, ${(-p * box.height * el._parallax).toFixed(1)}px, 0)`;
  }
}

function schedule() {
  if (!queued && visible.size) {
    queued = true;
    requestAnimationFrame(update);
  }
}

function getObserver() {
  if (io) return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const el = e.target._parallaxImg;
        if (e.isIntersecting) {
          visible.add(el);
          el.style.willChange = "transform";
        } else {
          visible.delete(el);
          el.style.willChange = "";
        }
      }
      schedule();
    },
    { rootMargin: "120px 0px" }
  );
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  return io;
}

export default {
  mounted(el, binding) {
    if (binding.value === false || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    el._parallax = typeof binding.value === "number" ? binding.value : 0.05;
    el.setAttribute("data-parallax", "");
    el._frame = el.parentElement;
    el._frame._parallaxImg = el;
    getObserver().observe(el._frame);
  },
  unmounted(el) {
    if (!el._parallax) return;
    visible.delete(el);
    if (io) io.unobserve(el._frame);
  },
};
