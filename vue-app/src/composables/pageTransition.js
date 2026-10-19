/*
  Which page transition the next route change uses (read by App.vue).
  Links at the bottom of the page (the "next page" card and the footer menu) ask for
  the full-screen transition card; everything else uses the simple fade.
*/
export const pageTransition = { card: false };

/* use as a click handler; ignores ctrl/middle clicks (new tab) and links to the page you are on */
export function useCardTransition(e) {
  const newTab = e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
  const samePage = e.currentTarget.pathname === window.location.pathname;
  if (!newTab && !samePage) pageTransition.card = true;
}
