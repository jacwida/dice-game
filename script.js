'use strict';

const diceEl = document.querySelector('.dice');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let playing, currentScore, scores, activePlayer;

function starting() {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
}

starting();
//switch player function
function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  console.log(activePlayer);
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
//roll dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    if (dice !== 1) {
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore += dice;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    document.querySelector(`#score--${activePlayer}`).textContent = scores[
      activePlayer
    ] += currentScore;
  }

  //if player is greater than finish
  if (scores[activePlayer] >= 100) {
    playing = false;

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');

    document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
      activePlayer + 1
    } Wins`;
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
  } else {
    //else switch player
    //switch player
    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  //initials.
  starting();
});
