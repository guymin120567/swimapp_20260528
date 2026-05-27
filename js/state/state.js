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

// =========================
// GET
// =========================
export function getState() {
  return state;
}

// =========================
// SUBSCRIBE
// =========================
export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit() {
  listeners.forEach(fn => fn(state));
}

// =========================
// SET (🔥 핵심)
// =========================
export function setState(partial) {

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
