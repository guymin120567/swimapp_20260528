import { startApp } from "./controller/appController.js";

// =========================
// APP INIT
// =========================
window.addEventListener("DOMContentLoaded", async () => {

  console.log("APP INIT");

  try {

    showSplash();

    await startApp();

    hideSplash();

  } catch (err) {

    console.error("APP INIT ERROR", err);

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
// HIDE SPLASH
// =========================
function hideSplash() {

  const splash = document.getElementById("splash");

  const app = document.getElementById("app");

  if (app) {
    app.style.opacity = "1";
  }

  if (!splash) return;

  splash.classList.add("hide");

  // ❌ remove 하지 않는다 (중요)
  // DOM 재사용 안정성 확보
}

// =========================
// FORCE START (ERROR)
// =========================
function forceStart(err) {

  const splash = document.getElementById("splash");
  splash?.remove();

  const app = document.getElementById("app");

  if (app) {

    app.innerHTML = `
      <div style="padding:40px;text-align:center;">

        <h2>앱 시작 오류</h2>

        <pre style="
          margin-top:20px;
          white-space:pre-wrap;
          font-size:12px;
          opacity:0.7;
        ">
${err}
        </pre>

      </div>
    `;
  }
}
