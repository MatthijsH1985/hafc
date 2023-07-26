import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentsService} from "../services/comments.service";
import {NewslistComponent} from "./newslist/newslist.component";
import {NewssliderModule} from "./newsslider/newsslider.module";
import {RouterModule} from "@angular/router";
import {PostsService} from "./services/posts.service";

@NgModule({
  declarations: [
    NewslistComponent
  ],
  imports: [
    CommonModule,
    NewssliderModule,
    RouterModule
  ],
  exports: [
    NewslistComponent
  ],
  providers: [
    PostsService,
    CommentsService
  ]
})
export class NewsModule { }
