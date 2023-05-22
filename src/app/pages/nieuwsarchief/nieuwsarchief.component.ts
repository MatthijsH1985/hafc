import {Component, OnInit, Output} from '@angular/core';
import {catchError, of, Subscription} from "rxjs";
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-nieuwsarchief',
  templateUrl: './nieuwsarchief.component.html',
  styleUrls: ['./nieuwsarchief.component.scss']
})
export class NieuwsarchiefComponent {
  posts: any = [];
  loading = true;
  @Output() searchTerms: any;
  reloadItems: boolean = false;

  searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl('', [Validators.required])
  });

  constructor(private postsService: PostsService, private router: Router) {

  }

  async onSearch() {
    this.posts = [];
    if (this.searchForm.valid) {
      const searchTerm = this.searchForm.get('searchTerm')?.value;
      if (searchTerm) {
        this.reloadItems = true;
        this.searchTerms = searchTerm;
      }
    }
    this.reloadItems = false;
  }
}
