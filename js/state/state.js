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
const listeners = new Set();

export function getState(){
  return state;
}

export function subscribe(fn){
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit(){
  listeners.forEach(fn => fn(state));
}

// 🔥 핵심: 항상 새로운 reference 보장
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

  emit();
}

// helpers
export function setActiveCapId(id){
  setState({ selection: { capId: id } });
}

export function setActiveSwimId(id){
  setState({ selection: { swimId: id } });
}
