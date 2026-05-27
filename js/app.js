import { startApp } from "./controller/appController.js";

const loadingText = (text) => {
  const el = document.getElementById("loadingText");
  if (el) el.textContent = text;
};

window.addEventListener("DOMContentLoaded", async () => {

  console.log("APP INIT");

  try {

    showSplash();

    loadingText("데이터 불러오는 중...");

    await startApp();

    loadingText("UI 생성 중...");

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

function showSplash() {

  const splash = document.getElementById("splash");
  if (!splash) return;

  splash.classList.remove("hide");
  splash.style.opacity = "1";
  splash.style.visibility = "visible";
}

function hideSplash() {

  const splash = document.getElementById("splash");
  const app = document.getElementById("app");

  if (app) {
    app.style.opacity = "1";
  }

  if (!splash) return;

  splash.classList.add("hide");

  setTimeout(() => {
    splash.remove();
  }, 400);
}

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
