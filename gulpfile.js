let gulp = require('gulp');
let minifyCss = require("gulp-minify-css");
let uglify = require("gulp-uglify");
let webserver = require('gulp-webserver');
let gutil = require('gulp-util');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

gulp.task('http', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: false
    }));
});

gulp.task('minify-css', function () {
    gulp.src('./*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify-js', function () {
    gulp.src('./support-mail.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('./dist'))
});
gulp.task('minify-watch', () => {
  gulp.watch('*.js', ['minify-js']);
  gulp.watch('*.scss', ['minify-css']);
});

gulp.task('server', () => {
  gulp.run('minify-watch');
  gulp.run('http');
});

gulp.task('default', ['minify-css', 'minify-js']);