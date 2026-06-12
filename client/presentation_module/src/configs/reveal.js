// src/configs/reveal.js
import Reveal from "reveal.js";
import "reveal.js/plugin/highlight/monokai.css";  // <-- add this
import RevealHighlight from "reveal.js/plugin/highlight/highlight.esm.js"; // keep .esm.js

export default function createDeck(el) {
    const deck = new Reveal(el, {
        plugins: [RevealHighlight],
        controls: true,
        progress: true,
        slideNumber: true,
        hash: false,
        history: false,
        transition: "fade",
        backgroundTransition: "fade",
    });

    return deck; // caller decides when to initialize/destroy
}
