<script setup>
/* A number that counts up from zero the first time it scrolls into view. */
import { ref, computed, watch } from "vue";
import { useInView } from "../../composables/useInView.js";
import { prefersReducedMotion } from "../../composables/motion.js";

const props = defineProps({
  to: { type: Number, required: true },
  suffix: { type: String, default: "" },
  duration: { type: Number, default: 1600 },
});

const el = ref(null);
const seen = useInView(el, { threshold: 0.6 });
const value = ref(0);

watch(seen, (on) => {
  if (!on) return;
  if (prefersReducedMotion()) return (value.value = props.to);
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - start) / props.duration);
    value.value = Math.round(props.to * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});

const label = computed(() => `${props.to.toLocaleString("en-US")}${props.suffix}`);
</script>

<template>
  <p ref="el" class="big-num">
    <span class="sr-only">{{ label }}</span>
    <span aria-hidden="true">{{ value.toLocaleString("en-US") }}{{ suffix }}</span>
  </p>
</template>
