import {Component, Input, OnInit} from '@angular/core';
import {AdsService} from "../../services/ads.service";
import {Subscription} from "rxjs";
import {Platform} from "@angular/cdk/platform";
// @ts-ignore
import * as _ from "lodash";

@Component({
  selector: 'app-adds',
  templateUrl: './adds.component.html',
  styleUrls: ['./adds.component.scss']
})
export class AddsComponent implements OnInit{

  adsSub: Subscription | undefined;
  ads: any | undefined = [];
  @Input() layout: string | undefined;
  randomizedAds: any | undefined;

  constructor(private adsService: AdsService, private platform: Platform) {
  }

  ngOnInit() {
    this.getAds();
  }

  getAds() {
    this.adsSub = this.adsService.getAds().subscribe({
        next: ads => {
          this.randomizeAds(ads);
        },
        error: error => {
          console.error(error);
        }
      }
    )
  }

  randomizeAds(ads: any) {
    this.randomizedAds  = _.sampleSize(ads, 4);
    if (this.platform.isBrowser) {
      setInterval(() => {
        const adsRandimized = _.sampleSize(ads, 4);
        this.randomizedAds = adsRandimized;
      }, 15000)
    }
  }

}
