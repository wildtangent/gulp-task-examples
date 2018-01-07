'use strict';

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({camelize: true});
let runSequence = require('run-sequence');
let browserify = require('browserify');
let fs = require('fs');

function errorHandler() {
  return plugins.notify.onError(function(error) {
    console.error(error.message);
    return error.message;
  });
}

// Configuration for paths etc
let config = {
  resources: {
    entrypoint: 'src/js/index.js',
    scripts: ['./src/js/**/*.js'],
    styles: './src/scss/**/*.scss'
  },
  jshint: {
    esversion: 6
  },
  output: {
    scripts: 'dist/js/app.js',
    styles: 'dist/css/app.css'
  },
};

// Browserify/Babelify
gulp.task('scripts:build', () => {
  browserify(config.resources.entrypoint)
    .transform('babelify', {
      presets: ['env']
    })
    .bundle()
    .on('error', errorHandler())
    .pipe(fs.createWriteStream(config.output.scripts));
});

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

// Watching
gulp.task('watch', () => {
  gulp.watch(config.resources.scripts, ['scripts:build', 'scripts:lint']);
  gulp.watch(config.resources.styles, ['styles:lint']);
});

// Default task
gulp.task('default', (callback) => {
  return runSequence('scripts:build', 'scripts:lint', 'styles:lint', 'watch', callback);
});

