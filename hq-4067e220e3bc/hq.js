// The hidden data page. It shows usage stats, the feedback inbox and notebook submissions,
// and lets the admin approve, reject, mark done or delete them.
//
// Everything goes through the admin functions in the database (finals_admin_list,
// finals_admin_stats, finals_admin_set_notebook, finals_admin_set_feedback,
// finals_admin_delete, finals_admin_exclude_device). Each one needs the admin key.
// The key is never stored in this repo: open the page with the key after # in the address.
// It is kept in this tab's sessionStorage only and removed from the address bar right away.
(function () {
  'use strict';

  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var KEY_STORE = 'finals-hq-key';
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

  /* ----- The key ----- */

  var memKey = '';
  function getKey() {
    try { return sessionStorage.getItem(KEY_STORE) || ''; } catch (e) { return ''; }
  }
  function setKey(k) {
    try {
      if (k) sessionStorage.setItem(KEY_STORE, k);
      else sessionStorage.removeItem(KEY_STORE);
    } catch (e) { /* storage blocked: the key lasts until the page closes */ }
    memKey = k;
  }

  // #key in the address: keep it for this tab, then take it out of the address bar.
  // Returns true if a key was found there.
  function takeKeyFromAddress() {
    var h = location.hash.slice(1);
    if (!h) return false;
    try { h = decodeURIComponent(h); } catch (e) { /* use as is */ }
    setKey(h);
    history.replaceState(null, '', location.pathname + location.search);
    return true;
  }
  if (!takeKeyFromAddress()) memKey = getKey();

  /* ----- Messages and calls ----- */

  function say(html) { $('#hq-msg').innerHTML = html || ''; }

  function isWrongKey(err) {
    return err && (String(err.message || '').toLowerCase().indexOf('not allowed') > -1 || err.code === 'P0001');
  }
  function plain(err) {
    var text = String((err && err.message) || '').toLowerCase();
    if ((err && err.name === 'TypeError') || /failed to fetch|networkerror|load failed/.test(text)) return 'Could not reach the server. Check your connection and try again.';
    return 'Something went wrong. Try again in a minute.';
  }

  function showLock(message) {
    $('#hq-panel').hidden = true;
    $('#hq-lock').hidden = false;
    $('#hq-key').value = '';
    say(message || '');
    $('#hq-key').focus();
  }

  // Calls one admin function with the key. Resolves to { data } or { error, wrongKey }.
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
    setKey('');
    showLock('<b>That key didn\'t work.</b> Check it and try again.');
    return true;
  }

  /* ----- Drawing ----- */

  var data = { notebooks: [], feedback: [], visits: 0, online: 0 };
  var stats = null;
  var statsError = '';
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
              esc(className(f.class_id)) + '. From ' + esc(f.student_name || 'no name') + '. ' + esc(when(f.created_at)) + '</p>' +
            '<p class="hq-message">' + esc(f.message) + '</p>' +
            '<div class="hq-actions">' +
              '<button type="button" class="btn' + (done ? '' : ' solid') + '" data-fb-status="' + (done ? 'new' : 'done') + '" data-id="' + esc(f.id) + '">' + (done ? 'Mark new' : 'Mark done') + '</button>' +
              '<button type="button" class="btn ghost" data-del="feedback" data-id="' + esc(f.id) + '">Delete</button></div></li>';
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
            '<p class="hq-meta"><span class="hq-status ' + esc(n.status) + '">' + esc(STATUS[n.status] || n.status) + '</span> From ' + esc(n.student_name || 'no name') + '. ' + esc(when(n.created_at)) + '</p>' +
            (url ? '<a class="hq-link" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(url) + '</a>' : '<p class="hq-meta">' + esc(n.url) + '</p>') +
            '<div class="hq-actions">' + buttons + '</div></li>';
        }).join('') + '</ul>'
      : '<p class="hq-empty">No notebooks yet.</p>';
  }

  function render() {
    var waiting = data.notebooks.filter(function (n) { return n.status === 'pending'; }).length;
    var fresh = data.feedback.filter(function (f) { return f.status !== 'done'; }).length;
    var nowOnline = stats && stats.online != null ? num(stats.online) : num(data.online);
    $('#hq-stats').innerHTML =
      '<div class="hq-stat"><b>' + esc(num(data.visits)) + '</b><span>Visits</span></div>' +
      '<div class="hq-stat"><b>' + esc(nowOnline) + '</b><span>Studying now</span></div>' +
      '<div class="hq-stat"><b>' + fresh + '</b><span>New feedback</span></div>' +
      '<div class="hq-stat"><b>' + waiting + '</b><span>Notebooks waiting</span></div>';
    renderCharts();
    renderFeedback();
    renderNotebooks();
  }

  function load(note) {
    if (!memKey) { showLock(''); return; }
    busy = true;
    $('#hq-refresh').disabled = true;
    say(note || 'Loading...');
    Promise.all([call('finals_admin_list'), call('finals_admin_stats')]).then(function (both) {
      var res = both[0], st = both[1];
      busy = false;
      $('#hq-refresh').disabled = false;
      if (handleWrongKey(res) || handleWrongKey(st)) return;
      if (res.error) {
        if ($('#hq-panel').hidden) showLock('<b>' + esc(res.error) + '</b>');
        else say('<b>' + esc(res.error) + '</b>');
        return;
      }
      var d = res.data || {};
      data = { notebooks: d.notebooks || [], feedback: d.feedback || [], visits: d.visits || 0, online: d.online || 0 };
      stats = st.error ? null : (st.data || {});
      statsError = st.error ? 'The stats could not load. ' + st.error : '';
      $('#hq-lock').hidden = true;
      $('#hq-panel').hidden = false;
      render();
      say(note && note !== 'Loading...' ? note : '');
    });
  }

  /* ----- Buttons ----- */

  $('#hq-key-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var k = $('#hq-key').value.trim();
    if (!k) { say('<b>Type the admin key.</b>'); return; }
    $('#hq-key').value = '';
    setKey(k);
    load();
  });

  $('#hq-refresh').addEventListener('click', function () { if (!busy) load(); });

  $('#hq-lockbtn').addEventListener('click', function () {
    setKey('');
    data = { notebooks: [], feedback: [], visits: 0, online: 0 };
    stats = null;
    showLock('Locked. The key was removed from this tab.');
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

  document.addEventListener('click', function (e) {
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
