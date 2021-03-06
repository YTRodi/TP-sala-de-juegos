import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';
import { ProtectedRoutingModule } from './protected-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GamesComponent } from './pages/games/games.component';
import { AboutComponent } from './pages/about/about.component';
import { ChatComponent } from './pages/chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TatetiComponent } from './pages/games/tateti/tateti.component';
import { PiedrapapelotijeraComponent } from './pages/games/piedrapapelotijera/piedrapapelotijera.component';
import { CardComponent } from './components/card/card.component';
import { MemotestComponent } from './pages/games/memotest/memotest.component';
import { BoardComponent } from './pages/games/memotest/board/board.component';
import { MemoblockComponent } from './pages/games/memotest/memoblock/memoblock.component';
import { SnakeComponent } from './pages/games/snake/snake.component';
import { ScoreTableComponent } from './components/score-table/score-table.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SurveyComponent } from './components/survey/survey.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    GamesComponent,
    AboutComponent,
    ChatComponent,
    TatetiComponent,
    PiedrapapelotijeraComponent,
    CardComponent,
    MemotestComponent,
    BoardComponent,
    MemoblockComponent,
    SnakeComponent,
    ScoreTableComponent,
    SpinnerComponent,
    SurveyComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ProtectedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProtectedModule {}
