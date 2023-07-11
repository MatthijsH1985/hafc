import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

@Injectable()
export class MetaService {
  constructor(private router: Router, private titleService: Title, private metaService: Meta) {}

  setMetaTag(metaUrl: string = '/', description: string = 'HAFC.nl is de grootste Heracles community voor en door supporters', image: string = '') {
    this.metaService.addTag({property: 'og:title', content: 'HAFC.nl - Wij Zij Heracles'});
    this.metaService.addTag({property: 'og:locale', content: 'nl_NL'});
    this.metaService.addTag({property: 'og:type', content: 'website'});
    this.metaService.addTag({property: 'og:image', content: image});
    this.metaService.addTag({property: 'og:description', content: description});
    this.metaService.addTag({property: 'og:url', content: metaUrl});
    this.metaService.addTag({property: 'og:site_name', content: 'HAFC.nl'});
    this.metaService.addTag({property: 'twitter:site', content: 'heracles1903'});
    this.metaService.addTag({property: 'twitter:description', content: description});
    this.metaService.addTag({property: 'twitter:image', content: image});
  }

  updateMetaTag(metaUrl: string = '/', description: string = 'HAFC.nl is de grootste Heracles community voor en door supporters', image: string = '') {
    this.metaService.updateTag({property: 'og:title', content: 'HAFC.nl - Wij Zij Heracles'});
    this.metaService.updateTag({property: 'og:image', content: image});
    this.metaService.updateTag({property: 'og:description', content: description});
    this.metaService.updateTag({property: 'og:url', content: metaUrl});
    this.metaService.updateTag({property: 'twitter:description', content: description});
    this.metaService.updateTag({property: 'twitter:image', content: image});
  }
}
