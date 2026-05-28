import {
  getState
} from "../../state/state.js";

import {
  setSelected
} from "../../state/actions.js";

import {
  bindDrag
} from "./drag.js";

export function renderCoverflow(){

  renderType("cap");

  renderType("swim");

  bindSelect();

  requestAnimationFrame(()=>{

    bindDrag();

  });
}

function renderType(type){

  const target =
    document.querySelector(
      `.coverflow[data-type="${type}"]`
    );

  if(!target) return;

  const state =
    getState();

  const allItems =
    Array.isArray(state.items)
      ? state.items
      : [];

  const items =
    allItems.filter(
      item=>item.type === type
    );

  // =========================
  // EMPTY
  // =========================

  if(!items.length){

    target.innerHTML = `

      <div class="empty-coverflow">

        아이템 없음

      </div>

    `;

    return;
  }

  // =========================
  // RENDER
  // =========================

  target.innerHTML =

    items.map(item=>`

      <div
        class="cover-card ready"
        data-id="${item.id}"
        data-type="${type}"
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

          <button
            class="delete-btn"
            data-action="delete"
            data-id="${item.id}"
          >
            ×
          </button>

          <div class="card-overlay">

            <div class="card-title">
              ${item.name}
            </div>

          </div>

        </div>

      </div>

    `).join("");
}

function bindSelect(){

  const wraps =
    document.querySelectorAll(".coverflow");

  wraps.forEach(wrap => {

    if(wrap.dataset.bound){
      return;
    }

    wrap.dataset.bound = "true";

    wrap.addEventListener("click", e => {

      const card =
        e.target.closest(".cover-card");

      if(!card) return;

      if(e.target.closest(".delete-btn")) return;

      const type = card.dataset.type;
      const id = card.dataset.id;

      // 1. 상태 저장
      setSelected(type, id);

      // 2. 중앙 이동
      centerCard(wrap, card);

    });

  });
}


function centerCard(wrap, card){

  const targetScroll =
    card.offsetLeft +
    card.clientWidth / 2 -
    wrap.clientWidth / 2;

  const maxScroll =
    wrap.scrollWidth - wrap.clientWidth;

  const clamped =
    Math.max(0, Math.min(targetScroll, maxScroll));

  wrap.scrollTo({
    left: clamped,
    behavior: "smooth"
  });
}
