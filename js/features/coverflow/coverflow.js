import { getState } from "../../state/state.js";
import { bindDrag } from "./drag.js";

export function renderCoverflow(){

  const state = getState();

  renderType("cap", state.data.caps);
  renderType("swim", state.data.swimsuits);

  requestAnimationFrame(bindDrag);
}

function renderType(type, items){

  const target = document.getElementById(`${type}Coverflow`);
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

      </div>
    </div>
  `).join("");
}
