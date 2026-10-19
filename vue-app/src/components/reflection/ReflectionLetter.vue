<script setup>
import letter from "../../data/reflection.js";
import { author } from "../../data/site.js";
</script>

<template>
  <article class="letter">
    <component :is="block.tag" v-for="(block, i) in letter" :key="i" v-reveal v-html="block.html" />
    <p v-reveal class="signature">{{ author }}</p>
    <p v-reveal style="font-size: 0.9rem; color: var(--muted)">4th Year BS Information Technology, GEC-GB-NRn 1454</p>
  </article>
</template>
