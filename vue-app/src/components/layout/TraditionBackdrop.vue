<script setup>
/*
  The fixed background behind every page. The four traditions of the portfolio each have
  a gold line-art motif and a tint; the one for the work being read fades in, and pages
  that cover all seven works show the four together. Only opacity changes, on fixed
  layers, so it costs nothing while scrolling.
*/
import { watch } from "vue";
import { useRoute } from "vue-router";
import { backdrop } from "../../composables/backdrop.js";
import hebrew from "../../assets/motif-hebrew.svg";
import indian from "../../assets/motif-indian.svg";
import greek from "../../assets/motif-greek.svg";
import french from "../../assets/motif-french.svg";

const motifs = { hebrew, indian, greek, french };
const route = useRoute();

/* each page's default; the Analyses page changes it as you read */
watch(
  () => route.path,
  (path) => (backdrop.tradition = path === "/masterpiece" ? "greek" : "all"),
  { immediate: true }
);
</script>

<template>
  <div class="tb" aria-hidden="true">
    <div class="tb-layer tb-all" :class="{ on: backdrop.tradition === 'all' }">
      <i v-for="(src, name) in motifs" :key="name" :class="`tb-corner is-${name}`" :style="{ backgroundImage: `url(${src})` }"></i>
    </div>
    <div v-for="(src, name) in motifs" :key="name" class="tb-layer" :class="[`is-${name}`, { on: backdrop.tradition === name }]">
      <i class="tb-motif" :style="{ backgroundImage: `url(${src})` }"></i>
    </div>
    <div class="tb-grain"></div>
  </div>
</template>
