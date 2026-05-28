export function bindDrag(){

  const wraps =
    document.querySelectorAll(
      ".coverflow"
    );

  wraps.forEach(wrap=>{

    if(wrap.dataset.dragBound){
      updateDepth(wrap);
      return;
    }

    wrap.dataset.dragBound =
      "true";

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    wrap.addEventListener(
      "mousedown",
      e=>{

        isDown = true;

        wrap.classList.add(
          "dragging"
        );

        startX =
          e.pageX -
          wrap.offsetLeft;

        scrollLeft =
          wrap.scrollLeft;

      }
    );

    window.addEventListener(
      "mouseup",
      ()=>{

        isDown = false;

        wrap.classList.remove(
          "dragging"
        );

      }
    );

    wrap.addEventListener(
      "mousemove",
      e=>{

        if(!isDown) return;

        e.preventDefault();

        const x =
          e.pageX -
          wrap.offsetLeft;

        const walk =
          (x - startX) * 1.2;

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

        requestAnimationFrame(()=>{
          updateDepth(wrap);
        });

      },
      {
        passive:true
      }
    );

    wrap.addEventListener(
      "touchmove",
      ()=>{

        requestAnimationFrame(()=>{
          updateDepth(wrap);
        });

      },
      {
        passive:true
      }
    );

    updateDepth(wrap);

  });
}

function updateDepth(wrap){

  const cards =
    wrap.querySelectorAll(
      ".cover-card"
    );

  const center =
    wrap.scrollLeft +
    wrap.clientWidth / 2;

  let closest = null;
  let closestDistance =
    Infinity;

  cards.forEach(card=>{

    const cardCenter =
      card.offsetLeft +
      card.clientWidth / 2;

    const distance =
      Math.abs(
        center - cardCenter
      );

    if(distance < closestDistance){

      closestDistance =
        distance;

      closest = card;
    }
  });

  cards.forEach(card=>{

    card.classList.toggle(
      "active",
      card === closest
    );

    requestAnimationFrame(()=>{
      card.classList.add(
        "ready"
      );
    });

  });
}
