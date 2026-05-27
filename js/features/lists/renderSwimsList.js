import {
  getState
} from "../state/state.js";

export function renderSwimsList(){

  const state =
    getState();

  return `

    <section class="list-block">

      <div class="list-title">
        SWIMSUITS
      </div>

      <div
        id="swimCoverflow"
        class="coverflow"
      >

        ${
          state.data.swimsuits.map(item => `

            <div
              class="
                cover-card
                ${
                  item.id ===
                  state.ui.activeSwimId
                  ? "active"
                  : ""
                }
              "
              data-id="${item.id}"
            >

              <img
                src="${item.image}"
                alt="${item.name}"
              />

              <div class="cover-name">
                ${item.name}
              </div>

            </div>

          `).join("")
        }

      </div>

    </section>

  `;
}
