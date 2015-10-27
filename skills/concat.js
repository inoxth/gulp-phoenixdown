var gulp = require('gulp');
var concat = require('gulp-concat');
var path = require('path');

module.exports = function(src, dest) {
  var options = {
    src: src,
    dest: dest
  };

  var task = function() {
    return gulp.src(options.src)
      .pipe(concat(path.basename(options.dest)))
      .pipe(gulp.dest(path.dirname(options.dest)));
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
