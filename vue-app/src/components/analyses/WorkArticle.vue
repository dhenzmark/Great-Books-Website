<script setup>
/* One full analysis: heading, painting, key facts, tabs, gallery and insight. */
import ArtPlate from "../ui/ArtPlate.vue";
import TabGroup from "../ui/TabGroup.vue";
import WorkFoot from "../ui/WorkFoot.vue";
import WorkSummary from "./WorkSummary.vue";
import WorkGallery from "./WorkGallery.vue";

defineProps({
  work: { type: Object, required: true },
  current: { type: Boolean, default: false },
});
</script>

<template>
  <article :id="work.id" class="work" :class="{ 'is-right': work.right, 'in-view': current }" :aria-labelledby="work.titleId">
    <div v-reveal class="work-head">
      <span class="work-num">{{ work.num }}</span>
      <h3 :id="work.titleId">{{ work.title }}</h3>
      <span class="orig" :class="work.orig.font" :lang="work.orig.lang">{{ work.orig.text }}</span>
    </div>

    <div class="work-grid">
      <ArtPlate v-reveal v-bind="work.plate" />
      <WorkSummary v-reveal :work="work" />
    </div>

    <TabGroup v-reveal :tabs="work.tabs" :prefix="work.tabPrefix" :label="`${work.title} analysis`" />

    <WorkGallery v-if="work.gallery.length" :title="`${work.title} in Art`" :paintings="work.gallery" />

    <WorkFoot v-reveal :quote="work.quote.text" :cite="work.quote.cite">
      <p v-html="work.insight"></p>
    </WorkFoot>
  </article>
</template>
