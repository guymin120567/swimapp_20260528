import { startApp } from "./controller/appController.js";

// =========================
// INIT
// =========================
window.addEventListener("DOMContentLoaded", async () => {

  console.log("APP INIT");

  try {

    showSplash();

    await startApp();

    // render 완료 기준으로 바로 종료
    requestAnimationFrame(() => {
      hideSplash();
    });

  } catch (err) {

    console.error(err);
    forceStart(err);
  }
});

// =========================
// SHOW
// =========================
function showSplash() {

  const splash = document.getElementById("splash");
  if (!splash) return;

  splash.classList.remove("hide");
  splash.style.opacity = "1";
  splash.style.visibility = "visible";
}

// =========================
// HIDE
// =========================
function hideSplash() {

  const splash = document.getElementById("splash");
  if (!splash) return;

  splash.classList.add("hide");
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
