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

function updateTargets(target_array) {
  clearTargets();
  target_array.forEach((t) => {
    const target_card = document.createElement("div");
    target_card.classList.add("target-card");
    const target_text = document.createTextNode(t);
    target_card.appendChild(target_text);
    const target_box = document.querySelector(".target-box");
    target_box.appendChild(target_card);
  });
}

function clearTargets() {
  const target_box = document.querySelector(".target-box");
  target_box.querySelectorAll("*").forEach((e) => e.remove());
}
