import {
  getState
} from "../../state/state.js";

export function renderCapsList(){

  const state =
    getState();

  return `

    <section class="list-block">

      <div class="list-title">
        CAPS
      </div>

      <div
        id="capCoverflow"
        class="coverflow"
      >

        ${
          state.data.caps.map(item => `

            <div
              class="
                cover-card
                ${
                  item.id ===
                  state.ui.activeCapId
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
