import { getState } from "../../state/state.js";
import { setSelected } from "../../state/actions.js";

export async function spinAll(){

  const state = getState();

  const caps = state.items.filter(i => i.type === "cap");
  const swims = state.items.filter(i => i.type === "swim");

  if(!caps.length || !swims.length) return;

  document.body.classList.add("shuffle");

  await delay(700);

  const cap = caps[Math.floor(Math.random() * caps.length)];
  const swim = swims[Math.floor(Math.random() * swims.length)];

  setSelected("cap", cap.id);
  setSelected("swim", swim.id);

  document.body.classList.remove("shuffle");

  createConfetti();
}

function delay(ms){
  return new Promise(r => setTimeout(r, ms));
}

/* =========================
   CONFETTI FIX (핵심)
========================= */

function createConfetti(){

  const card =
    document.querySelector(".roulette-card");

  if(!card) return;

  const rect = card.getBoundingClientRect();

  const COLORS = [
    "#a78bfa",
    "#8b5cf6",
    "#7c3aed",
    "#c4b5fd",
    "#6d28d9"
  ];

  for(let i = 0; i < 60; i++){

    const el = document.createElement("div");
    el.className = "confetti";

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    el.style.position = "fixed";
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    el.style.background =
      COLORS[Math.floor(Math.random() * COLORS.length)];

    el.style.setProperty("--driftX", `${(Math.random()-0.5)*320}px`);
    el.style.setProperty("--driftY", `${(Math.random()-1.2)*260}px`);

    el.style.width = `${6 + Math.random()*6}px`;
    el.style.height = `${6 + Math.random()*8}px`;

    el.style.transform = "translate(-50%, -50%)";

    document.body.appendChild(el);

    setTimeout(() => el.remove(), 2400);
  }
}
