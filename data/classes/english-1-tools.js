// English I CP interactive figure. Loaded because the class has tools: true in
// data/subjects.js. Mounts a tap-the-stage plot diagram (the "plot mountain") inside
// "Setting and plot" (section u3-setting). Written lesson is unchanged. main.js wraps this
// in try/catch.
(function () {
  'use strict';
  var F = window.FINALS;
  if (!F || !F.addTools) return;
  var NS = 'http://www.w3.org/2000/svg';

  function ensureStyle() {
    if (document.getElementById('ifig-css-shared')) return;
    var s = document.createElement('style');
    s.id = 'ifig-css-shared';
    s.textContent =
      '.ifig{margin:16px 0;padding:14px;background:var(--fill);border:1px solid var(--line);border-radius:12px}' +
      '.ifig h3{margin:0 0 6px;font:700 17px/1.2 var(--head,serif)}' +
      '.ifig .stage{background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:8px}' +
      '.ifig svg{display:block;width:100%;height:auto;max-width:460px;margin:0 auto}' +
      '.ifig .hint{text-align:center;color:var(--muted,#666);font-size:13px;margin:8px 0 0}' +
      '.ifig .read{margin:10px 0 0;padding:10px 12px;background:var(--paper);border:1px solid var(--line);border-radius:9px;font-size:16px;min-height:1.5em}' +
      '.ifig .read b{color:var(--accent)}' +
      '.ifig .dot{cursor:pointer}.ifig .dot:focus{outline:3px solid var(--accent);outline-offset:2px}';
    document.head.appendChild(s);
  }
  function cv(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim() || 'currentColor'; }
  function el(name, attrs, text) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }

  function mount(host) {
    var ink = cv('--ink'), accent = cv('--accent'), muted = cv('--muted');
    var box = document.createElement('div');
    box.className = 'ifig';
    box.innerHTML = '<h3>Try it: the plot mountain</h3>' +
      '<p>Most stories climb to a high point and come back down. Tap each spot on the mountain to see what happens there.</p>' +
      '<p class="simple">A story builds up, hits its biggest moment at the top, then winds down. Tap each spot to see what each part means.</p>' +
      '<div class="stage"><svg viewBox="0 0 360 230" role="img" aria-label="A plot diagram shaped like a mountain with five points you can tap"></svg></div>' +
      '<p class="hint">Tap each numbered spot.</p>' +
      '<div class="read" aria-live="polite">Tap a spot on the mountain.</div>';
    host.appendChild(box);
    var svg = box.querySelector('svg'), read = box.querySelector('.read');

    var stages = [
      { x: 30, y: 195, n: '1', name: 'Exposition', fn: 'The start. You meet the characters and the setting, and learn how things normally are.' },
      { x: 120, y: 120, n: '2', name: 'Rising action', fn: 'The problem grows. Events build up tension and make things harder.' },
      { x: 200, y: 40, n: '3', name: 'Climax', fn: 'The top — the biggest, most exciting turning point of the story.' },
      { x: 280, y: 120, n: '4', name: 'Falling action', fn: 'Things start to settle. The results of the climax play out.' },
      { x: 335, y: 195, n: '5', name: 'Resolution', fn: 'The end. The problem is wrapped up and the story closes.' }
    ];
    // baseline
    svg.appendChild(el('line', { x1: 15, y1: 210, x2: 348, y2: 210, stroke: muted, 'stroke-width': 1.5, opacity: 0.6 }));
    // mountain line
    svg.appendChild(el('polyline', { points: stages.map(function (s) { return s.x + ',' + s.y; }).join(' '), fill: 'none', stroke: ink, 'stroke-width': 2.5 }));

    var dots = [];
    stages.forEach(function (st) {
      var d = el('circle', { cx: st.x, cy: st.y, r: 11, fill: accent, 'class': 'dot', tabindex: 0 });
      var lab = el('text', { x: st.x, y: st.y + 5, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': 700, fill: '#fff', 'pointer-events': 'none' }, st.n);
      svg.appendChild(d); svg.appendChild(lab);
      dots.push(d);
      function pick() {
        dots.forEach(function (o) { o.setAttribute('r', o === d ? '14' : '11'); o.setAttribute('stroke', o === d ? ink : 'none'); o.setAttribute('stroke-width', o === d ? '2' : '0'); });
        read.innerHTML = '<b>' + st.n + '. ' + st.name + ':</b> ' + st.fn;
      }
      d.addEventListener('click', pick);
      d.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
    });
  }

  F.addTools('english-1', function (root) {
    ensureStyle();
    var sec = root.querySelector('#sec-u3-setting');
    if (!sec || sec.querySelector('.ifig')) return;
    mount(sec.querySelector('div') || sec);
  });
})();
