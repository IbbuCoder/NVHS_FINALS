/*
 * subject.js — the one template used for EVERY subject.
 * URL: subject.html?id=science
 *
 * Builds: header, unit picker, and for the chosen unit: key terms,
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
      el("p", null, "We couldn't find that class. ", el("a", { href: "index.html" }, "Go back home"), "."));
  }

  /* ---------- One unit's study tools ---------- */
  function renderUnit(unit) {
    const terms = unit.keyTerms || [];
    return el("div", { class: "unit" },
      el("section", { class: "card", "aria-labelledby": "terms-title" },
        el("h3", { id: "terms-title" }, "🔑 Key terms"),
        terms.length
          ? el("dl", { class: "terms" }, terms.map(function (t) {
              return el("div", { class: "term" },
                el("dt", null, t.term),
                el("dd", null, t.definition));
            }))
          : el("p", { class: "empty" }, "No key terms for this unit yet.")),

      el("section", { class: "card", "aria-labelledby": "cards-title" },
        el("h3", { id: "cards-title" }, "🃏 Flashcards"),
        createFlashcards(unit.flashcards || [])),

      el("section", { class: "card", "aria-labelledby": "quiz-title" },
        el("h3", { id: "quiz-title" }, "✅ Quick quiz"),
        createQuiz(unit.quiz || [])));
  }

  /* ---------- Unit picker + panel ---------- */
  function renderUnits(units) {
    if (!units.length) {
      return el("section", { class: "card empty-state" },
        el("p", { class: "empty-state__icon", "aria-hidden": "true" }, "🚧"),
        el("h2", null, "Study material coming soon"),
        el("p", null, "Nobody has added units for this class yet. Check the notebooks below, or ",
          el("a", { href: "share.html" }, "share one of your own"), "."));
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
    return el("section", { "aria-label": "Units" },
      el("nav", { class: "unit-tabs", "aria-label": "Choose a unit" }, buttons),
      panel);
  }

  /* ---------- Student notebooks ---------- */
  function renderNotebooks(subject, notebooks) {
    const shareHref = "share.html?subject=" + encodeURIComponent(subject.id);
    const safe = notebooks.filter(function (n) {
      // Only show real https links.
      try { return new URL(n.url).protocol === "https:"; } catch (e) { return false; }
    });

    return el("section", { class: "card notebooks", "aria-labelledby": "notebooks-title" },
      el("h2", { id: "notebooks-title" }, "📓 Student notebooks"),
      el("p", { class: "muted" }, "NotebookLM notebooks shared by other students. They open in a new tab."),
      safe.length
        ? el("ul", { class: "notebook-list" }, safe.map(function (n) {
            return el("li", null,
              el("a", { class: "notebook-link", href: n.url, target: "_blank", rel: "noopener noreferrer" },
                el("span", { class: "notebook-link__title" }, n.title || "NotebookLM notebook"),
                n.addedBy ? el("span", { class: "notebook-link__by" }, "Shared by " + n.addedBy) : null,
                el("span", { class: "visually-hidden" }, " (opens in a new tab)")));
          }))
        : el("p", { class: "empty" }, "No notebooks yet. Be the first to share one!"),
      el("a", { class: "btn btn--primary", href: shareHref }, "Share a notebook"));
  }

  /* ---------- Page setup ---------- */
  async function init() {
    const id = getParam("id");
    if (!StudyData.isValidId(id)) return showNotFound();

    const subject = await StudyData.getSubject(id);
    if (!subject) return showNotFound();

    const cat = CATEGORIES[subject.category] || { label: subject.category };
    document.title = subject.name + " · " + siteTitle();
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

    root.replaceChildren(
      el("header", { class: "page-header subject-header", style: subject.color ? "--accent:" + subject.color : null },
        el("span", { class: "subject-header__icon", "aria-hidden": "true" }, subject.icon || "📄"),
        el("div", null,
          el("h1", null, subject.name),
          el("p", { class: "subject-header__meta" },
            el("span", { class: "pill pill--" + subject.category }, cat.label),
            subject.grade ? el("span", null, " Grade " + subject.grade) : null,
            content.units.length
              ? el("span", null, " · " + content.units.length + (content.units.length === 1 ? " unit" : " units"))
              : null))),
      renderUnits(content.units),
      renderNotebooks(subject, notebooks));
  }

  document.addEventListener("DOMContentLoaded", function () {
    init().catch(function (err) {
      console.error(err);
      root.replaceChildren(el("p", { class: "empty" }, "Something went wrong loading this class. Try refreshing."));
    });
  });
})();
