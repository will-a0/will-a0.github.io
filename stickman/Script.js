// global variable
let x, y;
let isMovingUp, isMovingDown, isMovingLeft, isMovingRight

function setup() {
  createCanvas(windowWidth,windowHeight);
  x = width/2
  y = height/2
  isMovingUp = false;
  isMovingDown = false;
  isMovingLeft = false
  isMovingRight = false
}

function draw() {
  background(255);

  moveStickman();

  drawStickman(mouseX, mouseY);
  drawStickman(x,y);
}

function keyPressed() {
  //print(key);

  if (key == 'w' || key == 'W') {
    //y = y - 10;
    isMovingUp = true;
  }
  else if (key == 's' || key == 'S') {
    //y = y + 10;
    isMovingDown = true;
  }
  if (key == 'a' || key == 'A') {
    //x = x - 10;
    isMovingLeft = true;
  }
  else if (key == 'd' || key == 'D') {
    //x = x + 10;
    isMovingRight = true;
  }
}

function keyReleased() {
  if (key == 'w' || key == 'W') {
    //y = y - 10;
    isMovingUp = false;
  }
  else if (key == 's' || key == 'S') {
    //y = y + 10;
    isMovingDown = false;
  }
  if (key == 'a' || key == 'A') {
    //x = x - 10;
    isMovingLeft = false;
  }
  else if (key == 'd' || key == 'D') {
    //x = x + 10;
    isMovingRight = false;
  }
}

function moveStickman() {
  if (isMovingUp) {
    y = y - 10;
  }
  else if (isMovingDown) {
    y = y + 10;
  }
  if (isMovingLeft) {
    x = x - 10;
  }
  else if (isMovingRight) {
    x = x + 10;
  }
}

function drawStickman(x,y) {

  //body
  line(x,y,x,y+200);

  //head of stickman
  fill(255,255,255);
  ellipse(x,y,100,100);

  //hat
  fill(255,0,0);
  rect(x-50,y-80,100,30);
  rect(x-25,y-130,50,50);

  //arms
  line(x-50,y+100,x+50,y+100);

  //legs
  line(x,y+200,x-50,y+250);
  line(x,y+200,x+50,y+250);
}
