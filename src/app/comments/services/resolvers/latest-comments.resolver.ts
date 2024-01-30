import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommentsService } from '../comments.service';

@Injectable({
  providedIn: 'root'
})
export class LatestCommentsResolver implements Resolve<any> {
  constructor(private commentsService: CommentsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.commentsService.getLatestComments().pipe(
      catchError(error => {
        console.error('Error in LatestCommentsResolver:', error);
        return of(null);
      })
    );
  }
}
