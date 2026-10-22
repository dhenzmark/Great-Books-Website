<script setup>
/*
  Big page title with a painting inside the letter O, e.g. "SEVEN W(o)RKS":
    prefix="SEVEN " before="W" after="RKS"
  Text in before/image/after never breaks across lines. Each letter animates in.
*/
import { computed } from "vue";

const props = defineProps({
  label: { type: String, required: true },
  prefix: { type: String, default: "" },
  before: { type: String, default: "" },
  image: { type: String, required: true },
  after: { type: String, default: "" },
  suffix: { type: String, default: "" },
  quoteSource: { type: String, default: "" },
});

const parts = computed(() => {
  let i = 0;
  const chars = (text) => [...text].map((ch) => ({ ch, i: i++ }));
  const prefix = chars(props.prefix);
  const before = chars(props.before);
  const o = i++;
  const after = chars(props.after);
  const suffix = chars(props.suffix);
  return { prefix, before, o, after, suffix };
});
</script>

<template>
  <header id="top" class="title-hero">
    <h1 id="page-title" :aria-label="label">
      <span aria-hidden="true">
        <span v-for="c in parts.prefix" :key="c.i" class="char" :style="{ '--i': c.i }">{{ c.ch }}</span>
        <span class="nw">
          <span v-for="c in parts.before" :key="c.i" class="char" :style="{ '--i': c.i }">{{ c.ch }}</span>
          <span class="o-img" :style="{ '--i': parts.o }"><img :src="image" alt="" decoding="async" /></span>
          <span v-for="c in parts.after" :key="c.i" class="char" :style="{ '--i': c.i }">{{ c.ch }}</span>
        </span>
        <span v-for="c in parts.suffix" :key="c.i" class="char" :style="{ '--i': c.i }">{{ c.ch }}</span>
      </span>
    </h1>
    <div class="title-intro"><p><slot /></p></div>
    <figure class="title-quote">
      <blockquote><p><slot name="quote" /></p></blockquote>
      <figcaption>{{ quoteSource }}</figcaption>
    </figure>
    <p class="title-credit"><slot name="credit" /></p>
  </header>
</template>
