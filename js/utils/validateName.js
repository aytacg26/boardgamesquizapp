import { checkSpecialCharacters } from './checkSpecialCharacters';

export const isValidName = (name, validLength = 20) => {
  const { hasSpecialChars } = checkSpecialCharacters(name);
  const hasValidLength = name.length <= validLength;

  return { hasSpecialChars, hasValidLength };
};
