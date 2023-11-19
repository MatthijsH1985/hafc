import { NgModule } from '@angular/core';
import {AdsComponent} from "./ads/ads.component";
import {AdsService} from "./services/ads.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {CoreModule} from '../core/core.module';

@NgModule({
  declarations: [
    AdsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ],
  exports: [
    AdsComponent
  ],
  providers: [
    AdsService
  ]
})
export class AdsModule { }
