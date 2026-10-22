<script setup>
/* The six literary lenses from the course, and which analysis used each one. */
import works from "../../data/works.js";

const lenses = [
  { name: "Formalist", focus: "Text, structure and literary techniques", taught: "How the shape of a work carries its meaning, from Job’s prose frame to its storm of rhetorical questions." },
  { name: "Historical", focus: "Historical and cultural context", taught: "Why a poem says what it says, such as how a defeat in 778 became a Crusade-era holy war in Roland." },
  { name: "Feminist", focus: "Gender, representation and power", taught: "To admire Sita’s strength while questioning a story that asks only her to prove her innocence." },
  { name: "Marxist", focus: "Class, economics and power", taught: "To see the Mahabharata as a war over land, paid for by soldiers who never owned any of it." },
  { name: "Reader-Response", focus: "The reader’s experience and interpretation", taught: "That my own life, like knowing families who wait for a parent abroad, is part of how the Odyssey speaks." },
  { name: "Psychological", focus: "Motivation, behavior, emotions and psychology", taught: "To ask why characters act: Achilles’ grief turned to rage, and a mother’s fear acting faster than her eyes." },
].map((l) => ({ ...l, works: works.filter((w) => w.lens === l.name).map((w) => w.title) }));
</script>

<template>
  <section class="lens-guide" aria-labelledby="lens-title">
    <h3 id="lens-title" v-reveal class="subhead" style="margin-top: 0">Reading through six lenses</h3>
    <p v-reveal class="lens-guide-intro">
      A literary lens is a way of reading: each one asks different questions of the same text. I read each of the seven works through one lens, and
      using all six showed me how much a single story can hold.
    </p>
    <div class="lens-grid">
      <article v-for="l in lenses" :key="l.name" v-reveal class="lens-card">
        <h4>{{ l.name }}</h4>
        <p class="lens-focus">{{ l.focus }}</p>
        <p class="lens-works">Used for {{ l.works.join(" and ") }}</p>
        <p>{{ l.taught }}</p>
      </article>
    </div>
  </section>
</template>
