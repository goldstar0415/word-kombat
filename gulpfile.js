// Imports ====================================================================
const gulp = require('gulp');
const plumber = require('gulp-plumber');

const typescript = require('gulp-typescript');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const imagemin = require('gulp-imagemin');

// Configurations =============================================================
const scripts = {
  src: 'front/src/chat/*.ts',
  dest: 'front/dist/chat/'
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
// const tsProject = typescript.createProject('tsconfig.json');

const pugOptions = {
  pretty: false
};

const stylusOptions = {
  compress: true
};

const imageminOptions = {
  progressive: true
};

// Tasks ======================================================================
gulp.task('typescript', ()=> { 
  return gulp.src(scripts.src)
    .pipe(plumber())
    .pipe(typescript(/*tsProject*/))
    .pipe(gulp.dest(scripts.dest))
});

gulp.task('pug', ()=> {
  return gulp.src(templates.src)
    .pipe(plumber())
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(templates.dest))
});

gulp.task('stylus', ()=> {
  return gulp.src(styles.src)
    .pipe(plumber())
    .pipe(stylus(stylusOptions))
    .pipe(gulp.dest(styles.dest))
});

gulp.task('images', ()=> {
  return gulp.src(images.src)
    .pipe(imagemin(imageminOptions))
    .pipe(gulp.dest(images.dest));
});

gulp.task('libs', ()=> {

  for(let item in dependencies.js) {
    console.log(dependencies.js[item]);
    gulp.src('./bower_components/'+ dependencies.js[item])
      .pipe(gulp.dest('./front/dist/scripts/vendor/'));
  }

  for(let item in dependencies.css) {
    console.log(dependencies.css[item]);
    gulp.src('./bower_components/'+ dependencies.css[item])
      .pipe(gulp.dest('./front/dist/styles/vendor/'));
  }

  for(let item in dependencies.font) {
    console.log(dependencies.font[item]);
    gulp.src('./bower_components/'+ dependencies.font[item])
      .pipe(gulp.dest('./front/dist/styles/fonts/'));
  }

});

gulp.task('watch', ()=> {
  gulp.watch(scripts.src, ['typescript']);
  gulp.watch(templates.src, ['pug']);
  gulp.watch(styles.src, ['stylus'])
  gulp.watch(images.src, ['images']);
});

gulp.task('default', ['pug', 'stylus', 'typescript', 'watch'], _=> {});
