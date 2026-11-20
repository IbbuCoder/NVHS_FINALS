// PE / Health: the interactive parts of the lessons, from the PE Midterm study site.
// Muscle map (Muscles, Machines, Quiz mode, Type it), heart rate gauge, 1 Rep Max
// calculator, aerobic/anaerobic sorter, body composition method matcher, fat cell
// timeline and the small diagrams. Loaded because pe-health has tools: true in
// data/subjects.js. Each tool only runs if its unit is on the page.
(function () {
  'use strict';

  /* ---------- Body figure (front and back views) ----------
     Shapes are lists of [x, y] points for the right half of a figure centered on x = 0. */

  // Turns points into a smooth closed curve.
  function smooth(pts) {
    var n = pts.length;
    var d = 'M' + pts[0][0] + ' ' + pts[0][1];
    for (var i = 0; i < n; i++) {
      var p0 = pts[(i - 1 + n) % n];
      var p1 = pts[i];
      var p2 = pts[(i + 1) % n];
      var p3 = pts[(i + 2) % n];
      var c1x = p1[0] + (p2[0] - p0[0]) / 6;
      var c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6;
      var c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += 'C' + c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ' ' + c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ' ' + p2[0] + ' ' + p2[1];
    }
    return d + 'Z';
  }

  // One shape that crosses the midline: right half plus its mirror.
  function sym(half) {
    var left = [];
    for (var i = half.length - 1; i >= 0; i--) {
      if (half[i][0] !== 0) left.push([-half[i][0], half[i][1]]);
    }
    return half.concat(left);
  }

  function mirror(pts) {
    return pts.map(function (p) { return [-p[0], p[1]]; });
  }

  function pair(pts) {
    return [smooth(pts), smooth(mirror(pts))];
  }

  function rect(x, y, w, h) {
    return [[x + 2, y], [x + w / 2, y - 0.5], [x + w - 2, y], [x + w, y + 2], [x + w, y + h - 2], [x + w - 2, y + h], [x + w / 2, y + h + 0.5], [x + 2, y + h], [x, y + h - 2], [x, y + 2]];
  }

  var TORSO = sym([[8, 44], [10, 54], [24, 60], [40, 66], [40, 84], [39, 104], [34, 132], [29, 165], [33, 190], [38, 210], [30, 228], [0, 234]]);
  var ARM = [[40, 63], [50, 65], [58, 76], [60, 100], [61, 130], [62, 150], [65, 175], [66, 205], [68, 222], [66, 238], [59, 240], [55, 225], [53, 205], [48, 175], [45, 150], [42, 125], [38, 100], [36, 78]];
  var LEG = [[20, 200], [36, 205], [38, 230], [35, 265], [28, 298], [29, 318], [31, 335], [26, 360], [18, 382], [20, 390], [26, 397], [10, 398], [9, 382], [7, 350], [7, 320], [9, 300], [5, 265], [2, 228], [4, 205]];

  var SILHOUETTE = [smooth(TORSO)].concat(pair(ARM), pair(LEG));

  var ABS = [];
  [111, 129, 147].forEach(function (y) { ABS = ABS.concat(pair(rect(2, y, 17, 15))); });
  ABS = ABS.concat(pair([[2, 165], [18, 165], [17, 185], [8, 205], [2, 210]]));

  var MUSCLES = {
    front: [
      { id: 'pectorals', paths: pair([[2, 74], [18, 69], [36, 74], [41, 86], [36, 100], [22, 107], [8, 106], [2, 100]]), badge: [20, 89] },
      { id: 'abdominals', paths: ABS, badge: [0, 146] },
      { id: 'deltoids', paths: pair([[38, 63], [49, 64], [58, 76], [60, 96], [55, 108], [47, 100], [42, 84], [37, 72]]), badge: [49, 84] },
      { id: 'biceps', paths: pair([[45, 110], [55, 110], [60, 125], [59, 143], [52, 150], [47, 143], [43, 125]]), badge: [52, 130] },
      { id: 'quadriceps', paths: pair([[20, 208], [34, 212], [37, 232], [33, 265], [27, 294], [18, 300], [10, 292], [8, 265], [6, 240], [10, 218]]), badge: [21, 256] }
    ],
    back: [
      { id: 'trapezius', paths: [smooth(sym([[8, 46], [11, 56], [24, 62], [40, 68], [30, 80], [16, 98], [6, 118], [0, 132]]))], badge: [0, 84] },
      { id: 'lats', paths: pair([[16, 102], [26, 98], [38, 100], [37, 122], [31, 148], [26, 165], [10, 180], [3, 176], [4, 150], [8, 125]]), badge: [21, 138] },
      { id: 'triceps', paths: pair([[45, 100], [56, 98], [60, 120], [59, 143], [52, 150], [47, 143], [42, 120]]), badge: [52, 124] },
      { id: 'glutes', paths: pair([[3, 192], [20, 184], [34, 192], [38, 212], [30, 230], [12, 233], [3, 226]]), badge: [20, 209] },
      { id: 'hamstrings', paths: pair([[10, 238], [20, 236], [32, 238], [36, 255], [31, 285], [26, 302], [19, 305], [12, 300], [8, 270], [6, 250]]), badge: [21, 270] },
      { id: 'gastrocnemius', paths: pair([[11, 314], [19, 309], [27, 314], [30, 333], [26, 354], [20, 368], [14, 362], [9, 345], [8, 328]]), badge: [19, 337] }
    ]
  };

  // Faint non-clickable lines that make the figure read as a body.
  var DETAILS = {
    front: ['M0 74V106', 'M-14 306Q-18 316 -14 324', 'M14 306Q18 316 14 324', 'M50 160Q54 180 57 205', 'M-50 160Q-54 180 -57 205'],
    back: ['M0 132V188', 'M0 190V230', 'M50 160Q54 180 57 205', 'M-50 160Q-54 180 -57 205', 'M38 70Q50 76 54 92', 'M-38 70Q-50 76 -54 92']
  };

  function paths(list, cls) {
    return list.map(function (d) { return '<path class="' + cls + '" d="' + d + '"/>'; }).join('');
  }

  function figure(view, cx, numbers) {
    var html = '<g transform="translate(' + cx + ' 24)">';
    // Stroked layer first, filled layer on top, so only the outer edge shows.
    var shapes = '<ellipse cx="0" cy="24" rx="17" ry="23"/>' + SILHOUETTE.map(function (d) { return '<path d="' + d + '"/>'; }).join('');
    html += '<g class="body-line">' + shapes + '</g><g class="body-fill">' + shapes + '</g>';
    html += paths(DETAILS[view], 'body-detail');

    var shapesHtml = '';
    var badges = '';
    MUSCLES[view].forEach(function (m) {
      shapesHtml += '<g class="m" data-muscle="' + m.id + '">' + paths(m.paths, 'm-shape') + paths(m.paths, 'm-hit') + '</g>';
      badges += '<g class="m-badge" data-muscle="' + m.id + '" tabindex="0" role="button" transform="translate(' + m.badge[0] + ' ' + m.badge[1] + ')">' +
        '<circle class="b-hit" r="15"/><circle class="b-dot" r="9.5"/><text class="b-num" dy="0.35em">' + numbers[m.id] + '</text></g>';
    });
    return html + shapesHtml + badges + '</g>';
  }

  function buildBody(target, muscles) {
    var numbers = {};
    muscles.forEach(function (m) { numbers[m.id] = m.n; });
    target.innerHTML =
      '<svg viewBox="0 0 320 426" class="body-svg" role="group" aria-label="Human figure, front and back views, with numbered muscles">' +
      '<text class="view-label" x="80" y="13">Front</text><text class="view-label" x="240" y="13">Back</text>' +
      figure('front', 80, numbers) + figure('back', 240, numbers) + '</svg>';
  }

  /* ---------- Shared helpers ---------- */

  var $ = function (s, root) { return root.querySelector(s); };
  var $$ = function (s, root) { return Array.prototype.slice.call(root.querySelectorAll(s)); };

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // Best scores and the numbers typed into the calculators, kept in this browser only.
  var KEY = 'finals-pe-tools';
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { saved = {}; }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) { /* storage full or blocked */ }
  }

  var D = null; // this class's content (muscles, machines, activities, methods, plainMuscles)

  /* ---------- Muscle map and machine matcher ---------- */

  var map = null;

  function muscleById(id) {
    return D.muscles.filter(function (m) { return m.id === id; })[0];
  }

  function machinesFor(id) {
    return D.machines.filter(function (m) { return m.muscles.indexOf(id) > -1; });
  }

  function newMapQuiz() {
    return { answers: {}, past: {}, current: null, options: [], picked: null, hint: '', typed: '' };
  }

  function isQuiz() {
    return map.mode === 'quiz' || map.mode === 'type';
  }

  function bestKey() {
    return map.mode === 'type' ? 'typeBest' : 'mapBest';
  }

  function paintMap() {
    var root = map.root;
    var lit = [];
    if (map.mode === 'explore' && map.muscle) lit = [map.muscle];
    if (map.mode === 'machines' && map.machine) lit = map.machine.muscles;
    if (isQuiz() && map.quiz.current) lit = [map.quiz.current];

    var misses = saved.mapMiss || {};
    $$('#figure .m', root).forEach(function (el) {
      var count = map.mode === 'explore' ? misses[el.dataset.muscle] || 0 : 0;
      el.classList.toggle('weak-1', count === 1);
      el.classList.toggle('weak-2', count > 1);
    });

    $$('#figure [data-muscle]', root).forEach(function (el) {
      var id = el.dataset.muscle;
      el.classList.toggle('is-on', lit.indexOf(id) > -1);
      var m = muscleById(id);
      if (el.classList.contains('m-badge')) {
        el.setAttribute('aria-label', isQuiz() ? 'Number ' + m.n : m.n + ', ' + m.name);
      }
      if (el.classList.contains('m')) {
        var result = isQuiz() ? map.quiz.answers[id] : null;
        var showing = isQuiz() && map.quiz.current === id;
        el.classList.toggle('is-right', result === true && !showing);
        el.classList.toggle('is-wrong', result === false && !showing);
      }
    });
    $$('#key-body tr', root).forEach(function (tr) {
      tr.style.background = lit.indexOf(tr.dataset.muscle) > -1 ? 'var(--fill)' : '';
    });
  }

  function renderPanel() {
    var panel = $('#map-panel', map.root);
    if (map.mode === 'explore') {
      var m = map.muscle && muscleById(map.muscle);
      if (!m) {
        panel.innerHTML = '<p class="panel-empty">Tap a muscle or its number.' +
          (Object.keys(saved.mapMiss || {}).length ? ' Shaded muscles are the ones you keep missing.' : '') + '</p>';
      } else {
        var ms = machinesFor(m.id);
        panel.innerHTML =
          '<div class="panel-head"><span class="panel-num">' + m.n + '</span><div><div class="panel-name">' + esc(m.name) + '</div>' +
          '<div class="panel-view">' + m.view + ' view</div><span class="plain">' + esc(D.plainMuscles[m.id]) + '</span></div></div>' +
          '<p class="panel-row"><strong>Machine / exercise:</strong> ' +
          (ms.length ? ms.map(function (x) { return esc(x.name); }).join(', ') : 'None on the class machine list') + '</p>';
      }
    } else if (map.mode === 'machines') {
      if (!map.machine) {
        panel.innerHTML = '<p class="panel-empty">Pick a machine or exercise to see what it works.</p>';
      } else {
        panel.innerHTML =
          '<div class="panel-name">' + esc(map.machine.name) + '</div>' +
          '<p class="panel-row"><strong>Works:</strong> ' + esc(map.machine.works) + '</p>' +
          '<p class="panel-view">Muscle ' + map.machine.muscles.map(function (id) { return 'number ' + muscleById(id).n; }).join(' and ') + ' on the chart</p>';
      }
    } else {
      renderQuizPanel(panel);
    }
    paintMap();
  }

  function renderQuizPanel(panel) {
    var q = map.quiz;
    var total = D.muscles.length;
    var done = Object.keys(q.answers).length;
    var right = Object.keys(q.answers).filter(function (k) { return q.answers[k]; }).length;
    var tally = '<div class="quiz-tally"><span>' + done + ' of ' + total + ' done, ' + right + ' right</span>' +
      '<button type="button" class="link-btn" data-restart>Start over</button></div>';

    if (done === total && !q.current) {
      panel.innerHTML = '<div class="panel-name">' + right + ' of ' + total + '</div>' +
        '<p class="panel-row">' + (saved[bestKey()] != null ? 'Best: ' + saved[bestKey()] + ' of ' + total : '') + '</p>' + tally;
    } else if (!q.current) {
      panel.innerHTML = '<p class="panel-empty">Tap a number on the figure, then ' + (map.mode === 'type' ? 'type' : 'pick') + ' the muscle name.</p>' + tally;
    } else if (map.mode === 'type') {
      var muscle = muscleById(q.current);
      if (q.picked !== null) {
        panel.innerHTML = '<p class="panel-q">Number ' + muscle.n + '</p><div class="panel-name">' + esc(muscle.name) + '</div>' +
          '<p class="type-result">' + (q.answers[q.current] ? 'Correct' : 'You typed: ' + esc(q.picked)) + '</p>' + tally;
      } else {
        panel.innerHTML = '<p class="panel-q">Type muscle number ' + muscle.n + '</p>' +
          '<form class="type-form" data-type-form><input class="type-input" id="type-input" type="text" aria-label="Muscle name" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" value="' + esc(q.typed) + '">' +
          '<button type="submit" class="btn solid">Check</button></form>' +
          (q.hint ? '<p class="type-result game-msg bad">' + esc(q.hint) + '</p>' : '') + tally;
      }
    } else {
      var m = muscleById(q.current);
      var picked = q.picked;
      panel.innerHTML =
        '<p class="panel-q">Which muscle is number ' + m.n + '?</p><div class="quiz-opts">' +
        q.options.map(function (o) {
          var cls = 'opt';
          if (picked) {
            if (o.id === q.current) cls += ' right';
            else if (o.id === picked) cls += ' wrong';
          }
          return '<button type="button" class="' + cls + '" data-opt="' + o.id + '"' + (picked ? ' disabled' : '') + '>' + esc(o.name) + '</button>';
        }).join('') + '</div>' + tally;
    }
  }

  function askMuscle(id) {
    var q = map.quiz;
    // An answered number reopens with its saved choices, so the score can't change.
    var past = q.past[id];
    q.current = id;
    q.options = past ? past.options : quizOptions(id);
    q.picked = past ? past.picked : null;
    q.hint = '';
    q.typed = '';
    renderPanel();
    focusTyping();
  }

  function focusTyping() {
    var input = $('#type-input', map.root);
    if (input) input.focus({ preventScroll: true });
  }

  function quizOptions(id) {
    var others = shuffle(D.muscles.filter(function (m) { return m.id !== id; })).slice(0, 3);
    return shuffle(others.concat([muscleById(id)]));
  }

  function recordMuscle(picked, isRight) {
    var q = map.quiz;
    var total = D.muscles.length;
    q.picked = picked;
    q.answers[q.current] = isRight;
    q.past[q.current] = { options: q.options, picked: picked };
    saved.mapMiss = saved.mapMiss || {};
    var missCount = (saved.mapMiss[q.current] || 0) + (isRight ? -1 : 1);
    if (missCount > 0) saved.mapMiss[q.current] = missCount;
    else delete saved.mapMiss[q.current];
    var right = Object.keys(q.answers).filter(function (k) { return q.answers[k]; }).length;
    if (Object.keys(q.answers).length === total) saved[bestKey()] = Math.max(saved[bestKey()] || 0, right);
    save();
    renderPanel();
    if (Object.keys(q.answers).length === total) {
      var current = map;
      setTimeout(function () {
        if (map === current && isQuiz() && q === map.quiz) { q.current = null; renderPanel(); }
      }, 1400);
    }
  }

  function normalName(s) {
    return s.trim().toLowerCase().replace(/\s+/g, ' ');
  }

  // Counts the letter changes between two words, to spot near-miss spelling.
  function editDistance(a, b) {
    var row = [];
    for (var j = 0; j <= b.length; j++) row[j] = j;
    for (var i = 1; i <= a.length; i++) {
      var prev = row[0];
      row[0] = i;
      for (var k = 1; k <= b.length; k++) {
        var cur = row[k];
        row[k] = Math.min(row[k] + 1, row[k - 1] + 1, prev + (a[i - 1] === b[k - 1] ? 0 : 1));
        prev = cur;
      }
    }
    return row[b.length];
  }

  function answerTyped(text) {
    var q = map.quiz;
    var guess = normalName(text);
    var target = normalName(muscleById(q.current).name);
    if (!guess) return;
    // Typing a different muscle's name, like triceps for biceps, is a wrong answer.
    var otherMuscle = D.muscles.some(function (m) { return normalName(m.name) === guess; });
    if (!otherMuscle && editDistance(guess, target) <= 2 && !q.hint) {
      // One free retry for a near miss. A second try counts.
      q.hint = 'Close. Check the spelling.';
      q.typed = text;
      renderPanel();
      focusTyping();
      return;
    }
    recordMuscle(text.trim(), guess === target);
  }

  function setMapMode(mode) {
    var root = map.root;
    map.mode = mode;
    if (isQuiz()) map.quiz = newMapQuiz();
    $$('#map-modes button', root).forEach(function (b) {
      var on = b.dataset.mode === mode;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    $('#machine-list', root).hidden = mode !== 'machines';
    var key = $('#key-table', root);
    var hiddenNote = $('#key-hidden', root);
    if (key) key.hidden = isQuiz();
    if (hiddenNote) hiddenNote.hidden = !isQuiz();
    renderPanel();
  }

  function pickOnFigure(id) {
    if (map.mode === 'explore') {
      map.muscle = id;
      renderPanel();
    } else if (isQuiz()) {
      askMuscle(id);
    } else {
      // In Machines mode a tap shows the first machine or exercise for that muscle, if it has one.
      var ms = machinesFor(id);
      map.machine = ms[0] || null;
      paintMachines();
      renderPanel();
    }
  }

  function paintMachines() {
    $$('#machine-list button', map.root).forEach(function (b) {
      b.classList.toggle('is-on', !!map.machine && b.dataset.machine === map.machine.id);
    });
  }

  function buildMap(root) {
    map = { root: root, mode: 'explore', muscle: null, machine: null, quiz: null };
    buildBody($('#figure', root), D.muscles);

    $('#machine-list', root).innerHTML = D.machines.map(function (m) {
      return '<button type="button" data-machine="' + m.id + '">' + esc(m.name) + '</button>';
    }).join('');

    var keyBody = $('#key-body', root);
    if (keyBody) {
      keyBody.innerHTML = D.muscles.map(function (m) {
        var ms = machinesFor(m.id);
        return '<tr data-muscle="' + m.id + '"><td>' + m.n + '</td><td>' + esc(m.name) + '<span class="plain">' + esc(D.plainMuscles[m.id]) + '</span></td><td>' +
          (ms.length ? ms.map(function (x) { return esc(x.name); }).join(', ') : '—') + '</td></tr>';
      }).join('');
      keyBody.addEventListener('click', function (e) {
        var tr = e.target.closest('tr');
        if (!tr || map.mode !== 'explore') return;
        map.muscle = tr.dataset.muscle;
        renderPanel();
        $('#figure', root).scrollIntoView({ block: 'center' });
      });
    }

    $('#map-modes', root).addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (b) setMapMode(b.dataset.mode);
    });

    $('#machine-list', root).addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      map.machine = D.machines.filter(function (m) { return m.id === b.dataset.machine; })[0];
      paintMachines();
      renderPanel();
    });

    $('#figure', root).addEventListener('click', function (e) {
      var el = e.target.closest('[data-muscle]');
      if (el) pickOnFigure(el.dataset.muscle);
    });

    $('#figure', root).addEventListener('keydown', function (e) {
      var el = e.target.closest('.m-badge');
      if (el && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        pickOnFigure(el.dataset.muscle);
      }
    });

    $('#map-panel', root).addEventListener('click', function (e) {
      var opt = e.target.closest('[data-opt]');
      if (opt) recordMuscle(opt.dataset.opt, opt.dataset.opt === map.quiz.current);
      if (e.target.closest('[data-restart]')) setMapMode(map.mode);
    });

    $('#map-panel', root).addEventListener('submit', function (e) {
      e.preventDefault();
      answerTyped($('#type-input', root).value);
    });

    renderPanel();
  }

  /* ---------- Heart rate calculator ---------- */

  var GAUGE_MAX = 220;

  function polar(bpm, r) {
    var a = Math.PI * (1 - bpm / GAUGE_MAX);
    return [170 + r * Math.cos(a), 170 - r * Math.sin(a)];
  }

  function arc(from, to, r) {
    var p = polar(from, r);
    var q = polar(to, r);
    return 'M' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + 'A' + r + ' ' + r + ' 0 0 1 ' + q[0].toFixed(1) + ' ' + q[1].toFixed(1);
  }

  function buildGauge(root) {
    var ticks = [145, 186, 220].map(function (bpm) {
      var p = polar(bpm, 152);
      return '<text class="g-tick" x="' + p[0].toFixed(1) + '" y="' + (p[1] + 5).toFixed(1) + '">' + bpm + '</text>';
    }).join('');
    $('#gauge', root).innerHTML =
      '<svg viewBox="0 0 340 250" role="img" aria-label="Heart rate gauge showing beginner under 145 BPM, moderate to high 145 to 186 BPM, and your max heart rate">' +
      '<path class="g-track" d="' + arc(0, 145, 120) + '" stroke="var(--shape)"/>' +
      '<path class="g-track" d="' + arc(145, 186, 120) + '" stroke="var(--accent)"/>' +
      '<path class="g-track" d="' + arc(186, 220, 120) + '" stroke="var(--paper)"/>' +
      ticks +
      '<g class="g-needle" id="needle"><path d="M170 164 L62 170 L170 176Z" fill="var(--ink)"/></g>' +
      '<circle cx="170" cy="170" r="10" fill="var(--ink)"/>' +
      '<text class="g-big" x="170" y="224" id="g-val"></text>' +
      '<text class="g-unit" x="170" y="243">Max HR in BPM</text>' +
      '</svg>' +
      '<p class="bar-key" style="gap:16px;flex-wrap:wrap;margin:6px 0 0"><span style="width:auto">Grey: beginner</span><span>Red: moderate to high</span></p>';

    var input = $('#age', root);
    if (saved.age) input.value = saved.age;
    input.addEventListener('input', function () { updateHR(root, true); });
    updateHR(root, false);
  }

  function updateHR(root, remember) {
    var input = $('#age', root);
    var age = Number(input.value);
    var out = $('#hr-math', root);
    if (!input.value || !(age >= 1 && age <= 100) || age % 1 !== 0) {
      out.textContent = 'Enter a whole age from 1 to 100';
      out.style.fontSize = '24px';
      return;
    }
    var max = 220 - age;
    out.style.fontSize = '';
    out.textContent = '220 − ' + age + ' = ' + max;
    $('#g-val', root).textContent = max;
    $('#needle', root).style.transform = 'rotate(' + (max / GAUGE_MAX * 180) + 'deg)';
    if (remember) { saved.age = age; save(); }
  }

  /* ---------- 1 Rep Max calculator ---------- */

  function round1(n) {
    return Math.round(n * 10) / 10;
  }

  function buildORM(root) {
    var input = $('#orm', root);
    if (saved.orm) input.value = saved.orm;
    input.addEventListener('input', function () { updateORM(root, true); });
    updateORM(root, false);
  }

  function updateORM(root, remember) {
    var value = Number($('#orm', root).value);
    var out = $('#orm-out', root);
    if (!(value > 0)) {
      out.innerHTML = '<p>Enter your 1RM in pounds.</p>';
      return;
    }
    var box = function (name, pct, cls) {
      return '<div class="orm-box ' + cls + '"><h3>' + name + '</h3><span class="orm-w">' + round1(value * pct) + ' lbs</span>' +
        '<span class="orm-sum">' + value + ' × ' + pct + '</span></div>';
    };
    out.innerHTML = box('Endurance', 0.6, '') + box('Strength', 0.8, 'strong');
    if (remember) { saved.orm = value; save(); }
  }

  /* ---------- Protocol dots, move-in boxes, fat cell timeline, method table ---------- */

  function buildDots(root) {
    $$('[data-dots]', root).forEach(function (el) {
      var parts = el.dataset.dots.split(',').map(Number);
      var html = '';
      for (var i = 0; i < parts[1]; i++) html += '<i' + (i >= parts[0] ? ' class="opt-dot"' : '') + '></i>';
      el.innerHTML = html;
    });
  }

  // Three flights of stairs with 20 small boxes stacked beside them
  function buildBoxes(el) {
    var svg = '<path d="M150 170h30v-30h30v-30h30v-30h50" fill="none" stroke="var(--ink)" stroke-width="4"/>';
    svg += '<path d="M8 170h284" stroke="var(--ink)" stroke-width="2"/>';
    for (var r = 0; r < 4; r++) {
      for (var c = 0; c < 5; c++) {
        svg += '<rect x="' + (12 + c * 25) + '" y="' + (146 - r * 25) + '" width="22" height="22" fill="var(--accent)"/>' +
          '<path d="M' + (23 + c * 25) + ' ' + (146 - r * 25) + 'v9" stroke="var(--paper)" stroke-width="3"/>';
      }
    }
    [[165, 136], [195, 106], [225, 76]].forEach(function (p, i) {
      svg += '<text x="' + p[0] + '" y="' + p[1] + '" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="700" font-size="20" fill="var(--ink)" text-anchor="middle">' + (i + 1) + '</text>';
    });
    el.innerHTML = svg;
  }

  function buildTimeline(el) {
    var stages = [
      { when: 'First few years of life', text: 'Fat cell number grows rapidly.', count: 5, r: 5 },
      { when: 'By your early twenties', text: 'Fat cell number is set.', count: 10, r: 5 },
      { when: 'After that', text: 'Fat cells grow in size.', count: 10, r: 11 },
      { when: 'With fat loss', text: 'Fat cells shrink in size, but not in number.', count: 10, r: 7 }
    ];
    el.innerHTML = stages.map(function (s) {
      var dots = '';
      for (var i = 0; i < 10; i++) {
        var cx = 13 + (i % 5) * 26;
        var cy = 13 + Math.floor(i / 5) * 26 + 12;
        dots += i < s.count
          ? '<circle cx="' + cx + '" cy="' + cy + '" r="' + s.r + '" fill="var(--accent)"/>'
          : '<circle cx="' + cx + '" cy="' + cy + '" r="5" fill="none" stroke="var(--mute)" stroke-dasharray="2 2"/>';
      }
      return '<li><svg class="t-cells" viewBox="0 0 136 76" aria-hidden="true">' + dots + '</svg><span class="t-line"></span>' +
        '<span class="t-when">' + esc(s.when) + '</span>' + esc(s.text) + '</li>';
    }).join('');
  }

  // Reference table of the 5 methods
  function buildMethodTable(el) {
    var full = { hydro: 'Hydrostatic weighing (underwater weighing)', dxa: 'DXA/DEXA (Dual-Energy X-ray Absorptiometry)' };
    el.innerHTML = D.methods.map(function (m) {
      return '<tr><td><svg aria-hidden="true"><use href="#' + m.icon + '"></use></svg></td>' +
        '<td><strong>' + esc(full[m.id] || m.name) + '</strong>' + esc(m.desc) + '</td></tr>';
    }).join('');
  }

  /* ---------- Aerobic vs. anaerobic sorter ---------- */

  function buildSorter(box) {
    var sorter = { left: [], placed: { aerobic: [], anaerobic: [] }, picked: null, misses: 0, msg: '', bad: false };
    var total = D.activities.length;

    function reset() {
      sorter.left = shuffle(D.activities);
      sorter.placed = { aerobic: [], anaerobic: [] };
      sorter.picked = null;
      sorter.misses = 0;
      sorter.msg = '';
      sorter.bad = false;
      render();
    }

    function render() {
      var done = sorter.left.length === 0;
      var bin = function (key, label) {
        return '<button type="button" class="bin" data-bin="' + key + '"><span class="bin-name">' + label + '</span>' +
          sorter.placed[key].map(function (n) { return '<span class="bin-item">' + esc(n) + '</span>'; }).join('') + '</button>';
      };
      var msg = sorter.msg;
      if (done) {
        msg = 'All ' + total + ' sorted with ' + sorter.misses + (sorter.misses === 1 ? ' miss' : ' misses') + '.';
        if (saved.sortBest != null) msg += ' Fewest misses: ' + saved.sortBest + '.';
      }
      box.innerHTML =
        '<div class="tray">' + sorter.left.map(function (a) {
          return '<button type="button" class="chip' + (sorter.picked === a.name ? ' is-picked' : '') + '" data-chip="' + esc(a.name) + '" aria-pressed="' + (sorter.picked === a.name) + '">' + esc(a.name) + '</button>';
        }).join('') + '</div>' +
        '<div class="bins">' + bin('aerobic', 'Aerobic') + bin('anaerobic', 'Anaerobic') + '</div>' +
        '<div class="game-foot"><p class="game-msg' + (sorter.bad && !done ? ' bad' : '') + '" aria-live="polite">' + esc(msg) + '</p>' +
        '<button type="button" class="btn ghost" data-reset>Start over</button></div>';
    }

    function drop(name, binKey) {
      var a = sorter.left.filter(function (x) { return x.name === name; })[0];
      if (!a) return;
      sorter.picked = null;
      if (a.bin === binKey) {
        sorter.left = sorter.left.filter(function (x) { return x !== a; });
        sorter.placed[binKey].push(a.name);
        sorter.msg = a.name + ' is ' + binKey + '.';
        sorter.bad = false;
        if (!sorter.left.length) {
          saved.sortBest = saved.sortBest == null ? sorter.misses : Math.min(saved.sortBest, sorter.misses);
          save();
        }
      } else {
        sorter.misses++;
        sorter.msg = 'Not ' + binKey + '. Try the other box.';
        sorter.bad = true;
      }
      render();
    }

    var drag = null;
    var skipClick = false;

    box.addEventListener('pointerdown', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      drag = { chip: chip, x: e.clientX, y: e.clientY, moved: false };
      chip.setPointerCapture(e.pointerId);
    });

    box.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x;
      var dy = e.clientY - drag.y;
      if (!drag.moved && Math.abs(dx) + Math.abs(dy) > 6) {
        drag.moved = true;
        drag.chip.classList.add('is-drag');
      }
      if (drag.moved) {
        drag.chip.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        var under = document.elementFromPoint(e.clientX, e.clientY);
        var target = under && under.closest('.bin');
        $$('.bin', box).forEach(function (b) { b.classList.toggle('is-target', b === target); });
      }
    });

    function endDrag(e, cancelled) {
      if (!drag) return;
      var d = drag;
      drag = null;
      if (!d.moved) return;
      skipClick = true;
      setTimeout(function () { skipClick = false; }, 0);
      var under = cancelled ? null : document.elementFromPoint(e.clientX, e.clientY);
      var target = under && under.closest('.bin');
      if (target) drop(d.chip.dataset.chip, target.dataset.bin);
      else render();
    }

    box.addEventListener('pointerup', function (e) { endDrag(e, false); });
    box.addEventListener('pointercancel', function (e) { endDrag(e, true); });

    box.addEventListener('click', function (e) {
      if (skipClick) return;
      if (e.target.closest('[data-reset]')) { reset(); return; }
      var chip = e.target.closest('.chip');
      if (chip) {
        sorter.picked = sorter.picked === chip.dataset.chip ? null : chip.dataset.chip;
        sorter.msg = sorter.picked ? 'Now tap Aerobic or Anaerobic.' : '';
        sorter.bad = false;
        render();
        return;
      }
      var bin = e.target.closest('.bin');
      if (bin && sorter.picked) drop(sorter.picked, bin.dataset.bin);
    });

    reset();
  }

  /* ---------- Body composition matching ---------- */

  function buildMatcher(box) {
    var matcher = { order: [], matched: {}, picked: null, misses: 0, missId: null };
    var total = D.methods.length;

    function reset() {
      matcher.order = shuffle(D.methods);
      matcher.matched = {};
      matcher.picked = null;
      matcher.misses = 0;
      matcher.missId = null;
      render();
    }

    function render() {
      var count = Object.keys(matcher.matched).length;
      var msg = count === total
        ? 'All ' + total + ' matched with ' + matcher.misses + (matcher.misses === 1 ? ' miss.' : ' misses.')
        : matcher.missId ? 'Not that one. Try again.' : '';
      box.innerHTML =
        '<div class="method-tiles">' + D.methods.map(function (m) {
          var done = matcher.matched[m.id];
          return '<button type="button" class="tile' + (done ? ' is-done' : '') + (matcher.picked === m.id ? ' is-picked' : '') + '" data-method="' + m.id + '"' + (done ? ' disabled' : '') + '>' +
            '<svg aria-hidden="true"><use href="#' + m.icon + '"></use></svg>' + esc(m.name) + '</button>';
        }).join('') + '</div>' +
        '<div class="desc-list">' + matcher.order.map(function (m) {
          var done = matcher.matched[m.id];
          return '<button type="button" class="desc' + (matcher.missId === m.id ? ' is-miss' : '') + '" data-desc="' + m.id + '"' + (done ? ' disabled' : '') + '>' +
            (done ? '<b>' + esc(m.name) + '</b>' : '') + esc(m.desc) + '</button>';
        }).join('') + '</div>' +
        '<div class="game-foot"><p class="game-msg' + (matcher.missId ? ' bad' : '') + '" aria-live="polite">' + esc(msg) + '</p>' +
        '<button type="button" class="btn ghost" data-reset>Start over</button></div>';
    }

    box.addEventListener('click', function (e) {
      if (e.target.closest('[data-reset]')) { reset(); return; }
      var tile = e.target.closest('[data-method]');
      if (tile) {
        matcher.picked = matcher.picked === tile.dataset.method ? null : tile.dataset.method;
        matcher.missId = null;
        render();
        return;
      }
      var d = e.target.closest('[data-desc]');
      if (!d || !matcher.picked) return;
      if (d.dataset.desc === matcher.picked) {
        matcher.matched[matcher.picked] = true;
        matcher.picked = null;
        matcher.missId = null;
      } else {
        matcher.misses++;
        matcher.missId = d.dataset.desc;
      }
      render();
    });

    reset();
  }

  /* ---------- Runs every time a PE / Health unit is shown ---------- */

  FINALS.addTools('pe-health', function (root, unit, content) {
    D = content;
    map = null;
    if ($('#map', root)) buildMap(root);
    if ($('#gauge', root)) buildGauge(root);
    if ($('#orm', root)) buildORM(root);
    buildDots(root);
    var boxes = $('#boxes-svg', root);
    if (boxes) buildBoxes(boxes);
    var timeline = $('#timeline', root);
    if (timeline) buildTimeline(timeline);
    var methods = $('#method-table tbody', root);
    if (methods) buildMethodTable(methods);
    var sorter = $('#sorter', root);
    if (sorter) buildSorter(sorter);
    var matcher = $('#matcher', root);
    if (matcher) buildMatcher(matcher);
  });
})();
