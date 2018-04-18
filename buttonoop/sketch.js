// Button OOP Demo
// Dan Schellenberg
// Apr 16, 2018

let myButton;
let playButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myButton = new Button(100, 50, 150, 75);
  playButton = new Button(width/2-100, height/2-50, 200, 100);
}

function draw() {
  background(255);
  myButton.display();
  playButton.display();
  if (myButton.isClicked()) {
    background(255, 0, 0);
  }
}

class Button {
  constructor(x, y, buttonWidth, buttonHeight) {
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.leftSide = x;
    this.topSide = y;
    this.rightSide = this.leftSide + this.buttonWidth;
    this.bottomSide = this.topSide + this.buttonHeight;
  }

  display() {
    fill(0);
    if (mouseX >= this.leftSide && mouseX <= this.rightSide && mouseY >= this.topSide && mouseY <= this.bottomSide) {
      fill(125);
    }
    rect(this.leftSide, this.topSide, this.buttonWidth, this.buttonHeight);
  }

  isClicked() {
    if (mouseIsPressed && mouseX >= this.leftSide && mouseX <= this.rightSide && mouseY >= this.topSide && mouseY <= this.bottomSide) {
      return true;
    }
    else {
      return false;
    }
  }
}
