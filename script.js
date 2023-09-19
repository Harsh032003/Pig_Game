"use strict";

//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current-s-0");
const current1El = document.getElementById("current-s-1");
const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

//starting values

let score, playing, currentScore, activePlayer;

const init = function () {
  score = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  diceEl.classList.add("hidden");

  playing = true;

  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove("player-winner");
  player1El.classList.remove("player-winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  document.querySelector("body").classList.remove("player-winner");
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current-s-${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //generating random
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //showing dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //checking for 1

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-s-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //Add current score to active player's score

    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player-winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      document.querySelector("body").classList.add("player-winner");
    } else {
      //switching player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  init();
});
