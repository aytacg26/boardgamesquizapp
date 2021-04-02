import { fetchQuestions, fetchResults } from './utils/quizData.js';
import { questionWindowGen } from './questionWindows/questionWindowGenerator.js';
import { highLight } from './utils/highLight.js';
import { setAlert } from './utils/alert.js';
import { generateMessage } from './utils/generateMessage.js';
import { clearLocalStorage } from './utils/clearLocalStoreage.js';
import { getQuestionById } from './utils/getQuestionById.js';

/**
 * @TODO : Add lazy loading for StatWin, statDataSelector, calculateTotalPoints and pointStatCalculator functions,
 * they will be required after 8th question, hence for async lateness, in 7th question they must be imported and ready to use.
 *
 * @TODO : Add PWA to the app
 *
 *
 */

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
  const allQuestions = await fetchQuestions(parseInt(currentQuestion));
  let questions = getQuestionById(allQuestions, parseInt(currentQuestion));

  //When player clicks to next, it will call getAnswerResult
  //This function is a prop of questionWindowGen (window generator component and gets data from the window generator component in every Next Button Click)
  const getAnswerResult = (data) => {
    const { point, correctAnswer, playerAnswerArray } = data;
    const correctSound = document.querySelector('#correctSound');
    const wrongSound = document.querySelector('#wrongSound');
    const applause = document.querySelector('#applause');
    const failure = document.querySelector('#failure');
    playerPoints.push({ question: currentQuestion, point });
    localStorage.setItem('points', JSON.stringify(playerPoints));

    //If point is not zero, it will be a truthy result (>0) and hence
    //the correct answer alert will be fired else it will fire the wrong answer alert
    if (point) {
      const message = generateMessage(localStorage.player);
      setAlert(message, 'Excellent');
      highLight(correctAnswer, 'correct');
      correctSound.play();
    } else {
      const message = generateMessage(null, false);
      setAlert(message, 'Not Correct! Answer highlighted in Green!', 'danger');
      highLight(correctAnswer, 'correct');
      highLight(playerAnswerArray, 'wrong');
      wrongSound.play();
    }

    currentQuestion++;

    localStorage.setItem('currentQuestion', currentQuestion);
    //This will forward the user to next question after 4 seconds.
    //This can be converted to 3 seconds but giving message and redirecting to next question sync gave
    //better animation result.
    setTimeout(async () => {
      if (parseInt(currentQuestion) <= parseInt(numberOfQuestions)) {
        questions = getQuestionById(allQuestions, parseInt(currentQuestion));

        targetSection.innerHTML = '';
        const wind = questionWindowGen(questions, getAnswerResult);
        targetSection.appendChild(wind);
      } else {
        //When current question Id reaches to a value greater than total number of questions
        //this part will take place and present the result page to the player.
        try {
          //lazy loading added for Results Window Functions
          import('./statisticsWindow/resultFunctions.js').then(
            async (module) => {
              const {
                calculateTotalPoints,
                pointStatCalculator,
                statDataSelector,
                StatWin,
              } = module.default;

              const res = await fetchResults();
              const results = res.results;
              const totalPoints = calculateTotalPoints(allQuestions);
              const statResults = pointStatCalculator(
                playerPoints,
                totalPoints,
                numberOfQuestions
              );

              if (results) {
                const statData = statDataSelector(results, statResults);
                const statWin = StatWin(
                  statData,
                  localStorage.player,
                  statResults
                );
                targetSection.innerHTML = '';
                targetSection.classList.remove('expand');
                targetSection.appendChild(statWin);

                const resultReact = setTimeout(() => {
                  if (parseInt(statResults.totalPoint) >= 50) {
                    applause.play();
                  } else {
                    failure.play();
                  }
                  clearTimeout(resultReact);
                }, 1000);
              }
            }
          );
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
