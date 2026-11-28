// Human Geography interactive figure. Loaded because the class has tools: true in
// data/subjects.js. Mounts a tap-the-legend map inside "What is a map and how do you read
// it?" (section u1-maps). Tapping a legend item highlights every matching symbol on the map.
// Written lesson is unchanged. main.js wraps this in try/catch.
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
      '.ifig .legend{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 0;justify-content:center}' +
      '.ifig .legend button{border:2px solid var(--line);background:var(--paper);color:var(--ink);font:600 14px inherit;padding:6px 11px;border-radius:999px;cursor:pointer}' +
      '.ifig .legend button[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:#fff}' +
      '.ifig .read{margin:10px 0 0;padding:10px 12px;background:var(--paper);border:1px solid var(--line);border-radius:9px;font-size:16px;min-height:1.5em}' +
      '.ifig .read b{color:var(--accent)}';
    document.head.appendChild(s);
  }
  function cv(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim() || 'currentColor'; }
  function el(name, attrs, text) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }

  function mountMap(host) {
    var ink = cv('--ink'), accent = cv('--accent'), line = cv('--line'), muted = cv('--muted');
    var box = document.createElement('div');
    box.className = 'ifig';
    box.innerHTML = '<h3>Try it: read the map key</h3>' +
      '<p>A map key (or legend) tells you what each symbol means. Tap a key below and every matching symbol on the map lights up.</p>' +
      '<p class="simple">The key explains what the symbols on a map mean. Tap a key word and the matching symbols light up on the map.</p>' +
      '<div class="stage"><svg viewBox="0 0 360 240" role="img" aria-label="A simple map with a star, dots, a river and roads"></svg></div>' +
      '<div class="legend"></div>' +
      '<div class="read" aria-live="polite">Tap a key word.</div>';
    host.appendChild(box);
    var svg = box.querySelector('svg'), legend = box.querySelector('.legend'), read = box.querySelector('.read');

    // background land
    svg.appendChild(el('rect', { x: 6, y: 6, width: 348, height: 228, rx: 10, fill: accent, 'fill-opacity': 0.05, stroke: line, 'stroke-width': 1.5 }));
    var groups = {};
    function g(key) { if (!groups[key]) { groups[key] = el('g', {}); svg.appendChild(groups[key]); } return groups[key]; }

    // river (blue-ish via accent at low opacity -> use ink muted so theme-safe): a line
    g('river').appendChild(el('path', { d: 'M20 40 q60 40 50 90 q-10 50 60 70', fill: 'none', stroke: muted, 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0.6 }));
    // roads
    ['M120 10 L150 230', 'M30 150 L350 120'].forEach(function (d) { g('road').appendChild(el('path', { d: d, fill: 'none', stroke: ink, 'stroke-width': 2, 'stroke-dasharray': '8 6', opacity: 0.7 })); });
    // cities (dots)
    [[210, 70], [280, 150], [160, 190]].forEach(function (p) { g('city').appendChild(el('circle', { cx: p[0], cy: p[1], r: 6, fill: ink })); });
    // capital (star)
    g('capital').appendChild(star(250, 100, 11, accent, ink));

    function star(cx, cy, r, fill, stroke) {
      var pts = [];
      for (var i = 0; i < 10; i++) { var ang = Math.PI / 5 * i - Math.PI / 2; var rr = i % 2 ? r * 0.45 : r; pts.push((cx + rr * Math.cos(ang)).toFixed(1) + ',' + (cy + rr * Math.sin(ang)).toFixed(1)); }
      return el('polygon', { points: pts.join(' '), fill: fill, stroke: stroke, 'stroke-width': 1 });
    }

    var items = [
      { key: 'capital', label: '★ Capital city', fn: 'A star marks the capital — the city that runs the country or state.' },
      { key: 'city', label: '● City', fn: 'A dot marks a regular city or town.' },
      { key: 'river', label: 'River', fn: 'A thick wavy line is a river or stream.' },
      { key: 'road', label: 'Road', fn: 'A dashed line is a road or highway connecting places.' }
    ];
    var active = null;
    function paint() {
      Object.keys(groups).forEach(function (k) {
        var on = active === k;
        groups[k].querySelectorAll('*').forEach(function (n) {
          if (n.tagName === 'circle' || n.tagName === 'polygon') { n.setAttribute('fill', on ? accent : (k === 'capital' ? accent : ink)); }
          if (on) n.setAttribute('stroke', accent);
          n.setAttribute('opacity', active && !on ? '0.25' : (n.getAttribute('data-op') || (k === 'river' || k === 'road' ? '0.7' : '1')));
        });
      });
    }
    items.forEach(function (it) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = it.label; b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () {
        active = active === it.key ? null : it.key;
        legend.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        if (active) b.setAttribute('aria-pressed', 'true');
        read.innerHTML = active ? '<b>' + it.label + ':</b> ' + it.fn : 'Tap a key word.';
        paint();
      });
      legend.appendChild(b);
    });
  }

  F.addTools('human-geography', function (root) {
    ensureStyle();
    var sec = root.querySelector('#sec-u1-maps');
    if (!sec || sec.querySelector('.ifig')) return;
    mountMap(sec.querySelector('div') || sec);
  });
})();
