import {Inject, Injectable, Renderer2} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {DOCUMENT} from "@angular/common";

@Injectable()
export class MetaService {
  constructor(private router: Router, @Inject(DOCUMENT) private doc: any, private renderer: Renderer2, private titleService: Title, private metaService: Meta) {}

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

  updateMetaTag(metaUrl: string = 'https://www.hafc.nl', description: string = 'HAFC.nl is de grootste Heracles community voor en door supporters', image: string = '') {
    this.metaService.updateTag({property: 'og:title', content: 'HAFC.nl - Wij Zij Heracles'});
    this.metaService.updateTag({property: 'og:image', content: image});
    this.metaService.updateTag({property: 'og:description', content: description});
    this.metaService.updateTag({property: 'og:url', content: metaUrl});
    this.metaService.updateTag({property: 'twitter:description', content: description});
    this.metaService.updateTag({property: 'twitter:image', content: image});
  }

  updateCanonical(metaUrl: string) {
    this.metaService.updateTag({rel: 'canonical', href: metaUrl})
  }

  addCanonical(url: string) {
   // this.metaService.addTag({rel: 'canonical', href: metaUrl})
    this.metaService.removeTag('rel="canonical"');
    const link: HTMLLinkElement = this.renderer.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.titleService.setTitle('');
    this.renderer.appendChild(document.head, link);
  }

}
