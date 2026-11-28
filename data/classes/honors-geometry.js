// Honors Geometry: Semester 1 final (chapters 1–5).
// Same format as data/classes/_template.js and pe-health.js: units with sections,
// flashcards, questions, formulas and drills. Proofs and diagrams use "html".
// Transformations (reflections, rotations, translations) are not on this final, so they
// are left out on purpose.
// Every number in here is checked by a script before it goes on the site.
(function () {
  // A small diagram: segs are lines [x1, y1, x2, y2], dots are points [x, y],
  // labels are [text, x, y], boxes are right-angle marks [vertex x, vertex y, dx, dy].
  function fig(label, w, h, segs, labels, extra) {
    extra = extra || {};
    var s = '<svg role="img" aria-label="' + label + '" viewBox="0 0 ' + w + ' ' + h + '" style="display:block;width:100%;max-width:' + w + 'px;margin:14px 0">';
    segs.forEach(function (g) {
      s += '<line x1="' + g[0] + '" y1="' + g[1] + '" x2="' + g[2] + '" y2="' + g[3] + '" stroke="currentColor" stroke-width="' + (g[4] || 2.5) + '" />';
    });
    (extra.boxes || []).forEach(function (b) {
      s += '<path d="M' + b[0] + ' ' + (b[1] + b[3]) + 'L' + (b[0] + b[2]) + ' ' + (b[1] + b[3]) + 'L' + (b[0] + b[2]) + ' ' + b[1] + '" fill="none" stroke="currentColor" stroke-width="1.5" />';
    });
    (extra.dots || []).forEach(function (d) {
      s += '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="3.5" fill="currentColor" />';
    });
    labels.forEach(function (l) {
      s += '<text x="' + l[1] + '" y="' + l[2] + '" text-anchor="middle" font-size="' + (l[3] || 17) + '" font-weight="600" fill="currentColor">' + l[0] + '</text>';
    });
    return s + '</svg>';
  }

  // A two-column proof: statements on the left, reasons on the right.
  function proofTable(rows) {
    return '<table class="tbl stack"><thead><tr><th scope="col">#</th><th scope="col">Statement</th><th scope="col">Reason</th></tr></thead><tbody>' +
      rows.map(function (r, i) {
        return '<tr><th scope="row">' + (i + 1) + '</th><td data-label="Statement">' + r[0] + '</td><td data-label="Reason">' + r[1] + '</td></tr>';
      }).join('') + '</tbody></table>';
  }

  function proof(given, prove, picture, rows, tip) {
    return '<p><b>Given:</b> ' + given + '</p><p><b>Prove:</b> ' + prove + '</p>' + picture + proofTable(rows) +
      (tip ? '<p class="note" style="margin-top:12px">' + tip + '</p>' : '');
  }

  // Two parallel lines cut by a transversal, angles numbered 1 to 8.
  // Top crossing at (180, 50), bottom crossing at (120, 130). The transversal goes up to the right.
  var transversal = fig('Two parallel lines cut by a transversal, with angles 1 to 4 at the top crossing and 5 to 8 at the bottom crossing', 300, 180,
    [[10, 50, 290, 50], [10, 130, 290, 130], [90, 170, 210, 10]],
    [['1', 171, 37], ['2', 198, 46], ['3', 162, 64], ['4', 189, 73],
     ['5', 111, 117], ['6', 138, 126], ['7', 102, 144], ['8', 129, 153],
     ['ℓ', 280, 42, 16], ['m', 280, 122, 16], ['t', 214, 22, 16]]);

  var units = [
    /* ---------- 01 ---------- */
    {
      id: 'u1', num: '01', title: 'Lines, Equations and Coordinates', short: 'Ch. 1 Algebra',
      sections: [
        {
          id: 'u1-solve', title: 'Solving equations and inequalities',
          simple: "Get x by itself by undoing what was done to it, in reverse order. If you multiply or divide both sides by a negative, flip the < or > sign.",
          body: [
            'Undo the operations in reverse order. Distribute first, collect the variable on one side, then divide.',
            'Inequalities work the same way, with one rule: when you multiply or divide both sides by a negative number, flip the inequality sign.'
          ],
          list: [
            'Example: solve 3(x − 4) + 2 = 5x − 18.',
            'Step 1, distribute the 3: 3x − 12 + 2 = 5x − 18.',
            'Step 2, combine the plain numbers on the left: 3x − 10 = 5x − 18.',
            'Step 3, subtract 3x from both sides: −10 = 2x − 18.',
            'Step 4, add 18 to both sides: 8 = 2x.',
            'Step 5, divide both sides by 2: x = 4.',
            'Check: put 4 in for x. Left side: 3(4 − 4) + 2 = 3(0) + 2 = 2. Right side: 5(4) − 18 = 20 − 18 = 2. Both sides are 2, so x = 4 works.',
            'Example: solve −2x + 5 > 13.',
            'Step 1, subtract 5 from both sides: −2x > 8.',
            'Step 2, divide both sides by −2. Dividing by a negative flips the sign, so > becomes <: x < −4.',
            'Check: try x = −5 (it is less than −4). −2(−5) + 5 = 10 + 5 = 15, and 15 > 13. It works.'
          ]
        },
        {
          id: 'u1-lines', title: 'Slope and equations of lines',
          simple: "Slope means how steep a line is: up over across. In y = mx + b, m is the slope and b is where the line crosses the y-axis.",
          table: { head: ['Thing', 'Formula or rule'], rows: [
            ['Slope', 'm = (y₂ − y₁) / (x₂ − x₁)'],
            ['Slope-intercept form', 'y = mx + b (b is the y-intercept)'],
            ['Point-slope form', 'y − y₁ = m(x − x₁)'],
            ['Standard form', 'Ax + By = C'],
            ['Horizontal line', 'y = k, slope 0'],
            ['Vertical line', 'x = h, slope undefined']
          ] },
          list: [
            'Example: find the line through (2, −1) and (6, 7).',
            'Step 1, find the slope: (7 − (−1)) / (6 − 2) = 8 / 4 = 2.',
            'Step 2, use point-slope form with the point (2, −1): y + 1 = 2(x − 2).',
            'Step 3, distribute and solve for y: y + 1 = 2x − 4, so y = 2x − 5.',
            'Check with the other point (6, 7): 2(6) − 5 = 7. It works.'
          ]
        },
        {
          id: 'u1-systems', title: 'Systems of equations',
          simple: "Two lines, one answer: the point where they cross. Solve by plugging one equation into the other, or by adding them to cancel a letter.",
          body: ['Solve by substitution (replace one variable) or elimination (add or subtract the equations so one variable cancels).'],
          list: [
            'One solution: the lines cross (different slopes).',
            'No solution: the lines are parallel (same slope, different y-intercepts).',
            'Infinitely many solutions: the same line (same slope and same y-intercept).',
            'Example: solve 2x + y = 7 and x − y = 2.',
            'Step 1, add the two equations. The y terms cancel: 3x = 9, so x = 3.',
            'Step 2, put x = 3 into x − y = 2: 3 − y = 2, so y = 1.',
            'Check: 2(3) + 1 = 7 and 3 − 1 = 2. Both work. The answer is (3, 1).'
          ]
        },
        {
          id: 'u1-word', title: 'Word problems',
          simple: "Turn the sentence into an equation, solve for x, then answer in a full sentence with the right units.",
          body: ['Name the unknown, write an equation from the words, solve, then answer the question that was asked (with units).'],
          list: [
            'Example: Plan A costs $30 to join plus $12 a month. Plan B costs $18 a month with no fee. When do they cost the same?',
            'Step 1, set the two costs equal (m is the number of months): 30 + 12m = 18m.',
            'Step 2, subtract 12m from both sides: 30 = 6m.',
            'Step 3, divide by 6: m = 5 months.',
            'Check: Plan A is 30 + 12(5) = 90 and Plan B is 18(5) = 90. They match.'
          ]
        },
        {
          id: 'u1-coord', title: 'Midpoint and distance',
          simple: "Midpoint: average the two x's and average the two y's. Distance: the Pythagorean theorem on the across-gap and up-gap.",
          table: { head: ['Formula', 'What it is'], rows: [
            ['Midpoint', '((x₁ + x₂) / 2, (y₁ + y₂) / 2): average the x’s and average the y’s'],
            ['Distance', '√((x₂ − x₁)² + (y₂ − y₁)²): the Pythagorean theorem on the grid']
          ] },
          list: [
            'Example: A(−3, 4) and B(5, −2). Find the midpoint and the distance.',
            'Midpoint, average the x values and the y values: ((−3 + 5) / 2, (4 + (−2)) / 2) = (1, 1).',
            'Distance, step 1: the x change is 5 − (−3) = 8 and the y change is −2 − 4 = −6.',
            'Distance, step 2: √(8² + (−6)²) = √(64 + 36) = √100 = 10.',
            'Finding an endpoint: M(2, 3) is the midpoint of AB and A is (−1, 7). B = (2·2 − (−1), 2·3 − 7) = (5, −1). Check: ((−1 + 5) / 2, (7 + (−1)) / 2) = (2, 3).'
          ]
        },
        {
          id: 'u1-right', title: 'Is it a right triangle?',
          simple: "Find the three side lengths. If the two shorter ones squared add up to the longest one squared, it's a right triangle.",
          body: [
            'Way 1, slopes: if two sides have slopes that are opposite reciprocals (they multiply to −1), those sides are perpendicular, so the triangle has a right angle.',
            'Way 2, side lengths: find all three lengths. If a² + b² = c² (c is the longest side), it is a right triangle. If a² + b² > c² it is acute. If a² + b² < c² it is obtuse.'
          ],
          list: [
            'Example: A(1, 1), B(4, 5), C(8, 2). Is there a right angle at B?',
            'Step 1, slope of AB: (5 − 1) / (4 − 1) = 4/3.',
            'Step 2, slope of BC: (2 − 5) / (8 − 4) = −3/4.',
            'Step 3, multiply the slopes: (4/3)(−3/4) = −1.',
            'The product is −1, so AB ⊥ BC and there is a right angle at B.',
            'Same triangle by lengths: AB = √(9 + 16) = 5, BC = √(16 + 9) = 5, AC = √(49 + 1) = √50. 5² + 5² = 50 = (√50)², so it is a right triangle (an isosceles right triangle).',
            'Example: sides 7, 8 and 12. Is the triangle acute, right or obtuse?',
            'Step 1, is it a triangle? 7 + 8 = 15, and 15 > 12, so yes.',
            'Step 2, compare the squares of the two short sides with the square of the longest side: 7² + 8² = 49 + 64 = 113, and 12² = 144.',
            'Step 3: 113 < 144, so the triangle is obtuse.'
          ]
        }
      ]
    },

    /* ---------- 02 ---------- */
    {
      id: 'u2', num: '02', title: 'Intro to Proof', short: 'Ch. 2 Proof',
      sections: [
        {
          id: 'u2-ifthen', title: 'If-then statements',
          simple: "An if-then has an 'if' part (hypothesis) and a 'then' part (conclusion). The converse just swaps the two parts.",
          body: [
            'A conditional is “If p, then q.” p is the hypothesis, q is the conclusion.',
            'To write a sentence in if-then form, put the subject in the “if” part. “Vertical angles are congruent” becomes “If two angles are vertical angles, then they are congruent.”',
            'A counterexample is one case where the hypothesis is true and the conclusion is false. One counterexample proves a conditional is false.'
          ],
          table: { head: ['Name', 'Form', 'Same truth value as'], rows: [
            ['Conditional', 'If p, then q', 'Its contrapositive'],
            ['Converse', 'If q, then p', 'The inverse'],
            ['Inverse', 'If not p, then not q', 'The converse'],
            ['Contrapositive', 'If not q, then not p', 'The conditional']
          ] },
          list: [
            'Example: “If an angle measures 30°, then it is acute.” True.',
            'Converse: “If an angle is acute, then it measures 30°.” False. Counterexample: a 50° angle.',
            'Contrapositive: “If an angle is not acute, then it does not measure 30°.” True, like the original.'
          ]
        },
        {
          id: 'u2-defs', title: 'Definitions are reversible',
          simple: "A definition works both forward and backward, so you can use it either way in a proof (that's a biconditional).",
          body: [
            'A good definition works both ways: the conditional and its converse are both true. So a definition can be written with “if and only if” (a biconditional).',
            'Example: both of these are true:',
            '“If an angle is a right angle, then it measures 90°.”',
            '“If an angle measures 90°, then it is a right angle.”',
            'Put them together: an angle is a right angle if and only if it measures 90°.',
            'Theorems often are not reversible. “If two angles are vertical angles, then they are congruent” is true, but its converse is false (two congruent angles do not have to be vertical).'
          ],
          table: { head: ['Word', 'Definition'], rows: [
            ['Midpoint', 'The point that divides a segment into two congruent segments'],
            ['Segment bisector', 'A line, ray or segment that goes through the midpoint of a segment'],
            ['Angle bisector', 'A ray that divides an angle into two congruent angles'],
            ['Congruent', 'Same length (segments) or same measure (angles)'],
            ['Perpendicular', 'Lines that meet to form right angles'],
            ['Acute / right / obtuse / straight angle', 'Between 0° and 90° / exactly 90° / between 90° and 180° / exactly 180°'],
            ['Complementary angles', 'Two angles whose measures add to 90°'],
            ['Supplementary angles', 'Two angles whose measures add to 180°'],
            ['Linear pair', 'Two adjacent angles whose outer sides are opposite rays (they form a line)'],
            ['Vertical angles', 'Two nonadjacent angles formed by two intersecting lines (across from each other)']
          ] }
        },
        {
          id: 'u2-angles', title: 'Angle theorems (if-then form)',
          simple: "The angle facts rewritten as if-then rules, so you can list them as reasons in a proof.",
          list: [
            'Linear pair theorem: If two angles form a linear pair, then they are supplementary.',
            'Vertical angles theorem: If two angles are vertical angles, then they are congruent.',
            'Right angles: If two angles are right angles, then they are congruent.',
            'Congruent supplements: If two angles are supplementary to the same angle (or to congruent angles), then they are congruent.',
            'Congruent complements: If two angles are complementary to the same angle (or to congruent angles), then they are congruent.'
          ]
        },
        {
          id: 'u2-asn', title: 'Always, sometimes or never',
          simple: "Decide if something is true every time, only sometimes, or never. Finding one example where it fails makes it 'sometimes'.",
          body: ['Try a few examples. If you find one case where it is true and one where it is false, the answer is sometimes. If it can’t fail, always. If it can’t happen, never.'],
          table: { head: ['Statement', 'Answer', 'Why'], rows: [
            ['Vertical angles are congruent.', 'Always', 'Vertical angles theorem'],
            ['A linear pair is supplementary.', 'Always', 'The two angles make a straight line, 180°'],
            ['Two right angles are supplementary.', 'Always', '90° + 90° = 180°'],
            ['The supplement of an obtuse angle is acute.', 'Always', '180° minus more than 90° is less than 90°'],
            ['Two acute angles are complementary.', 'Sometimes', '30° and 60° are; 30° and 40° are not'],
            ['Complementary angles are adjacent.', 'Sometimes', 'They can share a side, or be apart'],
            ['Two supplementary angles are both acute.', 'Never', 'Two angles under 90° add to less than 180°'],
            ['Two obtuse angles are supplementary.', 'Never', 'Two angles over 90° add to more than 180°']
          ] }
        },
        {
          id: 'u2-algebra', title: 'Angle algebra',
          simple: "Set the angle expressions equal (or make them add to 90 or 180), solve for x, then plug x back in to get the angle.",
          list: [
            'An angle’s supplement is 3 times its complement. Find the angle. 180 − x = 3(90 − x) → 180 − x = 270 − 3x → 2x = 90 → x = 45°. Check: supplement 135°, complement 45°, and 3 · 45 = 135.',
            'Two angles form a linear pair: (3x + 10)° and (5x − 30)°. 8x − 20 = 180 → x = 25. The angles are 85° and 95° (85 + 95 = 180).',
            'Vertical angles: (4x − 7)° and (2x + 25)°. 4x − 7 = 2x + 25 → x = 16. Each angle is 57°.'
          ]
        },
        {
          id: 'u2-reasons', title: 'Reasons you can use',
          simple: "The list of facts, definitions, and theorems you're allowed to write in the 'reason' column of a proof.",
          table: { head: ['Reason', 'What it says'], rows: [
            ['Reflexive property', 'AB ≅ AB (anything is congruent to itself)'],
            ['Symmetric property', 'If AB ≅ CD, then CD ≅ AB'],
            ['Transitive property', 'If ∠1 ≅ ∠2 and ∠2 ≅ ∠3, then ∠1 ≅ ∠3'],
            ['Substitution', 'Replace something with something equal to it'],
            ['Addition / subtraction property', 'Add or subtract the same amount on both sides'],
            ['Segment addition postulate', 'If B is between A and C, then AB + BC = AC'],
            ['Angle addition postulate', 'If D is in the interior of ∠ABC, then m∠ABD + m∠DBC = m∠ABC']
          ] }
        }
      ]
    },

    /* ---------- 03 ---------- */
    {
      id: 'u3', num: '03', title: 'Congruent Triangle Proofs', short: 'Ch. 3 Congruence',
      sections: [
        {
          id: 'u3-cong', title: 'Congruent triangles and CPCTC',
          simple: "Congruent means same shape and same size. Once two triangles are congruent, every matching part is equal too — that's CPCTC.",
          body: [
            'Two triangles are congruent when all three pairs of sides and all three pairs of angles are congruent.',
            'The order of the letters matters. △ABC ≅ △DEF means A matches D, B matches E and C matches F. So AB ≅ DE, BC ≅ EF, AC ≅ DF, ∠A ≅ ∠D, ∠B ≅ ∠E and ∠C ≅ ∠F.',
            'CPCTC: Corresponding Parts of Congruent Triangles are Congruent. You can only use it after you have proved the triangles congruent.'
          ]
        },
        {
          id: 'u3-shortcuts', title: 'Ways to prove triangles congruent',
          simple: "Five shortcuts to prove two triangles congruent: SSS, SAS, ASA, AAS, HL. Match the right pieces and you're done.",
          table: { head: ['Shortcut', 'What you need'], rows: [
            ['SSS', 'All three pairs of sides congruent'],
            ['SAS', 'Two pairs of sides and the angle between them (the included angle)'],
            ['ASA', 'Two pairs of angles and the side between them (the included side)'],
            ['AAS', 'Two pairs of angles and a side that is not between them'],
            ['HL', 'Right triangles only: the hypotenuses and one pair of legs']
          ] },
          list: [
            'SSA (two sides and an angle that is not between them) does NOT prove triangles congruent.',
            'AAA does NOT prove triangles congruent. The triangles have the same shape but can be different sizes.'
          ]
        },
        {
          id: 'u3-isos', title: 'Isosceles triangles',
          simple: "A triangle with two equal sides also has two equal base angles, and it works in reverse too.",
          body: ['An isosceles triangle has two congruent sides (the legs). The third side is the base. The angles at the base are the base angles, and the angle between the legs is the vertex angle.'],
          list: [
            'Base angles theorem: If two sides of a triangle are congruent, then the angles opposite them are congruent.',
            'Converse: If two angles of a triangle are congruent, then the sides opposite them are congruent.',
            'If a triangle is equilateral, then it is equiangular (each angle is 60°). The converse is also true.',
            'Example: the vertex angle is 40°. The base angles are (180 − 40) / 2 = 70° each.',
            'Example: the base angles are (3x + 5)° and (5x − 21)°. Find the vertex angle.',
            'Step 1, base angles are equal, so set them equal: 3x + 5 = 5x − 21.',
            'Step 2, subtract 3x from both sides: 5 = 2x − 21.',
            'Step 3, add 21 to both sides: 26 = 2x, so x = 13.',
            'Step 4, each base angle is 3(13) + 5 = 44°.',
            'Step 5, the three angles add to 180°, so the vertex angle is 180 − 44 − 44 = 92°.'
          ]
        },
        {
          id: 'u3-layout', title: 'How to set up a two-column proof',
          simple: "Statements on the left, the reason for each on the right. Start from what you're given, end at what you're proving.",
          list: [
            'Write the Given and the Prove, and mark the diagram: matching tick marks for congruent sides, arcs for congruent angles.',
            'Statements go on the left, reasons on the right. Number every line. Every statement needs a reason.',
            'Start with the givens (reason: Given). Then turn each given into what it means: a midpoint gives congruent segments, a bisector gives congruent angles, perpendicular gives right angles.',
            'Look for free parts: a shared side (Reflexive property) and vertical angles (Vertical angles are congruent).',
            'Get three parts for one triangle shortcut (SSS, SAS, ASA, AAS or HL), with the letters in the same order in both triangles.',
            'If you need to prove sides or angles congruent, prove the triangles congruent first, then use CPCTC.'
          ]
        },
        {
          id: 'u3-proof1', title: 'Proof practice 1: SAS with a midpoint',
          simple: "A worked proof: a midpoint makes two equal pieces, so you line up side-angle-side (SAS) to show the triangles are congruent.",
          html: proof('M is the midpoint of AD and M is the midpoint of BC.', 'AB ≅ DC',
            fig('Segments AD and BC cross at M, making triangle AMB on the left and triangle DMC on the right', 260, 170,
              [[30, 30, 230, 140], [30, 140, 230, 30], [30, 30, 30, 140], [230, 30, 230, 140]],
              [['A', 18, 26], ['B', 18, 152], ['C', 243, 26], ['D', 243, 152], ['M', 130, 66]],
              { dots: [[130, 85]] }),
            [['M is the midpoint of AD', 'Given'],
             ['AM ≅ MD', 'Definition of midpoint'],
             ['M is the midpoint of BC', 'Given'],
             ['BM ≅ MC', 'Definition of midpoint'],
             ['∠AMB ≅ ∠DMC', 'Vertical angles are congruent'],
             ['△AMB ≅ △DMC', 'SAS (lines 2, 5, 4)'],
             ['AB ≅ DC', 'CPCTC']],
            'The angle in SAS has to be between the two sides. ∠AMB is between AM and MB, and ∠DMC is between DM and MC.')
        },
        {
          id: 'u3-proof2', title: 'Proof practice 2: isosceles triangle',
          simple: "A worked proof that uses an isosceles triangle's equal sides (or equal base angles).",
          html: proof('AB ≅ AC and AD bisects ∠BAC (D is on BC).', 'BD ≅ CD',
            fig('Isosceles triangle ABC with A at the top and a segment from A down to D on the base BC', 260, 180,
              [[130, 20, 30, 160], [130, 20, 230, 160], [30, 160, 230, 160], [130, 20, 130, 160]],
              [['A', 130, 14], ['B', 18, 172], ['C', 242, 172], ['D', 130, 177]]),
            [['AB ≅ AC', 'Given'],
             ['AD bisects ∠BAC', 'Given'],
             ['∠BAD ≅ ∠CAD', 'Definition of angle bisector'],
             ['AD ≅ AD', 'Reflexive property'],
             ['△BAD ≅ △CAD', 'SAS'],
             ['BD ≅ CD', 'CPCTC']],
            'With CPCTC you could also prove ∠B ≅ ∠C, which is the base angles theorem.')
        },
        {
          id: 'u3-proof3', title: 'Proof practice 3: HL',
          simple: "A worked right-triangle proof using HL: the right angle, the hypotenuse, and one leg.",
          html: proof('AB ⊥ BC, DC ⊥ BC and AC ≅ DB.', 'AB ≅ DC',
            fig('Points A and D above B and C, with right angles at B and C and diagonals AC and DB crossing', 260, 170,
              [[40, 30, 40, 140], [220, 30, 220, 140], [40, 140, 220, 140], [40, 30, 220, 140], [220, 30, 40, 140]],
              [['A', 40, 22], ['D', 220, 22], ['B', 30, 160], ['C', 230, 160]],
              { boxes: [[40, 140, 12, -12], [220, 140, -12, -12]] }),
            [['AB ⊥ BC and DC ⊥ BC', 'Given'],
             ['∠ABC and ∠DCB are right angles', 'Definition of perpendicular'],
             ['△ABC and △DCB are right triangles', 'Definition of right triangle'],
             ['AC ≅ DB', 'Given'],
             ['BC ≅ CB', 'Reflexive property'],
             ['△ABC ≅ △DCB', 'HL'],
             ['AB ≅ DC', 'CPCTC']],
            'HL needs right triangles first, so say they are right triangles before you use it. AC and DB are the hypotenuses, and BC is a shared leg.')
        }
      ]
    },

    /* ---------- 04 ---------- */
    {
      id: 'u4', num: '04', title: 'Triangle and Line Properties', short: 'Ch. 4 Triangles',
      sections: [
        {
          id: 'u4-bisectors', title: 'Perpendicular bisectors and angle bisectors',
          simple: "A perpendicular bisector cuts a segment in half at 90 degrees and stays the same distance from both ends. An angle bisector splits an angle into two equal angles.",
          list: [
            'Perpendicular bisector theorem: If a point is on the perpendicular bisector of a segment, then it is equidistant from the endpoints of the segment.',
            'Converse: If a point is equidistant from the endpoints of a segment, then it is on the perpendicular bisector of the segment.',
            'Angle bisector theorem: If a point is on the bisector of an angle, then it is equidistant from the sides of the angle (distance is measured along a perpendicular).',
            'Converse: If a point inside an angle is equidistant from the sides of the angle, then it is on the angle bisector.',
            'Example: P is on the perpendicular bisector of AB. PA = 3x + 1 and PB = 5x − 7. Find PA.',
            'Step 1, points on a perpendicular bisector are the same distance from both ends, so PA = PB: 3x + 1 = 5x − 7.',
            'Step 2, subtract 3x from both sides: 1 = 2x − 7.',
            'Step 3, add 7 to both sides: 8 = 2x, so x = 4.',
            'Step 4, PA = 3(4) + 1 = 13. Check: PB = 5(4) − 7 = 13.'
          ]
        },
        {
          id: 'u4-centers', title: 'The four centers of a triangle',
          simple: "Four special points, each made by crossing a different set of lines: circumcenter, incenter, centroid, orthocenter. Drag the triangle below to see the circumcenter move.",
          table: { head: ['Center', 'Where these meet', 'Special fact', 'Acute', 'Right', 'Obtuse'], rows: [
            ['Circumcenter', 'Perpendicular bisectors of the sides', 'Equidistant from the 3 vertices (center of the circle through the vertices)', 'Inside', 'On the triangle, at the midpoint of the hypotenuse', 'Outside'],
            ['Incenter', 'Angle bisectors', 'Equidistant from the 3 sides (center of the circle inside that touches each side)', 'Inside', 'Inside', 'Inside'],
            ['Centroid', 'Medians', 'Balance point; 2:1 on each median', 'Inside', 'Inside', 'Inside'],
            ['Orthocenter', 'Altitudes (or the lines that contain them)', 'No distance fact', 'Inside', 'On the triangle, at the right-angle vertex', 'Outside']
          ] },
          list: [
            'Memory trick: Perpendicular Bisectors → Circumcenter. Angle Bisectors → Incenter. Medians → Centroid. Altitudes → Orthocenter.',
            'The incenter and the centroid are always inside. The circumcenter and orthocenter move: inside (acute), on (right), outside (obtuse).'
          ]
        },
        {
          id: 'u4-medians', title: 'Medians, altitudes and the centroid',
          simple: "A median runs from a corner to the middle of the opposite side; the three medians meet at the centroid, the balance point. An altitude is the straight-down height.",
          list: [
            'Median: a segment from a vertex to the midpoint of the opposite side.',
            'Altitude: a segment from a vertex perpendicular to the line that contains the opposite side.',
            'Centroid theorem: If G is the centroid, then G is 2/3 of the way from each vertex to the midpoint of the opposite side. Vertex to centroid : centroid to midpoint = 2 : 1.',
            'Example: median AM = 18. AG = (2/3)(18) = 12 and GM = (1/3)(18) = 6.',
            'Example: GM = 5. AG = 2 · 5 = 10 and the whole median AM = 15.',
            'Centroid on a grid: average the three vertices. A(−2, 5), B(4, −1), C(7, 5): ((−2 + 4 + 7) / 3, (5 + (−1) + 5) / 3) = (9/3, 9/3) = (3, 3).'
          ]
        },
        {
          id: 'u4-midsegment', title: 'Midsegment theorem',
          simple: "A segment joining the middles of two sides is parallel to the third side and exactly half as long.",
          list: [
            'Midsegment: a segment that joins the midpoints of two sides of a triangle.',
            'Midsegment theorem: If a segment joins the midpoints of two sides of a triangle, then it is parallel to the third side and half as long.',
            'Example: the third side is 22, so the midsegment is 11.',
            'Example: the midsegment is 2x + 3 and the third side is 5x − 3. Find both.',
            'Step 1, the midsegment is half of the third side, so 2 times the midsegment equals the third side: 2(2x + 3) = 5x − 3.',
            'Step 2, distribute the 2: 4x + 6 = 5x − 3.',
            'Step 3, subtract 4x from both sides: 6 = x − 3, so x = 9.',
            'Step 4, the midsegment is 2(9) + 3 = 21 and the third side is 5(9) − 3 = 42. Check: 21 is half of 42.'
          ]
        },
        {
          id: 'u4-angles', title: 'Angle sum and exterior angles',
          simple: "The three angles inside a triangle add up to 180 degrees. An outside (exterior) angle equals the two far inside angles added together.",
          list: [
            'Triangle angle sum: the three angles of a triangle add to 180°.',
            'Exterior angle theorem: If an angle is an exterior angle of a triangle, then its measure equals the sum of the two remote (non-adjacent) interior angles.',
            'An exterior angle is also bigger than either remote interior angle.',
            'Example: remote interior angles 48° and 67°. Exterior angle = 48 + 67 = 115°.',
            'Example: the exterior angle is (4x + 2)° and the remote interior angles are (x + 20)° and (2x + 12)°. Find the exterior angle.',
            'Step 1, the exterior angle equals the sum of the two remote interior angles: 4x + 2 = (x + 20) + (2x + 12).',
            'Step 2, combine on the right: 4x + 2 = 3x + 32.',
            'Step 3, subtract 3x from both sides: x + 2 = 32, so x = 30.',
            'Step 4, the exterior angle is 4(30) + 2 = 122°. Check: the remote angles are 50° and 72°, and 50 + 72 = 122.'
          ]
        },
        {
          id: 'u4-inequality', title: 'Triangle inequality and ordering',
          simple: "Any two sides have to add up to more than the third side. The biggest angle is always across from the longest side.",
          list: [
            'Triangle inequality: the sum of any two sides is greater than the third side.',
            'The third side must be between the difference and the sum of the other two: sides 7 and 12 → 12 − 7 < x < 12 + 7, so 5 < x < 19.',
            'If one side of a triangle is longer than another, then the angle opposite the longer side is larger. The converse is also true: the larger angle is opposite the longer side.',
            'Example: AB = 8, BC = 11 and AC = 6. Put the angles in order from smallest to largest.',
            'The biggest angle is opposite the longest side. The longest side is BC, which is opposite ∠A, so ∠A is largest.',
            'The smallest angle is opposite the shortest side. The shortest side is AC, which is opposite ∠B, so ∠B is smallest.',
            'That leaves ∠C in the middle. Smallest to largest: ∠B, ∠C, ∠A.',
            'Example: m∠A = 50°, m∠B = 60°, m∠C = 70°. Shortest to longest side: BC (opposite ∠A), AC (opposite ∠B), AB (opposite ∠C).'
          ]
        }
      ]
    },

    /* ---------- 05 ---------- */
    {
      id: 'u5', num: '05', title: 'Parallel Lines', short: 'Ch. 5 Parallel',
      sections: [
        {
          id: 'u5-pairs', title: 'Angle pairs with a transversal',
          simple: "When one line crosses two parallel lines it makes angle pairs — corresponding, alternate, and same-side. Tap the figure below to see which ones are equal.",
          html: '<p>A transversal is a line that crosses two or more lines. Below, lines ℓ and m are cut by transversal t.</p>' + transversal +
            '<table class="tbl stack"><thead><tr><th scope="col">Pair</th><th scope="col">Examples</th><th scope="col">If ℓ ∥ m</th></tr></thead><tbody>' +
            '<tr><th scope="row">Corresponding</th><td data-label="Examples">∠1 and ∠5, ∠2 and ∠6, ∠3 and ∠7, ∠4 and ∠8 (same spot at each crossing)</td><td data-label="If ℓ ∥ m">Congruent</td></tr>' +
            '<tr><th scope="row">Alternate interior</th><td data-label="Examples">∠3 and ∠6, ∠4 and ∠5 (between the lines, opposite sides of t)</td><td data-label="If ℓ ∥ m">Congruent</td></tr>' +
            '<tr><th scope="row">Alternate exterior</th><td data-label="Examples">∠1 and ∠8, ∠2 and ∠7 (outside the lines, opposite sides of t)</td><td data-label="If ℓ ∥ m">Congruent</td></tr>' +
            '<tr><th scope="row">Co-interior (same-side interior)</th><td data-label="Examples">∠3 and ∠5, ∠4 and ∠6 (between the lines, same side of t)</td><td data-label="If ℓ ∥ m">Supplementary (add to 180°)</td></tr>' +
            '<tr><th scope="row">Vertical</th><td data-label="Examples">∠1 and ∠4, ∠2 and ∠3, ∠5 and ∠8, ∠6 and ∠7</td><td data-label="If ℓ ∥ m">Congruent (even if the lines are not parallel)</td></tr>' +
            '</tbody></table>' +
            '<p style="margin-top:12px">Example: ℓ ∥ m and m∠1 = 120°. Find the other angles.<br>∠4 = 120° (vertical with ∠1).<br>∠2 and ∠3 = 60° each (they form a linear pair with ∠1, and 180 − 120 = 60).<br>∠5 = 120° (corresponding to ∠1).<br>∠8 = 120° (alternate exterior with ∠1).<br>∠6 and ∠7 = 60° each.</p>'
        },
        {
          id: 'u5-theorems', title: 'Parallel line theorems (if-then form)',
          simple: "If the lines are parallel, then those angle pairs are equal (or add to 180) — written out as if-then rules.",
          list: [
            'If two parallel lines are cut by a transversal, then corresponding angles are congruent.',
            'If two parallel lines are cut by a transversal, then alternate interior angles are congruent.',
            'If two parallel lines are cut by a transversal, then alternate exterior angles are congruent.',
            'If two parallel lines are cut by a transversal, then co-interior (same-side interior) angles are supplementary.',
            'Parallel postulate: through a point not on a line, there is exactly one line parallel to the given line.'
          ]
        },
        {
          id: 'u5-proving', title: 'Proving lines are parallel',
          simple: "Run the rules backward: if a matching angle pair is equal, then the two lines must be parallel.",
          body: ['Use the converses. Each one starts with the angles and ends with “the lines are parallel.”'],
          list: [
            'If two lines are cut by a transversal so that corresponding angles are congruent, then the lines are parallel.',
            'If alternate interior angles are congruent, then the lines are parallel.',
            'If alternate exterior angles are congruent, then the lines are parallel.',
            'If co-interior angles are supplementary, then the lines are parallel.',
            'If two lines (in a plane) are perpendicular to the same line, then they are parallel.',
            'If two lines are parallel to the same line, then they are parallel to each other.',
            'Example: alternate interior angles are (5x − 4)° and (3x + 20)°. Find x so the lines are parallel.',
            'Step 1, for parallel lines these angles are equal: 5x − 4 = 3x + 20.',
            'Step 2, subtract 3x from both sides: 2x − 4 = 20.',
            'Step 3, add 4 to both sides: 2x = 24, so x = 12.',
            'Check: 5(12) − 4 = 56 and 3(12) + 20 = 56. Both angles are 56°.',
            'Example: co-interior angles are (2x + 10)° and (4x + 20)°. Find x so the lines are parallel.',
            'Step 1, for parallel lines these angles add to 180°: (2x + 10) + (4x + 20) = 180.',
            'Step 2, combine like terms: 6x + 30 = 180.',
            'Step 3, subtract 30 from both sides: 6x = 150, so x = 25.',
            'Check: the angles are 2(25) + 10 = 60° and 4(25) + 20 = 120°. 60 + 120 = 180.'
          ]
        },
        {
          id: 'u5-slopes', title: 'Slopes of parallel and perpendicular lines',
          simple: "Parallel lines have the same slope. Perpendicular lines have slopes that are negative flips of each other, like 2 and -1/2.",
          list: [
            'Parallel lines have the same slope (and different y-intercepts).',
            'Perpendicular lines have slopes that are opposite reciprocals: their product is −1. (A horizontal and a vertical line are also perpendicular.)',
            'Example: find the line through (4, 1) that is parallel to y = −3x + 7.',
            'Step 1, parallel lines have the same slope, so the slope is −3.',
            'Step 2, point-slope form with the point (4, 1): y − 1 = −3(x − 4).',
            'Step 3, distribute and solve for y: y − 1 = −3x + 12, so y = −3x + 13.',
            'Check: put x = 4 in. −3(4) + 13 = −12 + 13 = 1. That matches the point (4, 1).',
            'Example: find the line through (2, −3) that is perpendicular to 2x − 5y = 10.',
            'Step 1, solve 2x − 5y = 10 for y: y = (2/5)x − 2. Its slope is 2/5.',
            'Step 2, flip the fraction and change the sign: the perpendicular slope is −5/2.',
            'Step 3, point-slope form with the point (2, −3): y + 3 = −(5/2)(x − 2).',
            'Step 4, distribute and solve for y: y + 3 = −(5/2)x + 5, so y = −(5/2)x + 2.',
            'Check: put x = 2 in. −(5/2)(2) + 2 = −5 + 2 = −3. That matches the point (2, −3).',
            'Example: find the perpendicular bisector of A(−2, 1) and B(4, 5). It goes through the midpoint of AB at a right angle.',
            'Step 1, midpoint: ((−2 + 4) / 2, (1 + 5) / 2) = (1, 3).',
            'Step 2, slope of AB: (5 − 1) / (4 − (−2)) = 4/6 = 2/3.',
            'Step 3, the perpendicular slope is the opposite reciprocal: −3/2.',
            'Step 4, point-slope form with the midpoint (1, 3): y − 3 = −(3/2)(x − 1).',
            'Step 5, distribute and solve for y: y = −(3/2)x + 3/2 + 3 = −(3/2)x + 9/2.'
          ]
        }
      ]
    },

    /* ---------- 06 ---------- */
    {
      id: 'u6', num: '06', title: 'Quadrilaterals and Polygons', short: 'Ch. 5 Quads',
      sections: [
        {
          id: 'u6-props', title: 'Properties of each quadrilateral',
          simple: "What's true for each four-sided shape — parallelogram, rectangle, rhombus, square, trapezoid, kite — for its sides, angles, and diagonals.",
          table: { head: ['Shape', 'Definition', 'Properties'], rows: [
            ['Parallelogram', 'Both pairs of opposite sides parallel', 'Opposite sides congruent. Opposite angles congruent. Consecutive angles supplementary. Diagonals bisect each other.'],
            ['Rectangle', 'A parallelogram with four right angles', 'Everything a parallelogram has, plus congruent diagonals.'],
            ['Rhombus', 'A parallelogram with four congruent sides', 'Everything a parallelogram has, plus perpendicular diagonals, and each diagonal bisects a pair of opposite angles.'],
            ['Square', 'A parallelogram that is both a rectangle and a rhombus', 'Everything a rectangle and a rhombus have.'],
            ['Kite', 'Two pairs of consecutive sides congruent (and opposite sides not congruent)', 'Diagonals perpendicular. One diagonal is the perpendicular bisector of the other. One pair of opposite angles congruent (the angles between the sides that are not congruent).'],
            ['Trapezoid', 'Exactly one pair of parallel sides (the bases)', 'Midsegment is parallel to the bases and its length is (base₁ + base₂) / 2.'],
            ['Isosceles trapezoid', 'A trapezoid with congruent legs', 'Each pair of base angles congruent. Diagonals congruent.']
          ] },
          list: [
            'Some books define a trapezoid as having at least one pair of parallel sides. Go by your class notes.'
          ]
        },
        {
          id: 'u6-proving', title: 'How to prove each one',
          simple: "Which facts you have to show to call a shape a parallelogram, a rectangle, a rhombus, and so on.",
          table: { head: ['To prove it is a…', 'Show any one of these'], rows: [
            ['Parallelogram', 'Both pairs of opposite sides parallel; both pairs of opposite sides congruent; one pair of opposite sides both parallel and congruent; the diagonals bisect each other; both pairs of opposite angles congruent'],
            ['Rectangle', 'A parallelogram with one right angle; a parallelogram with congruent diagonals'],
            ['Rhombus', 'All four sides congruent; a parallelogram with two consecutive sides congruent; a parallelogram with perpendicular diagonals; a parallelogram where a diagonal bisects two angles'],
            ['Square', 'A rectangle that is also a rhombus (for example, a rectangle with two consecutive sides congruent)'],
            ['Kite', 'Two pairs of consecutive sides congruent (opposite sides not congruent)'],
            ['Isosceles trapezoid', 'A trapezoid with congruent legs, congruent base angles, or congruent diagonals']
          ] }
        },
        {
          id: 'u6-coord', title: 'Quadrilaterals on a grid',
          simple: "Use slope, distance, and midpoint on the corner points to prove what kind of quadrilateral it is.",
          body: [
            'Use only the given points. Slope tells you parallel (same slope) and perpendicular (product −1). Distance tells you congruent sides. Midpoints tell you if diagonals bisect each other.',
            'Then name the most specific shape that fits.'
          ],
          list: [
            'Example: A(0, 0), B(4, 3), C(7, −1), D(3, −4).',
            'Slopes: AB = 3/4, BC = −4/3, CD = 3/4, DA = −4/3. Opposite sides are parallel, so ABCD is a parallelogram.',
            'Slope AB times slope BC = (3/4)(−4/3) = −1, so there is a right angle: a rectangle.',
            'Lengths: AB = √(16 + 9) = 5 and BC = √(9 + 16) = 5. Consecutive sides are congruent, so it is also a rhombus. Most specific name: square.',
            'Check: the diagonals AC and BD both have midpoint (3.5, −0.5), both are √50 long, and their slopes −1/7 and 7 multiply to −1.'
          ]
        },
        {
          id: 'u6-algebra', title: 'Algebra and restrictions on x',
          simple: "Set equal sides or equal angles equal to each other, solve for x, and throw out any answer that makes a length zero or negative.",
          list: [
            'Parallelogram, consecutive angles (3x + 10)° and (x + 30)°: they are supplementary, so 4x + 40 = 180 → x = 35. The angles are 115° and 65°.',
            'Rectangle, diagonals AC = 3x + 4 and BD = 5x − 10: the diagonals are congruent, so 3x + 4 = 5x − 10 → x = 7, and each diagonal is 25.',
            'Rhombus, the diagonals meet at an angle of (6x − 12)°: they are perpendicular, so 6x − 12 = 90 → x = 17.',
            'Restrictions: a length must be greater than 0, and an angle of a polygon must be between 0° and 180°.',
            'Example: a side is 2x − 6, so 2x − 6 > 0 → x > 3.',
            'Example: an angle of a parallelogram is (2x − 10)°. Find the possible values of x.',
            'An angle must be more than 0° and less than 180°: 0 < 2x − 10 < 180.',
            'Step 1, add 10 to all three parts: 10 < 2x < 190.',
            'Step 2, divide all three parts by 2: 5 < x < 95.'
          ]
        },
        {
          id: 'u6-polygons', title: 'Polygon angles',
          simple: "The inside angles of a shape add up to (n - 2) x 180. All the outside angles together always add up to 360.",
          table: { head: ['Polygon', 'Sides', 'Interior angle sum', 'Each interior angle (regular)', 'Each exterior angle (regular)'], rows: [
            ['Triangle', '3', '180°', '60°', '120°'],
            ['Quadrilateral', '4', '360°', '90°', '90°'],
            ['Pentagon', '5', '540°', '108°', '72°'],
            ['Hexagon', '6', '720°', '120°', '60°'],
            ['Heptagon', '7', '900°', 'about 128.57°', 'about 51.43°'],
            ['Octagon', '8', '1080°', '135°', '45°'],
            ['Nonagon', '9', '1260°', '140°', '40°'],
            ['Decagon', '10', '1440°', '144°', '36°'],
            ['Dodecagon', '12', '1800°', '150°', '30°']
          ] },
          list: [
            'Interior angle sum: (n − 2) · 180°.',
            'Each interior angle of a regular polygon: (n − 2) · 180° / n.',
            'Exterior angles (one at each vertex) always add to 360°. Each exterior angle of a regular polygon: 360° / n.',
            'An interior angle and its exterior angle add to 180°.',
            'Example: each interior angle of a regular polygon is 140°. How many sides does it have?',
            'Step 1, each exterior angle is 180 − 140 = 40°.',
            'Step 2, the exterior angles add to 360°, so n = 360 / 40 = 9 sides.',
            'Example: the interior angles of a polygon add to 1440°. How many sides does it have?',
            'Step 1, use the sum formula: (n − 2) · 180 = 1440.',
            'Step 2, divide both sides by 180: n − 2 = 8.',
            'Step 3, add 2 to both sides: n = 10 sides.'
          ]
        },
        {
          id: 'u6-proof4', title: 'Proof practice 4: parallelogram',
          simple: "A worked proof showing a shape is a parallelogram (both pairs of opposite sides parallel or equal).",
          html: proof('ABCD is a parallelogram with diagonal AC.', '△ABC ≅ △CDA, so AB ≅ CD',
            fig('Parallelogram ABCD with A at the bottom left, B at the top left, C at the top right, D at the bottom right, and diagonal AC', 260, 170,
              [[30, 140, 80, 30], [80, 30, 230, 30], [230, 30, 180, 140], [180, 140, 30, 140], [30, 140, 230, 30]],
              [['A', 20, 158], ['B', 72, 22], ['C', 240, 22], ['D', 188, 158]]),
            [['ABCD is a parallelogram', 'Given'],
             ['AB ∥ DC and AD ∥ BC', 'Definition of parallelogram'],
             ['∠BAC ≅ ∠DCA', 'If two parallel lines are cut by a transversal, then alternate interior angles are congruent (AB ∥ DC)'],
             ['∠BCA ≅ ∠DAC', 'If two parallel lines are cut by a transversal, then alternate interior angles are congruent (AD ∥ BC)'],
             ['AC ≅ CA', 'Reflexive property'],
             ['△ABC ≅ △CDA', 'ASA (lines 3, 5, 4)'],
             ['AB ≅ CD', 'CPCTC']],
            'This proof shows why opposite sides of a parallelogram are congruent. The side in ASA, AC, is between the two angles in each triangle.')
        },
        {
          id: 'u6-proof5', title: 'Proof practice 5: rhombus',
          simple: "A worked proof using rhombus facts: four equal sides and diagonals that cross at right angles.",
          html: proof('ABCD is a rhombus with diagonal AC.', 'AC bisects ∠BAD',
            fig('Rhombus ABCD with A on the left, B at the top, C on the right, D at the bottom, and diagonal AC', 260, 170,
              [[30, 85, 130, 25], [130, 25, 230, 85], [230, 85, 130, 145], [130, 145, 30, 85], [30, 85, 230, 85]],
              [['A', 16, 91], ['B', 130, 17], ['C', 244, 91], ['D', 130, 163]]),
            [['ABCD is a rhombus', 'Given'],
             ['AB ≅ AD and CB ≅ CD', 'Definition of rhombus (four congruent sides)'],
             ['AC ≅ AC', 'Reflexive property'],
             ['△ABC ≅ △ADC', 'SSS'],
             ['∠BAC ≅ ∠DAC', 'CPCTC'],
             ['AC bisects ∠BAD', 'Definition of angle bisector']],
            'The same steps with CPCTC on ∠BCA and ∠DCA show that AC also bisects ∠BCD.')
        }
      ]
    }
  ];

  var flashcards = [
    // 01
    { u: 1, front: 'Slope formula', back: 'm = (y₂ − y₁) / (x₂ − x₁)' },
    { u: 1, front: 'Slope of a horizontal line / a vertical line', back: 'Horizontal: 0. Vertical: undefined.' },
    { u: 1, front: 'Point-slope form', back: 'y − y₁ = m(x − x₁)' },
    { u: 1, front: 'Midpoint formula', back: '((x₁ + x₂) / 2, (y₁ + y₂) / 2)' },
    { u: 1, front: 'Distance formula', back: '√((x₂ − x₁)² + (y₂ − y₁)²)' },
    { u: 1, front: 'Converse of the Pythagorean theorem', back: 'If a² + b² = c² (c the longest side), then the triangle is a right triangle.' },
    { u: 1, front: 'Acute or obtuse by side lengths', back: 'If a² + b² > c², then the triangle is acute. If a² + b² < c², then it is obtuse. (c is the longest side.)' },
    { u: 1, front: 'Right triangle by slopes', back: 'If two sides have slopes that multiply to −1, then they are perpendicular and the triangle has a right angle.' },
    { u: 1, front: 'Multiplying or dividing an inequality by a negative', back: 'Flip the inequality sign.' },
    { u: 1, front: 'A system with no solution / infinitely many solutions', back: 'No solution: parallel lines (same slope, different intercept). Infinitely many: the same line.' },
    // 02
    { u: 2, front: 'Converse', back: 'Switch the hypothesis and conclusion: “If q, then p.”' },
    { u: 2, front: 'Inverse', back: 'Negate both parts: “If not p, then not q.”' },
    { u: 2, front: 'Contrapositive', back: 'Switch and negate: “If not q, then not p.” Always has the same truth value as the conditional.' },
    { u: 2, front: 'Counterexample', back: 'One case where the hypothesis is true and the conclusion is false. It proves a conditional is false.' },
    { u: 2, front: 'Why are definitions reversible?', back: 'A definition’s conditional and its converse are both true, so it can be written as “if and only if.”' },
    { u: 2, front: 'Complementary angles (if-then)', back: 'If two angles are complementary, then their measures add to 90°.' },
    { u: 2, front: 'Supplementary angles (if-then)', back: 'If two angles are supplementary, then their measures add to 180°.' },
    { u: 2, front: 'Linear pair theorem', back: 'If two angles form a linear pair, then they are supplementary.' },
    { u: 2, front: 'Vertical angles theorem', back: 'If two angles are vertical angles, then they are congruent.' },
    { u: 2, front: 'Congruent supplements theorem', back: 'If two angles are supplementary to the same angle (or to congruent angles), then they are congruent.' },
    { u: 2, front: 'Congruent complements theorem', back: 'If two angles are complementary to the same angle (or to congruent angles), then they are congruent.' },
    { u: 2, front: 'Definition of midpoint (if-then)', back: 'If M is the midpoint of AB, then AM ≅ MB.' },
    { u: 2, front: 'Definition of angle bisector (if-then)', back: 'If a ray bisects an angle, then it divides it into two congruent angles.' },
    { u: 2, front: 'Right angles theorem', back: 'If two angles are right angles, then they are congruent.' },
    // 03
    { u: 3, front: 'CPCTC', back: 'Corresponding Parts of Congruent Triangles are Congruent. Use it only after proving the triangles congruent.' },
    { u: 3, front: 'SSS', back: 'If three sides of one triangle are congruent to three sides of another, then the triangles are congruent.' },
    { u: 3, front: 'SAS', back: 'If two sides and the included angle of one triangle are congruent to two sides and the included angle of another, then the triangles are congruent.' },
    { u: 3, front: 'ASA', back: 'If two angles and the included side of one triangle are congruent to two angles and the included side of another, then the triangles are congruent.' },
    { u: 3, front: 'AAS', back: 'If two angles and a non-included side of one triangle are congruent to two angles and the matching non-included side of another, then the triangles are congruent.' },
    { u: 3, front: 'HL', back: 'If the hypotenuse and a leg of one right triangle are congruent to the hypotenuse and a leg of another right triangle, then the triangles are congruent.' },
    { u: 3, front: 'Which do NOT prove triangles congruent?', back: 'SSA and AAA.' },
    { u: 3, front: 'Base angles theorem', back: 'If two sides of a triangle are congruent, then the angles opposite them are congruent.' },
    { u: 3, front: 'Converse of the base angles theorem', back: 'If two angles of a triangle are congruent, then the sides opposite them are congruent.' },
    { u: 3, front: 'Equilateral and equiangular', back: 'If a triangle is equilateral, then it is equiangular (each angle 60°), and if it is equiangular, then it is equilateral.' },
    { u: 3, front: 'Reflexive property in a proof', back: 'A side or angle shared by both triangles is congruent to itself (AC ≅ AC).' },
    // 04
    { u: 4, front: 'Perpendicular bisector theorem', back: 'If a point is on the perpendicular bisector of a segment, then it is equidistant from the endpoints.' },
    { u: 4, front: 'Converse of the perpendicular bisector theorem', back: 'If a point is equidistant from the endpoints of a segment, then it is on the perpendicular bisector.' },
    { u: 4, front: 'Angle bisector theorem', back: 'If a point is on the bisector of an angle, then it is equidistant from the sides of the angle.' },
    { u: 4, front: 'Circumcenter', back: 'Where the perpendicular bisectors meet. Equidistant from the vertices. Inside (acute), at the midpoint of the hypotenuse (right), outside (obtuse).' },
    { u: 4, front: 'Incenter', back: 'Where the angle bisectors meet. Equidistant from the sides. Always inside.' },
    { u: 4, front: 'Centroid', back: 'Where the medians meet. Balance point, 2:1 on each median. Always inside.' },
    { u: 4, front: 'Orthocenter', back: 'Where the altitudes meet. Inside (acute), at the right-angle vertex (right), outside (obtuse).' },
    { u: 4, front: 'Median vs. altitude', back: 'Median: vertex to the midpoint of the opposite side. Altitude: vertex perpendicular to the line of the opposite side.' },
    { u: 4, front: 'Centroid theorem (2:1)', back: 'If G is the centroid, then vertex to G is 2/3 of the median and G to the midpoint is 1/3.' },
    { u: 4, front: 'Midsegment theorem', back: 'If a segment joins the midpoints of two sides of a triangle, then it is parallel to the third side and half as long.' },
    { u: 4, front: 'Exterior angle theorem', back: 'If an angle is an exterior angle of a triangle, then it equals the sum of the two remote interior angles.' },
    { u: 4, front: 'Triangle inequality', back: 'The sum of any two sides is greater than the third side. Third side: difference < x < sum.' },
    { u: 4, front: 'Sides and angles', back: 'If one side of a triangle is longer than another, then the angle opposite it is larger (and the converse).' },
    // 05
    { u: 5, front: 'Corresponding angles postulate', back: 'If two parallel lines are cut by a transversal, then corresponding angles are congruent.' },
    { u: 5, front: 'Alternate interior angles theorem', back: 'If two parallel lines are cut by a transversal, then alternate interior angles are congruent.' },
    { u: 5, front: 'Alternate exterior angles theorem', back: 'If two parallel lines are cut by a transversal, then alternate exterior angles are congruent.' },
    { u: 5, front: 'Co-interior (same-side interior) angles theorem', back: 'If two parallel lines are cut by a transversal, then co-interior angles are supplementary.' },
    { u: 5, front: 'Converse of corresponding angles', back: 'If two lines are cut by a transversal so that corresponding angles are congruent, then the lines are parallel.' },
    { u: 5, front: 'Converse of alternate interior angles', back: 'If two lines are cut by a transversal so that alternate interior angles are congruent, then the lines are parallel.' },
    { u: 5, front: 'Converse of co-interior angles', back: 'If two lines are cut by a transversal so that co-interior angles are supplementary, then the lines are parallel.' },
    { u: 5, front: 'Two lines perpendicular to the same line', back: 'If two lines in a plane are perpendicular to the same line, then they are parallel.' },
    { u: 5, front: 'Slopes of parallel lines', back: 'If two non-vertical lines are parallel, then they have the same slope.' },
    { u: 5, front: 'Slopes of perpendicular lines', back: 'If two non-vertical lines are perpendicular, then their slopes are opposite reciprocals (product −1).' },
    { u: 5, front: 'Parallel postulate', back: 'Through a point not on a line, there is exactly one line parallel to the given line.' },
    // 06
    { u: 6, front: 'Parallelogram: sides and angles', back: 'If a quadrilateral is a parallelogram, then its opposite sides are congruent, its opposite angles are congruent, and its consecutive angles are supplementary.' },
    { u: 6, front: 'Parallelogram: diagonals', back: 'If a quadrilateral is a parallelogram, then its diagonals bisect each other.' },
    { u: 6, front: 'Rectangle: diagonals', back: 'If a parallelogram is a rectangle, then its diagonals are congruent (and the converse).' },
    { u: 6, front: 'Rhombus: diagonals', back: 'If a parallelogram is a rhombus, then its diagonals are perpendicular and each diagonal bisects a pair of opposite angles.' },
    { u: 6, front: 'Square', back: 'A parallelogram that is both a rectangle and a rhombus: all the properties of both.' },
    { u: 6, front: 'Kite', back: 'Two pairs of consecutive sides congruent. Diagonals perpendicular; one diagonal is the perpendicular bisector of the other; one pair of opposite angles congruent.' },
    { u: 6, front: 'Isosceles trapezoid', back: 'If a trapezoid is isosceles, then each pair of base angles is congruent and its diagonals are congruent.' },
    { u: 6, front: 'Trapezoid midsegment', back: 'Parallel to the bases, length = (base₁ + base₂) / 2.' },
    { u: 6, front: 'Ways to prove a parallelogram', back: 'Both pairs of opposite sides parallel or congruent; one pair both parallel and congruent; diagonals bisect each other; both pairs of opposite angles congruent.' },
    { u: 6, front: 'Interior angle sum of a polygon', back: '(n − 2) · 180°' },
    { u: 6, front: 'Each angle of a regular polygon', back: 'Interior: (n − 2) · 180° / n. Exterior: 360° / n. They add to 180°.' },
    { u: 6, front: 'Exterior angle sum of a polygon', back: '360°, for any number of sides.' }
  ];

  var questions = [
    // 01
    { u: 1, t: 'mc', q: 'Solve 4(x + 3) = 2x − 6.', c: ['x = −9', 'x = −3', 'x = 9', 'x = −4.5'], a: 0, why: '4x + 12 = 2x − 6 → 2x = −18 → x = −9. Check: 4(−6) = −24 and 2(−9) − 6 = −24.' },
    { u: 1, t: 'mc', q: 'Solve −3x + 4 ≤ 19.', c: ['x ≥ −5', 'x ≤ −5', 'x ≥ 5', 'x ≤ 5'], a: 0, why: '−3x ≤ 15. Dividing by −3 flips the sign: x ≥ −5.' },
    { u: 1, t: 'mc', q: 'What is the slope of the line through (−2, 5) and (4, −7)?', c: ['−2', '2', '−1/2', '1/2'], a: 0, why: '(−7 − 5) / (4 − (−2)) = −12 / 6 = −2.' },
    { u: 1, t: 'mc', q: 'What is the midpoint of (−4, 9) and (6, −3)?', c: ['(1, 3)', '(5, −6)', '(2, 6)', '(−5, 6)'], a: 0, why: '((−4 + 6) / 2, (9 + (−3)) / 2) = (2/2, 6/2) = (1, 3).' },
    { u: 1, t: 'mc', q: 'What is the distance between (−1, −2) and (5, 6)?', c: ['10', '14', '100', '2√7'], a: 0, why: '√(6² + 8²) = √(36 + 64) = √100 = 10.' },
    { u: 1, t: 'mc', q: 'M(3, −1) is the midpoint of AB, and A is (7, 4). What is B?', c: ['(−1, −6)', '(5, 1.5)', '(11, 9)', '(−4, −5)'], a: 0, why: 'B = (2·3 − 7, 2·(−1) − 4) = (−1, −6). Check: ((7 + (−1)) / 2, (4 + (−6)) / 2) = (3, −1).' },
    { u: 1, t: 'mc', q: 'Solve the system y = 2x − 1 and 3x + y = 14.', c: ['(3, 5)', '(5, 3)', '(2, 3)', '(3, −5)'], a: 0, why: 'Substitute: 3x + 2x − 1 = 14 → 5x = 15 → x = 3, y = 2(3) − 1 = 5. Check: 3(3) + 5 = 14.' },
    { u: 1, t: 'mc', q: 'Which side lengths make a right triangle?', c: ['9, 12, 15', '6, 8, 11', '5, 12, 14', '7, 24, 26'], a: 0, why: '9² + 12² = 81 + 144 = 225 = 15². The others fail: 36 + 64 = 100 ≠ 121, 25 + 144 = 169 ≠ 196, 49 + 576 = 625 ≠ 676.' },
    { u: 1, t: 'mc', q: 'A triangle has sides 7, 8 and 12. What kind of triangle is it?', c: ['Obtuse', 'Acute', 'Right', 'Not a triangle'], a: 0, why: '7² + 8² = 113 and 12² = 144. 113 < 144, so it is obtuse. It is a triangle because 7 + 8 = 15 > 12.' },
    { u: 1, t: 'mc', q: 'Plan A costs $30 to join plus $12 a month. Plan B costs $18 a month and nothing to join. After how many months do they cost the same?', c: ['5', '2.5', '6', '3'], a: 0, why: '30 + 12m = 18m → 30 = 6m → m = 5. Both cost $90.' },
    { u: 1, t: 'mc', q: 'Which system has no solution?', c: ['y = 3x + 2 and y = 3x − 5', 'y = 3x + 2 and y = −3x + 2', '2y = 6x + 4 and y = 3x + 2', 'y = 3x + 2 and y = (1/3)x + 2'], a: 0, why: 'Same slope (3) and different y-intercepts means parallel lines that never meet. 2y = 6x + 4 is the same line as y = 3x + 2 (infinitely many solutions).' },
    { u: 1, t: 'mc', q: 'Triangle ABC has A(1, 1), B(4, 5) and C(8, 2). Where is its right angle?', c: ['At B', 'At A', 'At C', 'It has no right angle'], a: 0, why: 'Slope AB = 4/3 and slope BC = −3/4. Their product is −1, so AB ⊥ BC and the right angle is at B.' },
    // 02
    { u: 2, t: 'mc', q: 'What is the converse of “If a figure is a square, then it has four sides”?', c: ['If a figure has four sides, then it is a square.', 'If a figure is not a square, then it does not have four sides.', 'If a figure does not have four sides, then it is not a square.', 'A figure is a square if and only if it has four sides.'], a: 0, why: 'The converse switches the hypothesis and the conclusion. (It is false: a rectangle has four sides.)' },
    { u: 2, t: 'mc', q: 'What is the contrapositive of “If x = 3, then x² = 9”?', c: ['If x² ≠ 9, then x ≠ 3.', 'If x² = 9, then x = 3.', 'If x ≠ 3, then x² ≠ 9.', 'If x = 3, then x² ≠ 9.'], a: 0, why: 'The contrapositive switches and negates both parts: “If not q, then not p.”' },
    { u: 2, t: 'mc', q: 'Which statement always has the same truth value as a conditional?', c: ['Its contrapositive', 'Its converse', 'Its inverse', 'Its biconditional'], a: 0, why: 'A conditional and its contrapositive are always both true or both false.' },
    { u: 2, t: 'mc', q: 'Which statement is ALWAYS true?', c: ['The supplement of an obtuse angle is acute.', 'Two acute angles are complementary.', 'Supplementary angles are adjacent.', 'Two obtuse angles are supplementary.'], a: 0, why: '180° minus an angle over 90° leaves less than 90°. The middle two are only sometimes true, and two obtuse angles add to more than 180°, so the last is never true.' },
    { u: 2, t: 'mc', q: 'Which statement is NEVER true?', c: ['Two supplementary angles are both acute.', 'Two complementary angles are both acute.', 'Vertical angles are supplementary.', 'A right angle is congruent to its supplement.'], a: 0, why: 'Two angles under 90° add to less than 180°. Complementary angles are always both acute. Vertical angles are supplementary when they are both 90°. A right angle’s supplement is 90°, so that one is always true.' },
    { u: 2, t: 'mc', q: 'An angle’s supplement is 3 times its complement. What is the angle?', c: ['45°', '22.5°', '67.5°', '135°'], a: 0, why: '180 − x = 3(90 − x) → 180 − x = 270 − 3x → 2x = 90 → x = 45. Check: 135 = 3 · 45.' },
    { u: 2, t: 'mc', q: 'Two angles form a linear pair. Their measures are (3x + 10)° and (5x − 30)°. What is the larger angle?', c: ['95°', '85°', '25°', '105°'], a: 0, why: 'A linear pair adds to 180: 8x − 20 = 180 → x = 25. The angles are 85° and 95°.' },
    { u: 2, t: 'mc', q: 'Which conditional is reversible, so it could be a definition?', c: ['If an angle measures 90°, then it is a right angle.', 'If two angles are vertical angles, then they are congruent.', 'If a figure is a square, then it is a rectangle.', 'If x = 2, then x² = 4.'], a: 0, why: 'Its converse, “If an angle is a right angle, then it measures 90°,” is also true. The other converses are false (x could be −2, a rectangle may not be a square, congruent angles need not be vertical).' },
    { u: 2, t: 'mc', q: 'Which number is a counterexample to “If a number is prime, then it is odd”?', c: ['2', '9', '3', '15'], a: 0, why: '2 is prime (the hypothesis is true) but it is even (the conclusion is false).' },
    { u: 2, t: 'mc', q: '∠A and ∠B are complementary. m∠A = (2x + 6)° and m∠B = (4x)°. What is m∠B?', c: ['56°', '34°', '14°', '124°'], a: 0, why: '2x + 6 + 4x = 90 → 6x = 84 → x = 14. m∠B = 4(14) = 56° (and m∠A = 34°).' },
    { u: 2, t: 'mc', q: 'Vertical angles measure (4x − 7)° and (2x + 25)°. What is each angle?', c: ['57°', '16°', '61.5°', '123°'], a: 0, why: 'Vertical angles are congruent: 4x − 7 = 2x + 25 → x = 16. 4(16) − 7 = 57°.' },
    // 03
    { u: 3, t: 'mc', q: '△ABC ≅ △XYZ. Which must be true?', c: ['BC ≅ YZ', 'AB ≅ YZ', '∠A ≅ ∠Y', 'AC ≅ XY'], a: 0, why: 'Match the letters in order: A↔X, B↔Y, C↔Z. So BC matches YZ.' },
    { u: 3, t: 'mc', q: 'Which of these does NOT prove two triangles congruent?', c: ['SSA', 'SAS', 'ASA', 'HL'], a: 0, why: 'Two sides and a non-included angle can make two different triangles, so SSA does not work. (AAA does not work either.)' },
    { u: 3, t: 'mc', q: 'Two sides and the angle between them in one triangle are congruent to two sides and the angle between them in another. Which shortcut proves the triangles congruent?', c: ['SAS', 'SSA', 'ASA', 'AAS'], a: 0, why: 'The angle between the two sides is the included angle: Side-Angle-Side.' },
    { u: 3, t: 'mc', q: 'In △PQR and △STU, ∠P ≅ ∠S, ∠Q ≅ ∠T and QR ≅ TU. Which shortcut proves them congruent?', c: ['AAS', 'ASA', 'SAS', 'They can’t be proved congruent'], a: 0, why: 'The side between ∠P and ∠Q would be PQ. QR is not between them, so it is a non-included side: AAS.' },
    { u: 3, t: 'mc', q: 'Two right triangles have congruent hypotenuses and one pair of congruent legs. Which shortcut proves them congruent?', c: ['HL', 'SSA', 'AAA', 'ASA'], a: 0, why: 'Hypotenuse-Leg works for right triangles only.' },
    { u: 3, t: 'mc', q: 'When can you use CPCTC in a proof?', c: ['After you prove the triangles congruent', 'Before you name the triangles', 'Only for right triangles', 'Whenever two triangles share a side'], a: 0, why: 'CPCTC says the parts match because the triangles are congruent, so the triangles have to be proved congruent first.' },
    { u: 3, t: 'mc', q: 'An isosceles triangle has a vertex angle of 40°. What is each base angle?', c: ['70°', '140°', '40°', '50°'], a: 0, why: 'The base angles are congruent: (180 − 40) / 2 = 70°.' },
    { u: 3, t: 'mc', q: 'The base angles of an isosceles triangle are (3x + 5)° and (5x − 21)°. What is the vertex angle?', c: ['92°', '44°', '13°', '136°'], a: 0, why: 'Base angles are congruent: 3x + 5 = 5x − 21 → x = 13, so each base angle is 44°. Vertex angle = 180 − 2(44) = 92°.' },
    { u: 3, t: 'mc', q: 'An equilateral triangle has sides 2x + 3 and 5x − 9. What is its perimeter?', c: ['33', '11', '4', '44'], a: 0, why: '2x + 3 = 5x − 9 → 3x = 12 → x = 4. Each side is 11, so the perimeter is 3 · 11 = 33.' },
    { u: 3, t: 'mc', q: 'In a proof, two triangles share side AC. What reason goes with AC ≅ AC?', c: ['Reflexive property', 'Symmetric property', 'Transitive property', 'Definition of midpoint'], a: 0, why: 'Anything is congruent to itself: the reflexive property.' },
    { u: 3, t: 'mc', q: 'M is the midpoint of AD. What reason goes with AM ≅ MD?', c: ['Definition of midpoint', 'Definition of bisector of an angle', 'Vertical angles are congruent', 'CPCTC'], a: 0, why: 'A midpoint divides a segment into two congruent segments.' },
    // 04
    { u: 4, t: 'mc', q: 'Which center of a triangle is equidistant from its three vertices?', c: ['Circumcenter', 'Incenter', 'Centroid', 'Orthocenter'], a: 0, why: 'The circumcenter is on every perpendicular bisector, so it is the same distance from all three vertices.' },
    { u: 4, t: 'mc', q: 'Which center is equidistant from the three sides of a triangle?', c: ['Incenter', 'Circumcenter', 'Centroid', 'Orthocenter'], a: 0, why: 'The incenter is on every angle bisector, so it is the same distance from all three sides.' },
    { u: 4, t: 'mc', q: 'The incenter is where which segments meet?', c: ['The angle bisectors', 'The medians', 'The altitudes', 'The perpendicular bisectors'], a: 0, why: 'Angle Bisectors → Incenter.' },
    { u: 4, t: 'mc', q: 'Where is the orthocenter of an obtuse triangle?', c: ['Outside the triangle', 'Inside the triangle', 'At the midpoint of the longest side', 'At the vertex of the obtuse angle'], a: 0, why: 'For an obtuse triangle, the lines containing the altitudes meet outside the triangle.' },
    { u: 4, t: 'mc', q: 'Where is the circumcenter of a right triangle?', c: ['At the midpoint of the hypotenuse', 'At the vertex of the right angle', 'Outside the triangle', 'Inside the triangle, away from the sides'], a: 0, why: 'For a right triangle, the circumcenter is on the triangle, at the midpoint of the hypotenuse.' },
    { u: 4, t: 'mc', q: 'Which pair of centers is always inside the triangle?', c: ['Incenter and centroid', 'Circumcenter and orthocenter', 'Centroid and circumcenter', 'Incenter and orthocenter'], a: 0, why: 'The incenter and centroid are inside every triangle. The circumcenter and orthocenter are outside an obtuse triangle.' },
    { u: 4, t: 'mc', q: 'G is the centroid of △ABC and median AM is 24. What is AG?', c: ['16', '12', '8', '18'], a: 0, why: 'The centroid is 2/3 of the way from the vertex: (2/3)(24) = 16. GM = 8.' },
    { u: 4, t: 'mc', q: 'G is the centroid of △ABC and GM = 7 on median AM. How long is AM?', c: ['21', '14', '10.5', '28'], a: 0, why: 'AG = 2 · GM = 14, so AM = 14 + 7 = 21.' },
    { u: 4, t: 'mc', q: 'What is the centroid of the triangle with vertices (1, 2), (7, 4) and (4, 9)?', c: ['(4, 5)', '(6, 7.5)', '(12, 15)', '(5.5, 6.5)'], a: 0, why: 'Average the vertices: ((1 + 7 + 4) / 3, (2 + 4 + 9) / 3) = (12/3, 15/3) = (4, 5).' },
    { u: 4, t: 'mc', q: 'A midsegment of a triangle is 2x + 3 and the side parallel to it is 5x − 3. How long is the midsegment?', c: ['21', '42', '9', '10.5'], a: 0, why: 'The side is twice the midsegment: 2(2x + 3) = 5x − 3 → 4x + 6 = 5x − 3 → x = 9. Midsegment = 2(9) + 3 = 21.' },
    { u: 4, t: 'mc', q: 'An exterior angle of a triangle is (4x + 2)°. The remote interior angles are (x + 20)° and (2x + 12)°. What is the exterior angle?', c: ['122°', '58°', '30°', '120°'], a: 0, why: '4x + 2 = (x + 20) + (2x + 12) → 4x + 2 = 3x + 32 → x = 30. Exterior angle = 4(30) + 2 = 122°.' },
    { u: 4, t: 'mc', q: 'Two sides of a triangle are 6 and 10. Which can NOT be the third side?', c: ['4', '5', '9', '15'], a: 0, why: 'The third side must be between 10 − 6 = 4 and 10 + 6 = 16, not equal to either. 6 + 4 = 10 is not greater than 10.' },
    { u: 4, t: 'mc', q: 'In △ABC, m∠A = 50°, m∠B = 60° and m∠C = 70°. Which side is longest?', c: ['AB', 'BC', 'AC', 'They are all the same length'], a: 0, why: 'The longest side is opposite the largest angle. ∠C is largest, and the side opposite it is AB.' },
    { u: 4, t: 'mc', q: 'P is on the perpendicular bisector of AB. PA = 3x + 1 and PB = 5x − 7. What is PA?', c: ['13', '4', '8', '26'], a: 0, why: 'A point on the perpendicular bisector is equidistant from A and B: 3x + 1 = 5x − 7 → x = 4, PA = 13.' },
    // 05
    { u: 5, t: 'mc', q: 'Two parallel lines are cut by a transversal. One alternate interior angle is 65°. What is the other?', c: ['65°', '115°', '25°', '130°'], a: 0, why: 'If the lines are parallel, alternate interior angles are congruent.' },
    { u: 5, t: 'mc', q: 'Two parallel lines are cut by a transversal. One co-interior (same-side interior) angle is 65°. What is the other?', c: ['115°', '65°', '25°', '295°'], a: 0, why: 'If the lines are parallel, co-interior angles are supplementary: 180 − 65 = 115°.' },
    { u: 5, t: 'mc', q: 'Two lines are cut by a transversal. Which pair of angles, if congruent, proves the lines are parallel?', c: ['Alternate interior angles', 'Vertical angles', 'A linear pair', 'Adjacent angles'], a: 0, why: 'This is the converse of the alternate interior angles theorem. Vertical angles are congruent whether or not the lines are parallel.' },
    { u: 5, t: 'mc', q: 'Alternate interior angles measure (5x − 4)° and (3x + 20)°. What value of x makes the lines parallel?', c: ['12', '2', '56', '23'], a: 0, why: 'They must be congruent: 5x − 4 = 3x + 20 → 2x = 24 → x = 12. Each angle is 56°.' },
    { u: 5, t: 'mc', q: 'Co-interior angles measure (2x + 10)° and (4x + 20)°. If the lines are parallel, what is the larger angle?', c: ['120°', '60°', '25°', '90°'], a: 0, why: 'They are supplementary: 6x + 30 = 180 → x = 25. The angles are 60° and 120°.' },
    { u: 5, t: 'mc', q: 'Which statement is true even when two lines cut by a transversal are NOT parallel?', c: ['Vertical angles are congruent.', 'Corresponding angles are congruent.', 'Alternate interior angles are congruent.', 'Co-interior angles are supplementary.'], a: 0, why: 'Vertical angles are always congruent. The other three need parallel lines.' },
    { u: 5, t: 'mc', q: 'What is the slope of a line perpendicular to y = (3/4)x − 2?', c: ['−4/3', '3/4', '4/3', '−3/4'], a: 0, why: 'Perpendicular slopes are opposite reciprocals: (3/4)(−4/3) = −1.' },
    { u: 5, t: 'mc', q: 'Which line goes through (4, 1) and is parallel to y = −3x + 7?', c: ['y = −3x + 13', 'y = −3x + 1', 'y = (1/3)x − 1/3', 'y = 3x − 11'], a: 0, why: 'Parallel means slope −3: y − 1 = −3(x − 4) → y = −3x + 13. Check: −12 + 13 = 1.' },
    { u: 5, t: 'mc', q: 'Which line goes through (2, −3) and is perpendicular to 2x − 5y = 10?', c: ['y = −(5/2)x + 2', 'y = (5/2)x − 8', 'y = −(2/5)x − 11/5', 'y = (2/5)x − 19/5'], a: 0, why: '2x − 5y = 10 → y = (2/5)x − 2, slope 2/5. Perpendicular slope −5/2: y + 3 = −(5/2)(x − 2) → y = −(5/2)x + 2.' },
    { u: 5, t: 'mc', q: 'How are the lines y = 2x + 1 and 4x − 2y = 6 related?', c: ['Parallel', 'Perpendicular', 'The same line', 'Neither'], a: 0, why: '4x − 2y = 6 → y = 2x − 3. Both have slope 2 with different y-intercepts, so they are parallel.' },
    { u: 5, t: 'mc', q: 'Lines ℓ and m are both perpendicular to line t (all in one plane). What is true about ℓ and m?', c: ['They are parallel.', 'They are perpendicular.', 'They are the same line.', 'They meet at a 45° angle.'], a: 0, why: 'If two lines in a plane are perpendicular to the same line, then they are parallel.' },
    // 06
    { u: 6, t: 'mc', q: 'What is the sum of the interior angles of a dodecagon (12 sides)?', c: ['1800°', '2160°', '150°', '1620°'], a: 0, why: '(12 − 2) · 180 = 10 · 180 = 1800°.' },
    { u: 6, t: 'mc', q: 'What is each interior angle of a regular dodecagon?', c: ['150°', '30°', '165°', '144°'], a: 0, why: '1800 / 12 = 150°. (Each exterior angle is 360 / 12 = 30°, and 180 − 30 = 150.)' },
    { u: 6, t: 'mc', q: 'Each exterior angle of a regular polygon is 24°. How many sides does it have?', c: ['15', '24', '13', '7.5'], a: 0, why: 'The exterior angles add to 360°: 360 / 24 = 15 sides.' },
    { u: 6, t: 'mc', q: 'Each interior angle of a regular polygon is 140°. How many sides does it have?', c: ['9', '7', '10', '14'], a: 0, why: 'Each exterior angle is 180 − 140 = 40°, and 360 / 40 = 9.' },
    { u: 6, t: 'mc', q: 'The interior angles of a polygon add to 1440°. How many sides does it have?', c: ['10', '8', '12', '9'], a: 0, why: '(n − 2) · 180 = 1440 → n − 2 = 8 → n = 10.' },
    { u: 6, t: 'mc', q: 'Which is true of every rhombus?', c: ['Its diagonals are perpendicular.', 'Its diagonals are congruent.', 'It has four right angles.', 'It has exactly one pair of parallel sides.'], a: 0, why: 'A rhombus’s diagonals are perpendicular. Congruent diagonals and right angles belong to rectangles.' },
    { u: 6, t: 'mc', q: 'Which is enough to prove a quadrilateral is a parallelogram?', c: ['Its diagonals bisect each other.', 'Its diagonals are congruent.', 'Its diagonals are perpendicular.', 'One pair of sides is parallel and the other pair is congruent.'], a: 0, why: 'Diagonals that bisect each other prove a parallelogram. An isosceles trapezoid has congruent diagonals and one parallel pair plus a congruent pair, and a kite has perpendicular diagonals.' },
    { u: 6, t: 'mc', q: 'Which is always true of a kite?', c: ['Its diagonals are perpendicular.', 'Both pairs of opposite sides are congruent.', 'Its diagonals bisect each other.', 'All four angles are congruent.'], a: 0, why: 'A kite’s diagonals are perpendicular. It is not a parallelogram, so its diagonals don’t bisect each other and its opposite sides aren’t congruent.' },
    { u: 6, t: 'mc', q: 'In rectangle ABCD, diagonal AC = 3x + 4 and diagonal BD = 5x − 10. How long is each diagonal?', c: ['25', '7', '50', '12.5'], a: 0, why: 'The diagonals of a rectangle are congruent: 3x + 4 = 5x − 10 → x = 7, so AC = 3(7) + 4 = 25.' },
    { u: 6, t: 'mc', q: 'Two consecutive angles of a parallelogram are (3x + 10)° and (x + 30)°. What is the larger angle?', c: ['115°', '65°', '35°', '100°'], a: 0, why: 'Consecutive angles are supplementary: 4x + 40 = 180 → x = 35. The angles are 115° and 65°.' },
    { u: 6, t: 'mc', q: 'What is the most specific name for the quadrilateral A(0, 0), B(4, 3), C(7, −1), D(3, −4)?', c: ['Square', 'Rectangle', 'Rhombus', 'Parallelogram'], a: 0, why: 'Slopes 3/4, −4/3, 3/4, −4/3: opposite sides parallel and consecutive sides perpendicular. All sides are 5. A rectangle and a rhombus at once is a square.' },
    { u: 6, t: 'mc', q: 'One angle of a parallelogram is (2x − 10)°. Which values of x are possible?', c: ['5 < x < 95', 'x > 5', 'x < 95', '5 < x < 85'], a: 0, why: 'The angle must be between 0° and 180°: 0 < 2x − 10 < 180 → 10 < 2x < 190 → 5 < x < 95.' },
    { u: 6, t: 'mc', q: 'One base angle of an isosceles trapezoid is 70°. What is each angle at the other base?', c: ['110°', '70°', '20°', '140°'], a: 0, why: 'Base angles at the same base are congruent (70° and 70°). An angle on one base and the angle next to it on the other base are co-interior angles between the parallel bases, so they add to 180°: 180 − 70 = 110°.' },
    { u: 6, t: 'mc', q: 'A trapezoid has bases 10 and 18. How long is its midsegment?', c: ['14', '28', '8', '9'], a: 0, why: 'The midsegment is the average of the bases: (10 + 18) / 2 = 14.' }
  ];

  // Math practice: every answer comes out as a whole number (or a .5 where it says so).
  var formulas = [
    ['Slope', 'm = (y₂ − y₁) / (x₂ − x₁)'],
    ['Midpoint', '((x₁ + x₂) / 2, (y₁ + y₂) / 2)'],
    ['Distance', '√((x₂ − x₁)² + (y₂ − y₁)²)'],
    ['Centroid', 'Vertex to centroid = 2/3 of the median'],
    ['Midsegment', 'Half of the third side'],
    ['Exterior angle', 'Sum of the two remote interior angles'],
    ['Interior angle sum', '(n − 2) · 180°'],
    ['Each interior angle (regular)', '(n − 2) · 180° / n'],
    ['Each exterior angle (regular)', '360° / n']
  ];

  var NAMES = { 3: 'triangle', 4: 'quadrilateral', 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon', 9: 'nonagon', 10: 'decagon', 12: 'dodecagon' };
  function polyName(n) { return NAMES[n] ? 'a ' + NAMES[n] + ' (' + n + ' sides)' : 'a ' + n + '-gon'; }
  // Regular polygons whose angles come out whole: n divides 360.
  var WHOLE = [3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36];
  var TRIPLES = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20]];

  var drills = [
    {
      tag: 'Interior angle sum', unit: '°',
      make: function (rand) {
        var n = rand(3, 20);
        return { q: 'What is the sum of the interior angles of ' + polyName(n) + '?', answer: (n - 2) * 180,
          work: '(n − 2) · 180 = (' + n + ' − 2) · 180 = ' + (n - 2) + ' · 180 = ' + (n - 2) * 180 + '°' };
      }
    },
    {
      tag: 'Regular polygon angles', unit: '°',
      make: function (rand) {
        var n = WHOLE[rand(0, WHOLE.length - 1)];
        var ext = 360 / n, inner = 180 - ext;
        if (rand(0, 1)) {
          return { q: 'What is each interior angle of a regular ' + polyName(n).slice(2) + '?', answer: inner,
            work: '(n − 2) · 180 / n = ' + (n - 2) * 180 + ' / ' + n + ' = ' + inner + '°' };
        }
        return { q: 'What is each exterior angle of a regular ' + polyName(n).slice(2) + '?', answer: ext,
          work: '360 / n = 360 / ' + n + ' = ' + ext + '°' };
      }
    },
    {
      tag: 'Sides from an angle', unit: 'sides',
      make: function (rand) {
        var n = WHOLE[rand(0, WHOLE.length - 1)];
        var ext = 360 / n, inner = 180 - ext;
        return { q: 'Each interior angle of a regular polygon is ' + inner + '°. How many sides does it have?', answer: n,
          work: 'Each exterior angle is 180 − ' + inner + ' = ' + ext + '°. Sides = 360 / ' + ext + ' = ' + n };
      }
    },
    {
      tag: 'Slope', unit: '',
      make: function (rand) {
        var m = rand(-5, 5), x1 = rand(-6, 6), y1 = rand(-6, 6), run = rand(1, 4) * (rand(0, 1) ? 1 : -1);
        var x2 = x1 + run, y2 = y1 + m * run;
        return { q: 'What is the slope of the line through (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + ')?', answer: m,
          work: '(' + y2 + ' − ' + (y1 < 0 ? '(' + y1 + ')' : y1) + ') / (' + x2 + ' − ' + (x1 < 0 ? '(' + x1 + ')' : x1) + ') = ' + (y2 - y1) + ' / ' + (x2 - x1) + ' = ' + m };
      }
    },
    {
      tag: 'Distance', unit: '',
      make: function (rand) {
        var t = TRIPLES[rand(0, TRIPLES.length - 1)];
        var flip = rand(0, 1), dx = flip ? t[1] : t[0], dy = flip ? t[0] : t[1];
        if (rand(0, 1)) dx = -dx;
        if (rand(0, 1)) dy = -dy;
        var x1 = rand(-6, 6), y1 = rand(-6, 6), x2 = x1 + dx, y2 = y1 + dy;
        return { q: 'What is the distance between (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + ')?', answer: t[2],
          work: '√(' + dx + '² + ' + dy + '²) = √(' + dx * dx + ' + ' + dy * dy + ') = √' + t[2] * t[2] + ' = ' + t[2] };
      }
    },
    {
      tag: 'Midpoint', unit: '',
      make: function (rand) {
        var x1 = rand(-9, 9), y1 = rand(-9, 9), mx = rand(-6, 6), my = rand(-6, 6);
        var x2 = 2 * mx - x1, y2 = 2 * my - y1;
        if (rand(0, 1)) {
          return { q: 'What is the x-coordinate of the midpoint of (' + x1 + ', ' + y1 + ') and (' + x2 + ', ' + y2 + ')?', answer: mx,
            work: '(' + x1 + ' + ' + (x2 < 0 ? '(' + x2 + ')' : x2) + ') / 2 = ' + (x1 + x2) + ' / 2 = ' + mx + '. The midpoint is (' + mx + ', ' + my + ').' };
        }
        return { q: 'M(' + mx + ', ' + my + ') is the midpoint of AB and A is (' + x1 + ', ' + y1 + '). What is the y-coordinate of B?', answer: y2,
          work: 'y = 2 · ' + my + ' − ' + (y1 < 0 ? '(' + y1 + ')' : y1) + ' = ' + y2 + '. B is (' + x2 + ', ' + y2 + ').' };
      }
    },
    {
      tag: 'Centroid', unit: '',
      make: function (rand) {
        var k = rand(2, 12), median = 3 * k;
        var pick = rand(0, 2);
        if (pick === 0) return { q: 'G is the centroid and median AM = ' + median + '. What is AG?', answer: 2 * k, work: 'AG = (2/3) · ' + median + ' = ' + 2 * k };
        if (pick === 1) return { q: 'G is the centroid and median AM = ' + median + '. What is GM?', answer: k, work: 'GM = (1/3) · ' + median + ' = ' + k };
        return { q: 'G is the centroid of △ABC and GM = ' + k + ' on median AM. What is AM?', answer: median, work: 'AG = 2 · ' + k + ' = ' + 2 * k + ', so AM = ' + 2 * k + ' + ' + k + ' = ' + median };
      }
    },
    {
      tag: 'Midsegment', unit: '',
      make: function (rand) {
        var side = 2 * rand(4, 30);
        if (rand(0, 1)) return { q: 'The third side of a triangle is ' + side + '. How long is the midsegment parallel to it?', answer: side / 2, work: 'Half of ' + side + ' = ' + side / 2 };
        return { q: 'A midsegment of a triangle is ' + side / 2 + '. How long is the side parallel to it?', answer: side, work: '2 · ' + side / 2 + ' = ' + side };
      }
    },
    {
      tag: 'Exterior angle', unit: '°',
      make: function (rand) {
        var a = rand(20, 80), b = rand(20, 80);
        return { q: 'The two remote interior angles of a triangle are ' + a + '° and ' + b + '°. What is the exterior angle?', answer: a + b,
          work: a + ' + ' + b + ' = ' + (a + b) + '°' };
      }
    }
  ];

  FINALS.addClass('honors-geometry', {
    // Shown on this class's Home.
    examFacts: [
      'Semester 1 final. Worth 15% of the semester grade.',
      '42 multiple choice questions plus 2 two-column proofs. Chapters 1–5.',
      'Bring your own handwritten theorem sheet (for the proofs only) and a 3×5 note card (for the multiple choice only).',
      'Calculator allowed.',
      'Not on this final: transformations (reflections, rotations, translations).'
    ],
    units: units,
    flashcards: flashcards,
    questions: questions,
    formulas: formulas,
    drills: drills
  });
})();
