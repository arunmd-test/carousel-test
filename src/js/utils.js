/* 
    Carousel widget common utility functions module
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