/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', onPlayerGuess);
guessInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        onPlayerGuess()
    }
});



function onPlayerGuess() {
    let guess = parseInt(guessInput.value);

   // Validate
    if(isNaN(guess) || guess < min || guess > max){
        return setMessage(`Please enter a number between ${min} and ${max}`, 'red') 
    }

   // Check if won
   if(guess === winningNum){
    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = 'green';
    // Set message
    setMessage(`${winningNum} is correct, YOU WIN!`, 'green');
    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
   } else {
    // Wrong number
    guessesLeft -= 1;
    // Game Over - lost
    if(guessesLeft === 0){
    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again'; 
    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = 'red';
    // Set message
    setMessage(`Game Over! Sorry, you lost. The correct number was ${winningNum} `, 'red');

    } else {
    // Game continues - answer wrong
   
    // Change border color
    guessInput.style.borderColor = 'red';
    // Clear Input
    guessInput.value = '';
    // Tell user it is the wrong number
    if(guess > winningNum){
        setMessage(`${guess} is not correct, please guess a number lower than ${guess}, ${guessesLeft} guesses left`, 'red');
    } else {
        setMessage(`${guess} is not correct, please guess a number higher than ${guess} , ${guessesLeft} guesses left`, 'red');
    }
    }
   }
}

// Get winning number
function getRandomNum(min, max){
   return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}


