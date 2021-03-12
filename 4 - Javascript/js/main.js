import initializeControls from "./controls.js";
import initializeGame from "./game.js";

window.onload = function () {
  initializeControls();

  const start_game_button = document.getElementById("start_game");
  start_game_button.addEventListener("onClick", initializeGame);
};
