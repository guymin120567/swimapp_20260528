import {
  getState
} from "../../state/state.js";

export function renderCapsList(){

  const state =
    getState();

  const items =
    state.data.caps;

  return `

    <section class="coverflow-section">

      <div class="coverflow-title">
        수모
      </div>

      <div
        class="coverflow"
        data-type="cap"
      >

        ${
          items.map(item=>`

            <div
              class="cover-card"
              data-type="cap"
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

                <button
                  class="delete-btn"
                  data-action="delete"
                  data-type="cap"
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

          `).join("")
        }

      </div>

    </section>

  `;
}
