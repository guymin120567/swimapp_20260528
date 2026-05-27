import { getState, setState } from "../../state/state.js";

export function renderCoverflow(){
  updateCoverflow("cap");
  updateCoverflow("swim");
}

function updateCoverflow(type){

  const wrap = document.querySelector(`.coverflow[data-type="${type}"]`);
  if(!wrap) return;

  const cards = [...wrap.querySelectorAll(".cover-card")];
  if(!cards.length) return;

  const center = wrap.scrollLeft + wrap.clientWidth / 2;

  let nearestCard = null;
  let nearestDistance = Infinity;

  cards.forEach(card => {

    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = cardCenter - center;
    const abs = Math.abs(distance);

    if(abs < nearestDistance){
      nearestDistance = abs;
      nearestCard = card;
    }

    const normalized = Math.min(abs / 260, 1);

    const rotate = distance / 18;
    const scale = 1 - normalized * 0.18;
    const blur = normalized * 2.2;
    const opacity = 1 - normalized * 0.35;

    card.style.zIndex = String(1000 - Math.floor(abs));

    card.style.transform = `
      translateZ(${120 - abs * 0.25}px)
      rotateY(${rotate}deg)
      scale(${scale})
    `;

    card.style.filter = `blur(${blur}px)`;
    card.style.opacity = opacity;

    requestAnimationFrame(() => {
      card.classList.add("ready");
    });
  });

  cards.forEach(card => card.classList.remove("active"));

  if(nearestCard){

    nearestCard.classList.add("active");

    // ✅ 핵심: 반드시 setState 사용
    const state = getState();

    if(type === "cap"){
      setState({
        selection: {
          capId: nearestCard.dataset.id,
          swimId: state.selection.swimId
        }
      });
    } else {
      setState({
        selection: {
          capId: state.selection.capId,
          swimId: nearestCard.dataset.id
        }
      });
    }
  }
}
