'use strict';

let plugins = require('gulp-load-plugins')({camelize: true});

let errorHandler = function() {
  return plugins.notify.onError(function(error) {
    console.error(error.message);
    return error.message;
  });
};

module.exports = errorHandler;