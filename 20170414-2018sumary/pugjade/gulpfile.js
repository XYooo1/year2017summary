var pug = require('gulp-pug');
var pug1 = require('pug');
var browsersync = require('browser-sync').create();
var gulp = require('gulp');

gulp.task('go', ['jade'], function() {
    gulp.watch('./pug/*.pug', ['jade']);
    browsersync.init({
        port: 3333,
        server: {
            baseDir: './',
            directory: true
        }
    });
});

gulp.task('jade', function buildHTML() {
    return gulp.src('./pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./html/'))
        .on('end', browsersync.reload);
});
