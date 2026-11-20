# Finals Study Guide

A study site for finals. Pick a Core or Encore class, then study it with notes, flashcards, practice tests and games. It looks and works like the PE Midterm app, with one page that works for every class.

Plain HTML, CSS and JavaScript. No build step. The only outside files are the Google Fonts (Barlow Condensed, Oswald, Source Sans 3) and supabase-js from the jsDelivr CDN.

**PE / Health has real content** (all of the PE Midterm app, plus Flexibility and Nutrition for the final). Every other class still has placeholder content only. Look for `PLACEHOLDER` and `Placeholder` in `data/classes/`.

## Run it locally

Double-click `index.html`, or run a local server from this folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Opening the site

Every time the site opens (each fresh load, not just the first visit), it starts on **What do you want to study?**

1. Tap **Core** or **Encore**.
2. Tap a class. Its list comes from `data/subjects.js` (`category: 'core'` or `'encore'`), and Back returns to step 1.

Picking a class opens that class's Home. If the site was opened with a link to a particular page (for example `.../#flashcards` or `.../#u2`), that page opens after the pick instead.

It never locks you in: the menu works from the picker, "Keep studying" goes straight back to the last class, and the class name in the top bar (or **Change class** on Home and in More) opens the picker again. The picker's addresses are `#pick`, `#pick/core` and `#pick/encore`.

## "Not finished" notices (turn these off by hand)

While the site is being built it warns everyone, very clearly:

- **Popup every time the site opens, and a red strip on every page.** To turn both off, open `js/config.js` and change `notFinished: true` to `notFinished: false`.
- **"Not filled in yet" warning on a class, and a tag on it in the class picker.** To turn it off for one class, open `data/subjects.js` and delete `, unfinished: true` from that class's line.

Nothing turns these off on its own.

## How it's laid out

Every class has the same 5 places, in the bottom bar on phones and the top menu on computers:

- **Home**: how ready you are, one thing to do next, and big buttons for Lessons, Flashcards and Quiz, plus Quick study (10 things picked for you).
- **Lessons**: every unit's notes. Each lesson has an "All lessons" link back.
- **Flashcards**
- **Quiz**: 3 choices. Practice quiz (pick a lesson, answers right away), Timed test (like the real final) and Fix my mistakes.
- **More**: Games (matching game, math practice), Bookmarks, the printable review sheet, Change class, Settings and Feedback.

Settings only has Dark mode, Text size, Simple words, Backup and Clear progress.

## How it's organized

```
index.html            The whole app (every page is a section in this file)
404.html              Page-not-found for GitHub Pages
css/style.css         Design system copied from the PE Midterm app
js/config.js          Site name and finals date
js/registry.js        Where data files put their content
js/main.js            Everything the app does
data/subjects.js      The list of classes (Core and Encore)
data/classes/<id>.js  One file per class: units, notes, flashcards, questions, drills
data/classes/_template.js   Copy this to start a class
data/classes/pe-health-tools.js  PE / Health's interactive parts (muscle map, calculators, games)
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

## Sections written as HTML, and class tools

A section can use `html: '...'` instead of `body`, `list` and `table`, to keep a layout the plain fields can't make (PE / Health uses this to keep the PE Midterm app's tables and diagrams). Add `tool: true` to show it as a full-width tool panel.

A class that needs its own interactive parts sets `tools: true` in `data/subjects.js`. The site then also loads `data/classes/<id>-tools.js`, which calls `FINALS.addTools(id, function (root, unit, content) { ... })`. That function runs every time one of the class's units is shown.

## Settings in js/config.js

- `finalsDate`: `'YYYY-MM-DD'`. Turns on the countdown and the day-by-day plan on Home. A class can set its own date with `exam` in `data/subjects.js`.

## Supabase

The site has no accounts and no sign-in. It works fully offline. Supabase is used for three things only:

- **Approved notebooks.** Each class's Lessons page reads rows from `finals_notebooks` where `status` is `approved` and `class_id` is that class. With none, it shows "No notebooks yet. Be the first to share one!" Add or approve notebooks in the Supabase dashboard; the site can't submit or change them.
- **Feedback.** The Feedback page sends an anonymous row to `finals_feedback`: a kind (bug, wrong answer, idea, other), an optional class and a message. "Think this answer is wrong?" in a test fills it in.
- **Visits.** `finals_count_visit()` is called once per browser session, with no personal data.

The Share a notebook page says sharing isn't open yet. There is no public submission form, so nothing unmoderated can be posted.

**Keys.** `supabase/config.js` has the project URL and the publishable key (`sb_publishable_...`), which is meant to be public. Row Level Security on the database decides what the site can read or write. Never put a secret key (`sb_secret_...`) or the legacy `service_role` key anywhere in this repo.

**Where the code is.** `index.html` loads supabase-js from the CDN, then `supabase/config.js`, then `supabase/client.js`. `client.js` is the only file that talks to Supabase. Every call returns `{ data, error }`, where `error` is a plain sentence that is safe to show. If supabase-js can't load (offline), notebooks and feedback say they need an internet connection and everything else keeps working.

## Progress

Progress saves only in this browser's localStorage, under one key (`finals-v1`), with each class kept separately. Nothing about a student's progress is sent anywhere. Settings has Backup, to move progress to another device as a file.

## Deploy to GitHub Pages

On GitHub: Settings, then Pages, then Deploy from a branch. Pick `main` and `/ (root)`, then Save. The site is live at `https://<username>.github.io/<repo>/` a minute later.
