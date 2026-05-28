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

  const randomCap =
    caps[Math.floor(Math.random() * caps.length)];

  const randomSwim =
    swims[Math.floor(Math.random() * swims.length)];

  setSelected("cap", randomCap.id);
  setSelected("swim", randomSwim.id);

  document.body.classList.remove("shuffle");

  // 🔥 각각 따로 폭발
  createConfetti("cap");
  createConfetti("swim");
}

function delay(ms){
  return new Promise(res => setTimeout(res, ms));
}

/* =========================
   CONFETTI (CARD BASED FIXED)
========================= */

function createConfetti(type){

  const card =
    document.querySelector(
      `.roulette-slot:nth-child(${
        type === "cap" ? 1 : 2
      }) .roulette-card`
    );

  if(!card) return;

  const rect = card.getBoundingClientRect();

  const COLORS = [
    "#a78bfa",
    "#8b5cf6",
    "#7c3aed",
    "#c4b5fd",
    "#6d28d9"
  ];

  const isMobile =
    window.innerWidth < 640;

  const count =
    isMobile ? 35 : 60;

  for(let i = 0; i < count; i++){

    const confetti = document.createElement("div");
    confetti.className = "confetti";

    // 🔥 카드 중심 기준 (모바일 포함 정확 보정)
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;

    confetti.style.background =
      COLORS[Math.floor(Math.random() * COLORS.length)];

    // 🔥 퍼짐 강화 (모바일은 살짝 줄임)
    const spreadX = isMobile ? 220 : 320;
    const spreadY = isMobile ? 180 : 260;

    confetti.style.setProperty(
      "--driftX",
      `${(Math.random() - 0.5) * spreadX}px`
    );

    confetti.style.setProperty(
      "--driftY",
      `${(Math.random() - 1.2) * spreadY}px`
    );

    // 크기 랜덤
    const size = 6 + Math.random() * 6;

    confetti.style.width = `${size}px`;
    confetti.style.height = `${size * 1.2}px`;

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 2400);
  }
}
