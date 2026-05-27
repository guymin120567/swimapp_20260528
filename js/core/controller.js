export function initController(){

  async function boot(){

    console.log("BOOT START");

    initDOM();

    // 🔥 DB SAFE LOAD (hang 방지)
    const saved = await safeLoadState();

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

  // =========================
  // SAFE LOAD (핵심)
  // =========================
  async function safeLoadState(){

    try {

      return await Promise.race([
        loadState(),
        timeout(3000) // 🔥 3초 제한
      ]);

    } catch (e) {

      console.warn("loadState fallback -> null", e);
      return null;
    }
  }

  function timeout(ms){

    return new Promise((_, reject) => {
      setTimeout(() => reject("DB TIMEOUT"), ms);
    });
  }

  return { boot };
}
