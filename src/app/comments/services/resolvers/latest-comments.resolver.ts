import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {CommentsService} from "../comments.service";

@Injectable({
  providedIn: 'root'
})
export class LatestCommentsResolver implements Resolve<any> {
  constructor(private commentsService: CommentsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.commentsService.getLatestComments();
  }
}
