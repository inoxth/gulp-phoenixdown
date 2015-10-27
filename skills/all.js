var gulp = require('gulp');
var merge = require('merge-stream');

module.exports = function(tasks) {
  var options = {
    tasks: tasks || []
  };

  var task = function() {
    var merged = merge();

    options.tasks.map(function(childTask) {
      merged.add(childTask());
    });

    return merged;
  };

  return task;
};
