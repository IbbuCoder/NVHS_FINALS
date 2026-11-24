// Lessons are written as HTML with diagrams and cards, in plain 9th-grade language.
// English I CP: Semester 1 final (Fri Dec 18, period 4). Ms. Reppy.
// Same format as human-geography.js: units with sections, flashcards, questions and examFacts.
// Built from the class notebook: course policies, writing skills, literary terms, The Marrow
// Thieves, Fahrenheit 451, the short stories and the vocab lists.
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

  var units = [
    /* ---------- 01 ---------- */
    {
      id: 'u1', num: '01', title: 'Writing Skills and MLA', short: 'Writing',
      sections: [
        {
          id: 'u1-pov', title: 'Point of view',
          simple: 'In school essays, write in 3rd person: he, she, it, they. Do not use “I” or “you.”',
          html:
            cards([
              { k: '1st person', h: 'I, me, my, mine, we, our, us', t: 'Use for journals, reflections and memoirs.' },
              { k: '2nd person', h: 'you, your, yours', t: 'Use for how-to guides and advice.' },
              { k: '3rd person ✅', h: 'he, she, it, they, them', t: 'Required for academic writing.' }
            ], 220) +
            tip('Test trap', 'In a formal essay, never write “I think” or “you can see.” Say “The author shows…” instead.', true)
        },
        {
          id: 'u1-mla', title: 'MLA formatting',
          simple: 'Cite like (Author 14) with the period after the parenthesis. Italics for novels. Quotation marks for short stories.',
          html:
            tiles([{ n: '1 in', t: 'margins on every side' }, { n: '12 pt', t: 'font size' }, { n: '2×', t: 'double-spaced' }]) +
            h3('In-text citation: (Author Page#)') +
            flow([{ t: '(', s: 'open' }, { t: 'Author', s: 'last name' }, { t: 'Page#', s: 'no comma, no “p.”' }, { t: ')', s: 'close' }, { t: '.', s: 'period goes AFTER' }]) +
            say('Example: The street feels empty <b>(Bradbury 14)</b><b style="color:var(--accent)">.</b>') +
            h3('Titles') +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin:10px 0 16px">' +
              '<div style="border:2px solid var(--ink);background:var(--surface);padding:12px"><b style="font:700 22px/1 var(--head);color:var(--accent)">ITALICS</b><div style="font-size:18px;margin-top:6px"><i>Fahrenheit 451</i><br><i>The Marrow Thieves</i><br><span style="color:var(--mute)">novels and plays</span></div></div>' +
              '<div style="border:2px solid var(--ink);background:var(--surface);padding:12px"><b style="font:700 22px/1 var(--head);color:var(--accent)">“QUOTATION MARKS”</b><div style="font-size:18px;margin-top:6px">“The Pedestrian”<br>“Harrison Bergeron”<br><span style="color:var(--mute)">short stories, poems, articles</span></div></div>' +
            '</div>'
        },
        {
          id: 'u1-intro', title: 'Introduction paragraph (3 parts)',
          simple: 'An intro has a hook, a bridge and a thesis. No question hooks.',
          html:
            stack([
              { n: '1', t: 'Hook', s: 'A universal statement, scenario, quote or fact. It grabs the reader.' },
              { n: '2', t: 'Bridge', s: 'Connects the hook to the text. Names the author and title. 1–2 sentence summary.' },
              { n: '3', t: 'Thesis', s: 'The LAST sentence. It makes your argument.' }
            ]) +
            tip('Test trap', 'A hook can <b>never</b> be a rhetorical question.', true) +
            h3('A thesis has 3 parts') +
            flow([{ t: 'Author + title', s: 'who wrote what' }, { t: 'Thematic claim', s: 'the big idea about life' }, { t: 'Prongs / reasoning', s: 'how you will prove it' }])
        },
        {
          id: 'u1-body', title: 'Body paragraph (5 parts)',
          simple: 'Topic sentence, context, quote, analysis, concluding sentence.',
          html:
            stack([
              { t: 'Topic sentence', s: 'A mini-thesis that previews your evidence.' },
              { t: 'Context', s: '1–2 sentences of background before the quote.' },
              { t: 'Integrated quote', s: 'The author’s exact words with an MLA citation.' },
              { t: 'Analysis', s: '2–3 sentences: how and why the quote proves your claim.' },
              { t: 'Concluding sentence', s: 'Closes the paragraph and repeats your argument.' }
            ]) +
            tip('Remember', 'Think of it like a sandwich. The <b>quote</b> is the filling, but the <b>analysis</b> is what makes it a meal.')
        },
        {
          id: 'u1-quotes', title: 'Four ways to use a quote',
          simple: 'Colon, introductory phrase, flow quote, or bits and pieces. Never drop a quote in alone.',
          html:
            cards([
              { k: 'Method 1', h: 'Colon', t: 'A full sentence <b>:</b> “quote”' },
              { k: 'Method 2', h: 'Introductory phrase', t: 'The author explains, “quote”' },
              { k: 'Method 3', h: 'Flow quote', t: 'Woven right into your sentence with no punctuation before it. Use brackets [ ] to change a word.' },
              { k: 'Method 4', h: 'Bits and pieces', t: 'Short snippets of the quote built into your own sentence.' }
            ], 230) +
            cards([
              { h: 'Ellipses ( ... )', t: 'Use to cut words out of a long quote.' },
              { h: 'Brackets [ ]', t: 'Use to change a word so the quote fits your sentence.' }
            ], 240) +
            tip('Test trap', 'Never drop in a <b>standalone quote</b>. Always introduce it.', true)
        }
      ]
    },
    /* ---------- 02 ---------- */
    {
      id: 'u2', num: '02', title: 'Literary Terms and Course Policies', short: 'Terms',
      sections: [
        {
          id: 'u2-terms', title: 'Literary devices and concepts',
          simple: 'Know what each term means. A theme is a full sentence about life.',
          html:
            h3('From story to theme') +
            flow([{ t: 'Plot', s: 'what happens' }, { t: 'Subject', s: 'a 1–2 word topic, like “power”' }, { t: 'Theme', s: 'a full sentence about life' }, { t: 'Message', s: 'a concrete example of the theme' }]) +
            tip('Theme formula', 'Write “The author believes that [subject]…” then <b>delete</b> “The author believes that.” Use 3rd person, a complete sentence, and no plot details.') +
            cards([
              { i: '👑', h: 'Archetype', t: 'A universal character model: the mother, the loner, the hero.' },
              { i: '🎭', h: 'Tone', t: 'The storyteller’s attitude toward the subject.' },
              { i: '🔑', h: 'Symbol', t: 'A physical object with a deeper meaning.' },
              { i: '👃', h: 'Imagery', t: 'Language that appeals to the five senses.' },
              { i: '🔁', h: 'Motif', t: 'A recurring element that forms a pattern.' },
              { i: '📖', h: 'Peritext', t: 'Text around the book: cover, foreword, afterword, author bio.' },
              { i: '📣', h: 'Social criticism', t: 'Literature that analyzes problems in society.' },
              { i: '🏚️', h: 'Dystopia', t: 'An imagined future society with an oppressive government, lost freedoms, environmental destruction or technology taking over.' }
            ], 230)
        },
        {
          id: 'u2-policy', title: 'Course policies',
          simple: 'Know the grading scale, the gradebook codes and the AI and plagiarism rules.',
          html:
            say('English I CP, <b>Ms. Sydney Reppy</b>, Neuqua Valley High School.') +
            svg(520, 130,
              [['A', '100–90'], ['B', '89–80'], ['C', '79–70'], ['D', '69–60'], ['F', '≤ 59']].map(function (g, i) {
                var x = 20 + i * 98;
                return rect(x, 20, 90, 64, i < 3 ? 'var(--tint)' : 'var(--surface)', i < 3 ? 'var(--accent)' : 'var(--ink)') + t(x + 45, 52, g[0], 28, 700) + t(x + 45, 76, g[1], 15, 600, 'middle', 'var(--mute)');
              }).join('') + t(260, 112, 'No rounding.', 15, 700),
              'Grading scale: A is 100 to 90, B is 89 to 80, C is 79 to 70, D is 69 to 60, F is 59 and below. No rounding.') +
            cards([{ k: 'Assessment' }, { k: 'Speaking & Listening' }, { k: 'Participation' }, { k: 'Writing' }, { k: 'Final Exam' }].map(function (c) { return { h: c.k }; }), 150) +
            h3('Gradebook codes') +
            tiles([{ n: 'Z', t: 'Missing. A zero until you make it up.' }, { n: 'M', t: 'Missing. No grade impact.' }, { n: '0', t: 'Zero. Cannot be made up.' }, { n: 'X', t: 'Excused.' }]) +
            h3('AI and plagiarism') +
            cards([
              { i: '🚫', h: 'Generative AI', t: 'Not acceptable unless the teacher says so.' },
              { i: '9️⃣', h: 'Plagiarism', t: '9 or more words in a row with no citation.' },
              { i: '📝', h: 'Google Doc history', t: 'It must show natural drafting.' }
            ], 220) +
            flow([{ t: '1st offense', s: '0%. Parent, counselor and dean notified.' }, { t: '2nd offense', s: '0%, semester failure, course withdrawal.' }]) +
            cards([
              { i: '📵', h: 'Phones', t: 'Silenced and stored. 1st offense: warning. Repeated: Dean referral.' },
              { i: '📚', h: 'Extra credit', t: 'Abe Lincoln Book Award: 0.5% per book, max 2 books (1% a year).' }
            ], 240) +
            h3('S.T.E.A.L.') +
            pills(['Speech', 'Thoughts', 'Effect on others', 'Actions', 'Looks'])
        }
      ]
    },
    /* ---------- 03 ---------- */
    {
      id: 'u3', num: '03', title: 'The Marrow Thieves', short: 'Marrow Thieves',
      sections: [
        {
          id: 'u3-context', title: 'Historical context',
          simple: 'The book is about real history: Indigenous children were taken to residential schools to erase their culture.',
          html:
            say('<i>The Marrow Thieves</i> is by <b>Cherie Dimaline</b> (2017). The story is made up, but it is built on real history.') +
            svg(520, 130,
              line(30, 60, 490, 60, false, 'var(--ink)') +
              rect(80, 44, 320, 32, 'var(--accent)', 'var(--ink)') +
              t(240, 66, 'Residential schools', 17, 700, 'middle', 'var(--on-accent)') +
              t(80, 28, '1860s', 18, 700) + t(400, 28, '1996', 18, 700) +
              t(240, 112, 'Forced boarding schools meant to make Indigenous children assimilate', 14, 600, 'middle', 'var(--mute)'),
              'Timeline: residential schools ran from the 1860s to 1996.') +
            cards([
              { h: 'Words for the people', t: 'Indigenous is the broadest term. Also Native American. In Canada: First Nations / First Peoples. There are 500+ recognized Native nations in the US.' },
              { h: 'Settler-colonialism', t: 'Displacing and replacing the original inhabitants of a land.' },
              { h: 'Blood quantum', t: 'Government tracking meant to dilute tribal membership.' },
              { h: 'Residential schools', t: 'Mandatory boarding schools (1860s–1996). The goal: “kill the Indian, save the man.”' }
            ], 240)
        },
        {
          id: 'u3-setting', title: 'Setting and plot',
          simple: 'In the future, people who cannot dream hunt Indigenous people for their bone marrow.',
          html:
            flow([
              { t: 'The Water Wars', s: 'Canada becomes dystopian' },
              { t: 'Non-Indigenous people lose the ability to dream', s: 'It drives them mad' },
              { t: 'Marrow holds dreams', s: 'Indigenous people are hunted for it' },
              { t: 'Recruiters capture them', s: 'They go to new residential schools' }
            ])
        },
        {
          id: 'u3-chars', title: 'Characters',
          simple: 'Know who each person is and one fact about them.',
          html:
            cards([
              { k: 'Narrator', h: 'Frenchie (Francis)', t: '16-year-old Métis narrator. Lost his brother Mitch to the Recruiters.' },
              { h: 'Mitch', t: 'Frenchie’s older brother. Sacrificed himself so Frenchie could escape.' },
              { k: 'Leader', h: 'Miigwans (Miig)', t: 'Elder who leads the group. Carries a vial of his husband Isaac’s marrow.' },
              { h: 'Isaac', t: 'Miig’s husband, a Cree poet who dreamt in Cree. Taken to a school. Reunited with Miig at the end.' },
              { h: 'Minerva', t: 'Anishinaabe Elder. Destroyed School #47E when her marrow sang in Anishinaabemowin. Killed during a rescue.' },
              { h: 'Rose', t: '16 years old, raised by Granny and great-uncles. Frenchie’s romantic interest.' },
              { h: 'Chi-Boy', t: '17-year-old Cree scout and bow hunter. In love with Wab.' },
              { h: 'Wab', t: '18 years old, with a keloid scar on her face.' },
              { h: 'RiRi', t: '7-year-old Métis girl. Killed when Lincoln pushes her off a cliff.' },
              { h: 'Tree and Zheegwon', t: '12-year-old twins, scarred from experiments. They share a baseball cap.' },
              { h: 'Slopper', t: '9 years old. Later heads the “Miigwanang” youth council.' },
              { h: 'Jean', t: 'Frenchie’s father. Lost a leg. Reunited with Frenchie at the Council camp near Espanola.' },
              { k: 'Traitors', h: 'Travis and Lincoln', t: 'Lincoln kills RiRi. Frenchie kills Travis.' }
            ], 230)
        },
        {
          id: 'u3-symbols', title: 'Symbols and motifs',
          simple: 'Each object stands for something bigger.',
          html:
            cards([
              { i: '🦴', h: 'Bone marrow / dreams', t: 'Cultural identity, the soul and continuity.' },
              { i: '👢', h: 'Pink boots (RiRi’s)', t: 'Lost innocence and tragedy.' },
              { i: '🔔', h: 'Jingles (tin can lids)', t: 'Made for a jingle dress: cultural preservation and sacrifice.' },
              { i: '🫎', h: 'Moose', t: 'Nature’s majesty, respect and maturity.' },
              { i: '🗣️', h: 'Syllabics / language', t: 'A cultural key that breaks down oppression. Kiiwen means “Go home.”' }
            ], 230)
        },
        {
          id: 'u3-vocab', title: 'Vocabulary (20)',
          simple: 'Twenty words about fairness and identity.',
          html:
            pills([
              { w: 'Ally', m: 'supports a group they are not part of' }, { w: 'Assimilation', m: 'forcing a group to give up its culture' },
              { w: 'Bystander', m: 'sees something wrong and does nothing' }, { w: 'Colonization', m: 'taking over land and ruling its people' },
              { w: 'Cultural Appropriation', m: 'using another culture without respect' }, { w: 'Discrimination', m: 'unfair treatment because of who someone is' },
              { w: 'Disenfranchise', m: 'take away someone’s rights or power' }, { w: 'Displacement', m: 'forcing people to leave home' },
              { w: 'Empathy', m: 'understanding how someone feels' }, { w: 'Equality', m: 'treating everyone the same' },
              { w: 'Equity', m: 'giving people what they need to be fair' }, { w: 'Implicit Bias', m: 'unconscious attitudes that affect treatment' },
              { w: 'Indigenous', m: 'the original people of a land' }, { w: 'Intersectionality', m: 'how identities overlap and affect experiences' },
              { w: 'Oppression', m: 'unfair control by those in power' }, { w: 'Prejudice', m: 'judging before knowing' },
              { w: 'Privilege', m: 'an unearned advantage' }, { w: 'Racism', m: 'unfair treatment because of race' },
              { w: 'Reconciliation', m: 'repairing a relationship after harm' }, { w: 'Tolerance', m: 'accepting differences' }
            ])
        }
      ]
    },
    /* ---------- 04 ---------- */
    {
      id: 'u4', num: '04', title: 'Fahrenheit 451', short: 'Fahrenheit 451',
      sections: [
        {
          id: 'u4-context', title: 'Context and structure',
          simple: 'Bradbury wrote it in 1952. It has two parts with symbolic titles.',
          html:
            say('<b>Ray Bradbury</b> wrote it in <b>1952</b>, after World War II. Police once stopped him just for walking, which inspired him (see “The Pedestrian”). Other influences: Nazi book burnings, the Holocaust, McCarthyism and post-war consumerism.') +
            cards([
              { k: 'Part 1', h: 'The Hearth and the Salamander', t: 'Hearth: knowledge burning in the mind. Salamander: free thought cannot be destroyed.' },
              { k: 'Part 2', h: 'The Sieve and the Sand', t: 'Sand: knowledge and truth. Sieve: Montag’s mind trying to hold on to it.' }
            ], 270)
        },
        {
          id: 'u4-chars', title: 'Characters',
          simple: 'Know each person and what they do in the story.',
          html:
            cards([
              { i: '🔥', h: 'Guy Montag', t: 'A fireman who burns books. Uses “The Great Python” hose.' },
              { i: '🌙', h: 'Clarisse McClellan', t: '17-year-old neighbor. Her questions wake Montag up: “Are you happy?”' },
              { i: '📺', h: 'Mildred Montag', t: 'His shallow wife. Addicted to parlor walls and ear thimbles. Overdoses on sleeping pills.' },
              { i: '🧯', h: 'Captain Beatty', t: 'Fire Captain. Uses his knowledge of books to justify burning them. The antagonist.' },
              { i: '🎓', h: 'Faber', t: 'Retired English professor. Montag’s mentor.' }
            ], 230)
        },
        {
          id: 'u4-symbols', title: 'Symbols',
          simple: 'A commercial, a robot dog and a bird each stand for something bigger.',
          html:
            cards([
              { i: '🦷', h: 'Denham’s Dentifrice', t: 'A blaring commercial that stops Montag from memorizing the Bible.' },
              { i: '🐕‍🦺', h: 'Mechanical Hound', t: 'The government’s hound with a lethal-injection needle for a proboscis.' },
              { i: '🐦‍🔥', h: 'Phoenix', t: 'Society’s rebirth after destroying itself.' }
            ], 240)
        },
        {
          id: 'u4-vocab', title: 'Vocabulary (20)',
          simple: 'Twenty words from the book.',
          html:
            pills([
              { w: 'Refract', m: 'bend light' }, { w: 'Imperceptibly', m: 'too slightly to notice' }, { w: 'Pulverized', m: 'crushed to powder' }, { w: 'Capillary', m: 'tiny blood vessel' },
              { w: 'Multifaceted', m: 'having many sides' }, { w: 'Proclivity', m: 'natural tendency' }, { w: 'Odious', m: 'hateful, disgusting' }, { w: 'Ravenous', m: 'extremely hungry' },
              { w: 'Noncombustible', m: 'cannot burn' }, { w: 'Tactile', m: 'related to touch' }, { w: 'Retaliation', m: 'getting back at someone' }, { w: 'Receptacle', m: 'container' },
              { w: 'Juggernaut', m: 'huge unstoppable force' }, { w: 'Pyre', m: 'pile of material for burning' }, { w: 'Dictum', m: 'official statement' }, { w: 'Desolation', m: 'empty, lonely ruin' },
              { w: 'Incite', m: 'stir up' }, { w: 'Burdensome', m: 'heavy and hard to carry' }, { w: 'Proboscis', m: 'long nose or snout' }, { w: 'Phoenix', m: 'bird reborn from ashes' }
            ])
        }
      ]
    },
    /* ---------- 05 ---------- */
    {
      id: 'u5', num: '05', title: 'Short Stories, Films and Oral Tradition', short: 'Stories',
      sections: [
        {
          id: 'u5-stories', title: 'Short stories and films',
          simple: 'One fact and one big idea for each story or film.',
          html:
            cards([
              { i: '🧠', h: '“Harrison Bergeron” (Vonnegut)', t: 'The government handicaps everyone to force equality. Harrison rebels.' },
              { i: '☀️', h: '“All Summer in a Day” (Bradbury)', t: 'Margot is locked in a closet on Venus. The sun shows up once every 7 years. Community responsibility.' },
              { i: '🚶', h: '“The Pedestrian” (Bradbury)', t: 'Leonard Mead is arrested by a robotic police car for walking.' },
              { i: '🎨', h: '“Create” (Derek Sivers)', t: 'Creators vs. consumers.' },
              { i: '🥟', h: '“Bao” (Pixar short)', t: 'An overprotective mother and a dumpling that comes to life. Maternal attachment, growing up and culture.' },
              { i: '🛍️', h: '“More” (short film)', t: 'Consumerism, memory and artificial happiness.' },
              { i: '🌳', h: 'The Lorax (Dr. Seuss)', t: 'The Once-ler cuts down the Truffula trees. Environmental destruction.' }
            ], 250)
        },
        {
          id: 'u5-oral', title: 'Oral tradition texts',
          simple: 'Three picture books that share Native stories and values.',
          html:
            cards([
              { i: '🍞', h: 'Fry Bread (Kevin Noble Maillard)', t: 'Celebrates fry bread as food, art, place and unity.' },
              { i: '🙏', h: 'We Are Grateful: Otsaliheliga (Traci Sorell)', t: 'Cherokee gratitude through the seasons. Trail of Tears, Cherokee New Year, Sequoyah’s syllabary.' },
              { i: '💧', h: 'We Are Water Protectors (Carole Lindstrom)', t: 'An Ojibwe prophecy of a “black snake” (oil pipelines). Protecting the environment.' }
            ], 250)
        },
        {
          id: 'u5-choice', title: 'Choice novel project and Word of the Week',
          simple: 'A brochure and a 2-minute talk, plus 17 vocab words.',
          html:
            say('<b>IRU Choice Novel Brochure:</b> a 6-panel folded brochure and a 2-minute presentation.') +
            cards([
              { h: 'Cover' }, { h: 'Inside Flap', t: 'Genre, year, pages, summary, conflict' }, { h: 'Back', t: 'Rating and target audience' },
              { h: 'Author Bio' }, { h: 'Reviewer Bio' }, { h: 'Characters' }, { h: 'Themes & Quotes' }
            ], 170) +
            h3('Word of the Week (17)') +
            pills([
              { w: 'Acquiesce', m: 'agree without protest' }, { w: 'Ambiance', m: 'mood of a place' }, { w: 'Aggrandizement', m: 'making something seem greater' }, { w: 'Ameliorate', m: 'make better' },
              { w: 'Atrophy', m: 'waste away' }, { w: 'Cacophony', m: 'harsh jumble of sounds' }, { w: 'Carping', m: 'complaining about small things' }, { w: 'Catharsis', m: 'release of strong emotion' },
              { w: 'Docile', m: 'obedient' }, { w: 'Denunciation', m: 'public criticism' }, { w: 'Diatribe', m: 'long angry speech' }, { w: 'Dogmatic', m: 'stubbornly sure of own beliefs' },
              { w: 'Effervescent', m: 'bubbly' }, { w: 'Engender', m: 'cause or produce' }, { w: 'Equanimity', m: 'calm' }, { w: 'Garrulous', m: 'very talkative' }, { w: 'Hedonist', m: 'lives for pleasure' }
            ])
        }
      ]
    },
    /* ---------- 06 ---------- */
    {
      id: 'u6', num: '06', title: 'Final Exam Checklist', short: 'Checklist',
      sections: [
        {
          id: 'u6-check', title: 'Be able to…',
          simple: 'Go down this list. If you can do each one, you are ready.',
          html:
            '<ul style="list-style:none;margin:0;padding:0">' +
            [
              'Explain the <b>3 parts of an intro</b>: hook (no questions!), bridge, thesis.',
              'Explain the <b>3 parts of a thesis</b>: author and title, thematic claim, prongs.',
              'Explain the <b>5 parts of a body paragraph</b>.',
              'Name the <b>4 quote methods</b>: colon, introductory phrase, flow, bits and pieces.',
              'Format <b>MLA citations</b> and know italics vs. quotation marks.',
              'Use <b>3rd person</b> in formal writing.',
              'Know all <b>3 vocab lists</b>: Marrow Thieves (20), Fahrenheit 451 (20), Word of the Week (17).'
            ].map(function (x) {
              return '<li style="display:grid;grid-template-columns:34px 1fr;gap:10px;align-items:start;padding:10px 0;border-bottom:1px solid var(--rule);font-size:18px;line-height:1.4"><span aria-hidden="true" style="border:2px solid var(--ink);width:24px;height:24px;display:block;background:var(--surface)"></span><span>' + x + '</span></li>';
            }).join('') + '</ul>'
        }
      ]
    }
  ];

  var flashcards = [
    { u: 1, front: '3rd person pronouns', back: 'he, she, it, they, them. Required in academic writing.' },
    { u: 1, front: '1st person pronouns', back: 'I, me, my, mine, we, our, us. Used for journals and memoirs.' },
    { u: 1, front: 'MLA in-text citation', back: '(Author Page#), like (Bradbury 14). The period goes outside the closing parenthesis.' },
    { u: 1, front: 'Italics vs. quotation marks', back: 'Italics: novels and plays. Quotation marks: short stories, poems and articles.' },
    { u: 1, front: 'Parts of an intro paragraph', back: 'Hook, bridge / summary, thesis.' },
    { u: 1, front: 'Can a hook be a rhetorical question?', back: 'No.' },
    { u: 1, front: 'What goes in a thesis?', back: 'Author, title, thematic claim, and reasoning / prongs.' },
    { u: 1, front: 'Parts of a body paragraph', back: 'Topic sentence, context, integrated quote, analysis, concluding sentence.' },
    { u: 1, front: 'Quote method: colon', back: 'Independent clause : “quote”' },
    { u: 1, front: 'Quote method: introductory phrase', back: 'Explanatory phrase, “quote”' },
    { u: 1, front: 'Quote method: flow', back: 'The quote is woven into your sentence with no separating punctuation. Use [ ] for changes.' },
    { u: 1, front: 'Quote method: bits and pieces', back: 'Short snippets built into your own sentence.' },
    { u: 1, front: 'Ellipses (...)', back: 'Used to shorten a long quote.' },
    { u: 2, front: 'Theme', back: 'A universal, arguable statement about a subject, in 3rd person with no plot details.' },
    { u: 2, front: 'Subject / concept', back: 'A 1–2 word topic, like isolation or power.' },
    { u: 2, front: 'Message', back: 'A specific, concrete example of the theme in action.' },
    { u: 2, front: 'Archetype', back: 'A universal character model, like the hero or the mother.' },
    { u: 2, front: 'Tone', back: 'The storyteller’s attitude toward the subject.' },
    { u: 2, front: 'Symbol', back: 'A physical object with a deeper meaning.' },
    { u: 2, front: 'Imagery', back: 'Language that appeals to the five senses.' },
    { u: 2, front: 'Motif', back: 'A recurring element that forms a pattern.' },
    { u: 2, front: 'Peritext', back: 'Text around the book’s body: cover, foreword, afterword, author bio.' },
    { u: 2, front: 'Dystopia', back: 'An imagined future society with an oppressive government and lost freedoms.' },
    { u: 2, front: 'Plagiarism rule', back: '9+ consecutive words without a citation.' },
    { u: 2, front: 'S.T.E.A.L.', back: 'Speech, Thoughts, Effect on others, Actions, Looks.' },
    { u: 3, front: 'Who wrote The Marrow Thieves?', back: 'Cherie Dimaline (2017).' },
    { u: 3, front: 'Settler-colonialism', back: 'Displacing and replacing the original inhabitants of a land.' },
    { u: 3, front: 'Blood quantum', back: 'Government tracking meant to dilute tribal membership.' },
    { u: 3, front: 'Residential schools', back: 'Mandatory boarding schools (1860s–1996) meant to force Indigenous children to assimilate.' },
    { u: 3, front: 'What do the Recruiters want?', back: 'Indigenous people, to harvest bone marrow (which holds dreams) and send people to schools.' },
    { u: 3, front: 'Frenchie', back: '16-year-old Métis narrator. Lost his brother Mitch.' },
    { u: 3, front: 'Miigwans', back: 'Group leader and Elder. Carries a vial of his husband Isaac’s marrow.' },
    { u: 3, front: 'Minerva', back: 'Anishinaabe Elder. Destroyed School #47E when her marrow sang in Anishinaabemowin.' },
    { u: 3, front: 'RiRi', back: '7-year-old Métis girl. Killed by the traitor Lincoln. Her pink boots are a symbol.' },
    { u: 3, front: 'Pink boots', back: 'Lost innocence and tragedy.' },
    { u: 3, front: 'Jingles', back: 'Tin can lids for a jingle dress: cultural preservation and sacrifice.' },
    { u: 3, front: 'Kiiwen', back: '“Go home.” Language is a cultural key that dismantles oppression.' },
    { u: 4, front: 'When did Bradbury write Fahrenheit 451?', back: '1952, after World War II.' },
    { u: 4, front: 'Hearth and salamander', back: 'Hearth: knowledge burning in the mind. Salamander: the inability to destroy free thought.' },
    { u: 4, front: 'Sieve and sand', back: 'Sand: knowledge and truth. Sieve: Montag’s mind trying to retain it.' },
    { u: 4, front: 'Guy Montag', back: 'A fireman who burns books.' },
    { u: 4, front: 'Clarisse McClellan', back: '17-year-old neighbor whose questions awaken Montag.' },
    { u: 4, front: 'Mildred', back: 'Montag’s shallow wife, addicted to parlor walls and ear thimbles. Overdoses on sleeping pills.' },
    { u: 4, front: 'Captain Beatty', back: 'Fire Captain who uses literary knowledge to justify burning. The antagonist.' },
    { u: 4, front: 'Faber', back: 'Retired English professor and Montag’s mentor.' },
    { u: 4, front: 'Mechanical Hound', back: 'The government’s hound with a lethal-injection needle for a proboscis.' },
    { u: 4, front: 'Phoenix', back: 'Society’s rebirth after destroying itself.' },
    { u: 4, front: 'Denham’s Dentifrice', back: 'A blaring commercial that keeps Montag from memorizing the Bible.' },
    { u: 5, front: '“Harrison Bergeron”', back: 'Vonnegut. The government handicaps everyone for absolute equality.' },
    { u: 5, front: '“All Summer in a Day”', back: 'Bradbury. Margot is locked in a closet on Venus where the sun shows once every 7 years.' },
    { u: 5, front: '“The Pedestrian”', back: 'Bradbury. Leonard Mead is arrested by a robotic police car for walking.' },
    { u: 5, front: '“Bao”', back: 'Pixar short about an overprotective mother and a living dumpling.' },
    { u: 5, front: '“More”', back: 'Short film about consumerism and artificial happiness.' },
    { u: 5, front: 'The Lorax', back: 'The Once-ler cuts down the Truffula trees. Environmental destruction.' },
    { u: 5, front: 'Fry Bread', back: 'Kevin Noble Maillard. Celebrates fry bread as food, art, place and unity.' },
    { u: 5, front: 'We Are Grateful: Otsaliheliga', back: 'Traci Sorell. Cherokee gratitude across the seasons.' },
    { u: 5, front: 'We Are Water Protectors', back: 'Carole Lindstrom. An Ojibwe prophecy of a “black snake” (oil pipelines).' },
    { u: 5, front: 'Acquiesce', back: 'To accept or agree without protest.' },
    { u: 5, front: 'Cacophony', back: 'A harsh mix of loud sounds.' },
    { u: 5, front: 'Docile', back: 'Easily taught or controlled; obedient.' },
    { u: 5, front: 'Equanimity', back: 'Calmness, especially when things are hard.' },
    { u: 5, front: 'Garrulous', back: 'Talking a lot, especially about unimportant things.' },
    { u: 5, front: 'Catharsis', back: 'A release of strong emotions.' },
    { u: 5, front: 'Diatribe', back: 'A long, angry speech against something.' },
    { u: 5, front: 'Hedonist', back: 'A person who lives for pleasure.' }
  ];

  var questions = [
    // Unit 1
    { u: 1, t: 'mc', q: 'Which point of view is required in formal academic writing?', c: ['3rd person', '1st person', '2nd person', 'Any person'], a: 0, why: 'Formal essays use 3rd person and avoid “I” and “you.”' },
    { u: 1, t: 'mc', q: 'Which pronouns are 2nd person?', c: ['you, your, yours', 'I, me, my', 'he, she, it', 'we, us, our'], a: 0, why: '2nd person is you, your, yours.' },
    { u: 1, t: 'mc', q: 'Which is the correct MLA in-text citation?', c: ['(Bradbury 14).', '(Bradbury, p. 14.)', '(Bradbury 14.)', '“Bradbury 14”'], a: 0, why: 'Author and page with no comma, and the period goes outside the closing parenthesis.' },
    { u: 1, t: 'mc', q: 'How should you format the title of a novel in MLA?', c: ['Italicize it', 'Put it in quotation marks', 'Underline and bold it', 'Write it in all capitals'], a: 0, why: 'Novels and plays are italicized. Short stories, poems and articles use quotation marks.' },
    { u: 1, t: 'mc', q: 'How should you format the title of a short story?', c: ['In quotation marks', 'In italics', 'In bold', 'No special format'], a: 0, why: 'Short story, poem and article titles go in quotation marks.' },
    { u: 1, t: 'mc', q: 'Which is NOT allowed as a hook?', c: ['A rhetorical question', 'A universal statement', 'A scenario', 'A fact'], a: 0, why: 'Hooks can be a universal statement, scenario, quote or fact, but never a rhetorical question.' },
    { u: 1, t: 'mc', q: 'What is the bridge in an intro paragraph?', c: ['It connects the hook to the text, names the author and title, and gives a short summary', 'The last sentence with the thesis', 'A quote from the book', 'The conclusion'], a: 0, why: 'The bridge connects the hook to the text with a 1–2 sentence summary.' },
    { u: 1, t: 'mc', q: 'Where does the thesis go in an intro paragraph?', c: ['The last sentence', 'The first sentence', 'The middle', 'In the title'], a: 0, why: 'The thesis is the last sentence of the intro.' },
    { u: 1, t: 'mc', q: 'Which does a thesis statement NOT need?', c: ['A rhetorical question', 'The author', 'The title', 'A thematic claim'], a: 0, why: 'A thesis needs the author, title, thematic claim and reasoning / prongs.' },
    { u: 1, t: 'mc', q: 'What is the first part of a body paragraph?', c: ['Topic sentence', 'Context', 'Quote', 'Analysis'], a: 0, why: 'Order: topic sentence, context, quote, analysis, concluding sentence.' },
    { u: 1, t: 'mc', q: 'What is the job of the analysis in a body paragraph?', c: ['Explain how and why the quote proves the claim', 'Give background before the quote', 'Preview the evidence', 'Introduce the author'], a: 0, why: 'Analysis is 2–3 sentences about how and why the evidence proves the claim.' },
    { u: 1, t: 'mc', q: 'Which is an example of the colon method?', c: ['Montag changes: “quote”', 'Montag says, “quote”', 'Montag “quote” changes', 'Montag changes “quote.”'], a: 0, why: 'Colon method: independent clause, colon, then the quote.' },
    { u: 1, t: 'mc', q: 'Which method weaves a quote into your own sentence with no separating punctuation?', c: ['Flow quote', 'Colon', 'Introductory phrase', 'Standalone quote'], a: 0, why: 'A flow quote blends into your sentence. Use brackets for any change.' },
    { u: 1, t: 'mc', q: 'What do you use to shorten a long quote?', c: ['Ellipses (...)', 'Brackets [ ]', 'Parentheses', 'Dashes'], a: 0, why: 'Ellipses show words were left out. Brackets show a word was changed.' },
    // Unit 2
    { u: 2, t: 'mc', q: 'What is a theme?', c: ['A universal, arguable statement about a subject', 'The sequence of events', 'A 1–2 word topic', 'A recurring object'], a: 0, why: 'A theme is a complete 3rd person statement with no plot details.' },
    { u: 2, t: 'mc', q: 'Which is a subject (concept)?', c: ['Isolation', 'People who feel alone often hurt others', 'Montag burns the books', 'The hound attacks'], a: 0, why: 'A subject is a 1–2 word topic like isolation or power.' },
    { u: 2, t: 'mc', q: 'What is a motif?', c: ['A recurring element that forms a pattern', 'A single symbol', 'The author’s attitude', 'The setting'], a: 0, why: 'A motif repeats throughout a text.' },
    { u: 2, t: 'mc', q: 'What is tone?', c: ['The storyteller’s attitude toward the subject', 'The mood of one reader', 'The setting', 'The plot'], a: 0, why: 'Tone is the author’s or narrator’s attitude toward the subject.' },
    { u: 2, t: 'mc', q: 'What is imagery?', c: ['Language that appeals to the five senses', 'A drawing in a book', 'A repeated pattern', 'The theme'], a: 0, why: 'Imagery uses words that make the reader see, hear, smell, taste or feel.' },
    { u: 2, t: 'mc', q: 'What is peritext?', c: ['Text around a book’s body, like the cover or afterword', 'The main story', 'A type of poem', 'A summary'], a: 0, why: 'Peritext includes the cover, foreword, afterword and author bio.' },
    { u: 2, t: 'mc', q: 'What is a dystopia?', c: ['A future society with an oppressive government and lost freedoms', 'A perfect society', 'A historical event', 'A type of poem'], a: 0, why: 'Dystopias show oppressive governments, lost freedoms, or technology domination.' },
    { u: 2, t: 'mc', q: 'How many consecutive words without a citation count as plagiarism in this class?', c: ['9 or more', '3', '20', '50'], a: 0, why: 'The policy says 9+ consecutive words.' },
    { u: 2, t: 'mc', q: 'What does the gradebook code “Z” mean?', c: ['Missing, counted as zero until made up', 'Excused', 'Zero that cannot be made up', 'Missing with no grade impact'], a: 0, why: 'Z is a zero until made up. X is excused. 0 cannot be made up. M has no grade impact.' },
    { u: 2, t: 'mc', q: 'Which grade range is a B?', c: ['89–80', '90–100', '79–70', '69–60'], a: 0, why: 'A is 100–90, B is 89–80, C is 79–70, D is 69–60. There is no rounding.' },
    // Unit 3
    { u: 3, t: 'mc', q: 'Who wrote The Marrow Thieves?', c: ['Cherie Dimaline', 'Ray Bradbury', 'Traci Sorell', 'Kevin Noble Maillard'], a: 0, why: 'Cherie Dimaline wrote it in 2017.' },
    { u: 3, t: 'mc', q: 'Why do the Recruiters hunt Indigenous people in the novel?', c: ['To harvest their bone marrow, which holds dreams', 'To take their land', 'To make them soldiers', 'To teach them English'], a: 0, why: 'Non-Indigenous people lost the ability to dream, and marrow holds dreams.' },
    { u: 3, t: 'mc', q: 'What event led to the novel’s dystopia?', c: ['The Water Wars', 'A world war', 'A plague', 'An earthquake'], a: 0, why: 'The novel is set in Canada after the “Water Wars.”' },
    { u: 3, t: 'mc', q: 'Who is the narrator of the novel?', c: ['Frenchie', 'Miig', 'Rose', 'Chi-Boy'], a: 0, why: 'Frenchie is the 16-year-old Métis narrator.' },
    { u: 3, t: 'mc', q: 'What does Miig carry in a pouch?', c: ['A vial of his husband Isaac’s marrow', 'A map', 'His knife', 'Seeds'], a: 0, why: 'The vial holds the marrow of his husband Isaac.' },
    { u: 3, t: 'mc', q: 'How did Mitch help Frenchie?', c: ['He sacrificed himself so Frenchie could escape', 'He gave Frenchie a map', 'He fought Travis', 'He found the Council camp'], a: 0, why: 'Mitch was taken by the Recruiters so Frenchie could get away.' },
    { u: 3, t: 'mc', q: 'What did Minerva do?', c: ['Destroyed School #47E when her marrow sang in Anishinaabemowin', 'Rescued RiRi', 'Killed Travis', 'Led the Council'], a: 0, why: 'Her marrow sang in Anishinaabemowin and destroyed the school. She was killed during a rescue.' },
    { u: 3, t: 'mc', q: 'Who kills RiRi?', c: ['Lincoln', 'Travis', 'A Recruiter', 'Frenchie'], a: 0, why: 'The traitor Lincoln pushes RiRi off a cliff.' },
    { u: 3, t: 'mc', q: 'What do RiRi’s pink boots symbolize?', c: ['Lost innocence and tragedy', 'Nature’s majesty', 'Cultural preservation', 'Government power'], a: 0, why: 'The boots stand for lost innocence and tragedy.' },
    { u: 3, t: 'mc', q: 'What do the jingles (tin can lids) symbolize?', c: ['Cultural preservation and sacrifice', 'Wealth', 'Danger', 'Lost innocence'], a: 0, why: 'They are used to make a jingle dress.' },
    { u: 3, t: 'mc', q: 'What was the purpose of residential schools?', c: ['To forcibly assimilate Indigenous children', 'To teach trades', 'To protect children', 'To teach languages'], a: 0, why: 'They were meant to erase Indigenous culture: “kill the Indian, save the man.”' },
    { u: 3, t: 'mc', q: 'What is blood quantum?', c: ['Government tracking meant to dilute tribal membership', 'A medical test', 'A tribal ceremony', 'A type of school'], a: 0, why: 'Blood quantum was a government way to shrink tribal membership.' },
    { u: 3, t: 'mc', q: 'Which word means a person who sees wrongdoing and does nothing?', c: ['Bystander', 'Ally', 'Equity', 'Tolerance'], a: 0, why: 'A bystander watches without acting. An ally takes action to support others.' },
    // Unit 4
    { u: 4, t: 'mc', q: 'When was Fahrenheit 451 written?', c: ['1952', '1984', '1920', '2001'], a: 0, why: 'Bradbury wrote it in 1952, after World War II.' },
    { u: 4, t: 'mc', q: 'According to the notes, what personal experience helped inspire Fahrenheit 451?', c: ['Police harassing Bradbury on a walk', 'A house fire', 'A trip to Venus', 'Losing his library'], a: 0, why: 'Police stopped him while he was walking.' },
    { u: 4, t: 'mc', q: 'What is Montag’s job?', c: ['Fireman', 'Professor', 'Police officer', 'Teacher'], a: 0, why: 'He is a fireman who burns books.' },
    { u: 4, t: 'mc', q: 'Who awakens Montag with the question “Are you happy?”', c: ['Clarisse', 'Mildred', 'Faber', 'Beatty'], a: 0, why: 'Clarisse McClellan, his 17-year-old neighbor.' },
    { u: 4, t: 'mc', q: 'Who is the antagonist who uses literature to justify burning?', c: ['Captain Beatty', 'Faber', 'Mildred', 'Clarisse'], a: 0, why: 'Captain Beatty knows literature but uses it to defend burning.' },
    { u: 4, t: 'mc', q: 'Who is Montag’s intellectual mentor?', c: ['Faber', 'Beatty', 'Clarisse', 'Mildred'], a: 0, why: 'Faber is a retired English professor.' },
    { u: 4, t: 'mc', q: 'What does the phoenix symbolize?', c: ['Society’s rebirth after self-destruction', 'Fire', 'Government control', 'Silence'], a: 0, why: 'A phoenix is reborn from ashes.' },
    { u: 4, t: 'mc', q: 'What is Part 2 of Fahrenheit 451 called?', c: ['The Sieve and the Sand', 'The Hearth and the Salamander', 'Burning Bright', 'The Pedestrian'], a: 0, why: 'Part 1 is The Hearth and the Salamander. Part 2 is The Sieve and the Sand.' },
    { u: 4, t: 'mc', q: 'In The Sieve and the Sand, what does the sieve stand for?', c: ['Montag’s mind trying to hold the truth', 'Knowledge', 'The government', 'The fire'], a: 0, why: 'The sand is truth and knowledge; the sieve is Montag’s mind.' },
    { u: 4, t: 'mc', q: 'What is the Mechanical Hound’s weapon?', c: ['A lethal-injection needle', 'Fire', 'Teeth', 'A gun'], a: 0, why: 'The Hound has a needle proboscis.' },
    { u: 4, t: 'mc', q: 'What does “proboscis” mean?', c: ['A long nose or snout-like part', 'A pile of burning things', 'A kind of fire', 'A speech'], a: 0, why: 'A proboscis is a long, snout-like part. In the book, it holds the Hound’s needle.' },
    { u: 4, t: 'mc', q: 'What does “pyre” mean?', c: ['A pile of material for burning', 'A pipe', 'A hose', 'A type of book'], a: 0, why: 'A pyre is a stack of material to be burned.' },
    // Unit 5
    { u: 5, t: 'mc', q: 'What does the government do in “Harrison Bergeron”?', c: ['Handicaps citizens for absolute equality', 'Bans books', 'Burns houses', 'Sends people to Venus'], a: 0, why: 'Everyone is handicapped so no one is better than others.' },
    { u: 5, t: 'mc', q: 'Where is Margot locked in a closet in “All Summer in a Day”?', c: ['Venus', 'Mars', 'Earth', 'The Moon'], a: 0, why: 'The sun appears on Venus only once every 7 years.' },
    { u: 5, t: 'mc', q: 'Who arrests Leonard Mead in “The Pedestrian”?', c: ['A robotic police car', 'A fireman', 'A hound', 'A mob'], a: 0, why: 'He is arrested for walking.' },
    { u: 5, t: 'mc', q: 'Which film is about an overprotective mother and a living dumpling?', c: ['Bao', 'More', 'Create', 'The Lorax'], a: 0, why: '“Bao” is a Pixar short about maternal attachment and growing up.' },
    { u: 5, t: 'mc', q: 'What is the main idea of The Lorax?', c: ['Environmental destruction', 'Friendship', 'Sports', 'Money is bad'], a: 0, why: 'The Once-ler cuts down the Truffula trees.' },
    { u: 5, t: 'mc', q: 'Which text is about an Ojibwe prophecy of a “black snake”?', c: ['We Are Water Protectors', 'Fry Bread', 'We Are Grateful', 'Bao'], a: 0, why: 'The black snake stands for oil pipelines.' },
    { u: 5, t: 'mc', q: 'Which text covers the Trail of Tears and Sequoyah’s syllabary?', c: ['We Are Grateful: Otsaliheliga', 'Fry Bread', 'We Are Water Protectors', 'The Lorax'], a: 0, why: 'It is a Cherokee text by Traci Sorell.' },
    { u: 5, t: 'mc', q: 'What does “cacophony” mean?', c: ['A harsh mix of loud sounds', 'A calm mood', 'A long speech', 'A fear of crowds'], a: 0, why: 'Cacophony is a harsh, jumbled noise.' },
    { u: 5, t: 'mc', q: 'What does “docile” mean?', c: ['Easily taught or controlled', 'Angry', 'Talkative', 'Cheerful'], a: 0, why: 'A docile person is obedient and easy to manage.' },
    { u: 5, t: 'mc', q: 'What does “garrulous” mean?', c: ['Very talkative', 'Silent', 'Calm', 'Selfish'], a: 0, why: 'Garrulous people talk a lot.' },
    { u: 5, t: 'mc', q: 'What does “equanimity” mean?', c: ['Calmness in hard times', 'Anger', 'Fairness', 'Sadness'], a: 0, why: 'Equanimity is staying calm under stress.' },
    { u: 5, t: 'mc', q: 'What does “hedonist” mean?', c: ['A person who lives for pleasure', 'A person who hates work', 'A teacher', 'A traveler'], a: 0, why: 'Hedonists put pleasure first.' },
    { u: 5, t: 'mc', q: 'Which panel of the Choice Novel brochure includes genre, year, pages, summary and conflict?', c: ['Inside flap', 'Cover', 'Back', 'Reviewer bio'], a: 0, why: 'The inside flap holds the basic facts and conflict. The back has the rating and target audience.' },
    // Unit 6
    { u: 6, t: 'mc', q: 'How many vocabulary lists are on the final?', c: ['3', '1', '2', '5'], a: 0, why: 'The Marrow Thieves (20), Fahrenheit 451 (20) and Word of the Week (17).' },
    { u: 6, t: 'mc', q: 'Which method of quote integration has you write a phrase, a comma, then the quote?', c: ['Introductory phrase', 'Colon', 'Flow', 'Bits and pieces'], a: 0, why: 'Introductory phrase: Explanatory phrase, “quote.”' }
  ];

  FINALS.addClass('english-1', {
    // Shown on this class's Home.
    examFacts: [
      'Final: Fri Dec 18, period 4 (Ms. Reppy). Format not posted yet.',
      'Be able to explain the intro paragraph (hook, bridge, thesis), the 5-part body paragraph, the 4 ways to integrate a quote, MLA citations, and 3rd person pronouns.',
      'Know all three vocab lists: The Marrow Thieves (20), Fahrenheit 451 (20) and Word of the Week (17).'
    ],
    units: units,
    flashcards: flashcards,
    questions: questions
  });
})();
