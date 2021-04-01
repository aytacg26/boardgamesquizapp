/**
 * Gets the elements by their Id on correct answer array and adds new class to them
 * @param {Array} correctAnswer - Correct Answer Array which is fetched from json data and converted to Array (for some answers)
 * @param {String} highLightClass - css class for highlighting the correct answers
 */
export const highLight = (correctAnswer, highLightClass) => {
  correctAnswer.forEach((ans) => {
    if (typeof ans === 'number') {
      document
        .getElementById(`${ans}`)
        .parentElement.classList.add(highLightClass);
    } else {
      const options = document.querySelectorAll("input[type='radio']");
      for (let i = 0; i < options.length; i++) {
        if (options[i].value.toString() === ans.toString()) {
          options[i].parentElement.classList.add(highLightClass);
        }
      }
    }
  });
};
