<script setup>
/* Key facts and themes under the poster (the date and hook are on the poster itself). */
defineProps({
  work: { type: Object, required: true },
});
</script>

<template>
  <div class="work-facts">
    <dl class="work-meta">
      <div v-for="[term, detail] in work.meta" :key="term">
        <dt>{{ term }}</dt>
        <dd>{{ detail }}</dd>
      </div>
    </dl>
    <ul class="chips">
      <li v-for="chip in work.chips" :key="chip">{{ chip }}</li>
    </ul>
  </div>
</template>
