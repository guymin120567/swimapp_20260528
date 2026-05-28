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
