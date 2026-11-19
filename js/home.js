/*
 * home.js — finals countdown, class counts on the Core/Encore buttons,
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

    function unit(value, label) {
      return el("div", { class: "countdown__unit" },
        el("span", { class: "countdown__num" }, String(value)),
        el("span", { class: "countdown__label" }, label));
    }

    function tick() {
      const ms = target - new Date();
      if (ms <= 0) {
        box.replaceChildren(el("p", { class: "countdown__done" }, "Finals are here. You've got this! 💪"));
        return false;
      }
      const minutes = Math.floor(ms / 60000);
      const days = Math.floor(minutes / 1440);
      const hours = Math.floor((minutes % 1440) / 60);
      const mins = minutes % 60;
      box.setAttribute("aria-label", days + " days, " + hours + " hours, " + mins + " minutes until finals");
      box.replaceChildren(
        el("p", { class: "countdown__title" }, "Finals start in"),
        el("div", { class: "countdown__units", "aria-hidden": "true" },
          unit(days, days === 1 ? "day" : "days"),
          unit(hours, hours === 1 ? "hour" : "hours"),
          unit(mins, mins === 1 ? "min" : "mins"))
      );
      return true;
    }

    if (tick()) {
      const timer = setInterval(function () { if (!tick()) clearInterval(timer); }, 30000);
    }
  }

  /* ---------- Search + counts ---------- */
  async function setupSearch() {
    const input = document.getElementById("subject-search");
    const results = document.getElementById("search-results");
    const status = document.getElementById("search-status");
    const subjects = await StudyData.getSubjects();

    // Show "· 4 classes" on each big button.
    Object.keys(CATEGORIES).forEach(function (cat) {
      const n = subjects.filter(function (s) { return s.category === cat; }).length;
      const slot = document.querySelector('[data-count="' + cat + '"]');
      if (slot && n) slot.textContent = "· " + n + (n === 1 ? " class" : " classes");
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
        .sort(function (a, b) { return a.name.localeCompare(b.name); });

      status.textContent = matches.length
        ? matches.length + (matches.length === 1 ? " class found" : " classes found")
        : "No classes match “" + input.value.trim() + "”.";

      results.replaceChildren(...matches.map(function (s) {
        const cat = CATEGORIES[s.category] || { label: s.category };
        return el("li", null,
          el("a", { class: "search-result", href: "subject.html?id=" + encodeURIComponent(s.id) },
            el("span", { class: "search-result__icon", "aria-hidden": "true" }, s.icon || "📄"),
            el("span", { class: "search-result__name" }, s.name),
            el("span", { class: "pill pill--" + s.category }, cat.label)));
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
