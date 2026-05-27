import { startApp } from "./controller/appController.js";

window.addEventListener("DOMContentLoaded", async () => {

  showSplash();

  await startApp();

  // 🔥 브라우저가 실제로 그릴 시간 확보
  requestAnimationFrame(() => {

    // 한 프레임 더 안정화
    requestAnimationFrame(() => {

      // 🔥 idle 타이밍으로 넘김 (핵심)
      if (window.requestIdleCallback) {

        requestIdleCallback(() => {
          hideSplash();
        });

      } else {

        setTimeout(() => {
          hideSplash();
        }, 150);
      }
    });
  });
});

// =========================
// SPLASH CONTROL
// =========================

function showSplash() {
  const el = document.getElementById("splash");
  if (!el) return;

  el.classList.remove("hide");
  el.style.opacity = "1";
}

function hideSplash() {
  const el = document.getElementById("splash");
  if (!el) return;

  el.classList.add("hide");

  // transition 고려해서 제거
  setTimeout(() => {
    el.remove();
  }, 600);
}
