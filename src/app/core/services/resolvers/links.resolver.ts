import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {AdsService} from "../../../ads/services/ads.service";

@Injectable({
  providedIn: 'root'
})
export class LinksResolver implements Resolve<any> {
  constructor(private adService: AdsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return this.adService.getLinks();
  }
}
