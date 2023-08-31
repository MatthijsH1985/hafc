import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentsService} from "./services/comments.service";
import {ModalCommentComponent} from "./modal-comment/modal-comment.component";
import {CommentsComponent} from "./comments/comments.component";
import {CoreModule} from "../core/core.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LatestCommentsComponent } from './latest-comments/latest-comments.component';

@NgModule({
  declarations: [
    ModalCommentComponent,
    CommentsComponent,
    LatestCommentsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
    exports: [
        CommentsComponent,
        ModalCommentComponent,
        LatestCommentsComponent
    ],
  providers: [
    CommentsService
  ]
})
export class CommentsModule { }
