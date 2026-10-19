<script setup>
/* A quotation beside a personal note ("My Insight"). Put the note's <p> in the slot. */
import PullQuote from "./PullQuote.vue";

defineProps({
  quote: { type: String, required: true },
  cite: { type: String, required: true },
  heading: { type: String, default: "My Insight" },
});
</script>

<template>
  <div class="work-foot">
    <PullQuote :text="quote" :cite="cite" />
    <div class="insight">
      <h4>{{ heading }}</h4>
      <slot />
    </div>
  </div>
</template>
