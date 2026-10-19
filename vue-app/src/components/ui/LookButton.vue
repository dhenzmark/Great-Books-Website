<script setup>
import { openPainting } from "../../composables/useLightbox.js";

const props = defineProps({
  painting: { type: Object, required: true }, // { src, title, caption, text }
  alt: { type: String, default: "" },
});

function open(e) {
  openPainting({ ...props.painting, alt: props.alt }, e.currentTarget);
}
</script>

<template>
  <button class="look" type="button" @click="open">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3M11 8v6M8 11h6" /></svg>Look closer
  </button>
</template>
