<script setup>
/*
  The wanderings of Odysseus as one long scroll: the map stays pinned while you scroll,
  the route draws itself and the camera follows the ship from Troy to Ithaca.
  A story card shows the current stop; pins, the list and Previous/Next jump to any stop.

  Performance: the coastline is drawn once at full size and only moved with a transform;
  the route lives on its own layer; nothing runs while the section is off screen.
*/
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import { MAP, LAND, LAND_OVERVIEW } from "../../data/odyssey/coast.js";
import { stops, routePath, totalLength, stopLengths, stopKm, stopXY, pointAt, project } from "../../data/odyssey/route.js";
import { prefersReducedMotion } from "../../composables/motion.js";
import "../../styles/odyssey-map.css";

const emit = defineEmits(["close", "resume"]);
/* paused: frozen where it is, no longer pinned or driven by the scroll */
const props = defineProps({ paused: { type: Boolean, default: false } });
const n = stops.length;
const HOLD = 0.32; // share of each scroll step spent resting at a stop

const labels = [
  ["Aegean Sea", 38.95, 25.55, "sea"], ["Ionian Sea", 37.5, 18.7, "sea"], ["Tyrrhenian Sea", 39.7, 12.2, "sea"],
  ["Mediterranean Sea", 34.4, 18.2, "sea"], ["Adriatic Sea", 42.6, 16.0, "sea"],
  ["Greece", 39.5, 21.9, "land"], ["Italy", 41.95, 14.3, "land"], ["Sicily", 37.55, 14.1, "land"], ["Sardinia", 40.05, 9.0, "land"],
  ["Asia Minor", 38.6, 29.2, "land"], ["Thrace", 41.35, 26.4, "land"], ["Crete", 35.22, 24.9, "land"], ["North Africa", 31.6, 11.5, "land"],
].map(([text, lat, lon, kind]) => ({ text, kind, xy: project(lat, lon) }));

const root = ref(null);
const stage = ref(null);
const world = ref(null);
const progressPath = ref(null);
const ship = ref(null);
const miniDot = ref(null);
const still = ref(false);
const active = ref(0);
const km = ref(0);
const scale = ref(1.6);
const timeline = ref(0);

const stop = computed(() => stops[active.value]);
const pad = (i) => String(i + 1).padStart(2, "0");
const shipsLabel = computed(() => (stop.value.ships ? `${stop.value.ships} ship${stop.value.ships > 1 ? "s" : ""}` : "Alone"));
const tickAt = (i) => `${(stopLengths[i] / totalLength) * 100}%`;

let io = null;
let visible = false;
let frame = 0;
let cam = null; // { x, y, l } smoothed
let target = { l: 0 };

const smooth = (t) => t * t * (3 - 2 * t);

/* scroll position -> distance along the route and the current stop */
function readScroll() {
  const box = root.value.getBoundingClientRect();
  const travel = root.value.offsetHeight - stage.value.offsetHeight;
  if (travel <= 0) return;
  const top = parseFloat(getComputedStyle(stage.value).top) || 0;
  const p = Math.min(1, Math.max(0, (top - box.top) / travel));
  const u = p * (n - 1);
  const i = Math.min(n - 2, Math.floor(u));
  const f = u - i;
  const move = smooth(Math.min(1, f / (1 - HOLD)));
  target.l = stopLengths[i] + (stopLengths[i + 1] - stopLengths[i]) * move;
  const now = f >= 1 - HOLD || p >= 1 ? i + 1 : i;
  if (now !== active.value) active.value = now;
}

/* where the followed point should sit on screen */
function focusPoint() {
  const w = stage.value.clientWidth, h = stage.value.clientHeight;
  if (w < 760) return [w / 2, h * 0.3];
  return [210 + (w - 210 - 440) / 2, h * 0.5];
}

function render() {
  frame = 0;
  readScroll();
  if (!cam) cam = { l: target.l };
  cam.l += (target.l - cam.l) * 0.12;
  const p = pointAt(cam.l);
  const [fx, fy] = focusPoint();
  const s = scale.value;
  world.value.style.transform = `translate3d(${(fx - p.x * s).toFixed(1)}px, ${(fy - p.y * s).toFixed(1)}px, 0)`;
  progressPath.value.style.strokeDashoffset = (totalLength - cam.l).toFixed(1);
  ship.value.style.transform = `translate(${(p.x * s).toFixed(1)}px, ${(p.y * s).toFixed(1)}px)`;
  miniDot.value.setAttribute("cx", p.x.toFixed(1));
  miniDot.value.setAttribute("cy", p.y.toFixed(1));
  km.value = Math.round(p.km / 10) * 10;
  timeline.value = cam.l / totalLength;
  if (visible && Math.abs(target.l - cam.l) > 0.3) frame = requestAnimationFrame(render);
}

