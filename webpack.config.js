// Webpack bundling config

const path = require('path');
const config = {
    entry: './src/js/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'carousel.min.js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /.js?$/,
                loader: 'babel-loader'
            }
        ]
    }
};

module.exports = config;