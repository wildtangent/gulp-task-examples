'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({camelize: true});

// SCSS Linting
let stylesLint = function(config) {
  return gulp.task('styles:lint', () => {
    return gulp.src(config.resources.styles)
      .pipe(plugins.sassLint())
      .pipe(plugins.sassLint.format())
      .pipe(plugins.sassLint.failOnError());
  });
};

module.exports = stylesLint;