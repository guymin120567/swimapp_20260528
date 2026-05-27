import {
  getState,
  setActiveTab
} from "../state/state.js";

export function initTabs(){

  const buttons =
    document.querySelectorAll(
      ".tab-btn"
    );

  const pages =
    document.querySelectorAll(
      ".tab-page"
    );

  const state =
    getState();

  buttons.forEach((button)=>{

    button.addEventListener(
      "click",
      ()=>{

        const tab =
          button.dataset.tab;

        setActiveTab(tab);

        buttons.forEach((btn)=>{

          btn.classList.remove(
            "active"
          );
        });

        pages.forEach((page)=>{

          page.classList.remove(
            "active"
          );
        });

        button.classList.add(
          "active"
        );

        const target =
          document.getElementById(
            `${tab}Tab`
          );

        if(target){

          target.classList.add(
            "active"
          );
        }
      }
    );
  });

  const initialButton =
    document.querySelector(
      `.tab-btn[data-tab="${state.ui.activeTab}"]`
    );

  if(initialButton){

    initialButton.click();
  }
}
