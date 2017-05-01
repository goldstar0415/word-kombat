import { Observable } from 'rxjs/Rx';

export function handleError(error): Observable<any> {
  return Observable.throw(error.json());
}