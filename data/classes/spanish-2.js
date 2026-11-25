// Español 2: Semester 1 final (Thu Dec 17, period 3).
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
          simple: 'To say what someone does, cut the end off the verb and add a new ending.',
          body: [
            'A Spanish verb in its basic form is called the infinitive. It ends in -ar, -er or -ir. For example: hablar (to talk), comer (to eat), vivir (to live).',
            'To use a verb, follow 2 steps. Step 1: cut off the last 2 letters (hablar becomes habl-). Step 2: add the ending that matches who is doing the action.',
            'Example: yo + hablar = yo hablo (I talk). Ella + comer = ella come (she eats). Nosotros + vivir = nosotros vivimos (we live).'
          ],
          table: { head: ['Who', '-AR', '-ER', '-IR'], rows: [
            ['yo (I)', '-o', '-o', '-o'],
            ['tú (you)', '-as', '-es', '-es'],
            ['él / ella / Ud. (he / she / you formal)', '-a', '-e', '-e'],
            ['nosotros (we)', '-amos', '-emos', '-imos'],
            ['vosotros (you all, Spain)', '-áis', '-éis', '-ís'],
            ['ellos / ellas / Uds. (they / you all)', '-an', '-en', '-en']
          ] }
        },
        {
          id: 'u0-verbs', title: 'Core verbs',
          simple: 'These are the verbs you need to know. Learn them by their ending.',
          body: ['Sort the verbs by their ending (-ar, -er or -ir). That tells you which endings to use.'],
          list: [
            '-AR verbs: bailar (to dance), cantar (to sing), comprar (to buy), descansar (to rest), dibujar (to draw), enseñar (to teach), escuchar música (to listen to music), estudiar (to study), hablar por teléfono (to talk on the phone), jugar al fútbol (to play soccer), mirar la televisión (to watch TV), montar en bicicleta (to ride a bike), practicar deportes (to play sports), preparar la comida (to make food), tocar un instrumento (to play an instrument), tomar apuntes (to take notes), trabajar (to work), necesitar (to need), llegar (to arrive), llevar (to carry or wear), limpiar (to clean), lavar (to wash), usar (to use).',
            '-ER verbs: beber (to drink), comer (to eat), correr (to run), comprender / entender (to understand), conocer (to know a person), deber (should), hacer (to do or make), perder (to lose), poder (can), poner (to put), querer (to want), ser (to be), tener (to have), traer (to bring), vender (to sell), ver (to see), volver (to return).',
            '-IR verbs: abrir (to open), compartir (to share), decir (to say), dormir (to sleep), escribir (to write), ir (to go), pedir (to ask for), preferir (to prefer), recibir (to receive), salir (to leave), servir (to serve), venir (to come), vivir (to live).',
            'Tener (to have) is also used to say how you feel: tener hambre (to be hungry), tener sed (thirsty), tener frío (cold), tener calor (hot), tener sueño (sleepy), tener miedo de (afraid of), tener 15 años (to be 15 years old).',
            'Tener que + a verb means "have to": Tengo que estudiar = I have to study.'
          ]
        },
        {
          id: 'u0-boot', title: 'Stem-changing (“boot”) verbs',
          simple: 'In some verbs, a vowel in the middle changes in most forms. Nosotros and vosotros do not change.',
          body: [
            'Some verbs change a vowel in the middle (the stem). For example, preferir becomes prefiero, not preferio.',
            'The change happens in yo, tú, él / ella and ellos. It does NOT happen in nosotros and vosotros.',
            'If you draw a line around the forms that change, it looks like a boot. That is why they are called boot verbs.',
            'There are 4 kinds of change: e → ie, u → ue, o → ue, and e → i.'
          ],
          table: { head: ['Change', 'Verb', 'Forms'], rows: [
            ['e → ie', 'preferir (to prefer)', 'prefiero, prefieres, prefiere, preferimos, preferís, prefieren'],
            ['u → ue', 'jugar (to play)', 'juego, juegas, juega, jugamos, jugáis, juegan'],
            ['o → ue', 'volver (to return)', 'vuelvo, vuelves, vuelve, volvemos, volvéis, vuelven'],
            ['e → i', 'servir (to serve)', 'sirvo, sirves, sirve, servimos, servís, sirven']
          ] }
        },
        {
          id: 'u0-gustar', title: 'Gustar',
          simple: 'Gustar means "to like," but it works backwards: the thing you like is the subject.',
          body: [
            'In Spanish you do not say "I like pizza." You say "Pizza is pleasing to me": Me gusta la pizza.',
            'The thing you like decides the verb. One thing, or a verb: gusta (Me gusta bailar. Me gusta el libro.). More than one thing: gustan (Me gustan los libros.).',
            'Before gusta or gustan, put me, te, le, nos, os or les. This tells you who likes it.',
            'To add emphasis, put "A + person" at the start: A mí me gusta la música. (I really like music.)'
          ],
          table: { head: ['Emphasis', 'Pronoun (comes before gusta)'], rows: [
            ['A mí (me)', 'me'], ['A ti (you)', 'te'], ['A él / ella / Ud. (him / her / you formal)', 'le'],
            ['A nosotros (us)', 'nos'], ['A vosotros (you all)', 'os'], ['A ellos / ellas / Uds. (them)', 'les']
          ] }
        },
        {
          id: 'u0-serestar', title: 'Ser vs. estar',
          simple: 'Both mean "to be." Ser is for what something IS. Estar is for where it is and how it feels right now.',
          body: [
            'Spanish has 2 verbs for "to be": ser and estar. You pick the one that fits.',
            'Use SER for the things in the word DOCTOR: Description, Origin, Characteristics, Time, Occupation, Relationship. Example: Soy estudiante (I am a student).',
            'Use ESTAR for the things in the word PLACE: Position, Location, Action (when you are doing something right now), Condition, Emotion. Example: Estoy cansado (I am tired).'
          ],
          table: { head: ['Verb', 'Use it for', 'Forms'], rows: [
            ['SER = DOCTOR', 'Description, Origin, Characteristics, Time, Occupation, Relationship', 'soy, eres, es, somos, sois, son'],
            ['ESTAR = PLACE', 'Position, Location, Action (progressive), Condition, Emotion', 'estoy, estás, está, estamos, estáis, están']
          ] }
        }
      ]
    },
    /* ---------- 01 ---------- */
    {
      id: 'u2', num: '01', title: 'Familia, Tradiciones y Comida', short: 'Familia',
      sections: [
        {
          id: 'u1-vocab', title: 'Vocabulary',
          simple: 'Words about family, food and traditions. Learn them in groups.',
          body: ['Learn the words in their groups. Words with el or la are nouns (things). Words like ayudar are verbs (actions).'],
          list: [
            'Nouns: la alimentación (food, diet), el banquete (feast), el barrio (neighborhood), la calle (street), la costumbre (custom), el disfraz (costume), el hogar (home), el ingrediente (ingredient), los invitados (guests), los parientes (relatives), la pimienta (pepper), el platillo típico / auténtico (traditional dish), el postre (dessert), el pueblo (town), la receta (recipe), el sabor (flavor), la sal (salt), la tradición (tradition).',
            'Verbs: ayudar (to help), celebrar / festejar (to celebrate), cocinar (to cook), compartir (to share), conversar (to chat), disfrutar (to enjoy), ir de vacaciones (to go on vacation), probar (to try; o→ue), servir (to serve; e→i), visitar (to visit).',
            'Adjectives: caliente (hot), dulce (sweet), orgulloso/a (proud), picante (spicy), rico/a (delicious).',
            'Butterfly words (Papálotl): el santuario / bosque (sanctuary / forest), la ofrenda / altar (offering / altar), el oyamel (fir tree), la migración (migration), Papálotl (the Nahuatl word for butterfly), las alas (wings).'
          ]
        },
        {
          id: 'u1-compare', title: 'Comparing and connecting words',
          simple: 'These words help you compare things and join ideas.',
          body: ['Use these words to compare two things or to join two sentences.'],
          list: [
            'ambos / los dos = both. También = also. Tampoco = neither or either (use it in a negative sentence).',
            'más … que = more … than. Menos … que = less … than. Example: Mi casa es más grande que tu casa.',
            'a diferencia de = unlike. Comparado con = compared to. Tener en común = to have in common.',
            'por lo tanto / por eso = therefore. Además = besides. Mientras que = while, whereas. Sin embargo = however.'
          ]
        },
        {
          id: 'u1-infinitive', title: 'Two verbs together',
          simple: 'When 2 verbs are next to each other, change the first one. Keep the second one in its basic form.',
          body: [
            'Sometimes 2 verbs sit side by side. Change only the first one to match the person. Leave the second one as an infinitive (the form ending in -ar, -er or -ir).',
            'Example: Voy a comer. "Voy" is changed (from ir). "Comer" stays the same.'
          ],
          list: [
            'Phrases that are followed by an infinitive: gustar + infinitive, antes de (before), después de (after), tener que (have to), ir a (going to), tener ganas de (feel like), es importante (it is important), para (in order to), acabar de (just did), hay que (one must), deber (should), saber (to know how to).',
            'Examples: Me gusta bailar (I like to dance). Voy a comer (I am going to eat). Tengo que estudiar (I have to study). Acabo de llegar (I just arrived).'
          ]
        },
        {
          id: 'u1-progressive', title: 'Present progressive',
          simple: 'Use it to say what is happening right now: estar + a verb ending in -ando or -iendo.',
          body: [
            'The present progressive says what is happening at this very moment. In English: "I am eating."',
            'Build it in 2 parts. Part 1: the right form of ESTAR (estoy, estás, está...). Part 2: the gerundio, which is the "-ing" form of the verb.',
            'Example: Estoy hablando = I am talking. Ella está comiendo = She is eating.'
          ],
          table: { head: ['Verb type', 'Gerundio ending', 'Example'], rows: [
            ['-AR', '-ando', 'hablar → hablando'],
            ['-ER / -IR', '-iendo', 'comer → comiendo, vivir → viviendo'],
            ['Irregular (y)', '-yendo', 'leer → leyendo, traer → trayendo, ir → yendo'],
            ['Stem-changing -IR', 'change the vowel, then add -iendo', 'dormir → durmiendo, servir → sirviendo, pedir → pidiendo, competir → compitiendo, decir → diciendo, seguir → siguiendo']
          ] }
        },
        {
          id: 'u1-food', title: 'Ocho platillos típicos',
          simple: 'Eight famous Mexican dishes and one fact about each.',
          body: ['A platillo típico is a traditional dish. Learn one fact about each of these 8.'],
          table: { head: ['Platillo', 'What to know'], rows: [
            ['Chiles en nogada', 'From Puebla. A green poblano chile filled with pork picadillo, covered in walnut sauce and pomegranate seeds. The colors are the colors of the Mexican flag.'],
            ['Pozole', 'A soup made with hominy (large corn kernels) and pork. White or green in Guerrero, red in Sinaloa and Jalisco. Topped with lettuce, radish, onion and oregano.'],
            ['Tostadas', 'Very old (prehispanic). Crispy corn tortillas with toppings.'],
            ['Tamales', 'Corn dough (masa) with a filling, wrapped in corn husks or banana leaves, then steamed.'],
            ['Enchiladas', 'Very old (precolombian). Rolled tortillas covered in sauce or mole.'],
            ['Tacos', 'Very old (prehispanic). Corn or wheat tortillas with fillings.'],
            ['Elotes y esquites', 'Corn with lime, mayonnaise, cheese, salt and chiles.'],
            ['Mole poblano', 'A complex sauce made of chiles, seeds, herbs, spices and chocolate. Served over turkey or chicken.']
          ] },
          list: ['Guacamole is avocado. It is eaten with totopos (tortilla chips).']
        },
        {
          id: 'u1-family', title: 'La familia mexicana',
          simple: 'Three facts about how important family is in Mexico.',
          list: [
            '98% of Mexicans say family is vital (very important).',
            'The top family values are communication (23%), union (22%) and respect (21%).',
            '70% of parents see their role as educating and guiding their children.'
          ]
        },
        {
          id: 'u1-holidays', title: 'Fiestas y tradiciones',
          simple: 'Three holidays and what people do for each one.',
          body: ['Learn what happens at each holiday.'],
          table: { head: ['Holiday', 'What to know'], rows: [
            ['Día de los Muertos (Nov 1–2)', 'Families build ofrendas (altars) with marigolds, incense and food. Monarch butterflies arrive in Michoacán at this time. In Mazahua tradition, they are the spirits of ancestors.'],
            ['Rosca de Reyes (Jan 6)', 'A sweet bread eaten on Epiphany. A baby doll is hidden inside. Whoever finds it hosts the Candlemas party.'],
            ['Nochevieja / Año Nuevo (New Year)', 'Eat 12 grapes at midnight (12 wishes). Wear yellow underwear for money or red for love. Put a coin in your shoe, hold 12 coins, sweep bad energy out the door, and light colored candles.']
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
          simple: 'Words about health, food, sports and your daily routine.',
          body: ['Learn the words in their groups.'],
          list: [
            'Nouns: el azúcar (sugar), el premio (prize), el partido (game), la competencia (competition), la salud (health), la grasa (fat), la comida saludable / chatarra / basura / variada / rápida (healthy / junk / junk / varied / fast food), la merienda (snack), el médico (doctor), la vida sana (healthy life), el consejo (advice), el cuerpo (body), el juego (game), el ganador (winner), el perdedor (loser), el trofeo (trophy), la medalla (medal: oro / plata / bronce = gold / silver / bronze), los carbohidratos (carbs), las calorías (calories), la actividad física / al aire libre (physical / outdoor activity), el estrés (stress), la depresión (depression), el hábito (habit), una rutina sana (healthy routine), la proteína (protein).',
            'Actions: hacer ejercicio (to exercise), mantenerse en forma (to stay in shape), seguir (e→i) una dieta balanceada (to follow a balanced diet), competir (e→i) (to compete), desayunar (to eat breakfast), almorzar (o→ue) (to eat lunch), cenar (to eat dinner), subir / bajar de peso (to gain / lose weight), entrenarse (to train).',
            'Daily routine: despertarse (e→ie) (to wake up), levantarse (to get up), acostarse (o→ue) (to go to bed), dormirse (o→ue) (to fall asleep), lavarse (to wash), estirarse (to stretch), enfermarse (to get sick), relajarse (to relax), ducharse (to shower), bañarse (to bathe), afeitarse (to shave), secarse (to dry off), cepillarse los dientes (to brush teeth), vestirse (e→i) (to get dressed), ponerse la ropa (to put on clothes), maquillarse (to put on makeup), peinarse (to comb hair).',
            'Adjectives: sano/a (healthy), saludable (healthy), balanceado/a (balanced), variado/a (varied), activo/a (active), competitivo/a (competitive), optimista (optimistic), pesimista (pessimistic).'
          ]
        },
        {
          id: 'u2-body', title: 'Las partes del cuerpo',
          simple: 'Body parts, grouped by where they are.',
          body: ['Learn the body parts in groups: head, trunk, arms, legs, and inside and outside.'],
          list: [
            'Head: la cabeza (head), la cara (face), los ojos (eyes), las orejas / los oídos (ears), la nariz (nose), la boca (mouth), los dientes (teeth), la lengua (tongue).',
            'Trunk (the middle): el cuello (neck), los hombros (shoulders), el pecho (chest), la espalda (back), el estómago (stomach), las caderas (hips), la cintura (waist).',
            'Arms: los brazos (arms), el codo (elbow), la muñeca (wrist), las manos (hands), los dedos (fingers).',
            'Legs: las piernas (legs), la rodilla (knee), el tobillo (ankle), los pies (feet), los dedos del pie (toes).',
            'Inside and outside: los músculos (muscles), los huesos (bones), la piel (skin), el corazón (heart), los pulmones (lungs).'
          ]
        },
        {
          id: 'u2-reflexive', title: 'Reflexive verbs',
          simple: 'A reflexive verb is an action you do to yourself. Add me, te, se, nos, os or se before the verb.',
          body: [
            'A reflexive verb is an action you do to yourself. Example: me lavo = I wash myself. Levantarse = to get (yourself) up.',
            'You can spot one because the infinitive ends in -se (levantarse, lavarse, vestirse).',
            'Before the verb, add a small word that matches who is acting: me, te, se, nos, os, se. Then change the verb like normal.'
          ],
          table: { head: ['Who', 'levantarse (to get up)'], rows: [
            ['yo', 'me levanto'], ['tú', 'te levantas'], ['él / ella / Ud.', 'se levanta'],
            ['nosotros', 'nos levantamos'], ['vosotros', 'os levantáis'], ['ellos / ellas / Uds.', 'se levantan']
          ] },
          list: [
            'Where does the small word go? Option 1: before the verb. Me levanto.',
            'Option 2: attached to the end of an infinitive. Voy a levantarme.',
            'Option 3: attached to the end of a gerundio. You must also add an accent: Estoy levantándome.'
          ]
        },
        {
          id: 'u2-doler', title: 'Doler (to hurt)',
          simple: 'Doler works like gustar. Use duele for one thing and duelen for more than one.',
          body: [
            'Doler means "to hurt." It works backwards, just like gustar. The body part is the subject.',
            'One body part: duele. More than one: duelen. Put me, te, le, nos, os or les before it.',
            'Doler is also a boot verb (o→ue): that is why it is duele, not dole.',
            'With body parts, use el, la, los or las. Do NOT say "my."'
          ],
          list: ['Me duele la cabeza (My head hurts). Me duelen los pies (My feet hurt).']
        },
        {
          id: 'u2-tu-affirm', title: 'Tú commands: affirmative',
          simple: 'A "yes, do it" command to a friend uses the él / ella form of the verb.',
          body: ['A command tells someone to do something. This lesson is about telling a friend (tú) to DO something, like "Talk!" or "Eat!"'],
          list: [
            'Rule: use the él / ella form of the verb. Hablar → ¡Habla! (Talk!) Escuchar → ¡Escucha! (Listen!) Escribir → ¡Escribe! (Write!)',
            'There are 8 irregular ones. Memorize them with the words: Ven Di Sal Haz Ten Ve Pon Sé. They are venir → ven, decir → di, salir → sal, hacer → haz, tener → ten, ir → ve, poner → pon, ser → sé.',
            'AAA rule: Affirmative Always Attach. Attach the small words (me, te, se, lo...) to the END of the command. Add an accent mark if needed: ¡Despiértate! ¡Vístete! ¡Póntelos!'
          ]
        },
        {
          id: 'u2-tu-neg', title: 'Tú commands: negative',
          simple: 'A "no, don\'t" command: take the yo form, drop the -o, and add the OPPOSITE ending.',
          body: ['This is how to tell a friend NOT to do something. Example: ¡No hables! (Do not talk!)'],
          list: [
            'Rule: start with the yo form. Drop the -o. Then add the opposite vowel. -ar verbs get -es. -er and -ir verbs get -as. Examples: ¡No hables! ¡No comas! ¡No escribas!',
            'Spelling changes: -car → -ques, -gar → -gues, -zar → -ces. Stem changes stay: No pongas, No enciendas, No duermas.',
            'Irregular negatives. Memorize them as SIDES: ir → no vayas, ser → no seas, estar → no estés, dar → no des, saber → no sepas.',
            'NNA rule: Negatives Never Attach. The small word goes BEFORE the command: ¡No te duermas! ¡No lo hagas!'
          ]
        },
        {
          id: 'u2-habits', title: 'Hábitos saludables',
          simple: 'Healthy habits and numbers to remember.',
          list: [
            '30 minutes of physical activity every day.',
            '2 liters of water a day.',
            '5 servings of fruits and vegetables a day.',
            'Avoid saturated fats (grasas saturadas).',
            '5 small meals a day, and never skip breakfast.',
            'Sleep 7–8 hours.',
            'No tobacco or alcohol.',
            'A sedentary lifestyle (sitting a lot) raises the risk of obesity, diabetes and heart disease.'
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
      'Final: Thu Dec 17, period 3. Format not posted yet. Study Unit 0 (Repaso), Unit 1 (Familia, Tradiciones y Comida) and Unit 2 (Salud, Hábitos y Rutina Diaria).'
    ],
    units: units,
    flashcards: flashcards,
    questions: questions
  });
})();
