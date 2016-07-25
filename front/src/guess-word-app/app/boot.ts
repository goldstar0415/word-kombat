/// <reference path="../../../../node_modules/angular2/typings/browser.d.ts" />
import { bootstrap } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS } from 'angular2/router';
 
import { AppComponent } from './components/app.component';

bootstrap(AppComponent, ROUTER_PROVIDERS)
     .catch(error => console.log(error));