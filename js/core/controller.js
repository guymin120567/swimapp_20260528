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

    // =========================
    // 1. LAYOUT 먼저
    // =========================

    renderLayout();

    initDOM();

    initTabs();

    bindGlobal();

    // =========================
    // 2. LOAD
    // =========================

    const saved =
      await loadState();

    let normalized =
      saved || defaultState;

    // old migrate
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

        ui:
          normalized.ui || {

            activeTab:"roulette"
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

    // =========================
    // 3. SUBSCRIBE 먼저
    // =========================

    subscribe(async ()=>{

      renderRoulette();

      renderCoverflow();

      await saveState(
        getState()
      );

    });

    // =========================
    // 4. STATE 적용
    // =========================

    setState(normalized);

    // =========================
    // 5. 최초 렌더
    // =========================

    renderRoulette();

    renderCoverflow();

    console.log("BOOT DONE");
  }

  return {
    boot
  };
}
