import { reactive } from "vue";

/* Shared state for the "View more" painting viewer. */
export const lightbox = reactive({ painting: null, opener: null });

export function openPainting(painting, opener) {
  lightbox.opener = opener || null;
  lightbox.painting = { ...painting };
}
