import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewslistComponent} from "./newslist/newslist.component";
import {NewssliderModule} from "./newsslider/newsslider.module";
import {RouterModule} from "@angular/router";
import {PostsService} from "./services/posts.service";
import {CoreModule} from "../core/core.module";

@NgModule({
  declarations: [
    NewslistComponent
  ],
  imports: [
    CommonModule,
    NewssliderModule,
    RouterModule,
    CoreModule
  ],
  exports: [
    NewslistComponent
  ],
  providers: [
    PostsService
  ]
})
export class NewsModule { }
