import {Routes} from '@angular/router';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {HeadlinesResolver} from './news/services/resolvers/headlines-resolver.service';
import {PostsResolver} from './news/services/resolvers/posts-resolver.service';
import {LinksResolver} from './core/services/resolvers/links.resolver';
import {LatestCommentsResolver} from './comments/services/resolvers/latest-comments.resolver';
import {SpecialsComponent} from './pages/specials/specials.component';
import {DonateComponent} from './pages/donate/donate.component';
import {ThankYouComponent} from './pages/donate/thank-you/thank-you.component';
import {NieuwsberichtComponent} from './pages/nieuwsbericht/nieuwsbericht.component';
import {PostResolver} from './news/services/resolvers/post-resolver.service';
import {CommentsResolverService} from './services/resolvers/comments-resolver.service';
import {SinglePageComponent} from './pages/single-page/single-page.component';
import {TeamComponent} from './pages/team/team.component';
import {Competitioncomponent} from './pages/competition/competition/competitioncomponent';
import {ProgrammaComponent} from './pages/competition/programma/programma.component';
import {MatchreportComponent} from './pages/competition/matchreport/matchreport.component';
import {StandComponent} from './pages/competition/stand/stand.component';
import {ResultsComponent} from './pages/competition/results/results.component';
import {TeamstatsComponent} from './pages/team/teamstats/teamstats.component';
import {SelectieComponent} from './pages/team/selectie/selectie.component';
import {SpelerComponent} from './pages/team/speler/speler.component';
import {MatchpreviewComponent} from './pages/competition/matchpreview/matchpreview.component';
import {MatchResolver} from './services/resolvers/match-resolver.service';
import {NieuwsarchiefComponent} from './pages/nieuwsarchief/nieuwsarchief.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {TestComponent} from './pages/test/test.component';

export const routes: Routes = [
  {
    component: HomepageComponent,
    path: '',
    resolve: {
      headlines: HeadlinesResolver,
      posts: PostsResolver,
      links: LinksResolver,
      latestComments: LatestCommentsResolver
    }
  },
  {
    component: SpecialsComponent,
    path: 'specials'
  },
  {
    component: TestComponent,
    path: 'test'
  },
  {
    component: DonateComponent,
    path: 'doneer',
  },
  {
    component: ThankYouComponent,
    path: 'doneer/dank-je-wel',
  },
  {
    component: NieuwsberichtComponent,
    path: 'nieuws/:id/:title',
    resolve: {
      post: PostResolver,
      links: LinksResolver,
      comments: CommentsResolverService
    }
  },
  {
    component: SinglePageComponent,
    path: 'page/:id/:title'
  },
  {
    component: TeamComponent,
    path: 'club',
    children: [
      {
        component: Competitioncomponent,
        path: 'competitie',
        children: [
          {
            component: ProgrammaComponent,
            path: 'wedstrijdprogramma'
          },
          {
            component: MatchreportComponent,
            path: 'wedstrijdprogramma/:matchId/report'
          },
          {
            component: StandComponent,
            path: 'stand'
          },
          {
            component: ResultsComponent,
            path: 'uitslagen'
          },
          {
            component: MatchreportComponent,
            path: 'uitslagen/:matchId'
          },
        ]
      },
      {
        component: TeamstatsComponent,
        path: 'teamstats/:teamId'
      },
      {
        component: SelectieComponent,
        path: 'selectie'
      },
      {
        component: SpelerComponent,
        path: 'selectie/:id/:naam'
      }
    ]
  },
  {
    component: MatchpreviewComponent,
    path: 'voorbeschouwing/:id/:opponents',
    resolve: {
      post: MatchResolver,
      comments: CommentsResolverService
    }
  },
  {
    component: NieuwsarchiefComponent,
    path: 'nieuws',
    resolve: {
      posts: PostsResolver
    }
  },
  {
    path: 'feed',
    component: NotFoundComponent
  },
  {
    component: NotFoundComponent,
    path: '**'
  }
];
