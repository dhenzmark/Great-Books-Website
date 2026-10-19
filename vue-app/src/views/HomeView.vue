<script setup>
import HeroSlideshow from "../components/home/HeroSlideshow.vue";
import HeroIntro from "../components/home/HeroIntro.vue";
import HeroLinks from "../components/home/HeroLinks.vue";
import WorksSection from "../components/home/WorksSection.vue";
import TimelineExplorer from "../components/home/TimelineExplorer.vue";
import NextPage from "../components/layout/NextPage.vue";
</script>

<template>
  <div class="page">
    <header id="top" class="hero">
      <HeroSlideshow />
      <HeroIntro />
      <HeroLinks />
    </header>
    <main id="main">
      <WorksSection />
      <TimelineExplorer />
      <NextPage to="/analyses" eyebrow="Start here" title="Seven Literary Analyses" />
    </main>
  </div>
</template>
