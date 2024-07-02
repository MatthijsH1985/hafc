import {Component, OnInit, Output} from '@angular/core';
import {catchError, of, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostsService} from "../../news/services/posts.service";
import {NewsModule} from '../../news/news.module';
import {CoreModule} from '../../core/core.module';

@Component({
  selector: 'app-nieuwsarchief',
  templateUrl: './nieuwsarchief.component.html',
  styleUrls: ['./nieuwsarchief.component.scss'],
  imports: [
    NewsModule,
    CoreModule
  ],
  standalone: true
})
export class NieuwsarchiefComponent implements OnInit{
  posts: any = [];
  loading = false;
  @Output() searchTerms: any;
  reloadItems: boolean = false;
  postsSub: Subscription | undefined;
  postPage: any;

  searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl('', [Validators.required])
  });

  constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.posts = this.route.snapshot.data['posts'];
    // console.log(this.posts);
  }

  getPosts() {
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

}
