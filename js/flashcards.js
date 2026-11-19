/*
 * flashcards.js — a flashcard deck widget.
 *
 *   createFlashcards(cards) → an element you can put on the page
 *   cards: [{ front, back }]
 *
 * Features: flip (click / Enter / Space), previous & next (buttons or
 * ← → keys), shuffle, and a "missed it" pile you can practice on its own.
 */
function createFlashcards(cards) {
  if (!cards || !cards.length) {
    return el("p", { class: "empty" }, "No flashcards for this unit yet.");
  }

  // ----- State -----
  let deck = cards.slice(); // the cards we're currently going through
  let index = 0; // which card in `deck` is showing
  let flipped = false;
  let practicingMissed = false;
  const missed = new Set(); // card objects marked "missed it"

  // ----- Elements -----
  const frontFace = el("span", { class: "flashcard__face flashcard__face--front" });
  const backFace = el("span", { class: "flashcard__face flashcard__face--back" });
  const card = el("button", {
    class: "flashcard",
    type: "button",
    onclick: flip,
  }, el("span", { class: "flashcard__inner" }, frontFace, backFace));

  const position = el("p", { class: "deck__position", "aria-live": "polite" });
  const modeLabel = el("p", { class: "deck__mode" });

  const prevBtn = el("button", { class: "btn", type: "button", onclick: prev }, "← Prev");
  const flipBtn = el("button", { class: "btn", type: "button", onclick: flip }, "Flip");
  const nextBtn = el("button", { class: "btn", type: "button", onclick: next }, "Next →");
  const missBtn = el("button", { class: "btn btn--miss", type: "button", onclick: markMissed }, "✗ Missed it");
  const gotBtn = el("button", { class: "btn btn--got", type: "button", onclick: markGot }, "✓ Got it");
  const shuffleBtn = el("button", { class: "btn btn--ghost", type: "button", onclick: shuffle }, "🔀 Shuffle");
  const pileBtn = el("button", { class: "btn btn--ghost", type: "button", onclick: togglePile });

  const root = el("div", { class: "deck" },
    modeLabel,
    card,
    position,
    el("div", { class: "deck__row" }, prevBtn, flipBtn, nextBtn),
    el("div", { class: "deck__row" }, missBtn, gotBtn),
    el("div", { class: "deck__row deck__row--small" }, shuffleBtn, pileBtn));

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
    if (practicingMissed) {
      // Remove it from the practice pile; stay at the same position.
      deck.splice(index, 1);
      if (index >= deck.length) index = 0;
      flipped = false;
      render();
    } else {
      next();
    }
  }

  function togglePile() {
    if (practicingMissed) {
      practicingMissed = false;
      deck = cards.slice();
    } else {
      if (!missed.size) return;
      practicingMissed = true;
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

    modeLabel.textContent = practicingMissed ? "Practicing your missed pile" : "";
    modeLabel.hidden = !practicingMissed;

    if (!hasCards) {
      // Only happens when the missed pile is cleared.
      frontFace.textContent = "🎉 Missed pile cleared!";
      backFace.textContent = "";
      card.classList.remove("is-flipped");
      card.setAttribute("aria-label", "Missed pile cleared");
      position.textContent = "Nice work. Go back to all cards to keep studying.";
    } else {
      const c = deck[index];
      frontFace.textContent = c.front;
      backFace.textContent = c.back;
      card.classList.toggle("is-flipped", flipped);
      // Screen readers only hear the side that's showing.
      frontFace.setAttribute("aria-hidden", String(flipped));
      backFace.setAttribute("aria-hidden", String(!flipped));
      card.setAttribute("aria-label",
        (flipped ? "Answer: " + c.back : "Question: " + c.front) + ". Press to flip.");
      position.textContent = "Card " + (index + 1) + " of " + deck.length +
        " · " + (flipped ? "answer" : "question") +
        (missed.has(c) ? " · in missed pile" : "");
    }

    [prevBtn, flipBtn, nextBtn, missBtn, gotBtn, shuffleBtn].forEach(function (b) {
      b.disabled = !hasCards;
    });
    missBtn.hidden = practicingMissed; // already in the pile

    pileBtn.textContent = practicingMissed
      ? "← Back to all cards"
      : "Practice missed (" + missed.size + ")";
    pileBtn.disabled = !practicingMissed && missed.size === 0;
  }

  render();
  return root;
}
