import {Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CommonModule, ViewportScroller} from "@angular/common";
import { faComment, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import * as moment from "moment/moment";
import {ConfigService} from "../../../core/services/config.service";
import {FixturesService} from "../services/fixtures.service";
import {MetaService} from "../../../core/services/meta.service";
import {LoadingIndicatorService} from "../../../core/shared/loading-indicator/loading-indicator.service";
import {CoreModule} from '../../../core/core.module';
import {AdsComponent} from '../../../ads/ads/ads.component';
import {CommentsComponent} from '../../../comments/comments/comments.component';

@Component({
  selector: 'app-matchpreview',
  templateUrl: './matchpreview.component.html',
  standalone: true,
  imports: [
    CoreModule,
    CommonModule,
    AdsComponent,
    CommentsComponent
  ]
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
  participantHome: string = '';
  participantAway: string = '';
  currentReplyToCommentId: number | undefined;

  @HostListener('window:scroll', ['$event']) onScroll(event: any) {
    const winScroll = event.target.documentElement.scrollTop || event.currentTarget.scrollTop || document.body.scrollTop;

    this.isButtonVisible(winScroll);
  }

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    private toast: ToastrService,
    private fixturesService: FixturesService,
    private viewportScroller: ViewportScroller,
    private metaService: MetaService,
    private loadingIndicatorService: LoadingIndicatorService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
  }

  ngOnInit() {
    this.loading = false;
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

        const upcomingFixtures = this.teamFixtures.filter((round: any) => {
          const firstFixture = round.fixtures[0];
          const fixtureDate = new Date(firstFixture.starting_at);
          const currentDate = new Date();
          return !firstFixture.finished && fixtureDate > currentDate;
        });

        if (upcomingFixtures.length > 0) {
          upcomingFixtures.sort((a: any, b: any) => {
            const dateA = new Date(a.fixtures[0].starting_at);
            const dateB = new Date(b.fixtures[0].starting_at);
            return dateA.getTime() - dateB.getTime();
          });

          this.nextMatch = upcomingFixtures[0].fixtures[0];

          this.participantHome = this.generateUrlFriendlyString(this.nextMatch.participants[0].name);
          this.participantAway = this.generateUrlFriendlyString(this.nextMatch.participants[1].name);

        }

        this.hideLoading();
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

  onReplyToComment(commentId: number) {
    this.currentReplyToCommentId = commentId;
    this.onOpenCommentModal();
  }

  updateMetaTags(post: any) {
    const title = post.yoast_head_json.title;
    const metaUrl = post.yoast_head_json.og_url.replace('backend', 'www');
    const description = post.yoast_head_json.og_description;
    const image = post.better_featured_image.source_url;
    this.metaService.updateMetaTag(title, metaUrl, description, image);
  }

  generateUrlFriendlyString(str: string): string {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  addComment(comment: any) {
    this.toast.success('Reactie wordt geplaatst', 'Succes');
    this.reloadComments = true;
    this.onModalClose();
  }

  hideLoading(): void {
    this.loadingIndicatorService.setLoading(false);
  }

  onModalClose() {
    this.modalCommentsOpen = false;
  }

  onOpenCommentModal() {
    this.modalCommentsOpen = true;
  }

}
