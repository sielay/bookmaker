var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    gzip = require('gulp-gzip'),
    rename = require('gulp-rename');


gulp.task('dist', function() {
    gulp.src('./index.js')
        .pipe(uglify())
        .pipe(rename('bookmaker.min.js') )
        .pipe(gulp.dest('dist'))
        .pipe(gzip())
        .pipe(rename('bookmaker.min.js.gz') )
        .pipe(gulp.dest('dist'));
});