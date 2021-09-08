import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Player } from 'src/app/models/player';
import { PlayersService } from 'src/app/services/players.service';
import { AppState } from 'src/app/store/app-state';
import * as Actions from 'src/app/store/players.actions';
import { selectAllPlayers } from 'src/app/store/players.selectors';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {

  players: Observable<readonly Player[]> = of([]);

  constructor(private store: Store<AppState>, private PlayerService: PlayersService) { }

  ngOnInit(): void {
    //this.players = this.PlayerService.getAll();

    //AKCIJA SE NE DISPATCH-UJE IZ SUBSCRIBE-A !! OVAKO SE NE RADI
    // this.PlayerService.getPlayers().subscribe(NewPlayers => {
    //   this.store.dispatch(Actions.loadPlayers({players: NewPlayers}));
    // })
///---------------------------------
    this.players = this.store.select(selectAllPlayers);
  }

  selectPlayer(player: Player){
    //this.onSelectedPlayer.emit(player);
    this.store.dispatch(Actions.selectPlayer({playerId: player.id}));
  }
}
