import { getState } from "../../state/state.js";
import { setResult } from "../../state/actions.js";

export async function spinAll(){

  const state = getState();

  const caps =
    state.items.filter(i => i.type === "cap");

  const swims =
    state.items.filter(i => i.type === "swim");

  if(!caps.length || !swims.length) return;

  window.dispatchEvent(new CustomEvent("spin-start"));

  // 🔥 충분히 돌아가는 시간 확보
  await delay(3200);

  const cap =
    caps[Math.floor(Math.random() * caps.length)];

  const swim =
    swims[Math.floor(Math.random() * swims.length)];

  setResult("capId", cap.id);
  setResult("swimId", swim.id);

  window.dispatchEvent(new CustomEvent("spin-stop"));

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      burst("cap");
      burst("swim");
    });
  });
}

function delay(ms){
  return new Promise(r => setTimeout(r, ms));
}

/* =========================
   CONFETTI
========================= */

function burst(type){

  requestAnimationFrame(() => {

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

    const colors = ["#a78bfa","#8b5cf6","#7c3aed","#c4b5fd","#6d28d9"];

    for(let i=0;i<45;i++){

      const el = document.createElement("div");
      el.className = "confetti";

      el.style.left = x + "px";
      el.style.top = y + "px";

      el.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      el.style.setProperty("--dx", (Math.random()-0.5)*320 + "px");
      el.style.setProperty("--dy", (Math.random()-1.2)*260 + "px");

      fx.appendChild(el);

      setTimeout(() => el.remove(), 2400);
    }

    slot.classList.add("win");

    setTimeout(() => slot.classList.remove("win"), 400);

  });
}
