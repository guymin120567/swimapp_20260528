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
    // LAYOUT
    // =========================

    renderLayout();

    initDOM();

    initTabs();

    bindGlobal();

    // =========================
    // LOAD
    // =========================

    const saved =
      await loadState();

    let normalized =
      saved || defaultState;

    // =========================
    // OLD DATA MIGRATION
    // =========================

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

            activeTab:"roulette",

            activeItemId:null,

            isSpinning:false
          }
      };
    }

    // =========================
    // SAFE ITEMS
    // =========================

    if(
      !Array.isArray(
        normalized.items
      )
    ){
      normalized.items = [];
    }

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

    // =========================
    // APPLY
    // =========================

    setState(normalized);

    // =========================
    // FIRST RENDER
    // =========================

    renderRoulette();

    renderCoverflow();

    console.log("BOOT DONE");
  }

  return {
    boot
  };
}
