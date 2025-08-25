const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const msg = document.getElementById("msg");
let jumping = false;
let gameOver = false;
let score = 0;
let mejor_puntaje=0;
const scoreEl = document.getElementById("score");
const resultEl =document.getElementById("resultado");

// Aumenta el puntaje 1 cada segundo
const scoreInterval = setInterval(() => {
  if (!gameOver) {       // solo suma si el juego no terminó
    score += 1;
    scoreEl.innerText = "Puntaje: " + score;
  }
}, 1000);

function jump() {
  if (jumping) return;
  jumping = true;
  let pos = 0;
  const up = setInterval(() => {
    if (pos >= 100) {
      clearInterval(up);
      const down = setInterval(() => {
        if (pos <= 0) {
          clearInterval(down);
          jumping = false;
        } else {
          pos -= 5;
          player.style.bottom = pos + "px";
        }
      }, 20);
    } else {
      pos += 5;
      player.style.bottom = pos + "px";
    }
  }, 20);
}

document.getElementById("game").addEventListener("touchstart", jump);
document.getElementById("game").addEventListener("mousedown",jump);

function moveObstacle() {
  if (gameOver) return;
  let pos = 600;
  obstacle.style.left = pos + "px";
  const timer = setInterval(() => {
    if (gameOver) { clearInterval(timer); return; }
    pos -= 5;
    obstacle.style.left = pos + "px";

    const playerBottom = parseInt(player.style.bottom || "0");
    if (pos < 80 && pos > 50 && playerBottom < 40) {
      msg.innerText = "¡Game Over!";
      if (score>= mejor_puntaje){
        resultEl.innerText='Tu mejor puntaje es: '+ score
        mejor_puntaje=score
      }
      
      gameOver = true;
      clearInterval(timer);
      setTimeout(() => {
        msg.innerText = "Toca dentro del juego para reiniciar";
        player.style.bottom = "0px";
        score = 0;
        gameOver = false;
        moveObstacle();
      }, 1500);
    }

    if (pos <= -20) {
      clearInterval(timer);
      moveObstacle();
    }
  }, 20);
}

moveObstacle();
