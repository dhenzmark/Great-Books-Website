<script setup>
defineProps({
  exhibit: { type: Object, required: true }, // { href, src, alt, objectPosition, title, meta, text }
});
</script>

<template>
  <RouterLink class="exhibit" :to="exhibit.href">
    <div class="img">
      <img v-parallax="0.04" :src="exhibit.src" :alt="exhibit.alt" loading="lazy" decoding="async" :style="exhibit.objectPosition ? { objectPosition: exhibit.objectPosition } : null" />
    </div>
    <div class="body">
      <h3>{{ exhibit.title }}</h3>
      <p class="meta">{{ exhibit.meta }}</p>
      <p>{{ exhibit.text }}</p>
    </div>
    <span class="arrow" aria-hidden="true">
      <svg viewBox="0 0 26 12" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M1 6h23M19 1l5 5-5 5" /></svg>
    </span>
  </RouterLink>
</template>
