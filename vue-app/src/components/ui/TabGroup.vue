<script setup>
/*
  Accessible tabs with a sliding underline. Switching is smooth: the box eases to the new
  panel's height (so what follows glides instead of jumping), the new panel fades in from the
  side of the chosen tab, and its paragraphs or list items arrive one after another.
*/
import { ref, nextTick } from "vue";
import { useInk } from "../../composables/useInk.js";
import { prefersReducedMotion } from "../../composables/motion.js";

const EASE = "cubic-bezier(.22, 1, .36, 1)";

const props = defineProps({
  tabs: { type: Array, required: true }, // [{ label, html }]
  prefix: { type: String, required: true }, // used for tab and panel ids
  label: { type: String, required: true },
});

const selected = ref(0);
const direction = ref(null);
const list = ref(null);
const buttons = ref([]);
const stage = ref(null);
let heightAnim = null;
let switching = 0;
let pinUntil = 0;

/* keep the tab bar where it was on screen while the panel changes height (the browser's
   scroll anchoring would otherwise hold the content below still and throw the tabs around) */
const USER_SCROLL = ["wheel", "touchstart", "keydown", "pointerdown"];
function pinTabs(ms) {
  const root = document.documentElement;
  const startTop = list.value.getBoundingClientRect().top;
  const running = pinUntil > performance.now();
  pinUntil = performance.now() + ms;
  root.style.overflowAnchor = "none";
  if (running) return;
  /* the moment the reader scrolls (or taps, or presses a key) the hold lets go, so it never fights them */
  let held = true;
  const release = () => (held = false);
  USER_SCROLL.forEach((t) => window.addEventListener(t, release, { passive: true, capture: true }));
  const hold = () => {
    if (list.value && performance.now() < pinUntil) {
      if (held) {
        const drift = list.value.getBoundingClientRect().top - startTop;
        if (Math.abs(drift) > 0.5) window.scrollBy({ top: drift, behavior: "instant" });
      }
      requestAnimationFrame(hold);
    } else {
      root.style.overflowAnchor = "";
      USER_SCROLL.forEach((t) => window.removeEventListener(t, release, { capture: true }));
    }
  };
  requestAnimationFrame(hold);
}
const { style: ink } = useInk(list, "[aria-selected='true']", selected);

async function select(i, focus = false) {
  const n = props.tabs.length;
  i = (i + n) % n;
  if (focus) nextTick(() => buttons.value[i].focus());
  if (i === selected.value) return;
  const dir = i > selected.value ? 1 : -1;
  direction.value = dir > 0 ? "next" : "prev";
  const box = stage.value;
  const reduced = prefersReducedMotion();
  const token = ++switching;
  pinTabs(reduced ? 300 : 800);
  /* the old panel fades and slides away first, instead of vanishing in one frame */
  const old = box.querySelector(".tabpanel:not([hidden])");
  if (old && !reduced) {
    box.style.height = `${box.offsetHeight}px`; // hold the height while it leaves
    await old
      .animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: `translateX(${-dir * 14}px)` }], { duration: 200, easing: "cubic-bezier(.4, 0, 1, 1)", fill: "forwards" })
      .finished.catch(() => {});
    if (token !== switching) return; // another tab was chosen meanwhile
    old.getAnimations().forEach((a) => a.cancel());
  }
  if (heightAnim) heightAnim.cancel();
  const from = box.offsetHeight;
  box.style.height = "";
  selected.value = i;
  await nextTick();
  if (reduced) return;

  /* the box eases from the old height to the new one */
  const to = box.offsetHeight;
  if (Math.abs(to - from) > 2) {
    heightAnim = box.animate([{ height: `${from}px` }, { height: `${to}px` }], { duration: 520, easing: EASE });
    heightAnim.onfinish = heightAnim.oncancel = () => (heightAnim = null);
  }
  /* the new panel slides in, its parts one after another */
  const panel = box.querySelector(".tabpanel:not([hidden])");
  if (!panel) return;
  panel.animate([{ opacity: 0, transform: `translateX(${dir * 18}px)` }, { opacity: 1, transform: "none" }], { duration: 480, easing: EASE });
  const parts = panel.querySelectorAll(":scope > p, :scope > ul > li, :scope > figure");
  parts.forEach((el, k) =>
    el.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }], { duration: 520, delay: 60 + Math.min(k, 8) * 55, easing: EASE, fill: "backwards" })
  );
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
    <div ref="stage" class="tab-stage">
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
  </div>
</template>
