import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller) {
  }
  ngOnInit() {
    this.viewportScroller.scrollToPosition([0,0]);
  }
}
