// A small Supabase wrapper for later (notebook submissions with admin approval,
// optional saved progress). NOT USED YET: nothing loads or calls this file.
// It talks to Supabase's REST API with fetch, so no library is needed.
(function () {
  'use strict';

  var cfg = window.FINALS_SUPABASE || {};

  function ready() {
    return !!(cfg.url && cfg.key);
  }

  function request(path, options) {
    if (!ready()) return Promise.reject(new Error('Supabase is not set up (see supabase/config.js)'));
    options = options || {};
    return fetch(cfg.url.replace(/\/$/, '') + '/rest/v1/' + path, {
      method: options.method || 'GET',
      headers: Object.assign({ apikey: cfg.key, 'Content-Type': 'application/json' }, options.headers || {}),
      body: options.body ? JSON.stringify(options.body) : undefined
    }).then(function (res) {
      if (!res.ok) throw new Error('Supabase request failed: ' + res.status);
      return res.status === 204 ? null : res.json();
    });
  }

  window.FinalsDB = {
    ready: ready,
    // Rows from a table, e.g. select('notebooks', 'approved=eq.true&subject_id=eq.science')
    select: function (table, query) {
      return request(table + '?select=*' + (query ? '&' + query : ''));
    },
    // Add one row, e.g. insert('notebook_submissions', { subject_id: 'science', url: '...' })
    insert: function (table, row) {
      return request(table, { method: 'POST', body: row, headers: { Prefer: 'return=minimal' } });
    }
  };
})();
