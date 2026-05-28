import {
  getState
} from "../../state/state.js";

export function renderRoulette(){

  const target =
    document.getElementById(
      "rouletteContent"
    );

  if(!target) return;

  const state =
    getState();

  // 안전 방어
  const items =
    Array.isArray(state.items)
      ? state.items
      : [];

  const cap =
    items.find(
      item=>
        item.id ===
        state.selection?.capId
    );

  const swim =
    items.find(
      item=>
        item.id ===
        state.selection?.swimId
    );

  target.innerHTML = `

    <div class="block">

      <div class="section-title">
        룰렛 결과
      </div>

      <div class="roulette-wrap">

        <div class="roulette-slot">

          <div class="roulette-label">
            CAP
          </div>

          <div class="roulette-card">

            ${
              cap
              ? `
                <img
                  class="card-image"
                  src="${cap.image || ""}"
                />

                <div class="card-overlay">

                  <div class="roulette-name">
                    ${cap.name}
                  </div>

                </div>
              `
              : `
                <div class="card-placeholder">
                  🧢
                </div>
              `
            }

          </div>

        </div>

        <div class="roulette-slot">

          <div class="roulette-label">
            SWIM
          </div>

          <div class="roulette-card">

            ${
              swim
              ? `
                <img
                  class="card-image"
                  src="${swim.image || ""}"
                />

                <div class="card-overlay">

                  <div class="roulette-name">
                    ${swim.name}
                  </div>

                </div>
              `
              : `
                <div class="card-placeholder">
                  🏊
                </div>
              `
            }

          </div>

        </div>

      </div>

      <div class="spin-row">

        <button
          class="spin-btn"
          data-action="spin"
        >
          SPIN
        </button>

      </div>

    </div>

  `;
}
