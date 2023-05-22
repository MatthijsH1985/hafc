import { Component } from '@angular/core';
import { faStream} from "@fortawesome/free-solid-svg-icons";
import {MenuService} from "../../services/menu.service";

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
