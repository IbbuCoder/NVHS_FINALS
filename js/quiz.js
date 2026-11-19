/*
 * quiz.js — a multiple-choice quiz widget.
 *
 *   createQuiz(questions) → an element you can put on the page
 *   questions: [{ question, choices: [...], answerIndex, explanation }]
 *
 * One question at a time, instant feedback after each answer, then a score
 * and a list of the questions you missed (with the right answers).
 */
function createQuiz(questions) {
  if (!questions || !questions.length) {
    return el("p", { class: "empty" }, "This unit has no quiz yet.");
  }

  let current = 0;
  let missedQuestions = []; // questions answered wrong this round
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
    }, isLast ? "See results" : "Next question");

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
      if (!correct) missedQuestions.push(q);

      choiceButtons.forEach(function (btn, j) {
        btn.disabled = true;
        if (j === q.answerIndex) btn.classList.add("is-correct");
        if (j === i && !correct) btn.classList.add("is-wrong");
      });

      feedback.className = "quiz__feedback " + (correct ? "is-correct" : "is-wrong");
      feedback.replaceChildren(
        el("strong", null, correct ? "Correct." : "Incorrect. The answer is " + q.choices[q.answerIndex] + "."),
        q.explanation ? el("p", null, q.explanation) : null);

      nextBtn.hidden = false;
      nextBtn.focus();
    }

    root.replaceChildren(
      el("p", { class: "quiz__progress" }, "Question " + (current + 1) + " of " + questions.length),
      heading,
      el("div", { class: "quiz__choices", role: "group", "aria-label": "Answer choices" }, choiceButtons),
      feedback,
      nextBtn);

    // Move focus to the new question (but not when the page first loads).
    if (current > 0) heading.focus();
  }

  function showResults() {
    const total = questions.length;
    const score = total - missedQuestions.length;

    const heading = el("h4", { class: "quiz__score", tabindex: "-1" },
      score + " out of " + total + " correct");

    const review = missedQuestions.length
      ? [
          el("p", null, "Review these before you retake the quiz:"),
          el("ol", { class: "quiz__review" }, missedQuestions.map(function (q) {
            return el("li", null, q.question,
              el("span", null, "Answer: " + q.choices[q.answerIndex]));
          })),
        ]
      : el("p", null, "You answered every question correctly.");

    root.replaceChildren(
      heading,
      ...[].concat(review), // review may be one element or a list
      el("button", {
        class: "btn btn--primary",
        type: "button",
        onclick: function () {
          current = 0;
          missedQuestions = [];
          showQuestion();
          root.querySelector(".quiz__question").focus();
        },
      }, "Retake quiz"));
    heading.focus();
  }

  showQuestion();
  return root;
}
