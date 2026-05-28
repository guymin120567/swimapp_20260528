import {
  getState,
  setState
} from "../../state/state.js";

import { bindDrag } from "./drag.js";

export function renderCoverflow(){

  const state = getState();

  renderType(
    "cap",
    state.data.caps
  );

  renderType(
    "swim",
    state.data.swimsuits
  );

  requestAnimationFrame(()=>{
    bindDrag();
  });
}

function renderType(type, items){

  const target =
    document.querySelector(
      `.coverflow[data-type="${type}"]`
    );

  if(!target) return;

  target.innerHTML = items.map(item=>`

    <div
      class="cover-card ready"
      data-type="${type}"
      data-id="${item.id}"
    >

      <div class="card-inner">

        ${
          item.image
          ? `
            <img
              class="card-image"
              src="${item.image}"
              alt="${item.name}"
            />
          `
          : `
            <div class="card-placeholder">
              🏊
            </div>
          `
        }

        <div class="card-overlay">
          <div class="card-title">
            ${item.name}
          </div>
        </div>

        <button
          class="delete-btn"
          data-action="delete"
          data-type="${type}"
          data-id="${item.id}"
        >
          ×
        </button>

      </div>

    </div>

  `).join("");

  bindClick();
}

function bindClick(){

  const wraps =
    document.querySelectorAll(
      ".coverflow"
    );

  wraps.forEach(wrap=>{

    if(wrap.dataset.bound){
      return;
    }

    wrap.dataset.bound = "true";

    wrap.addEventListener("click", e=>{

      const card =
        e.target.closest(
          ".cover-card"
        );

      if(!card) return;

      const type =
        card.dataset.type;

      const id =
        card.dataset.id;

      const state =
        getState();

      setState({
        selection: {
          capId:
            type === "cap"
              ? id
              : state.selection.capId,

          swimId:
            type === "swim"
              ? id
              : state.selection.swimId
        }
      });
    });
  });
}
