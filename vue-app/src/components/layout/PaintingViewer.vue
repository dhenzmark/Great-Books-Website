<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { lightbox, openPainting } from "../../composables/useLightbox.js";
import { prefersReducedMotion } from "../../composables/motion.js";

const dialog = ref(null);
const closing = ref(false);

watch(
  () => lightbox.painting,
  (painting) => {
    const dlg = dialog.value;
    if (!painting || dlg.open) return;
    closing.value = false;
    if (typeof dlg.showModal === "function") dlg.showModal();
    else window.open(painting.src, "_blank");
  }
);

/* play the closing animation, then really close */
function close() {
  if (!dialog.value.open || closing.value) return;
  if (prefersReducedMotion()) return dialog.value.close();
  closing.value = true;
  setTimeout(() => {
    closing.value = false;
    dialog.value.close();
  }, 220);
}

function onClosed() {
  const opener = lightbox.opener;
  lightbox.painting = null;
  if (opener) opener.focus();
}

function onCancel(e) {
  e.preventDefault();
  close();
}

function onBackdropClick(e) {
  if (e.target === dialog.value) close();
}

/* "Look closer" buttons that live inside the analysis text (rendered from HTML) */
function onLookClick(e) {
  const btn = e.target.closest(".look[data-src]");
  if (!btn) return;
  const img = btn.closest(".plate-frame")?.querySelector("img");
  const { src, title, caption, text } = btn.dataset;
  openPainting({ src, title, caption, text, alt: img ? img.alt : "" }, btn);
}
onMounted(() => document.addEventListener("click", onLookClick));
onBeforeUnmount(() => document.removeEventListener("click", onLookClick));
</script>

<template>
  <dialog ref="dialog" class="lightbox" :class="{ closing }" aria-labelledby="lb-title" @close="onClosed" @cancel="onCancel" @click="onBackdropClick">
    <button class="dialog-close" type="button" aria-label="Close" @click="close">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
    </button>
    <div v-if="lightbox.painting" class="dialog-grid">
      <div class="dialog-media"><img :src="lightbox.painting.src" :alt="lightbox.painting.alt || ''" /></div>
      <div class="dialog-body">
        <h3 id="lb-title">{{ lightbox.painting.title }}</h3>
        <p style="font-size: 0.85rem">{{ lightbox.painting.caption }}</p>
        <p>{{ lightbox.painting.text }}</p>
      </div>
    </div>
  </dialog>
</template>
