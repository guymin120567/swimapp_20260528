import { startApp } from "./controller/appController.js";

window.addEventListener("DOMContentLoaded", async () => {

  showSplash();

  await startApp();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      hideSplash();
    });
  });

});

function showSplash(){
  const el = document.getElementById("splash");
  if (!el) return;
  el.classList.remove("hide");
}

function hideSplash(){
  const el = document.getElementById("splash");
  if (!el) return;

  el.classList.add("hide");

  setTimeout(() => el.remove(), 400);
}
