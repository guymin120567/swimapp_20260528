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

let state = structuredClone(defaultState);

// =========================
// SUBSCRIBERS (🔥 핵심 추가)
// =========================
const listeners = new Set();

// =========================
// GET
// =========================
export function getState(){
  return state;
}

// =========================
// SUBSCRIBE (🔥 핵심)
// =========================
export function subscribe(fn){
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// =========================
// EMIT
// =========================
function emit(){
  listeners.forEach(fn => fn(state));
}

// =========================
// SET (🔥 완전 교체 핵심)
// =========================
export function setState(partial){

  state = {
    ...state,
    data: {
      ...state.data,
      ...(partial.data || {})
    },
    selection: {
      ...state.selection,
      ...(partial.selection || {})
    },
    ui: {
      ...state.ui,
      ...(partial.ui || {})
    }
  };

  emit(); // 🔥 자동 UI 트리거
}

// =========================
// HELPERS (선택 상태)
// =========================
export function setActiveTab(tab){

  setState({
    ui: {
      activeTab: tab
    }
  });
}

export function setActiveCapId(id){

  setState({
    ui: {
      activeCapId: id
    }
  });
}

export function setActiveSwimId(id){

  setState({
    ui: {
      activeSwimId: id
    }
  });
}
