<script setup>
defineProps({
  id: { type: String, default: undefined },
  title: { type: String, required: true },
  lead: { type: String, default: undefined },
  center: { type: Boolean, default: false },
});
</script>

<template>
  <div v-reveal class="section-head" :class="{ center }">
    <h2 :id="id"><slot name="title">{{ title }}</slot></h2>
    <p v-if="lead" class="lead">{{ lead }}</p>
  </div>
</template>
