let game_timer;
let current_key_position = 0;
let score = 0;
let is_game_started = false;

const history = [];
const sample_game_mode = [
  "g",
  "a",
  "g",
  "g",
  "a",
  "g",
  "g",
  "a",
  "g",
  "g",
  "a",
  "g",
];

const key_drum_pair = {
  a: "clap",
  s: "hi_hat",
  d: "kick",
  f: "open_hat",
  g: "boom",
  h: "ride",
  j: "snare",
  k: "tom",
  l: "tink",
};

// Element
const timer_element = document.getElementById("timer");
const score_element = document.getElementById("score");

// Default data
const key_status_pair = [
  { id: "", status: "" },
  { id: "", status: "" },
  { id: "", status: "" },
  { id: "", status: "" },
  { id: "", status: "" },
  { id: "", status: "" },
  { id: "", status: "" },
];

const start_game_btn = document.getElementById("start_game");
start_game_btn.addEventListener("click", () => {
  is_game_started = !is_game_started;
  if (is_game_started) {
    startGame();
  } else {
    endGame();
  }
});

function startGame() {
  startTimer(120);
  start_game_btn.textContent = "End Game";
}

function endGame() {
  clearInterval(game_timer);
  start_game_btn.textContent = "Start Game";
  timer_element.textContent = "00:00";
}

Object.keys(key_drum_pair).forEach((key) => {
  const drum_type = key_drum_pair[key];
  const key_card = document.getElementById(drum_type);
  key_card.addEventListener("click", () => playSound(drum_type));
});

document.addEventListener("keydown", (e) => {
  processKeyPress(e.key.toLocaleLowerCase());
});

function processKeyPress(key) {
  const drum_type = key_drum_pair[key];
  if (drum_type) {
    playSound(drum_type);
  }
  if (is_game_started) {
    if (key === sample_game_mode[current_key_position]) {
      score++;
    }
    current_key_position++;

    if (sample_game_mode.length === current_key_position + 1) {
      endGame();
    }
  }
}

function playSound(drum_type) {
  const audio = new Audio(`./sounds/${drum_type}.wav`);
  audio.play();
}

// Sets Timer. Duration is in seconds.
function startTimer(duration) {
  let current_time = 0;
  game_timer = setInterval(() => {
    current_time++;
    timer_element.textContent = formatTime(current_time);
    if (current_time >= duration) {
      clearInterval(game_timer);
    }
  }, 1000);
}

// Converts seconds to mm:ss. Time is in seconds.
function formatTime(time) {
  minutes = ("0" + Math.floor(time / 60)).substr(-2);
  seconds = ("0" + Math.floor(time % 60)).substr(-2);
  return `${minutes}:${seconds}`;
}

// Updates target display
function updateTargets(target_array) {
  clearTargets();
  let position = 0;
  target_array.forEach((k) => {
    const { id, status } = k;
    const target_card = document.createElement("div");
    target_card.classList.add("target-card");
    if (status) {
      target_card.classList.add(status);
    } else if (position === 3) {
      target_card.classList.add("active");
    }
    const target_text = document.createTextNode(id.toUpperCase());
    target_card.appendChild(target_text);
    const target_box = document.querySelector(".target-box");
    target_box.appendChild(target_card);
    position++;
  });
}

updateTargets(key_status_pair);

function clearTargets() {
  const target_box = document.querySelector(".target-box");
  target_box.querySelectorAll("*").forEach((e) => e.remove());
}
