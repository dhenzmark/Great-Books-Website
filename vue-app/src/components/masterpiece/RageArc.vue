<script setup>
/* Chart of Achilles' anger across the Iliad. The line draws itself when it scrolls into view. */
import { ref, onMounted } from "vue";
import { useInView } from "../../composables/useInView.js";

const stops = [
  { x: 40, y: 190, label: "The quarrel", book: "Book 1", tx: 30, ty: 218 },
  { x: 130, y: 160, label: "Withdrawal", book: "Books 1–8", anchor: "middle" },
  { x: 220, y: 135, label: "Embassy refused", book: "Book 9", anchor: "middle" },
  { x: 320, y: 100, label: "Patroclus dies", book: "Book 16", anchor: "middle" },
  { x: 420, y: 70, r: 8, label: "Hector falls", book: "Book 22", anchor: "middle", ty: 34 },
  { x: 520, y: 190, label: "Funeral games", book: "Book 23", tx: 534, ty: 180 },
  { x: 600, y: 280, r: 11, label: "MERCY FOR PRIAM", book: "Book 24", anchor: "end", tx: 610, ty: 314, home: true },
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
        A line rises from the quarrel in Book 1, through Achilles' withdrawal and the refused embassy in Book 9, to the death of Patroclus in Book 16
        and its peak when Achilles kills Hector in Book 22. It then falls through the funeral games in Book 23 to its lowest, calmest point when
        Achilles shows mercy to Priam in Book 24.
      </desc>
      <path ref="path" class="path" d="M40 190 C90 180 100 165 130 160 S190 140 220 135 S290 110 320 100 S400 65 420 70 S480 150 520 190 S580 270 600 280" />
      <g v-for="(s, i) in stops" :key="s.label" class="stop" :class="{ home: s.home }" :style="{ '--i': i }">
        <circle :cx="s.x" :cy="s.y" :r="s.r || 7" />
        <text :x="s.tx ?? s.x" :y="s.ty ?? s.y + 28" :text-anchor="s.anchor">{{ s.label }}</text>
        <text :x="s.tx ?? s.x" :y="(s.ty ?? s.y + 28) + 16" :text-anchor="s.anchor">{{ s.book }}</text>
      </g>
    </svg>
    <figcaption style="font-size: 0.82rem; color: var(--muted); margin-top: 8px">The higher the line, the hotter Achilles&rsquo; anger.</figcaption>
  </figure>
</template>
