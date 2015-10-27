var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');

module.exports = function(src, dest) {
  var options = {
    src: src || 'resources/assets/templates/**/*.html',
    dest: dest || 'public/js'
  };

  var task = function() {
    return gulp.src(options.src)
      .pipe(templateCache({
        standalone: true
      }))
      .pipe(gulp.dest(options.dest));
  };

  task.from = function(src) {
    options.src = src;
    return task;
  };

  task.to = function(dest) {
    options.dest = dest;
    return task;
  };

  return task;
};
