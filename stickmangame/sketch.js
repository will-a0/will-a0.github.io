//---------------------------------
// Stickman Game
//---------------------------------

// Stickman game global variables.
let stickman, collisionDetector;
let stickmanGameImage, stickmanStandState, stickmanJumpState, stickmanRunState1, stickmanRunState2,
  stickmanRunState3, stickmanRunState4;
let obstacleX, obstacleSpeed, obstacleState, obstacleStateArray = [1, 2, 3, 4], lavaImage;
let gameState, score, highScore;
let secondCanvas;

function preload() {
  // Stickman game assets.
  stickmanGameImage = loadImage("assets/backgroundimage.png");
  stickmanStandState = loadImage("assets/stickman_stand.png");
  stickmanJumpState = loadImage("assets/stickman_jump.png");
  stickmanRunState1 = loadImage("assets/stickman_run1.png");
  stickmanRunState2 = loadImage("assets/stickman_run2.png");
  stickmanRunState3 = loadImage("assets/stickman_run3.png");
  stickmanRunState4 = loadImage("assets/stickman_run4.png");
  lavaImage = loadImage("assets/lavaimage.png");
}

function setup() {
  createCanvas(screen.width, screen.height);
  secondCanvas = createGraphics(windowWidth, windowHeight);
  // Stickman game setup tools.
  // Stickman display and behaviour class.
  stickman = new StickmanCharacter(150);
  // Collision Detection class, which includes the appearance and behaviour of the obstacles.
  collisionDetector = new CollisionDetection(150);
  // Obstacle movement and appearance changes - William.
  obstacleX = windowWidth/2;
  obstacleSpeed = 15;
  obstacleState = 1;
  // Controls for gameover screen and actual game.
  gameState = 1;
  // game and highscore control.
  score = 0;
  highScore = 0;
  // Checking for a local storage value from the last time played, else
  // the value is set beginning with the first game played.
  if (!localStorage.getItem("highscore")) {
    // Set the highscore.
    setHighScore();
  }
  else {
    // Retrieve the highscore if it already exists.
    getHighScore();
  }
}

function draw() {
  background(255);
  noStroke();
  if (gameState === 1) {
    // Stickman game function, containing all of the components of it.
    stickManGame();
  }
  else if (gameState === 2) {
    // If stickman hits an obstacle, game over.
    gameOverConditionals();
  }
}

function stickManGame() {
  // Background.
  background(186,85,211, 80);
  // Collision Detector (Hitbox) also containing the obstacles.
  // Set to follow the stickman's movements. Hitbox is hidden.
  collisionDetector.newPositionAndSurfaceDetection();
  collisionDetector.jump(-7.8);
  // Reveal the obstacles at the approriate times.
  collisionDetector.obstacles();
  // Surface of the game.
  fill(0);
  rect(0, 696, windowWidth, 100);
  // Stickman Character appearance, movement and behaviour.
  stickman.updateDisplay();
  stickman.newPositionAndSurfaceDetection();
  stickman.jump(-7.8);
  // Tracking the score.
  scoreTracker();
  // Disabling spacebar functionality so the window does not scroll up or down
  // when the spacebar is pressed.
  window.onkeydown = function killSpaceBar() {
    return !(keyCode === 32);
  };
  // Function to disable the ability to scroll.
  function disableScrolling() {
    window.scrollTo(0, 0);
  }
  // Adding listener to disable scrolling.
  window.addEventListener("scroll", disableScrolling);
}
function scoreTracker() {
  // Display for score and highscore within the game.
  push();
  textSize(50);
  fill(0);
  push();
  textFont("impact");
  textAlign(CENTER);
  text("Score: " + score + " m", windowWidth/2, 70);
  text("High Score: " + highScore + " m", windowWidth/2, 150);
  pop();
}
// Function to set local storage value to highscore in the game.
function setHighScore() {
  localStorage.setItem("highscore", score);
}
// Function to get local storage value if possible.
function getHighScore() {
  highScore = localStorage.getItem("highscore");
}
// Function to remove local storage value, if you can't beat the highscore :)
function keyTyped() {
  if (key === "c") {
    localStorage.removeItem("highscore");
  }
}
function gameOverConditionals() {
  // Display final score after stickman is dead.
  background(0);
  push();
  fill(255);
  textSize(90);
  textAlign(CENTER);
  textFont("impact");
  fill("red");
  text("YOU DIED!", windowWidth/2, windowHeight/2);
  fill("gold");
  textSize(40);
  text("Final Score: " + score + " m", windowWidth/2, windowHeight/2+70);
  text("High Score: " + highScore + " m", windowWidth/2, windowHeight/2+140);
  pop();
  // Obstacles are pushed to the end of the screen opposite of the stickman
  // before the game is rerun to give the player time to react.
  obstacleX = windowWidth;
  // Change...
  if(keyIsDown(82)) { // key r
    gameState = 1;
    score = 0;
  }
}

