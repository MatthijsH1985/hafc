import { NgModule } from '@angular/core';
import {AdsComponent} from "./ads/ads.component";
import {AdsService} from "./services/ads.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AdsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AdsComponent
  ],
  providers: [
    AdsService
  ]
})
export class AdsModule { }
