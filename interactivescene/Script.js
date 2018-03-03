// Interactive Scene Assignment
// By: William Ahiahonu
// Computer Science 30
// February 26th, 2018

// Extra for experts attempt:
// - Use of random for background changes, the flashing of the center
// tower, the flashing of the arc on the smaller building, and the car.
// - The use of the isNaN() function to test for NaN so that when
// nothing is entered for the speed input of the car, the movement
// mechanisms are disabled so that the car does not disappear.
// *New* - Added music to the scene.

// Global Variables set to be used later in the code.
let x, isMovingLeft, isMovingRight;
let carColorInput, carSpeedInput;
let music, music2;

// Loads the music for the scene.
function preload() {
  music = loadSound("WestGrandBoulevard.mp3");
  music2 = loadSound("BangBangBoogaloo.mp3");
}

// This function sets up the window in which the scene will run as
// well as the background and the variables for the car's position/movement.
function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundSetup();
  isMovingLeft = false;
  isMovingRight = false;
  x = 25;
  playMusic();
}

// This function plays the music for the scene.
function playMusic() {
  music.setVolume(0.3);
  music.play();
  // if (!music.isPlaying()) {
  //   music2.setVolume(0.5);
  //   music2.play();
  // }
}

// This function sets the background of the scene to change randomly everytime
// it is refreshed.
function backgroundSetup() {
  goldColor = color(255, 198, 0);
  blueColor = color(0, 102, 153);
  randomBackground = lerpColor(goldColor, blueColor, random(.1, .99));
  background(randomBackground);
}

// After everthing is set, this function calls the other functions in order
// to draw the entire interactive scene. 'backgroundSetup()' is called in the
// setup function instead of the draw function so that is does not continue
// looping.
function draw() {
  noStroke();
  landscapePortion();
  cityPortion();
  drawCar(x);
  moveCar();
  print(!music.isPlaying());
}

// This function allows for the background of the scene to be changed with just
// the click of the mouse.
function mousePressed() {
  backgroundSetup();
}

// This function activates the user input for car colour and speed and also
// enables the car to move via keys 'a' and 'd' ('w' and 's' not used since it would
// be unrealistic for a car to 'fly').
function keyPressed() {
  // When key 'c' is pressed, the user is prompted to enter a colour for the car.
  if (key === "c" || key === "C") {
    carColorInput = prompt("Change the color of the car to blue, green or red (red is the default): ", "");
  }

  // When key 's' is pressed, the user is prompted to enter a number value for the car's
  // speed.
  else if (key === "s" || key === "S") {
    carSpeedInput = prompt("Change the speed of the car (Min: 0, Max: 12): ", "");
  }

  // if key 'a' is pressed, the car moves left.
  if (key === "a" || key === "A") {
    isMovingLeft = true;

    // If the speed input entered is a NaN value (Not a real Number), the car's
    // ability to move left is disabled so that it does not disappear.
    if (isNaN(int(carSpeedInput))) {
      isMovingLeft = false;
    }
  }

  // if key 'd' is pressed, the car moves right.
  else if (key === "d" || key === "D") {
    isMovingRight = true;

    // If the speed input entered is a NaN value (Not a real Number), the car's
    // ability to move right is disabled so that it does not disappear.
    if (isNaN(int(carSpeedInput))) {
      isMovingRight = false;
    }
  }
}

// This function serves as a check to make sure that the car is not moving a
// certain direction if a certain key is released.
function keyReleased() {
  // if key 'a' is released, the car no longer moves left.
  if (key === "a" || key === "A") {
    isMovingLeft = false;
  }

  // if key 'd' is released, the car no longer moves right.
  else if (key === "d" || key === "D") {
    isMovingRight = false;
  }
}

