// Checks the math in data/classes/honors-geometry.js. Run: node tools/check-honors-geometry.js
// Every number answer is worked out again here, a second way where there is one,
// and compared with the text on the site. Exits with an error if anything is off.
var fs = require('fs');
var path = require('path');

var data;
// Runs this repo's own data file in a sandbox that only has FINALS.addClass.
require('vm').runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'data', 'classes', 'honors-geometry.js'), 'utf8'),
  { FINALS: { addClass: function (id, d) { data = JSON.parse(JSON.stringify(d)); data.drills = d.drills; } } });

var fails = 0, checks = 0;
function ok(cond, msg) { checks++; if (!cond) { fails++; console.log('FAIL: ' + msg); } }
function eq(a, b, msg) { ok(Math.abs(a - b) < 1e-9, msg + ' (got ' + a + ', expected ' + b + ')'); }
var all = JSON.stringify(data.units) + JSON.stringify(data.flashcards) + JSON.stringify(data.questions);
function has(text, msg) { ok(all.indexOf(text) > -1, 'text missing: ' + (msg || text)); }
function q(start) { return data.questions.filter(function (x) { return x.q.indexOf(start) === 0; })[0]; }
function answer(start) { var x = q(start); ok(!!x, 'question missing: ' + start); return x ? x.c[x.a] : null; }
function slope(a, b) { return (b[1] - a[1]) / (b[0] - a[0]); }
function dist(a, b) { return Math.hypot(b[0] - a[0], b[1] - a[1]); }
function mid(a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; }
// Solve a·x + b = c·x + d both by formula and by checking the result.
function solve(a, b, c, d) { var x = (d - b) / (a - c); eq(a * x + b, c * x + d, 'linear solve'); return x; }

/* ---------- Structure ---------- */
ok(data.units.length === 6, '6 units');
var ids = {};
data.units.forEach(function (u, i) {
  ok(u.id === 'u' + (i + 1), 'unit id ' + u.id);
  u.sections.forEach(function (s) { ok(!ids[s.id], 'duplicate section id ' + s.id); ids[s.id] = 1; });
  var cards = data.flashcards.filter(function (c) { return c.u === i + 1; }).length;
  var qs = data.questions.filter(function (c) { return c.u === i + 1; }).length;
  ok(cards >= 8, 'unit ' + (i + 1) + ' has ' + cards + ' flashcards');
  ok(qs >= 6, 'unit ' + (i + 1) + ' has ' + qs + ' questions');
});
data.questions.forEach(function (x) {
  ok(x.t === 'mc' && x.c.length === 4, '4 choices: ' + x.q);
  ok(x.a >= 0 && x.a < x.c.length, 'answer index: ' + x.q);
  ok(new Set(x.c).size === x.c.length, 'choices are all different: ' + x.q);
  ok(!!x.why, 'explanation: ' + x.q);
});
ok(!/reflection|rotation|translation|transformation|rigid motion/i.test(JSON.stringify(data.units) + JSON.stringify(data.questions) + JSON.stringify(data.flashcards)),
  'no transformations in lessons, cards or questions');
var proofs = data.units.reduce(function (n, u) { return n + u.sections.filter(function (s) { return /^Proof practice/.test(s.title); }).length; }, 0);
ok(proofs >= 4 && proofs <= 5, proofs + ' practice proofs');

