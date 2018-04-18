// 2D Grid Based Game Assignment (Food Chaser)
// William Ahiahonu
// April 16, 2018

// Attempted Extra For Experts:
// Used the "try and catch" combination in order to ensure that the program
// does not crash when the yellow character hits the sides.
// Smaller Discovery: Learned new notation for decrementation; instead of
// x -= 1;, x --; (used for the timer).

// Known Errors or Shortcomings
// Yellow Character moves off screen in the north or south direction.
// Was not quite able to figure out how to keep score based on the locations
// of the yellow and blue characters.

// All global variables are created and used later in the code.
let screenState;
let backgroundMusic, proceedSign, title, instructions, gameOverImage;
let rows = 40, cols = 40;
let gameGrid;
let cellSize;
let directionState;
let xPositionChange = 0, yPositionChange = 0;
let foodXPositionChange = 0, foodYPositionChange = 0;
let foodSpawnerArray = [1, 3, 4, 6, 7, 9, 10, 2, 5], foodSpawner;
let foodSpawnerStateArray = [1, 2, 3, 4], foodSpawnerState;
let foodShiftArray = [1, 2];
let timer;

// Preloading all the required assets (images and music).
function preload() {
  // All assets are loaded and assigned to variables.
  backgroundMusic = loadSound("music/bangbangboogaloo.mp3");
  proceedSign = loadImage("assets/proceedsign.png");
  title = loadImage("assets/title.png");
  instructions = loadImage("assets/instructions.png");
  gameOverImage = loadImage("assets/gameover.png");
}

// Sets up the canvas and begins the music; set ups the beginning state of the
//screen, the size of each cell on the grid, the grid itself, the initial
// directionState of the yellow character, the inital state of the foodSpawner
//and foodSpawnerState and the timer.
function setup() {
  createCanvas(windowWidth, windowHeight);
  screenState = 1;
  cellSize = width / cols;
  gameGrid = setupGrid(cols, rows);
  directionState = "disabled";
  foodSpawner = foodSpawnerArray[Math.floor(Math.random() * foodSpawnerArray.length)];
  foodSpawnerState = 1;
  playMusic();
  timer = 30;
}

// This function plays the music for the scene.
function playMusic() {
  backgroundMusic.setVolume(1);
  backgroundMusic.loop();
}

// Displays all the aspects of the game.
function draw() {
  // Background set to black.
  background(0);
  // noStroke() in order to beautify the scene.
  noStroke();

  // When the screen state is 1, the game's front intro page is revealed.
  if (screenState === 1) {
    displayStartScreen();
  }

  // When the screen state is 2, the actually game is ran.
  else if (screenState === 2) {
    // Game grid displayed.
    displayGrid();
    // Timer activated.
    gameTimer();
    try {
      // If possible, the yellow and blue characters are activated to move.
      moveCharacterAndFood();
      try {
        // If possible, the yellow and blue characters are activated to move.
        moveCharacterAndFood();
      }
      // If the yellow character hits the left side of the screen, its direction
      // is switched to the opposite (east or right). Also, the position of the
      // blue character is changed randomly to ensure more difficulty.
      catch (changeDirection) {
        directionState = "east";
        foodYPositionChange -= foodShiftArray[Math.floor(Math.random() * foodShiftArray.length)];
      }
    }
    // If the yellow character hits the right side of the screen, its direction
    // is switched to the opposite (wesr or left). Also, the position of the
    // blue character is changed randomly to ensure more difficulty.
    // moveCharacterAndFood() is called once more in order to ensure that the yellow
    // character does not get stuck on one of the edges.
    catch (changeDirection) {
      directionState = "west";
      foodYPositionChange += foodShiftArray[Math.floor(Math.random() * foodShiftArray.length)];
      moveCharacterAndFood();
    }
  }

  // When the screen state is 3, the gameOverScreen is activated and occurs when
  // time runs out.
  else if (screenState === 3) {
    gameOverScreen();
  }
}

// Creating the game's front intro page.
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
  image(title, width/2, 90, width, 300);
  image(instructions, width/2, 570, width, 200);
  rect(leftSide, topSide, buttonWidth, buttonHeight);
  image(proceedSign, width/2, height/2, 100, 100);

  // The button is set to have a slightly darker blue appearance.
  //(when mouse is not hovering over it).
  fill(30, 144, 255);

  // Ensures that anywhere in the button area must be pressed in order to proceed.
  if (mouseX >= leftSide && mouseX <= rightSide && mouseY >= topSide && mouseY <= bottomSide) {

    // The button is set to have a slightly lighter blue appearance.
    //(when mouse is hovering over it).
    fill(0, 191, 255);

    // If mouse is pressed, the user is brought to the intructions page.
    if (mouseIsPressed) {
      screenState = 2;
    }
  }
}

