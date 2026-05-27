import {
  getState
} from "./state.js";

// =========================
// SELECTION
// =========================

export function setSelectedCap(id){

  getState().selection.capId =
    id;

}

export function setSelectedSwim(id){

  getState().selection.swimId =
    id;

}

// =========================
// ACTIVE UI
// =========================

export function setActiveCap(id){

  getState().ui.activeCapId =
    id;

}

export function setActiveSwim(id){

  getState().ui.activeSwimId =
    id;

}
