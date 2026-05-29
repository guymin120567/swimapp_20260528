// js/features/coverflow/coverflow.js

import {
  getState
} from "../../state/state.js";

import {
  setSelected
} from "../../state/actions.js";

import {
  bindDrag
} from "./drag.js";

let spinRAF = null;

// =========================
// RENDER
// =========================

export function renderCoverflow(){

  renderType("cap");

  renderType("swim");

  bindSelect();

  bindSpinEvents();

  requestAnimationFrame(
    bindDrag
  );

}

// =========================
// TYPE
// =========================

function renderType(type){

  const target =
    document.querySelector(
      `.coverflow[data-type="${type}"]`
    );

  if(!target) return;

  const state =
    getState();

  const items =
    (state.items || [])
      .filter(
        i => i.type === type
      );

  const selectedId =
    type === "cap"
      ? state.selection?.capId
      : state.selection?.swimId;

  target.innerHTML =
    items.map(item => `

      <div
        class="
          cover-card
          ${item.id === selectedId ? "active" : ""}
        "
        data-id="${item.id}"
        data-type="${type}"
      >

        <div class="card-inner">

          ${
            item.image
              ? `
                <img
                  class="card-image"
                  src="${item.image}"
                  alt="${item.name}"
                  draggable="false"
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

        </div>

      </div>

    `).join("");

  // 선택 카드 중앙 정렬
  requestAnimationFrame(()=>{

    const active =
      target.querySelector(
        ".cover-card.active"
      );

    if(active){

      centerCard(
        target,
        active,
        false
      );

    }

  });

}

// =========================
// CLICK
// =========================

function bindSelect(){

  document
    .querySelectorAll(".coverflow")
    .forEach(wrap => {

      if(
        wrap.dataset.bound
      ){
        return;
      }

      wrap.dataset.bound =
        "true";

      wrap.addEventListener(
        "click",
        e => {

          const card =
            e.target.closest(
              ".cover-card"
            );

          if(!card){
            return;
          }

          const type =
            card.dataset.type;

          const id =
            card.dataset.id;

          // state sync
          setSelected(
            type,
            id
          );

          requestAnimationFrame(()=>{

            centerCard(
              wrap,
              card
            );

          });

        }
      );

    });

}

// =========================
// SPIN EVENTS
// =========================

function bindSpinEvents(){

  if(
    window.__coverflowSpinBound
  ){
    return;
  }

  window.addEventListener(
    "spin-start",
    startSpin
  );

  window.addEventListener(
    "spin-stop",
    stopSpin
  );

  window.__coverflowSpinBound =
    true;

}

// =========================
// START SPIN
// =========================

function startSpin(){

  const flows =
    document.querySelectorAll(
      ".coverflow"
    );

  flows.forEach(flow => {

    let velocity = 0;

    let phase =
      "accelerate";

    const maxSpeed = 28;

    const accel = 0.8;

    const decel = 0.96;

    const tick = () => {

      if(
        phase === "accelerate"
      ){

        velocity += accel;

        if(
          velocity >= maxSpeed
        ){

          velocity =
            maxSpeed;

          phase =
            "cruise";

        }

      }

      else if(
        phase === "cruise"
      ){

        if(
          Math.random() < 0.02
        ){

          phase =
            "decelerate";

        }

      }

      else if(
        phase === "decelerate"
      ){

        velocity *= decel;

        if(velocity < 8){
          velocity *= 0.92;
        }

        if(velocity < 0.6){
          velocity = 0;
        }

      }

      flow.scrollLeft += velocity;

      if(velocity > 0){

        spinRAF =
          requestAnimationFrame(
            tick
          );

      }

    };

    spinRAF =
      requestAnimationFrame(
        tick
      );

  });

}

// =========================
// STOP
// =========================

function stopSpin(){

  cancelAnimationFrame(
    spinRAF
  );

  spinRAF = null;

  document
    .querySelectorAll(
      ".coverflow"
    )
    .forEach(flow => {

      const cards = [

        ...flow.querySelectorAll(
          ".cover-card"
        )

      ];

      if(!cards.length){
        return;
      }

      const center =
        flow.scrollLeft +
        flow.clientWidth / 2;

      let closest = null;

      let minDist =
        Infinity;

      for(
        const card of cards
      ){

        const cardCenter =
          card.offsetLeft +
          card.clientWidth / 2;

        const dist =
          Math.abs(
            center - cardCenter
          );

        if(dist < minDist){

          minDist = dist;

          closest = card;

        }

      }

      if(!closest){
        return;
      }

      // state sync
      setSelected(
        closest.dataset.type,
        closest.dataset.id
      );

      centerCard(
        flow,
        closest
      );

    });

}

// =========================
// CENTER
// =========================

function centerCard(
  wrap,
  card,
  smooth = true
){

  const target =
    card.offsetLeft +
    card.clientWidth / 2 -
    wrap.clientWidth / 2;

  wrap.scrollTo({

    left: target,

    behavior:
      smooth
        ? "smooth"
        : "auto"

  });

}
