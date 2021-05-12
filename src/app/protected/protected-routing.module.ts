import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChatComponent } from './pages/chat/chat.component';
import { GamesComponent } from './pages/games/games.component';
import { TatetiComponent } from './pages/games/tateti/tateti.component';
import { PiedrapapelotijeraComponent } from './pages/games/piedrapapelotijera/piedrapapelotijera.component';
import { MemotestComponent } from './pages/games/memotest/memotest.component';
import { SnakeComponent } from './pages/games/snake/snake.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // Ruta padre (contiene el segundo router)
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'games', component: GamesComponent },
      { path: 'games/tateti', component: TatetiComponent },
      {
        path: 'games/piedrapapelotijeras',
        component: PiedrapapelotijeraComponent,
      },
      {
        path: 'games/memotest',
        component: MemotestComponent,
      },
      {
        path: 'games/snake',
        component: SnakeComponent,
      },
      { path: 'about', component: AboutComponent },
      { path: 'chat', component: ChatComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}
