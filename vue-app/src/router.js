import { createRouter, createWebHistory } from "vue-router";
import { prefersReducedMotion } from "./composables/motion.js";

const routes = [
  { path: "/", name: "home", component: () => import("./views/HomeView.vue"), meta: { title: "Seven Masterpieces of World Literature" } },
  { path: "/analyses", name: "analyses", component: () => import("./views/AnalysesView.vue"), meta: { title: "Seven Literary Analyses" } },
  { path: "/masterpiece", name: "masterpiece", component: () => import("./views/MasterpieceView.vue"), meta: { title: "Favorite Literary Masterpiece" } },
  { path: "/learning", name: "learning", component: () => import("./views/LearningView.vue"), meta: { title: "Summary of Learning" } },
  { path: "/reflection", name: "reflection", component: () => import("./views/ReflectionView.vue"), meta: { title: "Personal Reflection" } },
  { path: "/profile", name: "profile", component: () => import("./views/ProfileView.vue"), meta: { title: "Student Profile" } },
  /* old .html links still work */
  { path: "/index.html", redirect: "/" },
  { path: "/:page(analyses|masterpiece|learning|reflection|profile).html", redirect: (to) => ({ path: "/" + to.params.page, hash: to.hash }) },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

/*
  Scrolling between pages is done by App.vue, not by the router, so it fits the page
  transition: scrollOldPageAway() jumps to the top as soon as the old page is hidden,
  and applyPendingScroll() sets the final position once the new page is in place.
  The request is recorded in afterEach, the moment the route changes, so it is always
  ready before the transition starts.
*/
let pending = null;

/* layout position, ignoring the slide-in transform of the entering page */
function pageTop(el) {
  let y = 0;
  for (let n = el; n; n = n.offsetParent) y += n.offsetTop;
  return y;
}

const jump = (top) => window.scrollTo({ top, behavior: "instant" });

/* called once the old page is out of sight */
export function scrollOldPageAway() {
  if (pending && !pending.hash && !pending.saved) jump(0);
}

/* called when the new page is in the DOM */
export function applyPendingScroll() {
  if (!pending) return;
  const { hash, saved } = pending;
  pending = null;
  const el = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
  jump(saved ? saved.top : el ? pageTop(el) - 24 : 0);
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    if (to.path === from.path) {
      if (saved) return saved;
      return to.hash ? { el: to.hash, top: 24, behavior: prefersReducedMotion() ? "auto" : "smooth" } : false;
    }
    /* Back/Forward: remember where the reader was (this callback runs a little after afterEach) */
    if (saved) {
      if (pending) pending.saved = saved;
      else jump(saved.top);
    }
    return false;
  },
});

router.afterEach((to, from, failure) => {
  if (!failure && to.path !== from.path) pending = { hash: to.hash, saved: null };
  document.title = `Epic Voices | ${to.meta.title || "Literary Portfolio"}`;
});

export default router;
