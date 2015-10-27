var gulp = require('gulp');

module.exports = function(src, dest) {
  var options = {
    src: src,
    dest: dest
  };

  var task = function() {
    return gulp.src(options.src)
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
