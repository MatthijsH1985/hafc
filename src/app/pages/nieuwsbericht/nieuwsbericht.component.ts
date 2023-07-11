import {Component, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PostsService} from "../../services/posts.service";
import {Title} from "@angular/platform-browser";
import {ViewportScroller} from "@angular/common";
import {faComment} from "@fortawesome/free-solid-svg-icons";
import {ToastrService} from "ngx-toastr";
import {GtmService} from "../../services/gtm.service";
import {MetaService} from "../../services/meta.service";


@Component({
  selector: 'app-nieuwsbericht',
  templateUrl: './nieuwsbericht.component.html',
  styleUrls: ['./nieuwsbericht.component.scss']
})
export class NieuwsberichtComponent implements OnInit, OnDestroy {
  currentPostSub: Subscription | undefined;
  postId: any = this.activatedRoute.snapshot.paramMap.get('id')
  post: any;
  name: string = '';
  loading: boolean = true;
  currentRoute: any;
  modalCommentsOpen: boolean = false;
  categoryName: any;
  @Output() reloadComments: any;
  buttonVisible: boolean = false;
  faComment = faComment;

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    const winScroll = event.target.documentElement.scrollTop || event.currentTarget.scrollTop || document.body.scrollTop;

    this.isButtonVisible(winScroll);
  }

  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostsService,
              private router: Router,
              private titleService: Title,
              private toast: ToastrService,
              private viewportScroller: ViewportScroller,
              private gtmService: GtmService,
              private metaService: MetaService) {
  }


  ngOnInit() {
    this.loading = true;
    this.currentRoute = this.router.url;
    this.loadPost();

  }

  isButtonVisible(scrollHeight: number): void {
    this.buttonVisible = (scrollHeight > 1000) ? true : false
  }

  loadPost() {
    this.currentPostSub = this.postService.getPost(this.postId).subscribe({
      next: post => {
        this.post = post;
        this.categoryName = this.post.category_name[0].cat_name;
        this.loading = false;
        this.titleService.setTitle(this.post.title.rendered);
        this.viewportScroller.scrollToPosition([0, 0]);
        this.gtmService.startTrackingTags();
        const metaUrl = this.post.yoast_head_json.og_url.replace('backend', 'www');
        this.metaService.setMetaTag(metaUrl, this.post.yoast_head_json.og_description);
      },
      error: error => {
        console.log(error);
      }
    })
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
    this.currentPostSub?.unsubscribe()
  }

}
