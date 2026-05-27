import {
  getState
} from "../state/state.js";

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
      v => v.id === state.selection.capId
    );

  const swim =
    state.data.swimsuits.find(
      v => v.id === state.selection.swimId
    );

  target.innerHTML = `

    <div class="result-area">

      <div class="result-card">

        <div class="result-label">
          CAP
        </div>

        ${
          cap
          ? `
            <img
              class="result-image"
              src="${cap.image}"
              alt="${cap.name}"
            />

            <div class="result-name">
              ${cap.name}
            </div>
          `
          : `
            <div class="result-empty">
              없음
            </div>
          `
        }

      </div>

      <div class="result-card">

        <div class="result-label">
          SWIMSUIT
        </div>

        ${
          swim
          ? `
            <img
              class="result-image"
              src="${swim.image}"
              alt="${swim.name}"
            />

            <div class="result-name">
              ${swim.name}
            </div>
          `
          : `
            <div class="result-empty">
              없음
            </div>
          `
        }

      </div>

    </div>

  `;
}
