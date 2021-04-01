import { setAlert } from './alert.js';
import { QuestionsURL, ResultsURL } from '../questionWindows/Constants.js';

/**
 * Instead of writing setAlert same messages two times in case of server errors, this void function
 * has been created and used in both fetch functions. It just calls setAlert function.
 * @returns   void
 */
const serverError = () =>
  setAlert(
    'We are sorry an Internal Server Error occured...',
    'Unexpected Server Error',
    'danger'
  );

/**
 * This function fetches questions json from "https://proto.io/en/jobs/candidate-exercise/quiz.json"
 * @param {Number} questonId - Id of Question, it is used for the cases of page refresh to start the game from the last question the user refreshed or closed the page
 * @returns Array of questions from the fetched and filtered data.
 */
export const fetchQuestions = async (questonId) => {
  try {
    const res = await fetch(QuestionsURL);

    const data = await res.json();

    //to just return the title and description at initialization function is used without Question Id
    if (!questonId) {
      const { title, description } = data;
      const numberOfQuestions = data.questions.length;

      return { title, description, numberOfQuestions };
    }

    const questions = data.questions;

    //Filter the questions according to the last questionId
    return questions.filter((question) => question.q_id >= questonId);
  } catch {
    serverError();
  }
};

/**
 * This function fetches the results json from "https://proto.io/en/jobs/candidate-exercise/result.json"
 * @returns fetch json data
 */
export const fetchResults = async () => {
  try {
    const res = await fetch(ResultsURL);
    const data = await res.json();

    return data;
  } catch (error) {
    serverError();
  }
};
