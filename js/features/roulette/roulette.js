import { getState } from "../../state/state.js";
import { setSelected } from "../../state/actions.js";

export async function spinAll(){

  const state = getState();

  const caps =
    state.items.filter(i => i.type === "cap");

  const swims =
    state.items.filter(i => i.type === "swim");

  if(!caps.length || !swims.length) return;

  document.body.classList.add("shuffle");

  await delay(700);

  const cap =
    caps[Math.floor(Math.random() * caps.length)];

  const swim =
    swims[Math.floor(Math.random() * swims.length)];

  setSelected("cap", cap.id);
  setSelected("swim", swim.id);

  document.body.classList.remove("shuffle");

  requestAnimationFrame(() => {
    burst("cap");
    burst("swim");
  });
}

function delay(ms){
  return new Promise(r => setTimeout(r, ms));
}

/* =========================
   CONFETTI CORE (FIXED)
========================= */

function burst(type){

  const slot =
    document.querySelector(
      `.roulette-slot[data-type="${type}"] .roulette-card`
    );

  if(!slot) return;

  const rect = slot.getBoundingClientRect();

  const fx =
    document.getElementById("fx-layer");

  if(!fx) return;

  const colors = [
    "#a78bfa",
    "#8b5cf6",
    "#7c3aed",
    "#c4b5fd",
    "#6d28d9"
  ];

  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  for(let i = 0; i < 50; i++){

    const el = document.createElement("div");
    el.className = "confetti";

    el.style.left = originX + "px";
    el.style.top = originY + "px";

    el.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    el.style.setProperty(
      "--dx",
      (Math.random() - 0.5) * 320 + "px"
    );

    el.style.setProperty(
      "--dy",
      (Math.random() - 1.2) * 260 + "px"
    );

    fx.appendChild(el);

    setTimeout(() => el.remove(), 2400);
  }

  slot.classList.add("win");

  setTimeout(() => {
    slot.classList.remove("win");
  }, 400);
}
