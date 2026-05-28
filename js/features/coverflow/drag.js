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

    wrap._isProgrammatic = false;

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
      const walk = (x - startX) * 1.25;

      wrap.scrollLeft = scrollLeft - walk;

      requestAnimationFrame(() => updateDepth(wrap));

    });

    wrap.addEventListener("scroll", () => {

      if(wrap._isProgrammatic) return;

      requestAnimationFrame(() => updateDepth(wrap));

    }, { passive:true });

    updateDepth(wrap);

  });
}

/* =========================
   ACTIVE DETECT
========================= */

function updateDepth(wrap){

  const cards =
    wrap.querySelectorAll(".cover-card");

  if(!cards.length) return;

  const wrapCenter =
    wrap.getBoundingClientRect().left + wrap.clientWidth / 2;

  let closest = null;
  let min = Infinity;

  cards.forEach(card => {

    const rect = card.getBoundingClientRect();
    const center = rect.left + rect.width / 2;

    const dist = Math.abs(wrapCenter - center);

    if(dist < min){
      min = dist;
      closest = card;
    }
  });

  cards.forEach(card => {
    card.classList.toggle("active", card === closest);
  });

}

/* =========================
   SNAP CENTER (FIXED)
========================= */

function snapToCenter(wrap){

  const cards =
    wrap.querySelectorAll(".cover-card");

  if(!cards.length) return;

  let closest = null;
  let min = Infinity;

  const wrapCenter =
    wrap.scrollLeft + wrap.clientWidth / 2;

  cards.forEach(card => {

    const center =
      card.offsetLeft + card.clientWidth / 2;

    const dist = Math.abs(wrapCenter - center);

    if(dist < min){
      min = dist;
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

  wrap._isProgrammatic = true;

  wrap.scrollTo({
    left: Math.max(0, Math.min(target, max)),
    behavior: "smooth"
  });

  setTimeout(() => {
    wrap._isProgrammatic = false;
  }, 450);
}
