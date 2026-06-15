// src/configs/reveal.js
import Reveal from "reveal.js";
import "reveal.js/plugin/highlight/monokai.css";
import RevealHighlight from "reveal.js/plugin/highlight/highlight.esm.js";
import RevealNotes from "reveal.js/plugin/notes/notes.esm.js";

export default function createDeck(el) {
  const deck = new Reveal(el, {
    plugins: [RevealHighlight, RevealNotes],
    controls: true,
    progress: true,
    slideNumber: true,
    hash: false,
    history: false,
    transition: "fade",
    backgroundTransition: "fade"
  });

  return deck;
}
