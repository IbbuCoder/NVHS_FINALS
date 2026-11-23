# Finals Study Guide

A study site for Neuqua Valley 9th grade finals. Pick Core or Encore, then a subject, then your class, then study it with notes, flashcards, practice tests and games. It looks and works like the PE Midterm app, with one page that works for every class.

Plain HTML, CSS and JavaScript. No build step. The only outside files are the Google Fonts (Barlow Condensed, Oswald, Source Sans 3) and supabase-js from the jsDelivr CDN.

**PE / Health has real content** (all of the PE Midterm app, plus Flexibility and Nutrition for the final). Every other class is an empty placeholder: it has its Lessons, Flashcards and Quiz pages, but nothing in them yet, and nothing made up.

## Run it locally

Double-click `index.html`, or run a local server from this folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Opening the site

Every time the site opens (each fresh load, not just the first visit), it starts on **What do you want to study?**

1. Tap **Core** or **Encore**.
2. Tap a subject (for example **English**).
3. Tap your class (for example **English 1 Honors**). A subject with only one class, like PE / Health, skips this step.

Every step has a **Back** button. The lists come from `data/subjects.js`.

Picking a class opens that class's Home, with Lessons, Flashcards and Quiz. If the site was opened with a link to a particular page (for example `.../#flashcards` or `.../#u2`), that page opens after the pick instead.

The top bar always shows the class you're in, as subject and class (for example "English · 1 Honors"). Tap it from anywhere, even inside a lesson, to pick again. The menu works from the picker too, and "Keep studying" goes straight back to the last class. The picker's addresses are `#pick`, `#pick/core`, and `#pick/core/english` (a subject).

## "Not finished" notices (turn these off by hand)

While the site is being built it warns everyone, very clearly:

- **Popup every time the site opens, and a red strip on every page.** To turn both off, open `js/config.js` and change `notFinished: true` to `notFinished: false`.
- **"Not filled in yet" on a class.** Every class without `filled: true` in `data/subjects.js` shows a notice at the top of its pages and "Not filled in yet" in the picker. To turn it off for a class, add its content and set `filled: true` on it.
- **The NotebookLM pop-up.** The first time someone opens a class that isn't filled in, a pop-up explains what a NotebookLM is and asks them to share one for that class. It shows once per class per device: **Maybe later** closes it, and **Share a notebook** opens the Share form with that class already typed in. After that, the class's notice keeps a small "Got a NotebookLM for this class? Help fill it in." link. It never blocks studying, and classes with `filled: true` (like PE / Health) never show it. The Share form has the same short explanation at the top.

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
data/subjects.js      Every class: Core or Encore, then subject, then class (the one file to edit)
data/classes/<id>.js  A class's units, notes, flashcards, questions, drills (only for classes with file: true)
data/classes/_template.js   Copy this to start a class
data/classes/pe-health-tools.js  PE / Health's interactive parts (muscle map, calculators, games)
supabase/config.js    Supabase project URL and publishable key
supabase/client.js    Every Supabase call the site makes (window.FinalsDB)
hq-4067e220e3bc/      The hidden admin data page (needs the admin key)
robots.txt            Asks search engines to skip the admin page
```

## The class list, and adding a class

Every class is in `data/subjects.js`, grouped by Core or Encore and then by subject:

```js
{ category: "core", subject: "English", classes: [
  { name: "English 1" },
  { name: "English 1 Honors" },
  { name: "English 2 American Society" }
] },
```

- To add a class, add `{ name: "..." }` to its subject. To add a subject, add a new group. To fix a name, just change it.
- Each class gets an id made from its name ("English 1 Honors" becomes `english-1-honors`; "&" becomes "and"). Saved progress and data file names use it. Once a class has a data file, keep its id the same: if you rename the class, add `id: "old-id"` to it.
- A new class starts empty, with "not filled in yet" and the NotebookLM pop-up.

To fill a class in: copy `data/classes/_template.js` to `data/classes/<id>.js`, change `'your-id'` to the class's id, write the content, then add `file: true` to the class in `data/subjects.js` (that loads the file). When it's done, add `filled: true` too, and its notices and pop-up go away. Classes without `file: true` load no file at all.

Other options on a class: `tools: true` also loads `data/classes/<id>-tools.js` (like PE / Health), and `exam: "YYYY-MM-DD"` sets its final date.

## Add real content

Open the class's file in `data/classes/`. `_template.js` explains every field:

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

Studying works fully offline and never needs an account. Every form goes to Supabase (no Google Forms).

**Student accounts (optional).** The More tab has **Log in** (or **Account** when logged in). There's also a small account line under Core and Encore on the opening "What do you want to study?" screen, and at the top of Home: logged out it shows **Log in** and **Sign up** (they open the Account page on that tab); logged in it shows "Hi, {name}", **Messages** (with the unread dot) and **Log out**. It's never a popup, and studying never needs an account. Accounts are the database's own username + PIN login, built in Postgres; Supabase Auth is not used anywhere.
- Sign up: username, name and PIN (any characters, at least 4, with a Show/Hide button). Log in: username and PIN. Five wrong PINs lock the account for 10 minutes.
- Functions: `finals_signup`, `finals_login`, `finals_logout`, `finals_me`. Their errors are plain sentences from the database and are shown as they are.
- The session token is kept in localStorage (`finals-session`) and checked with `finals_me` on every load. If the database says the session has ended, the site logs out on this device too.
- Logged in, the student gets **Messages** and **My submissions**, and their account name is used instead of the Settings name.

**The student's name and device.** Each browser gets a random device id once (localStorage `finals-device`). Logged out, students can type their name in Settings (optional, localStorage `finals-student-name`). Logged in, the account's name is used. Names are only ever seen by the owner on the hidden data page.

**Forms**
- **Share a notebook.** Class (typed, up to 40 characters) and Link. Logged in, it goes through `finals_submit_notebook` with the session token and the name comes from the account. Logged out, it's the anonymous insert into `finals_notebooks` as before, with a required Your name box, plus a line suggesting logging in to see the status and message the owner. The link must start with `https://notebook.google.com/` or `https://notebooklm.google.com/` (at most 500 characters). The form says: "Share it so anyone with the link can view" and "Don't include other students' work or grades". A link that was already shared gets the database's message ("That notebook was already shared. Thanks!").
- **Feedback.** A kind (bug, wrong answer, idea, other), an optional class and a message. Logged in: `finals_submit_feedback`, no name box. Logged out: the anonymous insert into `finals_feedback` with a required name, as before.

