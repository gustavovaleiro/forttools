import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest,HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let token: string;
        console.log("passou");
        token = "1e6744673a20efc909fc924d0a9e4936";
        
        const authReq = req.clone({headers: req.headers.set('Authorization', token)});

        return next.handle(authReq);
    }
}

export const AuthInterceptorProvider ={
    provide: HTTP_INTERCEPTORS,
    useClass:  AuthInterceptor,
    multi: true,
};