import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  posts: any = [];
  postPage = 1;
  loading = true;
  headlines: any = [];
  postsSub: Subscription | undefined;

  constructor(private postsService: PostsService,
              private router: Router,
              private titleService: Title,
              private viewportScroller: ViewportScroller) {
  }

  ngOnInit() {
    this.getPosts(false, '');
    this.titleService.setTitle('HAFC - Wij zijn Heracles!');
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  getPosts(isFirstLoad: any, event: any): void {
    this.postsSub = this.postsService.getPosts(this.postPage).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        this.posts.push(data[i]);
      }
      this.headlines = this.posts.slice(0,3);

      if (isFirstLoad) {
        event.target.complete();
      }
      this.loading = false;
      this.postPage++;

    }, error => {
      console.log(error);
    });
  }

  openPost(post: any): void {
    this.router.navigateByUrl(`nieuws/${post.id}`);
  }
}
