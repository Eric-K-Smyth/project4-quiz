//GIVEN I am taking a code quiz
//WHEN I click the start button
//THEN a timer starts and I am presented with a question
//WHEN I answer a question
//THEN I am presented with another question
//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0
//THEN the game is over
//WHEN the game is over
//THEN I can save my initials and my score

var timerElement = document.getElementById("timer-count");
var startButton = document.getElementById("start-button");
var questionTitle = document.getElementById("question-title");
var choicesContainer = document.getElementById("choices");

var timer;
var timerCount;

var currentQuestionIndex = 0;
var score = 0;

// Define the quiz questions, answer choices, and correct answers
var quizQuestions = [
  {
    question: "Commonly used data types do not include:",
    choices: ["strings", "alerts", "boolean", "numbers"],
    correctAnswer: 1 // Index of the correct answer choice
  },
  {
    question: "In which HTMl elements do we put in Javascript?",
    choices: ["<javascript>", "<scripted>", "<js>", "<script>"],
    correctAnswer: 3
  },
  {
    question: "How would we call a function named 'myFunction'?",
    choices: ["call myFunction", "myFunction call ()", "myFunction()", "Ring-ring hello?"],
    correctAnswer: 2 // Index of the correct answer choice
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    choices: ["=", "*", "+", "-"],
    correctAnswer: 0 // Index of the correct answer choice
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choices: ["Hey world;", "alert('Hello World');", "alert box hello world;", "print alert(hello world)"],
    correctAnswer: 1 // Index of the correct answer choice
  },

];

// Function to start the game and timer
function startGame() {
  timerCount = 75; // Set the initial value of the timer
  startButton.disabled = true; // Disable the start button once clicked
  startTimer(); // Start the timer
  displayQuestion(); // Display the first question
}

// Function to start the timer
function startTimer() {
  timer = setInterval(function () {
    timerCount--; // Decrement the timer count
    timerElement.textContent = timerCount; // Update the timer element with the new count

    if (timerCount <= 0) {
      clearInterval(timer); // Clear the interval when the timer reaches 0 or below
      endGame(); // End the game when the timer runs out
    }
  }, 1000); // Run the timer every 1 second (1000 milliseconds)
}

// Function to display a question and answer choices
function displayQuestion() {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionTitle.textContent = currentQuestion.question;
  
  // Clear previous choices
  choicesContainer.innerHTML = "";
  
  // Create answer choice buttons
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i];
    var choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.setAttribute("data-index", i);
    choiceButton.addEventListener("click", handleAnswer);
    choicesContainer.appendChild(choiceButton);
  }
}

// Function to handle the user's answer
function handleAnswer(event) {
  var selectedChoiceIndex = parseInt(event.target.getAttribute("data-index"));
  var currentQuestion = quizQuestions[currentQuestionIndex];
  
  if (selectedChoiceIndex === currentQuestion.correctAnswer) {
    // Correct answer
    score++;
  } else {
    // Incorrect answer
    timerCount -= 15; // Deduct 15 seconds from the timer
    if (timerCount < 0) {
      timerCount = 0; // Ensure the timer does not go below 0
    }
  }
  
  currentQuestionIndex++;
  
  if (currentQuestionIndex === quizQuestions.length) {
    // End the game if all questions have been answered
    endGame();
  } else {
    // Display the next question
    displayQuestion();
  }
}

// Function to end the game
function endGame() {
  clearInterval(timer); // Clear the interval
  // Hide question section and display end screen section
  document.getElementById("questions").classList.add("hide");
  document.getElementById("end-screen").classList.remove("hide");
  
  // Display the final score
  document.getElementById("final-score").textContent = score;

   // Add event listener to the submit button for saving initials and score
   var submitButton = document.getElementById("submit");
   submitButton.addEventListener("click", saveScore);
}
// Function to save initials and score
function saveScore(event) {
  event.preventDefault(); // Prevent form submission


  var initialsInput = document.getElementById("initials");
  var initials = initialsInput.value.trim();
  
  if (initials !== "") {
    // Create an object to store initials and score
    var scoreData = {
      initials: initials,
      score: score
    };
    
    // Retrieve existing high scores from localStorage
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    
    // Add the current scoreData to the high scores
    highScores.push(scoreData);
    
    // Sort the high scores based on the score in descending order
    highScores.sort(function (a, b) {
      return b.score - a.score;
    });
    
    // Keep only the top 5 high scores
    highScores = highScores.slice(0, 5);
    
    // Store the updated high scores in localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    
    // Redirect to the highscores.html page or perform any other action
    window.location.href = "highscores.html";
  }
}

function displayHighScores() {
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  var highScoresList = document.getElementById("high-scores-list");
  highScoresList.innerHTML = ""; // Clear any existing high score entries

  for (var i = 0; i < highScores.length; i++) {
    var highScoreEntry = document.createElement("li");
    highScoreEntry.textContent = highScores[i].initials + " - " + highScores[i].score;
    highScoresList.appendChild(highScoreEntry);
  }
}

// Call the displayHighScores function when the highscores.html page loads
window.addEventListener("load", displayHighScores);
// Add event listener to the start button
startButton.addEventListener("click", startGame);