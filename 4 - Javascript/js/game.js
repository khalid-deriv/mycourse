const keys = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];

let current_key = "k";
let current_score = 0;

function initializeGame() {
  document.addEventListener("keydown", checkKeyPress);
}

function checkKeyPress(e, timer) {
  if (current_key === e.key) {
    current_score++;
    updateNextKey();
  }
}

function updateNextKey() {
  current_key = generateNextKey();
  document.getElementById(
    "key-display"
  ).textContent = current_key.toLocaleUpperCase();
  updateScoreDisplay();
}

function updateScoreDisplay() {
  document.getElementById("score").value = current_score;
}

function generateNextKey() {
  return keys[Math.floor(Math.random() * keys.length)];
}

export default initializeGame;
