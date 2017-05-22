'use strict';

// Project Options
var MARKET = "en";
var PROJECT_NAME = "project-name";


var gulp  = require('gulp');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var pump = require('pump');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var del = require('del');
var zip = require('gulp-zip');
var uncss = require('gulp-uncss');


// Image compression
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');



// File Paths

var DIST_PATH = 'public/_build/elandww/_assets/' + PROJECT_NAME;

var DIST_PATH_HTML = 'public/_build/elandww/' + MARKET + '/' + PROJECT_NAME;

var PATH_HTML = 'public/_markets/' + MARKET + '/**/*';

var SCRIPTS_PATH = 'public/scripts/*.js';
var SCRIPTS_PATH_PLUGINS = 'public/scripts/plugins/*.js';
var CSS_PATH = 'public/css/**/*.css';
var SCSS_PATH = 'public/scss/**/*.scss';
var IMGAGES_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';









// Styles for Solid CSS
/*

 gulp.task('solid-styles', function (cb) {
 console.log('----------Starting Styles Task----------');

 pump([
 gulp.src(['public/css/reset.css', CSS_PATH]),
 plumber(function (err) {
 console.log('Styles Task Error');
 console.log(err);
 this.emit('end');
 }),
 sourcemaps.init(),
 autoprefixer(),
 concat('styles.css'),
 cleanCSS(),
 sourcemaps.write('.'),
 gulp.dest(DIST_PATH),
 livereload()
 ],
 cb
 );

 });
 */






// Styles for SCSS

gulp.task('styles', (cb) => {
    console.log('----------Starting Styles Task----------');

    pump([
            gulp.src(['public/scss/styles.scss']),
            plumber(function (err) {
                console.log('Styles Task Error');
                console.log(err);
                this.emit('end');
            }),
            autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }),

            sourcemaps.init(),
            sass({sourcemap: true, style: 'compact', outputStyle:'compressed'}).on('error', sass.logError),
            // uncss({
            //     html: ['public/**/*.html']
            // }),


            sourcemaps.write('.'),
            gulp.dest(DIST_PATH + '/css'),
            livereload()
        ],

        cb
    );




});



gulp.task('custom-styles', (cb) => {
    console.log('----------Starting Custom Styles Task----------');

    pump(
        [
            gulp.src(['public/_markets/' + MARKET + '/scss/custom.scss']),
            plumber(function (err) {
                console.log('Custom Styles Task Error');
                console.log(err);
                this.emit('end');
            }),
            sourcemaps.init(),
            autoprefixer(),
            concat('custom.css'),

            sass({sourcemap: true, style: 'compact', outputStyle:'compressed'}).on('error', sass.logError),
            // uncss({
            //     html: ['public/**/*.html']
            // }),

            sourcemaps.write('.'),
            gulp.dest(DIST_PATH_HTML + '/css'),
            livereload()
        ],

        cb
    );




});



gulp.task('fa-styles', function (cb) {
    console.log('----------Starting FA Styles Task----------');

    pump([
            gulp.src(['public/_markets/' + MARKET + '/fa/*.css']),
            plumber(function (err) {
                console.log('FA Styles Task Error');
                console.log(err);
                this.emit('end');
            }),
            sourcemaps.init(),
            autoprefixer(),
            concat('fa.css'),
            cleanCSS(),
            sourcemaps.write('.'),
            gulp.dest(DIST_PATH_HTML + '/fa'),
            livereload()
        ],
        cb
    );

});


gulp.task('fonts', function(cb) {
    pump([
            gulp.src([
                'node_modules/bootstrap-sass/assets/fonts/**/*']),
            gulp.dest(DIST_PATH + '/fonts'),
        ],
        cb
    );
});



// Scripts

gulp.task('scripts', (cb) => {
    console.log('----------Starting Scripts Task----------');

    pump([
            gulp.src(SCRIPTS_PATH),
            plumber(function (err) {
                console.log('Scripts Task Error');
                console.log(err);
                this.emit('end');
            }),
            // sourcemaps.init(),
            // babel({
            //     presets: ['es2015']
            // }),
            uglify(),
            concat('scripts.js'),
            // sourcemaps.write('.'),
            gulp.dest(DIST_PATH + '/js'),

            livereload()



        ],


        cb
    );

});


