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

@NgModule({
  declarations: [
    AppComponent,
    ClubDetailsComponent,
    PlayerDetailsComponent,
    PlayersListComponent,
    PlayerThumbnailComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [PlayersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
