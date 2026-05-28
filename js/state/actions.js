import {
  getState,
  setState
} from "./state.js";

// =========================
// ITEMS
// =========================

export function addItem(item){

  const state =
    getState();

  const items =
    Array.isArray(state.items)
      ? state.items
      : [];

  setState({

    items: [
      ...items,
      item
    ]

  });
}

export function removeItem(id){

  const state =
    getState();

  const items =
    Array.isArray(state.items)
      ? state.items
      : [];

  setState({

    items:
      items.filter(
        item => item.id !== id
      )

  });
}

// =========================
// SELECTION (UI 선택)
// =========================

export function setSelected(type, id){

  const state =
    getState();

  const selection = {
    ...(state.selection || {})
  };

  if(type === "cap"){
    selection.capId = id;
  }

  if(type === "swim"){
    selection.swimId = id;
  }

  setState({
    selection
  });
}

// =========================
// RESULT (룰렛 결과)
// =========================

export function setResult(type, id){

  const state =
    getState();

  const result = {
    ...(state.result || {})
  };

  if(type === "capId"){
    result.capId = id;
  }

  if(type === "swimId"){
    result.swimId = id;
  }

  setState({
    result
  });
}
