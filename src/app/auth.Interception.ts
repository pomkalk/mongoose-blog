import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterception implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem('user_token');
        if (token) {
            const authReq = req.clone({
                headers: req.headers.set('x-token', token)
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}
