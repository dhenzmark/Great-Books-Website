import { reactive } from "vue";

/* Which tradition the page background shows: "all", "hebrew", "indian", "greek" or "french". */
export const backdrop = reactive({ tradition: "all" });

export const traditionOf = {
  job: "hebrew",
  panchatantra: "indian",
  ramayana: "indian",
  mahabharata: "indian",
  iliad: "greek",
  odyssey: "greek",
  roland: "french",
};
