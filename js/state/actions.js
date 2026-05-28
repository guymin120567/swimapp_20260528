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

  setState({

    items: [
      ...state.items,
      item
    ]

  });
}

export function removeItem(id){

  const state =
    getState();

  setState({

    items:
      state.items.filter(
        item=>item.id !== id
      )

  });
}

// =========================
// SELECT
// =========================

export function setSelected(type,id){

  if(type === "cap"){

    setState({
      selection: {
        capId:id
      }
    });

    return;
  }

  if(type === "swim"){

    setState({
      selection: {
        swimId:id
      }
    });

  }
}
