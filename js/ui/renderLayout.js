export function renderLayout(){

  const app =
    document.getElementById(
      "app"
    );

  if(!app) return;

  app.innerHTML = `

    <!-- ========================= -->
    <!-- SPLASH -->
    <!-- ========================= -->

    <div id="splash">

      <div class="splash-bg"></div>

      <div class="splash-inner">

        <img
          class="splash-dolphin"
          src="./assets/dolphin.png"
          alt="dolphin"
        />

        <div class="splash-title">
          Swim Roulette
        </div>

        <div class="splash-sub">
          RANDOM SWIM STYLE
        </div>

      </div>

    </div>

    <!-- ========================= -->
    <!-- APP -->
    <!-- ========================= -->

    <div class="container">

      <main class="main-content">

        <!-- ========================= -->
        <!-- ROULETTE -->
        <!-- ========================= -->

        <section
          id="rouletteSection"
          class="section"
        >

          <div
            id="rouletteContent"
          ></div>

        </section>

        <!-- ========================= -->
        <!-- LISTS -->
        <!-- ========================= -->

        <section
          id="listsSection"
          class="section"
          style="display:none"
        >

          <!-- INPUT -->

          <div class="block">

            <div class="section-title">
              아이템 추가
            </div>

            <div class="input-area">

              <select id="itemType">

                <option value="cap">
                  수모
                </option>

                <option value="swim">
                  수영복
                </option>

              </select>

              <input
                id="itemText"
                type="text"
                placeholder="이름 입력"
              />

              <input
                id="itemImage"
                type="file"
                accept="image/*"
              />

              <button
                class="spin-btn"
                data-action="add"
              >
                추가하기
              </button>

            </div>

          </div>

          <!-- LIST -->

          <div
            id="listsContent"
          ></div>

        </section>

        <!-- ========================= -->
        <!-- RECORD -->
        <!-- ========================= -->

        <section
          id="recordsSection"
          class="section"
          style="display:none"
        >

          <div class="section-title">
            기록
          </div>

          <div class="empty-records">
            아직 기록이 없습니다
          </div>

        </section>

      </main>

      <!-- ========================= -->
      <!-- BOTTOM TAB -->
      <!-- ========================= -->

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

  // =========================
  // SPLASH SHOW
  // =========================

  requestAnimationFrame(()=>{

    app.classList.add(
      "show"
    );

  });

  // =========================
  // SPLASH HIDE
  // =========================

  const splash =
    document.getElementById(
      "splash"
    );

  if(splash){

    setTimeout(()=>{

      splash.classList.add(
        "hide"
      );

    }, 1800);
  }
}
