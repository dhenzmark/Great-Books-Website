<script setup>
import lessons from "../../data/lessons.js";
</script>

<template>
  <div class="lessons">
    <div v-for="lesson in lessons" :key="lesson.title" v-reveal class="lesson">
      <h3>{{ lesson.title }}</h3>
      <p v-html="lesson.html"></p>
    </div>
  </div>
</template>