/* ---------- Unit 1 ---------- */
eq(solve(3, -12 + 2, 5, -18), 4, '3(x − 4) + 2 = 5x − 18');
// −2x + 5 > 13 → x < −4: −5 works, −4 and −3 don't
ok(-2 * -5 + 5 > 13 && !(-2 * -4 + 5 > 13) && !(-2 * -3 + 5 > 13), '−2x + 5 > 13 gives x < −4');
eq(slope([2, -1], [6, 7]), 2, 'slope (2,−1),(6,7)'); eq(2 * 6 - 5, 7, 'y = 2x − 5 through (6, 7)'); eq(2 * 2 - 5, -1, 'y = 2x − 5 through (2, −1)');
eq(2 * 3 + 1, 7, 'system 2x + y = 7 at (3, 1)'); eq(3 - 1, 2, 'system x − y = 2 at (3, 1)');
eq(solve(12, 30, 18, 0), 5, 'plans 30 + 12m = 18m'); eq(30 + 12 * 5, 90, 'plan A cost'); eq(18 * 5, 90, 'plan B cost');
eq(mid([-3, 4], [5, -2])[0], 1, 'midpoint x'); eq(mid([-3, 4], [5, -2])[1], 1, 'midpoint y'); eq(dist([-3, 4], [5, -2]), 10, 'distance');
eq(mid([-1, 7], [5, -1])[0], 2, 'endpoint check x'); eq(mid([-1, 7], [5, -1])[1], 3, 'endpoint check y');
eq(slope([1, 1], [4, 5]) * slope([4, 5], [8, 2]), -1, 'right angle at B by slopes');
eq(dist([1, 1], [4, 5]), 5, 'AB = 5'); eq(dist([4, 5], [8, 2]), 5, 'BC = 5'); eq(Math.pow(dist([1, 1], [8, 2]), 2), 50, 'AC² = 50');
ok(7 * 7 + 8 * 8 < 12 * 12 && 7 + 8 > 12, '7, 8, 12 is an obtuse triangle');
eq(solve(4, 12, 2, -6), -9, '4(x + 3) = 2x − 6'); has('x = −9');
ok(answer('Solve −3x + 4') === 'x ≥ −5' && -3 * -5 + 4 <= 19 && !(-3 * -6 + 4 <= 19), '−3x + 4 ≤ 19 → x ≥ −5');
eq(slope([-2, 5], [4, -7]), -2, 'slope Q'); ok(answer('What is the slope of the line through (−2, 5)') === '−2', 'slope Q answer');
ok(answer('What is the midpoint of (−4, 9)') === '(' + mid([-4, 9], [6, -3]).join(', ') + ')', 'midpoint Q');
ok(answer('What is the distance between (−1, −2)') === String(dist([-1, -2], [5, 6])), 'distance Q');
var B = [2 * 3 - 7, 2 * -1 - 4]; ok(answer('M(3, −1) is the midpoint') === '(−1, −6)' && B[0] === -1 && B[1] === -6, 'endpoint Q');
eq(mid([7, 4], B)[0], 3, 'endpoint Q check x'); eq(mid([7, 4], B)[1], -1, 'endpoint Q check y');
var sx = solve(5, -1, 0, 14); eq(sx, 3, 'system Q x'); eq(2 * sx - 1, 5, 'system Q y'); eq(3 * 3 + 5, 14, 'system Q check');
eq(81 + 144, 225, '9, 12, 15'); ok(36 + 64 !== 121 && 25 + 144 !== 196 && 49 + 576 !== 676, 'other side sets are not right');
ok(answer('Plan A costs') === '5', 'plans Q');

/* ---------- Unit 2 ---------- */
var x45 = solve(-1, 180, -3, 270); eq(x45, 45, 'supplement = 3 × complement'); eq(180 - 45, 3 * (90 - 45), 'check 135 = 3 · 45');
ok(answer('An angle’s supplement') === '45°', 'supp/comp Q');
var lp = solve(8, -20, 0, 180); eq(lp, 25, 'linear pair x'); eq(3 * 25 + 10, 85, 'linear pair 85'); eq(5 * 25 - 30, 95, 'linear pair 95');
ok(answer('Two angles form a linear pair') === '95°', 'linear pair Q');
var va = solve(4, -7, 2, 25); eq(va, 16, 'vertical x'); eq(4 * 16 - 7, 57, 'vertical angle'); eq(2 * 16 + 25, 57, 'vertical angle other');
ok(answer('Vertical angles measure') === '57°', 'vertical Q');
var cx = solve(6, 6, 0, 90); eq(cx, 14, 'complementary x'); eq(4 * cx, 56, 'm∠B'); eq(2 * cx + 6, 34, 'm∠A');
ok(answer('∠A and ∠B are complementary') === '56°', 'complementary Q');

/* ---------- Unit 3 ---------- */
eq((180 - 40) / 2, 70, 'base angles of a 40° vertex'); ok(answer('An isosceles triangle has a vertex angle of 40°') === '70°', 'vertex 40 Q');
var bx = solve(3, 5, 5, -21); eq(bx, 13, 'base angle x'); eq(3 * 13 + 5, 44, 'base angle'); eq(180 - 2 * 44, 92, 'vertex angle');
ok(answer('The base angles of an isosceles triangle') === '92°', 'base angles Q');
var ex = solve(2, 3, 5, -9); eq(ex, 4, 'equilateral x'); eq(3 * (2 * 4 + 3), 33, 'perimeter'); ok(answer('An equilateral triangle has sides') === '33', 'perimeter Q');

