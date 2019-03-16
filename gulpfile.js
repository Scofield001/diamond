const gulp = require( 'gulp' ),
    autoprefixer = require ('gulp-autoprefixer'),
    concat = require( 'gulp-concat' ),
    cssMin = require('gulp-csso'),
    rename = require('gulp-rename'),
    sass = require( 'gulp-sass' ),
    tinify = require('gulp-tinify'),
    pug = require('gulp-pug'),
    gcmq = require('gulp-group-css-media-queries'),
    normalize = require('node-normalize-scss'),

    API_KEY_TINIFY = '',

    style = [
        'sass/**/*.scss',
    ],
    views = ['views/*.pug'],
    img = [
        'img/**/*',
        '!img/original/*',
    ];

gulp.task('sass', function () {
    gulp.src( style )
        .pipe( concat( 'style.scss' ))
        .pipe( sass({includePaths: normalize.includePaths}))
        .pipe(autoprefixer({
            browsers: ['last 11 version'],
            cascade: false,
        }))
        .pipe(gcmq())
        .pipe(gulp.dest( 'style/' ))
        .pipe(cssMin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/style/'))
        .pipe(gulp.dest('style/'));

});

gulp.task('pug', function buildHTML() {
    gulp.src( views )
        .pipe(pug())
        .pipe(gulp.dest('dist/'));
    gulp.src( views )
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./'));
});

gulp.task('tinify', function() {
    gulp.src(img, {nodir: true})
        .pipe(tinify(API_KEY_TINIFY))
        .pipe(gulp.dest('dist/img/'));
});