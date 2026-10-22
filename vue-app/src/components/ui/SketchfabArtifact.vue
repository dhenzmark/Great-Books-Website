<script setup>
/*
  A 3D artifact shown in Sketchfab's own viewer, beside a museum-style label.
  The models aren't downloadable, so embedding is the permitted way to show them.
  The viewer loads by itself as soon as its work comes into view, even while another tab
  (such as Summary) is open, so it is ready by the time the reader reaches it.
  A still picture stands in until it has loaded.
  Put the label's paragraph(s) in the default slot.
*/
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  model: { type: String, required: true }, // Sketchfab model id
  slug: { type: String, required: true }, // the model page's name part, for the credit link
  poster: { type: String, required: true }, // still picture, e.g. "assets/img/shield-3d.webp"
  posterAlt: { type: String, required: true },
  zoom: { type: Number, default: 1.4 }, // how far to zoom into the still picture
  label: { type: String, default: "Artifact" },
  title: { type: String, required: true },
  titleId: { type: String, required: true },
  meta: { type: String, required: true },
  modelName: { type: String, required: true }, // for the credit line
  modelAuthor: { type: String, required: true },
  licenseName: { type: String, default: "" }, // e.g. "CC BY 4.0", when the model has an open licence
  licenseUrl: { type: String, default: "" },
  compact: { type: Boolean, default: false }, // inside an analysis rather than its own page section
});

const pageUrl = `https://sketchfab.com/3d-models/${props.slug}-${props.model}`;
const embedUrl =
  `https://sketchfab.com/models/${props.model}/embed` +
  "?autostart=1&preload=1&transparent=1&ui_theme=dark&dnt=1" +
  /* hide the viewer's own interface as far as Sketchfab allows (some only hide on paid accounts) */
  "&ui_infos=0&ui_controls=0&ui_stop=0&ui_inspector=0&ui_settings=0&ui_help=0&ui_vr=0&ui_ar=0&ui_fullscreen=0&ui_annotations=0&ui_watermark=0&ui_watermark_link=0&ui_hint=0";
const live = ref(false); // viewer requested
const shown = ref(false); // viewer finished loading: the still picture fades away
const stage = ref(null);
let io = null;

onMounted(() => {
  if (!("IntersectionObserver" in window)) return (live.value = true);
  io = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      live.value = true;
      io.disconnect();
    },
    { rootMargin: "200px 0px" }
  );
  /* watch the whole analysis, not the (possibly hidden) tab the viewer sits in */
  io.observe(stage.value.closest("article") || stage.value);
});
/* give the viewer a moment to draw the model before the still picture fades */
function onLoaded() {
  setTimeout(() => (shown.value = true), 1200);
}
onBeforeUnmount(() => io && io.disconnect());
</script>

<template>
  <component :is="compact ? 'div' : 'section'" :class="compact ? 'artifact-inline' : 'section artifact-section'" :aria-labelledby="titleId">
    <div class="artifact" :class="{ wrap: !compact }">
      <div ref="stage" v-reveal class="artifact-stage">
        <iframe
          v-if="live"
          :src="embedUrl"
          :title="`3D model: ${title}`"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowfullscreen
          @load="onLoaded"
        ></iframe>
        <div class="artifact-poster" :class="{ 'is-gone': shown }" aria-hidden="true">
          <img :src="poster" :alt="posterAlt" loading="lazy" decoding="async" :style="{ scale: zoom }" />
          <span v-if="live && !shown" class="artifact-play">Loading 3D…</span>
        </div>
      </div>

      <div v-reveal class="artifact-label">
        <p class="label">{{ label }}</p>
        <component :is="compact ? 'h4' : 'h2'" :id="titleId" class="copper-title">{{ title }}</component>
        <p class="artifact-meta">{{ meta }}</p>
        <slot />
        <p class="artifact-hint">Drag to turn it, scroll to zoom.</p>
        <p class="artifact-credit">
          3D model: <a :href="pageUrl" target="_blank" rel="noopener">&ldquo;{{ modelName }}&rdquo; by {{ modelAuthor }}</a> on Sketchfab<template v-if="licenseName">, licensed under <a :href="licenseUrl" target="_blank" rel="noopener">{{ licenseName }}</a></template>
        </p>
      </div>
    </div>
  </component>
</template>
