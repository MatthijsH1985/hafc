import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PostsService } from '../posts.service';

@Injectable({
  providedIn: 'root'
})
export class HeadlinesResolver implements Resolve<any> {
  constructor(private postService: PostsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.postService.getHeadlines().pipe(
      catchError(error => {
        return of(null);
      })
    );
  }
}
