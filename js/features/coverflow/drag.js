import {
  setActiveCap,
  setActiveSwim
} from "../../state/actions.js";

import {
  renderRouletteOnly,
  renderListsOnly
} from "../../ui/render.js";

// =========================
// CONFIG
// =========================
const SNAP_DURATION = 420;

const VELOCITY_MULTIPLIER = 18;

const MIN_VELOCITY = 0.15;

// =========================
// DRAG
// =========================
export function bindDrag(){

  bindCarousel(
    "capCoverflowScroll",
    "cap"
  );

  bindCarousel(
    "swimCoverflowScroll",
    "swim"
  );
}

// =========================
// BIND
// =========================
function bindCarousel(
  targetId,
  type
){

  const wrap =
    document.getElementById(
      targetId
    );

  if(!wrap) return;

  if(wrap.dataset.dragBound){

    updateDepth(wrap);
    return;
  }

  wrap.dataset.dragBound =
    "true";

  let dragging = false;

  let startX = 0;

  let startScroll = 0;

  let lastX = 0;

  let lastTime = 0;

  let velocity = 0;

  // =========================
  // DOWN
  // =========================
  wrap.addEventListener(
    "pointerdown",
    e=>{

      dragging = true;

      startX =
        e.clientX;

      startScroll =
        wrap.scrollLeft;

      lastX =
        e.clientX;

      lastTime =
        performance.now();

      velocity = 0;

      wrap.classList.add(
        "dragging"
      );
    },
    { passive:true }
  );

  // =========================
  // MOVE
  // =========================
  wrap.addEventListener(
    "pointermove",
    e=>{

      if(!dragging) return;

      const delta =
        e.clientX - startX;

      wrap.scrollLeft =
        startScroll - delta;

      const now =
        performance.now();

      const timeDelta =
        now - lastTime;

      if(timeDelta > 0){

        velocity =
          (
            e.clientX - lastX
          ) / timeDelta;
      }

      lastX =
        e.clientX;

      lastTime =
        now;

      updateDepth(wrap);
    },
    { passive:true }
  );

  // =========================
  // END
  // =========================
  function endDrag(){

    if(!dragging) return;

    dragging = false;

    wrap.classList.remove(
      "dragging"
    );

    const inertia =
      velocity *
      VELOCITY_MULTIPLIER;

    animateMomentum(
      wrap,
      inertia,
      ()=>{

        snapToClosest(
          wrap,
          type
        );
      }
    );
  }

  wrap.addEventListener(
    "pointerup",
    endDrag
  );

  wrap.addEventListener(
    "pointercancel",
    endDrag
  );

  wrap.addEventListener(
    "pointerleave",
    ()=>{

      if(dragging){

        endDrag();
      }
    }
  );

  wrap.addEventListener(
    "scroll",
    ()=>{

      updateDepth(wrap);
    },
    { passive:true }
  );

  requestAnimationFrame(()=>{

    updateDepth(wrap);
  });
}

// =========================
// MOMENTUM
// =========================
function animateMomentum(
  wrap,
  velocity,
  callback
){

  if(
    Math.abs(velocity)
    < MIN_VELOCITY
  ){

    callback();
    return;
  }

  let current =
    velocity;

  function frame(){

    wrap.scrollLeft -= current;

    current *= 0.94;

    updateDepth(wrap);

    if(
      Math.abs(current)
      < MIN_VELOCITY
    ){

      callback();
      return;
    }

    requestAnimationFrame(
      frame
    );
  }

  requestAnimationFrame(
    frame
  );
}

// =========================
// SNAP
// =========================
function snapToClosest(
  wrap,
  type
){

  const cards =
    [
      ...wrap.querySelectorAll(
        ".cover-card"
      )
    ];

  if(!cards.length) return;

  const wrapCenter =
    wrap.scrollLeft +
    wrap.clientWidth / 2;

  let closestCard =
    null;

  let closestDistance =
    Infinity;

  cards.forEach(card=>{

    const cardCenter =
      card.offsetLeft +
      card.clientWidth / 2;

    const distance =
      Math.abs(
        wrapCenter - cardCenter
      );

    if(
      distance
      < closestDistance
    ){

      closestDistance =
        distance;

      closestCard =
        card;
    }
  });

  if(!closestCard) return;

  const id =
    closestCard.dataset.id;

  if(type === "cap"){

    setActiveCap(id);

  }else{

    setActiveSwim(id);
  }

  renderRouletteOnly();

  renderListsOnly();

  centerCard(
    wrap,
    closestCard
  );
}

// =========================
// CENTER
// =========================
function centerCard(
  wrap,
  card
){

  const targetLeft =
    card.offsetLeft -
    (
      wrap.clientWidth / 2 -
      card.clientWidth / 2
    );

  wrap.scrollTo({

    left:targetLeft,

    behavior:"smooth"
  });

  setTimeout(()=>{

    updateDepth(wrap);

  },SNAP_DURATION);
}

// =========================
// DEPTH
// =========================
function updateDepth(
  wrap
){

  const cards =
    [
      ...wrap.querySelectorAll(
        ".cover-card"
      )
    ];

  if(!cards.length) return;

  const center =
    wrap.scrollLeft +
    wrap.clientWidth / 2;

  let closestIndex = 0;

  let closestDistance =
    Infinity;

  cards.forEach(
    (card,index)=>{

      const cardCenter =
        card.offsetLeft +
        card.clientWidth / 2;

      const distance =
        Math.abs(
          center - cardCenter
        );

      if(
        distance
        < closestDistance
      ){

        closestDistance =
          distance;

        closestIndex =
          index;
      }
    }
  );

  cards.forEach(
    (card,index)=>{

      const distance =
        Math.abs(
          index - closestIndex
        );

      const direction =
        index < closestIndex
          ? -1
          : 1;

      let scale = 1;

      if(distance === 0){

        scale = 1.16;

      }else if(distance === 1){

        scale = 0.9;

      }else if(distance === 2){

        scale = 0.76;

      }else{

        scale = 0.62;
      }

      let blur = 0;

      if(distance === 1){

        blur = 1.4;

      }else if(distance === 2){

        blur = 2.8;

      }else if(distance >= 3){

        blur = 4;
      }

      const rotate =
        direction *
        Math.min(
          distance * 16,
          40
        );

      const translateZ =
        distance === 0
          ? 140
          : 120 - distance * 46;

      const offset =
        direction *
        distance *
        -22;

      const opacity =
        Math.max(
          1 - distance * 0.18,
          0.22
        );

      card.style.transform = `

        perspective(1400px)
        translate3d(
          ${offset}px,
          0,
          ${translateZ}px
        )
        rotateY(${rotate}deg)
        scale(${scale})

      `;

      card.style.filter = `

        blur(${blur}px)
        brightness(${1 - distance * 0.08})

      `;

      card.style.opacity =
        opacity;

      card.style.zIndex =
        999 - distance;

      card.classList.toggle(
        "active",
        distance === 0
      );

      requestAnimationFrame(()=>{

        card.classList.add(
          "ready"
        );
      });
    }
  );
}
