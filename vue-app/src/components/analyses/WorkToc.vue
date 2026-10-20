<script setup>
/* Sticky list of the seven works; a gold marker glides to the one you are reading. */
import { ref, watch, nextTick } from "vue";
import { useInk } from "../../composables/useInk.js";

const props = defineProps({
  works: { type: Array, required: true },
  active: { type: String, required: true },
});

const list = ref(null);
const { style: ink } = useInk(list, "a.active", () => props.active);

/* on phones the list is one sideways row: keep the work you are reading in view */
watch(
  () => props.active,
  () =>
    nextTick(() => {
      const ol = list.value, a = ol && ol.querySelector("a.active");
      if (!a || ol.scrollWidth <= ol.clientWidth) return;
      const li = a.parentElement;
      ol.scrollTo({ left: li.offsetLeft - (ol.clientWidth - li.offsetWidth) / 2, behavior: "smooth" });
    })
);
</script>

<template>
  <nav class="toc" aria-label="The seven works">
    <p>The seven works</p>
    <ol ref="list">
      <li v-for="work in works" :key="work.id">
        <a :href="`#${work.id}`" :class="{ active: work.id === active }" :aria-current="work.id === active ? 'true' : undefined">
          <span>{{ work.num }}</span>{{ work.title }}
        </a>
      </li>
      <li class="toc-ink" role="presentation" aria-hidden="true" :style="ink"></li>
    </ol>
  </nav>
</template>
