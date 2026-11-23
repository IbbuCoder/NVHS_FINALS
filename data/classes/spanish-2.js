// Spanish 2 (Español 2): Semester 1 final.
// Same format as data/classes/_template.js, honors-geometry.js and human-geography.js:
// units with sections, flashcards, questions and examFacts for Home.
// Unit 2's 74 vocab words come from the class vocab set. Unit 1 vocab is standard Spanish 2
// family and traditions vocab (the class list wasn't available). Unit 3 has no plot details
// about the film on purpose: students add their own from class notes.
// Every command, conjugation and accent here is checked by a script before it goes on the site.
(function () {
  var units = [
    /* ---------- 01 ---------- */
    {
      id: 'u1', num: '01', title: 'Familias y Tradiciones', short: 'Familias',
      sections: [
        {
          id: 'u1-note', title: 'Before you start',
          body: ['The family and traditions words in this unit are standard Spanish 2 vocab. Check your class vocab list too, in case your teacher used different words.']
        },
        {
          id: 'u1-present', title: 'Present tense',
          body: ['Drop the -ar, -er or -ir and add the ending for the person.'],
          table: { head: ['Person', 'hablar (-ar)', 'comer (-er)', 'vivir (-ir)'], rows: [
            ['yo', 'hablo', 'como', 'vivo'],
            ['tú', 'hablas', 'comes', 'vives'],
            ['él / ella / Ud.', 'habla', 'come', 'vive'],
            ['nosotros', 'hablamos', 'comemos', 'vivimos'],
            ['vosotros', 'habláis', 'coméis', 'vivís'],
            ['ellos / ellas / Uds.', 'hablan', 'comen', 'viven']
          ] },
          list: [
            'Stem changers change in every form except nosotros and vosotros: querer → quiero (e→ie), poder → puedo (o→ue), pedir → pido (e→i).',
            'Irregular yo forms: hacer → hago, poner → pongo, salir → salgo, traer → traigo, decir → digo, venir → vengo, tener → tengo.',
            'Fully irregular: ser (soy, eres, es, somos, sois, son), estar (estoy, estás, está, estamos, estáis, están), ir (voy, vas, va, vamos, vais, van).',
            'Example: Mi familia celebra el Año Nuevo en casa de mis abuelos.'
          ]
        },
        {
          id: 'u1-progressive', title: 'Present progressive (estar + -ando / -iendo)',
          body: ['Use it for what is happening right now: a form of estar plus a gerund (the -ing form).'],
          list: [
            '-ar verbs: drop -ar, add -ando. cocinar → cocinando.',
            '-er and -ir verbs: drop the ending, add -iendo. comer → comiendo, escribir → escribiendo.',
            'When the stem ends in a vowel, -iendo becomes -yendo: leer → leyendo, traer → trayendo, oír → oyendo.',
            '-ir stem changers change e→i or o→u: pedir → pidiendo, decir → diciendo, dormir → durmiendo, vestir → vistiendo.',
            'Examples: Mi abuela está cocinando mole. Los niños están rompiendo la piñata. Estamos decorando el altar. Mi abuelo está durmiendo.',
            'Reflexive pronouns go before estar or on the end of the gerund (add an accent): Me estoy vistiendo. = Estoy vistiéndome.'
          ]
        },
        {
          id: 'u1-serestar', title: 'Ser vs. estar',
          table: { head: ['Verb', 'Use', 'Example'], rows: [
            ['ser (DOCTOR)', 'Description', 'La casa de mi tía es grande.'],
            ['ser (DOCTOR)', 'Occupation', 'Mi tía es médica.'],
            ['ser (DOCTOR)', 'Characteristic', 'Mi abuela es simpática.'],
            ['ser (DOCTOR)', 'Time', 'Son las ocho. Hoy es lunes.'],
            ['ser (DOCTOR)', 'Origin', 'Mi familia es de México.'],
            ['ser (DOCTOR)', 'Relationship', 'Ella es mi prima.'],
            ['estar (PLACE)', 'Position', 'El niño está sentado.'],
            ['estar (PLACE)', 'Location', 'La abuela está en la cocina.'],
            ['estar (PLACE)', 'Action (present progressive)', 'Estamos cocinando.'],
            ['estar (PLACE)', 'Condition', 'Mi hermano está enfermo.'],
            ['estar (PLACE)', 'Emotion', 'Estoy contento.']
          ] },
          list: [
            'Ser is for what something is. Estar is for how and where something is right now.',
            'The A in PLACE is Action, which is the present progressive (estar + -ando / -iendo). If your class learned PLACE without it, go by your class notes.'
          ]
        },
        {
          id: 'u1-gustar', title: 'Gustar and verbs like it',
          body: ['Gustar means “to be pleasing to.” The thing you like is the subject, so the verb matches the thing, not the person.'],
          table: { head: ['Who likes it', 'One thing or an action', 'Two or more things'], rows: [
            ['(a mí) me', 'Me gusta el mole.', 'Me gustan las tradiciones.'],
            ['(a ti) te', 'Te gusta bailar.', 'Te gustan los tamales.'],
            ['(a él / ella / Ud.) le', 'Le gusta la fiesta.', 'Le gustan los regalos.'],
            ['(a nosotros) nos', 'Nos gusta celebrar.', 'Nos gustan las velas.'],
            ['(a vosotros) os', 'Os gusta cantar.', 'Os gustan los desfiles.'],
            ['(a ellos / ellas / Uds.) les', 'Les gusta cocinar.', 'Les gustan las fiestas.']
          ] },
          list: [
            'Other verbs that work the same way: encantar (to love), interesar (to interest), importar (to matter), molestar (to bother), doler (to hurt): Me encanta la Rosca de Reyes. Le duele la cabeza.',
            'Add “a” + the person to make it clear: A mi abuela le gusta el pan de muerto.'
          ]
        },
        {
          id: 'u1-traditions', title: 'Traditions we studied',
          table: { head: ['Tradition', 'What happens'], rows: [
            ['Día de los Muertos', 'November 1 and 2. Families remember loved ones who died. They build an ofrenda (altar) with photos, favorite foods, candles, cempasúchil (marigold) flowers, sugar skulls and pan de muerto, and many visit the cemetery. It is a happy remembering, not a sad day.'],
            ['El mole', 'A thick Mexican sauce made with chiles, spices, nuts or seeds, and often chocolate. Mole poblano comes from Puebla. It is served at big celebrations like weddings, quinceañeras and holidays.'],
            ['Rosca de Reyes', 'January 6, Día de los Reyes (Three Kings Day). A ring-shaped sweet bread with small figures of baby Jesus hidden inside. Whoever finds one invites everyone to tamales on February 2 (Día de la Candelaria).'],
            ['Año Nuevo', 'At midnight many people eat 12 grapes, one for each stroke of the clock, and make a wish for each month. Some walk around the block with a suitcase for a year of travel.'],
            ['La familia mexicana', 'Families are often close and large. Grandparents, aunts, uncles and cousins get together often, elders are respected, and godparents (padrinos) have an important role.'],
            ['Quinceañera vs. cumpleaños', 'A quinceañera celebrates a girl turning 15 and moving from childhood to young adulthood: a formal dress, a court of friends (damas and chambelanes), and a waltz (el vals) with her father. A cumpleaños happens every year, with cake, candles, often a piñata, and in Mexico the song “Las Mañanitas.”']
          ] }
        },
        {
          id: 'u1-vocab', title: 'Family and traditions vocab',
          body: ['Check your class vocab list too.'],
          table: { head: ['Español', 'English'], rows: [
            ['los abuelos', 'grandparents'], ['el tío / la tía', 'uncle / aunt'], ['el primo / la prima', 'cousin'],
            ['el sobrino / la sobrina', 'nephew / niece'], ['el nieto / la nieta', 'grandson / granddaughter'],
            ['el esposo / la esposa', 'husband / wife'], ['el padrastro / la madrastra', 'stepfather / stepmother'],
            ['el hermanastro / la hermanastra', 'stepbrother / stepsister'], ['el medio hermano / la media hermana', 'half brother / half sister'],
            ['el padrino / la madrina', 'godfather / godmother'], ['el cuñado / la cuñada', 'brother-in-law / sister-in-law'],
            ['los parientes', 'relatives'], ['la tradición', 'tradition'], ['la costumbre', 'custom'], ['celebrar', 'to celebrate'],
            ['reunirse', 'to get together'], ['el cumpleaños', 'birthday'], ['la ofrenda', 'offering, altar for loved ones'],
            ['los antepasados', 'ancestors'], ['recordar', 'to remember'], ['la vela', 'candle'], ['el desfile', 'parade'],
            ['los fuegos artificiales', 'fireworks'], ['el regalo', 'gift']
          ] }
        },
        {
          id: 'u1-writing', title: 'Writing practice',
          html:
            '<p>Write a short paragraph (6–8 sentences) for each prompt. Then check it against the list.</p>' +
            '<h3>1. ¿Cómo celebra tu familia una tradición?</h3>' +
            '<p class="lead">Model</p><p>En mi familia, la tradición más importante es el Año Nuevo. Siempre nos reunimos en la casa de mis abuelos. Mi abuela es muy simpática y cocina tamales con mis tías. Mientras ellas están cocinando, mis primos y yo estamos jugando afuera. A medianoche, comemos doce uvas y pedimos doce deseos. Me gusta mucho esta tradición porque estoy con toda mi familia y todos estamos contentos.</p>' +
            '<h3>2. Describe a tu familia.</h3>' +
            '<p class="lead">Model</p><p>Mi familia es pequeña pero muy unida. Mi madre es de Colombia y mi padre es de Chicago. Mi madre es enfermera y trabaja mucho. Tengo un hermano menor; se llama Diego y es muy divertido. Ahora él está en su cuarto y está jugando videojuegos. A mis padres les gusta cocinar juntos los domingos. Mis abuelos viven en Bogotá, y los visitamos cada verano.</p>' +
            '<h3>3. Compara un cumpleaños y una quinceañera.</h3>' +
            '<p class="lead">Model</p><p>Un cumpleaños y una quinceañera son celebraciones importantes. Celebramos un cumpleaños cada año, pero la quinceañera es solo cuando una chica cumple quince años. En un cumpleaños, normalmente hay pastel, velas y a veces una piñata. En una quinceañera, la chica lleva un vestido elegante y baila un vals con su padre. Las dos fiestas son divertidas, pero la quinceañera es más formal que un cumpleaños. Me gustan las dos celebraciones.</p>' +
            '<p class="lead">Show off this grammar</p><ul class="ruled"><li>Present tense, including a stem changer or irregular yo form</li><li>Ser (description, origin, occupation) and estar (location, emotion, condition)</li><li>The present progressive: está cocinando, estamos jugando</li><li>Gustar: me gusta / me gustan / les gusta</li><li>Family and traditions vocab</li><li>Connectors: pero, porque, también, mientras, siempre</li></ul>'
        }
      ]
    },

    /* ---------- 02 ---------- */
    {
      id: 'u2', num: '02', title: 'Rutina y Hábitos Saludables', short: 'Rutina',
      sections: [
        {
          id: 'u2-reflexive', title: 'Reflexive verbs',
          body: ['A reflexive verb is something you do to yourself. The infinitive ends in -se, and you use a reflexive pronoun that matches the subject.'],
          table: { head: ['Person', 'Pronoun', 'despertarse (e→ie)', 'acostarse (o→ue)', 'vestirse (e→i)'], rows: [
            ['yo', 'me', 'me despierto', 'me acuesto', 'me visto'],
            ['tú', 'te', 'te despiertas', 'te acuestas', 'te vistes'],
            ['él / ella / Ud.', 'se', 'se despierta', 'se acuesta', 'se viste'],
            ['nosotros', 'nos', 'nos despertamos', 'nos acostamos', 'nos vestimos'],
            ['vosotros', 'os', 'os despertáis', 'os acostáis', 'os vestís'],
            ['ellos / ellas / Uds.', 'se', 'se despiertan', 'se acuestan', 'se visten']
          ] },
          list: [
            'Our reflexive verbs: despertarse (to wake up, e→ie), levantarse (to get up), acostarse (to go to bed, o→ue), dormirse (to fall asleep, o→ue), lavarse (to wash), ducharse (to shower), bañarse (to bathe), cepillarse (to brush), relajarse (to relax), entrenarse (to train), estirarse (to stretch), enfermarse (to get sick), vestirse (to get dressed, e→i).',
            'With two verbs, the pronoun goes before the conjugated verb or on the end of the infinitive: Me voy a duchar. = Voy a ducharme.',
            'Example: Me despierto a las seis, me ducho y me visto. Mi hermano se acuesta a las diez.'
          ]
        },
        {
          id: 'u2-advice', title: 'Giving advice: debo / debes + infinitive',
          list: [
            'deber (should): debo, debes, debe, debemos, debéis, deben. The next verb stays in the infinitive.',
            'Debo dormir ocho horas. (I should sleep eight hours.)',
            'Debes beber más agua. (You should drink more water.)',
            'Cada persona debe hacer ejercicio. “Cada persona” (each person) takes the él / ella form: debe.',
            'With a reflexive verb, the pronoun matches the person: Debo acostarme temprano. Debes acostarte temprano.',
            'No debes comer mucha comida chatarra.'
          ]
        },
        {
          id: 'u2-healthy', title: 'Healthy habits (from the class infographic)',
          table: { head: ['Habit', 'En español'], rows: [
            ['30 minutes of physical activity a day', 'Haz 30 minutos de actividad física al día.'],
            ['2 liters of water', 'Bebe 2 litros de agua al día.'],
            ['5 pieces of fruit and vegetables a day', 'Come 5 piezas de fruta y verdura al día.'],
            ['Avoid saturated fat', 'Evita la grasa saturada.'],
            ['5 small meals a day; breakfast is the most important', 'Come 5 comidas pequeñas al día. El desayuno es la comida más importante.'],
            ['Sleep 7 or 8 hours', 'Duerme 7 u 8 horas.']
          ] },
          list: ['Note: “o” (or) becomes “u” before a word that starts with an o sound: 7 u 8 (siete u ocho).']
        },
        {
          id: 'u2-cmd-aff', title: 'Affirmative tú commands',
          body: ['To tell a friend to do something, use the él / ella / Ud. form of the present tense.'],
          list: [
            'sacar → ¡Saca la tarea!', 'hablar → ¡Habla con tu compañero!', 'escribir → ¡Escribe tu nombre!',
            'contestar → ¡Contesta las preguntas!', 'escuchar → ¡Escucha!', 'caminar → ¡Camina por los pasillos!',
            'llevar / tomar / traer → ¡Lleva tu mochila! ¡Toma tu mochila! ¡Trae tu mochila!',
            'Stem changers keep the change: dormir → ¡Duerme 8 horas! jugar → ¡Juega béisbol conmigo! seguir → ¡Sigue una dieta balanceada! probar → ¡Prueba la sopa!',
            'More: ¡Bebe más agua! ¡Toma más agua! ¡Añade más proteína! ¡Evita alcohol y tabaco!'
          ]
        },
        {
          id: 'u2-cmd-irr', title: 'The 8 irregular affirmative commands',
          table: { head: ['Verb', 'Command', 'Example'], rows: [
            ['venir', 'ven', '¡Ven a mi casa!'],
            ['decir', 'di', '¡Di la verdad!'],
            ['salir', 'sal', '¡Sal de la cama!'],
            ['hacer', 'haz', '¡Haz tu tarea!'],
            ['tener', 'ten', '¡Ten paciencia!'],
            ['ir', 've', '¡Ve al médico!'],
            ['poner', 'pon', '¡Pon la mesa!'],
            ['ser', 'sé', '¡Sé optimista!']
          ] },
          list: ['Memory trick: “Vin Diesel has 10 weapons” → Ven, Di, Sal, Haz, Ten, Ve, Pon, Sé.']
        },
        {
          id: 'u2-cmd-pron', title: 'Pronouns with affirmative commands (AAA)',
          body: [
            'AAA: Affirmatives Always Attach. Reflexive and object pronouns go on the end of an affirmative command.',
            'Add an accent to keep the stress where it was. If the command has two or more syllables, it always needs the accent once you attach a pronoun. A one-syllable command (pon, di, haz, ve) needs one only when two pronouns are attached.'
          ],
          list: [
            '¡Despiértate! ¡Vístete! ¡Báñate! ¡Prepárate! ¡Duérmete! ¡Apúrate!',
            '¡Cepíllate los dientes! ¡Lávalas! (wash them: las manos)',
            'One syllable plus one pronoun, no accent: ¡Ponte los zapatos! ¡Dime la verdad! ¡Hazlo!',
            'One syllable plus two pronouns, accent: ¡Dímelo! (tell it to me)'
          ]
        },
        {
          id: 'u2-cmd-neg', title: 'Negative tú commands',
          list: [
            'Step 1: write No.',
            'Step 2: write the yo form of the present tense.',
            'Step 3: drop the -o.',
            'Step 4: add the opposite ending: -ar verbs take -es; -er and -ir verbs take -as.',
            'Examples: hablar → ¡No hables! leer → ¡No leas! abrir → ¡No abras! preguntar → ¡No preguntes! comer → ¡No comas! escribir → ¡No escribas!',
            'Stem changes and irregular yo forms stay: poner (pongo) → ¡No pongas! encender (enciendo) → ¡No enciendas! dormir (duermo) → ¡No duermas!',
            'Spelling changes for -car, -gar, -zar: sacar → ¡No saques! llegar → ¡No llegues! empezar → ¡No empieces!',
            'NNA: Negatives Never Attach. Pronouns go between no and the verb: ¡No te duermas! ¡No lo hagas! ¡No me mientas!',
            'Irregular negatives: ir → ¡No vayas! ser → ¡No seas! estar → ¡No estés! dar → ¡No des! saber → ¡No sepas!'
          ]
        },
        {
          id: 'u2-cmd-table', title: 'Command chart',
          table: { head: ['Verb', 'Affirmative (tú)', 'Negative (tú)'], rows: [
            ['hablar', 'habla', 'no hables'], ['comer', 'come', 'no comas'], ['escribir', 'escribe', 'no escribas'],
            ['beber', 'bebe', 'no bebas'], ['evitar', 'evita', 'no evites'], ['dormir', 'duerme', 'no duermas'],
            ['jugar', 'juega', 'no juegues'], ['seguir', 'sigue', 'no sigas'], ['probar', 'prueba', 'no pruebes'],
            ['traer', 'trae', 'no traigas'], ['sacar', 'saca', 'no saques'], ['llegar', 'llega', 'no llegues'],
            ['empezar', 'empieza', 'no empieces'], ['venir', 'ven', 'no vengas'], ['decir', 'di', 'no digas'],
            ['salir', 'sal', 'no salgas'], ['hacer', 'haz', 'no hagas'], ['tener', 'ten', 'no tengas'],
            ['ir', 've', 'no vayas'], ['poner', 'pon', 'no pongas'], ['ser', 'sé', 'no seas'],
            ['despertarse', 'despiértate', 'no te despiertes'], ['levantarse', 'levántate', 'no te levantes'],
            ['acostarse', 'acuéstate', 'no te acuestes'], ['dormirse', 'duérmete', 'no te duermas'],
            ['ducharse', 'dúchate', 'no te duches'], ['cepillarse', 'cepíllate', 'no te cepilles'],
            ['vestirse', 'vístete', 'no te vistas'], ['relajarse', 'relájate', 'no te relajes'],
            ['estirarse', 'estírate', 'no te estires'], ['ponerse', 'ponte', 'no te pongas']
          ] }
        },
        {
          id: 'u2-questions', title: 'Question words',
          table: { head: ['Word', 'Meaning', 'Example'], rows: [
            ['¿Qué?', 'What?', '¿Qué comes en el desayuno?'],
            ['¿Quién? / ¿Quiénes?', 'Who?', '¿Quién cocina en tu casa?'],
            ['¿Cuándo?', 'When?', '¿Cuándo te despiertas?'],
            ['¿Dónde?', 'Where?', '¿Dónde te entrenas?'],
            ['¿Por qué?', 'Why?', '¿Por qué estás cansado?'],
            ['¿Cómo?', 'How?', '¿Cómo te sientes?'],
            ['¿Cuánto? / ¿Cuánta? / ¿Cuántos? / ¿Cuántas?', 'How much? How many?', '¿Cuántas horas duermes?'],
            ['¿Cuál? / ¿Cuáles?', 'Which? What?', '¿Cuál es tu comida favorita?']
          ] },
          list: ['Question words always have an accent. “¿Por qué?” (why) is two words; “porque” (because) is one word with no accent.']
        },
        {
          id: 'u2-writing', title: 'Writing practice',
          html:
            '<p>Write a short paragraph (6–8 sentences) for each prompt. Then check it against the list.</p>' +
            '<h3>1. ¿Cómo es tu rutina diaria?</h3>' +
            '<p class="lead">Model</p><p>Entre semana, me despierto a las seis y me levanto a las seis y cuarto. Primero, me ducho y me cepillo los dientes. Luego me visto y desayuno cereal con fruta. Voy a la escuela a las siete. Después de las clases, me entreno con el equipo de natación. Por la noche, hago la tarea y me relajo un poco. Me acuesto a las diez y media, y me duermo rápido porque estoy cansado.</p>' +
            '<h3>2. ¿Qué consejos tienes para una vida sana?</h3>' +
            '<p class="lead">Model</p><p>Para tener una vida sana, cada persona debe hacer ejercicio treinta minutos al día. Debes beber dos litros de agua y comer cinco piezas de fruta y verdura. ¡No comas mucha comida chatarra! ¡Evita la grasa saturada! El desayuno es la comida más importante, así que ¡no lo saltes! También debes dormir siete u ocho horas. ¡Acuéstate temprano y no uses el teléfono en la cama!</p>' +
            '<h3>3. Compara tu rutina de entre semana con tu rutina del fin de semana.</h3>' +
            '<p class="lead">Model</p><p>Mi rutina de entre semana es muy diferente de mi rutina del fin de semana. Entre semana, me despierto a las seis, pero los sábados me despierto a las nueve. Entre semana no tengo tiempo para desayunar mucho; en cambio, los domingos desayuno con mi familia. Los fines de semana estoy más relajado porque no tengo clases. Sin embargo, siempre me cepillo los dientes y me acuesto antes de las once.</p>' +
            '<p class="lead">Show off this grammar</p><ul class="ruled"><li>Reflexive verbs with the right pronoun: me despierto, se acuesta</li><li>Stem changers: me acuesto, me duermo, me visto</li><li>Advice: debo / debes / cada persona debe + infinitive</li><li>Affirmative and negative tú commands, with pronouns in the right place and accents</li><li>Health vocab: la salud, la grasa, la comida chatarra, hacer ejercicio, una rutina sana</li><li>Time words: primero, luego, después, por la noche, entre semana</li></ul>'
        }
      ]
    },

    /* ---------- 03 ---------- */
    {
      id: 'u3', num: '03', title: 'RADICAL (la película)', short: 'RADICAL',
      sections: [
        {
          id: 'u3-note', title: 'Before you start',
          body: [
            'This unit gives you the words and sentence frames to talk about the film. It doesn’t tell you what happens in it.',
            'Add details from your own class notes about the film: the characters, the scenes and what you discussed in class.'
          ]
        },
        {
          id: 'u3-vocab', title: 'Talking about a movie',
          table: { head: ['Español', 'English'], rows: [
            ['la película trata de…', 'the movie is about…'], ['el personaje principal', 'the main character'],
            ['el maestro / la maestra', 'the teacher'], ['los estudiantes', 'the students'],
            ['me gustó porque…', 'I liked it because…'], ['no me gustó porque…', 'I didn’t like it because…'],
            ['la escena', 'the scene'], ['el tema', 'the theme'], ['la lección', 'the lesson'],
            ['en mi opinión', 'in my opinion'], ['creo que…', 'I think that…'], ['estoy de acuerdo', 'I agree'],
            ['por ejemplo', 'for example'], ['en la película', 'in the movie'], ['aprendí que…', 'I learned that…'],
            ['me hizo pensar en…', 'it made me think about…'], ['sin embargo', 'however'], ['en cambio', 'on the other hand'],
            ['además', 'also, besides'], ['al principio / al final', 'at the beginning / at the end']
          ] }
        },
        {
          id: 'u3-speaking', title: 'The speaking exam',
          list: [
            'It’s a conversation with a partner about RADICAL, held Dec 11–15. It is 25% of the final.',
            'Answer AND ask questions. Don’t just wait for your turn: ask “¿Y tú?” or “¿Qué piensas?”',
            'Connect the movie to your own life: “En mi escuela…”, “En mi vida…”, “Como yo…”',
            'Give examples from the movie: “Por ejemplo, en la escena donde…”',
            'Use full sentences and the grammar from this semester: ser and estar, gustar, the present progressive, debe + infinitive and commands.'
          ]
        },
        {
          id: 'u3-frames', title: 'Practice questions and answer frames',
          body: ['Fill in the blanks with your own ideas and details from your class notes.'],
          table: { head: ['Pregunta', 'Answer frame'], rows: [
            ['¿De qué trata la película?', 'La película trata de ___. El personaje principal es ___.'],
            ['¿Cómo es el personaje principal?', 'El personaje principal es ___ y ___. Al principio está ___, pero al final está ___.'],
            ['¿Qué te gustó de la película?', 'Me gustó ___ porque ___. Por ejemplo, en la escena donde ___.'],
            ['¿Qué no te gustó?', 'No me gustó ___ porque ___.'],
            ['¿Cómo se compara la escuela de la película con tu escuela?', 'En la película, la escuela ___. En mi escuela, ___. Mi escuela es más ___ que ___. Sin embargo, las dos escuelas ___.'],
            ['¿Qué aprendiste?', 'Aprendí que ___. Me hizo pensar en ___.'],
            ['¿Qué consejos darías al maestro?', 'El maestro debe ___ porque ___. También debe ___.'],
            ['¿Qué consejos darías a un estudiante?', '¡___ (affirmative command)! ¡No ___ (negative command)! Debes ___.'],
            ['¿Cuál es el tema de la película?', 'En mi opinión, el tema es ___ porque ___.'],
            ['¿Recomendarías la película?', 'Sí, la recomendaría porque ___. / No, no la recomendaría porque ___.']
          ] }
        },
        {
          id: 'u3-ask', title: 'Questions to ask your partner',
          list: [
            '¿Y tú? (And you?)', '¿Qué piensas? (What do you think?)', '¿Estás de acuerdo? (Do you agree?)',
            '¿Por qué? (Why?)', '¿Cuál fue tu escena favorita? (What was your favorite scene?)',
            '¿Cómo es tu escuela? (What is your school like?)', '¿Qué aprendiste tú? (What did you learn?)'
          ]
        },
        {
          id: 'u3-compare', title: 'Comparing',
          list: [
            'más + adjective + que (more … than): Mi escuela es más grande que la escuela de la película.',
            'menos + adjective + que (less … than): Mi clase es menos difícil que esa clase.',
            'tan + adjective + como (as … as): Los estudiantes son tan inteligentes como nosotros.',
            'Irregular: mejor que (better than), peor que (worse than).'
          ]
        },
        {
          id: 'u3-writing', title: 'Writing practice',
          html:
            '<p>Write a short paragraph (6–8 sentences) for each prompt. Add details from your own class notes about the film.</p>' +
            '<h3>1. Compara la escuela de la película con tu escuela.</h3>' +
            '<p class="lead">Model frame</p><p>En la película, la escuela ___ y los estudiantes ___. En cambio, en mi escuela tenemos ___. Mi escuela es más ___ que la escuela de la película, pero la escuela de la película es más ___. Una cosa similar es que ___. Por ejemplo, en la escena donde ___, yo pensé en mi clase de ___.</p>' +
            '<h3>2. ¿Qué aprendiste de la película?</h3>' +
            '<p class="lead">Model frame</p><p>Aprendí que ___. Al principio, los estudiantes están ___, pero al final están ___. El maestro es ___ y ___. Por ejemplo, ___. La película me hizo pensar en ___ porque en mi vida ___.</p>' +
            '<h3>3. ¿Qué consejos darías a los personajes?</h3>' +
            '<p class="lead">Model frame</p><p>El maestro debe ___ porque ___. A un estudiante le diría: “¡___! ¡No ___!” Cada persona debe ___. En mi opinión, ___.</p>' +
            '<p class="lead">Show off this grammar</p><ul class="ruled"><li>Ser for what people are like, estar for how they feel</li><li>Gustar: me gustó / me gustaron</li><li>Comparisons: más … que, menos … que, tan … como</li><li>Debe + infinitive and tú commands for advice</li><li>Connectors: por ejemplo, sin embargo, en cambio, además</li></ul>'
        },
        {
          id: 'u3-listening', title: 'Listening practice',
          html: '<p>The listening part of the final (inside the 50% listening and reading section) can’t be practiced on this site, because it has no audio. Use your teacher’s practice links instead: <a href="https://www.spanishlistening.org/" target="_blank" rel="noopener">spanishlistening.org</a>, with the speakers Florencia, Amaya and Lisbeth.</p><p>Tips: listen once for the main idea, then again for details like times, places and people. Write down key words while you listen.</p>'
        }
      ]
    }
  ];

  var flashcards = [
    // Unit 1: family and traditions (standard Spanish 2 vocab) and grammar
    { u: 1, front: 'los abuelos', back: 'grandparents' },
    { u: 1, front: 'el tío / la tía', back: 'uncle / aunt' },
    { u: 1, front: 'el primo / la prima', back: 'cousin' },
    { u: 1, front: 'el sobrino / la sobrina', back: 'nephew / niece' },
    { u: 1, front: 'el nieto / la nieta', back: 'grandson / granddaughter' },
    { u: 1, front: 'el esposo / la esposa', back: 'husband / wife' },
    { u: 1, front: 'el padrastro / la madrastra', back: 'stepfather / stepmother' },
    { u: 1, front: 'el hermanastro / la hermanastra', back: 'stepbrother / stepsister' },
    { u: 1, front: 'el medio hermano / la media hermana', back: 'half brother / half sister' },
    { u: 1, front: 'el padrino / la madrina', back: 'godfather / godmother' },
    { u: 1, front: 'el cuñado / la cuñada', back: 'brother-in-law / sister-in-law' },
    { u: 1, front: 'los parientes', back: 'relatives' },
    { u: 1, front: 'la tradición', back: 'tradition' },
    { u: 1, front: 'la costumbre', back: 'custom' },
    { u: 1, front: 'celebrar', back: 'to celebrate' },
    { u: 1, front: 'reunirse', back: 'to get together' },
    { u: 1, front: 'el cumpleaños', back: 'birthday' },
    { u: 1, front: 'la quinceañera', back: 'celebration of a girl’s 15th birthday' },
    { u: 1, front: 'la ofrenda', back: 'offering; the altar for loved ones on Día de los Muertos' },
    { u: 1, front: 'los antepasados', back: 'ancestors' },
    { u: 1, front: 'recordar', back: 'to remember' },
    { u: 1, front: 'la vela', back: 'candle' },
    { u: 1, front: 'el cempasúchil', back: 'marigold (the Día de los Muertos flower)' },
    { u: 1, front: 'el pan de muerto', back: 'bread of the dead (Día de los Muertos)' },
    { u: 1, front: 'la calavera de azúcar', back: 'sugar skull' },
    { u: 1, front: 'el desfile', back: 'parade' },
    { u: 1, front: 'los fuegos artificiales', back: 'fireworks' },
    { u: 1, front: 'el regalo', back: 'gift' },
    { u: 1, front: 'la Rosca de Reyes', back: 'ring-shaped sweet bread for Three Kings Day (January 6)' },
    { u: 1, front: 'el mole', back: 'thick Mexican sauce with chiles, spices and often chocolate' },
    { u: 1, front: 'Ser: DOCTOR', back: 'Description, Occupation, Characteristic, Time, Origin, Relationship' },
    { u: 1, front: 'Estar: PLACE', back: 'Position, Location, Action, Condition, Emotion' },
    { u: 1, front: 'Present progressive', back: 'estar + gerund: -ar → -ando, -er/-ir → -iendo (leer → leyendo)' },
    { u: 1, front: 'me gusta vs. me gustan', back: 'gusta + one thing or an action; gustan + two or more things' },
    // Unit 2: the class vocab set (74)
    { u: 2, front: 'el azúcar', back: 'sugar' },
    { u: 2, front: 'el premio', back: 'prize' },
    { u: 2, front: 'el partido', back: 'game' },
    { u: 2, front: 'la competencia', back: 'competition' },
    { u: 2, front: 'la salud', back: 'health' },
    { u: 2, front: 'la grasa', back: 'fat' },
    { u: 2, front: 'la comida saludable', back: 'healthy food' },
    { u: 2, front: 'la comida chatarra / basura', back: 'junk food' },
    { u: 2, front: 'la comida variada', back: 'varied food' },
    { u: 2, front: 'una merienda', back: 'snack' },
    { u: 2, front: 'el médico', back: 'doctor' },
    { u: 2, front: 'una vida sana', back: 'healthy life' },
    { u: 2, front: 'el consejo', back: 'advice' },
    { u: 2, front: 'el cuerpo', back: 'body' },
    { u: 2, front: 'hacer ejercicio', back: 'to exercise' },
    { u: 2, front: 'mantenerse en forma', back: 'to stay in shape' },
    { u: 2, front: 'seguir una dieta balanceada', back: 'to follow a balanced diet' },
    { u: 2, front: 'competir', back: 'to compete' },
    { u: 2, front: 'desayunar', back: 'to eat breakfast' },
    { u: 2, front: 'almorzar', back: 'to eat lunch' },
    { u: 2, front: 'cenar', back: 'to eat dinner' },
    { u: 2, front: 'subir de peso', back: 'to gain weight' },
    { u: 2, front: 'bajar de peso', back: 'to lose weight' },
    { u: 2, front: 'entrenarse', back: 'to train' },
    { u: 2, front: 'despertarse', back: 'to wake up' },
    { u: 2, front: 'levantarse', back: 'to get up' },
    { u: 2, front: 'acostarse', back: 'to go to bed' },
    { u: 2, front: 'dormirse', back: 'to fall asleep' },
    { u: 2, front: 'lavarse', back: 'to wash oneself' },
    { u: 2, front: 'sano', back: 'healthy' },
    { u: 2, front: 'saludable', back: 'healthy' },
    { u: 2, front: 'balanceada', back: 'balanced' },
    { u: 2, front: 'variada', back: 'varied' },
    { u: 2, front: 'activo', back: 'active' },
    { u: 2, front: 'el juego', back: 'game' },
    { u: 2, front: 'el ganador', back: 'winner' },
    { u: 2, front: 'el perdedor', back: 'loser' },
    { u: 2, front: 'el trofeo', back: 'trophy' },
    { u: 2, front: 'la medalla (de oro, de plata, de bronce)', back: 'medal (gold, silver, bronze)' },
    { u: 2, front: 'los carbohidratos', back: 'carbohydrates' },
    { u: 2, front: 'las calorías', back: 'calories' },
    { u: 2, front: 'la comida rápida', back: 'fast food' },
    { u: 2, front: 'la actividad (física)', back: 'physical activity' },
    { u: 2, front: 'al aire libre', back: 'outdoor' },
    { u: 2, front: 'el estrés', back: 'stress' },
    { u: 2, front: 'la depresión', back: 'depression' },
    { u: 2, front: 'el hábito', back: 'habit' },
    { u: 2, front: 'una rutina sana', back: 'healthy routine' },
    { u: 2, front: 'el riesgo de (cáncer, diabetes, depresión, obesidad)', back: 'risk of (cancer, diabetes, depression, obesity)' },
    { u: 2, front: 'estar estresado', back: 'to be stressed' },
    { u: 2, front: 'estar deprimido', back: 'to be depressed' },
    { u: 2, front: 'estirarse', back: 'to stretch' },
    { u: 2, front: 'enfermarse', back: 'to get sick' },
    { u: 2, front: 'ser competitivo', back: 'to be competitive' },
    { u: 2, front: 'ser optimista', back: 'to be optimistic' },
    { u: 2, front: 'ser pesimista', back: 'to be pessimistic' },
    { u: 2, front: 'tener un dolor de…', back: 'to have an ache in…' },
    { u: 2, front: 'afuera', back: 'outside' },
    { u: 2, front: 'adentro', back: 'inside' },
    { u: 2, front: 'la proteína', back: 'protein' },
    { u: 2, front: 'la cabeza', back: 'head' },
    { u: 2, front: 'la espalda', back: 'back' },
    { u: 2, front: 'tener sueño', back: 'to be sleepy' },
    { u: 2, front: 'tener hambre / tener sed', back: 'to be hungry / to be thirsty' },
    { u: 2, front: 'estar enfermo/a', back: 'to be sick' },
    { u: 2, front: 'bañarse', back: 'to bathe' },
    { u: 2, front: 'ducharse', back: 'to shower' },
    { u: 2, front: 'cepillarse (los dientes, el pelo)', back: 'to brush (teeth, hair)' },
    { u: 2, front: 'relajarse', back: 'to relax' },
    // vestirse is on the class's reflexive verb list, not the vocab set
    { u: 2, front: 'vestirse', back: 'to get dressed' },
    // Unit 2: question words
    { u: 2, front: '¿qué?', back: 'what?' },
    { u: 2, front: '¿quién?', back: 'who?' },
    { u: 2, front: '¿cuándo?', back: 'when?' },
    { u: 2, front: '¿dónde?', back: 'where?' },
    { u: 2, front: '¿por qué?', back: 'why?' },
    { u: 2, front: '¿cómo?', back: 'how?' },
    { u: 2, front: '¿cuánto?', back: 'how much? (cuántos: how many?)' },
    { u: 2, front: '¿cuál?', back: 'which? what?' },
    // Unit 2: command rules
    { u: 2, front: 'Affirmative tú command', back: 'Use the él / ella / Ud. form: hablar → habla' },
    { u: 2, front: 'The 8 irregular tú commands', back: 'ven, di, sal, haz, ten, ve, pon, sé' },
    { u: 2, front: 'AAA', back: 'Affirmatives Always Attach: ¡Despiértate! ¡Dímelo!' },
    { u: 2, front: 'Negative tú command steps', back: 'No + yo form, drop -o, add -es (-ar) or -as (-er/-ir)' },
    { u: 2, front: 'NNA', back: 'Negatives Never Attach: ¡No te duermas! ¡No lo hagas!' },
    { u: 2, front: 'Irregular negative tú commands', back: 'no vayas, no seas, no estés, no des, no sepas' },
    // Unit 3: talking about the movie
    { u: 3, front: 'la película trata de…', back: 'the movie is about…' },
    { u: 3, front: 'el personaje principal', back: 'the main character' },
    { u: 3, front: 'el maestro / la maestra', back: 'the teacher' },
    { u: 3, front: 'los estudiantes', back: 'the students' },
    { u: 3, front: 'me gustó porque…', back: 'I liked it because…' },
    { u: 3, front: 'no me gustó porque…', back: 'I didn’t like it because…' },
    { u: 3, front: 'la escena', back: 'the scene' },
    { u: 3, front: 'el tema', back: 'the theme' },
    { u: 3, front: 'la lección', back: 'the lesson' },
    { u: 3, front: 'en mi opinión', back: 'in my opinion' },
    { u: 3, front: 'creo que…', back: 'I think that…' },
    { u: 3, front: 'estoy de acuerdo', back: 'I agree' },
    { u: 3, front: 'no estoy de acuerdo', back: 'I disagree' },
    { u: 3, front: 'por ejemplo', back: 'for example' },
    { u: 3, front: 'en la película', back: 'in the movie' },
    { u: 3, front: 'aprendí que…', back: 'I learned that…' },
    { u: 3, front: 'me hizo pensar en…', back: 'it made me think about…' },
    { u: 3, front: 'sin embargo', back: 'however' },
    { u: 3, front: 'en cambio', back: 'on the other hand' },
    { u: 3, front: 'además', back: 'also, besides' },
    { u: 3, front: 'al principio / al final', back: 'at the beginning / at the end' },
    { u: 3, front: '¿Y tú?', back: 'And you?' },
    { u: 3, front: '¿Qué piensas?', back: 'What do you think?' },
    { u: 3, front: '¿Estás de acuerdo?', back: 'Do you agree?' },
    { u: 3, front: '¿De qué trata la película?', back: 'What is the movie about?' },
    { u: 3, front: '¿Cómo se compara…?', back: 'How does … compare?' },
    { u: 3, front: '¿Qué consejos darías al maestro?', back: 'What advice would you give the teacher?' },
    { u: 3, front: '¿Recomendarías la película?', back: 'Would you recommend the movie?' },
    { u: 3, front: 'más … que / menos … que', back: 'more … than / less … than' },
    { u: 3, front: 'tan … como', back: 'as … as' }
  ];

  var READ1 = 'Lee: “Me llamo Sofía. Mi familia es de Puebla, México. Cada año, el 6 de enero, mis abuelos preparan una Rosca de Reyes. Mis primos y yo buscamos el muñequito dentro del pan. El año pasado mi tío lo encontró, y por eso él preparó los tamales el 2 de febrero. Hoy mi abuela está cocinando mole porque mañana es la quinceañera de mi prima Ana. ¡Estoy muy emocionada!” ';
  var READ2 = 'Lee: “En mi casa celebramos el Día de los Muertos el 1 y el 2 de noviembre. Ponemos una ofrenda en la sala con fotos de mi bisabuelo, velas y flores de cempasúchil. A mi bisabuelo le gustaba mucho el pan dulce, así que siempre ponemos pan de muerto en la ofrenda. No es un día triste: recordamos a la familia con alegría.” ';
  var READ3 = 'Lee: “Hola, soy Mateo. Entre semana me despierto a las seis y media. Me ducho, me visto y desayuno avena con fruta, porque el desayuno es la comida más importante. Después de las clases, me entreno con el equipo de fútbol al aire libre por una hora. Antes comía mucha comida chatarra y siempre estaba cansado. Ahora bebo dos litros de agua al día y me acuesto a las diez. Mi consejo: ¡no te acuestes tarde y haz ejercicio todos los días!” ';
  var READ4 = 'Lee: “En mi escuela, las clases son de cincuenta minutos y tenemos muchas computadoras. Mi maestra de español es muy paciente y siempre hace preguntas. Me gusta mi escuela, pero a veces estoy estresado por los exámenes. Creo que todos los estudiantes deben tener más tiempo para relajarse.” ';

  var questions = [
    // Unit 1
    { u: 1, t: 'mc', q: READ1 + '¿De dónde es la familia de Sofía?', c: ['De Puebla, México', 'De Madrid, España', 'De Chicago', 'De Bogotá, Colombia'], a: 0, why: '“Mi familia es de Puebla, México.”' },
    { u: 1, t: 'mc', q: READ1 + '¿Qué está haciendo la abuela hoy?', c: ['Está cocinando mole.', 'Está preparando la Rosca de Reyes.', 'Está buscando el muñequito.', 'Está bailando en la quinceañera.'], a: 0, why: '“Hoy mi abuela está cocinando mole.”' },
    { u: 1, t: 'mc', q: READ1 + '¿Por qué preparó el tío los tamales el 2 de febrero?', c: ['Porque encontró el muñequito en la rosca.', 'Porque es su cumpleaños.', 'Porque es la quinceañera de Ana.', 'Porque es el Año Nuevo.'], a: 0, why: 'Whoever finds the figure in the Rosca de Reyes makes the tamales on February 2.' },
    { u: 1, t: 'mc', q: READ1 + '¿Cómo se siente Sofía?', c: ['Emocionada', 'Triste', 'Enferma', 'Aburrida'], a: 0, why: '“¡Estoy muy emocionada!”' },
    { u: 1, t: 'mc', q: READ2 + '¿Qué ponen en la ofrenda?', c: ['Fotos, velas y flores de cempasúchil', 'Regalos y un pastel', 'Doce uvas', 'Una piñata'], a: 0, why: '“Ponemos una ofrenda… con fotos de mi bisabuelo, velas y flores de cempasúchil.”' },
    { u: 1, t: 'mc', q: READ2 + '¿Por qué ponen pan de muerto en la ofrenda?', c: ['Porque al bisabuelo le gustaba el pan dulce', 'Porque es el Año Nuevo', 'Porque no tienen fruta', 'Porque es un día triste'], a: 0, why: '“A mi bisabuelo le gustaba mucho el pan dulce, así que siempre ponemos pan de muerto.”' },
    { u: 1, t: 'mc', q: READ2 + 'Según el texto, ¿cómo es el Día de los Muertos para esta familia?', c: ['Recuerdan a la familia con alegría.', 'Es un día muy triste.', 'Es un día para dar regalos.', 'Es un día para comer uvas.'], a: 0, why: '“No es un día triste: recordamos a la familia con alegría.”' },
    { u: 1, t: 'mc', q: 'Mi abuela ___ en la cocina.', c: ['está', 'es', 'son', 'estoy'], a: 0, why: 'Location uses estar (PLACE), and abuela takes the él / ella form.' },
    { u: 1, t: 'mc', q: 'Mis primos ___ de Guadalajara.', c: ['son', 'están', 'es', 'somos'], a: 0, why: 'Origin uses ser (DOCTOR), and mis primos takes the ellos form.' },
    { u: 1, t: 'mc', q: 'Hoy yo ___ muy cansado.', c: ['estoy', 'soy', 'es', 'está'], a: 0, why: 'A condition right now uses estar: estoy.' },
    { u: 1, t: 'mc', q: 'Mi tía ___ médica.', c: ['es', 'está', 'son', 'estás'], a: 0, why: 'Occupation uses ser (DOCTOR).' },
    { u: 1, t: 'mc', q: '___ las diez de la noche.', c: ['Son', 'Están', 'Es', 'Estamos'], a: 0, why: 'Time uses ser, and plural hours use son.' },
    { u: 1, t: 'mc', q: 'Why is it “Estamos decorando el altar” with estar?', c: ['It’s an action in progress (the A in PLACE).', 'It’s an origin.', 'It’s an occupation.', 'It’s a time.'], a: 0, why: 'The present progressive always uses estar + gerund.' },
    { u: 1, t: 'mc', q: 'Los niños ___ la piñata ahora.', c: ['están rompiendo', 'son rompiendo', 'están rompando', 'estamos rompiendo'], a: 0, why: 'estar (están for los niños) + romper → rompiendo (-er verbs take -iendo).' },
    { u: 1, t: 'mc', q: 'What is the gerund (-ing form) of leer?', c: ['leyendo', 'leiendo', 'leando', 'leído'], a: 0, why: 'When the stem ends in a vowel, -iendo becomes -yendo.' },
    { u: 1, t: 'mc', q: 'Mi abuelo está ___ (dormir).', c: ['durmiendo', 'dormiendo', 'duermiendo', 'dormando'], a: 0, why: 'Dormir changes o→u in the gerund: durmiendo.' },
    { u: 1, t: 'mc', q: 'A mis padres ___ las fiestas.', c: ['les gustan', 'les gusta', 'le gustan', 'nos gustan'], a: 0, why: 'Les for mis padres, and gustan because las fiestas is plural.' },
    { u: 1, t: 'mc', q: 'A mí ___ el mole.', c: ['me gusta', 'me gustan', 'mi gusta', 'yo gusto'], a: 0, why: 'Me for a mí, and gusta because el mole is one thing.' },
    { u: 1, t: 'mc', q: 'Nosotros ___ (comer) tamales en Navidad.', c: ['comemos', 'comimos', 'comen', 'comamos'], a: 0, why: 'Present tense nosotros of an -er verb: com + emos.' },
    { u: 1, t: 'mc', q: 'La hija de mi tía es mi…', c: ['prima', 'sobrina', 'nieta', 'hermana'], a: 0, why: 'Your aunt’s daughter is your cousin: la prima.' },
    { u: 1, t: 'mc', q: 'El hijo de mi hermano es mi…', c: ['sobrino', 'primo', 'nieto', 'tío'], a: 0, why: 'Your brother’s son is your nephew: el sobrino.' },
    { u: 1, t: 'mc', q: 'When do families eat the Rosca de Reyes?', c: ['January 6, Día de los Reyes', 'November 2', 'December 31 at midnight', 'On a girl’s 15th birthday'], a: 0, why: 'The Rosca de Reyes is for Three Kings Day, January 6.' },
    { u: 1, t: 'mc', q: 'Eating 12 grapes at midnight is a tradition for…', c: ['Año Nuevo', 'Día de los Muertos', 'Día de los Reyes', 'una quinceañera'], a: 0, why: 'On New Year’s Eve many people eat one grape for each stroke of midnight.' },
    { u: 1, t: 'mc', q: 'How is a quinceañera different from a regular cumpleaños?', c: ['It celebrates a girl turning 15 and is more formal.', 'It happens every year.', 'It is only for boys.', 'It celebrates loved ones who died.'], a: 0, why: 'A quinceañera marks a girl’s 15th birthday, with a formal dress and a waltz.' },
    // Unit 2
    { u: 2, t: 'mc', q: READ3 + '¿A qué hora se despierta Mateo entre semana?', c: ['A las seis y media', 'A las diez', 'A las seis menos cuarto', 'A la una'], a: 0, why: '“Entre semana me despierto a las seis y media.”' },
    { u: 2, t: 'mc', q: READ3 + '¿Por qué desayuna Mateo?', c: ['Porque el desayuno es la comida más importante', 'Porque tiene un partido', 'Porque está enfermo', 'Porque no le gusta almorzar'], a: 0, why: '“…porque el desayuno es la comida más importante.”' },
    { u: 2, t: 'mc', q: READ3 + '¿Dónde se entrena Mateo?', c: ['Al aire libre', 'Adentro, en el gimnasio', 'En su casa', 'En la piscina'], a: 0, why: '“…me entreno con el equipo de fútbol al aire libre.”' },
    { u: 2, t: 'mc', q: READ3 + '¿Qué cambió en la vida de Mateo?', c: ['Antes comía comida chatarra; ahora bebe agua y se acuesta a las diez.', 'Antes jugaba fútbol; ahora no hace ejercicio.', 'Antes se despertaba temprano; ahora se despierta tarde.', 'Antes bebía agua; ahora bebe refrescos.'], a: 0, why: 'He used to eat junk food and was always tired; now he drinks 2 liters of water and goes to bed at ten.' },
    { u: 2, t: 'mc', q: READ3 + '¿Cuál es el consejo de Mateo?', c: ['No acostarse tarde y hacer ejercicio todos los días', 'Comer más comida rápida', 'Dormir en clase', 'No desayunar'], a: 0, why: '“¡No te acuestes tarde y haz ejercicio todos los días!”' },
    { u: 2, t: 'mc', q: 'Tell a friend: “Write your name!”', c: ['¡Escribe tu nombre!', '¡Escribes tu nombre!', '¡Escriba tu nombre!', '¡Escribas tu nombre!'], a: 0, why: 'An affirmative tú command uses the él / ella form: escribe.' },
    { u: 2, t: 'mc', q: 'Tell a friend: “Do your homework!”', c: ['¡Haz tu tarea!', '¡Hace tu tarea!', '¡Haces tu tarea!', '¡Hago tu tarea!'], a: 0, why: 'Hacer is one of the 8 irregulars: haz.' },
    { u: 2, t: 'mc', q: 'What is the affirmative tú command of salir?', c: ['sal', 'sale', 'salga', 'salgas'], a: 0, why: 'Salir is irregular: sal (Vin Diesel: Ven Di Sal Haz Ten Ve Pon Sé).' },
    { u: 2, t: 'mc', q: 'What is the affirmative tú command of ir?', c: ['ve', 'va', 'ir', 'vayas'], a: 0, why: 'Ir is irregular: ve.' },
    { u: 2, t: 'mc', q: 'Tell a friend: “Come to my house!”', c: ['¡Ven a mi casa!', '¡Viene a mi casa!', '¡Vienes a mi casa!', '¡Vengas a mi casa!'], a: 0, why: 'Venir is irregular: ven.' },
    { u: 2, t: 'mc', q: 'Tell a friend: “Don’t talk!”', c: ['¡No hables!', '¡No habla!', '¡No hablas!', '¡No hable!'], a: 0, why: 'No + yo form (hablo) – o + es (opposite ending for -ar).' },
    { u: 2, t: 'mc', q: 'Tell a friend: “Don’t eat junk food!”', c: ['¡No comas comida chatarra!', '¡No comes comida chatarra!', '¡No come comida chatarra!', '¡No comeas comida chatarra!'], a: 0, why: 'No + com(o) + as (opposite ending for -er).' },
    { u: 2, t: 'mc', q: 'What is the negative tú command of sacar?', c: ['no saques', 'no sacas', 'no saca', 'no sacques'], a: 0, why: '-car verbs change c to qu before e: no saques.' },
    { u: 2, t: 'mc', q: 'What is the negative tú command of llegar?', c: ['no llegues', 'no llegas', 'no llega', 'no llegés'], a: 0, why: '-gar verbs change g to gu before e: no llegues.' },
    { u: 2, t: 'mc', q: 'What is the negative tú command of empezar?', c: ['no empieces', 'no empiezes', 'no empezas', 'no empiezas'], a: 0, why: 'Keep the e→ie stem change and change z to c before e: no empieces.' },
    { u: 2, t: 'mc', q: 'What is the negative tú command of poner?', c: ['no pongas', 'no pones', 'no pon', 'no ponas'], a: 0, why: 'Start from the yo form pongo: no pong + as.' },
    { u: 2, t: 'mc', q: 'What is the negative tú command of dormir?', c: ['no duermas', 'no dormas', 'no duermes', 'no durmas'], a: 0, why: 'Start from the yo form duermo: no duerm + as.' },
    { u: 2, t: 'mc', q: 'What is the negative tú command of ir?', c: ['no vayas', 'no vas', 'no ve', 'no ires'], a: 0, why: 'Ir is irregular in the negative: no vayas.' },
    { u: 2, t: 'mc', q: 'Tell a friend: “Don’t be pessimistic!”', c: ['¡No seas pesimista!', '¡No eres pesimista!', '¡No sé pesimista!', '¡No estés pesimista!'], a: 0, why: 'Ser is irregular in the negative: no seas.' },
    { u: 2, t: 'mc', q: 'Tell a friend: “Wake up!”', c: ['¡Despiértate!', '¡Despiertate!', '¡Te despierta!', '¡Despiértete!'], a: 0, why: 'AAA: attach te, and add an accent to keep the stress on “pier”.' },
    { u: 2, t: 'mc', q: 'Tell a friend: “Don’t fall asleep!”', c: ['¡No te duermas!', '¡No duérmete!', '¡No te duermes!', '¡No te dormas!'], a: 0, why: 'NNA: the pronoun goes before the verb, and dormir keeps its stem change: no te duermas.' },
    { u: 2, t: 'mc', q: 'Tell a friend: “Tell it to me!”', c: ['¡Dímelo!', '¡Dimelo!', '¡Di me lo!', '¡Me lo di!'], a: 0, why: 'Two pronouns attach to di, and the accent keeps the stress on di: dímelo.' },
    { u: 2, t: 'mc', q: 'Tell a friend: “Put on your shoes!”', c: ['¡Ponte los zapatos!', '¡Pónte los zapatos!', '¡Te pon los zapatos!', '¡Pongas los zapatos!'], a: 0, why: 'Pon + te. A one-syllable command with one pronoun needs no accent.' },
    { u: 2, t: 'mc', q: 'Tell a friend: “Don’t do it!”', c: ['¡No lo hagas!', '¡No hazlo!', '¡No lo haces!', '¡No lo haz!'], a: 0, why: 'NNA: the pronoun goes before the verb, and hacer uses its yo form hago: no lo hagas.' },
    { u: 2, t: 'mc', q: 'Tell a friend: “Get dressed!”', c: ['¡Vístete!', '¡Vistete!', '¡Te viste!', '¡Vístate!'], a: 0, why: 'Vestirse: viste + te, with an accent to keep the stress: vístete.' },
    { u: 2, t: 'mc', q: 'Yo ___ (despertarse) a las seis.', c: ['me despierto', 'me desperto', 'te despiertas', 'se despierta'], a: 0, why: 'Despertarse is e→ie, and yo takes me: me despierto.' },
    { u: 2, t: 'mc', q: 'Mi hermano ___ (acostarse) a las diez.', c: ['se acuesta', 'se acosta', 'me acuesto', 'se acuestan'], a: 0, why: 'Acostarse is o→ue, and él takes se: se acuesta.' },
    { u: 2, t: 'mc', q: 'Nosotros ___ (vestirse) rápido.', c: ['nos vestimos', 'nos vistimos', 'se visten', 'nos vestamos'], a: 0, why: 'No stem change in nosotros: nos vestimos.' },
    { u: 2, t: 'mc', q: 'Cada persona ___ beber 2 litros de agua al día.', c: ['debe', 'debes', 'deben', 'debo'], a: 0, why: '“Cada persona” takes the él / ella form: debe.' },
    { u: 2, t: 'mc', q: 'Your friend is always tired. Which is the best advice?', c: ['Debes dormir siete u ocho horas.', 'Debes acostarte a las tres de la mañana.', 'Debes comer más comida chatarra.', 'Debes tomar menos agua.'], a: 0, why: 'The class infographic says to sleep 7 or 8 hours.' },
    { u: 2, t: 'mc', q: 'According to the class infographic, how much water should you drink a day?', c: ['2 litros', '5 litros', '1 vaso', '8 litros'], a: 0, why: 'The infographic says 2 liters of water.' },
    { u: 2, t: 'mc', q: 'According to the class infographic, which meal is the most important?', c: ['El desayuno', 'El almuerzo', 'La cena', 'La merienda'], a: 0, why: 'It says to eat 5 small meals a day, with breakfast the most important.' },
    { u: 2, t: 'mc', q: 'What does “subir de peso” mean?', c: ['to gain weight', 'to lose weight', 'to stay in shape', 'to go upstairs'], a: 0, why: 'Subir de peso = to gain weight; bajar de peso = to lose weight.' },
    { u: 2, t: 'mc', q: 'What does “estirarse” mean?', c: ['to stretch', 'to train', 'to get sick', 'to relax'], a: 0, why: 'Estirarse = to stretch.' },
    { u: 2, t: 'mc', q: 'What does “tener sueño” mean?', c: ['to be sleepy', 'to have a dream', 'to be hungry', 'to be sick'], a: 0, why: 'Tener sueño = to be sleepy.' },
    { u: 2, t: 'mc', q: '¿___ te entrenas? — En el gimnasio.', c: ['Dónde', 'Cuándo', 'Quién', 'Cuánto'], a: 0, why: 'The answer is a place, so the question is ¿Dónde? (where).' },
    { u: 2, t: 'mc', q: '¿___ estás cansado? — Porque no dormí bien.', c: ['Por qué', 'Porque', 'Qué', 'Cómo'], a: 0, why: '¿Por qué? (two words, accent) asks why; porque means because.' },
    // Unit 3
    { u: 3, t: 'mc', q: 'What does “La película trata de…” mean?', c: ['The movie is about…', 'The movie tries to…', 'I liked the movie…', 'The movie is long…'], a: 0, why: 'Tratar de… here means to be about.' },
    { u: 3, t: 'mc', q: 'What does “el personaje principal” mean?', c: ['the main character', 'the principal of the school', 'the first scene', 'the main lesson'], a: 0, why: 'Personaje = character; principal = main.' },
    { u: 3, t: 'mc', q: 'What does “sin embargo” mean?', c: ['however', 'for example', 'also', 'because'], a: 0, why: 'Sin embargo = however.' },
    { u: 3, t: 'mc', q: 'What does “en cambio” mean?', c: ['on the other hand', 'at the end', 'in my opinion', 'for example'], a: 0, why: 'En cambio = on the other hand.' },
    { u: 3, t: 'mc', q: 'What does “¿Qué consejos darías al maestro?” mean?', c: ['What advice would you give the teacher?', 'What did the teacher say?', 'Who is the teacher?', 'Do you like the teacher?'], a: 0, why: 'Consejos = advice; darías = you would give.' },
    { u: 3, t: 'mc', q: 'In the speaking exam, which is the best follow-up question to ask your partner?', c: ['¿Y tú, qué piensas?', 'Me gustó la película.', 'La película trata de una escuela.', 'Estoy de acuerdo.'], a: 0, why: 'You must ask questions too, and only this one is a question.' },
    { u: 3, t: 'mc', q: 'Which answer connects the movie to your own life?', c: ['En mi escuela también tenemos maestros que nos ayudan mucho.', 'La película es de dos horas.', 'El maestro se llama así.', 'Vi la película en clase.'], a: 0, why: 'It compares the movie to your own school.' },
    { u: 3, t: 'mc', q: 'Which three things does the speaking exam ask you to do?', c: ['Answer and ask questions, connect to your own life, give examples from the movie', 'Read a summary, take notes, write a paragraph', 'Draw a scene, act it out, record a video', 'Answer 20 multiple choice questions'], a: 0, why: 'That’s what the speaking part of the final asks for.' },
    { u: 3, t: 'mc', q: 'Al principio, los estudiantes ___ nerviosos.', c: ['están', 'son', 'es', 'estamos'], a: 0, why: 'A feeling (emotion) uses estar, and los estudiantes takes están.' },
    { u: 3, t: 'mc', q: 'El maestro ___ muy paciente.', c: ['es', 'está', 'son', 'estoy'], a: 0, why: 'A characteristic uses ser (DOCTOR).' },
    { u: 3, t: 'mc', q: 'Me ___ las escenas en la clase.', c: ['gustaron', 'gustó', 'gusta', 'gusté'], a: 0, why: 'Las escenas is plural, so gustar is plural: me gustaron.' },
    { u: 3, t: 'mc', q: 'Mi escuela es ___ grande ___ la escuela de la película.', c: ['más … que', 'más … de', 'tan … que', 'mucho … como'], a: 0, why: 'More … than is más + adjective + que.' },
    { u: 3, t: 'mc', q: 'Los estudiantes son ___ inteligentes ___ nosotros. (as … as)', c: ['tan … como', 'tan … que', 'más … como', 'tanto … que'], a: 0, why: 'As … as is tan + adjective + como.' },
    { u: 3, t: 'mc', q: 'Which sentence gives the teacher advice correctly?', c: ['El maestro debe escuchar a los estudiantes.', 'El maestro debe escucha a los estudiantes.', 'El maestro debe escuchando a los estudiantes.', 'El maestro deber escucha a los estudiantes.'], a: 0, why: 'Debe + infinitive: debe escuchar.' },
    { u: 3, t: 'mc', q: 'Which is the best answer to “¿Qué aprendiste?”', c: ['Aprendí que ___ porque ___.', 'Me llamo ___.', 'Son las ___.', 'Estoy en ___.'], a: 0, why: 'Answer with “Aprendí que…” and give a reason.' },
    { u: 3, t: 'mc', q: READ4 + '¿Cómo es la maestra de español?', c: ['Muy paciente', 'Muy estricta', 'Muy aburrida', 'Muy nerviosa'], a: 0, why: '“Mi maestra de español es muy paciente.”' },
    { u: 3, t: 'mc', q: READ4 + '¿Por qué está estresado a veces el estudiante?', c: ['Por los exámenes', 'Por las computadoras', 'Por su maestra', 'Por el almuerzo'], a: 0, why: '“…a veces estoy estresado por los exámenes.”' },
    { u: 3, t: 'mc', q: READ4 + '¿Qué cree el estudiante?', c: ['Que los estudiantes deben tener más tiempo para relajarse', 'Que las clases deben ser más largas', 'Que no necesitan computadoras', 'Que no deben hacer preguntas'], a: 0, why: '“Creo que todos los estudiantes deben tener más tiempo para relajarse.”' },
    { u: 3, t: 'mc', q: 'Which phrase introduces an example from the movie?', c: ['Por ejemplo, en la escena donde…', 'Sin embargo…', 'Estoy de acuerdo.', 'Al final…'], a: 0, why: 'Por ejemplo = for example.' }
  ];

  FINALS.addClass('spanish-2', {
    // Shown on this class's Home.
    examFacts: [
      'Final: Thursday, Dec 17, period 3. Worth 20% of the semester grade. Performance based.',
      'Speaking (25%): a partner conversation about the film RADICAL, held Dec 11–15. Answer and ask questions, connect to your own life, and give examples from the movie.',
      'Listening and reading (50%): 20 multiple choice questions with listening and reading samples, on exam day.',
      'Writing (25%): well-developed short paragraphs on the semester themes. Use rich vocab and the new grammar.',
      'No phones.',
      'Make-up work and retakes are due Dec 11 at 2:30 pm.'
    ],
    units: units,
    flashcards: flashcards,
    questions: questions
  });
})();
