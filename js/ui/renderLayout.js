export function renderLayout() {

  const app = document.getElementById("app");
  if (!app) return;

  app.innerHTML = `
    <div class="container">

      <main class="main-content">

        <section id="rouletteSection" class="section roulette-page">
          <div class="roulette-bg"></div>
          <div id="rouletteContent"></div>
        </section>

        <section id="listsSection" class="section" style="display:none">
          <div class="block">

            <div class="section-title">아이템 추가</div>

            <div class="input-area">

              <select id="itemType">
                <option value="cap">수모</option>
                <option value="swim">수영복</option>
              </select>

              <input id="itemText" type="text" placeholder="이름 입력" />

              <input id="itemImage" type="file" accept="image/*" />

              <button class="spin-btn" data-action="add">추가하기</button>

            </div>
          </div>

          <div id="listsContent"></div>
        </section>

        <section id="recordsSection" class="section" style="display:none">
          <div class="section-title">기록</div>
          <div class="empty-records">아직 기록이 없습니다</div>
        </section>

      </main>

      <nav class="bottom-tabs">

        <button class="bottom-tab active" data-tab="roulette">룰렛</button>
        <button class="bottom-tab" data-tab="inventory">리스트</button>
        <button class="bottom-tab" data-tab="records">기록</button>

      </nav>

    </div>
  `;
}
