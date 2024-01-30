import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdsService } from '../../../ads/services/ads.service';

@Injectable({
  providedIn: 'root'
})
export class LinksResolver implements Resolve<any> {
  constructor(private adService: AdsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.adService.getLinks().pipe(
      catchError(error => {
        console.error('Error in LinksResolver:', error);
        // Geef een lege waarde terug of een foutbericht, afhankelijk van je vereisten
        return of(null);
      })
    );
  }
}
