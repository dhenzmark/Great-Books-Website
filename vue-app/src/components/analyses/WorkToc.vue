<script setup>
/*
  List of the seven works; a gold marker glides to the one you are reading.
  On phones it collapses into one solid bar ("III / VII · The Ramayana") that opens the list.
*/
import { ref, computed, watch } from "vue";
import { useInk } from "../../composables/useInk.js";

const props = defineProps({
  works: { type: Array, required: true },
  active: { type: String, required: true },
});

const list = ref(null);
const open = ref(false);
const { style: ink } = useInk(list, "a.active", () => props.active);

const roman = ["I", "II", "III", "IV", "V", "VI", "VII"];
const current = computed(() => props.works.find((w) => w.id === props.active) || props.works[0]);
const index = computed(() => props.works.indexOf(current.value));

/* close the phone list after choosing a work, or when the reader moves on */
watch(() => props.active, () => (open.value = false));
</script>

<template>
  <nav class="toc" :class="{ 'is-open': open }" aria-label="The seven works">
    <p>The seven works</p>
    <button type="button" class="toc-current" :aria-expanded="String(open)" aria-controls="toc-list" @click="open = !open">
      <span class="toc-current-num">{{ roman[index] }} / VII</span>
      <span class="toc-current-title">{{ current.title }}</span>
      <svg viewBox="0 0 14 8" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M1 1l6 6 6-6" /></svg>
    </button>
    <ol id="toc-list" ref="list">
      <li v-for="work in works" :key="work.id">
        <a :href="`#${work.id}`" :class="{ active: work.id === active }" :aria-current="work.id === active ? 'true' : undefined" @click="open = false">
          <span>{{ work.num }}</span>{{ work.title }}
        </a>
      </li>
      <li class="toc-ink" role="presentation" aria-hidden="true" :style="ink"></li>
    </ol>
  </nav>
</template>
