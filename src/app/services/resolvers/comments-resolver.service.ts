import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {PostsService} from "../../news/services/posts.service";
import {CommentsService} from '../../comments/services/comments.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsResolverService implements Resolve<any> {
  constructor(private commentsService: CommentsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const postId = route.paramMap.get('id');

    return this.commentsService.getComments(postId);
  }
}
