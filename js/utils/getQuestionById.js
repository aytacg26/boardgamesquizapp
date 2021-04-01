/**
 * In every click to the Next button on question window, currentQuestion id is increaed by one and this function filters the Next
  question from fetched json and sends it to the question window generator function
 * @param {Array} questionsArr - Fetch Questions Array 
 * @param {Number} questionId - Id of question that we would like to get among all questions 
 * @returns filtered question object
 */
export const getQuestionById = (questionsArr, questionId) => {
  return questionsArr.filter((question) => question.q_id === questionId)[0];
};
