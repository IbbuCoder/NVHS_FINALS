// Where the data files put their content. Loaded before everything else.
// data/subjects.js calls FINALS.setCatalog(list) with every class, grouped by subject.
// Each data/classes/<id>.js calls FINALS.addClass(id, content), and a class with
// tools: true has data/classes/<id>-tools.js call FINALS.addTools(id, fn).
// fn(root, unit, content) runs every time one of that class's units is shown.
window.FINALS = {
  catalog: [],   // the grouped list from data/subjects.js, with ids filled in
  subjects: [],  // every class, one entry each (the rest of the site uses this)
  notebooks: [],
  classes: {},
  tools: {},
  addClass: function (id, content) { window.FINALS.classes[id] = content; },
  addTools: function (id, fn) { window.FINALS.tools[id] = fn; },

  // "English 1 Honors" -> "english-1-honors". "&" becomes "and".
  slug: function (text) {
    return String(text || '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  },

  // Turns the grouped list into one entry per class:
  // { id, name, category, subject, subjectId, filled, file, tools, exam }
  setCatalog: function (groups) {
    var F = window.FINALS;
    var seen = {};
    F.catalog = [];
    F.subjects = [];
    (groups || []).forEach(function (g) {
      var subjectId = F.slug(g.subject);
      var group = { category: g.category, subject: g.subject, subjectId: subjectId, classes: [] };
      (g.classes || []).forEach(function (c) {
        var id = c.id || F.slug(c.name);
        if (!id || seen[id]) {
          if (window.console) console.warn('data/subjects.js: two classes would share the id "' + id + '". Give one an id.');
          return;
        }
        seen[id] = true;
        var entry = {
          id: id, name: c.name, category: g.category, subject: g.subject, subjectId: subjectId,
          filled: !!c.filled, file: !!c.file, tools: !!c.tools, exam: c.exam || ''
        };
        group.classes.push(entry);
        F.subjects.push(entry);
      });
      F.catalog.push(group);
    });
  }
};
