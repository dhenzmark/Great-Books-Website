<script setup>
import exhibits from "../../data/exhibits.js";
import SectionHead from "../ui/SectionHead.vue";
import ExhibitCard from "./ExhibitCard.vue";
</script>

<template>
  <section id="works" class="section deep" aria-labelledby="works-title">
    <div class="wrap">
      <SectionHead id="works-title" center title="The seven works" lead="Each one hangs here like an exhibition. Open any of them to read the full analysis." />
      <div class="exhibits">
        <ExhibitCard v-for="exhibit in exhibits" :key="exhibit.href" v-reveal :exhibit="exhibit" />
        <RouterLink v-reveal class="exhibit-all" to="/analyses">Read all seven analyses</RouterLink>
      </div>
    </div>
  </section>
</template>
