// City Scene V 2.0 (Updated with State Variables)
// By: William Ahiahonu
// Computer Science 30
// March 19th, 2018

// Extra for experts attempt (ones that are new to this version of the project):
// - Implemented the "rbga" concept for the background changes, the sun, the moon,
// the building windows and the stars.
// - Implemented the functions, Math.floor() and Math.random() to randomly load
// different background music every time the project is opened.
// - Implemented a "for item in array" loop for iterating through an array for the
// windows to be generated on the buildings. Also implemented the math concept of
// transformations in order to better fit the windows into the buildings.

// Global Variables set to be used later in the code.
let x, isMovingLeft, isMovingRight;
let carColorInput, carSpeedInput;
let music = ["Music/WestGrandBoulevard.mp3", "Music/LeadFoot.mp3",
"Music/JellyRoll.mp3", "Music/ErrolFlynns.mp3"];
let screenState;
let clouds = ["cloud 1", "cloud 2", "cloud 3", "cloud 4", "cloud 5", "cloud 6",
"cloud 7", "cloud 8"], cloudXPosition;
let cloudPushRate, cloudShiftRate, lastCloudPushShift, cloudArrayState, cloudFill;
let scenarioChange, scenarioState;
let windowMoonStarChange;

// Loads the music, the start button image, the title, the front page art and the
// intructions for the scene.
function preload() {
  // Math.floor() and Math.random() are used to randomly choose a song from the global
  // array, "music".
  backgroundMusic = loadSound(music[Math.floor(Math.random() * music.length)]);

  // All other assets are loaded and assigned to variables.
  proceedSign = loadImage("Images/ProceedSign.png");
  title = loadImage("Images/title.png");
  frontPageArt = loadImage("Images/frontpageart.png");
  instructions = loadImage("Images/instructions.png");
}

// This function sets up the window in which the scene will run, calls the function
// "playMusic" to play the background music and sets the beginning values for the
// variables that control the car's (technically the buildings behind the car)
// positioning, the switching between screens, the endless row of clouds, and the
// cycling through day and night (sun, moon, stars).
function setup() {
  createCanvas(windowWidth, windowHeight);
  isMovingLeft = false;
  isMovingRight = false;
  x = 25;
  screenState = 1;
  cloudXPosition = 25;
  cloudPushRate = 400;
  cloudShiftRate = 400;
  lastCloudPushShift = millis();
  cloudArrayState = 1;
  cloudFill = 255;
  scenarioState = 1;
  scenarioChange = 1;
  windowMoonStarChange = 1e-2;
  playMusic();
}

// This function plays the music for the scene.
function playMusic() {
  backgroundMusic.setVolume(0.5);
  backgroundMusic.loop();
}

// This function sets the background for the different screens in the scene.
function backgroundSetup() {
  // These variables hold the rgba values that mix together to create the
  // background in the actual scene (after front page and intructions). The
  // variable, "scenarioChange" controls when the background changes from day
  // to night and vice versa and the change for the variable actually occurs in
  // the function, changeScenario().
  goldColor = color("rgba(255, 198, 0, " + scenarioChange + ")");
  blueColor = color("rgba(0, 102, 153, " + scenarioChange + ")");

  // Background is black for the front page.
  background(0);

  // When the project is on the city scene, the background that will change from
  // day to night will be set.
  if (screenState === 3) {
    sceneBackground = lerpColor(goldColor, blueColor, 0.80);
    background(sceneBackground);
  }
}

// After everthing is set, this function calls the other functions in order
// to draw the entire scene.
function draw() {
  // Background is set to black and changes later in the city scene based
  // on the activity on the "a" and "d" keys. noStroke() is called in order to
  // make the scene look nicer (especically the clouds).
  backgroundSetup();
  noStroke();

  // When the project is ran, the start screen is activated.
  if (screenState === 1) {
    displayStartScreen();
  }

  // When the proceed button is pressed, the instructions image is loaded. The
  // cursor is also hidden so it doesn't take away from the scene aesthetics.
  else if (screenState === 2) {
    noCursor();
    instructionsPage();
  }

  // When the p (play) button is pressed as prompted, the entire scene is now drawn.
  // The cursor is hidden for the same reason as above.
  else if (screenState === 3) {
    noCursor();
    landscapePortion();
    cityPortion();
    drawCar();
    moveScene();
    changeScenario();
  }
}

