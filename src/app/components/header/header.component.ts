import { Component } from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {faStream} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faStream = faStream;
  constructor(public menuService: MenuService) {
  }
}
