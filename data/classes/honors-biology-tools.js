// Honors Biology interactive figure. Loaded because the class has tools: true in
// data/subjects.js. Mounts a tap-to-label animal cell inside the "Cells and food" lesson
// (section u2-cells). Nothing in the written lesson changes. Colors come from the site's
// CSS variables, so it matches light/dark and every accent. main.js wraps this in try/catch.
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
      '.ifig .tap{cursor:pointer}.ifig .tap:focus{outline:3px solid var(--accent);outline-offset:2px}';
    document.head.appendChild(s);
  }
  function cv(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim() || 'currentColor'; }
  function el(name, attrs, text) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }

  // parts: [{ name, fn, shape:function(accent,ink) -> [svgElements], label:[x,y] }]
  function mountCell(host) {
    var ink = cv('--ink'), accent = cv('--accent'), paper = cv('--paper'), line = cv('--line');
    var box = document.createElement('div');
    box.className = 'ifig';
    box.innerHTML = '<h3>Try it: tap the parts of a cell</h3>' +
      '<p>An animal cell is a tiny bag of jelly with little machines inside, each with a job. Tap a part to see what it does.</p>' +
      '<p class="simple">A cell is a tiny bag with little parts inside, and each part has one job. Tap a part to find out its job.</p>' +
      '<div class="stage"><svg viewBox="0 0 360 260" role="img" aria-label="An animal cell with parts you can tap"></svg></div>' +
      '<p class="hint">Tap any part of the cell.</p>' +
      '<div class="read" aria-live="polite"></div>';
    host.appendChild(box);
    var svg = box.querySelector('svg'), read = box.querySelector('.read');

    // cell membrane + cytoplasm
    var cell = el('ellipse', { cx: 180, cy: 130, rx: 165, ry: 115, fill: accent, 'fill-opacity': 0.06, stroke: ink, 'stroke-width': 3, 'class': 'tap', tabindex: 0 });
    var parts = [
      { node: cell, name: 'Cell membrane', fn: 'The outside wall of the cell. It decides what gets in and out.' }
    ];
    svg.appendChild(cell);

    function add(node, name, fn) { node.setAttribute('class', (node.getAttribute('class') || '') + ' tap'); node.setAttribute('tabindex', '0'); svg.appendChild(node); parts.push({ node: node, name: name, fn: fn }); }

    // nucleus
    var nuc = el('circle', { cx: 150, cy: 120, r: 42, fill: accent, 'fill-opacity': 0.5, stroke: ink, 'stroke-width': 2 });
    add(nuc, 'Nucleus', 'The control center. It holds the DNA, the cell’s instruction book.');
    svg.appendChild(el('circle', { cx: 150, cy: 120, r: 10, fill: ink, 'fill-opacity': 0.5, 'pointer-events': 'none' })); // nucleolus dot
    // mitochondrion
    var mito = el('ellipse', { cx: 265, cy: 90, rx: 34, ry: 18, fill: 'none', stroke: ink, 'stroke-width': 2.5 });
    add(mito, 'Mitochondria', 'The powerhouse. It burns food with oxygen to make energy (ATP).');
    svg.appendChild(el('path', { d: 'M238 90 q10 -10 18 0 q10 10 18 0 q10 -10 18 0', fill: 'none', stroke: ink, 'stroke-width': 1.5, opacity: 0.7, 'pointer-events': 'none' }));
    // ER (wavy lines)
    var er = el('path', { d: 'M250 170 q20 -8 40 0 q20 8 40 0 M250 185 q20 -8 40 0 q20 8 40 0', fill: 'none', stroke: ink, 'stroke-width': 2 });
    add(er, 'Endoplasmic reticulum', 'A maze of tubes that builds and moves proteins and fats around the cell.');
    // ribosomes (dots group)
    var ribo = el('g', {});
    [[120, 180], [132, 190], [110, 195], [140, 178]].forEach(function (p) { ribo.appendChild(el('circle', { cx: p[0], cy: p[1], r: 4, fill: accent })); });
    add(ribo, 'Ribosomes', 'Tiny dots that build proteins by following the DNA’s instructions.');
    // vacuole
    var vac = el('circle', { cx: 230, cy: 175, r: 20, fill: paper, stroke: ink, 'stroke-width': 2 });
    add(vac, 'Vacuole', 'A storage bubble for water, food, or waste.');

    function select(p) {
      parts.forEach(function (q) { q.node.setAttribute('stroke-width', q === p ? '4' : (q.name === 'Cell membrane' ? '3' : '2')); q.node.setAttribute('stroke', q === p ? accent : ink); });
      read.innerHTML = '<b>' + p.name + ':</b> ' + p.fn;
    }
    parts.forEach(function (p) {
      p.node.addEventListener('click', function () { select(p); });
      p.node.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(p); } });
    });
    read.innerHTML = 'Tap a part to see its job.';
  }

  F.addTools('honors-biology', function (root) {
    ensureStyle();
    var sec = root.querySelector('#sec-u2-cells');
    if (!sec || sec.querySelector('.ifig')) return;
    mountCell(sec.querySelector('div') || sec);
  });
})();
