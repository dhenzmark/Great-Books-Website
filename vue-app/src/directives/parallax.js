/*
  v-parallax: put on an <img> inside a clipped frame. As the frame scrolls through
  the screen the picture drifts slightly against it. Value = strength as a share of
  the frame height (default 0.05). Pass false to switch it off.

  Smooth: each picture eases toward where it should be (instead of jumping with each
  scroll step), so wheel ticks and flicks on a phone glide. Cheap: only pictures near
  the screen are updated, all measuring happens before any writing, and only
  `transform` changes, which the GPU moves without repainting. The loop stops as soon
  as everything has settled.
*/
import { prefersReducedMotion } from "../composables/motion.js";

const EASE = 0.12; // share of the remaining distance covered each frame
const visible = new Set();
let io = null;
let frame = 0;

function targetOffset(el, box, vh) {
  const progress = (box.top + box.height / 2 - vh / 2) / (vh / 2 + box.height / 2);
  return -Math.max(-1, Math.min(1, progress)) * box.height * el._parallax;
}

function tick() {
  frame = 0;
  const vh = window.innerHeight;
  const boxes = [];
  for (const el of visible) boxes.push([el, el._frame.getBoundingClientRect()]);
  let moving = false;
  for (const [el, box] of boxes) {
    const target = targetOffset(el, box, vh);
    if (el._y === undefined) el._y = target; // first sight: start in place, no jump
    const diff = target - el._y;
    if (Math.abs(diff) > 0.05) {
      el._y += diff * EASE;
      moving = true;
    } else el._y = target;
    el.style.transform = `translate3d(0, ${el._y.toFixed(2)}px, 0)`;
  }
  if (moving) frame = requestAnimationFrame(tick);
}

function schedule() {
  if (!frame && visible.size) frame = requestAnimationFrame(tick);
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
          el._y = undefined;
        }
      }
      schedule();
    },
    { rootMargin: "160px 0px" }
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
