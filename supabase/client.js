// Everything the site does with Supabase goes through window.FinalsDB.
// It uses supabase-js (loaded from the CDN in index.html) and the settings in supabase/config.js.
//
// What it does:
//   - optional student accounts: a custom username and PIN login built in the database
//     (finals_signup, finals_login, finals_me, finals_logout). This is NOT Supabase Auth.
//     The session token the database returns is kept in localStorage by js/main.js.
//   - sends feedback and notebook submissions. Logged in: finals_submit_feedback and
//     finals_submit_notebook with the token. Logged out: a direct insert with a typed name.
//     Notebooks are admin-only; the site never reads them back.
//   - My submissions (finals_my_items) and messages with the site's owner
//     (finals_send_message, finals_my_messages, finals_my_unread).
//   - counts visits, class opens and missed questions (finals_track), shows who is studying
//     now (finals_ping, finals_online_count). These send a random device id and the name if
//     known, nothing else. The database itself skips the site owner's name and excluded devices.
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
      // Supabase Auth isn't used at all: accounts are the database's own username + PIN.
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

  // The account and message functions raise errors whose message is already a plain
  // sentence written for students (for example "That notebook was already shared. Thanks!").
  // Show those as they are; anything else (network trouble) becomes one of ours.
  function sentence(err) {
    var msg = String((err && err.message) || '').trim();
    var dbSentence = err && (err.code === 'P0001' || err.code === 'P0002') && msg && msg.length <= 300;
    return dbSentence ? msg : plain(err);
  }

  // Runs a database function by name and resolves to { data, error } with a plain sentence.
  function rpc(name, args) {
    if (!client) return Promise.resolve(fail(MSG.offline));
    var p;
    try { p = client.rpc(name, args || {}); } catch (e) { return Promise.resolve(fail(e)); }
    return Promise.resolve(p).then(function (res) {
      if (res && res.error) return { data: null, error: sentence(res.error) };
      return ok(res ? res.data : null);
    }, fail);
  }

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

    /* ----- Accounts (the database's own username + PIN, not Supabase Auth) ----- */

    // { ok, token, username, name, owner }, or error is the database's plain sentence.
    signup: function (username, name, pin) {
      return rpc('finals_signup', { p_username: username, p_name: name, p_pin: pin });
    },
    // A wrong username or PIN comes back as { ok: false, error }, turned into error here.
    login: function (username, pin) {
      return rpc('finals_login', { p_username: username, p_pin: pin }).then(function (res) {
        if (res.error) return res;
        var d = res.data || {};
        if (d.ok === false || !d.token) return { data: null, error: d.error || 'That username and PIN don\'t match.' };
        return res;
      });
    },
    logout: function (token) {
      return rpc('finals_logout', { p_token: token });
    },
    // { username, name, owner } for a working session, or null when it has ended.
    me: function (token) {
      return rpc('finals_me', { p_token: token });
    },

    /* ----- Things a logged-in student does ----- */

    submitNotebookAs: function (token, className, url) {
      return rpc('finals_submit_notebook', { p_token: token, p_class: className, p_url: url });
    },
    submitFeedbackAs: function (token, kind, classId, message) {
      return rpc('finals_submit_feedback', { p_token: token, p_kind: kind, p_class: classId || null, p_message: message });
    },
    // { notebooks: [...], feedback: [...] } with status and owner_note.
    myItems: function (token) {
      return rpc('finals_my_items', { p_token: token });
    },
    sendMessage: function (token, body) {
      return rpc('finals_send_message', { p_token: token, p_body: body });
    },
    // [{ from_owner, body, created_at }], oldest first.
    myMessages: function (token) {
      return rpc('finals_my_messages', { p_token: token });
    },
    myUnread: function (token) {
      return rpc('finals_my_unread', { p_token: token });
    },

    /* ----- Logged out: the anonymous forms (unchanged) ----- */

    // Feedback. kind is bug, wrong-answer, idea or other. studentName is required (1-60 characters).
    sendFeedback: function (kind, classId, message, studentName) {
      return run(function () {
        return client.from('finals_feedback').insert({ kind: kind, class_id: classId || null, message: message, student_name: studentName });
      });
    },

    // Anonymous notebook submission. It always goes in as pending, so nothing shows on the
    // site until the admin approves it. The row isn't read back, because anonymous visitors
    // can add rows but not read them.
    // className is what the student typed (up to 40 characters); it goes in class_id.
    submitNotebook: function (className, url, studentName) {
      return run(function () {
        return client.from('finals_notebooks').insert({ class_id: className, url: url, status: 'pending', student_name: studentName });
      });
    },

    // Usage counts. kind is 'visit', 'class_open' or 'miss'. ref is the missed question.
    track: function (kind, classId, ref, device, student) {
      return run(function () {
        return client.rpc('finals_track', { kind: kind, class_id: classId || null, ref: ref || null, device: device || null, student: student || null });
      });
    },

    // "I'm here", sent every minute while the tab is visible.
    ping: function (device, student) {
      return run(function () { return client.rpc('finals_ping', { device: device || null, student: student || null }); });
    },

    // How many students were active in the last 2 minutes.
    onlineCount: function () {
      return run(function () { return client.rpc('finals_online_count'); });
    }
  };
})();
