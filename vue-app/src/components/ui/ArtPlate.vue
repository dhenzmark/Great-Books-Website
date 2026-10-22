<script setup>
/* A framed painting with an optional "View more" button and caption. */
import { computed } from "vue";
import LookButton from "./LookButton.vue";

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  objectPosition: { type: String, default: undefined },
  fit: { type: String, default: undefined }, // "contain" shows the whole picture
  wide: { type: Boolean, default: false },
  aspect: { type: String, default: undefined }, // e.g. "3/4"
  look: { type: Object, default: undefined },
  caption: { type: String, default: undefined },
});

/* paintings shown whole (contain) would reveal their edges if they drifted */
const parallax = computed(() => (props.fit === "contain" ? false : 0.05));
</script>

<template>
  <figure class="plate">
    <slot name="before" />
    <div class="plate-frame">
      <div class="plate-window" :class="{ contain: fit === 'contain', wide }" :style="aspect ? { aspectRatio: aspect } : null">
        <img v-parallax="parallax" :src="src" :alt="alt" loading="lazy" decoding="async" :style="objectPosition ? { objectPosition } : null" />
      </div>
      <LookButton v-if="look" :painting="look" :alt="alt" />
    </div>
    <figcaption v-if="caption">{{ caption }}</figcaption>
    <slot />
  </figure>
</template>
