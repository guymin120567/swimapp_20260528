// js/core/controller.js

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

// =========================
// CONTROLLER
// =========================

export function initController(){

  let saveTimer = null;

  // =========================
  // RENDER
  // =========================

  function renderApp(){

    renderRoulette();

    renderCoverflow();

  }

  // =========================
  // BOOT
  // =========================

  async function boot(){

    console.log(
      "BOOT START"
    );

    // =========================
    // LAYOUT
    // =========================

    renderLayout();

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
    // OLD MIGRATION
    // =========================

    if(
      normalized?.data
    ){

      normalized = {

        items:[

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

    subscribe(()=>{

      renderApp();

      // debounce save
      clearTimeout(
        saveTimer
      );

      saveTimer =
        setTimeout(()=>{

          saveState(
            getState()
          );

        },200);

    });

    // =========================
    // APPLY
    // =========================

    setState(
      normalized
    );

    console.log(
      "BOOT DONE"
    );

  }

  return {

    boot

  };

}
