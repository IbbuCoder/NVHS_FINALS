/*
 * common.js — small helpers shared by every page:
 *   - el()            build HTML elements safely (no innerHTML with data)
 *   - getParam()      read ?id=... from the URL
 *   - renderBreadcrumb()
 *   - dark mode toggle
 *   - fills in the site title / school name from config.js
 */

const CATEGORIES = {
  core: { label: "Core", blurb: "Main classes" },
  encore: { label: "Encore", blurb: "Electives" },
};

/**
 * el("a", { href: "x.html", class: "card" }, "Text", childEl)
 * Strings become text (safe), elements are appended as-is.
 */
function el(tag, attrs, ...children) {
  const node = document.createElement(tag);
  Object.entries(attrs || {}).forEach(function ([key, value]) {
    if (value === null || value === undefined || value === false) return;
    if (key === "class") node.className = value;
    else if (key.startsWith("on") && typeof value === "function") {
      node.addEventListener(key.slice(2), value);
    } else if (value === true) node.setAttribute(key, "");
    else node.setAttribute(key, value);
  });
  children.flat().forEach(function (child) {
    if (child === null || child === undefined || child === false) return;
    node.append(child instanceof Node ? child : String(child));
  });
  return node;
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/** items: [{ label, href }] — the last item is the current page (no link). */
function renderBreadcrumb(container, items) {
  const list = el("ol");
  items.forEach(function (item, i) {
    const isLast = i === items.length - 1;
    list.append(
      el("li", null,
        isLast
          ? el("span", { "aria-current": "page" }, item.label)
          : el("a", { href: item.href }, item.label))
    );
  });
  container.replaceChildren(list);
}

/* ---------- Dark mode ----------
 * A tiny script in each page's <head> sets data-theme before the page draws
 * (so there's no white flash). This code wires up the toggle button. */
function setupThemeToggle() {
  const button = document.querySelector(".theme-toggle");
  if (!button) return;

  function update() {
    const dark = document.documentElement.dataset.theme === "dark";
    button.setAttribute("aria-pressed", String(dark));
  }

  button.addEventListener("click", function () {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked: fine */ }
    update();
  });
  update();
}

function fillSiteInfo() {
  const cfg = window.SITE_CONFIG || {};
  document.querySelectorAll("[data-site-title]").forEach(function (node) {
    node.textContent = cfg.siteTitle || "Finals Study Guide";
  });
  document.querySelectorAll("[data-school-name]").forEach(function (node) {
    if (cfg.schoolName) {
      node.textContent = cfg.schoolName;
      node.hidden = false;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setupThemeToggle();
  fillSiteInfo();
});
