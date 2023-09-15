import {Component, Input, OnInit} from '@angular/core';
import {AdsService} from "../services/ads.service";
import {Subscription} from "rxjs";
import {Platform} from "@angular/cdk/platform";
// @ts-ignore
import * as _ from "lodash";

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit{

  adsSub: Subscription | undefined;
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
    this.randomizedAds  = _.sampleSize(ads, 6);
    if (this.platform.isBrowser) {
      setInterval(() => {
        const adsRandimized = _.sampleSize(ads, 6);
        this.randomizedAds = adsRandimized;
      }, 15000)
    }
  }

}
