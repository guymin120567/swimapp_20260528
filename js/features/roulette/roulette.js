import { getState } from "../../state/state.js";
import { setSelected } from "../../state/actions.js";

export async function spinAll(){

  const state = getState();

  const caps = state.items.filter(i => i.type === "cap");
  const swims = state.items.filter(i => i.type === "swim");

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

    const cap = caps[Math.floor(Math.random() * caps.length)];
    const swim = swims[Math.floor(Math.random() * swims.length)];

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
      finish(cap, swim);
    }
  };

  run();

  function finish(finalCap, finalSwim){

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

    setSelected("cap", finalCap.id);
    setSelected("swim", finalSwim.id);

    burst("cap");
    burst("swim");

    window.dispatchEvent(new CustomEvent("spin-end"));
  }
}

/* =========================
   FX BURST (개선 버전)
========================= */

function burst(type){

  const slot =
    document.querySelector(
      `.roulette-slot[data-type="${type}"] .roulette-card`
    );

  const fx = document.getElementById("fx-layer");
  if(!slot || !fx) return;

  const rect = slot.getBoundingClientRect();

  const colors = [
    "#a78bfa",
    "#8b5cf6",
    "#7c3aed",
    "#c4b5fd",
    "#ffd700"
  ];

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height * 0.25; // 🔥 위쪽 기준

  for(let i = 0; i < 45; i++){

    const el = document.createElement("div");
    el.className = "confetti";

    // 시작점: 카드 상단 근처 + 약간 랜덤
    el.style.left = centerX + (Math.random() - 0.5) * 40 + "px";
    el.style.top = centerY + (Math.random() * 20) + "px";

    // 🔥 핵심 움직임 (위로 튐 + 확산 + 낙하)
    const dx = (Math.random() - 0.5) * 220;
    const dy = (Math.random() * 160) + 120;

    el.style.setProperty("--dx", dx + "px");
    el.style.setProperty("--dy", dy + "px");

    el.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    fx.appendChild(el);

    // 안전 제거
    setTimeout(() => el.remove(), 2200);
  }
}
