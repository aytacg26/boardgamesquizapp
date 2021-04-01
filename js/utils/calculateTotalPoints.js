/**
 * This function calculates total points of questions.
 * @param {Array} questions - all questions array fetched from the given API
 * @returns Number - total value of points
 */
export const calculateTotalPoints = (questions) => {
  return questions.reduce(
    (total, question) => total + parseInt(question.points),
    0
  );
};
