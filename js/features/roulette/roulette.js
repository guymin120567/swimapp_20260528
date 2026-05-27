import {
  getState
} from "../../state/state.js";

import {
  setSelectedCap,
  setSelectedSwim,
  setActiveCap,
  setActiveSwim
} from "../../state/actions.js";

// =========================
// RANDOM
// =========================
function randomItem(arr){

  if(!arr?.length){

    return null;
  }

  const index =
    Math.floor(
      Math.random() * arr.length
    );

  return arr[index];
}

// =========================
// SPIN
// =========================
export async function spinAll(){

  const state =
    getState();

  const cap =
    randomItem(
      state.data.caps
    );

  const swim =
    randomItem(
      state.data.swimsuits
    );

  setSelectedCap(
    cap?.id || null
  );

  setSelectedSwim(
    swim?.id || null
  );

  // =========================
  // ACTIVE SYNC
  // =========================
  setActiveCap(
    cap?.id || null
  );

  setActiveSwim(
    swim?.id || null
  );

  return {

    cap,
    swim
  };
}
