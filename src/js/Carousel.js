/*
    Carousel widget component module
*/

import { createElement } from './utils';
import { MAX_IMAGES, CAROUSEL_CLASS, HEADER_CLASS, STRIP_CLASS, ITEM_CLASS, ITEM_ACTIVE_CLASS, IMG_CLASS, IMG_TITLE_CLASS } from './constants';


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
        this.activeIndex = Math.ceil(MAX_IMAGES / 2); // Index of the active item, to be centered in the middle
        this.stripItems = []; // Reference to the carousel strip items
    }

    createItem(isActive) {
        const item = createElement('li', isActive ? ITEM_ACTIVE_CLASS : ITEM_CLASS, '', { 'role': 'listitem' });
        const img = createElement('img', IMG_CLASS);
        const title = createElement('h2', IMG_TITLE_CLASS);

        item.style.width = `${100 / this.maxImages}%`;
        item.append(img, title);

        return item;
    }

    createStrip() {
        const strip = createElement('ul', STRIP_CLASS, '', { 'role': 'list' });

        for (let i = 1; i <= this.maxImages; i++) {
            const isActive = i === this.activeIndex;
            const item = this.createItem(isActive);

            this.stripItems.push(item);
            strip.appendChild(item);
        }

        return strip;
    }

    createHeader() {
        return createElement('h1', HEADER_CLASS, this.title, { 'role': 'heading' });
    }

    createCarousel() {
        const carousel = createElement('div', CAROUSEL_CLASS, '', { 'aria-label': this.title, 'role': 'region' });
        carousel.append(this.createHeader(), this.createStrip());

        return this.carousel = carousel;
    };

    init() {
        this.element.appendChild(this.createCarousel());
    };
}

export default Carousel;