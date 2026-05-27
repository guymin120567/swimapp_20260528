import {
  getState
} from "../../state/state.js";

// =========================
// RENDER
// =========================
export function renderRoulette(){

  const target =
    document.getElementById(
      "rouletteSection"
    );

  if(!target) return;

  const state =
    getState();

  const cap =
    state.data.caps.find(
      item =>
        item.id ===
        state.selection.capId
    );

  const swim =
    state.data.swimsuits.find(
      item =>
        item.id ===
        state.selection.swimId
    );

  target.innerHTML = `

  <div class="roulette-wrap">

    <div class="roulette-slot">

      <div class="roulette-label">
        🧢 수모
      </div>

      <div class="roulette-card">

        ${
          cap?.image
          ? `
          <img
            src="${cap.image}"
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

          <div class="roulette-name">
            ${
              cap?.name || "없음"
            }
          </div>

        </div>

      </div>

    </div>

    <div class="roulette-slot">

      <div class="roulette-label">
        🩲 수영복
      </div>

      <div class="roulette-card">

        ${
          swim?.image
          ? `
          <img
            src="${swim.image}"
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

          <div class="roulette-name">
            ${
              swim?.name || "없음"
            }
          </div>

        </div>

      </div>

    </div>

  </div>

  <div class="spin-row">

    <button
      id="spinButton"
      class="spin-btn"
      data-action="spin"
    >
      오늘의 코디 뽑기
    </button>

  </div>
`;

  refreshCoverflow();
}
