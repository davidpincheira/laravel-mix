const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.scripts(
    ['resources/js/jquery.js', //dependen en cascada, por eso es importante que se mantenga el orden.
    'resources/js/bootstrap.js',
    'resources/js/toastr.js',
    'resources/js/vue.js',
    'resources/js/axios.js',
    'resources/js/app.js'], 
    'public/js/app.js')
    .styles([
        'resources/css/bootstrap.css',
        'resources/css/toastr.css'
    ], 'public/css/app.css');
