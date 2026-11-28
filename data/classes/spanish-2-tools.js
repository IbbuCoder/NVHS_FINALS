// Espanol 2 interactive figure. Loaded because the class has tools: true in
// data/subjects.js. Mounts a present-tense conjugation builder inside "Present tense
// endings" (section u0-present): pick a verb and a subject, watch the stem and ending snap
// together. Written lesson is unchanged. main.js wraps this in try/catch.
(function () {
  'use strict';
  var F = window.FINALS;
  if (!F || !F.addTools) return;

  function ensureStyle() {
    if (document.getElementById('ifig-conj-css')) return;
    var s = document.createElement('style');
    s.id = 'ifig-conj-css';
    s.textContent =
      '.ifig{margin:16px 0;padding:14px;background:var(--fill);border:1px solid var(--line);border-radius:12px}' +
      '.ifig h3{margin:0 0 6px;font:700 17px/1.2 var(--head,serif)}' +
      '.ifig .row{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}' +
      '.ifig .row b{align-self:center;font-size:14px;color:var(--muted);margin-right:4px}' +
      '.ifig .chip{border:2px solid var(--line);background:var(--paper);color:var(--ink);font:600 15px inherit;padding:7px 12px;border-radius:999px;cursor:pointer}' +
      '.ifig .chip[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:#fff}' +
      '.ifig .build{display:flex;align-items:center;justify-content:center;gap:4px;margin:14px 0 4px;flex-wrap:wrap}' +
      '.ifig .tok{font:700 30px/1 var(--head,serif);padding:6px 10px;border-radius:10px}' +
      '.ifig .stem{background:var(--paper);border:2px solid var(--line)}' +
      '.ifig .end{background:var(--accent);color:#fff}' +
      '.ifig .read{margin:8px 0 0;padding:10px 12px;background:var(--paper);border:1px solid var(--line);border-radius:9px;font-size:16px;text-align:center}' +
      '.ifig .read b{color:var(--accent)}';
    document.head.appendChild(s);
  }

  var VERBS = {
    'hablar': { stem: 'habl', type: 'ar', mean: 'to talk' },
    'comer': { stem: 'com', type: 'er', mean: 'to eat' },
    'vivir': { stem: 'viv', type: 'ir', mean: 'to live' }
  };
  var ENDINGS = {
    ar: { yo: 'o', 'tú': 'as', 'él/ella': 'a', nosotros: 'amos', ellos: 'an' },
    er: { yo: 'o', 'tú': 'es', 'él/ella': 'e', nosotros: 'emos', ellos: 'en' },
    ir: { yo: 'o', 'tú': 'es', 'él/ella': 'e', nosotros: 'imos', ellos: 'en' }
  };
  var SUBJ = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos'];
  var ENGLISH = { 'hablar': { yo: 'I talk', 'tú': 'you talk', 'él/ella': 'he/she talks', nosotros: 'we talk', ellos: 'they talk' },
                  'comer': { yo: 'I eat', 'tú': 'you eat', 'él/ella': 'he/she eats', nosotros: 'we eat', ellos: 'they eat' },
                  'vivir': { yo: 'I live', 'tú': 'you live', 'él/ella': 'he/she lives', nosotros: 'we live', ellos: 'they live' } };

  function mount(host) {
    var box = document.createElement('div');
    box.className = 'ifig';
    box.innerHTML = '<h3>Try it: build the verb</h3>' +
      '<p>To say who is doing something, drop the ending (-ar, -er, -ir) and add the one that matches the subject. Pick a verb and a subject.</p>' +
      '<p class="simple">Cut off the last two letters of the verb, then add the ending that matches who is doing it. Pick a verb and a person below.</p>' +
      '<div class="row verbs"><b>Verb:</b></div>' +
      '<div class="row subs"><b>Who:</b></div>' +
      '<div class="build"></div>' +
      '<div class="read" aria-live="polite"></div>';
    host.appendChild(box);
    var verbsRow = box.querySelector('.verbs'), subsRow = box.querySelector('.subs'),
        build = box.querySelector('.build'), read = box.querySelector('.read');
    var curVerb = 'hablar', curSub = 'yo';

    function chip(row, label, on, onClick) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.textContent = label;
      b.setAttribute('aria-pressed', String(on));
      b.addEventListener('click', onClick);
      row.appendChild(b); return b;
    }
    function render() {
      verbsRow.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c.textContent.indexOf(curVerb) === 0)); });
      subsRow.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c.textContent === curSub)); });
      var v = VERBS[curVerb], end = ENDINGS[v.type][curSub];
      build.innerHTML = '';
      var stem = document.createElement('span'); stem.className = 'tok stem'; stem.textContent = v.stem;
      var plus = document.createElement('span'); plus.textContent = '+'; plus.style.fontWeight = '700';
      var e = document.createElement('span'); e.className = 'tok end'; e.textContent = end;
      var eq = document.createElement('span'); eq.textContent = '=';
      var full = document.createElement('span'); full.className = 'tok'; full.style.color = 'var(--accent)'; full.textContent = v.stem + end;
      build.appendChild(stem); build.appendChild(plus); build.appendChild(e); build.appendChild(eq); build.appendChild(full);
      read.innerHTML = '<b>' + curSub + ' ' + v.stem + end + '</b> = ' + ENGLISH[curVerb][curSub] + ' (' + curVerb + ', ' + v.mean + ')';
    }
    Object.keys(VERBS).forEach(function (v) { chip(verbsRow, v + ' (-' + VERBS[v].type + ')', v === curVerb, function () { curVerb = v; render(); }); });
    SUBJ.forEach(function (sj) { chip(subsRow, sj, sj === curSub, function () { curSub = sj; render(); }); });
    render();
  }

  F.addTools('spanish-2', function (root) {
    ensureStyle();
    var sec = root.querySelector('#sec-u0-present');
    if (!sec || sec.querySelector('.ifig')) return;
    mount(sec.querySelector('div') || sec);
  });
})();
