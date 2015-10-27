var browserSync = require('browser-sync');
var config = require('../config.js');

module.exports = {
  reload: browserSync.reload,
  startProxy: function(proxy) {
    browserSync.init({
      proxy: proxy || config.server
    });
  }
};
