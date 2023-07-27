import {Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {ViewportScroller} from "@angular/common";
import { faComment, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import * as moment from "moment/moment";
import {ConfigService} from "../../core/services/config.service";
import {PostsService} from "../../news/services/posts.service";
import {FixturesService} from "../services/fixtures.service";
import {MetaService} from "../../core/services/meta.service";

@Component({
  selector: 'app-matchpreview',
  templateUrl: './matchpreview.component.html'
})
export class MatchpreviewComponent implements OnInit {
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
  teamFixtures: any;
  nextMatch: any;
  teamID = this.configService.config.teamID;

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    const winScroll = event.target.documentElement.scrollTop || event.currentTarget.scrollTop || document.body.scrollTop;

    this.isButtonVisible(winScroll);
  }

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    private postService: PostsService,
    private router: Router,
    private titleService: Title,
    private toast: ToastrService,
    private fixturesService: FixturesService,
    private viewportScroller: ViewportScroller,
    private metaService: MetaService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.post = this.route.snapshot.data['post'];
    this.updateMetaTags(this.post);
    this.viewportScroller.scrollToPosition([0,0]);
    this.getFixtures();
  }

  getFixtures() {
    this.fixturesService.getFixtures(this.teamID).subscribe( {
      next: (data: any) => {
        const { rounds } = data.data[0];
        this.teamFixtures =  rounds;
        if (this.teamFixtures.length > 0) {
          this.teamFixtures.sort((a: any, b: any) => {
            const dateA = new Date(a.fixtures[0].starting_at);
            const dateB = new Date(b.fixtures[0].starting_at);
            return dateA.getTime() - dateB.getTime();
          });
        }

        this.nextMatch = this.teamFixtures[0];
        this.loading = false;
      },
      error: (error: any) => {
        console.error(error)
        this.loading = false;
      }
    });
  }

  validDateFormat(dateString: Date): any {
    if(dateString) {
      return moment.utc(dateString);
    }
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

}
