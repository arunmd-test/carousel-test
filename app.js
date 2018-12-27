/*
    Carousel widget app module
*/

var app = (function (w) {
    var imageUrl = 'https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=beautiful+landscape&image_type=photo',
        carouselElement = document.getElementById('carousel'),
        loaderElement = document.getElementById('loader'),
        carouselTitle = 'Carousel Test',
        activeItem = 5;

    return {
        processImages: function (images) {
            return images.map(function (image, index) {
                return {
                    url: image.webformatURL,
                    title: image.user,
                    active: index === activeItem ? true : false
                };
            });
        },
        initCarousel: function (images) {
            loaderElement.style.display = 'none';
            return new Carousel(carouselElement, carouselTitle, this.processImages(images)).init();
        },
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