// The hidden data page. It shows the visit count, notebook submissions and feedback,
// and lets the admin approve, reject or delete them.
//
// Everything goes through the admin functions in the database (finals_admin_list,
// finals_admin_set_notebook, finals_admin_delete). Each one needs the admin key.
// The key is never stored in this repo: open the page with the key after # in the address.
// It is kept in this tab's sessionStorage only and removed from the address bar right away.
(function () {
  'use strict';

  var $ = function (s) { return document.querySelector(s); };
  var KEY_STORE = 'finals-hq-key';
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
  function newestFirst(list) {
    return (list || []).slice().sort(function (a, b) { return String(b.created_at || '').localeCompare(String(a.created_at || '')); });
  }

  /* ----- The key ----- */

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
  var memKey = '';

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

  /* ----- Messages ----- */

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

  /* ----- The lists ----- */

  var data = { notebooks: [], feedback: [], visits: 0 };
  var busy = false;

  function render() {
    var nb = newestFirst(data.notebooks);
    var fb = newestFirst(data.feedback);
    var waiting = nb.filter(function (n) { return n.status === 'pending'; }).length;
    $('#hq-stats').innerHTML =
      '<div class="hq-stat"><b>' + esc(data.visits || 0) + '</b><span>Visits</span></div>' +
      '<div class="hq-stat"><b>' + waiting + '</b><span>Notebooks waiting</span></div>' +
      '<div class="hq-stat"><b>' + fb.length + '</b><span>Feedback</span></div>';

    $('#hq-notebooks').innerHTML = nb.length
      ? '<ul class="hq-list">' + nb.map(function (n) {
          var url = safeUrl(n.url);
          var buttons = [
            n.status !== 'approved' ? '<button type="button" class="btn solid" data-set="approved" data-id="' + esc(n.id) + '">Approve</button>' : '',
            n.status !== 'rejected' ? '<button type="button" class="btn" data-set="rejected" data-id="' + esc(n.id) + '">Reject</button>' : '',
            n.status !== 'pending' ? '<button type="button" class="btn" data-set="pending" data-id="' + esc(n.id) + '">Back to pending</button>' : '',
            '<button type="button" class="btn ghost" data-del="notebook" data-id="' + esc(n.id) + '">Delete</button>'
          ].join('');
          return '<li class="hq-item"><h3>' + esc(n.title || 'Untitled') + '</h3>' +
            '<p class="hq-meta"><span class="hq-status ' + esc(n.status) + '">' + esc(STATUS[n.status] || n.status) + '</span> ' +
              esc(CLASSES[n.class_id] || n.class_id || 'No class') + '. ' + esc(when(n.created_at)) + '</p>' +
            (url ? '<a class="hq-link" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">' + esc(url) + '</a>' : '<p class="hq-meta">' + esc(n.url) + '</p>') +
            '<div class="hq-actions">' + buttons + '</div></li>';
        }).join('') + '</ul>'
      : '<p class="hq-empty">No notebooks yet.</p>';

    $('#hq-feedback').innerHTML = fb.length
      ? '<ul class="hq-list">' + fb.map(function (f) {
          return '<li class="hq-item"><h3>' + esc(KINDS[f.kind] || f.kind || 'Feedback') + '</h3>' +
            '<p class="hq-meta">' + esc(f.class_id ? (CLASSES[f.class_id] || f.class_id) : 'Not about one class') + '. ' + esc(when(f.created_at)) + '</p>' +
            '<p class="hq-message">' + esc(f.message) + '</p>' +
            '<div class="hq-actions"><button type="button" class="btn ghost" data-del="feedback" data-id="' + esc(f.id) + '">Delete</button></div></li>';
        }).join('') + '</ul>'
      : '<p class="hq-empty">No feedback yet.</p>';
  }

  function load(note) {
    if (!memKey) { showLock(''); return; }
    busy = true;
    $('#hq-refresh').disabled = true;
    say(note || 'Loading...');
    call('finals_admin_list').then(function (res) {
      busy = false;
      $('#hq-refresh').disabled = false;
      if (handleWrongKey(res)) return;
      if (res.error) {
        // Keep the lock screen up if the lists never loaded.
        if ($('#hq-panel').hidden) showLock('<b>' + esc(res.error) + '</b>');
        else say('<b>' + esc(res.error) + '</b>');
        return;
      }
      var d = res.data || {};
      data = { notebooks: d.notebooks || [], feedback: d.feedback || [], visits: d.visits || 0 };
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
    data = { notebooks: [], feedback: [], visits: 0 };
    showLock('Locked. The key was removed from this tab.');
  });

  document.addEventListener('click', function (e) {
    var set = e.target.closest('[data-set]');
    var del = e.target.closest('[data-del]');
    if (!set && !del) return;
    if (del && !window.confirm(del.dataset.del === 'feedback' ? 'Delete this feedback for good?' : 'Delete this notebook for good?')) return;
    var btn = set || del;
    btn.disabled = true;
    var p = set
      ? call('finals_admin_set_notebook', { nb_id: set.dataset.id, new_status: set.dataset.set })
      : call('finals_admin_delete', { kind: del.dataset.del, row_id: del.dataset.id });
    p.then(function (res) {
      if (handleWrongKey(res)) return;
      if (res.error) { btn.disabled = false; say('<b>That didn\'t work.</b> ' + esc(res.error)); return; }
      load(set ? (set.dataset.set === 'approved' ? 'Approved.' : set.dataset.set === 'rejected' ? 'Rejected.' : 'Moved back to pending.') : 'Deleted.');
    });
  });

  // A key pasted onto the address while the page is already open works too.
  window.addEventListener('hashchange', function () {
    if (takeKeyFromAddress()) load();
  });

  load();
})();
