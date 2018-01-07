'use strict';

let gulp = require('gulp');

// Watching
let watch = function(config) {
  return gulp.task('watch', () => {
    gulp.watch(config.resources.scripts, ['scripts:build', 'scripts:lint']);
    gulp.watch(config.resources.styles, ['styles:build', 'styles:lint']);
  });
};

module.exports = watch;