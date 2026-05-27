export const dom = {

  initialized:false,

  // ROOT
  app:null,

  // TAB
  rouletteTab:null,
  inventoryTab:null,
  recordsTab:null,

  // SECTION
  rouletteSection:null,
  listsSection:null,
  recordsSection:null,

  // BUTTON
  spinButton:null
};

// =========================
// CACHE
// =========================
export function cacheDOM(){

  dom.app =
    document.getElementById(
      "app"
    );

  dom.rouletteTab =
    document.getElementById(
      "rouletteTab"
    );

  dom.inventoryTab =
    document.getElementById(
      "inventoryTab"
    );

  dom.recordsTab =
    document.getElementById(
      "recordsTab"
    );

  dom.rouletteSection =
    document.getElementById(
      "rouletteSection"
    );

  dom.listsSection =
    document.getElementById(
      "listsSection"
    );

  dom.recordsSection =
    document.getElementById(
      "recordsSection"
    );

  dom.spinButton =
    document.getElementById(
      "spinButton"
    );
}

// =========================
// INIT
// =========================
export function initDOM(){

  cacheDOM();
}
