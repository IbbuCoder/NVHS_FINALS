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

  function save() {
    writeLocal();
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
    theme: 'dark', accent: 'red', color: '#c4122f', font: 'barlow', size: 'normal', density: 'comfy', motion: 'on',
    simple: 'off', cardFirst: 'term', name: '', teacher: '', gameLength: '30', startPage: 'home', board: 'show', goal: 'off'
  };
  // The only settings someone can change. Everything else stays on its default.
  var CHOICES = ['theme', 'size', 'simple'];
  var settings = {};

  function loadSettings() {
    var mine = saved.settings || {};
    Object.keys(DEFAULTS).forEach(function (k) {
      settings[k] = CHOICES.indexOf(k) > -1 && mine[k] !== undefined ? mine[k] : DEFAULTS[k];
    });
    if (settings.theme === 'auto') settings.theme = resolvedTheme();
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
    $('#dumb-btn').addEventListener('click', function () {
      changeSetting('simple', settings.simple === 'on' ? 'off' : 'on');
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
          var text = sectionText(sec);
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
    [['Settings', 'theme dark mode light text size simple words backup clear progress', 'settings'],
      ['Games', 'matching game math practice formulas drills', 'games'],
      ['Quiz', 'test practice timed mistakes retry', 'test'],
      ['Bookmarks', 'saved bookmarks', 'saved'],
      ['Printable review sheet', 'print review sheet cheat sheet pdf', 'sheet'],
      ['Share a notebook', 'notebooklm share link', 'share'],
      ['Change class', 'core encore switch class', 'pick']].forEach(function (p) {
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
  var CLASS_PAGES = ['units', 'flashcards', 'test', 'saved', 'weak', 'sheet', 'drills', 'match', 'games'];

  function unitById(id) {
    return C.units.filter(function (u) { return u.id === id; })[0] || null;
  }

  function route(first) {
    var id = location.hash.slice(1) || 'home';
    // #class/science picks a class, then shows its Home.
    var pick = /^class\/([a-z0-9-]+)$/.exec(id);
    if (pick) {
      if (setClass(pick[1])) { openedClass(pick[1]); history.replaceState(null, '', '#home'); id = 'home'; }
      else id = '404';
    }
    var unit = cur ? unitById(id) : null;
    var needsClass = !cur && (CLASS_PAGES.indexOf(id) > -1 || /^u\d+$/.test(id));
    if (needsClass) {
      pickReturn = id;
      history.replaceState(null, '', '#pick');
      id = 'pick';
    }
    var pickGroup = /^pick(\/(core|encore))?$/.exec(id);
    var viewId = unit ? 'unit' : (id === 'core' || id === 'encore') ? 'classes' : pickGroup ? 'pick' : id;
    var view = document.getElementById('view-' + viewId);
    if (!view || (viewId === 'unit' && !unit)) { id = '404'; viewId = '404'; view = $('#view-404'); }
    $$('.view').forEach(function (v) { v.classList.toggle('is-active', v === view); });
    // Which bottom tab lights up. Every page belongs to one of the 5.
    var tabId = unit ? 'units' : id;
    if (['settings', 'more', 'sheet', 'classes', 'core', 'encore', 'share', 'feedback', 'saved', 'games', 'drills', 'match'].indexOf(id) > -1) tabId = 'more';
    if (id === 'weak') tabId = 'test';
    // The top menu has Games too, so game pages light up Games there.
    var navId = ['games', 'drills', 'match'].indexOf(id) > -1 ? 'games' : tabId;
    $$('.nav a').forEach(function (a) {
      if (a.getAttribute('href') === '#' + navId) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    paintClassChip(pickGroup);
    paintClassWarning(pickGroup || id === '404');
    if (id !== 'test') test.mockIntro = false;
    $$('.tabbar a').forEach(function (a) {
      if (a.dataset.tab === tabId) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    if (id !== '404' && !pickGroup) { saved.lastPage = id; save(); }
    var title = unit ? unit.num + ' ' + unit.title : view.dataset.title;
    document.title = title + (cur && viewId !== 'classes' && viewId !== 'home' ? ' | ' + className() : '') + ' | ' + (CFG.siteTitle || 'Finals');
    closeMenu();
    if (id === 'home') renderHome();
    if (viewId === 'classes') renderClasses(id);
    if (pickGroup) renderPick(pickGroup[2] || '');
    if (id === 'units') renderUnits();
    if (unit) renderUnit(unit);
    if (id === 'flashcards') renderCard();
    if (id === 'test') renderTest();
    if (id === 'saved') renderSaved();
    if (id === 'weak') renderWeak();
    if (id === 'sheet') renderSheet();
    if (id === 'drills') renderDrill(false);
    if (id === 'match') renderMatch();
    if (id === 'games') renderGames();
    if (id === 'feedback') { if (!$('#fb-name').value) $('#fb-name').value = studentName(); renderFeedback(); }
    if (id === 'share') { if (!$('#sh-name').value) $('#sh-name').value = studentName(); renderShare(); }
    if (id === 'settings') $('#set-student').value = studentName();
    if (id === 'home') paintOnline();
    window.scrollTo(0, 0);
    if (!first) {
      var h = $('h1', view);
      if (h && h.offsetParent) h.focus({ preventScroll: true });
    }
  }

  /* ---------- Not finished notices (turned on and off by hand) ---------- */

  // The popup and strip follow notFinished in js/config.js.
  function buildNotFinished() {
    if (!CFG.notFinished) return;
    var pop = $('#wip-pop');
    $('#wip-strip').hidden = false;
    $('#wip-ok').addEventListener('click', function () { closeDialog(pop); });
    $('#wip-more').addEventListener('click', function () { openDialog(pop); });
    pop.addEventListener('click', function (e) { if (e.target === pop) closeDialog(pop); });
    openDialog(pop);
  }

  // The warning on a class with unfinished: true in data/subjects.js.
  function paintClassWarning(onPicker) {
    var box = $('#wip-class');
    var s = subjectOf(cur);
    var show = !!(s && s.unfinished && !onPicker);
    box.hidden = !show;
    if (show) {
      box.innerHTML = '<div class="wip-class-in"><strong>' + esc(s.name) + ' is not filled in yet.</strong> ' +
        '<span>The notes, flashcards and questions here are samples, not real class content.</span></div>';
    }
  }

  // The class you're studying, always in the top bar. Tap it to change class.
  function paintClassChip(onPicker) {
    var chip = $('#class-chip');
    chip.hidden = !cur || !!onPicker;
    $('#class-chip-name').textContent = className();
    chip.setAttribute('aria-label', 'Studying ' + className() + '. Change class');
  }

  // Games: the matching game, and math practice for classes that have it.
  function renderGames() {
    var best = P().matchBest;
    $('#games-root').innerHTML =
      '<a href="#match"><b>Matching game</b><span>Match ' + MATCH_PAIRS + ' words to their meanings as fast as you can' + (best ? '. Your best: ' + clockText(best) : '') + '</span></a>' +
      (C.drills.length
        ? '<a href="#drills"><b>Math practice</b><span>Practice problems with new numbers every time</span></a>'
        : '') +
      (C.units.some(function (u) { return (u.sections || []).some(function (sec) { return sec.tool; }); })
        ? '<p class="note" style="margin-top:14px">Some lessons have their own games and calculators too. Open a lesson to find them.</p>'
        : '');
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

  /* ---------- What do you want to study? ---------- */

  // Shown every time the site opens. Step 1 is Core or Encore, step 2 is the classes in it.
  // pickReturn is the page to open after picking (a link the site was opened with, or the
  // "Open the site on" setting). Empty means the class's Home.
  var pickReturn = '';

  var GROUPS = {
    core: { name: 'Core', blurb: 'Main classes' },
    encore: { name: 'Encore', blurb: 'Electives' }
  };

  function renderPick(group) {
    var root = $('#pick-root');
    if (!group) {
      root.innerHTML =
        '<h1 class="pick-title" tabindex="-1">What do you want to study?</h1>' +
        '<div class="pick-groups">' + ['core', 'encore'].map(function (g, i) {
          return '<a class="pick-btn' + (i === 0 ? ' solid' : '') + '" href="#pick/' + g + '"><strong>' + GROUPS[g].name + '</strong>' +
            '<span>' + GROUPS[g].blurb + ': ' + esc(classNames(g)) + '</span></a>';
        }).join('') + '</div>' +
        (cur ? '<a class="link-btn pick-skip" href="#home" data-pick-keep>Keep studying ' + esc(className()) + '</a>' : '');
      return;
    }
    var list = SUBJECTS.filter(function (s) { return s.category === group; });
    root.innerHTML =
      '<div class="pick-head"><h1 tabindex="-1">' + GROUPS[group].name + '</h1><a class="btn ghost" href="#pick">Back</a></div>' +
      '<p class="pick-sub">' + GROUPS[group].blurb + '. Pick your class.</p>' +
      '<div class="pick-subjects">' + list.map(function (s) {
        var units = dataOf(s.id).units.length;
        var last = s.id === cur;
        return '<button type="button" class="pick-subject' + (last ? ' is-last' : '') + '" data-pick-class="' + s.id + '">' +
          '<b>' + esc(s.name) + '</b><span>' + (last ? 'Studied last time' : units ? units + (units === 1 ? ' lesson' : ' lessons') : 'No lessons yet') + '</span>' +
          (s.unfinished ? '<em class="wip-tag">Not filled in yet</em>' : '') + '</button>';
      }).join('') + '</div>';
  }

  function buildPick() {
    $('#pick-root').addEventListener('click', function (e) {
      var b = e.target.closest('[data-pick-class]');
      if (b) {
        setClass(b.dataset.pickClass);
        openedClass(b.dataset.pickClass);
        var go = pickReturn || 'home';
        pickReturn = '';
        location.hash = go;
      }
      if (e.target.closest('[data-pick-keep]')) { pickReturn = ''; openedClass(cur); }
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
      { value: last ? pct(last.score, last.total) : 0, attrs: 'href="#test" data-scope="' + u.id + '"', text: 'take its quiz' },
      { value: pct(known, cards.length), attrs: 'href="#flashcards" data-flash="' + u.id + '"', text: 'go through its flashcards' }
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
    var scores = C.units.map(function (u) {
      var parts = unitParts(u);
      return { unit: u, parts: parts, value: average(parts.map(function (p) { return p.value; })) };
    });
    var total = average(scores.map(function (s) { return s.value; }));
    var next;
    if (!scores.length) next = '';
    else if (total === 100) next = '<a class="sb-next" href="#test">Everything is at 100%. Take one more quiz to stay sharp.</a>';
    else {
      var weakest = scores.reduce(function (low, s) { return s.value < low.value ? s : low; });
      var move = weakest.parts.reduce(function (low, p) { return p.value < low.value ? p : low; });
      next = '<a class="sb-next" ' + move.attrs + '>Do this next: ' + weakest.unit.num + ' ' + esc(weakest.unit.short) + ', ' + move.text + '</a>';
    }

    // Just how ready you are and one thing to do next. Each lesson's % is on the Lessons page.
    $('#board').innerHTML =
      '<div class="sb-total"><span class="sb-label">Ready for the final</span><div class="sb-tiles" role="img" aria-label="' + total + ' percent ready">' +
      String(total).split('').map(function (d) { return '<span class="sb-tile">' + d + '</span>'; }).join('') +
      '<span class="sb-tile unit">%</span></div><p class="sb-note">Goes up as you take quizzes and mark flashcards Got it.</p>' + examLine() + '</div>' + next;

    var knownCount = C.flashcards.filter(isKnown).length;
    $('#home-lessons').textContent = C.units.length + (C.units.length === 1 ? ' lesson' : ' lessons');
    $('#home-flash').textContent = knownCount + ' of ' + C.flashcards.length + ' learned';
    $('#home-test').textContent = C.questions.length + ' questions';
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
    $('#units-title').textContent = className() + ' lessons';
    $('#unit-list').innerHTML = C.units.length
      ? C.units.map(function (u) {
          var score = unitScore(u);
          return '<a class="unit-row" href="#' + u.id + '"><span class="sb-num">' + esc(u.num) + '</span><span class="sb-name">' + esc(u.title) + '</span>' +
            '<span class="sb-pct">' + score + '%</span><span class="pct"><i style="width:' + score + '%"></i></span></a>';
        }).join('')
      : '<p class="note" style="margin-top:14px">This class has no lessons yet.</p>';
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
    // html: a section written as HTML (from this site's own data files), used as is.
    // tool: shows the section as a full-width tool panel, like the PE Midterm app.
    var content = sec.html || (
      (sec.body || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
      (sec.list && sec.list.length ? '<ul class="ruled">' + sec.list.map(function (li) { return '<li>' + esc(li) + '</li>'; }).join('') + '</ul>' : '') +
      table);
    return '<div class="' + (sec.tool ? 'tool' : 'block') + (marked ? ' is-marked' : '') + '" id="sec-' + esc(sec.id) + '" data-sec="' + esc(sec.id) + '">' +
      '<h2>' + esc(sec.title) + '<button type="button" class="mark-icon" data-mark="' + esc(sec.id) + '" aria-pressed="' + marked + '" aria-label="' +
        (marked ? 'Remove bookmark from ' : 'Bookmark ') + esc(sec.title) + '"><svg aria-hidden="true"><use href="#i-bookmark"></use></svg></button></h2>' +
      '<div>' + (sec.simple ? '<p class="simple">' + esc(sec.simple) + '</p>' : '') + content + '</div></div>';
  }

  // The words in a section, for search.
  function sectionText(sec) {
    var text = (sec.body || []).concat(sec.list || []).concat(sec.table ? [].concat.apply([], sec.table.rows) : []).join(' ');
    if (sec.html) {
      var div = document.createElement('div');
      div.innerHTML = sec.html.replace(/<\/(p|li|td|th|h3|dd|dt|figcaption|caption)>/g, ' $&');
      text += ' ' + div.textContent;
    }
    return text.replace(/\s+/g, ' ').trim();
  }

  function renderUnit(u) {
    var i = C.units.indexOf(u);
    var next = C.units[i + 1];
    $('#unit-num').textContent = u.num;
    $('#unit-title').textContent = u.title;
    $('#unit-body').innerHTML = (u.sections || []).map(function (sec) { return sectionHtml(u, sec); }).join('') ||
      '<p class="note">This lesson has no notes yet.</p>';
    $('#unit-jump').innerHTML = (u.sections || []).map(function (sec) {
      return '<button type="button" data-jump="' + esc(sec.id) + '">' + esc(sec.title) + '</button>';
    }).join('');
    $('#unit-pager').innerHTML =
      '<a class="quiz-link" href="#test" data-scope="' + u.id + '">Quiz yourself on this lesson</a>' +
      '<button type="button" class="link-btn" data-print>Print this page</button>' +
      (next ? '<a href="#' + next.id + '">Next: ' + esc(next.num + ' ' + next.title) + '</a>' : '<a href="#flashcards">Next: Flashcards</a>');
    // A class with its own tools file (data/classes/<id>-tools.js) sets up its interactive parts here.
    var tools = window.FINALS.tools[cur];
    if (tools) {
      try { tools($('#unit-body'), u, window.FINALS.classes[cur]); } catch (err) { if (window.console) console.error(err); }
    }
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
        m.closest('[data-sec]').classList.toggle('is-marked', on);
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
        '<div class="test-actions"><a class="btn solid" href="#test" data-scope="all">Take a quiz</a></div>';
      return;
    }
    rows.sort(function (a, b) { return a.score - b.score; });
    var weak = rows.filter(function (r) { return r.score < 100 || r.misses.length || r.learning.length; });
    var strong = rows.filter(function (r) { return weak.indexOf(r) === -1; });
    var top = weak[0];
    root.innerHTML =
      '<div class="weak-top">' +
      (top
        ? '<p>Start with <b>' + esc(top.unit.num + ' ' + top.unit.title) + '</b>. It\'s your lowest lesson at ' + top.score + '%.</p>'
        : '<p>Nothing to work on right now. Take a quiz on every lesson to be sure.</p>') +
      (allMisses ? '<button type="button" class="btn solid" data-quick="missed">Retry all ' + allMisses + ' misses</button>' : '') +
      '</div>' +
      weak.map(function (r) {
        var u = r.unit;
        var facts = [
          r.misses.length ? r.misses.length + (r.misses.length === 1 ? ' missed question' : ' missed questions') : 'No missed questions',
          r.learning.length ? r.learning.length + (r.learning.length === 1 ? ' flashcard' : ' flashcards') + ' still learning' : '',
          r.last ? 'Last quiz ' + r.last.score + ' / ' + r.last.total : 'Quiz not taken yet'
        ].filter(Boolean).join('. ');
        return '<div class="weak-unit">' +
          '<div class="weak-head"><span class="sb-num">' + esc(u.num) + '</span><span class="sb-name">' + esc(u.title) + '</span><span class="sb-pct">' + r.score + '%</span></div>' +
          '<span class="pct"><i style="width:' + r.score + '%"></i></span>' +
          '<p class="note">' + facts + '.</p>' +
          '<div class="weak-links">' +
          (r.misses.length ? '<button type="button" data-quick="m' + u.id + '">Fix mistakes</button>' : '<a href="#test" data-scope="' + u.id + '">Take its quiz</a>') +
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
    var scopes = [{ id: 'all', label: 'All lessons' }].concat(C.units.map(function (u) { return { id: u.id, label: u.num + ' ' + u.short }; }));
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
    $('#flash-known').textContent = known + ' of ' + cards.length + ' learned';
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
    var note;
    if (n) {
      note = Math.min(n, STUDY_ROUND) + ' flashcards and questions picked for you. Things you miss come back tomorrow.';
    } else if (plan.next) {
      note = 'Come back ' + waitText(plan.next.when - thisDay()) + ' for more';
    } else {
      note = C.questions.length || C.flashcards.length ? 'You have gone through everything' : 'This class has nothing to study yet';
    }
    $('#home-study-btn').disabled = !n;
    $('#home-study').textContent = n ? 'Quick study' : 'Done for today';
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
        : '<p class="note">Nothing yet. In any lesson, tap the bookmark next to a heading to keep that section here.</p>') +
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
        : '<p class="note">Nothing yet. During a quiz, tap the <b>Bookmark</b> button next to a question to keep it here.</p>') +
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
    if (scope === 'all') return 'Every lesson';
    if (scope === 'missed') return 'Fix my mistakes';
    if (scope === 'daily') return 'Daily 10';
    if (scope === 'game') return 'Game Day';
    if (scope === 'mock') return 'Timed test';
    if (scope === 'study') return 'Quick study';
    if (scope === 'saved') return 'Bookmarked questions';
    if (isMissScope(scope)) { var mu = unitOf(scope.slice(1)); return 'Fix my ' + mu.num + ' ' + mu.short + ' mistakes'; }
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

  // Three ways to quiz yourself: practice (answers right away), a timed test like the
  // real final, and your mistakes.
  function renderSetup(root) {
    var last = P().test || {};
    var scopes = ['all'].concat(C.units.map(function (u) { return u.id; }));
    if (savedIds().length) scopes.push('saved');
    if (test.scope === 'saved' && !savedIds().length) test.scope = 'all';
    var run = test.run;
    var misses = missedIds().length;
    if (!C.questions.length) {
      root.innerHTML = '<p class="weak-lead">' + esc(className()) + ' has no quiz questions yet.</p><div class="test-actions"><a class="btn" href="#pick">Pick another class</a></div>';
      return;
    }
    root.innerHTML =
      (run && !run.finished
        ? '<button type="button" class="resume-bar" data-resume><b>Keep going: ' + esc(scopeName(run.scope)) + '</b><span>Question ' + (run.pos + 1) + ' of ' + run.ids.length +
          (run.endsAt ? ', ' + clockText(run.endsAt - Date.now()) + ' left' : '') + '</span></button>'
        : '') +
      '<div class="quiz-pick">' +
      '<section class="quiz-option">' +
        '<h2><i>1</i>Practice quiz</h2>' +
        '<p class="note">Pick a lesson. You see if you got it right after every question.</p>' +
        '<ul class="scope-list">' + scopes.map(function (s) {
          return '<li><label><input type="radio" name="scope" value="' + s + '"' + (s === test.scope ? ' checked' : '') + '>' +
            '<span class="scope-name">' + esc(scopeName(s)) + '</span>' +
            '<span class="scope-meta">' + (s === 'saved' ? savedIds().length : pool(s).length) + ' questions' + (last[s] ? ', last time ' + last[s].score + '/' + last[s].total : '') + '</span></label></li>';
        }).join('') + '</ul>' +
        '<button type="button" class="btn solid" data-start>Start practice quiz</button>' +
      '</section>' +
      '<section class="quiz-option">' +
        '<h2><i>2</i>Timed test</h2>' +
        '<p class="note">Like the real final: ' + mockCount() + ' questions from every lesson, ' + MOCK_MINUTES + ' minutes on the clock, answers at the end.' +
          (last.mock ? ' Last time: ' + last.mock.score + '/' + last.mock.total + '.' : '') + '</p>' +
        '<button type="button" class="btn" data-mock>Start timed test</button>' +
      '</section>' +
      '<section class="quiz-option">' +
        '<h2><i>3</i>Fix my mistakes</h2>' +
        (misses
          ? '<p class="note">Only the ' + misses + (misses === 1 ? ' question' : ' questions') + ' you got wrong. Get one right and it leaves the list.</p>' +
            '<button type="button" class="btn" data-retry>Fix my mistakes</button>'
          : '<p class="note">No mistakes to fix yet. Questions you get wrong will show up here.</p>') +
      '</section>' +
      '</div>';
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
        (run.endsAt ? 'Leave test (the clock keeps running)' : 'Leave quiz (your place is saved)') + '</button></div>';
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
      '<div class="test-actions"><button type="button" class="link-btn" data-quit>Leave quiz (your place is saved)</button></div>';
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
        : '<div class="test-actions"><button type="button" class="btn solid" data-again>Take it again</button><button type="button" class="btn" data-setup>Back to Quiz</button>' +
          (run.missed.length && run.scope !== 'missed' ? '<button type="button" class="btn ghost" data-retry>Fix my mistakes</button>' : '') + '</div>');
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
      '<h2>Timed test</h2>' +
      '<ul><li>' + mockCount() + ' questions from every lesson, mixed up</li><li>' + MOCK_MINUTES + ' minutes on the clock</li>' +
      '<li>No skipping, just like the real thing</li>' +
      '<li>Answers and your score for each lesson at the end</li><li>The clock keeps running if you leave the page</li></ul>' +
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
    toast('Time is up. Your timed test was handed in.');
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
        else {
          run.missed.push(run.ids[run.pos]);
          // The question's own text is its id (questions have no other id).
          track('miss', cur, String(q.q).slice(0, 200));
        }
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
      root.innerHTML = '<p class="weak-lead">' + esc(className()) + ' has no math practice.</p><div class="test-actions"><a class="btn" href="#games">Back to Games</a></div>';
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

  function safeUrl(u) {
    try { return new URL(u).protocol === 'https:' ? u : ''; } catch (e) { return ''; }
  }

  // Approved notebooks per class, kept for this visit so going back and forth is quick.
  var notebookCache = {};

  // Shown by number, never by who shared it: "Student notebook 1", "Student notebook 2"...
  function notebookList(list) {
    return '<ul class="nb-list">' + list.map(function (n, i) {
      var url = safeUrl(n.url);
      var label = 'Student notebook ' + (i + 1);
      return '<li>' + (url
        ? '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + label + '<span>' + esc(className()) + '. Opens in NotebookLM</span></a>'
        : label) + '</li>';
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
      var name = $('#fb-name').value.trim();
      var result = $('#fb-result');
      $('#fb-name-error').hidden = !!name;
      $('#fb-name-error').textContent = name ? '' : 'Type your name.';
      if (name) $('#fb-name').removeAttribute('aria-invalid'); else $('#fb-name').setAttribute('aria-invalid', 'true');
      $('#fb-kind-error').hidden = !!feedback.kind;
      $('#fb-kind-error').textContent = feedback.kind ? '' : 'Pick what it is about.';
      $('#fb-message-error').hidden = !!message;
      $('#fb-message-error').textContent = message ? '' : 'Write a short message.';
      if (!name) { $('#fb-name').focus(); return; }
      if (!feedback.kind) { $('#fb-kind button').focus(); return; }
      if (!message) { $('#fb-message').focus(); return; }
      if (!DB.ready()) { result.innerHTML = '<b>Your feedback was not sent.</b> ' + esc(DB.offlineMessage); return; }
      feedback.busy = true;
      DB.sendFeedback(feedback.kind, $('#fb-class').value, message.slice(0, 1000), name.slice(0, 60)).then(function (res) {
        feedback.busy = false;
        if (res.error) { result.innerHTML = '<b>Your feedback was not sent.</b> ' + esc(res.error); return; }
        setStudentName(name);
        result.innerHTML = '<b>Feedback sent.</b> Thanks for helping fix the site.';
        $('#fb-message').value = '';
        feedback.kind = '';
        renderFeedback();
      });
    });
  }

  /* ---------- Supabase: share a notebook ---------- */

  // The database only accepts links that start with one of these, up to 500 characters.
  // The usual share link looks like https://notebook.google.com/notebook/<id>?authuser=1
  var NOTEBOOK_PREFIXES = ['https://notebook.google.com/', 'https://notebooklm.google.com/'];

  function linkProblem(url) {
    if (!url) return 'Paste the share link from NotebookLM.';
    if (url.length > 500) return 'That link is too long. Copy the share link again from NotebookLM.';
    var okStart = NOTEBOOK_PREFIXES.some(function (p) { return url.indexOf(p) === 0 && url.length > p.length; });
    return okStart ? '' : 'That isn\'t a NotebookLM share link. It has to start with https://notebook.google.com/';
  }
  var shareForm = { busy: false };

  function renderShare() {
    var sel = $('#sh-class');
    var keep = sel.value || cur || '';
    sel.innerHTML = '<option value="">Pick a class</option>' + SUBJECTS.map(function (s) {
      return '<option value="' + s.id + '"' + (s.id === keep ? ' selected' : '') + '>' + esc(s.name) + '</option>';
    }).join('');
  }

  function buildShareForm() {
    var form = $('#share-form');
    function setError(id, msg) {
      var el = $('#' + id + '-error');
      el.textContent = msg;
      el.hidden = !msg;
      if (msg) $('#' + id).setAttribute('aria-invalid', 'true');
      else $('#' + id).removeAttribute('aria-invalid');
      return msg ? $('#' + id) : null;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (shareForm.busy) return;
      var result = $('#sh-result');
      var classId = $('#sh-class').value;
      var name = $('#sh-name').value.trim();
      var url = $('#sh-url').value.trim();
      result.innerHTML = '';
      var bad = [
        setError('sh-name', name ? '' : 'Type your name.'),
        setError('sh-class', classId ? '' : 'Pick the class.'),
        setError('sh-url', linkProblem(url))
      ].filter(Boolean);
      if (bad.length) { bad[0].focus(); return; }
      if (!DB.ready()) { result.innerHTML = '<b>Your notebook was not sent.</b> ' + esc(DB.offlineMessage); return; }
      shareForm.busy = true;
      $('#sh-send').disabled = true;
      DB.submitNotebook(classId, url, name.slice(0, 60)).then(function (res) {
        shareForm.busy = false;
        $('#sh-send').disabled = false;
        if (res.error) { result.innerHTML = '<b>Your notebook was not sent.</b> ' + esc(res.error); return; }
        setStudentName(name);
        result.innerHTML = '<b>Thanks, it shows up after it\'s checked.</b>';
        $('#sh-url').value = '';
      });
    });
  }

  /* ---------- Who is studying: device id and name ---------- */

  // A random id made once per browser, and the name the student typed (optional).
  // Both stay in this browser. They are only sent with usage counts and forms, and
  // only the site's admin ever sees them.
  var DEVICE_KEY = 'finals-device';
  var NAME_KEY = 'finals-student-name';
  var memDevice = '';
  var memName = '';

  function randomId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 3 | 8)).toString(16);
    });
  }

  function deviceId() {
    try {
      var d = localStorage.getItem(DEVICE_KEY);
      if (!d) { d = randomId(); localStorage.setItem(DEVICE_KEY, d); }
      return d;
    } catch (e) {
      return memDevice || (memDevice = randomId());
    }
  }

  function studentName() {
    try { return (localStorage.getItem(NAME_KEY) || '').trim(); } catch (e) { return memName; }
  }

  function setStudentName(name) {
    name = String(name || '').trim().slice(0, 60);
    memName = name;
    try {
      if (name) localStorage.setItem(NAME_KEY, name);
      else localStorage.removeItem(NAME_KEY);
    } catch (e) { /* storage blocked: kept for this visit only */ }
  }

  /* ---------- Supabase: usage counts and who is studying now ---------- */

  // kind: 'visit', 'class_open' or 'miss'. Never shows an error: counting is optional.
  function track(kind, classId, ref) {
    if (!DB.ready()) return;
    DB.track(kind, classId, ref, deviceId(), studentName() || null);
  }

  // A class was opened from the picker, a link or the class list.
  function openedClass(id) {
    track('class_open', id, null);
  }

  var online = { n: 0 };

  function paintOnline() {
    var el = $('#home-online');
    if (!el) return;
    el.hidden = !online.n;
    el.textContent = online.n ? online.n + ' studying now' : '';
  }

  function refreshOnline() {
    if (!DB.ready()) { online.n = 0; paintOnline(); return; }
    DB.onlineCount().then(function (res) {
      var n = res.error ? 0 : Number(res.data);
      online.n = isFinite(n) && n > 0 ? Math.round(n) : 0;
      paintOnline();
    });
  }

  // Every minute while this tab is on screen: say "I'm here" and update the count.
  function startPresence() {
    function beat() {
      if (document.visibilityState !== 'visible' || !DB.ready()) return;
      DB.ping(deviceId(), studentName() || null);
      refreshOnline();
    }
    beat();
    setInterval(beat, 60000);
    document.addEventListener('visibilitychange', beat);
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
    // A class with tools: true in data/subjects.js also loads data/classes/<id>-tools.js.
    var files = [];
    SUBJECTS.forEach(function (s) {
      files.push(s.id);
      if (s.tools) files.push(s.id + '-tools');
    });
    var left = files.length;
    if (!left) { done(); return; }
    files.forEach(function (name) {
      var tag = document.createElement('script');
      tag.src = './data/classes/' + encodeURIComponent(name) + '.js';
      tag.onload = tag.onerror = function () { if (--left === 0) done(); };
      document.head.appendChild(tag);
    });
  }

  function start() {
    loadSettings();
    buildSettings();
    applySettings();
    $$('[data-site-title]').forEach(function (el) { el.textContent = CFG.siteTitle || 'Finals'; });
    buildShortcuts();
    buildNotFinished();
    buildUnitPage();
    buildFlashcards();
    buildTest();
    buildSaved();
    buildDrill();
    buildMatch();
    buildFeedbackForm();
    buildShareForm();
    buildPick();
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

    // Every time the site opens, it starts on "What do you want to study?". A link to a
    // particular page (like #flashcards) opens that page after a class is picked.
    var opening = location.hash.slice(1);
    if (!opening || opening === 'home') {
      opening = settings.startPage === 'last' ? saved.lastPage : settings.startPage === 'home' ? '' : settings.startPage;
    }
    if (opening && !/^(pick|class\/|home$|404$)/.test(opening)) pickReturn = opening;
    history.replaceState(null, '', '#' + (/^pick\/(core|encore)$/.test(location.hash.slice(1)) ? location.hash.slice(1) : 'pick'));
    window.addEventListener('hashchange', function () { route(false); });
    route(true);
    // Count this visit, then keep "studying now" up to date.
    track('visit', null, null);
    startPresence();
    $('#set-student').addEventListener('input', function (e) { setStudentName(e.target.value); });
  }

  loadClasses(start);
})();
