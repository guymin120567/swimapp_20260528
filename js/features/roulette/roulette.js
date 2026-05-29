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

function burst(type){

  const slot =
    document.querySelector(
      `.roulette-slot[data-type="${type}"] .roulette-card`
    );

  if(!slot) return;

  const rect = slot.getBoundingClientRect();
  const fx = document.getElementById("fx-layer");

  if(!fx) return;

  const colors = ["#a78bfa","#8b5cf6","#7c3aed","#c4b5fd","#6d28d9","#facc15"];

  const baseX = rect.left + rect.width / 2;
  const baseY = rect.top + rect.height / 2;

  for(let i=0;i<60;i++){

    const el = document.createElement("div");
    el.className = "confetti";

    // 🔥 중심에서 살짝 랜덤 시작
    const x = baseX + (Math.random() - 0.5) * 20;
    const y = baseY + (Math.random() - 0.5) * 10;

    el.style.left = x + "px";
    el.style.top = y + "px";

    // 🔥 핵심: "위로 튀는 힘" + 좌우 확산
    const upwardForce = - (Math.random() * 280 + 120);

    el.style.setProperty("--dx", (Math.random() - 0.5) * 420 + "px");
    el.style.setProperty("--dy", upwardForce + "px");

    // 속도 다양성
    el.style.animationDuration = (1.4 + Math.random() * 0.9) + "s";

    // 크기 다양성 (카지노 느낌)
    const size = 6 + Math.random() * 6;
    el.style.width = size + "px";
    el.style.height = size + "px";

    el.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    fx.appendChild(el);

    setTimeout(() => el.remove(), 2600);
  }
}
