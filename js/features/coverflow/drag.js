export function bindDrag(){

  const wraps =
    document.querySelectorAll(".coverflow");

  wraps.forEach(wrap => {

    if(wrap.dataset.dragBound){
      updateDepth(wrap);
      return;
    }

    wrap.dataset.dragBound = "true";

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    wrap.addEventListener("mousedown", e => {

      isDown = true;
      wrap.classList.add("dragging");

      startX = e.pageX;
      scrollLeft = wrap.scrollLeft;

    });

    window.addEventListener("mouseup", () => {

      isDown = false;
      wrap.classList.remove("dragging");

      requestAnimationFrame(() => {
        snapToCenter(wrap);
      });

    });

    wrap.addEventListener("mousemove", e => {

      if(!isDown) return;

      e.preventDefault();

      const x = e.pageX;
      const walk = (x - startX) * 1.3;

      wrap.scrollLeft = scrollLeft - walk;

      requestAnimationFrame(() => updateDepth(wrap));

    });

    wrap.addEventListener("scroll", () => {
      requestAnimationFrame(() => updateDepth(wrap));
    }, { passive:true });

    updateDepth(wrap);
  });
}

/* =========================
   ACTIVE CENTER FIX
========================= */

function updateDepth(wrap){

  const cards =
    wrap.querySelectorAll(".cover-card");

  if(!cards.length) return;

  const center =
    wrap.scrollLeft + wrap.clientWidth / 2;

  let closest = null;
  let closestDist = Infinity;

  cards.forEach(card => {

    const cardCenter =
      card.offsetLeft + card.clientWidth / 2;

    const dist = Math.abs(center - cardCenter);

    if(dist < closestDist){
      closestDist = dist;
      closest = card;
    }
  });

  cards.forEach(card => {
    card.classList.toggle("active", card === closest);
  });
}

/* =========================
   SNAP (양끝 해결)
========================= */

function snapToCenter(wrap){

  const cards =
    wrap.querySelectorAll(".cover-card");

  if(!cards.length) return;

  const center =
    wrap.scrollLeft + wrap.clientWidth / 2;

  let closest = null;
  let closestDist = Infinity;

  cards.forEach(card => {

    const cardCenter =
      card.offsetLeft + card.clientWidth / 2;

    const dist = Math.abs(center - cardCenter);

    if(dist < closestDist){
      closestDist = dist;
      closest = card;
    }
  });

  if(!closest) return;

  const target =
    closest.offsetLeft +
    closest.clientWidth / 2 -
    wrap.clientWidth / 2;

  const max =
    wrap.scrollWidth - wrap.clientWidth;

  wrap.scrollTo({
    left: Math.max(0, Math.min(target, max)),
    behavior: "smooth"
  });
}
