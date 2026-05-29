import { getState } from "../../state/state.js";
import { setResult } from "../../state/actions.js";

export async function spinAll(){

  const state = getState();

  const caps =
    state.items.filter(i => i.type === "cap");

  const swims =
    state.items.filter(i => i.type === "swim");

  if(!caps.length || !swims.length) return;

  const capSlot =
    document.querySelector('.roulette-slot[data-type="cap"] .roulette-card');

  const swimSlot =
    document.querySelector('.roulette-slot[data-type="swim"] .roulette-card');

  if(!capSlot || !swimSlot) return;

  capSlot.classList.add("spinning");
  swimSlot.classList.add("spinning");

  const capImg = capSlot.querySelector("img");
  const swimImg = swimSlot.querySelector("img");

  let ticks = 0;

  const maxTicks = 16;
  let speed = 45;

  const run = () => {

    const cap =
      caps[Math.floor(Math.random() * caps.length)];

    const swim =
      swims[Math.floor(Math.random() * swims.length)];

    if(capImg){
      capImg.src = cap.image;
    } else {
      capSlot.innerHTML = `<img class="card-image" src="${cap.image}" />`;
    }

    if(swimImg){
      swimImg.src = swim.image;
    } else {
      swimSlot.innerHTML = `<img class="card-image" src="${swim.image}" />`;
    }

    ticks++;
    speed *= 1.10;

    if(ticks < maxTicks){
      setTimeout(run, speed);
    } else {
      finish(caps, swims, capSlot, swimSlot);
    }
  };

  run();

  function finish(caps, swims, capSlot, swimSlot){

    const finalCap =
      caps[Math.floor(Math.random() * caps.length)];

    const finalSwim =
      swims[Math.floor(Math.random() * swims.length)];

    capSlot.innerHTML = `
      <img class="card-image" src="${finalCap.image}" />
      <div class="card-overlay">
        <div class="roulette-name">${finalCap.name}</div>
      </div>
    `;

    swimSlot.innerHTML = `
      <img class="card-image" src="${finalSwim.image}" />
      <div class="card-overlay">
        <div class="roulette-name">${finalSwim.name}</div>
      </div>
    `;

    capSlot.classList.remove("spinning");
    swimSlot.classList.remove("spinning");

    setResult("capId", finalCap.id);
    setResult("swimId", finalSwim.id);

    burst("cap");
    burst("swim");

    window.dispatchEvent(new CustomEvent("spin-end"));
  }
}

function burst(type){

  const slot =
    document.querySelector(
      `.roulette-slot[data-type="${type}"] .roulette-card`
    );

  if(!slot) return;

  const rect = slot.getBoundingClientRect();
  const fx = document.getElementById("fx-layer");

  if(!fx) return;

  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  const colors = [
    "#a78bfa",
    "#8b5cf6",
    "#7c3aed",
    "#c4b5fd",
    "#6d28d9"
  ];

  for(let i=0;i<40;i++){

    const el = document.createElement("div");
    el.className = "confetti";

    el.style.left = x + "px";
    el.style.top = y + "px";

    el.style.setProperty("--dx", (Math.random()-0.5)*180 + "px");
    el.style.setProperty("--dy", (Math.random()*200) + 100 + "px");

    el.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    fx.appendChild(el);

    setTimeout(() => el.remove(), 2400);
  }
}
