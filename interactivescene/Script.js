// Translating Python Processing Assignment, "Scene_Assignment" into Javascript

let x, isMovingLeft, isMovingRight;
let CarColorInput, CarSpeedInput;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundSetup();
  isMovingLeft = false;
  isMovingRight = false;
  x = 25;
  //y = 600;
}

function backgroundSetup() {
  goldColor = color(255, 198, 0);
  blueColor = color(0, 102, 153);
  randomBackground = lerpColor(goldColor, blueColor, random(.1, .99));
  background(randomBackground);
}

function draw() {
  noStroke();
  landscapePortion();
  cityPortion();
  drawCar(x);
  moveCar();
}

function mousePressed() {
  backgroundSetup();
}

function keyPressed() {
  //User input for the color and speed of the car
  if (key === "c" || key === "C") {
    CarColorInput = prompt("Change the color of the car to blue, green or red (red is the default): ", "");
  }
  else if (key === "s" || key === "S") {
    CarSpeedInput = prompt("Change the speed of the car (Min: 0, Max: 12): ", "");
  }

  if (key === "a" || key === "A") {
    isMovingLeft = true;
    if (isNaN(int(CarSpeedInput))) {
      isMovingLeft = false;
    }
  }

  else if (key === "d" || key === "D") {
    isMovingRight = true;
    if (isNaN(int(CarSpeedInput))) {
      isMovingRight = false;
    }
  }
}

function keyReleased() {
  if (key === "a" || key === "A") {
    isMovingLeft = false;
  }
  else if (key === "d" || key === "D") {
    isMovingRight = false;
  }
}

function moveCar() {
  if (isMovingLeft) {
    if (CarSpeedInput >= 0 && CarSpeedInput <= 12) {
      x -= float(CarSpeedInput);
    }

    if (x <= -90) {
      x = 1270;
    }
    print(CarSpeedInput);
  }
  if (isMovingRight) {
    if (CarSpeedInput >= 0 && CarSpeedInput <= 12) {
      x += float(CarSpeedInput);
    }

    if (x >= 1270) {
      x = -90;
    }
    print(CarSpeedInput);
  }
}

function landscapePortion() {
  //Sun
  fill(184, 134, 11);
  ellipse(0, 0, 200, 200);

  //Clouds
  fill(255);
  cloudPosition = 30;

  for (let cloud = 0; cloud < 5; cloud++) {
    ellipse(cloudPosition, 80, 150, 100);
    ellipse(cloudPosition+70, 80, 90, 70);
    ellipse(cloudPosition-70, 80, 90, 70);
    cloudPosition += 300
  }
}

function cityPortion() {
  //Tower
  fill(49, 79, 79);
  rect(480, 70, 40, 644);
  fill(random(0, 255), random(0, 255), random(0, 255))
  rect(447, 122, 105, 10)
  fill(49, 79, 79)
  rect(490, 30, 20, 40)

  //Background refresher
  fill(49, 79, 79);
  rect(-2, 585, 2000, 100);

  //The buidlings either than the tower and arc
  fill(0);
  rect(25, 520, 70, 644);
  rect(107, 400, 70, 644);
  rect(189, 300, 70, 644);
  rect(271, 200, 70, 644);
  rect(353, 280, 70, 644);
  rect(435, 383, 70, 644);
  rect(517, 310, 70, 644);
  rect(599, 410, 70, 644);
  rect(681, 210, 70, 644);
  rect(763, 320, 70, 644);
  rect(845, 511, 70, 644);
  rect(927, 423, 70, 644);
  rect(1009, 340, 70, 644);
  rect(1091, 321, 70, 644);
  rect(1173, 550, 70, 644);

  //Building with the arc
  fill(random(0, 255), random(0, 255), random(0, 255))
  arc(630, 590, 200, 200, 0.5, PI+QUARTER_PI, OPEN);
  fill(49, 79, 79);
  rect(463, 600, 300, 644);

  //Surface/Pavement
  fill(184, 134, 11);
  rect(-2, 643, 2000, 100);
}

function drawCar(x, y) {
  //Car
  fill(128, 128, 128);
  ellipse(x+70, 630, 30);
  ellipse(x+20, 630, 30);
  fill(255, 0, 0);

  if (CarColorInput === "blue" || CarColorInput === "Blue") {
    fill(65, 105, 225);
  }
  else if (CarColorInput === "green" || CarColorInput === "Green") {
    fill(0, 128, 0);
  }
  else if (CarColorInput === "flashy" || CarColorInput === "Flashy") {
    fill(random(0, 255), random(0, 255), random(0, 255));
  }

  rect(x, 600, 90, 20);
  rect(x, 585, 70, 20);

  fill(184, 134, 11);
  ellipse(x+80, 608, 10);

  fill(153, 0, 0);
  rect(x, 603, 10, 10);
}
