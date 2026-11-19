# Finals Study Guide

A study site for finals. Pick a Core or Encore class, then study it with notes, flashcards, practice tests and games. It looks and works like the PE Midterm app, with one page that works for every class.

Plain HTML, CSS and JavaScript. No build step. The only outside files are the Google Fonts (Barlow Condensed, Oswald, Source Sans 3).

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
data/notebooks.js     Approved NotebookLM notebooks
supabase/             Config and client for later. Not used yet.
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
- `feedbackUrl`: link to a feedback form. Until it's set, feedback links show a short message.
- `notebookFormEndpoint`: where the Share a notebook form sends. Until it's set, the form checks the link and shows what it would send, but sends nothing.

## Shared notebooks

Check each submission: it should be the student's own notes, with no tests, answer keys or personal info. Then add it to `data/notebooks.js` with `approved: true`.

## Progress

Progress saves in the browser's localStorage only, under one key (`finals-v1`), with each class kept separately. Nothing is sent anywhere. Settings has Backup to move it to another device.

## Supabase (later)

`supabase/config.js` and `supabase/client.js` are ready but not loaded or called anywhere. Never commit keys: put them in `supabase/config.local.js`, which is in `.gitignore`, and only ever use the publishable key in the website.

## Deploy to GitHub Pages

On GitHub: Settings, then Pages, then Deploy from a branch. Pick `main` and `/ (root)`, then Save. The site is live at `https://<username>.github.io/<repo>/` a minute later.
