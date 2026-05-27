export const dom = {

  initialized: false,

  app: null,

  rouletteTab: null,
  inventoryTab: null,
  recordsTab: null,

  rouletteSection: null,
  listsSection: null,
  recordsSection: null,

  spinButton: null
};

export function cacheDOM(){

  dom.app = document.getElementById("app");

  dom.rouletteTab = document.querySelector('[data-tab="roulette"]');
  dom.inventoryTab = document.querySelector('[data-tab="inventory"]');
  dom.recordsTab = document.querySelector('[data-tab="records"]');

  dom.rouletteSection = document.getElementById("rouletteSection");
  dom.listsSection = document.getElementById("listsSection");
  dom.recordsSection = document.getElementById("recordsSection");

  dom.spinButton = document.querySelector('[data-action="spin"]');
}

export function initDOM(){

  cacheDOM();

  dom.initialized = true;

  console.log("DOM INIT DONE", dom);
}
