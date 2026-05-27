import {
  dom,
  cacheDOM
} from "./dom.js";

export function renderLayout(){

  if(!dom.app){

    cacheDOM();
  }

  if(dom.initialized){

    return;
  }

  dom.app.innerHTML = `

  <div class="container">

    <div class="tab-bar">

      <button
        class="tab-btn active"
        data-tab="roulette"
      >
        🎲 룰렛
      </button>

      <button
        class="tab-btn"
        data-tab="inventory"
      >
        📦 리스트
      </button>

      <button
        class="tab-btn"
        data-tab="records"
      >
        📋 기록
      </button>

    </div>

    <section
      id="rouletteTab"
      class="tab-page active"
    >

      <div id="rouletteSection"></div>

    </section>

    <section
      id="inventoryTab"
      class="tab-page"
    >

      <div id="listsSection"></div>

    </section>

    <section
      id="recordsTab"
      class="tab-page"
    >

      <div class="empty-records">
        기록 기능 준비중
      </div>

    </section>

  </div>

  `;

  dom.initialized = true;

  cacheDOM();
}
