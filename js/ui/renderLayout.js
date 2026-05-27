export function renderLayout(){

  const app =
    document.getElementById(
      "app"
    );

  if(!app) return;

  app.innerHTML = `

    <div class="container">

      <main class="main-content">

        <section
          id="rouletteSection"
          class="section"
        ></section>

        <section
          id="listsSection"
          class="section"
          style="display:none"
        ></section>

        <section
          id="recordsSection"
          class="section"
          style="display:none"
        ></section>

      </main>

      <nav class="bottom-tabs">

        <button
          class="
            bottom-tab
            active
          "
          data-tab="roulette"
        >
          룰렛
        </button>

        <button
          class="bottom-tab"
          data-tab="inventory"
        >
          리스트
        </button>

        <button
          class="bottom-tab"
          data-tab="records"
        >
          기록
        </button>

      </nav>

    </div>

  `;
}
