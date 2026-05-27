export const defaultState = {

  data: {

    caps: [],

    swimsuits: [],

    records: []
  },

  selection: {

    capId: null,

    swimId: null
  },

  ui: {

    activeTab: "roulette",

    activeCapId: null,

    activeSwimId: null,

    isSpinning: false
  }
};

let state =
  structuredClone(
    defaultState
  );

// =========================
// GET
// =========================
export function getState(){

  return state;
}

// =========================
// SET
// =========================
export function setState(
  newState
){

  state = {

    ...state,

    data:{
      ...state.data,
      ...newState.data
    },

    selection:{
      ...state.selection,
      ...newState.selection
    },

    ui:{
      ...state.ui,
      ...newState.ui
    }
  };
}

// =========================
// UI
// =========================
export function setActiveTab(tab){

  state.ui.activeTab = tab;
}

export function setActiveCapId(id){

  state.ui.activeCapId = id;
}

export function setActiveSwimId(id){

  state.ui.activeSwimId = id;
}
