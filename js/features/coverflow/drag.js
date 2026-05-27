import {
  renderCoverflow
} from "./renderCoverflow.js";

export function bindDrag(){

  const wraps =
    document.querySelectorAll(
      ".coverflow"
    );

  wraps.forEach(
    wrap=>{

      if(
        wrap.dataset.dragBound
      ){
        return;
      }

      wrap.dataset.dragBound =
        "true";

      let isDown =
        false;

      let startX =
        0;

      let scrollLeft =
        0;

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
            (x - startX) * 1.3;

          wrap.scrollLeft =
            scrollLeft - walk;

          renderCoverflow();
        }
      );

      wrap.addEventListener(
        "scroll",
        ()=>{

          requestAnimationFrame(
            ()=>{

              renderCoverflow();

            }
          );
        }
      );

      wrap.addEventListener(
        "touchmove",
        ()=>{

          requestAnimationFrame(
            ()=>{

              renderCoverflow();

            }
          );
        },
        {
          passive:true
        }
      );
    }
  );
}
