/*
 * category.js — shows every class in Core or Encore as a card.
 * URL: category.html?type=core  or  category.html?type=encore
 */
(function () {
  async function init() {
    const type = getParam("type");
    const cat = CATEGORIES[type];
    const title = document.getElementById("category-title");
    const grid = document.getElementById("subject-grid");

    if (!cat) {
      renderBreadcrumb(document.getElementById("breadcrumb"), [
        { label: "Home", href: "index.html" },
        { label: "Not found" },
      ]);
      title.textContent = "Category not found";
      document.getElementById("category-blurb").replaceChildren(
        "Try ", el("a", { href: "category.html?type=core" }, "Core"),
        " or ", el("a", { href: "category.html?type=encore" }, "Encore"), ".");
      return;
    }

    document.title = cat.label + " · " + (window.SITE_CONFIG.siteTitle || "Finals Study Guide");
    document.body.dataset.category = type;
    title.textContent = cat.icon + " " + cat.label;
    document.getElementById("category-blurb").textContent = cat.blurb;
    renderBreadcrumb(document.getElementById("breadcrumb"), [
      { label: "Home", href: "index.html" },
      { label: cat.label },
    ]);

    const subjects = await StudyData.getSubjectsByCategory(type);
    if (!subjects.length) {
      grid.replaceWith(el("p", { class: "empty" }, "No classes here yet."));
      return;
    }

    grid.replaceChildren(...subjects.map(function (s) {
      return el("li", null,
        el("a", {
          class: "subject-card",
          href: "subject.html?id=" + encodeURIComponent(s.id),
          style: s.color ? "--accent:" + s.color : null,
        },
          el("span", { class: "subject-card__icon", "aria-hidden": "true" }, s.icon || "📄"),
          el("span", { class: "subject-card__name" }, s.name),
          s.grade ? el("span", { class: "subject-card__meta" }, "Grade " + s.grade) : null,
          el("span", { class: "subject-card__go", "aria-hidden": "true" }, "→")));
    }));
  }

  document.addEventListener("DOMContentLoaded", function () {
    init().catch(function (err) { console.error(err); });
  });
})();
