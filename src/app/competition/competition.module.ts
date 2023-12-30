import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StandingsService} from "./services/standings.service";
import {FixturesService} from "./services/fixtures.service";
import {CoreModule} from "../core/core.module";
import {VolgendeWedstrijdComponent} from "./volgende-wedstrijd/volgende-wedstrijd.component";
import {StandComponent} from "./stand/stand.component";
import {ProgrammaComponent} from "./programma/programma.component";
import {ResultsComponent} from "./results/results.component";
import {MatchpreviewComponent} from "./matchpreview/matchpreview.component";
import {MatchreportComponent} from "./matchreport/matchreport.component";
import {Competitioncomponent} from "./competition/competitioncomponent";
import {RouterModule} from "@angular/router";
import {CommentsModule} from "../comments/comments.module";
import {AdsModule} from '../ads/ads.module';

@NgModule({
  declarations: [
    VolgendeWedstrijdComponent,
    StandComponent,
    ProgrammaComponent,
    ResultsComponent,
    MatchpreviewComponent,
    MatchreportComponent,
    Competitioncomponent
  ],
    imports: [
        CommonModule,
        CoreModule,
        RouterModule,
        CommentsModule,
        AdsModule
    ],
  exports: [
    VolgendeWedstrijdComponent,
    StandComponent
  ],
  providers: [
    StandingsService,
    FixturesService
  ]
})
export class CompetitionModule { }
