<script setup>
defineProps({
  text: { type: String, required: true },
  cite: { type: String, required: true },
});
</script>

<template>
  <figure class="quote">
    <blockquote><p>{{ text }}</p></blockquote>
    <figcaption><cite>{{ cite }}</cite></figcaption>
  </figure>
</template>