function wake() {
  if (visible && !frame && !props.paused) frame = requestAnimationFrame(render);
}

/* pausing collapses the long scroll track; keep the map where it is on screen, and on
   resuming put the reader back at the same stop */
const stageTopNow = () => stage.value.getBoundingClientRect().top;
watch(
  () => props.paused,
  async (paused) => {
    if (still.value) return;
    if (paused) {
      cancelAnimationFrame(frame);
      frame = 0;
      const onScreen = stageTopNow();
      await nextTick();
      window.scrollTo({ top: stageTopNow() + window.scrollY - onScreen, behavior: "instant" });
    } else {
      await nextTick();
      const i = active.value;
      const travel = root.value.offsetHeight - stage.value.offsetHeight;
      const top = root.value.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(stage.value).top) || 0);
      const p = i === 0 ? 0 : (i - 1 + 1 - HOLD / 2) / (n - 1);
      window.scrollTo({ top: top + p * travel, behavior: "instant" });
      wake();
    }
  }
);

function resize() {
  if (still.value) {
    scale.value = stage.value.clientWidth / MAP.width;
    return;
  }
  const w = stage.value.clientWidth;
  scale.value = Math.min(1.5, Math.max(0.75, w / 980));
  cam = null;
  wake();
}

/* scroll so that stop i is in view (resting on it) */
function goTo(i) {
  i = Math.max(0, Math.min(n - 1, i));
  if (still.value) {
    active.value = i;
    return;
  }
  const travel = root.value.offsetHeight - stage.value.offsetHeight;
  const top = root.value.getBoundingClientRect().top + window.scrollY - (parseFloat(getComputedStyle(stage.value).top) || 0);
  const p = i === 0 ? 0 : (i - 1 + 1 - HOLD / 2) / (n - 1);
  window.scrollTo({ top: top + p * travel, behavior: "smooth" });
}

onMounted(async () => {
  still.value = prefersReducedMotion();
  await nextTick();
  resize();
  if (still.value) {
    progressPath.value.style.strokeDashoffset = "0"; // whole route drawn
    return;
  }
  io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    wake();
  });
  io.observe(root.value);
  window.addEventListener("scroll", wake, { passive: true });
  window.addEventListener("resize", resize);
});

onBeforeUnmount(() => {
  if (io) io.disconnect();
  cancelAnimationFrame(frame);
  window.removeEventListener("scroll", wake);
  window.removeEventListener("resize", resize);
});
</script>

