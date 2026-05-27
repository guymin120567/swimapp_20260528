import {
  getState
} from "../../state/state.js";

import {
  setActiveCap,
  setActiveSwim
} from "../../state/actions.js";

export function bindDrag(){

  bindCoverflow(
    "capCoverflow",
    "cap"
  );

  bindCoverflow(
    "swimCoverflow",
    "swim"
  );

}

function bindCoverflow(
  id,
  type
){

  const container =
    document.getElementById(id);

  if(!container) return;

  if(
    container.offsetParent === null
  ) return;

  const cards =
    [
      ...container.querySelectorAll(
        ".cover-card"
      )
    ];

  if(!cards.length) return;

  updateDepth();

  function updateDepth(){

    let closest = null;

    let closestDistance =
      Infinity;

    cards.forEach(card => {

      const rect =
        card.getBoundingClientRect();

      const center =
        rect.left +
        rect.width / 2;

      const distance =
        Math.abs(
          window.innerWidth / 2
          - center
        );

      if(
        distance <
        closestDistance
      ){

        closestDistance =
          distance;

        closest =
          card;

      }

    });

    cards.forEach(card => {

      card.classList.remove(
        "active"
      );

    });

    if(!closest) return;

    closest.classList.add(
      "active"
    );

    const id =
      closest.dataset.id;

    if(type === "cap"){

      setActiveCap(id);

    }

    if(type === "swim"){

      setActiveSwim(id);

    }

  }

  container.addEventListener(
    "scroll",
    ()=>{

      requestAnimationFrame(
        updateDepth
      );

    }
  );

}
