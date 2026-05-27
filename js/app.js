import { startApp } from "./controller/appController.js";

// =========================
// INIT
// =========================
window.addEventListener("DOMContentLoaded", async () => {

  console.log("APP INIT");

  try {

    showSplash();

    await startApp();

    // 🔥 렌더 이후 확실히 한 프레임 뒤 제거
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hideSplash();
      });
    });

  } catch (err) {

    console.error(err);
    forceStart(err);
  }
});

// =========================
// SHOW SPLASH
// =========================
function showSplash() {

  const splash = document.getElementById("splash");
  if (!splash) return;

  splash.classList.remove("hide");
  splash.style.opacity = "1";
  splash.style.visibility = "visible";
}

// =========================
// HIDE SPLASH (핵심 안정화)
// =========================
function hideSplash() {

  const splash = document.getElementById("splash");
  const app = document.getElementById("app");

  // 🔥 app 강제 표시
  if (app) {
    app.style.opacity = "1";
  }

  if (!splash) return;

  splash.classList.add("hide");

  // 🔥 DOM 완전 제거 (잔상 방지)
  setTimeout(() => {
    splash.remove();
  }, 400);
}

// =========================
// ERROR
// =========================
function forceStart(err) {

  document.getElementById("splash")?.remove();

  const app = document.getElementById("app");

  if (app) {
    app.innerHTML = `
      <div style="padding:40px;text-align:center;">
        <h2>앱 시작 오류</h2>
        <pre style="white-space:pre-wrap;opacity:0.7;font-size:12px;">
${err}
        </pre>
      </div>
    `;
  }
}
