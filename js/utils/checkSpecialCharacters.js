/**
 * This function checks if the given value contains special characters (!@#$%^&*()/+=~€£;_,.?":{}|<>)
 * In app, this is used to check entered name and also
 * @param {Array || String || Object} value - the value which we would like to check if it contains special characters (!@#$%^&*()/+=~€£;_,.?":{}|<>)
 * @returns Object with hasSpecialChars key and Boolean value (true if value has special character else false)
 */
export const checkSpecialCharacters = (value) => {
  const specialChars = /[!@#$%^&*()/+=~€£;_,.?":{}|<>]/g;
  let hasSpecialChars = true;

  if (typeof value === 'string') {
    //can be string or number or true/false
    hasSpecialChars = specialChars.test(value);

    return { hasSpecialChars };
  } else if (typeof value === 'object' && Array.isArray(value)) {
    //can be an string array or number array or boolean array,
    //in any case typeof each item from input will be string
    value.forEach((item) => {
      if (specialChars.test(item)) {
        return { hasSpecialChars: true };
      } else {
        //each item won't pass the test of specialChars, which means they do not have any special char, otherwise
        //loop will stop in if block
        hasSpecialChars = false;
      }
    });

    //This will always return false, we cannot apply this return process in loop
    return { hasSpecialChars };
  } else if (typeof value === 'object') {
    //we may have an object which is not an array, we need to check each value of object key {key:value}
    //From input element, this will come as string and will not pass the test in first if statement and will
    //never reach this point. This part created for other possible use cases.
    const keys = Object.keys();

    if (keys) {
      keys.forEach((key) => {
        if (specialChars.test(value[key])) {
          return { hasSpecialChars: true };
        } else {
          //each item won't pass the test of specialChars, which means they do not have any special char, otherwise
          //loop will stop in if block
          hasSpecialChars = false;
        }
      });

      //This will always return false, we cannot apply this return process in loop
      return { hasSpecialChars };
    } else {
      return { hasSpecialChars };
    }
  } else {
    return { hasSpecialChars };
  }
};
