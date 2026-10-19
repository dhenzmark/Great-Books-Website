<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { navLinks } from "../../data/site.js";
import { useInk } from "../../composables/useInk.js";
import BrandMark from "./BrandMark.vue";

const route = useRoute();
const open = ref(false);
const list = ref(null);
const toggle = ref(null);

/* gold underline that slides to the current page */
const { style: ink } = useInk(list, "a[aria-current='page']", () => route.path);

watch(() => route.fullPath, () => (open.value = false));

function onKey(e) {
  if (e.key === "Escape" && open.value) {
    open.value = false;
    toggle.value.focus();
  }
}
onMounted(() => document.addEventListener("keydown", onKey));
onBeforeUnmount(() => document.removeEventListener("keydown", onKey));
</script>

<template>
  <nav class="nav" aria-label="Main">
    <BrandMark />
    <ul id="nav-links" ref="list" class="nav-links" :class="{ 'is-open': open }">
      <li v-for="(link, i) in navLinks" :key="link.to" :style="{ '--i': i }">
        <RouterLink :to="link.to">{{ link.label }}</RouterLink>
      </li>
      <li class="nav-ink" role="presentation" aria-hidden="true" :style="ink"></li>
    </ul>
    <button ref="toggle" class="nav-toggle" type="button" :aria-expanded="String(open)" aria-controls="nav-links" @click="open = !open">
      {{ open ? "Close" : "Menu" }}
    </button>
  </nav>
</template>
