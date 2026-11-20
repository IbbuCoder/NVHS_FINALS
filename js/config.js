// Site settings. Change these values; no other file needs to change for them.
window.FINALS_CONFIG = {
  // NOT FINISHED NOTICE. While this is true, the site shows a "still being built" popup
  // every time it opens, and a strip under the top bar on every page.
  // When the site is finished, change true to false.
  notFinished: true,

  // Name in the top bar and on Home.
  siteTitle: 'Finals',

  // Your school's name. Leave '' to hide it.
  schoolName: '',

  // The default finals date for every class, as 'YYYY-MM-DD'. Leave '' for none.
  // A class can set its own date with exam: '...' in data/subjects.js.
  // With no date, the countdown and the day-by-day plan stay hidden.
  finalsDate: ''

  // Approved notebooks, feedback and the visit count use Supabase.
  // Its settings are in supabase/config.js.
};
