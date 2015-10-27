var del = require('del');
var gulp = require('gulp');
var rev = require('gulp-rev');
var vinylPaths = require('vinyl-paths');

module.exports = function(src, dest) {
  var options = {
    src: src,
    dest: dest,
    base: 'public'
  };

  var task = function() {
    var files = vinylPaths();

    del(options.dest);

    return gulp.src(options.src, {
      base: options.base
    }).pipe(gulp.dest(options.dest))
      .pipe(files)
      .pipe(rev())
      .pipe(gulp.dest(options.dest))
      .pipe(rev.manifest())
      .pipe(gulp.dest(options.dest));
  }

    task.from = function(src) {
    options.src = src;
    return task;
  };

  task.to = function(dest) {
    options.dest = dest;
    return task;
  };

  task.base = function(base) {
    options.base = base;
    return task;
  };

  return task;
};