// This function activates the user input for car colour and speed and also
// enables the car (technically buildings) to move via keys 'a' and 'd'
//('w' and 's' not used since it would be unrealistic for a car or buildings to 'fly').
function keyPressed() {

  // 'p' button is enabled when approriate and the screen is changed once it is pressed.
  if (screenState === 2) {
    if (key === "p" || key === "P") {
      screenState = 3;
    }
  }

  // Buttons necessary for the scene are enabled when appropriate.
  if (screenState === 3) {
    // When key 'c' is pressed, the user is prompted to enter a colour for the car.
    if (key === "c" || key === "C") {
      carColorInput = prompt("Change the color of the car to red, blue, green or flashy (red is the default): ", "");
    }

    // When key 's' is pressed, the user is prompted to enter a number value for the car's
    // speed.
    else if (key === "s" || key === "S") {
      carSpeedInput = prompt("Change the speed of the car (Min: 0, Max: 8): ", "");
    }

    // if key 'd' is pressed, the buildings move left, giving the impression that the
    // car moves right.
    if (key === "d" || key === "D") {
      isMovingLeft = true;

      // If the speed input entered is a NaN value (Not a real Number), the car's (buildings')
      // ability to move left is disabled so that they do not not disappear.
      if (isNaN(int(carSpeedInput))) {
        isMovingLeft = false;
      }
    }

    // if key 'a' is pressed, the buildings move right, giving the impression that the
    // car moves left.
    else if (key === "a" || key === "A") {
      isMovingRight = true;

      // If the speed input entered is a NaN value (Not a real Number), the car's (buildings)
      // ability to move right is disabled so that they do not not disappear.
      if (isNaN(int(carSpeedInput))) {
        isMovingRight = false;
      }
    }
  }
}

// This function serves as a check to make sure that the car (buildings) is not moving a
// certain direction if a certain key is released.
function keyReleased() {
  if (screenState === 3) {
    // if key 'd' is released, the car (buildings) no longer moves left.
    if (key === "d" || key === "D") {
      isMovingLeft = false;
    }

    // if key 'a' is released, the car (buildings) no longer moves right.
    else if (key === "a" || key === "A") {
      isMovingRight = false;
    }
  }
}

// This function incorporates the user input for speed as well as the
// variables, 'isMovingLeft', 'isMovingRight' and 'x' in order to move the
// car (buildings) via changing 'x' by a certain amount. This function also
// incorporates the global array, "clouds", and adds on to this array from
// either side.
function moveScene() {
  // Process that occurs when isMovingLeft is true.
  if (isMovingLeft) {

    // If the clouds no longer are sufficient to cover each side of the screen,
    // two are added based on time.
    if (cloudArrayState === 1) {
      if (millis() > lastCloudPushShift + cloudPushRate) {
        clouds.push("another cloud", "another cloud");
        cloudArrayState = 2;
        lastCloudPushShift = millis();
      }
    }

    // This section cuts out one cloud for every two based on time so that not too
    // many clouds will be generated.
    if (cloudArrayState === 2) {
      if (millis() > lastCloudPushShift + cloudShiftRate) {
        clouds.shift();
        cloudArrayState = 1;
        lastCloudPushShift = millis();
      }
    }

    // The speed at which the car (buildings) moves is set based on carSpeedInput.
    if (carSpeedInput >= 0 && carSpeedInput <= 8) {
      x -= float(carSpeedInput);

      // The clouds move at a slower pace based on carSpeedInput in order to create
      // a more realistic city scene.
      cloudXPosition -= float(carSpeedInput) / 3;
    }

    // This is a parameter so that the car (buildings) does not leave the scene -- when
    // x equals -1263 or lower, the city will appear on the other side of the
    // screen (x = width).
    if (x <= -1263) {
      x = width;
    }
  }

  // Process that occurs when isMovingRight is true.
  if (isMovingRight) {
    // If the clouds no longer are sufficient to cover each side of the screen,
    // one is added based on time. Also, when isMovingRight is true, the position
    // of the clouds array is shifted over as well to ensure the clouds are everlasting.
    // Futhermore, no section was added to cut of clouds based on time since the clouds
    // would end up disappearing eventually as result of different direction (hence only
    // one cloud is added, not two).
    if (millis() > lastCloudPushShift + cloudPushRate) {
      cloudXPosition -= 300;
      clouds.push("another cloud");
      lastCloudPushShift = millis();
    }

    // The speed at which the car (buildings) moves is set based on carSpeedInput.
    if (carSpeedInput >= 0 && carSpeedInput <= 8) {
      x += float(carSpeedInput);

      // The clouds move at a slower pace based on carSpeedInput in order to create
      // a more realistic city scene.
      cloudXPosition += float(carSpeedInput) / 3;
    }

    // This is a parameter so that the car (buildings) does not leave the scene -- when
    // x equals width or higher, the city will appear on the other side of the
    // screen (x = -1263).
    if (x >= width) {
      x = -1263;
    }
  }
}

