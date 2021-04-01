/**
 * @deprecated
 * Instead of answerChoice function, CheckBox and RadioButton Functions Created...
 * This function removed from the application after creation of createElement function and answer components located in questionWindows/AnswerComponents Folder
 * @param {*} answer
 * @param {*} type
 * @param {*} isTrueFalse
 * @param {*} value
 * @param {*} id
 * @param {*} func
 * @returns
 */
export const answerChoice = (
  answer,
  type = 'radio',
  isTrueFalse = false,
  value = false,
  id = '5',
  func = null
) => {
  const { a_id, caption } = !isTrueFalse ? answer : { id, value };
  const labelElement = document.createElement('label');
  const inputElement = document.createElement('input');
  const spanElement = document.createElement('span');

  if (type === 'radio') {
    labelElement.classList.add('check-container');

    inputElement.setAttribute('type', 'radio');
    inputElement.setAttribute('name', 'multiplechoice-single');
    spanElement.classList.add('check-mark');

    isTrueFalse
      ? inputElement.setAttribute('value', value)
      : inputElement.setAttribute('value', a_id);
    isTrueFalse
      ? inputElement.setAttribute('id', id)
      : inputElement.setAttribute('id', a_id);
    isTrueFalse
      ? labelElement.setAttribute('for', id)
      : labelElement.setAttribute('for', a_id);

    inputElement.onchange = func;
  } else {
    labelElement.classList.add('checkbox-container');
    labelElement.setAttribute('for', a_id);
    inputElement.setAttribute('type', 'checkbox');
    inputElement.setAttribute('name', 'multiplechoice-multiple');
    inputElement.setAttribute('value', a_id);
    inputElement.setAttribute('id', a_id);
    spanElement.classList.add('checkmark');
    inputElement.onclick = func;
  }

  labelElement.innerText = isTrueFalse ? value : caption;
  labelElement.appendChild(inputElement);
  labelElement.appendChild(spanElement);

  return labelElement;
};
