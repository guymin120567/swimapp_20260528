import {
  setState,
  defaultState,
  subscribe,
  getState
} from "../state/state.js";

import { renderLayout } from "../ui/renderLayout.js";
import { initDOM } from "../ui/dom.js";
import { loadState, saveState } from "../../db/database.js";
import { initTabs } from "../ui/tabs.js";
import { bindGlobal } from "../ui/events.js";

import { renderLists } from "../features/lists/renderLists.js";
import { renderRoulette } from "../features/roulette/renderRoulette.js";

import { bindDrag } from "../features/coverflow/drag.js";

export function initController(){

  async function boot(){

    console.log("BOOT START");

    const saved = await loadState();

    setState(saved || defaultState);

    renderLayout();

    initDOM();

    initTabs();

    bindGlobal();

    subscribe(async ()=>{

      renderLists();
      renderRoulette();

      requestAnimationFrame(()=>{
        bindDrag();
      });

      await saveState(getState());
    });

    renderLists();
    renderRoulette();

    requestAnimationFrame(()=>{
      bindDrag();
    });

    console.log("BOOT DONE");
  }

  return {
    boot
  };
}
