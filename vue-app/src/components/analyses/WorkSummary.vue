<script setup>
defineProps({
  work: { type: Object, required: true },
});
</script>

<template>
  <div>
    <p class="kicker">{{ work.kicker }}</p>
    <dl class="work-meta">
      <template v-for="[term, detail] in work.meta" :key="term">
        <dt>{{ term }}</dt>
        <dd>{{ detail }}</dd>
      </template>
    </dl>
    <p class="hook">{{ work.hook }}</p>
    <ul class="chips">
      <li v-for="chip in work.chips" :key="chip">{{ chip }}</li>
    </ul>
  </div>
</template>
