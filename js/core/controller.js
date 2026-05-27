import {
  getState,
  setState,
  defaultState
} from "../state/state.js";

import {
  addCap,
  addSwim,
  removeCap,
  removeSwim,
  setActiveCap,
  setActiveSwim
} from "../state/actions.js";

import {
  renderLayout
} from "../ui/renderLayout.js";

import {
  renderLists
} from "../features/lists/renderLists.js";

import {
  renderRoulette
} from "../features/roulette/renderRoulette.js";

import {
  initTabs
} from "../ui/tabs.js";

import {
  initDOM
} from "../ui/dom.js";

import {
  loadState,
  saveState
} from "../../db/database.js";

import {
  compressImage
} from "../utils/image.js";

import {
  spinAll
} from "../features/roulette/roulette.js";

// =========================
// CONTROLLER
// =========================
export function initController(){

  async function boot(){

    console.log("BOOT START");

    // =========================
    // 1. LOAD STATE
    // =========================
    let saved = null;

    try {
      saved = await loadState();
    } catch (e) {
      console.warn("STATE LOAD FAILED", e);
    }

    if (saved) {
      setState(saved);
    } else {
      setState(structuredClone(defaultState));
    }

    normalizeState();

    // =========================
    // 2. RENDER UI FIRST
    // =========================
    renderLayout();

    // =========================
    // 3. CACHE DOM AFTER RENDER
    // =========================
    initDOM();

    // =========================
    // 4. INIT FEATURES
    // =========================
    renderRoulette();
    renderLists();
    initTabs();

    bindGlobal();

    console.log("BOOT DONE");
  }

  // =========================
  // NORMALIZE
  // =========================
  function normalizeState(){

    const state = getState();

    setState({

      data: {
        caps: Array.isArray(state.data?.caps) ? state.data.caps : [],
        swimsuits: Array.isArray(state.data?.swimsuits) ? state.data.swimsuits : [],
        records: Array.isArray(state.data?.records) ? state.data.records : []
      },

      selection: {
        capId: state.selection?.capId || null,
        swimId: state.selection?.swimId || null
      },

      ui: {
        activeTab: state.ui?.activeTab || "roulette",
        activeCapId: state.ui?.activeCapId || null,
        activeSwimId: state.ui?.activeSwimId || null,
        isSpinning: false
      }
    });
  }

  // =========================
  // RENDER HELP
  // =========================
  function rerender(){
    renderRoulette();
    renderLists();
  }

  async function persist(){
    await saveState(getState());
  }

  // =========================
  // ADD ITEM
  // =========================
  async function submitSelectedItem(){

    const typeEl = document.getElementById("itemType");
    const textEl = document.getElementById("itemText");
    const imageEl = document.getElementById("itemImage");

    if(!typeEl || !textEl || !imageEl) return;

    const type = typeEl.value;
    const text = textEl.value.trim();
    const file = imageEl.files?.[0];

    if(!text){
      alert("이름 입력");
      return;
    }

    let image = null;

    if(file){
      image = await compressImage(file);
    }

    const item = {
      id: crypto.randomUUID(),
      name: text,
      image
    };

    if(type === "cap"){
      addCap(item);
    } else {
      addSwim(item);
    }

    textEl.value = "";
    imageEl.value = "";

    rerender();
    await persist();
  }

  // =========================
  // REMOVE
  // =========================
  async function removeItem(type, id){

    const ok = confirm("정말 삭제할까요?");
    if(!ok) return;

    if(type === "cap"){
      removeCap(id);
    } else {
      removeSwim(id);
    }

    rerender();
    await persist();
  }

  // =========================
  // ACTIVE
  // =========================
  function setActiveItem(type, id){

    if(type === "cap"){
      setActiveCap(id);
    } else {
      setActiveSwim(id);
    }

    renderLists();
  }

  // =========================
  // GLOBAL EVENTS
  // =========================
  function bindGlobal(){

    document.addEventListener("click", async (e) => {

      const action = e.target.dataset.action;

      if(action === "spin"){
        await spinAll();
        renderRoulette();
        await persist();
        return;
      }

      if(action === "add"){
        await submitSelectedItem();
        return;
      }

      const removeBtn = e.target.closest(".delete-btn");

      if(removeBtn){
        e.stopPropagation();

        await removeItem(
          removeBtn.dataset.type,
          String(removeBtn.dataset.id)
        );

        return;
      }

      const card = e.target.closest(".cover-card");

      if(card){
        setActiveItem(card.dataset.type, card.dataset.id);
      }
    });
  }

  return { boot };
}
