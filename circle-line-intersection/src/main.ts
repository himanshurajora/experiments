import "./style.css";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circleGeo = {
  x: 500,
  y: 250,
  radius: 50,
  dx: 5,
  dy: 5,
};

const lineGeo = {
  x1: 250,
  y1: 200,
  x2: 800,
  y2: 300,
};

function drawCircle(circleData: typeof circleGeo) {
  ctx.beginPath();
  ctx.arc(circleData.x, circleData.y, circleData.radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function drawLine(lineData: typeof lineGeo) {
  ctx.beginPath();
  ctx.moveTo(lineData.x1, lineData.y1);
  ctx.lineTo(lineData.x2, lineData.y2);
  ctx.strokeStyle = "blue";
  ctx.stroke();

  // stroke width
  ctx.lineWidth = 3;
  ctx.closePath();
}

window.addEventListener("keydown", (e) => {
  if (!e.shiftKey) {
    e.key === "ArrowUp" && (lineGeo.y1 -= 10);
    e.key === "ArrowDown" && (lineGeo.y1 += 10);
    e.key === "ArrowLeft" && (lineGeo.x1 -= 10);
    e.key === "ArrowRight" && (lineGeo.x1 += 10);
  } else {
    e.key === "ArrowUp" && (lineGeo.y2 -= 10);
    e.key === "ArrowDown" && (lineGeo.y2 += 10);
    e.key === "ArrowLeft" && (lineGeo.x2 -= 10);
    e.key === "ArrowRight" && (lineGeo.x2 += 10);
  }

  console.log(isLineCircleCollide(lineGeo, circleGeo));
});

function isLineCircleCollide(
  lineData: typeof lineGeo,
  circleData: typeof circleGeo
) {
  const x1 = lineData.x1;
  const y1 = lineData.y1;
  const x2 = lineData.x2;
  const y2 = lineData.y2;

  const x = circleData.x;
  const y = circleData.y;
  const r = circleData.radius;

  // calculate the delta x that is the distance between two point of the line
  const dx = x2 - x1;
  // calculate the delta y that is the distance between two point of the line
  const dy = y2 - y1;

  const a = dx * dx + dy * dy;
  const b = 2 * (dx * (x1 - x) + dy * (y1 - y));
  const c = x * x + y * y + x1 * x1 + y1 * y1 - 2 * (x * x1 + y * y1) - r * r;

  const delta = b * b - 4 * a * c;

  if (delta < 0) {
    return false;
  }

  const t1 = (-b + Math.sqrt(delta)) / (2 * a);
  const t2 = (-b - Math.sqrt(delta)) / (2 * a);

  if (t1 >= 0 && t1 <= 1) {
    return true;
  }

  if (t2 >= 0 && t2 <= 1) {
    return true;
  }

  return false;
}

function render() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawCircle(circleGeo);
  drawLine(lineGeo);
}

function start() {
  render();
  requestAnimationFrame(start);
}

start();
