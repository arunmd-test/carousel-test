/*
    Carousel widget tests
*/

import Carousel from '../src/js/Carousel';

describe("Carousel", () => {
    let carousel, element, title, images, activeImageIndex;;
    const stripPlacementsCount = { left: 2, right: 3 };
    const leftPlacementIndexes = [0, 1];
    const rightPlacementIndexes = [3, 4, 5]

    beforeAll(() => {
        document.body.innerHTML = '<div id="carousel"></div>';
        element = document.getElementById('carousel');
        title = 'Carousel Test';
        images = [
            {
                "url": "https://pixabay.com/get/ea35b60821f6093ed1584d05fb1d4f90e671e2d31cac104491f5c67fa0e8b1ba_640.jpg",
                "title": "peter_pyw",
                "active": false
            },
            {
                "url": "https://pixabay.com/get/e835b60d20f6093ed1584d05fb1d4f90e671e2d31cac104491f5c67fa0e8b1ba_640.jpg",
                "title": "valiunic",
                "active": false
            },
            {
                "url": "https://pixabay.com/get/e833b90b28f1033ed1584d05fb1d4f90e671e2d31cac104491f5c67fa0e8b1ba_640.jpg",
                "title": "kangbch",
                "active": true
            },
            {
                "url": "https://pixabay.com/get/eb35b90f28f3033ed1584d05fb1d4f90e671e2d31cac104491f5c67fa0e8b1ba_640.jpg",
                "title": "12019",
                "active": false
            },
            {
                "url": "https://pixabay.com/get/e83cb6062df0073ed1584d05fb1d4f90e671e2d31cac104491f5c67fa0e8b1ba_640.jpg",
                "title": "12019",
                "active": false
            },
            {
                "url": "https://pixabay.com/get/ee31b8092af11c22d2524518b7454093e577e4d004b0144590f7c77ea2e9b7_640.jpg",
                "title": "Comfreak",
                "active": false
            }
        ];
        for (let i = 0; i < images.length; i++) {
            if (images[i].active) {
                activeImageIndex = i;
                break;
            }
        }
        carousel = new Carousel(element, title, images);
    });

    test('Initialise', () => {
        expect(carousel instanceof Carousel).toBe(true);
    });

    test('Strip placements count', () => {
        expect(carousel.getStripPlacementsCount()).toEqual(stripPlacementsCount);
    });

    test('Strip placements indexes (left)', () => {
        const placements = carousel.getStripPlacementsCount();
        expect(carousel.getStripPlacementIndexes('left', activeImageIndex, placements)).toEqual(leftPlacementIndexes);
    });

    test('Strip placements indexes (right)', () => {
        const placements = carousel.getStripPlacementsCount();
        expect(carousel.getStripPlacementIndexes('right', activeImageIndex, placements)).toEqual(rightPlacementIndexes);
    });
});