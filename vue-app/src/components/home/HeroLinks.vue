<script setup>
/* Three cards under the hero. The third shows a different painting each day. */
import { paintingsOfTheDay } from "../../data/site.js";

const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
const today = paintingsOfTheDay[dayOfYear % paintingsOfTheDay.length];

const cards = [
  { to: "/analyses", src: "assets/img/mahabharata-razmnama.jpg", alt: "Mughal miniature of a river of fire over a battlefield", objectPosition: "50% 65%", label: "Analyses", title: "Seven close readings", text: "Plot, characters, themes, craft and context" },
  { to: "/masterpiece", src: "assets/img/iliad-matsch-triumph.jpg", alt: "Achilles in his chariot before the walls of Troy", label: "Favorite masterpiece", title: "The Iliad", text: "Why the rage of Achilles stays with me" },
  { to: today.to, src: today.src, alt: today.alt, label: "Painting of the day", title: today.title, text: today.by },
];
</script>

<template>
  <div class="hero-row">
    <RouterLink v-for="card in cards" :key="card.label" :to="card.to">
      <div class="img"><img :src="card.src" :alt="card.alt" loading="lazy" :style="card.objectPosition ? { objectPosition: card.objectPosition } : null" /></div>
      <p class="label">{{ card.label }}</p>
      <strong>{{ card.title }}</strong>
      <small>{{ card.text }}</small>
    </RouterLink>
  </div>
</template>
