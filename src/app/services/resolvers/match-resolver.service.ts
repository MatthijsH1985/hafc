import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {PostsService} from "../posts.service";

@Injectable({
  providedIn: 'root'
})
export class MatchResolver implements Resolve<any> {
  constructor(private postService: PostsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const postId = route.paramMap.get('id');
    console.log(postId)

    return this.postService.getPost(postId);
  }
}
