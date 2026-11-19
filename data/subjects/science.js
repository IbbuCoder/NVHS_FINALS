/*
 * science.js — SAMPLE subject. General science content written to test
 * every feature; replace it with what your class actually covered.
 */
STUDY_DATA.content["science"] = {
  units: [
    {
      title: "Unit 1: Cells",
      keyTerms: [
        { term: "Cell", definition: "The smallest unit of life that can carry out all life processes." },
        { term: "Nucleus", definition: "The organelle that holds a cell's DNA and controls its activities." },
        { term: "Mitochondria", definition: "Organelles that release energy from food through cellular respiration." },
      ],
      flashcards: [
        { front: "What does the cell membrane do?", back: "Controls what goes into and out of the cell." },
        { front: "Which organelle makes food in plant cells?", back: "The chloroplast, using photosynthesis." },
        { front: "Name two parts plant cells have that animal cells don't.", back: "A cell wall and chloroplasts (plants also have a large central vacuole)." },
        { front: "What are the three parts of cell theory?", back: "All living things are made of cells; cells are the basic unit of life; all cells come from existing cells." },
      ],
      quiz: [
        {
          question: "Which organelle holds a cell's DNA?",
          choices: ["Ribosome", "Nucleus", "Cell wall", "Vacuole"],
          answerIndex: 1,
          explanation: "The nucleus stores DNA and acts as the cell's control center.",
        },
        {
          question: "Where does cellular respiration mostly happen?",
          choices: ["Chloroplast", "Cell membrane", "Mitochondria", "Nucleus"],
          answerIndex: 2,
          explanation: "Mitochondria break down sugar to release usable energy.",
        },
        {
          question: "Which of these is found in plant cells but NOT animal cells?",
          choices: ["Cell membrane", "Mitochondria", "Nucleus", "Cell wall"],
          answerIndex: 3,
          explanation: "Plant cells have a rigid cell wall outside the membrane; animal cells don't.",
        },
      ],
    },
    {
      title: "Unit 2: Forces & Motion",
      keyTerms: [
        { term: "Force", definition: "A push or pull on an object, measured in newtons (N)." },
        { term: "Inertia", definition: "An object's tendency to resist changes in its motion." },
        { term: "Acceleration", definition: "The rate at which velocity changes over time." },
      ],
      flashcards: [
        { front: "Newton's 1st law", back: "An object stays at rest or in constant motion unless an unbalanced force acts on it." },
        { front: "Newton's 2nd law (formula)", back: "Force = mass × acceleration (F = ma)." },
        { front: "Newton's 3rd law", back: "For every action there is an equal and opposite reaction." },
        { front: "Speed vs. velocity", back: "Speed is how fast; velocity is how fast AND in what direction." },
      ],
      quiz: [
        {
          question: "A 2 kg cart accelerates at 3 m/s². What is the net force?",
          choices: ["1.5 N", "5 N", "6 N", "9 N"],
          answerIndex: 2,
          explanation: "F = m × a = 2 kg × 3 m/s² = 6 N.",
        },
        {
          question: "Why do passengers lurch forward when a car stops suddenly?",
          choices: ["Gravity", "Inertia", "Friction", "Air resistance"],
          answerIndex: 1,
          explanation: "Their bodies keep moving forward because of inertia (Newton's 1st law).",
        },
      ],
    },
  ],
};