**Notebooks are admin-only.** Students never see shared notebooks on the site; the owner reviews them on the data page. (Shared notebooks are what the owner uses as source material to fill classes in.)

**My submissions** (`finals_my_items`): the student's notebooks (Waiting, Accepted or Not used) and feedback (Waiting or Done), each with the owner's note.

**Messages** with the site's owner (`finals_send_message`, `finals_my_messages`, `finals_my_unread`): a chat with the student's messages on the right and the owner's on the left, a "Don't share private info" note, and a Send box (up to 1000 characters). It refreshes when opened and every 60 seconds while open. A dot on More and on Messages shows unread replies, checked every 60 seconds while logged in and the tab is on screen.

**Usage counts** (all through `finals_track(kind, class_id, ref, device, student)`, and they fail silently)
- `visit` on every fresh load of the site.
- `class_open` when a class is opened from the picker, a link or the class list.
- `miss` when a quiz or practice question is answered wrong. `ref` is the question's text (questions have no other id).
- The device id and the name (account name, or the Settings name, if known) are always sent. The database itself skips the site owner and excluded devices.

**Studying now.** While a tab is on screen, the site calls `finals_ping(device, student)` every 60 seconds. Home shows "N studying now" from `finals_online_count()` (students active in the last 2 minutes), checked every 60 seconds and hidden when it's 0 or the call fails.

Anonymous visitors can only add rows; they can't read submissions, feedback, messages or names.

**Admin data page.** A hidden page at `hq-4067e220e3bc/index.html`. It isn't linked from anywhere on the site, is marked `noindex,nofollow`, and is listed in `robots.txt`. To open it, either:
- use the long admin key (after a `#` at the end of the address, or typed into the Admin key box), or
- log in with the owner account's username and PIN (the account must be the owner; its session token is then used).

Neither is stored in this repo. Whichever is used is kept only in that browser tab (sessionStorage), and **Lock** forgets it (and ends the owner session). A wrong key shows "That key didn't work". The page shows:
- Totals: visits, studying now, unread messages, new feedback, notebooks waiting.
- Stats: visits per day for the last 30 days, most opened classes, most missed questions.
- Messages: one thread per student, newest first, with an unread badge. Opening a thread marks it read; there's a reply box.
- Feedback inbox: kind, class, name, message and date; New / Done / All filter; sort by newest or by kind; Mark done / Mark new; a note to the student with Save; Delete.
- Notebooks: the class as typed, link, name, status and date; Approve, Reject, Back to pending, Delete; a note to the student with Save.
- Accounts: every account with Reset PIN (asks for the new PIN, then confirms). Tell the student the new PIN yourself.
- "Don't count this device": stops this browser's own visits from counting in the stats.

Everything there goes through the admin database functions (`finals_admin_list`, `finals_admin_stats`, `finals_admin_threads`, `finals_admin_thread`, `finals_admin_reply`, `finals_admin_note`, `finals_admin_accounts`, `finals_admin_reset_pin`, `finals_admin_set_notebook`, `finals_admin_set_feedback`, `finals_admin_delete`, `finals_admin_exclude_device`), whose first argument `t` is the key or the owner's session token. Lists are newest first and there's a Refresh button.

**Keys.** `supabase/config.js` has the project URL and the publishable key (`sb_publishable_...`), which is meant to be public. Row Level Security on the database decides what the site can read or write. Never put a secret key (`sb_secret_...`) or the legacy `service_role` key anywhere in this repo.

**Where the code is.** `index.html` loads supabase-js from the CDN, then `supabase/config.js`, then `supabase/client.js`. `client.js` is the only file that talks to Supabase. Every call returns `{ data, error }`, where `error` is a plain sentence that is safe to show. If supabase-js can't load (offline), notebooks and feedback say they need an internet connection and everything else keeps working.

## Progress

Progress saves only in this browser's localStorage, under one key (`finals-v1`), with each class kept separately. Scores, flashcard marks and bookmarks are never sent anywhere; only the usage counts above are. Settings has Backup, to move progress to another device as a file.

## Deploy to GitHub Pages

On GitHub: Settings, then Pages, then Deploy from a branch. Pick `main` and `/ (root)`, then Save. The site is live at `https://<username>.github.io/<repo>/` a minute later.
