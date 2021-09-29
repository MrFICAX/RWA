import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players.service';
import { Player } from 'src/app/models/player';


@Component({
  selector: 'app-player-manager',
  templateUrl: './player-manager.component.html',
  styleUrls: ['./player-manager.component.css']
})
export class PlayerManagerComponent implements OnInit {

  displayedColumns  :  string[] = ['photo', 'id', 'name', 'position', 'likes', 'dislikes'];
  dataSource : Player[] = [];
  selectedPlayer: Player = {
    id: "",
    fullname: "",
    image:"",
    position:"",
    likes:0,
    dislikes:0
  };

  constructor(private PlayersService: PlayersService) { }

  ngOnInit(): void {
    this.PlayersService.readPlayers().subscribe((result)=>{   
      this.dataSource  =  result;
     })
  }

  selectPlayer(player: Player){
    this.selectedPlayer = player;
  }

  newPlayer(){
    this.selectedPlayer = {
      id: "",
    fullname: "",
    image:"",
    position:"",
    likes:0,
    dislikes:0
    };
  }

  createPlayer(f: { value: Player; }){
    this.PlayersService.createPlayer(f.value).subscribe((result)=>{
      console.log(result);
    });
    
  }

  deletePlayer(id: number){
    this.PlayersService.deletePlayer(id).subscribe((result)=>{
      console.log(result);
    });
  }

  updatePlayer(f: { value: Player; }){
    f.value.id = this.selectedPlayer['id'];
    this.PlayersService.updatePlayer(f.value).subscribe((result)=>{
      console.log(result);
    });
  }

}
