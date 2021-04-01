import { createElement } from '../utils/createElement.js';
import { createButton } from '../questionWindows/AnswerComponents/createButton.js';
import { clearLocalStorage } from '../utils/clearLocalStoreage.js';

/**
 *  This function creates the statistics window for the player according to the player point results and
 *  result messages from "https://proto.io/en/jobs/candidate-exercise/result.json"
 * @param {Object} statData - generated statictics data with the help of statDataSelector() function
 * @param {String} playerName - player name from localStorage
 * @param {Object} pointStats - player point results calculated by pointStatCalculator()
 * @returns Element Object - Statistics Window at the end of the game
 */
export const StatWin = (statData, playerName, pointStats) => {
  const { title, message, img } = statData[0];
  const { correct, wrong, totalPoint } = pointStats;

  const statHeader = createElement('div', null, 'stat-header', 'Game Over');
  const heading = createElement('h3', null, null, title);
  const username = createElement('h4', null, null, playerName);
  const paragraph = createElement('p', null, null, message);
  const table = `
  <table>
  <thead>
    <tr>
      <th>Correct</th>
      <th>Wrong</th>
      <th>Total Point</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${correct}</td>
      <td>${wrong}</td>
      <td>${totalPoint}</td>
    </tr>
  </tbody>
</table>
  `;
  const resultStats = createElement('div', null, 'result-stats');
  resultStats.innerHTML = table;

  const messageSection = createElement('div', null, 'stat-message-section', [
    heading,
    username,
    paragraph,
  ]);

  const restartButton = createButton('Restart', () => clearLocalStorage(true));

  const imgTag = createElement('img', {
    src: img,
    title: title,
    alt: title,
    style: 'border-radius:10px',
  });

  const dataContainer = createElement('div', null, 'data-container', [
    statHeader,
    messageSection,
    resultStats,
    restartButton,
  ]);

  const mainContainer = createElement('div', null, 'stat-container', [
    imgTag,
    dataContainer,
  ]);

  return mainContainer;
};
