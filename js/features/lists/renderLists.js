import {
  getState
} from "../../state/state.js";

import {
  refreshCoverflow
} from "../coverflow/coverflow.js";

// =========================
// RENDER
// =========================
export function renderLists(){

  const target =
    document.getElementById(
      "listsSection"
    );

  if(!target) return;

  const state =
    getState();

  target.innerHTML = `

  <div class="list-page">

    <div class="coverflow-section">

      <div class="coverflow-title">
        🧢 수모
      </div>

      <div id="capCoverflow"></div>

    </div>

    <div class="coverflow-section">

      <div class="coverflow-title">
        🩲 수영복
      </div>

      <div id="swimCoverflow"></div>

    </div>

    <!-- =========================
         ADD
    ========================== -->

    <div class="add-form">

      <select id="itemType">

        <option value="cap">
          수모
        </option>

        <option value="swim">
          수영복
        </option>

      </select>

      <input
        id="itemText"
        type="text"
        placeholder="이름 입력"
      />

      <input
        id="itemImage"
        type="file"
        accept="image/*"
      />

      <button
        class="add-btn"
        data-action="add"
      >
        추가
      </button>

    </div>

    <!-- =========================
         CAP
    ========================== -->

    <div class="list-block">

      <div class="list-title">
        🧢 수모
      </div>

      <div class="item-list">

        ${
          state.data.caps
            .map(item=>{

              return `

              <div class="item-card">

                ${
                  item.image
                  ? `
                  <img
                    src="${item.image}"
                    class="item-thumb"
                  />
                  `
                  : `
                  <div class="item-thumb placeholder">
                    🌊
                  </div>
                  `
                }

                <div class="item-name">
                  ${item.name}
                </div>

                <button
                  class="delete-btn"
                  data-type="cap"
                  data-id="${item.id}"
                >
                  삭제
                </button>

              </div>

              `;
            })
            .join("")
        }

      </div>

    </div>

    <!-- =========================
         SWIM
    ========================== -->

    <div class="list-block">

      <div class="list-title">
        🩲 수영복
      </div>

      <div class="item-list">

        ${
          state.data.swimsuits
            .map(item=>{

              return `

              <div class="item-card">

                ${
                  item.image
                  ? `
                  <img
                    src="${item.image}"
                    class="item-thumb"
                  />
                  `
                  : `
                  <div class="item-thumb placeholder">
                    🌊
                  </div>
                  `
                }

                <div class="item-name">
                  ${item.name}
                </div>

                <button
                  class="delete-btn"
                  data-type="swim"
                  data-id="${item.id}"
                >
                  삭제
                </button>

              </div>

              `;
            })
            .join("")
        }

      </div>

    </div>

  </div>

  `;

  refreshCoverflow();
}
