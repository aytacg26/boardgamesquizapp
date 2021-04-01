export const checkSpecialCharacters = (value) => {
  const specialChars = /[^A-Za-z 0-9]/g;
  const hasSpecialChars = specialChars.test(value);

  return { hasSpecialChars };
};
