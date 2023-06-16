import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-specials',
  templateUrl: './specials.component.html',
  styleUrls: ['./specials.component.scss']
})
export class SpecialsComponent implements OnInit {
  posts: any = [];
  headline: any;
  postPage = 1;
  loading = true;
  postsSub: Subscription | undefined;
  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit() {
    this.getPosts()
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      const newDate = new Date(dateString);
      return newDate.toISOString();
    }
    return null;
  }

  getPosts(page = 1): void {
    this.postsSub = this.postsService.getPosts(page, [816]).subscribe( {
      next: data => {
        for (let i = 0; i < data.length; i++) {
          // @ts-ignore
          this.posts.push(data[i]);
        }
        this.headline = this.posts[0];
        this.loading = false;
        this.postPage++;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  onLoadMorePosts() {
    this.getPosts(this.postPage);
  }


  openPost(post: any): void {
    this.router.navigateByUrl(`nieuws/${post.id}`);
  }
}
