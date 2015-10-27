# Phoenixdown

Phoenixdown provides a simple-but-fantasy-ish API for defining basic Gulp tasks for your (especially Laravel) web application.

However, instead of providing all new API style like Elixir, we just provide a simple functions to use will Gulp.

If you're eliminated, Elixir can't help you, but Phoenix Down can.

## Installation

First, `phoenixdown` as an dependency in `devDependencies` of your `package.json` file, and run `npm install`.

## Usage

Require `phoenixdown` in your `Gulpfile.js`, then just cast it:

    var gulp = require('gulp');
    var cast = require('phoenixdown');
    
    gulp.task('browserify', cast.browserify('./resources/assets/js/app.js'));
    gulp.task('less', cast.less('./resources/assets/less/app.less'));

## Built-in skills

* angularTemplateCache
* browserSync
* browserify
* jshint
* less
* version

### angularTemplateCache

Make template cache for AngularJS, from `src` to `dest`.

    gulp.task('template', cast.angularTemplateCache(src).to(dest));

### browserSync

To start the server:

    cast.browserSync.startProxy(server);

To reload the server:

    cast.browserSync.reload();

### browserify

Declaring the task:

    gulp.task('browserify', cast.browserify(src).to(dest));

Or call in `watch` task:

    cast.browserify(src).to(dest).watch();

### jshint

Lint JavaScript files from `src`.

    gulp.task('jshint', cast.jshint(src));

### less

Compile LESS files from `src` to css into `dest` directory.

    gulp.task('less', cast.less(src).to(dest));

### version

    gulp.task('version', cast.version(src).to(dest));
