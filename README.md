# Carousel Test

## Introduction
Mobile first carousel widget that cycles through six images via the `prev` and `next` buttons.

- Zero dependencies.
- Just 2KB (Gzipped).
- Easy configuration.
- Responsive.

## How its built

### Carousel widget app module

> ./app.js

The carousel widget app is written in `Vanilla JS` which leverages the `Object Interface` pattern for an easy to use exposed API. It requests the `pixabay` API for a set of images (using `XHR`) which are loaded to the carousel. 

Once the images are fetched, the app initialises the carousel widget component with those images.

### Carousel widget component module

This module is written in `Vanilla JS` as well which leverages the `ES6 Class` pattern. Since ES6 is being used here, a transpilation pipeline has been set up for ES6 to ES5 conversion, if in case this module needs to function on older browsers.

 - `Babel` along with the `es2015` preset is used for the transpilation process. 
 - `Webpack` is used for bundling all the modules together.
 - `Jest` is used for running all the tests.

> ./src/js/index.js

The entry point of the carousel widget component exposes a `Carousel` class on the global `window` object.

> ./src/js/Carousel.js

The Carousel class itself is an ES6 class which renders the carousel widget in the specified element and takes care of updating the carousel when a user clicks on either the `prev` or `next` buttons. Whenever a new image needs to be centered, it resets the images list (based on the left/right offset), destroys the carousel instance and re-initialises it.

> ./src/js/utils.js

Common utility functions have been separated out in the `utils` module.

> ./src/js/constants.js

Carousel widget constant values (like associated CSS classes) are saved in the `constants` module.

> ./src/css/carousel.css

CSS styles for the app and carousel widget have been separated out.

> ./test/Carousel.test.js

Contains the tests for some of the methods of the carousel widget component.

Meaningful comments have been added throughout the codebase for better understanding.

## Installation and demo

Run

```
npm install
```

To install all of the project's dev dependencies.

Then run

```
npm start
```

This will 

- Bundle all the modules using `Webpack`.
- Start running the tests using `Jest`.
- Start a demo server at port `3000` ([localhost:3000](http://localhost:3000/)).
- And serve the included `index.html` demo file.
