/* Epic Voices: page interactions */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    var setOpen = function (open) {
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    };
    toggle.addEventListener("click", function () { setOpen(!links.classList.contains("is-open")); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- tabs in the analyses ---------- */
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

  /* ---------- "Look closer" painting viewer ---------- */
  var dlg = document.getElementById("lightbox");
  var opener = null;
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".look");
    if (!btn || !dlg) return;
    opener = btn;
    var img = document.getElementById("lb-img");
    img.src = btn.getAttribute("data-src");
    var frame = btn.closest(".plate-frame");
    var src = frame ? frame.querySelector("img") : null;
    img.alt = src ? src.alt : "";
    document.getElementById("lb-title").innerHTML = btn.getAttribute("data-title") || "";
    document.getElementById("lb-caption").innerHTML = btn.getAttribute("data-caption") || "";
    document.getElementById("lb-text").textContent = btn.getAttribute("data-text") || "";
    if (typeof dlg.showModal === "function") dlg.showModal(); else window.open(img.src, "_blank");
  });
  if (dlg) {
    dlg.querySelector(".dialog-close").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", function () { if (opener) opener.focus(); });
  }

  /* ---------- home: hero picture switcher (1/4) ---------- */
  var slides = document.querySelectorAll(".hero-slides figure");
  var now = document.querySelector("[data-slide-now]");
  if (slides.length) {
    var cur = 0, timer = null;
    var show = function (i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (f, k) { f.classList.toggle("on", k === cur); });
      if (now) now.textContent = String(cur + 1);
    };
    var auto = function () { if (reduce) return; clearInterval(timer); timer = setInterval(function () { show(cur + 1); }, 6000); };
    document.querySelectorAll("[data-slide]").forEach(function (b) {
      b.addEventListener("click", function () { show(cur + parseInt(b.getAttribute("data-slide"), 10)); auto(); });
    });
    auto();
  }

  /* ---------- home: painting of the day ---------- */
  var today = document.getElementById("artwork-today");
  if (today) {
    var paintings = [
      ["assets/img/odyssey-waterhouse-sirens.jpg", "Ulysses and the Sirens", "John William Waterhouse, 1891", "analyses.html#odyssey", "Odysseus tied to the mast as Sirens circle his ship"],
      ["assets/img/job-blake-watercolor.jpg", "The Lord Answering Job out of the Whirlwind", "William Blake, c. 1805", "analyses.html#job", "God in a whirlwind above the kneeling Job"],
      ["assets/img/panchatantra-lion-bull.jpg", "The Lion Devours the Bull", "Kalila wa Dimna, Herat, 1430", "analyses.html#panchatantra", "A lion attacking a bull while two jackals watch"],
      ["assets/img/ramayana-ravi-varma-jatayu.jpg", "Ravana Cutting the Wing of Jatayu", "Raja Ravi Varma, c. 1895", "analyses.html#ramayana", "Ravana fighting the great bird Jatayu"],
      ["assets/img/mahabharata-razmnama.jpg", "Ashvatthama Fires the Narayana Weapon", "Razmnama folio, c. 1616", "analyses.html#mahabharata", "A river of fire sweeping over a battlefield"],
      ["assets/img/iliad-david-andromache.jpg", "Andromache Mourning Hector", "Jacques-Louis David, 1783", "analyses.html#iliad", "Andromache grieving beside the body of Hector"],
      ["assets/img/roland-fouquet.jpg", "The Death of Roland", "Jean Fouquet, c. 1455", "analyses.html#roland", "Roland dying on a hill among fallen knights"]
    ];
    var start = new Date(new Date().getFullYear(), 0, 0);
    var day = Math.floor((new Date() - start) / 86400000);
    var pick = paintings[day % paintings.length];
    var timg = today.querySelector("[data-today-img]");
    timg.src = pick[0]; timg.alt = pick[4];
    today.querySelector("[data-today-title]").textContent = pick[1];
    today.querySelector("[data-today-by]").textContent = pick[2];
    today.href = pick[3];
  }

  /* ---------- home: explore the timeline ---------- */
  var explore = document.querySelector("[data-explore]");
  if (explore) {
    var eras = [
      ["The Iliad", "c. 750 BCE", "8th century BCE, about 2,750 years ago", "Homer’s poem of the rage of Achilles in the last year of the Trojan War. It is one of the oldest works of Western literature, first performed from memory by singers long before it was written down.", "analyses.html#iliad"],
      ["The Odyssey", "c. 725 BCE", "Late 8th century BCE, about 2,750 years ago", "Odysseus spends ten years trying to get home from Troy while his wife and son hold their household together. Its name gave us the word for any long and difficult journey.", "analyses.html#odyssey"],
      ["Voice out of the Whirlwind", "600–300 BCE", "6th to 4th century BCE, about 2,500 years ago", "An unknown Hebrew poet asks why the innocent suffer. God answers Job from a storm, not with reasons but with the whole of creation.", "analyses.html#job"],
      ["The Ramayana", "500 BCE – 100 CE", "Composed over about 600 years", "Valmiki’s epic of Prince Rama, who keeps his father’s word through fourteen years of exile. It lives on across Asia, including the Maranao Maharadia Lawana.", "analyses.html#ramayana"],
      ["The Mahabharata", "400 BCE – 400 CE", "Grew over about 800 years of retelling", "The great war of the Pandavas and Kauravas grew over eight centuries of retelling. At its heart is the Bhagavad Gita, Krishna’s teaching on duty.", "analyses.html#mahabharata"],
      ["The Panchatantra", "200 BCE – 300 CE", "Collected over about 500 years", "Animal fables of practical wisdom, framed as lessons for three princes. Translated into Persian and Arabic, they travelled the world as Kalila wa Dimna.", "analyses.html#panchatantra"],
      ["The Song of Roland", "c. 1100 CE", "About 900 years ago, the youngest of the seven", "The oldest major work of French literature turns a small defeat in 778 into a story of loyalty and betrayal. Its legend later inspired the Filipino moro-moro.", "analyses.html#roland"]
    ];
    var tabs = Array.prototype.slice.call(explore.querySelectorAll(".eras [role='tab']"));
    var thumbs = Array.prototype.slice.call(explore.querySelectorAll(".strip button"));
    var nameEl = explore.querySelector("[data-era-name]"), dateEl = explore.querySelector("[data-era-date]");
    var agoEl = explore.querySelector("[data-era-ago]"), textEl = explore.querySelector("[data-era-text]"), linkEl = explore.querySelector("[data-era-link]");
    var at = 0;
    var go = function (i, focus) {
      at = (i + eras.length) % eras.length;
      tabs.forEach(function (t, k) { var on = k === at; t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1; });
      thumbs.forEach(function (t, k) { t.classList.toggle("on", k === at); });
      nameEl.textContent = eras[at][0]; dateEl.textContent = eras[at][1];
      agoEl.textContent = eras[at][2]; textEl.textContent = eras[at][3]; linkEl.href = eras[at][4];
      if (focus) tabs[at].focus();
    };
    tabs.forEach(function (t, k) {
      t.addEventListener("click", function () { go(k); });
      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { e.preventDefault(); go(at + 1, true); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(at - 1, true); }
      });
    });
    thumbs.forEach(function (t, k) { t.addEventListener("click", function () { go(k); }); });
    explore.querySelectorAll("[data-step]").forEach(function (b) {
      b.addEventListener("click", function () { go(at + parseInt(b.getAttribute("data-step"), 10)); });
    });
  }

  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();

/* ---------- table of contents: highlight the work in view ---------- */
(function () {
  var links = document.querySelectorAll(".toc a[href^='#']");
  if (!links.length || !("IntersectionObserver" in window)) return;
  var map = {};
  links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove("active"); a.removeAttribute("aria-current"); });
      var l = map[e.target.id];
      if (l) { l.classList.add("active"); l.setAttribute("aria-current", "true"); }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) spy.observe(el); });
  links[0].classList.add("active");
})();
