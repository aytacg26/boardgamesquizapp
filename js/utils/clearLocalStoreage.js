/**
 * This function clears app data from the localStorage (playerName, NumberOfQuestions, points of player, current question id)
 * in some cases, name must not be cleared for this reason removeName boolean parameter added to the function
 * It clears the localStorage and redirects the player to the start page / main page of the app.
 * @param {Boolean} removeName - if we would like to also remove the name of the user from localStore, this will be true (default = false)
 */
export const clearLocalStorage = (removeName = false, redirectTo = '/') => {
  localStorage.removeItem('NumOfQuestions');
  localStorage.removeItem('points');
  localStorage.removeItem('currentQuestion');
  removeName ? localStorage.removeItem('player') : '';
  window.location.replace(redirectTo);
};
