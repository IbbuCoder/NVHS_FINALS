// Every class on the site. To add a class:
//   1. Add one line below.
//   2. Copy data/classes/_template.js to data/classes/<id>.js and fill it in.
// id: lowercase letters, numbers and dashes, same as the file name.
// category: "core" or "encore".
// exam: the class's final, "YYYY-MM-DD". Leave "" to use finalsDate from js/config.js.
// unfinished: true shows a "not filled in yet" warning on that class. Delete it when the class is done.
// tools: true also loads data/classes/<id>-tools.js, for a class with its own interactive parts.
FINALS.subjects = [
  { id: "ela", name: "ELA", category: "core", exam: "", unfinished: true },
  { id: "math", name: "Math", category: "core", exam: "", unfinished: true },
  { id: "science", name: "Science", category: "core", exam: "", unfinished: true },
  { id: "social-studies", name: "Social Studies", category: "core", exam: "", unfinished: true },
  { id: "pe-health", name: "PE / Health", category: "encore", exam: "", tools: true },
  { id: "spanish", name: "Spanish", category: "encore", exam: "", unfinished: true },
];
