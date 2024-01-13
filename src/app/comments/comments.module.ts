import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentsService} from "./services/comments.service";
import {CommentsComponent} from "./comments/comments.component";
import {CoreModule} from "../core/core.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ReportCommentComponent } from './report-comment/report-comment.component';
import { LatestCommentsComponent } from './latest-comments/latest-comments.component';
import {AdsModule} from '../ads/ads.module';
import { CommentComponent } from './comment/comment.component';
import { CommentTreeComponent } from './comment-tree/comment-tree.component';
import {TopCommentsComponent} from './top-comments/top-comments.component';


@NgModule({
  declarations: [
    CommentsComponent,
    ReportCommentComponent,
    LatestCommentsComponent,
    CommentComponent,
    CommentTreeComponent,
    TopCommentsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AdsModule,
    FormsModule,
    ReactiveFormsModule
  ],
    exports: [
      CommentsComponent,
      LatestCommentsComponent,
      TopCommentsComponent
    ],
  providers: [
    CommentsService
  ]
})
export class CommentsModule { }
