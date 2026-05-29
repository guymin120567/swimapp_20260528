// js/features/coverflow/drag.js

export function bindDrag(){

  const wraps =
    document.querySelectorAll(".coverflow");

  wraps.forEach(wrap => {

    if(wrap.dataset.dragBound){

      requestAnimationFrame(()=>{

        updateDepth(wrap);
        snapToCenter(wrap, false);

      });

      return;
    }

    wrap.dataset.dragBound = "true";

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let lastX = 0;

    wrap._isProgrammatic = false;

    wrap.addEventListener("mousedown", e => {

      if(wrap._isProgrammatic){
        return;
      }

      isDown = true;

      wrap.classList.add(
        "dragging"
      );

      startX = e.pageX;
      lastX = e.pageX;

      scrollLeft =
        wrap.scrollLeft;

    });

    window.addEventListener(
      "mouseup",
      ()=>{

        if(!isDown){
          return;
        }

        isDown = false;

        wrap.classList.remove(
          "dragging"
        );

        inertia(
          wrap,
          velocity
        );

      }
    );

    wrap.addEventListener(
      "mouseleave",
      ()=>{

        if(!isDown){
          return;
        }

        isDown = false;

        wrap.classList.remove(
          "dragging"
        );

        inertia(
          wrap,
          velocity
        );

      }
    );

    wrap.addEventListener(
      "mousemove",
      e => {

        if(!isDown){
          return;
        }

        e.preventDefault();

        const x =
          e.pageX;

        const walk =
          (x - startX) * 1.1;

        velocity =
          x - lastX;

        lastX = x;

        wrap.scrollLeft =
          scrollLeft - walk;

        updateDepth(wrap);

      }
    );

    wrap.addEventListener(
      "scroll",
      ()=>{

        if(wrap._isProgrammatic){
          return;
        }

        requestAnimationFrame(()=>{

          updateDepth(wrap);

        });

      }
    );

    requestAnimationFrame(()=>{

      updateDepth(wrap);
      snapToCenter(wrap, false);

    });

  });

}

// =========================
// INERTIA
// =========================

function inertia(
  wrap,
  velocity
){

  let current =
    velocity * 1.8;

  function frame(){

    current *= 0.92;

    wrap.scrollLeft -=
      current;

    updateDepth(wrap);

    if(
      Math.abs(current) > 0.35
    ){

      requestAnimationFrame(
        frame
      );

    }else{

      snapToCenter(wrap);

    }

  }

  requestAnimationFrame(
    frame
  );

}

// =========================
// SNAP
// =========================

function snapToCenter(
  wrap,
  smooth = true
){

  const cards =
    [
      ...wrap.querySelectorAll(
        ".item-card"
      )
    ];

  if(!cards.length){
    return;
  }

  const center =
    wrap.scrollLeft +
    wrap.clientWidth / 2;

  let closest = null;
  let closestDist = Infinity;

  cards.forEach(card => {

    const cardCenter =
      card.offsetLeft +
      card.offsetWidth / 2;

    const dist =
      Math.abs(
        center - cardCenter
      );

    if(dist < closestDist){

      closestDist = dist;
      closest = card;

    }

  });

  if(!closest){
    return;
  }

  const target =
    closest.offsetLeft -
    (
      wrap.clientWidth / 2 -
      closest.offsetWidth / 2
    );

  wrap._isProgrammatic = true;

  wrap.scrollTo({

    left: target,
    behavior:
      smooth
        ? "smooth"
        : "auto"

  });

  setTimeout(()=>{

    wrap._isProgrammatic = false;

    updateDepth(wrap);

  }, 420);

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
        ".item-card"
      )
    ];

  const center =
    wrap.scrollLeft +
    wrap.clientWidth / 2;

  let closest = null;
  let closestDist = Infinity;

  cards.forEach(card => {

    const cardCenter =
      card.offsetLeft +
      card.offsetWidth / 2;

    const dist =
      Math.abs(
        center - cardCenter
      );

    if(dist < closestDist){

      closestDist = dist;
      closest = card;

    }

  });

  cards.forEach(card => {

    const index =
      cards.indexOf(card);

    const activeIndex =
      cards.indexOf(closest);

    const distance =
      Math.abs(
        index - activeIndex
      );

    card.classList.remove(
      "depth-0",
      "depth-1",
      "depth-2",
      "active"
    );

    if(distance === 0){

      card.classList.add(
        "depth-0",
        "active"
      );

    }else if(distance === 1){

      card.classList.add(
        "depth-1"
      );

    }else{

      card.classList.add(
        "depth-2"
      );

    }

    requestAnimationFrame(()=>{

      card.classList.add(
        "ready"
      );

    });

  });

}
