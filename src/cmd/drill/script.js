// Copyright 2025 Fernando Borretti
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

document.addEventListener("DOMContentLoaded", function () {
  // Render inline math
  document.querySelectorAll(".math-inline").forEach(function (element) {
    katex.render(element.textContent, element, {
      displayMode: false,
      throwOnError: false,
      macros: MACROS,
    });
  });
  // Render display math
  document.querySelectorAll(".math-display").forEach(function (element) {
    katex.render(element.textContent, element, {
      displayMode: true,
      throwOnError: false,
      macros: MACROS,
    });
  });
  // Initialize syntax highlighting
  if (typeof hljs !== "undefined") {
    hljs.highlightAll();
  }
  const cardContent = document.querySelector(".card-content");
  if (cardContent) {
    cardContent.style.opacity = "1";
  }
});

document.addEventListener("keydown", function (event) {
  // Skip during text input.
  if (event.target.tagName === "INPUT" && event.target.type === "text") {
    return;
  }

  // Ignore modifiers.
  if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
    return;
  }

  const keybindings = {
    " ": "reveal", // Space
    u: "undo",
    1: "forgot",
    2: "hard",
    3: "good",
    4: "easy",
    p: "play-audio",
  };

  if (keybindings[event.key]) {
    event.preventDefault();
    const id = keybindings[event.key];

    // Play/pause audio.
    if (id === "play-audio") {
      const audio = document.querySelector("audio");
      if (audio) {
        audio.paused ? audio.play() : audio.pause();
      }
      return;
    }

    // If the card isn't revealed yet, number keys reveal first.
    const reveal = document.getElementById("reveal");
    if (reveal && id !== "reveal" && id !== "undo") {
      reveal.click();
      return;
    }

    const node = document.getElementById(id);
    if (node) {
      node.click();
    }
  }
});
