// Everything the site does with Supabase goes through window.FinalsDB.
// It uses supabase-js (loaded from the CDN in index.html) and the settings in supabase/config.js.
//
// The site has no accounts. It only:
//   - reads approved notebooks (finals_notebooks, status = approved)
//   - sends anonymous feedback (finals_feedback)
//   - sends anonymous notebook submissions (finals_notebooks, always status = pending)
//   - counts a visit once per browser session (finals_count_visit)
//
// Every call returns a Promise of { data, error }. error is null or a plain sentence
// that is safe to show on the page. Raw Supabase errors are never shown.
// If the CDN can't load (offline), FinalsDB.ready() is false and the rest of the site still works.
(function () {
  'use strict';

  var cfg = window.FINALS_SUPABASE || {};
  var client = null;
  try {
    if (window.supabase && cfg.url && cfg.key) {
      // No sign-in, so nothing about a session is saved or read.
      client = window.supabase.createClient(cfg.url, cfg.key, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
      });
    }
  } catch (e) {
    client = null;
  }

  var MSG = {
    offline: 'This needs an internet connection. Everything else on the site still works.',
    network: 'Could not reach the server. Check your internet connection and try again.',
    general: 'Something went wrong. Try again in a minute.'
  };

  // Turns any Supabase or network error into a plain sentence.
  function plain(err) {
    if (!err) return null;
    var code = String(err.code || '');
    var text = String(err.message || '').toLowerCase();
    if (err.name === 'TypeError' || /failed to fetch|networkerror|network request failed|load failed/.test(text)) return MSG.network;
    if (code === 'over_request_rate_limit' || err.status === 429 || /rate limit|too many/.test(text)) return 'Too many tries. Wait a few minutes and try again.';
    if (code === '23505') return 'That notebook link has already been shared.';
    // A row the database's rules refuse (for example a link that isn't from NotebookLM).
    if (code === '42501' || code === '23514' || code === '22P02' || code === '23502') return 'Some of that information isn\'t accepted. Check it and try again.';
    return MSG.general;
  }

  function ok(data) { return { data: data === undefined ? null : data, error: null }; }
  function fail(err) { return { data: null, error: typeof err === 'string' ? err : plain(err) }; }

  // Runs a supabase-js call and always resolves to { data, error }.
  function run(fn) {
    if (!client) return Promise.resolve(fail(MSG.offline));
    var p;
    try { p = fn(); } catch (e) { return Promise.resolve(fail(e)); }
    return Promise.resolve(p).then(function (res) {
      if (res && res.error) return fail(res.error);
      return ok(res ? res.data : null);
    }, fail);
  }

  window.FinalsDB = {
    ready: function () { return !!client; },
    offlineMessage: MSG.offline,

    // Approved NotebookLM notebooks for one class.
    approvedNotebooks: function (classId) {
      return run(function () {
        return client.from('finals_notebooks').select('id, class_id, title, url, created_at')
          .eq('status', 'approved').eq('class_id', classId).order('created_at', { ascending: false });
      });
    },

    // Anonymous feedback. kind is bug, wrong-answer, idea or other.
    sendFeedback: function (kind, classId, message) {
      return run(function () {
        return client.from('finals_feedback').insert({ kind: kind, class_id: classId || null, message: message });
      });
    },

    // Anonymous notebook submission. It always goes in as pending, so nothing shows on the
    // site until the admin approves it. The row isn't read back, because anonymous visitors
    // can add rows but not read them.
    submitNotebook: function (classId, title, url) {
      return run(function () {
        return client.from('finals_notebooks').insert({ class_id: classId, title: title, url: url, status: 'pending' });
      });
    },

    // Once per browser session. Sends nothing about the person.
    countVisit: function () {
      return run(function () { return client.rpc('finals_count_visit'); });
    }
  };
})();
