export const isValidName = (name, validLength = 20) => {
  const specialChars = /[^A-Za-z 0-9]/g;
  const hasSpecialChars = specialChars.test(name);
  const hasValidLength = name.length <= validLength;

  return { hasSpecialChars, hasValidLength };
};
