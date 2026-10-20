<script setup>
/* Chart of Achilles' anger across the Iliad. The line draws itself when it scrolls into view. */
import { ref, onMounted } from "vue";
import { useInView } from "../../composables/useInView.js";

const stops = [
  { x: 40, y: 160, label: "Wrath of Achilles", book: "Book 1", tx: 30, ty: 188 },
  { x: 170, y: 140, label: "War without Achilles", book: "Books 2–15", anchor: "middle" },
  { x: 295, y: 85, label: "Death of Patroclus", book: "Books 16–18", anchor: "middle", ty: 120 },
  { x: 405, y: 55, r: 8, label: "Death of Hector", book: "Book 22", anchor: "middle", ty: 20 },
  { x: 505, y: 245, label: "Priam and reconciliation", book: "Book 24", anchor: "end", tx: 490, ty: 238 },
  { x: 605, y: 282, r: 11, label: "HECTOR’S FUNERAL", book: "Book 24, the last lines", anchor: "end", tx: 615, ty: 314, home: true },
];

const svg = ref(null);
const path = ref(null);
const length = ref(1200);
const drawn = useInView(svg, { threshold: 0.4 });

onMounted(() => (length.value = Math.ceil(path.value.getTotalLength())));
</script>

<template>
  <figure style="margin: 0">
    <svg ref="svg" class="journey" :class="{ drawn }" :style="{ '--len': length }" viewBox="0 0 640 340" role="img" aria-labelledby="arc-title arc-desc">
      <title id="arc-title">The rise and fall of Achilles' rage</title>
      <desc id="arc-desc">
        A line starts with the wrath of Achilles in Book 1, stays high through the war without Achilles in Books 2 to 15, climbs at the death of
        Patroclus in Books 16 to 18 and peaks at the death of Hector in Book 22. It then falls sharply with Priam and the reconciliation in Book 24,
        and settles at its lowest, calmest point with Hector's funeral, where the poem ends.
      </desc>
      <path ref="path" class="path" d="M40 160 C95 150 130 142 170 140 S265 100 295 85 S380 48 405 55 S470 200 505 245 S578 280 605 282" />
      <g v-for="(s, i) in stops" :key="s.label" class="stop" :class="{ home: s.home }" :style="{ '--i': i }">
        <circle :cx="s.x" :cy="s.y" :r="s.r || 7" />
        <text :x="s.tx ?? s.x" :y="s.ty ?? s.y + 28" :text-anchor="s.anchor">{{ s.label }}</text>
        <text :x="s.tx ?? s.x" :y="(s.ty ?? s.y + 28) + 16" :text-anchor="s.anchor">{{ s.book }}</text>
      </g>
    </svg>
    <figcaption style="font-size: 0.82rem; color: var(--muted); margin-top: 8px">The higher the line, the hotter Achilles&rsquo; anger.</figcaption>
  </figure>
</template>
