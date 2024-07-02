import {Component, OnInit} from '@angular/core';
import {CommonModule, ViewportScroller} from "@angular/common";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class TeamComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller, private router: Router) {
  }
  ngOnInit() {
    this.viewportScroller.scrollToPosition([0,0]);
  }
}

