<script setup>
import ArtPlate from "../ui/ArtPlate.vue";

const paintings = [
  {
    year: "Rage · 1892",
    src: "/assets/img/iliad-matsch-triumph.jpg",
    alt: "Achilles raises Hector's helmet as his chariot drags Hector's body before the walls of Troy",
    caption: "Franz von Matsch, The Triumph of Achilles, 1892. Achilleion Palace, Corfu.",
    look: {
      src: "/assets/img/iliad-matsch-triumph.jpg",
      title: "The Triumph of Achilles",
      caption: "Franz von Matsch, 1892. Achilleion Palace, Corfu.",
      text: "Achilles holds Hector's helmet high as he drags the body of the Trojan prince past the walls of Troy, where the Trojans watch in horror. The painting shows how rage turns into cruelty.",
    },
  },
  {
    year: "Mercy · 1824",
    src: "/assets/img/iliad-ivanov-priam.jpg",
    alt: "The old king Priam kneels and kisses the hand of Achilles, who sits in his tent",
    caption: "Alexander Ivanov, Priam Asking Achilles for the Return of Hector’s Body, 1824. State Tretyakov Gallery.",
    look: {
      src: "/assets/img/iliad-ivanov-priam.jpg",
      title: "Priam Asking Achilles for the Return of Hector’s Body",
      caption: "Alexander Ivanov, 1824. State Tretyakov Gallery, Moscow.",
      text: "In Book 24, King Priam secretly enters the Greek camp and kisses the hands of the man who killed his son. Ivanov paints the moment Achilles begins to soften, as the grieving father reminds him of his own.",
    },
  },
];
</script>

<template>
  <div class="compare">
    <div v-reveal class="section-head" style="margin-bottom: 28px">
      <h2 style="font-size: clamp(1.6rem, 3vw, 2.2rem)">Two faces of Achilles</h2>
      <p class="lead">
        Two painters, almost seventy years apart, captured the two sides of the same hero: the rage that drags a body through the dust, and the mercy
        that gives it back.
      </p>
    </div>
    <div class="compare-pair">
      <ArtPlate v-for="p in paintings" :key="p.src" v-reveal :src="p.src" :alt="p.alt" :look="p.look" :caption="p.caption">
        <template #before><p class="compare-year">{{ p.year }}</p></template>
      </ArtPlate>
    </div>
    <p v-reveal class="compare-caption">
      Matsch shows Achilles at his most terrifying, raising Hector&rsquo;s helmet like a trophy. Ivanov shows him quiet and troubled, with an old man
      kissing his hand. Together they show what I love about the <em>Iliad</em>: the same person who is capable of great cruelty is also capable of
      great compassion, and the choice between them is his.
    </p>
  </div>
</template>
