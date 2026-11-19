/*
 * flashcards.js — a flashcard deck widget.
 *
 *   createFlashcards(cards) → an element you can put on the page
 *   cards: [{ front, back }]
 *
 * Features: flip (click / Enter / Space), previous & next (buttons or
 * ← → keys), shuffle, and a "missed" pile you can study on its own.
 */
function createFlashcards(cards) {
  if (!cards || !cards.length) {
    return el("p", { class: "empty" }, "This unit has no flashcards yet.");
  }

  // ----- State -----
  let deck = cards.slice(); // the cards we're currently going through
  let index = 0; // which card in `deck` is showing
  let flipped = false;
  let studyingMissed = false;
  const missed = new Set(); // card objects marked "Missed it"

  // ----- Elements -----
  // Each side of the card has a small header (side + count) above the red line.
  function makeFace(side) {
    const label = el("span");
    const count = el("span");
    const text = el("span", { class: "flashcard__text" });
    const face = el("span", { class: "flashcard__face flashcard__face--" + side },
      el("span", { class: "flashcard__head", "aria-hidden": "true" }, label, count),
      text);
    return { face: face, label: label, count: count, text: text };
  }
  const front = makeFace("front");
  const back = makeFace("back");

  const card = el("button", { class: "flashcard", type: "button", onclick: flip },
    el("span", { class: "flashcard__inner" }, front.face, back.face));

  const status = el("p", { class: "visually-hidden", "aria-live": "polite" });
  const modeLabel = el("p", { class: "deck__mode" });

  const prevBtn = el("button", { class: "btn", type: "button", onclick: prev }, "Previous");
  const flipBtn = el("button", { class: "btn", type: "button", onclick: flip }, "Flip");
  const nextBtn = el("button", { class: "btn", type: "button", onclick: next }, "Next");
  const missBtn = el("button", { class: "btn btn--miss", type: "button", onclick: markMissed }, "Missed it");
  const gotBtn = el("button", { class: "btn btn--got", type: "button", onclick: markGot }, "Got it");
  const shuffleBtn = el("button", { class: "btn-link", type: "button", onclick: shuffle }, "Shuffle");
  const pileBtn = el("button", { class: "btn-link", type: "button", onclick: togglePile });

  const root = el("div", { class: "deck" },
    modeLabel,
    card,
    status,
    el("div", { class: "deck__row" }, prevBtn, flipBtn, nextBtn),
    el("div", { class: "deck__row" }, missBtn, gotBtn),
    el("div", { class: "deck__extras" }, shuffleBtn, pileBtn));

  // ← → keys work anywhere inside the deck.
  root.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  });

  // ----- Actions -----
  function flip() {
    if (!deck.length) return;
    flipped = !flipped;
    render();
  }
  function go(newIndex) {
    if (!deck.length) return;
    index = (newIndex + deck.length) % deck.length; // wraps around
    flipped = false;
    render();
  }
  function next() { go(index + 1); }
  function prev() { go(index - 1); }

  function shuffle() {
    // Fisher–Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    go(0);
  }

  function markMissed() {
    if (!deck.length) return;
    missed.add(deck[index]);
    next();
  }

  function markGot() {
    if (!deck.length) return;
    const current = deck[index];
    missed.delete(current);
    if (studyingMissed) {
      // Take it out of the missed pile; the next card slides into this spot.
      deck.splice(index, 1);
      if (index >= deck.length) index = 0;
      flipped = false;
      render();
    } else {
      next();
    }
  }

  function togglePile() {
    if (studyingMissed) {
      studyingMissed = false;
      deck = cards.slice();
    } else {
      if (!missed.size) return;
      studyingMissed = true;
      deck = cards.filter(function (c) { return missed.has(c); });
    }
    index = 0;
    flipped = false;
    render();
    card.focus();
  }

  // ----- Draw the current state -----
  function render() {
    const hasCards = deck.length > 0;

    modeLabel.hidden = !studyingMissed;
    modeLabel.textContent = "Studying missed cards only";

    if (!hasCards) {
      // Only happens after every missed card is marked "Got it".
      front.label.textContent = "";
      front.count.textContent = "";
      front.text.textContent = "You've cleared every missed card.";
      back.text.textContent = "";
      card.classList.remove("is-flipped");
      card.setAttribute("aria-label", "You've cleared every missed card.");
      status.textContent = "Missed pile cleared.";
    } else {
      const c = deck[index];
      const count = (index + 1) + " of " + deck.length;
      front.label.textContent = "Question";
      back.label.textContent = "Answer";
      front.count.textContent = count;
      back.count.textContent = count;
      front.text.textContent = c.front;
      back.text.textContent = c.back;
      card.classList.toggle("is-flipped", flipped);
      // Screen readers only hear the side that's showing.
      front.face.setAttribute("aria-hidden", String(flipped));
      back.face.setAttribute("aria-hidden", String(!flipped));
      card.setAttribute("aria-label",
        (flipped ? "Answer: " + c.back : "Question: " + c.front) + ". Select to flip.");
      status.textContent = "Card " + count + ", " + (flipped ? "answer side" : "question side") + ".";
    }

    [prevBtn, flipBtn, nextBtn, missBtn, gotBtn, shuffleBtn].forEach(function (b) {
      b.disabled = !hasCards;
    });
    missBtn.hidden = studyingMissed; // already in the pile

    pileBtn.textContent = studyingMissed
      ? "Study all cards"
      : missed.size ? "Study missed cards (" + missed.size + ")" : "Study missed cards";
    pileBtn.disabled = !studyingMissed && missed.size === 0;
  }

  render();
  return root;
}
