import {Component, Input, OnInit} from '@angular/core';
import {AdsService} from "../services/ads.service";
import {Subscription} from "rxjs";
import {Platform} from "@angular/cdk/platform";
import * as _ from "lodash";
import * as moment from 'moment';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit{

  adsSub: Subscription | undefined;
  @Input() layout: string | undefined;
  randomizedAds: any | undefined;
  arrowRight= faArrowRight;
  formattedAds: any = [];

  constructor(private adsService: AdsService, private platform: Platform) {
  }

  ngOnInit() {
    this.getAds();
  }

  getAds() {
    this.adsSub = this.adsService.getAds().subscribe({
        next: (ads: any) => {
          const currentDate = new Date();
          for (let i = 0; i < ads.length; i++) {
            const adEndDate = moment(ads[i].acf.eindigt_op, 'DD/MM/YYYY').toDate();
            if (adEndDate > currentDate) {
              this.formattedAds.push(ads[i]);
            }
          }
          this.randomizeAds(this.formattedAds);
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
