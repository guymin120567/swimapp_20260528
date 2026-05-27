import { setState, defaultState, subscribe } from "../state/state.js";
import { renderLayout } from "../ui/renderLayout.js";
import { initDOM } from "../ui/dom.js";
import { loadState } from "../../db/database.js";
import { initTabs } from "../ui/tabs.js";
import { bindGlobal } from "../ui/events.js";

import { renderLists } from "../features/lists/renderLists.js";
import { renderRoulette } from "../features/roulette/renderRoulette.js";

export function initController(){

  async function boot(){

    console.log("BOOT START");

    const saved = await loadState();
    setState(saved || defaultState);

    renderLayout();
    initDOM();

    initTabs();
    bindGlobal();

    // 🔥 UI subscribe (핵심만)
    subscribe(() => {
      renderLists();
      renderRoulette();
    });

    // 최초 렌더
    renderLists();
    renderRoulette();

    console.log("BOOT DONE");
  }

  return { boot };
}
