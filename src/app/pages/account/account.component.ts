import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent  implements OnInit{
  constructor(private viewportScroller: ViewportScroller) {

  }

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0,0]);
  }
}
