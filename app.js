/*
    Carousel widget app module
*/

/**
 * Returns the carousel widget app object interface
 * @function
 * @param {Object} w - The window object
 * @returns {Object} The app object
*/
var app = (function (w) {
    // Carousel widget app constants
    var imageUrl = 'https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=beautiful+landscape&image_type=photo',
        carouselElement = document.getElementById('carousel'),
        loaderElement = document.getElementById('loader'),
        carouselTitle = 'Carousel Test',
        activeItem = 5;

    return {
        /**
         * Returns re-mapped set of images to be loaded to the carousel widget
         * @function
         * @param {Object[]} images - Original set of images
         * @returns {Object[]} Re-mapped set of images
        */
        processImages: function (images) {
            return images.map(function (image, index) {
                return {
                    url: image.webformatURL,
                    title: image.user,
                    active: index === activeItem ? true : false
                };
            });
        },

        /**
         * Initialises the carousel widget with the specified parameters
         * @function
         * @param {Object[]} images - Images to be loaded to the carousel widget
         * @returns {HTMLElement} The carousel widget HTML element
        */
        initCarousel: function (images) {
            loaderElement.style.display = 'none';
            return new Carousel(carouselElement, carouselTitle, this.processImages(images)).init();
        },

        /**
         * Requests for the image set to be loaded to the carousel widget and initialises the widget once done
         * @function
         * @returns {HTMLElement} The carousel widget HTML element
        */
        fetchImages: function () {
            var xhr = new w.XMLHttpRequest();

            xhr.open('GET', imageUrl);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    return app.initCarousel(JSON.parse(xhr.responseText).hits);
                }
            }
            xhr.send();
        }
    };
})(window);

app.fetchImages();