<script setup>
/* Round "back to top" button, bottom right. Its gold ring fills as you read down the page. */
import { ref, onMounted, onBeforeUnmount } from "vue";
import { prefersReducedMotion } from "../../composables/motion.js";

const R = 24;
const LEN = 2 * Math.PI * R;
const on = ref(false);
const ring = ref(null);
let queued = false;

function update() {
  queued = false;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  on.value = window.scrollY > window.innerHeight * 0.8;
  if (ring.value) ring.value.style.strokeDashoffset = (LEN * (1 - p)).toFixed(1);
}
function schedule() {
  if (!queued) {
    queued = true;
    requestAnimationFrame(update);
  }
}
function toTop() {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  document.getElementById("main")?.focus?.({ preventScroll: true });
}

onMounted(() => {
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
});
</script>

<template>
  <button type="button" class="to-top" :class="{ 'is-on': on }" :tabindex="on ? 0 : -1" aria-label="Back to top" @click="toTop">
    <svg viewBox="0 0 52 52" aria-hidden="true">
      <circle class="ring-track" cx="26" cy="26" :r="R" />
      <circle ref="ring" class="ring" cx="26" cy="26" :r="R" :stroke-dasharray="LEN" :stroke-dashoffset="LEN" />
      <path class="arrow" d="M26 33V19M20 25l6-6 6 6" />
    </svg>
  </button>
</template>
