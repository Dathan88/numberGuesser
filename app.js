/* 
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if they loose
- Let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  // Game over - won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN`);
  } else {
    guessesLeft -= 1;

    // Check if lost
    // Game over - lost
    if (guessesLeft === 0) {
      gameOver(
        false,
        `Game Over, you lost. The correct number was ${winningNum}`
      );
    } else {
      // Game continues - answer wrong
      // Change border color
      guessInput.style.borderColor = "red";

      // Clear input
      guessInput.value = "";

      // Tell user they chose wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play Again?
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

//Get winning number
function getRandomNum(min, max) {
  let randomNum = Math.floor(Math.random()*(max - min + 1) + min);
  console.log(randomNum);
  return randomNum;
  
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
