import {mergeApplicationConfig, ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {ConfigService} from './core/services/config.service';
import {PostsService} from './news/services/posts.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch()),
    ConfigService,
    PostsService
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
