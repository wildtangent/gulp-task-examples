'use strict';

let gulp = require('gulp');
let runSequence = require('run-sequence');

// Default task
let defaultTask = function() {
  return gulp.task('default', (callback) => {
    return runSequence('scripts:build', 'scripts:lint', 'styles:lint', 'watch', callback);
  });
};

module.exports = defaultTask;