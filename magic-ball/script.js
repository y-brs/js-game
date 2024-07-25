const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const choices = ['Yes', 'No', 'Maybe', 'Ask Again'];

function drawBall(words = '') {
  // circle
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(150, 150, 150, 0, 2 * Math.PI);
  ctx.fill();

  // triangle
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.moveTo(150, 50);
  ctx.lineTo(50, 200);
  ctx.lineTo(250, 200);
  ctx.fill();

  // text
  if (words !== '') {
    ctx.fillStyle = '#fff';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(words, 150, 150);
  }
}

// Draw the empty ball
drawBall();

// select an answer
function getRandomAnswer() {
  let randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// The click event that redraws the ball
canvas.addEventListener('click', (event) => {
  drawBall(getRandomAnswer());
});
