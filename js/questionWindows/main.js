import { createElement } from '../utils/createElement.js';

/**
 * Each question window have same main body which contains Question Number Section, Question, Image and Answer Options Section,
 * this function creates main body of the window and then answer options appended to it seperately according to the type of answers (multi-single, multi-multi or truefalse)
 * @param {String} qId - Question Id, which also gives the question number
 * @param {String} title - The question of the related id
 * @param {String} image - image url for img tag src
 * @returns Element Object - Returns the main question window without answer options.
 */
export const main = (qId, title, image) => {
  const numberOfQuestions = localStorage.getItem('NumOfQuestions');

  const questionNo = createElement(
    'span',
    null,
    'question-no',
    `Question No ${qId}`
  );

  const numOfQues = createElement(
    'span',
    null,
    'num-questions',
    `${qId} / ${numberOfQuestions}`
  );

  const numsDiv = createElement('div', null, 'numsSection', [
    questionNo,
    numOfQues,
  ]);

  const questionTitle = createElement('p', null, 'question', title);

  const questionTitleSection = createElement('div', null, 'question-title', [
    numsDiv,
    questionTitle,
  ]);

  const imgTag = createElement('img', {
    src: `${image}`,
    alt: `${title}`,
    title: `${title}`,
    loading: 'lazy',
  });

  const questionImage = createElement('div', null, 'question-image', imgTag);

  const answersSection = createElement('div', null, 'possible-answers');

  const fragment = createElement(
    'div',
    null,
    ['window-transition', 'move-left'],
    [questionTitleSection, questionImage, answersSection]
  );

  return fragment;
};
