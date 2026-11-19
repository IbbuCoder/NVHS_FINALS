/*
 * home.js — finals countdown, class names on the Core/Encore blocks,
 * and the search box.
 */
(function () {
  /* ---------- Countdown ---------- */
  function startCountdown() {
    const box = document.getElementById("countdown");
    const raw = (window.SITE_CONFIG.finalsDate || "").trim();
    if (!raw) return; // no date set: keep it hidden

    const target = new Date(raw);
    if (isNaN(target.getTime())) {
      console.warn("SITE_CONFIG.finalsDate isn't a valid date:", raw);
      return;
    }
    box.hidden = false;
    const dateText = target.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

    function plural(n, word) { return n + " " + word + (n === 1 ? "" : "s"); }

    // Writes a sentence like "26 days until finals start on Tuesday, December 15."
    function tick() {
      const ms = target - new Date();
      if (ms <= 0) {
        box.textContent = "Finals have started.";
        return false;
      }
      const totalMinutes = Math.floor(ms / 60000);
      const days = Math.floor(totalMinutes / 1440);
      const hours = Math.floor((totalMinutes % 1440) / 60);
      const minutes = totalMinutes % 60;

      // Far away: just days. Close: hours and minutes matter more.
      const amount = days >= 2 ? plural(days, "day")
        : days === 1 ? plural(days, "day") + ", " + plural(hours, "hour")
        : plural(hours, "hour") + ", " + plural(minutes, "minute");

      box.replaceChildren(el("strong", null, amount), " until finals start on " + dateText + ".");
      return true;
    }

    if (tick()) {
      const timer = setInterval(function () { if (!tick()) clearInterval(timer); }, 30000);
    }
  }

  /* ---------- Search + class names ---------- */
  async function setupSearch() {
    const input = document.getElementById("subject-search");
    const results = document.getElementById("search-results");
    const status = document.getElementById("search-status");
    const subjects = await StudyData.getSubjects();
    const byName = function (a, b) { return a.name.localeCompare(b.name); };

    // List the actual classes inside each big block, e.g. "ELA, Math, Science".
    Object.keys(CATEGORIES).forEach(function (cat) {
      const slot = document.querySelector('[data-classes="' + cat + '"]');
      const names = subjects.filter(function (s) { return s.category === cat; }).sort(byName)
        .map(function (s) { return s.name; });
      if (slot) slot.textContent = names.join(", ");
    });

    function render() {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        results.replaceChildren();
        status.textContent = "";
        return;
      }
      const matches = subjects
        .filter(function (s) { return s.name.toLowerCase().includes(q); })
        .sort(byName);

      status.textContent = matches.length
        ? (matches.length === 1 ? "1 class matches." : matches.length + " classes match.")
        : "No class is called “" + input.value.trim() + "”. Check the spelling, or browse Core and Encore above.";

      results.replaceChildren(...matches.map(function (s) {
        const cat = CATEGORIES[s.category] || { label: s.category };
        return el("li", null,
          el("a", { class: "search-result", href: "subject.html?id=" + encodeURIComponent(s.id) },
            el("span", { class: "search-result__name" }, s.name),
            el("span", { class: "search-result__type" }, cat.label)));
      }));
    }

    input.addEventListener("input", render);
    render(); // in case the browser restored a typed value
  }

  document.addEventListener("DOMContentLoaded", function () {
    startCountdown();
    setupSearch().catch(function (err) { console.error(err); });
  });
})();
