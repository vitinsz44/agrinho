let questions = [
  {
    question: "O que o campo fornece para a cidade?",
    options: [
      "Wi-Fi gratuito",
      "Produtos agrícolas e alimentos",
      "Shoppings e cinemas",
      "Poluição sonora"
    ],
    correct: 1
  },
  {
    question: "Como a cidade ajuda o campo?",
    options: [
      "Com chuvas artificiais",
      "Com energia das ruas",
      "Com acesso à tecnologia e serviços",
      "Com trânsito intenso"
    ],
    correct: 2
  },
  {
    question: "Qual transporte conecta campo e cidade?",
    options: [
      "Trem e caminhão",
      "Patinete elétrico",
      "Submarino",
      "Elevador"
    ],
    correct: 0
  },
  {
    question: "Qual benefício a cidade pode oferecer ao campo?",
    options: [
      "Expansão do desmatamento",
      "Investimento em educação e saúde",
      "Poluição da água",
      "Falta de saneamento"
    ],
    correct: 1
  }
];

let currentQuestion = 0;
let selected = -1;
let showFeedback = false;
let bridges = 0;
let showFinalMessage = false;

function setup() {
  createCanvas(900, 500);
  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  background(240);
  
  drawScene();
  
  if (currentQuestion < questions.length) {
    drawQuestion();
  } else if (!showFinalMessage) {
    showFinalMessage = true;
  }

  if (showFinalMessage) {
    drawFinal();
  }
}

function drawScene() {
  // Campo
  noStroke();
  fill(120, 200, 140);
  rect(0, 0, width / 2, height);

  // Árvores
  fill(80, 140, 100);
  ellipse(150, 380, 80);
  ellipse(200, 360, 90);

  // Cidade
  fill(180);
  rect(width / 2, 0, width / 2, height);

  // Prédios
  fill(100);
  for (let i = 0; i < 5; i++) {
    let x = width / 2 + i * 60;
    rect(x, height - 120 - i * 15, 40, 120 + i * 15);
  }

  // Pontes (cada acerto)
  for (let i = 0; i < bridges; i++) {
    let y = 120 + i * 50;
    stroke(60, 150, 200);
    strokeWeight(4);
    line(width / 2 - 100, y, width / 2 + 100, y);
  }

  noStroke();
  fill(0);
  textSize(16);
  text("🌾 Campo", width * 0.25, 30);
  text("🏙️ Cidade", width * 0.75, 30);
}

function drawQuestion() {
  let q = questions[currentQuestion];

  fill(255);
  stroke(0);
  strokeWeight(1);
  rect(width / 2 - 200, 100, 400, 220, 12);
  noStroke();
  fill(0);
  textSize(18);
  text(q.question, width / 2, 130);

  for (let i = 0; i < q.options.length; i++) {
    let y = 160 + i * 40;
    fill(i === selected ? '#ddd' : '#f9f9f9');
    stroke(0);
    rect(width / 2 - 180, y, 360, 30, 6);
    noStroke();
    fill(0);
    text(q.options[i], width / 2, y + 15);
  }

  if (showFeedback) {
    textSize(16);
    fill(selected === q.correct ? 'green' : 'red');
    text(selected === q.correct ? "✔️ Correto!" : "❌ Errado!", width / 2, 330);
    fill(100);
    text("Clique para continuar", width / 2, 360);
  }
}

function drawFinal() {
  fill(255);
  stroke(0);
  rect(width / 2 - 220, 150, 440, 150, 20);
  noStroke();
  fill(0);
  textSize(20);
  text("🌱 Parabéns! Você construiu a ponte!", width / 2, 190);
  text("Campo e cidade são diferentes, mas precisam um do outro.", width / 2, 230);
  text("Obrigado por jogar!", width / 2, 270);
}

function mousePressed() {
  if (showFeedback) {
    showFeedback = false;
    selected = -1;
    currentQuestion++;
  } else {
    let q = questions[currentQuestion];
    for (let i = 0; i < q.options.length; i++) {
      let y = 160 + i * 40;
      if (
        mouseX > width / 2 - 180 &&
        mouseX < width / 2 + 180 &&
        mouseY > y &&
        mouseY < y + 30
      ) {
        selected = i;
        showFeedback = true;
        if (i === q.correct) {
          bridges++;
        }
      }
    }
  }
}