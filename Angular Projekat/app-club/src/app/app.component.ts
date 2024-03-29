import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Player } from './models/player';
import { Stadium } from './models/stadium';
import { PlayersService } from './services/players.service';
import { AppState } from './store/app-state';
import { selectSelectedPlayer } from './store/players.selectors';
import * as Actions from 'src/app/store/players.actions';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app-club';

  profileJson: string = "";

  //selectedPlayer: Observable<Player | null> = of(null);
  //MyStadium: Observable<Stadium | null> = of(null);

  // MyStadium: Stadium = {
  //   id: 1,
  //   name: "Rajko Mitic",
  //   description: "Rajko Mitić Stadium (Serbian: Стадион Рајко Митић / Stadion Rajko Mitić, previously known as Red Star Stadium (Serbian: Стадион Црвена звезда / Stadion Crvena zvezda), also known as Marakana (Serbian Cyrillic: Маракана) is a multi-use stadium in Belgrade, Serbia which has been the home ground of Red Star Belgrade since 1963. The stadium is located in Dedinje, municipality of Savski Venac.",
  //   image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Fk_Red_Star_stadium.jpg/300px-Fk_Red_Star_stadium.jpg",
  //   city: "Beograd",
  //   attendance: 53000
  // };
  
  
  constructor(private store: Store<AppState>, private service: PlayersService, public auth: AuthService){

  }
  ngOnInit(): void {
    this.store.dispatch(Actions.loadPlayersFromEffects());
    //this.selectedPlayer = this.store.select(selectSelectedPlayer);

    // this.service.getStadium().subscribe(stadium => {
    //   this.store.dispatch(Actions.loadStadium({stadium: stadium}));
    // })
    this.store.dispatch(Actions.loadStadiumFromEffects());
    //this.MyStadium = this.store.select(selectStadium);

    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
  }

}
