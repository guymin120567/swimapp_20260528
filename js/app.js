import { startApp } from "./controller/appController.js";

window.addEventListener("DOMContentLoaded", async () => {

  showSplash();

  // 🔥 최소 표시시간 보장 (깜빡임 방지)
  const minSplashTime = new Promise(res => setTimeout(res, 600));

  await Promise.all([
    startApp(),
    minSplashTime
  ]);

  requestAnimationFrame(() => {

    requestAnimationFrame(() => {

      if (window.requestIdleCallback) {
        requestIdleCallback(() => hideSplash());
      } else {
        setTimeout(() => hideSplash(), 120);
      }

    });

  });

});

// =========================
// SPLASH
// =========================

function showSplash() {

  const el = document.getElementById("splash");
  if (!el) return;

  el.classList.remove("hide");
  el.style.opacity = "1";
}

// =========================
// HIDE
// =========================

function hideSplash() {

  const el = document.getElementById("splash");
  if (!el) return;

  el.classList.add("hide");

  setTimeout(() => {
    el.remove();
  }, 600);
}
