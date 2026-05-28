import {
  getState
} from "../../state/state.js";

import {
  setSelectedCap,
  setSelectedSwim
} from "../../state/actions.js";

export async function spinAll(){

  const state =
    getState();

  const caps =
    state.data.caps || [];

  const swims =
    state.data.swimsuits || [];

  if(!caps.length) return;

  if(!swims.length) return;

  const root =
    document.body;

  root.classList.add(
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

  setSelectedCap(
    randomCap.id
  );

  setSelectedSwim(
    randomSwim.id
  );

  root.classList.remove(
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

  for(
    let i = 0;
    i < 42;
    i++
  ){

    const confetti =
      document.createElement(
        "div"
      );

    confetti.className =
      "confetti";

    confetti.style.left =
      Math.random() * 100 +
      "vw";

    confetti.style.background =
      `hsl(${
        Math.random() * 360
      } 90% 70%)`;

    confetti.style.setProperty(
      "--driftX",
      `${
        (Math.random() - .5)
        * 220
      }px`
    );

    document.body.appendChild(
      confetti
    );

    setTimeout(()=>{

      confetti.remove();

    },2400);
  }
}
