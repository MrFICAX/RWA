import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Player } from './models/player';
import { Stadium } from './models/stadium';
import { PlayersService } from './services/players.service';
import { AppState } from './store/app-state';
import { selectSelectedPlayer, selectStadium } from './store/players.selectors';
import * as Actions from 'src/app/store/players.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app-club';
  selectedPlayer: Observable<Player | null> = of(null);
  MyStadium: Observable<Stadium | null> = of(null);

  // MyStadium: Stadium = {
  //   id: 1,
  //   name: "Rajko Mitic",
  //   description: "Rajko Mitić Stadium (Serbian: Стадион Рајко Митић / Stadion Rajko Mitić, previously known as Red Star Stadium (Serbian: Стадион Црвена звезда / Stadion Crvena zvezda), also known as Marakana (Serbian Cyrillic: Маракана) is a multi-use stadium in Belgrade, Serbia which has been the home ground of Red Star Belgrade since 1963. The stadium is located in Dedinje, municipality of Savski Venac.",
  //   image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Fk_Red_Star_stadium.jpg/300px-Fk_Red_Star_stadium.jpg",
  //   city: "Beograd",
  //   attendance: 53000
  // };
  
  
  constructor(private store: Store<AppState>, private service: PlayersService){

  }
  ngOnInit(): void {
    this.selectedPlayer = this.store.select(selectSelectedPlayer);

    this.service.getStadium().subscribe(stadium => {
      this.store.dispatch(Actions.loadStadium({stadium: stadium}));
    })
    this.MyStadium = this.store.select(selectStadium);
  }

}
