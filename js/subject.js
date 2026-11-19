/*
 * subject.js — the one template used for EVERY subject.
 * URL: subject.html?id=science
 *
 * Builds: header, unit tabs, and for the chosen unit: key terms,
 * flashcards, quiz. Then the "Student notebooks" list at the bottom.
 */
(function () {
  const root = document.getElementById("subject-root");
  const siteTitle = function () { return window.SITE_CONFIG.siteTitle || "Finals Study Guide"; };

  function showNotFound() {
    renderBreadcrumb(document.getElementById("breadcrumb"), [
      { label: "Home", href: "index.html" },
      { label: "Class not found" },
    ]);
    root.replaceChildren(
      el("h1", null, "Class not found"),
      el("p", null, "This link doesn't match any class on the site. ",
        el("a", { href: "index.html" }, "Search for the class on the home page"), "."));
  }

  /* ---------- One unit's study tools ---------- */
  function renderUnit(unit) {
    const terms = unit.keyTerms || [];
    return el("div", { class: "unit" },
      el("section", { class: "study-section", "aria-labelledby": "terms-title" },
        el("h3", { id: "terms-title" }, "Key terms"),
        terms.length
          ? el("dl", { class: "terms" }, terms.map(function (t) {
              return el("div", { class: "term" },
                el("dt", null, t.term),
                el("dd", null, t.definition));
            }))
          : el("p", { class: "empty" }, "This unit has no key terms yet.")),

      el("section", { class: "study-section", "aria-labelledby": "cards-title" },
        el("h3", { id: "cards-title" }, "Flashcards"),
        createFlashcards(unit.flashcards || [])),

      el("section", { class: "study-section", "aria-labelledby": "quiz-title" },
        el("h3", { id: "quiz-title" }, "Practice quiz"),
        createQuiz(unit.quiz || [])));
  }

  /* ---------- Unit tabs + panel ---------- */
  function renderUnits(subject, units) {
    if (!units.length) {
      return el("section", { class: "coming-soon" },
        el("h2", null, "No study material yet"),
        el("p", null, "Nobody has added units for " + subject.name +
          ". Student notebooks for this class are listed below."));
    }

    const panel = el("div", { class: "unit-panel", id: "unit-panel" });
    const buttons = units.map(function (unit, i) {
      return el("button", {
        class: "unit-tab",
        type: "button",
        "aria-pressed": "false",
        "aria-controls": "unit-panel",
        onclick: function () { select(i, true); },
      }, unit.title || "Unit " + (i + 1));
    });

    function select(i, moveFocus) {
      buttons.forEach(function (b, j) { b.setAttribute("aria-pressed", String(i === j)); });
      panel.replaceChildren(
        el("h2", { class: "unit-panel__title", tabindex: "-1" }, units[i].title || "Unit " + (i + 1)),
        renderUnit(units[i]));
      if (moveFocus) panel.querySelector(".unit-panel__title").focus();
    }

    select(0, false);
    // Only show tabs when there's more than one unit to choose from.
    return el("section", { "aria-label": "Units" },
      units.length > 1 ? el("nav", { class: "unit-tabs", "aria-label": "Choose a unit" }, buttons) : null,
      panel);
  }

  /* ---------- Student notebooks ---------- */
  function renderNotebooks(subject, notebooks) {
    const shareHref = "share.html?subject=" + encodeURIComponent(subject.id);
    const safe = notebooks.filter(function (n) {
      // Only show real https links.
      try { return new URL(n.url).protocol === "https:"; } catch (e) { return false; }
    });

    return el("section", { class: "study-section", "aria-labelledby": "notebooks-title" },
      el("h3", { id: "notebooks-title" }, "Student notebooks"),
      safe.length
        ? el("ul", { class: "notebook-list" }, safe.map(function (n) {
            return el("li", null,
              el("a", { class: "notebook-link", href: n.url, target: "_blank", rel: "noopener noreferrer" },
                n.title || "NotebookLM notebook",
                el("span", { class: "visually-hidden" }, " (opens in a new tab)"),
                n.addedBy ? el("span", { class: "notebook-link__by" }, "Shared by " + n.addedBy) : null));
          }))
        : el("p", { class: "empty" }, "No notebooks yet. Be the first to share one!"),
      el("a", { class: "btn", href: shareHref }, "Share a notebook for " + subject.name));
  }

  /* ---------- Page setup ---------- */
  async function init() {
    const id = getParam("id");
    if (!StudyData.isValidId(id)) return showNotFound();

    const subject = await StudyData.getSubject(id);
    if (!subject) return showNotFound();

    const cat = CATEGORIES[subject.category] || { label: subject.category };
    document.title = subject.name + " | " + siteTitle();
    document.body.dataset.category = subject.category;
    renderBreadcrumb(document.getElementById("breadcrumb"), [
      { label: "Home", href: "index.html" },
      { label: cat.label, href: "category.html?type=" + encodeURIComponent(subject.category) },
      { label: subject.name },
    ]);

    const [content, notebooks] = await Promise.all([
      StudyData.getSubjectContent(id),
      StudyData.getNotebooks(id),
    ]);

    const n = content.units.length;
    const summary = n
      ? (n === 1 ? "1 unit" : n + " units") + ". Pick a unit, learn the key terms, drill the flashcards, then take the practice quiz."
      : null;

    root.replaceChildren(
      el("header", { class: "page-header subject-header" },
        el("h1", null, subject.name),
        el("p", null, (subject.grade ? "Grade " + subject.grade + " " : "") + cat.label + " class. " + (summary || ""))),
      renderUnits(subject, content.units),
      renderNotebooks(subject, notebooks));
  }

  document.addEventListener("DOMContentLoaded", function () {
    init().catch(function (err) {
      console.error(err);
      root.replaceChildren(el("p", { class: "empty" }, "This class didn't load. Refresh the page to try again."));
    });
  });
})();
