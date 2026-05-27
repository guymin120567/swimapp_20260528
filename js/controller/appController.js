import {
  initController
} from "../core/controller.js";

// =========================
// START
// =========================
export async function startApp(){

  const controller =
    initController();

  await controller.boot();
}