function keyPressed() {
  if (key === "f" || key === "F") {
    let fullScreen = fullscreen();
    fullscreen(!fullScreen);
  }
}

class StickmanCharacter {
  constructor(objectX) {
    this.width = width;
    this.height = height;
    this.objectX = objectX;
    this.objectY = 654;
    this.velocityY = 0;
    this.gravity = 0.3;
    this.gravitySpeed = 0;
    this.stickmanStanding = true;
    this.runningState = 1, this.frameDuration1 = 60 , this.frameDuration2 = 60,
    this.frameDuration3 = 60, this.frameDuration4 = 60;
    this.lastTimeFrameChanged = millis();
  }
  updateDisplay() {
    noStroke();
    imageMode(CENTER);
    if (this.objectY < 654) {
      image(stickmanJumpState, this.objectX+30, this.objectY, 480, 380);
    }
    else if (!this.objectY < 654 && this.stickmanStanding === true) {
      image(stickmanStandState, this.objectX, this.objectY-25, 70, 150);
    }
    if (keyIsDown(39) && !keyIsDown(38) && this.gravitySpeed === 0) { //39 - right arrow
      this.stickmanStanding = false;

      if (this.runningState === 1) {
        image(stickmanRunState1, this.objectX-20, this.objectY-10, 120, 125);
        if (millis() > this.lastTimeFrameChanged + this.frameDuration1) {
          this.runningState = 2;
          this.lastTimeFrameChanged = millis();
        }
      }
      if (this.runningState === 2) {
        image(stickmanRunState2, this.objectX-20, this.objectY-10, 100, 125);
        if (millis() > this.lastTimeFrameChanged + this.frameDuration2) {
          this.runningState = 3;
          this.lastTimeFrameChanged = millis();
        }
      }
      if (this.runningState === 3) {
        image(stickmanRunState3, this.objectX-20, this.objectY-16, 80, 135);
        if (millis() > this.lastTimeFrameChanged + this.frameDuration3) {
          this.runningState = 4;
          this.lastTimeFrameChanged = millis();
        }
      }
      if (this.runningState === 4) {
        image(stickmanRunState4, this.objectX-30, this.objectY-10, 120, 125);
        if (millis() > this.lastTimeFrameChanged + this.frameDuration4) {
          this.runningState = 1;
          this.lastTimeFrameChanged = millis();
        }
      }
    }
    else {
      this.stickmanStanding = true;
    }
  }
  newPositionAndSurfaceDetection() {
    this.gravitySpeed += this.gravity;
    this.objectY += this.velocityY + this.gravitySpeed;
    if (this.objectY > 654) {
      this.objectY = 654;
      this.gravitySpeed = 0;
    }
  }
  jump(negativeNumericalValue) {
    if (keyIsDown(38) && this.objectY > 639) { //up arrow
      stickman.gravity = negativeNumericalValue;
    }
    else if (keyIsDown(88) && this.objectY > 639) { //key x
      stickman.gravity = negativeNumericalValue-2;
    }
    else {
      stickman.gravity = 0.8;
    }
  }
}
class CollisionDetection {
  constructor(objectX) {
    this.width = width;
    this.height = height;
    this.objectX = objectX;
    this.objectY = 654;
    this.velocityY = 0;
    this.gravity = 0.3;
    this.gravitySpeed = 0;
  }
  updateDisplay() {
    //fill("grey");
    // Hitbox.
    rect(this.objectX-36, this.objectY-92, 60, 150);
  }
  newPositionAndSurfaceDetection() {
    this.gravitySpeed += this.gravity;
    this.objectY += this.velocityY + this.gravitySpeed;
    if (this.objectY > 654) {
      this.objectY = 654;
      this.gravitySpeed = 0;
    }
  }
  jump(negativeNumericalValue) {
    if (keyIsDown(38) && this.objectY > 639) { //up arrow
      collisionDetector.gravity = negativeNumericalValue;
    }
    else if (keyIsDown(88) && this.objectY > 639) { //key x
      collisionDetector.gravity = negativeNumericalValue-2;
    }
    else {
      collisionDetector.gravity = 0.8;
    }
  }
  obstacles() {
    //Obstacle 1.
    if (obstacleState === 1) {
      this.obstacleOccurance =
      collideRectCircle(this.objectX-36, this.objectY-92, 60, 150, obstacleX, 590, 240);
      fill("grey");
      ellipse(obstacleX, 580, 240);
    }
    //Obstacle 2.
    else if (obstacleState === 2) {
      this.obstacleOccurance =
      collideRectCircle(this.objectX-36, this.objectY-92, 60, 150, obstacleX, 580, 230, 50);
      fill("grey");
      triangle(obstacleX-60, 570, obstacleX-88, 470, obstacleX-116, 570);
      triangle(obstacleX+27, 570, obstacleX-1, 460, obstacleX-29, 570);
      triangle(obstacleX+117, 570, obstacleX+89, 470, obstacleX+61, 570);
      push();
      fill("black");
      rectMode(CENTER);
      rect(obstacleX, 580, 240, 50);
      pop();
      fill(0);
      rect(obstacleX-120, 605, 40, 100);
      rect(obstacleX-20, 605, 40, 100);
      rect(obstacleX+80, 605, 40, 100);
    }
    //Obstacle 3.
    else if (obstacleState === 3) {
      this.obstacleOccurance =
      collideRectRect(this.objectX-36, this.objectY-92, 60, 150, obstacleX-150, 655, 300, 100);
      this.obstacleOccurance3 =
      collideRectRect(this.objectX-36, this.objectY-92, 60, 150, obstacleX-200, 290, 400, 100);
      fill(0);
      rect(obstacleX-200, 315, 400, 100);
      fill("red");
      rect(obstacleX-150, 655, 300, 100);
      image(lavaImage, obstacleX, 700, 300, 90);
      fill(0);
      rect(obstacleX-200, 655, 50, 90);
      rect(obstacleX+150, 655, 50, 90);
    }
    // Obstacle 4.
    else if (obstacleState === 4) {
      this.obstacleOccurance =
      collideRectRect(this.objectX-36, this.objectY-92, 60, 150, obstacleX, 500, 500, 20);
      push();
      translate(obstacleX, 400);
      rotate(millis() / 100);
      fill(0);
      rectMode(CENTER);
      rect(0, 0, 300, 20);
      pop();
      push();
      fill(0);
      rect(obstacleX-20, 400, 40, 700);
      fill("red");
      ellipseMode(CENTER);
      ellipse(obstacleX, 400, 40);
      pop();
    }
    if (keyIsDown(39)) {
      obstacleX -= obstacleSpeed;
      if (score > highScore) {
        setHighScore();
        highScore = score;
      }
      if (frameCount % 5 === 0) {
        score ++;
      }
    }
    if (obstacleX <= -120) {
      obstacleX = windowWidth;
      obstacleState = obstacleStateArray[Math.floor(Math.random() * obstacleStateArray.length)];
    }
    if (this.obstacleOccurance || this.obstacleOccurance3) {
      gameState = 2;
    }
  }
}
