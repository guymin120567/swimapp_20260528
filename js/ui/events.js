import {
  getState,
  setState
} from "../state/state.js";

import {
  addCap,
  addSwim,
  removeCap,
  removeSwim
} from "../state/actions.js";

import { spinAll } from "../features/roulette/roulette.js";

import { compressImage } from "../utils/image.js";

export function bindGlobal(){

  if(document.body.dataset.globalBound){
    return;
  }

  document.body.dataset.globalBound = "true";

  document.addEventListener("click", async e=>{

    const action = e.target.dataset.action;

    if(action === "spin"){

      await spinAll();

      return;
    }

    if(action === "add"){

      const type =
        document.getElementById("itemType")?.value;

      const text =
        document.getElementById("itemText")
          ?.value
          ?.trim();

      const imageInput =
        document.getElementById("itemImage");

      if(!text){
        return;
      }

      let image = null;

      const file = imageInput?.files?.[0];

      if(file){
        image = await compressImage(file);
      }

      const item = {
        id: crypto.randomUUID(),
        name: text,
        image
      };

      if(type === "cap"){
        addCap(item);
      }
      else{
        addSwim(item);
      }

      document.getElementById("itemText").value = "";

      if(imageInput){
        imageInput.value = "";
      }

      setState({
        ui: {
          ...getState().ui
        }
      });

      return;
    }

    const deleteBtn =
      e.target.closest(".delete-btn");

    if(deleteBtn){

      e.stopPropagation();

      const type =
        deleteBtn.dataset.type;

      const id =
        deleteBtn.dataset.id;

      if(type === "cap"){
        removeCap(id);
      }
      else{
        removeSwim(id);
      }

      setState({
        ui: {
          ...getState().ui
        }
      });

      return;
    }

    const card =
      e.target.closest(".cover-card");

    if(card){

      const type =
        card.dataset.type;

      const id =
        card.dataset.id;

      const state =
        getState();

      setState({
        selection: {
          capId:
            type === "cap"
              ? id
              : state.selection.capId,

          swimId:
            type === "swim"
              ? id
              : state.selection.swimId
        }
      });
    }
  });
}
