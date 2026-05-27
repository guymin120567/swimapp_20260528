import { getState, subscribe } from "../../state/state.js";

export function renderSwimsList(){

  const state = getState();
  const items = state.data.swimsuits;

  const target = document.getElementById("listsContent");
  if(!target) return;

  target.innerHTML = `
    <section class="coverflow-section">

      <div class="coverflow-title">수영복</div>

      <div class="coverflow" data-type="swim">

        ${items.map(item => `
          <div class="cover-card" data-type="swim" data-id="${item.id}">
            <div class="card-inner">

              ${
                item.image
                ? `<img class="card-image" src="${item.image}" />`
                : `<div class="card-placeholder">🏊</div>`
              }

              <button class="delete-btn" data-type="swim" data-id="${item.id}">
                ×
              </button>

              <div class="card-overlay">
                <div class="card-title">${item.name}</div>
              </div>

            </div>
          </div>
        `).join("")}

      </div>

    </section>
  `;
}

// 🔥 자동 갱신 연결
subscribe(renderSwimsList);
