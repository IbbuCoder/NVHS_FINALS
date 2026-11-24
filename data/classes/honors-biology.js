// Honors Biology: Semester 1 final (Thu Dec 17, period 6).
// Same format as human-geography.js: units with sections, flashcards, questions and examFacts.
// Built from the class notebooks for Units 1-5 and the final exam info.
// The fuel rankings (energy density, CO2 coefficient) are not written out here because the
// numbers are in the teacher's table. Study that table for the order of the 8 fuels.
(function () {
  var units = [
    /* ---------- 01 ---------- */
    {
      id: 'u1', num: '01', title: 'Bio Bootcamp', short: 'Bootcamp',
      sections: [
        {
          id: 'u1-life', title: 'Characteristics of life and viruses',
          list: [
            'Know the 8 characteristics of life from your notes. Viruses are a common test case.',
            'A virus has a capsid (protein coat) around its genetic material.',
            'Lytic cycle: the virus takes over the cell, makes copies and bursts the cell. Lysogenic cycle: the virus DNA hides inside the host DNA and copies along with it until it activates.',
            'HIV attacks CD4 receptors on Helper T cells.',
            'Antibiotics do not work on viruses.'
          ],
          simple: 'Viruses are not cells. Antibiotics kill bacteria, not viruses.'
        },
        {
          id: 'u1-molecules', title: 'Biomolecules',
          table: { head: ['Biomolecule', 'Monomer (building block)', 'Polymer'], rows: [
            ['Carbohydrates', 'Monosaccharide (simple sugar, like glucose)', 'Polysaccharide'],
            ['Lipids', 'Fatty acids and glycerol', 'Fats, oils, waxes'],
            ['Proteins', 'Amino acids', 'Polypeptide / protein'],
            ['Nucleic acids', 'Nucleotides', 'DNA and RNA']
          ] }
        },
        {
          id: 'u1-membrane', title: 'Cell membrane, transport and osmosis',
          list: [
            'The cell membrane controls what enters and leaves the cell.',
            'Passive transport needs no energy. Substances move from high to low concentration (diffusion).',
            'Active transport uses energy (ATP) to move substances from low to high concentration.',
            'Osmosis is the movement of water across a membrane.',
            'Hypotonic solution: less solute outside, so water moves INTO the cell (it swells). Isotonic: equal, no net movement. Hypertonic: more solute outside, so water moves OUT (the cell shrinks).',
            'Labs: egg osmosis lab and dialysis tubing lab.'
          ]
        },
        {
          id: 'u1-cer', title: 'CER (Claim, Evidence, Reasoning)',
          list: [
            'Claim: the answer to the question. Evidence: data that supports it. Reasoning: science that links the evidence to the claim.',
            'Use the cell ID flowchart to tell cell types apart.'
          ]
        }
      ]
    },
    /* ---------- 02 ---------- */
    {
      id: 'u2', num: '02', title: 'What’s in YOUR Water', short: 'Water',
      sections: [
        {
          id: 'u2-water', title: 'Water facts',
          list: [
            'Earth’s water: 97% saltwater, 2% frozen, 1% freshwater.',
            'Water use: about 50 gallons a day per person. Cost: $2 per 1,000 gallons.',
            'Nitrate standard: Germany uses 50 mg/L.'
          ]
        },
        {
          id: 'u2-cells', title: 'Cells',
          table: { head: ['Compare', 'Meaning'], rows: [
            ['Prokaryote', 'Cell with no nucleus (like bacteria)'],
            ['Eukaryote', 'Cell with a nucleus and other organelles'],
            ['Autotroph', 'Makes its own food (like plants)'],
            ['Heterotroph', 'Gets food by eating other organisms']
          ] },
          list: ['Know the organelles and what each one does.']
        },
        {
          id: 'u2-measure', title: 'Measuring water quality',
          list: [
            'Turbidity: how cloudy water is. Measured with a laser method or a Secchi disk (max reading 100 mm).',
            'TDS (total dissolved solids) is measured in ppm.',
            'Microbial colonies are counted to measure living things in the water.',
            'Percent recovered = (final ÷ start) × 100.',
            'Filter budget challenge: $2.00, 500 mL of water, 40 minutes.',
            'Know the three purification processes from your notes.'
          ]
        },
        {
          id: 'u2-shrimp', title: 'Ghost shrimp caffeine experiment',
          body: ['Independent variable: mg/mL of caffeine. Dependent variable: heart rate in beats per minute (bpm).'],
          table: { head: ['Result', 'Trend'], rows: [
            ['Heart rates: 292, 291, 290, 272, 242 bpm', 'As caffeine goes up, heart rate goes down']
          ] }
        }
      ]
    },
    /* ---------- 03 ---------- */
    {
      id: 'u3', num: '03', title: 'Got Caffeine', short: 'Caffeine',
      sections: [
        {
          id: 'u3-science', title: 'Nature of science',
          list: [
            'Observation: what you sense or measure. Inference: a conclusion you make from observations.',
            'Peer review: other scientists check a study before it is trusted.',
            'Qualitative data is descriptions (colors, smells). Quantitative data is numbers.'
          ]
        },
        {
          id: 'u3-hyp', title: 'Hypothesis and variables',
          body: ['Hypothesis format: “If [IV], then [DV], because [reasoning].”'],
          table: { head: ['Variable', 'Meaning'], rows: [
            ['Independent (IV)', 'What you change on purpose'],
            ['Dependent (DV)', 'What you measure'],
            ['Control group', 'The group with no treatment, used to compare'],
            ['Constants', 'Everything you keep the same']
          ] }
        },
        {
          id: 'u3-graph', title: 'Graphing rules',
          list: [
            'IV on the x-axis. DV on the y-axis.',
            'Use a line graph for time or continuous data.',
            'Start at 0, use even intervals, and give the graph a descriptive title.'
          ]
        },
        {
          id: 'u3-caffeine', title: 'Caffeine and adenosine',
          body: ['Caffeine blocks adenosine receptors. Adenosine normally makes you feel sleepy, so blocking it makes you feel more awake.'],
          list: [
            'Sleep study: 40 adults.',
            'Reaction time data: 0.252 s dropped to 0.219 s.',
            'Other data sets: erythritol study, brine shrimp experiment (0–50%), push-ups BTB lab.',
            'Leaf miner data: photosynthesis rates 9.9, 11.4, 13.2; conductance 0.20, 0.26, 0.27. Know standard deviation and standard error.'
          ]
        }
      ]
    },
    /* ---------- 04 ---------- */
    {
      id: 'u4', num: '04', title: 'Blood, Sweat and Air', short: 'Respiration',
      sections: [
        {
          id: 'u4-atp', title: 'ATP and cellular respiration',
          body: ['ATP stores usable energy. When ATP loses a phosphate it becomes ADP and releases energy. Cells rebuild ATP from ADP.', 'Cellular respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP'],
          table: { head: ['Stage', 'Where it happens'], rows: [
            ['Glycolysis', 'Cytoplasm'],
            ['Krebs cycle', 'Mitochondrial matrix'],
            ['Electron transport chain (ETC)', 'Inner mitochondrial membrane']
          ] }
        },
        {
          id: 'u4-anaerobic', title: 'Aerobic vs. anaerobic',
          list: [
            'Aerobic respiration uses oxygen. Anaerobic respiration does not.',
            'Lactic acid fermentation happens in muscle cells.',
            'Alcoholic fermentation happens in yeast.',
            'Delayed muscle soreness is NOT caused by lactic acid.'
          ]
        },
        {
          id: 'u4-homeo', title: 'Homeostasis and feedback loops',
          list: [
            'Homeostasis: keeping the body’s conditions steady.',
            'A feedback loop has a stimulus, receptor, control center, effector and response.',
            'Negative feedback reverses a change and brings the body back to normal. Positive feedback pushes the change further.',
            'Examples: thermoregulation, CO₂ regulation, blood pressure, and blood glucose (insulin lowers glucose; glucagon raises it).'
          ]
        },
        {
          id: 'u4-labs', title: 'Blood, gas exchange and labs',
          list: [
            'Know the blood components and how gas exchange works in the alveoli.',
            'Yeast balloon lab: yeast fermenting sugar makes CO₂, which inflates the balloon.',
            'Push-ups BTB lab: bromothymol blue shows CO₂ from breathing.'
          ]
        }
      ]
    },
    /* ---------- 05 ---------- */
    {
      id: 'u5', num: '05', title: 'Biofuels', short: 'Biofuels',
      sections: [
        {
          id: 'u5-eq', title: 'Key equations',
          table: { head: ['Process', 'Equation'], rows: [
            ['Photosynthesis', '6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂'],
            ['Fermentation', 'C₆H₁₂O₆ → 2CH₃CH₂OH + 2CO₂'],
            ['Catalase', '2H₂O₂ → 2H₂O + O₂']
          ] }
        },
        {
          id: 'u5-fuels', title: 'Fuels',
          list: [
            'The 8 fuels: ethanol, biodiesel, propane, gasoline E10, natural gas, methanol, diesel, kerosene.',
            'Energy density is kJ per unit mass. CO₂ coefficient is kg of CO₂ per kg of fuel. Use your table for the rankings.',
            'Combustion calculations: ΔCO₂ ÷ Δfuel and Δtemp ÷ Δfuel.'
          ]
        },
        {
          id: 'u5-labs', title: 'Labs',
          table: { head: ['Lab', 'Key facts'], rows: [
            ['Fermentation Factories', 'Bags A–F ethanol %: A = 1.5%, B = 0.1%, C = 0.8%, D = 0.1%, E = 0.2%, F = 0.1%'],
            ['Algae', 'Nannochloropsis; Secchi disk protocol'],
            ['Catalase / liver', '25 nanoseconds; 40 million molecules per second'],
            ['Combustion', 'Paraffin vs. beeswax; BTB indicator; 15 minutes'],
            ['Biomolecules', 'Glucose, caproic acid, glutamic acid']
          ] }
        },
        {
          id: 'u5-vocab', title: 'Vocabulary',
          list: [
            'Energy and matter: conservation laws, potential and kinetic energy, endergonic (takes in energy) and exergonic (releases energy).',
            'Photosynthesis: chloroplast, thylakoid, stroma, chlorophyll, photon, light-dependent and light-independent reactions, electron carriers.',
            'Macromolecules: carbohydrates, lipids, proteins; monomers and polymers; dehydration synthesis (builds polymers, removes water) and hydrolysis (breaks polymers, adds water).',
            'Enzymes: substrate, active site, activation energy, denaturation, lock and key model, amylase, glucoamylase.',
            'Other: ethanol, yeast, combustion, energy density, CO₂ coefficient, autotroph / heterotroph, ATP.'
          ]
        }
      ]
    },
    /* ---------- 06 ---------- */
    {
      id: 'u6', num: '06', title: 'Final Exam Format', short: 'Exam',
      sections: [
        {
          id: 'u6-format', title: 'What is on the exam',
          list: [
            'Covers Units 1–5. Study from the Learning Objectives and your old Pear Assessment quizzes.',
            'Question types: multiple choice / identification, and applied passage or infographic analysis.',
            'Graphing: descriptive title, IV on x-axis, DV on y-axis, line graph for continuous time data, start at 0, even intervals.',
            'You may write trend statements with or without numbers as evidence.'
          ]
        },
        {
          id: 'u6-cer', title: 'CER rubric (5 points)',
          list: [
            'Claim: no numbers.',
            'Evidence: 2 bullet points, each with at least 2 numbers.',
            'Reasoning: maximum 3 sentences that follow the template.'
          ]
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
    { u: 2, t: 'mc', q: 'What happened to ghost shrimp heart rate (292 → 242 bpm) as caffeine increased?', c: ['It went down', 'It went up', 'It stayed the same', 'It stopped'], a: 0, why: 'The heart rates dropped: 292, 291, 290, 272, 242.' },
    { u: 2, t: 'mc', q: 'What was the budget in the filter challenge?', c: ['$2.00', '$5.00', '$10.00', '$20.00'], a: 0, why: 'The filter challenge was $2.00, 500 mL and 40 minutes.' },
    // Unit 3
    { u: 3, t: 'mc', q: 'Which is a correctly formatted hypothesis?', c: ['If caffeine increases, then heart rate decreases, because caffeine affects the heart', 'Caffeine makes hearts go faster', 'I think caffeine is bad', 'What does caffeine do?'], a: 0, why: 'Use “If [IV], then [DV], because [reasoning].”' },
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
