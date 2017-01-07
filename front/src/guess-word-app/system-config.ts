declare let System: any;

(function (global) {
  System.config({
    paths: {
      'base:': '../vendor/'
    },
    map: {
      app: 'app',
      '@angular/core': 'base:@angular/core/bundles/core.umd.min.js',
      '@angular/common': 'base:@angular/common/bundles/common.umd.min.js',
      '@angular/compiler': 'base:@angular/compiler/bundles/compiler.umd.min.js',
      '@angular/platform-browser': 'base:@angular/platform-browser/bundles/platform-browser.umd.min.js',
      '@angular/platform-browser-dynamic': 'base:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
      '@angular/http': 'base:@angular/http/bundles/http.umd.min.js',
      '@angular/router': 'base:@angular/router/bundles/router.umd.min.js',
      '@angular/forms': 'base:@angular/forms/bundles/forms.umd.min.js',
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

  System.import('./guess-word-app/app/main.js').then(null, console.error.bind(console));
})(this);