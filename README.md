# Finals Study Guide

A free, student-made study site for finals. Students pick **Core** (main classes) or **Encore** (electives), pick a class, then study with key terms, flashcards, and quick quizzes. Students can also share their own NotebookLM notebooks.

Plain HTML, CSS, and JavaScript. No framework, no build step, and no dependencies.

## Run it locally

**Option 1: just open it.** Double-click `index.html`. Everything works straight from your computer.

**Option 2: local server** (closer to the real site):

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Site settings

Edit `js/config.js`:

| Setting | What it does |
| --- | --- |
| `siteTitle` | Name in the header |
| `schoolName` | Shown under the title. Leave `""` to hide |
| `finalsDate` | Countdown target, e.g. `"2027-01-20T08:00"`. Leave `""` to hide the countdown |
| `notebookFormEndpoint` | Where the share form sends submissions (see below) |

## Add a new class

1. Open `data/subjects.js` and add a line:
   ```js
   { id: "french", name: "French", category: "encore", grade: null, icon: "🇫🇷", color: "#2456d3" },
   ```
   `id` must be lowercase letters, numbers, or dashes.
2. Copy `data/subjects/_template.js` to `data/subjects/french.js` and change `"your-id"` to `"french"`.

That's it. The class shows up on the Encore page and in search. Until you add units, its page says "coming soon".

## Add study content

Open the class's file in `data/subjects/` and fill in `units`. `data/subjects/science.js` is a complete example. Each unit has:

- `title`
- `keyTerms`: `{ term, definition }`
- `flashcards`: `{ front, back }`
- `quiz`: `{ question, choices: [...], answerIndex, explanation }`. `answerIndex` starts at **0** (0 = first choice).

Tip: one missing comma breaks the whole file. If a page shows nothing, open the browser console (F12) and look for the error.

## Approve a shared notebook

When someone submits a notebook, check it first: it should be their own notes, with no tests, answer keys, or personal info. Then add it to `data/notebooks.js`:

```js
{ subjectId: "science", title: "Unit 1 review", url: "https://notebooklm.google.com/notebook/...", addedBy: "J.", approved: true },
```

Only entries with `approved: true` are shown.

## Connect the share form

Until `notebookFormEndpoint` is set, the form checks everything and shows what *would* be sent, but sends nothing. To collect submissions, set it to any service that accepts a form POST (for example a Formspree form URL, or later a Supabase endpoint). The form sends these fields: `category`, `subjectId`, `className`, `teacherPeriod`, `title`, `url`, `submittedAt`.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. On GitHub: **Settings → Pages**.
3. Under "Build and deployment", choose **Deploy from a branch**, pick your branch (e.g. `main`) and the `/ (root)` folder, then **Save**.
4. After a minute your site is live at `https://<username>.github.io/<repo>/`.

The empty `.nojekyll` file tells GitHub Pages to serve the files as-is.

## How the code is organized

```
index.html        Home: countdown, Core/Encore buttons, search
category.html     ?type=core or ?type=encore: grid of classes
subject.html      ?id=science: one template for every class
share.html        Share-a-notebook instructions and form
css/styles.css    All styles (colors are variables at the top; dark mode below them)
js/config.js      Site settings
js/data.js        ALL data loading. Swap this one file for Supabase later
js/common.js      Shared helpers, breadcrumb, dark mode toggle
js/home.js, category.js, subject.js, share.js   One script per page
js/flashcards.js, quiz.js                        Reusable study widgets
data/subjects.js          List of classes
data/subjects/<id>.js     Study content per class
data/notebooks.js         Approved notebooks
```

**Why are the data files `.js` instead of `.json`?** Browsers block loading `.json` files when you open a page straight from your computer. Each data file is still a plain list or object (JSON-style) with one line in front: `STUDY_DATA.subjects = ...`.

**Moving to Supabase later:** pages only ever call `StudyData.getSubjects()`, `getSubject()`, `getSubjectContent()`, `getNotebooks()` and `submitNotebook()`. Rewrite those functions in `js/data.js` to call Supabase and return the same shapes. No other file needs to change.
