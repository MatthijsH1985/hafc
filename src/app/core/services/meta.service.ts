import {Inject, Injectable} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {DOCUMENT} from "@angular/common";

@Injectable()
export class MetaService {
  constructor(private router: Router, @Inject(DOCUMENT) private doc: any, private titleService: Title, private metaService: Meta) {}

  setMetaTag(metaUrl: string = '/', description: string = 'HAFC.nl is de grootste Heracles community voor en door supporters', image: string = '') {
    this.metaService.addTags([
      {
        property: 'og:title', content: 'HAFC.nl - Wij Zij Heracles'
      },
      {
        property: 'og:locale', content: 'nl_NL'
      },
      {
        property: 'og:type', content: 'website'
      },
      {
        property: 'og:image', content: image
      },
      {
        property: 'og:description', content: description
      },
      {
        property: 'og:url', content: metaUrl
      },
      {
        property: 'og:site_name', content: 'HAFC.nl'
      },
      {
        property: 'twitter:site', content: 'heracles1903'
      },
      {
        property: 'twitter:description', content: description
      },
      {
        property: 'twitter:image', content: image
      }
    ])
  }

  updateMetaTag(title: any, metaUrl: string = 'https://www.hafc.nl', description: string = 'HAFC.nl is de grootste Heracles community voor en door supporters. Volg hier het laatste nieuws over Heracles en blijf op de hoogte!', image: string = '') {
    this.titleService.setTitle(title);
    this.metaService.updateTag({name: 'description', content: description.slice(0,140)});
    this.metaService.updateTag({property: 'og:title', content: title});
    this.metaService.updateTag({property: 'og:image', content: image});
    this.metaService.updateTag({property: 'og:description', content: description.slice(0,140)});
    this.metaService.updateTag({property: 'og:url', content: metaUrl});
    this.metaService.updateTag({property: 'og:type', content: 'website'});
    this.metaService.updateTag({property: 'twitter:description', content: description.slice(0,140)});
    this.metaService.updateTag({property: 'twitter:image', content: image});
  }

  updateCanonical(metaUrl: string) {
    this.metaService.updateTag({rel: 'canonical', href: metaUrl})
  }

}
