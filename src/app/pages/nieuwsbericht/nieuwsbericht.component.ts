import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-nieuwsbericht',
  templateUrl: './nieuwsbericht.component.html',
  styleUrls: ['./nieuwsbericht.component.scss']
})
export class NieuwsberichtComponent {
  currentPostSub: Subscription | undefined;
  postId: string | null = this.activatedRoute.snapshot.paramMap.get('id')
  post: any;
  name: string = '';
  message: string = '';
  loading: boolean = true
  currentRoute: any;

  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostsService,
              private route: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.currentRoute = this.route.url;
    console.log(this.currentRoute);
    this.currentPostSub = this.postService.getPost(this.postId).subscribe({
      next: value => {
        this.post = value;
      },
      error: value => {
        console.log(value);
      }
    })
  }

}
