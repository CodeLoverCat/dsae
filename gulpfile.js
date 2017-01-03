'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    concat = require('gulp-concat'),
    imageop = require('gulp-image-optimization'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    cleanCSS = require('gulp-clean-css');



var path = {
    build: { // production
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        image: 'build/images/',
        font: 'build/fonts/'
    },
    src: { // development
        html: 'src/*.html',
        js: 'src/js/*.js',
        sass: 'src/scss/*.scss',
        image: 'src/images/**/*.*',
        font: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        sass: 'src/scss/**/*.*',
        image: 'src/images/**/*.*',
        font: 'src/fonts/**/*.*'
    }
};


/*=====================================================
    SERVER
=====================================================*/
var config = {
    server: {
        baseDir: "build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend",
    watchTask: true
};

gulp.task('webserver', function () {
    browserSync(config);
});



/*=====================================================
    HTML
=====================================================*/
gulp.task('html', function () {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});



/*=====================================================
    JS
=====================================================*/
gulp.task('js', function () {
    return gulp.src(path.src.js)
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('pre-js', function () {
    var scripts = [
        //Bower and Other JS file will be here.
    ];

    var stream = gulp
        .src(scripts)
        .pipe(concat('prototype.js'));

    return stream
        .pipe(gulp.dest(path.build.js));
});

/*=====================================================
    STYLES
=====================================================*/
gulp.task('sass', function () {
    return gulp.src(path.src.sass)
        .pipe(sassGlob())
        //.pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        //.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}))
});

gulp.task('css', function () {
    var styles = [
        //Bower and Other CSS file will be here.
    ];

    var stream = gulp
        .src(styles)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('main.css'))
        .pipe(reload({stream: true}))
    
    return stream
        .pipe(gulp.dest(path.build.css))
});



/*=====================================================
    IMAGES
=====================================================*/
gulp.task('image', function () {
    gulp.src(path.src.image)
        .pipe(imageop({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.image));
});



/*=====================================================
    FONTS
=====================================================*/
gulp.task('font', function() {
    return gulp.src(path.src.font)
		.pipe(gulp.dest(path.build.font))
});



/*=====================================================
    BUILD TASK
=====================================================*/
gulp.task('build', [
    'html',
    'js',
    'pre-js',
    'sass',
    'css',
    'image',
    'font'
]);



/*=====================================================
    WATCH
=====================================================*/
gulp.task('watch', function(){
    gulp.watch(path.watch.html, ['html']);
    gulp.watch(path.watch.js, ['js']);
    gulp.watch(path.watch.js, ['pre-js']);
    gulp.watch(path.watch.sass, ['sass']);
    gulp.watch(path.watch.sass, ['css']);
    gulp.watch(path.watch.image, ['image']);
    gulp.watch(path.watch.font, ['font']);
});



/*=====================================================
    DEFAULT TASK
=====================================================*/
gulp.task('default', ['build', 'webserver', 'watch']);