import { Component } from '@angular/core';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {SidebarModule} from 'primeng/sidebar';
import {Button} from 'primeng/button';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    SidebarModule,
    Button,
    CommonModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  sidebarVisible = false;
}
