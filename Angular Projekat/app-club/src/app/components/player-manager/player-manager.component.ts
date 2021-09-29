import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';
import { Player } from 'src/app/models/player';
import { Observable, of } from 'rxjs';
import { selectAllPlayers } from 'src/app/store/players.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { selectPlayer } from 'src/app/store/players.actions';
import * as Actions from 'src/app/store/players.actions';

@Component({
  selector: 'app-player-manager',
  templateUrl: './player-manager.component.html',
  styleUrls: ['./player-manager.component.css'],
})
export class PlayerManagerComponent implements OnInit {
  displayedColumns: string[] = [
    'photo',
    'id',
    'name',
    'position',
    'likes',
    'dislikes',
    'actions',
  ];
  players: Observable<readonly Player[]> = of([]);
  // array: Player[] = [];
  dataSource: Player[] = [];
  selectedPlayer: Player = {
    id: 0,
    fullname: '',
    image: '',
    position: '',
    likes: 0,
    dislikes: 0,
  };

  constructor(
    private PlayersService: PlayersService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(selectAllPlayers).subscribe((e) => {
            this.dataSource = e;
    });
  }
  // this.PlayersService.readPlayers().subscribe((result)=>{

  //  })

  // handleFileInput(event: any) {
  //   // this.fileToUpload = files.item[0];
  //   // this.selectedPlayer.image = this.fileToUpload!.name;
  //   console.log(event.target.files[0]);
  //   var path = (window.URL || window.webkitURL).createObjectURL(
  //     event.target.files[0]
  //   );
  //   console.log('path', path);

  //   console.log(event.target.files[0].mozFullPath);
  // }

  selectPlayer(player: Player) {
    this.selectedPlayer.id = player.id;
    this.selectedPlayer.fullname = player.fullname;
    this.selectedPlayer.position = player.position;
    this.selectedPlayer.image = player.image;

    this.store.dispatch(selectPlayer({playerId: player.id}));
  }

  newPlayer() {
    this.clearSelectedPlayer();
  }

  createPlayer(p: Player) {
    // this.PlayersService.createPlayer(p).subscribe((result) => {
    //   console.log(result);
    // });

    this.store.dispatch(Actions.addNewPlayer({player: p}));
    this.clearSelectedPlayer();
  }

  deletePlayer(id: number) {
    // this.PlayersService.deletePlayer(id).subscribe((result) => {
    //   console.log(result);
    // });

    this.store.dispatch(Actions.deletePlayer({playerId: id}));

  }

  updatePlayer(p: Player) {
    //f.value.id = this.selectedPlayer['id'];
    // this.PlayersService.updatePlayer(p).subscribe((result) => {
    //   console.log(result);
    // });
    this.store.dispatch(Actions.updatePlayer({playerId: p.id, player: p}))
    this.clearSelectedPlayer();
  }

  clearSelectedPlayer(){
    this.selectedPlayer = {
      id: 0,
      fullname: '',
      image: '',
      position: '',
      likes: 0,
      dislikes: 0,
    };
  }
}