function displayStartScreen() {
  // The parameters and size of the start screen button are set so the is pressed
  // in a realistic area.
  let buttonWidth = 300;
  let buttonHeight = 200;
  let leftSide = width/2 - buttonWidth/2;
  let topSide = height/2 - buttonHeight/2;
  let rightSide = leftSide + buttonWidth;
  let bottomSide = topSide + buttonHeight;

  // Images are set to be centered.
  imageMode(CENTER);

  // The front page art, the title, the button, and the proceed image within the
  // are drawn.
  image(frontPageArt, width/2, 420, width/0.9, 700);
  image(title, width/2, 90, width, 180);
  rect(leftSide, topSide, buttonWidth, buttonHeight);
  image(proceedSign, width/2, height/2, 100, 100);

  // The button is set to have a slighty transparent appearance using rgba
  //(when mouse is not hovering over it).
  fill('rgba(153, 0, 76, 0.8)');

  // Ensures that anywhere in the button area must be pressed in order to proceed.
  if (mouseX >= leftSide && mouseX <= rightSide && mouseY >= topSide && mouseY <= bottomSide) {

    // The button is set to have a slighty transparent appearance using rgba
    // (when mouse is hovering over it).
    fill('rgba(204, 0, 102, 0.8)');

    // If mouse is pressed, the user is brought to the intructions page.
    if (mouseIsPressed) {
      screenState = 2;
    }
  }
}

// Draws the intructions page to the canvas.
function instructionsPage() {
  imageMode(CORNER);
  image(instructions, 0, 0, width, height);
}

// This function draws the landscape of the scene: sun, moon and clouds.
function landscapePortion() {
  // The sun is drawn and changes based on the time of day in the scene with
  //scenarioChange and rgba.
  fill("rgba(184, 134, 11, " + scenarioChange + ")");
  ellipse(0, 0, 200, 200);

  // The moon is drawn and changes based on the time of day in the scene with
  // windowMoonStarChange (controls appearance of building windows, the moon
  // and the stars) and rgba.
  fill("rgba(255, 255, 255, " + windowMoonStarChange + ")");
  ellipse(0, 0, 200, 200);

  // The colour and variable for each cloud position is set in this section.
  // The fill is set on a variable that changes the colour of the clouds based
  // on the day/night cycle and the cloud position is based on the global variable,
  // cloudXPosition.
  fill(cloudFill);
  cloudPosition = cloudXPosition;

  // This section creates clouds accross the screen with the position changing each
  // time so that the clouds are spread out (based on the global clouds array).
  for (let cloud = 0; cloud < clouds.length; cloud++) {
    ellipse(cloudPosition+70, 80, 90, 70);
    ellipse(cloudPosition-70, 80, 90, 70);
    ellipse(cloudPosition, 80, 150, 100);
    cloudPosition += 300;
  }

  // The stars change based on the time of day in the scene with
  // windowMoonStarChange (controls appearance of building windows, the moon
  // and the stars) and rgba.
  fill("rgba(255, 255, 255, " + windowMoonStarChange + ")");

  // The stars are drawn using a nested for loop in order to spread them throughout
  // the screen. The positions are set to random and loop continuously just to add a
  // little sparkle :-)
  for (let starX = random(0, 200); starX < width; starX += random(0, 200)) {
    for (let starY = random(0, 200); starY < height; starY += random(0, 200)) {
      ellipse(starX, starY, 5);
    }
  }
}

