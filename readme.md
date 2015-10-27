# Phoenixdown

Phoenixdown provides a simple-but-fantasy-ish API for defining basic Gulp tasks for your (especially Laravel) web application.

However, instead of providing all new API style like [Elixir](https://github.com/laravel/elixir), we just provide a simple functions to use will Gulp.

If you're eliminated, [Elixir](https://github.com/laravel/elixir) can't help you, but [Phoenix Down](https://github.com/inoxth/gulp-phoenixdown) can.

## Installation

First, add `gulp-phoenixdown` as an dependency in `devDependencies` of your `package.json` file, and run `npm install`.

## Usage

Require `gulp-phoenixdown` in your `gulpfile.js`, then just "cast" it:

```js
var gulp = require('gulp');
var cast = require('gulp-phoenixdown');

gulp.task('browserify', cast.browserify('./resources/assets/js/app.js').to('./public/js'));
gulp.task('less', cast.less('./resources/assets/less/app.less').to('./public/css'));
```

That's it! We just provide skills: the functions to create common tasks easily. However, if you want more tasks, you can just use Gulp directly.

## Built-in skills

* angularTemplateCache
* all
* browserSync
* browserify
* clean
* concat
* copy
* jshint
* less
* version

### angularTemplateCache

Make template cache for AngularJS, from `src` to `dest`.

```js
gulp.task('template', cast.angularTemplateCache(src).to(dest));
```

### all

Cast many skills at once.

```js
gulp.task('copy', cast.all(
    cast.copy(src1).to(dest1),
    cast.copy(src2).to(dest2),
    cast.copy(src3).to(dest3),
));
```

### browserSync

To start the server:

```js
cast.browserSync.startProxy(server);
```

You may omit the `server` argument, and it will try to use value from `APP_URL` or `APP_DOMAIN` of `.env` file in the project.

To reload the server:

```js
cast.browserSync.reload();
```

### browserify

Bundle JavaScripts with [Browserify](https://github.com/substack/browserify-handbook).

Declaring the task:

```js
gulp.task('browserify', cast.browserify(src).to(dest));
```

Or call in `watch` task:

```js
cast.browserify(src).to(dest).watch();
```

### clean

```js
gulp.task('clean', cast.clean(src));
```

### concat

```js
gulp.task('concat', cast.concat(src).to(dest));
```

### copy

```js
gulp.task('copy', cast.copy(src).to(dest));
```

### jshint

Lint JavaScript files with [JSHint](http://jshint.com/about/).

```js
gulp.task('jshint', cast.jshint(src));
```

### less

Compile [LESS](http://lesscss.org/) files from `src` to css into `dest` directory.

```js
gulp.task('less', cast.less(src).to(dest));
```

### version

```js
gulp.task('version', cast.version(src).to(dest));
```
