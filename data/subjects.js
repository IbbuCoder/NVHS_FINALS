// Every class on the site. To add a class:
//   1. Add one line below.
//   2. Copy data/classes/_template.js to data/classes/<id>.js and fill it in.
// id: lowercase letters, numbers and dashes, same as the file name.
// category: "core" or "encore".
// exam: the class's final, "YYYY-MM-DD". Leave "" to use finalsDate from js/config.js.
// unfinished: true shows a "not filled in yet" warning on that class. Delete it when the class is done.
// tools: true also loads data/classes/<id>-tools.js, for a class with its own interactive parts.
// aliases: other names students might type for the class on the Share a notebook form.
//   Not used right now: shared notebooks are admin-only and never show to students.
//   They were for matching a typed class to its Lessons page, and are kept in case that
//   comes back. Case, spaces, punctuation and accents would not matter.
// The id ("ela" for English) is used for saved progress, so leave ids as they are.
FINALS.subjects = [
  { id: "ela", name: "English", category: "core", exam: "", unfinished: true,
    aliases: ["ELA", "Language Arts", "English Language Arts", "Reading"] },
  { id: "math", name: "Math", category: "core", exam: "", unfinished: true,
    aliases: ["Mathematics", "Algebra", "Geometry"] },
  { id: "science", name: "Science", category: "core", exam: "", unfinished: true,
    aliases: ["Sci"] },
  { id: "social-studies", name: "Social Studies", category: "core", exam: "", unfinished: true,
    aliases: ["History", "SS", "Social"] },
  { id: "pe-health", name: "PE / Health", category: "encore", exam: "", tools: true,
    aliases: ["PE", "Health", "Gym", "Physical Education"] },
  { id: "spanish", name: "Spanish", category: "encore", exam: "", unfinished: true,
    aliases: ["Espanol"] },
];
