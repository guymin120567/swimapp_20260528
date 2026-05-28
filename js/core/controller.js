import {
  setState,
  defaultState,
  subscribe,
  getState
} from "../state/state.js";

import { renderLayout } from "../ui/renderLayout.js";
import { initDOM } from "../ui/dom.js";
import { loadState, saveState } from "../../db/database.js";
import { initTabs } from "../ui/tabs.js";
import { bindGlobal } from "../ui/events.js";

import { renderLists } from "../features/lists/renderLists.js";
import { renderRoulette } from "../features/roulette/renderRoulette.js";

// 🔥 import 경로 수정
import { renderCoverflow } from "../features/coverflow/coverflow.js";

export function initController(){

  async function boot(){

    console.log("BOOT START");

    const saved = await loadState();

    setState(saved || defaultState);

    renderLayout();

    initDOM();

    initTabs();

    bindGlobal();

    // =========================
    // 상태 변경시 자동 렌더
    // =========================
    subscribe(async ()=>{

      renderLists();
      renderRoulette();
      renderCoverflow();

      // 🔥 저장 연결
      await saveState(getState());
    });

    // 최초 렌더
    renderLists();
    renderRoulette();
    renderCoverflow();

    console.log("BOOT DONE");
  }

  return {
    boot
  };
}
```

---

# js/ui/events.js

```js
import {
  getState,
  setState
} from "../state/state.js";

import {
  addCap,
  addSwim,
  removeCap,
  removeSwim
} from "../state/actions.js";

import { spinAll } from "../features/roulette/roulette.js";

import { compressImage } from "../utils/image.js";

export function bindGlobal(){

  if(document.body.dataset.globalBound){
    return;
  }

  document.body.dataset.globalBound = "true";

  document.addEventListener("click", async e=>{

    const action = e.target.dataset.action;

    // =========================
    // SPIN
    // =========================
    if(action === "spin"){

      await spinAll();

      return;
    }

    // =========================
    // ADD ITEM
    // =========================
    if(action === "add"){

      const type =
        document.getElementById("itemType")?.value;

      const text =
        document.getElementById("itemText")
          ?.value
          ?.trim();

      const imageInput =
        document.getElementById("itemImage");

      if(!text){
        return;
      }

      let image = null;

      const file = imageInput?.files?.[0];

      if(file){
        image = await compressImage(file);
      }

      const item = {
        id: crypto.randomUUID(),
        name: text,
        image
      };

      if(type === "cap"){
        addCap(item);
      }
      else{
        addSwim(item);
      }

      // 입력 초기화
      document.getElementById("itemText").value = "";

      if(imageInput){
        imageInput.value = "";
      }

      setState({
        ui: {
          ...getState().ui
        }
      });

      return;
    }

    // =========================
    // DELETE
    // =========================
    const deleteBtn =
      e.target.closest(".delete-btn");

    if(deleteBtn){

      e.stopPropagation();

      const type =
        deleteBtn.dataset.type;

      const id =
        deleteBtn.dataset.id;

      if(type === "cap"){
        removeCap(id);
      }
      else{
        removeSwim(id);
      }

      setState({
        ui: {
          ...getState().ui
        }
      });

      return;
    }

    // =========================
    // 카드 선택
    // =========================
    const card =
      e.target.closest(".cover-card");

    if(card){

      const type =
        card.dataset.type;

      const id =
        card.dataset.id;

      const state =
        getState();

      setState({
        selection: {
          capId:
            type === "cap"
              ? id
              : state.selection.capId,

          swimId:
            type === "swim"
              ? id
              : state.selection.swimId
        }
      });
    }
  });
}
```

---

# js/features/coverflow/drag.js

```js
export function bindDrag(){

  const wraps =
    document.querySelectorAll(
      ".coverflow"
    );

  wraps.forEach(wrap=>{

    if(wrap.dataset.dragBound){
      return;
    }

    wrap.dataset.dragBound = "true";

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    // =========================
    // depth 갱신
    // =========================
    function updateDepth(){

      const cards =
        wrap.querySelectorAll(
          ".cover-card"
        );

      const center =
        wrap.scrollLeft +
        wrap.clientWidth / 2;

      let closest = null;
      let closestDistance = Infinity;

      cards.forEach(card=>{

        const cardCenter =
          card.offsetLeft +
          card.clientWidth / 2;

        const distance =
          Math.abs(center - cardCenter);

        if(distance < closestDistance){
          closestDistance = distance;
          closest = card;
        }
      });

      cards.forEach(card=>{

        const active =
          card === closest;

        card.classList.toggle(
          "active",
          active
        );

        requestAnimationFrame(()=>{
          card.classList.add("ready");
        });
      });
    }

    updateDepth();

    wrap.addEventListener("mousedown", e=>{

      isDown = true;

      wrap.classList.add(
        "dragging"
      );

      startX =
        e.pageX - wrap.offsetLeft;

      scrollLeft =
        wrap.scrollLeft;
    });

    window.addEventListener("mouseup", ()=>{

      isDown = false;

      wrap.classList.remove(
        "dragging"
      );
    });

    wrap.addEventListener("mousemove", e=>{

      if(!isDown) return;

      e.preventDefault();

      const x =
        e.pageX - wrap.offsetLeft;

      const walk =
        (x - startX) * 1.2;

      wrap.scrollLeft =
        scrollLeft - walk;

      requestAnimationFrame(
        updateDepth
      );
    });

    wrap.addEventListener(
      "scroll",
      ()=>{
        requestAnimationFrame(
          updateDepth
        );
      },
      {
        passive:true
      }
    );

    // 모바일
    wrap.addEventListener(
      "touchmove",
      ()=>{
        requestAnimationFrame(
          updateDepth
        );
      },
      {
        passive:true
      }
    );

  });
}
```

---

# js/features/coverflow/coverflow.js

```js
import {
  getState,
  setState
} from "../../state/state.js";

