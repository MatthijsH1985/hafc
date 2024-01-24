import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeamComponent} from "./pages/team/team.component";
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {NieuwsberichtComponent} from "./pages/nieuwsbericht/nieuwsbericht.component";
import {NieuwsarchiefComponent} from "./pages/nieuwsarchief/nieuwsarchief.component";
import {AccountComponent} from "./pages/account/account.component";
import {AccountDetailsComponent} from "./pages/account/account-details/account-details.component";
import {AuthGuard} from "./services/auth/auth.guard";
import {LoginComponent} from "./pages/account/login/login.component";
import {LogoutComponent} from "./pages/account/logout/logout.component";
import {SpelerComponent} from "./pages/team/speler/speler.component";
import {UserConfigComponent} from "./pages/account/user-config/user-config.component";
import {UserCommentsComponent} from "./pages/account/user-comments/user-comments.component";
import {RegisterComponent} from "./pages/account/register/register.component";
import {SpecialsComponent} from "./pages/specials/specials.component";
import {TeamstatsComponent} from "./pages/team/teamstats/teamstats.component";
import {PasswordResetComponent} from "./pages/account/password-reset/password-reset.component";
import {SetNewPasswordComponent} from "./pages/account/set-new-password/set-new-password.component";
import {UserConfigEditableComponent} from "./pages/account/user-config-editable/user-config-editable.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {SinglePageComponent} from "./pages/single-page/single-page.component";
import {MatchResolver} from "./services/resolvers/match-resolver.service";
import {PostResolver} from "./news/services/resolvers/post-resolver.service";
import {MatchpreviewComponent} from "./competition/matchpreview/matchpreview.component";
import {MatchreportComponent} from "./competition/matchreport/matchreport.component";
import {SelectieComponent} from "./pages/team/selectie/selectie.component";
import {ResultsComponent} from "./competition/results/results.component";
import {StandComponent} from "./competition/stand/stand.component";
import {ProgrammaComponent} from "./competition/programma/programma.component";
import {Competitioncomponent} from "./competition/competition/competitioncomponent";
import {PostsResolver} from "./news/services/resolvers/posts-resolver.service";
import {VerifyAccountComponent} from "./pages/account/verify-account/verify-account.component";
import {LinksResolver} from "./core/services/resolvers/links.resolver";
import {LatestCommentsResolver} from "./comments/services/resolvers/latest-comments.resolver";
import {ShopHomepageComponent} from './shop/shophomepage/shophomepage.component';
import {ProductComponent} from './shop/product/product.component';
import {CartComponent} from './shop/cart/cart.component';
import {HeadlinesResolver} from './news/services/resolvers/headlines-resolver.service';
import {CommentsResolverService} from './services/resolvers/comments-resolver.service';
import {CheckoutComponent} from './shop/checkout/checkout.component';
import {ProductsComponent} from './shop/products/products.component';
const routes: Routes = [

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
    component: NieuwsberichtComponent,
    path: 'nieuws/:id/:title',
    resolve: {
      post: PostResolver,
      links: LinksResolver,
      comments: CommentsResolverService
    }
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
    component: AccountComponent,
    path: 'account'
  },
  {
    component: LoginComponent,
    path: 'account/login'
  },
  {
    component: RegisterComponent,
    path: 'account/register'
  },
  {
    component: PasswordResetComponent,
    path: 'account/password-reset'
  },
  {
    component: VerifyAccountComponent,
    path: 'account/verify-account/:verificationKey'
  },
  {
    component: SetNewPasswordComponent,
    path: 'account/set-new-password'
  },
  {
    component: LogoutComponent,
    path: 'account/logout'
  },
  {
    component: AccountDetailsComponent,
    path: 'account/details',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'mijn-gegevens',
        component: UserConfigComponent
      },
      {
        path: 'mijn-gegevens/edit',
        component: UserConfigEditableComponent
      },
      {
        path: 'mijn-reacties',
        component: UserCommentsComponent
      }
    ]
  },
  {
    path: 'page/:id/:title',
    component: SinglePageComponent
  },
  {
    path: 'shop',
    children: [
      {
        path: '',
        component: ShopHomepageComponent,
      },
      {
        path: 'product/:slug',
        component: ProductComponent
      },
      {
        path: 'producten',
        component: ProductsComponent
      },
      {
        path: 'winkelwagen',
        component: CartComponent
      },
      {
        path: 'afrekenen',
        component: CheckoutComponent
      }
    ]
  },
  {
    component: NotFoundComponent,
    path: '**'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
