import { getState, setState } from "../state/state.js";
import { spinAll } from "../features/roulette/roulette.js";
import { addCap, addSwim } from "../state/actions.js";

export function bindGlobal(){

  document.addEventListener("click", async (e) => {

    const action = e.target.dataset.action;

    if(action === "spin"){

      await spinAll();

      setState({
        ui: {
          ...getState().ui,
          isSpinning: false
        }
      });

      return;
    }

    if(action === "add"){

      const type = document.getElementById("itemType").value;
      const text = document.getElementById("itemText").value;

      const item = {
        id: crypto.randomUUID(),
        name: text
      };

      if(type === "cap"){
        addCap(item);
      } else {
        addSwim(item);
      }

      setState({}); // 🔥 강제 rerender trigger
    }
  });
}
