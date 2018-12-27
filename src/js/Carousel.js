/*
    Carousel widget component module
*/

import { createElement } from './utils';
import { MAX_IMAGES, CAROUSEL_CLASS, HEADER_CLASS } from './constants';


class Carousel {
    constructor(element, title, images) {
        if (!element || !title || !images.length) {
            throw new Error('Cannot initialise carousel without required parameters');
        }
        this.element = element;
        this.title = title;
        this.images = images;

        this.maxImages = MAX_IMAGES; // Max number of images to be displayed in the carousel strip
        this.carousel = null; // Reference to the carousel widget element
    }

    createHeader() {
        return createElement('h1', HEADER_CLASS, this.title, { 'role': 'heading' });
    }

    createCarousel() {
        const carousel = createElement('div', CAROUSEL_CLASS, '', { 'aria-label': this.title, 'role': 'region' });
        carousel.append(this.createHeader());

        return this.carousel = carousel;
    };

    init() {
        this.element.appendChild(this.createCarousel());
    };
}

export default Carousel;