// This function draws the city portion of the scene: tower, building with
// the arc, the black buildings, the windows for the buildings and the pavement.
function cityPortion() {
  // Array used to build the windows for each building according to the each building's conditionals
  // or make up.
  let buildingConditionals = [[0, 75, 520], [82, 157, 400], [164, 239, 300], [246, 321, 200], [328, 403, 280],
  [410, 485, 383], [492, 567, 310], [574, 649, 410], [656, 731, 210], [738, 813, 320], [820, 895, 511],
  [902, 977, 423], [984, 1059, 340], [1066, 1141, 321], [1148, 1223, 550]];

  // Tower -- tallest building.
  fill(49, 79, 79);
  rect(x+455, 70, 40, 644);
  fill(49, 79, 79);
  rect(x+465, 30, 20, 40);

  // Rotating center peice on tower.
  push();
  translate(x+475, 150);
  rotate(millis() / 1000);
  fill(218, 165, 32);
  rectMode(CENTER);
  rect(0, 0, 200, 15);
  pop();
  push();
  fill(49, 79, 79);
  ellipseMode(CENTER);
  ellipse(x+475, 150, 40);
  pop();

  // The black buildings.
  fill(0);
  rect(x, 520, 70, 644);
  rect(x+82, 400, 70, 644);
  rect(x+164, 300, 70, 644);
  rect(x+246, 200, 70, 644);
  rect(x+328, 280, 70, 644);
  rect(x+410, 383, 70, 644);
  rect(x+492, 310, 70, 644);
  rect(x+574, 410, 70, 644);
  rect(x+656, 210, 70, 644);
  rect(x+738, 320, 70, 644);
  rect(x+820, 511, 70, 644);
  rect(x+902, 423, 70, 644);
  rect(x+984, 340, 70, 644);
  rect(x+1066, 321, 70, 644);
  rect(x+1148, 550, 70, 644);

  // Windows for the black buildings (based on the time of day in the scene with
  // windowMoonStarChange (controls appearance of building windows, the moon
  // and the stars) and rgba.)
  fill("rgba(255, 255, 153, " + windowMoonStarChange + ")");

  // For each set of conditionals in the array, buildingConditionals, windows are
  // drawn and tranformed to fit into each unique building.
  for (let item of buildingConditionals) {
    for (let buildingWindowX = item[0] + 5; buildingWindowX < item[1] - 5; buildingWindowX += 22.3) {
      for (let buildingWindowY = item[2] + 5; buildingWindowY < 620; buildingWindowY += 20) {

        // x is added to the positions of the windows so that they do not stay in
        // one place as the rest of the scene moves.
        rect(x + buildingWindowX, buildingWindowY, 15, 15);
      }
    }
  }

  // Building with the arc.
  fill(153, 76, 0);
  arc(x+605, 590, 200, 200, 0.5, PI+QUARTER_PI, OPEN);
  fill(49, 79, 79);
  rect(x+438, 600, 300, 644);

  // Surface/Pavement.
  fill(184, 134, 11);
  rect(-2, 643, width, height);
}

// This function incorporates the user input for colour in order to create
// the body of the car. Technicially, the car itself does not move and it's
// the rest of the scene that is actually moving.
function drawCar() {
  // Wheels of the Car.
  fill(128, 128, 128);
  ellipse(windowWidth/2-20, 630, 30);
  ellipse(windowWidth/2-70, 630, 30);

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
  rect(windowWidth/2-90, 600, 90, 20);
  rect(windowWidth/2-90, 585, 70, 20);

  // Headlight of the car.
  fill(184, 134, 11);
  ellipse(windowWidth/2-10, 608, 10);

  // Brakelight of the car.
  fill(153, 0, 0);
  rect(windowWidth/2-90, 603, 10, 10);
}

// This function controls when the scene changes from day to night and vice versa.
function changeScenario() {
  // When scenarioChange is less than this value, it is night time and the
  // scenarioState changes to indicate that the scene should change to
  // day.
  if (scenarioChange < 1e-3) {
    scenarioState = 2;
  }

  // When scenarioChange is greater than this value, it is day time and the
  // scenarioState changes to indicate that the scene should change
  // to night.
  if (scenarioChange > 1) {
    scenarioState = 1;
  }

  // Everything needed to make the scenario actually change is based on whether
  // the 'a' or 'd' key is pressed and the direction in which they change is based
  // on whether it is day or night.
  if ((isMovingLeft || isMovingRight) && scenarioState === 1) {
    // All changes are based on carSpeedInput. The slower the car (buildings), the slower
    // the scene change and vice versa.
    scenarioChange -= ((float(carSpeedInput) / 2) + float(carSpeedInput)) * .6e-4;
    windowMoonStarChange += ((float(carSpeedInput) / 2e4) + float(carSpeedInput)) * .6e-4;
    cloudFill -= 0.025125 * carSpeedInput;
  }

  // Everything needed to make the scenario actually change is based on whether
  // the 'a' or 'd' key is pressed and the direction in which they change is based
  // on whether it is day or night.
  if ((isMovingLeft || isMovingRight) && scenarioState === 2) {
    // All changes are based on carSpeedInput. The slower the car (buildings), the slower
    // the scene change and vice versa.
    scenarioChange += ((float(carSpeedInput) / 2) + float(carSpeedInput)) * .6e-4;
    windowMoonStarChange -= ((float(carSpeedInput) / 2e4) + float(carSpeedInput)) * .6e-4;
    cloudFill += 0.025125 * carSpeedInput;
  }
}
