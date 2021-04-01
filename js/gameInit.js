import { fetchQuestions } from './utils/quizData.js';
import { setAlert } from './utils/alert.js';
import { QuestionsPage } from './questionWindows/Constants.js';

//Game Initializer function
export const initializeGame = async () => {
  const initPage = document.querySelector('.init-presentation');
  const entryPage = document.querySelector('.entery-container');
  const playerName = document.querySelector('.game-input').value;

  if (playerName) {
    localStorage.setItem('player', playerName);
    //close entery page
    entryPage.classList.add('completed');

    //open init countdown page
    initPage.classList.remove('completed');

    //Fetch Initial Data
    const questions = await fetchQuestions();
    const { title, description, numberOfQuestions } = questions;

    if (title && description && numberOfQuestions) {
      localStorage.setItem('NumOfQuestions', numberOfQuestions);
      gameInit(title, description, 3);
    }
  } else {
    //If user does not enter his/her name and clicks start or enter, this message will be fired.
    setAlert(
      'We will be happy to have your name before starting the game...',
      'Name Error!',
      'danger'
    );
  }
};

/**
 * Title and Description is fetched from "https://proto.io/en/jobs/candidate-exercise/quiz.json"
 * and they are the quiz title and quiz description. This function attaches those data to countdown page
 * and also player name which will be get from localStorage.
 * @param {String} title - The title which will display when game starts
 * @param {String} description - The description which will display when game starts
 * @param {Number} countdown - The count down value to start game, default value is 3, game will start 3 seconds after initial title and description
 */

const gameInit = (
  title = 'Untitled',
  description = 'No Description',
  countdown = 3
) => {
  const title1 = document.getElementById('title-1');
  const title2 = document.getElementById('title-2');
  const enteryQuestionSection = document.querySelector('.question-section');
  const getReady = document.querySelector('.get-ready');
  const countDown = document.querySelector('.count-down');
  const playerName = document.querySelector('.player');
  const name = localStorage.player;

  playerName.innerText = `Hi, ${name}`;

  //Title is formed in two colors, for this reason, it has been splited and added to two different elements
  const titleArr = title.split(' ');
  const descArr = description.split('?');

  title1.innerText = `${titleArr[0]} ${titleArr[1]}`;
  title2.innerText = `${titleArr[2]} ${titleArr[3]}`;
  enteryQuestionSection.innerText = `${descArr[0]}?`;
  getReady.innerText = descArr[1];

  countDownFunc(countdown, countDown, QuestionsPage);
};

/**
 * This function manages the countdown process with the help of built-in setInterval function of JavaScript
 * @param {Number} countVal - Depends on the countdown value in gameInit function
 * @param {Object} targetElement - Target Element which countdown presented
 * @param {String} targetPage - After countdown process, url which player forwarded to, default is "/html/question_page.html"
 */
const countDownFunc = (countVal, targetElement, targetPage = QuestionsPage) => {
  countVal++;
  const count = setInterval(() => {
    countVal--;
    if (countVal === 0) {
      clearInterval(count);
      window.location.replace(targetPage);
    }

    targetElement.innerText = countVal;
  }, 1000);
};
