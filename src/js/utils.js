/* 
    Carousel widget common utility functions module
*/

/**
 * Returns an HTML element with the specified type and parameters
 * @function
 * @param {string} type - Type of element
 * @param {string} className - Class name of element
 * @param {string} innerText - Inner text of element
 * @param {Object} attributesMap - Set of attributes for element
 * @returns {HTMLElement} The HTML element
*/
const createElement = (type, className, innerText = '', attributesMap = {}) => {
    const element = document.createElement(type);
    element.classList.add(className);
    element.innerText = innerText;

    const attributes = Object.keys(attributesMap);
    if (attributes.length) {
        attributes.forEach(i => {
            element.setAttribute(i, attributesMap[i]);
        });
    }

    return element;
};

export { createElement };