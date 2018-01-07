'use strict';

// Browserify/Babelify
let gulp = require('gulp');
let fs = require('fs');
let browserify = require('browserify');
let errorHandler = require('./error-handler');

let scriptsBuild = function(config) {
  return gulp.task('scripts:build', () => {
    browserify(config.resources.entrypoint)
      .transform('babelify', {
        presets: ['env']
      })
      .bundle()
      .on('error', errorHandler())
      .pipe(fs.createWriteStream(config.output.scripts));
  });
};

module.exports = scriptsBuild;