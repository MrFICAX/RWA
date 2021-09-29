import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from  '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { PlayerManagerComponent } from './components/player-manager/player-manager.component';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { AuthNavComponent } from './components/auth-nav/auth-nav.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ClubDetailsComponent,
    PlayerDetailsComponent,
    PlayersListComponent,
    PlayerThumbnailComponent,
    StadiumComponent,
    PlayersComponent,
    PlayerManagerComponent,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    AuthNavComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({club: playerReducer}),
    StoreDevtoolsModule.instrument({
        maxAge: 25
    }),
    EffectsModule.forRoot([PlayersEffects]),
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [PlayersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
