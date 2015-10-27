module.exports = {
  config: require('./config'),
  all: require('./skills/all'),
  clean: require('./skills/clean'),
  concat: require('./skills/concat'),
  copy: require('./skills/copy'),
  angularTemplateCache: require('./skills/angular-template-cache'),
  browserify: require('./skills/browserify'),
  browserSync: require('./skills/browser-sync'),
  jshint: require('./skills/jshint'),
  less: require('./skills/less'),
  version: require('./skills/version')
}
