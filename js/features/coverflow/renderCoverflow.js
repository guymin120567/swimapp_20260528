import {
  getState
} from "../../state/state.js";

export function renderCoverflow(){

  updateCoverflow(
    "cap"
  );

  updateCoverflow(
    "swim"
  );
}

function updateCoverflow(
  type
){

  const wrap =
    document.querySelector(
      `.coverflow[data-type="${type}"]`
    );

  if(!wrap) return;

  const cards =
    [
      ...wrap.querySelectorAll(
        ".cover-card"
      )
    ];

  if(!cards.length) return;

  const center =
    wrap.scrollLeft +
    wrap.clientWidth / 2;

  let nearestCard = null;

  let nearestDistance =
    Infinity;

  cards.forEach(
    (card,index)=>{

      const cardCenter =
        card.offsetLeft +
        card.offsetWidth / 2;

      const distance =
        cardCenter - center;

      const abs =
        Math.abs(distance);

      if(abs < nearestDistance){

        nearestDistance =
          abs;

        nearestCard =
          card;
      }

      const normalized =
        Math.min(
          abs / 260,
          1
        );

      const rotate =
        distance / 18;

      const scale =
        1 - normalized * 0.18;

      const blur =
        normalized * 2.2;

      const opacity =
        1 - normalized * 0.35;

      card.style.zIndex =
        String(
          1000 - Math.floor(abs)
        );

      card.style.transform = `
        translateZ(${
          120 - abs * 0.25
        }px)
        rotateY(${rotate}deg)
        scale(${scale})
      `;

      card.style.filter = `
        blur(${blur}px)
      `;

      card.style.opacity =
        opacity;

      requestAnimationFrame(()=>{

        card.classList.add(
          "ready"
        );

      });

    }
  );

  cards.forEach(card=>{

    card.classList.remove(
      "active"
    );

  });

  if(nearestCard){

    nearestCard.classList.add(
      "active"
    );

    syncActiveState(
      type,
      nearestCard.dataset.id
    );
  }
}

function syncActiveState(
  type,
  id
){

  const state =
    getState();

  if(type === "cap"){

    state.ui.activeCapId =
      id;

  }else{

    state.ui.activeSwimId =
      id;
  }
}
