declare let System: any;

(function (global) {
  System.config({
    paths: {
      'base:': '../vendor/'
    },
    map: {
      app: 'app',
      '@angular/core': 'base:@angular/core/bundles/core.umd.js',
      '@angular/common': 'base:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'base:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'base:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'base:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'base:@angular/http/bundles/http.umd.js',
      '@angular/router': 'base:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'base:@angular/forms/bundles/forms.umd.js',
      'rxjs': 'base:rxjs'
    },
    packages: {
      './guess-word-app/app/': {
          format: 'register',
          defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });

  System.import('./guess-word-app/app/main.js')
    .then(null, console.error.bind(console));
})(this);