/* ---------- Unit 4 ---------- */
var px = solve(3, 1, 5, -7); eq(px, 4, 'perp bisector x'); eq(3 * 4 + 1, 13, 'PA'); ok(answer('P is on the perpendicular bisector') === '13', 'PA Q');
eq(18 * 2 / 3, 12, 'AG of 18'); eq(18 / 3, 6, 'GM of 18'); eq(2 * 5, 10, 'AG from GM 5'); eq(3 * 5, 15, 'AM from GM 5');
eq((-2 + 4 + 7) / 3, 3, 'centroid x lesson'); eq((5 - 1 + 5) / 3, 3, 'centroid y lesson');
eq(24 * 2 / 3, 16, 'AG of 24'); ok(answer('G is the centroid of △ABC and median AM is 24') === '16', 'AG Q');
eq(7 * 3, 21, 'AM from GM 7'); ok(answer('G is the centroid of △ABC and GM = 7') === '21', 'AM Q');
ok(answer('What is the centroid of the triangle') === '(' + (1 + 7 + 4) / 3 + ', ' + (2 + 4 + 9) / 3 + ')', 'centroid Q');
var mx = solve(4, 6, 5, -3); eq(mx, 9, 'midsegment x'); eq(2 * 9 + 3, 21, 'midsegment'); eq(5 * 9 - 3, 42, 'third side'); eq(42 / 2, 21, 'half');
ok(answer('A midsegment of a triangle is 2x + 3') === '21', 'midsegment Q');
eq(48 + 67, 115, 'exterior 48 + 67');
var exx = solve(4, 2, 3, 32); eq(exx, 30, 'exterior x'); eq(4 * 30 + 2, 122, 'exterior'); eq((30 + 20) + (2 * 30 + 12), 122, 'remote sum');
ok(answer('An exterior angle of a triangle is (4x + 2)°') === '122°', 'exterior Q');
ok(!(6 + 4 > 10) && 6 + 5 > 10 && 6 + 9 > 10 && 6 + 10 > 15, 'third side 6 and 10');
ok(12 - 7 === 5 && 12 + 7 === 19, 'third side 7 and 12');
ok(answer('In △ABC, m∠A = 50°') === 'AB', 'longest side opposite largest angle');

/* ---------- Unit 5 ---------- */
// Diagram: top crossing (180, 50), bottom (120, 130), both on the line from (90, 170) to (210, 10)
function onT(x, y) { return Math.abs((y - 170) * (210 - 90) - (x - 90) * (10 - 170)) < 1e-9; }
ok(onT(180, 50) && onT(120, 130), 'transversal crossings are on the drawn line');
var ai = solve(5, -4, 3, 20); eq(ai, 12, 'alt interior x'); eq(5 * 12 - 4, 56, 'alt interior angle');
ok(answer('Alternate interior angles measure') === '12', 'alt int Q');
var ci = solve(6, 30, 0, 180); eq(ci, 25, 'co-interior x'); eq(2 * 25 + 10, 60, 'co-int 60'); eq(4 * 25 + 20, 120, 'co-int 120');
ok(answer('Co-interior angles measure') === '120°', 'co-int Q');
eq(180 - 65, 115, 'co-int 65'); ok(answer('Two parallel lines are cut by a transversal. One co-interior') === '115°', 'co-int 65 Q');
eq(-3 * 4 + 13, 1, 'parallel line through (4, 1)'); ok(answer('Which line goes through (4, 1)') === 'y = −3x + 13', 'parallel Q');
// 2x − 5y = 10 → slope 2/5; perpendicular −5/2 through (2, −3): b = −3 + 5 = 2
eq(2 / 5 * (-5 / 2), -1, 'perp slopes'); eq(-5 / 2 * 2 + 2, -3, 'perp line through (2, −3)');
eq(5 / 2 * 2 - 8, -3, 'distractor 1 passes'); eq(-2 / 5 * 2 - 11 / 5, -3, 'distractor 2 passes'); eq(2 / 5 * 2 - 19 / 5, -3, 'distractor 3 passes');
ok(answer('Which line goes through (2, −3)') === 'y = −(5/2)x + 2', 'perp Q');
eq(3 / 4 * (-4 / 3), -1, 'perp to 3/4');
var m1 = slope([-2, 1], [4, 5]); eq(m1, 2 / 3, 'perp bisector slope'); eq(-3 / 2 * 1 + 9 / 2, 3, 'perp bisector through (1, 3)');
eq(mid([-2, 1], [4, 5])[0], 1, 'perp bisector midpoint x'); eq(mid([-2, 1], [4, 5])[1], 3, 'perp bisector midpoint y');
// 4x − 2y = 6 → y = 2x − 3
eq((6 - 4 * 0) / -2, -3, 'y-intercept of 4x − 2y = 6'); eq(4 / 2, 2, 'slope of 4x − 2y = 6');

