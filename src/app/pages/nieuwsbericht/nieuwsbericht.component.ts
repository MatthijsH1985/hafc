import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';
import { faComment, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import {PostsService} from "../../news/services/posts.service";
import {MetaService} from "../../core/services/meta.service";

@Component({
  selector: 'app-nieuwsbericht',
  templateUrl: './nieuwsbericht.component.html',
  styleUrls: ['./nieuwsbericht.component.scss']
})
export class NieuwsberichtComponent implements OnInit, OnDestroy {
  currentPostSub: Subscription | undefined;
  postId: any = this.route.snapshot.paramMap.get('id');
  post: any;
  name: string = '';
  loading: boolean = true;
  modalCommentsOpen: boolean = false;
  categoryName: any;
  reloadComments: any;
  buttonVisible: boolean = false;
  faComment = faComment;
  faArrowDown = faArrowDown;

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    const winScroll = event.target.documentElement.scrollTop || event.currentTarget.scrollTop || document.body.scrollTop;

    this.isButtonVisible(winScroll);
  }

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService,
    private router: Router,
    private titleService: Title,
    private toast: ToastrService,
    private viewportScroller: ViewportScroller,
    private metaService: MetaService,
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.post = this.route.snapshot.data['post'];
    this.updateMetaTags(this.post);
    this.viewportScroller.scrollToPosition([0,0]);
  }

  isButtonVisible(scrollHeight: number): void {
    this.buttonVisible = scrollHeight > 1000 ? true : false;
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
    this.modalCommentsOpen = false;
  }

  onOpenCommentModal() {
    this.modalCommentsOpen = true;
  }

  ngOnDestroy() {
    this.currentPostSub?.unsubscribe();
  }
}
