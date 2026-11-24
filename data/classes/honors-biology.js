// Honors Biology: Semester 1 final (Thu Dec 17, period 6).
// Same format as human-geography.js: units with sections, flashcards, questions and examFacts.
// Lessons are written as HTML with diagrams and cards, in plain 9th-grade language.
// Built from the class notebooks for Units 1-5 and the final exam info.
// The fuel rankings (energy density, CO2 coefficient) are not written out here because the
// numbers are in the teacher's table. Study that table for the order of the 8 fuels.
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

  // small drawing helpers used by the biology pictures
  function dots(x0, y0, n, cols, gap) {
    var out = '';
    for (var i = 0; i < n; i++) {
      out += '<circle cx="' + (x0 + (i % cols) * gap) + '" cy="' + (y0 + Math.floor(i / cols) * gap) + '" r="4" fill="var(--ink)"/>';
    }
    return out;
  }
  function cellShape(cx, cy, r, dash) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="var(--tint)" stroke="var(--accent)" stroke-width="3"' + (dash ? ' stroke-dasharray="5 4"' : '') + '/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + Math.round(r / 3) + '" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/>';
  }
  function barChart(w, h, labels, values, max, unit, title) {
    var n = values.length, bw = Math.floor((w - 80) / n) - 14, out = '', base = h - 50, top = 40, i;
    out += t(w / 2, 22, title, 17, 700);
    out += line(50, base, w - 20, base, false, 'var(--ink)') + line(50, top, 50, base, false, 'var(--ink)');
    for (i = 0; i < n; i++) {
      var bh = Math.round((values[i] / max) * (base - top - 6)), x = 62 + i * (bw + 14);
      out += rect(x, base - bh, bw, bh, 'var(--accent)', 'var(--ink)') + t(x + bw / 2, base - bh - 6, values[i] + unit, 14, 700) + t(x + bw / 2, base + 20, labels[i], 14, 600);
    }
    return out;
  }

  var units = [
    /* ---------- 01 ---------- */
    {
      id: 'u1', num: '01', title: 'Bio Bootcamp', short: 'Bootcamp',
      sections: [
        {
          id: 'u1-life', title: 'Life and viruses',
          simple: 'Viruses are not cells. Antibiotics kill bacteria, not viruses. HIV attacks Helper T cells.',
          html:
            say('Your class has a list of the <b>8 characteristics of life</b>. Know it. Viruses are the classic test case because they are tricky.') +
            h3('How a virus is built') +
            cards([{ i: '🧬', h: 'Genetic material', t: 'DNA or RNA inside.' }, { i: '🛡️', h: 'Capsid', t: 'The protein coat around the genetic material.' }], 220) +
            h3('Two ways a virus copies itself') +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px">' +
              '<div><b style="font:700 24px/1 var(--head);color:var(--accent)">LYTIC (“lysis” = burst)</b>' + flow([{ t: 'Virus enters' }, { t: 'Makes copies' }, { t: 'Cell bursts' }]) + '</div>' +
              '<div><b style="font:700 24px/1 var(--head);color:var(--accent)">LYSOGENIC (hides)</b>' + flow([{ t: 'Virus DNA joins host DNA' }, { t: 'Copied along with the cell' }, { t: 'Activates later' }]) + '</div>' +
            '</div>' +
            cards([
              { i: '🎯', h: 'HIV', t: 'Attacks the CD4 receptor on Helper T cells (immune cells).' },
              { i: '💊', h: 'Antibiotics', t: 'Do NOT work on viruses. They only work on bacteria.' }
            ], 240)
        },
        {
          id: 'u1-molecules', title: 'Biomolecules: the big four',
          simple: 'Small building blocks (monomers) link into big chains (polymers).',
          html:
            say('Every biomolecule is a chain. <b>Monomers</b> are the small beads. A <b>polymer</b> is the whole necklace.') +
            svg(520, 110,
              '<circle cx="50" cy="55" r="14" fill="var(--accent)"/>' + t(50, 95, 'monomer', 15, 700) +
              line(80, 55, 150, 55, true) + t(115, 45, 'link up', 13, 600, 'middle', 'var(--mute)') +
              [180, 215, 250, 285, 320, 355, 390, 425, 460].map(function (x) { return '<circle cx="' + x + '" cy="55" r="14" fill="var(--accent)" stroke="var(--ink)" stroke-width="2"/>'; }).join('') +
              line(194, 55, 201, 55, false, 'var(--ink)') + t(320, 95, 'polymer', 15, 700),
              'Monomers are single beads. A polymer is many monomers linked in a chain.') +
            tbl(['Biomolecule', 'Monomer (bead)', 'Polymer (chain)'], [
              ['Carbohydrates', 'Monosaccharide (simple sugar, like glucose)', 'Polysaccharide'],
              ['Lipids', 'Fatty acids and glycerol', 'Fats, oils, waxes'],
              ['Proteins', 'Amino acids', 'Polypeptide / protein'],
              ['Nucleic acids', 'Nucleotides', 'DNA and RNA']
            ])
        },
        {
          id: 'u1-membrane', title: 'Moving through the membrane',
          simple: 'Passive transport is free and goes high to low. Active transport costs energy and goes low to high. Water follows the salt: hypotonic swells, hypertonic shrinks.',
          html:
            h3('Passive vs. active transport') +
            svg(560, 230,
              rect(20, 100, 240, 26, 'var(--fill)') + rect(300, 100, 240, 26, 'var(--fill)') +
              t(30, 118, 'cell membrane', 14, 600, 'start', 'var(--mute)') + t(310, 118, 'cell membrane', 14, 600, 'start', 'var(--mute)') +
              dots(60, 30, 12, 6, 28) + dots(80, 160, 2, 2, 30) +
              line(140, 80, 140, 150, true) +
              t(140, 205, 'PASSIVE: high → low, no energy', 15, 700) +
              dots(360, 30, 3, 3, 30) + dots(340, 150, 12, 6, 28) +
              line(420, 150, 420, 80, true) + t(470, 78, '⚡ ATP', 15, 700, 'middle', 'var(--accent)') +
              t(420, 218, 'ACTIVE: low → high, uses ATP', 15, 700),
              'Passive transport moves particles from many to few with no energy. Active transport moves them from few to many using ATP.') +
            h3('Osmosis: water follows the salt') +
            svg(560, 250,
              cellShape(95, 100, 44) + line(20, 100, 48, 100, true) + line(170, 100, 142, 100, true) + line(95, 25, 95, 52, true) + line(95, 175, 95, 148, true) +
              t(95, 205, 'HYPOTONIC', 16, 700, 'middle', 'var(--accent)') + t(95, 225, 'less solute outside', 13) + t(95, 242, 'water IN → swells', 13, 700) +
              cellShape(280, 100, 34) + line(215, 100, 238, 100, true) + line(240, 100, 217, 100, true) + line(345, 100, 322, 100, true) + line(322, 100, 345, 100, true) +
              t(280, 205, 'ISOTONIC', 16, 700, 'middle', 'var(--accent)') + t(280, 225, 'equal solute', 13) + t(280, 242, 'no net movement', 13, 700) +
              cellShape(465, 100, 24, true) + line(440, 100, 400, 100, true) + line(490, 100, 530, 100, true) + line(465, 74, 465, 36, true) + line(465, 126, 465, 164, true) +
              t(465, 205, 'HYPERTONIC', 16, 700, 'middle', 'var(--accent)') + t(465, 225, 'more solute outside', 13) + t(465, 242, 'water OUT → shrinks', 13, 700),
              'Three cells. In hypotonic solution water moves in and the cell swells. In isotonic solution nothing changes. In hypertonic solution water moves out and the cell shrinks.') +
            cards([{ i: '🥚', h: 'Egg osmosis lab', t: 'An egg in different liquids swells or shrinks.' }, { i: '🧪', h: 'Dialysis tubing lab', t: 'Tubing acts like a membrane, so only some things pass through.' }], 240)
        },
        {
          id: 'u1-cer', title: 'CER: Claim, Evidence, Reasoning',
          simple: 'Answer the question, back it up with data, then explain why the data proves it.',
          html:
            flow([{ t: 'C: Claim', s: 'The answer to the question' }, { t: 'E: Evidence', s: 'Data that backs it up' }, { t: 'R: Reasoning', s: 'Science that connects the evidence to the claim' }]) +
            tip('Also in this unit', 'Use the <b>cell ID flowchart</b> from class to tell cell types apart.')
        }
      ]
    },
    /* ---------- 02 ---------- */
    {
      id: 'u2', num: '02', title: 'What’s in YOUR Water', short: 'Water',
      sections: [
        {
          id: 'u2-water', title: 'Water facts',
          simple: 'Almost all water is salty. Only 1% is fresh water we can use.',
          html:
            svg(560, 130,
              rect(20, 40, 520, 40, 'var(--surface)') +
              rect(20, 40, 505, 40, 'var(--accent)') + rect(525, 40, 10, 40, 'var(--ink)') + rect(535, 40, 5, 40, 'var(--tint)') +
              t(272, 66, '97% saltwater', 20, 700, 'middle', 'var(--on-accent)') +
              t(525, 28, '2% frozen', 15, 700, 'end') + t(540, 108, '1% freshwater', 15, 700, 'end', 'var(--accent)'),
              'A bar showing Earth’s water: 97 percent saltwater, 2 percent frozen, 1 percent freshwater.') +
            tiles([{ n: '50', t: 'gallons of water used per person per day' }, { n: '$2', t: 'per 1,000 gallons' }, { n: '50', t: 'mg/L nitrate standard in Germany' }])
        },
        {
          id: 'u2-cells', title: 'Cells and food',
          simple: 'Prokaryotes have no nucleus. Eukaryotes do. Autotrophs make food. Heterotrophs eat food.',
          html:
            svg(520, 190,
              '<circle cx="130" cy="85" r="60" fill="var(--tint)" stroke="var(--accent)" stroke-width="3"/>' +
              '<path d="M95 80 q15 -20 30 0 t30 0 t-15 30 t-40 5" fill="none" stroke="var(--ink)" stroke-width="3"/>' + t(130, 168, 'PROKARYOTE: no nucleus', 15, 700) +
              '<circle cx="390" cy="85" r="60" fill="var(--tint)" stroke="var(--accent)" stroke-width="3"/>' +
              '<circle cx="390" cy="85" r="31" fill="var(--surface)" stroke="var(--ink)" stroke-width="3"/>' + t(390, 90, 'nucleus', 13, 700) + t(390, 168, 'EUKARYOTE: has a nucleus', 15, 700),
              'A prokaryote cell with loose DNA and no nucleus next to a eukaryote cell with a nucleus.') +
            cards([
              { i: '🌱', h: 'Autotroph', t: 'Makes its own food (plants, algae).' },
              { i: '🦐', h: 'Heterotroph', t: 'Eats other living things for food.' }
            ], 220) +
            h3('Organelles: know the job of each') +
            cards([
              { h: 'Nucleus', t: 'Control center. Holds DNA.' }, { h: 'Mitochondria', t: 'Makes ATP energy.' }, { h: 'Chloroplast', t: 'Does photosynthesis (plants).' },
              { h: 'Ribosome', t: 'Builds proteins.' }, { h: 'Cell membrane', t: 'Controls what goes in and out.' }, { h: 'Cell wall', t: 'Stiff outer support (plants).' }
            ], 170) +
            tip('Tip', 'Use your class notes for the full organelle list. These are the common ones.')
        },
        {
          id: 'u2-measure', title: 'Measuring water quality',
          simple: 'Turbidity is cloudiness. TDS is dissolved stuff in ppm. Percent recovered = final divided by start, times 100.',
          html:
            h3('Turbidity = how cloudy') +
            svg(520, 230,
              rect(20, 110, 280, 110, 'var(--tint)') + t(160, 205, 'water', 14, 600, 'middle', 'var(--mute)') +
              line(160, 20, 160, 130, false, 'var(--ink)') + '<rect x="130" y="130" width="60" height="12" fill="var(--surface)" stroke="var(--ink)" stroke-width="2"/>' +
              t(160, 15, 'Secchi disk on a rope', 14, 700) +
              t(330, 70, 'Lower the disk until you', 15, 600, 'start') + t(330, 92, 'can no longer see it.', 15, 600, 'start') + t(330, 114, 'Read the depth.', 15, 600, 'start') +
              t(330, 160, 'Max reading: 100 mm', 16, 700, 'start', 'var(--accent)') + t(330, 185, 'Or use a laser method.', 14, 600, 'start', 'var(--mute)'),
              'A Secchi disk lowered into water on a rope. The depth where it disappears shows how cloudy the water is.') +
            cards([
              { h: 'TDS', t: 'Total dissolved solids. Measured in ppm (parts per million).' },
              { h: 'Microbial colony count', t: 'Count the colonies that grow to see how many living things were in the water.' }
            ], 240) +
            h3('Percent recovered') +
            flow([{ t: 'final ÷ start', s: 'how much you ended with ÷ how much you began with' }, { t: '× 100', s: 'turn it into a percent' }]) +
            h3('Filter budget challenge') +
            tiles([{ n: '$2.00', t: 'budget' }, { n: '500 mL', t: 'water to clean' }, { n: '40 min', t: 'time limit' }]) +
            tip('Study', 'Know your <b>three purification processes</b> from class.')
        },
        {
          id: 'u2-shrimp', title: 'Ghost shrimp caffeine experiment',
          simple: 'The shrimp’s heart rate was measured at different caffeine doses.',
          html:
            flow([{ t: 'IV: caffeine', s: 'mg/mL, what the scientists changed' }, { t: 'DV: heart rate', s: 'beats per minute (bpm), what they measured' }]) +
            svg(520, 240, barChart(520, 240, ['1', '2', '3', '4', '5'], [292, 291, 290, 272, 242], 300, '', 'Heart rates recorded (bpm)'), 'Bar chart of five ghost shrimp heart rates: 292, 291, 290, 272 and 242 beats per minute.') +
            tip('Study', 'Use your class table to match each heart rate to its caffeine dose.')
        }
      ]
    },
    /* ---------- 03 ---------- */
    {
      id: 'u3', num: '03', title: 'Got Caffeine', short: 'Caffeine',
      sections: [
        {
          id: 'u3-science', title: 'How science works',
          simple: 'Observations are what you see. Inferences are what you conclude. Peer review means other scientists check the work.',
          html:
            cards([
              { i: '👀', h: 'Observation', t: 'What you sense or measure. “The shrimp moved 3 times.”' },
              { i: '💭', h: 'Inference', t: 'A conclusion you make from observations. “The shrimp is probably stressed.”' }
            ], 240) +
            h3('Peer review') +
            flow([{ t: 'Scientist runs a study' }, { t: 'Writes it up' }, { t: 'Other scientists check it' }, { t: 'Published and trusted' }]) +
            cards([{ i: '🔤', h: 'Qualitative data', t: 'Descriptions: colors, smells, how it looks.' }, { i: '🔢', h: 'Quantitative data', t: 'Numbers: 0.252 s, 40 adults.' }], 240)
        },
        {
          id: 'u3-hyp', title: 'Hypothesis and variables',
          simple: 'A hypothesis follows “If… then… because…”. The IV is what you change. The DV is what you measure.',
          html:
            flow([{ t: 'If [IV changes]', s: 'what you change' }, { t: 'then [DV does this]', s: 'what you measure' }, { t: 'because [reason]', s: 'the science idea' }]) +
            cards([
              { k: 'IV', h: 'Independent variable', t: 'What you change on purpose.' },
              { k: 'DV', h: 'Dependent variable', t: 'What you measure. It depends on the IV.' },
              { k: 'Control', h: 'Control group', t: 'The group with no treatment, for comparing.' },
              { k: 'Constants', h: 'Constants', t: 'Everything you keep the same so the test is fair.' }
            ], 200) +
            tip('Example', 'Caffeine shrimp test: <b>IV</b> = caffeine dose. <b>DV</b> = heart rate. <b>Control</b> = no caffeine. <b>Constants</b> = same water temperature, same kind of shrimp.')
        },
        {
          id: 'u3-graph', title: 'Graphing rules',
          simple: 'IV on the x-axis, DV on the y-axis. Line graph for time. Start at 0, use even steps and give a title.',
          html:
            svg(520, 280,
              t(260, 24, 'Descriptive title: DV changes with IV', 16, 700) +
              line(70, 50, 70, 220, false, 'var(--ink)') + line(70, 220, 480, 220, false, 'var(--ink)') +
              '<polyline points="70,200 150,170 230,150 310,110 390,90 470,60" fill="none" stroke="var(--accent)" stroke-width="3"/>' +
              [70, 150, 230, 310, 390, 470].map(function (x, i) { return '<circle cx="' + x + '" cy="' + [200, 170, 150, 110, 90, 60][i] + '" r="5" fill="var(--accent)"/>' + t(x, 240, i * 10, 14); }).join('') +
              t(275, 268, 'x-axis: IV (what you change)', 15, 700) +
              '<text transform="translate(22,140) rotate(-90)" text-anchor="middle" style="font:700 15px var(--body)" fill="var(--ink)">y-axis: DV (what you measure)</text>' +
              t(52, 224, '0', 14, 600, 'end') + t(300, 136, 'even steps ↔', 13, 600, 'start', 'var(--mute)'),
              'A line graph with a title, IV on the horizontal axis, DV on the vertical axis, starting at zero with even steps.') +
            tbl(['Rule', 'Do this'], [
              ['Title', 'Make it descriptive'], ['Axes', 'IV on x. DV on y.'], ['Type', 'Line graph for time or continuous data'], ['Numbers', 'Start at 0 and use even intervals']
            ])
        },
        {
          id: 'u3-caffeine', title: 'Caffeine and adenosine',
          simple: 'Caffeine blocks adenosine from the receptors that make you sleepy.',
          html:
            svg(560, 240,
              rect(40, 90, 200, 36, 'var(--fill)') + t(48, 113, 'receptor', 14, 600, 'start', 'var(--mute)') +
              '<circle cx="140" cy="60" r="22" fill="var(--accent)"/>' + t(140, 65, 'A', 16, 700, 'middle', 'var(--on-accent)') + line(140, 82, 140, 90, true) +
              t(140, 160, 'Adenosine fits the receptor', 15, 700) + t(140, 182, '→ you feel sleepy 😴', 15, 600) +
              rect(320, 90, 200, 36, 'var(--fill)') + t(328, 113, 'receptor', 14, 600, 'start', 'var(--mute)') +
              '<circle cx="450" cy="102" r="20" fill="var(--ink)"/>' + t(450, 108, 'C', 16, 700, 'middle', 'var(--surface)') +
              '<circle cx="470" cy="50" r="16" fill="var(--accent)"/>' + t(470, 55, 'A', 14, 700, 'middle', 'var(--on-accent)') + t(498, 78, '✕', 22, 700, 'middle', 'var(--accent)') +
              t(420, 160, 'Caffeine blocks the receptor', 15, 700) + t(420, 182, '→ you feel awake ⚡', 15, 600),
              'Left: adenosine fits a receptor and makes you sleepy. Right: caffeine blocks the receptor so adenosine cannot, and you feel awake.') +
            h3('Data sets to know') +
            tiles([{ n: '40', t: 'adults in the sleep study' }, { n: '0.252 → 0.219 s', t: 'reaction time' }, { n: '9.9 · 11.4 · 13.2', t: 'leaf miner photosynthesis rates' }, { n: '0.20 · 0.26 · 0.27', t: 'leaf miner conductance' }]) +
            cards([
              { h: 'Other labs', t: 'Erythritol study · brine shrimp experiment (0–50%) · push-ups BTB lab' },
              { h: 'Statistics', t: 'Know standard deviation and standard error.' }
            ], 260)
        }
      ]
    },
    /* ---------- 04 ---------- */
    {
      id: 'u4', num: '04', title: 'Blood, Sweat and Air', short: 'Respiration',
      sections: [
        {
          id: 'u4-atp', title: 'ATP and cellular respiration',
          simple: 'ATP is the cell’s energy battery. Respiration turns glucose and oxygen into ATP, CO₂ and water.',
          html:
            svg(520, 190,
              '<circle cx="110" cy="95" r="52" fill="var(--accent)"/>' + t(110, 90, 'ATP', 26, 700, 'middle', 'var(--on-accent)') + t(110, 112, 'charged', 14, 600, 'middle', 'var(--on-accent)') +
              '<circle cx="410" cy="95" r="52" fill="var(--fill)" stroke="var(--ink)" stroke-width="3"/>' + t(410, 90, 'ADP', 26, 700) + t(410, 112, 'used up', 14, 600) +
              '<path d="M165 70 C220 30 300 30 355 70" fill="none" stroke="var(--accent)" stroke-width="3" marker-end="url(#ah)"/>' + t(260, 38, 'energy released', 14, 700) +
              '<path d="M355 125 C300 165 220 165 165 125" fill="none" stroke="var(--accent)" stroke-width="3" marker-end="url(#ah)"/>' + t(260, 175, 'cells recharge it', 14, 700),
              'ATP releases energy and becomes ADP. Cells recharge ADP back into ATP.') +
            tip('The equation', '<b style="font-size:20px">C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP</b><br>Glucose + oxygen → carbon dioxide + water + energy') +
            h3('Three stages') +
            flow([{ t: '1. Glycolysis', s: 'Cytoplasm' }, { t: '2. Krebs cycle', s: 'Mitochondrial matrix' }, { t: '3. Electron transport chain (ETC)', s: 'Inner mitochondrial membrane' }])
        },
        {
          id: 'u4-anaerobic', title: 'Aerobic vs. anaerobic',
          simple: 'Aerobic uses oxygen. Anaerobic does not. Muscles make lactic acid. Yeast makes alcohol.',
          html:
            cards([
              { k: 'With oxygen', h: 'Aerobic respiration', t: 'Makes lots of ATP.' },
              { k: 'Without oxygen', h: 'Anaerobic respiration', t: 'Makes less ATP. Uses fermentation.' },
              { i: '💪', h: 'Lactic acid fermentation', t: 'Happens in muscle cells.' },
              { i: '🍞', h: 'Alcoholic fermentation', t: 'Happens in yeast. Makes ethanol and CO₂.' }
            ], 220) +
            tip('Test trap', 'Delayed muscle soreness is <b>NOT</b> caused by lactic acid.', true)
        },
        {
          id: 'u4-homeo', title: 'Homeostasis and feedback loops',
          simple: 'Homeostasis is keeping your body steady. Negative feedback fixes a change. Positive feedback pushes it further.',
          html:
            say('<b>Homeostasis</b> means keeping your body’s conditions steady, like temperature and blood sugar. Your body uses a loop to do it.') +
            flow([{ t: 'Stimulus', s: 'something changes' }, { t: 'Receptor', s: 'senses it' }, { t: 'Control center', s: 'decides what to do' }, { t: 'Effector', s: 'carries it out' }, { t: 'Response', s: 'fixes it' }]) +
            cards([
              { k: 'Negative feedback', h: 'Reverses the change', t: 'Brings you back to normal. Most body loops work this way.' },
              { k: 'Positive feedback', h: 'Pushes it further', t: 'Makes the change bigger.' }
            ], 240) +
            h3('Blood glucose') +
            svg(520, 150,
              rect(20, 50, 130, 50, 'var(--surface)') + t(85, 80, 'Glucose too HIGH', 14, 700) +
              line(150, 75, 238, 75, true) + t(194, 62, 'insulin', 13, 700, 'middle', 'var(--accent)') +
              rect(240, 50, 80, 50, 'var(--tint)', 'var(--accent)') + t(280, 80, 'normal', 16, 700) +
              rect(400, 50, 120, 50, 'var(--surface)') + t(460, 80, 'Glucose too LOW', 14, 700) +
              line(398, 75, 322, 75, true) + t(360, 62, 'glucagon', 13, 700, 'middle', 'var(--accent)') +
              t(194, 125, 'insulin lowers it', 14, 700) + t(360, 125, 'glucagon raises it', 14, 700),
              'Insulin lowers high blood glucose back to normal. Glucagon raises low blood glucose back to normal.') +
            pills(['thermoregulation', 'CO₂ regulation', 'blood pressure', 'blood glucose'])
        },
        {
          id: 'u4-labs', title: 'Blood, gas exchange and labs',
          simple: 'In the alveoli, oxygen goes into the blood and CO₂ comes out.',
          html:
            svg(520, 200,
              rect(30, 40, 200, 120, 'var(--tint)', 'var(--accent)') + t(130, 70, 'ALVEOLUS', 16, 700) + t(130, 92, '(air sac)', 14, 600, 'middle', 'var(--mute)') +
              rect(290, 40, 200, 120, 'var(--fill)') + t(390, 70, 'CAPILLARY', 16, 700) + t(390, 92, '(blood)', 14, 600, 'middle', 'var(--mute)') +
              line(235, 105, 285, 105, true) + t(260, 98, 'O₂', 16, 700, 'middle', 'var(--accent)') +
              line(285, 135, 235, 135, true) + t(260, 158, 'CO₂', 16, 700, 'middle', 'var(--accent)'),
              'Oxygen moves from the alveolus into the capillary blood. Carbon dioxide moves from the blood into the alveolus.') +
            tip('Study', 'Know the <b>blood components</b> from your notes.') +
            cards([
              { i: '🎈', h: 'Yeast balloon lab', t: 'Yeast ferments sugar and makes CO₂, which inflates the balloon.' },
              { i: '💨', h: 'Push-ups BTB lab', t: 'Bromothymol blue (BTB) changes color when it detects CO₂ from your breath.' }
            ], 260)
        }
      ]
    },
    /* ---------- 05 ---------- */
    {
      id: 'u5', num: '05', title: 'Biofuels', short: 'Biofuels',
      sections: [
        {
          id: 'u5-eq', title: 'Key equations',
          simple: 'Photosynthesis and respiration are opposites. Learn the three equations.',
          html:
            svg(520, 190,
              rect(20, 20, 170, 50, 'var(--tint)', 'var(--accent)') + t(105, 42, 'PHOTOSYNTHESIS', 16, 700) + t(105, 60, 'CO₂ + H₂O + light', 15, 600) +
              rect(330, 20, 170, 50, 'var(--tint)', 'var(--accent)') + t(415, 42, 'RESPIRATION', 16, 700) + t(415, 60, 'glucose + O₂', 15, 600) +
              line(192, 45, 328, 45, true) + t(260, 34, 'glucose + O₂', 15, 600, 'middle', 'var(--mute)') +
              line(330, 92, 194, 92, true) + t(260, 118, 'CO₂ + H₂O + ATP', 15, 600, 'middle', 'var(--mute)') +
              t(260, 160, 'Each one makes what the other one uses.', 16, 700),
              'Photosynthesis makes glucose and oxygen, which respiration uses. Respiration makes carbon dioxide and water, which photosynthesis uses.') +
            tbl(['Process', 'Equation'], [
              ['Photosynthesis', '6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂'],
              ['Fermentation', 'C₆H₁₂O₆ → 2CH₃CH₂OH + 2CO₂'],
              ['Catalase', '2H₂O₂ → 2H₂O + O₂']
            ])
        },
        {
          id: 'u5-fuels', title: 'Fuels',
          simple: 'Compare 8 fuels by energy density and by CO₂ made. Use your class table for the order.',
          html:
            h3('The 8 fuels') +
            pills(['ethanol', 'biodiesel', 'propane', 'gasoline E10', 'natural gas', 'methanol', 'diesel', 'kerosene']) +
            cards([
              { k: 'Energy density', h: 'kJ per unit mass', t: 'How much energy a fuel stores. Higher is better.' },
              { k: 'CO₂ coefficient', h: 'kg CO₂ per kg fuel', t: 'How much CO₂ burning it makes. Lower is cleaner.' }
            ], 240) +
            tip('Study', 'Rank the 8 fuels 1–8 for each one using the teacher’s table. Know the combustion math: <b>ΔCO₂ ÷ Δfuel</b> and <b>Δtemp ÷ Δfuel</b>.')
        },
        {
          id: 'u5-labs', title: 'Labs',
          simple: 'Know the key number or fact from each lab.',
          html:
            h3('Fermentation Factories: ethanol made by each bag') +
            svg(520, 240, barChart(520, 240, ['A', 'B', 'C', 'D', 'E', 'F'], [1.5, 0.1, 0.8, 0.1, 0.2, 0.1], 1.6, '%', 'Ethanol % by bag'), 'Bar chart of ethanol percent by bag: A 1.5, B 0.1, C 0.8, D 0.1, E 0.2, F 0.1.') +
            cards([
              { i: '🌿', h: 'Algae', t: 'Nannochloropsis. Measured with a Secchi disk protocol.' },
              { i: '🥩', h: 'Catalase / liver', t: '25 nanoseconds. 40 million molecules per second.' },
              { i: '🕯️', h: 'Combustion', t: 'Paraffin vs. beeswax. BTB indicator. 15 minutes.' },
              { i: '🧪', h: 'Biomolecules', t: 'Glucose, caproic acid, glutamic acid.' }
            ], 230)
        },
        {
          id: 'u5-vocab', title: 'Vocabulary',
          simple: 'Enzymes are helpers. The substrate fits the active site like a key in a lock.',
          html:
            h3('Enzymes: the lock and key') +
            svg(560, 200,
              '<path d="M40 70 h110 v34 h44 v-34 h116 v90 h-270 z" fill="var(--tint)" stroke="var(--accent)" stroke-width="3"/>' + t(100, 140, 'ENZYME', 16, 700) +
              '<path d="M154 44 h36 v50 h-36 z" fill="var(--ink)"/>' + t(172, 36, 'substrate', 13, 700) + t(172, 120, '↑', 14, 700, 'middle', 'var(--accent)') + t(172, 137, 'active site', 12, 600, 'middle', 'var(--mute)') +
              t(170, 188, 'substrate fits the active site', 14, 700) +
              line(330, 90, 400, 90, true) +
              '<path d="M420 50 h60 v50 h-60 z" fill="var(--accent)"/>' + t(450, 40, 'products', 14, 700) + t(450, 140, 'enzyme is reused', 13, 600, 'middle', 'var(--mute)'),
              'A substrate fits into an enzyme’s active site like a key into a lock. The enzyme turns it into products and can be reused.') +
            cards([
              { h: 'Substrate', t: 'The molecule the enzyme works on.' }, { h: 'Active site', t: 'The spot on the enzyme where the substrate fits.' },
              { h: 'Activation energy', t: 'The push needed to start a reaction. Enzymes lower it.' }, { h: 'Denaturation', t: 'The enzyme loses its shape and stops working.' },
              { h: 'Amylase', t: 'Enzyme that breaks down starch.' }, { h: 'Glucoamylase', t: 'Enzyme that breaks starch into glucose.' }
            ], 200) +
            h3('Energy and matter') +
            cards([
              { h: 'Conservation laws', t: 'Energy and matter are never created or destroyed. They change form.' },
              { h: 'Potential vs. kinetic', t: 'Stored energy vs. energy of motion.' },
              { h: 'Endergonic', t: 'Takes in energy.' }, { h: 'Exergonic', t: 'Releases energy.' }
            ], 200) +
            h3('Photosynthesis words') +
            pills([
              { w: 'chloroplast', m: 'where it happens' }, { w: 'chlorophyll', m: 'green pigment that catches light' }, { w: 'photon', m: 'a particle of light' },
              { w: 'thylakoid', m: 'light-dependent reactions' }, { w: 'stroma', m: 'light-independent reactions' }, { w: 'electron carriers', m: 'move energy along' },
              { w: 'autotroph / heterotroph', m: 'makes vs. eats food' }, { w: 'ATP', m: 'cell energy' }
            ]) +
            h3('Building and breaking molecules') +
            cards([
              { h: 'Dehydration synthesis', t: 'Builds a polymer and removes water.' }, { h: 'Hydrolysis', t: 'Breaks a polymer and adds water.' },
              { h: 'Macromolecules', t: 'Carbohydrates, lipids, proteins.' }, { h: 'Monomers / polymers', t: 'Small beads / long chains.' }
            ], 200) +
            pills(['ethanol', 'yeast', 'combustion', 'energy density', 'CO₂ coefficient'])
        }
      ]
    },
    /* ---------- 06 ---------- */
    {
      id: 'u6', num: '06', title: 'Final Exam Format', short: 'Exam',
      sections: [
        {
          id: 'u6-format', title: 'What is on the exam',
          simple: 'Units 1–5. Multiple choice plus passage and infographic questions.',
          html:
            tiles([{ n: '1–5', t: 'units covered' }, { n: 'MC', t: 'multiple choice / identification' }, { n: '📊', t: 'passage or infographic analysis' }]) +
            tip('How to study', 'Use the <b>Learning Objectives</b> and your old <b>Pear Assessment</b> quizzes.') +
            tbl(['Graphing standard', 'Do this'], [
              ['Title', 'Descriptive'], ['Axes', 'IV on x, DV on y'], ['Graph type', 'Line graph for continuous time data'], ['Scale', 'Start at 0, even intervals']
            ]) +
            say('You may also write <b>trend statements</b> with or without numbers as evidence.')
        },
        {
          id: 'u6-cer', title: 'CER rubric (5 points)',
          simple: 'Claim has no numbers. Evidence has 2 bullets with 2+ numbers each. Reasoning is 3 sentences max.',
          html:
            cards([
              { k: 'C', h: 'Claim', t: 'No numbers.' },
              { k: 'E', h: 'Evidence', t: '2 bullet points. Each one has at least 2 numbers.' },
              { k: 'R', h: 'Reasoning', t: 'Maximum 3 sentences. Follow the template.' }
            ], 220) +
            tip('Test trap', 'Numbers in your <b>claim</b> lose the point. Numbers belong in the <b>evidence</b>.', true)
        }
      ]
    }
  ];

  var flashcards = [
    { u: 1, front: 'Capsid', back: 'The protein coat of a virus.' },
    { u: 1, front: 'Lytic vs. lysogenic cycle', back: 'Lytic: virus copies itself and bursts the cell. Lysogenic: virus DNA hides in the host DNA.' },
    { u: 1, front: 'What does HIV attack?', back: 'CD4 receptors on Helper T cells.' },
    { u: 1, front: 'Do antibiotics work on viruses?', back: 'No. Antibiotics only work on bacteria.' },
    { u: 1, front: 'Monomer of proteins', back: 'Amino acids' },
    { u: 1, front: 'Monomer of nucleic acids', back: 'Nucleotides' },
    { u: 1, front: 'Passive vs. active transport', back: 'Passive: no energy, high to low. Active: uses ATP, low to high.' },
    { u: 1, front: 'Osmosis', back: 'Movement of water across a membrane.' },
    { u: 1, front: 'Hypotonic solution', back: 'Less solute outside the cell. Water moves in and the cell swells.' },
    { u: 1, front: 'Hypertonic solution', back: 'More solute outside the cell. Water moves out and the cell shrinks.' },
    { u: 1, front: 'Isotonic solution', back: 'Equal solute inside and out. No net water movement.' },
    { u: 1, front: 'CER', back: 'Claim, Evidence, Reasoning.' },
    { u: 2, front: 'Earth’s water split', back: '97% saltwater, 2% frozen, 1% freshwater.' },
    { u: 2, front: 'Prokaryote vs. eukaryote', back: 'Prokaryote has no nucleus. Eukaryote has a nucleus.' },
    { u: 2, front: 'Autotroph vs. heterotroph', back: 'Autotroph makes its own food. Heterotroph eats other organisms.' },
    { u: 2, front: 'Turbidity', back: 'How cloudy the water is. Measured with a laser method or a Secchi disk.' },
    { u: 2, front: 'TDS', back: 'Total dissolved solids, measured in ppm.' },
    { u: 2, front: 'Percent recovered', back: '(final ÷ start) × 100' },
    { u: 2, front: 'Ghost shrimp experiment: IV and DV', back: 'IV: mg/mL of caffeine. DV: heart rate in bpm.' },
    { u: 2, front: 'Filter budget challenge limits', back: '$2.00, 500 mL, 40 minutes.' },
    { u: 3, front: 'Hypothesis format', back: 'If [IV], then [DV], because [reasoning].' },
    { u: 3, front: 'Independent variable', back: 'What you change on purpose.' },
    { u: 3, front: 'Dependent variable', back: 'What you measure.' },
    { u: 3, front: 'Constants', back: 'Variables you keep the same.' },
    { u: 3, front: 'Observation vs. inference', back: 'Observation: what you sense or measure. Inference: a conclusion from it.' },
    { u: 3, front: 'Qualitative vs. quantitative', back: 'Qualitative: descriptions. Quantitative: numbers.' },
    { u: 3, front: 'Which axis for the IV?', back: 'The x-axis. The DV goes on the y-axis.' },
    { u: 3, front: 'What does caffeine do?', back: 'It blocks adenosine receptors, so you feel less sleepy.' },
    { u: 3, front: 'Peer review', back: 'Other scientists check a study before it is trusted.' },
    { u: 4, front: 'Cellular respiration equation', back: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP' },
    { u: 4, front: 'Where does glycolysis happen?', back: 'The cytoplasm.' },
    { u: 4, front: 'Where does the Krebs cycle happen?', back: 'The mitochondrial matrix.' },
    { u: 4, front: 'Where does the ETC happen?', back: 'The inner mitochondrial membrane.' },
    { u: 4, front: 'Lactic acid fermentation vs. alcoholic fermentation', back: 'Lactic acid: muscle cells. Alcoholic: yeast.' },
    { u: 4, front: 'Does lactic acid cause delayed muscle soreness?', back: 'No.' },
    { u: 4, front: 'Parts of a feedback loop', back: 'Stimulus, receptor, control center, effector, response.' },
    { u: 4, front: 'Negative vs. positive feedback', back: 'Negative reverses a change. Positive pushes it further.' },
    { u: 4, front: 'Insulin vs. glucagon', back: 'Insulin lowers blood glucose. Glucagon raises it.' },
    { u: 5, front: 'Photosynthesis equation', back: '6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂' },
    { u: 5, front: 'Fermentation equation', back: 'C₆H₁₂O₆ → 2CH₃CH₂OH + 2CO₂' },
    { u: 5, front: 'Catalase equation', back: '2H₂O₂ → 2H₂O + O₂' },
    { u: 5, front: 'Energy density', back: 'kJ of energy per unit mass of fuel.' },
    { u: 5, front: 'CO₂ coefficient', back: 'kg of CO₂ made per kg of fuel burned.' },
    { u: 5, front: 'The 8 fuels', back: 'Ethanol, biodiesel, propane, gasoline E10, natural gas, methanol, diesel, kerosene.' },
    { u: 5, front: 'Dehydration synthesis vs. hydrolysis', back: 'Dehydration synthesis builds polymers and removes water. Hydrolysis breaks polymers and adds water.' },
    { u: 5, front: 'Endergonic vs. exergonic', back: 'Endergonic takes in energy. Exergonic releases energy.' },
    { u: 5, front: 'Activation energy', back: 'The energy needed to start a reaction. Enzymes lower it.' },
    { u: 5, front: 'Denaturation', back: 'An enzyme loses its shape and stops working.' },
    { u: 5, front: 'Lock and key model', back: 'The substrate fits the enzyme’s active site like a key in a lock.' },
    { u: 5, front: 'Algae used in the lab', back: 'Nannochloropsis' },
    { u: 5, front: 'Thylakoid vs. stroma', back: 'Thylakoid: light-dependent reactions. Stroma: light-independent reactions.' },
    { u: 6, front: 'CER rubric: Claim', back: 'No numbers.' },
    { u: 6, front: 'CER rubric: Evidence', back: '2 bullet points, each with at least 2 numbers.' },
    { u: 6, front: 'CER rubric: Reasoning', back: 'Maximum 3 sentences, following the template.' },
    { u: 6, front: 'Which units are on the final?', back: 'Units 1–5.' }
  ];

  var questions = [
    // Unit 1
    { u: 1, t: 'mc', q: 'What does the capsid of a virus do?', c: ['Forms the protein coat around the genetic material', 'Makes ATP', 'Copies the DNA', 'Stores water'], a: 0, why: 'The capsid is the virus’s protein coat.' },
    { u: 1, t: 'mc', q: 'In the lysogenic cycle, what does the virus DNA do?', c: ['Hides inside the host DNA and is copied with it', 'Bursts the cell right away', 'Is destroyed by the cell', 'Turns into a protein'], a: 0, why: 'Lysogenic means the virus DNA stays hidden in the host DNA. Lytic bursts the cell.' },
    { u: 1, t: 'mc', q: 'Which cells does HIV target?', c: ['Helper T cells (CD4)', 'Red blood cells', 'Skin cells', 'Muscle cells'], a: 0, why: 'HIV attacks CD4 receptors on Helper T cells.' },
    { u: 1, t: 'mc', q: 'Why don’t antibiotics treat a virus?', c: ['Antibiotics only work on bacteria', 'Viruses are too big', 'Viruses are not alive', 'Antibiotics are too weak'], a: 0, why: 'Antibiotics target bacteria, not viruses.' },
    { u: 1, t: 'mc', q: 'What are the monomers of proteins?', c: ['Amino acids', 'Nucleotides', 'Monosaccharides', 'Fatty acids'], a: 0, why: 'Proteins are chains of amino acids.' },
    { u: 1, t: 'mc', q: 'What are the monomers of nucleic acids?', c: ['Nucleotides', 'Amino acids', 'Glucose', 'Glycerol'], a: 0, why: 'DNA and RNA are made of nucleotides.' },
    { u: 1, t: 'mc', q: 'Which type of transport uses energy?', c: ['Active transport', 'Diffusion', 'Osmosis', 'Facilitated diffusion'], a: 0, why: 'Active transport uses ATP to move substances from low to high concentration.' },
    { u: 1, t: 'mc', q: 'An animal cell is placed in a hypotonic solution. What happens?', c: ['Water moves in and the cell swells', 'Water moves out and the cell shrinks', 'Nothing happens', 'The cell makes more ATP'], a: 0, why: 'Hypotonic means less solute outside, so water flows in.' },
    { u: 1, t: 'mc', q: 'An animal cell is placed in a hypertonic solution. What happens?', c: ['Water moves out and the cell shrinks', 'Water moves in and the cell swells', 'Nothing happens', 'The cell divides'], a: 0, why: 'Hypertonic means more solute outside, so water flows out.' },
    { u: 1, t: 'mc', q: 'What does CER stand for?', c: ['Claim, Evidence, Reasoning', 'Cell, Energy, Respiration', 'Control, Experiment, Result', 'Cause, Effect, Response'], a: 0, why: 'CER is Claim, Evidence, Reasoning.' },
    // Unit 2
    { u: 2, t: 'mc', q: 'About what percent of Earth’s water is freshwater?', c: ['1%', '2%', '10%', '97%'], a: 0, why: '97% is saltwater, 2% is frozen, and 1% is freshwater.' },
    { u: 2, t: 'mc', q: 'What is a prokaryote?', c: ['A cell with no nucleus', 'A cell with a nucleus', 'A virus', 'A plant cell'], a: 0, why: 'Prokaryotes, like bacteria, have no nucleus.' },
    { u: 2, t: 'mc', q: 'What is an autotroph?', c: ['An organism that makes its own food', 'An organism that eats others', 'An organism with no cells', 'A decomposer only'], a: 0, why: 'Autotrophs, like plants, make their own food.' },
    { u: 2, t: 'mc', q: 'What does turbidity measure?', c: ['How cloudy the water is', 'How salty the water is', 'The water’s temperature', 'The water’s pH'], a: 0, why: 'Turbidity is cloudiness, measured with a laser method or a Secchi disk.' },
    { u: 2, t: 'mc', q: 'What unit is TDS measured in?', c: ['ppm', 'mL', 'bpm', 'kJ'], a: 0, why: 'Total dissolved solids are measured in parts per million (ppm).' },
    { u: 2, t: 'mc', q: 'Which formula gives percent recovered?', c: ['(final ÷ start) × 100', '(start ÷ final) × 100', 'final − start', 'start × final'], a: 0, why: 'Percent recovered = (final ÷ start) × 100.' },
    { u: 2, t: 'mc', q: 'In the ghost shrimp experiment, what is the dependent variable?', c: ['Heart rate (bpm)', 'Caffeine (mg/mL)', 'The type of shrimp', 'The water temperature'], a: 0, why: 'The DV is what you measure: heart rate in bpm.' },
    { u: 2, t: 'mc', q: 'What was the budget in the filter challenge?', c: ['$2.00', '$5.00', '$10.00', '$20.00'], a: 0, why: 'The filter challenge was $2.00, 500 mL and 40 minutes.' },
    // Unit 3
    { u: 3, t: 'mc', q: 'Which is a correctly formatted hypothesis?', c: ['If the caffeine dose increases, then the shrimp’s heart rate will change, because caffeine affects the body', 'Caffeine makes hearts go faster', 'I think caffeine is bad', 'What does caffeine do?'], a: 0, why: 'Use “If [IV], then [DV], because [reasoning].”' },
    { u: 3, t: 'mc', q: 'What is the independent variable?', c: ['The variable you change on purpose', 'The variable you measure', 'The group with no treatment', 'The variable you keep the same'], a: 0, why: 'The IV is what you change. The DV is what you measure.' },
    { u: 3, t: 'mc', q: 'What are constants?', c: ['Variables kept the same in every group', 'The results', 'The variable you change', 'The hypothesis'], a: 0, why: 'Constants stay the same so the test is fair.' },
    { u: 3, t: 'mc', q: 'Which is an inference?', c: ['The shrimp are probably stressed', 'The shrimp moved 3 times', 'The water is 20°C', 'There are 5 shrimp'], a: 0, why: 'An inference is a conclusion drawn from observations.' },
    { u: 3, t: 'mc', q: 'Which is quantitative data?', c: ['Reaction time of 0.252 s', 'The room smells sweet', 'The water looks cloudy', 'The leaf is green'], a: 0, why: 'Quantitative data is numbers.' },
    { u: 3, t: 'mc', q: 'Which axis does the independent variable go on?', c: ['x-axis', 'y-axis', 'Either axis', 'Neither'], a: 0, why: 'IV on x, DV on y.' },
    { u: 3, t: 'mc', q: 'Which graph fits data collected over time?', c: ['Line graph', 'Pie chart', 'Bar graph only', 'Table only'], a: 0, why: 'Continuous time data uses a line graph.' },
    { u: 3, t: 'mc', q: 'How does caffeine make you feel more awake?', c: ['It blocks adenosine receptors', 'It makes more adenosine', 'It stops your heart', 'It makes more ATP'], a: 0, why: 'Caffeine blocks adenosine receptors, so adenosine cannot make you sleepy.' },
    { u: 3, t: 'mc', q: 'What is peer review?', c: ['Other scientists check a study', 'A teacher grades it', 'A study is repeated by the same person', 'A vote by students'], a: 0, why: 'Peer review means other scientists review the work before it is trusted.' },
    // Unit 4
    { u: 4, t: 'mc', q: 'What is the cellular respiration equation?', c: ['C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP', '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂', '2H₂O₂ → 2H₂O + O₂'], a: 0, why: 'Glucose and oxygen make CO₂, water and ATP.' },
    { u: 4, t: 'mc', q: 'Where does glycolysis happen?', c: ['Cytoplasm', 'Mitochondrial matrix', 'Inner mitochondrial membrane', 'Nucleus'], a: 0, why: 'Glycolysis is in the cytoplasm.' },
    { u: 4, t: 'mc', q: 'Where does the Krebs cycle happen?', c: ['Mitochondrial matrix', 'Cytoplasm', 'Inner mitochondrial membrane', 'Chloroplast'], a: 0, why: 'The Krebs cycle is in the mitochondrial matrix.' },
    { u: 4, t: 'mc', q: 'Where does the electron transport chain happen?', c: ['Inner mitochondrial membrane', 'Cytoplasm', 'Mitochondrial matrix', 'Cell wall'], a: 0, why: 'The ETC is on the inner mitochondrial membrane.' },
    { u: 4, t: 'mc', q: 'What does NOT cause delayed muscle soreness?', c: ['Lactic acid', 'Tiny muscle tears', 'Hard exercise', 'Using unused muscles'], a: 0, why: 'Delayed soreness is not caused by lactic acid.' },
    { u: 4, t: 'mc', q: 'Which organism uses alcoholic fermentation?', c: ['Yeast', 'Human muscle', 'Plants only', 'Viruses'], a: 0, why: 'Yeast does alcoholic fermentation. Muscle cells do lactic acid fermentation.' },
    { u: 4, t: 'mc', q: 'What is the correct order of a feedback loop?', c: ['Stimulus, receptor, control center, effector, response', 'Response, effector, receptor, stimulus', 'Receptor, stimulus, response, effector', 'Stimulus, effector, receptor, response'], a: 0, why: 'A stimulus is detected by a receptor, processed by the control center, and carried out by an effector, causing a response.' },
    { u: 4, t: 'mc', q: 'What does negative feedback do?', c: ['Reverses a change to return to normal', 'Increases the change', 'Stops all changes', 'Makes more ATP'], a: 0, why: 'Negative feedback brings the body back to its set point.' },
    { u: 4, t: 'mc', q: 'Which hormone lowers blood glucose?', c: ['Insulin', 'Glucagon', 'Adrenaline', 'Caffeine'], a: 0, why: 'Insulin lowers it; glucagon raises it.' },
    { u: 4, t: 'mc', q: 'In the yeast balloon lab, what inflates the balloon?', c: ['CO₂ from fermentation', 'Oxygen', 'Ethanol', 'Water vapor'], a: 0, why: 'Yeast fermenting sugar releases CO₂.' },
    // Unit 5
    { u: 5, t: 'mc', q: 'What is the photosynthesis equation?', c: ['6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂', 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP', 'C₆H₁₂O₆ → 2CH₃CH₂OH + 2CO₂', '2H₂O₂ → 2H₂O + O₂'], a: 0, why: 'Plants turn CO₂, water and light into glucose and oxygen.' },
    { u: 5, t: 'mc', q: 'What does the fermentation equation make?', c: ['Ethanol and CO₂', 'Glucose and oxygen', 'Water and oxygen', 'ATP only'], a: 0, why: 'C₆H₁₂O₆ → 2CH₃CH₂OH + 2CO₂.' },
    { u: 5, t: 'mc', q: 'What does catalase break down?', c: ['Hydrogen peroxide (H₂O₂)', 'Glucose', 'Starch', 'Ethanol'], a: 0, why: 'Catalase turns 2H₂O₂ into 2H₂O + O₂.' },
    { u: 5, t: 'mc', q: 'What is energy density?', c: ['Energy in kJ per unit mass of fuel', 'CO₂ made per kg of fuel', 'The fuel’s cost', 'The fuel’s temperature'], a: 0, why: 'Energy density is kJ per unit mass.' },
    { u: 5, t: 'mc', q: 'What is the CO₂ coefficient?', c: ['kg of CO₂ made per kg of fuel', 'kJ per kg of fuel', 'Degrees per gram', 'Grams of water made'], a: 0, why: 'It tells how much CO₂ a fuel makes when burned.' },
    { u: 5, t: 'mc', q: 'Which is one of the 8 fuels in the unit?', c: ['Kerosene', 'Coal', 'Wood', 'Uranium'], a: 0, why: 'The 8 fuels: ethanol, biodiesel, propane, gasoline E10, natural gas, methanol, diesel, kerosene.' },
    { u: 5, t: 'mc', q: 'Which Fermentation Factories bag made the most ethanol?', c: ['Bag A (1.5%)', 'Bag B (0.1%)', 'Bag C (0.8%)', 'Bag F (0.1%)'], a: 0, why: 'Bag A made 1.5% ethanol. C made 0.8%, E 0.2%, and B, D and F 0.1%.' },
    { u: 5, t: 'mc', q: 'What does dehydration synthesis do?', c: ['Builds a polymer and removes water', 'Breaks a polymer and adds water', 'Makes energy', 'Moves water in a cell'], a: 0, why: 'Hydrolysis is the opposite: it breaks polymers by adding water.' },
    { u: 5, t: 'mc', q: 'What is an exergonic reaction?', c: ['One that releases energy', 'One that takes in energy', 'One that needs an enzyme', 'One that makes water'], a: 0, why: 'Exergonic releases energy; endergonic takes it in.' },
    { u: 5, t: 'mc', q: 'What does an enzyme do to activation energy?', c: ['Lowers it', 'Raises it', 'Removes it', 'Doubles it'], a: 0, why: 'Enzymes lower the activation energy so reactions go faster.' },
    { u: 5, t: 'mc', q: 'What is denaturation?', c: ['An enzyme loses its shape and stops working', 'An enzyme is made', 'A substrate is used up', 'A cell divides'], a: 0, why: 'Heat or the wrong pH can change an enzyme’s shape.' },
    { u: 5, t: 'mc', q: 'Which model says the substrate fits the active site exactly?', c: ['Lock and key', 'Fluid mosaic', 'Cell theory', 'Punnett'], a: 0, why: 'The lock and key model fits the substrate into the active site.' },
    { u: 5, t: 'mc', q: 'Which alga was used in the algae lab?', c: ['Nannochloropsis', 'Spirogyra', 'Volvox', 'Kelp'], a: 0, why: 'The lab used Nannochloropsis with a Secchi disk protocol.' },
    // Unit 6
    { u: 6, t: 'mc', q: 'Which units are on the Honors Biology final?', c: ['Units 1–5', 'Units 1–3 only', 'Unit 5 only', 'Units 3–6'], a: 0, why: 'The final covers Units 1–5.' },
    { u: 6, t: 'mc', q: 'What does the Claim of a CER NOT contain?', c: ['Numbers', 'A sentence', 'An answer to the question', 'Any words'], a: 0, why: 'The claim has no numbers.' },
    { u: 6, t: 'mc', q: 'What does the Evidence of a CER need?', c: ['2 bullet points with at least 2 numbers each', '1 sentence with no numbers', '3 paragraphs', 'A graph only'], a: 0, why: 'Evidence: 2 bullets, each with at least 2 numbers.' },
    { u: 6, t: 'mc', q: 'How long can the Reasoning of a CER be?', c: ['Maximum 3 sentences', 'Maximum 1 sentence', 'At least 5 sentences', 'Any length'], a: 0, why: 'Reasoning is a maximum of 3 sentences, following the template.' },
    { u: 6, t: 'mc', q: 'For a scientific graph of heart rate over time, what is correct?', c: ['Descriptive title, time on x-axis, line graph, start at 0', 'No title, time on y-axis', 'Bar graph, uneven intervals', 'Start at the highest value'], a: 0, why: 'Use a title, IV on x, DV on y, line graph for time, start at 0 and use even intervals.' },
    { u: 6, t: 'mc', q: 'What is the 5-point CER scored on?', c: ['Claim, Evidence and Reasoning rules', 'Length only', 'Handwriting', 'The number of graphs'], a: 0, why: 'The rubric checks the claim, the evidence and the reasoning template.' }
  ];

  FINALS.addClass('honors-biology', {
    // Shown on this class's Home.
    examFacts: [
      'Final: Thu Dec 17, period 6. Covers Units 1–5. Study the Learning Objectives and your old Pear Assessment quizzes.',
      'Question types: multiple choice / identification, and applied passage or infographic analysis.',
      'CER is worth 5 points: Claim (no numbers), Evidence (2 bullets, 2+ numbers each), Reasoning (max 3 sentences).'
    ],
    units: units,
    flashcards: flashcards,
    questions: questions
  });
})();
