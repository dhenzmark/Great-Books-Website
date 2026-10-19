<script setup>
import RageArc from "./RageArc.vue";
</script>

<template>
  <div class="feature">
    <div v-reveal>
      <h2 style="font-size: clamp(1.8rem, 3.4vw, 2.4rem)">The arc of a hero&rsquo;s anger</h2>
      <p>
        The <em>Iliad</em> covers only a few weeks of a ten-year war, but it follows one emotion from beginning to end. Achilles&rsquo; rage starts as
        wounded pride, grows into a deadly grief after Patroclus dies, and finally breaks when an old man kneels in front of him and weeps.
      </p>
      <p>
        That shape is what makes the poem unforgettable to me. It is not a story about winning a war. It is a story about a man learning, too late
        and at great cost, what his anger has done.
      </p>
    </div>
    <RageArc v-reveal />
  </div>
</template>
