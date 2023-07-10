import {Component, OnInit} from '@angular/core';
import {PostsService} from "../../services/posts.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {GoogleTagManagerService} from "angular-google-tag-manager";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})
export class SinglePageComponent implements OnInit{

  currentRoute: any;
  loading: boolean = true;
  postId: any = this.activatedRoute.snapshot.paramMap.get('id');
  page: any;

  constructor(private postsService: PostsService, private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute) {

  }
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
