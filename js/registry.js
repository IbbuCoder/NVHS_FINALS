// Where the data files put their content. Loaded before everything else.
// data/subjects.js fills FINALS.subjects, data/notebooks.js fills FINALS.notebooks,
// and each data/classes/<id>.js calls FINALS.addClass(id, content).
window.FINALS = {
  subjects: [],
  notebooks: [],
  classes: {},
  addClass: function (id, content) { window.FINALS.classes[id] = content; }
};
