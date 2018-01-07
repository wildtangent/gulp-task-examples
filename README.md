

# Set up your new project with NPM

```shell
mkdir -p ~/Sites/experiments/linting-example
cd ~/Sites/experiments/linting-example
npm init
```

# Make a source directory structure

```shell
mkdir -p src/js
touch src/js/index.js
echo 'alert("hello linter")' > src/js/index.js
```

# Linting JavaScript

```shell
npm install --save-dev jshint jshint-stylish
```

Add the following command to your package.json under "scripts"

```json
"scripts" {
  // Other scripts...
  "lint-js": "jshint --reporter=node_modules/jshint-stylish src/js"
  // Other scripts
}
```

```shell
npm run lint-js
```

# Linting SCSS/SASS

```shell
npm install --save-dev sass-lint
mkdir -p src/scss
touch src/scss/styles.scss
```

Add the following command to your package.json under "scripts"
(don't forget the commas for the previous lines if they were previously the last one)

```json
"scripts" {
  // Other scripts...
  "lint-scss": "sass-lint -c .sass-lint.yml -v -q"
  // Other scripts
}
```

Write some invalid SCSS into src/scss/styles.scss e.g.

#js-some-id {
  .some-class__myclass {
    .mega-nested-class {
      background-color: black;
      color: 'red';
    }
  }
}


```shell
npm run lint-scss
```

# Gulp
Gulp is a task runner which allows you to pipe files through multiple commands and handle the outcomes
It also allows you to watch files for changes so you can easily run tasks during development

There are hundreds of gulp tasks and plugins in the ecosystem. We will use it to watch and  lint our files automatically



```shell
npm install --save-dev gulp gulp-load-plugins
npm install --save-dev gulp-jshint
npm install --save-dev gulp-sass-lint
npm install
mkdir -p tasks
touch gulpfile.js
```

Copy contents of `gulpfile.js`

```shell
gulp scripts:lint
gulp styles:lint
```

# Gulp Automation

```shell
npm install --save-dev run-sequence
```


# Linting in the editor
## SublimeLinter

Install JSHint and SASS-Lint globally

```shell
npm install -g jshint
npm install -g sass-lint
```

### Install SublimeLinter
Cmd-Shift-P
...install
SublimeLinter

### Install JSHint for SublimeLinter
Cmd-Shift-P
...install
SublimeLinter-jshint

### Install SASS-Lint for SublimeLinter
Cmd-Shift-P
...install
SublimeLinter-contrib-sass-lint

Tools > SublimeLinter > ...



# Babel
Babel converts ES6/7 into ES5 and adds polyfill support for legacy browsers

```shell
npm install --save-dev babel-core babel-preset-env
```

### Create a `.babelrc`

```json
{
  "presets": [
    ["env", {
      "debug": true,
      "targets": {
        "browsers": [
          "last 2 versions",
          "safari >= 8",
          "ie >= 10",
          "ff >= 20",
          "ios 6",
          "android 4"
        ]
      }
    }]
  ]
}
```

# Browserify

We also need to install browserify or webpack to convert AMD and CommonJS modules into browser-runnable code

```shell
npm install --save-dev browserify babelify gulp-notify
```

```javascript
gulp.task('scripts:build', () => {
  browserify(config.resources.entrypoint)
    .transform('babelify', {
      presets: ['env']
    })
    .bundle()
    .pipe(fs.createWriteStream(config.output.scripts));
});
```

# Converting into modules
Gulpfile is getting a bit big. Lets break it out into modules


# Add final Style builds

```javascript
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
```