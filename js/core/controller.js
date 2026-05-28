import {
  setState,
  defaultState,
  subscribe,
  getState
} from "../state/state.js";

import {
  renderLayout
} from "../ui/renderLayout.js";

import {
  initDOM
} from "../ui/dom.js";

import {
  loadState,
  saveState
} from "../../db/database.js";

import {
  initTabs
} from "../ui/tabs.js";

import {
  bindGlobal
} from "../ui/events.js";

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

    // =========================
    // MIGRATE OLD STRUCTURE
    // =========================

    let normalized =
      saved || defaultState;

    // 이전 구조:
    // data.caps
    // data.swimsuits
    // →
    // items[]

    if(
      normalized?.data
    ){

      normalized = {

        items: [

          ...(normalized.data.caps || [])
            .map(item=>({

              ...item,

              type:"cap"

            })),

          ...(normalized.data.swimsuits || [])
            .map(item=>({

              ...item,

              type:"swim"

            }))

        ],

        records:
          normalized.data.records || [],

        selection:
          normalized.selection || {

            capId:null,
            swimId:null

          },

        ui: {

          activeTab:
            normalized.ui?.activeTab
            || "roulette",

          activeItemId:
            normalized.ui?.activeItemId
            || null,

          isSpinning:
            normalized.ui?.isSpinning
            || false
        }
      };
    }

    // items 보호
    if(
      !Array.isArray(
        normalized.items
      )
    ){
      normalized.items = [];
    }

    setState(normalized);

    renderLayout();

    initDOM();

    initTabs();

    bindGlobal();

    // =========================
    // FIRST RENDER
    // =========================

    renderRoulette();

    renderCoverflow();

    // =========================
    // SUBSCRIBE
    // =========================

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
