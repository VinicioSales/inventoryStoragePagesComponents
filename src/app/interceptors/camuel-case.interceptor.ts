import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CamelCaseInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map(event => {
                if (event instanceof HttpResponse && event.body) {
                    return event.clone({ body: this.convertObjectKeysToCamelCase(event.body) });
                }
                return event;
            })
        );
    }

    toCamelCase(str: string): string {
        return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
    }

    private convertObjectKeysToCamelCase(obj: any): any {
        // Inclua aqui a implementação da função convertObjectKeysToCamelCase
        if (obj instanceof Array) {
            return obj.map((v) => this.convertObjectKeysToCamelCase(v));
        } else if (obj !== null && obj.constructor === Object) {
            return Object.keys(obj).reduce(
                (result, key) => ({
                    ...result,
                    [this.toCamelCase(key)]: this.convertObjectKeysToCamelCase(obj[key]),
                }),
                {}
            );
        }
        return obj;
    }
}
