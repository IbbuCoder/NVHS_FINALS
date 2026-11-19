/*
 * subjects.js — the list of every class on the site.
 *
 * To add a class:
 *   1. Add one entry below.
 *   2. Create data/subjects/<id>.js (copy data/subjects/_template.js).
 *
 * Fields:
 *   id        lowercase letters, numbers, dashes. Must match the file name.
 *   name      shown on cards and pages
 *   category  "core" or "encore"
 *   grade     e.g. "8" or "7–8". Use null if it's not grade-specific.
 *   color     accent color for the card (hex). Used for borders, not text.
 */
STUDY_DATA.subjects = [
  // ----- Core -----
  { id: "math",           name: "Math",           category: "core",   grade: null, color: "#2456d3" },
  { id: "ela",            name: "ELA",            category: "core",   grade: null, color: "#7c3aed" },
  { id: "science",        name: "Science",        category: "core",   grade: null, color: "#0f8a5f" },
  { id: "social-studies", name: "Social Studies", category: "core",   grade: null, color: "#b45309" },

  // ----- Encore -----
  { id: "art",            name: "Art",            category: "encore", grade: null, color: "#db2777" },
  { id: "band",           name: "Band",           category: "encore", grade: null, color: "#ca8a04" },
  { id: "pe-health",      name: "PE / Health",    category: "encore", grade: null, color: "#dc2626" },
  { id: "spanish",        name: "Spanish",        category: "encore", grade: null, color: "#0891b2" },
  { id: "tech",           name: "Tech",           category: "encore", grade: null, color: "#4f46e5" },
];
