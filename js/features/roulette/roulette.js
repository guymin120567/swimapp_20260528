import {
  getState
} from "../../state/state.js";

import {
  setSelected
} from "../../state/actions.js";

export async function spinAll(){

  const state =
    getState();

  const caps =
    state.items.filter(
      item => item.type === "cap"
    );

  const swims =
    state.items.filter(
      item => item.type === "swim"
    );

  if(!caps.length) return;
  if(!swims.length) return;

  document.body.classList.add("shuffle");

  await delay(700);

  const randomCap =
    caps[Math.floor(Math.random() * caps.length)];

  const randomSwim =
    swims[Math.floor(Math.random() * swims.length)];

  setSelected("cap", randomCap.id);
  setSelected("swim", randomSwim.id);

  document.body.classList.remove("shuffle");

  // 🎯 살짝 텀 주고 폭발 (연출 강화)
  await delay(100);

  triggerWinEffect();
  createConfetti();
}

/* =========================
   DELAY
========================= */

function delay(ms){
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

/* =========================
   WIN EFFECT
========================= */

function triggerWinEffect(){

  const card =
    document.querySelector(".roulette-card");

  if(!card) return;

  card.classList.add("win");

  setTimeout(() => {
    card.classList.remove("win");
  }, 300);
}

/* =========================
   CONFETTI (CARD BASED)
========================= */

function createConfetti(){

  const card =
    document.querySelector(".roulette-card");

  if(!card) return;

  const rect =
    card.getBoundingClientRect();

  const COLORS = [
    "#a78bfa",
    "#8b5cf6",
    "#7c3aed",
    "#c4b5fd",
    "#6d28d9"
  ];

  for(let i = 0; i < 60; i++){

    const confetti =
      document.createElement("div");

    confetti.className = "confetti";

    // 🎯 카드 중심 기준
    const startX =
      rect.left + rect.width / 2;

    const startY =
      rect.top + rect.height / 2;

    confetti.style.left = `${startX}px`;
    confetti.style.top = `${startY}px`;

    // 🎨 보라 랜덤
    confetti.style.background =
      COLORS[Math.floor(Math.random() * COLORS.length)];

    // 🎯 퍼짐
    confetti.style.setProperty(
      "--driftX",
      `${(Math.random() - 0.5) * 320}px`
    );

    confetti.style.setProperty(
      "--driftY",
      `${(Math.random() - 1.2) * 260}px`
    );

    // 💡 크기 랜덤
    const size = 6 + Math.random() * 6;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size * 1.2}px`;

    // 💡 회전
    confetti.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 2400);
  }
}
