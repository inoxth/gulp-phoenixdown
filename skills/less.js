var gulp = require('gulp');
var less = require('gulp-less');

module.exports = function(src, dest) {
  var options = {
    src: src || 'resources/assets/less/*.less',
    dest: dest || 'public/css'
  };

  var task = function() {
    return gulp.src(options.src)
      .pipe(less())
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
