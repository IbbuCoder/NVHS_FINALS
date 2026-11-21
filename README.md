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
hq-4067e220e3bc/      The hidden admin data page (needs the admin key)
robots.txt            Asks search engines to skip the admin page
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

The site has no accounts and no sign-in, and studying works fully offline. Every form goes to Supabase (no Google Forms).

**The student's name and device.** Each browser gets a random device id once (saved in localStorage as `finals-device`). Students can type their name in Settings (optional); it's saved in localStorage as `finals-student-name`. Names are only ever seen by the admin on the hidden data page; the site never shows them anywhere public.

**Forms**
- **Share a notebook.** Your name (required, filled in from the saved name), class, title and NotebookLM link go into `finals_notebooks` as `pending` with `student_name`. The link must start with `https://notebooklm.google.com/` and the title must be 1 to 120 characters. After sending: "Thanks, it shows up after it's checked."
- **Feedback.** Your name (required), a kind (bug, wrong answer, idea, other), an optional class and a message go into `finals_feedback` with `student_name`. New feedback starts as `new`. "Think this answer is wrong?" in a test fills it in.
- Both forms save the name back so it's filled in next time. Errors are plain sentences.

**Approved notebooks.** Each class's Lessons page reads rows from `finals_notebooks` where `status` is `approved` and `class_id` is that class. Pending and rejected ones never show, and neither do names.

**Usage counts** (all through `finals_track(kind, class_id, ref, device, student)`, and they fail silently)
- `visit` on every fresh load of the site.
- `class_open` when a class is opened from the picker, a link or the class list.
- `miss` when a quiz or practice question is answered wrong. `ref` is the question's text (questions have no other id).
- The device id and the name (if known) are always sent. The database itself skips the site owner and excluded devices.

**Studying now.** While a tab is on screen, the site calls `finals_ping(device, student)` every 60 seconds. Home shows "N studying now" from `finals_online_count()` (students active in the last 2 minutes), checked every 60 seconds and hidden when it's 0 or the call fails.

Anonymous visitors can only add rows; they can't read submissions, feedback or names.

**Admin data page.** A hidden page at `hq-4067e220e3bc/index.html`. It isn't linked from anywhere on the site, is marked `noindex,nofollow`, and is listed in `robots.txt`. It needs the admin key, which is never stored in this repo: open the page with the key after a `#` at the end of the address, or type it into the box the page shows. The page keeps the key only in that browser tab (sessionStorage), removes it from the address bar right away, and has a Lock button to forget it. A wrong key shows "That key didn't work". It shows:
- Totals: visits, studying now, new feedback, notebooks waiting.
- Stats: visits per day for the last 30 days, most opened classes, most missed questions.
- Feedback inbox: kind, class, name, message and date; New / Done / All filter; sort by newest or by kind; Mark done / Mark new; Delete.
- Notebooks: title, class, name, link, status and date, with Approve, Reject, Back to pending and Delete.
- "Don't count this device": stops this browser's own visits from counting in the stats.

Everything there goes through the database functions `finals_admin_list`, `finals_admin_stats`, `finals_admin_set_notebook`, `finals_admin_set_feedback`, `finals_admin_delete` and `finals_admin_exclude_device`, never the tables directly. Lists are newest first and there's a Refresh button.

**Keys.** `supabase/config.js` has the project URL and the publishable key (`sb_publishable_...`), which is meant to be public. Row Level Security on the database decides what the site can read or write. Never put a secret key (`sb_secret_...`) or the legacy `service_role` key anywhere in this repo.

**Where the code is.** `index.html` loads supabase-js from the CDN, then `supabase/config.js`, then `supabase/client.js`. `client.js` is the only file that talks to Supabase. Every call returns `{ data, error }`, where `error` is a plain sentence that is safe to show. If supabase-js can't load (offline), notebooks and feedback say they need an internet connection and everything else keeps working.

## Progress

Progress saves only in this browser's localStorage, under one key (`finals-v1`), with each class kept separately. Scores, flashcard marks and bookmarks are never sent anywhere; only the usage counts above are. Settings has Backup, to move progress to another device as a file.

## Deploy to GitHub Pages

On GitHub: Settings, then Pages, then Deploy from a branch. Pick `main` and `/ (root)`, then Save. The site is live at `https://<username>.github.io/<repo>/` a minute later.
