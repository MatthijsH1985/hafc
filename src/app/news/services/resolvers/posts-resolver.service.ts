import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {catchError, Observable, of} from 'rxjs';
import {PostsService} from "../posts.service";

@Injectable({
  providedIn: 'root'
})
export class PostsResolver implements Resolve<any> {
  constructor(private postService: PostsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.postService.getPosts().pipe(
      catchError(error => {
        console.error('Error in PostsResolver:', error);
        // Geef een lege waarde terug of een foutbericht, afhankelijk van je vereisten
        return of(null);
      })
    );
  }
}
