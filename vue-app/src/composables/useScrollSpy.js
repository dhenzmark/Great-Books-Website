import { ref, onMounted, onBeforeUnmount } from "vue";

/* Tracks which of the given section ids is in the reading zone of the screen. */
export function useScrollSpy(ids, rootMargin = "-30% 0px -60% 0px") {
  const active = ref(ids[0]);
  let io = null;

  onMounted(() => {
    if (!("IntersectionObserver" in window)) return;
    io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) active.value = e.target.id; }),
      { rootMargin }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
  });
  onBeforeUnmount(() => io && io.disconnect());

  return active;
}
