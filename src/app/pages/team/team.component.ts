import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  standalone: true
})
export class TeamComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller, private router: Router) {
  }
  ngOnInit() {
    this.viewportScroller.scrollToPosition([0,0]);
  }
}
