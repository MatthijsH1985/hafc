import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {PostsService} from './news/services/posts.service';
import {ConfigService} from './core/services/config.service';
import {AdsService} from './ads/services/ads.service';
import {CommentsService} from './comments/services/comments.service';
import {FixturesService} from './competition/services/fixtures.service';
import {StandingsService} from './competition/services/standings.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    CoreModule,
    PostsService,
    ConfigService,
    AdsService,
    CommentsService,
    FixturesService,
    StandingsService
  ]
};
