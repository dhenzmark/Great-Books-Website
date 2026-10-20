<script setup>
/*
  The journey map stays closed (and unloaded) until the reader asks for it.
  A click outside it (or Esc) pauses it; its close button closes it.
*/
import { ref, nextTick, onBeforeUnmount, defineAsyncComponent } from "vue";
import { prefersReducedMotion } from "../../composables/motion.js";
import stops from "../../data/odyssey/stops.js";
import "../../styles/odyssey-map.css";

const OdysseyMap = defineAsyncComponent(() => import("./OdysseyMap.vue"));

const open = ref(false);
const box = ref(null);
const opener = ref(null);
const behavior = () => (prefersReducedMotion() ? "auto" : "smooth");

const paused = ref(false);

/* clicking outside (or Esc) pauses the map; clicking the map again picks it back up */
function onPointerDown(e) {
  if (!box.value) return;
  const inside = box.value.contains(e.target);
  if (!inside) paused.value = true;
  else if (paused.value && !e.target.closest(".odm-x")) paused.value = false;
}
function onKey(e) {
  if (e.key === "Escape") paused.value = true;
}

async function show() {
  paused.value = false;
  open.value = true;
  await nextTick();
  const toMap = () => box.value?.scrollIntoView({ behavior: behavior(), block: "start" });
  setTimeout(toMap, 80);
  setTimeout(toMap, 700); // again once the map has loaded and taken its full height
  /* listen after this click has finished, so it doesn't count as "outside" */
  setTimeout(() => {
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
  });
}

function stopListening() {
  document.removeEventListener("pointerdown", onPointerDown);
  document.removeEventListener("keydown", onKey);
}

function hide() {
  if (!open.value) return;
  stopListening();
  open.value = false;
  /* the page just got much shorter: bring the reader back to the button */
  nextTick(() => {
    opener.value?.scrollIntoView({ behavior: "auto", block: "center" });
    opener.value?.focus({ preventScroll: true });
  });
}

onBeforeUnmount(stopListening);
</script>

<template>
  <div class="odm-toggle">
    <button v-if="!open" ref="opener" type="button" class="odm-open" @click="show">
      <span class="odm-open-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" /><path d="M9 4v14M15 6v14" /></svg>
      </span>
      <span class="odm-open-text">
        <strong>Follow the journey on the map</strong>
        <small>{{ stops.length }} stops from Troy to Ithaca · scroll to sail along</small>
      </span>
      <span class="odm-open-arrow" aria-hidden="true">→</span>
    </button>

    <div v-else ref="box" class="odm-open-box">
      <p class="odm-open-title">The wanderings of Odysseus <span>· click outside the map or press Esc to pause it</span></p>
      <OdysseyMap :paused="paused" @close="hide" @resume="paused = false" />
    </div>
  </div>
</template>
