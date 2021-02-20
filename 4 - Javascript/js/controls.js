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

function initializeControls() {
  attachClickHandlers();
  attachKeyHandlers();
  attachTransitionHandlers();
}

function attachClickHandlers() {
  for (const key in key_drum_pair) {
    document
      .getElementById(key_drum_pair[key])
      .addEventListener("click", () => processKey(key));
  }
}

function attachKeyHandlers() {
  document.body.addEventListener("keydown", (e) =>
    processKey(e.key.toLocaleLowerCase())
  );
}

function attachTransitionHandlers() {
  for (const key in key_drum_pair) {
    let drum_card = document.getElementById(key_drum_pair[key]);
    drum_card.addEventListener("transitionend", () => {
      drum_card.classList.remove("playing");
    });
  }
}

function processKey(key) {
  let button_name = key_drum_pair[key];
  if (!button_name) return;
  let audio = new Audio(`./sounds/${button_name}.wav`);
  audio.play();
  document.getElementById(button_name).classList.add("playing");
}

export default initializeControls;
