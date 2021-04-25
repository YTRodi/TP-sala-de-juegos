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
import { FormsModule } from '@angular/forms';
import { TatetiComponent } from './pages/games/tateti/tateti.component';
import { PiedrapapelotijeraComponent } from './pages/games/piedrapapelotijera/piedrapapelotijera.component';
import { CardComponent } from './components/card/card.component';

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
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ProtectedRoutingModule,
    FormsModule,
  ],
})
export class ProtectedModule {}
