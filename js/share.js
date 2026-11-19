/*
 * share.js — the "Share a notebook" form.
 * Validates every field (including that the link is a NotebookLM link),
 * then hands the submission to StudyData.submitNotebook().
 * Tip: share.html?subject=science pre-selects a class.
 */
(function () {
  /** True if the text looks like https://notebooklm.google.com/notebook/<id> */
  function isNotebookLmLink(value) {
    try {
      const url = new URL(value.trim());
      return url.protocol === "https:" &&
        url.hostname === "notebooklm.google.com" &&
        /^\/notebook\/[A-Za-z0-9_-]+/.test(url.pathname);
    } catch (e) {
      return false;
    }
  }

  const OTHER = "__other";

  async function init() {
    const form = document.getElementById("share-form");
    const select = document.getElementById("subject");
    const otherField = document.getElementById("other-class-field");
    const otherInput = document.getElementById("other-class");
    const urlInput = document.getElementById("url");
    const confirmBox = document.getElementById("confirm");
    const result = document.getElementById("form-result");
    const subjects = await StudyData.getSubjects();

    // Fill the class dropdown for the chosen category.
    function fillClasses(category, selectedId) {
      const list = subjects
        .filter(function (s) { return s.category === category; })
        .sort(function (a, b) { return a.name.localeCompare(b.name); });
      select.replaceChildren(
        el("option", { value: "" }, "Choose a class"),
        ...list.map(function (s) { return el("option", { value: s.id }, s.name); }),
        el("option", { value: OTHER }, "My class isn't listed"));
      select.disabled = false;
      select.value = selectedId || "";
      otherField.hidden = select.value !== OTHER;
    }

    form.querySelectorAll('input[name="category"]').forEach(function (radio) {
      radio.addEventListener("change", function () {
        fillClasses(radio.value);
        clearError("category");
      });
    });
    select.addEventListener("change", function () {
      otherField.hidden = select.value !== OTHER;
      clearError("subject");
    });

    // Pre-select from ?subject=<id>
    const preset = subjects.find(function (s) { return s.id === getParam("subject"); });
    if (preset) {
      form.querySelector('input[name="category"][value="' + preset.category + '"]').checked = true;
      fillClasses(preset.category, preset.id);
    }

    // ----- Error helpers -----
    const fields = {
      category: { input: form.querySelector('input[name="category"]'), error: document.getElementById("category-error") },
      subject: { input: select, error: document.getElementById("subject-error") },
      other: { input: otherInput, error: document.getElementById("other-class-error") },
      url: { input: urlInput, error: document.getElementById("url-error") },
      confirm: { input: confirmBox, error: document.getElementById("confirm-error") },
    };
    function setError(name, message) {
      const f = fields[name];
      f.error.textContent = message;
      f.error.hidden = false;
      f.input.setAttribute("aria-invalid", "true");
    }
    function clearError(name) {
      const f = fields[name];
      f.error.hidden = true;
      f.error.textContent = "";
      f.input.removeAttribute("aria-invalid");
    }
    urlInput.addEventListener("input", function () { clearError("url"); });
    otherInput.addEventListener("input", function () { clearError("other"); });
    confirmBox.addEventListener("change", function () { clearError("confirm"); });

    // ----- Submit -----
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      Object.keys(fields).forEach(clearError);
      result.replaceChildren();

      const category = (form.querySelector('input[name="category"]:checked') || {}).value;
      const invalid = [];

      if (!category) { setError("category", "Choose Core or Encore."); invalid.push("category"); }
      if (category && !select.value) { setError("subject", "Choose a class."); invalid.push("subject"); }
      if (select.value === OTHER && !otherInput.value.trim()) {
        setError("other", "Type the class name."); invalid.push("other");
      }
      if (!urlInput.value.trim()) {
        setError("url", "Paste the share link from NotebookLM."); invalid.push("url");
      } else if (!isNotebookLmLink(urlInput.value)) {
        setError("url", "This isn't a NotebookLM share link. Copy the link from the Share window in NotebookLM; it starts with https://notebooklm.google.com/notebook/");
        invalid.push("url");
      }
      if (!confirmBox.checked) { setError("confirm", "Check this box to confirm the notebook is your own notes with no personal info."); invalid.push("confirm"); }

      if (invalid.length) {
        fields[invalid[0]].input.focus();
        return;
      }

      const chosen = subjects.find(function (s) { return s.id === select.value; });
      const submission = {
        category: category,
        subjectId: chosen ? chosen.id : "",
        className: chosen ? chosen.name : otherInput.value.trim(),
        teacherPeriod: form.elements.teacherPeriod.value.trim(),
        title: form.elements.title.value.trim(),
        url: urlInput.value.trim(),
        submittedAt: new Date().toISOString(),
      };

      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.textContent = "Sending…";
      const outcome = await StudyData.submitNotebook(submission);
      button.disabled = false;
      button.textContent = "Submit notebook";

      if (outcome.ok) {
        result.className = "form-result is-good";
        result.replaceChildren(el("strong", null, "Notebook submitted."),
          el("p", null, "It will appear on the class page after a student editor approves it."));
        form.reset();
        select.disabled = true;
        otherField.hidden = true;
      } else if (outcome.reason === "not-configured") {
        result.className = "form-result is-info";
        result.replaceChildren(
          el("strong", null, "Your link is valid, but the form isn't connected yet, so nothing was sent."),
          el("p", null, "Site editors: set notebookFormEndpoint in js/config.js to turn submissions on. This is what would have been sent:"),
          el("pre", null, JSON.stringify(submission, null, 2)));
      } else {
        result.className = "form-result is-bad";
        result.replaceChildren(el("strong", null, "Your notebook wasn't submitted. Check your internet connection and try again."));
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    init().catch(function (err) { console.error(err); });
  });
})();
