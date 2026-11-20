// Every class on the site. To add a class:
//   1. Add one line below.
//   2. Copy data/classes/_template.js to data/classes/<id>.js and fill it in.
// id: lowercase letters, numbers and dashes, same as the file name.
// category: "core" or "encore".
// exam: the class's final, "YYYY-MM-DD". Leave "" to use finalsDate from js/config.js.
// tools: true also loads data/classes/<id>-tools.js, for a class with its own interactive parts.
FINALS.subjects = [
  { id: "ela", name: "ELA", category: "core", exam: "" },
  { id: "math", name: "Math", category: "core", exam: "" },
  { id: "science", name: "Science", category: "core", exam: "" },
  { id: "social-studies", name: "Social Studies", category: "core", exam: "" },
  { id: "art", name: "Art", category: "encore", exam: "" },
  { id: "band", name: "Band", category: "encore", exam: "" },
  { id: "pe-health", name: "PE / Health", category: "encore", exam: "", tools: true },
  { id: "spanish", name: "Spanish", category: "encore", exam: "" },
  { id: "tech", name: "Tech", category: "encore", exam: "" },
];
