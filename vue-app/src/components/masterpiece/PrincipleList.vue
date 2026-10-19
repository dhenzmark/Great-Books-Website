<script setup>
import principles from "../../data/principles.js";
</script>

<template>
  <h2 v-reveal class="subhead" style="margin-bottom: 24px">Four reasons this work stays with me</h2>
  <div class="principles">
    <div v-for="p in principles" :key="p.glyph" v-reveal class="principle">
      <div class="principle-glyph" lang="grc">{{ p.glyph }}<small>{{ p.gloss }}</small></div>
      <div>
        <h3>{{ p.title }}</h3>
        <p>{{ p.text }}</p>
      </div>
    </div>
  </div>
</template>
