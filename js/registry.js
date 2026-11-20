// Where the data files put their content. Loaded before everything else.
// data/subjects.js fills FINALS.subjects, data/notebooks.js fills FINALS.notebooks,
// each data/classes/<id>.js calls FINALS.addClass(id, content), and a class with
// tools: true in data/subjects.js has data/classes/<id>-tools.js call FINALS.addTools(id, fn).
// fn(root, unit, content) runs every time one of that class's units is shown.
window.FINALS = {
  subjects: [],
  notebooks: [],
  classes: {},
  tools: {},
  addClass: function (id, content) { window.FINALS.classes[id] = content; },
  addTools: function (id, fn) { window.FINALS.tools[id] = fn; }
};
