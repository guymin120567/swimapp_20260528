import { getState } from "../../state/state.js";
import { setSelected } from "../../state/actions.js";
import { bindDrag } from "./drag.js";

export function renderCoverflow(){

  renderType("cap");
  renderType("swim");

  bindSelect();

  requestAnimationFrame(() => {
    bindDrag();
  });
}

/* ========================= */

function renderType(type){

  const target =
    document.querySelector(`.coverflow[data-type="${type}"]`);

  if(!target) return;

  const state = getState();

  const items =
    (state.items || []).filter(i => i.type === type);

  const selectedId =
    type === "cap"
      ? state.selection?.capId
      : state.selection?.swimId;

  if(!items.length){
    target.innerHTML = `<div class="empty-coverflow">아이템 없음</div>`;
    return;
  }

  target.innerHTML = items.map(item => `
    <div
      class="cover-card ${item.id === selectedId ? "active" : ""} ready"
      data-id="${item.id}"
      data-type="${type}"
    >
      <div class="card-inner">

        ${
          item.image
            ? `<img class="card-image" src="${item.image}" />`
            : `<div class="card-placeholder">🏊</div>`
        }

        <button class="delete-btn" data-action="delete">×</button>

        <div class="card-overlay">
          <div class="card-title">${item.name}</div>
        </div>

      </div>
    </div>
  `).join("");
}

/* =========================
   CLICK → SELECT + CENTER
========================= */

function bindSelect(){

  const wraps =
    document.querySelectorAll(".coverflow");

  wraps.forEach(wrap => {

    if(wrap.dataset.bound) return;
    wrap.dataset.bound = "true";

    wrap.addEventListener("click", e => {

      const card = e.target.closest(".cover-card");
      if(!card) return;
      if(e.target.closest(".delete-btn")) return;

      const type = card.dataset.type;
      const id = card.dataset.id;

      setSelected(type, id);

      requestAnimationFrame(() => {
        centerCard(wrap, card);
      });

    });

  });
}

/* ========================= */

function centerCard(wrap, card){

  const wrapRect = wrap.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  const offset =
    (cardRect.left - wrapRect.left) + wrap.scrollLeft;

  const target =
    offset - (wrap.clientWidth / 2) + (cardRect.width / 2);

  const max =
    wrap.scrollWidth - wrap.clientWidth;

  wrap.scrollTo({
    left: Math.max(0, Math.min(target, max)),
    behavior: "smooth"
  });

}
