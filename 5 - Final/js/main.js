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
}

function playSound(drum_type) {
  const audio = new Audio(`./sounds/${drum_type}.wav`);
  audio.play();
}

// Holds the log of the recent 7 played keys
const key_status_pair = [
  { id: "", status: "" },
  { id: "", status: "" },
  { id: "", status: "" },
  { id: "a", status: "" },
  { id: "", status: "" },
  { id: "", status: "" },
  { id: "", status: "" },
];

const sample_game_mode = ["g", "a", "g", "g", "a", "g", "g", "a", "g", "g"];

// Sets Timer. Duration is in seconds.
function startTimer(duration) {
  const timer_element = document.getElementById("timer");
  let current_time = 0;
  const interval_id = setInterval(() => {
    current_time++;
    timer_element.textContent = formatTime(current_time);
    if (current_time >= duration) {
      clearInterval(interval_id);
    }
  }, 1000);
}

// Converts seconds to mm:ss. Time is in seconds.
function formatTime(time) {
  minutes = ("0" + Math.floor(time / 60)).substr(-2);
  seconds = ("0" + Math.floor(time % 60)).substr(-2);
  return `${minutes}:${seconds}`;
}

startTimer(120);

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
