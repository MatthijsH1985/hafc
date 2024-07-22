import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(url: string): SafeResourceUrl {
    const formattedUrl = this.formatUrl(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(formattedUrl);
  }

  private formatUrl(url: string): string {
    return url;
  }

}
