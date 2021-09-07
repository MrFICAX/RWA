import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Player } from 'src/app/models/player';
import { PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {

  players: Observable<Player[]> = of([]);
  @Output() onSelectedPlayer: EventEmitter<Player> = new EventEmitter<Player>();

  constructor(private PlayerService: PlayersService) { }

  ngOnInit(): void {
    this.players = this.PlayerService.getAll();
  }

  selectPlayer(player: Player){
    this.onSelectedPlayer.emit(player);
  }
}