/* ---------- Unit 6 ---------- */
function sum(n) { return (n - 2) * 180; }
var table = data.units[5].sections.filter(function (s) { return s.id === 'u6-polygons'; })[0].table.rows;
table.forEach(function (r) {
  var n = Number(r[1]);
  eq(Number(r[2].replace('°', '')), sum(n), r[0] + ' sum');
  var inner = sum(n) / n, ext = 360 / n;
  eq(inner + ext, 180, r[0] + ' interior + exterior');
  var shownIn = parseFloat(r[3].replace('about ', '')), shownEx = parseFloat(r[4].replace('about ', ''));
  ok(Math.abs(shownIn - inner) < 0.005 && Math.abs(shownEx - ext) < 0.005, r[0] + ' each angle ' + inner + ', ' + ext);
  ok(/about/.test(r[3]) === (inner % 1 !== 0), r[0] + ' says “about” only when rounded');
});
eq(sum(12), 1800, 'dodecagon sum'); eq(10 * 180, 1800, 'dodecagon sum again'); ok(answer('What is the sum of the interior angles of a dodecagon') === '1800°', 'dodecagon Q');
eq(1800 / 12, 150, 'dodecagon each'); eq(180 - 360 / 12, 150, 'dodecagon each again'); ok(answer('What is each interior angle of a regular dodecagon') === '150°', 'dodecagon each Q');
eq(360 / 24, 15, 'exterior 24'); ok(answer('Each exterior angle of a regular polygon is 24°') === '15', 'ext 24 Q');
eq(360 / (180 - 140), 9, '140° interior'); eq(sum(9) / 9, 140, '140° check'); ok(answer('Each interior angle of a regular polygon is 140°') === '9', '140 Q');
eq(1440 / 180 + 2, 10, '1440 sum'); eq(sum(10), 1440, '1440 check'); ok(answer('The interior angles of a polygon add to 1440°') === '10', '1440 Q');
var rx = solve(3, 4, 5, -10); eq(rx, 7, 'rectangle x'); eq(3 * 7 + 4, 25, 'diagonal'); eq(5 * 7 - 10, 25, 'diagonal other');
ok(answer('In rectangle ABCD') === '25', 'rectangle Q');
var pg = solve(4, 40, 0, 180); eq(pg, 35, 'parallelogram x'); eq(3 * 35 + 10, 115, '115'); eq(35 + 30, 65, '65');
ok(answer('Two consecutive angles of a parallelogram') === '115°', 'parallelogram Q');
eq(solve(6, -12, 0, 90), 17, 'rhombus diagonals x');
var A = [0, 0], Bq = [4, 3], Cq = [7, -1], D = [3, -4];
eq(slope(A, Bq), 3 / 4, 'AB'); eq(slope(Bq, Cq), -4 / 3, 'BC'); eq(slope(Cq, D), 3 / 4, 'CD'); eq(slope(D, A), -4 / 3, 'DA');
[[A, Bq], [Bq, Cq], [Cq, D], [D, A]].forEach(function (s, i) { eq(dist(s[0], s[1]), 5, 'side ' + i + ' = 5'); });
eq(mid(A, Cq)[0], 3.5, 'diag mid x'); eq(mid(Bq, D)[0], 3.5, 'diag mid x 2'); eq(mid(A, Cq)[1], -0.5, 'diag mid y'); eq(mid(Bq, D)[1], -0.5, 'diag mid y 2');
eq(Math.pow(dist(A, Cq), 2), 50, 'AC² 50'); eq(Math.pow(dist(Bq, D), 2), 50, 'BD² 50'); eq(slope(A, Cq) * slope(Bq, D), -1, 'diagonals perpendicular');
ok(answer('What is the most specific name') === 'Square', 'square Q');
ok(2 * 5 - 10 === 0 && 2 * 95 - 10 === 180, 'restriction ends 5 and 95');
ok(answer('One angle of a parallelogram is (2x − 10)°') === '5 < x < 95', 'restriction Q');
eq(180 - 70, 110, 'trapezoid'); ok(answer('One base angle of an isosceles trapezoid') === '110°', 'trapezoid Q');
eq((10 + 18) / 2, 14, 'trapezoid midsegment'); ok(answer('A trapezoid has bases 10 and 18') === '14', 'trap midsegment Q');

