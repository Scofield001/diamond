const { src, dest, parallel } = require( 'gulp' ),
    autoprefixer = require ('gulp-autoprefixer'),
    concat = require( 'gulp-concat' ),
    cssMin = require('gulp-csso'),
    rename = require('gulp-rename'),
    sass = require( 'gulp-sass' ),
    tinify = require('gulp-tinify'),
    pug = require('gulp-pug'),
    gcmq = require('gulp-group-css-media-queries'),
    htmlMin = require('gulp-htmlmin'),
    normalize = require('node-normalize-scss'),

    API_KEY_TINIFY = 'uzTyAcebFhJsMhoopeXgQBH9oU19CHH0',

    style = ['sass/**/*.scss'],
    views = ['views/*.pug'],
    images = ['img/**/*'];

function css() {
    return src( style )
        .pipe( concat( 'style.scss'))
        .pipe( sass({includePaths: normalize.includePaths}))
        .pipe(autoprefixer({
            browsers: ['last 11 version'],
            cascade: false,
        }))
        .pipe(gcmq())
        .pipe(dest('style/'))
        .pipe(cssMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('dist/style/'))
        .pipe(dest('style/'))

}

function html() {
    return src( views )
        .pipe(pug({pretty: true}))
        .pipe(dest('./'))
        .pipe(htmlMin({collapseWhitespace: true}))
        .pipe(dest('dist/'))
}

function img() {
    return src(images, {nodir: true})
        .pipe(tinify(API_KEY_TINIFY))
        .pipe(dest('dist/img/'))
}

exports.html = html;
exports.css = css;
exports.img = img;
exports.default = parallel(html, css);