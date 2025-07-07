const player = document.getElementById('player');
const game = document.getElementById('game');
const rescatado = document.getElementById('rescatado');

let posX = 100;
let posY = 0;
let velocityY = 0;
let isJumping = false;
let keys = {};
let gameStarted = false;

document.addEventListener('keydown', (e) => {
  if (gameStarted) keys[e.code] = true;
});
document.addEventListener('keyup', (e) => {
  if (gameStarted) keys[e.code] = false;
});

function checkRescate() {
  const playerRect = player.getBoundingClientRect();
  const rescatadoRect = rescatado.getBoundingClientRect();

  if (
    playerRect.right > rescatadoRect.left &&
    playerRect.left < rescatadoRect.right &&
    playerRect.bottom > rescatadoRect.top &&
    playerRect.top < rescatadoRect.bottom
  ) {
    alert('¡Rescataste a Moon!');
    gameStarted = false;
  }
}

function gameLoop() {
  if (!gameStarted) return;

  if (keys['ArrowRight']) posX += 4;
  if (keys['ArrowLeft']) posX -= 4;

  velocityY += 1.2;
  posY -= velocityY;

  if (posY < 0) {
    posY = 0;
    velocityY = 0;
    isJumping = false;
  }

  if (keys['Space'] && !isJumping) {
    velocityY = -18;
    isJumping = true;
  }

  player.style.left = posX + 'px';
  player.style.bottom = posY + 'px';

  checkRescate();

  requestAnimationFrame(gameLoop);
}

const pantallaInicio = document.getElementById('pantalla-inicio');
const btnComenzar = document.getElementById('btn-comenzar');

btnComenzar.addEventListener('click', () => {
  pantallaInicio.style.display = 'none';
  gameStarted = true;
  gameLoop();
});
