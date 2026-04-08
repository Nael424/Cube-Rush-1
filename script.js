const grid = document.getElementById("grid");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const coinsEl = document.getElementById("coins");
const game = document.getElementById("game");

let score = 0;
let timeLeft = 120;
let coins = 0;
let targetIndex = 0;
let timer;
let interval;

function saveProfile() {
  console.log("profil sauvegardé");
}

function createGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    cell.onclick = () => {
      if (i === targetIndex) {
        score++;
        coins++;
        nextRound();
        update();
      }
    };

    grid.appendChild(cell);
  }
}

function nextRound() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(c => c.classList.remove("target"));

  targetIndex = Math.floor(Math.random() * 25);
  const target = cells[targetIndex];

  target.classList.add("target");

  // effet visuel
  grid.classList.remove("flash");
  void grid.offsetWidth;
  grid.classList.add("flash");
}

function startGame() {
  score = 0;
  timeLeft = 120;
  coins = 0;

  createGrid();
  nextRound();
  update();

  interval = setInterval(nextRound, 1500);

  timer = setInterval(() => {
    timeLeft--;
    update();

    if (timeLeft <= 0) {
      clearInterval(timer);
      clearInterval(interval);
      alert("Fin !");
    }
  }, 1000);
}

function update() {
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;
  coinsEl.textContent = coins;
}

// plein écran du jeu (fonctionnel)
document.getElementById("fullscreenBtn").onclick = () => {
  game.classList.toggle("fullscreen");
};

startGame();