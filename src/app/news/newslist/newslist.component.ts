import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';
import {Subscription} from "rxjs";
import {PostsService} from "../services/posts.service";
import {LoadingIndicatorService} from "../../core/shared/loading-indicator/loading-indicator.service";
import {ActivatedRoute} from "@angular/router";
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.scss']
})
export class NewslistComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input('pagination') pagination: boolean = true;
  @Input('compact') compact: boolean = false;
  @Input() showMoreNewsButton = true;
  posts: any = [];
  postsSub: Subscription | undefined;
  loading: boolean = true;
  postPage: any = 1;
  errorMessage: any;

  constructor(private postsService: PostsService,  @Inject(PLATFORM_ID) private platformId: object, private route: ActivatedRoute, private loadingIndicatorService: LoadingIndicatorService) {
  }

  showLoading(): void {
    this.loadingIndicatorService.setLoading(true);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.animateItems();
    }, 200);
  }

  animateItems() {
    if (isPlatformBrowser(this.platformId)) {
      const options = {
        root: null,
        rootMargin: '15px',
        threshold: 0.5
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const targetElement = entry.target as HTMLElement;
            const classesToAdd = ['animate-fade-up', 'animate-fill-forwards', 'animate-normal', 'animate-once','animate-duration-300', 'animate-ease-linear'];
            targetElement.classList.add(...classesToAdd);
            observer.unobserve(targetElement);
          }
        });
      }, options);
      const elementsToObserve = document.querySelectorAll('.newsitem-container');

      elementsToObserve.forEach(element => {
        observer.observe(element);
      });
    }
  }

  ngOnInit() {
    this.posts = this.route.snapshot.data['posts'];
  }

  getPosts(page: number): void {
    this.loading = true;

    this.postsSub = this.postsService.getPosts(page).subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          for (let i = 0; i < data.length; i++) {
            this.posts.push(data[i]);
          }
          setTimeout(() => {
            this.animateItems();
          }, 200);
          this.loading = false;
          this.postPage++;
        } else {
          console.log("Invalid data received:", data);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  onLoadMorePosts() {
    this.postPage++;
    this.getPosts(this.postPage);
  }

  isSpecial(post: any) {
    return post.categories.includes(816)
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      const newDate = new Date(dateString);
      return newDate.toISOString();
    }
    return null;
  }

  ngOnDestroy() {
    if (this.postsSub) {
      // this.postsSub.unsubscribe();
    }
  }


}
