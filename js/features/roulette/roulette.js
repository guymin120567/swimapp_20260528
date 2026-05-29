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

  const colors = ["#a78bfa","#8b5cf6","#7c3aed","#c4b5fd","#ffd700"];

  for(let i=0;i<50;i++){

    const el = document.createElement("div");
    el.className = "confetti";

    // 👉 카드 내부 기준으로 들어가게 변경
    const x = (Math.random() * rect.width);
    const y = (Math.random() * rect.height * 0.3);

    el.style.left = x + "px";
    el.style.top = y + "px";

    // 🔥 핵심: “위로 튐 + 옆 퍼짐”
    const dx = (Math.random() - 0.5) * 300;
    const dy = (Math.random() - 1.2) * 250;

    el.style.setProperty("--dx", dx + "px");
    el.style.setProperty("--dy", dy + "px");

    // 👉 카드 안에서 움직이게
    slot.appendChild(el);

    // 👉 카드 아래로 “흐르는 느낌” 추가
    const drift = setInterval(() => {
      el.style.transform += ` translateY(1.2px)`;
    }, 16);

    setTimeout(() => {
      clearInterval(drift);
      el.remove();
    }, 2600);
  }
}
