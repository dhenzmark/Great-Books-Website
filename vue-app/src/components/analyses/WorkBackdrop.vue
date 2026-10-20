<script setup>
/*
  Decoration behind each analysis, in the manner of a museum catalogue: a large faded
  artwork from that work's world, framed by thin gold rings and a few glowing stars.
  Purely decorative and static (no scroll work), so it costs nothing while reading.
*/
defineProps({ id: { type: String, required: true } });

const art = {
  job: { src: "assets/img/job-blake-watercolor.jpg", pos: "50% 30%" },
  panchatantra: { src: "assets/img/panchatantra-lion-bull.jpg", pos: "50% 60%" },
  ramayana: { src: "assets/img/ramayana-ravi-varma-jatayu.jpg", pos: "40% 25%" },
  mahabharata: { src: "assets/img/mahabharata-razmnama.jpg", pos: "60% 35%" },
  iliad: { src: "assets/img/homer-bust.webp", pos: "50% 30%" },
  odyssey: { src: "assets/img/odyssey-calypso.jpg", pos: "35% 50%" },
  roland: { src: "assets/img/roland-michallon.jpg", pos: "50% 60%" },
};
const stars = [[12, 18, 0], [78, 9, 1.4], [88, 62, 2.6], [30, 84, 0.8], [62, 40, 3.4]];
</script>

<template>
  <div class="work-backdrop" aria-hidden="true">
    <div class="work-backdrop-art">
      <img :src="art[id].src" alt="" loading="lazy" decoding="async" :style="{ objectPosition: art[id].pos }" />
    </div>
    <span class="work-backdrop-ring"></span>
    <span class="work-backdrop-ring is-outer"></span>
    <i v-for="([x, y, d], k) in stars" :key="k" :style="{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }"></i>
  </div>
</template>
