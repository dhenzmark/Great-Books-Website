/*
  Shared motion switch. Every animated part of the site asks this first.
  It always answers "motion on": the site's animations, parallax and journey map run for
  every visitor, even when their system asks for reduced motion (Windows "Animation effects"
  off, for example). To respect that setting again, return the media query instead:
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
*/
export function prefersReducedMotion() {
  return false;
}
