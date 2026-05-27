export function initController(){

  async function boot(){

    console.log("BOOT START");

    initDOM();

    let saved = null;

    try {
      saved = await loadState();
    } catch(e){
      console.warn("STATE LOAD FAILED", e);
      saved = null;
    }

    if(saved){
      setState(saved);
    } else {
      setState(structuredClone(defaultState));
    }

    normalizeState();

    renderLayout();
    renderRoulette();
    renderLists();
    initTabs();

    bindGlobal();

    console.log("BOOT DONE");
  }

  return { boot };
}
