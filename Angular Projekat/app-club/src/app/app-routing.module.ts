import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StadiumComponent } from './components/stadium/stadium.component';
import { PlayersComponent } from './components/players/players.component';
import { PlayerManagerComponent } from './components/player-manager/player-manager.component';

const routes: Routes = [
  {
    path:"stadium",
    component: StadiumComponent
  },
  {
    path:"players",
    component: PlayersComponent
  },
  {
    path:"player-manager",
    component: PlayerManagerComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
