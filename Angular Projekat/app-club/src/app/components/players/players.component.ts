import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Player } from 'src/app/models/player';
import { AppState } from 'src/app/store/app-state';
import { selectSelectedPlayer } from 'src/app/store/players.selectors';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  selectedPlayer: Observable<Player | null> = of(null);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.selectedPlayer = this.store.select(selectSelectedPlayer);

  }

}
