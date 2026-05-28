import {
  startApp
} from "./controller/appController.js";

window.addEventListener(
  "DOMContentLoaded",
  async ()=>{

    showSplash();

    // 최소 splash 유지
    const minSplashTime =
      new Promise(
        res=>setTimeout(
          res,
          600
        )
      );

    // 앱 시작
    await Promise.all([

      startApp(),

      minSplashTime

    ]);

    // 🔥 핵심 추가
    const app =
      document.getElementById(
        "app"
      );

    if(app){

      app.classList.add(
        "show"
      );

    }

    requestAnimationFrame(()=>{

      requestAnimationFrame(()=>{

        if(
          window.requestIdleCallback
        ){

          requestIdleCallback(
            ()=>hideSplash()
          );

        }else{

          setTimeout(
            ()=>hideSplash(),
            120
          );

        }

      });

    });

  }
);

// =========================
// SPLASH
// =========================

function showSplash(){

  const el =
    document.getElementById(
      "splash"
    );

  if(!el) return;

  el.classList.remove(
    "hide"
  );

  el.style.opacity = "1";
}

// =========================
// HIDE
// =========================

function hideSplash(){

  const el =
    document.getElementById(
      "splash"
    );

  if(!el) return;

  el.classList.add(
    "hide"
  );

  setTimeout(()=>{

    el.remove();

  },600);
}
