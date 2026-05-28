import {
  renderRoulette
} from "../features/roulette/renderRoulette.js";

import {
  renderCoverflow
} from "../features/coverflow/coverflow.js";

export function initTabs(){

  const tabs =
    document.querySelectorAll(
      ".bottom-tab"
    );

  const sections = {

    roulette:
      document.getElementById(
        "rouletteSection"
      ),

    inventory:
      document.getElementById(
        "listsSection"
      ),

    records:
      document.getElementById(
        "recordsSection"
      )

  };

  function activateTab(type){

    tabs.forEach(tab=>{

      tab.classList.toggle(

        "active",

        tab.dataset.tab === type

      );

    });

    Object.entries(
      sections
    ).forEach(
      ([key,section])=>{

        if(!section) return;

        section.style.display =

          key === type
            ? "block"
            : "none";

      }
    );

    // =========================
    // RENDER
    // =========================

    if(type === "roulette"){

      renderRoulette();

    }

    if(type === "inventory"){

      renderCoverflow();

    }
  }

  // =========================
  // CLICK
  // =========================

  tabs.forEach(tab=>{

    tab.addEventListener(
      "click",
      ()=>{

        activateTab(
          tab.dataset.tab
        );

      }
    );

  });

  // =========================
  // 🔥 최초 활성화 핵심
  // =========================

  activateTab("roulette");
}