// Displaying the game grid that is behind the scenes.
function displayGrid() {
  // The program searches through the entire length of colomns and rows.
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {

      // If a certain location (or cell) is specified to be 0, it will be
      // coloured in black.
      if (gameGrid[x][y] === 0) {
        fill(0);
      }
      // If a certain location (or cell) is specified to be 1, it will be
      // coloured in gold (yellow character).
      else if (gameGrid[x][y] === 1) {
        fill(218, 165, 32);
      }
      // If a certain location (or cell) is specified otherwise, it will be
      // coloured in blue (blue character).
      else {
        fill(30, 144, 255);
      }
      // A rectangle is made, which serves as a cell, and will be coloured in
      // based on the conditionals above.
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

// Allows functionality for WASD.
function keyPressed() {
  // If the screen state is 2, WASD is activated.
  if (screenState === 2) {
    // If the key pressed is "w", the directionState is set to "north" meaning
    // move up the screen (yellow character).
    // The variables responsible for the movement of the blue character are set
    // to change random everytime "w", "a", "s" or "d" pressed. This is based on
    // Arrays assigned to global variables at the beginning of the code.
    if (key === "w" || key === "W") {
      directionState = "north";
      foodSpawner = foodSpawnerArray[Math.floor(Math.random() * foodSpawnerArray.length)];
      foodSpawnerState = foodSpawnerStateArray[Math.floor(Math.random() * foodSpawnerArray.length)];
    }
    // If the key pressed is "s", the directionState is set to "south" meaning
    // move down the screen (yellow character).
    if (key === "s" || key === "S") {
      directionState = "south";
      foodSpawner = foodSpawnerArray[Math.floor(Math.random() * foodSpawnerArray.length)];
      foodSpawnerState = foodSpawnerStateArray[Math.floor(Math.random() * foodSpawnerArray.length)];
    }
    // If the key pressed is "a", the directionState is set to "west" meaning
    // move left accross the screen (yellow character).
    if (key === "a" || key === "A") {
      directionState = "west";
      foodSpawner = foodSpawnerArray[Math.floor(Math.random() * foodSpawnerArray.length)];
      foodSpawnerState = foodSpawnerStateArray[Math.floor(Math.random() * foodSpawnerArray.length)];
    }
    // If the key pressed is "d", the directionState is set to "east" meaning
    // move right accross the screen (yellow character).
    if (key === "d" || key === "D") {
      directionState = "east";
      foodSpawner = foodSpawnerArray[Math.floor(Math.random() * foodSpawnerArray.length)];
      foodSpawnerState = foodSpawnerStateArray[Math.floor(Math.random() * foodSpawnerArray.length)];
    }
  }

  // If the screen state is 3 (game over screen) the button to restart the game
  // is activated. When "r" is pressed, the program backtracks back to
  // screenState 2, where the actually game occurs.
  if (screenState === 3) {
    if (key === "r" || key === "R") {
      screenState = 2;
    }
  }
}

// Moving the yellow character and its food (blue character).
function moveCharacterAndFood() {
  // The game runs at a slightly slower pace than the default frameCount
  // in order to ensure realistic functionality.
  if (frameCount % 4 === 0) {

    // If directionState is "north", the yellow character moves up by one.
    // Note: y -= 1 means up the screen based on y-axis directions.
    if (directionState === "north") {
      yPositionChange -= 1;

      // If foodSpawnerState is 1, the x and y position of the blue character
      // changes randomly based on the randomized variable, foodSpawner.
      if (foodSpawnerState === 1) {
        foodXPositionChange = foodSpawner;
        foodYPositionChange = foodSpawner;
      }
      // If foodSpawnerState is 2, the x and y position of the blue character
      // changes randomly based on the randomized variable, foodSpawner.
      else if (foodSpawnerState === 2) {
        foodXPositionChange = -foodSpawner;
        foodYPositionChange = -foodSpawner;
      }
      // If foodSpawnerState is 3, the x and y position of the blue character
      // changes randomly based on the randomized variable, foodSpawner.
      else if (foodSpawnerState === 3) {
        foodXPositionChange = -foodSpawner;
        foodYPositionChange = foodSpawner;
      }
      // If foodSpawnerState is 4, the x and y position of the blue character
      // changes randomly based on the randomized variable, foodSpawner.
      else if (foodSpawnerState === 4){
        foodXPositionChange = foodSpawner;
        foodYPositionChange = -foodSpawner;
      }
      // gameGrid resets to show the yellow character move up one.
      gameGrid = setupGrid(cols, rows);
    }

    // If directionState is "south", the yellow character moves down by one.
    // Note: y += 1 means down the screen based on y-axis directions.
    // Everyhting else in this if statement is the same as the previous one,
    // except with respect to the direction south.
    if (directionState === "south") {
      yPositionChange += 1;

      if (foodSpawnerState === 1) {
        foodXPositionChange = foodSpawner;
        foodYPositionChange = foodSpawner;
      }

      else if (foodSpawnerState === 2) {
        foodXPositionChange = -foodSpawner;
        foodYPositionChange = -foodSpawner;
      }

      else if (foodSpawnerState === 3) {
        foodXPositionChange = -foodSpawner;
        foodYPositionChange = foodSpawner;
      }

      else if (foodSpawnerState === 4){
        foodXPositionChange = foodSpawner;
        foodYPositionChange = -foodSpawner;
      }
      gameGrid = setupGrid(cols, rows);
    }

    // If directionState is "west", the yellow character moves left by one.
    // Everyhting else in this if statement is the same as the previous one,
    // except with respect to the direction south.
    if (directionState === "west") {
      xPositionChange -= 1;

      if (foodSpawnerState === 1) {
        foodXPositionChange = foodSpawner;
        foodYPositionChange = foodSpawner;
      }

      else if (foodSpawnerState === 2) {
        foodXPositionChange = -foodSpawner;
        foodYPositionChange = -foodSpawner;
      }

      else if (foodSpawnerState === 3) {
        foodXPositionChange = -foodSpawner;
        foodYPositionChange = foodSpawner;
      }

      else if (foodSpawnerState === 4){
        foodXPositionChange = foodSpawner;
        foodYPositionChange = -foodSpawner;
      }
      gameGrid = setupGrid(cols, rows);
    }

    // If directionState is "east", the yellow character moves right by one.
    // Everyhting else in this if statement is the same as the previous one,
    // except with respect to the direction south.
    if (directionState === "east") {
      xPositionChange += 1;

      if (foodSpawnerState === 1) {
        foodXPositionChange = foodSpawner;
        foodYPositionChange = foodSpawner;
      }

      else if (foodSpawnerState === 2) {
        foodXPositionChange = -foodSpawner;
        foodYPositionChange = -foodSpawner;
      }

      else if (foodSpawnerState === 3) {
        foodXPositionChange = -foodSpawner;
        foodYPositionChange = foodSpawner;
      }

      else if (foodSpawnerState === 4){
        foodXPositionChange = foodSpawner;
        foodYPositionChange = -foodSpawner;
      }
      gameGrid = setupGrid(cols, rows);
    }
  }
}

// The actually grid is created and set to be displayed in the function,
// displayGrid().
function setupGrid(cols, rows) {
  // Empty grid is created;
  let newGrid = [];

  // Initial positions of the yellow and blue characters are set and adapted
  // to work with the format of the cells on the grid, using floor().
  let characterXCoord = floor(100 / cellSize);
  let characterYCoord = floor(100 / cellSize);
  let foodXCoord = floor(width/2 / cellSize);
  let foodYCoord = floor(height/2 / cellSize);

  // Columns and rows are created by pushing a 0 to each section, meaning
  // coloured in with black.
  for (let x = 0; x < cols; x++) {
    newGrid.push([]);
    for (let y = 0; y < rows; y++) {
      newGrid[x].push(0);
    }
  }

  // Yellow and blue characters are displayed.
  newGrid[characterXCoord + xPositionChange][characterYCoord + yPositionChange] = 1;
  newGrid[foodXCoord + foodXPositionChange][foodYCoord + foodYPositionChange] = 2;

  // Grid is filled in with all the add ons by returning all changes.
  return newGrid;
}

// Timer for the game (Top Left Corner).
function gameTimer() {
  // Size of display is set as well as the colour.
  textSize(15);
  fill(255);

  // The value of timer is concatenated to text reading: "Time Left".
  // The position of the timer is also defined.
  text("Time Left: " + timer, 0, 30);

  // Time ticks down from 30 seconds based on frame count. Technically, in
  // order to obtain a true second, frameCount % 50 === 0 should actually be
  // frameCount % 60 === 0, but because the clock seemed to lag for longer than
  // a second when tested, it has been set to be slightly faster.
  if (frameCount % 50 === 0 && timer > 0) {
    // Time ticks down.
    timer --;
  }
  // When the timer is at 0, the game of screen is called on the timer resets to
  // its original value of 30 seconds.
  if (timer === 0) {
    screenState = 3;
    timer = 30;
  }
}

// Game over screen.
function gameOverScreen() {
  // The game over screen image is displayed when this function is called.
  imageMode(CORNER);
  image(gameOverImage, 0, 0, width, height);
}
