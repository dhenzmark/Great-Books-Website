<script setup>
/* Pick a work on the timeline to see when it was composed. */
import { ref, computed, nextTick } from "vue";
import { eras } from "../../data/site.js";
import { useInk } from "../../composables/useInk.js";
import SectionHead from "../ui/SectionHead.vue";

const at = ref(0);
const direction = ref("next");
const era = computed(() => eras[at.value]);
const tabs = ref([]);
const list = ref(null);

/* copper line that grows along the timeline up to the chosen work */
const { style: ink } = useInk(list, "[aria-selected='true']", at);
const progress = computed(() => {
  const s = ink.value;
  if (!s["--x"]) return { opacity: 0 };
  return { "--x": "0px", "--w": `${parseFloat(s["--x"]) + parseFloat(s["--w"]) / 2}px` };
});

function go(i, focus = false) {
  const next = (i + eras.length) % eras.length;
  if (next === at.value) return;
  direction.value = next > at.value ? "next" : "prev";
  at.value = next;
  if (focus) nextTick(() => tabs.value[next].focus());
}

function onKey(e) {
  if (e.key === "ArrowRight") { e.preventDefault(); go(at.value + 1, true); }
  if (e.key === "ArrowLeft") { e.preventDefault(); go(at.value - 1, true); }
}
</script>

<template>
  <section id="timeline" class="section" aria-labelledby="explore-title">
    <span class="circle" aria-hidden="true" style="width: 520px; height: 520px; left: -200px; bottom: -120px"></span>
    <div class="wrap">
      <SectionHead id="explore-title" center title="Explore the timeline" lead="From oldest to youngest. Choose a work to see when it was composed." />

      <div v-reveal class="explore">
        <div class="explore-nav">
          <button type="button" aria-label="Earlier work" @click="go(at - 1)">
            <svg viewBox="0 0 28 14" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M27 7H2M8 1L2 7l6 6" /></svg>
          </button>
          <ul ref="list" class="eras" role="tablist" aria-label="Works in order of composition">
            <li v-for="(e, i) in eras" :key="e.tab" role="presentation">
              <button
                ref="tabs"
                role="tab"
                aria-controls="era-panel"
                :aria-selected="String(i === at)"
                :tabindex="i === at ? 0 : -1"
                @click="go(i)"
                @keydown="onKey"
              >
                {{ e.tab }}
              </button>
            </li>
            <li class="era-ink" role="presentation" aria-hidden="true" :style="progress"></li>
          </ul>
          <button type="button" aria-label="Later work" @click="go(at + 1)">
            <svg viewBox="0 0 28 14" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M1 7h25M20 1l6 6-6 6" /></svg>
          </button>
        </div>

        <div class="strip" aria-hidden="true">
          <button v-for="(e, i) in eras" :key="e.tab" type="button" tabindex="-1" :class="{ on: i === at }" @click="go(i)">
            <img :src="e.thumb" alt="" loading="lazy" />
          </button>
        </div>

        <div id="era-panel" class="era-detail" role="tabpanel" aria-live="polite">
          <Transition :name="`era-${direction}`" mode="out-in">
            <div :key="at">
              <p class="era-name">{{ era.name }}</p>
              <p class="era-date">{{ era.date }}</p>
              <p class="era-ago">{{ era.ago }}</p>
            </div>
          </Transition>
          <span class="rule" aria-hidden="true"></span>
          <Transition :name="`era-${direction}`" mode="out-in">
            <div :key="at">
              <p>{{ era.text }}</p>
              <RouterLink class="btn" :to="era.to">Read the analysis</RouterLink>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>
