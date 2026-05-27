import { getState, setState } from "../../state/state.js";
import { bindDrag } from "./drag.js";

export function renderCoverflow(){

  const state = getState();

  render("cap", state.data.caps);
  render("swim", state.data.swimsuits);

  requestAnimationFrame(bindDrag);
}

function render(type, items){

  const target = document.getElementById(`${type}Coverflow`);
  if(!target) return;

  target.innerHTML = items.map(item => `
    <div class="cover-card" data-type="${type}" data-id="${item.id}">
      <div class="card-inner">

        ${
          item.image
          ? `<img class="card-image" src="${item.image}" />`
          : `<div class="card-placeholder">?</div>`
        }

        <div class="card-overlay">
          <div class="card-title">${item.name}</div>
        </div>

      </div>
    </div>
  `).join("");

  bindClick();
}

// 🔥 핵심: 클릭 → setState
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
