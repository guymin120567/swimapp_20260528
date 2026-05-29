// js/features/roulette/roulette.js

import {
  getState
} from "../../state/state.js";

import {
  setSelected,
  setSpinning
} from "../../state/actions.js";

// =========================
// SPIN
// =========================

export async function spinAll(){

  const state =
    getState();

  // guard
  if(
    state.ui?.isSpinning
  ){
    return;
  }

  const caps =
    state.items.filter(
      i => i.type === "cap"
    );

  const swims =
    state.items.filter(
      i => i.type === "swim"
    );

  if(
    !caps.length ||
    !swims.length
  ){
    return;
  }

  const capSlot =
    document.querySelector(
      '.roulette-slot[data-type="cap"] .roulette-card'
    );

  const swimSlot =
    document.querySelector(
      '.roulette-slot[data-type="swim"] .roulette-card'
    );

  if(
    !capSlot ||
    !swimSlot
  ){
    return;
  }

  // spinning state
  setSpinning(true);

  capSlot.classList.add(
    "spinning"
  );

  swimSlot.classList.add(
    "spinning"
  );

  window.dispatchEvent(
    new CustomEvent(
      "spin-start"
    )
  );

  let ticks = 0;

  const maxTicks = 16;

  let speed = 45;

  const run = ()=>{

    const cap =
      caps[
        Math.floor(
          Math.random() *
          caps.length
        )
      ];

    const swim =
      swims[
        Math.floor(
          Math.random() *
          swims.length
        )
      ];

    updateSlot(
      capSlot,
      cap
    );

    updateSlot(
      swimSlot,
      swim
    );

    ticks++;

    speed *= 1.10;

    if(
      ticks < maxTicks
    ){

      setTimeout(
        run,
        speed
      );

    }else{

      finish(
        cap,
        swim
      );

    }

  };

  run();

  // =========================
  // FINISH
  // =========================

  function finish(
    finalCap,
    finalSwim
  ){

    renderFinal(
      capSlot,
      finalCap
    );

    renderFinal(
      swimSlot,
      finalSwim
    );

    capSlot.classList.remove(
      "spinning"
    );

    swimSlot.classList.remove(
      "spinning"
    );

    setSelected(
      "cap",
      finalCap.id
    );

    setSelected(
      "swim",
      finalSwim.id
    );

    burst("cap");

    burst("swim");

    setSpinning(false);

    window.dispatchEvent(
      new CustomEvent(
        "spin-stop"
      )
    );

  }

}

// =========================
// UPDATE SLOT
// =========================

function updateSlot(
  slot,
  item
){

  slot.innerHTML = `

    <img
      class="card-image"
      src="${item.image || ""}"
      alt="${item.name}"
      draggable="false"
    />

  `;

}

// =========================
// FINAL
// =========================

function renderFinal(
  slot,
  item
){

  slot.innerHTML = `

    <img
      class="card-image"
      src="${item.image || ""}"
      alt="${item.name}"
      draggable="false"
    />

    <div class="card-overlay">

      <div class="roulette-name">
        ${item.name}
      </div>

    </div>

  `;

}

// =========================
// CONFETTI
// =========================

function burst(type){

  const slot =
    document.querySelector(
      \`.roulette-slot[data-type="${type}"] .roulette-card`
    );

  const fx =
    document.getElementById(
      "fx-layer"
    );

  if(
    !slot ||
    !fx
  ){
    return;
  }

  const rect =
    slot.getBoundingClientRect();

  const colors = [

    "#a78bfa",
    "#8b5cf6",
    "#7c3aed",
    "#c4b5fd",
    "#ffd700"

  ];

  const centerX =
    rect.left +
    rect.width / 2;

  const centerY =
    rect.top +
    rect.height * 0.25;

  for(
    let i = 0;
    i < 45;
    i++
  ){

    const el =
      document.createElement(
        "div"
      );

    el.className =
      "confetti";

    el.style.left =
      centerX +
      (Math.random() - 0.5) * 20 +
      "px";

    el.style.top =
      centerY +
      (Math.random() * 10) +
      "px";

    const dx =
      (Math.random() - 0.5) * 260;

    const dy =
      (Math.random() * 180) + 140;

    el.style.setProperty(
      "--dx",
      dx + "px"
    );

    el.style.setProperty(
      "--dy",
      dy + "px"
    );

    el.style.background =
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];

    fx.appendChild(el);

    setTimeout(()=>{

      el.remove();

    },2200);

  }

}
