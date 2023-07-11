import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

@Injectable()
export class MetaService {
  constructor(private router: Router, private titleService: Title, private metaService: Meta) {}

  setMetaTag() {
    this.metaService.addTag({property: 'og:title', content: 'HAFC.nl - Wij Zij Heracles'});
    this.metaService.addTag({property: 'og:locale', content: 'nl_NL'});
    this.metaService.addTag({property: 'og:type', content: 'website'});
    this.metaService.addTag({property: 'og:description', content: 'HAFC.nl is de grootste Heracles community voor en door supporters'});
    this.metaService.addTag({property: 'og:url', content: this.router.url});
    this.metaService.addTag({property: 'og:site_name', content: 'HAFC.nl'});
    this.metaService.addTag({property: 'twitter:site', content: 'heracles1903'});
  }

  updateMetaTag(description: any) {
    this.metaService.addTag({property: 'og:title', content: this.titleService.getTitle()});
    this.metaService.addTag({property: 'og:locale', content: 'nl_NL'});
    this.metaService.addTag({property: 'og:type', content: 'website'});
    this.metaService.addTag({property: 'og:description', content: description});
    this.metaService.addTag({property: 'og:url', content: this.router.url});
    this.metaService.addTag({property: 'og:site_name', content: 'HAFC.nl'});
  }
}
