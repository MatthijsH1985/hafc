import {
  AfterViewInit,
  Component,
  HostListener,
  Inject, Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {DatePipe, ViewportScroller} from '@angular/common';
import {faTrophy, faLongArrowRight} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import {MetaService} from "../../core/services/meta.service";
import {LoadingIndicatorService} from "../../core/shared/loading-indicator/loading-indicator.service";
import {CommentsService} from '../../comments/services/comments.service';
import {CoreModule} from '../../core/core.module';
import {AdsComponent} from '../../ads/ads/ads.component';
import {CommentsComponent} from '../../comments/comments/comments.component';
import {TopCommentsComponent} from '../../comments/top-comments/top-comments.component';
import {SidebarModule} from 'primeng/sidebar';
import {Button} from 'primeng/button';
import {Ripple} from 'primeng/ripple';

@Component({
  selector: 'app-nieuwsbericht',
  templateUrl: './nieuwsbericht.component.html',
  styleUrls: ['./nieuwsbericht.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    DatePipe,
    CoreModule,
    AdsComponent,
    CommentsComponent,
    TopCommentsComponent,
    SidebarModule,
    Button,
    Ripple
  ],
  providers: [

  ]
})
export class NieuwsberichtComponent implements OnInit, OnDestroy, AfterViewInit {
  currentPostSub: Subscription | undefined;
  post: any;
  name: string = '';
  loading: boolean = true;
  categoryName: any;
  reloadComments: boolean = false;
  buttonVisible: boolean = false;
  currentReplyToCommentId: number | undefined;
  @Input('links') links: any;
  commentsVisible = false;

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    const winScroll = event.target.documentElement.scrollTop || event.currentTarget.scrollTop || document.body.scrollTop;

    this.isButtonVisible(winScroll);
  }

  showComments() {
    this.commentsVisible = true;
  }

  hideComments() {
    this.commentsVisible = false;
  }

  validDateFormat(dateString: any) {
    if(dateString) {
      const newDate = new Date(dateString);
      return newDate.toISOString();
    }
    return null;
  }

  constructor(
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private metaService: MetaService,
    private loadingIndicatorService: LoadingIndicatorService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.loadingIndicatorService.setLoading(true)
    this.post = this.route.snapshot.data['post'];
    this.metaService.updateMetaTag(this.post);
  }

  ngOnInit() {
    this.links = this.route.snapshot.data['links'];
    this.updateMetaTags(this.post);
    this.viewportScroller.scrollToPosition([0,0]);
  }

  ngAfterViewInit() {
    this.hideLoading();
  }

  toggleCommentsWindow() {
    console.log()
  }

  hideLoading(): void {
    this.loadingIndicatorService.setLoading(false);
  }

  isButtonVisible(scrollHeight: number): void {
    this.buttonVisible = scrollHeight > 1000 ? true : false;
  }

  updateMetaTags(post: any) {
    const title = post.yoast_head_json.title;
    const metaUrl = post.yoast_head_json.og_url.replace('backend', 'www');
    const description = post.yoast_head_json.og_description;
    const image = post.better_featured_image.source_url;
    this.metaService.updateMetaTag(title, metaUrl, description, image);
  }

  navigateToCmment(fragment: any) {
    setTimeout(() => {
      this.scrollToElement('comment-' + fragment);
    }, 200)

  }

  private scrollToElement(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      const offset = 120; // Pas dit aan naar de gewenste offsetwaarde
      const elementRect = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementRect - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  onAddNewComment() {
    this.currentReplyToCommentId = 0;
    this.reloadComments = false;
  }

  ngOnDestroy() {
    this.currentPostSub?.unsubscribe();
  }

  protected readonly faTrophy = faTrophy;
  protected readonly faLongArrowRight = faLongArrowRight;
}
