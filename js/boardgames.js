import { initializeGame } from './gameInit.js';
import { QuestionsPage } from './questionWindows/Constants.js';

/**
 * This is used at index.html to initialize functions for the start page and ready to start page (countdown page)
 */
window.onload = () => {
  //Check if player has a not completed game from player and q_Id in localStorage
  //If s/he has, forward him/her to the questions page and start game from the last question that s/he left the game
  //Note: In completion of game, clear localStorage
  const playerName = localStorage.player;
  const currentQuestion = localStorage.currentQuestion;
  const numOfQuestions = localStorage.getItem('NumOfQuestions');
  const btn = document.querySelector('.game-button');
  const form = document.querySelector('.entery-form');

  //if it is a saved player, we do not need to start him/her from the inital page and forwards him/her to
  //the quiz and starts the quiz from the last question s/he left.
  if (playerName && numOfQuestions) {
    btn.setAttribute('disable', true);
    //if user completed the quiz and left without pressing restart button, this clears the points and sets the currentQuestion to 1
    //User will be redirected to the questions page without asking name entry.
    if (parseInt(currentQuestion) >= parseInt(numOfQuestions)) {
      localStorage.setItem('currentQuestion', 1);
      localStorage.removeItem('points');
    }

    window.location.replace(QuestionsPage);
  }

  //Get Player Name
  btn.addEventListener('click', initializeGame);

  //On Enter press, this will initialize the game.
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    initializeGame();
  });
};
