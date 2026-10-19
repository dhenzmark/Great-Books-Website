<script setup>
import { author } from "../../data/site.js";

const facts = [
  ["Name", author],
  ["Course", "4th Year BS Information Technology"],
  ["Section", "GEC-GB-NRn 1454"],
  ["Subject", "Art Appreciation"],
  ["Instructor", "Charlot San Buenaventura"],
  ["School", "University of Nueva Caceres"],
];

/* Move your photo inside its frame: the second number moves it up (higher) or down (lower). */
const photoPosition = "50% 65%";
</script>

<template>
  <section id="profile" class="section" aria-labelledby="profile-title">
    <span class="circle" aria-hidden="true"></span>
    <div class="wrap welcome">
      <span class="ghost-word" aria-hidden="true">Welcome</span>
      <div v-reveal>
        <h2 id="profile-title" class="copper-title">Student profile</h2>
        <p>
          Hello! My name is {{ author }}, and I am a 4th Year BS Information Technology student. I grew up hearing stories at home: folk tales from my
          grandparents, teleserye plots retold at the dinner table, and the legends we learned in grade school. Stories have always been the way my
          family made sense of the world. This course gave me the chance to look at much older stories and ask the same questions people asked
          thousands of years ago.
        </p>
        <p>
          Before this class, I thought of epics as long, difficult poems that only scholars read. I was wrong. Once I looked past the unfamiliar
          names, I found families arguing, friends grieving, leaders making mistakes, and ordinary people trying to do the right thing.
        </p>
        <ul class="facts" aria-label="Student details">
          <li v-for="[label, value] in facts" :key="label"><span>{{ label }}</span>{{ value }}</li>
        </ul>
        <RouterLink class="btn" to="/analyses">Read the analyses</RouterLink>
      </div>
      <div v-reveal class="stack">
        <div class="s1"><img src="/assets/img/me.jpeg" :alt="author" :style="{ objectPosition: photoPosition }" /></div>
      </div>
    </div>
  </section>
</template>
