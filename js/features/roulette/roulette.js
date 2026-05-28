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
      item=>item.type === "cap"
    );

  const swims =
    state.items.filter(
      item=>item.type === "swim"
    );

  if(!caps.length) return;

  if(!swims.length) return;

  document.body.classList.add(
    "shuffle"
  );

  await delay(700);

  const randomCap =
    caps[
      Math.floor(
        Math.random() *
        caps.length
      )
    ];

  const randomSwim =
    swims[
      Math.floor(
        Math.random() *
        swims.length
      )
    ];

  setSelected(
    "cap",
    randomCap.id
  );

  setSelected(
    "swim",
    randomSwim.id
  );

  document.body.classList.remove(
    "shuffle"
  );

  createConfetti();
}

function delay(ms){

  return new Promise(
    resolve=>{

      setTimeout(
        resolve,
        ms
      );

    }
  );
}

function createConfetti(){

  const card =
    document.querySelector(".roulette-card");

  if(!card) return;

  const rect =
    card.getBoundingClientRect();

  const PURPLE_COLORS = [
    "#a78bfa",
    "#8b5cf6",
    "#7c3aed",
    "#c4b5fd",
    "#6d28d9"
  ];

  for(let i=0;i<50;i++){

    const confetti =
      document.createElement("div");

    confetti.className = "confetti";

    // 카드 중심 기준 시작점
    const startX =
      rect.left + rect.width / 2;

    const startY =
      rect.top + rect.height / 2;

    confetti.style.left =
      startX + "px";

    confetti.style.top =
      startY + "px";

    // 보라 계열 랜덤 색
    confetti.style.background =
      PURPLE_COLORS[
        Math.floor(
          Math.random() *
          PURPLE_COLORS.length
        )
      ];

    // 퍼짐 방향
    confetti.style.setProperty(
      "--driftX",
      `${(Math.random() - 0.5) * 260}px`
    );

    confetti.style.setProperty(
      "--driftY",
      `${(Math.random() - 0.5) * 180}px`
    );

    document.body.appendChild(confetti);

    setTimeout(()=>{
      confetti.remove();
    }, 2400);
  }
}
