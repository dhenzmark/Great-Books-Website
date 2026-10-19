<script setup>
import { navLinks, author } from "../../data/site.js";
import BrandMark from "./BrandMark.vue";
import ImageCredits from "./ImageCredits.vue";
import { useCardTransition } from "../../composables/pageTransition.js";

const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="wrap">
      <div class="footer-top">
        <BrandMark />
        <ul class="footer-links">
          <li v-for="link in navLinks" :key="link.to"><RouterLink :to="link.to" @click="useCardTransition">{{ link.label }}</RouterLink></li>
        </ul>
        <p>&copy; {{ year }} {{ author }}</p>
      </div>
      <ImageCredits />
      <div class="footer-row">
        <p>A literary portfolio for Art Appreciation.</p>
        <p><a href="#top">Back to top</a></p>
      </div>
    </div>
  </footer>
</template>
