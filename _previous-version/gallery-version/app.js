/* Epic Voices: page interactions (menu, tabs, enlarge, quiz) */
(function () {
  "use strict";

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

  /* ---------- enlarge a painting ---------- */
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
    if (typeof dlg.showModal === "function") dlg.showModal(); else window.open(img.src, "_blank");
  });
  if (dlg) {
    dlg.querySelector(".dialog-close").addEventListener("click", function () { dlg.close(); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", function () { if (opener) opener.focus(); });
  }

  /* ---------- quiz ---------- */
  var card = document.querySelector(".quiz-card");
  if (card) {
    var questions = [
      { q: "Who answers a suffering man “out of the whirlwind” with questions instead of explanations?", o: ["Krishna", "God", "Athena", "Charlemagne"], a: 1, why: "In the Book of Job, God speaks from the storm and asks Job where he was when the earth was made." },
      { q: "In the Panchatantra, how does the monkey escape the crocodile?", o: ["He fights it", "He calls his friends", "He says he left his heart in a tree", "He swims faster"], a: 2, why: "He claims his heart is back in the tree, so the crocodile carries him to shore." },
      { q: "Why does Rama go into exile for fourteen years?", o: ["He loses a battle", "He keeps his father’s promise to Kaikeyi", "He is chasing Ravana", "He wants to become a hermit"], a: 1, why: "King Dasharatha must honor his promise to Kaikeyi, and Rama accepts exile to protect his father’s word." },
      { q: "The Bhagavad Gita is a conversation between which two figures?", o: ["Rama and Sita", "Arjuna and Krishna", "Yudhishthira and Duryodhana", "Karna and Draupadi"], a: 1, why: "Krishna, Arjuna’s charioteer, teaches him about duty on the battlefield of Kurukshetra." },
      { q: "What is the subject named in the first line of the Iliad?", o: ["The fall of Troy", "The beauty of Helen", "The anger of Achilles", "The journey home"], a: 2, why: "“Sing, O goddess, the anger of Achilles…” The poem is about his rage and its cost." },
      { q: "Who first recognizes Odysseus when he returns to Ithaca in disguise?", o: ["Penelope", "Telemachus", "His old dog Argos", "The suitors"], a: 2, why: "Argos wags his tail at his master’s voice, then dies having seen him one last time." },
      { q: "Why does so much of Roland’s rear guard die at Roncevaux?", o: ["Roland refuses to blow his horn for help in time", "Charlemagne abandons them", "Oliver betrays them", "They run out of food"], a: 0, why: "Out of pride, Roland ignores Oliver and waits until it is too late to call Charlemagne back." }
    ];
    var qi = 0, score = 0;
    var el = function (tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

    var renderQuestion = function () {
      card.innerHTML = "";
      card.appendChild(el("p", "quiz-progress", "Question " + (qi + 1) + " of " + questions.length));
      var item = questions[qi];
      var qEl = el("p", "quiz-q", item.q); qEl.id = "quiz-q";
      card.appendChild(qEl);
      var opts = el("div", "quiz-options");
      opts.setAttribute("role", "group"); opts.setAttribute("aria-labelledby", "quiz-q");
      var fb = el("p", "quiz-feedback"), actions = el("div", "quiz-actions");
      item.o.forEach(function (label, i) {
        var b = el("button", "", label); b.type = "button";
        b.addEventListener("click", function () {
          var right = i === item.a;
          if (right) score++;
          Array.prototype.forEach.call(opts.children, function (c, j) {
            c.disabled = true;
            if (j === item.a) c.classList.add("is-right"); else if (j === i) c.classList.add("is-wrong");
          });
          fb.textContent = (right ? "Correct. " : "Not quite. ") + item.why;
          var last = qi === questions.length - 1;
          var next = el("button", "btn", last ? "See my score" : "Next question"); next.type = "button";
          next.addEventListener("click", function () { qi++; if (qi < questions.length) renderQuestion(); else renderResult(); });
          actions.appendChild(next); next.focus();
        });
        opts.appendChild(b);
      });
      card.appendChild(opts); card.appendChild(fb); card.appendChild(actions);
    };
    var renderResult = function () {
      card.innerHTML = "";
      card.appendChild(el("p", "quiz-progress", "Your score"));
      card.appendChild(el("p", "quiz-score", score + " of " + questions.length));
      card.appendChild(el("p", "", score === questions.length ? "You know all seven works." : score >= 5 ? "You remember most of the journey." : "Revisit the analyses and try again."));
      var again = el("button", "btn btn-ghost", "Try again"); again.type = "button";
      again.addEventListener("click", function () { qi = 0; score = 0; renderQuestion(); card.querySelector("button").focus(); });
      card.appendChild(again); again.focus();
    };
    renderQuestion();
  }

  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
