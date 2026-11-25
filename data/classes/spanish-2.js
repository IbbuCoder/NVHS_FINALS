// Español 2: Semester 1 final).
// Same format as human-geography.js: units with sections, flashcards, questions and examFacts.
// Built from the class notebooks: Unit 0 Repaso de Español 1, Unit 1 Familia, Tradiciones y
// Comida, Unit 2 Salud, Hábitos y Rutina Diaria. The exam format was not posted, so Home says so.
(function () {
  var units = [
    /* ---------- 00 ---------- */
    {
      id: 'u1', num: '00', title: 'Repaso de Español 1', short: 'Repaso',
      sections: [
        {
          id: 'u0-present', title: 'Present tense endings',
          body: ['Drop -ar, -er or -ir from the infinitive, then add the ending for who is doing the action.'],
          table: { head: ['Who', '-AR', '-ER', '-IR'], rows: [
            ['yo', '-o', '-o', '-o'],
            ['tú', '-as', '-es', '-es'],
            ['él / ella / Ud.', '-a', '-e', '-e'],
            ['nosotros', '-amos', '-emos', '-imos'],
            ['vosotros', '-áis', '-éis', '-ís'],
            ['ellos / ellas / Uds.', '-an', '-en', '-en']
          ] },
          simple: 'Take off the last two letters, then add the ending that matches the person.'
        },
        {
          id: 'u0-verbs', title: 'Core verbs',
          list: [
            '-AR: bailar, cantar, comprar, descansar, dibujar, enseñar, escuchar música, estudiar, hablar por teléfono, jugar al fútbol, mirar la televisión, montar en bicicleta, practicar deportes, preparar la comida, tocar un instrumento, tomar apuntes, trabajar, necesitar, llegar, llevar, limpiar, lavar, usar.',
            '-ER: beber, comer, correr, comprender / entender, conocer, deber, hacer, perder, poder, poner, querer, ser, tener, traer, vender, ver, volver.',
            '-IR: abrir, compartir, decir, dormir, escribir, ir, pedir, preferir, recibir, salir, servir, venir, vivir.',
            'Tener expressions: tener hambre, sed, frío, calor, sueño, miedo de, # años, y tener que + infinitive (to have to).'
          ]
        },
        {
          id: 'u0-boot', title: 'Stem-changing (“boot”) verbs',
          body: ['The stem changes in every form except nosotros and vosotros. Draw the boot around the forms that change.'],
          table: { head: ['Change', 'Verb', 'Forms'], rows: [
            ['e → ie', 'preferir', 'prefiero, prefieres, prefiere, preferimos, preferís, prefieren'],
            ['u → ue', 'jugar', 'juego, juegas, juega, jugamos, jugáis, juegan'],
            ['o → ue', 'volver', 'vuelvo, vuelves, vuelve, volvemos, volvéis, vuelven'],
            ['e → i', 'servir', 'sirvo, sirves, sirve, servimos, servís, sirven']
          ] }
        },
        {
          id: 'u0-gustar', title: 'Gustar',
          body: ['Use the indirect object pronoun + gusta (one thing) or gustan (plural things). The thing you like is the subject, so the verb matches it.'],
          table: { head: ['To add emphasis', 'Pronoun'], rows: [
            ['A mí', 'me'], ['A ti', 'te'], ['A él / ella / Ud.', 'le'],
            ['A nosotros', 'nos'], ['A vosotros', 'os'], ['A ellos / ellas / Uds.', 'les']
          ] }
        },
        {
          id: 'u0-serestar', title: 'Ser vs. estar',
          table: { head: ['', 'Use', 'Forms'], rows: [
            ['SER = DOCTOR', 'Description, Origin, Characteristics, Time, Occupation, Relationship', 'soy, eres, es, somos, sois, son'],
            ['ESTAR = PLACE', 'Position, Location, Action (progressive), Condition, Emotion', 'estoy, estás, está, estamos, estáis, están']
          ] },
          simple: 'Ser is for what something IS. Estar is for where it is and how it feels right now.'
        }
      ]
    },
    /* ---------- 01 ---------- */
    {
      id: 'u2', num: '01', title: 'Familia, Tradiciones y Comida', short: 'Familia',
      sections: [
        {
          id: 'u1-vocab', title: 'Vocabulary',
          list: [
            'Nouns: la alimentación (food, diet), el banquete (feast), el barrio (neighborhood), la calle (street), la costumbre (custom), el disfraz (costume), el hogar (home), el ingrediente, los invitados (guests), los parientes (relatives), la pimienta (pepper), el platillo típico / auténtico, el postre (dessert), el pueblo (town), la receta (recipe), el sabor (flavor), la sal (salt), la tradición.',
            'Verbs: ayudar, celebrar / festejar, cocinar, compartir, conversar, disfrutar, ir de vacaciones, probar (o→ue), servir (e→i), visitar.',
            'Adjectives: caliente (hot), dulce (sweet), orgulloso/a (proud), picante (spicy), rico/a (delicious).',
            'Papálotl terms: el santuario / bosque, la ofrenda / altar, el oyamel (fir tree), la migración, Papálotl (Nahuatl for butterfly), las alas (wings).'
          ]
        },
        {
          id: 'u1-compare', title: 'Comparing and connecting words',
          list: [
            'ambos / los dos (both), también (also), tampoco (neither / either, negative).',
            'más … que (more … than), menos … que (less … than).',
            'a diferencia de (unlike), comparado con (compared to), tener en común (to have in common).',
            'por lo tanto / por eso (therefore), además (besides), mientras que (while, whereas), sin embargo (however).'
          ]
        },
        {
          id: 'u1-infinitive', title: 'Two verbs together',
          body: ['When two verbs sit together, conjugate the first one and leave the second one as an infinitive.'],
          list: [
            'Key phrases that take an infinitive: gustar + inf., antes de, después de, tener que, ir a, tener ganas de, es importante, para, acabar de, hay que, deber, saber.',
            'Examples: Me gusta bailar. Voy a comer. Tengo que estudiar. Acabo de llegar.'
          ]
        },
        {
          id: 'u1-progressive', title: 'Present progressive',
          body: ['Use ESTAR (conjugated) + gerundio to say what is happening right now.'],
          table: { head: ['Verb type', 'Gerundio ending', 'Example'], rows: [
            ['-AR', '-ando', 'hablar → hablando'],
            ['-ER / -IR', '-iendo', 'comer → comiendo, vivir → viviendo'],
            ['Irregular (y)', '-yendo', 'leer → leyendo, traer → trayendo, ir → yendo'],
            ['Stem-changing -IR', 'vowel change + -iendo', 'dormir → durmiendo, servir → sirviendo, pedir → pidiendo, competir → compitiendo, decir → diciendo, seguir → siguiendo']
          ] }
        },
        {
          id: 'u1-food', title: 'Ocho platillos típicos',
          table: { head: ['Platillo', 'What to know'], rows: [
            ['Chiles en nogada', 'From Puebla. Green poblano chile, pork picadillo, walnut sauce and pomegranate seeds: the colors of the Mexican flag.'],
            ['Pozole', 'Hominy and pork soup. White or green in Guerrero, red in Sinaloa and Jalisco. Topped with lettuce, radish, onion and oregano.'],
            ['Tostadas', 'Prehispanic crispy corn tortillas with toppings.'],
            ['Tamales', 'Corn dough (masa) filled, wrapped in corn husks or banana leaves, then steamed.'],
            ['Enchiladas', 'Precolombian rolled tortillas covered in sauce or mole.'],
            ['Tacos', 'Prehispanic. Corn or wheat tortillas with fillings.'],
            ['Elotes y esquites', 'Corn with lime, mayonnaise, cheese, salt and chiles.'],
            ['Mole poblano', 'Complex sauce of chiles, seeds, herbs, spices and chocolate, served over turkey or chicken.']
          ] },
          list: ['Guacamole is avocado, eaten with totopos (tortilla chips).']
        },
        {
          id: 'u1-family', title: 'La familia mexicana',
          list: [
            '98% of Mexicans say family is vital.',
            'Top family values: communication (23%), union (22%), respect (21%).',
            '70% of parents see their role as educating and guiding their children.'
          ]
        },
        {
          id: 'u1-holidays', title: 'Fiestas y tradiciones',
          table: { head: ['Holiday', 'What to know'], rows: [
            ['Día de los Muertos (Nov 1–2)', 'Ofrendas / altares with marigolds, incense and food. Monarch butterflies arrive in Michoacán at this time; in Mazahua tradition they are the spirits of ancestors.'],
            ['Rosca de Reyes (Jan 6)', 'Epiphany pastry with a baby doll hidden inside. Whoever finds it hosts the Candlemas party.'],
            ['Nochevieja / Año Nuevo', 'Eat 12 grapes at midnight (12 wishes). Wear yellow underwear for money or red for love. Put a coin in your shoe, hold 12 coins, sweep bad energy out the door, light colored candles.']
          ] }
        }
      ]
    },
    /* ---------- 02 ---------- */
    {
      id: 'u3', num: '02', title: 'Salud, Hábitos y Rutina Diaria', short: 'Salud',
      sections: [
        {
          id: 'u2-vocab', title: 'Vocabulary',
          list: [
            'Nouns: el azúcar, el premio, el partido (game), la competencia, la salud, la grasa (fat), la comida saludable / chatarra / basura / variada / rápida, la merienda (snack), el médico, la vida sana, el consejo (advice), el cuerpo, el juego, el ganador, el perdedor, el trofeo, la medalla (oro / plata / bronce), los carbohidratos, las calorías, la actividad física / al aire libre, el estrés, la depresión, el hábito, una rutina sana, la proteína.',
            'Actions: hacer ejercicio, mantenerse en forma, seguir (e→i) una dieta balanceada, competir (e→i), desayunar, almorzar (o→ue), cenar, subir / bajar de peso, entrenarse.',
            'Daily routine: despertarse (e→ie), levantarse, acostarse (o→ue), dormirse (o→ue), lavarse, estirarse, enfermarse, relajarse, ducharse, bañarse, afeitarse, secarse, cepillarse los dientes, vestirse (e→i), ponerse la ropa, maquillarse, peinarse.',
            'Adjectives: sano/a, saludable, balanceado/a, variado/a, activo/a, competitivo/a, optimista, pesimista.'
          ]
        },
        {
          id: 'u2-body', title: 'Las partes del cuerpo',
          list: [
            'Head: la cabeza, la cara, los ojos, las orejas / los oídos (ears), la nariz, la boca, los dientes, la lengua.',
            'Trunk: el cuello, los hombros, el pecho, la espalda, el estómago, las caderas, la cintura.',
            'Arms: los brazos, el codo, la muñeca, las manos, los dedos.',
            'Legs: las piernas, la rodilla, el tobillo, los pies, los dedos del pie.',
            'Inside and outside: los músculos, los huesos, la piel, el corazón, los pulmones.'
          ]
        },
        {
          id: 'u2-reflexive', title: 'Reflexive verbs',
          body: ['In a reflexive verb the subject does the action AND receives it (me lavo = I wash myself). The pronouns are me, te, se, nos, os, se.'],
          table: { head: ['Who', 'levantarse'], rows: [
            ['yo', 'me levanto'], ['tú', 'te levantas'], ['él / ella / Ud.', 'se levanta'],
            ['nosotros', 'nos levantamos'], ['vosotros', 'os levantáis'], ['ellos / ellas / Uds.', 'se levantan']
          ] },
          list: [
            'The pronoun goes before the conjugated verb: Me levanto.',
            'Or attach it to the infinitive: Voy a levantarme.',
            'Or attach it to the gerundio, and add an accent: Estoy levantándome.'
          ]
        },
        {
          id: 'u2-doler', title: 'Doler (to hurt)',
          body: ['Doler works like gustar: duele (one thing hurts) and duelen (more than one thing hurts). It is also a boot verb (o→ue). Use the definite article (el, la, los, las) with body parts, not “my”.'],
          list: ['Me duele la cabeza. Me duelen los pies.']
        },
        {
          id: 'u2-tu-affirm', title: 'Tú commands: affirmative',
          list: [
            'Use the él / ella (3rd person singular) present form: ¡Habla! ¡Escucha! ¡Escribe!',
            'Eight irregulars: venir → ven, decir → di, salir → sal, hacer → haz, tener → ten, ir → ve, poner → pon, ser → sé. (Ven Di Sal Haz Ten Ve Pon Sé)',
            'AAA rule (Affirmative Always Attach): attach the pronouns to the end and add an accent mark if needed: ¡Despiértate! ¡Vístete! ¡Póntelos!'
          ]
        },
        {
          id: 'u2-tu-neg', title: 'Tú commands: negative',
          list: [
            'Start with the yo form, drop the -o, then add the opposite vowel: -ar verbs get -es, -er / -ir verbs get -as. ¡No hables! ¡No comas! ¡No escribas!',
            'Spelling changes carry over: -car → -ques, -gar → -gues, -zar → -ces. Stem changes carry over too: No pongas, No enciendas, No duermas.',
            'Irregular negatives (SIDES): ir → no vayas, ser → no seas, estar → no estés, dar → no des, saber → no sepas.',
            'NNA rule (Negatives Never Attach): the pronoun goes BEFORE the command. ¡No te duermas! ¡No lo hagas!'
          ]
        },
        {
          id: 'u2-habits', title: 'Hábitos saludables',
          list: [
            '30 minutes of physical activity every day.',
            '2 liters of water a day.',
            '5 servings of fruits and vegetables a day.',
            'Avoid saturated fats (grasas saturadas).',
            '5 small meals a day, and never skip breakfast.',
            'Sleep 7–8 hours.',
            'No tobacco or alcohol.',
            'A sedentary lifestyle raises the risk of obesity, diabetes and heart disease.'
          ]
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
      'Format not posted yet. Study Unit 0 (Repaso), Unit 1 (Familia, Tradiciones y Comida) and Unit 2 (Salud, Hábitos y Rutina Diaria).'
    ],
    units: units,
    flashcards: flashcards,
    questions: questions
  });
})();
