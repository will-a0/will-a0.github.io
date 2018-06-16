// Interactive Scene
// Tony Li
// March 20, 2018

// -----------------------------
// Modified by William Ahiahonu
// as a component of auOS
// June 12th, 2018
// -----------------------------

//Variables
let penSize, penColor;
//let backgroundColorInput; - Not used in this version.
let state;
//let newCanvas; - Not used in this version.
let intro;
let stateChecker = true;
let rValue, gValue, bValue, sizeValue;
let rSlider, gSlider, bSlider, sizeSlider;
//All the pitures I need loaded for later
function preload() {
  intro = loadImage("intro.png");
  clear = loadImage("clear.png");
  //save = loadImage("save.png"); - Not used in this version.
}
//The setup function will run once before the draw function
function setup() {
  //This creates a canvas and allows the canvas to be used as a variable later on
  //let canvas = createCanvas(windowWidth, windowHeight); - Original.
  // Modified. - Simple canvas - William Ahiahonu.
  createCanvas(windowWidth, windowHeight);
  state = 1;
}
//This draws the start button and changes the state if it is clicked
function startButton() {
  let buttonWidth = 500;
  let buttonHeight = 200;
  let leftSide = width / 2 - buttonWidth / 2;
  let rightSide = leftSide + buttonWidth;
  let topSide = height / 2 - buttonHeight / 2 + 150;
  let bottomSide = topSide + buttonHeight;
  noStroke();
  if (mouseX >= leftSide &&
    mouseX <= rightSide &&
    mouseY >= topSide &&
    mouseY <= bottomSide) {
    fill(0, 140, 174);
    // Modified: Program moves to the new "state 2", which does not
    // included a background prompt. - William Ahiahonu.
    if (mouseIsPressed) {
      background(255, 239, 213);
      state = 2;
    }
  }
  else {
    fill(0, 45, 72);
  }
  rect(leftSide, topSide, buttonWidth, buttonHeight, 20);
  buttonText();
}
//This writes the text found in the intro screen
function buttonText() {
  textAlign(CENTER);
  fill(200, 241, 247);
  textSize(110);
  textStyle(BOLD);
  textFont("Cambria");
  text("Start", width / 2, height / 2 + 175);

  textAlign(CENTER);
  fill(150, 241, 247);
  textSize(150);
  textStyle(BOLD);
  textFont("Cambria");
  text("ALPHA PAINT", width / 2, height / 2 - 100);
}
//Create sliders with a range of 0, 255 and 0, 80 for the color and size of the pen
function setupSlider() {
  rSlider = createSlider(0, 255, 0);
  rSlider.position(width - 340, 50);
  rSlider.style("width", "255px");

  gSlider = createSlider(0, 255, 0);
  gSlider.position(width - 340, 50 + 30);
  gSlider.style("width", "255px");

  bSlider = createSlider(0, 255, 0);
  bSlider.position(width - 340, 50 + 60);
  bSlider.style("width", "255px");

  sizeSlider = createSlider(1, 80, 4);
  sizeSlider.position(width - 340, 500);
  sizeSlider.style("width", "255px");
}
//Creates the side panel found in state 3
function sidePanel() {
  strokeWeight(0);
  textSize(36);
  textStyle(BOLD);
  textAlign(CENTER);
  textFont("Cambria");
  //This makes the side pannel
  fill(0, 45, 72);
  rect(width - 400, 0, width, height);
  //This is for the dividers on the side pannel
  fill(0, 140, 174);
  rect(width - 400, 445, width, 8);
  rect(width - 400, 545, width, 8);
  //rect(width - 400, 715, width, 8); - Not used in this version.
  //This is just used to label the pen color and pan size sliders
  fill(200, 241, 247);
  text("Pen Color", width - 200, 40);
  text("Pen Size", width - 200, 490);
}
//This is for the tools found at the bottom of the side panel
function toolSelection() {
  imageMode(CENTER);
  //Clear canvas icon
  text("Clear Canvas", width - 200, 595);
  image(clear, width - 200, 655, 70, 90);
  //Save canvas icon
  // text("Save Canvas", width - 200, 765); - Not used in this version.
  // image(save, width - 200, 825, 80, 80);
}
//This is used to recognize the clicking of the icons
function mouseClicked() {
  //Button portion of the clear canvas icon
  if (mouseButton && mouseX >= width - 236 && mouseX <= width - 166 && mouseY >= 610 && mouseY <= 700) {
    background(255, 239, 213);
  }
  //Button portion of the save canvas icon - Not used in this version.
  // if (mouseButton && mouseX >= width - 229 && mouseX <= width - 185 && mouseY >= 783 && mouseY <= 862) {
  //   saveCanvas(canvas, "My Drawing", "jpg");
  // }
}
//This function hold the important parts of the code
function draw() {
  // Added functionality for program to draw only in fullscreen. - William Ahiahonu.
  if (fullscreen()) {
    //This is used to make the intro screen
    if (state === 1) {
      background(intro);
      startButton();
    }
    // Original.
    // This askes the user for a background color
    // else if (state === 2) {
    //   backgroundColorInput = prompt("Select a color for the background.");
    //   background(backgroundColorInput);
    //   state = 3;
    //   mouseIsPressed = false;
    // }
    // Modification: no prompt and a hard coded background - William Ahiahonu.
    else if (state === 2) {
      background(255, 239, 213);
      state = 3;
    }
    //This is the main part of the program as the actual drawing part is located here
    else if (state === 3) {
      sidePanel();
      toolSelection();
      //This allowed me to put the 'setupSlider' function in the draw loop instead of inside the function
      if (stateChecker) {
        setupSlider();
        stateChecker = false;
      }
      //This assigns the variables rValue, gValue and bValue to their slider value
      //THis also draws a square to dispay the color of the pen
      //THis also cahnges the color of the pen to the color that is shown in the square
      rValue = rSlider.value();
      gValue = gSlider.value();
      bValue = bSlider.value();
      fill(rValue, gValue, bValue);
      rect(width - 335, 150, 250, 250);
      stroke(rValue, gValue, bValue);
      //This assigns the sizeValue variable to its slider value and changes the pen size to the sizeValue variable
      sizeValue = sizeSlider.value();
      penSize = sizeValue;
    }
    //This bit of code is in charge of the actual drawings made on the canvas
    if (mouseIsPressed && mouseX <= width - 400) {
      strokeWeight(penSize);
      line(mouseX, mouseY, pmouseX, pmouseY);
    }
  }
  else {
    // Added content - when not in fullscreen, show an alert intead and
    // functionality added to remove sliders and replace them when
    // appropriate - William Ahiahonu.
    if (state === 3) {
      rSlider.remove();
      gSlider.remove();
      bSlider.remove();
      sizeSlider.remove();
    }
    push();
    textSize(30);
    textAlign(CENTER, CENTER);
    textFont("verdana");
    fill(0);
    text("Must Fullscreen. Press 'F'.", windowWidth/2, windowHeight/2);
    pop();
    stateChecker = true;
  }
}
// Resize canvas based on new dimensions when fullscreen is enabled.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
// Activate fullscreen.
function keyPressed() {
  if (key === "f" || key === "F") {
    let fullScreen = fullscreen();
    fullscreen(!fullScreen);
  }
}
