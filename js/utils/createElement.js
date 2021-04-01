/**
 * This function creates html elements, with props parameter, attributes can be added to the element,
 * with className string or className array classes can be added and with childElement parameter
 * childElements and/or innerText can be added to the element. On the other hand, not all but for
 * limited amount of events, it is possible to assign an event function to element (especially the ones that start with on e.g. onClick)
 * @param {String} tag - html element that will be created (e.g. a, div, h1 etc.)
 * @param {Object} props - attributes of the element (e.g. type, src, name). ex {type:"text", name:"username"}
 * @param {String || String Array} className - class or classes for the element to be added it's classList
 * @param {Object || Object Array} childElements - childElement or childElements for the tag to be created, it must be a created element with createElement function
 */
export const createElement = (tag, props, className, childElements) => {
  const element = document.createElement(tag);
  //some of the events ommitted for this exercise
  const events = [
    'onblur',
    'onclick',
    'ondblclick',
    'onfocus',
    'onmousedown',
    'onmouseenter',
    'onmouseleave',
    'onmousemove',
    'onmouseout',
    'onmouseover',
    'onselect',
    'onchange',
  ];

  //Set attributes of the element
  if (props) {
    if (typeof props === 'object' && !Array.isArray(props)) {
      const propKeys = Object.keys(props);

      propKeys.forEach((propKey) => {
        if (
          (events.includes(propKey.toLowerCase()) ||
            propKey.substring(0, 2).toLowerCase() === 'on') &&
          typeof props[propKey] === 'function'
        ) {
          element.addEventListener(
            `${propKey.substring(2).toLowerCase()}`,
            props[propKey]
          );
        } else {
          element.setAttribute(propKey, props[propKey]);
        }
      });
    } else {
      console.error(
        `For ${tag}, props must be an object type but a ${typeof props} entered.`
      );
    }
  }

  //Add class or classes to element to be created
  if (className) {
    if (typeof className === 'string') {
      element.classList.add(className);
    } else if (typeof className === 'object' && Array.isArray(className)) {
      className.forEach((cn) => {
        element.classList.add(cn);
      });
    } else {
      console.error(
        `For ${tag}, a string class name or an array of string class names expected`
      );
    }
  }

  //add child elements to element to be created
  if (childElements) {
    if (typeof childElements === 'object' && Array.isArray(childElements)) {
      childElements.forEach((childEl) => {
        if (typeof childEl === 'object') {
          element.appendChild(childEl);
        } else if (typeof childEl === 'string') {
          element.innerText = childEl;
        }
      });
    } else if (
      typeof childElements === 'object' &&
      !Array.isArray(childElements)
    ) {
      element.appendChild(childElements);
    } else if (typeof childElements === 'string') {
      element.innerText = childElements;
    } else {
      console.error(
        `For ${tag}, childElements must be an object created by createElement or an array of element objects`
      );
    }
  }

  return element;
};
