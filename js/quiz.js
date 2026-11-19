/*
 * quiz.js — a multiple-choice quiz widget.
 *
 *   createQuiz(questions) → an element you can put on the page
 *   questions: [{ question, choices: [...], answerIndex, explanation }]
 *
 * One question at a time, instant feedback after each answer, and a final
 * score with a "try again" button.
 */
function createQuiz(questions) {
  if (!questions || !questions.length) {
    return el("p", { class: "empty" }, "No quiz for this unit yet.");
  }

  let current = 0;
  let score = 0;
  const root = el("div", { class: "quiz" });

  function showQuestion() {
    const q = questions[current];
    let answered = false;

    const heading = el("h4", { class: "quiz__question", tabindex: "-1" }, q.question);
    const feedback = el("div", { class: "quiz__feedback", role: "status", "aria-live": "polite" });
    const isLast = current === questions.length - 1;
    const nextBtn = el("button", {
      class: "btn btn--primary",
      type: "button",
      hidden: true,
      onclick: function () {
        current++;
        if (current < questions.length) showQuestion();
        else showResults();
      },
    }, isLast ? "See my score" : "Next question →");

    const choiceButtons = q.choices.map(function (choice, i) {
      return el("button", {
        class: "quiz__choice",
        type: "button",
        onclick: function () { choose(i); },
      },
        el("span", { class: "quiz__letter", "aria-hidden": "true" }, String.fromCharCode(65 + i)),
        el("span", null, choice));
    });

    function choose(i) {
      if (answered) return;
      answered = true;
      const correct = i === q.answerIndex;
      if (correct) score++;

      choiceButtons.forEach(function (btn, j) {
        btn.disabled = true;
        if (j === q.answerIndex) btn.classList.add("is-correct");
        if (j === i && !correct) btn.classList.add("is-wrong");
        if (j === i) btn.setAttribute("aria-label", btn.textContent + (correct ? " (your answer, correct)" : " (your answer, incorrect)"));
      });

      feedback.className = "quiz__feedback " + (correct ? "is-correct" : "is-wrong");
      feedback.replaceChildren(
        el("strong", null, correct ? "✓ Correct!" : "✗ Not quite. The answer is " + q.choices[q.answerIndex] + "."),
        q.explanation ? el("p", null, q.explanation) : null);

      nextBtn.hidden = false;
      nextBtn.focus();
    }

    root.replaceChildren(
      el("p", { class: "quiz__progress" }, "Question " + (current + 1) + " of " + questions.length),
      el("div", { class: "quiz__bar", "aria-hidden": "true" },
        el("span", { style: "width:" + (current / questions.length) * 100 + "%" })),
      heading,
      el("div", { class: "quiz__choices", role: "group", "aria-label": "Answer choices" }, choiceButtons),
      feedback,
      nextBtn);

    // Move focus to the new question (but not when the page first loads).
    if (current > 0) heading.focus();
  }

  function showResults() {
    const pct = Math.round((score / questions.length) * 100);
    const message = pct === 100 ? "Perfect score! 🌟"
      : pct >= 80 ? "Great job! 🎉"
      : pct >= 60 ? "Getting there. Review the flashcards and try again. 💪"
      : "Keep studying. You'll get it! 📚";

    const heading = el("h4", { class: "quiz__score", tabindex: "-1" },
      "You got " + score + " of " + questions.length + " (" + pct + "%)");

    root.replaceChildren(
      el("div", { class: "quiz__results" },
        heading,
        el("p", null, message),
        el("button", {
          class: "btn btn--primary",
          type: "button",
          onclick: function () { current = 0; score = 0; showQuestion(); root.querySelector(".quiz__question").focus(); },
        }, "↻ Try again")));
    heading.focus();
  }

  showQuestion();
  return root;
}
