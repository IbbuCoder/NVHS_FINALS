// Finals study site. Ported from the PE Midterm app and changed to work for many classes.
// Every class page is built from its data file (data/classes/<id>.js), so adding a
// class means adding data, not code. Progress is saved in this browser only.
(function () {
  'use strict';

  var $ = function (s, root) { return (root || document).querySelector(s); };
  var $$ = function (s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); };
  var CFG = window.FINALS_CONFIG || {};
  var SUBJECTS = FINALS.subjects;

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

  function pct(n, d) {
    return d ? Math.round(n / d * 100) : 0;
  }

  /* ---------- Saved progress ---------- */

  // Everything lives under one key. Each class keeps its own progress in saved.classes[id].
  var KEY = 'finals-v1';
  var saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(KEY)) || {};
  } catch (e) {
    saved = {};
  }
  var firstVisit = Object.keys(saved).length === 0;
  function writeLocal() {
    try {
      localStorage.setItem(KEY, JSON.stringify(saved));
    } catch (e) { /* storage blocked: the site still works, it just won't remember */ }
  }

  // Sync with the student's account (see "progress sync" further down).
  var sync = { on: false, dirty: {}, timer: null, state: '', last: null };

  // Remembers when each class's progress last changed, for last-write-wins sync.
  var snaps = {};
  Object.keys(saved.classes || {}).forEach(function (id) { snaps[id] = JSON.stringify(saved.classes[id]); });
  function trackChanges() {
    var classes = saved.classes || {};
    Object.keys(classes).forEach(function (id) {
      var now = JSON.stringify(classes[id]);
      var before = snaps[id] === undefined ? '{}' : snaps[id];
      snaps[id] = now;
      if (now === before) return;
      saved.changedAt = saved.changedAt || {};
      saved.changedAt[id] = Date.now();
      sync.dirty[id] = true;
    });
  }

  function save() {
    trackChanges();
    writeLocal();
    queuePush();
  }

  /* ---------- Classes ---------- */

  // The class being studied. Home, Units, Cards, Test and Bookmarks all use it.
  var cur = null;

  function subjectOf(id) {
    return SUBJECTS.filter(function (s) { return s.id === id; })[0] || null;
  }

  // A class's content, with empty lists filled in so nothing breaks on a half-done file.
  function dataOf(id) {
    var d = FINALS.classes[id] || {};
    return {
      units: d.units || [],
      flashcards: d.flashcards || [],
      questions: d.questions || [],
      formulas: d.formulas || [],
      drills: d.drills || []
    };
  }

  var C = { units: [], flashcards: [], questions: [], formulas: [], drills: [] };

  // Progress for one class.
  function progressOf(id) {
    saved.classes = saved.classes || {};
    saved.classes[id] = saved.classes[id] || {};
    return saved.classes[id];
  }
  function P() { return progressOf(cur); }

  function setClass(id) {
    if (!subjectOf(id)) return false;
    if (cur === id) return true;
    cur = id;
    C = dataOf(id);
    saved.current = id;
    save();
    // Reset anything that belongs to the class we just left.
    test.run = null;
    test.setup = false;
    test.scope = 'all';
    match = null;
    drill = { q: null, answered: false, ok: false, typed: '' };
    flash.scope = P().flashScope || 'all';
    flash.pile = 'all';
    restoreRun();
    if (C.flashcards.length) setDeck(false);
    return true;
  }

  // Runs fn as if another class were picked, then switches back. Used for the class list.
  function withClass(id, fn) {
    var keepCur = cur, keepC = C;
    cur = id;
    C = dataOf(id);
    try { return fn(); } finally { cur = keepCur; C = keepC; }
  }

  function className() {
    var s = subjectOf(cur);
    return s ? s.name : '';
  }

  /* ---------- Settings ---------- */

  var DEFAULTS = {
    theme: 'light', accent: 'red', color: '#c4122f', font: 'barlow', size: 'normal', density: 'comfy', motion: 'on',
    simple: 'off', cardFirst: 'term', name: '', teacher: '', gameLength: '30', startPage: 'home', board: 'show', goal: '20'
  };
  var settings = {};

  function loadSettings() {
    var mine = saved.settings || {};
    Object.keys(DEFAULTS).forEach(function (k) {
      settings[k] = mine[k] === undefined ? DEFAULTS[k] : mine[k];
    });
  }

  function hexToRgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [n >> 16, (n >> 8) & 255, n & 255];
  }

  function mixColor(rgb, target, amount) {
    return 'rgb(' + rgb.map(function (c, i) { return Math.round(c + (target[i] - c) * amount); }).join(',') + ')';
  }

  function brightness(rgb) {
    var c = rgb.map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }

  // Works out readable shades from any color the user picks.
  function applyCustomColor(root, dark) {
    var names = ['--accent', '--accent-bright', '--on-accent', '--tint'];
    if (settings.accent !== 'custom') {
      names.forEach(function (n) { root.style.removeProperty(n); });
      return;
    }
    var base = hexToRgb(settings.color);
    var level = brightness(base);
    var accent = settings.color;
    if (dark && level < 0.2) accent = mixColor(base, [255, 255, 255], 0.5);
    if (!dark && level > 0.3) accent = mixColor(base, [0, 0, 0], 0.4);
    root.style.setProperty('--accent', accent);
    root.style.setProperty('--accent-bright', level < 0.25 ? mixColor(base, [255, 255, 255], 0.5) : settings.color);
    root.style.setProperty('--on-accent', dark ? '#15171a' : '#fff');
    root.style.setProperty('--tint', mixColor(base, dark ? [23, 25, 28] : [255, 255, 255], 0.72));
  }

  function resolvedTheme() {
    if (settings.theme !== 'auto') return settings.theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // The tab icon and phone status bar follow the chosen color and theme.
  function paintAppIcon(root, dark) {
    var css = getComputedStyle(root);
    var fill = css.getPropertyValue('--accent').trim();
    var mark = css.getPropertyValue('--on-accent').trim();
    $('#icon-svg').href = 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="' + fill + '"/>' +
      '<path d="M9 6h15v5H14v4h8v5h-8v6H9z" fill="' + mark + '"/></svg>');
    $('#theme-color').content = dark ? '#0c0d0f' : '#15171a';
  }

  function applySettings() {
    var root = document.documentElement;
    var dark = resolvedTheme() === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    root.dataset.accent = settings.accent;
    root.dataset.size = settings.size;
    root.dataset.font = settings.font;
    root.dataset.density = settings.density;
    root.dataset.motion = settings.motion;
    root.dataset.board = settings.board;
    applyCustomColor(root, dark);
    paintAppIcon(root, dark);
    $('#set-color').value = settings.color;
    [['#set-name', 'name'], ['#welcome-name', 'name'], ['#set-teacher', 'teacher'], ['#welcome-teacher', 'teacher']].forEach(function (p) {
      if (document.activeElement !== $(p[0])) $(p[0]).value = settings[p[1]] || '';
    });
    if (settings.simple === 'on') root.setAttribute('data-simple', '');
    else root.removeAttribute('data-simple');
    $('#dumb-btn').setAttribute('aria-pressed', String(settings.simple === 'on'));
    $$('[data-set]').forEach(function (group) {
      $$('button', group).forEach(function (b) {
        var on = b.dataset.val === settings[group.dataset.set];
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', String(on));
      });
    });
  }

  function changeSetting(key, value) {
    settings[key] = value;
    saved.settings = settings;
    save();
    applySettings();
    if (key === 'cardFirst' && cur) renderCard();
  }

  function buildSettings() {
    function pickSetting(e) {
      var b = e.target.closest('[data-val]');
      if (b && b.parentNode.dataset.set) changeSetting(b.parentNode.dataset.set, b.dataset.val);
    }
    $('#view-settings').addEventListener('click', pickSetting);
    $('#welcome').addEventListener('click', pickSetting);
    $('#dumb-btn').addEventListener('click', function () {
      changeSetting('simple', settings.simple === 'on' ? 'off' : 'on');
    });
    [['#set-name', 'name', 24], ['#welcome-name', 'name', 24], ['#set-teacher', 'teacher', 40], ['#welcome-teacher', 'teacher', 40]].forEach(function (p) {
      $(p[0]).addEventListener('input', function (e) { changeSetting(p[1], e.target.value.trim().slice(0, p[2])); });
      $(p[0]).addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } });
    });
    $('#set-color').addEventListener('input', function (e) {
      settings.color = e.target.value;
      changeSetting('accent', 'custom');
    });
    $('#settings-reset').addEventListener('click', function () {
      Object.keys(DEFAULTS).forEach(function (k) { settings[k] = DEFAULTS[k]; });
      changeSetting('cardFirst', DEFAULTS.cardFirst);
      toast('Settings reset');
    });
    $('#backup-save').addEventListener('click', saveBackup);
    $('#backup-load').addEventListener('change', loadBackup);
    $('#clear-every').addEventListener('click', function () {
      if (!window.confirm('Clear scores, flashcard marks and misses for every class on this device?')) return;
      Object.keys(saved.classes || {}).forEach(function (id) { clearClass(id); });
      saved.today = null;
      saved.streak = null;
      save();
      afterClear();
      toast('Progress cleared for every class');
    });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySettings);
  }

  /* ---------- Welcome screen, toast, backup ---------- */

  // Older phones (iOS before 15.4) have no showModal, so fall back to a plain open flag.
  function openDialog(box) {
    if (box.open) return;
    if (typeof box.showModal === 'function') box.showModal();
    else { box.setAttribute('open', ''); box.classList.add('no-modal'); }
  }
  function closeDialog(box) {
    if (typeof box.close === 'function') box.close();
    else { box.removeAttribute('open'); box.dispatchEvent(new Event('close')); }
  }

  function buildWelcome() {
    var box = $('#welcome');
    box.addEventListener('close', function () {
      saved.seenWelcome = true;
      save();
      if ($('#view-home').classList.contains('is-active')) renderHome();
    });
    box.addEventListener('click', function (e) { if (e.target === box) closeDialog(box); });
    $('#welcome-start').addEventListener('click', function () { closeDialog(box); });
    $('#welcome-settings').addEventListener('click', function () {
      closeDialog(box);
      location.hash = 'settings';
    });
    $('#welcome-again').addEventListener('click', function () { openDialog(box); });
    if (firstVisit) {
      setTimeout(function () { if (!saved.seenWelcome) openDialog(box); }, 350);
    }
  }

  function toast(message) {
    var el = $('#toast');
    el.textContent = message;
    el.classList.add('is-on');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function () { el.classList.remove('is-on'); }, 2200);
  }

  function saveBackup() {
    var link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([JSON.stringify(saved, null, 2)], { type: 'application/json' }));
    link.download = 'finals-backup.json';
    link.click();
    URL.revokeObjectURL(link.href);
    toast('Backup saved');
  }

  function loadBackup(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('bad file');
        saved = data;
        save();
        location.reload();
      } catch (err) {
        toast('That file is not a Finals backup');
      }
    };
    reader.readAsText(file);
  }

  /* ---------- Search ---------- */

  var SEARCH_SKIP = ['the', 'a', 'an', 'of', 'is', 'are', 'what', 'whats', 'where', 'how', 'do', 'does', 'to', 'for', 'my', 'in', 'and', 'on', 'i', 'find', 'show', 'me', 'it'];

  function cleanText(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9%]+/g, ' ').trim();
  }

  function searchTokens(query) {
    var words = cleanText(query).split(' ').filter(Boolean);
    var kept = words.filter(function (w) { return SEARCH_SKIP.indexOf(w) === -1; });
    return kept.length ? kept : words;
  }

  // Everything you can find: classes, note sections, flashcards and questions in every class, and pages.
  function buildSearchItems() {
    var items = [];
    SUBJECTS.forEach(function (s) {
      var d = dataOf(s.id);
      items.push({ kind: 'Class', title: s.name, text: s.category, go: function () { setClass(s.id); location.hash = 'home'; } });
      d.units.forEach(function (u) {
        items.push({ kind: s.name + ' unit', title: u.num + ' ' + u.title, text: '', go: function () { setClass(s.id); location.hash = u.id; } });
        (u.sections || []).forEach(function (sec) {
          var text = (sec.body || []).concat(sec.list || []).concat(sec.table ? [].concat.apply([], sec.table.rows) : []).join(' ');
          items.push({ kind: s.name + ' notes, ' + u.num, title: sec.title, text: text, go: function () { setClass(s.id); goToSection(u.id, sec.id); } });
        });
      });
      d.flashcards.forEach(function (c, i) {
        items.push({ kind: s.name + ' flashcard', title: c.front, text: c.back, go: function () { setClass(s.id); openCard(i); } });
      });
      d.questions.forEach(function (q, i) {
        items.push({ kind: s.name + ' question', title: q.q, text: q.c[q.a] + ' ' + (q.why || ''), go: function () { setClass(s.id); test.setup = false; startTest('q' + i); location.hash = 'test'; } });
      });
    });
    [['Settings', 'theme dark mode light color font text size simple words goal backup', 'settings'],
      ['Share a notebook', 'notebooklm share link', 'share'],
      ['Classes', 'core encore switch class', 'classes']].forEach(function (p) {
      items.push({ kind: 'Page', title: p[0], text: p[1], go: function () { location.hash = p[2]; } });
    });
    items.forEach(function (it) { it.hay = cleanText(it.title + ' ' + it.text); it.head = cleanText(it.title); });
    return items;
  }

  function scoreItem(item, tokens) {
    var score = 0;
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      if (item.hay.indexOf(t) === -1) return 0;
      score += item.head.indexOf(t) > -1 ? 3 : 1;
      if ((' ' + item.head + ' ').indexOf(' ' + t + ' ') > -1) score += 2;
    }
    return score;
  }

  function markText(text, tokens) {
    var out = esc(text);
    tokens.forEach(function (t) {
      if (t.length < 2) return;
      out = out.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>');
    });
    return out;
  }

  function buildSearch() {
    var box = $('#search');
    var input = $('#search-input');
    var results = $('#search-results');
    var items = null;
    var shown = [];
    var active = -1;

    function suggestions() {
      var tries = SUBJECTS.slice(0, 5).map(function (s) { return s.name; }).concat(['Settings', 'dark mode']);
      results.innerHTML = '<p class="search-count">Try searching for</p><div class="search-tags">' + tries.map(function (q) {
        return '<button type="button" class="search-tag" data-try="' + esc(q) + '">' + esc(q) + '</button>';
      }).join('') + '</div>';
      shown = [];
      active = -1;
    }

    function run() {
      if (!input.value.trim()) { suggestions(); return; }
      var tokens = searchTokens(input.value);
      // Results from the class you're studying come first.
      var mine = cur ? className() : '';
      shown = items.map(function (it) {
        var s = scoreItem(it, tokens);
        if (s && mine && it.kind.indexOf(mine) === 0) s += 1;
        return { it: it, s: s };
      }).filter(function (x) { return x.s; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 30).map(function (x) { return x.it; });
      active = shown.length ? 0 : -1;
      if (!shown.length) {
        results.innerHTML = '<p class="search-count">Nothing matches that. Check the spelling, or try fewer words.</p>';
        return;
      }
      results.innerHTML = '<p class="search-count">' + shown.length + (shown.length === 1 ? ' result' : ' results') + '</p>' +
        shown.map(function (it, i) {
          var line = it.text.length > 110 ? it.text.slice(0, 110) + '...' : it.text;
          return '<button type="button" class="search-item' + (i === 0 ? ' is-active' : '') + '" data-item="' + i + '"><em>' + esc(it.kind) + '</em><b>' + markText(it.title, tokens) + '</b>' +
            (line ? '<span>' + markText(line, tokens) + '</span>' : '') + '</button>';
        }).join('');
    }

    function choose(i) {
      var it = shown[i];
      if (!it) return;
      closeDialog(box);
      it.go();
    }

    function moveActive(step) {
      if (!shown.length) return;
      active = (active + step + shown.length) % shown.length;
      $$('.search-item', results).forEach(function (el, i) {
        el.classList.toggle('is-active', i === active);
        if (i === active) el.scrollIntoView({ block: 'nearest' });
      });
    }

    function open() {
      if (!items) items = buildSearchItems();
      input.value = '';
      suggestions();
      openDialog(box);
      input.focus();
    }

    input.addEventListener('input', run);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
      if (e.key === 'Enter') { e.preventDefault(); choose(active); }
    });
    results.addEventListener('click', function (e) {
      var tag = e.target.closest('[data-try]');
      if (tag) {
        input.value = tag.dataset.try;
        run();
        input.focus();
        return;
      }
      var b = e.target.closest('[data-item]');
      if (b) choose(Number(b.dataset.item));
    });
    $('#search-btn').addEventListener('click', open);
    $('#home-ask').addEventListener('click', open);
    $('#search-close').addEventListener('click', function () { closeDialog(box); });
    box.addEventListener('click', function (e) { if (e.target === box) closeDialog(box); });
    document.addEventListener('keydown', function (e) {
      var typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
      if (((e.ctrlKey || e.metaKey) && e.key === 'k') || (e.key === '/' && !typing)) {
        e.preventDefault();
        if (!box.open) open();
      }
    });
  }

  /* ---------- Views and nav ---------- */

  var nav = $('#nav');
  var menuBtn = $('#menu-btn');

  function closeMenu() {
    nav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // Pages that only make sense once a class is picked.
  var CLASS_PAGES = ['units', 'flashcards', 'test', 'saved', 'weak', 'sheet', 'drills', 'match'];

  function unitById(id) {
    return C.units.filter(function (u) { return u.id === id; })[0] || null;
  }

  function route(first) {
    var id = location.hash.slice(1) || 'home';
    if (/(^|&)(access_token|error|error_description|type)=/.test(id)) {
      if (/error/.test(id)) account.msg = '<b>That link has expired or was already used.</b> Ask for a new one.';
      history.replaceState(null, '', '#account');
      id = 'account';
    }
    // #class/science picks a class, then shows its Home.
    var pick = /^class\/([a-z0-9-]+)$/.exec(id);
    if (pick) {
      if (setClass(pick[1])) { history.replaceState(null, '', '#home'); id = 'home'; }
      else id = '404';
    }
    var unit = cur ? unitById(id) : null;
    var needsClass = !cur && (CLASS_PAGES.indexOf(id) > -1 || /^u\d+$/.test(id));
    if (needsClass) {
      toast('Pick a class first');
      history.replaceState(null, '', '#classes');
      id = 'classes';
    }
    var viewId = unit ? 'unit' : (id === 'core' || id === 'encore') ? 'classes' : id;
    var view = document.getElementById('view-' + viewId);
    if (!view || (viewId === 'unit' && !unit)) { id = '404'; viewId = '404'; view = $('#view-404'); }
    $$('.view').forEach(function (v) { v.classList.toggle('is-active', v === view); });
    $$('.nav a').forEach(function (a) {
      if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    var tabId = unit ? 'units' : id;
    if (['settings', 'weak', 'more', 'sheet', 'classes', 'core', 'encore', 'share', 'account', 'feedback', 'admin'].indexOf(id) > -1) tabId = 'more';
    if (id === 'drills' || id === 'match') tabId = 'test';
    if (id !== 'test') test.mockIntro = false;
    $$('.tabbar a').forEach(function (a) {
      if (a.dataset.tab === tabId) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    if (id !== '404') { saved.lastPage = id; save(); }
    var title = unit ? unit.num + ' ' + unit.title : view.dataset.title;
    document.title = title + (cur && viewId !== 'classes' && viewId !== 'home' ? ' | ' + className() : '') + ' | ' + (CFG.siteTitle || 'Finals');
    closeMenu();
    if (id === 'home') renderHome();
    if (viewId === 'classes') renderClasses(id);
    if (id === 'units') renderUnits();
    if (unit) renderUnit(unit);
    if (id === 'flashcards') renderCard();
    if (id === 'test') renderTest();
    if (id === 'saved') renderSaved();
    if (id === 'weak') renderWeak();
    if (id === 'sheet') renderSheet();
    if (id === 'drills') renderDrill(false);
    if (id === 'match') renderMatch();
    if (id === 'share') renderShare();
    if (id === 'account') renderAccount();
    if (id === 'feedback') renderFeedback();
    if (id === 'admin') renderAdmin();
    window.scrollTo(0, 0);
    if (!first) {
      var h = $('h1', view);
      if (h && h.offsetParent) h.focus({ preventScroll: true });
    }
  }

  // Buttons and links that work from any page.
  function buildShortcuts() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('[data-scope]');
      if (link) {
        test.scope = link.dataset.scope;
        test.setup = true;
      }
      var quick = e.target.closest('[data-quick]');
      if (quick) {
        test.setup = false;
        startTest(quick.dataset.quick);
        location.hash = 'test';
      }
      if (e.target.closest('[data-print]')) window.print();
      if (e.target.closest('[data-mock]')) { e.preventDefault(); openMockIntro(); }
      var cards = e.target.closest('[data-flash]');
      if (cards) {
        flash.scope = cards.dataset.flash;
        flash.pile = 'learning';
        setDeck(false);
      }
    });
  }

  /* ---------- Class list (Home with no class, #classes, #core, #encore) ---------- */

  function classNames(cat) {
    return SUBJECTS.filter(function (s) { return s.category === cat; }).map(function (s) { return s.name; }).join(', ');
  }

  function classReady(id) {
    return withClass(id, function () { return C.units.length ? totalScore() : 0; });
  }

  function renderClasses(which) {
    var cats = which === 'core' || which === 'encore' ? [which] : ['core', 'encore'];
    $('#classes-title').textContent = cats.length === 1 ? (which === 'core' ? 'Core' : 'Encore') : 'Classes';
    var label = { core: 'Core', encore: 'Encore' };
    var blurb = { core: 'Main classes', encore: 'Electives' };
    $('#classes-root').innerHTML = cats.map(function (cat) {
      var list = SUBJECTS.filter(function (s) { return s.category === cat; });
      return '<h2 class="class-group">' + label[cat] + '</h2><p class="note" style="margin:8px 0 0">' + blurb[cat] + '</p>' + list.map(function (s) {
        var ready = classReady(s.id);
        var units = dataOf(s.id).units.length;
        return '<a class="class-row' + (s.id === cur ? ' is-current' : '') + '" href="#class/' + s.id + '"' + (s.id === cur ? ' aria-current="true"' : '') + '>' +
          '<span class="sb-name">' + esc(s.name) + '</span><span class="sb-pct">' + (units ? ready + '%' : '') + '</span>' +
          '<span class="pct"><i style="width:' + ready + '%"></i></span></a>';
      }).join('');
    }).join('') +
      (cats.length === 1 ? '<p class="nf-links"><a class="btn" href="#' + (cats[0] === 'core' ? 'encore' : 'core') + '">See ' + (cats[0] === 'core' ? 'Encore' : 'Core') + ' classes</a></p>' : '');
  }

  /* ---------- Home ---------- */

  function scoreText(s) {
    return s ? s.score + ' / ' + s.total : 'Not taken';
  }

  function cardsOf(unitId) {
    return C.flashcards.filter(function (c) { return 'u' + c.u === unitId; });
  }

  // Each unit's score is the average of its parts. Anything not done yet counts as 0.
  function unitParts(u) {
    var cards = cardsOf(u.id);
    var known = cards.filter(isKnown).length;
    var last = (P().byUnit || {})[u.id] || (P().test || {})[u.id];
    return [
      { value: last ? pct(last.score, last.total) : 0, attrs: 'href="#test" data-scope="' + u.id + '"', text: 'take the unit test' },
      { value: pct(known, cards.length), attrs: 'href="#flashcards" data-flash="' + u.id + '"', text: 'work through the flashcards' }
    ];
  }

  function average(list) {
    return list.length ? Math.round(list.reduce(function (sum, n) { return sum + n; }, 0) / list.length) : 0;
  }

  function unitScore(u) {
    return average(unitParts(u).map(function (p) { return p.value; }));
  }

  function totalScore() {
    return average(C.units.map(unitScore));
  }

  function dayStamp(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  function examDate() {
    var s = subjectOf(cur);
    return (s && s.exam) || CFG.finalsDate || '';
  }

  function examLine() {
    var exam = examDay();
    if (exam === null) return '';
    var days = exam - thisDay();
    if (days < 0) return '';
    if (days === 0) return '<p class="sb-extra">The final is today</p>';
    return '<p class="sb-extra">' + days + (days === 1 ? ' day' : ' days') + ' until the final</p>';
  }

  function renderHome() {
    var greet = $('#greeting');
    greet.hidden = !settings.name;
    greet.textContent = 'Hi ' + settings.name;
    $$('[data-class-names]').forEach(function (el) { el.textContent = classNames(el.dataset.classNames); });
    $('#home-pick').hidden = !!cur;
    $('#home-class').hidden = !cur;
    if (!cur) return;

    $('#home-class-name').textContent = className();
    var last = P().test || {};
    var scores = C.units.map(function (u) {
      var parts = unitParts(u);
      return { unit: u, parts: parts, value: average(parts.map(function (p) { return p.value; })) };
    });
    var total = average(scores.map(function (s) { return s.value; }));
    var next;
    if (!scores.length) next = '<a class="sb-next" href="#units">This class has no units yet</a>';
    else if (total === 100) next = '<a class="sb-next" href="#test">Every unit is at 100. Run the full test one more time.</a>';
    else {
      var weakest = scores.reduce(function (low, s) { return s.value < low.value ? s : low; });
      var move = weakest.parts.reduce(function (low, p) { return p.value < low.value ? p : low; });
      next = '<a class="sb-next" ' + move.attrs + '>Next up: ' + weakest.unit.num + ' ' + esc(weakest.unit.short) + ', ' + move.text + '</a>';
    }

    $('#board').innerHTML =
      '<div class="sb-total"><span class="sb-label">Ready</span><div class="sb-tiles" role="img" aria-label="' + total + ' percent ready">' +
      String(total).split('').map(function (d) { return '<span class="sb-tile">' + d + '</span>'; }).join('') +
      '<span class="sb-tile unit">%</span></div><p class="sb-note">Your test scores and flashcards for ' + esc(className()) + ' added up.</p>' + examLine() +
      (saved.streak && saved.streak.count ? '<p class="sb-extra">Daily 10 streak: ' + saved.streak.count + '</p>' : '') + goalLine() + '</div>' +
      '<div class="sb-rows">' + scores.map(function (s) {
        return '<a class="sb-row" href="#' + s.unit.id + '"><span class="sb-num">' + esc(s.unit.num) + '</span><span class="sb-name">' + esc(s.unit.title) + '</span>' +
          '<span class="sb-pct">' + s.value + '%</span><span class="sb-bar"><i data-width="' + s.value + '"></i></span></a>';
      }).join('') + '</div>' + next;

    setTimeout(function () {
      $$('#board .sb-bar i').forEach(function (bar) { bar.style.width = bar.dataset.width + '%'; });
    }, 40);

    var knownCount = C.flashcards.filter(isKnown).length;
    var misses = missedIds().length;
    $('#home-flash').textContent = knownCount + ' of ' + C.flashcards.length + ' marked Got it';
    $('#home-test').textContent = C.questions.length + ' questions. Last full test: ' + scoreText(last.all) +
      (misses ? '. ' + misses + ' to retry' : '');
    $('#home-daily').textContent = 'A quick mix of your misses and weakest unit';
    $('#home-game').textContent = gameLength() + ' mixed questions, answers at the end. Last: ' + scoreText(last.game);
    $('#home-mock').textContent = mockCount() + ' questions, ' + MOCK_MINUTES + ' minutes on the clock';
    $('#home-drills').textContent = C.drills.length ? 'Practice the math with new numbers each time' : 'No formula drills for this class yet';
    $('#home-match').textContent = P().matchBest ? 'Best time: ' + clockText(P().matchBest) : 'Match ' + MATCH_PAIRS + ' terms to their meanings on the clock';
    renderPlan();
    renderStudy();
  }

  /* ---------- Daily goal (counts across every class) ---------- */

  function goalTarget() {
    return settings.goal === 'off' ? 0 : Number(settings.goal) || 0;
  }

  function todayCount() {
    var t = saved.today;
    return t && t.day === thisDay() ? t.n : 0;
  }

  function bumpGoal() {
    var n = todayCount() + 1;
    saved.today = { day: thisDay(), n: n };
    if (goalTarget() && n === goalTarget()) toast('Daily goal done: ' + n + ' answered today');
  }

  function goalLine() {
    var goal = goalTarget();
    if (!goal) return '';
    var n = todayCount();
    return '<p class="sb-extra sb-goal">' + (n >= goal ? 'Daily goal done: ' : 'Daily goal: ') + Math.min(n, goal) + ' / ' + goal + '</p>';
  }

  /* ---------- Units and notes ---------- */

  function renderUnits() {
    $('#units-title').textContent = className() + ' units';
    $('#unit-list').innerHTML = C.units.length
      ? C.units.map(function (u) {
          var score = unitScore(u);
          return '<a class="unit-row" href="#' + u.id + '"><span class="sb-num">' + esc(u.num) + '</span><span class="sb-name">' + esc(u.title) + '</span>' +
            '<span class="sb-pct">' + score + '%</span><span class="pct"><i style="width:' + score + '%"></i></span></a>';
        }).join('')
      : '<p class="note" style="margin-top:14px">This class has no units yet.</p>';
    renderNotebooks();
  }

  function sectionHtml(u, sec) {
    var marked = markList().indexOf(sec.id) > -1;
    var table = sec.table
      ? '<table class="tbl stack"><thead><tr>' + sec.table.head.map(function (h) { return '<th scope="col">' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        sec.table.rows.map(function (r) {
          return '<tr><th scope="row">' + esc(r[0]) + '</th>' + r.slice(1).map(function (cell, i) {
            return '<td data-label="' + esc(sec.table.head[i + 1] || '') + '">' + esc(cell) + '</td>';
          }).join('') + '</tr>';
        }).join('') + '</tbody></table>'
      : '';
    return '<div class="block' + (marked ? ' is-marked' : '') + '" id="sec-' + esc(sec.id) + '" data-sec="' + esc(sec.id) + '">' +
      '<h2>' + esc(sec.title) + '<button type="button" class="mark-icon" data-mark="' + esc(sec.id) + '" aria-pressed="' + marked + '" aria-label="' +
        (marked ? 'Remove bookmark from ' : 'Bookmark ') + esc(sec.title) + '"><svg aria-hidden="true"><use href="#i-bookmark"></use></svg></button></h2>' +
      '<div>' + (sec.simple ? '<p class="simple">' + esc(sec.simple) + '</p>' : '') +
        (sec.body || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
        (sec.list && sec.list.length ? '<ul class="ruled">' + sec.list.map(function (li) { return '<li>' + esc(li) + '</li>'; }).join('') + '</ul>' : '') +
        table + '</div></div>';
  }

  function renderUnit(u) {
    var i = C.units.indexOf(u);
    var next = C.units[i + 1];
    $('#unit-num').textContent = u.num;
    $('#unit-title').textContent = u.title;
    $('#unit-body').innerHTML = (u.sections || []).map(function (sec) { return sectionHtml(u, sec); }).join('') ||
      '<p class="note">This unit has no notes yet.</p>';
    $('#unit-jump').innerHTML = (u.sections || []).map(function (sec) {
      return '<button type="button" data-jump="' + esc(sec.id) + '">' + esc(sec.title) + '</button>';
    }).join('');
    $('#unit-pager').innerHTML =
      '<a class="quiz-link" href="#test" data-scope="' + u.id + '">Quiz yourself on this unit</a>' +
      '<button type="button" class="link-btn" data-print>Print this page</button>' +
      (next ? '<a href="#' + next.id + '">Next: ' + esc(next.num + ' ' + next.title) + '</a>' : '<a href="#flashcards">Next: Flashcards</a>');
  }

  function goToSection(unitId, secId) {
    if (location.hash !== '#' + unitId) location.hash = unitId;
    else route(false);
    setTimeout(function () {
      var el = document.getElementById('sec-' + secId);
      if (!el) return;
      el.scrollIntoView();
      el.classList.add('search-spot');
      setTimeout(function () { el.classList.remove('search-spot'); }, 1800);
    }, 30);
  }

  function buildUnitPage() {
    $('#view-unit').addEventListener('click', function (e) {
      var j = e.target.closest('[data-jump]');
      if (j) document.getElementById('sec-' + j.dataset.jump).scrollIntoView();
      var m = e.target.closest('[data-mark]');
      if (m) {
        toggleMark(m.dataset.mark);
        var on = markList().indexOf(m.dataset.mark) > -1;
        m.setAttribute('aria-pressed', String(on));
        m.closest('.block').classList.toggle('is-marked', on);
      }
    });
  }

  /* ---------- Review sheet ---------- */

  function renderSheet() {
    $('#sheet-root').innerHTML = C.units.map(function (u) {
      return '<section class="sheet-unit"><h2><span>' + esc(u.num) + '</span> ' + esc(u.title) + '</h2><dl>' +
        cardsOf(u.id).map(function (c) { return '<div><dt>' + esc(c.front) + '</dt><dd>' + esc(c.back) + '</dd></div>'; }).join('') +
        '</dl></section>';
    }).join('') || '<p class="note">No flashcards in this class yet.</p>';
  }

  /* ---------- Weak spots ---------- */

  // Flashcards marked Still learning (not ones not tried yet).
  function learningCards(unitId) {
    var review = P().review || {};
    return cardsOf(unitId).filter(function (c) { return !isKnown(c) && review['c:' + cardKey(c)]; });
  }

  function renderWeak() {
    var root = $('#weak-root');
    var allMisses = missedIds().length;
    var rows = C.units.map(function (u) {
      return { unit: u, score: unitScore(u), misses: unitMisses(u.id), learning: learningCards(u.id), last: (P().byUnit || {})[u.id] };
    });
    var tried = allMisses || Object.keys(P().test || {}).length || Object.keys(P().known || {}).length ||
      rows.some(function (r) { return r.learning.length; });
    if (!tried) {
      root.innerHTML = '<p class="weak-lead">Nothing here yet. Take a test or go through some flashcards, and this page shows you what to work on in ' + esc(className()) + '.</p>' +
        '<div class="test-actions"><button type="button" class="btn solid" data-quick="daily">Daily 10</button><a class="btn" href="#test" data-scope="all">Full test</a></div>';
      return;
    }
    rows.sort(function (a, b) { return a.score - b.score; });
    var weak = rows.filter(function (r) { return r.score < 100 || r.misses.length || r.learning.length; });
    var strong = rows.filter(function (r) { return weak.indexOf(r) === -1; });
    var top = weak[0];
    root.innerHTML =
      '<div class="weak-top">' +
      (top
        ? '<p>Start with <b>' + esc(top.unit.num + ' ' + top.unit.title) + '</b>. It\'s your lowest unit at ' + top.score + '%.</p>'
        : '<p>No weak spots right now. Run the full test to be sure.</p>') +
      (allMisses ? '<button type="button" class="btn solid" data-quick="missed">Retry all ' + allMisses + ' misses</button>' : '') +
      '</div>' +
      weak.map(function (r) {
        var u = r.unit;
        var facts = [
          r.misses.length ? r.misses.length + (r.misses.length === 1 ? ' missed question' : ' missed questions') : 'No missed questions',
          r.learning.length ? r.learning.length + (r.learning.length === 1 ? ' flashcard' : ' flashcards') + ' still learning' : '',
          r.last ? 'Last unit test ' + r.last.score + ' / ' + r.last.total : 'Unit test not taken'
        ].filter(Boolean).join('. ');
        return '<div class="weak-unit">' +
          '<div class="weak-head"><span class="sb-num">' + esc(u.num) + '</span><span class="sb-name">' + esc(u.title) + '</span><span class="sb-pct">' + r.score + '%</span></div>' +
          '<span class="pct"><i style="width:' + r.score + '%"></i></span>' +
          '<p class="note">' + facts + '.</p>' +
          '<div class="weak-links">' +
          (r.misses.length ? '<button type="button" data-quick="m' + u.id + '">Retry misses</button>' : '<a href="#test" data-scope="' + u.id + '">Unit test</a>') +
          (r.learning.length ? '<a href="#flashcards" data-flash="' + u.id + '">Flashcards</a>' : '') +
          '<a href="#' + u.id + '">Notes</a></div>' +
          (r.misses.length
            ? '<details><summary>See what you missed</summary><ul class="missed">' + r.misses.map(function (id) {
                var q = C.questions[id];
                return '<li><span>' + esc(q.q) + '</span>' + esc(q.c[q.a]) + '</li>';
              }).join('') + '</ul></details>'
            : '') +
          '</div>';
      }).join('') +
      (strong.length ? '<p class="note weak-good">Looking good: ' + strong.map(function (r) { return esc(r.unit.num + ' ' + r.unit.short); }).join(', ') + '</p>' : '');
  }

  /* ---------- Flashcards ---------- */

  var flash = { scope: 'all', pile: 'all', deck: [], pos: 0 };

  function unitLabel(n) {
    var u = C.units[n - 1];
    return u ? u.num + ' ' + u.title : '';
  }

  function cardKey(c) {
    return 'u' + c.u + ':' + c.front;
  }

  function isKnown(c) {
    return !!(P().known && P().known[cardKey(c)]);
  }

  function scopeCards() {
    return C.flashcards.filter(function (c) { return flash.scope === 'all' || 'u' + c.u === flash.scope; });
  }

  function setDeck(shuffled) {
    var deck = scopeCards().filter(function (c) { return flash.pile === 'all' || !isKnown(c); });
    flash.deck = shuffled ? shuffle(deck) : deck;
    flash.pos = 0;
    renderCard();
  }

  // Opens Flashcards on one card (from search).
  function openCard(i) {
    var c = C.flashcards[i];
    flash.scope = 'u' + c.u;
    flash.pile = 'all';
    setDeck(false);
    flash.pos = Math.max(0, flash.deck.indexOf(c));
    location.hash = 'flashcards';
    renderCard();
  }

  function paintFlash() {
    var scopes = [{ id: 'all', label: 'All units' }].concat(C.units.map(function (u) { return { id: u.id, label: u.num + ' ' + u.short }; }));
    $('#flash-units').innerHTML = scopes.map(function (s) {
      var on = s.id === flash.scope;
      return '<button type="button" data-unit="' + s.id + '" class="' + (on ? 'is-on' : '') + '" aria-pressed="' + on + '">' + esc(s.label) + '</button>';
    }).join('');
    var cards = scopeCards();
    var known = cards.filter(isKnown).length;
    $$('#flash-pile button').forEach(function (b) {
      var on = b.dataset.pile === flash.pile;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
      b.textContent = b.dataset.pile === 'all' ? 'All cards (' + cards.length + ')' : 'Still learning (' + (cards.length - known) + ')';
    });
    $('#flash-known').textContent = known + ' of ' + cards.length + ' Got it';
    $('#flash-bar').style.width = pct(known, cards.length) + '%';
  }

  function renderCard() {
    if (!cur) return;
    var c = flash.deck[flash.pos];
    var card = $('#card');
    var hasCard = !!c;
    card.classList.remove('is-flipped');
    card.disabled = !hasCard;
    var swap = settings.cardFirst === 'answer';
    var note = hasCard ? c.simple || '' : '';
    card.classList.toggle('swap', hasCard && swap);
    $('#card-front').textContent = hasCard ? (swap ? c.back : c.front) : (C.flashcards.length ? 'Pile cleared' : 'No flashcards yet');
    $('#card-back').textContent = hasCard ? (swap ? c.front : c.back) : '';
    $('#card-simple-f').textContent = swap ? note : '';
    $('#card-simple-b').textContent = swap ? '' : note;
    $('#card-tag-f').textContent = hasCard ? className() + ', ' + unitLabel(c.u) : (C.flashcards.length ? 'Every card here is marked Got it' : 'This class has no flashcards yet');
    $('#card-tag-b').textContent = hasCard ? className() + ', ' + unitLabel(c.u) : '';
    $('#card-count').textContent = hasCard ? (flash.pos + 1) + ' of ' + flash.deck.length : '0 cards';
    ['#card-learning', '#card-known', '#card-prev', '#card-next'].forEach(function (id) { $(id).disabled = !hasCard; });
    $('#card-known').classList.toggle('is-on', hasCard && isKnown(c));
    paintFlash();
  }

  function moveCard(step) {
    var n = flash.deck.length;
    if (!n) return;
    flash.pos = (flash.pos + step + n) % n;
    renderCard();
  }

  function setKnown(c, known) {
    var p = P();
    p.known = p.known || {};
    if (known) p.known[cardKey(c)] = true;
    else delete p.known[cardKey(c)];
    reviewRecord('c:' + cardKey(c), known);
  }

  function markCard(known) {
    var c = flash.deck[flash.pos];
    if (!c) return;
    setKnown(c, known);
    bumpGoal();
    save();
    if (flash.pile === 'learning' && known) {
      flash.deck.splice(flash.pos, 1);
      if (flash.pos >= flash.deck.length) flash.pos = 0;
      renderCard();
    } else {
      moveCard(1);
    }
  }

  function buildFlashcards() {
    $('#flash-units').addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      flash.scope = b.dataset.unit;
      P().flashScope = flash.scope;
      save();
      setDeck(false);
    });
    $('#flash-pile').addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      flash.pile = b.dataset.pile;
      setDeck(false);
    });
    $('#card-known').addEventListener('click', function () { markCard(true); });
    $('#card-learning').addEventListener('click', function () { markCard(false); });
    $('#card').addEventListener('click', function () { $('#card').classList.toggle('is-flipped'); });
    $('#card-prev').addEventListener('click', function () { moveCard(-1); });
    $('#card-next').addEventListener('click', function () { moveCard(1); });
    $('#card-shuffle').addEventListener('click', function () { setDeck(true); });
    $('#card-order').addEventListener('click', function () { setDeck(false); });
    document.addEventListener('keydown', function (e) {
      if (!$('#view-flashcards').classList.contains('is-active')) return;
      if (e.target.closest('input, textarea, select')) return;
      if (e.key === 'ArrowRight') moveCard(1);
      if (e.key === 'ArrowLeft') moveCard(-1);
    });
  }

  /* ---------- Review schedule ---------- */

  // Days to wait. A miss goes back to the first one, each right answer moves one along.
  var WAITS = [1, 3, 7, 14, 30];
  var NEW_PER_DAY = 10;
  var STUDY_ROUND = 20;

  function dayNumber(date) {
    return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
  }

  function thisDay() {
    return dayNumber(new Date());
  }

  function examDay() {
    var e = examDate();
    if (!e) return null;
    var p = e.split('-').map(Number);
    var day = dayNumber(new Date(p[0], p[1] - 1, p[2]));
    return isNaN(day) ? null : day;
  }

  // Test questions use their number. Flashcards use 'c' plus their number.
  function isCardId(id) {
    return typeof id === 'string';
  }

  function cardOf(id) {
    return C.flashcards[Number(id.slice(1))];
  }

  function itemOf(id) {
    return isCardId(id) ? cardOf(id) : C.questions[id];
  }

  function itemKey(id) {
    return isCardId(id) ? 'c:' + cardKey(cardOf(id)) : 'q:' + C.questions[id].q;
  }

  function reviewRecord(key, isRight) {
    var day = thisDay();
    var exam = examDay();
    var p = P();
    p.review = p.review || {};
    var rec = p.review[key];
    // A second right answer on the same day doesn't move it along.
    if (isRight && rec && rec.last === day) {
      rec.due = Math.max(rec.due, day + 1);
      return;
    }
    var box = isRight ? (rec ? Math.min(rec.box + 1, WAITS.length - 1) : 1) : 0;
    p.review[key] = {
      box: box,
      due: !isRight && exam === day ? day : day + WAITS[box],
      last: day,
      first: rec ? rec.first : day
    };
  }

  // Anything due after the final gets one last review the day before it.
  function dueDay(rec) {
    var exam = examDay();
    if (exam === null || thisDay() > exam) return rec.due;
    var cap = exam - 1;
    return rec.due > cap && rec.last < cap ? cap : rec.due;
  }

  function studyPlan() {
    var day = thisDay();
    var exam = examDay();
    var review = P().review || {};
    var due = [];
    var fresh = [];
    var next = null;
    var added = 0;
    var ids = C.questions.map(function (q, i) { return i; }).concat(C.flashcards.map(function (c, i) { return 'c' + i; }));

    ids.forEach(function (id) {
      var rec = review[itemKey(id)];
      if (!rec) {
        fresh.push(id);
        return;
      }
      if (rec.first === day) added++;
      var when = dueDay(rec);
      if (when <= day) due.push({ id: id, when: when, box: rec.box });
      else if (exam === null || day > exam || when <= exam) {
        if (!next || when < next.when) next = { when: when, count: 1 };
        else if (when === next.when) next.count++;
      }
    });

    // New items are paced so all of them get seen before the final.
    var daysLeft = exam !== null && exam >= day ? Math.max(exam - day, 1) : 0;
    var perDay = daysLeft ? Math.max(NEW_PER_DAY, Math.ceil((fresh.length + added) / daysLeft)) : NEW_PER_DAY;
    var rank = {};
    C.units.forEach(function (u, i) { rank[i + 1] = unitScore(u); });
    fresh = shuffle(fresh).sort(function (a, b) {
      return (rank[itemOf(a).u] || 0) - (rank[itemOf(b).u] || 0);
    }).slice(0, Math.max(0, perDay - added));

    due.sort(function (a, b) { return a.when - b.when || a.box - b.box; });
    return { due: due.map(function (d) { return d.id; }), fresh: fresh, next: next, paced: !!daysLeft };
  }

  function studyCount(plan) {
    return plan.due.length + plan.fresh.length;
  }

  function thingsText(n) {
    return n + (n === 1 ? ' thing' : ' things');
  }

  function waitText(days) {
    return days === 1 ? 'tomorrow' : 'in ' + days + ' days';
  }

  function backText(id) {
    var rec = (P().review || {})[itemKey(id)];
    if (!rec) return '';
    var day = thisDay();
    var exam = examDay();
    var when = dueDay(rec);
    if (exam !== null && day <= exam && when > exam) return 'You are set on this one for the final';
    if (when <= day) return 'This comes back today';
    return 'This comes back ' + waitText(when - day);
  }

  function renderStudy() {
    var plan = studyPlan();
    var n = studyCount(plan);
    var parts = [];
    if (plan.due.length) parts.push(plan.due.length + ' to review');
    if (plan.fresh.length) parts.push(plan.fresh.length + ' new');
    var note;
    if (n) {
      note = parts.join(', ') + '. ' + (n > STUDY_ROUND ? STUDY_ROUND + ' at a time. ' : '') +
        (examDay() === thisDay() ? 'Misses stay on the list until you get them right.' : 'Misses come back tomorrow, right answers wait longer.') +
        (plan.paced ? ' Paced for your final.' : '');
    } else if (plan.next) {
      note = 'Next review ' + waitText(plan.next.when - thisDay()) + ': ' + thingsText(plan.next.count);
    } else {
      note = C.questions.length || C.flashcards.length ? 'You have reviewed everything' : 'This class has nothing to study yet';
    }
    $('#home-study-btn').disabled = !n;
    $('#home-study').textContent = n ? 'Study ' + thingsText(n) + ' today' : 'Done for today';
    $('#home-study-note').textContent = note;
  }

  /* ---------- Study plan (only when the class has a finals date) ---------- */

  function planSteps() {
    var steps = [];
    var n = studyCount(studyPlan());
    var misses = missedIds().length;
    if (n) steps.push({ attrs: 'data-quick="study"', title: 'Study ' + thingsText(n), note: 'Reviews that are due and new items, picked for you' });
    if (misses) steps.push({ attrs: 'data-quick="missed"', title: 'Retry ' + misses + (misses === 1 ? ' miss' : ' misses'), note: 'Questions you got wrong last time' });
    if (C.drills.length && drillTally().total < 5) steps.push({ href: '#drills', title: 'Do 5 formula drills', note: 'New numbers each time' });
    var weakest = C.units.slice().sort(function (a, b) { return unitScore(a) - unitScore(b); })[0];
    if (weakest && unitScore(weakest) < 100) {
      steps.push({ href: '#' + weakest.id, title: 'Reread ' + weakest.num + ' ' + weakest.short, note: 'Your lowest unit at ' + unitScore(weakest) + '%' });
    }
    if (P().mockDay !== thisDay() && !(P().test || {}).mock) {
      steps.push({ attrs: 'data-mock', title: 'Take the mock quiz', note: mockCount() + ' questions in ' + MOCK_MINUTES + ' minutes' });
    }
    return steps.slice(0, 4);
  }

  function renderPlan() {
    var root = $('#home-plan');
    var exam = examDay();
    var daysLeft = exam === null ? -1 : exam - thisDay();
    if (daysLeft < 0) {
      root.hidden = true;
      root.innerHTML = '';
      return;
    }
    root.hidden = false;
    var board = $('#board');
    board.parentNode.insertBefore(root, daysLeft === 0 ? board : board.nextSibling);
    if (daysLeft === 0) {
      var misses = missedIds().length;
      root.className = 'plan is-today';
      root.innerHTML = '<h2>The ' + esc(className()) + ' final is today' + (settings.name ? '. Good luck, ' + esc(settings.name) : '. Good luck') + '</h2>' +
        '<p class="plan-lead">One last look, nothing new.</p>' +
        '<div class="test-actions"><a class="btn solid" href="#sheet">Open the review sheet</a>' +
        (misses ? '<button type="button" class="btn" data-quick="missed">Retry ' + misses + (misses === 1 ? ' miss' : ' misses') + '</button>' : '') + '</div>';
      return;
    }
    var steps = planSteps();
    root.className = 'plan';
    root.innerHTML =
      '<h2>' + (daysLeft === 1 ? 'The final is tomorrow. Tonight\'s plan' : daysLeft + ' days to the final. Today\'s plan') + '</h2>' +
      (steps.length
        ? '<ol class="plan-steps">' + steps.map(function (st, i) {
            var inner = '<i>' + (i + 1) + '</i><b>' + esc(st.title) + '</b><span>' + esc(st.note) + '</span>';
            return '<li>' + (st.href
              ? '<a class="plan-step" href="' + st.href + '">' + inner + '</a>'
              : '<button type="button" class="plan-step" ' + st.attrs + '>' + inner + '</button>') + '</li>';
          }).join('') + '</ol>'
        : '<p class="plan-lead">Today\'s plan is done. Come back tomorrow for the next one.</p>');
  }

  /* ---------- Bookmarks ---------- */

  function savedQList() {
    return P().savedQs || [];
  }

  function isSavedQ(q) {
    return savedQList().indexOf(q.q) > -1;
  }

  function toggleSavedQ(q) {
    var list = savedQList().filter(function (text) { return text !== q.q; });
    var adding = list.length === savedQList().length;
    if (adding) list.push(q.q);
    P().savedQs = list;
    save();
    toast(adding ? 'Bookmarked. Find it under Bookmarks' : 'Bookmark removed');
  }

  function savedIds() {
    var list = savedQList();
    var ids = [];
    C.questions.forEach(function (q, i) { if (list.indexOf(q.q) > -1) ids.push(i); });
    return ids;
  }

  function sectionById(id) {
    var found = null;
    C.units.forEach(function (u) {
      (u.sections || []).forEach(function (s) { if (s.id === id) found = { unit: u, sec: s }; });
    });
    return found;
  }

  function markList() {
    return (P().marks || []).filter(sectionById);
  }

  function toggleMark(id) {
    var list = markList();
    var on = list.indexOf(id) > -1;
    P().marks = on ? list.filter(function (x) { return x !== id; }) : list.concat(id);
    save();
    toast(on ? 'Bookmark removed' : 'Section bookmarked. Find it under Bookmarks');
  }

  function renderSaved() {
    var root = $('#saved-root');
    var ids = savedIds();
    var marks = markList();
    var others = SUBJECTS.filter(function (s) {
      if (s.id === cur) return false;
      var p = (saved.classes || {})[s.id] || {};
      return (p.marks || []).length || (p.savedQs || []).length;
    });
    root.innerHTML =
      '<h2 class="t-section">' + esc(className()) + ': bookmarked sections (' + marks.length + ')</h2>' +
      (marks.length
        ? '<ul class="saved-list">' + marks.map(function (id) {
            var f = sectionById(id);
            var body = (f.sec.body || []).join(' ');
            return '<li><span class="saved-q">' + esc(f.sec.title) + '</span>' +
              '<p class="note" style="margin:4px 0 0">' + esc(body.slice(0, 140)) + (body.length > 140 ? '...' : '') + '</p>' +
              '<div class="ev-actions"><span class="note">' + esc(f.unit.num + ' ' + f.unit.title) + '</span>' +
              '<button type="button" class="link-btn" data-mark-open="' + esc(id) + '">Open in notes</button>' +
              '<button type="button" class="link-btn" data-mark-del="' + esc(id) + '">Remove</button></div></li>';
          }).join('') + '</ul>'
        : '<p class="note">Nothing yet. In any unit, tap the bookmark next to a heading to keep that section here.</p>') +
      '<h2 class="t-section">' + esc(className()) + ': bookmarked questions (' + ids.length + ')</h2>' +
      (ids.length
        ? '<div class="test-actions"><button type="button" class="btn solid" data-quick="saved">Practice bookmarked questions</button></div>' +
          '<ul class="saved-list">' + ids.map(function (id) {
            var q = C.questions[id];
            return '<li><span class="saved-q">' + esc(q.q) + '</span>' +
              '<details><summary>Show answer</summary><p>' + esc(q.c[q.a]) + '. ' + esc(q.why || '') + '</p></details>' +
              '<div class="ev-actions"><span class="note">' + esc(unitLabel(q.u)) + '</span>' +
              '<button type="button" class="link-btn" data-unsave-q="' + id + '">Remove</button></div></li>';
          }).join('') + '</ul>'
        : '<p class="note">Nothing yet. During a practice test, tap the <b>Bookmark</b> button next to a question to keep it here.</p>') +
      (others.length
        ? '<h2 class="t-section">Bookmarks in other classes</h2><div class="weak-links">' + others.map(function (s) {
            return '<a href="#class/' + s.id + '" data-then="saved">' + esc(s.name) + '</a>';
          }).join('') + '</div>'
        : '');
  }

  function buildSaved() {
    $('#saved-root').addEventListener('click', function (e) {
      var unq = e.target.closest('[data-unsave-q]');
      if (unq) {
        toggleSavedQ(C.questions[Number(unq.dataset.unsaveQ)]);
        renderSaved();
      }
      var mOpen = e.target.closest('[data-mark-open]');
      if (mOpen) {
        var f = sectionById(mOpen.dataset.markOpen);
        goToSection(f.unit.id, f.sec.id);
      }
      var mDel = e.target.closest('[data-mark-del]');
      if (mDel) {
        toggleMark(mDel.dataset.markDel);
        renderSaved();
      }
      var then = e.target.closest('[data-then]');
      if (then) {
        e.preventDefault();
        setClass(then.getAttribute('href').split('/')[1]);
        renderSaved();
        window.scrollTo(0, 0);
      }
    });
  }

  /* ---------- Practice test ---------- */

  var test = { scope: 'all', run: null };

  function pool(scope) {
    return C.questions.filter(function (q) { return scope === 'all' || 'u' + q.u === scope; });
  }

  function gameLength() {
    return settings.gameLength === 'all' ? C.questions.length : Math.min(Number(settings.gameLength), C.questions.length);
  }

  // Misses first, then questions from the weakest units.
  function dailyIds() {
    var ids = shuffle(missedIds()).slice(0, 10);
    var units = C.units.slice().sort(function (a, b) { return unitScore(a) - unitScore(b); });
    units.forEach(function (u) {
      var taken = 0;
      shuffle(pool(u.id)).forEach(function (q) {
        var id = C.questions.indexOf(q);
        if (ids.length < 10 && taken < 4 && ids.indexOf(id) === -1) {
          ids.push(id);
          taken++;
        }
      });
    });
    // Small classes: top up from anything left.
    shuffle(C.questions.map(function (q, i) { return i; })).forEach(function (id) {
      if (ids.length < 10 && ids.indexOf(id) === -1) ids.push(id);
    });
    return ids;
  }

  function markDaily() {
    var now = new Date();
    var today = dayStamp(now);
    var yesterday = dayStamp(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
    var streak = saved.streak || { last: '', count: 0 };
    if (streak.last === today) return;
    saved.streak = { last: today, count: streak.last === yesterday ? streak.count + 1 : 1 };
  }

  function missedIds() {
    var list = P().missed || [];
    var ids = [];
    C.questions.forEach(function (q, i) { if (list.indexOf(q.q) > -1) ids.push(i); });
    return ids;
  }

  function setMissed(q, isMissed) {
    var list = (P().missed || []).filter(function (text) { return text !== q.q; });
    if (isMissed) list.push(q.q);
    P().missed = list;
  }

  function recordUnits(run) {
    var p = P();
    p.byUnit = p.byUnit || {};
    C.units.forEach(function (u) {
      var ids = run.ids.filter(function (id) { return !isCardId(id) && 'u' + C.questions[id].u === u.id; });
      if (!ids.length) return;
      var wrong = ids.filter(function (id) { return run.missed.indexOf(id) > -1; }).length;
      p.byUnit[u.id] = { score: ids.length - wrong, total: ids.length };
    });
  }

  function unitOf(id) {
    return C.units.filter(function (x) { return x.id === id; })[0];
  }

  // 'missed' retries every miss. 'mu2' retries only the misses from unit 2.
  function isMissScope(scope) {
    return scope === 'missed' || /^mu\d+$/.test(scope);
  }

  function isOneQuestion(scope) {
    return /^q\d+$/.test(scope);
  }

  function scopeName(scope) {
    if (scope === 'all') return 'Full test';
    if (scope === 'missed') return 'Retry my misses';
    if (scope === 'daily') return 'Daily 10';
    if (scope === 'game') return 'Game Day';
    if (scope === 'mock') return 'Mock quiz';
    if (scope === 'study') return 'Study today';
    if (scope === 'saved') return 'Bookmarked questions';
    if (isMissScope(scope)) { var mu = unitOf(scope.slice(1)); return 'Retry ' + mu.num + ' ' + mu.short + ' misses'; }
    if (isOneQuestion(scope)) return 'One question';
    var u = unitOf(scope);
    return u ? u.num + ' ' + u.title : 'Test';
  }

  function unitMisses(unitId) {
    return missedIds().filter(function (id) { return 'u' + C.questions[id].u === unitId; });
  }

  function keepRun() {
    P().run = test.run;
    save();
  }

  function startTest(scope) {
    if (!cur) return;
    var ids = [];
    C.questions.forEach(function (q, i) {
      if (scope === 'all' || 'u' + q.u === scope || scope === 'q' + i) ids.push(i);
    });
    if (scope === 'missed') ids = missedIds();
    if (/^mu\d+$/.test(scope)) ids = unitMisses(scope.slice(1));
    if (scope === 'daily') ids = dailyIds();
    if (scope === 'saved') ids = savedIds();
    if (scope === 'mock') ids = mockIds();
    if (scope === 'game') ids = shuffle(C.questions.map(function (q, i) { return i; })).slice(0, gameLength());
    if (scope === 'study') {
      var plan = studyPlan();
      ids = plan.due.concat(plan.fresh).slice(0, STUDY_ROUND);
    }
    if (!ids.length) {
      test.run = null;
      test.setup = true;
      renderTest();
      toast('Nothing to practice there yet');
      return;
    }
    test.run = { scope: scope, exam: scope === 'game' || scope === 'mock', ids: shuffle(ids), pos: 0, right: 0, missed: [], order: null, picked: null };
    if (scope === 'mock') test.run.endsAt = Date.now() + MOCK_MINUTES * 60000;
    prepareQuestion();
    keepRun();
    renderTest();
  }

  function prepareQuestion() {
    var run = test.run;
    var id = run.ids[run.pos];
    run.picked = null;
    run.shown = false;
    if (isCardId(id)) return;
    var q = C.questions[id];
    var idx = q.c.map(function (_, i) { return i; });
    run.order = q.t === 'tf' ? idx : shuffle(idx);
  }

  function renderSetup(root) {
    var last = P().test || {};
    var scopes = ['all'].concat(C.units.map(function (u) { return u.id; }));
    if (savedIds().length) scopes.push('saved');
    if (test.scope === 'saved' && !savedIds().length) test.scope = 'all';
    var run = test.run;
    var misses = missedIds().length;
    var toStudy = studyCount(studyPlan());
    if (!C.questions.length) {
      root.innerHTML = '<p class="weak-lead">' + esc(className()) + ' has no test questions yet.</p><div class="test-actions"><a class="btn" href="#classes">Pick another class</a></div>';
      return;
    }
    var study = toStudy
      ? '<button type="button" class="mode-card" data-quick="study"><b>Study today</b><span>' + toStudy + ' picked for you</span></button>'
      : '<a class="mode-card" href="#flashcards"><b>Flashcards</b><span>Flip through the terms</span></a>';
    var retry = misses
      ? '<button type="button" class="mode-card" data-retry><b>Retry misses</b><span>' + misses + (misses === 1 ? ' question' : ' questions') + ' you got wrong</span></button>'
      : '<a class="mode-card" href="#weak"><b>Weak spots</b><span>See what to work on</span></a>';
    var marks = markList().length;
    var qs = savedIds().length;
    root.innerHTML =
      (run && !run.finished
        ? '<button type="button" class="resume-bar" data-resume><b>Resume ' + esc(scopeName(run.scope)) + '</b><span>Question ' + (run.pos + 1) + ' of ' + run.ids.length +
          (run.endsAt ? ', ' + clockText(run.endsAt - Date.now()) + ' left' : '') + '</span></button>'
        : '') +
      '<h2 class="t-section">Quick practice</h2>' +
      '<button type="button" class="mock-card" data-mock><b>Mock quiz</b><span>' + mockCount() + ' questions, ' + MOCK_MINUTES + ' minutes on the clock, answers at the end' +
        (last.mock ? '. Last: ' + last.mock.score + '/' + last.mock.total : '') + '</span></button>' +
      '<div class="mode-grid">' + study + retry +
      '<button type="button" class="mode-card" data-quick="daily"><b>Daily 10</b><span>Misses and weak units</span></button>' +
      '<button type="button" class="mode-card" data-quick="game"><b>Game Day</b><span>' + gameLength() + ' questions, answers at the end</span></button>' +
      '</div>' +
      '<a class="bm-bar" href="#saved"><svg aria-hidden="true"><use href="#i-bookmark"></use></svg><b>Bookmarks</b><span>' +
        marks + (marks === 1 ? ' section, ' : ' sections, ') + qs + (qs === 1 ? ' question' : ' questions') + '</span></a>' +
      '<h2 class="t-section">More ways to practice</h2>' +
      '<div class="mode-grid">' +
      '<a class="mode-card" href="#sheet"><b>Review sheet</b><span>Every flashcard on a few printable pages</span></a>' +
      '<a class="mode-card" href="#drills"><b>Formula drills</b><span>' + (C.drills.length ? 'New numbers every time' : 'None for this class yet') + '</span></a>' +
      '<a class="mode-card" href="#match"><b>Matching game</b><span>' + (P().matchBest ? 'Best time: ' + clockText(P().matchBest) : 'Match terms to their meanings') + '</span></a>' +
      '<a class="mode-card" href="#weak"><b>Weak spots</b><span>What to study next</span></a>' +
      '</div>' +
      '<h2 class="t-section">Pick a test</h2>' +
      '<ul class="scope-list">' + scopes.map(function (s) {
        return '<li><label><input type="radio" name="scope" value="' + s + '"' + (s === test.scope ? ' checked' : '') + '>' +
          '<span class="scope-name">' + esc(scopeName(s)) + '</span>' +
          '<span class="scope-meta">' + (s === 'saved' ? savedIds().length : pool(s).length) + ' questions' + (last[s] ? ', last ' + last[s].score + '/' + last[s].total : '') + '</span></label></li>';
      }).join('') + '</ul>' +
      '<button type="button" class="btn solid" data-start>Start test</button>';
  }

  function feedbackLink(id) {
    return '<div class="test-actions"><a class="link-btn" href="#feedback" data-wrong="' + id + '">Think this answer is wrong? Send feedback</a></div>';
  }

  function renderQuestion(root) {
    var run = test.run;
    var q = C.questions[run.ids[run.pos]];
    var answered = run.picked !== null;
    var isRight = answered && run.picked === q.a;
    root.innerHTML =
      '<div class="t-progress"><span>Question ' + (run.pos + 1) + ' of ' + run.ids.length + '</span>' +
        (run.endsAt ? '<span class="t-timer" data-timer></span>' : '') +
        '<span>' + (run.exam ? 'Answers at the end' : run.right + ' right') + '</span></div>' +
      '<div class="t-bar"><i style="width:' + ((run.pos + (answered ? 1 : 0)) / run.ids.length * 100) + '%"></i></div>' +
      '<div class="q-head"><p class="t-q">' + (q.t === 'tf' ? 'True or false: ' : '') + esc(q.q) + '</p>' +
        '<button type="button" class="bm-btn" data-save-q aria-pressed="' + isSavedQ(q) + '" aria-label="' + (isSavedQ(q) ? 'Remove bookmark' : 'Bookmark this question') + '">' +
        '<svg aria-hidden="true"><use href="#i-bookmark"></use></svg><span>' + (isSavedQ(q) ? 'Bookmarked' : 'Bookmark') + '</span></button></div>' +
      '<div class="opts">' + run.order.map(function (i) {
        var cls = 'opt';
        if (answered && i === q.a) cls += ' right';
        else if (answered && i === run.picked) cls += ' wrong';
        return '<button type="button" class="' + cls + '" data-pick="' + i + '"' + (answered ? ' disabled' : '') + '>' + esc(q.c[i]) + '</button>';
      }).join('') + '</div>' +
      (run.skips && run.skips[run.ids[run.pos]] && !answered ? '<p class="t-back">You skipped this one earlier.</p>' : '') +
      '<div class="q-tools">' +
        (!answered && run.scope !== 'mock' && run.pos < run.ids.length - 1 ? '<button type="button" class="btn ghost" data-skip>Skip for now</button>' : '') +
      '</div>' +
      (answered
        ? '<p class="t-why' + (isRight ? '' : ' bad') + '" aria-live="polite"><strong>' + (isRight ? 'Correct' : 'Answer: ' + esc(q.c[q.a])) + '</strong>' + esc(q.why || '') +
          '<span class="t-back">' + esc(backText(run.ids[run.pos])) + '</span></p>' +
          feedbackLink(run.ids[run.pos]) +
          '<div class="test-actions"><button type="button" class="btn solid" data-next>' + (run.pos + 1 === run.ids.length ? 'See score' : 'Next question') + '</button></div>'
        : '') +
      '<div class="test-actions"><button type="button" class="link-btn" data-quit>' +
        (run.endsAt ? 'Leave test (the clock keeps running)' : 'Leave test (your place is saved)') + '</button></div>';
    paintTimer();
    var nextBtn = $('[data-next]', root);
    if (nextBtn) nextBtn.focus({ preventScroll: true });
  }

  function renderStudyCard(root) {
    var run = test.run;
    var c = cardOf(run.ids[run.pos]);
    var swap = settings.cardFirst === 'answer';
    root.innerHTML =
      '<div class="t-progress"><span>Question ' + (run.pos + 1) + ' of ' + run.ids.length + '</span><span>' + run.right + ' right</span></div>' +
      '<div class="t-bar"><i style="width:' + (run.pos / run.ids.length * 100) + '%"></i></div>' +
      '<span class="card-tag">Flashcard: ' + esc(unitLabel(c.u)) + '</span>' +
      '<p class="t-q">' + esc(swap ? c.back : c.front) + '</p>' +
      (run.shown
        ? '<p class="t-why" aria-live="polite">' + esc(swap ? c.front : c.back) + '</p>' +
          (c.simple ? '<p class="simple">' + esc(c.simple) + '</p>' : '') +
          '<div class="test-actions"><button type="button" class="btn" data-rate="0">Still learning</button><button type="button" class="btn solid" data-rate="1">Got it</button></div>'
        : '<div class="test-actions"><button type="button" class="btn solid" data-show>Show answer</button></div>') +
      '<div class="test-actions"><button type="button" class="link-btn" data-quit>Leave test (your place is saved)</button></div>';
    var mainBtn = $('[data-show], [data-rate="1"]', root);
    if (mainBtn) mainBtn.focus({ preventScroll: true });
  }

  function studyDoneActions() {
    var left = studyCount(studyPlan());
    var note = examDay() === thisDay() ? 'Your misses are back on the list now.' : 'Your misses come back tomorrow.';
    return (test.run.missed.length ? '<p class="t-back">' + note + '</p>' : '') +
      '<div class="test-actions">' +
      (left ? '<button type="button" class="btn solid" data-again>Study the next ' + Math.min(left, STUDY_ROUND) + '</button>' : '') +
      '<a class="btn' + (left ? '' : ' solid') + '" href="#home">Back to Home</a></div>';
  }

  function renderResult(root) {
    var run = test.run;
    var byUnit = C.units.map(function (u) {
      if (run.scope !== 'all' && run.scope !== 'game' && run.scope !== 'mock') return '';
      var ids = run.ids.filter(function (id) { return 'u' + C.questions[id].u === u.id; });
      if (!ids.length) return '';
      var right = ids.filter(function (id) { return run.missed.indexOf(id) === -1; }).length;
      return '<div><span>' + esc(u.num + ' ' + u.short) + '</span><span>' + right + ' / ' + ids.length + '</span>' +
        '<span class="pct"><i style="width:' + pct(right, ids.length) + '%"></i></span></div>';
    }).join('');
    root.innerHTML =
      '<p class="t-score">' + run.right + ' <small>/ ' + run.ids.length + '</small></p>' +
      '<p>' + esc(scopeName(run.scope)) + ': ' + Math.round(run.right / run.ids.length * 100) + '%</p>' +
      (run.timedOut ? '<p class="t-back">Time ran out with ' + run.timedOut + ' not answered. They count as misses in this score.</p>' : '') +
      (byUnit ? '<div class="by-unit">' + byUnit + '</div>' : '') +
      (run.missed.length
        ? '<h2 style="font-size:28px;margin-top:20px">Review these</h2><ul class="missed">' + run.missed.map(function (id) {
            var item = itemOf(id);
            return isCardId(id)
              ? '<li><span>' + esc(item.front) + '</span>' + esc(item.back) + '</li>'
              : '<li><span>' + esc(item.q) + '</span>' + esc(item.c[item.a]) + '</li>';
          }).join('') + '</ul>'
        : '') +
      (run.scope === 'study'
        ? studyDoneActions()
        : '<div class="test-actions"><button type="button" class="btn solid" data-again>Take it again</button><button type="button" class="btn" data-setup>Pick another test</button>' +
          (run.missed.length ? '<a class="btn ghost" href="#weak">See weak spots</a>' : '') + '</div>');
  }

  function renderTest() {
    if (!cur) return;
    var root = $('#test-root');
    var run = test.run;
    if (test.mockIntro && !(run && run.scope === 'mock' && !run.finished)) renderMockIntro(root);
    else if (!run || test.setup) renderSetup(root);
    else if (run.finished) renderResult(root);
    else if (isCardId(run.ids[run.pos])) renderStudyCard(root);
    else renderQuestion(root);
  }

  function finishRun(run) {
    run.pos = run.ids.length - 1;
    run.finished = true;
    var p = P();
    if (run.scope === 'daily') {
      markDaily();
      toast('Daily 10 done. Streak: ' + saved.streak.count);
    } else if (!isMissScope(run.scope) && run.scope !== 'study' && run.scope !== 'saved' && !isOneQuestion(run.scope)) {
      p.test = p.test || {};
      p.test[run.scope] = { score: run.right, total: run.ids.length };
      if (!run.timedOut) recordUnits(run);
      if (run.scope === 'mock') p.mockDay = thisDay();
      toast('Score saved');
    }
    p.run = null;
    save();
  }

  function nextQuestion(run) {
    run.pos++;
    if (run.pos >= run.ids.length) finishRun(run);
    else {
      prepareQuestion();
      keepRun();
    }
    renderTest();
    window.scrollTo(0, 0);
  }

  // A test left halfway is picked up again, unless its mock clock already ran out.
  function restoreRun() {
    var r = P().run;
    if (r && r.scope === 'mock' && !(r.endsAt > Date.now())) { P().run = null; r = null; }
    if (r && !r.finished && Array.isArray(r.ids) && r.ids.every(itemOf)) {
      test.run = r;
      test.setup = true;
    }
  }

  /* ---------- Mock quiz ---------- */

  var MOCK_MINUTES = 15;
  var MOCK_QUESTIONS = 40;

  function mockCount() {
    return Math.min(MOCK_QUESTIONS, C.questions.length);
  }

  // Each unit's share of the mock matches its share of all the questions.
  function mockIds() {
    var total = mockCount();
    var byUnit = C.units.map(function (u) {
      var ids = shuffle(C.questions.map(function (q, i) { return i; }).filter(function (i) { return 'u' + C.questions[i].u === u.id; }));
      var exact = ids.length * total / C.questions.length;
      return { ids: ids, take: Math.floor(exact), extra: exact - Math.floor(exact) };
    });
    var left = total - byUnit.reduce(function (n, u) { return n + u.take; }, 0);
    byUnit.slice().sort(function (a, b) { return b.extra - a.extra; }).forEach(function (u) {
      if (left > 0 && u.take < u.ids.length) { u.take++; left--; }
    });
    return byUnit.reduce(function (all, u) { return all.concat(u.ids.slice(0, u.take)); }, []);
  }

  function clockText(ms) {
    var sec = Math.max(0, Math.ceil(ms / 1000));
    var m = Math.floor(sec / 60);
    var r = sec % 60;
    return m + ':' + (r < 10 ? '0' : '') + r;
  }

  function openMockIntro() {
    if (!cur) { location.hash = 'classes'; return; }
    test.mockIntro = true;
    if (location.hash === '#test') { renderTest(); window.scrollTo(0, 0); }
    else location.hash = 'test';
  }

  function renderMockIntro(root) {
    var last = (P().test || {}).mock;
    root.innerHTML =
      '<div class="mock-intro">' +
      '<h2>Mock quiz</h2>' +
      '<ul><li>' + mockCount() + ' questions from every unit, mixed up</li><li>' + MOCK_MINUTES + ' minutes on the clock</li>' +
      '<li>No skipping, just like the real thing</li>' +
      '<li>Answers and your score by unit at the end</li><li>The clock keeps running if you leave the page</li></ul>' +
      '<p class="note">This is practice made from the class notes. The real final may ask things differently.</p>' +
      (last ? '<p class="note">Last time: ' + last.score + ' / ' + last.total + '</p>' : '') +
      '<div class="test-actions"><button type="button" class="btn solid" data-mock-start>Start the clock</button>' +
      '<button type="button" class="btn ghost" data-mock-cancel>Not now</button></div></div>';
  }

  function paintTimer() {
    var el = $('[data-timer]');
    var run = test.run;
    if (!el || !run || !run.endsAt) return;
    var left = run.endsAt - Date.now();
    el.textContent = clockText(left) + ' left';
    el.classList.toggle('is-low', left < 5 * 60000);
  }

  // Hands the mock quiz in when the clock runs out.
  function checkClock() {
    var run = test.run;
    if (!run || run.finished || !run.endsAt || Date.now() < run.endsAt) return;
    run.timedOut = run.ids.length - run.pos;
    run.missed = run.missed.concat(run.ids.slice(run.pos));
    test.setup = false;
    test.mockIntro = false;
    finishRun(run);
    renderTest();
    toast('Time is up. Mock quiz handed in.');
  }

  function startClock() {
    setInterval(function () {
      checkClock();
      paintTimer();
      paintMatchTime();
    }, 1000);
  }

  function buildTest() {
    var root = $('#test-root');
    root.addEventListener('change', function (e) {
      if (e.target.name === 'scope') test.scope = e.target.value;
    });
    root.addEventListener('click', function (e) {
      var t = e.target;
      var run = test.run;
      if (t.closest('[data-mock-start]')) {
        test.mockIntro = false;
        test.setup = false;
        startTest('mock');
        window.scrollTo(0, 0);
      } else if (t.closest('[data-mock-cancel]')) {
        test.mockIntro = false;
        renderTest();
      } else if (t.closest('[data-start]')) {
        test.setup = false;
        startTest(test.scope);
      } else if (t.closest('[data-resume]')) {
        test.setup = false;
        renderTest();
      } else if (t.closest('[data-retry]')) {
        test.setup = false;
        startTest('missed');
      } else if (t.closest('[data-pick]')) {
        var q = C.questions[run.ids[run.pos]];
        run.picked = Number(t.closest('[data-pick]').dataset.pick);
        if (run.picked === q.a) run.right++;
        else run.missed.push(run.ids[run.pos]);
        setMissed(q, run.picked !== q.a);
        reviewRecord(itemKey(run.ids[run.pos]), run.picked === q.a);
        bumpGoal();
        keepRun();
        if (run.exam) nextQuestion(run);
        else renderTest();
      } else if (t.closest('[data-skip]')) {
        var skipped = run.ids.splice(run.pos, 1)[0];
        run.ids.push(skipped);
        run.skips = run.skips || {};
        run.skips[skipped] = true;
        prepareQuestion();
        keepRun();
        renderTest();
        toast('Skipped. It comes back at the end');
        window.scrollTo(0, 0);
      } else if (t.closest('[data-save-q]')) {
        toggleSavedQ(C.questions[run.ids[run.pos]]);
        renderTest();
      } else if (t.closest('[data-show]')) {
        run.shown = true;
        keepRun();
        renderTest();
      } else if (t.closest('[data-rate]')) {
        var got = t.closest('[data-rate]').dataset.rate === '1';
        if (got) run.right++;
        else run.missed.push(run.ids[run.pos]);
        setKnown(cardOf(run.ids[run.pos]), got);
        bumpGoal();
        nextQuestion(run);
      } else if (t.closest('[data-next]')) {
        nextQuestion(run);
      } else if (t.closest('[data-quit]')) {
        test.setup = true;
        renderTest();
      } else if (t.closest('[data-again]')) {
        startTest(run.scope);
      } else if (t.closest('[data-setup]')) {
        test.run = null;
        test.setup = true;
        renderTest();
      }
    });
  }

  /* ---------- Formula drills (from each class's data file) ---------- */

  var drill = { q: null, answered: false, ok: false, typed: '' };

  function rand(lo, hi) {
    return lo + Math.floor(Math.random() * (hi - lo + 1));
  }

  function newDrill(skipTag) {
    var list = C.drills.length > 1 ? C.drills.filter(function (d) { return d.tag !== skipTag; }) : C.drills;
    var d = list[rand(0, list.length - 1)];
    var made = d.make(rand);
    return { tag: d.tag, unit: d.unit || '', q: made.q, answer: made.answer, work: made.work || '' };
  }

  function formulaList() {
    return C.formulas.length
      ? '<dl class="formulas">' + C.formulas.map(function (f) { return '<div><dt>' + esc(f[0]) + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join('') + '</dl>'
      : '';
  }

  function drillTally() {
    var d = P().drill || {};
    var today = d.day === thisDay();
    return { day: thisDay(), right: today ? d.right || 0 : 0, total: today ? d.total || 0 : 0, streak: d.streak || 0, best: d.best || 0 };
  }

  function renderDrill(focus) {
    var root = $('#drill-root');
    if (!cur) return;
    if (!C.drills.length) {
      root.innerHTML = '<p class="weak-lead">' + esc(className()) + ' has no formula drills yet.</p><div class="test-actions"><a class="btn" href="#test">Back to Practice test</a></div>';
      return;
    }
    if (!drill.q) drill.q = newDrill();
    var q = drill.q;
    var t = drillTally();
    root.innerHTML =
      '<div class="t-progress"><span>Today: ' + t.right + ' right of ' + t.total + '</span><span>Streak ' + t.streak + (t.best ? ' (best ' + t.best + ')' : '') + '</span></div>' +
      '<div class="t-bar"><i style="width:' + Math.min(t.total, 5) * 20 + '%"></i></div>' +
      '<span class="card-tag">' + esc(q.tag) + '</span>' +
      '<p class="t-q">' + esc(q.q) + '</p>' +
      '<form class="drill-row" data-drill-form><input class="num-input" id="drill-in" type="text" inputmode="decimal" autocomplete="off" aria-label="Your answer' + (q.unit ? ' in ' + esc(q.unit) : '') + '"' +
        (drill.answered ? ' disabled value="' + esc(drill.typed) + '"' : '') + '><span class="drill-unit">' + esc(q.unit) + '</span>' +
        (drill.answered ? '' : '<button type="submit" class="btn solid">Check</button>') + '</form>' +
      (drill.answered
        ? '<p class="t-why' + (drill.ok ? '' : ' bad') + '" aria-live="polite"><strong>' + (drill.ok ? 'Correct' : 'Answer: ' + esc(q.answer + (q.unit ? ' ' + q.unit : ''))) + '</strong>' + esc(q.work) + '</p>' +
          '<div class="test-actions"><button type="button" class="btn solid" data-drill-next>Next problem</button></div>'
        : '<p class="note drill-hint" id="drill-hint" aria-live="polite"></p>') +
      (C.formulas.length ? '<details class="drill-help"><summary>Show the formulas</summary>' + formulaList() + '</details>' : '');
    if (focus) {
      var el = drill.answered ? $('[data-drill-next]', root) : $('#drill-in');
      if (el) el.focus({ preventScroll: true });
    }
  }

  function checkDrill() {
    var typed = $('#drill-in').value.trim();
    var value = parseFloat(typed.replace(/,/g, '').replace(/[^0-9.\-]/g, ''));
    if (isNaN(value)) {
      $('#drill-hint').textContent = 'Type a number first';
      return;
    }
    var t = drillTally();
    drill.answered = true;
    drill.typed = typed;
    drill.ok = Math.abs(value - drill.q.answer) < 0.01;
    t.total++;
    if (drill.ok) { t.right++; t.streak++; } else { t.streak = 0; }
    t.best = Math.max(t.best, t.streak);
    P().drill = t;
    bumpGoal();
    save();
    renderDrill(true);
  }

  function buildDrill() {
    var root = $('#drill-root');
    root.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!drill.answered) checkDrill();
    });
    root.addEventListener('click', function (e) {
      if (!e.target.closest('[data-drill-next]')) return;
      drill = { q: newDrill(drill.q.tag), answered: false, ok: false, typed: '' };
      renderDrill(true);
    });
  }

  /* ---------- Matching game ---------- */

  var MATCH_PAIRS = 6;
  var match = null;

  // Only short cards fit on a tile.
  function matchCards() {
    var fronts = {};
    var backs = {};
    var out = [];
    shuffle(C.flashcards).forEach(function (c) {
      if (out.length === MATCH_PAIRS || c.front.length > 40 || c.back.length > 70 || c.back.indexOf('\n') > -1) return;
      if (fronts[c.front] || backs[c.back]) return;
      fronts[c.front] = backs[c.back] = true;
      out.push(c);
    });
    return out;
  }

  function startMatch() {
    var tiles = [];
    matchCards().forEach(function (c, i) {
      tiles.push({ pair: i, side: 'term', text: c.front });
      tiles.push({ pair: i, side: 'meaning', text: c.back });
    });
    match = { tiles: shuffle(tiles), picked: null, wrong: [], done: {}, left: tiles.length / 2, misses: 0, started: 0, time: 0 };
  }

  function paintMatchTime() {
    var el = $('[data-match-time]');
    if (!el || !match || !match.started || !match.left) return;
    el.textContent = clockText(Date.now() - match.started);
  }

  function renderMatch() {
    if (!cur) return;
    if (!match) startMatch();
    var root = $('#match-root');
    if (match.tiles.length < 4) {
      root.innerHTML = '<p class="weak-lead">' + esc(className()) + ' needs at least 2 short flashcards for the matching game.</p>';
      return;
    }
    var over = !match.left;
    var best = P().matchBest;
    root.innerHTML =
      '<div class="t-progress"><span data-match-time>' + (over ? clockText(match.time) : match.started ? clockText(Date.now() - match.started) : '0:00') + '</span>' +
      '<span>' + match.misses + (match.misses === 1 ? ' miss' : ' misses') + (best ? ', best ' + clockText(best) : '') + '</span></div>' +
      '<div class="match-grid">' + match.tiles.map(function (t, i) {
        var cls = 'match-tile ' + t.side;
        if (match.done[t.pair]) cls += ' is-done';
        else if (match.wrong.indexOf(i) > -1) cls += ' is-wrong';
        else if (match.picked === i) cls += ' is-picked';
        return '<button type="button" class="' + cls + '" data-tile="' + i + '"' + (match.done[t.pair] ? ' disabled' : '') +
          ' aria-pressed="' + (match.picked === i) + '">' + esc(t.text) + '</button>';
      }).join('') + '</div>' +
      (over
        ? '<p class="t-why" aria-live="polite"><strong>All matched in ' + clockText(match.time) + '</strong>' +
          (match.misses ? match.misses + (match.misses === 1 ? ' miss' : ' misses') + ' along the way.' : 'No misses.') +
          (match.time === best ? ' That is your best time.' : '') + '</p>' +
          '<div class="test-actions"><button type="button" class="btn solid" data-match-new>Play again</button></div>'
        : '<p class="note" style="margin-top:12px">Tap a term, then its meaning. The clock starts on your first tap.</p>' +
          '<div class="test-actions"><button type="button" class="btn ghost" data-match-new>New cards</button></div>');
  }

  function pickTile(i) {
    var t = match.tiles[i];
    if (!match.left || match.done[t.pair]) return;
    if (!match.started) match.started = Date.now();
    match.wrong = [];
    var first = match.picked === null ? null : match.tiles[match.picked];
    if (!first || first.side === t.side) {
      match.picked = match.picked === i ? null : i;
    } else if (first.pair === t.pair) {
      match.done[t.pair] = true;
      match.picked = null;
      match.left--;
      bumpGoal();
      if (!match.left) {
        match.time = Date.now() - match.started;
        if (!P().matchBest || match.time < P().matchBest) P().matchBest = match.time;
      }
      save();
    } else {
      match.misses++;
      match.wrong = [match.picked, i];
      match.picked = null;
      var game = match;
      setTimeout(function () {
        if (match !== game || !game.wrong.length) return;
        game.wrong = [];
        renderMatch();
      }, 700);
    }
    renderMatch();
    var again = $('[data-tile="' + i + '"]');
    if (again && !again.disabled) again.focus({ preventScroll: true });
  }

  function buildMatch() {
    $('#match-root').addEventListener('click', function (e) {
      var tile = e.target.closest('[data-tile]');
      if (tile) pickTile(Number(tile.dataset.tile));
      if (e.target.closest('[data-match-new]')) {
        startMatch();
        renderMatch();
      }
    });
  }

  /* ---------- Supabase: shared notebooks ---------- */

  var DB = window.FinalsDB;

  // NotebookLM links look like https://notebooklm.google.com/notebook/<id>
  function isNotebookLink(value) {
    try {
      var url = new URL(String(value).trim());
      return url.protocol === 'https:' && url.hostname === 'notebooklm.google.com' && url.pathname.length > 1;
    } catch (e) {
      return false;
    }
  }

  function safeUrl(u) {
    try { return new URL(u).protocol === 'https:' ? u : ''; } catch (e) { return ''; }
  }

  // Approved notebooks per class, kept for this visit so going back and forth is quick.
  var notebookCache = {};

  function notebookList(list) {
    return '<ul class="nb-list">' + list.map(function (n) {
      var url = safeUrl(n.url);
      return '<li>' + (url
        ? '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(n.title || 'NotebookLM notebook') + '<span>Opens in NotebookLM</span></a>'
        : esc(n.title || 'NotebookLM notebook')) + '</li>';
    }).join('') + '</ul>';
  }

  function paintNotebooks(classId, list, note) {
    if (classId !== cur) return;
    $('#notebooks').innerHTML =
      '<h2 id="nb-title">Student notebooks</h2>' +
      '<p class="note">NotebookLM notebooks other students made from their own notes. They open in a new tab.</p>' +
      (list && list.length ? notebookList(list) : '<p>No notebooks yet. Be the first to share one!</p>') +
      (note ? '<p class="note">' + esc(note) + '</p>' : '') +
      '<a class="btn solid" href="#share">Share a notebook</a>';
  }

  function renderNotebooks() {
    var id = cur;
    paintNotebooks(id, notebookCache[id] || []);
    if (!DB.ready()) { paintNotebooks(id, [], 'Shared notebooks need an internet connection.'); return; }
    DB.approvedNotebooks(id).then(function (res) {
      if (res.error) { paintNotebooks(id, notebookCache[id] || [], 'Shared notebooks could not load right now. ' + res.error); return; }
      notebookCache[id] = res.data || [];
      paintNotebooks(id, notebookCache[id]);
    });
  }

  var share = { cat: '', busy: false, msg: '', msgKind: '' };

  function statusWord(s) {
    return s === 'approved' ? 'Approved' : s === 'rejected' ? 'Not approved' : 'Waiting for approval';
  }

  function renderShare() {
    var root = $('#share-root');
    if (!DB.ready()) {
      root.innerHTML = '<div class="nb-box"><h2>Sharing needs an internet connection</h2><p class="note">' + esc(DB.offlineMessage) + '</p></div>';
      return;
    }
    if (!DB.user()) {
      root.innerHTML = '<div class="nb-box"><h2>Sign in to share</h2><p>Sign in with your school email to share a notebook.</p>' +
        '<a class="btn solid" href="#account">Sign in</a></div>';
      return;
    }
    if (!share.cat && cur) share.cat = subjectOf(cur).category;
    var keepClass = $('#share-class') ? $('#share-class').value : (cur || '');
    var keepTitle = $('#share-title') ? $('#share-title').value : '';
    var keepUrl = $('#share-url') ? $('#share-url').value : '';
    var list = SUBJECTS.filter(function (s) { return s.category === share.cat; });
    root.innerHTML =
      '<h2 class="set-group">Notebook</h2>' +
      '<form class="share-form" id="share-form" novalidate>' +
      '<div class="set-row"><span class="set-label" id="share-cat-label">Core or Encore</span>' +
        '<div class="seg" id="share-cat" role="group" aria-labelledby="share-cat-label">' +
        ['core', 'encore'].map(function (c) {
          var on = c === share.cat;
          return '<button type="button" data-cat="' + c + '" class="' + (on ? 'is-on' : '') + '" aria-pressed="' + on + '">' + (c === 'core' ? 'Core' : 'Encore') + '</button>';
        }).join('') + '</div><p class="field-error" id="share-cat-error" hidden></p></div>' +
      '<div class="set-row"><label class="set-label" for="share-class">Class</label>' +
        '<select class="text-input" id="share-class" aria-describedby="share-class-error"' + (share.cat ? '' : ' disabled') + '>' +
        (share.cat
          ? '<option value="">Pick a class</option>' + list.map(function (s) { return '<option value="' + s.id + '"' + (s.id === keepClass ? ' selected' : '') + '>' + esc(s.name) + '</option>'; }).join('')
          : '<option value="">Pick Core or Encore first</option>') +
        '</select><p class="field-error" id="share-class-error" hidden></p></div>' +
      '<div class="set-row"><label class="set-label" for="share-title">What does it cover?</label><p class="note">Optional. For example: Unit 2 review.</p>' +
        '<input class="text-input" id="share-title" type="text" maxlength="80" autocomplete="off" value="' + esc(keepTitle) + '"></div>' +
      '<div class="set-row"><label class="set-label" for="share-url">NotebookLM link</label><p class="note">It starts with https://notebooklm.google.com/</p>' +
        '<input class="text-input" id="share-url" type="url" inputmode="url" autocomplete="off" placeholder="Paste the share link" aria-describedby="share-url-error" value="' + esc(keepUrl) + '">' +
        '<p class="field-error" id="share-url-error" hidden></p></div>' +
      '<div class="set-row"><label class="check-row"><input type="checkbox" id="share-ok" aria-describedby="share-ok-error"><span>This notebook is made from my own notes. It has no tests, answer keys, names or personal info.</span></label>' +
        '<p class="field-error" id="share-ok-error" hidden></p></div>' +
      '<div class="test-actions"><button type="submit" class="btn solid"' + (share.busy ? ' disabled' : '') + '>' + (share.busy ? 'Sending...' : 'Send notebook') + '</button></div>' +
      '<div class="form-result" id="share-result" role="status" aria-live="polite">' + (share.msg ? share.msg : '') + '</div>' +
      '</form>' +
      '<h2 class="set-group">Your notebooks</h2><div id="share-mine"><p class="note">Loading...</p></div>';
    DB.myNotebooks().then(function (res) {
      var box = $('#share-mine');
      if (!box) return;
      if (res.error) { box.innerHTML = '<p class="note">Your notebooks could not load right now. ' + esc(res.error) + '</p>'; return; }
      var mine = res.data || [];
      box.innerHTML = mine.length
        ? '<ul class="saved-list">' + mine.map(function (n) {
            var s = subjectOf(n.class_id);
            return '<li><span class="saved-q">' + esc(n.title || 'NotebookLM notebook') + '</span>' +
              '<div class="ev-actions"><span class="note">' + esc((s ? s.name : n.class_id) + '. ' + statusWord(n.status)) + '</span></div></li>';
          }).join('') + '</ul>'
        : '<p class="note">You haven\'t shared any notebooks yet.</p>';
    });
  }

  function buildShare() {
    var root = $('#share-root');
    function setError(id, msg) {
      var el = $('#' + id + '-error');
      var input = $('#' + id);
      el.textContent = msg;
      el.hidden = !msg;
      if (msg) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
      return msg ? input : null;
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cat]');
      if (!b) return;
      share.cat = b.dataset.cat;
      share.msg = '';
      renderShare();
    });
    root.addEventListener('submit', function (e) {
      e.preventDefault();
      if (share.busy) return;
      var url = $('#share-url').value.trim();
      var classId = $('#share-class').value;
      var bad = [
        setError('share-cat', share.cat ? '' : 'Pick Core or Encore.'),
        setError('share-class', classId ? '' : 'Pick the class.'),
        setError('share-url', !url ? 'Paste the share link from NotebookLM.' : isNotebookLink(url) ? '' : 'This is not a NotebookLM link. It has to start with https://notebooklm.google.com/'),
        setError('share-ok', $('#share-ok').checked ? '' : 'Check this box to confirm the notebook is your own notes.')
      ].filter(Boolean);
      if (bad.length) { bad[0].focus(); return; }
      var title = $('#share-title').value.trim() || subjectOf(classId).name + ' notebook';
      share.busy = true;
      share.msg = '';
      renderShare();
      DB.submitNotebook(classId, title, url).then(function (res) {
        share.busy = false;
        if (res.error) {
          share.msg = '<b>Your notebook was not sent.</b> ' + esc(res.error);
        } else {
          share.msg = '<b>Notebook sent.</b> It shows up under Units for that class once the admin approves it.';
          $('#share-url').value = '';
          $('#share-title').value = '';
        }
        renderShare();
      });
    });
  }

  /* ---------- Supabase: feedback ---------- */

  var feedback = { kind: '', busy: false };

  function renderFeedback() {
    $$('#fb-kind button').forEach(function (b) {
      var on = b.dataset.kind === feedback.kind;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    var sel = $('#fb-class');
    var keep = sel.value || cur || '';
    sel.innerHTML = '<option value="">Not about one class</option>' + ['core', 'encore'].map(function (cat) {
      return '<optgroup label="' + (cat === 'core' ? 'Core' : 'Encore') + '">' + SUBJECTS.filter(function (s) { return s.category === cat; }).map(function (s) {
        return '<option value="' + s.id + '"' + (s.id === keep ? ' selected' : '') + '>' + esc(s.name) + '</option>';
      }).join('') + '</optgroup>';
    }).join('');
  }

  function buildFeedbackForm() {
    var form = $('#feedback-form');
    $('#fb-kind').addEventListener('click', function (e) {
      var b = e.target.closest('[data-kind]');
      if (!b) return;
      feedback.kind = b.dataset.kind;
      $('#fb-kind-error').hidden = true;
      renderFeedback();
    });
    // "Think this answer is wrong?" in a test fills in the form.
    document.addEventListener('click', function (e) {
      var w = e.target.closest('[data-wrong]');
      if (!w) return;
      var q = C.questions[Number(w.dataset.wrong)];
      feedback.kind = 'wrong-answer';
      $('#fb-class').value = cur;
      $('#fb-message').value = q ? 'Question: ' + q.q + '\nAnswer the site gives: ' + q.c[q.a] + '\n\nWhy I think it is wrong: ' : '';
      $('#fb-result').innerHTML = '';
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (feedback.busy) return;
      var message = $('#fb-message').value.trim();
      var result = $('#fb-result');
      $('#fb-kind-error').hidden = !!feedback.kind;
      $('#fb-kind-error').textContent = feedback.kind ? '' : 'Pick what it is about.';
      $('#fb-message-error').hidden = !!message;
      $('#fb-message-error').textContent = message ? '' : 'Write a short message.';
      if (!feedback.kind) { $('#fb-kind button').focus(); return; }
      if (!message) { $('#fb-message').focus(); return; }
      if (!DB.ready()) { result.innerHTML = '<b>Your feedback was not sent.</b> ' + esc(DB.offlineMessage); return; }
      feedback.busy = true;
      DB.sendFeedback(feedback.kind, $('#fb-class').value, message.slice(0, 1000)).then(function (res) {
        feedback.busy = false;
        if (res.error) { result.innerHTML = '<b>Your feedback was not sent.</b> ' + esc(res.error); return; }
        result.innerHTML = '<b>Feedback sent.</b> Thanks for helping fix the site.';
        $('#fb-message').value = '';
        feedback.kind = '';
        renderFeedback();
      });
    });
  }

  /* ---------- Supabase: accounts ---------- */

  // mode: in, up, forgot, sent (check your email after sign-up), reset-sent, reset (set a new password)
  var account = { mode: 'in', busy: false, msg: '', email: '', isAdmin: false, name: '' };

  function field(id, label, type, extra) {
    return '<div class="set-row"><label class="set-label" for="' + id + '">' + label + '</label>' + (extra || '') +
      '<input class="text-input" id="' + id + '" type="' + type + '" autocomplete="' + (type === 'password' ? (account.mode === 'in' ? 'current-password' : 'new-password') : type === 'email' ? 'email' : 'off') + '"' +
      (type === 'email' ? ' value="' + esc(account.email) + '" autocapitalize="off" spellcheck="false"' : '') + (id === 'acc-name' ? ' maxlength="40"' : '') + '></div>';
  }

  function renderAccount() {
    var root = $('#account-root');
    var title = $('#account-title');
    var user = DB.user();
    var msg = account.msg ? '<div class="form-result" role="status" aria-live="polite">' + account.msg + '</div>' : '<div class="form-result" role="status" aria-live="polite"></div>';
    var schoolNote = '<p class="note" style="margin-top:14px">Only school emails ending in @' + esc((window.FINALS_SUPABASE || {}).emailDomain || 'k12.ipsd.org') + ' can make an account. Signing in is optional: you can study without it. With it, your progress follows you to other devices.</p>';
    if (!DB.ready()) {
      title.textContent = 'Sign in';
      root.innerHTML = '<p class="weak-lead">' + esc(DB.offlineMessage) + '</p>';
      return;
    }
    if (account.mode === 'reset' && user) {
      title.textContent = 'New password';
      root.innerHTML = '<form class="share-form" data-acc="reset" novalidate>' + field('acc-pass', 'New password', 'password', '<p class="note">At least 8 characters.</p>') +
        '<div class="test-actions"><button type="submit" class="btn solid">Save new password</button></div>' + msg + '</form>';
      return;
    }
    if (user) {
      title.textContent = 'Account';
      root.innerHTML =
        '<h2 class="set-group">You</h2>' +
        '<div class="set-row"><span class="set-label">Signed in as</span><p>' + esc(user.email || '') + '</p></div>' +
        '<form class="share-form set-row" data-acc="name" novalidate><label class="set-label" for="acc-name">Display name</label><p class="note">Optional.</p>' +
          '<input class="text-input" id="acc-name" type="text" maxlength="40" autocomplete="off" value="' + esc(account.name) + '">' +
          '<div class="test-actions"><button type="submit" class="btn">Save name</button></div></form>' +
        '<h2 class="set-group">Progress</h2>' +
        '<div class="set-row"><span class="set-label">Sync</span><p class="note" data-sync-status>' + esc(syncStatus()) + '</p>' +
          '<a class="btn ghost" href="#settings">Delete my synced data in Settings</a></div>' +
        (account.isAdmin ? '<div class="set-row"><span class="set-label">Admin</span><a class="btn" href="#admin">Open the admin page</a></div>' : '') +
        '<div class="test-actions"><button type="button" class="btn solid" data-acc-out>Sign out</button></div>' + msg;
      return;
    }
    if (account.mode === 'sent' || account.mode === 'reset-sent') {
      title.textContent = 'Check your school email';
      root.innerHTML = '<p class="weak-lead">' + (account.mode === 'sent'
        ? 'We sent a link to <b>' + esc(account.email) + '</b>. Open it to finish making your account, then sign in here.'
        : 'If there is an account for <b>' + esc(account.email) + '</b>, we sent it a link to set a new password.') + '</p>' +
        '<p class="note">It can take a few minutes. Check your spam folder too.</p>' +
        '<div class="test-actions"><button type="button" class="btn solid" data-acc-mode="in">Back to sign in</button></div>';
      return;
    }
    var tabs = '<div class="seg" role="group" aria-label="Sign in or make an account" style="margin-top:20px">' +
      [['in', 'Sign in'], ['up', 'Make an account']].map(function (m) {
        var on = account.mode === m[0];
        return '<button type="button" data-acc-mode="' + m[0] + '" class="' + (on ? 'is-on' : '') + '" aria-pressed="' + on + '">' + m[1] + '</button>';
      }).join('') + '</div>';
    var busy = account.busy ? ' disabled' : '';
    if (account.mode === 'forgot') {
      title.textContent = 'Forgot password';
      root.innerHTML = '<p class="note" style="margin-top:14px">We will email you a link to set a new password.</p>' +
        '<form class="share-form" data-acc="forgot" novalidate>' + field('acc-email', 'School email', 'email') +
        '<div class="test-actions"><button type="submit" class="btn solid"' + busy + '>Send link</button><button type="button" class="btn ghost" data-acc-mode="in">Back to sign in</button></div>' + msg + '</form>';
      return;
    }
    if (account.mode === 'up') {
      title.textContent = 'Make an account';
      root.innerHTML = schoolNote + tabs +
        '<form class="share-form" data-acc="up" novalidate>' +
        field('acc-name', 'Display name', 'text', '<p class="note">Optional.</p>') +
        field('acc-email', 'School email', 'email') +
        field('acc-pass', 'Password', 'password', '<p class="note">At least 8 characters.</p>') +
        '<div class="test-actions"><button type="submit" class="btn solid"' + busy + '>Make account</button></div>' + msg + '</form>';
      return;
    }
    title.textContent = 'Sign in';
    root.innerHTML = schoolNote + tabs +
      '<form class="share-form" data-acc="in" novalidate>' +
      field('acc-email', 'School email', 'email') +
      field('acc-pass', 'Password', 'password') +
      '<div class="test-actions"><button type="submit" class="btn solid"' + busy + '>Sign in</button><button type="button" class="link-btn" data-acc-mode="forgot">Forgot password?</button></div>' + msg + '</form>';
  }

  function paintAccountLinks() {
    var user = DB.user();
    $$('[data-account-link]').forEach(function (el) { el.textContent = user ? 'Account' : 'Sign in'; });
    $$('[data-account-note]').forEach(function (el) { el.textContent = user ? 'Signed in as ' + (user.email || '') : 'Optional. Saves your progress across devices'; });
    $$('[data-admin]').forEach(function (el) { el.hidden = !account.isAdmin; });
    $('#set-account-note').textContent = user
      ? 'Signed in as ' + (user.email || '') + '. Your progress syncs to your account.'
      : 'Signing in is optional. Without it, progress saves on this device only.';
    $('#set-sync-row').hidden = !user;
    $$('[data-sync-status]').forEach(function (el) { el.textContent = syncStatus(); });
  }

  function buildAccount() {
    var root = $('#account-root');
    root.addEventListener('click', function (e) {
      var m = e.target.closest('[data-acc-mode]');
      if (m) {
        var email = $('#acc-email');
        if (email) account.email = email.value.trim();
        account.mode = m.dataset.accMode;
        account.msg = '';
        renderAccount();
        var first = $('input', root);
        if (first) first.focus();
      }
      if (e.target.closest('[data-acc-out]')) {
        DB.signOut().then(function (res) {
          account.msg = res.error ? '<b>Could not sign out.</b> ' + esc(res.error) : '';
          if (!res.error) toast('Signed out');
          renderAccount();
        });
      }
    });
    root.addEventListener('submit', function (e) {
      e.preventDefault();
      var form = e.target.closest('[data-acc]');
      if (!form || account.busy) return;
      var kind = form.dataset.acc;
      var emailEl = $('#acc-email', form);
      var passEl = $('#acc-pass', form);
      var nameEl = $('#acc-name', form);
      var email = emailEl ? emailEl.value.trim() : '';
      var pass = passEl ? passEl.value : '';
      var name = nameEl ? nameEl.value.trim().slice(0, 40) : '';
      account.email = email || account.email;
      function show(html) { account.busy = false; account.msg = html; renderAccount(); }
      if (emailEl && !DB.isSchoolEmail(email)) { show('<b>' + esc(DB.schoolMessage) + '</b>'); $('#acc-email').focus(); return; }
      if (passEl && (kind === 'up' || kind === 'reset') && pass.length < 8) { show('<b>Use a password with at least 8 characters.</b>'); return; }
      if (passEl && kind === 'in' && !pass) { show('<b>Type your password.</b>'); return; }
      account.busy = true;
      if (kind === 'in') {
        DB.signIn(email, pass).then(function (res) {
          if (res.error) return show('<b>Could not sign in.</b> ' + esc(res.error));
          show('');
        });
      } else if (kind === 'up') {
        DB.signUp(email, pass, name).then(function (res) {
          if (res.error) return show('<b>Could not make the account.</b> ' + esc(res.error));
          account.mode = 'sent';
          show('');
        });
      } else if (kind === 'forgot') {
        DB.sendReset(email).then(function (res) {
          if (res.error) return show('<b>Could not send the link.</b> ' + esc(res.error));
          account.mode = 'reset-sent';
          show('');
        });
      } else if (kind === 'reset') {
        DB.setPassword(pass).then(function (res) {
          if (res.error) return show('<b>Could not save the password.</b> ' + esc(res.error));
          account.mode = 'in';
          toast('Password saved');
          show('');
        });
      } else if (kind === 'name') {
        DB.saveProfile(name).then(function (res) {
          if (res.error) return show('<b>Could not save your name.</b> ' + esc(res.error));
          account.name = name;
          toast('Name saved');
          show('');
        });
      }
    });

    DB.onChange(function (event, user) {
      if (event === 'PASSWORD_RECOVERY') {
        account.mode = 'reset';
        location.hash = 'account';
      }
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED' || event === 'PASSWORD_RECOVERY') afterAuthChange(event, user);
    });
  }

  // Runs on sign-in, sign-out and on load when a session already exists.
  function afterAuthChange(event, user) {
    if (!user) {
      account.isAdmin = false;
      account.name = '';
      if (account.mode === 'reset') account.mode = 'in';
      sync.on = false;
      sync.dirty = {};
      sync.state = '';
      paintAccountLinks();
      refreshAuthViews();
      return;
    }
    var first = !sync.on;
    sync.on = true;
    paintAccountLinks();
    refreshAuthViews();
    DB.isAdmin().then(function (res) {
      account.isAdmin = res.data === true;
      paintAccountLinks();
      refreshAuthViews();
    });
    DB.getProfile().then(function (res) {
      var meta = user.user_metadata || {};
      account.name = (res.data && res.data.display_name) || meta.display_name || '';
      // A name given at sign-up is saved to the profile the first time they sign in.
      if (!res.error && !res.data && meta.display_name) DB.saveProfile(meta.display_name);
      if ($('#view-account').classList.contains('is-active') && !$('#acc-name:focus')) renderAccount();
    });
    if (first) pullProgress();
  }

  function refreshAuthViews() {
    var active = $('.view.is-active');
    if (!active) return;
    if (active.id === 'view-account') renderAccount();
    if (active.id === 'view-share') renderShare();
    if (active.id === 'view-admin') renderAdmin();
  }

  /* ---------- Supabase: admin ---------- */

  var admin = { list: null, msg: '' };

  function renderAdmin() {
    var root = $('#admin-root');
    if (!account.isAdmin) {
      root.innerHTML = '<p class="weak-lead">This page is only for the site admin.</p><div class="test-actions"><a class="btn" href="#home">Go to Home</a></div>';
      return;
    }
    root.innerHTML = '<h2 class="t-section">Notebooks waiting for approval</h2>' +
      (admin.msg ? '<div class="form-result" role="status">' + admin.msg + '</div>' : '') + '<div id="admin-list"><p class="note">Loading...</p></div>';
    DB.pendingNotebooks().then(function (res) {
      var box = $('#admin-list');
      if (!box) return;
      if (res.error) { box.innerHTML = '<p class="note">The list could not load. ' + esc(res.error) + '</p>'; return; }
      var list = res.data || [];
      box.innerHTML = list.length
        ? '<ul class="saved-list">' + list.map(function (n) {
            var s = subjectOf(n.class_id);
            var url = safeUrl(n.url);
            var when = n.created_at ? new Date(n.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '';
            return '<li><span class="saved-q">' + esc(n.title || 'NotebookLM notebook') + '</span>' +
              '<p class="note" style="margin:4px 0 0">' + esc((s ? s.name : n.class_id) + (when ? '. Sent ' + when : '')) + '</p>' +
              (url ? '<p style="margin:4px 0 0;overflow-wrap:anywhere"><a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(url) + '</a></p>' : '') +
              '<div class="test-actions"><button type="button" class="btn solid" data-adm="approved" data-id="' + esc(n.id) + '">Approve</button>' +
              '<button type="button" class="btn" data-adm="rejected" data-id="' + esc(n.id) + '">Reject</button>' +
              '<button type="button" class="btn ghost" data-adm="delete" data-id="' + esc(n.id) + '">Delete</button></div></li>';
          }).join('') + '</ul>'
        : '<p class="note">Nothing waiting right now.</p>';
    });
  }

  function buildAdmin() {
    $('#admin-root').addEventListener('click', function (e) {
      var b = e.target.closest('[data-adm]');
      if (!b || !account.isAdmin) return;
      var act = b.dataset.adm;
      if (act === 'delete' && !window.confirm('Delete this notebook for good?')) return;
      b.disabled = true;
      var p = act === 'delete' ? DB.deleteNotebook(b.dataset.id) : DB.setNotebookStatus(b.dataset.id, act);
      p.then(function (res) {
        admin.msg = res.error ? '<b>That did not work.</b> ' + esc(res.error) : '';
        if (!res.error) {
          toast(act === 'approved' ? 'Approved' : act === 'rejected' ? 'Rejected' : 'Deleted');
          notebookCache = {};
        }
        renderAdmin();
      });
    });
  }

  /* ---------- Supabase: progress sync ---------- */

  // localStorage is always the main copy. When signed in, each class's progress is also
  // saved as one row in finals_progress. When the same class changed in two places,
  // the newer change wins (last write wins).

  function syncStatus() {
    if (!DB.user()) return 'Not signed in. Progress saves on this device only.';
    if (sync.state === 'error') return 'Your latest progress is saved on this device but not synced yet. It will try again.';
    if (sync.state === 'busy') return 'Syncing...';
    if (sync.last) return 'Synced ' + sync.last.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) + '.';
    return 'Your progress syncs to your account.';
  }

  function paintSync() {
    $$('[data-sync-status]').forEach(function (el) { el.textContent = syncStatus(); });
  }

  function pushProgress() {
    clearTimeout(sync.timer);
    sync.timer = null;
    if (!sync.on || !DB.user()) return;
    var ids = Object.keys(sync.dirty);
    if (!ids.length) return;
    sync.state = 'busy';
    paintSync();
    Promise.all(ids.map(function (id) {
      delete sync.dirty[id];
      var when = new Date((saved.changedAt || {})[id] || Date.now()).toISOString();
      return DB.saveProgress(id, saved.classes[id] || {}, when).then(function (res) {
        if (res.error) sync.dirty[id] = true;
        return !res.error;
      });
    })).then(function (results) {
      var okAll = results.every(Boolean);
      sync.state = okAll ? '' : 'error';
      if (okAll) sync.last = new Date();
      paintSync();
    });
  }

  function queuePush() {
    if (!sync.on || !Object.keys(sync.dirty).length) return;
    clearTimeout(sync.timer);
    sync.timer = setTimeout(pushProgress, 1500);
  }

  // On sign-in: newer rows from the account replace this device's copy, and anything
  // newer on this device gets sent up.
  function pullProgress() {
    sync.state = 'busy';
    paintSync();
    DB.loadProgress().then(function (res) {
      if (res.error) {
        sync.state = 'error';
        paintSync();
        return;
      }
      saved.classes = saved.classes || {};
      saved.changedAt = saved.changedAt || {};
      var remote = {};
      (res.data || []).forEach(function (row) { if (row.key === 'progress' && subjectOf(row.class_id)) remote[row.class_id] = row; });
      var changedCurrent = false;
      Object.keys(remote).forEach(function (id) {
        var row = remote[id];
        var remoteTime = Date.parse(row.updated_at) || 0;
        var localTime = saved.changedAt[id] || 0;
        if (remoteTime > localTime && row.value && typeof row.value === 'object') {
          saved.classes[id] = row.value;
          saved.changedAt[id] = remoteTime;
          snaps[id] = JSON.stringify(row.value);
          if (id === cur) changedCurrent = true;
        } else if (localTime > remoteTime) {
          sync.dirty[id] = true;
        }
      });
      Object.keys(saved.classes).forEach(function (id) {
        if (!remote[id] && subjectOf(id) && JSON.stringify(saved.classes[id]) !== '{}') sync.dirty[id] = true;
      });
      writeLocal();
      sync.state = '';
      sync.last = new Date();
      if (changedCurrent) {
        var id = cur;
        cur = null;
        setClass(id);
        route(false);
        toast('Progress loaded from your account');
      }
      paintSync();
      pushProgress();
    });
  }

  function buildSyncSettings() {
    $('#delete-synced').addEventListener('click', function () {
      if (!DB.user()) return;
      if (!window.confirm('Delete your synced progress from your account? Progress on this device stays.')) return;
      var msg = $('#delete-synced-msg');
      DB.deleteMyProgress().then(function (res) {
        if (res.error) { msg.textContent = 'Could not delete it. ' + res.error; return; }
        // Stop sending until something changes again.
        sync.dirty = {};
        msg.textContent = 'Your synced data was deleted. Progress on this device stays. New progress syncs again while you are signed in.';
      });
    });
    window.addEventListener('online', pushProgress);
  }

  /* ---------- Supabase: visit count ---------- */

  // Once per browser session. Sends nothing about the person.
  function countVisit() {
    try {
      if (sessionStorage.getItem('finals-visit')) return;
      sessionStorage.setItem('finals-visit', '1');
    } catch (e) { return; }
    if (DB.ready()) DB.countVisit();
  }

  /* ---------- Clear progress ---------- */

  // Bookmarks stay, like in the PE Midterm app.
  function clearClass(id) {
    var p = progressOf(id);
    saved.classes[id] = { savedQs: p.savedQs, marks: p.marks, flashScope: p.flashScope };
  }

  function afterClear() {
    test.run = null;
    test.setup = false;
    match = null;
    drill = { q: null, answered: false, ok: false, typed: '' };
    if (cur) setDeck(false);
    renderHome();
  }

  /* ---------- Start ---------- */

  // Loads every class file listed in data/subjects.js, then starts the app.
  function loadClasses(done) {
    var left = SUBJECTS.length;
    if (!left) { done(); return; }
    SUBJECTS.forEach(function (s) {
      var tag = document.createElement('script');
      tag.src = './data/classes/' + encodeURIComponent(s.id) + '.js';
      tag.onload = tag.onerror = function () { if (--left === 0) done(); };
      document.head.appendChild(tag);
    });
  }

  function start() {
    loadSettings();
    buildSettings();
    applySettings();
    $$('[data-site-title]').forEach(function (el) { el.textContent = CFG.siteTitle || 'Finals'; });
    buildWelcome();
    buildShortcuts();
    buildUnitPage();
    buildFlashcards();
    buildTest();
    buildSaved();
    buildDrill();
    buildMatch();
    buildShare();
    buildFeedbackForm();
    buildAccount();
    buildAdmin();
    buildSyncSettings();
    startClock();
    if (saved.current && subjectOf(saved.current)) setClass(saved.current);

    $('#clear-all').addEventListener('click', function () {
      if (!window.confirm('Clear your scores, flashcard marks and misses for ' + className() + ' on this device?')) return;
      clearClass(cur);
      save();
      afterClear();
      toast('Progress cleared for ' + className());
    });

    buildSearch();

    if (!location.hash && settings.startPage !== 'home') {
      var opening = settings.startPage === 'last' ? saved.lastPage : settings.startPage;
      if (opening && opening !== '404') history.replaceState(null, '', '#' + opening);
    }
    window.addEventListener('hashchange', function () { route(false); });
    route(true);
    paintAccountLinks();
    countVisit();
    // A session saved from last time signs the student back in quietly.
    DB.whenReady().then(function () { if (DB.user()) afterAuthChange('INITIAL', DB.user()); });
  }

  loadClasses(start);
})();
