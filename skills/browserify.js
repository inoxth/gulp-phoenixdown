var browserify = require('browserify');
var watchify = require('watchify');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var path = require('path');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// Share cache across browserify
var cache = {};
var packageCache = {};

// Dictionary of watched source,
// that should be skipped by normal browserify task.
var watchList = {};

module.exports = function(src, dest, uglify) {
  var options = {
    src: src || './resources/assets/js/app.js',
    dest: dest || 'public/js',
    uglify: uglify || false,
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

      var pipe = bundler.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(path.basename(options.src)));

      if (options.uglify) {
        pipe.pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write(options.dest));
      }

      return pipe.pipe(gulp.dest(options.dest));
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

  task.uglify = function(uglify) {
    options.uglify = (uglify !== null) ? uglify : true;
    return task;
  }

  task.watch = function(watch) {
    return task(null, true);
  }

  return task;
};
