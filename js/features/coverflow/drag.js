export function bindDrag(){

  const wraps =
    document.querySelectorAll(".coverflow");

  wraps.forEach(wrap=>{

    if(wrap.dataset.dragBound){
      updateDepth(wrap);
      return;
    }

    wrap.dataset.dragBound = "true";

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    wrap.addEventListener("mousedown", e=>{

      isDown = true;
      wrap.classList.add("dragging");

      startX = e.pageX;
      scrollLeft = wrap.scrollLeft;

    });

    window.addEventListener("mouseup", ()=>{

      isDown = false;
      wrap.classList.remove("dragging");

      requestAnimationFrame(()=>{
        snapToCenter(wrap);
      });

    });

    wrap.addEventListener("mousemove", e=>{

      if(!isDown) return;

      e.preventDefault();

      const x = e.pageX;
      const walk = (x - startX) * 1.2;

      wrap.scrollLeft = scrollLeft - walk;

      requestAnimationFrame(()=>{
        updateDepth(wrap);
      });

    });

    wrap.addEventListener("scroll", ()=>{
      requestAnimationFrame(()=>{
        updateDepth(wrap);
      });
    }, { passive:true });

    wrap.addEventListener("touchmove", ()=>{
      requestAnimationFrame(()=>{
        updateDepth(wrap);
      });
    }, { passive:true });

    updateDepth(wrap);

  });
}

/* =========================
   ACTIVE FIX (RECT 기준 통일)
========================= */

function updateDepth(wrap){

  const cards =
    wrap.querySelectorAll(".cover-card");

  if(!cards.length) return;

  const wrapRect =
    wrap.getBoundingClientRect();

  const center =
    wrap.clientWidth / 2;

  let closest = null;
  let closestDistance = Infinity;

  cards.forEach(card=>{

    const rect =
      card.getBoundingClientRect();

    const cardCenter =
      (rect.left - wrapRect.left) + rect.width / 2;

    const distance =
      Math.abs(center - cardCenter);

    if(distance < closestDistance){
      closestDistance = distance;
      closest = card;
    }

  });

  cards.forEach(card=>{
    card.classList.toggle("active", card === closest);
  });

}

/* =========================
   SNAP FIX (RECT 기준 통일)
========================= */

function snapToCenter(wrap){

  const cards =
    wrap.querySelectorAll(".cover-card");

  if(!cards.length) return;

  const wrapRect =
    wrap.getBoundingClientRect();

  let closest = null;
  let closestDistance = Infinity;

  const center =
    wrap.clientWidth / 2;

  cards.forEach(card => {

    const rect =
      card.getBoundingClientRect();

    const cardCenter =
      (rect.left - wrapRect.left) + rect.width / 2;

    const distance =
      Math.abs(center - cardCenter);

    if(distance < closestDistance){
      closestDistance = distance;
      closest = card;
    }

  });

  if(!closest) return;

  const rect =
    closest.getBoundingClientRect();

  const target =
    wrap.scrollLeft +
    (rect.left - wrapRect.left) +
    rect.width / 2 -
    wrap.clientWidth / 2;

  const maxScroll =
    wrap.scrollWidth - wrap.clientWidth;

  const clamped =
    Math.max(0, Math.min(target, maxScroll));

  wrap.scrollTo({
    left: clamped,
    behavior: "smooth"
  });
}
