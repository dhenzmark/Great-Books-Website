/* Epic Voices (Japanese-gallery version): page interactions */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- nav: solid on scroll, mobile menu, active link ---------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  var hero = document.querySelector(".hero");

  function closeMenu() {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  links.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && links.classList.contains("is-open")) { closeMenu(); toggle.focus(); }
  });

  var navAnchors = links.querySelectorAll("a[href^='#']");
  var sections = Array.prototype.map.call(navAnchors, function (a) { return document.querySelector(a.getAttribute("href")); });

  /* ---------- scroll-driven effects ---------- */
  var parallax = document.querySelectorAll("[data-parallax]");
  var drifters = document.querySelectorAll("[data-drift]");
  var timelineBox = document.querySelector(".timeline-box");
  var ink = document.querySelector(".timeline-ink");
  var eras = document.querySelectorAll(".era");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var vh = window.innerHeight;
    nav.classList.toggle("is-solid", y > (hero ? hero.offsetHeight - 120 : 60));

    var current = -1;
    sections.forEach(function (sec, i) { if (sec && sec.getBoundingClientRect().top < vh * 0.4) current = i; });
    navAnchors.forEach(function (a, i) { a.classList.toggle("is-active", i === current); });

    if (!reduceMotion) {
      parallax.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.2;
        var offset = el.parentElement === hero ? y * speed : (r.top + r.height / 2 - vh / 2) * -speed;
        var limit = r.height * 0.09;
        offset = Math.max(-limit, Math.min(limit, offset));
        el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
      });
      drifters.forEach(function (el) {
        var r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var speed = parseFloat(el.getAttribute("data-drift")) || 0.1;
        var d = Math.max(-120, Math.min(120, r.top * speed));
        el.style.transform = "translate3d(0," + d.toFixed(1) + "px,0)";
      });
    }

    if (timelineBox && ink) {
      var tr = timelineBox.getBoundingClientRect();
      var progress = Math.min(1, Math.max(0, (vh * 0.6 - tr.top) / tr.height));
      if (!reduceMotion) ink.style.transform = "scaleY(" + progress.toFixed(3) + ")";
      eras.forEach(function (era) {
        era.classList.toggle("is-passed", era.getBoundingClientRect().top + era.offsetHeight / 2 < vh * 0.6);
      });
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- hero stat count-up ---------- */
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reduceMotion || !target) return;
    var start = 0, dur = 1600;
    el.textContent = "0";
    function step() {
      var p = Math.min(1, (Date.now() - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-US");
      if (p < 1) setTimeout(step, 30);
    }
    setTimeout(function () { start = Date.now(); step(); }, 600);
  });

  /* ---------- tabs ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll("[role='tab']"));
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
        else if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === "Home") next = tabs[0];
        else if (e.key === "End") next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
  });

  /* ---------- lightbox ("Look closer") ---------- */
  var dlg = document.getElementById("lightbox");
  var opener = null;
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".look");
    if (!btn || !dlg) return;
    opener = btn;
    var img = document.getElementById("lb-img");
    img.src = btn.getAttribute("data-src");
    var src = btn.closest(".plate-frame").querySelector("img");
    img.alt = src ? src.alt : "";
    document.getElementById("lb-title").innerHTML = btn.getAttribute("data-title") || "";
    document.getElementById("lb-caption").innerHTML = btn.getAttribute("data-caption") || "";
    document.getElementById("lb-text").textContent = btn.getAttribute("data-text") || "";
    if (typeof dlg.showModal === "function") dlg.showModal();
    else window.open(img.src, "_blank");
  });
  if (dlg) {
    dlg.querySelector(".dialog-close").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", function () { if (opener) opener.focus(); });
  }

  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
