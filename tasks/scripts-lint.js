'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({camelize: true});

// JavaScript Linting
let scriptsLint = function(config) {
  return gulp.task('scripts:lint', () => {
    return gulp.src(config.resources.scripts)
      .pipe(plugins.jshint(config.jshint))
      .pipe(plugins.jshint.reporter('jshint-stylish'));
  });
};

module.exports = scriptsLint;