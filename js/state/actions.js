import {
  getState,
  setState
} from "./state.js";

// =========================
// ADD
// =========================

export function addCap(item){

  const state =
    getState();

  setState({
    data: {
      caps: [
        ...state.data.caps,
        item
      ]
    }
  });
}

export function addSwim(item){

  const state =
    getState();

  setState({
    data: {
      swimsuits: [
        ...state.data.swimsuits,
        item
      ]
    }
  });
}

// =========================
// REMOVE
// =========================

export function removeCap(id){

  const state =
    getState();

  setState({
    data: {
      caps:
        state.data.caps.filter(
          v => v.id !== id
        )
    }
  });
}

export function removeSwim(id){

  const state =
    getState();

  setState({
    data: {
      swimsuits:
        state.data.swimsuits.filter(
          v => v.id !== id
        )
    }
  });
}

// =========================
// SELECTION
// =========================

export function setSelectedCap(id){

  setState({
    selection: {
      capId: id
    }
  });
}

export function setSelectedSwim(id){

  setState({
    selection: {
      swimId: id
    }
  });
}

// =========================
// ACTIVE
// =========================

export function setActiveCap(id){

  setState({
    ui: {
      activeCapId: id
    }
  });
}

export function setActiveSwim(id){

  setState({
    ui: {
      activeSwimId: id
    }
  });
}
