import {
  renderLayout
} from "./renderLayout.js";

import {
  renderRoulette
} from "../features/roulette/renderRoulette.js";

import {
  renderLists
} from "../features/lists/renderLists.js";

// =========================
// FULL
// =========================
export function renderApp(){

  renderLayout();

  renderRoulette();

  renderLists();
}

// =========================
// ROULETTE ONLY
// =========================
export function renderRouletteOnly(){

  requestAnimationFrame(()=>{

    renderRoulette();
  });
}

// =========================
// LIST ONLY
// =========================
export function renderListsOnly(){

  requestAnimationFrame(()=>{

    renderLists();
  });
}