gulp.task('custom-scripts', (cb) => {
    console.log('----------Starting Scripts Task----------');

    pump([
            gulp.src(['public/_markets/' + MARKET + '/js/custom.js']),
            plumber(function (err) {
                console.log('Scripts Task Error');
                console.log(err);
                this.emit('end');
            }),
            sourcemaps.init(),
            babel({
                presets: ['es2015']
            }),
            uglify(),
            concat('custom.js'),
            sourcemaps.write('.'),

            gulp.dest(DIST_PATH_HTML + '/js'),

            livereload()



        ],


        cb
    );

});



gulp.task('fa-scripts', (cb) => {
    console.log('----------Starting Scripts Task----------');

    pump([
            gulp.src(['public/_markets/' + MARKET + '/fa/wforms.js', 'public/_markets/' + MARKET + '/fa/prefill.js', 'public/_markets/' + MARKET + '/fa/*.js']),
            plumber(function (err) {
                console.log('Scripts Task Error');
                console.log(err);
                this.emit('end');
            }),
            sourcemaps.init(),

            uglify(),
            concat('fa.js'),
            sourcemaps.write('.'),

            gulp.dest(DIST_PATH_HTML + '/fa'),

            livereload()



        ],


        cb
    );

});




gulp.task('scripts-plugin', (cb) => {
    console.log('----------Starting Plugin Task----------');

    pump(
        [
            gulp.src(['public/scripts/plugins/jquery.js', SCRIPTS_PATH_PLUGINS] ),
            plumber(function (err) {
                console.log('Plugin Task Error');
                console.log(err);
                this.emit('end');
            }),
            sourcemaps.init(),

            uglify(),
            concat('plugins.js'),
            sourcemaps.write('.'),
            gulp.dest(DIST_PATH + '/js'),

            livereload()
        ],

        cb
    );

});


// Images

gulp.task('images', (cb) => {
    console.log('----------Starting Images Task----------');
    pump([
            gulp.src(IMGAGES_PATH),
            imagemin(
                [
                    imagemin.gifsicle(),
                    imagemin.jpegtran(),
                    imagemin.optipng(),
                    imagemin.svgo(),
                    imageminPngquant(),
                    imageminJpegRecompress()
                ]
            ),
            gulp.dest(DIST_PATH + '/images'),

        ],
        cb
    );
});


// Clean

gulp.task('clean', () => {
    console.log('----------Starting Clean Task----------');

    return del.sync([
        DIST_PATH
    ])

});



gulp.task('export', (cb) =>{

    pump([
            gulp.src('public/_build/**/*'),
            zip('website.zip'),
            gulp.dest('./public')
        ],
        cb
    );
});



gulp.task('html', (cb) =>{

    pump([
            gulp.src(['public/_markets/' + MARKET + '/index.html']),
            htmlmin({
                collapseWhitespace: true,
                removeComments: true,
                removeEmptyAttributes: false,
                removeEmptyElements: false
                //lint: lint
            }),
            concat('index.html'),

            gulp.dest(DIST_PATH_HTML),
            livereload()

        ],
        cb
    );
});



// Default

gulp.task('default',['clean', 'html', 'images', 'styles', 'custom-styles', 'fa-styles', 'scripts','custom-scripts', 'fa-scripts', 'scripts-plugin', 'fonts'], () => {
    console.log('----------Starting Default Task----------');

});

// Watch

gulp.task('watch', ['default'], () => {
    console.log('----------Starting Watch Task----------');
    require('./server.js');
    livereload.listen();
    gulp.watch(PATH_HTML, ['html']);
    gulp.watch(IMGAGES_PATH, ['images']);
    gulp.watch(SCRIPTS_PATH, ['scripts']);

    gulp.watch('public/_markets/' + MARKET + '/js/custom.js', ['custom-scripts']);
    gulp.watch('public/_markets/' + MARKET + '/fa/*.js', ['fa-scripts']);

    gulp.watch(SCRIPTS_PATH_PLUGINS, ['scripts-plugin']);
    gulp.watch(SCSS_PATH, ['styles']);

    gulp.watch('public/_markets/' + MARKET + '/scss/*.scss', ['custom-styles']);
    gulp.watch('public/_markets/' + MARKET + '/fa/*.css', ['fa-styles']);

    // gulp.watch(CSS_PATH, ['styles']);


});
