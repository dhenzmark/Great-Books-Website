<script setup>
import ArtPlate from "../ui/ArtPlate.vue";
</script>

<template>
  <div class="feature" style="margin-top: clamp(56px, 8vw, 96px)">
    <div v-reveal>
      <h3 style="font-size: 1.8rem">What I learned about literary craft</h3>
      <p>
        Before this course, I read mainly for plot. Now I notice <em>how</em> a story is told. Many of these works began as
        <strong>oral literature</strong>, performed from memory long before they were written down. That explains Homer&rsquo;s repeated epithets and
        the repeated laisses of <em>The Song of Roland</em>, which helped performers remember and listeners follow.
      </p>
      <p>
        I learned to recognize techniques across cultures. The <strong>frame narrative</strong> appears in Job, the <em>Panchatantra</em>, and the
        <em>Mahabharata</em>. Beginning <strong>in medias res</strong> drives both Homeric epics. <strong>Divine intervention</strong> shapes nearly
        every work, from Athena guiding Odysseus to Krishna guiding Arjuna.
      </p>
      <p>
        I also learned to read <strong>critically</strong>. Sita&rsquo;s trial by fire and the portrayal of Muslims in <em>Roland</em> reflect
        attitudes we should question today. Appreciating a masterpiece does not mean accepting everything in it.
      </p>
    </div>
    <ArtPlate
      v-reveal
      style="max-width: 380px; justify-self: center"
      src="/assets/img/homer-bust.webp"
      alt="Marble bust of Homer as a bearded old man with blank eyes"
      aspect="3/4"
      caption="Bust of Homer, Roman copy of a Hellenistic original. The British Museum. Tradition says Homer was blind and composed his poems orally."
    />
  </div>
</template>
