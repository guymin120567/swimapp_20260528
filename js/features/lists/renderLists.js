import {
  refreshCoverflow
} from "../coverflow/renderCoverflow.js";

import {
  renderCapsList
} from "./renderCapsList.js";

import {
  renderSwimsList
} from "./renderSwimsList.js";

export function renderLists(){

  const target =
    document.getElementById(
      "listsSection"
    );

  if(!target) return;

  target.innerHTML = `

    <div class="lists-wrap">

      ${renderCapsList()}

      ${renderSwimsList()}

    </div>

  `;

  requestAnimationFrame(()=>{

    refreshCoverflow();

  });

}
