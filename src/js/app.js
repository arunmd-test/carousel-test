/*
    Carousel widget app module
*/

var app = (function (w) {
    var imageUrl = 'https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=beautiful+landscape&image_type=photo';

    return {
        fetchImages: function () {
            var xhr = new w.XMLHttpRequest();

            xhr.open('GET', imageUrl);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(JSON.parse(xhr.responseText).hits);
                }
            }
            xhr.send();
        }
    };
})(window);

app.fetchImages();