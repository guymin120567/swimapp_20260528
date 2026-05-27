import {
  getState
} from "../../state/state.js";

// =========================
// RENDER
// =========================
export function renderCoverflow({

  type,
  targetId,
  items
}){

  const target =
    document.getElementById(
      targetId
    );

  if(!target) return;

  const state =
    getState();

  // =========================
  // ACTIVE ID
  // =========================
  const activeId =
    type === "cap"
      ? state.ui.activeCapId
      : state.ui.activeSwimId;

  // =========================
  // ACTIVE INDEX
  // =========================
  let activeIndex =
    items.findIndex(
      item =>
        item.id === activeId
    );

  if(activeIndex < 0){

    activeIndex = 0;
  }

  // =========================
  // EMPTY
  // =========================
  if(!items.length){

    target.innerHTML = `

    <div class="empty-card">

      아이템 없음

    </div>

    `;

    return;
  }

  // =========================
  // HTML
  // =========================
  target.innerHTML = `

  <div
    class="coverflow"
    id="${targetId}Scroll"
  >

    ${
      items.map((item,index)=>{

        const distance =
          Math.abs(
            index - activeIndex
          );

        return `

        <div
          class="
            cover-card
            ${
              distance === 0
                ? "active"
                : ""
            }
          "
          data-type="${type}"
          data-index="${index}"
          data-id="${item.id}"
        >

          <div class="card-inner">

            ${
              item.image
              ? `
              <img
                src="${item.image}"
                class="card-image"
                draggable="false"
              />
              `
              : `
              <div class="card-placeholder">
                🌊
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
              data-type="${type}"
              data-id="${item.id}"
            >
              ×
            </button>

          </div>

        </div>

        `;
      }).join("")
    }

  </div>

  `;

  // =========================
  // INITIAL CENTER
  // =========================
  requestAnimationFrame(()=>{

    const wrap =
      document.getElementById(
        `${targetId}Scroll`
      );

    if(!wrap) return;

    const activeCard =
      wrap.querySelector(
        ".cover-card.active"
      );

    if(!activeCard) return;

    const targetLeft =
      activeCard.offsetLeft -
      (
        wrap.clientWidth / 2 -
        activeCard.clientWidth / 2
      );

    wrap.scrollLeft =
      targetLeft;
  });
}
