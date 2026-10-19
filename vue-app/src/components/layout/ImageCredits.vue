<script setup>
import credits from "../../data/credits.js";
</script>

<template>
  <details class="credits-box">
    <summary>
      <span>Image credits</span><small>{{ credits.length }} public-domain artworks</small>
      <svg viewBox="0 0 14 8" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M1 1l6 6 6-6" /></svg>
    </summary>
    <ol class="credits">
      <li v-for="credit in credits" :key="credit">{{ credit }}</li>
    </ol>
  </details>
</template>
