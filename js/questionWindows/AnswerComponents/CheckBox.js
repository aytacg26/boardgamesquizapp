import { createElement } from '../../utils/createElement.js';

/**
 * Creates a custom input checkbox component
 * @param {String || Number} id - Id for input element
 * @param {String} name - name attribut of input element
 * @param {String || Number || Boolean} value - value attribute of input element
 * @param {String} caption - innerText for label element
 * @param {Function} func - function attached to the component (if required)
 * @returns Element Object - CheckBox component
 */
export const CheckBox = (id, name, value, caption, func) => {
  const spanElement = createElement('span', null, 'checkmark');
  const inputElement = createElement('input', {
    type: 'checkbox',
    name,
    value,
    id,
    onClick: func,
  });
  const labelElement = createElement(
    'label',
    { for: id },
    'checkbox-container',
    [caption, inputElement, spanElement]
  );

  return labelElement;
};
