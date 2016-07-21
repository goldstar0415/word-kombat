// Imports ====================================================================
const gulp = require('gulp');
const plumber = require('gulp-plumber');

const typescript = require('gulp-typescript');
const babel = require('gulp-babel');
const pug = require('gulp-pug');
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
  src: 'front/src/{styles/*.styl,guess-word-app/**/*.styl}',
  dest: 'front/dist/'
};

const templates = {
  src: 'front/src/guess-word-app/**/*.pug',
  dest: 'front/dist/guess-word-app/'
};

const images = {
  src: 'front/src/images/**/*.{jpg,jpeg,png,svg}',
  dest: 'front/dist/images/'
};

const dependencies = {
  js: {
    'jquery': 'jquery/dist/jquery.min.js',
    'materialize': 'materialize-css/dist/js/materialize.min.js'
  },
  css: {
    'materialize': 'materialize-css/dist/css/materialize.min.css'
  },
  font: {
    'roboto': 'materialize-css/dist/fonts/**/*'
  }
};

// Options ====================================================================
const tsProject = typescript.createProject('front/src/guess-word-app/tsconfig.json');

const babelOptions = {
  presets: ['es2015'],
  minified: true,
  comments: false
};

const pugOptions = {
  pretty: false
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
  return gulp.src(scripts.ts.src)
    .pipe(plumber())
    .pipe(typescript(tsProject))
    .pipe(gulp.dest(scripts.ts.dest))
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

// Compiles pug to html
gulp.task('pug', _=> {
  return gulp.src(templates.src)
    .pipe(plumber())
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(templates.dest))
});

// Copies and minifies images
gulp.task('images', _=> {
  return gulp.src(images.src)
    .pipe(imagemin(imageminOptions))
    .pipe(gulp.dest(images.dest));
});

// Copies vendor libraries
gulp.task('libs', _=> {

  // JavaScript
  for(let item in dependencies.js) {
    console.log(`${item} - ${dependencies.js[item]}`);
    gulp.src('./node_modules/'+ dependencies.js[item])
      .pipe(gulp.dest('./front/dist/scripts/vendor/'));
  }

  // CSS
  for(let item in dependencies.css) {
    console.log(`${item} - ${dependencies.css[item]}`);
    gulp.src('./node_modules/'+ dependencies.css[item])
      .pipe(gulp.dest('./front/dist/styles/vendor/'));
  }

  // Fonts
  for(let item in dependencies.font) {
    console.log(`${item} - ${dependencies.font[item]}`);
    gulp.src('./node_modules/'+ dependencies.font[item])
      .pipe(gulp.dest('./front/dist/styles/fonts/'));
  }

});

// Watch
gulp.task('watch', _=> {
  gulp.watch(scripts.ts.src, ['typescript']);
  gulp.watch(scripts.js.src, ['babel']);
  gulp.watch(templates.src, ['pug']);
  gulp.watch(styles.src, ['stylus'])
});

gulp.task('default', ['typescript', 'babel', 'stylus', 'watch'], _=> {});
