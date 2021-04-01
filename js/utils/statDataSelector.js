/**
 *
 * This function takes results data and point statistics of the user and filters the result data according to
 * the total point % of the user.
 * @param {Object} results - Fetched json results from "https://proto.io/en/jobs/candidate-exercise/result.json"
 * @param {Object} pointStats - point statistics of the user that are calculated by the help of pointStatCalculator() function
 * @returns
 */
export const statDataSelector = (results, pointStats) => {
  const { totalPoint } = pointStats;

  const targetRes = results.filter((result) => {
    const minPoint = parseInt(result.minpoints);
    const maxPoint = parseInt(result.maxpoints);

    if (minPoint <= totalPoint && totalPoint <= maxPoint) {
      return result;
    }
  });

  return targetRes;
};
