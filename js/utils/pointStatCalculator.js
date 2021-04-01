/**
 *
 * @param {Array} points - points of the player
 * @param {Array} totalPoints - total points calculated from the points of each question by the help of calculateTotalPoints() function
 * @param {Number} numberOfQuestions - Number of questions in game (this also calculated and stored in localStorage)
 * @returns Object {correct, wrong, totalPoint}, number of correct answers, number of wrong answer and % of total points of the player.
 */
export const pointStatCalculator = (points, totalPoints, numberOfQuestions) => {
  if (points && numberOfQuestions) {
    const correct = points.filter((point) => parseInt(point.point) > 0).length;

    const wrong = numberOfQuestions - correct;

    const playerPointTotal = points.reduce(
      (total, point) => total + parseInt(point.point),
      0
    );

    const totalPoint = (100 * playerPointTotal) / totalPoints;

    return { correct, wrong, totalPoint };
  }

  return { correct: 0, wrong: 0, totalPoint: 0 };
};
