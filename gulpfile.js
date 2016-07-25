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
  dest: {
    js: './front/dist/scripts/vendor/',
    css: './front/dist/styles/vendor/',
    font: './front/dist/styles/fonts/'
  },
  libs: {
    js: {
      'jquery': 'node_modules/jquery/dist/jquery.min.js',
      'materialize': 'node_modules/materialize-css/dist/js/materialize.min.js',
      'systemjs': 'node_modules/systemjs/dist/system.src.js',
      'rxjs': 'node_modules/rxjs/bundles/Rx.min.js',
      'zone.js': 'node_modules/zone.js/dist/zone.min.js',
      'angular2': [
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/angular2/bundles/angular2.js',
        'node_modules/angular2/bundles/router.dev.js',
        'node_modules/angular2/bundles/http.dev.js'
      ],
    },
    css: {
      'materialize': 'node_modules/materialize-css/dist/css/materialize.min.css',
    },
    font: {
      'roboto': 'node_modules/materialize-css/dist/fonts/**/*',
    }
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
  Object.keys(dependencies.libs).forEach(deps => {
    Object.keys(dependencies.libs[deps]).forEach(libs => {

      let lib = dependencies.libs[deps][libs];

      if(Array.isArray(lib)){
        lib.forEach(item => {
          gulp.src(item).pipe(gulp.dest(dependencies.dest[deps] + libs + "/"));
          console.log(`${item} - ${dependencies.dest[deps]}`);
        });
      } else {
        gulp.src(lib).pipe(gulp.dest(dependencies.dest[deps]));
        console.log(`${lib} - ${dependencies.dest[deps]}`);
      }

    });
  });
});

// Watch
gulp.task('watch', _=> {
  gulp.watch(scripts.ts.src, ['typescript']);
  gulp.watch(scripts.js.src, ['babel']);
  gulp.watch(templates.src, ['pug']);
  gulp.watch(styles.src, ['stylus'])
});

gulp.task('default', ['typescript', 'babel', 'stylus', 'watch'], _=> {});
