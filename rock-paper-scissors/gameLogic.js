const choices = ["rock", "paper", "scissors"];

// COMPUTER
// Randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’
// There is no in-built 'sample' method in Javascript.
// SOURCE: https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
let getComputerChoice = () =>
  choices[Math.floor(Math.random() * choices.length)];

// PLAYER
// Prompt the user to select a choice
getPlayerChoice = function (choices) {
  return prompt(`Please choose 1 from: ${choices}`);
};

// PLAYING
// Determine who wins
// Rock beats Scissors
// Paper beats Rock
// Scissors beats Paper

playRound = function (computerChoice, playerChoice) {
  // prepare data for comparison
  let playerChoiceClean = playerChoice.toLowerCase();

  // Determine outcome
  if (computerChoice === playerChoiceClean) {
    // A draw
    return ["draw", "This is a draw, try again"];
  } else if (
    (computerChoice === "rock" && playerChoiceClean === "scissors") ||
    (computerChoice === "paper" && playerChoiceClean == "rock") ||
    (computerChoice === "scissors" && playerChoiceClean == "paper")
  ) {
    // COMPUTER wins
    return [
      "lose",
      `You lost - because '${computerChoice}' beats '${playerChoiceClean}'`,
    ];
  } else if (
    (playerChoiceClean === "rock" && computerChoice === "scissors") ||
    (playerChoiceClean === "paper" && computerChoice == "rock") ||
    (playerChoiceClean === "scissors" && computerChoice == "paper")
  ) {
    // PLAYER wins
    return [
      "win",
      `You won - because '${computerChoice}' beats '${playerChoiceClean}'`,
    ];
  } else {
    // Not a draw, nor a win, can only be due to incorrect spelling.
    return ["error", `You used the wrong spelling. Choose from ${choices}`];
  }
};

// PLAY GAME
// Play a number of rounds, determines who wins overall
// When a round results in a draw this constitutes a replay.

playGame = function (n_rounds) {
  // SET PARAMETERS
  let nth_round = 1;
  let score = 0;

  // CONTINUE playing rounds untill the correct number of prespecified rounds was played.
  while (nth_round <= n_rounds) {
    // console.log(`nth_round: ${nth_round}`);
    // Play a round and get the results
    let result = playRound(getComputerChoice(), getPlayerChoice(choices));
    let outcome = result[0]; // e.g., "win"
    let message = result[1]; // e.g, "You won - because Rock beats Scissors"

    // increment player's score in case of a win, in all other cases the score is kept constant
    if (outcome === "win") {
      score += 1;
    }

    // increment the number of rounds played in case there was a win or lose
    if (outcome === "win" || outcome === "lose") {
      nth_round += 1;
    } else {
      // In case of typos and draws another round will be played - this message should be displayed
      console.log(message);
    }
  }

  // Determine who won overall
  // Best-of ... principle where you need to win more than half the rounds to become the overall winner.
  if (score >= n_rounds / 2) {
    console.log(`You are the overall winner with ${score} / ${n_rounds} wins`);
  } else if (score < n_rounds / 2) {
    console.log(`You lost with ${score} / ${n_rounds} wins`);
  } else {
    console.log(`It's a draw!`);
  }
};
