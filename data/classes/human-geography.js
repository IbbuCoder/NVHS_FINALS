// Human Geography (the plain class, not AP): Semester 1 final.
// Same format as data/classes/_template.js and honors-geometry.js: units with sections,
// flashcards, questions and examFacts for Home.
// Built from the teacher's two unit study guides (Unit 1 Intro to Geography, Unit 2 Cultural
// Geography). The exam format was not posted, so Home says so instead of guessing.
// The religions table uses only the facts in the class matrix, on purpose.
// The Colonialism Activity is left out because its content isn't known.
(function () {
  var units = [
    /* ---------- 01 ---------- */
    {
      id: 'u1', num: '01', title: 'Intro to Geography', short: 'Intro',
      sections: [
        {
          id: 'u1-what', title: 'What is human geography?',
          body: [
            'Human geography studies where people and their activities are, why they are there, and how people and places affect each other. It looks at things like population, culture, cities, jobs and religion.',
            'History asks when and how things changed over time. Geography asks where and why there. A historian might study when a city was founded. A geographer asks why the city grew in that spot and how it connects to other places.',
            'Why it matters: knowing about people and places helps you understand the news, other cultures, and why the world looks the way it does. It also helps you make better choices about where to live, work and travel.'
          ],
          list: [
            'How location shapes who you are: the place you grow up affects the language you speak, the food you eat, the weather you dress for, the jobs around you and the people you meet.'
          ],
          simple: 'Human geography is about people and places: where people live and why. History is about when things happened.'
        },
        {
          id: 'u1-location', title: 'Place and location',
          table: { head: ['Term', 'What it means', 'Example'], rows: [
            ['Absolute location', 'The exact spot on Earth, given by latitude and longitude (or an exact address)', '41.9° N, 87.6° W'],
            ['Relative location', 'Where a place is compared to other places', '“Next to the lake, two blocks from the train station”'],
            ['Place', 'The human and physical features that make a location different from others', 'A city’s buildings, language, food, weather and landforms'],
            ['Sense of place', 'The feelings and meaning people attach to a place', 'Your grandma’s house feels like home']
          ] },
          list: [
            'Latitude lines run east and west (parallels). They measure how far north or south of the Equator a place is, from 0° to 90°.',
            'Longitude lines run north and south (meridians). They measure how far east or west of the Prime Meridian a place is, from 0° to 180°.',
            'Absolute location is written latitude first, then longitude, for example 41.9° N, 87.6° W.',
            'The seven continents: Africa, Antarctica, Asia, Australia, Europe, North America and South America.',
            'Time zones: Earth turns 360° in 24 hours, which is 15° each hour. So the world is split into about 24 time zones, each about 15° of longitude wide. Places in one time zone use the same clock time.'
          ]
        },
        {
          id: 'u1-maps', title: 'What is a map and how do you read it?',
          body: ['A map is a flat drawing of all or part of Earth. Before you read one, check its title, key and scale.'],
          table: { head: ['Part or type', 'What it is'], rows: [
            ['Map key (legend)', 'Explains what the symbols and colors on the map mean'],
            ['Map scale', 'Shows how distance on the map compares to real distance on Earth (for example, 1 inch = 10 miles)'],
            ['Reference map', 'Shows where things are: borders, cities, roads, rivers and mountains. Examples: a road map, a political map'],
            ['Thematic map', 'Shows data about one topic or theme. Examples: a population density map, an election results map, a climate map'],
            ['Region', 'An area that shares one or more features, like the Midwest or the Sahara']
          ] },
          list: [
            'Pattern: how things are arranged in space, for example in a line along a river, or clustered in cities.',
            'Density: how many of something there are in an area, for example people per square mile.',
            'Concentration: how spread out things are. Clustered means close together; dispersed means spread out.',
            'Types of regions you may see: formal (one shared trait, like a country or a language area), functional (organized around a center, like a pizza delivery area), and perceptual (based on what people think, like “the South”). Go by your class notes on these.'
          ]
        },
        {
          id: 'u1-problems', title: 'Problems with maps',
          list: [
            'Mental map: the map of a place you carry in your head, built from your own experience. Two people’s mental maps of the same town can look very different.',
            'Map projection: a way of showing the round Earth on a flat map.',
            'Distortion: when the round Earth is flattened, shape, size (area), distance or direction gets stretched or squeezed. Every flat map distorts something.',
            'Example: the Mercator projection keeps directions useful for sailing, but it makes land near the poles look much bigger than it is. Greenland looks about as big as Africa, but Africa is many times bigger.',
            'Pick the projection that fits the job: one that keeps area for comparing sizes, one that keeps direction for navigation.'
          ]
        },
        {
          id: 'u1-tools', title: 'Modern tools',
          table: { head: ['Tool', 'What it does', 'Example'], rows: [
            ['Remote sensing', 'Gathers information about Earth from a distance, usually from satellites or aircraft', 'Satellite images that show a forest shrinking'],
            ['GPS (Global Positioning System)', 'Uses satellites to find an exact location', 'Your phone’s map showing where you are'],
            ['Geotagging', 'Adds location data to a photo, video or post', 'A photo that saves where it was taken']
          ] }
        },
        {
          id: 'u1-data', title: 'Data and visuals: observation, inference and CER',
          list: [
            'Observation: what you can directly see in a map, chart or photo. “The map shows more dots on the coast.”',
            'Inference: a conclusion you reach using what you see plus what you already know. “More people probably live on the coast because of trade and jobs.”',
            'CER is a way to answer a question with proof:',
            'Claim: your answer to the question.',
            'Evidence: facts or data that support the claim (from the map, chart or text).',
            'Reasoning: explains how the evidence proves the claim.'
          ]
        },
        {
          id: 'u1-global', title: 'Globalization',
          body: ['Globalization is the world becoming more connected through trade, travel, technology and culture.'],
          table: { head: ['Term', 'What it means', 'Example'], rows: [
            ['Interdependence', 'Countries and people relying on each other for goods, services and resources', 'A phone designed in one country, built in another, sold everywhere'],
            ['Multinational corporation', 'A company that does business in more than one country', 'A fast food chain with stores around the world'],
            ['Outsourcing', 'A company paying another company or workers, often in another country, to do part of its work, usually to save money', 'A customer service call center in another country'],
            ['Popular culture', 'Culture shared by large numbers of people in many places, spread quickly by media', 'Hit songs, movies and viral trends']
          ] },
          list: [
            'Pros: more goods at lower prices, new jobs in some places, sharing of ideas and technology, more contact between cultures.',
            'Cons: jobs can move away, workers in some countries may be paid very little, local cultures can fade, and problems in one country can spread to others.'
          ]
        },
        {
          id: 'u1-media', title: 'Media literacy',
          table: { head: ['Term', 'What it means'], rows: [
            ['Credibility', 'Whether a source can be trusted: who made it and do they know the topic'],
            ['Reliability', 'Whether a source is accurate and dependable over and over'],
            ['Bias', 'Leaning to one side, so a source shows only one view or leaves out facts'],
            ['Lateral reading', 'Leaving a site and opening other tabs to check what other sources say about it'],
            ['Click restraint', 'Not clicking the first search result; looking over the results first and choosing a good source'],
            ['Objective', 'Based on facts that can be checked'],
            ['Subjective', 'Based on opinions or feelings']
          ] }
        },
        {
          id: 'u1-nature', title: 'People and the environment',
          list: [
            'Environmental determinism: the idea that the physical environment (climate, land) controls how people act and how cultures develop. Most geographers today reject it.',
            'Possibilism: the idea that the environment sets some limits, but people choose how to adapt and can change their environment.',
            'Example of possibilism: farmers cutting terraces into steep hills so they can grow crops.'
          ]
        }
      ]
    },

    /* ---------- 02 ---------- */
    {
      id: 'u2', num: '02', title: 'Cultural Geography', short: 'Culture',
      sections: [
        {
          id: 'u2-culture', title: '2.A What is culture?',
          body: ['Culture is the shared beliefs, values, customs, language, food, clothing and other ways of life of a group. It is learned and passed down, not something you are born knowing.'],
          table: { head: ['Term', 'What it means', 'Example'], rows: [
            ['Culture trait', 'One single piece of a culture', 'Eating with chopsticks, a holiday, a type of clothing'],
            ['Cultural norms', 'The shared rules for how people are expected to act', 'Shaking hands when you meet someone, standing in line'],
            ['Cultural taboo', 'Something a culture forbids or sees as unacceptable', 'Many people in the U.S. would not eat horse meat'],
            ['Folk culture', 'Traditional culture of a small, often rural group that changes slowly', 'Handmade quilts or songs passed down in one community'],
            ['Popular culture', 'Culture shared by large numbers of people in many places that changes quickly and spreads through media', 'A dance trend that spreads worldwide online'],
            ['Cultural relativism', 'Understanding another culture by its own standards instead of judging it by yours', 'Learning why a custom matters to the people who follow it']
          ] }
        },
        {
          id: 'u2-identity', title: 'Culture, identity and social dynamics',
          table: { head: ['Term', 'What it means'], rows: [
            ['Society', 'A large group of people who live together and share rules, institutions and often a culture'],
            ['Identity', 'How a person sees themselves and how they fit into groups'],
            ['Background', 'The experiences, family, culture and education that shape a person'],
            ['Worldview', 'A person’s or group’s overall way of seeing and explaining the world, shaped by beliefs and values'],
            ['Diversity', 'Having many different groups, cultures and kinds of people in one place'],
            ['Race', 'A way of grouping people by physical traits like skin color. Most scholars see it as a social idea, not a biological one. Go by your class notes.'],
            ['Ethnicity', 'Identity with a group that shares ancestry, culture, language or traditions'],
            ['Nationality', 'Belonging to a country, usually as a citizen'],
            ['Cultural assimilation', 'When a group takes on the main culture around it and loses much of its own culture'],
            ['Multicultural (multiculturalism)', 'Many cultures living side by side, each keeping its own traditions'],
            ['Ethnocentrism', 'Judging other cultures by your own culture’s standards and seeing your own as better'],
            ['Cultural relativism', 'Understanding a culture by its own standards (the opposite of ethnocentrism)']
          ] },
          list: [
            'How unfair treatment builds, step by step:',
            '1. Stereotype: an oversimplified idea about a whole group (a thought). “All teenagers are bad drivers.”',
            '2. Prejudice: a negative feeling or judgment about a group, formed without really knowing them (an attitude).',
            '3. Discrimination: treating people unfairly because of their group (an action). Refusing to hire someone because of their group.',
            '4. Racism: believing one race is better than another, and the unfair treatment and systems that come from that belief.'
          ]
        },
        {
          id: 'u2-change', title: '2.B Causes and effects of cultural change',
          list: [
            'Culture hearth: the place where a culture or a culture trait starts and spreads from.',
            'Cultural diffusion: the spread of culture traits from one place or group to another. Example: sushi spreading from Japan to restaurants around the world.',
            'Migration: people moving from one place to another to live. They bring their culture with them, which is one way culture spreads.',
            'Refugee: a person forced to leave their country because of war, violence or persecution, who can’t safely go back.',
            'Diaspora: a group of people spread out from their original homeland.',
            'Effects when cultures meet: cultural assimilation (a group takes on the main culture), multiculturalism (groups keep their cultures side by side), and cultural preservation (efforts to protect a culture’s language, traditions and heritage so they aren’t lost).'
          ]
        },
        {
          id: 'u2-religion-words', title: '2.C Religion words',
          table: { head: ['Term', 'What it means'], rows: [
            ['Monotheism', 'Belief in one god'],
            ['Polytheism', 'Belief in many gods'],
            ['Henotheism', 'Worshiping one main god while accepting that other gods exist'],
            ['Secular', 'Not religious; separate from religion (for example, a secular government)'],
            ['Orthodox', 'Following the traditional, strict beliefs and practices of a religion. It is also part of some religious groups’ names, so go by your class notes.'],
            ['Ethnic religion', 'A religion tied to one group of people or one place, which usually doesn’t try to gain new followers'],
            ['Universalizing religion', 'A religion that tries to appeal to all people everywhere and welcomes new followers']
          ] }
        },
        {
          id: 'u2-religions', title: 'World religions matrix',
          body: ['This is the class matrix. Study exactly these facts.'],
          table: { head: ['Religion', 'Hearth', 'Type', 'Key beliefs', 'Holy text or place'], rows: [
            ['Judaism', 'Southwest Asia', 'Ethnic, monotheistic', 'Covenant, Ten Commandments', 'Torah, synagogue'],
            ['Christianity', 'Southwest Asia', 'Universalizing, monotheistic', 'Jesus Christ, salvation', 'Bible, church'],
            ['Islam', 'Southwest Asia', 'Universalizing, monotheistic', 'Muhammad, Five Pillars, pilgrimage to Mecca', 'Mosque, Ka’aba'],
            ['Hinduism', 'South Asia', 'Ethnic, poly/henotheistic', 'Brahman, karma, reincarnation, moksha', 'Ganges River, temples'],
            ['Buddhism', 'South Asia', 'Universalizing', '4 Noble Truths, 8 Fold Path', 'Stupas'],
            ['Sikhism', 'South Asia', 'Universalizing, monotheistic', 'One God, equality, rejection of the caste system', 'Golden Temple']
          ] },
          list: [
            'Southwest Asia hearth: Judaism, Christianity, Islam. South Asia hearth: Hinduism, Buddhism, Sikhism.',
            'Ethnic: Judaism and Hinduism. Universalizing: Christianity, Islam, Buddhism and Sikhism.'
          ]
        }
      ]
    }
  ];

  var flashcards = [
    // Unit 1 vocab
    { u: 1, front: 'Absolute location', back: 'The exact spot on Earth, given by latitude and longitude (or an exact address).' },
    { u: 1, front: 'Relative location', back: 'Where a place is compared to other places, like “next to the river.”' },
    { u: 1, front: 'Bias', back: 'Leaning to one side, so a source shows only one view or leaves out facts.' },
    { u: 1, front: 'Click restraint', back: 'Not clicking the first search result; looking over the results first and choosing a good source.' },
    { u: 1, front: 'Continents', back: 'The seven large landmasses: Africa, Antarctica, Asia, Australia, Europe, North America, South America.' },
    { u: 1, front: 'Credibility', back: 'Whether a source can be trusted: who made it and whether they know the topic.' },
    { u: 1, front: 'Distortion', back: 'Stretching or squeezing of shape, size, distance or direction when the round Earth is shown on a flat map.' },
    { u: 1, front: 'Environmental determinism', back: 'The idea that the physical environment controls how people act and how cultures develop.' },
    { u: 1, front: 'Possibilism', back: 'The idea that the environment sets limits, but people choose how to adapt and can change it.' },
    { u: 1, front: 'Geotagging', back: 'Adding location data to a photo, video or post.' },
    { u: 1, front: 'GPS', back: 'Global Positioning System: satellites that find an exact location.' },
    { u: 1, front: 'Globalization', back: 'The world becoming more connected through trade, travel, technology and culture.' },
    { u: 1, front: 'Interdependence', back: 'Countries and people relying on each other for goods, services and resources.' },
    { u: 1, front: 'Lateral reading', back: 'Leaving a site and opening other tabs to check what other sources say about it.' },
    { u: 1, front: 'Latitude', back: 'Lines running east-west that measure distance north or south of the Equator (0° to 90°).' },
    { u: 1, front: 'Longitude', back: 'Lines running north-south that measure distance east or west of the Prime Meridian (0° to 180°).' },
    { u: 1, front: 'Mental map', back: 'The map of a place a person carries in their head, built from their own experience.' },
    { u: 1, front: 'Map projection', back: 'A way of showing the round Earth on a flat map. Every projection distorts something.' },
    { u: 1, front: 'Map key', back: 'The part of a map that explains its symbols and colors (also called a legend).' },
    { u: 1, front: 'Map scale', back: 'Shows how distance on the map compares to real distance on Earth.' },
    { u: 1, front: 'Multinational corporation', back: 'A company that does business in more than one country.' },
    { u: 1, front: 'Outsourcing', back: 'A company paying another company or workers, often in another country, to do part of its work, usually to save money.' },
    { u: 1, front: 'Place (sense of place)', back: 'Place: the human and physical features that make a location unique. Sense of place: the feelings and meaning people attach to it.' },
    { u: 1, front: 'Reference map', back: 'A map that shows where things are: borders, cities, roads, rivers, mountains.' },
    { u: 1, front: 'Thematic map', back: 'A map that shows data about one topic, like population density or election results.' },
    { u: 1, front: 'Region', back: 'An area that shares one or more features.' },
    { u: 1, front: 'Reliability', back: 'Whether a source is accurate and dependable over and over.' },
    { u: 1, front: 'Remote sensing', back: 'Gathering information about Earth from a distance, usually from satellites or aircraft.' },
    { u: 1, front: 'Time zone', back: 'An area that uses the same clock time. There are about 24, each about 15° of longitude wide.' },
    // Unit 1 study guide ideas
    { u: 1, front: 'Human geography vs. history', back: 'Human geography asks where people and things are and why there. History asks when and how things changed over time.' },
    { u: 1, front: 'Density vs. concentration', back: 'Density: how many in an area (people per square mile). Concentration: how spread out they are (clustered or dispersed).' },
    { u: 1, front: 'Pattern', back: 'How things are arranged in space, for example in a line or in clusters.' },
    { u: 1, front: 'Observation vs. inference', back: 'Observation: what you directly see in the data. Inference: a conclusion from what you see plus what you know.' },
    { u: 1, front: 'CER', back: 'Claim (your answer), Evidence (facts that support it), Reasoning (how the evidence proves the claim).' },
    { u: 1, front: 'Objective vs. subjective', back: 'Objective: based on facts that can be checked. Subjective: based on opinions or feelings.' },
    // Unit 2 vocab
    { u: 2, front: 'Culture', back: 'The shared beliefs, values, customs, language and ways of life of a group, learned and passed down.' },
    { u: 2, front: 'Society', back: 'A large group of people who live together and share rules, institutions and often a culture.' },
    { u: 2, front: 'Stereotype', back: 'An oversimplified idea about a whole group (a thought). Step 1 of 4.' },
    { u: 2, front: 'Prejudice', back: 'A negative feeling or judgment about a group, formed without really knowing them (an attitude). Step 2 of 4.' },
    { u: 2, front: 'Discrimination', back: 'Treating people unfairly because of their group (an action). Step 3 of 4.' },
    { u: 2, front: 'Racism', back: 'Believing one race is better than another, and the unfair treatment and systems that come from it. Step 4 of 4.' },
    { u: 2, front: 'Cultural relativism', back: 'Understanding another culture by its own standards instead of judging it by yours.' },
    { u: 2, front: 'Ethnocentrism', back: 'Judging other cultures by your own culture’s standards and seeing your own as better.' },
    { u: 2, front: 'Culture trait', back: 'One single piece of a culture, like a food, a tool or a custom.' },
    { u: 2, front: 'Cultural norms', back: 'The shared rules for how people in a group are expected to act.' },
    { u: 2, front: 'Multicultural (multiculturalism)', back: 'Many cultures living side by side, each keeping its own traditions.' },
    { u: 2, front: 'Cultural assimilation', back: 'When a group takes on the main culture around it and loses much of its own.' },
    { u: 2, front: 'Folk culture', back: 'Traditional culture of a small, often rural group that changes slowly.' },
    { u: 2, front: 'Popular culture', back: 'Culture shared by large numbers of people in many places that changes quickly and spreads through media.' },
    { u: 2, front: 'Cultural taboo', back: 'Something a culture forbids or sees as unacceptable.' },
    { u: 2, front: 'Cultural diffusion', back: 'The spread of culture traits from one place or group to another.' },
    { u: 2, front: 'Culture hearth', back: 'The place where a culture or culture trait starts and spreads from.' },
    { u: 2, front: 'Worldview', back: 'A person’s or group’s overall way of seeing and explaining the world.' },
    { u: 2, front: 'Background', back: 'The experiences, family, culture and education that shape a person.' },
    { u: 2, front: 'Ethnicity', back: 'Identity with a group that shares ancestry, culture, language or traditions.' },
    { u: 2, front: 'Diversity', back: 'Having many different groups, cultures and kinds of people in one place.' },
    { u: 2, front: 'Identity', back: 'How a person sees themselves and how they fit into groups.' },
    { u: 2, front: 'Race', back: 'A way of grouping people by physical traits like skin color; most scholars see it as a social idea. Go by your class notes.' },
    { u: 2, front: 'Nationality', back: 'Belonging to a country, usually as a citizen.' },
    { u: 2, front: 'Monotheism', back: 'Belief in one god.' },
    { u: 2, front: 'Polytheism', back: 'Belief in many gods.' },
    { u: 2, front: 'Henotheism', back: 'Worshiping one main god while accepting that other gods exist.' },
    { u: 2, front: 'Secular', back: 'Not religious; separate from religion.' },
    { u: 2, front: 'Orthodox', back: 'Following the traditional, strict beliefs and practices of a religion. (Also part of some groups’ names; go by your class notes.)' },
    { u: 2, front: 'Diaspora', back: 'A group of people spread out from their original homeland.' },
    // Unit 2 study guide ideas
    { u: 2, front: 'Migration', back: 'People moving from one place to another to live. They carry their culture with them.' },
    { u: 2, front: 'Refugee', back: 'A person forced to leave their country because of war, violence or persecution, who can’t safely go back.' },
    { u: 2, front: 'Cultural preservation', back: 'Efforts to protect a culture’s language, traditions and heritage so they aren’t lost.' },
    { u: 2, front: 'Ethnic vs. universalizing religion', back: 'Ethnic: tied to one group or place, usually doesn’t seek new followers. Universalizing: tries to appeal to all people everywhere.' },
    { u: 2, front: 'Judaism', back: 'Hearth: Southwest Asia. Ethnic, monotheistic. Covenant, Ten Commandments. Torah, synagogue.' },
    { u: 2, front: 'Christianity', back: 'Hearth: Southwest Asia. Universalizing, monotheistic. Jesus Christ, salvation. Bible, church.' },
    { u: 2, front: 'Islam', back: 'Hearth: Southwest Asia. Universalizing, monotheistic. Muhammad, Five Pillars, pilgrimage to Mecca. Mosque, Ka’aba.' },
    { u: 2, front: 'Hinduism', back: 'Hearth: South Asia. Ethnic, poly/henotheistic. Brahman, karma, reincarnation, moksha. Ganges River, temples.' },
    { u: 2, front: 'Buddhism', back: 'Hearth: South Asia. Universalizing. 4 Noble Truths, 8 Fold Path. Stupas.' },
    { u: 2, front: 'Sikhism', back: 'Hearth: South Asia. Universalizing, monotheistic. One God, equality, rejection of the caste system. Golden Temple.' }
  ];

  var questions = [
    // Unit 1
    { u: 1, t: 'mc', q: 'Which is an example of absolute location?', c: ['41.9° N, 87.6° W', 'Two blocks north of the library', 'Near the coast', 'In the Midwest'], a: 0, why: 'Absolute location is an exact spot, given by latitude and longitude.' },
    { u: 1, t: 'mc', q: 'Which is an example of relative location?', c: ['Across the street from the park', '35° S, 58° W', 'Latitude 0°', '51.5° N, 0.1° W'], a: 0, why: 'Relative location describes a place compared to other places.' },
    { u: 1, t: 'mc', q: 'What do lines of latitude measure?', c: ['Distance north or south of the Equator', 'Distance east or west of the Prime Meridian', 'How high a place is', 'How many people live there'], a: 0, why: 'Latitude lines run east-west and measure north-south distance from the Equator.' },
    { u: 1, t: 'mc', q: 'What do lines of longitude measure?', c: ['Distance east or west of the Prime Meridian', 'Distance north or south of the Equator', 'The size of a country', 'The time it takes to travel'], a: 0, why: 'Longitude lines run north-south and measure east-west distance from the Prime Meridian.' },
    { u: 1, t: 'mc', q: 'Why are time zones about 15° of longitude wide?', c: ['Earth turns 360° in 24 hours, which is 15° each hour', 'There are 15 time zones', 'Each continent has 15 time zones', 'The Equator is 15° wide'], a: 0, why: '360° ÷ 24 hours = 15° per hour.' },
    { u: 1, t: 'mc', q: 'Which is a thematic map?', c: ['A map showing population density in each country', 'A road map of Illinois', 'A map of state borders and capitals', 'A map of rivers and mountains'], a: 0, why: 'A thematic map shows data about one topic. The others show where things are, so they are reference maps.' },
    { u: 1, t: 'mc', q: 'Which part of a map explains what its symbols and colors mean?', c: ['Map key', 'Map scale', 'Projection', 'Compass rose'], a: 0, why: 'The map key (legend) explains the symbols and colors.' },
    { u: 1, t: 'mc', q: 'A map says 1 inch = 50 miles. What is this?', c: ['Map scale', 'Map key', 'Latitude', 'A thematic map'], a: 0, why: 'Map scale compares distance on the map to real distance.' },
    { u: 1, t: 'mc', q: 'Why does every flat map have some distortion?', c: ['A round Earth can’t be shown flat without stretching shape, size, distance or direction', 'Mapmakers make mistakes on purpose', 'Satellites can’t see the poles', 'The map key is too small'], a: 0, why: 'Flattening a sphere always changes something; that is distortion.' },
    { u: 1, t: 'mc', q: 'You draw your route to school from memory. What is this?', c: ['A mental map', 'A reference map', 'Remote sensing', 'A map projection'], a: 0, why: 'A mental map is the map of a place you carry in your head.' },
    { u: 1, t: 'mc', q: 'Scientists use satellite images to see a forest shrinking over 20 years. Which tool is this?', c: ['Remote sensing', 'Geotagging', 'A mental map', 'Lateral reading'], a: 0, why: 'Remote sensing gathers information about Earth from a distance, like from satellites.' },
    { u: 1, t: 'mc', q: 'Your phone saves where each photo was taken. What is this called?', c: ['Geotagging', 'Remote sensing', 'Outsourcing', 'Click restraint'], a: 0, why: 'Geotagging adds location data to a photo or post.' },
    { u: 1, t: 'mc', q: '“People in hot places are lazy because of the heat.” Which idea is this?', c: ['Environmental determinism', 'Possibilism', 'Cultural relativism', 'Globalization'], a: 0, why: 'Environmental determinism says the environment controls how people act. Most geographers reject it.' },
    { u: 1, t: 'mc', q: 'Farmers cut terraces into steep hills so they can grow crops. Which idea does this support?', c: ['Possibilism', 'Environmental determinism', 'Outsourcing', 'Distortion'], a: 0, why: 'Possibilism says the environment sets limits, but people choose how to adapt.' },
    { u: 1, t: 'mc', q: 'A U.S. company pays a call center in another country to answer its customer calls. What is this?', c: ['Outsourcing', 'Interdependence', 'Remote sensing', 'Diaspora'], a: 0, why: 'Outsourcing is paying other companies or workers, often abroad, to do part of the work.' },
    { u: 1, t: 'mc', q: 'A phone is designed in one country, built from parts made in several others, and sold everywhere. This best shows…', c: ['Interdependence', 'Environmental determinism', 'Folk culture', 'A mental map'], a: 0, why: 'Countries rely on each other for parts, work and buyers.' },
    { u: 1, t: 'mc', q: 'Which is a con of globalization?', c: ['Jobs can move to other countries', 'More goods at lower prices', 'Faster sharing of ideas', 'More contact between cultures'], a: 0, why: 'Losing jobs to other countries is a common downside. The others are pros.' },
    { u: 1, t: 'mc', q: 'You find a website and open new tabs to see what other sources say about it. What is this?', c: ['Lateral reading', 'Click restraint', 'Bias', 'Geotagging'], a: 0, why: 'Lateral reading means checking a source by reading across other sites.' },
    { u: 1, t: 'mc', q: 'Instead of clicking the first search result, you look over all the results first. What is this?', c: ['Click restraint', 'Lateral reading', 'Reliability', 'Outsourcing'], a: 0, why: 'Click restraint is holding off on clicking until you pick a good source.' },
    { u: 1, t: 'mc', q: 'Which statement is objective?', c: ['The city had 2.7 million people in the last census.', 'The city is the best place to live.', 'The city’s food is amazing.', 'The city is too crowded.'], a: 0, why: 'Objective statements are facts that can be checked. The others are opinions (subjective).' },
    { u: 1, t: 'mc', q: 'Looking at a population map, which is an OBSERVATION?', c: ['The map shows more dots along the coast.', 'People live on the coast because of jobs.', 'The coast is a better place to live.', 'People will move inland in the future.'], a: 0, why: 'An observation is what you can see directly. The others are inferences or opinions.' },
    { u: 1, t: 'mc', q: 'In CER, which part explains how the evidence proves the claim?', c: ['Reasoning', 'Claim', 'Evidence', 'Conclusion'], a: 0, why: 'Claim is the answer, evidence is the facts, and reasoning connects them.' },
    { u: 1, t: 'mc', q: 'Which describes DENSITY?', c: ['The number of people per square mile', 'Whether things are clustered or spread out', 'The exact location of a city', 'The feelings people have about a place'], a: 0, why: 'Density is how many of something are in an area. Clustered or spread out is concentration.' },
    { u: 1, t: 'mc', q: 'How is human geography different from history?', c: ['Geography asks where and why there; history asks when and how things changed', 'Geography only studies mountains and rivers', 'History only studies maps', 'They study exactly the same things'], a: 0, why: 'Human geography focuses on space and place; history focuses on time.' },
    { u: 1, t: 'mc', q: 'Your grandma’s town feels like home because of the memories you have there. This is…', c: ['Sense of place', 'Absolute location', 'Remote sensing', 'Distortion'], a: 0, why: 'Sense of place is the feeling and meaning people attach to a place.' },
    // Unit 2
    { u: 2, t: 'mc', q: 'Which is an example of cultural diffusion?', c: ['Sushi restaurants opening in cities around the world', 'A family keeping the same recipe for 100 years', 'A mountain range separating two valleys', 'A town counting its population'], a: 0, why: 'Cultural diffusion is a culture trait spreading from one place to another.' },
    { u: 2, t: 'mc', q: 'The place where a culture or culture trait first starts is called the…', c: ['Culture hearth', 'Diaspora', 'Cultural norm', 'Worldview'], a: 0, why: 'A culture hearth is where a culture begins and spreads from.' },
    { u: 2, t: 'mc', q: 'Which is the correct order, from first to last?', c: ['Stereotype → prejudice → discrimination → racism', 'Prejudice → stereotype → racism → discrimination', 'Discrimination → prejudice → stereotype → racism', 'Racism → discrimination → prejudice → stereotype'], a: 0, why: 'A stereotype (thought) leads to prejudice (feeling), then discrimination (action), then racism.' },
    { u: 2, t: 'mc', q: 'A manager refuses to hire someone because of the group they belong to. This is…', c: ['Discrimination', 'A stereotype', 'Cultural relativism', 'Diffusion'], a: 0, why: 'Discrimination is an action: treating people unfairly because of their group.' },
    { u: 2, t: 'mc', q: '“All teenagers are bad drivers.” This is an example of…', c: ['A stereotype', 'Discrimination', 'Cultural assimilation', 'A cultural norm'], a: 0, why: 'A stereotype is an oversimplified idea about a whole group.' },
    { u: 2, t: 'mc', q: 'A traveler says another country’s food is “weird and wrong” because it isn’t like food at home. This is…', c: ['Ethnocentrism', 'Cultural relativism', 'Multiculturalism', 'Cultural preservation'], a: 0, why: 'Ethnocentrism is judging other cultures by your own culture’s standards.' },
    { u: 2, t: 'mc', q: 'A student learns why a custom matters to the people who follow it before judging it. This is…', c: ['Cultural relativism', 'Ethnocentrism', 'Prejudice', 'Racism'], a: 0, why: 'Cultural relativism means understanding a culture by its own standards.' },
    { u: 2, t: 'mc', q: 'An immigrant family’s grandchildren speak only the new country’s language and no longer follow the old traditions. This is…', c: ['Cultural assimilation', 'Multiculturalism', 'Cultural preservation', 'A culture hearth'], a: 0, why: 'Assimilation is taking on the main culture and losing much of your own.' },
    { u: 2, t: 'mc', q: 'A city where many groups keep their own languages, foods and festivals side by side is…', c: ['Multicultural', 'Assimilated', 'Ethnocentric', 'Secular'], a: 0, why: 'Multiculturalism is many cultures living side by side and keeping their traditions.' },
    { u: 2, t: 'mc', q: 'Which is an example of popular culture?', c: ['A dance trend that spreads worldwide on social media', 'Quilts handmade the same way for generations in one small town', 'A song only sung in one rural village', 'A farming method used by one family'], a: 0, why: 'Popular culture is widespread, changes fast and spreads through media. The others are folk culture.' },
    { u: 2, t: 'mc', q: 'Which is an example of folk culture?', c: ['Songs passed down for generations in a small rural community', 'A movie released in theaters worldwide', 'A fast food chain in 100 countries', 'A viral video'], a: 0, why: 'Folk culture is traditional, belongs to a small group, and changes slowly.' },
    { u: 2, t: 'mc', q: 'Shaking hands when you meet someone is an example of a…', c: ['Cultural norm', 'Cultural taboo', 'Diaspora', 'Culture hearth'], a: 0, why: 'A cultural norm is a shared rule for how people are expected to act.' },
    { u: 2, t: 'mc', q: 'Something a culture forbids or sees as unacceptable is a…', c: ['Cultural taboo', 'Culture trait', 'Cultural norm', 'Worldview'], a: 0, why: 'A taboo is something a culture says you shouldn’t do.' },
    { u: 2, t: 'mc', q: 'A person forced to leave their country because of war, who can’t safely go back, is a…', c: ['Refugee', 'Tourist', 'Multinational corporation', 'Stereotype'], a: 0, why: 'A refugee is forced to flee war, violence or persecution.' },
    { u: 2, t: 'mc', q: 'A group of people spread out from their original homeland is called a…', c: ['Diaspora', 'Culture hearth', 'Society', 'Region'], a: 0, why: 'A diaspora is a people scattered from their homeland.' },
    { u: 2, t: 'mc', q: 'Belonging to a country, usually as a citizen, is…', c: ['Nationality', 'Ethnicity', 'Race', 'Religion'], a: 0, why: 'Nationality is about the country you belong to. Ethnicity is about shared ancestry and culture.' },
    { u: 2, t: 'mc', q: 'What is henotheism?', c: ['Worshiping one main god while accepting that other gods exist', 'Belief in exactly one god', 'Belief in many equal gods', 'Not being religious'], a: 0, why: 'Henotheism is one main god among others. One god is monotheism; many gods is polytheism.' },
    { u: 2, t: 'mc', q: 'A government that is separate from any religion is…', c: ['Secular', 'Orthodox', 'Monotheistic', 'Polytheistic'], a: 0, why: 'Secular means not religious, or separate from religion.' },
    { u: 2, t: 'mc', q: 'According to the class matrix, which religion has Five Pillars and a pilgrimage to Mecca?', c: ['Islam', 'Judaism', 'Christianity', 'Sikhism'], a: 0, why: 'In the matrix, Islam’s beliefs are Muhammad, the Five Pillars and the pilgrimage to Mecca.' },
    { u: 2, t: 'mc', q: 'According to the class matrix, which religion is linked to the covenant and the Ten Commandments?', c: ['Judaism', 'Islam', 'Hinduism', 'Buddhism'], a: 0, why: 'Judaism: covenant, Ten Commandments, Torah, synagogue.' },
    { u: 2, t: 'mc', q: 'Which religion from South Asia is universalizing and monotheistic and rejects the caste system?', c: ['Sikhism', 'Hinduism', 'Buddhism', 'Judaism'], a: 0, why: 'Sikhism: one God, equality, rejection of the caste system; its holy place is the Golden Temple.' },
    { u: 2, t: 'mc', q: 'Which religion is linked to the 4 Noble Truths, the 8 Fold Path and stupas?', c: ['Buddhism', 'Hinduism', 'Sikhism', 'Christianity'], a: 0, why: 'Buddhism: 4 Noble Truths, 8 Fold Path, stupas.' },
    { u: 2, t: 'mc', q: 'Which religion is linked to Brahman, karma, reincarnation, moksha and the Ganges River?', c: ['Hinduism', 'Buddhism', 'Islam', 'Sikhism'], a: 0, why: 'Hinduism: Brahman, karma, reincarnation, moksha; Ganges River and temples.' },
    { u: 2, t: 'mc', q: 'According to the class matrix, which two religions are ethnic religions?', c: ['Judaism and Hinduism', 'Christianity and Islam', 'Buddhism and Sikhism', 'Islam and Hinduism'], a: 0, why: 'Judaism and Hinduism are ethnic. Christianity, Islam, Buddhism and Sikhism are universalizing.' },
    { u: 2, t: 'mc', q: 'Which three religions in the class matrix have their hearth in Southwest Asia?', c: ['Judaism, Christianity and Islam', 'Hinduism, Buddhism and Sikhism', 'Judaism, Hinduism and Sikhism', 'Christianity, Buddhism and Islam'], a: 0, why: 'Judaism, Christianity and Islam: Southwest Asia. Hinduism, Buddhism and Sikhism: South Asia.' },
    { u: 2, t: 'mc', q: 'Which religion in the class matrix is universalizing, monotheistic, from Southwest Asia, and uses the Bible and churches?', c: ['Christianity', 'Judaism', 'Islam', 'Sikhism'], a: 0, why: 'Christianity: Jesus Christ, salvation, Bible, church.' },
    { u: 2, t: 'mc', q: 'What makes a religion universalizing?', c: ['It tries to appeal to all people everywhere', 'It is tied to one group of people or place', 'It believes in many gods', 'It has no holy places'], a: 0, why: 'Universalizing religions seek followers everywhere; ethnic religions are tied to one group or place.' }
  ];

  FINALS.addClass('human-geography', {
    // Shown on this class's Home. The teacher has not posted an exam format.
    examFacts: [
      'Format not posted yet. Study the vocab and the two unit study guides.'
    ],
    units: units,
    flashcards: flashcards,
    questions: questions
  });
})();
