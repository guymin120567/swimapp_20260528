import {
  getState
} from "../../state/state.js";

import {
  setSelectedCap,
  setSelectedSwim
} from "../../state/actions.js";

import {
  renderRoulette
} from "./renderRoulette.js";

// =========================
// SPIN
// =========================
export async function spinAll(){

  const state =
    getState();

  const caps =
    state.data.caps;

  const swims =
    state.data.swimsuits;

  if(!caps.length) return;

  if(!swims.length) return;

  const randomCap =
    caps[
      Math.floor(
        Math.random() *
        caps.length
      )
    ];

  const randomSwim =
    swims[
      Math.floor(
        Math.random() *
        swims.length
      )
    ];

  setSelectedCap(
    randomCap.id
  );

  setSelectedSwim(
    randomSwim.id
  );

  renderRoulette();

}
