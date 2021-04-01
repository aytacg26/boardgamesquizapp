import { main } from './main.js';
import { createButton } from './AnswerComponents/createButton.js';
import { Radio } from './AnswerComponents/RadioButton.js';
import { CheckBox } from './AnswerComponents/CheckBox.js';
import { validateAnswer } from '../utils/validateAnswer.js';
import {
  MultiplechoiceSingle,
  MultiplechoiceMultiple,
  TrueFalse,
} from './Constants.js';
import { setAlert } from '../utils/alert.js';

/**
 *
 * @param {Object} questionData - all data about one question which is fetched from json
 * @param {Function} func -  function to get answer from the choice or choices of the user
 * @returns Element Object : returns the question window with question, image and possible answers and next button
 */
export const questionWindowGen = (questionData, func = null) => {
  const {
    q_id,
    title,
    img,
    question_type,
    possible_answers,
    correct_answer,
    points,
  } = questionData;

  let playerAnswer = [];

  const getAnswer = (e) => {
    const type = e.target.type;
    const path = e.path || (e.composedPath && e.composedPath());

    switch (type) {
      case 'radio':
        playerAnswer = e.target.value;
        break;
      case 'checkbox':
        if (path[0].checked) {
          playerAnswer.push(e.target.value);
        } else {
          playerAnswer.pop(e.target.value);
        }
        break;
      default:
        playerAnswer = null;
    }
  };

  const handleClick = (e) => {
    const isCorrect = validateAnswer(playerAnswer, correct_answer);
    const answerArray = Array.isArray(correct_answer)
      ? correct_answer
      : [correct_answer];
    const path = e.path || (e.composedPath && e.composedPath());

    const playerAnswerArray = Array.isArray(playerAnswer)
      ? playerAnswer
      : [playerAnswer];

    const button = e.target;
    const answersArea = path[2];

    if (playerAnswerArray.length !== 0) {
      const result = {
        point: isCorrect ? points : 0,
        correctAnswer: answerArray,
        playerAnswerArray,
      };

      button.classList.add('disable-button');
      answersArea.classList.add('disabled');

      return func(result);
    } else {
      setAlert('Please select an answer', 'No Answer Selected', 'danger');
    }
  };

  const mainBody = main(q_id, title, img);
  const targetSection = mainBody.children[2];
  const btn = createButton('Next', handleClick);

  switch (question_type) {
    case MultiplechoiceSingle:
      //append can be used but it is not supported by IE11
      possible_answers.forEach((answer) => {
        const answerElement = Radio(
          answer.a_id,
          MultiplechoiceSingle,
          answer.a_id,
          answer.caption,
          getAnswer
        );
        targetSection.appendChild(answerElement);
      });
      break;
    case TrueFalse:
      targetSection.appendChild(
        Radio('100', TrueFalse, true, 'True', getAnswer)
      );
      targetSection.appendChild(
        Radio('110', TrueFalse, false, 'False', getAnswer)
      );
      break;
    case MultiplechoiceMultiple:
      possible_answers.forEach((answer) => {
        const answerElement = CheckBox(
          answer.a_id,
          MultiplechoiceMultiple,
          answer.a_id,
          answer.caption,
          getAnswer
        );
        targetSection.appendChild(answerElement);
      });
      break;
  }

  targetSection.appendChild(btn);

  return mainBody;
};
