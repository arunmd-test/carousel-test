/*
    Carousel widget component module
*/

import { createElement } from './utils';

class Carousel {
    constructor(element, title, images) {
        if (!element || !title || !images.length) {
            throw new Error('Cannot initialise carousel without required parameters');
        }
        this.element = element;
        this.title = title;
        this.images = images;
    }

    init() {

    };
}

export default Carousel;