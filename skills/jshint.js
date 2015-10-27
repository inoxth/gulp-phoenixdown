var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

module.exports = function(src) {
  var options = {
    src: src || 'resources/assets/js/**/*.js'
  };

  var task = function() {
    return gulp.src(options.src)
      .pipe(jshint())
      .pipe(jshint.reporter(options.stylish));
  };

  task.from = function(src) {
    options.src = src;
    return task;
  };

  return task;
};
