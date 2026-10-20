<script setup>
/* Accessible tabs with a sliding underline. Panels slide in from the side of the chosen tab. */
import { ref, nextTick } from "vue";
import { useInk } from "../../composables/useInk.js";

const props = defineProps({
  tabs: { type: Array, required: true }, // [{ label, html }]
  prefix: { type: String, required: true }, // used for tab and panel ids
  label: { type: String, required: true },
});

const selected = ref(0);
const direction = ref(null);
const list = ref(null);
const buttons = ref([]);
const { style: ink } = useInk(list, "[aria-selected='true']", selected);

function select(i, focus = false) {
  const n = props.tabs.length;
  i = (i + n) % n;
  if (focus) nextTick(() => buttons.value[i].focus());
  if (i === selected.value) return;
  direction.value = i > selected.value ? "next" : "prev";
  selected.value = i;
}

function onKey(e, i) {
  const target = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: props.tabs.length - 1 }[e.key];
  if (target === undefined) return;
  e.preventDefault();
  select(target, true);
}
</script>

<template>
  <div class="tabs" :data-dir="direction">
    <div ref="list" class="tablist" role="tablist" :aria-label="label">
      <button
        v-for="(tab, i) in tabs"
        :id="`${prefix}-t${i + 1}`"
        :key="tab.label"
        ref="buttons"
        class="tab"
        role="tab"
        :aria-controls="`${prefix}-p${i + 1}`"
        :aria-selected="String(i === selected)"
        :tabindex="i === selected ? 0 : -1"
        @click="select(i)"
        @keydown="onKey($event, i)"
      >
        {{ tab.label }}
      </button>
      <span class="tab-ink" aria-hidden="true" :style="ink"></span>
    </div>
    <div
      v-for="(tab, i) in tabs"
      :id="`${prefix}-p${i + 1}`"
      :key="tab.label"
      class="tabpanel"
      role="tabpanel"
      :aria-labelledby="`${prefix}-t${i + 1}`"
      tabindex="0"
      :hidden="i !== selected"
      v-html="tab.html"
    ></div>
    <!-- extra content for a tab, e.g. <template #panel-0> for the first tab -->
    <template v-for="(tab, i) in tabs" :key="`extra-${tab.label}`">
      <div v-if="$slots[`panel-${i}`]" v-show="i === selected" class="tabpanel-extra">
        <slot :name="`panel-${i}`" />
      </div>
    </template>
  </div>
</template>
