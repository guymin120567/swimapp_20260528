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

  // =========================
  // LOCK
  // =========================

  setSpinning(true);

  const spinBtn =
    document.querySelector(
      ".spin-btn"
    );

  if(spinBtn){
    spinBtn.disabled = true;
  }

  capSlot.classList.remove(
    "winner"
  );

  swimSlot.classList.remove(
    "winner"
  );

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

  const maxTicks = 24;

  let speed = 38;

  let finalCap =
    caps[0];

  let finalSwim =
    swims[0];

  const run = ()=>{

    finalCap =
      caps[
        Math.floor(
          Math.random() *
          caps.length
        )
      ];

    finalSwim =
      swims[
        Math.floor(
          Math.random() *
          swims.length
        )
      ];

    updateSlot(
      capSlot,
      finalCap
    );

    updateSlot(
      swimSlot,
      finalSwim
    );

    ticks++;

    // =========================
    // EASING
    // =========================

    if(ticks < 8){

      speed *= 1.08;

    }else if(
      ticks < 16
    ){

      speed *= 1.14;

    }else{

      speed *= 1.2;

    }

    if(
      ticks < maxTicks
    ){

      setTimeout(
        run,
        speed
      );

    }else{

      finish(
        finalCap,
        finalSwim
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

    capSlot.classList.add(
      "winner"
    );

    swimSlot.classList.add(
      "winner"
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

    setTimeout(()=>{

      setSpinning(false);

      if(spinBtn){
        spinBtn.disabled = false;
      }

      window.dispatchEvent(
        new CustomEvent(
          "spin-stop"
        )
      );

    }, 500);

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
      `.roulette-slot[data-type="${type}"] .roulette-card`
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
    rect.height * 0.32;

  const amount =
    window.innerWidth < 768
      ? 55
      : 90;

  for(
    let i = 0;
    i < amount;
    i++
  ){

    const el =
      document.createElement(
        "div"
      );

    el.className =
      "confetti";

    el.style.left =
      centerX + "px";

    el.style.top =
      centerY + "px";

    const spread =
      (Math.random() - 0.5);

const dx =
  spread * (
    280 +
    Math.random() * 240
  );

const dy =
  340 +
  Math.random() * 380;

    el.style.setProperty(
      "--dx",
      `${dx}px`
    );

    el.style.setProperty(
      "--dy",
      `${dy}px`
    );

    const lift =
  120 +
  Math.random() * 180;

el.style.setProperty(
  "--lift",
  `${lift}px`
);
    
    el.style.setProperty(
      "--rot",
      `${Math.random() * 1080}deg`
    );

    el.style.background =
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];

    el.style.width =
      6 +
      Math.random() * 6 +
      "px";

    el.style.height =
      8 +
      Math.random() * 8 +
      "px";

    fx.appendChild(el);

    setTimeout(()=>{

      el.remove();

    },2600);

  }

}
