// Load plugins
var
        gulp = require('gulp'),
        chmod = require('gulp-chmod'),
        less = require('gulp-less'),
        minifycss = require('gulp-minify-css'),
        uglify = require('gulp-uglify'),
        rimraf = require('gulp-rimraf'),
        concat = require('gulp-concat'),
        notify = require('gulp-notify'),
        cache = require('gulp-cache'),
        livereload = require('gulp-livereload');

var config = {
    // If you do not have the live reload extension installed,
    // set this to true. We will include the script for you,
    // just to aid with development.
    appendLiveReload: false,
    // Should CSS & JS be compressed?
    minifyCss: true,
    uglifyJS: true

}


/***********************************************************************
 * CSS Task, combine LESS source files into one CSS output file
 **********************************************************************/
gulp.task('css', function () {
    var stream = gulp
            .src('less/style.less')
            .pipe(less().on('error', notify.onError(function (error) {
                return 'Error compiling LESS: ' + error.message;
            })))
            //.pipe(chmod(666))
            .pipe(gulp.dest('css'));

    if (config.minifyCss === true) {
        stream.pipe(minifycss());
    }

    return stream
            .pipe(gulp.dest('css'))
            .pipe(livereload())
            .pipe(notify({message: 'Successfully compiled LESS'}));
});

/***********************************************************************
 * JS Task, combine Magento core JS, Bootstrap & Boilerplate JS and our
 * own custom scripts into one big JS file.
 **********************************************************************/
gulp.task('js', function () {
    var scripts = [
        'js/script.js'               // Our custom JS foo
    ];

    if (config.appendLiveReload === true) {
        scripts.push('src/js/livereload.js');
    }

    var stream = gulp
            .src(scripts)
            .pipe(concat('script.min.js'));

    if (config.uglifyJS === true) {
        stream.pipe(uglify({"mangle": false})); // Do not mangle because Magento core js files don't like that
    }

    return stream
            .pipe(gulp.dest('js'))
            .pipe(notify({message: 'Successfully compiled JavaScript', onLast: true}));
});

/***********************************************************************
 * Watch task
 **********************************************************************/
gulp.task('watch', function () {

    // Watch .less files
    gulp.watch('less/**/*.less', ['css']);

    // Watch .js files
    gulp.watch(['js/script.js'], ['js']);
});