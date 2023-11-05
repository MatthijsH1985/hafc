import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntersectionObserverService {
  loadPolyfill() {
    if (typeof IntersectionObserver === 'undefined') {
      // Dynamisch het polyfill laden als Intersection Observer niet beschikbaar is.
      const script = document.createElement('script');
      script.src = 'path/to/intersection-observer.js'; // Pas het pad aan naar het polyfill-script.
      document.body.appendChild(script);
    }
  }
}
