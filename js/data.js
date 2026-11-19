/*
 * data.js — ALL data access lives here.
 *
 * Every page asks this module for data instead of reading files directly.
 * Right now it loads small .js data files from the /data folder. Later, if
 * you move to Supabase, you only rewrite the functions in this file; the
 * pages keep calling the same functions and get the same shapes back.
 *
 * Why .js files and not .json? Browsers refuse to fetch() local .json files
 * when you open index.html straight from your computer (file://). Loading a
 * <script> works everywhere, including GitHub Pages.
 */

// Data files put their contents in here.
window.STUDY_DATA = window.STUDY_DATA || {
  subjects: null, // filled by data/subjects.js
  notebooks: null, // filled by data/notebooks.js
  content: {}, // filled by data/subjects/<id>.js as STUDY_DATA.content["<id>"]
};

window.StudyData = (function () {
  const loading = {}; // remembers scripts we've already requested

  // Load a data script once and wait for it.
  function loadScript(src) {
    if (!loading[src]) {
      loading[src] = new Promise(function (resolve, reject) {
        const script = document.createElement("script");
        script.src = src;
        script.onload = function () { resolve(); };
        script.onerror = function () {
          delete loading[src];
          reject(new Error("Could not load " + src));
        };
        document.head.appendChild(script);
      });
    }
    return loading[src];
  }

  // Subject ids are used in file names, so only allow safe characters.
  function isValidId(id) {
    return typeof id === "string" && /^[a-z0-9-]+$/.test(id);
  }

  /** All subjects: [{ id, name, category, grade, icon, color }] */
  async function getSubjects() {
    await loadScript("data/subjects.js");
    return window.STUDY_DATA.subjects || [];
  }

  /** Subjects in one category ("core" or "encore"), sorted by name. */
  async function getSubjectsByCategory(category) {
    const all = await getSubjects();
    return all
      .filter(function (s) { return s.category === category; })
      .sort(function (a, b) { return a.name.localeCompare(b.name); });
  }

  /** One subject's info from the subjects list, or null. */
  async function getSubject(id) {
    const all = await getSubjects();
    return all.find(function (s) { return s.id === id; }) || null;
  }

  /** A subject's study content: { units: [...] }. Empty units if no file yet. */
  async function getSubjectContent(id) {
    if (!isValidId(id)) return { units: [] };
    try {
      await loadScript("data/subjects/" + id + ".js");
    } catch (err) {
      console.warn(err.message);
    }
    const content = window.STUDY_DATA.content[id];
    return content && Array.isArray(content.units) ? content : { units: [] };
  }

  /** Approved notebooks for a subject. */
  async function getNotebooks(subjectId) {
    await loadScript("data/notebooks.js");
    return (window.STUDY_DATA.notebooks || []).filter(function (n) {
      return n.approved === true && n.subjectId === subjectId;
    });
  }

  /**
   * Send a notebook submission.
   * Returns { ok: true } on success,
   *         { ok: false, reason: "not-configured" } if no endpoint is set,
   *         { ok: false, reason: "error" } if sending failed.
   */
  async function submitNotebook(submission) {
    const endpoint = window.SITE_CONFIG.notebookFormEndpoint || "";
    if (!endpoint || endpoint.indexOf("REPLACE-ME") !== -1) {
      return { ok: false, reason: "not-configured" };
    }
    try {
      const body = new FormData();
      Object.keys(submission).forEach(function (key) {
        body.append(key, submission[key]);
      });
      const res = await fetch(endpoint, {
        method: "POST",
        body: body,
        headers: { Accept: "application/json" },
      });
      return res.ok ? { ok: true } : { ok: false, reason: "error" };
    } catch (err) {
      return { ok: false, reason: "error" };
    }
  }

  return {
    isValidId: isValidId,
    getSubjects: getSubjects,
    getSubjectsByCategory: getSubjectsByCategory,
    getSubject: getSubject,
    getSubjectContent: getSubjectContent,
    getNotebooks: getNotebooks,
    submitNotebook: submitNotebook,
  };
})();
