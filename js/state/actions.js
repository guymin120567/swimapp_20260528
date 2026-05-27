import {
  getState
} from "./state.js";

// =========================
// ADD
// =========================

export function addCap(item){

  getState()
    .data
    .caps
    .push(item);

}

export function addSwim(item){

  getState()
    .data
    .swimsuits
    .push(item);

}

// =========================
// REMOVE
// =========================

export function removeCap(id){

  const state =
    getState();

  state.data.caps =
    state.data.caps.filter(
      v => v.id !== id
    );

}

export function removeSwim(id){

  const state =
    getState();

  state.data.swimsuits =
    state.data.swimsuits.filter(
      v => v.id !== id
    );

}

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
// ACTIVE
// =========================

export function setActiveCap(id){

  getState().ui.activeCapId =
    id;

}

export function setActiveSwim(id){

  getState().ui.activeSwimId =
    id;

}
