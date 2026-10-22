<script setup>
import ArtPlate from "../ui/ArtPlate.vue";

const andromache = {
  src: "assets/img/iliad-david-andromache.webp",
  title: "Andromache Mourning Hector",
  caption: "Jacques-Louis David, 1783. Musée du Louvre, Paris.",
  text: "The goodbye at the Scaean Gates ends here. Andromache weeps beside Hector's body while their son Astyanax reaches for her. David shows the family that Hector died trying to protect.",
};
</script>

<template>
  <div class="feature" style="margin-top: clamp(56px, 8vw, 96px)">
    <div v-reveal>
      <h2 style="font-size: clamp(1.6rem, 3vw, 2.2rem)">My favorite scene: Hector and Andromache</h2>
      <p>
        In Book 6, Hector briefly leaves the battle and meets his wife Andromache and their baby son Astyanax at the Scaean Gates of Troy. Andromache
        begs him not to go back, because she has already lost her father and brothers in the war. Hector answers that he would be ashamed to hide,
        even though he fears what will happen to her if Troy falls.
      </p>
      <p>
        Then the baby sees his father&rsquo;s bronze helmet with its nodding horsehair plume and starts to cry. Hector and Andromache laugh. Hector
        takes off the helmet, lays it on the ground, and lifts his son into his arms. For one moment, the greatest warrior of Troy is simply a father.
      </p>
      <p>
        This scene stays with me because we know it is the last time they will be together. It shows what war really takes away: not just soldiers,
        but fathers, husbands, and the ordinary happiness of a family.
      </p>
    </div>
    <ArtPlate
      v-reveal
      style="max-width: 420px; justify-self: center"
      :src="andromache.src"
      alt="Andromache sits grieving beside the body of Hector, holding her young son"
      object-position="50% 30%"
      aspect="3/4"
      :look="andromache"
      caption="Jacques-Louis David, Andromache Mourning Hector, 1783. Musée du Louvre. The farewell in Book 6 foreshadows this grief."
    />
  </div>
</template>
