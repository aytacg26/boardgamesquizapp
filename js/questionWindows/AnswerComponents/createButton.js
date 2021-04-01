import { createElement } from '../../utils/createElement.js';

/**
 * This function creates a custom button component
 * @param {String} text - Text on the button
 * @param {Function} func - function attached to the button (if required)
 * @returns Custom Button Component (Next Button and Restart Button in App)
 */
export const createButton = (text, func = null) => {
  const btnContainer = createElement(
    'div',
    null,
    'next-question-button',
    createElement(
      'button',
      { type: 'button', onClick: func },
      'answer-button',
      text
    )
  );

  return btnContainer;
};
