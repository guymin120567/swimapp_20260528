import {
  startApp
} from "./controller/appController.js";

// =========================
// APP
// =========================
window.addEventListener(
  "DOMContentLoaded",
  async ()=>{

    try{

      showSplash();

      await startApp();

      hideSplash();

    }catch(err){

      console.error(
        "APP INIT ERROR",
        err
      );

      forceStart(err);
    }
  }
);

// =========================
// SPLASH
// =========================
function showSplash(){

  const splash =
    document.getElementById(
      "splash"
    );

  if(!splash) return;

  splash.style.opacity =
    "1";

  splash.style.visibility =
    "visible";
}

// =========================
// HIDE
// =========================
function hideSplash(){

  const splash =
    document.getElementById(
      "splash"
    );

  const app =
    document.getElementById(
      "app"
    );

  if(app){

    app.style.opacity =
      "1";
  }

  if(splash){

    splash.classList.add(
      "hide"
    );

    setTimeout(()=>{

      splash.remove();

    },800);
  }
}

// =========================
// FORCE START
// =========================
function forceStart(err){

  const splash =
    document.getElementById(
      "splash"
    );

  if(splash){

    splash.remove();
  }

  const app =
    document.getElementById(
      "app"
    );

  if(app){

    app.innerHTML = `

    <div
      style="
        padding:40px;
        text-align:center;
      "
    >

      <h2>
        앱 시작 오류
      </h2>

      <pre
        style="
          margin-top:20px;
          white-space:pre-wrap;
          font-size:12px;
          opacity:0.7;
        "
      >
${err}
      </pre>

    </div>

    `;
  }
}
