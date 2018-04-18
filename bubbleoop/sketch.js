// Bubble OOP Demo
// William Ahiahonu
// Apr 17, 2018

let myBubble;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myBubble = new Bubble(500, 660, 80, 80);
}

function draw() {
  background(255);
  myBubble.display();
  myBubble.moveUp();
}

class Bubble {
  constructor(x, y, bubbleWidth, bubbleHeight) {
    this.bubbleX = x;
    this.bubbleY = y;
    this.bubbleWidth = bubbleWidth;
    this.bubbleHeight = bubbleHeight;
  }

  display() {
    fill(0);
    ellipse(this.bubbleX, this.bubbleY, this.bubbleWidth, this.bubbleHeight);
  }

  moveUp() {
    this.bubbleX += random(-2, 1);
    this.bubbleY -= 1;
  }
}
