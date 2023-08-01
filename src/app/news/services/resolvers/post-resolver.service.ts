import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable, take} from 'rxjs';
import {PostsService} from "../posts.service";

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<any> {
  constructor(private postService: PostsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const postId = route.paramMap.get('id');
    return this.postService.getPost(postId).pipe(
      take(1)
    );
  }
}
