let gameRunning = false;

let score = 0;

let timeLeft = 30;

let dropMaker;

let countdown;

const startBtn = document.getElementById("start-btn");

const resetBtn = document.getElementById("reset-btn");

const scoreDisplay = document.getElementById("score");

const timeDisplay = document.getElementById("time");

const gameContainer = document.getElementById("game-container");

const feedback = document.getElementById("feedback");

startBtn.addEventListener("click", startGame);

resetBtn.addEventListener("click", resetGame);

function startGame() {

  if (gameRunning) return;

  gameRunning = true;

  score = 0;

  timeLeft = 30;

  scoreDisplay.textContent = score;

  timeDisplay.textContent = timeLeft;

  feedback.textContent = "";

  countdown = setInterval(() => {

    timeLeft--;

    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {

      endGame();
    }

  }, 1000);

  dropMaker = setInterval(createDrop, 800);
}

function createDrop() {

  if (!gameRunning) return;

  const drop = document.createElement("div");

  const isBad = Math.random() < 0.3;

  drop.className = isBad
    ? "water-drop bad-drop"
    : "water-drop";

  const size = 60;

  drop.style.width = size + "px";

  drop.style.height = size + "px";

  const xPosition =
    Math.random() * (gameContainer.offsetWidth - size);

  drop.style.left =
    xPosition + "px";

  drop.style.animationDuration = "4s";

  drop.addEventListener("click", () => {

    if (isBad) {

      score--;

      feedback.textContent =
        "-1 Avoid dirty water!";

    } else {

      score++;

      feedback.textContent =
        "+1 Great job!";
    }

    scoreDisplay.textContent = score;

    drop.remove();
  });

  gameContainer.appendChild(drop);

  drop.addEventListener("animationend", () => {

    drop.remove();
  });
}

function endGame() {

  gameRunning = false;

  clearInterval(dropMaker);

  clearInterval(countdown);

  if (score >= 15) {

    feedback.textContent =
      "🎉 You Win! Final Score: " + score;

    celebrate();

  } else {

    feedback.textContent =
      "Game Over! Final Score: " + score;
  }
}

function resetGame() {

  clearInterval(dropMaker);

  clearInterval(countdown);

  gameRunning = false;

  score = 0;

  timeLeft = 30;

  scoreDisplay.textContent = 0;

  timeDisplay.textContent = 30;

  feedback.textContent = "";

  gameContainer.innerHTML = "";
}

function celebrate() {

  for (let i = 0; i < 25; i++) {

    const confetti =
      document.createElement("div");

    confetti.textContent = "🎉";

    confetti.style.position = "absolute";

    confetti.style.left =
      Math.random() * window.innerWidth + "px";

    confetti.style.top = "0px";

    confetti.style.fontSize = "30px";

    document.body.appendChild(confetti);

    setTimeout(() => {

      confetti.style.transform =
        "translateY(700px)";

    }, 100);

    setTimeout(() => {

      confetti.remove();

    }, 3000);
  }
}