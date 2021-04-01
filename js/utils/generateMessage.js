/**
 * This function is used for alert messages and selects and creates a random message from the given arrays
 * @param {String} name - player name
 * @param {Boolean} isForCorrect - messages can be for correct or for wrong answers, if it is for correct answer messages, this parameter set to true else set to false (default:true)
 * @returns String message
 */
export const generateMessage = (name, isForCorrect = true) => {
  const correctMessages = [
    'Good Job!',
    'Excellent!',
    'Nice Work!',
    'Fantastic!',
    'Well Done!',
    'Congrats!',
    'Great Job!',
    'Perfect!',
    'Keep up the good work!',
    "That's great!",
    'Perfect!',
    'Wonderful!',
    'Super!',
    'Nothing can stop you now!',
    'Exactly Right!',
  ];

  const wrongMessages = [
    'How did you arrive at your answer?',
    "You're on the right track, but not there yet.",
    "Interesting... it's not exactly what I was looking for",
    "Sorry, that's not correct",
  ];

  //length is used to get correct range for random values. Ex: for wrong messages it range must be 0 - 3
  const length = isForCorrect ? correctMessages.length : wrongMessages.length;
  const randomNum = Math.floor(Math.random() * length);

  return isForCorrect
    ? `${correctMessages[randomNum]} ${name} you got the right answer`
    : `${wrongMessages[randomNum]}`;
};
