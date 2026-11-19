// Everything the site does with Supabase goes through window.FinalsDB.
// It uses supabase-js (loaded from the CDN in index.html) and the settings in supabase/config.js.
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
      client = window.supabase.createClient(cfg.url, cfg.key, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'implicit' }
      });
    }
  } catch (e) {
    client = null;
  }

  var MSG = {
    offline: 'Accounts and shared notebooks need an internet connection. Everything else still works.',
    network: 'Could not reach the server. Check your internet connection and try again.',
    school: 'Use your school email. It ends in @' + (cfg.emailDomain || 'k12.ipsd.org') + '.',
    general: 'Something went wrong. Try again in a minute.'
  };

  // Turns any Supabase or network error into a plain sentence.
  function plain(err) {
    if (!err) return null;
    var code = String(err.code || '');
    var text = String(err.message || err.error_description || '').toLowerCase();
    if (err.name === 'TypeError' || /failed to fetch|networkerror|network request failed|load failed/.test(text)) return MSG.network;
    if (code === 'invalid_credentials' || /invalid login credentials/.test(text)) return 'That email and password don\'t match. Check them and try again.';
    if (code === 'email_not_confirmed' || /email not confirmed/.test(text)) return 'Confirm your account first. Open the link we sent to your school email.';
    if (code === 'user_already_exists' || code === 'email_exists' || /already registered|already exists/.test(text)) return 'There is already an account with that email. Sign in instead.';
    if (code === 'weak_password' || /password should be|weak password/.test(text)) return 'Use a longer password, at least 8 characters.';
    if (code === 'same_password') return 'Pick a password you haven\'t used on this account before.';
    if (code === 'over_email_send_rate_limit' || code === 'over_request_rate_limit' || err.status === 429 || /rate limit|too many/.test(text)) return 'Too many tries. Wait a few minutes and try again.';
    if (/k12\.ipsd\.org|domain|database error saving new user|not allowed/.test(text) || code === 'signup_disabled') return MSG.school;
    if (code === 'otp_expired' || /expired|invalid.*link/.test(text)) return 'That link has expired or was already used. Ask for a new one.';
    if (code === 'session_not_found' || code === 'refresh_token_not_found' || /jwt|session/.test(text)) return 'Your sign-in ran out. Sign in again.';
    if (code === '23505') return 'That notebook link has already been shared. Each notebook can only be added once.';
    if (code === '23514' || code === '22P02' || code === '23502') return 'Some of that information isn\'t accepted. Check it and try again.';
    if (code === '42501' || code === 'PGRST301' || err.status === 401 || err.status === 403) return 'You don\'t have permission to do that. Try signing in again.';
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

  function isSchoolEmail(email) {
    var domain = String(cfg.emailDomain || 'k12.ipsd.org').toLowerCase();
    var e = String(email || '').trim().toLowerCase();
    return /^[^\s@]+@[^\s@]+$/.test(e) && e.slice(-(domain.length + 1)) === '@' + domain;
  }

  // The page the email links come back to (this page, without the #part).
  function siteUrl() {
    return location.origin + location.pathname;
  }

  var currentUser = null;
  var listeners = [];
  var readyResolve;
  var whenReady = new Promise(function (r) { readyResolve = r; });

  if (client) {
    client.auth.getSession().then(function (res) {
      currentUser = res && res.data && res.data.session ? res.data.session.user : null;
      readyResolve();
    }, function () { readyResolve(); });
    client.auth.onAuthStateChange(function (event, session) {
      currentUser = session ? session.user : null;
      listeners.forEach(function (fn) { try { fn(event, currentUser); } catch (e) { /* keep going */ } });
    });
  } else {
    readyResolve();
  }

  window.FinalsDB = {
    ready: function () { return !!client; },
    whenReady: function () { return whenReady; },
    offlineMessage: MSG.offline,
    isSchoolEmail: isSchoolEmail,
    schoolMessage: MSG.school,
    user: function () { return currentUser; },
    // fn(event, user). Events: SIGNED_IN, SIGNED_OUT, PASSWORD_RECOVERY, USER_UPDATED, TOKEN_REFRESHED.
    onChange: function (fn) { listeners.push(fn); },

    /* ----- Accounts (email and password only) ----- */

    signIn: function (email, password) {
      if (!isSchoolEmail(email)) return Promise.resolve(fail(MSG.school));
      return run(function () { return client.auth.signInWithPassword({ email: email.trim(), password: password }); });
    },
    signUp: function (email, password, displayName) {
      if (!isSchoolEmail(email)) return Promise.resolve(fail(MSG.school));
      var meta = displayName ? { display_name: displayName } : {};
      return run(function () {
        return client.auth.signUp({ email: email.trim(), password: password, options: { data: meta, emailRedirectTo: siteUrl() } });
      });
    },
    signOut: function () {
      return run(function () { return client.auth.signOut(); });
    },
    sendReset: function (email) {
      if (!isSchoolEmail(email)) return Promise.resolve(fail(MSG.school));
      return run(function () { return client.auth.resetPasswordForEmail(email.trim(), { redirectTo: siteUrl() }); });
    },
    setPassword: function (password) {
      return run(function () { return client.auth.updateUser({ password: password }); });
    },
    isAdmin: function () {
      if (!currentUser) return Promise.resolve(ok(false));
      return run(function () { return client.rpc('finals_is_admin'); }).then(function (res) {
        return ok(res.error ? false : res.data === true);
      });
    },

    /* ----- Profile: only an optional display name ----- */

    getProfile: function () {
      if (!currentUser) return Promise.resolve(ok(null));
      return run(function () {
        return client.from('finals_profiles').select('display_name').eq('id', currentUser.id).maybeSingle();
      });
    },
    saveProfile: function (displayName) {
      if (!currentUser) return Promise.resolve(fail('Sign in first.'));
      return run(function () {
        return client.from('finals_profiles').upsert({ id: currentUser.id, display_name: displayName || null }, { onConflict: 'id' });
      });
    },

    /* ----- Shared NotebookLM notebooks ----- */

    approvedNotebooks: function (classId) {
      return run(function () {
        return client.from('finals_notebooks').select('id, class_id, title, url, created_at')
          .eq('status', 'approved').eq('class_id', classId).order('created_at', { ascending: false });
      });
    },
    myNotebooks: function () {
      if (!currentUser) return Promise.resolve(ok([]));
      return run(function () {
        return client.from('finals_notebooks').select('id, class_id, title, url, status, created_at')
          .eq('submitted_by', currentUser.id).order('created_at', { ascending: false });
      });
    },
    // submitted_by fills itself in the database.
    submitNotebook: function (classId, title, url) {
      if (!currentUser) return Promise.resolve(fail('Sign in with your school email to share a notebook.'));
      return run(function () {
        return client.from('finals_notebooks').insert({ class_id: classId, title: title, url: url, status: 'pending' });
      });
    },
    pendingNotebooks: function () {
      return run(function () {
        return client.from('finals_notebooks').select('id, class_id, title, url, status, created_at')
          .eq('status', 'pending').order('created_at', { ascending: true });
      });
    },
    setNotebookStatus: function (id, status) {
      return run(function () { return client.from('finals_notebooks').update({ status: status }).eq('id', id); });
    },
    deleteNotebook: function (id) {
      return run(function () { return client.from('finals_notebooks').delete().eq('id', id); });
    },

    /* ----- Feedback ----- */

    sendFeedback: function (kind, classId, message) {
      return run(function () {
        return client.from('finals_feedback').insert({ kind: kind, class_id: classId || null, message: message });
      });
    },

    /* ----- Visit count: no personal data, once per browser session ----- */

    countVisit: function () {
      return run(function () { return client.rpc('finals_count_visit'); });
    },

    /* ----- Progress sync (one row per class, key 'progress') ----- */

    loadProgress: function () {
      if (!currentUser) return Promise.resolve(ok([]));
      return run(function () {
        return client.from('finals_progress').select('class_id, key, value, updated_at').eq('user_id', currentUser.id);
      });
    },
    saveProgress: function (classId, value, updatedAt) {
      if (!currentUser) return Promise.resolve(fail('Sign in first.'));
      return run(function () {
        return client.from('finals_progress').upsert(
          { user_id: currentUser.id, class_id: classId, key: 'progress', value: value, updated_at: updatedAt },
          { onConflict: 'user_id,class_id,key' });
      });
    },
    deleteMyProgress: function () {
      if (!currentUser) return Promise.resolve(fail('Sign in first.'));
      return run(function () { return client.from('finals_progress').delete().eq('user_id', currentUser.id); });
    }
  };
})();
