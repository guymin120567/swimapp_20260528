import { getState, setState, defaultState } from "../state/state.js";
import { addCap, addSwim, removeCap, removeSwim, setActiveCap, setActiveSwim } from "../state/actions.js";
import { renderLayout } from "../ui/renderLayout.js";
import { renderLists } from "../features/lists/renderLists.js";
import { renderRoulette } from "../features/roulette/renderRoulette.js";
import { initTabs } from "../ui/tabs.js";
import { initDOM } from "../ui/dom.js";
import { loadState, saveState } from "../../db/database.js";
import { compressImage } from "../utils/image.js";
import { spinAll } from "../features/roulette/roulette.js";

export function initController(){

  async function boot(){

    console.log("BOOT START");

    let saved = null;

    try {
      saved = await loadState();
    } catch (e) {
      console.warn("LOAD FAIL", e);
    }

    setState(saved || structuredClone(defaultState));

    normalizeState();

    // UI 먼저 생성
    renderLayout();

    // DOM 캐싱
    initDOM();

    // 렌더
    renderRoulette();
    renderLists();
    initTabs();

    bindGlobal();

    console.log("BOOT DONE");
  }

  function normalizeState(){

    const state = getState();

    setState({
      data: {
        caps: state.data?.caps || [],
        swimsuits: state.data?.swimsuits || [],
        records: state.data?.records || []
      },
      selection: {
        capId: state.selection?.capId || null,
        swimId: state.selection?.swimId || null
      },
      ui: {
        activeTab: state.ui?.activeTab || "roulette",
        isSpinning: false
      }
    });
  }

  function rerender(){

    requestAnimationFrame(() => {
      renderRoulette();
      renderLists();
    });
  }

  function bindGlobal(){

    document.addEventListener("click", async (e) => {

      const action = e.target.dataset.action;

      if(action === "spin"){
        await spinAll();
        renderRoulette();
        await saveState(getState());
      }

      if(action === "add"){
        // 기존 로직 유지
      }

      const card = e.target.closest(".cover-card");

      if(card){
        setActiveItem(card.dataset.type, card.dataset.id);
      }
    });
  }

  function setActiveItem(type, id){

    if(type === "cap"){
      setActiveCap(id);
    } else {
      setActiveSwim(id);
    }

    renderLists();
  }

  return { boot };
}