/* ---------- Diagrams in the proofs: the midpoint really is the midpoint ---------- */
eq(mid([30, 30], [230, 140])[0], 130, 'proof 1 M x (AD)'); eq(mid([30, 140], [230, 30])[0], 130, 'proof 1 M x (BC)');
eq(mid([30, 30], [230, 140])[1], 85, 'proof 1 M y');
eq(slope([30, 140], [80, 30]), slope([180, 140], [230, 30]), 'proof 4 AB ∥ DC'); eq(80 - 30, 230 - 180, 'proof 4 same run');
eq(dist([30, 85], [130, 25]), dist([130, 25], [230, 85]), 'proof 5 rhombus AB = BC');
eq(dist([30, 85], [130, 145]), dist([230, 85], [130, 145]), 'proof 5 rhombus AD = CD');
eq(dist([130, 20], [30, 160]), dist([130, 20], [230, 160]), 'proof 2 AB = AC');

/* ---------- Drills: 3,000 of each, recomputed from the question text ---------- */
function rand(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
function nums(s) { return (s.replace(/−/g, '-').match(/-?\d+(\.\d+)?/g) || []).map(Number); }
var NAMES = { triangle: 3, quadrilateral: 4, pentagon: 5, hexagon: 6, heptagon: 7, octagon: 8, nonagon: 9, decagon: 10, dodecagon: 12 };
data.drills.forEach(function (d) {
  for (var i = 0; i < 3000; i++) {
    var p = d.make(rand), n = nums(p.q), want;
    ok(isFinite(p.answer) && p.answer % 0.5 === 0, d.tag + ': answer ' + p.answer + ' is whole');
    if (d.tag === 'Interior angle sum') want = (n[n.length - 1] - 2) * 180;
    else if (d.tag === 'Regular polygon angles') {
      var sides = n.length ? n[n.length - 1] : NAMES[(p.q.match(/regular (\w+)/) || [])[1]];
      want = /interior/.test(p.q) ? (sides - 2) * 180 / sides : 360 / sides;
    } else if (d.tag === 'Sides from an angle') want = 360 / (180 - n[0]);
    else if (d.tag === 'Slope') want = (n[3] - n[1]) / (n[2] - n[0]);
    else if (d.tag === 'Distance') want = Math.hypot(n[2] - n[0], n[3] - n[1]);
    else if (d.tag === 'Midpoint') want = /x-coordinate/.test(p.q) ? (n[0] + n[2]) / 2 : 2 * n[1] - n[3];
    else if (d.tag === 'Centroid') want = /What is AG/.test(p.q) ? n[0] * 2 / 3 : /What is GM/.test(p.q) ? n[0] / 3 : n[0] * 3;
    else if (d.tag === 'Midsegment') want = /third side/.test(p.q) ? n[0] / 2 : n[0] * 2;
    else if (d.tag === 'Exterior angle') want = n[0] + n[1];
    ok(Math.abs(p.answer - want) < 1e-9, d.tag + ': "' + p.q + '" answer ' + p.answer + ', recomputed ' + want);
    if (fails > 20) break;
  }
});

var counts = data.units.map(function (u, i) {
  return u.num + ': ' + data.questions.filter(function (x) { return x.u === i + 1; }).length + ' questions, ' + data.flashcards.filter(function (x) { return x.u === i + 1; }).length + ' cards';
});
console.log(counts.join('\n'));
console.log('Total: ' + data.questions.length + ' questions, ' + data.flashcards.length + ' flashcards, ' + proofs + ' proofs, ' + data.drills.length + ' drills');
console.log(checks + ' checks, ' + fails + ' failed');
process.exit(fails ? 1 : 0);
