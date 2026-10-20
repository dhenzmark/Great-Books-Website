<script setup>
import works from "../data/works.js";
import { watch } from "vue";
import { useScrollSpy } from "../composables/useScrollSpy.js";
import { backdrop, traditionOf } from "../composables/backdrop.js";
import PageTitle from "../components/layout/PageTitle.vue";
import NextPage from "../components/layout/NextPage.vue";
import WorkToc from "../components/analyses/WorkToc.vue";
import WorkArticle from "../components/analyses/WorkArticle.vue";

const active = useScrollSpy(works.map((w) => w.id));
/* the background shows the tradition of the work you are reading */
watch(active, (id) => (backdrop.tradition = traditionOf[id] || "all"), { immediate: true });
</script>

<template>
  <div class="page">
    <PageTitle
      label="Seven Works"
      prefix="SEVEN "
      before="W"
      image="assets/img/panchatantra-lion-bull.jpg"
      after="RKS"
      quote-source="Job 38:4, King James Version"
    >
      Each analysis covers the story, its characters, its themes, how it is told, and the culture that produced it. Use the tabs to move through each
      one, and select any painting to look closer.
      <template #quote>&ldquo;Where wast thou when I laid the foundations of the earth?&rdquo;</template>
      <template #credit>
        Pictures above: the lion and the bull from a Kalila wa Dimna manuscript, Herat, 1430, and William Blake, The Lord Answering Job out of the
        Whirlwind, c. 1805.
      </template>
    </PageTitle>

    <main id="main">
      <section id="analyses" class="section" aria-labelledby="page-title">
        <div class="wrap">
          <div class="with-toc">
            <WorkToc :works="works" :active="active" />
            <div class="toc-body">
              <WorkArticle v-for="work in works" :key="work.id" :work="work" :current="work.id === active" />
            </div>
          </div>
        </div>
      </section>
      <NextPage to="/masterpiece" title="Favorite Literary Masterpiece" />
    </main>
  </div>
</template>
