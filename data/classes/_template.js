// TEMPLATE for one class's lessons, flashcards and quiz.
// 1. Find the class in data/subjects.js and note its id (made from the name:
//    "English 1 Honors" -> english-1-honors), or give it an id there.
// 2. Copy this file to data/classes/<id>.js and change "your-id" below to that id.
// 3. In data/subjects.js, add file: true to the class. When it's done, add filled: true too,
//    and its "not filled in yet" notice and NotebookLM pop-up go away.
FINALS.addClass('your-id', {
  // Units show up under Units. num is the big number, short is the short name.
  units: [
    {
      id: 'u1', num: '01', title: 'Unit title', short: 'Short name',
      sections: [
        {
          id: 'u1-first',            // unique in this class; used for bookmarks
          title: 'Section heading',
          body: ['A paragraph of notes.', 'Another paragraph.'],
          list: ['Optional bullet', 'Another bullet'],
          table: { head: ['Term', 'Meaning'], rows: [['Word', 'What it means']] },
          simple: 'Optional plain-English note. Shows when Simple words is on.'
        }
      ]
    }
  ],
  // u is the unit number. simple is optional.
  flashcards: [
    { u: 1, front: 'Term', back: 'What it means', simple: 'Optional plain-English note' }
  ],
  // t: 'mc' (multiple choice) or 'tf' (true or false). a is the index of the right
  // choice, starting at 0. Choices get shuffled, so write them in any order.
  questions: [
    { u: 1, t: 'mc', q: 'Question?', c: ['Right', 'Wrong', 'Wrong', 'Wrong'], a: 0, why: 'Why it is right.' },
    { u: 1, t: 'tf', q: 'A statement.', c: ['True', 'False'], a: 1, why: 'Why it is false.' }
  ],
  // Optional. Formulas show above the drills. Each drill makes a new problem every time:
  // rand(lo, hi) gives a whole number. Return the question, the answer and the worked steps.
  formulas: [['Name', 'formula']],
  drills: [
    {
      tag: 'Drill name', unit: 'lbs',
      make: function (rand) {
        var a = rand(1, 10);
        return { q: 'What is ' + a + ' × 2?', answer: a * 2, work: a + ' × 2 = ' + a * 2 };
      }
    }
  ]
});
