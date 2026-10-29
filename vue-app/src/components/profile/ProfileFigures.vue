<script setup>
import CountUp from "../ui/CountUp.vue";

const andromache = "assets/img/iliad-david-andromache.webp";
const fresco = "assets/img/iliad-pompeii-fresco.webp";
</script>

<template>
  <section class="section" aria-label="The portfolio in numbers">
    <div class="wrap figures">
      <div v-reveal.once class="f-pic">
        <img v-parallax="0.05" :src="andromache" alt="Andromache grieving beside the body of Hector" loading="lazy" decoding="async" style="object-position: 50% 40%" />
      </div>
      <div v-reveal class="f-text">
        <p>I read best when I can connect a story to something real. I look at what a character wants, what gets in their way, and why the story ends the way it does.</p>
        <p>I also like seeing what a story says about the people who first told it, and how painters over the centuries have pictured its scenes.</p>
        <p>Interests: mythology, Philippine folklore, painting and design, music, history, and films based on books.</p>
      </div>
      <div v-reveal class="f-num">
        <CountUp :to="7" :duration="900" />
        <p class="num-cap">Works of world literature, read closely</p>
      </div>
      <figure v-reveal.once class="f-pic2">
        <img v-parallax="0.05" :src="fresco" alt="Detail of a Roman wall painting of a young warrior with a spear" loading="lazy" decoding="async" />
      </figure>
      <div v-reveal class="f-num2">
        <CountUp :to="1900" suffix=" years" />
        <p class="num-cap">Between the oldest and the youngest work,<br />across four traditions</p>
      </div>
    </div>
  </section>
</template>