// This function incorporates the user input for speed as well as the the
// variables, 'isMovingLeft', 'isMovingRight' and 'x' in order to move the
// car via changing 'x' by a certain amount.
function moveCar() {
  // If the key 'a' is pressed and the user enters a number for the speed input,
  // the car will move left by that certain number. Input cannot be smaller than
  // 0 or greater than 12. If nothing is entered when prompted, the car will not move.
  if (isMovingLeft) {
    if (carSpeedInput >= 0 && carSpeedInput <= 12) {
      x -= float(carSpeedInput);
    }

    // This is a parameter so that the car does not leave the scene -- when
    // x equals -90 or lower, the car will appear on the other side of the
    // screen (x = windowWidth).
    if (x <= -90) {
      x = windowWidth;
    }
  }

  // If the key 'd' is pressed and the user enters a number for the speed input,
  // the car will move right by that certain number. Input cannot be smaller than
  // 0 or greater than 12. If nothing is entered when prompted, the car will not move.
  if (isMovingRight) {
    if (carSpeedInput >= 0 && carSpeedInput <= 12) {
      x += float(carSpeedInput);
    }

    // This is a parameter so that the car does not leave the scene -- when
    // x equals windowWidth or higher, the car will appear on the other side of the
    // screen (x = -90).
    if (x >= windowWidth) {
      x = -90;
    }
  }
}

// This function draws the landscape of the scene: sun and clouds.
function landscapePortion() {
  // Sun.
  fill(184, 134, 11);
  ellipse(0, 0, 200, 200);

  // The colour and variable for each cloud position is set in this section.
  fill(255);
  cloudPosition = 30;

  // This section creates five clouds with the position changing each time so
  // that the clouds are spread out.
  for (let cloud = 0; cloud < 5; cloud++) {
    ellipse(cloudPosition, 80, 150, 100);
    ellipse(cloudPosition+70, 80, 90, 70);
    ellipse(cloudPosition-70, 80, 90, 70);
    cloudPosition += 300
  }
}

// This functions draws the city portion of the scene: tower, building with
// the arc, the black buildings that span accross the screen, the
// background refresher, and the pavement.
function cityPortion() {
  // Tower -- tallest building.
  fill(49, 79, 79);
  rect(480, 70, 40, 644);
  fill(random(0, 255), random(0, 255), random(0, 255))
  rect(447, 122, 105, 10)
  fill(49, 79, 79)
  rect(490, 30, 20, 40)

  // Background refresher -- This reason why this section exists is so that
  // the car does not leave marks as it moves In other words, this section covers
  // up the marks of the car while not detracting from the design of the city scene.
  fill(49, 79, 79);
  rect(-2, 585, 2000, 100);

  //The black buildings.
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

  //Building with the arc.
  fill(random(0, 255), random(0, 255), random(0, 255))
  arc(630, 590, 200, 200, 0.5, PI+QUARTER_PI, OPEN);
  fill(49, 79, 79);
  rect(463, 600, 300, 644);

  //Surface/Pavement.
  fill(184, 134, 11);
  rect(-2, 643, windowWidth, windowHeight);
}

// This function incorporates the user input for colour in order to create
// the body of the car. The x-position of the car is based on the global variable
// 'x', which changes based on the function controlling the movement of the car.
function drawCar(x) {
  // Wheels of the Car.
  fill(128, 128, 128);
  ellipse(x+70, 630, 30);
  ellipse(x+20, 630, 30);

  // The car's default colour (before user input) is red.
  fill(255, 0, 0);

  // The variable 'carColorInput' is used in order to change the colour of the car
  // based on input from the user. If nothing or an invalid colour is entered when
  // prompted, the car will default to red.
  if (carColorInput === "blue" || carColorInput === "Blue") {
    fill(65, 105, 225);
  }
  else if (carColorInput === "green" || carColorInput === "Green") {
    fill(0, 128, 0);
  }
  else if (carColorInput === "flashy" || carColorInput === "Flashy") {
    fill(random(0, 255), random(0, 255), random(0, 255));
  }

  // Body of the car.
  rect(x, 600, 90, 20);
  rect(x, 585, 70, 20);

  // Headlight of the car.
  fill(184, 134, 11);
  ellipse(x+80, 608, 10);

  // Brakelight of the car.
  fill(153, 0, 0);
  rect(x, 603, 10, 10);
}
