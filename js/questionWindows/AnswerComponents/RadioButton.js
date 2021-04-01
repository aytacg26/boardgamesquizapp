import { createElement } from '../../utils/createElement.js';

/**
 * Creates a custom input radio button component
 * @param {Number || String} id - input element Id attribute
 * @param {String} name -input element name attribute
 * @param {String || Number || Boolean} value - input element value attribute
 * @param {String} caption - innerText for label element
 * @param {Function} func - function attached to the component (if required)
 * @returns Custom Input Radio Button Element
 */
export const Radio = (id, name, value, caption, func) => {
  const inputElement = createElement('input', {
    id,
    type: 'radio',
    name,
    value,
    onChange: func,
  });
  const spanElement = createElement('span', null, 'check-mark');
  const labelElement = createElement('label', { for: id }, 'check-container', [
    caption,
    inputElement,
    spanElement,
  ]);

  return labelElement;
};
