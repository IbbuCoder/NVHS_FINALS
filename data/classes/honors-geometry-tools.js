// Honors Geometry interactive figures. Loaded because the class has tools: true in
// data/subjects.js. FINALS.addTools(id, fn) registers fn, and main.js runs fn(root, unit,
// content) every time one of this class's units is shown (root is #unit-body).
//
// Each figure mounts itself inside a real lesson section:
//   u1-lines   -> draggable slope line on a grid
//   u4-centers -> draggable triangle with its circumcenter and circle
//   u5-pairs   -> draggable transversal with eight live angles
// Nothing here changes the written lessons; it only adds a picture you can touch under them.
// Colors come from the site's own CSS variables, so these match light mode, dark mode and
// every accent color. A plain-English "In simple words" note rides along with each figure,
// so the Simple words toggle changes something on these too.
(function () {
  'use strict';
  var F = window.FINALS;
  if (!F || !F.addTools) return;
  var SVGNS = 'http://www.w3.org/2000/svg';

  // One small stylesheet for the interactive blocks, added once.
  function ensureStyle() {
    if (document.getElementById('geo-ifig-css')) return;
    var s = document.createElement('style');
    s.id = 'geo-ifig-css';
    s.textContent =
      '.ifig{margin:16px 0;padding:14px;background:var(--fill);border:1px solid var(--line);border-radius:12px}' +
      '.ifig h3{margin:0 0 6px;font:700 17px/1.2 var(--head,serif)}' +
      '.ifig .stage{background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:8px;touch-action:none}' +
      '.ifig svg{display:block;width:100%;height:auto;max-width:460px;margin:0 auto}' +
      '.ifig .vtx{cursor:grab}.ifig .vtx:active{cursor:grabbing}' +
      '.ifig .ang{cursor:pointer}' +
      '.ifig .hint{text-align:center;color:var(--muted,#666);font-size:13px;margin:8px 0 0}' +
      '.ifig .read{margin:10px 0 0;padding:10px 12px;background:var(--paper);border:1px solid var(--line);border-radius:9px;font-size:16px}' +
      '.ifig .read b{color:var(--accent)}' +
      '.ifig .reset{margin-top:8px}.ifig .reset button{border:none;background:none;color:var(--accent);font:600 14px inherit;cursor:pointer;text-decoration:underline;padding:4px 0}';
    document.head.appendChild(s);
  }

  function el(name, attrs, text) {
    var e = document.createElementNS(SVGNS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }
  function cssVar(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim() || 'currentColor'; }
  function ink()    { return cssVar('--ink'); }
  function accent() { return cssVar('--accent'); }
  function lineC()  { return cssVar('--line'); }
  function muted()  { return cssVar('--muted'); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function svgPt(svg, ev) {
    var p = svg.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY;
    return p.matrixTransform(svg.getScreenCTM().inverse());
  }
  function drag(svg, handle, onMove) {
    handle.addEventListener('pointerdown', function (ev) {
      ev.preventDefault();
      try { handle.setPointerCapture(ev.pointerId); } catch (e) {}
      function move(e) { var q = svgPt(svg, e); onMove(q.x, q.y); }
      function up() {
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', up);
        handle.removeEventListener('pointercancel', up);
      }
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', up);
      handle.addEventListener('pointercancel', up);
    });
  }

  // Builds the shell (title, blurb, simple note, stage svg, hint, readout, reset) and
  // returns { svg, read } so each figure just draws into it.
  function shell(host, opts) {
    var box = document.createElement('div');
    box.className = 'ifig';
    box.innerHTML =
      '<h3>' + opts.title + '</h3>' +
      '<p>' + opts.blurb + '</p>' +
      '<p class="simple">' + opts.simple + '</p>' +
      '<div class="stage"><svg viewBox="0 0 360 300" role="img" aria-label="' + opts.aria + '"></svg></div>' +
      '<p class="hint">' + opts.hint + '</p>' +
      '<div class="read"></div>' +
      '<div class="reset"><button type="button">' + (opts.resetLabel || 'Reset') + '</button></div>';
    host.appendChild(box);
    var svg = box.querySelector('svg');
    var read = box.querySelector('.read');
    box.querySelector('.reset button').addEventListener('click', opts.onReset);
    return { svg: svg, read: read };
  }

  /* ---------------- circumcenter ---------------- */
  function circum(A, B, C) {
    var ax = A[0], ay = A[1], bx = B[0], by = B[1], cx = C[0], cy = C[1];
    var d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    if (Math.abs(d) < 1e-6) return null;
    var a2 = ax * ax + ay * ay, b2 = bx * bx + by * by, c2 = cx * cx + cy * cy;
    return [(a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by)) / d,
            (a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax)) / d];
  }
  function angAt(P, Q, R) {
    var u = [Q[0] - P[0], Q[1] - P[1]], v = [R[0] - P[0], R[1] - P[1]];
    var m = Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1]);
    return m ? Math.acos(clamp((u[0] * v[0] + u[1] * v[1]) / m, -1, 1)) * 180 / Math.PI : 0;
  }
  function mountCircumcenter(host) {
    var START = [[70, 230], [300, 215], [185, 70]];
    var P = [START[0].slice(), START[1].slice(), START[2].slice()];
    var s = shell(host, {
      title: 'Try it: the circumcenter',
      blurb: 'The <b>circumcenter</b> is the one point the same distance from all three corners. The circle drawn from it passes through every corner. Drag a corner and watch O move.',
      simple: 'The circumcenter is the middle point that is the same distance from all 3 corners. Drag a corner to move it around. On a wide (obtuse) triangle it slides outside.',
      aria: 'A triangle with three draggable corners, its circumcenter and the circle through all three corners',
      hint: 'Grab corner A, B or C and drag.',
      resetLabel: 'Reset triangle',
      onReset: function () { P = [START[0].slice(), START[1].slice(), START[2].slice()]; render(); }
    });
    function render() {
      var svg = s.svg; svg.innerHTML = '';
      var A = P[0], B = P[1], C = P[2], O = circum(A, B, C);
      if (O) {
        var R = Math.hypot(O[0] - A[0], O[1] - A[1]);
        svg.appendChild(el('circle', { cx: O[0], cy: O[1], r: R, fill: 'none', stroke: accent(), 'stroke-width': 1.6, opacity: 0.5 }));
        [[A, B], [B, C], [C, A]].forEach(function (pr) {
          var m = [(pr[0][0] + pr[1][0]) / 2, (pr[0][1] + pr[1][1]) / 2];
          svg.appendChild(el('line', { x1: m[0] * 2 - O[0], y1: m[1] * 2 - O[1], x2: O[0], y2: O[1], stroke: muted(), 'stroke-width': 1, 'stroke-dasharray': '4 4', opacity: 0.6 }));
        });
      }
      svg.appendChild(el('polygon', { points: P.map(function (p) { return p.join(','); }).join(' '), fill: accent(), 'fill-opacity': 0.08, stroke: ink(), 'stroke-width': 2.5 }));
      if (O) {
        svg.appendChild(el('circle', { cx: O[0], cy: O[1], r: 4.5, fill: accent() }));
        svg.appendChild(el('text', { x: O[0] + 9, y: O[1] + 4, 'font-size': 15, 'font-weight': 700, fill: accent() }, 'O'));
      }
      'ABC'.split('').forEach(function (nm, i) {
        var p = P[i], off = [[-16, 4], [14, 4], [0, -14]][i];
        svg.appendChild(el('text', { x: p[0] + off[0], y: p[1] + off[1], 'font-size': 16, 'font-weight': 700, fill: ink() }, nm));
        var h = el('circle', { cx: p[0], cy: p[1], r: 11, 'class': 'vtx', fill: accent() });
        svg.appendChild(h);
        drag(svg, h, function (x, y) { P[i] = [clamp(x, 16, 344), clamp(y, 16, 284)]; render(); });
      });
      var mx = Math.max(angAt(A, B, C), angAt(B, A, C), angAt(C, A, B));
      var where = mx > 90.5 ? 'an <b>obtuse</b> triangle, so O sits <b>outside</b> it'
        : (mx > 89.5 ? 'a <b>right</b> triangle, so O sits on the longest side'
        : 'an <b>acute</b> triangle, so O sits <b>inside</b> it');
      s.read.innerHTML = 'This is ' + where + '. Biggest angle: ' + Math.round(mx) + '°.';
    }
    render();
  }

  /* ---------------- slope ---------------- */
  function mountSlope(host) {
    var GX = 40, GY = 20, STEP = 35, START = [[1, 1], [6, 6]];
    var P = [START[0].slice(), START[1].slice()];
    function gx(c) { return GX + c * STEP; }
    function gy(r) { return 300 - GY - r * STEP; }
    function cell(x, y) { return [clamp(Math.round((x - GX) / STEP), 0, 8), clamp(Math.round((300 - GY - y) / STEP), 0, 8)]; }
    var s = shell(host, {
      title: 'Try it: slope',
      blurb: 'Slope is how far a line goes <b>up</b> for how far it goes <b>across</b> (rise over run). Drag the dots. Downhill is a negative slope.',
      simple: 'Slope = up amount divided by sideways amount. Drag the two dots. Uphill is a plus number, downhill is a minus, flat is 0.',
      aria: 'A grid with two draggable points that form a line',
      hint: 'Drag the two dots — they snap to the grid.',
      resetLabel: 'Reset points',
      onReset: function () { P = [START[0].slice(), START[1].slice()]; render(); }
    });
    function render() {
      var svg = s.svg; svg.innerHTML = '';
      var i;
      for (i = 0; i <= 8; i++) {
        svg.appendChild(el('line', { x1: gx(0), y1: gy(i), x2: gx(8), y2: gy(i), stroke: lineC(), 'stroke-width': 1 }));
        svg.appendChild(el('line', { x1: gx(i), y1: gy(0), x2: gx(i), y2: gy(8), stroke: lineC(), 'stroke-width': 1 }));
      }
      svg.appendChild(el('line', { x1: gx(0), y1: gy(0), x2: gx(8), y2: gy(0), stroke: muted(), 'stroke-width': 2 }));
      svg.appendChild(el('line', { x1: gx(0), y1: gy(0), x2: gx(0), y2: gy(8), stroke: muted(), 'stroke-width': 2 }));
      var a = P[0], b = P[1];
      if (a[0] !== b[0]) {
        var m = (b[1] - a[1]) / (b[0] - a[0]);
        svg.appendChild(el('line', { x1: gx(0), y1: gy(a[1] + m * (0 - a[0])), x2: gx(8), y2: gy(a[1] + m * (8 - a[0])), stroke: accent(), 'stroke-width': 2.5 }));
      } else {
        svg.appendChild(el('line', { x1: gx(a[0]), y1: gy(0), x2: gx(a[0]), y2: gy(8), stroke: accent(), 'stroke-width': 2.5 }));
      }
      svg.appendChild(el('line', { x1: gx(a[0]), y1: gy(a[1]), x2: gx(b[0]), y2: gy(a[1]), stroke: muted(), 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }));
      svg.appendChild(el('line', { x1: gx(b[0]), y1: gy(a[1]), x2: gx(b[0]), y2: gy(b[1]), stroke: muted(), 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }));
      P.forEach(function (p, idx) {
        var h = el('circle', { cx: gx(p[0]), cy: gy(p[1]), r: 10, 'class': 'vtx', fill: accent() });
        svg.appendChild(h);
        drag(svg, h, function (x, y) { P[idx] = cell(x, y); render(); });
      });
      var rise = b[1] - a[1], run = b[0] - a[0], t;
      if (run === 0) t = 'The line is straight up and down, so the slope is <b>undefined</b>.';
      else {
        var m2 = rise / run;
        t = 'Slope = rise ÷ run = <b>' + rise + ' ÷ ' + run + '</b> = <b>' + (Number.isInteger(m2) ? m2 : m2.toFixed(2)) + '</b>. ' +
          (m2 > 0 ? 'Uphill.' : m2 < 0 ? 'Downhill.' : 'Flat.');
      }
      s.read.innerHTML = t;
    }
    render();
  }

  /* ---------------- transversal ---------------- */
  function mountTransversal(host) {
    var TOP = 95, BOT = 205, CX = 180, START = 38;
    var ang = START, sel = -1;
    var s = shell(host, {
      title: 'Try it: angles on parallel lines',
      blurb: 'One line crossing two parallel lines makes 8 angles, but only two sizes that repeat. Tilt the line with the handle, then <b>tap any angle</b> to light up the ones equal to it.',
      simple: 'A slanted line across two parallel lines makes 8 angles but only 2 sizes. Tilt it with the handle. Tap an angle and all the same-size angles light up.',
      aria: 'Two parallel lines crossed by a draggable slanted line, with eight angles you can tap',
      hint: 'Drag the handle to tilt — tap an angle to match it.',
      resetLabel: 'Reset line',
      onReset: function () { ang = START; sel = -1; render(); }
    });
    function render() {
      var svg = s.svg; svg.innerHTML = '';
      var th = ang * Math.PI / 180, dx = Math.sin(th), dy = Math.cos(th);
      function at(y) { return CX + dx * ((y - 150) / dy); }
      var xTop = at(TOP), xBot = at(BOT), ext = 90;
      svg.appendChild(el('line', { x1: 20, y1: TOP, x2: 340, y2: TOP, stroke: ink(), 'stroke-width': 2.5 }));
      svg.appendChild(el('line', { x1: 20, y1: BOT, x2: 340, y2: BOT, stroke: ink(), 'stroke-width': 2.5 }));
      svg.appendChild(el('text', { x: 346, y: TOP + 4, 'font-size': 14, 'font-weight': 700, fill: muted() }, 'ℓ'));
      svg.appendChild(el('text', { x: 346, y: BOT + 4, 'font-size': 14, 'font-weight': 700, fill: muted() }, 'm'));
      svg.appendChild(el('line', { x1: xTop - dx * ext, y1: TOP - dy * ext, x2: xBot + dx * ext, y2: BOT + dy * ext, stroke: accent(), 'stroke-width': 2.5 }));
      var acute = Math.round(ang < 90 ? ang : 180 - ang), obtuse = 180 - acute, r = 26;
      function place(cxp, cyp, corner, val) {
        var dirs = { NE: [1, -1], NW: [-1, -1], SW: [-1, 1], SE: [1, 1] }, d = dirs[corner];
        var isAcute = (val === acute);
        var on = sel === -1 ? false : (sel === 0 ? isAcute : !isAcute);
        var t = el('text', { x: cxp + d[0] * r * 0.7, y: cyp + d[1] * r * 0.7 + 5, 'font-size': 15, 'font-weight': 700, 'text-anchor': 'middle', 'class': 'ang', fill: on ? accent() : ink() }, val + '°');
        t.addEventListener('click', function () { sel = isAcute ? 0 : 1; render(); });
        svg.appendChild(t);
      }
      place(xTop, TOP, 'NE', acute); place(xTop, TOP, 'NW', obtuse); place(xTop, TOP, 'SW', acute); place(xTop, TOP, 'SE', obtuse);
      place(xBot, BOT, 'NE', acute); place(xBot, BOT, 'NW', obtuse); place(xBot, BOT, 'SW', acute); place(xBot, BOT, 'SE', obtuse);
      var h = el('circle', { cx: xTop - dx * ext * 0.7, cy: TOP - dy * ext * 0.7, r: 11, 'class': 'vtx', fill: accent() });
      svg.appendChild(h);
      drag(svg, h, function (x, y) { ang = clamp(Math.abs(Math.atan2(x - CX, 150 - y) * 180 / Math.PI), 12, 78); render(); });
      var msg = 'Two sizes: <b>' + acute + '°</b> and <b>' + obtuse + '°</b> (they add to 180°). ' +
        (sel === -1 ? 'Tap an angle to match it.' : 'The <b>' + (sel === 0 ? acute : obtuse) + '°</b> angles are lit — 4 of them are equal.');
      s.read.innerHTML = msg;
    }
    render();
  }

  // Which section each figure attaches to, and the builder for it.
  var MOUNTS = {
    'u1-lines': mountSlope,
    'u4-centers': mountCircumcenter,
    'u5-pairs': mountTransversal
  };

  F.addTools('honors-geometry', function (root) {
    ensureStyle();
    Object.keys(MOUNTS).forEach(function (secId) {
      var sec = root.querySelector('#sec-' + secId);
      if (!sec || sec.querySelector('.ifig')) return; // not on this unit, or already mounted
      var bodyDiv = sec.querySelector('div') || sec; // the section's content wrapper
      MOUNTS[secId](bodyDiv);
    });
  });
})();
