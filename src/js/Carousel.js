/*
    Carousel widget component module
*/

import { createElement } from './utils';
import { MAX_IMAGES, HEADER_CLASS, STRIP_CLASS, ITEM_CLASS, ITEM_ACTIVE_CLASS, CAROUSEL_CLASS, IMG_CLASS, IMG_TITLE_CLASS, FOOTER_CLASS, BUTTON_CLASS } from './constants';

/**
 * Creates a new Carousel class
 * @class
*/
class Carousel {
    /**
     * Create a carousel
     * @function
     * @param {HTMLElement} element - Element where the carousel widget is to be inserted
     * @param {string} title - Title of the carousel widget
     * @param {Object[]} images - Images to be loaded to the widget
    */
    constructor(element, title, images) {
        if (!element || !title || !images.length) {
            throw new Error('Cannot initialise carousel without required parameters');
        }
        this.element = element;
        this.title = title;
        this.images = images;

        this.maxImages = MAX_IMAGES; // Max number of images to be displayed in the carousel strip
        this.carousel = null; // Reference to the carousel widget element
        this.prevButton = null; // Reference to the prev button
        this.nextButton = null; // Reference to the next button
        this.activeIndex = Math.ceil(MAX_IMAGES / 2); // Index of the active item, to be centered in the middle
        this.stripItems = []; // Reference to the carousel strip items
        this.allPlacementIndexes = []; // Reference to all carousel placement indexes
    }

    /**
     * Disables the previous and next buttons if the end or start of the carousel has been reached
     * @function
     * @returns {null}
    */
    disableButtons() {
        if (this.allPlacementIndexes[0] === 0) {
            this.prevButton.disabled = true;
        }
        if (this.allPlacementIndexes[this.allPlacementIndexes.length - 1] === this.images.length - 1) {
            this.nextButton.disabled = true;
        }

        return;
    }

    /**
     * Destroys the carousel widget instance
     * @function
     * @returns {HTMLElement} The deleted carousel widget element
    */
    destroyCarousel() {
        this.stripItems = [];
        return this.carousel.parentNode.removeChild(this.carousel);
    }

    /**
     * Resets the image list based on the given offset
     * @function
     * @param {number} offset - Offset by which the previous or next image needs to be centered
     * @returns {null}
    */
    resetImagesList(offset) {
        for (let i = 0, j = null; i < this.images.length; i++) {
            if (this.images[i].active) {
                this.images[i].active = false;
                j = offset > 0 ? ++i : --i;
            }
            if (i === j) {
                this.images[i].active = true;
            }
        }

        return;
    }

    /**
     * Centers the previous or next image by resetting the images list, destroying the carousel instance and re-initialising it
     * @function
     * @param {number} offset - Offset by which the previous or next image needs to be centered
     * @returns {null}
    */
    centerImage(offset) {
        return () => {
            this.resetImagesList(offset);
            this.destroyCarousel();
            this.init();
            this.disableButtons();
        };
    }

    /**
     * Creates the carousel widget footer
     * @function
     * @returns {HTMLElement} The carousel widget footer element
    */
    createFooter() {
        const footer = createElement('div', FOOTER_CLASS);

        this.prevButton = createElement('button', BUTTON_CLASS, 'prev', { 'role': 'button' });
        this.nextButton = createElement('button', BUTTON_CLASS, 'next', { 'role': 'button' });
        this.prevButton.onclick = this.centerImage(-1);
        this.nextButton.onclick = this.centerImage(+1);

        footer.append(this.prevButton, this.nextButton);

        return footer;
    }

    /**
     * Sets the image sources and titles for all the current strip items
     * @function
     * @returns {null}
    */
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

    /**
     * Returns the placement indexes for either sides of the centered image
     * @function
     * @param {string} type - Type of side (left or right)
     * @param {number} activeImageIndex - Index of the active image
     * @param {Object} placements - Strip placement counts (No. of images that need to be placed on either side of the centered image)
     * @returns {number[]} The sorted placement indexes
    */
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

    /**
     * Returns the count of the placement indexes for either sides of the centered image
     * @function
     * @returns {Object} Strip placement counts (No. of images that need to be placed on either side of the centered image)
    */
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

    /**
     * Calculates the placement indexes for either side of the centered image and displays the images on those indexes
     * @function
     * @returns {null}
    */
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

    /**
     * Creates a strip item element
     * @function
     * @param {boolean} isActive - Flag to indicate whether the current item will be the active item in the carousel or not
     * @returns {HTMLElement} The strip item element
    */
    createItem(isActive) {
        const item = createElement('li', isActive ? ITEM_ACTIVE_CLASS : ITEM_CLASS, '', { 'role': 'listitem' });
        const img = createElement('img', IMG_CLASS);
        const title = createElement('h2', IMG_TITLE_CLASS);

        item.style.width = `${100 / this.maxImages}%`;
        item.append(img, title);

        return item;
    }

    /**
     * Creates the strip list element and displays the images in the list
     * @function
     * @returns {HTMLElement} The strip list element
    */
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

    /**
     * Creates the carousel widget header
     * @function
     * @returns {HTMLElement} The carousel widget header element
    */
    createHeader() {
        return createElement('h1', HEADER_CLASS, this.title, { 'role': 'heading' });
    }

    /**
     * Creates the carousel widget main element
     * @function
     * @returns {HTMLElement} The carousel widget main element
    */
    createCarousel() {
        const carousel = createElement('div', CAROUSEL_CLASS, '', { 'aria-label': this.title, 'role': 'region' });
        carousel.append(this.createHeader(), this.createStrip(), this.createFooter());

        return this.carousel = carousel;
    };

    /**
     * Initialises the carousel widget in the specified element
     * @function
     * @returns {HTMLElement} The carousel widget main element
    */
    init() {
        this.element.appendChild(this.createCarousel());
    };
}

export default Carousel;