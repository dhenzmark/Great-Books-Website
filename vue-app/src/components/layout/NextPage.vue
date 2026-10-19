<script setup>
import { useCardTransition } from "../../composables/pageTransition.js";

defineProps({
  to: { type: String, required: true },
  eyebrow: { type: String, default: "Next page" },
  title: { type: String, required: true },
});
</script>

<template>
  <section class="section next-section" :aria-label="eyebrow">
    <div class="wrap">
      <RouterLink v-reveal class="next-page" :to="to" @click="useCardTransition">
        <span><small>{{ eyebrow }}</small><strong>{{ title }}</strong></span>
        <svg viewBox="0 0 40 20" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M1 10h36M29 2l8 8-8 8" /></svg>
      </RouterLink>
    </div>
  </section>
</template>
