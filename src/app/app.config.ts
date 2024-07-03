import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {CoreModule, createTranslateLoader} from './core/core.module';
import {PostsService} from './news/services/posts.service';
import {ConfigService} from './core/services/config.service';
import {AdsService} from './ads/services/ads.service';
import {CommentsService} from './comments/services/comments.service';
import {FixturesService} from './pages/competition/services/fixtures.service';
import {StandingsService} from './pages/competition/services/standings.service';
import {provideToastr} from 'ngx-toastr';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    provideToastr(),
    CoreModule,
    PostsService,
    ConfigService,
    AdsService,
    CommentsService,
    FixturesService,
    StandingsService,
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      })
    ),
  ]
};
