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
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename');



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
        sass: 'src/styles/scss/*.scss',
        image: 'src/images/**/*.*',
        font: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        sass: 'src/styles/scss/**/*.*',
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
    port: 1414,
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

gulp.task('pre-js', ['js'], function () {
    var scripts = [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/typeahead.js/dist/typeahead.jquery.min.js',
        'bower_components/matchHeight/dist/jquery.matchHeight-min.js',
        'build/js/app.js'
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
        .pipe(autoprefix({
            browsers: ['last 30 versions', '> 1%', 'ie 8', 'ie 9'],
            cascade: true
        }))
        //.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', ['sass'], function () {
    var styles = [
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'src/styles/lib/font-awesome/font-awesome.min.css',
        'src/styles/lib/themify-icons/themify-icons.css',
        'build/css/main.css'
    ];

    var stream = gulp
        .src(styles)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('lib-styles.css'))
        .pipe(browserSync.reload({stream: true}))
    
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
            .pipe(rename({dirname: ''}))
            .pipe(gulp.dest(path.build.font));
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
    gulp.watch(path.watch.sass, ['css']);    
    gulp.watch(path.watch.image, ['image']);
    gulp.watch(path.watch.font, ['font']);
});



/*=====================================================
    DEFAULT TASK
=====================================================*/
gulp.task('default', ['build', 'webserver', 'watch']);