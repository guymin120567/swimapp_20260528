import { getState, setState } from "../state/state.js";
import { spinAll } from "../features/roulette/roulette.js";
import { addCap, addSwim } from "../state/actions.js";

export function bindGlobal(){

  document.addEventListener("click", async (e) => {

    // =========================
    // SPIN
    // =========================
    const spinBtn = e.target.closest("[data-action='spin']");
    if(spinBtn){

      await spinAll();

      setState({
        ui: {
          ...getState().ui,
          isSpinning: false
        }
      });

      return;
    }

    // =========================
    // ADD
    // =========================
    const addBtn = e.target.closest("[data-action='add']");
    if(addBtn){

      const type = document.getElementById("itemType")?.value;
      const text = document.getElementById("itemText")?.value?.trim();

      if(!text) return;

      const item = {
        id: crypto.randomUUID(),
        name: text
      };

      if(type === "cap"){
        addCap(item);
      } else {
        addSwim(item);
      }

      // 🔥 state trigger (UI 자동 갱신)
      setState({});

      return;
    }

    // =========================
    // DELETE
    // =========================
    const del = e.target.closest(".delete-btn");
    if(del){

      e.stopPropagation();

      const { type, id } = del.dataset;

      const state = getState();

      if(type === "cap"){
        setState({
          data: {
            caps: state.data.caps.filter(v => v.id !== id)
          }
        });
      }

      if(type === "swim"){
        setState({
          data: {
            swimsuits: state.data.swimsuits.filter(v => v.id !== id)
          }
        });
      }

      return;
    }

    // =========================
    // COVER CLICK
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
      } else {
        setState({
          selection: {
            capId: state.selection.capId,
            swimId: id
          }
        });
      }

      return;
    }

  });
}
