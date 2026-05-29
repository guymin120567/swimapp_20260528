import { getState, setState } from "./state.js";

// =========================
// ITEMS
// =========================

export function addItem(item){

  const state = getState();

  setState({
    items: [...(state.items || []), item]
  });
}

export function removeItem(id){

  const state = getState();

  setState({
    items: (state.items || []).filter(i => i.id !== id)
  });
}

// =========================
// SELECTION (UI + RESULT 통합)
// =========================

export function setSelected(type, id){

  const state = getState();

  setState({
    selection: {
      ...(state.selection || {}),
      ...(type === "cap" ? { capId: id } : {}),
      ...(type === "swim" ? { swimId: id } : {})
    }
  });
}
