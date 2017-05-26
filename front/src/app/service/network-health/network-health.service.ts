import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class NetworkHealthService {

  private _networkStatus;

  constructor() {
    this._networkStatus = Observable
      .interval(1000)
      .timeInterval()
      .map(() => {
        if(window.navigator.onLine) {
          document.body.style.filter = 'grayscale(0)';
          document.body.style.transition = "filter 0.3s ease-in-out";
          return true;
        } else {
          document.body.style.filter = 'grayscale(0.9)';
          document.body.style.transition = "filter 0.3s ease-in-out";
          return false;
        };
      });
  }

  get isOnline() {
    return this._networkStatus;
  }

}
