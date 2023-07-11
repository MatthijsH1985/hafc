import {Component, OnInit, Output} from '@angular/core';
import {catchError, of, Subscription} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GtmService} from "../../services/gtm.service";

@Component({
  selector: 'app-nieuwsarchief',
  templateUrl: './nieuwsarchief.component.html',
  styleUrls: ['./nieuwsarchief.component.scss']
})
export class NieuwsarchiefComponent implements OnInit{
  posts: any = [];
  loading = true;
  @Output() searchTerms: any;
  reloadItems: boolean = false;
  postsSub: Subscription | undefined;
  postPage: any;

  searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl('', [Validators.required])
  });

  constructor(private postsService: PostsService, private router: Router, private gtmService: GtmService) {

  }

  ngOnInit() {
    this.getPosts();
    this.gtmService.startTrackingTags();
  }

  getPosts() {
    this.loading = true;
    this.postsSub = this.postsService.getPosts(this.postPage).subscribe({
      next: data => {
        for (let i = 0; i < data.length; i++) {
          this.posts.push(data[i]);
        }
        this.loading = false;
        this.postPage++;
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
