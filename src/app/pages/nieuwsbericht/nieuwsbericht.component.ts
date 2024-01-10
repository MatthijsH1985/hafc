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
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { faComment, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import {MetaService} from "../../core/services/meta.service";
import {LoadingIndicatorService} from "../../core/shared/loading-indicator/loading-indicator.service";
import {CommentsService} from '../../comments/services/comments.service';

@Component({
  selector: 'app-nieuwsbericht',
  templateUrl: './nieuwsbericht.component.html',
  styleUrls: ['./nieuwsbericht.component.scss']
})
export class NieuwsberichtComponent implements OnInit, OnDestroy, AfterViewInit {
  currentPostSub: Subscription | undefined;
  postId: any = this.route.snapshot.paramMap.get('id');
  post: any;
  name: string = '';
  loading: boolean = true;
  modalCommentsOpen: boolean = false;
  categoryName: any;
  reloadComments: boolean = false;
  buttonVisible: boolean = false;
  faComment = faComment;
  currentReplyToCommentId: number | undefined;
  @Input('links') links: any;

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    const winScroll = event.target.documentElement.scrollTop || event.currentTarget.scrollTop || document.body.scrollTop;

    this.isButtonVisible(winScroll);
  }

  constructor(
    private route: ActivatedRoute,
    private toast: ToastrService,
    private viewportScroller: ViewportScroller,
    private commentsService: CommentsService,
    private metaService: MetaService,
    private loadingIndicatorService: LoadingIndicatorService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.commentsService.modalVisible$.subscribe((visibility) => {
      this.modalCommentsOpen = visibility;
    })
  }

  ngOnInit() {
    this.post = this.route.snapshot.data['post'];
    this.links = this.route.snapshot.data['links'];
    this.updateMetaTags(this.post);
    this.viewportScroller.scrollToPosition([0,0]);
  }

  ngAfterViewInit() {
    this.hideLoading();
  }

  hideLoading(): void {
    this.loadingIndicatorService.setLoading(false);
  }

  isButtonVisible(scrollHeight: number): void {
    this.buttonVisible = scrollHeight > 1000 ? true : false;
  }

  onReplyToComment(commentId: number) {
    this.currentReplyToCommentId = commentId;
    this.onOpenCommentModal();
  }

  toComments():void {
    this.viewportScroller.scrollToAnchor('comments');
  }

  updateMetaTags(post: any) {
    const title = post.yoast_head_json.title;
    const metaUrl = post.yoast_head_json.og_url.replace('backend', 'www');
    const description = post.yoast_head_json.og_description;
    const image = post.better_featured_image.source_url;
    this.metaService.updateMetaTag(title, metaUrl, description, image);
  }

  addComment(comment: any) {
    this.toast.success('Reactie is geplaatst', 'Succes');
    this.reloadComments = true;
    this.onModalClose();
  }

  onModalClose() {
    this.commentsService.setCommentModalVisibility(false);
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

  onOpenCommentModal() {
    this.commentsService.setCommentModalVisibility(true);
  }

  onAddNewComment() {
    this.currentReplyToCommentId = 0;
    this.reloadComments = false;
    this.onOpenCommentModal();
  }

  ngOnDestroy() {
    this.currentPostSub?.unsubscribe();
  }
}
