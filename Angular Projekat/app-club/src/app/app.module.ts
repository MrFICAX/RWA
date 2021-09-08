import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ClubDetailsComponent } from './components/club-details/club-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { PlayersService } from './services/players.service';
import { PlayerThumbnailComponent } from './components/player-thumbnail/player-thumbnail.component';
import { StoreModule } from '@ngrx/store';
import { playerReducer } from './store/players.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { PlayersEffects } from './store/movies.effects';
import { AppRoutingModule } from './app-routing.module';
import { StadiumComponent } from './components/stadium/stadium.component';
import { PlayersComponent } from './components/players/players.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ClubDetailsComponent,
    PlayerDetailsComponent,
    PlayersListComponent,
    PlayerThumbnailComponent,
    StadiumComponent,
    PlayersComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    StoreModule.forRoot({club: playerReducer}),
    StoreDevtoolsModule.instrument({
        maxAge: 25
    }),
    EffectsModule.forRoot([PlayersEffects]),
    AppRoutingModule,
    RouterModule
  ],
  providers: [PlayersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