import { bindDrag } from "./drag.js";

export function renderCoverflow(){

  const state = getState();

  renderType(
    "cap",
    state.data.caps
  );

  renderType(
    "swim",
    state.data.swimsuits
  );

  requestAnimationFrame(()=>{
    bindDrag();
  });
}

function renderType(type, items){

  const target =
    document.querySelector(
      `.coverflow[data-type="${type}"]`
    );

  if(!target) return;

  target.innerHTML = items.map(item=>`

    <div
      class="cover-card ready"
      data-type="${type}"
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

        <div class="card-overlay">
          <div class="card-title">
            ${item.name}
          </div>
        </div>

        <button
          class="delete-btn"
          data-action="delete"
          data-type="${type}"
          data-id="${item.id}"
        >
          ×
        </button>

      </div>

    </div>

  `).join("");

  bindClick();
}

function bindClick(){

  const wraps =
    document.querySelectorAll(
      ".coverflow"
    );

  wraps.forEach(wrap=>{

    if(wrap.dataset.bound){
      return;
    }

    wrap.dataset.bound = "true";

    wrap.addEventListener("click", e=>{

      const card =
        e.target.closest(
          ".cover-card"
        );

      if(!card) return;

      const type =
        card.dataset.type;

      const id =
        card.dataset.id;

      const state =
        getState();

      setState({
        selection: {
          capId:
            type === "cap"
              ? id
              : state.selection.capId,

          swimId:
            type === "swim"
              ? id
              : state.selection.swimId
        }
      });
    });
  });
}
```

---

# js/features/roulette/renderRoulette.js

```js
import { getState } from "../../state/state.js";

export function renderRoulette(){

  const target =
    document.getElementById(
      "rouletteContent"
    );

  if(!target) return;

  const state = getState();

  const cap =
    state.data.caps.find(
      v => v.id === state.selection.capId
    );

  const swim =
    state.data.swimsuits.find(
      v => v.id === state.selection.swimId
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
                  src="${cap.image}"
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
            SWIMSUIT
          </div>

          <div class="roulette-card">

            ${
              swim
              ? `
                <img
                  class="card-image"
                  src="${swim.image}"
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
```
