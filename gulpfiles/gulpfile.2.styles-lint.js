'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({camelize: true});

// Configuration for paths etc
let config = {
  resources: {
    scripts: ['./src/js/**/*.js'],
    styles: './src/scss/**/*.scss'
  },
  jshint: {
    esversion: 6
  }
};

// JavaScript Linting
gulp.task('scripts:lint', () => {
  return gulp.src(config.resources.scripts)
    .pipe(plugins.jshint(config.jshint))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

// SCSS Linting
gulp.task('styles:lint', () => {
  return gulp.src(config.resources.styles)
    .pipe(plugins.sassLint())
    .pipe(plugins.sassLint.format())
    .pipe(plugins.sassLint.failOnError());
});
