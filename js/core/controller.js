import {
  setState,
  defaultState,
  subscribe,
  getState
} from "../state/state.js";

import { renderLayout } from "../ui/renderLayout.js";
import { initDOM } from "../ui/dom.js";

import {
  loadState,
  saveState
} from "../../db/database.js";

import { initTabs } from "../ui/tabs.js";
import { bindGlobal } from "../ui/events.js";

import {
  renderRoulette
} from "../features/roulette/renderRoulette.js";

import {
  renderCoverflow
} from "../features/coverflow/coverflow.js";

export function initController(){

  async function boot(){

    console.log("BOOT START");

    const saved =
      await loadState();

    setState(
      saved || defaultState
    );

    renderLayout();

    initDOM();

    initTabs();

    bindGlobal();

    // 최초 렌더
    renderRoulette();

    renderCoverflow();

    // 상태 구독
    subscribe(async ()=>{

      renderRoulette();

      renderCoverflow();

      await saveState(
        getState()
      );

    });

    console.log("BOOT DONE");
  }

  return {
    boot
  };
}
