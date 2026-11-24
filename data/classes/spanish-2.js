// Español 2: Semester 1 final (Thu Dec 17, period 3).
// Same format as human-geography.js: units with sections, flashcards, questions and examFacts.
// Lessons are written as HTML with diagrams and cards, in plain 9th-grade language.
// Built from the class notebooks: Unit 0 Repaso de Español 1, Unit 1 Familia, Tradiciones y
// Comida, Unit 2 Salud, Hábitos y Rutina Diaria. The exam format was not posted, so Home says so.
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
        '<div style="font:700 44px/1 var(--head);color:var(--accent)">' + c.n + '</div>' +
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
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || 'middle') + '" style="font:' + (wt || 600) + ' ' + (size || 16) + 'px var(--body)" fill="' + (color || 'var(--ink)') + '">' + s + '</text>';
  }
  function rect(x, y, w, h, fill, stroke, extra) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + (fill || 'var(--surface)') + '" stroke="' + (stroke || 'var(--ink)') + '" stroke-width="2" ' + (extra || '') + '/>';
  }
  function line(x1, y1, x2, y2, arrow, color) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (color || 'var(--accent)') + '" stroke-width="3"' + (arrow ? ' marker-end="url(#ah)"' : '') + '/>';
  }

  var units = [
    /* ---------- 00 ---------- */
    {
      id: 'u1', num: '00', title: 'Repaso de Español 1', short: 'Repaso',
      sections: [
        {
          id: 'u0-present', title: 'Present tense: how to build it',
          simple: 'Cut off -ar, -er or -ir. Then add the ending that matches who is doing the action.',
          html:
            say('Every present-tense verb is built the same way: <b>chop off the ending, then add a new one.</b>') +
            flow([{ t: 'hablar', s: 'start with the infinitive' }, { t: 'habl-', s: 'cut off -ar, -er or -ir' }, { t: 'habl + o', s: 'add the ending for who is doing it' }]) +
            tbl(['Who', '-AR (hablar)', '-ER (comer)', '-IR (vivir)'], [
              ['yo (I)', 'habl<b>o</b>', 'com<b>o</b>', 'viv<b>o</b>'],
              ['tú (you)', 'habl<b>as</b>', 'com<b>es</b>', 'viv<b>es</b>'],
              ['él / ella / Ud.', 'habl<b>a</b>', 'com<b>e</b>', 'viv<b>e</b>'],
              ['nosotros (we)', 'habl<b>amos</b>', 'com<b>emos</b>', 'viv<b>imos</b>'],
              ['vosotros (you all)', 'habl<b>áis</b>', 'com<b>éis</b>', 'viv<b>ís</b>'],
              ['ellos / ellas / Uds.', 'habl<b>an</b>', 'com<b>en</b>', 'viv<b>en</b>']
            ]) +
            tip('Remember', 'Only the <b>nosotros</b> and <b>vosotros</b> endings change between -ER and -IR (-emos / -imos and -éis / -ís). The rest match.')
        },
        {
          id: 'u0-verbs', title: 'Core verbs and “tener” expressions',
          simple: 'Know the common verbs by type. Use tener for hungry, thirsty, cold, hot, sleepy and for your age.',
          html:
            cards([
              { k: '-AR verbs', h: 'Do and use', t: 'bailar, cantar, comprar, descansar, dibujar, enseñar, escuchar música, estudiar, hablar por teléfono, jugar al fútbol, mirar la televisión, montar en bicicleta, practicar deportes, preparar la comida, tocar un instrumento, tomar apuntes, trabajar, necesitar, llegar, llevar, limpiar, lavar, usar' },
              { k: '-ER verbs', h: 'Daily actions', t: 'beber, comer, correr, comprender / entender, conocer, deber, hacer, perder, poder, poner, querer, ser, tener, traer, vender, ver, volver' },
              { k: '-IR verbs', h: 'Go and share', t: 'abrir, compartir, decir, dormir, escribir, ir, pedir, preferir, recibir, salir, servir, venir, vivir' }
            ], 260) +
            h3('Tener = “to have”, but also how you feel') +
            cards([
              { i: '🍽️', h: 'tener hambre', t: 'to be hungry' }, { i: '🥤', h: 'tener sed', t: 'to be thirsty' },
              { i: '🥶', h: 'tener frío', t: 'to be cold' }, { i: '🥵', h: 'tener calor', t: 'to be hot' },
              { i: '😴', h: 'tener sueño', t: 'to be sleepy' }, { i: '🎂', h: 'tener # años', t: 'to be # years old' },
              { i: '😨', h: 'tener miedo de', t: 'to be afraid of' }, { i: '📌', h: 'tener que + infinitive', t: 'to have to do something' }
            ], 170)
        },
        {
          id: 'u0-boot', title: 'Boot verbs (stem-changing)',
          simple: 'In a boot verb the middle of the word changes in every form except nosotros and vosotros.',
          html:
            say('In a boot verb, the vowel in the middle changes. Draw a boot around the forms that change: <b>yo, tú, él, ellos</b>. The two forms outside the boot, <b>nosotros</b> and <b>vosotros</b>, stay normal.') +
            svg(460, 230,
              rect(20, 20, 200, 190, 'var(--tint)', 'var(--accent)') +
              rect(220, 20, 220, 130, 'var(--surface)', 'var(--rule)') +
              rect(220, 150, 220, 60, 'var(--tint)', 'var(--accent)') +
              t(120, 58, 'yo → <tspan fill="var(--accent)">prefiero</tspan>', 20) +
              t(120, 118, 'tú → <tspan fill="var(--accent)">prefieres</tspan>', 20) +
              t(120, 178, 'él → <tspan fill="var(--accent)">prefiere</tspan>', 20) +
              t(330, 58, 'nosotros → preferimos', 19) +
              t(330, 118, 'vosotros → preferís', 19) +
              t(330, 187, 'ellos → <tspan fill="var(--accent)">prefieren</tspan>', 20) +
              t(230, 15, 'The boot is the shaded part', 13, 600, 'middle', 'var(--mute)'),
              'Boot shape diagram for the verb preferir. The shaded forms yo, tú, él and ellos change; nosotros and vosotros do not.') +
            tbl(['Change', 'Verb', 'yo, tú, él, nosotros, vosotros, ellos'], [
              ['e → ie', 'preferir', 'prefiero, prefieres, prefiere, preferimos, preferís, prefieren'],
              ['u → ue', 'jugar', 'juego, juegas, juega, jugamos, jugáis, juegan'],
              ['o → ue', 'volver', 'vuelvo, vuelves, vuelve, volvemos, volvéis, vuelven'],
              ['e → i', 'servir', 'sirvo, sirves, sirve, servimos, servís, sirven']
            ])
        },
        {
          id: 'u0-gustar', title: 'Gustar: “I like…”',
          simple: 'Use gusta for one thing and gustan for more than one thing. Start with me, te, le, nos, os or les.',
          html:
            say('<b>Gustar</b> works backward. Spanish says “the thing is pleasing to me.” So the verb agrees with the <b>thing you like</b>, not with you.') +
            flow([{ t: 'A mí', s: 'optional, for emphasis' }, { t: 'me', s: 'who likes it' }, { t: 'gusta / gustan', s: 'matches the thing' }, { t: 'el pozole', s: 'the thing you like' }]) +
            cards([
              { k: 'One thing or a verb', h: 'Me gusta el pozole', t: 'Also: Me gusta bailar.' },
              { k: 'More than one thing', h: 'Me gustan los tacos', t: 'Plural thing → gustan.' }
            ], 240) +
            tbl(['Emphasis', 'Pronoun'], [
              ['A mí', 'me'], ['A ti', 'te'], ['A él / ella / Ud.', 'le'], ['A nosotros', 'nos'], ['A vosotros', 'os'], ['A ellos / ellas / Uds.', 'les']
            ])
        },
        {
          id: 'u0-serestar', title: 'Ser vs. estar',
          simple: 'Ser is for what something is. Estar is for where it is and how it feels right now.',
          html:
            say('Both mean “to be.” Use these two memory words to pick the right one.') +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin:12px 0 16px">' +
              '<div style="border:2px solid var(--ink);background:var(--surface);padding:12px"><b style="font:700 34px/1 var(--head);color:var(--accent)">SER = DOCTOR</b>' +
              '<ul style="list-style:none;margin:8px 0;padding:0;font-size:17px;line-height:1.6"><li><b>D</b>escription</li><li><b>O</b>rigin</li><li><b>C</b>haracteristics</li><li><b>T</b>ime</li><li><b>O</b>ccupation</li><li><b>R</b>elationship</li></ul>' +
              '<div style="font-size:16px;color:var(--mute)">soy · eres · es · somos · sois · son</div></div>' +
              '<div style="border:2px solid var(--ink);background:var(--surface);padding:12px"><b style="font:700 34px/1 var(--head);color:var(--accent)">ESTAR = PLACE</b>' +
              '<ul style="list-style:none;margin:8px 0;padding:0;font-size:17px;line-height:1.6"><li><b>P</b>osition</li><li><b>L</b>ocation</li><li><b>A</b>ction (progressive)</li><li><b>C</b>ondition</li><li><b>E</b>motion</li></ul>' +
              '<div style="font-size:16px;color:var(--mute)">estoy · estás · está · estamos · estáis · están</div></div>' +
            '</div>' +
            cards([
              { h: 'Mi papá es médico.', t: 'Occupation → ser' },
              { h: 'El libro está en la mesa.', t: 'Location → estar' },
              { h: 'Estamos cansados.', t: 'Condition → estar' }
            ], 220)
        }
      ]
    },
    /* ---------- 01 ---------- */
    {
      id: 'u2', num: '01', title: 'Familia, Tradiciones y Comida', short: 'Familia',
      sections: [
        {
          id: 'u1-vocab', title: 'Vocabulary',
          simple: 'Learn these words in groups: things, actions, describing words and the butterfly words.',
          html:
            h3('Things') +
            pills([
              { w: 'la alimentación', m: 'food, diet' }, { w: 'el banquete', m: 'feast' }, { w: 'el barrio', m: 'neighborhood' }, { w: 'la calle', m: 'street' },
              { w: 'la costumbre', m: 'custom' }, { w: 'el disfraz', m: 'costume' }, { w: 'el hogar', m: 'home' }, { w: 'el ingrediente', m: 'ingredient' },
              { w: 'los invitados', m: 'guests' }, { w: 'los parientes', m: 'relatives' }, { w: 'la pimienta', m: 'pepper' }, { w: 'el platillo típico / auténtico', m: 'traditional dish' },
              { w: 'el postre', m: 'dessert' }, { w: 'el pueblo', m: 'town' }, { w: 'la receta', m: 'recipe' }, { w: 'el sabor', m: 'flavor' }, { w: 'la sal', m: 'salt' }, { w: 'la tradición', m: 'tradition' }
            ]) +
            h3('Actions') +
            pills([
              { w: 'ayudar', m: 'help' }, { w: 'celebrar / festejar', m: 'celebrate' }, { w: 'cocinar', m: 'cook' }, { w: 'compartir', m: 'share' }, { w: 'conversar', m: 'chat' },
              { w: 'disfrutar', m: 'enjoy' }, { w: 'ir de vacaciones', m: 'go on vacation' }, { w: 'probar (o→ue)', m: 'try, taste' }, { w: 'servir (e→i)', m: 'serve' }, { w: 'visitar', m: 'visit' }
            ]) +
            h3('Describing words') +
            pills([{ w: 'caliente', m: 'hot' }, { w: 'dulce', m: 'sweet' }, { w: 'orgulloso/a', m: 'proud' }, { w: 'picante', m: 'spicy' }, { w: 'rico/a', m: 'delicious' }]) +
            h3('Butterfly (Papálotl) words') +
            pills([
              { w: 'el santuario / el bosque', m: 'sanctuary / forest' }, { w: 'la ofrenda / el altar', m: 'offering / altar' }, { w: 'el oyamel', m: 'fir tree' },
              { w: 'la migración', m: 'migration' }, { w: 'Papálotl', m: 'butterfly in Nahuatl' }, { w: 'las alas', m: 'wings' }
            ])
        },
        {
          id: 'u1-compare', title: 'Comparing and connecting words',
          simple: 'Use these small words to say things are alike, different, or that one thing causes another.',
          html:
            say('These words make your writing sound smooth. Sort them by the job they do.') +
            cards([
              { k: 'Same', h: 'ambos / los dos', t: 'both' },
              { k: 'Same', h: 'también', t: 'also' },
              { k: 'Same', h: 'tener en común', t: 'to have in common' },
              { k: 'Different', h: 'a diferencia de', t: 'unlike' },
              { k: 'Different', h: 'comparado con', t: 'compared to' },
              { k: 'Different', h: 'más … que / menos … que', t: 'more … than / less … than' },
              { k: 'Different', h: 'mientras que', t: 'while, whereas' },
              { k: 'Different', h: 'sin embargo', t: 'however' },
              { k: 'Negative', h: 'tampoco', t: 'neither, not either' },
              { k: 'Because / so', h: 'por lo tanto / por eso', t: 'therefore, so' },
              { k: 'Add on', h: 'además', t: 'besides, also' }
            ], 190)
        },
        {
          id: 'u1-infinitive', title: 'Two verbs together',
          simple: 'When two verbs sit next to each other, change the first one and leave the second one as an infinitive.',
          html:
            say('If two verbs are side by side, <b>only the first one changes.</b> The second stays in its “to” form.') +
            flow([{ t: 'Conjugated verb', s: 'changes to match the person' }, { t: '+', s: '' }, { t: 'Infinitive', s: 'stays the same (-ar, -er, -ir)' }]) +
            cards([
              { h: 'Me gusta bailar.', t: 'I like to dance.' },
              { h: 'Voy a comer.', t: 'I am going to eat.' },
              { h: 'Tengo que estudiar.', t: 'I have to study.' },
              { h: 'Acabo de llegar.', t: 'I just arrived.' }
            ], 210) +
            h3('Phrases that are followed by an infinitive') +
            pills(['gustar + inf.', 'antes de', 'después de', 'tener que', 'ir a', 'tener ganas de', 'es importante', 'para', 'acabar de', 'hay que', 'deber', 'saber'])
        },
        {
          id: 'u1-progressive', title: 'Present progressive: “is happening right now”',
          simple: 'Use estar plus a word ending in -ando or -iendo to say what is happening right now.',
          html:
            flow([{ t: 'estar', s: 'change it: estoy, estás, está…' }, { t: '+', s: '' }, { t: 'gerundio', s: '-ar → -ando · -er / -ir → -iendo' }]) +
            cards([
              { h: 'Estoy hablando', t: 'hablar → hablando' },
              { h: 'Ella está comiendo', t: 'comer → comiendo' },
              { h: 'Estamos viviendo', t: 'vivir → viviendo' }
            ], 200) +
            h3('Watch out for these') +
            tbl(['Type', 'Rule', 'Examples'], [
              ['y verbs', 'Use -yendo', 'leer → leyendo, traer → trayendo, ir → yendo'],
              ['Boot -IR verbs', 'The vowel changes too', 'dormir → durmiendo, servir → sirviendo, pedir → pidiendo, competir → compitiendo, decir → diciendo, seguir → siguiendo']
            ])
        },
        {
          id: 'u1-food', title: 'Ocho platillos típicos',
          simple: 'Know what each of the eight Mexican dishes is made of and where it comes from.',
          html:
            cards([
              { i: '🌶️', h: 'Chiles en nogada', k: 'Puebla', t: 'Green poblano chile, pork picadillo, walnut sauce and pomegranate seeds. The colors match the Mexican flag: green, white, red.' },
              { i: '🍲', h: 'Pozole', t: 'Soup with hominy and pork. White or green in Guerrero. Red in Sinaloa and Jalisco. Topped with lettuce, radish, onion and oregano.' },
              { i: '🥙', h: 'Tostadas', t: 'Prehispanic crispy corn tortillas with toppings.' },
              { i: '🌽', h: 'Tamales', t: 'Corn dough (masa) with a filling, wrapped in corn husks or banana leaves, then steamed.' },
              { i: '🫔', h: 'Enchiladas', t: 'Precolombian rolled tortillas covered in sauce or mole.' },
              { i: '🌮', h: 'Tacos', t: 'Prehispanic. Corn or wheat tortillas with fillings.' },
              { i: '🌽', h: 'Elotes y esquites', t: 'Corn with lime, mayonnaise, cheese, salt and chiles.' },
              { i: '🍫', h: 'Mole poblano', t: 'A rich sauce of chiles, seeds, herbs, spices and chocolate, served over turkey or chicken.' }
            ], 250) +
            tip('Bonus', '<b>Guacamole</b> is avocado, eaten with <b>totopos</b> (tortilla chips).')
        },
        {
          id: 'u1-family', title: 'La familia mexicana',
          simple: 'Family is extremely important in Mexico. Know the three top values and the big numbers.',
          html:
            tiles([
              { n: '98%', t: 'say family is vital' },
              { n: '23%', t: 'top value: communication' },
              { n: '22%', t: 'next: union' },
              { n: '21%', t: 'next: respect' },
              { n: '70%', t: 'of parents see their role as educating and guiding' }
            ])
        },
        {
          id: 'u1-holidays', title: 'Fiestas y tradiciones',
          simple: 'Three celebrations: Día de los Muertos, Rosca de Reyes and Año Nuevo.',
          html:
            svg(520, 140,
              line(30, 70, 490, 70, false, 'var(--ink)') +
              '<circle cx="90" cy="70" r="10" fill="var(--accent)"/>' + t(90, 40, 'Nov 1–2', 18, 700) + t(90, 105, 'Día de los Muertos', 14) +
              '<circle cx="270" cy="70" r="10" fill="var(--accent)"/>' + t(270, 40, 'Dec 31', 18, 700) + t(270, 105, 'Nochevieja / Año Nuevo', 14) +
              '<circle cx="450" cy="70" r="10" fill="var(--accent)"/>' + t(450, 40, 'Jan 6', 18, 700) + t(450, 105, 'Rosca de Reyes', 14),
              'Timeline: Día de los Muertos on Nov 1 and 2, Año Nuevo on Dec 31, Rosca de Reyes on Jan 6.') +
            cards([
              { i: '🌼', h: 'Día de los Muertos', k: 'Nov 1–2', t: 'Families build ofrendas / altares with marigolds, incense and food. Monarch butterflies arrive in Michoacán. In Mazahua tradition they are the spirits of ancestors.' },
              { i: '🍞', h: 'Rosca de Reyes', k: 'Jan 6', t: 'An Epiphany pastry with a baby doll hidden inside. Whoever finds the doll hosts the Candlemas party.' },
              { i: '🎆', h: 'Nochevieja / Año Nuevo', k: 'Dec 31', t: 'Eat 12 grapes at midnight (12 wishes). Wear yellow underwear for money or red for love. Put a coin in your shoe, hold 12 coins, sweep bad energy out the door and light colored candles.' }
            ], 250)
        }
      ]
    },
    /* ---------- 02 ---------- */
    {
      id: 'u3', num: '02', title: 'Salud, Hábitos y Rutina Diaria', short: 'Salud',
      sections: [
        {
          id: 'u2-vocab', title: 'Vocabulary',
          simple: 'Words for health, sports and your daily routine.',
          html:
            h3('Health and sports') +
            pills([
              { w: 'el azúcar', m: 'sugar' }, { w: 'la grasa', m: 'fat' }, { w: 'los carbohidratos', m: 'carbs' }, { w: 'la proteína', m: 'protein' }, { w: 'las calorías', m: 'calories' },
              { w: 'la comida saludable / chatarra / basura', m: 'healthy / junk food' }, { w: 'la comida variada / rápida', m: 'varied / fast food' }, { w: 'la merienda', m: 'snack' },
              { w: 'la salud', m: 'health' }, { w: 'el médico', m: 'doctor' }, { w: 'la vida sana', m: 'healthy life' }, { w: 'el consejo', m: 'advice' }, { w: 'el hábito', m: 'habit' },
              { w: 'una rutina sana', m: 'healthy routine' }, { w: 'el estrés', m: 'stress' }, { w: 'la depresión', m: 'depression' }, { w: 'la actividad física / al aire libre', m: 'physical / outdoor activity' },
              { w: 'el partido', m: 'game' }, { w: 'el juego', m: 'game' }, { w: 'la competencia', m: 'competition' }, { w: 'el premio', m: 'prize' }, { w: 'el trofeo', m: 'trophy' },
              { w: 'la medalla (oro / plata / bronce)', m: 'medal' }, { w: 'el ganador / el perdedor', m: 'winner / loser' }
            ]) +
            h3('Healthy actions') +
            pills([
              { w: 'hacer ejercicio', m: 'exercise' }, { w: 'mantenerse en forma', m: 'stay in shape' }, { w: 'seguir (e→i) una dieta balanceada', m: 'follow a balanced diet' },
              { w: 'competir (e→i)', m: 'compete' }, { w: 'desayunar', m: 'eat breakfast' }, { w: 'almorzar (o→ue)', m: 'eat lunch' }, { w: 'cenar', m: 'eat dinner' },
              { w: 'subir / bajar de peso', m: 'gain / lose weight' }, { w: 'entrenarse', m: 'train' }
            ]) +
            h3('Daily routine') +
            pills([
              { w: 'despertarse (e→ie)', m: 'wake up' }, { w: 'levantarse', m: 'get up' }, { w: 'acostarse (o→ue)', m: 'go to bed' }, { w: 'dormirse (o→ue)', m: 'fall asleep' },
              { w: 'lavarse', m: 'wash up' }, { w: 'estirarse', m: 'stretch' }, { w: 'enfermarse', m: 'get sick' }, { w: 'relajarse', m: 'relax' }, { w: 'ducharse / bañarse', m: 'shower / bathe' },
              { w: 'afeitarse', m: 'shave' }, { w: 'secarse', m: 'dry off' }, { w: 'cepillarse los dientes', m: 'brush teeth' }, { w: 'vestirse (e→i)', m: 'get dressed' },
              { w: 'ponerse la ropa', m: 'put on clothes' }, { w: 'maquillarse', m: 'put on makeup' }, { w: 'peinarse', m: 'comb your hair' }
            ]) +
            h3('Describing words') +
            pills(['sano/a', 'saludable', 'balanceado/a', 'variado/a', 'activo/a', 'competitivo/a', 'optimista', 'pesimista'])
        },
        {
          id: 'u2-body', title: 'Las partes del cuerpo',
          simple: 'Learn the body part names. The picture shows the big ones.',
          html:
            svg(600, 400,
              '<circle cx="300" cy="62" r="32" fill="var(--fill)" stroke="var(--ink)" stroke-width="2"/>' +
              rect(288, 92, 24, 12, 'var(--fill)') +
              rect(262, 104, 76, 118, 'var(--fill)') +
              rect(232, 106, 28, 108, 'var(--fill)') + rect(232, 216, 28, 24, 'var(--fill)') +
              rect(340, 106, 28, 108, 'var(--fill)') + rect(340, 216, 28, 24, 'var(--fill)') +
              rect(266, 226, 32, 128, 'var(--fill)') + rect(302, 226, 32, 128, 'var(--fill)') +
              rect(256, 358, 42, 20, 'var(--fill)') + rect(302, 358, 42, 20, 'var(--fill)') +
              line(100, 56, 268, 60, false, 'var(--mute)') + t(10, 61, 'la cabeza', 16, 700, 'start') + '<circle cx="268" cy="60" r="4" fill="var(--accent)"/>' +
              line(100, 98, 292, 98, false, 'var(--mute)') + t(10, 103, 'el cuello', 16, 700, 'start') + '<circle cx="292" cy="98" r="4" fill="var(--accent)"/>' +
              line(100, 150, 246, 150, false, 'var(--mute)') + t(10, 155, 'el brazo', 16, 700, 'start') + '<circle cx="246" cy="150" r="4" fill="var(--accent)"/>' +
              line(100, 228, 246, 228, false, 'var(--mute)') + t(10, 233, 'la mano', 16, 700, 'start') + '<circle cx="246" cy="228" r="4" fill="var(--accent)"/>' +
              line(100, 290, 284, 290, false, 'var(--mute)') + t(10, 295, 'la rodilla', 16, 700, 'start') + '<circle cx="284" cy="290" r="4" fill="var(--accent)"/>' +
              line(100, 368, 270, 368, false, 'var(--mute)') + t(10, 373, 'el pie', 16, 700, 'start') + '<circle cx="270" cy="368" r="4" fill="var(--accent)"/>' +
              line(480, 112, 338, 110, false, 'var(--mute)') + t(490, 117, 'el hombro', 16, 700, 'start') + '<circle cx="338" cy="110" r="4" fill="var(--accent)"/>' +
              line(480, 152, 300, 152, false, 'var(--mute)') + t(490, 157, 'el pecho', 16, 700, 'start') + '<circle cx="300" cy="152" r="4" fill="var(--accent)"/>' +
              line(480, 200, 300, 200, false, 'var(--mute)') + t(490, 205, 'el estómago', 16, 700, 'start') + '<circle cx="300" cy="200" r="4" fill="var(--accent)"/>' +
              line(480, 290, 318, 290, false, 'var(--mute)') + t(490, 295, 'la pierna', 16, 700, 'start') + '<circle cx="318" cy="290" r="4" fill="var(--accent)"/>',
              'A simple body with labels: head, neck, shoulder, chest, stomach, arm, hand, leg, knee and foot in Spanish.') +
            cards([
              { k: 'Head', h: 'La cabeza', t: 'la cara · los ojos · las orejas / los oídos · la nariz · la boca · los dientes · la lengua' },
              { k: 'Middle', h: 'El tronco', t: 'el cuello · los hombros · el pecho · la espalda · el estómago · las caderas · la cintura' },
              { k: 'Arms', h: 'Los brazos', t: 'el codo · la muñeca · las manos · los dedos' },
              { k: 'Legs', h: 'Las piernas', t: 'la rodilla · el tobillo · los pies · los dedos del pie' },
              { k: 'Inside / outside', h: 'El cuerpo', t: 'los músculos · los huesos · la piel · el corazón · los pulmones' }
            ], 230)
        },
        {
          id: 'u2-reflexive', title: 'Reflexive verbs: you do it to yourself',
          simple: 'A reflexive verb has a pronoun like me or te because the person does the action to themselves.',
          html:
            say('In a reflexive verb the action <b>goes back to the person doing it.</b> That is why there is an extra little word: <b>me, te, se, nos, os, se.</b>') +
            svg(420, 120,
              rect(30, 35, 120, 50, 'var(--surface)') + t(90, 66, 'Yo', 22, 700) +
              rect(270, 35, 120, 50, 'var(--surface)') + t(330, 66, 'me lavo', 20, 700) +
              line(150, 60, 268, 60, true) +
              '<path d="M90 35 C90 5 330 5 330 33" fill="none" stroke="var(--accent)" stroke-width="3" stroke-dasharray="6 5" marker-end="url(#ah)"/>' +
              t(210, 105, 'I wash myself', 15, 600, 'middle', 'var(--mute)'),
              'Diagram: Yo me lavo. The action goes from the person back to themselves.') +
            tbl(['Who', 'levantarse'], [
              ['yo', '<b>me</b> levanto'], ['tú', '<b>te</b> levantas'], ['él / ella / Ud.', '<b>se</b> levanta'],
              ['nosotros', '<b>nos</b> levantamos'], ['vosotros', '<b>os</b> levantáis'], ['ellos / ellas / Uds.', '<b>se</b> levantan']
            ]) +
            h3('Where does the pronoun go?') +
            cards([
              { k: 'Option 1', h: 'Before the verb', t: 'Me levanto.' },
              { k: 'Option 2', h: 'Stuck on the infinitive', t: 'Voy a levantarme.' },
              { k: 'Option 3', h: 'Stuck on the gerundio', t: 'Estoy levantándome. (Add an accent!)' }
            ], 200)
        },
        {
          id: 'u2-doler', title: 'Doler: “it hurts”',
          simple: 'Doler works like gustar. Use duele for one thing and duelen for more than one. Use “el / la / los / las,” not “my.”',
          html:
            flow([{ t: 'Me', s: 'who it hurts' }, { t: 'duele / duelen', s: 'matches the body part' }, { t: 'la cabeza', s: 'use el, la, los, las' }]) +
            cards([
              { h: 'Me duele la cabeza.', t: 'My head hurts. (one thing → duele)' },
              { h: 'Me duelen los pies.', t: 'My feet hurt. (more than one → duelen)' }
            ], 240) +
            tip('Test trap', 'Do <b>not</b> say “mi cabeza.” With body parts Spanish uses <b>el, la, los, las</b> because “me” already shows whose body part it is.', true)
        },
        {
          id: 'u2-tu-affirm', title: 'Tú commands: telling someone to do it',
          simple: 'To tell a friend to do something, use the él / ella form. Eight verbs are irregular. Attach pronouns to the end.',
          html:
            say('A <b>tú command</b> is how you give an order to a friend. For regular verbs, just use the <b>él / ella</b> form.') +
            cards([
              { h: '¡Habla!', t: 'Speak!' }, { h: '¡Escucha!', t: 'Listen!' }, { h: '¡Escribe!', t: 'Write!' }
            ], 150) +
            h3('Eight irregular commands: Ven Di Sal Haz Ten Ve Pon Sé') +
            cards([
              { h: 'ven', t: 'venir' }, { h: 'di', t: 'decir' }, { h: 'sal', t: 'salir' }, { h: 'haz', t: 'hacer' },
              { h: 'ten', t: 'tener' }, { h: 've', t: 'ir' }, { h: 'pon', t: 'poner' }, { h: 'sé', t: 'ser' }
            ], 100) +
            tip('AAA rule: Affirmative Always Attach', 'In a “do it!” command, stick the pronoun on the end and add an accent if needed.<br><b>¡Despiértate!</b> · <b>¡Vístete!</b> · <b>¡Póntelos!</b>')
        },
        {
          id: 'u2-tu-neg', title: 'Tú commands: telling someone NOT to do it',
          simple: 'For no-commands, start with yo, drop the -o, and add the opposite ending. Pronouns go before the verb.',
          html:
            say('Negative commands use a <b>different recipe</b>.') +
            flow([{ t: 'Start with yo', s: 'hablo' }, { t: 'Drop the -o', s: 'habl-' }, { t: 'Add the opposite vowel', s: '-ar → -es · -er / -ir → -as' }, { t: '¡No hables!', s: '' }]) +
            cards([
              { h: '¡No hables!', t: 'hablar (-ar → -es)' }, { h: '¡No comas!', t: 'comer (-er → -as)' }, { h: '¡No escribas!', t: 'escribir (-ir → -as)' }
            ], 170) +
            h3('Spelling changes carry over') +
            tbl(['Ending', 'Becomes', 'Example'], [
              ['-car', '-ques', 'tocar → ¡No toques!'], ['-gar', '-gues', 'jugar → ¡No juegues!'], ['-zar', '-ces', 'empezar → ¡No empieces!'],
              ['Boot verbs', 'Keep the boot', 'No pongas, No enciendas, No duermas']
            ]) +
            h3('SIDES: five irregular no-commands') +
            cards([
              { k: 'S', h: 'ser', t: '¡No seas!' }, { k: 'I', h: 'ir', t: '¡No vayas!' }, { k: 'D', h: 'dar', t: '¡No des!' },
              { k: 'E', h: 'estar', t: '¡No estés!' }, { k: 'S', h: 'saber', t: '¡No sepas!' }
            ], 120) +
            h3('Yes-command vs. no-command: where does the pronoun go?') +
            '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin:10px 0 16px">' +
              '<div style="border:2px solid var(--ink);background:var(--surface);padding:12px"><b style="font:700 22px/1 var(--head);color:var(--accent)">YES: attach (AAA)</b><div style="font-size:20px;margin-top:6px"><b>¡Duérmete!</b></div></div>' +
              '<div style="border:2px solid var(--ink);background:var(--surface);padding:12px"><b style="font:700 22px/1 var(--head);color:var(--accent)">NO: before (NNA)</b><div style="font-size:20px;margin-top:6px"><b>¡No te duermas!</b></div></div>' +
            '</div>' +
            tip('NNA rule', 'Negatives Never Attach. The pronoun goes <b>before</b> the verb: ¡No te duermas! ¡No lo hagas!')
        },
        {
          id: 'u2-habits', title: 'Hábitos saludables',
          simple: 'Know the daily numbers for a healthy life.',
          html:
            tiles([
              { n: '30', t: 'minutes of physical activity every day' },
              { n: '2 L', t: 'of water every day' },
              { n: '5', t: 'servings of fruits and vegetables every day' },
              { n: '5', t: 'small meals a day. Never skip breakfast.' },
              { n: '7–8', t: 'hours of sleep' },
              { n: '0', t: 'tobacco or alcohol' }
            ]) +
            cards([
              { i: '🚫', h: 'Avoid', t: 'Saturated fats (grasas saturadas).' },
              { i: '⚠️', h: 'Risk', t: 'A sedentary lifestyle raises the risk of obesity, diabetes and heart disease.' }
            ], 240)
        }
      ]
    }
  ];

  var flashcards = [
    // Unit 0
    { u: 1, front: 'Endings: -AR verbs (present)', back: '-o, -as, -a, -amos, -áis, -an' },
    { u: 1, front: 'Endings: -ER verbs (present)', back: '-o, -es, -e, -emos, -éis, -en' },
    { u: 1, front: 'Endings: -IR verbs (present)', back: '-o, -es, -e, -imos, -ís, -en' },
    { u: 1, front: 'Which forms do NOT change in a boot verb?', back: 'nosotros and vosotros' },
    { u: 1, front: 'preferir (e→ie), yo and nosotros', back: 'prefiero / preferimos' },
    { u: 1, front: 'jugar (u→ue), yo and nosotros', back: 'juego / jugamos' },
    { u: 1, front: 'volver (o→ue), yo and nosotros', back: 'vuelvo / volvemos' },
    { u: 1, front: 'servir (e→i), yo and nosotros', back: 'sirvo / servimos' },
    { u: 1, front: 'Gustar: gusta vs. gustan', back: 'gusta for one thing or an infinitive; gustan for plural things.' },
    { u: 1, front: 'Indirect object pronouns', back: 'me, te, le, nos, os, les' },
    { u: 1, front: 'SER = DOCTOR', back: 'Description, Origin, Characteristics, Time, Occupation, Relationship' },
    { u: 1, front: 'ESTAR = PLACE', back: 'Position, Location, Action (progressive), Condition, Emotion' },
    { u: 1, front: 'ser (all forms)', back: 'soy, eres, es, somos, sois, son' },
    { u: 1, front: 'estar (all forms)', back: 'estoy, estás, está, estamos, estáis, están' },
    { u: 1, front: 'tener hambre / sed / frío / calor / sueño', back: 'to be hungry / thirsty / cold / hot / sleepy' },
    { u: 1, front: 'tener que + infinitive', back: 'to have to (do something)' },
    // Unit 1
    { u: 2, front: 'la costumbre', back: 'custom' },
    { u: 2, front: 'el disfraz', back: 'costume' },
    { u: 2, front: 'el hogar', back: 'home' },
    { u: 2, front: 'los parientes', back: 'relatives' },
    { u: 2, front: 'los invitados', back: 'guests' },
    { u: 2, front: 'la receta', back: 'recipe' },
    { u: 2, front: 'el platillo típico', back: 'traditional dish' },
    { u: 2, front: 'el sabor', back: 'flavor' },
    { u: 2, front: 'picante / dulce / caliente', back: 'spicy / sweet / hot' },
    { u: 2, front: 'orgulloso/a', back: 'proud' },
    { u: 2, front: 'Papálotl', back: 'Butterfly in Nahuatl.' },
    { u: 2, front: 'la ofrenda / el altar', back: 'The offering / altar built for Día de los Muertos.' },
    { u: 2, front: 'el oyamel', back: 'The fir tree where monarch butterflies rest in the sanctuary.' },
    { u: 2, front: 'a diferencia de', back: 'unlike' },
    { u: 2, front: 'comparado con', back: 'compared to' },
    { u: 2, front: 'tener en común', back: 'to have in common' },
    { u: 2, front: 'mientras que', back: 'while, whereas' },
    { u: 2, front: 'sin embargo', back: 'however' },
    { u: 2, front: 'por lo tanto / por eso', back: 'therefore, so' },
    { u: 2, front: 'Present progressive formula', back: 'ESTAR (conjugated) + gerundio. -AR → -ando; -ER / -IR → -iendo.' },
    { u: 2, front: 'Gerundios: leer, traer, ir', back: 'leyendo, trayendo, yendo' },
    { u: 2, front: 'Gerundios: dormir, servir, pedir', back: 'durmiendo, sirviendo, pidiendo' },
    { u: 2, front: 'Chiles en nogada', back: 'From Puebla. Green poblano chile, pork picadillo, walnut sauce, pomegranate seeds: the Mexican flag colors.' },
    { u: 2, front: 'Pozole', back: 'Hominy and pork soup. White or green in Guerrero; red in Sinaloa and Jalisco.' },
    { u: 2, front: 'Tamales', back: 'Corn dough (masa) filled, wrapped in corn husks or banana leaves and steamed.' },
    { u: 2, front: 'Mole poblano', back: 'Sauce of chiles, seeds, herbs, spices and chocolate over turkey or chicken.' },
    { u: 2, front: 'Elotes y esquites', back: 'Corn with lime, mayonnaise, cheese, salt and chiles.' },
    { u: 2, front: 'Día de los Muertos', back: 'Nov 1–2. Ofrendas, marigolds, incense, food. Monarchs arrive in Michoacán.' },
    { u: 2, front: 'Rosca de Reyes', back: 'Jan 6 Epiphany pastry with a hidden baby doll. The finder hosts the Candlemas party.' },
    { u: 2, front: 'Año Nuevo traditions', back: '12 grapes at midnight, yellow underwear (money) or red (love), coin in shoe, sweep bad energy out the door.' },
    { u: 2, front: 'La familia mexicana: top values', back: 'Communication (23%), union (22%), respect (21%). 98% say family is vital.' },
    // Unit 2
    { u: 3, front: 'la comida chatarra', back: 'junk food' },
    { u: 3, front: 'la grasa', back: 'fat' },
    { u: 3, front: 'la merienda', back: 'snack' },
    { u: 3, front: 'mantenerse en forma', back: 'to stay in shape' },
    { u: 3, front: 'subir / bajar de peso', back: 'to gain / lose weight' },
    { u: 3, front: 'el ganador / el perdedor', back: 'winner / loser' },
    { u: 3, front: 'despertarse', back: 'to wake up (e→ie): me despierto' },
    { u: 3, front: 'acostarse', back: 'to go to bed (o→ue): me acuesto' },
    { u: 3, front: 'vestirse', back: 'to get dressed (e→i): me visto' },
    { u: 3, front: 'cepillarse los dientes', back: 'to brush your teeth' },
    { u: 3, front: 'la espalda / el pecho', back: 'back / chest' },
    { u: 3, front: 'la rodilla / el tobillo / la muñeca / el codo', back: 'knee / ankle / wrist / elbow' },
    { u: 3, front: 'los pulmones / el corazón', back: 'lungs / heart' },
    { u: 3, front: 'Reflexive pronouns', back: 'me, te, se, nos, os, se' },
    { u: 3, front: 'Where does a reflexive pronoun go?', back: 'Before the conjugated verb, or attached to the infinitive or gerundio (gerundio gets an accent).' },
    { u: 3, front: 'doler: duele vs. duelen', back: 'duele for one thing, duelen for plural. Use el / la / los / las with body parts.' },
    { u: 3, front: 'Affirmative tú command (regular)', back: 'Use the él / ella present form: ¡Habla! ¡Come! ¡Escribe!' },
    { u: 3, front: 'Eight irregular affirmative tú commands', back: 'ven, di, sal, haz, ten, ve, pon, sé' },
    { u: 3, front: 'AAA rule', back: 'Affirmative Always Attach: ¡Siéntate! ¡Vístete!' },
    { u: 3, front: 'Negative tú command formula', back: 'yo form, drop -o, add the opposite vowel (-ar → -es; -er / -ir → -as).' },
    { u: 3, front: 'SIDES (irregular negative tú)', back: 'ir → no vayas, ser → no seas, estar → no estés, dar → no des, saber → no sepas' },
    { u: 3, front: 'NNA rule', back: 'Negatives Never Attach: ¡No te duermas! ¡No lo hagas!' },
    { u: 3, front: 'Spelling changes in negative tú commands', back: '-car → -ques, -gar → -gues, -zar → -ces' },
    { u: 3, front: 'Healthy habits numbers', back: '30 min activity, 2 liters water, 5 fruit / veggie servings, 5 small meals, 7–8 hours sleep.' }
  ];

  var questions = [
    // Unit 0
    { u: 1, t: 'mc', q: 'What is the present tense ending for “nosotros” with an -ER verb?', c: ['-emos', '-amos', '-imos', '-en'], a: 0, why: '-ER verbs use -emos (comemos). -AR uses -amos; -IR uses -imos.' },
    { u: 1, t: 'mc', q: 'What is the present tense ending for “tú” with an -AR verb?', c: ['-as', '-es', '-a', '-áis'], a: 0, why: '-AR verbs use -as for tú (hablas).' },
    { u: 1, t: 'mc', q: 'Which forms do NOT change in a stem-changing (boot) verb?', c: ['nosotros and vosotros', 'yo and tú', 'él and ellos', 'tú and vosotros'], a: 0, why: 'The boot covers every form except nosotros and vosotros.' },
    { u: 1, t: 'mc', q: 'How do you say “we prefer”?', c: ['preferimos', 'prefieremos', 'prefiermos', 'prefiren'], a: 0, why: 'Nosotros does not change its stem: preferimos.' },
    { u: 1, t: 'mc', q: 'Choose the correct form: Ellos ___ al fútbol.', c: ['juegan', 'jugan', 'jugamos', 'juego'], a: 0, why: 'jugar is u→ue, and ellos ends in -an: juegan.' },
    { u: 1, t: 'mc', q: 'Choose the correct form: Yo ___ a casa a las tres.', c: ['vuelvo', 'volvo', 'volvemos', 'vuelves'], a: 0, why: 'volver is o→ue; yo ends in -o: vuelvo.' },
    { u: 1, t: 'mc', q: 'Choose the correct form: Mi mamá ___ la comida.', c: ['sirve', 'serve', 'sirvo', 'servimos'], a: 0, why: 'servir is e→i; él / ella ends in -e: sirve.' },
    { u: 1, t: 'mc', q: 'Complete: A mí ___ gustan los tacos.', c: ['me', 'te', 'le', 'nos'], a: 0, why: 'A mí goes with me.' },
    { u: 1, t: 'mc', q: 'Complete: Me ___ las enchiladas.', c: ['gustan', 'gusta', 'gustas', 'gusto'], a: 0, why: 'Enchiladas is plural, so use gustan.' },
    { u: 1, t: 'mc', q: 'Complete: A ellos ___ gusta bailar.', c: ['les', 'le', 'nos', 'os'], a: 0, why: 'A ellos goes with les. Bailar is an infinitive, so gusta is right.' },
    { u: 1, t: 'mc', q: 'What does the D in SER = DOCTOR stand for?', c: ['Description', 'Direction', 'Date', 'Distance'], a: 0, why: 'DOCTOR: Description, Origin, Characteristics, Time, Occupation, Relationship.' },
    { u: 1, t: 'mc', q: 'Which verb do you use for location? “El libro ___ en la mesa.”', c: ['está', 'es', 'son', 'soy'], a: 0, why: 'Location uses estar (PLACE).' },
    { u: 1, t: 'mc', q: 'Which verb do you use for occupation? “Mi padre ___ médico.”', c: ['es', 'está', 'estoy', 'están'], a: 0, why: 'Occupation uses ser (DOCTOR).' },
    { u: 1, t: 'mc', q: 'Which verb do you use for how someone feels right now? “Nosotros ___ cansados.”', c: ['estamos', 'somos', 'sois', 'son'], a: 0, why: 'Condition and emotion use estar.' },
    { u: 1, t: 'mc', q: 'Which expression means “to be hungry”?', c: ['tener hambre', 'estar hambre', 'ser hambre', 'hacer hambre'], a: 0, why: 'Spanish uses tener for hunger, thirst, cold, heat and sleepiness.' },
    // Unit 1
    { u: 2, t: 'mc', q: 'What does “la costumbre” mean?', c: ['custom', 'costume', 'cost', 'kitchen'], a: 0, why: 'La costumbre is a custom. A costume is el disfraz.' },
    { u: 2, t: 'mc', q: 'What does “el disfraz” mean?', c: ['costume', 'custom', 'recipe', 'dessert'], a: 0, why: 'El disfraz is a costume.' },
    { u: 2, t: 'mc', q: 'What does “los parientes” mean?', c: ['relatives', 'parents', 'guests', 'neighbors'], a: 0, why: 'Los parientes are relatives. Parents are los padres.' },
    { u: 2, t: 'mc', q: 'Which word means “spicy”?', c: ['picante', 'dulce', 'caliente', 'rico'], a: 0, why: 'Picante is spicy. Caliente is hot in temperature; dulce is sweet.' },
    { u: 2, t: 'mc', q: 'What does “Papálotl” mean in Nahuatl?', c: ['Butterfly', 'Corn', 'Family', 'Altar'], a: 0, why: 'Papálotl is the Nahuatl word for butterfly.' },
    { u: 2, t: 'mc', q: 'What is “el oyamel”?', c: ['The fir tree where monarchs rest', 'A type of corn', 'A holiday pastry', 'A Mexican soup'], a: 0, why: 'Oyamel fir forests are where monarch butterflies rest in the sanctuary.' },
    { u: 2, t: 'mc', q: 'Which phrase means “however”?', c: ['sin embargo', 'por eso', 'además', 'también'], a: 0, why: 'Sin embargo = however. Por eso = therefore; además = besides.' },
    { u: 2, t: 'mc', q: 'Which phrase means “unlike”?', c: ['a diferencia de', 'comparado con', 'tener en común', 'por lo tanto'], a: 0, why: 'A diferencia de = unlike. Comparado con = compared to.' },
    { u: 2, t: 'mc', q: 'Which phrase means “while” or “whereas”?', c: ['mientras que', 'tampoco', 'ambos', 'además'], a: 0, why: 'Mientras que contrasts two things.' },
    { u: 2, t: 'mc', q: 'Choose the correct sentence: “I like to cook.”', c: ['Me gusta cocinar.', 'Me gusta cocino.', 'Me gustan cocinar.', 'Me gusto cocinar.'], a: 0, why: 'When two verbs are together, the second stays an infinitive.' },
    { u: 2, t: 'mc', q: 'Which phrase means “to have to”?', c: ['tener que', 'acabar de', 'ir a', 'hay que'], a: 0, why: 'Tener que + infinitive = to have to. Acabar de = to have just. Ir a = going to.' },
    { u: 2, t: 'mc', q: 'What does “Acabo de comer” mean?', c: ['I just ate', 'I am going to eat', 'I have to eat', 'I want to eat'], a: 0, why: 'Acabar de + infinitive means to have just done something.' },
    { u: 2, t: 'mc', q: 'What is the present progressive formula?', c: ['ESTAR + gerundio', 'SER + infinitive', 'IR + a + gerundio', 'TENER + gerundio'], a: 0, why: 'Use a conjugated form of estar plus the gerundio.' },
    { u: 2, t: 'mc', q: 'What is the gerundio of “comer”?', c: ['comiendo', 'comando', 'comendo', 'comiendos'], a: 0, why: '-ER and -IR verbs take -iendo.' },
    { u: 2, t: 'mc', q: 'What is the gerundio of “hablar”?', c: ['hablando', 'hablendo', 'hablaendo', 'hablado'], a: 0, why: '-AR verbs take -ando.' },
    { u: 2, t: 'mc', q: 'What is the gerundio of “leer”?', c: ['leyendo', 'leiendo', 'leendo', 'lendo'], a: 0, why: 'Leer, traer and ir use -yendo: leyendo, trayendo, yendo.' },
    { u: 2, t: 'mc', q: 'What is the gerundio of “dormir”?', c: ['durmiendo', 'dormiendo', 'dormindo', 'durmendo'], a: 0, why: 'Stem-changing -ir verbs change the vowel: dormir → durmiendo.' },
    { u: 2, t: 'mc', q: 'What is the gerundio of “pedir”?', c: ['pidiendo', 'pediendo', 'pedendo', 'pidendo'], a: 0, why: 'Pedir is e→i, so the gerundio is pidiendo.' },
    { u: 2, t: 'mc', q: 'Which dish has green chile, walnut sauce and pomegranate seeds, matching the Mexican flag?', c: ['Chiles en nogada', 'Pozole', 'Mole poblano', 'Esquites'], a: 0, why: 'Chiles en nogada from Puebla show green, white and red.' },
    { u: 2, t: 'mc', q: 'Which dish is a hominy and pork soup?', c: ['Pozole', 'Tostadas', 'Tamales', 'Enchiladas'], a: 0, why: 'Pozole is made with hominy and pork.' },
    { u: 2, t: 'mc', q: 'Which pozole is made in Sinaloa and Jalisco?', c: ['Red', 'White', 'Green', 'Black'], a: 0, why: 'Red pozole: Sinaloa and Jalisco. White or green: Guerrero.' },
    { u: 2, t: 'mc', q: 'What are tamales wrapped in before steaming?', c: ['Corn husks or banana leaves', 'Lettuce', 'Tortillas', 'Paper'], a: 0, why: 'Tamales are masa filled and wrapped in corn husks or banana leaves.' },
    { u: 2, t: 'mc', q: 'Which dish is a sauce of chiles, seeds, spices and chocolate over turkey or chicken?', c: ['Mole poblano', 'Guacamole', 'Elotes', 'Tostadas'], a: 0, why: 'Mole poblano is the complex chocolate-chile sauce.' },
    { u: 2, t: 'mc', q: 'Which snack is corn with lime, mayonnaise, cheese, salt and chiles?', c: ['Elotes y esquites', 'Tostadas', 'Tacos', 'Pozole'], a: 0, why: 'Elotes (on the cob) and esquites (in a cup) use those toppings.' },
    { u: 2, t: 'mc', q: 'What do Mexican families rate as the top value after communication?', c: ['Union (22%)', 'Respect (21%)', 'Money', 'Sports'], a: 0, why: 'Communication 23%, union 22%, respect 21%.' },
    { u: 2, t: 'mc', q: 'What percent of Mexicans rate family as vital?', c: ['98%', '70%', '50%', '23%'], a: 0, why: '98% say family is vital. 70% of parents see their role as educating and guiding.' },
    { u: 2, t: 'mc', q: 'When is Día de los Muertos?', c: ['Nov 1–2', 'Jan 6', 'Dec 31', 'Oct 31 only'], a: 0, why: 'Día de los Muertos is Nov 1–2. Jan 6 is Rosca de Reyes.' },
    { u: 2, t: 'mc', q: 'In Mazahua tradition, what do monarch butterflies represent?', c: ['The spirits of ancestors', 'Good luck in school', 'Spring coming', 'Corn harvest'], a: 0, why: 'Monarchs arrive in Michoacán around Día de los Muertos and are seen as ancestors’ spirits.' },
    { u: 2, t: 'mc', q: 'What is hidden inside the Rosca de Reyes?', c: ['A baby doll', 'A coin', 'A key', 'A candy'], a: 0, why: 'Whoever finds the baby doll hosts the Candlemas party.' },
    { u: 2, t: 'mc', q: 'On Nochevieja, what do you eat at midnight?', c: ['12 grapes', '12 tamales', '12 tacos', '12 pieces of bread'], a: 0, why: 'Each grape is a wish for one month of the new year.' },
    { u: 2, t: 'mc', q: 'On New Year’s, what does yellow underwear bring?', c: ['Money', 'Love', 'Health', 'Travel'], a: 0, why: 'Yellow is for money and red is for love.' },
    // Unit 2
    { u: 3, t: 'mc', q: 'What does “la comida chatarra” mean?', c: ['junk food', 'healthy food', 'fast food only', 'a snack'], a: 0, why: 'Chatarra and basura both mean junk.' },
    { u: 3, t: 'mc', q: 'What does “mantenerse en forma” mean?', c: ['to stay in shape', 'to eat well', 'to sleep late', 'to lose weight'], a: 0, why: 'Mantenerse en forma means to stay in shape.' },
    { u: 3, t: 'mc', q: 'What does “la merienda” mean?', c: ['snack', 'breakfast', 'dinner', 'recipe'], a: 0, why: 'La merienda is a snack.' },
    { u: 3, t: 'mc', q: 'What does a reflexive verb show?', c: ['The subject does AND receives the action', 'The action happens to someone else', 'The action is in the past', 'The verb is irregular'], a: 0, why: 'Me lavo: I wash myself.' },
    { u: 3, t: 'mc', q: 'Choose the correct form: Yo ___ a las seis. (despertarse)', c: ['me despierto', 'me despertamos', 'se despierta', 'te despiertas'], a: 0, why: 'Despertarse is e→ie. Yo uses me and ends in -o.' },
    { u: 3, t: 'mc', q: 'Choose the correct form: Nosotros ___ a las diez. (acostarse)', c: ['nos acostamos', 'nos acuestamos', 'se acuestan', 'me acuesto'], a: 0, why: 'Nosotros does not have the stem change: nos acostamos.' },
    { u: 3, t: 'mc', q: 'Which pronoun goes with “ellos” in a reflexive verb?', c: ['se', 'me', 'te', 'os'], a: 0, why: 'Ellos, ellas and Uds. use se.' },
    { u: 3, t: 'mc', q: 'Which sentence is correct for “I am going to wake up”?', c: ['Voy a despertarme', 'Voy a me despertar', 'Voy me a despertar', 'Voy a despiertome'], a: 0, why: 'The pronoun goes before the conjugated verb (Me voy a despertar) or attaches to the infinitive (Voy a despertarme).' },
    { u: 3, t: 'mc', q: 'How do you say “I am brushing my teeth” with the pronoun attached to the gerundio?', c: ['Estoy cepillándome los dientes', 'Estoy cepillandome los dientes', 'Estoy me cepillando los dientes', 'Cepillándome estoy los dientes'], a: 0, why: 'Attaching to a gerundio adds an accent: cepillándome.' },
    { u: 3, t: 'mc', q: 'Choose the correct sentence: “My head hurts.”', c: ['Me duele la cabeza.', 'Me duelen la cabeza.', 'Me duele mi cabeza.', 'Mi cabeza me duele la.'], a: 0, why: 'One thing hurts, so duele; and use the article la, not “my”.' },
    { u: 3, t: 'mc', q: 'Choose the correct sentence: “My feet hurt.”', c: ['Me duelen los pies.', 'Me duele los pies.', 'Me duelen mis pies.', 'Me duelo los pies.'], a: 0, why: 'Feet are plural, so duelen, with the article los.' },
    { u: 3, t: 'mc', q: 'Which body part is “la rodilla”?', c: ['Knee', 'Elbow', 'Ankle', 'Wrist'], a: 0, why: 'La rodilla = knee. El codo = elbow; el tobillo = ankle; la muñeca = wrist.' },
    { u: 3, t: 'mc', q: 'Which body part is “la espalda”?', c: ['Back', 'Chest', 'Shoulder', 'Waist'], a: 0, why: 'La espalda = back. El pecho = chest.' },
    { u: 3, t: 'mc', q: 'What is the affirmative tú command of “hablar”?', c: ['¡Habla!', '¡Hables!', '¡Hablas!', '¡Hablá!'], a: 0, why: 'Affirmative tú commands use the él / ella form: habla.' },
    { u: 3, t: 'mc', q: 'What is the affirmative tú command of “hacer”?', c: ['¡Haz!', '¡Hace!', '¡Hagas!', '¡Hací!'], a: 0, why: 'Hacer is irregular: haz.' },
    { u: 3, t: 'mc', q: 'What is the affirmative tú command of “venir”?', c: ['¡Ven!', '¡Viene!', '¡Vengas!', '¡Vení!'], a: 0, why: 'Venir is irregular: ven.' },
    { u: 3, t: 'mc', q: 'What is the affirmative tú command of “ir”?', c: ['¡Ve!', '¡Va!', '¡Vayas!', '¡Ir!'], a: 0, why: 'Ir is irregular: ve.' },
    { u: 3, t: 'mc', q: 'What is the affirmative tú command of “ser”?', c: ['¡Sé!', '¡Es!', '¡Seas!', '¡Sea!'], a: 0, why: 'Ser is irregular: sé.' },
    { u: 3, t: 'mc', q: 'What is the affirmative tú command of “despertarse”?', c: ['¡Despiértate!', '¡Te despierta!', '¡Despierta te!', '¡No te despiertes!'], a: 0, why: 'AAA: pronouns attach to affirmative commands, and an accent is added.' },
    { u: 3, t: 'mc', q: 'What does AAA stand for?', c: ['Affirmative Always Attach', 'Always Add Accents', 'Affirmative Adds Articles', 'Always Attach Adjectives'], a: 0, why: 'In affirmative commands, pronouns attach to the end of the verb.' },
    { u: 3, t: 'mc', q: 'What is the negative tú command of “hablar”?', c: ['¡No hables!', '¡No habla!', '¡No hablas!', '¡No hable!'], a: 0, why: 'Yo hablo, drop -o, add -es: hables.' },
    { u: 3, t: 'mc', q: 'What is the negative tú command of “comer”?', c: ['¡No comas!', '¡No comes!', '¡No come!', '¡No comes tú!'], a: 0, why: 'Yo como, drop -o, add -as: comas.' },
    { u: 3, t: 'mc', q: 'What is the negative tú command of “escribir”?', c: ['¡No escribas!', '¡No escribes!', '¡No escribe!', '¡No escribis!'], a: 0, why: '-IR verbs also take -as in negative commands.' },
    { u: 3, t: 'mc', q: 'What is the negative tú command of “tocar”?', c: ['¡No toques!', '¡No tocas!', '¡No tocees!', '¡No toces!'], a: 0, why: '-car verbs change c to qu before e: toques.' },
    { u: 3, t: 'mc', q: 'What is the negative tú command of “jugar”?', c: ['¡No juegues!', '¡No jugues!', '¡No juegas!', '¡No juges!'], a: 0, why: 'Jugar keeps its stem change (juego) and -gar becomes -gues: juegues.' },
    { u: 3, t: 'mc', q: 'What is the negative tú command of “ir”?', c: ['¡No vayas!', '¡No ves!', '¡No ve!', '¡No vas!'], a: 0, why: 'SIDES irregular: ir → no vayas.' },
    { u: 3, t: 'mc', q: 'What is the negative tú command of “ser”?', c: ['¡No seas!', '¡No eres!', '¡No es!', '¡No sé!'], a: 0, why: 'SIDES irregular: ser → no seas.' },
    { u: 3, t: 'mc', q: 'What is the negative tú command of “saber”?', c: ['¡No sepas!', '¡No sabes!', '¡No sabas!', '¡No sé!'], a: 0, why: 'SIDES irregular: saber → no sepas.' },
    { u: 3, t: 'mc', q: 'What does the S in SIDES stand for?', c: ['saber', 'servir', 'salir', 'sentir'], a: 0, why: 'SIDES = ser, ir, dar, estar, saber (sepas).' },
    { u: 3, t: 'mc', q: 'Where do pronouns go in a negative command?', c: ['Before the verb', 'Attached to the end', 'After the infinitive', 'They are dropped'], a: 0, why: 'NNA: Negatives Never Attach. ¡No te duermas!' },
    { u: 3, t: 'mc', q: 'Choose the correct command: “Don’t fall asleep!”', c: ['¡No te duermas!', '¡No duérmete!', '¡No duermas te!', '¡Duérmete no!'], a: 0, why: 'Negative command: pronoun first, then the negative form (duermas keeps the stem change).' },
    { u: 3, t: 'mc', q: 'Choose the correct command: “Do it!” (using lo)', c: ['¡Hazlo!', '¡Lo haz!', '¡No lo hagas!', '¡Hácelo!'], a: 0, why: 'Affirmative: haz + lo attach to make hazlo.' },
    { u: 3, t: 'mc', q: 'How much water does the healthy habits guide say to drink a day?', c: ['2 liters', '1 liter', '5 liters', '8 liters'], a: 0, why: 'The guide says 2 liters of water daily.' },
    { u: 3, t: 'mc', q: 'How many servings of fruits and vegetables a day?', c: ['5', '2', '3', '10'], a: 0, why: 'The guide says 5 servings daily.' },
    { u: 3, t: 'mc', q: 'How many hours of sleep does the guide recommend?', c: ['7–8', '4–5', '9–10', '5–6'], a: 0, why: 'Sleep 7–8 hours.' },
    { u: 3, t: 'mc', q: 'How many minutes of physical activity a day does the guide recommend?', c: ['30', '10', '60', '90'], a: 0, why: '30 minutes of physical activity every day.' },
    { u: 3, t: 'mc', q: 'Which health risks come from a sedentary lifestyle?', c: ['Obesity, diabetes and heart disease', 'Colds and allergies', 'Broken bones', 'Poor eyesight'], a: 0, why: 'A sedentary lifestyle raises the risk of obesity, diabetes and heart disease.' }
  ];

  FINALS.addClass('spanish-2', {
    // Shown on this class's Home. The teacher has not posted an exam format.
    examFacts: [
      'Final: Thu Dec 17, period 3. Format not posted yet. Study Unit 0 (Repaso), Unit 1 (Familia, Tradiciones y Comida) and Unit 2 (Salud, Hábitos y Rutina Diaria).'
    ],
    units: units,
    flashcards: flashcards,
    questions: questions
  });
})();
