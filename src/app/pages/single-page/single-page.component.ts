import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {PostsService} from "../../news/services/posts.service";
import {LoadingIndicatorComponent} from '../../core/shared/loading-indicator/loading-indicator.component';
import {CoreModule} from '../../core/core.module';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss'],
  imports: [
    LoadingIndicatorComponent,
    CoreModule
  ],
  standalone: true
})
export class SinglePageComponent implements OnInit{

  currentRoute: any;
  loading: boolean = true;
  postId: any = this.activatedRoute.snapshot.paramMap.get('id');
  page: any;

  constructor(private postsService: PostsService, private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.postsService.getSinglePage(this.postId).subscribe({
      next: (data) => {
        this.page = data;
        this.loading = false;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
