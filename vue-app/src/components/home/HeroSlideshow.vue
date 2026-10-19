<script setup>
/* The big black-and-white picture on the home page, with the 1/4 counter. */
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { heroSlides as slides } from "../../data/site.js";
import { prefersReducedMotion } from "../../composables/motion.js";

const INTERVAL_MS = 6000;
const current = ref(0);
const direction = ref("up");
const slide = computed(() => slides[current.value]);
let timer = null;

function go(step) {
  direction.value = step > 0 ? "up" : "down";
  current.value = (current.value + step + slides.length) % slides.length;
}

function autoplay() {
  clearInterval(timer);
  if (!prefersReducedMotion() && !document.hidden) timer = setInterval(() => go(1), INTERVAL_MS);
}

function step(n) {
  go(n);
  autoplay();
}

onMounted(() => {
  slides.slice(1).forEach((s) => (new Image().src = s.src)); // no blank frame on first switch
  autoplay();
  document.addEventListener("visibilitychange", autoplay);
});
onBeforeUnmount(() => {
  clearInterval(timer);
  document.removeEventListener("visibilitychange", autoplay);
});
</script>

<template>
  <div class="hero-slides" aria-live="polite">
    <Transition name="slide">
      <figure :key="current">
        <img :src="slide.src" :alt="slide.alt" :fetchpriority="current === 0 ? 'high' : undefined" />
        <figcaption>{{ slide.caption }}</figcaption>
      </figure>
    </Transition>
  </div>

  <div class="counter" aria-label="Hero pictures">
    <button type="button" aria-label="Previous picture" @click="step(-1)">
      <svg viewBox="0 0 30 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M29 7H2M8 1L2 7l6 6" /></svg>
    </button>
    <span>
      <sup class="digits"><Transition :name="`roll-${direction}`"><span :key="current">{{ current + 1 }}</span></Transition></sup>/<sub>{{ slides.length }}</sub>
    </span>
    <button type="button" aria-label="Next picture" @click="step(1)">
      <svg viewBox="0 0 30 14" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M1 7h27M22 1l6 6-6 6" /></svg>
    </button>
  </div>
</template>
