// The hidden data page. It shows usage stats, messages, the feedback inbox, notebook
// submissions and accounts, and lets the owner act on them.
//
// Everything goes through the admin functions in the database. Their first argument, t,
// is EITHER the long admin key OR the owner account's session token:
//   - the key: open the page with it after # in the address, or type it into the box;
//   - the owner account: log in with its username and PIN (finals_login, owner must be true).
// Neither is stored in this repo. Whichever is used is kept in this tab's sessionStorage
// only, and Lock forgets it (and ends the owner session).
(function () {
  'use strict';

  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var KEY_STORE = 'finals-hq-key';
  var KIND_STORE = 'finals-hq-kind'; // 'key' or 'token'
  var DEVICE_KEY = 'finals-device'; // same random id the main site uses for this browser
  var cfg = window.FINALS_SUPABASE || {};
  var client = null;
  try {
    if (window.supabase && cfg.url && cfg.key) {
      client = window.supabase.createClient(cfg.url, cfg.key, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
      });
    }
  } catch (e) { client = null; }

  var CLASSES = {};
  ((window.FINALS && FINALS.subjects) || []).forEach(function (s) { CLASSES[s.id] = s.name; });
  var KINDS = { bug: 'Bug', 'wrong-answer': 'Wrong answer', idea: 'Idea', other: 'Other' };
  var KIND_ORDER = ['wrong-answer', 'bug', 'idea', 'other'];
  var STATUS = { pending: 'Waiting', approved: 'Approved', rejected: 'Rejected' };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function safeUrl(u) {
    try { return new URL(u).protocol === 'https:' ? u : ''; } catch (e) { return ''; }
  }
  function when(iso) {
    var d = new Date(iso);
    return isNaN(d) ? '' : d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  }
  function className(id) {
    return id ? (CLASSES[id] || id) : 'Not about one class';
  }
  function newestFirst(list) {
    return (list || []).slice().sort(function (a, b) { return String(b.created_at || '').localeCompare(String(a.created_at || '')); });
  }
  function num(n) {
    n = Number(n);
    return isFinite(n) ? n : 0;
  }
  // Who sent something: the account's name and username, or the name typed on the form.
  function sender(row) {
    var name = row.student_name || row.name || '';
    var user = row.username ? '@' + row.username : '';
    return name && user ? name + ' (' + user + ')' : name || user || 'no name';
  }

  function deviceId() {
    try {
      var d = localStorage.getItem(DEVICE_KEY);
      if (!d) {
        d = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
        localStorage.setItem(DEVICE_KEY, d);
      }
      return d;
    } catch (e) { return ''; }
  }

  /* ----- The key or owner token ----- */

  var memKey = '';
  var memKind = 'key';
  function getStored(name) {
    try { return sessionStorage.getItem(name) || ''; } catch (e) { return ''; }
  }
  function setKey(k, kind) {
    memKey = k;
    memKind = k ? (kind || 'key') : 'key';
    try {
      if (k) { sessionStorage.setItem(KEY_STORE, k); sessionStorage.setItem(KIND_STORE, memKind); }
      else { sessionStorage.removeItem(KEY_STORE); sessionStorage.removeItem(KIND_STORE); }
    } catch (e) { /* storage blocked: lasts until the page closes */ }
  }

  // #key in the address: keep it for this tab, then take it out of the address bar.
  // Returns true if a key was found there.
  function takeKeyFromAddress() {
    var h = location.hash.slice(1);
    if (!h) return false;
    try { h = decodeURIComponent(h); } catch (e) { /* use as is */ }
    setKey(h, 'key');
    history.replaceState(null, '', location.pathname + location.search);
    return true;
  }
  if (!takeKeyFromAddress()) { memKey = getStored(KEY_STORE); memKind = getStored(KIND_STORE) || 'key'; }

  /* ----- Messages and calls ----- */

  function say(html) { $('#hq-msg').innerHTML = html || ''; }

  function isWrongKey(err) {
    return err && (String(err.message || '').toLowerCase().indexOf('not allowed') > -1);
  }
  function plain(err) {
    var text = String((err && err.message) || '');
    if ((err && err.name === 'TypeError') || /failed to fetch|networkerror|load failed/i.test(text)) return 'Could not reach the server. Check your connection and try again.';
    // The database's own errors are already plain sentences.
    if (err && err.code === 'P0001' && text && text.length <= 300) return text;
    return 'Something went wrong. Try again in a minute.';
  }

  function showLock(message) {
    $('#hq-panel').hidden = true;
    $('#hq-lock').hidden = false;
    $('#hq-key').value = '';
    $('#hq-pin').value = '';
    say(message || '');
  }

  // Calls one admin function with t. Resolves to { data } or { error, wrongKey }.
  function call(name, args) {
    if (!client) return Promise.resolve({ error: 'This page needs an internet connection.' });
    var params = Object.assign({ t: memKey }, args || {});
    return client.rpc(name, params).then(function (res) {
      if (res.error) return { error: isWrongKey(res.error) ? 'That key didn\'t work.' : plain(res.error), wrongKey: isWrongKey(res.error) };
      return { data: res.data };
    }, function (err) {
      return { error: plain(err) };
    });
  }

  function handleWrongKey(res) {
    if (!res.wrongKey) return false;
    var wasToken = memKind === 'token';
    setKey('');
    showLock(wasToken ? '<b>Your owner session ended.</b> Log in again.' : '<b>That key didn\'t work.</b> Check it and try again.');
    return true;
  }

  /* ----- Drawing ----- */

  var data = { notebooks: [], feedback: [], visits: 0, online: 0, unread: 0 };
  var stats = null;
  var statsError = '';
  var threads = null;
  var accounts = null;
  var openThread = null; // { account_id, username, name, messages }
  var view = { filter: 'new', sort: 'date' };
  var busy = false;

  function bars(rows) {
    var max = rows.reduce(function (m, r) { return Math.max(m, r.n); }, 0) || 1;
    return '<ul class="hq-bars">' + rows.map(function (r) {
      return '<li' + (r.wide ? ' class="wide"' : '') + '>' +
        (r.wide ? '' : '<span class="label">' + esc(r.label) + '</span>') +
        (r.wide ? '<span class="label">' + esc(r.label) + (r.sub ? '<span class="sub">' + esc(r.sub) + '</span>' : '') + '</span>'
                : '<span class="bar"><i style="width:' + Math.round(r.n / max * 100) + '%"></i></span>') +
        '<b>' + esc(r.n) + '</b></li>';
    }).join('') + '</ul>';
  }

  // The last 30 days, newest first, with 0 for days that had no visits.
  function last30(perDay) {
    var counts = {};
    (perDay || []).forEach(function (d) { counts[String(d.day).slice(0, 10)] = num(d.n); });
    var rows = [];
    var today = new Date();
    for (var i = 0; i < 30; i++) {
      var d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
      var key = d.toISOString().slice(0, 10);
      rows.push({ label: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' }), n: counts[key] || 0 });
    }
    return rows;
  }

  function renderCharts() {
    var box = $('#hq-charts');
    if (!stats) {
      box.innerHTML = '<p class="hq-empty">' + esc(statsError || 'Loading...') + '</p>';
      return;
    }
    var classes = (stats.top_classes || []).map(function (c) { return { label: className(c.class_id), n: num(c.n) }; });
    var missed = (stats.most_missed || []).map(function (m) { return { label: m.question || '', sub: className(m.class_id), n: num(m.n), wide: true }; });
    box.innerHTML =
      '<section class="hq-chart"><h3>Visits per day, last 30 days</h3>' + bars(last30(stats.visits_per_day)) + '</section>' +
      '<section class="hq-chart"><h3>Most opened classes</h3>' + (classes.length ? bars(classes) : '<p class="hq-empty">No class opens yet.</p>') + '</section>' +
      '<section class="hq-chart"><h3>Most missed questions</h3>' + (missed.length ? bars(missed) : '<p class="hq-empty">No missed questions yet.</p>') + '</section>';
  }

  // A note the owner writes on a notebook or feedback item. Students see it in My submissions.
  function noteBox(kind, row) {
    var id = 'note-' + kind + '-' + esc(row.id);
    return '<div class="hq-note"><label for="' + id + '">Note to the student</label>' +
      '<textarea class="text-input" id="' + id + '" maxlength="300" rows="2">' + esc(row.owner_note || '') + '</textarea>' +
      '<div class="test-actions"><button type="button" class="btn" data-note="' + kind + '" data-id="' + esc(row.id) + '" data-for="' + id + '">Save note</button></div></div>';
  }

  function renderMessages() {
    var box = $('#hq-msgs');
    if (openThread) {
      var msgs = openThread.messages || [];
      box.innerHTML =
        '<div class="test-actions"><button type="button" class="btn ghost" data-thread-close>Back to all messages</button></div>' +
        '<h3 style="margin:14px 0 0;font:600 24px/1.15 var(--head)">' + esc(openThread.name || openThread.username || 'Student') + (openThread.username ? ' <span class="hq-meta">@' + esc(openThread.username) + '</span>' : '') + '</h3>' +
        (msgs.length ? '<ul class="chat">' + msgs.map(function (m) {
          var mine = !!m.from_owner; // on this page "mine" is the owner
          return '<li class="' + (mine ? 'mine' : 'owner') + '"><span class="chat-who">' + (mine ? 'You' : esc(openThread.name || 'Student')) + '</span>' + esc(m.body) + '<time>' + esc(when(m.created_at)) + '</time></li>';
        }).join('') + '</ul>' : '<p class="hq-empty">No messages in this thread.</p>') +
        '<form class="share-form chat-form" id="hq-reply-form" novalidate><label class="set-label" for="hq-reply">Reply</label>' +
        '<textarea class="text-input" id="hq-reply" maxlength="1000" rows="3"></textarea>' +
        '<div class="test-actions"><button type="submit" class="btn solid" id="hq-reply-go">Send reply</button></div></form>';
      return;
    }
    if (threads === null) { box.innerHTML = '<p class="hq-empty">Loading...</p>'; return; }
    var list = (threads || []).slice().sort(function (a, b) { return String(b.last_at || '').localeCompare(String(a.last_at || '')); });
    box.innerHTML = list.length
      ? list.map(function (th) {
          return '<button type="button" class="hq-thread" data-thread="' + esc(th.account_id) + '">' +
            '<b>' + esc(th.name || th.username || 'Student') + (th.username ? ' <span class="hq-meta">@' + esc(th.username) + '</span>' : '') + '</b>' +
            (num(th.unread) ? '<span class="hq-badge" aria-label="' + num(th.unread) + ' unread">' + num(th.unread) + '</span>' : '<span></span>') +
            '<span class="hq-meta">' + esc(String(th.last_body || '').slice(0, 120)) + ' ' + esc(when(th.last_at)) + '</span></button>';
        }).join('')
      : '<p class="hq-empty">No messages yet.</p>';
  }

  function renderFeedback() {
    $$('#hq-fb-filter button').forEach(function (b) {
      var on = b.dataset.filter === view.filter;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    $$('#hq-fb-sort button').forEach(function (b) {
      var on = b.dataset.sort === view.sort;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    var list = newestFirst(data.feedback).filter(function (f) {
      var status = f.status === 'done' ? 'done' : 'new';
      return view.filter === 'all' || status === view.filter;
    });
    if (view.sort === 'kind') {
      list.sort(function (a, b) {
        var ka = KIND_ORDER.indexOf(a.kind), kb = KIND_ORDER.indexOf(b.kind);
        return (ka < 0 ? 99 : ka) - (kb < 0 ? 99 : kb);
      });
    }
    $('#hq-feedback').innerHTML = list.length
      ? '<ul class="hq-list">' + list.map(function (f) {
          var done = f.status === 'done';
          return '<li class="hq-item' + (done ? ' is-done' : '') + '"><h3>' + esc(KINDS[f.kind] || f.kind || 'Feedback') + '</h3>' +
            '<p class="hq-meta"><span class="hq-status ' + (done ? 'rejected' : 'pending') + '">' + (done ? 'Done' : 'New') + '</span> ' +
              esc(className(f.class_id)) + '. From ' + esc(sender(f)) + '. ' + esc(when(f.created_at)) + '</p>' +
            '<p class="hq-message">' + esc(f.message) + '</p>' +
            '<div class="hq-actions">' +
              '<button type="button" class="btn' + (done ? '' : ' solid') + '" data-fb-status="' + (done ? 'new' : 'done') + '" data-id="' + esc(f.id) + '">' + (done ? 'Mark new' : 'Mark done') + '</button>' +
              '<button type="button" class="btn ghost" data-del="feedback" data-id="' + esc(f.id) + '">Delete</button></div>' +
            noteBox('feedback', f) + '</li>';
        }).join('') + '</ul>'
      : '<p class="hq-empty">' + (view.filter === 'new' ? 'No new feedback.' : view.filter === 'done' ? 'Nothing marked done yet.' : 'No feedback yet.') + '</p>';
  }

  function renderNotebooks() {
    var nb = newestFirst(data.notebooks);
    $('#hq-notebooks').innerHTML = nb.length
      ? '<ul class="hq-list">' + nb.map(function (n) {
          var url = safeUrl(n.url);
          var buttons = [
            n.status !== 'approved' ? '<button type="button" class="btn solid" data-set="approved" data-id="' + esc(n.id) + '">Approve</button>' : '',
            n.status !== 'rejected' ? '<button type="button" class="btn" data-set="rejected" data-id="' + esc(n.id) + '">Reject</button>' : '',
            n.status !== 'pending' ? '<button type="button" class="btn" data-set="pending" data-id="' + esc(n.id) + '">Back to pending</button>' : '',
            '<button type="button" class="btn ghost" data-del="notebook" data-id="' + esc(n.id) + '">Delete</button>'
          ].join('');
          // The class the student typed, shown as typed.
          return '<li class="hq-item"><h3>' + esc(n.class_id || 'No class given') + '</h3>' +
            '<p class="hq-meta"><span class="hq-status ' + esc(n.status) + '">' + esc(STATUS[n.status] || n.status) + '</span> From ' + esc(sender(n)) + '. ' + esc(when(n.created_at)) + '</p>' +
            (url ? '<a class="hq-link" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(url) + '</a>' : '<p class="hq-meta">' + esc(n.url) + '</p>') +
            '<div class="hq-actions">' + buttons + '</div>' + noteBox('notebook', n) + '</li>';
        }).join('') + '</ul>'
      : '<p class="hq-empty">No notebooks yet.</p>';
  }

  function renderAccounts() {
    var box = $('#hq-accounts');
    if (accounts === null) { box.innerHTML = '<p class="hq-empty">Loading...</p>'; return; }
    box.innerHTML = accounts.length
      ? '<ul class="hq-list">' + newestFirst(accounts).map(function (a) {
          return '<li class="hq-item"><h3>' + esc(a.name || a.username) + '</h3>' +
            '<p class="hq-meta">@' + esc(a.username) + (a.is_owner ? '<span class="hq-flag">Owner</span>' : '') + (a.locked ? '<span class="hq-flag warn">Locked</span>' : '') +
              ' Joined ' + esc(when(a.created_at)) + '</p>' +
            '<div class="hq-actions"><button type="button" class="btn" data-reset-pin="' + esc(a.id) + '" data-user="' + esc(a.username) + '">Reset PIN</button></div></li>';
        }).join('') + '</ul>'
      : '<p class="hq-empty">No accounts yet.</p>';
  }

  function render() {
    var waiting = data.notebooks.filter(function (n) { return n.status === 'pending'; }).length;
    var fresh = data.feedback.filter(function (f) { return f.status !== 'done'; }).length;
    var nowOnline = stats && stats.online != null ? num(stats.online) : num(data.online);
    $('#hq-stats').innerHTML =
      '<div class="hq-stat"><b>' + esc(num(data.visits)) + '</b><span>Visits</span></div>' +
      '<div class="hq-stat"><b>' + esc(nowOnline) + '</b><span>Studying now</span></div>' +
      '<div class="hq-stat"><b>' + esc(num(data.unread)) + '</b><span>Unread messages</span></div>' +
      '<div class="hq-stat"><b>' + fresh + '</b><span>New feedback</span></div>' +
      '<div class="hq-stat"><b>' + waiting + '</b><span>Notebooks waiting</span></div>';
    renderCharts();
    renderMessages();
    renderFeedback();
    renderNotebooks();
    renderAccounts();
  }

  function load(note) {
    if (!memKey) { showLock(''); return; }
    busy = true;
    $('#hq-refresh').disabled = true;
    say(note || 'Loading...');
    Promise.all([call('finals_admin_list'), call('finals_admin_stats'), call('finals_admin_threads'), call('finals_admin_accounts')]).then(function (all) {
      var res = all[0], st = all[1], th = all[2], ac = all[3];
      busy = false;
      $('#hq-refresh').disabled = false;
      if (all.some(handleWrongKey)) return;
      if (res.error) {
        if ($('#hq-panel').hidden) showLock('<b>' + esc(res.error) + '</b>');
        else say('<b>' + esc(res.error) + '</b>');
        return;
      }
      var d = res.data || {};
      data = { notebooks: d.notebooks || [], feedback: d.feedback || [], visits: d.visits || 0, online: d.online || 0, unread: d.unread_messages || 0 };
      stats = st.error ? null : (st.data || {});
      statsError = st.error ? 'The stats could not load. ' + st.error : '';
      threads = th.error ? [] : (th.data || []);
      accounts = ac.error ? [] : (ac.data || []);
      $('#hq-lock').hidden = true;
      $('#hq-panel').hidden = false;
      render();
      var problems = [th.error && 'Messages could not load.', ac.error && 'Accounts could not load.'].filter(Boolean).join(' ');
      say((note && note !== 'Loading...' ? note + ' ' : '') + esc(problems));
    });
  }

  function openThreadFor(accountId, note) {
    var th = (threads || []).filter(function (x) { return String(x.account_id) === String(accountId); })[0] || { account_id: accountId };
    call('finals_admin_thread', { p_account: accountId }).then(function (res) {
      if (handleWrongKey(res)) return;
      if (res.error) { say('<b>That thread could not load.</b> ' + esc(res.error)); return; }
      openThread = { account_id: accountId, username: th.username, name: th.name, messages: res.data || [] };
      // Opening a thread marks it read, so the unread counts change.
      th.unread = 0;
      data.unread = (threads || []).reduce(function (s, x) { return s + num(x.unread); }, 0);
      render();
      say(note || '');
      var reply = $('#hq-reply');
      if (reply) reply.focus({ preventScroll: true });
    });
  }

  /* ----- Buttons ----- */

  $('#hq-key-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var k = $('#hq-key').value.trim();
    if (!k) { say('<b>Type the admin key.</b>'); return; }
    $('#hq-key').value = '';
    setKey(k, 'key');
    load();
  });

  $('#hq-pin-toggle').addEventListener('click', function () {
    var input = $('#hq-pin');
    var show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    this.textContent = show ? 'Hide' : 'Show';
    this.setAttribute('aria-pressed', String(show));
  });

  // Owner login: the returned session token is used as t, for this tab only.
  $('#hq-login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var user = $('#hq-user').value.trim();
    var pin = $('#hq-pin').value;
    if (!user || !pin) { say('<b>Type the owner username and PIN.</b>'); return; }
    if (!client) { say('<b>This page needs an internet connection.</b>'); return; }
    $('#hq-login-go').disabled = true;
    say('Logging in...');
    client.rpc('finals_login', { p_username: user, p_pin: pin }).then(function (res) {
      $('#hq-login-go').disabled = false;
      $('#hq-pin').value = '';
      if (res.error) { say('<b>' + esc(plain(res.error)) + '</b>'); return; }
      var d = res.data || {};
      if (d.ok === false || !d.token) { say('<b>' + esc(d.error || 'That username and PIN don\'t match.') + '</b>'); return; }
      if (!d.owner) {
        client.rpc('finals_logout', { p_token: d.token });
        say('<b>That account isn\'t the site owner\'s.</b>');
        return;
      }
      setKey(d.token, 'token');
      load();
    }, function (err) {
      $('#hq-login-go').disabled = false;
      say('<b>' + esc(plain(err)) + '</b>');
    });
  });

  $('#hq-refresh').addEventListener('click', function () {
    if (busy) return;
    if (openThread) openThreadFor(openThread.account_id);
    load();
  });

  $('#hq-lockbtn').addEventListener('click', function () {
    if (memKind === 'token' && client && memKey) client.rpc('finals_logout', { p_token: memKey });
    setKey('');
    data = { notebooks: [], feedback: [], visits: 0, online: 0, unread: 0 };
    stats = null; threads = null; accounts = null; openThread = null;
    showLock('Locked. The key or owner login was removed from this tab.');
  });

  $('#hq-fb-filter').addEventListener('click', function (e) {
    var b = e.target.closest('[data-filter]');
    if (b) { view.filter = b.dataset.filter; renderFeedback(); }
  });
  $('#hq-fb-sort').addEventListener('click', function (e) {
    var b = e.target.closest('[data-sort]');
    if (b) { view.sort = b.dataset.sort; renderFeedback(); }
  });

  $('#hq-exclude').addEventListener('click', function () {
    var dev = deviceId();
    if (!dev) { say('<b>This browser blocks storage, so it has no device id to exclude.</b>'); return; }
    if (!window.confirm('This device will no longer be counted in stats.')) return;
    var btn = $('#hq-exclude');
    btn.disabled = true;
    call('finals_admin_exclude_device', { dev: dev }).then(function (res) {
      btn.disabled = false;
      if (handleWrongKey(res)) return;
      say(res.error ? '<b>That didn\'t work.</b> ' + esc(res.error) : 'Done. This device is no longer counted in stats.');
    });
  });

  $('#hq-msgs').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!openThread) return;
    var body = $('#hq-reply').value.trim();
    if (!body) { say('<b>Write a reply first.</b>'); return; }
    $('#hq-reply-go').disabled = true;
    call('finals_admin_reply', { p_account: openThread.account_id, p_body: body.slice(0, 1000) }).then(function (res) {
      if (handleWrongKey(res)) return;
      if (res.error) { $('#hq-reply-go').disabled = false; say('<b>Your reply was not sent.</b> ' + esc(res.error)); return; }
      openThreadFor(openThread.account_id, 'Reply sent.');
      call('finals_admin_threads').then(function (th) { if (!th.error) { threads = th.data || []; } });
    });
  });

  document.addEventListener('click', function (e) {
    var th = e.target.closest('[data-thread]');
    if (th) { openThreadFor(th.dataset.thread); return; }
    if (e.target.closest('[data-thread-close]')) { openThread = null; load(); return; }

    var noteBtn = e.target.closest('[data-note]');
    if (noteBtn) {
      var text = ($('#' + noteBtn.dataset.for) || {}).value || '';
      noteBtn.disabled = true;
      call('finals_admin_note', { p_kind: noteBtn.dataset.note, p_id: noteBtn.dataset.id, p_note: text.trim().slice(0, 300) }).then(function (res) {
        noteBtn.disabled = false;
        if (handleWrongKey(res)) return;
        say(res.error ? '<b>The note was not saved.</b> ' + esc(res.error) : 'Note saved.');
        if (!res.error) {
          var list = noteBtn.dataset.note === 'feedback' ? data.feedback : data.notebooks;
          list.forEach(function (r) { if (String(r.id) === noteBtn.dataset.id) r.owner_note = text.trim().slice(0, 300); });
        }
      });
      return;
    }

    var reset = e.target.closest('[data-reset-pin]');
    if (reset) {
      var who = '@' + reset.dataset.user;
      var pin = window.prompt('New PIN for ' + who + ' (4 or more characters):');
      if (pin === null) return;
      if (pin.length < 4) { say('<b>The new PIN needs at least 4 characters.</b>'); return; }
      if (!window.confirm('Set the new PIN for ' + who + '? Tell them the new PIN yourself.')) return;
      reset.disabled = true;
      call('finals_admin_reset_pin', { p_account: reset.dataset.resetPin, p_new_pin: pin }).then(function (res) {
        reset.disabled = false;
        if (handleWrongKey(res)) return;
        say(res.error ? '<b>The PIN was not changed.</b> ' + esc(res.error) : 'New PIN set for ' + esc(who) + '.');
      });
      return;
    }

    var set = e.target.closest('[data-set]');
    var fbs = e.target.closest('[data-fb-status]');
    var del = e.target.closest('[data-del]');
    if (!set && !fbs && !del) return;
    if (del && !window.confirm(del.dataset.del === 'feedback' ? 'Delete this feedback for good?' : 'Delete this notebook for good?')) return;
    var btn = set || fbs || del;
    btn.disabled = true;
    var p = set ? call('finals_admin_set_notebook', { nb_id: set.dataset.id, new_status: set.dataset.set })
      : fbs ? call('finals_admin_set_feedback', { fb_id: fbs.dataset.id, new_status: fbs.dataset.fbStatus })
      : call('finals_admin_delete', { kind: del.dataset.del, row_id: del.dataset.id });
    p.then(function (res) {
      if (handleWrongKey(res)) return;
      if (res.error) { btn.disabled = false; say('<b>That didn\'t work.</b> ' + esc(res.error)); return; }
      var note = set ? (set.dataset.set === 'approved' ? 'Approved.' : set.dataset.set === 'rejected' ? 'Rejected.' : 'Moved back to pending.')
        : fbs ? (fbs.dataset.fbStatus === 'done' ? 'Marked done.' : 'Marked new.') : 'Deleted.';
      load(note);
    });
  });

  // A key pasted onto the address while the page is already open works too.
  window.addEventListener('hashchange', function () {
    if (takeKeyFromAddress()) load();
  });

  load();
})();