<template>
  <section
    ref="root"
    class="odm"
    :class="{ 'is-still': still, 'is-paused': paused }"
    :style="still || paused ? null : { height: `${(n - 1) * 80 + 100}vh` }"
    aria-label="Map of the wanderings of Odysseus"
  >
    <div ref="stage" class="odm-stage">
      <!-- the map -->
      <div ref="world" class="odm-world" :style="{ width: `${MAP.width * scale}px`, height: `${MAP.height * scale}px` }">
        <svg class="odm-land" aria-hidden="true" :viewBox="`0 0 ${MAP.width} ${MAP.height}`" preserveAspectRatio="none">
          <defs>
            <pattern id="odm-waves" width="46" height="26" patternUnits="userSpaceOnUse">
              <path d="M4 9q4 -3 8 0M27 21q4 -3 8 0" fill="none" stroke="rgba(214, 233, 228, .14)" stroke-width="1.1" stroke-linecap="round" />
            </pattern>
          </defs>
          <rect :width="MAP.width" :height="MAP.height" fill="url(#odm-waves)" />
          <path :d="LAND" class="odm-ripple odm-ripple-2" />
          <path :d="LAND" class="odm-ripple odm-ripple-1" />
          <path :d="LAND" class="odm-coast" />
        </svg>
        <svg class="odm-route" aria-hidden="true" :viewBox="`0 0 ${MAP.width} ${MAP.height}`" preserveAspectRatio="none">
          <path :d="routePath" class="odm-route-ahead" />
          <path ref="progressPath" :d="routePath" class="odm-route-done" :stroke-dasharray="totalLength" :stroke-dashoffset="totalLength" />
        </svg>
        <span
          v-for="l in labels"
          :key="l.text"
          class="odm-label"
          aria-hidden="true"
          :class="`is-${l.kind}`"
          :style="{ left: `${l.xy[0] * scale}px`, top: `${l.xy[1] * scale}px` }"
        >{{ l.text }}</span>
        <span ref="ship" class="odm-ship" aria-hidden="true"></span>
        <button
          v-for="(s, i) in stops"
          :key="s.id"
          type="button"
          class="odm-pin"
          :class="{ 'is-active': i === active, 'is-done': i < active, 'is-left': s.lon < 14.2 && s.lat < 38 }"
          :style="{ left: `${stopXY[i][0] * scale}px`, top: `${stopXY[i][1] * scale}px` }"
          :aria-label="`Stop ${i + 1}: ${s.name}`"
          tabindex="-1"
          @click="goTo(i)"
        >
          <span class="odm-pin-dot">{{ i + 1 }}</span><span class="odm-pin-name">{{ s.name }}</span>
        </button>
      </div>

      <button type="button" class="odm-x" @click="emit('close')">Close map <span aria-hidden="true">✕</span></button>

      <button v-if="paused" type="button" class="odm-paused" @click="emit('resume')">
        <span>Paused · {{ stop.name }}</span>
        <strong>Continue the journey</strong>
      </button>

      <ol class="odm-list" aria-label="Stops">
        <li v-for="(s, i) in stops" :key="s.id">
          <button type="button" :class="{ 'is-active': i === active, 'is-done': i < active }" :aria-current="i === active ? 'step' : undefined" @click="goTo(i)">
            <span class="odm-list-dot"></span>{{ s.name }}
          </button>
        </li>
      </ol>

      <div class="odm-chips" aria-live="polite">
        <span>{{ stop.book }}</span>
        <span>≈ {{ km.toLocaleString("en-US") }} km</span>
        <span>{{ shipsLabel }}</span>
      </div>

      <svg class="odm-mini" :viewBox="`0 0 ${MAP.width} ${MAP.height}`" aria-hidden="true">
        <path :d="LAND_OVERVIEW" class="odm-mini-land" />
        <path :d="routePath" class="odm-mini-route" />
        <circle ref="miniDot" r="26" class="odm-mini-dot" :cx="stopXY[0][0]" :cy="stopXY[0][1]" />
      </svg>

      <article class="odm-card" aria-live="polite">
        <Transition name="odm-card" mode="out-in">
          <div :key="stop.id" class="odm-card-inner">
            <figure v-if="stop.image" class="odm-card-media">
              <img :src="stop.image" :alt="`${stop.title}: painting`" decoding="async" />
              <figcaption>{{ stop.credit }}</figcaption>
            </figure>
            <div class="odm-card-body">
              <p class="odm-card-eyebrow">{{ pad(active) }} · {{ stop.place }}</p>
              <h4>{{ stop.title }}</h4>
              <p>{{ stop.text }}</p>
            </div>
          </div>
        </Transition>
        <div class="odm-card-nav">
          <button type="button" :disabled="active === 0" @click="goTo(active - 1)">← Previous</button>
          <span>{{ pad(active) }} / {{ pad(n - 1) }}</span>
          <button type="button" :disabled="active === n - 1" @click="goTo(active + 1)">Next →</button>
        </div>
      </article>

      <div class="odm-timeline" aria-hidden="true">
        <span class="odm-timeline-fill" :style="{ transform: `scaleX(${timeline})` }"></span>
        <i v-for="(s, i) in stops" :key="s.id" :class="{ 'is-done': i <= active }" :style="{ left: tickAt(i) }"></i>
      </div>
    </div>

    <ol v-if="still" class="odm-still-list">
      <li v-for="(s, i) in stops" :key="s.id">
        <p class="odm-card-eyebrow">{{ pad(i) }} · {{ s.name }} · {{ s.place }} · {{ s.book }}</p>
        <h4>{{ s.title }}</h4>
        <p>{{ s.text }}</p>
      </li>
    </ol>
  </section>
</template>
