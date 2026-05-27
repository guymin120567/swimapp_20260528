import { setState, defaultState } from "../state/state.js";
import { renderLayout } from "../ui/renderLayout.js";
import { initDOM } from "../ui/dom.js";
import { loadState } from "../../db/database.js";
import { initTabs } from "../ui/tabs.js";
import { bindGlobal } from "../ui/events.js";

export function initController(){

  async function boot(){

    console.log("BOOT START");

    const saved = await loadState();

    setState(saved || defaultState);

    // UI 생성
    renderLayout();

    // DOM 캐시
    initDOM();

    // 이벤트
    initTabs();
    bindGlobal();

    console.log("BOOT DONE");
  }

  return { boot };
}
