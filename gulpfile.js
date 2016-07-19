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
    src: 'front/src/chat/*.ts',
    dest: 'front/dist/chat/'
  },
  js: {
    src: 'front/src/scripts/*.js',
    dest: 'front/dist/scripts/'
  }
};

const templates = {
  src: 'front/src/templates/*.pug',
  dest: 'front/dist/templates/'
};

const styles = {
  src: 'front/src/styles/*.styl',
  dest: 'front/dist/styles/'
};

const images = {
  src: 'front/src/images/**/*',
  dest: 'front/dist/images/'
}

const dependencies = {
  js: {
    'jquery': 'jquery/dist/jquery.min.js',
    'jquery.nicescroll': 'jquery.nicescroll/dist/jquery.nicescroll.min.js',
    'materialize': 'Materialize/dist/js/materialize.min.js'
  },
  css: {
    'materialize': 'Materialize/dist/css/materialize.min.css'
  },
  font: {
    'roboto': 'Materialize/dist/fonts/**/*'
  }
}

// Options ====================================================================
// const tsProject = typescript.createProject('front/src/chat/tsconfig.json');

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
// Compiles typescript to javascript
gulp.task('typescript', ()=> { 
  return gulp.src(scripts.ts.src)
    .pipe(plumber())
    .pipe(typescript(/*tsProject*/))
    .pipe(gulp.dest(scripts.ts.dest))
});

// Compiles es6 to es5 
gulp.task('babel', ()=> { 
  return gulp.src(scripts.js.src)
    .pipe(plumber())
    .pipe(babel(babelOptions))
    .pipe(gulp.dest(scripts.js.dest))
});

// Compiles pug to html
gulp.task('pug', ()=> {
  return gulp.src(templates.src)
    .pipe(plumber())
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(templates.dest))
});

// Compiles stylus to css
gulp.task('stylus', ()=> {
  return gulp.src(styles.src)
    .pipe(plumber())
    .pipe(stylus(stylusOptions))
    .pipe(gulp.dest(styles.dest))
});

// Copies and minifies images
gulp.task('images', ()=> {
  return gulp.src(images.src)
    .pipe(imagemin(imageminOptions))
    .pipe(gulp.dest(images.dest));
});

// Minifies js files
gulp.task('minifyjs', ()=> {
  return gulp.src('./front/src/scripts/*.js')
    .pipe(minify())
    .pipe(gulp.dest('./front/dist/scripts/'));
});

// Copies vendor libraries
gulp.task('libs', ()=> {

  // JavaScript
  for(let item in dependencies.js) {
    console.log(`${item} - ${dependencies.js[item]}`);
    gulp.src('./bower_components/'+ dependencies.js[item])
      .pipe(gulp.dest('./front/dist/scripts/vendor/'));
  }

  // CSS
  for(let item in dependencies.css) {
    console.log(`${item} - ${dependencies.css[item]}`);
    gulp.src('./bower_components/'+ dependencies.css[item])
      .pipe(gulp.dest('./front/dist/styles/vendor/'));
  }

  // Fonts
  for(let item in dependencies.font) {
    console.log(`${item} - ${dependencies.font[item]}`);
    gulp.src('./bower_components/'+ dependencies.font[item])
      .pipe(gulp.dest('./front/dist/styles/fonts/'));
  }

});

gulp.task('watch', ()=> {
  gulp.watch(scripts.ts.src, ['typescript']);
  gulp.watch(scripts.js.src, ['babel']);
  gulp.watch(templates.src, ['pug']);
  gulp.watch(styles.src, ['stylus'])
});

gulp.task('default', ['typescript', 'babel', 'pug', 'stylus', 'watch'], ()=> {});
