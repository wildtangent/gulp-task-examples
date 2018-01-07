'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({camelize: true});
let errorHandler = require('./error-handler');

// SCSS Linting
let stylesBuild = function(config) {
  return gulp.src(config.resources.styles)
          .pipe(plugins.sass(config.scss))
          .on('error', errorHandler())
          .pipe(gulp.dest(config.output.styles));
};

module.exports = stylesBuild;