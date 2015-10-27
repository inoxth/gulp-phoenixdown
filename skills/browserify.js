var browserify = require('browserify');
var watchify = require('watchify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var source = require('vinyl-source-stream');
var browserSync = require('./browser-sync');

module.exports = function(src, dest) {
  var options = {
    src: src || './resources/assets/js/app.js',
    dest: dest || 'public/js'
  };

  // Share cache across browserify
  var cache = {};
  var packageCache = {};

  var task = function(callback, watch) {
    var bundler = browserify({
      entries: [options.src],
      debug: true,
      cache: cache,
      packageCache: packageCache
    });

    if (watch) {
      bundler = watchify(bundler, { poll: 500 });
    }

    function rebundle() {
      gutil.log('Bundling', gutil.colors.cyan(src));

      return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .on('end', function() {
          if (watch) {
            browserSync.reload();
          }
        })
        .pipe(source(path.basename(options.src)))
        .pipe(gulp.dest(options.dest));
    }

    bundler.on('update', rebundle);
    bundler.on('log', gutil.log);

    return rebundle();
  }

  task.from = function(src) {
    options.src = src;
    return task;
  }

  task.to = function(dest) {
    options.dest = dest;
    return task;
  }

  task.watch = function(watch) {
    return task(null, true);
  }

  return task;
};
