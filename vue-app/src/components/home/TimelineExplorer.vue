<script setup>
/* Pick a work on the timeline to see when it was composed. */
import { ref, computed, nextTick, watch, onBeforeUnmount } from "vue";
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
  if (focus) nextTick(() => tabs.value[next].focus({ preventScroll: true }));
}

/*
  On narrow screens the titles and the pictures both scroll sideways. They move together:
  swiping the pictures carries the titles along, the picture that settles in the middle
  becomes the chosen work, and choosing a title slides the pictures to it.
*/
const strip = ref(null);
const scrollable = (el) => el && el.scrollWidth > el.clientWidth + 2;
let fromStrip = false;
let queued = false;
let settle = 0;

function centreOf(el, child) {
  return child.offsetLeft + child.offsetWidth / 2 - el.clientWidth / 2;
}

function onStripScroll() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    const s = strip.value, l = list.value;
    if (!scrollable(s)) return;
    /* titles follow the pictures, proportionally */
    if (scrollable(l)) {
      const ratio = s.scrollLeft / (s.scrollWidth - s.clientWidth);
      l.scrollLeft = ratio * (l.scrollWidth - l.clientWidth);
    }
    /* the picture nearest the middle is the chosen one */
    const mid = s.scrollLeft + s.clientWidth / 2;
    let best = 0, dist = Infinity;
    [...s.children].forEach((b, k) => {
      const d = Math.abs(b.offsetLeft + b.offsetWidth / 2 - mid);
      if (d < dist) { dist = d; best = k; }
    });
    clearTimeout(settle);
    settle = setTimeout(() => {
      if (best !== at.value) { fromStrip = true; go(best); }
    }, 90);
  });
}

watch(at, (i) => {
  nextTick(() => {
    const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    const s = strip.value, l = list.value;
    /* a swipe already moved both rows; only taps and arrows need to slide them */
    if (!fromStrip) {
      if (scrollable(s)) s.scrollTo({ left: centreOf(s, s.children[i]), behavior });
      else if (scrollable(l)) l.scrollTo({ left: centreOf(l, tabs.value[i]), behavior });
    }
    fromStrip = false;
  });
});
onBeforeUnmount(() => clearTimeout(settle));

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

        <div ref="strip" class="strip" aria-hidden="true" @scroll.passive="onStripScroll">
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
