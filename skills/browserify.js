var browserify = require('browserify');
var watchify = require('watchify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var source = require('vinyl-source-stream');

// Share cache across browserify
var cache = {};
var packageCache = {};

// Dictionary of watched source,
// that should be skipped by normal browserify task.
var watchList = {};

module.exports = function(src, dest) {
  var options = {
    src: src || './resources/assets/js/app.js',
    dest: dest || 'public/js'
  };

  var task = function(callback, watch) {
    if (watchList[options.src] == true) {
      gutil.log('Already bundled by watchify');
      callback();
      return;
    }

    var bundler = browserify({
      entries: [options.src],
      debug: true,
      cache: cache,
      packageCache: packageCache
    });

    if (watch) {
      watchList[options.src] = true;
      bundler = watchify(bundler, { poll: 500 });
    }

    function rebundle() {
      gutil.log('Bundling', gutil.colors.cyan(src));

      return bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
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
