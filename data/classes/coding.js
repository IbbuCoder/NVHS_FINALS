// Lessons are written as HTML with diagrams and cards, in plain 9th-grade language.
// Coding: Semester 1 final (Fri Dec 18, period 7).
// Same format as human-geography.js: units with sections, flashcards, questions and examFacts.
// Built from the class notebook: intro to AI, Karel, Python / JS basics, canvas graphics,
// conditionals, loops, functions and strings.
// Code answers were checked by running the code in Python.
(function () {
  // ---------- Visual helpers ----------
  // Lessons below are written as HTML. Every color is one of the site's own CSS variables,
  // so these pictures follow light, dark and accent themes.
  var HEAD = 'font-family:var(--head);';
  function say(h) { return '<p style="font-size:18px;line-height:1.5;margin:0 0 14px">' + h + '</p>'; }
  function tip(label, h, trap) {
    var c = trap ? 'var(--ink)' : 'var(--accent)';
    return '<div style="margin:14px 0;padding:10px 14px;background:var(--fill);border-left:6px solid ' + c + '">' +
      '<b style="' + HEAD + 'font-size:20px;letter-spacing:.05em;text-transform:uppercase;color:' + c + '">' + label + '</b>' +
      '<div style="font-size:17px;line-height:1.45;margin-top:2px">' + h + '</div></div>';
  }
  function flow(steps) {
    var out = '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:stretch;margin:12px 0 16px">';
    steps.forEach(function (s, i) {
      if (i) out += '<div aria-hidden="true" style="align-self:center;font:700 28px/1 var(--head);color:var(--accent)">→</div>';
      out += '<div style="flex:1 1 130px;border:2px solid var(--ink);background:var(--surface);padding:10px 12px"><b style="font:700 21px/1.1 var(--head);display:block">' + s.t + '</b>' +
        (s.s ? '<span style="font-size:15px;color:var(--mute);line-height:1.3;display:block;margin-top:3px">' + s.s + '</span>' : '') + '</div>';
    });
    return out + '</div>';
  }
  function stack(layers) {
    var out = '<div style="margin:12px 0 16px;border:2px solid var(--ink)">';
    layers.forEach(function (l, i) {
      out += '<div style="display:grid;grid-template-columns:48px 1fr;align-items:center;background:' + (i % 2 ? 'var(--fill)' : 'var(--surface)') + ';' + (i ? 'border-top:1px solid var(--ink);' : '') + '">' +
        '<div style="background:var(--accent);color:var(--on-accent);text-align:center;font:700 26px/1 var(--head);align-self:stretch;display:flex;align-items:center;justify-content:center">' + (l.n || (i + 1)) + '</div>' +
        '<div style="padding:9px 12px"><b style="font:700 21px/1.1 var(--head)">' + l.t + '</b>' + (l.s ? '<div style="font-size:16px;line-height:1.35;color:var(--mute);margin-top:2px">' + l.s + '</div>' : '') + '</div></div>';
    });
    return out + '</div>';
  }
  function cards(items, min) {
    var out = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(' + (min || 200) + 'px,1fr));gap:10px;margin:12px 0 16px">';
    items.forEach(function (c) {
      out += '<div style="border:2px solid var(--ink);background:var(--surface);padding:10px 12px">' +
        (c.k ? '<div style="font:600 14px/1 var(--head);letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:4px">' + c.k + '</div>' : '') +
        '<b style="font:700 22px/1.1 var(--head);display:block">' + (c.i ? '<span aria-hidden="true">' + c.i + '</span> ' : '') + c.h + '</b>' +
        (c.t ? '<div style="font-size:16px;line-height:1.4;margin-top:4px">' + c.t + '</div>' : '') + '</div>';
    });
    return out + '</div>';
  }
  function tiles(items) {
    var out = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin:12px 0 16px">';
    items.forEach(function (c) {
      out += '<div style="border:2px solid var(--ink);background:var(--surface);padding:10px 12px;text-align:left">' +
        '<div style="font:700 ' + (String(c.n).length > 10 ? 24 : String(c.n).length > 5 ? 32 : 44) + 'px/1.05 var(--head);color:var(--accent)">' + c.n + '</div>' +
        '<div style="font-size:16px;line-height:1.3;margin-top:4px">' + c.t + '</div></div>';
    });
    return out + '</div>';
  }
  function pills(items) {
    var out = '<div style="display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 14px">';
    items.forEach(function (c) {
      var w = typeof c === 'string' ? { w: c } : c;
      out += '<span style="border:2px solid var(--ink);background:var(--surface);padding:3px 9px;font-size:16px;line-height:1.3"><b>' + w.w + '</b>' + (w.m ? ' <span style="color:var(--mute)">· ' + w.m + '</span>' : '') + '</span>';
    });
    return out + '</div>';
  }
  function h3(t) { return '<h3 style="font:700 24px/1.1 var(--head);margin:18px 0 6px">' + t + '</h3>'; }
  function tbl(head, rows) {
    return '<table class="tbl stack"><thead><tr>' + head.map(function (h) { return '<th scope="col">' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr><th scope="row">' + r[0] + '</th>' + r.slice(1).map(function (c, i) { return '<td data-label="' + (head[i + 1] || '') + '">' + c + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table>';
  }
  function svg(w, h, inner, alt) {
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + alt + '" style="display:block;width:100%;max-width:' + w + 'px;height:auto;margin:12px 0 16px;background:var(--surface);border:2px solid var(--ink)">' +
      '<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker></defs>' + inner + '</svg>';
  }
  // svg text and shapes: t(x, y, text, size, weight, anchor, color)
  function t(x, y, s, size, wt, anchor, color) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || 'middle') + '" style="font:' + (wt || 600) + ' ' + Math.max(size || 16, 15) + 'px var(--body)" fill="' + (color || 'var(--ink)') + '">' + s + '</text>';
  }
  function rect(x, y, w, h, fill, stroke, extra) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + (fill || 'var(--surface)') + '" stroke="' + (stroke || 'var(--ink)') + '" stroke-width="2" ' + (extra || '') + '/>';
  }
  function line(x1, y1, x2, y2, arrow, color) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (color || 'var(--accent)') + '" stroke-width="3"' + (arrow ? ' marker-end="url(#ah)"' : '') + '/>';
  }

  function code(s) {
    return '<pre style="font:600 17px/1.5 ui-monospace,Menlo,Consolas,monospace;background:var(--surface);border:2px solid var(--ink);padding:12px;margin:10px 0 14px;overflow-x:auto;white-space:pre">' +
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre>';
  }
  function box(x, y, w, h, label, fill) { return rect(x, y, w, h, fill || 'var(--surface)', 'var(--ink)') + t(x + w / 2, y + h / 2 + 5, label, 16, 700); }

  var units = [
    /* ---------- 01 ---------- */
    {
      id: 'u1', num: '01', title: 'Intro to AI (Unit 1)', short: 'AI',
      sections: [
        {
          id: 'u1-basics', title: 'AI basics',
          simple: 'AI can write and predict, but you must be honest about using it.',
          html:
            tip('Honesty', 'Presenting AI work as your own is <b>academic dishonesty</b>.', true) +
            cards([
              { i: '🧑', h: 'Human vs. artificial intelligence', t: 'The <b>Turing Test</b> asks: can a machine act so human that you cannot tell the difference?' },
              { i: '🎨', h: 'Generative AI', t: 'Creates new content, like text and images.' },
              { i: '🔮', h: 'Predictive AI', t: 'Predicts outcomes from data.' },
              { i: '💬', h: 'LLM (Large Language Model)', t: 'Works with text.' },
              { i: '🖼️', h: 'Multimodal model', t: 'Works with more than one kind of input, like text and images.' },
              { i: '✍️', h: 'Prompt engineering', t: 'Writing clear, detailed prompts to get better answers.' }
            ], 230) +
            say('This unit also covers AI ethics and diversity in the industry.')
        },
        {
          id: 'u1-keys', title: 'API key security and the SMART app project',
          simple: 'Never hide an API key where users can see it.',
          html:
            svg(560, 150,
              box(20, 50, 110, 50, 'User') + box(230, 50, 110, 50, 'Backend / proxy', 'var(--tint)') + box(440, 50, 100, 50, 'AI API') +
              line(130, 75, 228, 75, true) + line(340, 75, 438, 75, true) +
              t(285, 125, 'The key stays here, hidden', 15, 700, 'middle', 'var(--accent)'),
              'Diagram: the user talks to a backend or proxy, which holds the API key and talks to the AI API.') +
            tip('Rule', 'Never put an API key in code that users can see. Send requests through a backend or serverless proxy.', true) +
            say('<b>SMART App project:</b> design a SMART application, for example Elderly Assist using the Gemini API.')
        }
      ]
    },
    /* ---------- 02 ---------- */
    {
      id: 'u2', num: '02', title: 'Karel and Computational Thinking (Unit 2)', short: 'Karel',
      sections: [
        {
          id: 'u2-commands', title: 'Karel commands',
          simple: 'Karel is a robot on a grid. Five of its commands matter most.',
          html:
            (function () {
              var g = '';
              for (var r = 0; r < 4; r++) for (var c = 0; c < 6; c++) g += rect(30 + c * 60, 20 + r * 50, 60, 50, 'var(--surface)', 'var(--rule)');
              return svg(420, 240,
                g +
                rect(30, 120, 60, 50, 'var(--tint)', 'var(--accent)') + t(60, 152, '🤖', 24, 400) +
                line(95, 145, 175, 145, true) + t(130, 135, 'move()', 15, 700, 'middle') +
                t(330, 105, '●', 24, 700, 'middle', 'var(--accent)') + t(330, 70, 'ball', 15, 700, 'middle') +
                t(210, 225, 'Karel lives on a grid of streets and avenues', 15, 600, 'middle', 'var(--mute)'),
                'Karel the robot on a grid, moving forward with move() toward a ball.');
            })() +
            tbl(['Command', 'What it does'], [
              ['move()', 'Moves Karel one step forward'],
              ['turn_left()', 'Turns Karel 90° left'],
              ['put_ball()', 'Puts down a ball'],
              ['take_ball()', 'Picks up a ball'],
              ['turn_right()', 'SuperKarel / UltraKarel only'],
              ['turn_around()', 'SuperKarel / UltraKarel only']
            ])
        },
        {
          id: 'u2-thinking', title: 'Computational thinking',
          simple: 'Break big problems into small ones, plan first, and know the two kinds of errors.',
          html:
            flow([{ t: 'Big problem', s: 'start with the big idea' }, { t: 'Decompose', s: 'break into smaller parts' }, { t: 'Functions', s: 'def name(): reuse code' }]) +
            cards([
              { i: '🧩', h: 'Decomposition', t: 'Break a big problem into smaller parts.' },
              { i: '⬇️', h: 'Top-down design', t: 'Start with the big idea and break it down.' },
              { i: '🗺️', h: 'Pseudocode and flowcharts', t: 'Plan a program before you write it.' },
              { i: '💬', h: 'Comments', t: 'Start with #. Use proper indentation.' }
            ], 230) +
            h3('Two kinds of errors') +
            cards([
              { k: 'Syntax error', h: 'You broke a language rule', t: 'Example: a missing colon or parenthesis.' },
              { k: 'Logic error', h: 'The algorithm is flawed', t: 'The program does the wrong thing, or loops forever.' }
            ], 260) +
            say('<b>Challenges:</b> Fetch Karel, Racing Karel, Tower Builder, Random Hurdles, Super Cleanup, Opposite Corner.')
        }
      ]
    },
    /* ---------- 03 ---------- */
    {
      id: 'u3', num: '03', title: 'Variables, Data Types, Math and Input (Unit 3)', short: 'Basics',
      sections: [
        {
          id: 'u3-vars', title: 'Output, variables and types',
          simple: 'A variable is a labeled box. Four types to know.',
          html:
            cards([
              { h: 'Python output', t: '<code>print()</code>' },
              { h: 'JavaScript output', t: '<code>console.log()</code>' }
            ], 220) +
            svg(520, 130,
              rect(40, 30, 150, 60, 'var(--surface)', 'var(--ink)') + t(115, 68, 'age', 22, 700) +
              rect(210, 30, 100, 60, 'var(--tint)', 'var(--accent)') + t(260, 68, '15', 26, 700) +
              t(115, 112, 'variable name', 15, 600, 'middle', 'var(--mute)') + t(260, 112, 'value', 15, 600, 'middle', 'var(--mute)') +
              t(400, 68, 'age = 15', 24, 700),
              'A variable named age holding the value 15, written age = 15.') +
            say('A variable can change (<b>mutation</b>). A <b>constant</b> should not.') +
            tiles([{ n: 'str', t: 'String: "hello"' }, { n: 'int', t: 'Integer: 42' }, { n: 'float', t: 'Float: 3.14' }, { n: 'bool', t: 'Boolean: True' }]) +
            say('Python is a <b>dynamically typed, interpreted</b> language. Use <code>type()</code> to check a data type.')
        },
        {
          id: 'u3-input', title: 'Input and casting',
          simple: 'input() always gives a string. Cast it to use it as a number.',
          html:
            flow([{ t: 'input("Age? ")', s: 'user types 15' }, { t: '"15"', s: 'it is a STRING' }, { t: 'int("15")', s: 'now it is a number' }]) +
            code('age = int(input("Age? "))') +
            cards([
              { h: 'Python input', t: '<code>input()</code> always gives a string.' },
              { h: 'JavaScript input', t: '<code>readLine()</code>, <code>readInt()</code>, <code>readFloat()</code>' },
              { h: 'Casting', t: '<code>str()</code>, <code>int()</code>, <code>float()</code>' }
            ], 220) +
            tip('Test trap', 'You cannot add a string and an integer without converting one.', true)
        },
        {
          id: 'u3-math', title: 'Operators and order of operations',
          simple: 'Know what % and // do, and the order Python calculates in.',
          html:
            cards([
              { k: '+  −  *  /', h: '5 / 2 = 2.5', t: 'Add, subtract, multiply, divide.' },
              { k: '**', h: '2 ** 3 = 8', t: 'Exponent.' },
              { k: '%', h: '7 % 2 = 1', t: 'Modulus: the remainder.' },
              { k: '//', h: '7 // 2 = 3', t: 'Floor division.' }
            ], 200) +
            h3('Order of operations') +
            stack([
              { n: '1', t: 'Parentheses', s: '( )' },
              { n: '2', t: 'Exponents', s: '**' },
              { n: '3', t: 'Negation', s: '-x' },
              { n: '4', t: 'Multiply / Divide / Modulus', s: 'left to right' },
              { n: '5', t: 'Add / Subtract', s: 'left to right' }
            ]) +
            cards([
              { h: '+ joins strings', t: 'Concatenation.' },
              { h: '* repeats strings', t: '<code>"ab" * 3</code> is <code>"ababab"</code>' },
              { h: 'Comments', t: '<code>#</code> for one line. <code>"""..."""</code> for multi-line docstrings.' }
            ], 220)
        }
      ]
    },
    /* ---------- 04 ---------- */
    {
      id: 'u4', num: '04', title: 'Canvas and Graphics (Unit 4)', short: 'Graphics',
      sections: [
        {
          id: 'u4-canvas', title: 'Canvas basics',
          simple: 'The canvas is a grid of x and y. Later shapes sit on top.',
          html:
            svg(520, 260,
              rect(70, 30, 400, 190, 'var(--surface)', 'var(--ink)') +
              rect(150, 90, 120, 80, 'var(--tint)', 'var(--accent)') +
              '<circle cx="230" cy="130" r="40" fill="var(--accent)" stroke="var(--ink)" stroke-width="2"/>' +
              t(75, 22, '(0, 0)', 16, 700, 'start') +
              t(465, 244, 'getWidth() →', 16, 700, 'end') + t(14, 130, '↓', 20, 700, 'start') + t(30, 150, 'y', 16, 700, 'start') + t(300, 244, 'x →', 16, 700, 'middle') +
              t(330, 120, 'The circle was added', 15, 700, 'start') + t(330, 140, 'LAST, so it is on top', 15, 700, 'start'),
              'Canvas diagram: origin (0,0) at the top left, x grows to the right, y grows down. The circle added last is drawn on top of the rectangle.') +
            tip('Remember', 'The origin (0, 0) is at the <b>top left</b>. y grows <b>down</b>.') +
            cards([
              { i: '⭕', h: 'Circle' }, { i: '▭', h: 'Rectangle' }, { i: '╱', h: 'Line' }
            ], 150) +
            cards([
              { h: 'Stacking order', t: 'Shapes are layered in the order you add them. Later shapes appear on top.' },
              { h: 'Dynamic sizes', t: '<code>getWidth()</code> and <code>getHeight()</code> make a program fit any canvas size.' }
            ], 250) +
            say('<b>Projects:</b> Ball in a Box, Raise the Flag, Color the Rainbow, 8 Ball, Meme Generator, Draw a Plant / Ghost / Fried Egg.') +
            say('<b>Draw Something:</b> at least 5 shapes (1 line, 1 rectangle, 1 circle), 2 colors, 2 sizes.')
        }
      ]
    },
    /* ---------- 05 ---------- */
    {
      id: 'u5', num: '05', title: 'Conditionals and Logic (Units 5–6)', short: 'Conditionals',
      sections: [
        {
          id: 'u5-cond', title: 'Booleans and conditionals',
          simple: 'An if statement chooses a path based on True or False.',
          html:
            svg(560, 250,
              box(200, 10, 160, 44, 'if score >= 90', 'var(--tint)') +
              line(280, 54, 280, 80, false) +
              box(200, 80, 160, 44, 'elif score >= 80', 'var(--tint)') +
              line(280, 124, 280, 150, false) +
              box(200, 150, 160, 44, 'else', 'var(--tint)') +
              line(360, 32, 440, 32, true) + box(440, 10, 100, 44, 'A') + t(400, 24, 'True', 15, 700, 'middle') +
              line(360, 102, 440, 102, true) + box(440, 80, 100, 44, 'B') + t(400, 96, 'True', 15, 700, 'middle') +
              line(360, 172, 440, 172, true) + box(440, 150, 100, 44, 'C') + t(400, 166, 'else', 15, 700, 'middle') +
              t(215, 68, 'False', 15, 700, 'end') + t(215, 138, 'False', 15, 700, 'end') +
              t(280, 226, 'Python checks from the top and runs the FIRST True branch.', 15, 600, 'middle', 'var(--mute)'),
              'Flowchart of if, elif, else: check each condition in order and run the first one that is True.') +
            cards([
              { h: 'Boolean', t: 'Either <b>True</b> or <b>False</b>.' },
              { h: 'Conditional statements', t: '<code>if</code>, <code>if-else</code>, <code>elif</code>' }
            ], 230) +
            h3('Comparison operators') +
            tiles([{ n: '==', t: 'equal' }, { n: '!=', t: 'not equal' }, { n: '<  >', t: 'less / greater' }, { n: '<=  >=', t: 'or equal to' }]) +
            tip('Test trap', 'Use <code>==</code> to <b>compare</b> and <code>=</code> to <b>assign</b>.', true) +
            h3('Logical operators') +
            cards([
              { h: 'and  (&&)', t: 'Both must be True.' }, { h: 'or  (||)', t: 'At least one is True.' }, { h: 'not  (!)', t: 'Flips True and False.' }
            ], 180) +
            say('Floating-point numbers can have rounding errors.')
        },
        {
          id: 'u5-binary', title: 'Binary',
          simple: 'Computers use only 0 (OFF) and 1 (ON).',
          html:
            svg(520, 130,
              [1, 0, 1, 1].map(function (b, i) {
                return rect(40 + i * 90, 20, 80, 60, b ? 'var(--accent)' : 'var(--surface)', 'var(--ink)') + t(80 + i * 90, 61, String(b), 32, 700, 'middle', b ? 'var(--on-accent)' : 'var(--ink)') + t(80 + i * 90, 100, b ? 'ON' : 'OFF', 15, 700, 'middle', 'var(--mute)');
              }).join('') + t(440, 58, 'binary', 20, 700, 'middle'),
              'Four binary digits: 1 (ON), 0 (OFF), 1 (ON), 1 (ON).') +
            say('Binary uses only <b>0 (OFF)</b> and <b>1 (ON)</b>. The unit also covers binary arithmetic and binary bracelets.') +
            say('<b>Challenges:</b> Do You Have a Dog, Best Day Ever, Rolling Dice, Teenagers, Rocket and Trivia, Odd or Even Shapes, Interactive Modern Art. Unit 6 challenge options: Guessing Game, Landscape Generator, RGB.')
        }
      ]
    },
    /* ---------- 06 ---------- */
    {
      id: 'u6', num: '06', title: 'Loops (Unit 7)', short: 'Loops',
      sections: [
        {
          id: 'u6-loops', title: 'While and for loops',
          simple: 'A loop repeats code. range(5) gives 0 to 4.',
          html:
            svg(560, 230,
              box(20, 85, 130, 50, 'Check condition', 'var(--tint)') +
              line(150, 110, 240, 110, true) + t(195, 100, 'True', 15, 700, 'middle') +
              box(240, 85, 130, 50, 'Run the body') +
              line(305, 85, 305, 40, false) + line(305, 40, 85, 40, false) + line(85, 40, 85, 83, true) +
              t(195, 30, 'repeat', 15, 700, 'middle') +
              line(85, 135, 85, 180, false) + line(85, 180, 440, 180, true) + t(260, 205, 'False: leave the loop', 15, 700, 'middle') +
              box(440, 155, 100, 50, 'Done'),
              'While-loop flowchart: check the condition; if True run the body and check again; if False leave the loop.') +
            cards([
              { h: 'while loop', t: 'Runs while its condition is True.' },
              { h: 'Infinite loop', t: 'Never ends because the condition never becomes False. Fix: change the variable inside the loop.' },
              { h: 'for loop', t: '<code>for i in range(...)</code>. The variable <code>i</code> is the counter.' }
            ], 230) +
            h3('range') +
            svg(520, 150,
              [0, 1, 2, 3, 4].map(function (n, i) { return rect(40 + i * 90, 20, 80, 44, i === 0 ? 'var(--tint)' : 'var(--surface)', 'var(--ink)') + t(80 + i * 90, 50, String(n), 24, 700); }).join('') +
              t(260, 90, 'range(5)  →  0, 1, 2, 3, 4', 18, 700, 'middle') +
              t(260, 125, 'range(1, 4)  →  1, 2, 3   (stop is NOT included)', 16, 700, 'middle', 'var(--accent)'),
              'range(5) gives 0 to 4. range(1, 4) gives 1, 2, 3.') +
            cards([
              { i: '🛑', h: 'break', t: 'Exits the loop immediately.' },
              { i: '⏭️', h: 'continue', t: 'Skips the rest of this pass and goes to the next one.' },
              { i: '🪆', h: 'Nested structures', t: 'Loops inside loops, or an if inside a loop.' }
            ], 220)
        },
        {
          id: 'u6-challenges', title: 'Challenges',
          simple: 'The loop projects from this unit.',
          html:
            pills(['Fencepost Problem', 'Follow the Yellow Ball Road', 'Row of Tennis Balls', 'Concentric Circles', 'Growing Squares', 'Chalkboard', 'Level Up', 'Inventory', 'Snake Eyes', 'Better Password', 'Riddle', 'Jukebox']) +
            say('<b>Jukebox:</b> at least 5 songs, using <code>\\n</code> for a new line.') +
            say('<b>Graphics loops:</b> Confetti, Caterpillar.')
        }
      ]
    },
    /* ---------- 07 ---------- */
    {
      id: 'u7', num: '07', title: 'Functions, Scope and Exceptions (Units 8–9)', short: 'Functions',
      sections: [
        {
          id: 'u7-func', title: 'Functions, parameters and return values',
          simple: 'A function is a machine: values go in, a value comes out.',
          html:
            svg(560, 140,
              t(60, 66, '3', 30, 700, 'middle') + line(90, 62, 190, 62, true) + t(140, 50, 'parameter', 15, 700, 'middle') +
              rect(190, 30, 180, 64, 'var(--tint)', 'var(--accent)') + t(280, 70, 'square_number(x)', 18, 700, 'middle') +
              line(370, 62, 470, 62, true) + t(420, 50, 'return', 15, 700, 'middle') + t(515, 66, '9', 30, 700, 'middle') +
              t(280, 125, 'The returned value goes back to the line that called the function.', 15, 600, 'middle', 'var(--mute)'),
              'A function takes the parameter 3, runs square_number, and returns 9 to the line that called it.') +
            cards([
              { h: 'Function', t: 'Reusable code.' },
              { h: 'Parameter', t: 'A placeholder for a value passed in.' },
              { h: 'Default value', t: 'Set in the signature.' },
              { h: 'return', t: 'Sends a value back. You can chain functions: one return value can be the next input.' },
              { h: 'No return', t: 'The function gives back <code>None</code>.' }
            ], 220) +
            code('def greet(name="friend"):')
        },
        {
          id: 'u7-scope', title: 'Scope and exceptions',
          simple: 'Local variables live inside a function. try / except stops crashes.',
          html:
            svg(520, 230,
              rect(20, 20, 480, 190, 'var(--surface)', 'var(--ink)') + t(36, 46, 'Global: defined outside functions', 16, 700, 'start') +
              rect(220, 70, 260, 120, 'var(--tint)', 'var(--accent)') + t(236, 96, 'Local: inside a function', 16, 700, 'start') +
              t(36, 130, 'score = 10', 17, 700, 'start') + t(236, 130, 'bonus = 5', 17, 700, 'start') +
              t(236, 164, 'only works in here', 15, 600, 'start', 'var(--mute)') + t(36, 164, 'works everywhere', 15, 600, 'start', 'var(--mute)'),
              'Nested boxes: global variables work everywhere; local variables only work inside their function.') +
            cards([
              { h: 'Local variable', t: 'Defined inside a function and only works there.' },
              { h: 'Global variable', t: 'Defined outside functions and can be used throughout the program.' }
            ], 240) +
            flow([{ t: 'try', s: 'run the risky code' }, { t: 'error?', s: 'jump to except' }, { t: 'except', s: 'handle it, no crash' }]) +
            say('<b>Projects:</b> Greeting, Negate, square_number(), Functions Calling Functions, max(x, y), isEven(x), Area of Triangle, Rainbow Revisited, Cityscape, Farming Intl, Compound Interest, Default Face, Choose Wisely Game, Scope Reflection.')
        }
      ]
    },
    /* ---------- 08 ---------- */
    {
      id: 'u8', num: '08', title: 'Strings (Unit 10)', short: 'Strings',
      sections: [
        {
          id: 'u8-index', title: 'Indexing and slicing',
          simple: 'Each letter has a number. Slices include the start and skip the end.',
          html:
            svg(520, 200,
              'python'.split('').map(function (ch, i) {
                var x = 40 + i * 74;
                return rect(x, 50, 66, 56, i >= 1 && i < 4 ? 'var(--tint)' : 'var(--surface)', i >= 1 && i < 4 ? 'var(--accent)' : 'var(--ink)') +
                  t(x + 33, 88, ch, 28, 700, 'middle') + t(x + 33, 36, String(i), 17, 700, 'middle') + t(x + 33, 134, String(i - 6), 17, 700, 'middle', 'var(--mute)');
              }).join('') +
              t(20, 36, '', 15) +
              t(260, 170, 's[1:4] → "yth"  (index 4 is skipped)', 17, 700, 'middle', 'var(--accent)') +
              t(260, 20, 'positive indexes start at 0', 15, 600, 'middle', 'var(--mute)') + t(260, 154, '', 15),
              'The word python with positive indexes 0 to 5 above and negative indexes -6 to -1 below. The slice s[1:4] highlights y, t, h.') +
            tbl(['s = "python"', 'Result'], [['s[0]', '"p"'], ['s[-1]', '"n"'], ['s[1:4]', '"yth"'], ['s[:2]', '"py"'], ['s[3:]', '"hon"']]) +
            cards([
              { h: 'Positive indexes', t: 'Start at 0.' },
              { h: 'Negative indexes', t: 'Start at -1, the last character.' },
              { h: 'IndexError', t: 'Caused by an index that is out of range.' },
              { h: 'Slicing', t: '<code>s[start:end]</code> includes start and excludes end. Shorthand: <code>s[:end]</code>, <code>s[start:]</code>.' },
              { h: 'Immutable', t: 'You cannot change a string in place. Make a new string instead.' }
            ], 220)
        },
        {
          id: 'u8-methods', title: 'Looping and methods',
          simple: 'Loop by index or by letter. Learn the string methods.',
          html:
            cards([
              { h: 'Index-based loop', t: '<code>for i in range(len(s)):<br>&nbsp;&nbsp;print(s[i])</code>' },
              { h: 'Character-based loop', t: '<code>for letter in s:<br>&nbsp;&nbsp;print(letter)</code>' },
              { h: 'Membership', t: '<code>if "h" in s:</code> The <code>in</code> keyword checks membership.' }
            ], 240) +
            h3('Methods') +
            pills(['.upper()', '.lower()', '.isupper()', '.islower()', '.swapcase()', '.strip()', '.find(substring)']) +
            tip('Remember', '<code>.find()</code> returns the index of the first match, or <b>-1</b> if it is not found.')
        }
      ]
    },
    /* ---------- 09 ---------- */
    {
      id: 'u9', num: '09', title: 'Final Exam Format', short: 'Exam',
      sections: [
        {
          id: 'u9-format', title: 'What is on the exam',
          simple: '25 multiple-choice questions plus a coding project.',
          html:
            tiles([{ n: '25', t: 'multiple-choice questions' }, { n: '10% or 20%', t: 'of the final grade' }]) +
            cards([
              { h: 'It tests', t: 'Vocabulary, code syntax, logical flow and theory.' },
              { h: 'Coding project', t: 'A practical task submitted through a Google Doc (10% or 20% of the final grade).' }
            ], 260)
        }
      ]
    }
  ];

  var flashcards = [
    { u: 1, front: 'Turing Test', back: 'A test of whether a machine can act so much like a human that you cannot tell the difference.' },
    { u: 1, front: 'Generative vs. predictive AI', back: 'Generative creates new content. Predictive forecasts outcomes from data.' },
    { u: 1, front: 'LLM', back: 'Large Language Model, an AI trained on huge amounts of text.' },
    { u: 1, front: 'Multimodal model', back: 'A model that works with more than one kind of input, like text and images.' },
    { u: 1, front: 'Prompt engineering', back: 'Writing clear, detailed prompts to get better AI answers.' },
    { u: 1, front: 'Keeping an API key safe', back: 'Route requests through a backend or serverless proxy. Never put the key in public code.' },
    { u: 1, front: 'Presenting AI work as your own', back: 'Academic dishonesty.' },
    { u: 2, front: 'Decomposition', back: 'Breaking a problem into smaller parts.' },
    { u: 2, front: 'Karel’s basic commands', back: 'move(), turn_left(), put_ball(), take_ball()' },
    { u: 2, front: 'What does SuperKarel add?', back: 'turn_right() and turn_around()' },
    { u: 2, front: 'Syntax error', back: 'Breaking a language rule, like a missing colon or parenthesis.' },
    { u: 2, front: 'Logic error', back: 'The algorithm is flawed, so the program does the wrong thing or loops forever.' },
    { u: 2, front: 'How do you define a function?', back: 'def function_name():' },
    { u: 2, front: 'Top-down design', back: 'Start with the big idea, then break it into smaller functions.' },
    { u: 3, front: 'print() vs. console.log()', back: 'print() is Python output. console.log() is JavaScript output.' },
    { u: 3, front: 'Four basic data types', back: 'str, int, float, bool' },
    { u: 3, front: 'type()', back: 'Shows a value’s data type.' },
    { u: 3, front: 'What type does input() return?', back: 'A string (str).' },
    { u: 3, front: 'Type casting functions', back: 'str(), int(), float()' },
    { u: 3, front: '**', back: 'Exponent. 2 ** 3 = 8' },
    { u: 3, front: '%', back: 'Modulus (the remainder). 7 % 2 = 1' },
    { u: 3, front: '//', back: 'Floor division. 7 // 2 = 3' },
    { u: 3, front: 'Order of operations', back: 'Parentheses, Exponents, Negation, Multiply / Divide / Modulus, Add / Subtract.' },
    { u: 3, front: 'String concatenation vs. repetition', back: '+ joins strings. * repeats a string. "ab" * 3 = "ababab".' },
    { u: 3, front: 'Python comments', back: '# for one line. """ ... """ for multi-line docstrings.' },
    { u: 4, front: 'Stacking order', back: 'Shapes are layered in the order you add them. Later shapes sit on top.' },
    { u: 4, front: 'getWidth() and getHeight()', back: 'Give the canvas size so your drawing can fit any canvas.' },
    { u: 5, front: 'Boolean', back: 'A value that is True or False.' },
    { u: 5, front: 'Comparison operators', back: '==  !=  <  >  <=  >=' },
    { u: 5, front: 'Logical operators', back: 'and (&&), or (||), not (!)' },
    { u: 5, front: '= vs. ==', back: '= assigns a value. == compares two values.' },
    { u: 5, front: 'elif', back: 'Checks another condition if the earlier if was False.' },
    { u: 5, front: 'Binary', back: 'Base 2: only 0 (OFF) and 1 (ON).' },
    { u: 6, front: 'while loop', back: 'Runs as long as its condition is True.' },
    { u: 6, front: 'Infinite loop', back: 'A loop whose condition never becomes False.' },
    { u: 6, front: 'for i in range(5)', back: 'i takes the values 0, 1, 2, 3, 4.' },
    { u: 6, front: 'break', back: 'Exits the loop immediately.' },
    { u: 6, front: 'continue', back: 'Skips the rest of this pass and moves to the next one.' },
    { u: 7, front: 'Parameter', back: 'A placeholder for a value passed into a function.' },
    { u: 7, front: 'Default parameter', back: 'A value used when none is passed: def greet(name="friend"):' },
    { u: 7, front: 'return', back: 'Sends a value back to the line that called the function.' },
    { u: 7, front: 'Local vs. global variable', back: 'Local: inside a function only. Global: outside functions, usable everywhere.' },
    { u: 7, front: 'try / except', back: 'Handles an error gracefully so the program does not crash.' },
    { u: 8, front: 'First index of a string', back: '0' },
    { u: 8, front: 'Last character index', back: '-1' },
    { u: 8, front: 'Slice s[1:4]', back: 'Includes index 1, excludes index 4.' },
    { u: 8, front: 'Immutable', back: 'Cannot be changed in place. Strings are immutable.' },
    { u: 8, front: 'IndexError', back: 'You used an index that is out of range.' },
    { u: 8, front: '.find()', back: 'Returns the index of the first match, or -1 if not found.' },
    { u: 8, front: '.swapcase()', back: 'Switches uppercase to lowercase and lowercase to uppercase.' },
    { u: 8, front: '.strip()', back: 'Removes spaces from both ends of a string.' },
    { u: 9, front: 'Coding final format', back: '25 multiple-choice questions, plus a coding project in a Google Doc.' }
  ];

  var questions = [
    // Unit 1
    { u: 1, t: 'mc', q: 'What does the Turing Test check?', c: ['Whether a machine can act so human that you cannot tell the difference', 'How fast a computer is', 'Whether code has errors', 'How much data a model has'], a: 0, why: 'The Turing Test checks whether a machine’s answers can pass as human.' },
    { u: 1, t: 'mc', q: 'Which type of AI creates new text or images?', c: ['Generative AI', 'Predictive AI', 'Binary AI', 'Karel AI'], a: 0, why: 'Generative AI creates new content. Predictive AI predicts outcomes.' },
    { u: 1, t: 'mc', q: 'What is a multimodal model?', c: ['A model that handles more than one kind of input, like text and images', 'A model that only reads text', 'A very small model', 'A model with many users'], a: 0, why: 'Multimodal means more than one mode of input or output.' },
    { u: 1, t: 'mc', q: 'What is the safest way to use an API key in an app?', c: ['Route requests through a backend or serverless proxy', 'Put it in the page’s JavaScript', 'Post it in a Google Doc', 'Share it with friends'], a: 0, why: 'A key in public code can be stolen.' },
    { u: 1, t: 'mc', q: 'What is it called when you present AI-generated work as your own?', c: ['Academic dishonesty', 'Prompt engineering', 'Decomposition', 'Debugging'], a: 0, why: 'Passing off AI work as your own breaks academic honesty rules.' },
    // Unit 2
    { u: 2, t: 'mc', q: 'What is decomposition?', c: ['Breaking a problem into smaller parts', 'Fixing a bug', 'Running a loop', 'Writing a comment'], a: 0, why: 'Decomposition makes big problems easier to solve.' },
    { u: 2, t: 'mc', q: 'Which command does regular Karel NOT have?', c: ['turn_right()', 'move()', 'turn_left()', 'put_ball()'], a: 0, why: 'turn_right() and turn_around() are added in SuperKarel.' },
    { u: 2, t: 'mc', q: 'How do you define a function in Python?', c: ['def my_function():', 'function my_function()', 'make my_function()', 'new my_function:'], a: 0, why: 'Python uses def, a name, parentheses and a colon.' },
    { u: 2, t: 'mc', q: 'A missing colon after an if statement is what kind of error?', c: ['Syntax error', 'Logic error', 'Runtime loop', 'Rounding error'], a: 0, why: 'Syntax errors break the language’s rules.' },
    { u: 2, t: 'mc', q: 'Karel’s code runs without errors but goes to the wrong corner. What kind of error is it?', c: ['Logic error', 'Syntax error', 'Type error', 'Name error'], a: 0, why: 'The code is valid, but the algorithm is wrong.' },
    { u: 2, t: 'mc', q: 'Which symbol starts a comment in Python?', c: ['#', '//', '/*', '--'], a: 0, why: 'Python comments start with #.' },
    // Unit 3
    { u: 3, t: 'mc', q: 'Which function prints output in Python?', c: ['print()', 'console.log()', 'output()', 'show()'], a: 0, why: 'console.log() is the JavaScript version.' },
    { u: 3, t: 'mc', q: 'What data type is 3.14?', c: ['float', 'int', 'str', 'bool'], a: 0, why: 'Numbers with decimals are floats.' },
    { u: 3, t: 'mc', q: 'What does input() always return in Python?', c: ['A string', 'An integer', 'A float', 'A Boolean'], a: 0, why: 'Cast it with int() or float() if you need a number.' },
    { u: 3, t: 'mc', q: 'What does int("5") + 2 give?', c: ['7', '52', '"7"', 'An error'], a: 0, why: 'int("5") is 5, and 5 + 2 is 7.' },
    { u: 3, t: 'mc', q: 'What does "5" + "2" give?', c: ['"52"', '7', '"7"', 'An error'], a: 0, why: 'Adding two strings joins them (concatenation).' },
    { u: 3, t: 'mc', q: 'What does 7 // 2 give?', c: ['3', '3.5', '1', '4'], a: 0, why: 'Floor division drops the remainder: 3.' },
    { u: 3, t: 'mc', q: 'What does 7 % 2 give?', c: ['1', '3', '3.5', '0'], a: 0, why: 'Modulus is the remainder: 1.' },
    { u: 3, t: 'mc', q: 'What does 2 ** 3 give?', c: ['8', '6', '5', '9'], a: 0, why: '** is the exponent: 2 × 2 × 2 = 8.' },
    { u: 3, t: 'mc', q: 'What does 3 + 4 * 2 give?', c: ['11', '14', '10', '9'], a: 0, why: 'Multiplication comes first: 4 × 2 = 8, then 3 + 8 = 11.' },
    { u: 3, t: 'mc', q: 'What does (3 + 4) * 2 give?', c: ['14', '11', '10', '24'], a: 0, why: 'Parentheses first: 7 × 2 = 14.' },
    { u: 3, t: 'mc', q: 'What does "ab" * 3 give?', c: ['"ababab"', '"ab3"', '"aaabbb"', 'An error'], a: 0, why: 'Multiplying a string repeats it.' },
    { u: 3, t: 'mc', q: 'What does 5 / 2 give in Python?', c: ['2.5', '2', '3', '2.0'], a: 0, why: 'The / operator always gives a float.' },
    { u: 3, t: 'mc', q: 'What does "Age: " + 15 cause?', c: ['An error, because you cannot add a string and an int', '"Age: 15"', '"Age: "', '15'], a: 0, why: 'Convert with str(15) first.' },
    { u: 3, t: 'mc', q: 'Python is a…', c: ['Dynamically typed, interpreted language', 'Compiled, statically typed language', 'Markup language', 'Database'], a: 0, why: 'You do not declare types, and code runs line by line through an interpreter.' },
    // Unit 4
    { u: 4, t: 'mc', q: 'Two circles overlap on the canvas. Which one appears on top?', c: ['The one added last', 'The one added first', 'The bigger one', 'The red one'], a: 0, why: 'Shapes stack in the order they are added.' },
    { u: 4, t: 'mc', q: 'Which functions make a drawing fit any canvas size?', c: ['getWidth() and getHeight()', 'move() and turn_left()', 'print() and input()', 'range() and len()'], a: 0, why: 'They return the canvas’s current size.' },
    { u: 4, t: 'mc', q: 'What does the Draw Something project require at minimum?', c: ['5 shapes including a line, rectangle and circle, with 2 colors and 2 sizes', '1 circle', '10 colors', 'A loop'], a: 0, why: 'That is the project’s requirement list.' },
    // Unit 5
    { u: 5, t: 'mc', q: 'Which operator checks whether two values are equal?', c: ['==', '=', '!=', '=>'], a: 0, why: '= assigns. == compares.' },
    { u: 5, t: 'mc', q: 'Which operator means “not equal to”?', c: ['!=', '==', '<=', '!'], a: 0, why: '!= is not equal.' },
    { u: 5, t: 'mc', q: 'What does True and False give?', c: ['False', 'True', 'None', 'An error'], a: 0, why: 'and is only True when both sides are True.' },
    { u: 5, t: 'mc', q: 'What does True or False give?', c: ['True', 'False', 'None', 'An error'], a: 0, why: 'or is True when at least one side is True.' },
    { u: 5, t: 'mc', q: 'What does not True give?', c: ['False', 'True', '0', 'An error'], a: 0, why: 'not flips the Boolean.' },
    { u: 5, t: 'mc', q: 'Which keyword checks a second condition after an if?', c: ['elif', 'elseif', 'then', 'else if'], a: 0, why: 'Python uses elif.' },
    { u: 5, t: 'mc', q: 'In binary, what does 1 mean?', c: ['ON', 'OFF', 'Two', 'Empty'], a: 0, why: '1 is ON and 0 is OFF.' },
    { u: 5, t: 'mc', q: 'What does age >= 13 mean?', c: ['age is 13 or more', 'age is more than 13', 'age is 13 or less', 'age is not 13'], a: 0, why: '>= means greater than or equal to.' },
    // Unit 6
    { u: 6, t: 'mc', q: 'When does a while loop stop?', c: ['When its condition becomes False', 'After 10 passes', 'When the program ends', 'Never'], a: 0, why: 'A while loop runs while the condition is True.' },
    { u: 6, t: 'mc', q: 'What causes an infinite loop?', c: ['The condition never becomes False', 'Using range()', 'Using a comment', 'Using print()'], a: 0, why: 'Usually the variable in the condition is never updated.' },
    { u: 6, t: 'mc', q: 'What values does range(5) give?', c: ['0, 1, 2, 3, 4', '1, 2, 3, 4, 5', '0, 1, 2, 3, 4, 5', '1, 2, 3, 4'], a: 0, why: 'range(5) starts at 0 and stops before 5.' },
    { u: 6, t: 'mc', q: 'What values does range(1, 4) give?', c: ['1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3', '2, 3, 4'], a: 0, why: 'It starts at 1 and stops before 4.' },
    { u: 6, t: 'mc', q: 'What does break do?', c: ['Exits the loop immediately', 'Skips this pass', 'Restarts the loop', 'Pauses the program'], a: 0, why: 'continue skips a pass. break leaves the loop.' },
    { u: 6, t: 'mc', q: 'What does continue do?', c: ['Skips the rest of this pass and goes to the next', 'Exits the loop', 'Ends the program', 'Restarts the program'], a: 0, why: 'The loop keeps going with the next value.' },
    { u: 6, t: 'mc', q: 'A loop goes through i in range(5). Each pass it checks “if i == 3: break”, then prints i. What gets printed?', c: ['0 1 2', '0 1 2 3', '0 1 2 3 4', '3'], a: 0, why: 'When i is 3, break ends the loop before printing it.' },
    { u: 6, t: 'mc', q: 'A loop goes through i in range(5). Each pass it checks “if i == 2: continue”, then prints i. What gets printed?', c: ['0 1 3 4', '0 1', '0 1 2 3 4', '2'], a: 0, why: 'When i is 2, continue skips the print.' },
    // Unit 7
    { u: 7, t: 'mc', q: 'What is a parameter?', c: ['A placeholder for a value passed into a function', 'A loop counter', 'A comment', 'A type of error'], a: 0, why: 'Parameters receive the values (arguments) you pass in.' },
    { u: 7, t: 'mc', q: 'What does return do?', c: ['Sends a value back to where the function was called', 'Prints a value', 'Restarts the function', 'Ends the program'], a: 0, why: 'print shows a value; return hands it back to the caller.' },
    { u: 7, t: 'mc', q: 'What does a function without a return statement give back?', c: ['None', '0', 'An error', 'An empty string'], a: 0, why: 'Python returns None by default.' },
    { u: 7, t: 'mc', q: 'Where can a local variable be used?', c: ['Only inside the function where it was defined', 'Anywhere in the program', 'Only in loops', 'Only in the main program'], a: 0, why: 'Local variables are limited to their function.' },
    { u: 7, t: 'mc', q: 'A variable defined outside every function is…', c: ['Global', 'Local', 'Constant only', 'A parameter'], a: 0, why: 'Global variables can be read throughout the program.' },
    { u: 7, t: 'mc', q: 'What is try / except used for?', c: ['Handling errors gracefully', 'Repeating code', 'Defining a function', 'Drawing shapes'], a: 0, why: 'The except block runs if the try block causes an error.' },
    { u: 7, t: 'mc', q: 'What is def greet(name="friend"): an example of?', c: ['A default parameter value', 'A global variable', 'A loop', 'A string method'], a: 0, why: 'If no name is passed in, "friend" is used.' },
    // Unit 8
    { u: 8, t: 'mc', q: 'If s = "python", what is s[0]?', c: ['"p"', '"y"', '"n"', 'An error'], a: 0, why: 'Indexes start at 0.' },
    { u: 8, t: 'mc', q: 'If s = "python", what is s[-1]?', c: ['"n"', '"p"', '"o"', 'An error'], a: 0, why: '-1 is the last character.' },
    { u: 8, t: 'mc', q: 'If s = "python", what is s[1:4]?', c: ['"yth"', '"pyth"', '"ytho"', '"yt"'], a: 0, why: 'It includes index 1 and excludes index 4.' },
    { u: 8, t: 'mc', q: 'If s = "python", what is s[:2]?', c: ['"py"', '"pyt"', '"on"', '"p"'], a: 0, why: 'It starts at the beginning and stops before index 2.' },
    { u: 8, t: 'mc', q: 'If s = "python", what is s[3:]?', c: ['"hon"', '"thon"', '"pyt"', '"ho"'], a: 0, why: 'It starts at index 3 and goes to the end.' },
    { u: 8, t: 'mc', q: 'What error do you get from "hi"[5]?', c: ['IndexError', 'SyntaxError', 'TypeError', 'ValueError'], a: 0, why: 'The index is out of range.' },
    { u: 8, t: 'mc', q: 'Why does s[0] = "J" cause an error?', c: ['Strings are immutable', 'Indexes cannot be 0', 'J is not a letter', 'Strings must be lowercase'], a: 0, why: 'You must create a new string instead.' },
    { u: 8, t: 'mc', q: 'What does "hello".find("l") return?', c: ['2', '3', '1', '-1'], a: 0, why: 'The first "l" is at index 2.' },
    { u: 8, t: 'mc', q: 'What does "hello".find("z") return?', c: ['-1', '0', 'None', 'An error'], a: 0, why: '.find() returns -1 when nothing is found.' },
    { u: 8, t: 'mc', q: 'What does "Hi".swapcase() return?', c: ['"hI"', '"HI"', '"hi"', '"Hi"'], a: 0, why: 'It flips the case of each letter.' },
    { u: 8, t: 'mc', q: 'What does " hi ".strip() return?', c: ['"hi"', '" hi"', '"hi "', '" hi "'], a: 0, why: '.strip() removes spaces from both ends.' },
    { u: 8, t: 'mc', q: 'Which loop uses each character directly?', c: ['for letter in s:', 'for i in range(len(s)):', 'while s:', 'for s in range():'], a: 0, why: 'The character-based loop goes through the letters themselves.' },
    { u: 8, t: 'mc', q: 'What does "h" in "hello" return?', c: ['True', 'False', '0', 'An error'], a: 0, why: 'in checks whether the text is inside the string.' },
    // Unit 9
    { u: 9, t: 'mc', q: 'How many questions are on the Coding multiple-choice final?', c: ['25', '10', '50', '100'], a: 0, why: 'The exam is 25 multiple-choice questions.' },
    { u: 9, t: 'mc', q: 'What is the final exam coding project submitted through?', c: ['A Google Doc', 'A paper packet', 'An email', 'A video'], a: 0, why: 'It is a practical application submitted in a Google Doc.' }
  ];

  FINALS.addClass('coding', {
    // Shown on this class's Home.
    examFacts: [
      'Final: Fri Dec 18, period 7. A 25-question multiple-choice exam (10% or 20% of the final grade).',
      'It tests vocabulary, code syntax, logical flow and theory.',
      'There is also a final exam coding project, submitted through a Google Doc (10% or 20% of the final grade).'
    ],
    units: units,
    flashcards: flashcards,
    questions: questions
  });
})();
