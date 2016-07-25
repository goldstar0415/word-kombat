/// <reference path="typings/systemjs/systemjs.d.ts" />

System.config({
    packages: {        
      './guess-word-app/app/': {
        format: 'register',
        defaultExtension: 'js'
      }
    }
});

System.import('./guess-word-app/app/boot.js')
  .then(null, console.error.bind(console));