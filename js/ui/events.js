import { getState, setState } from "../state/state.js";
import { spinAll } from "../features/roulette/roulette.js";
import { addCap, addSwim, removeCap, removeSwim } from "../state/actions.js";

export function bindGlobal(){

  document.addEventListener("click", async (e) => {

    const action = e.target.dataset.action;

    // =========================
    // SPIN
    // =========================
    if(action === "spin"){

      await spinAll();

      return;
    }

    // =========================
    // ADD ITEM
    // =========================
    if(action === "add"){

      const type = document.getElementById("itemType")?.value;
      const text = document.getElementById("itemText")?.value?.trim();

      if(!text) return;

      const item = {
        id: crypto.randomUUID(),
        name: text,
        image: null
      };

      if(type === "cap"){
        addCap(item);
      } else {
        addSwim(item);
      }

      setState({
        ui: { ...getState().ui }
      });

      return;
    }

    // =========================
    // DELETE (🔥 핵심 추가)
    // =========================
    const delBtn = e.target.closest(".delete-btn");

    if(delBtn){

      const type = delBtn.dataset.type;
      const id = delBtn.dataset.id;

      if(type === "cap"){
        removeCap(id);
      } else {
        removeSwim(id);
      }

      setState({
        ui: { ...getState().ui }
      });

      return;
    }

    // =========================
    // COVER CLICK (센터 변경)
    // =========================
    const card = e.target.closest(".cover-card");

    if(card){

      const type = card.dataset.type;
      const id = card.dataset.id;

      const state = getState();

      if(type === "cap"){
        setState({
          selection: {
            capId: id,
            swimId: state.selection.swimId
          }
        });
      }

      if(type === "swim"){
        setState({
          selection: {
            capId: state.selection.capId,
            swimId: id
          }
        });
      }
    }
  });
}
