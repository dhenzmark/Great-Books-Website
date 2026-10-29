<script setup>
import { author } from "../../data/site.js";

const facts = [
  ["Name", author],
  ["Course", "4th Year BS Information Technology"],
  ["Section", "GEC-GB-NRn 1454"],
  ["Subject", "Great Books"],
  ["Instructor", "Charlot San Buenaventura"],
  ["School", "University of Nueva Caceres"],
];

/* Move your photo inside its frame: the second number moves it up (higher) or down (lower). */
const photoPosition = "50% 65%";
const photo = "assets/img/me.webp";
</script>

<template>
  <section id="profile" class="section" aria-labelledby="profile-title">
    <span class="circle" aria-hidden="true"></span>
    <div class="wrap welcome">
      <span class="ghost-word" aria-hidden="true">Welcome</span>
      <div v-reveal>
        <h2 id="profile-title" class="copper-title">Student profile</h2>
        <p>
          Hi, I&rsquo;m {{ author }}, a 4th Year BS Information Technology student at the University of Nueva Caceres. I&rsquo;m not a literature
          major, but I&rsquo;ve always liked a good story, whether it&rsquo;s a folk tale my grandparents told, a teleserye my family argued about
          over dinner, or a movie based on a book.
        </p>
        <p>
          Going into Great Books, I honestly expected a lot of memorizing: long names, plot summaries, and exam questions I&rsquo;d forget right
          after. Some of that turned out to be true, since the names really are a lot. But most of the work was reading each story through a
          different literary lens and comparing it with things I already knew, which made these old epics much easier to get into than I expected.
        </p>
        <p>
          This portfolio collects that work: an analysis of each of the seven works, a closer look at my favorite, the <em>Iliad</em>, and a
          reflection on what I took from the course.
        </p>
        <ul class="facts" aria-label="Student details">
          <li v-for="[label, value] in facts" :key="label"><span>{{ label }}</span>{{ value }}</li>
        </ul>
        <RouterLink class="btn" to="/analyses">Read the analyses</RouterLink>
      </div>
      <div v-reveal.once class="stack">
        <div class="s1"><img :src="photo" :alt="author" decoding="async" :style="{ objectPosition: photoPosition }" /></div>
      </div>
    </div>
  </section>
</template>
