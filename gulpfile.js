'use strict';

let scriptsBuild = require('./tasks/scripts-build');
let scriptsLint = require('./tasks/scripts-lint');
let stylesLint = require('./tasks/styles-lint');
let stylesBuild = require('./tasks/styles-build');
let watch = require('./tasks/watch');
let defaultTask = require('./tasks/default');

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

// Set up imported tasks
scriptsBuild(config);
scriptsLint(config);
stylesBuild(config);
stylesLint(config);
watch(config);
defaultTask(config);