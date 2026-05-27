import {
  getState
} from "../state/state.js";

import {
  refreshCoverflow
} from "../components/coverflow/index.js";

export function renderLists(){

  const target =
    document.getElementById(
      "listsSection"
    );

  if(!target) return;

  const state =
    getState();

  target.innerHTML = `

    <div class="lists-wrap">

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

    </div>

  `;

  requestAnimationFrame(()=>{

    refreshCoverflow();

  });

}
