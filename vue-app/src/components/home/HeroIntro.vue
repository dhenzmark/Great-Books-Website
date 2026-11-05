<script setup>
import { author } from "../../data/site.js";
</script>

<template>
  <div class="hero-copy">
    <p class="line-label"><span>My Literary Journey: A Great Books Digital Portfolio</span><span>Seven works, 800 BCE to 1100 CE</span></p>
    <h1><span>Seven epics,</span><span>one reader</span></h1>
    <p>
      Seven of the world&rsquo;s oldest stories, from the Book of Job to <em>The Song of Roland</em>, each read closely and paired with the
      paintings they inspired. A portfolio by {{ author }}.
    </p>
    <div class="hero-actions">
      <RouterLink class="text-link" to="/analyses">Read the analyses</RouterLink>
      <!-- the same portfolio, walked through as a 3D museum -->
      <a class="text-link" href="https://dhenzmark.github.io/Great-Books-Museum/" target="_blank" rel="noopener">Visit the 3D museum version &nearr;</a>
    </div>
  </div>
</template>
