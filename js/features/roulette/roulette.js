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

  const capImg = capSlot.querySelector("img");
  const swimImg = swimSlot.querySelector("img");

  let speed = 50; // 초기 속도 (ms)
  let ticks = 0;

  const maxTicks = 25;

  const interval = setInterval(() => {

    ticks++;

    // 🎰 랜덤 이미지 계속 변경
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

    // 🔥 easing (점점 느려짐)
    speed *= 1.08;

    clearInterval(interval);

    setTimeout(() => {
      if(ticks < maxTicks){
        interval = setInterval(arguments.callee, speed);
      } else {
        finishSpin(caps, swims);
      }
    }, speed);

  }, speed);

  function finishSpin(caps, swims){

    const finalCap =
      caps[Math.floor(Math.random() * caps.length)];

    const finalSwim =
      swims[Math.floor(Math.random() * swims.length)];

    // 🎯 최종 고정
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

    setResult("capId", finalCap.id);
    setResult("swimId", finalSwim.id);

    window.dispatchEvent(new CustomEvent("spin-end"));
  }
}
