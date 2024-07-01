import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) {
  }

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0,0]);
  }
}
