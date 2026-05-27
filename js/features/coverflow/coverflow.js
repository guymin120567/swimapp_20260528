import { getState, setState } from "../../state/state.js";
import { bindDrag } from "./drag.js";

export function renderCoverflow(){

  const state = getState();

  renderType("cap", state.data.caps);
  renderType("swim", state.data.swimsuits);

  requestAnimationFrame(() => {
    bindDrag();
  });
}

function renderType(type, items){

  const target = document.querySelector(`.coverflow[data-type="${type}"]`);
  if(!target) return;

  target.innerHTML = items.map(item => `
    <div class="cover-card" data-type="${type}" data-id="${item.id}">
      <div class="card-inner">

        ${item.image
          ? `<img class="card-image" src="${item.image}" />`
          : `<div class="card-placeholder">?</div>`
        }

        <div class="card-overlay">
          <div class="card-title">${item.name}</div>
        </div>

        <button class="delete-btn" data-type="${type}" data-id="${item.id}">
          ×
        </button>

      </div>
    </div>
  `).join("");

  bindClick();
}

function bindClick(){

  document.querySelectorAll(".cover-card").forEach(card => {

    card.onclick = () => {

      const type = card.dataset.type;
      const id = card.dataset.id;

      const state = getState();

      if(type === "cap"){
        setState({
          selection: {
            capId: id,
            swimId: state.selection.swimId
          }
        });
      }

      if(type === "swim"){
        setState({
          selection: {
            capId: state.selection.capId,
            swimId: id
          }
        });
      }
    };
  });
}
