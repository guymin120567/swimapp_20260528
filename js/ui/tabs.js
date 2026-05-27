import {
  renderRoulette
} from "../render/renderRoulette.js";

import {
  renderLists
} from "../render/renderLists.js";

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

  tabs.forEach(tab => {

    tab.addEventListener(
      "click",
      ()=>{

        tabs.forEach(v=>{

          v.classList.remove(
            "active"
          );

        });

        tab.classList.add(
          "active"
        );

        const type =
          tab.dataset.tab;

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

        if(type === "roulette"){

          renderRoulette();

        }

        if(type === "inventory"){

          renderLists();

        }

      }
    );

  });

}
