/* 
    Carousel widget common utility functions module
*/

const createElement = (type, className, innerText = '') => {
    const element = document.createElement(type);
    element.classList.add(className);
    element.innerText = innerText;

    return element;
};

export { createElement };