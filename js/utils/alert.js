import { createElement } from './createElement.js';

/**
 * This function creates message box with the help of createElement() function and
 * in case of alert appends it to the body. For message box colors, it uses "alert-heading-${type}" class
 * and from the given type ("success" or "danger"), it changes the heading color of box,
 * Number of types can be increased in CSS by adding "warning" [alert-heading-warning], "info" [alert-heading-info] classes to css
 * @param {String} message - message to be given on the alert
 * @param {String} title - Header or title for the message box
 * @param {String} type - type of alert message, default is "success" but in case of warning "danger" is used
 */
export const setAlert = (message, title, type = 'success') => {
  const messageParagraph = createElement('p', null, null, message);
  const alertMessage = createElement('div', null, 'alert-message', [
    messageParagraph,
  ]);
  const alertHeading = createElement(
    'div',
    null,
    `alert-heading-${type}`,
    title
  );
  const alertContainer = createElement('div', null, 'alert-container', [
    alertHeading,
    alertMessage,
  ]);

  document.body.appendChild(alertContainer);

  const activateTransition = setTimeout(() => {
    alertContainer.classList.add('active');
    clearTimeout(activateTransition);
  }, 100);

  const removeTimer = setTimeout(() => {
    alertContainer.classList.remove('active');
    clearTimeout(removeTimer);
    const removeFromBody = setTimeout(() => {
      document.body.removeChild(alertContainer);
      clearTimeout(removeFromBody);
    }, 1000);
  }, 3000);
};
