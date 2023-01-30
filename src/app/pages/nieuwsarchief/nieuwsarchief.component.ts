import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nieuwsarchief',
  templateUrl: './nieuwsarchief.component.html',
  styleUrls: ['./nieuwsarchief.component.scss']
})
export class NieuwsarchiefComponent implements OnInit {
  posts: any = [];
  headlines: any;
  postPage = 1;
  loading = true;
  postsSub: Subscription | undefined;
  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit() {
    this.getPosts(false, '')
  }

  getPosts(isFirstLoad: any, event: any): void {
    this.postsSub = this.postsService.getPosts(this.postPage).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        // @ts-ignore
        this.posts.push(data[i]);
      }

      if (isFirstLoad) {
        event.target.complete();
      } else {
        this.createHeadlines(this.posts);
      }
      this.loading = false;
      this.postPage++;

    }, error => {
      console.log(error);
    });
  }

  createHeadlines(posts: any): void {
    this.headlines = posts.slice(0,3);
  }

  getMorePosts(event: any) {
    this.getPosts(true, event);
  }

  openPost(post: any): void {
    this.router.navigateByUrl(`nieuws/${post.id}`);
  }
}
