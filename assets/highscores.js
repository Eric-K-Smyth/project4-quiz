// highscores.js

// Function to display high scores
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
  