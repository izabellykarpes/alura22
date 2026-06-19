// sketch.js - p5.js global mode
// Código otimizado para cálculo mínimo de pontos e redimensionamento responsivo.

let rawData = [
  100, 102, 101, 103, 107, 110, 108, 111, 115, 118,
  117, 119, 120, 122, 121, 124, 127, 130, 128, 131,
  135, 133, 136, 138, 140, 139, 142, 145, 144, 148
];

let points = [];         // pontos escalados para desenho
let padding = {t:20,r:30,b:40,l:50};
let chartW = 0, chartH = 0;
let canvasParentId = 'canvas-container';
let canvas;

function setup(){
  // cria canvas dentro do container já existente
  const container = document.getElementById(canvasParentId);
  const w = container.clientWidth;
  const h = max(300, Math.round(window.innerHeight * 0.55));
  canvas = createCanvas(w, h);
  canvas.parent(canvasParentId);

  // desenho sem stroke pesado
  colorMode(RGB);
  textFont('Arial', 12);
  computeLayout();
  noLoop(); // desenha somente quando necessário
  redraw();
}

function computeLayout(){
  // calcula área do gráfico
  chartW = width - padding.l - padding.r;
  chartH = height - padding.t - padding.b;

  // evita overflow com dados vazios
  if (!rawData || rawData.length === 0){ points = []; return; }

  const minV = min(rawData);
  const maxV = max(rawData);
  const span = max(1, maxV - minV);

  // pré-computa pontos escalados (otimização: calcula apenas quando muda layout ou dados)
  points = rawData.map((v, i) => {
    const x = padding.l + (i / (rawData.length - 1)) * chartW;
    const y = padding.t + chartH - ((v - minV) / span) * chartH;
    return {x, y, value: v, idx: i};
  });
}

function draw(){
  // fundo
  background(6, 12, 22);
  drawGrid();
  drawLineChart();
  drawAxes();
  drawFooterInfo();
}

function drawGrid(){
  push();
  stroke(255,255,255,18);
  strokeWeight(1);
  // grade horizontal (4 linhas)
  for (let i=0;i<=4;i++){
    const y = padding.t + (i/4)*chartH;
    line(padding.l, y, width - padding.r, y);
  }
  pop();
}

function drawLineChart(){
  if (points.length === 0) return;

  // linha principal
  noFill();
  stroke(96,165,250);
  strokeWeight(2);
  beginShape();
  for (let p of points) vertex(p.x, p.y);
  endShape();

  // área sutil preenchida
  beginShape();
  fill(64,128,255,18);
  strokeWeight(0);
  vertex(points[0].x, height - padding.b);
  for (let p of points) vertex(p.x, p.y);
  vertex(points[points.length-1].x, height - padding.b);
  endShape();

  // pontos
  noStroke();
  fill(79,209,197);
  for (let p of points){
    circle(p.x, p.y, 6);
  }

  // interação: tooltip para ponto mais próximo do mouse
  if (mouseIsPressed === false && mouseX >= 0 && mouseY >= 0){
    const nearest = findNearestPoint(mouseX, mouseY, 14);
    if (nearest){
      drawTooltip(nearest);
    }
  }
}

function findNearestPoint(mx, my, maxDist){
  let best = null;
  let bestDist = maxDist;
  for (let p of points){
    const d = dist(mx, my, p.x, p.y);
    if (d < bestDist){ bestDist = d; best = p; }
  }
  return best;
}

function drawTooltip(p){
  push();
  // linha guia
  stroke(255,255,255,60);
  strokeWeight(1);
  line(p.x, padding.t, p.x, height - padding.b);

  // tooltip box
  const txt = `Índice: ${p.idx}  -  Valor: ${p.value}`;
  const pad = 8;
  textSize(12);
  const tw = textWidth(txt);
  const bx = constrain(p.x + 12, padding.l, width - padding.r - tw - pad*2);
  const by = max(p.y - 36, padding.t + 6);

  fill(8,12,18,220);
  stroke(255,255,255,10);
  rect(bx, by, tw + pad*2, 22, 6);

  fill(230);
  noStroke();
  text(txt, bx + pad, by + 15);
  pop();
}

function drawAxes(){
  push();
  stroke(255,255,255,60);
  strokeWeight(1.2);
  // eixo X
  line(padding.l, height - padding.b, width - padding.r, height - padding.b);
  // eixo Y
  line(padding.l, padding.t, padding.l, height - padding.b);

  // labels Y simples (min / max)
  fill(170);
  noStroke();
  textAlign(LEFT, CENTER);
  if (points.length>0){
    const values = rawData;
    text(max(values), 8, padding.t);
    text(min(values), 8, height - padding.b);
  }
  pop();
}

function drawFooterInfo(){
  push();
  fill(150);
  textSize(12);
  textAlign(RIGHT, CENTER);
  // canvas source uses DOM element for i18n, fallback text kept
  const dom = document.getElementById('canvas-source');
  const txt = dom ? dom.textContent : 'Fonte: Dados de exemplo — substitua por sua API';
  text(txt, width - padding.r, height - 12);
  pop();
}

function windowResized(){
  const container = document.getElementById(canvasParentId);
  const w = container.clientWidth;
  const h = max(300, Math.round(window.innerHeight * 0.55));
  resizeCanvas(w, h);
  computeLayout(); // recalcula pontos
  redraw();
}

// função utilitária para atualizar dados (ex: fetch de API)
// Mantém arquitetura otimizada: recalcula apenas quando novos dados chegam.
function updateData(newArray){
  rawData = newArray.slice(); // copia segura
  computeLayout();
  redraw();
}
