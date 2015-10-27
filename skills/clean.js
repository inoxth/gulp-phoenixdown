var del = require('del');
var gulp = require('gulp');

module.exports = function(src) {
  var options = {
    src: src
  };

  var task = function() {
    return del(options.src);
  }

  return task;
};
