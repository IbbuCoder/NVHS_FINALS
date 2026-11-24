// English I CP: Semester 1 final (Fri Dec 18, period 4). Ms. Reppy.
// Same format as human-geography.js: units with sections, flashcards, questions and examFacts.
// Built from the class notebook: course policies, writing skills, literary terms, The Marrow
// Thieves, Fahrenheit 451, the short stories and the vocab lists.
(function () {
  var units = [
    /* ---------- 01 ---------- */
    {
      id: 'u1', num: '01', title: 'Writing Skills and MLA', short: 'Writing',
      sections: [
        {
          id: 'u1-pov', title: 'Point of view',
          table: { head: ['Person', 'Pronouns', 'Used for'], rows: [
            ['1st person', 'I, me, my, mine, we, our, us', 'Journals, reflections, memoirs'],
            ['2nd person', 'you, your, yours', 'How-to guides, advice'],
            ['3rd person', 'he, she, it, they, them', 'Academic writing (required)']
          ] },
          simple: 'In a formal essay, do not use “I” or “you.”'
        },
        {
          id: 'u1-mla', title: 'MLA formatting',
          list: [
            '1-inch margins, 12 pt font, double-spaced.',
            'In-text citation: (Author Page#), like (Bradbury 14). The period goes OUTSIDE the closing parenthesis.',
            'Italicize titles of novels and plays.',
            'Use “quotation marks” for titles of short stories, poems and articles.'
          ]
        },
        {
          id: 'u1-intro', title: 'Introduction paragraph (3 parts)',
          list: [
            'Hook / attention getter: a universal statement, scenario, quote or fact. NO rhetorical questions.',
            'Bridge / summary: connects the hook to the text, names the author and title, and gives a 1–2 sentence summary.',
            'Thesis statement: the last sentence. It must include the author, the title, a thematic claim, and the reasoning or prongs.'
          ]
        },
        {
          id: 'u1-body', title: 'Body paragraph (5 parts)',
          list: [
            'Topic sentence: a mini-thesis that previews the evidence.',
            'Context: 1–2 sentences of background before the quote.',
            'Integrated direct quote: the author’s exact words with an MLA citation.',
            'Analysis: 2–3 sentences explaining how and why the quote proves the claim.',
            'Concluding sentence: closes the paragraph and restates the argument.'
          ]
        },
        {
          id: 'u1-quotes', title: 'Four ways to integrate a quote',
          table: { head: ['Method', 'How it works'], rows: [
            ['Colon', 'Independent clause : “quote”'],
            ['Introductory phrase', 'Explanatory phrase, “quote”'],
            ['Flow quote', 'Woven into your sentence with no separating punctuation. Use brackets [ ] to change a word.'],
            ['Bits and pieces', 'Short snippets built into your own sentence']
          ] },
          list: ['Use ellipses (...) to shorten a long quote. Never drop in a standalone quote.']
        }
      ]
    },
    /* ---------- 02 ---------- */
    {
      id: 'u2', num: '02', title: 'Literary Terms and Course Policies', short: 'Terms',
      sections: [
        {
          id: 'u2-terms', title: 'Literary devices and concepts',
          table: { head: ['Term', 'Meaning'], rows: [
            ['Plot', 'The sequence of events'],
            ['Subject / concept', 'A 1–2 word topic (isolation, power, family, sacrifice)'],
            ['Theme / thematic claim', 'A universal, arguable statement about a subject. 3rd person, complete sentence, no plot details.'],
            ['Message', 'A specific, concrete example of the theme in action'],
            ['Archetype', 'A universal character model (mother, loner, hero)'],
            ['Tone', 'The storyteller’s attitude toward the subject'],
            ['Symbol', 'A physical object with deeper meaning'],
            ['Imagery', 'Language that appeals to the five senses'],
            ['Motif', 'A recurring element that forms a pattern'],
            ['Peritext', 'Text around the main body of a book (cover, foreword, afterword, author bio)'],
            ['Social criticism', 'Literature that analyzes issues in society'],
            ['Dystopia', 'An imagined future society with an oppressive government, lost freedoms, environmental destruction or technology domination']
          ] },
          body: ['To write a thematic claim: start with “The author believes that [subject]...” then remove “The author believes that.”']
        },
        {
          id: 'u2-policy', title: 'Course policies',
          list: [
            'Taught by Ms. Sydney Reppy at Neuqua Valley High School.',
            'Grades: 100–90 A, 89–80 B, 79–70 C, 69–60 D, 59 and below F. No rounding.',
            'Categories: Assessment, Speaking & Listening, Participation, Writing, Final Exam.',
            'Gradebook codes: Z = missing (zero until made up); M = missing (no grade impact); 0 = zero (cannot be made up); X = excused.',
            'Generative AI is not acceptable unless the teacher directs it. Plagiarism is 9+ consecutive words without a citation. Google Doc history must show natural drafting.',
            'AI/plagiarism 1st offense: 0% and parent, counselor and dean notified. 2nd offense: 0%, semester failure, course withdrawal.',
            'Cell phones silenced and stored. 1st offense: warning. Repeated: Dean referral.',
            'Extra credit: Abe Lincoln Book Award Program (0.5% per book, max 2 books = 1% a year).',
            'S.T.E.A.L. = Speech, Thoughts, Effect on others, Actions, Looks.'
          ]
        }
      ]
    },
    /* ---------- 03 ---------- */
    {
      id: 'u3', num: '03', title: 'The Marrow Thieves', short: 'Marrow Thieves',
      sections: [
        {
          id: 'u3-context', title: 'Historical context',
          list: [
            'Author: Cherie Dimaline (2017).',
            'There are 500+ recognized Native nations in the US. “Indigenous” is the broadest term. In Canada: First Nations / First Peoples.',
            'Settler-colonialism: displacing and replacing the original inhabitants.',
            'Blood quantum: government-imposed tracking meant to dilute tribal membership.',
            'Residential schools: mandatory boarding schools (1860s–1996) meant to forcibly assimilate Indigenous children (“kill the Indian, save the man”).'
          ]
        },
        {
          id: 'u3-setting', title: 'Setting and plot',
          body: ['A dystopian future Canada after the “Water Wars.” Non-Indigenous people have lost the ability to dream, which drives them mad. They hunt Indigenous people to harvest bone marrow, which holds dreams. Government “Recruiters” capture people for new residential schools.']
        },
        {
          id: 'u3-chars', title: 'Characters',
          table: { head: ['Character', 'Key facts'], rows: [
            ['Frenchie (Francis)', '16-year-old Métis narrator. Lost his brother Mitch to Recruiters.'],
            ['Mitch', 'Frenchie’s older brother. Sacrificed himself so Frenchie could escape.'],
            ['Miigwans (Miig)', 'Group leader and Elder. Wears a pouch with a vial of his husband Isaac’s marrow.'],
            ['Isaac', 'Miig’s husband, a Cree poet who dreamt in Cree. Harvested in a school. Reunited with Miig at the end.'],
            ['Minerva', 'Anishinaabe Elder. Destroyed School #47E when her marrow sang in Anishinaabemowin. Killed during a rescue.'],
            ['Rose', '16 years old, raised by Granny and great-uncles. Frenchie’s romantic interest.'],
            ['Chi-Boy', '17-year-old Cree scout and bow hunter. In love with Wab.'],
            ['Wab', '18 years old, with a keloid scar on her face.'],
            ['RiRi', '7-year-old Métis girl. Killed when the traitor Lincoln pushes her off a cliff.'],
            ['Tree and Zheegwon', '12-year-old twins, scarred from experiments. Share a baseball cap.'],
            ['Slopper', '9 years old. Later heads the “Miigwanang” youth council.'],
            ['Jean', 'Frenchie’s father. Lost a leg. Reunited with Frenchie at the Council camp near Espanola.'],
            ['Travis and Lincoln', 'Traitors. Lincoln kills RiRi. Frenchie kills Travis.']
          ] }
        },
        {
          id: 'u3-symbols', title: 'Symbols and motifs',
          table: { head: ['Symbol', 'Meaning'], rows: [
            ['Bone marrow / dreams', 'Cultural identity, soul and continuity'],
            ['Pink boots (RiRi’s)', 'Lost innocence and tragedy'],
            ['Jingles (tin can lids)', 'Made for a jingle dress: cultural preservation and sacrifice'],
            ['Moose', 'Nature’s majesty, respect and maturity'],
            ['Syllabics / language', 'A cultural key that dismantles oppression (Kiiwen = “Go home”)']
          ] }
        },
        {
          id: 'u3-vocab', title: 'Vocabulary (20)',
          list: ['Ally, Assimilation, Bystander, Colonization, Cultural Appropriation, Discrimination, Disenfranchise, Displacement, Empathy, Equality, Equity, Implicit Bias, Indigenous, Intersectionality, Oppression, Prejudice, Privilege, Racism, Reconciliation, Tolerance']
        }
      ]
    },
    /* ---------- 04 ---------- */
    {
      id: 'u4', num: '04', title: 'Fahrenheit 451', short: 'Fahrenheit 451',
      sections: [
        {
          id: 'u4-context', title: 'Context and structure',
          list: [
            'Written by Ray Bradbury in 1952, after World War II.',
            'Inspired by police harassing Bradbury on a walk (see “The Pedestrian”). Influences: Nazi book burnings, the Holocaust, McCarthyism and post-war consumerism.',
            'Part 1: The Hearth and the Salamander. The hearth is knowledge burning in the mind. The salamander is the inability to destroy free thought.',
            'Part 2: The Sieve and the Sand. The sand is knowledge and truth. The sieve is Montag’s mind trying to hold the truth.'
          ]
        },
        {
          id: 'u4-chars', title: 'Characters',
          table: { head: ['Character', 'Key facts'], rows: [
            ['Guy Montag', 'A fireman who burns books. Uses “The Great Python” hose.'],
            ['Clarisse McClellan', '17-year-old neighbor whose questions awaken Montag (“Are you happy?”).'],
            ['Mildred Montag', 'Montag’s shallow wife. Addicted to parlor walls and ear thimbles. Overdoses on sleeping pills.'],
            ['Captain Beatty', 'Fire Captain. Uses his knowledge of literature to justify burning. The antagonist.'],
            ['Faber', 'A retired English professor. Montag’s intellectual mentor.']
          ] }
        },
        {
          id: 'u4-symbols', title: 'Symbols',
          table: { head: ['Symbol', 'Meaning'], rows: [
            ['Denham’s Dentifrice', 'A blaring commercial that keeps Montag from memorizing the Bible'],
            ['Mechanical Hound', 'The government’s hound with a lethal-injection needle for a proboscis'],
            ['Phoenix', 'Society’s rebirth after it destroys itself']
          ] }
        },
        {
          id: 'u4-vocab', title: 'Vocabulary (20)',
          list: ['Refract, Imperceptibly, Pulverized, Capillary, Multifaceted, Proclivity, Odious, Ravenous, Noncombustible, Tactile, Retaliation, Receptacle, Juggernaut, Pyre, Dictum, Desolation, Incite, Burdensome, Proboscis, Phoenix']
        }
      ]
    },
    /* ---------- 05 ---------- */
    {
      id: 'u5', num: '05', title: 'Short Stories, Films and Oral Tradition', short: 'Stories',
      sections: [
        {
          id: 'u5-stories', title: 'Short stories and films',
          table: { head: ['Title', 'What to know'], rows: [
            ['“Harrison Bergeron” (Vonnegut)', 'The government handicaps citizens for absolute equality. Harrison rebels.'],
            ['“All Summer in a Day” (Bradbury)', 'Margot is locked in a closet on Venus. The sun appears once every 7 years. Community responsibility.'],
            ['“The Pedestrian” (Bradbury)', 'Leonard Mead is arrested by a robotic police car for walking.'],
            ['“Create” (Derek Sivers)', 'Creators vs. consumers.'],
            ['“Bao” (Pixar short)', 'An overprotective Chinese mother; a dumpling comes to life. Maternal attachment, growing up and culture.'],
            ['“More” (short film)', 'Consumerism, memory and artificial happiness.'],
            ['The Lorax (Dr. Seuss)', 'The Once-ler cuts down the Truffula trees. Environmental destruction.']
          ] }
        },
        {
          id: 'u5-oral', title: 'Oral tradition texts',
          table: { head: ['Title', 'What to know'], rows: [
            ['Fry Bread (Kevin Noble Maillard)', 'Celebrates fry bread as food, art, place and unity.'],
            ['We Are Grateful: Otsaliheliga (Traci Sorell)', 'Cherokee gratitude across the seasons. Trail of Tears, Cherokee New Year, Sequoyah’s syllabary.'],
            ['We Are Water Protectors (Carole Lindstrom)', 'An Ojibwe prophecy of a “black snake” (oil pipelines). Environmental stewardship.']
          ] }
        },
        {
          id: 'u5-choice', title: 'Choice novel project and WOW vocab',
          body: ['IRU Choice Novel Brochure: a 6-panel folded brochure and a 2-minute presentation. Panels: Cover, Inside Flap (genre, year, pages, summary, conflict), Back (rating, target audience), Author Bio, Reviewer Bio, Characters, Themes & Quotes.'],
          list: ['Word of the Week (17): Acquiesce, Ambiance, Aggrandizement, Ameliorate, Atrophy, Cacophony, Carping, Catharsis, Docile, Denunciation, Diatribe, Dogmatic, Effervescent, Engender, Equanimity, Garrulous, Hedonist']
        }
      ]
    },
    /* ---------- 06 ---------- */
    {
      id: 'u6', num: '06', title: 'Final Exam Checklist', short: 'Checklist',
      sections: [
        {
          id: 'u6-check', title: 'Be able to…',
          list: [
            'Explain the 3 parts of an intro paragraph (hook with no questions, bridge, thesis).',
            'Explain the 3 parts of a thesis (author and title, thematic claim, prongs or reasoning).',
            'Explain the 5 parts of a body paragraph.',
            'Identify the 4 quote-integration methods: colon, introductory phrase, flow, bits and pieces.',
            'Format MLA in-text citations and know titles in italics vs. quotation marks.',
            'Use 3rd person pronouns in formal writing.',
            'Know all three vocab lists: Marrow Thieves (20), Fahrenheit 451 (20) and Word of the Week (17).'
          ]
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
