import { setAlert } from './alert.js';

/**
 * This function compares player answer with correct answer from fetch data and if answers match returns true.
 * @param {Array || String} playerAnswer - array structure of the player answer or string version of player answer (changes question by question)
 * @param {Array || String} correct_answer - correct answers from the fetch data
 * @returns Boolean (true/false)
 */
export const validateAnswer = (playerAnswer, correct_answer) => {
  const hasAnswer = Array.isArray(playerAnswer)
    ? playerAnswer.length > 0
    : playerAnswer !== undefined && playerAnswer !== null;

  const correct = correct_answer;

  if (!hasAnswer) {
    setAlert('Please choose an answer', 'No Answer Selected', 'danger');
  } else {
    const isArray = Array.isArray(playerAnswer);

    if (isArray) {
      //check if number of answers is equal, if no, answer is wrong
      //if number of answers is equal, for each answer of player, check if correct answers contain them
      const isEqualLength = playerAnswer.length === correct.length;

      if (isEqualLength) {
        for (let i = 0; i < playerAnswer.length; i++) {
          if (!correct.includes(parseInt(playerAnswer[i]))) {
            return false;
          }
        }

        return true;
      } else {
        return false;
      }
    } else {
      const result = correct_answer.toString() === playerAnswer ? true : false;

      return result;
    }
  }
};
