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

        requestAnimationFrame(()=>{

          updateDepth(wrap);

        });

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

      },
      { passive:true }
    );

    requestAnimationFrame(()=>{

      updateDepth(wrap);
      snapToCenter(wrap, false);

    });

  });

}

/* =========================
   INERTIA
========================= */

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

/* =========================
   ACTIVE DETECT
========================= */

function updateDepth(
  wrap
){

  const cards =
    [
      ...wrap.querySelectorAll(
        ".cover-card"
      )
    ];

  if(!cards.length){
    return;
  }

  const wrapCenter =
    wrap.getBoundingClientRect().left +
    wrap.clientWidth / 2;

  let closest = null;
  let min = Infinity;

  cards.forEach(card => {

    const rect =
      card.getBoundingClientRect();

    const center =
      rect.left +
      rect.width / 2;

    const dist =
      Math.abs(
        wrapCenter - center
      );

    if(dist < min){

      min = dist;
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
      "active",
      "depth-1",
      "depth-2"
    );

    if(distance === 0){

      card.classList.add(
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

  });

}

/* =========================
   SNAP CENTER
========================= */

function snapToCenter(
  wrap,
  smooth = true
){

  const cards =
    wrap.querySelectorAll(
      ".cover-card"
    );

  if(!cards.length){
    return;
  }

  let closest = null;
  let min = Infinity;

  const wrapCenter =
    wrap.scrollLeft +
    wrap.clientWidth / 2;

  cards.forEach(card => {

    const center =
      card.offsetLeft +
      card.clientWidth / 2;

    const dist =
      Math.abs(
        wrapCenter - center
      );

    if(dist < min){

      min = dist;
      closest = card;

    }

  });

  if(!closest){
    return;
  }

  const target =
    closest.offsetLeft +
    closest.clientWidth / 2 -
    wrap.clientWidth / 2;

  const max =
    wrap.scrollWidth -
    wrap.clientWidth;

  wrap._isProgrammatic = true;

  wrap.scrollTo({

    left:
      Math.max(
        0,
        Math.min(target, max)
      ),

    behavior:
      smooth
        ? "smooth"
        : "auto"

  });

  setTimeout(()=>{

    wrap._isProgrammatic = false;

    updateDepth(wrap);

  }, 450);

}
