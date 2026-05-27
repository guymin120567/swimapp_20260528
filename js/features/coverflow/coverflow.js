import {
  getState
} from "../../state/state.js";

import {
  renderCoverflow
} from "./renderCoverflow.js";

import {
  bindDrag
} from "./drag.js";

// =========================
// REFRESH ALL
// =========================
export function refreshCoverflow(){

  const state =
    getState();

  renderCoverflow({

    type:"cap",

    targetId:"capCoverflow",

    items:
      state.data.caps
  });

  renderCoverflow({

    type:"swim",

    targetId:"swimCoverflow",

    items:
      state.data.swimsuits
  });

  requestAnimationFrame(()=>{

    bindDrag();
  });
}

// =========================
// REFRESH SINGLE
// =========================
export function refreshSingleCoverflow(
  type
){

  const state =
    getState();

  if(type === "cap"){

    renderCoverflow({

      type:"cap",

      targetId:"capCoverflow",

      items:
        state.data.caps
    });

  }else{

    renderCoverflow({

      type:"swim",

      targetId:"swimCoverflow",

      items:
        state.data.swimsuits
    });
  }

  requestAnimationFrame(()=>{

    bindDrag();
  });
}
