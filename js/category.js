/*
 * category.js — shows every class in Core or Encore as a card.
 * URL: category.html?type=core  or  category.html?type=encore
 */
(function () {
  async function init() {
    const type = getParam("type");
    const cat = CATEGORIES[type];
    const title = document.getElementById("category-title");
    const blurb = document.getElementById("category-blurb");
    const grid = document.getElementById("subject-grid");

    if (!cat) {
      renderBreadcrumb(document.getElementById("breadcrumb"), [
        { label: "Home", href: "index.html" },
        { label: "Page not found" },
      ]);
      title.textContent = "Page not found";
      blurb.replaceChildren(
        "Choose ", el("a", { href: "category.html?type=core" }, "Core"),
        " or ", el("a", { href: "category.html?type=encore" }, "Encore"), " instead.");
      return;
    }

    document.title = cat.label + " classes | " + (window.SITE_CONFIG.siteTitle || "Finals Study Guide");
    document.body.dataset.category = type;
    title.textContent = cat.label;
    blurb.textContent = cat.blurb;
    renderBreadcrumb(document.getElementById("breadcrumb"), [
      { label: "Home", href: "index.html" },
      { label: cat.label },
    ]);

    const subjects = await StudyData.getSubjectsByCategory(type);
    if (!subjects.length) {
      grid.replaceWith(el("p", { class: "empty" }, "No " + cat.label + " classes have been added yet."));
      return;
    }

    // Load each class's content so the card can say whether it has material yet.
    const contents = await Promise.all(subjects.map(function (s) { return StudyData.getSubjectContent(s.id); }));

    grid.replaceChildren(...subjects.map(function (s, i) {
      const units = contents[i].units.length;
      const status = units ? (units === 1 ? "1 unit" : units + " units") : "No study material yet";
      return el("li", null,
        el("a", {
          class: "subject-card",
          href: "subject.html?id=" + encodeURIComponent(s.id),
          style: s.color ? "--accent:" + s.color : null,
        },
          el("span", { class: "subject-card__name" }, s.name),
          el("span", { class: "subject-card__status" },
            s.grade ? el("span", null, "Grade " + s.grade, el("br")) : null,
            status)));
    }));
  }

  document.addEventListener("DOMContentLoaded", function () {
    init().catch(function (err) { console.error(err); });
  });
})();
