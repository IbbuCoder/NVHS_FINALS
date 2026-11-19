/*
 * config.js — the ONE place for site-wide settings.
 * Change these values; you shouldn't need to touch any other file for them.
 */
window.SITE_CONFIG = {
  // Shown in the header and on the home page.
  siteTitle: "Finals Study Guide",

  // Your school's name. Leave "" to hide it.
  schoolName: "",

  // When finals start, in local time, format "YYYY-MM-DDTHH:MM".
  // Example: "2027-01-20T08:00". Leave "" to hide the countdown.
  finalsDate: "",

  // Where the "Share a notebook" form sends submissions.
  // While this still contains "REPLACE-ME", the form validates and shows a
  // preview but does NOT send anything.
  notebookFormEndpoint: "https://example.com/REPLACE-ME",
};
