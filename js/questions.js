import { fetchQuestions, fetchResults } from './utils/quizData.js';
import { questionWindowGen } from './questionWindows/questionWindowGenerator.js';
import { highLight } from './utils/highLight.js';
import { setAlert } from './utils/alert.js';
import { generateMessage } from './utils/generateMessage.js';
import { clearLocalStorage } from './utils/clearLocalStoreage.js';
import { pointStatCalculator } from './utils/pointStatCalculator.js';
import { StatWin } from './statisticsWindow/statWin.js';
import { statDataSelector } from './utils/statDataSelector.js';
import { getQuestionById } from './utils/getQuestionById.js';
import { calculateTotalPoints } from './utils/calculateTotalPoints.js';

window.onload = async () => {
  //Add title to document with the name of player
  document.title = `${localStorage.player} | Board Games Quiz`;
  const targetSection = document.getElementById('root');

  const numberOfQuestions = localStorage.getItem('NumOfQuestions');

  //Checks if there are points of player at localStorage (if the user lefts quiz before complation)
  const playerPoints = localStorage.points
    ? JSON.parse(localStorage.points)
    : [];
  let currentQuestion = localStorage.currentQuestion
    ? localStorage.currentQuestion
    : 1;

  //In case of trying to enter questions page by passing initialization page, it will clear the storage and
  //redirect the user to start page
  if (!localStorage.player || !numberOfQuestions) {
    clearLocalStorage();
  }

  //This also does the same with the above condition but this time checks if the game was completed or not
  //if it is a completed game on the localStorage, it will clear the localStorage and redirect the player to start page
  if (
    localStorage.player &&
    parseInt(currentQuestion) >= parseInt(numberOfQuestions)
  ) {
    clearLocalStorage(true);
  }

  //Fetching question process will only take place here and after each Next Button Click
  //this function won't be called.
  const res = await fetchQuestions(parseInt(currentQuestion));
  let questions = getQuestionById(res, parseInt(currentQuestion));
  const totalPoints = calculateTotalPoints(res);

  //When player clicks to next, it will call getAnswerResult
  //This function is a prop of questionWindowGen (window generator component and gets data from the window generator component in every Next Button Click)
  const getAnswerResult = (data) => {
    const { point, correctAnswer, playerAnswerArray } = data;

    playerPoints.push({ question: currentQuestion, point });
    localStorage.setItem('points', JSON.stringify(playerPoints));

    //If point is not zero, it will be a truthy result (>0) and hence
    //the correct answer alert will be fired else it will fire the wrong answer alert
    if (point) {
      const message = generateMessage(localStorage.player);
      setAlert(message, 'Excellent');
      highLight(correctAnswer, 'correct');
    } else {
      const message = generateMessage(null, false);
      setAlert(message, 'Not Correct! Answer highlighted in Green!', 'danger');
      highLight(correctAnswer, 'correct');
      highLight(playerAnswerArray, 'wrong');
    }

    currentQuestion++;

    localStorage.setItem('currentQuestion', currentQuestion);
    //This will forward the user to next question after 4 seconds.
    //This can be converted to 3 seconds but giving message and redirecting to next question sync gave
    //better animation result.
    setTimeout(async () => {
      if (parseInt(currentQuestion) <= parseInt(numberOfQuestions)) {
        questions = getQuestionById(res, parseInt(currentQuestion));

        targetSection.innerHTML = '';
        const wind = questionWindowGen(questions, getAnswerResult);
        targetSection.appendChild(wind);
      } else {
        //When current question Id reaches to a value greater than total number of questions
        //this part will take place and present the result page to the player.
        try {
          const res = await fetchResults();
          const results = res.results;
          const statResults = pointStatCalculator(
            playerPoints,
            totalPoints,
            numberOfQuestions
          );

          if (results) {
            const statData = statDataSelector(results, statResults);
            const statWin = StatWin(statData, localStorage.player, statResults);
            targetSection.innerHTML = '';
            targetSection.classList.remove('expand');
            targetSection.appendChild(statWin);
          }
        } catch (error) {
          setAlert(
            'We are sorry, an unexpected server error occured',
            'Server Error!',
            'danger'
          );
          location.reload();
        }
      }
    }, 4000);
  };

  if (questions) {
    const wind = questionWindowGen(questions, getAnswerResult);
    targetSection.appendChild(wind);
  }
};
