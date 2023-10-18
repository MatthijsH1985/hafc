import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { take } from 'rxjs/operators';

@Injectable()
export class CookieInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // Filter alleen HttpResponse, negeer andere soorten responses
      filter((event: any) => event instanceof HttpResponse),
      take(1), // Wacht op de voltooiing van de HttpResponse
      map((response: HttpResponse<any>) => {
        const cookies = response.headers.getAll('Set-Cookie');
        return response;
      })
    );
  }
}
