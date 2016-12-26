// Imports ====================================================================
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const clean = require('gulp-clean');
const typescript = require('gulp-typescript');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const stylus = require('gulp-stylus');
const nib = require('nib');
const imagemin = require('gulp-imagemin');

// Configurations =============================================================
const scripts = {
  ts: {
    src: 'front/src/guess-word-app/**/*.ts',
    dest: 'front/dist/guess-word-app/'
  },
  js: {
    src: 'front/src/scripts/*.js',
    dest: 'front/dist/scripts/'
  }
};

const styles = {
  src: 'front/src/{styles/**/*.styl,guess-word-app/**/*.styl}',
  dest: 'front/dist/'
};

const templates = {
  src: 'front/src/guess-word-app/**/*.html',
  dest: 'front/dist/guess-word-app/'
};

const images = {
  src: 'front/src/images/**/*.{jpg,jpeg,png,svg}',
  dest: 'front/dist/images/'
};

const dependencies = {
  dest: './front/dist/vendor/',
  libs: [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/materialize-css/dist/js/materialize.min.js',
    'node_modules/chart.js/dist/Chart.min.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.min.js',
    'node_modules/zone.js/dist/zone.min.js',
    'node_modules/socket.io-client/dist/socket.io.min.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/**/*',
    'node_modules/zone.js/dist/zone.min.js',
    'node_modules/core-js/client/**/*',
    'node_modules/reflect-metadata/**/*',
    'node_modules/@angular/common/bundles/**/*',
    'node_modules/@angular/core/bundles/**/*',
    'node_modules/@angular/compiler/bundles/**/*',
    'node_modules/@angular/forms/bundles/**/*',
    'node_modules/@angular/http/bundles/**/*',
    'node_modules/@angular/platform-browser/bundles/**/*',
    'node_modules/@angular/platform-browser-dynamic/bundles/**/*',
    'node_modules/@angular/router/bundles/**/*',
    'node_modules/materialize-css/dist/css/materialize.min.css',
    'node_modules/materialize-css/dist/fonts/**/*'
  ]
};

// Options ====================================================================
const tsProject = typescript.createProject('front/src/guess-word-app/tsconfig.json');

const babelOptions = {
  presets: ['es2015'],
  minified: true,
  comments: false
};

const htmlOptions = {
  collapseWhitespace: true,
  caseSensitive: true
};

const stylusOptions = {
  compress: true,
  use: [nib()]
};

const imageminOptions = {
  progressive: true
};

// Tasks ======================================================================
// Compiles typescript to js
gulp.task('typescript', _=> { 
  const tsResult = tsProject.src()
    .pipe(plumber())
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest(scripts.ts.dest)); 
});

// Compiles es6 to es5 
gulp.task('babel', _=> { 
  return gulp.src(scripts.js.src)
    .pipe(plumber())
    .pipe(babel(babelOptions))
    .pipe(gulp.dest(scripts.js.dest))
});

// Compiles stylus to css
gulp.task('stylus', _=> {
  return gulp.src(styles.src)
    .pipe(plumber())
    .pipe(stylus(stylusOptions))
    .pipe(gulp.dest(styles.dest))
});

// Minifies HTML files 
gulp.task('html', _=> { 
  return gulp.src(templates.src)
    .pipe(plumber())
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest(templates.dest))
});

// Copies and minifies images
gulp.task('images', _=> {
  return gulp.src(images.src)
    .pipe(imagemin(imageminOptions))
    .pipe(gulp.dest(images.dest));
});

// Cleans dist folder
gulp.task('clean', _=> {
  return gulp.src('./front/dist/', {
    read: false
  }).pipe(clean());
});

// Copies vendor libraries
gulp.task('libs', ['clean'], _=> {
  return gulp.src(dependencies.libs, {
    base: './node_modules/'
  }).pipe(gulp.dest(dependencies.dest));
});

// Watch
gulp.task('watch', _=> {
  gulp.watch(scripts.ts.src, ['typescript']);
  gulp.watch(scripts.js.src, ['babel']);
  gulp.watch(templates.src, ['html']);
  gulp.watch(styles.src, ['stylus'])
});

gulp.task('build', _=> {
  runSequence('clean', ['typescript', 'html', 'babel', 'stylus']);
}); 

gulp.task('make', _=> {
  runSequence('clean', ['libs', 'images', 'build']);
});

gulp.task('default', ['typescript', 'html', 'babel', 'stylus', 'watch'], _=> {});
