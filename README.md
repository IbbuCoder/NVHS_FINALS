# Finals Study Guide

A study site for finals. Pick a Core or Encore class, then study it with notes, flashcards, practice tests and games. It looks and works like the PE Midterm app, with one page that works for every class.

Plain HTML, CSS and JavaScript. No build step. The only outside files are the Google Fonts (Barlow Condensed, Oswald, Source Sans 3) and supabase-js from the jsDelivr CDN.

**Right now every class has placeholder content only.** Look for `PLACEHOLDER` and `Placeholder` in `data/classes/`.

## Run it locally

Double-click `index.html`, or run a local server from this folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## How it's organized

```
index.html            The whole app (every page is a section in this file)
404.html              Page-not-found for GitHub Pages
css/style.css         Design system copied from the PE Midterm app
js/config.js          Site name, finals date, feedback link, share form link
js/registry.js        Where data files put their content
js/main.js            Everything the app does
data/subjects.js      The list of classes (Core and Encore)
data/classes/<id>.js  One file per class: units, notes, flashcards, questions, drills
data/classes/_template.js   Copy this to start a class
supabase/config.js    Supabase project URL and publishable key
supabase/client.js    Every Supabase call the site makes (window.FinalsDB)
```

## Add a class

1. Add a line to `data/subjects.js`:
   ```js
   { id: 'french', name: 'French', category: 'encore', exam: '' },
   ```
2. Copy `data/classes/_template.js` to `data/classes/french.js` and change `'your-id'` to `'french'`.

That's all. The class shows up under Classes, and every feature works for it.

## Add real content

Open the class's file in `data/classes/` and replace the placeholders. `_template.js` explains every field:

- **units**: each has sections with `body` paragraphs, an optional `list`, an optional `table`, and an optional `simple` note for Simple words.
- **flashcards**: `{ u, front, back }`. `u` is the unit number. Keep some short (term under 40 characters, meaning under 70) so they fit the matching game.
- **questions**: `{ u, t: 'mc' or 'tf', q, c: [choices], a, why }`. `a` is the index of the right choice, starting at 0.
- **formulas** and **drills**: optional. Each drill makes a new problem with random numbers.

One missing comma breaks a file. If a class shows nothing, open the browser console (F12) to find the line.

## Settings in js/config.js

- `finalsDate`: `'YYYY-MM-DD'`. Turns on the countdown and the day-by-day plan on Home. A class can set its own date with `exam` in `data/subjects.js`.

## Supabase

The site works fully without signing in, and offline. Supabase adds accounts, shared notebooks, feedback, a visit count and progress sync. The database is already set up with Row Level Security; the site never changes its tables.

**Keys.** `supabase/config.js` has the project URL and the publishable key (`sb_publishable_...`), which is meant to be public. Never put a secret key (`sb_secret_...`) or the legacy `service_role` key anywhere in this repo.

**Where the code is.** `index.html` loads supabase-js from the CDN, then `supabase/config.js`, then `supabase/client.js`. `client.js` is the only file that talks to Supabase. Every call returns `{ data, error }`, where `error` is a plain sentence that is safe to show. If supabase-js can't load (offline), accounts and notebooks say they need an internet connection and everything else keeps working.

**Accounts** (Account page, or Sign in in the menu)
- Email and password only. Only emails ending in `@k12.ipsd.org` (any capitalization) can sign up or sign in. The form checks this, and the database enforces it too.
- Sign-up sends a confirmation email, and the site shows a "check your school email" screen. Forgot password sends a reset link. When the student opens it, the site asks for a new password.
- The only things collected are email, password and an optional display name (saved in `finals_profiles`).
- In the Supabase dashboard (Authentication, URL Configuration), set the Site URL and add the GitHub Pages address as a redirect URL. Otherwise the confirmation and reset links won't come back to the site.

**Shared notebooks**
- Students must be signed in to share. A submission goes into `finals_notebooks` with status `pending` (`submitted_by` fills itself). Only `https://notebooklm.google.com/...` links are accepted, and a link that was already shared gets a plain message.
- The Share page lists the student's own submissions and their status.
- Approved notebooks show on that class's Units page. With none, the empty state stays.

**Admin.** When `finals_is_admin()` returns true (the admin account), an Admin link appears. The Admin page lists pending notebooks with Approve, Reject (sets the status) and Delete (removes the row). Everyone else never sees it, and the database blocks them anyway.

**Feedback.** The Feedback page sends a kind (bug, wrong answer, idea, other), an optional class and a message to `finals_feedback`. "Think this answer is wrong?" in a test fills it in.

**Visits.** `finals_count_visit()` is called once per browser session, with no personal data.

## Progress

Progress always saves in this browser's localStorage, under one key (`finals-v1`), with each class kept separately. This works signed out and offline.

When signed in, each class's progress is also saved as one row in `finals_progress` (`class_id`, key `progress`). On sign-in, rows that are newer than this device's copy replace it, and anything newer on this device is sent up (last write wins). Changes sync a moment after they happen, and again when the connection comes back. Settings, the daily goal and the Daily 10 streak stay on each device.

Settings has **Delete my synced data**, which removes only that student's rows on the server. Progress on the device stays. Settings also has Backup, to move progress to another device as a file.

## Deploy to GitHub Pages

On GitHub: Settings, then Pages, then Deploy from a branch. Pick `main` and `/ (root)`, then Save. The site is live at `https://<username>.github.io/<repo>/` a minute later.
