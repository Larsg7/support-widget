var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('http', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: false
    }));
})

gulp.task('default', ['http']);
