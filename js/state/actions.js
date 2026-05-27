import {
  getState
} from "./state.js";

// =========================
// ADD
// =========================
export function addCap(
  item
){

  const state =
    getState();

  state.data.caps.push(
    item
  );

  // 최초 active 지정
  if(
    !state.ui.activeCapId
  ){

    state.ui.activeCapId =
      item.id;
  }
}

export function addSwim(
  item
){

  const state =
    getState();

  state.data.swimsuits.push(
    item
  );

  // 최초 active 지정
  if(
    !state.ui.activeSwimId
  ){

    state.ui.activeSwimId =
      item.id;
  }
}

// =========================
// REMOVE
// =========================
export function removeCap(
  id
){

  const state =
    getState();

  state.data.caps =
    state.data.caps.filter(
      item =>
        item.id !== id
    );

  // 선택 제거
  if(
    state.selection.capId === id
  ){

    state.selection.capId =
      null;
  }

  // active 제거
  if(
    state.ui.activeCapId === id
  ){

    state.ui.activeCapId =
      state.data.caps[0]?.id
      || null;
  }
}

export function removeSwim(
  id
){

  const state =
    getState();

  state.data.swimsuits =
    state.data.swimsuits.filter(
      item =>
        item.id !== id
    );

  // 선택 제거
  if(
    state.selection.swimId === id
  ){

    state.selection.swimId =
      null;
  }

  // active 제거
  if(
    state.ui.activeSwimId === id
  ){

    state.ui.activeSwimId =
      state.data.swimsuits[0]?.id
      || null;
  }
}

// =========================
// SELECT
// =========================
export function setSelectedCap(
  id
){

  getState()
    .selection
    .capId = id;
}

export function setSelectedSwim(
  id
){

  getState()
    .selection
    .swimId = id;
}

// =========================
// ACTIVE
// =========================
export function setActiveCap(
  id
){

  const state =
    getState();

  state.ui.activeCapId =
    id;
}

export function setActiveSwim(
  id
){

  const state =
    getState();

  state.ui.activeSwimId =
    id;
}
