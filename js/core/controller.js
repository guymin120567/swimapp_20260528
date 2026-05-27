import { setState, defaultState, subscribe } from "../state/state.js";
import { renderLayout } from "../ui/renderLayout.js";
import { initDOM } from "../ui/dom.js";
import { loadState } from "../../db/database.js";
import { initTabs } from "../ui/tabs.js";
import { bindGlobal } from "../ui/events.js";

import { renderLists } from "../features/lists/renderLists.js";
import { renderRoulette } from "../features/roulette/renderRoulette.js";
import { renderCoverflow } from "../features/coverflow/renderCoverflow.js";

export function initController() {

  async function boot() {

    console.log("BOOT START");

    const saved = await loadState();
    setState(saved || defaultState);

    renderLayout();
    initDOM();

    initTabs();
    bindGlobal();

    // =========================
    // 🔥 UI 자동 반응
    // =========================
    subscribe(() => {
      renderLists();
      renderRoulette();
      renderCoverflow();
    });

    // 최초 1회
    renderLists();
    renderRoulette();
    renderCoverflow();

    console.log("BOOT DONE");
  }

  return { boot };
}
