import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {catchError, of, Subscription} from "rxjs";
import {PostsService} from "../services/posts.service";

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.scss']
})
export class NewslistComponent implements OnChanges, OnInit {
  @Input('pagination') pagination: boolean = true;
  @Input('compact') compact: boolean = false;
  @Input('searchTerms') searchTerms: any | undefined;
  @Input() reloadItemsBySearch: boolean = false;
  @Input() posts: any = [];
  postsFound: any = [];
  postsSub: Subscription | undefined;
  loading: boolean = true;
  postPage: any = 1;
  errorMessage: any;

  constructor(private postsService: PostsService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reloadItemsBySearch'] && !changes['reloadItemsBySearch'].firstChange) {
      this.getPostsBySearchTerm(this.searchTerms);
    }
  }

  ngOnInit() {
    this.getPosts(1);
  }

  getPosts(page: number): void {
    this.loading = true;
    this.postsSub = this.postsService.getPosts(this.postPage).subscribe({
      next: (data: any) => {
        for (let i = 0; i < data.length; i++) {
          this.posts.push(data[i]);
        }
        this.loading = false;
        this.postPage++;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onLoadMorePosts() {
    this.getPosts(this.postPage);
  }

  getPostsBySearchTerm(searchTerms: any) {
    this.postsSub = this.postsService.getPostsBySearchTerm(searchTerms).pipe(
      catchError((error: any) => {
        this.errorMessage = error.message;
        return of(null);
      })
    ).subscribe((data: any) => {
      if (data) {
        this.reloadItemsBySearch = true;
        for (let i = 0; i < data.length; i++) {
          this.postsFound.push(data[i]);
        }
      }
      this.reloadItemsBySearch = false;
    });
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      const newDate = new Date(dateString);
      return newDate.toISOString();
    }
    return null;
  }
}
