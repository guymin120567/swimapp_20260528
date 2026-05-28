import {
  getState
} from "../state/state.js";

import {
  addItem,
  removeItem
} from "../state/actions.js";

import {
  spinAll
} from "../features/roulette/roulette.js";

import {
  compressImage
} from "../utils/image.js";

export function bindGlobal(){

  if(
    document.body.dataset.globalBound
  ){
    return;
  }

  document.body.dataset.globalBound =
    "true";

  document.addEventListener(
    "click",
    async e=>{

      const action =
        e.target.dataset.action;

      // =========================
      // SPIN
      // =========================

      if(action === "spin"){

        await spinAll();

        return;
      }

      // =========================
      // ADD
      // =========================

      if(action === "add"){

        const type =
          document.getElementById(
            "itemType"
          )?.value;

        const text =
          document.getElementById(
            "itemText"
          )?.value?.trim();

        const imageInput =
          document.getElementById(
            "itemImage"
          );

        if(!text){
          return;
        }

        let image = null;

        const file =
          imageInput?.files?.[0];

        if(file){

          image =
            await compressImage(
              file
            );

        }

        addItem({

          id:
            crypto.randomUUID(),

          type,

          name:text,

          image
        });

        document.getElementById(
          "itemText"
        ).value = "";

        if(imageInput){

          imageInput.value = "";

        }

        return;
      }

      // =========================
      // DELETE
      // =========================

      if(action === "delete"){

        const id =
          e.target.dataset.id;

        removeItem(id);

      }

    }
  );
}
