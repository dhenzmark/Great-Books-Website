import { ref, watch, nextTick, onMounted, onBeforeUnmount } from "vue";

/*
  Measures the active item inside a container so a sliding indicator ("ink")
  can follow it. Returns CSS variables: --x, --y (top), --b (bottom), --w, --h.
*/
export function useInk(container, activeSelector, source) {
  const style = ref({ opacity: 0 });

  function measure() {
    const box = container.value;
    const el = box && box.querySelector(activeSelector);
    if (!el || !el.offsetParent) {
      style.value = { opacity: 0 };
      return;
    }
    const b = box.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const left = r.left - b.left - box.clientLeft + box.scrollLeft;
    const top = r.top - b.top - box.clientTop + box.scrollTop;
    style.value = {
      "--x": `${left}px`,
      "--y": `${top}px`,
      "--b": `${top + r.height}px`,
      "--w": `${r.width}px`,
      "--h": `${r.height}px`,
      opacity: 1,
    };
  }

  watch(source, () => nextTick(measure));
  onMounted(() => {
    measure();
    if (document.fonts) document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
  });
  onBeforeUnmount(() => window.removeEventListener("resize", measure));

  return { style, measure };
}
