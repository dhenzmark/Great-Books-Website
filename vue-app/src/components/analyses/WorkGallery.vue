<script setup>
import ArtPlate from "../ui/ArtPlate.vue";

defineProps({
  title: { type: String, required: true },
  paintings: { type: Array, required: true }, // [{ src, alt, objectPosition, look, title, text }]
});
</script>

<template>
  <h4 v-reveal class="subhead">{{ title }}</h4>
  <div class="trio">
    <ArtPlate
      v-for="p in paintings"
      :key="p.src"
      v-reveal
      :src="p.src"
      :alt="p.alt"
      :object-position="p.objectPosition"
      :look="p.look"
    >
      <h4>{{ p.title }}</h4>
      <p>{{ p.text }}</p>
    </ArtPlate>
  </div>
</template>
