// EVERY CLASS ON THE SITE. This is the one file to edit when the class list changes.
//
// The list is grouped: Core or Encore, then a subject (like English), then its classes
// (like English 1 Honors). The site asks in that order: Core or Encore, then the subject,
// then the class. A subject with only one class skips the last question.
//
// Each class can have:
//   name    what students see, for example "English 1 Honors".
//   filled  true when the class has real lessons, flashcards and quiz questions.
//           Leave it false (or leave it out) and the class shows "not filled in yet",
//           and the NotebookLM pop-up asking students to share notes for it.
//   file    true loads data/classes/<id>.js (the class's lessons, flashcards and quiz).
//           Copy data/classes/_template.js to start one.
//   tools   true also loads data/classes/<id>-tools.js (interactive parts, like PE / Health).
//   id      optional. Made from the name if left out ("English 1 Honors" -> english-1-honors).
//           Saved progress and data file names use it, so once a class has a data file,
//           keep its id the same (add id: "old-id" if you rename the class).
//   exam    optional final date, "YYYY-MM-DD".
//
// To mark a class done: add its data file, then set file: true and filled: true.
FINALS.setCatalog([
  { category: "core", subject: "English", classes: [
    { name: "English 1" },
    { name: "English 1 Honors" },
    { name: "English 2 American Society" }
  ] },
  { category: "core", subject: "Math", classes: [
    { name: "Algebra 1" },
    { name: "Algebra Academy" },
    { name: "Geometry" },
    { name: "Geometry Essentials" },
    { name: "Honors Geometry" },
    { name: "Algebra 2/Trig & Stats" },
    { name: "Honors Algebra 2/Trig & Stats" }
  ] },
  { category: "core", subject: "Science", classes: [
    { name: "Biology" },
    { name: "Honors Biology" },
    { name: "Chem/Phys" },
    { name: "Environmental Science" },
    { name: "Earth Science" }
  ] },
  { category: "core", subject: "Social Studies", classes: [
    { name: "Human Geography" },
    { name: "AP Human Geography" },
    { name: "US History" },
    { name: "World History" },
    { name: "Geography" }
  ] },

  { category: "encore", subject: "Art", classes: [
    { name: "Drawing 1" },
    { name: "Drawing 2" },
    { name: "Painting 1" },
    { name: "Ceramics 1" },
    { name: "Ceramics 2" },
    { name: "Computer Graphics 1" },
    { name: "Computer Graphics 2" },
    { name: "3D Printing and Design" },
    { name: "Sculpture" },
    { name: "Animation" },
    { name: "Digital Photography 1" },
    { name: "Digital Photography 2" },
    { name: "AP Art History" }
  ] },
  { category: "encore", subject: "Business and Tech", classes: [
    { name: "Web Design" },
    { name: "Advertising" },
    { name: "Cybersecurity" },
    { name: "Coding" },
    { name: "Visual Media" },
    { name: "Emerging Technology" },
    { name: "Business Orientation" },
    { name: "Career Certifications" },
    { name: "Video Game Design" },
    { name: "Notetaking and Study Skills" },
    { name: "Accounting" },
    { name: "Business Law" },
    { name: "Finance" },
    { name: "Consumer Economics / Personal Finance" },
    { name: "College and Career Prep" },
    { name: "Work Experience" },
    { name: "Vocational Skills" }
  ] },
  { category: "encore", subject: "Engineering and Trades", classes: [
    { name: "Engineering Tech 1" },
    { name: "Engineering Tech 2" },
    { name: "Power Mechanics" },
    { name: "Media Production 1" },
    { name: "PLTW Intro to Engineering Design" },
    { name: "Construction 2" },
    { name: "Drafting and Design" }
  ] },
  { category: "encore", subject: "Family and Consumer Science", classes: [
    { name: "Culinary Arts 1" },
    { name: "Culinary Arts 2" },
    { name: "Interior Design" },
    { name: "Apparel Construction 1" },
    { name: "Home Maintenance" },
    { name: "Life Skills" }
  ] },
  { category: "encore", subject: "World Languages", classes: [
    { name: "French 1" },
    { name: "French 2" },
    { name: "German 1" },
    { name: "Spanish 1" },
    { name: "Spanish 2" },
    { name: "Heritage Spanish 2" },
    { name: "Heritage Spanish 3" },
    { name: "Chinese 1" },
    { name: "American Sign Language 1" }
  ] },
  { category: "encore", subject: "Music", classes: [
    { name: "Concert Band" },
    { name: "Concert Winds" },
    { name: "Concert Orchestra" },
    { name: "Chamber Orchestra" },
    { name: "Concert Strings" },
    { name: "Chamber Strings" },
    { name: "Cecilian Singers" },
    { name: "Bass Chorus" },
    { name: "Music Production 1" },
    { name: "Music Production 2" },
    { name: "Music Independent Study" }
  ] },
  { category: "encore", subject: "English Electives", classes: [
    { name: "Theatre Arts 1" },
    { name: "Theatre Arts 2" },
    { name: "News Journalism" },
    { name: "Yearbook Journalism" },
    { name: "Communication Skills" }
  ] },
  // The finished example. Its id and files stay exactly as they were.
  { category: "encore", subject: "PE / Health", classes: [
    { id: "pe-health", name: "PE / Health", file: true, tools: true, filled: true, exam: "" }
  ] }
]);
