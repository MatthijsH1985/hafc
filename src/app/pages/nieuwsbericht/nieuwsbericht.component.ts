import {Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, StateKey} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Title } from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { GtmService } from '../../services/gtm.service';
import { MetaService } from '../../services/meta.service';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { TransferState } from '@angular/platform-browser';

@Component({
  selector: 'app-nieuwsbericht',
  templateUrl: './nieuwsbericht.component.html',
  styleUrls: ['./nieuwsbericht.component.scss']
})
export class NieuwsberichtComponent implements OnInit, OnDestroy {
  currentPostSub: Subscription | undefined;
  postId: any = this.activatedRoute.snapshot.paramMap.get('id');
  post: any;
  name: string = '';
  loading: boolean = true;
  currentRoute: any;
  modalCommentsOpen: boolean = false;
  categoryName: any;
  reloadComments: any;
  buttonVisible: boolean = false;
  faComment = faComment;

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    const winScroll = event.target.documentElement.scrollTop || event.currentTarget.scrollTop || document.body.scrollTop;

    this.isButtonVisible(winScroll);
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostsService,
    private router: Router,
    private titleService: Title,
    private toast: ToastrService,
    private viewportScroller: ViewportScroller,
    private gtmService: GtmService,
    private metaService: MetaService,
    @Inject(PLATFORM_ID) private platformId: object,
    private transferState: TransferState
  ) {}

  ngOnInit() {
    this.loading = true;
    this.currentRoute = this.router.url;
    this.loadPost();
    const url = this.router.url;
  }

  isButtonVisible(scrollHeight: number): void {
    this.buttonVisible = scrollHeight > 1000 ? true : false;
  }

  loadPost() {
    if (isPlatformServer(this.platformId)) {
      // Server-side rendering
      this.currentPostSub = this.postService.getPost(this.postId).subscribe({
        next: (post) => {
          this.post = post;
          this.categoryName = this.post.category_name[0].cat_name;
          this.loading = false;
          this.titleService.setTitle(this.post.title.rendered);
          this.viewportScroller.scrollToPosition([0, 0]);
          this.gtmService.startTrackingTags();
          const metaUrl = this.post.yoast_head_json.og_url.replace('backend', 'www');
          const description = this.post.yoast_head_json.og_description;
          const image = this.post.better_featured_image.source_url;
          this.metaService.updateMetaTag(metaUrl, description, image);
          this.transferState.set('post' as any, this.post);
          const postKey = this.getPostStateKey();
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else if (isPlatformBrowser(this.platformId)) {
      const post = this.transferState.get<any>((this.getPostStateKey() as unknown) as StateKey<any>, null);
      const postKey = this.getPostStateKey();
      if (post) {
        this.post = post;
        this.categoryName = this.post.category_name[0].cat_name;
        this.loading = false;
        this.titleService.setTitle(this.post.title.rendered);
        this.viewportScroller.scrollToPosition([0, 0]);
        this.gtmService.startTrackingTags();
        const metaUrl = this.post.yoast_head_json.og_url.replace('backend', 'www');
        const description = this.post.yoast_head_json.og_description;
        const image = this.post.better_featured_image.source_url;
        this.metaService.updateMetaTag(metaUrl, description, image);
      } else {
        this.currentPostSub = this.postService.getPost(this.postId).subscribe({
          next: (post) => {
            this.post = post;
            this.categoryName = this.post.category_name[0].cat_name;
            this.loading = false;
            this.titleService.setTitle(this.post.title.rendered);
            this.viewportScroller.scrollToPosition([0, 0]);
            this.gtmService.startTrackingTags();
            const metaUrl = this.post.yoast_head_json.og_url.replace('backend', 'www');
            const description = this.post.yoast_head_json.og_description;
            const image = this.post.better_featured_image.source_url;
            this.metaService.updateMetaTag(metaUrl, description, image);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }
  }

  addComment(comment: any) {
    this.toast.success('Reactie wordt geplaatst', 'Succes');
    this.reloadComments = true;
    this.onModalClose();
  }

  onModalClose() {
    this.modalCommentsOpen = false;
  }

  onOpenCommentModal() {
    this.modalCommentsOpen = true;
  }

  ngOnDestroy() {
    this.currentPostSub?.unsubscribe();
  }

  private getPostStateKey(): string {
    return `post-${this.postId}`;
  }
}
