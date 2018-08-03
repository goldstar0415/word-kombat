import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import 'rxjs/add/observable/fromPromise';
import { AuthService } from '../service/auth/auth.service';

@Injectable()
export class AuthInterceptor<T> implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
        return Observable.fromPromise(this.handleAccess(request, next));
    }

    private async handleAccess(request: HttpRequest<T>, next: HttpHandler): Promise<HttpEvent<T>> {

        const user = this.authService.getUser();

        const headerSettings: { [name: string]: string | string[] } = {};

        for (const key of request.headers.keys()) {
            headerSettings[key] = request.headers.getAll(key);
        }

        if (user && user.token) {
            headerSettings['Authorization'] = 'Bearer ' + user.token;
        }

        const headers = new HttpHeaders(headerSettings);

        const changedRequest = request.clone({ headers });

        return next.handle(changedRequest).toPromise();
    }

}
