/*
    Carousel widget component module
*/

import { createElement } from './utils';
import { MAX_IMAGES, CAROUSEL_CLASS, HEADER_CLASS, STRIP_CLASS, ITEM_CLASS, ITEM_ACTIVE_CLASS, IMG_CLASS, IMG_TITLE_CLASS, FOOTER_CLASS, BUTTON_CLASS } from './constants';


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
        this.allPlacementIndexes = []; // Reference to all carousel placement indexes
        this.prevButton = null; // Reference to the prev button
        this.nextButton = null; // Reference to the next button
    }

    createFooter() {
        const footer = createElement('div', FOOTER_CLASS);

        this.prevButton = createElement('button', BUTTON_CLASS, 'prev', { 'role': 'button' });
        this.nextButton = createElement('button', BUTTON_CLASS, 'next', { 'role': 'button' });

        footer.append(this.prevButton, this.nextButton);

        return footer;
    }

    setPlacementImages() {
        let images = [];

        for (let i = 0; i < this.images.length; i++) {
            for (let j = 0; j < this.allPlacementIndexes.length; j++) {
                if (i === this.allPlacementIndexes[j]) {
                    images.push(this.images[i]);
                }
            }
        }

        for (let i = 0; i < this.stripItems.length; i++) {
            const img = this.stripItems[i].children[0];
            const title = this.stripItems[i].children[1];

            img.src = images[i] ? images[i].url : '';
            img.alt = images[i] ? images[i].title : '';
            title.innerText = img.alt;
        }

        return;
    }

    getStripPlacementIndexes(type, activeImageIndex, placements) {
        let placementIndexes = [];

        if (type === 'left') {
            for (let i = activeImageIndex - 1; i >= (activeImageIndex - placements.left); i--) {
                placementIndexes.push(i);
            }
        } else if (type === 'right') {
            for (let i = activeImageIndex + 1; i <= (activeImageIndex + placements.right); i++) {
                placementIndexes.push(i);
            }
        }

        return placementIndexes.sort();
    }

    getStripPlacementsCount() {
        let placements = { left: 0, right: 0 };

        for (let i = 1; i <= this.maxImages; i++) {
            if (i < this.activeIndex) {
                placements.left++;
            } else if (i > this.activeIndex) {
                placements.right++;
            }
        }

        return placements;
    }

    displayImages() {
        const placements = this.getStripPlacementsCount();
        let activeImageIndex;

        for (let i = 0; i < this.images.length; i++) {
            if (this.images[i].active) {
                activeImageIndex = i;
                break;
            }
        }

        const leftPlacementIndexes = this.getStripPlacementIndexes('left', activeImageIndex, placements);
        const rightPlacementIndexes = this.getStripPlacementIndexes('right', activeImageIndex, placements);
        this.allPlacementIndexes = leftPlacementIndexes.concat(activeImageIndex, rightPlacementIndexes);

        return this.setPlacementImages();
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
        this.displayImages();

        return strip;
    }

    createHeader() {
        return createElement('h1', HEADER_CLASS, this.title, { 'role': 'heading' });
    }

    createCarousel() {
        const carousel = createElement('div', CAROUSEL_CLASS, '', { 'aria-label': this.title, 'role': 'region' });
        carousel.append(this.createHeader(), this.createStrip(), this.createFooter());

        return this.carousel = carousel;
    };

    init() {
        this.element.appendChild(this.createCarousel());
    };
}

export default Carousel;