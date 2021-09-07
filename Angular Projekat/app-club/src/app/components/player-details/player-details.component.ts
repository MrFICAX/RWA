import { Component, Input, OnInit } from '@angular/core';
import { faThumbsUp, faThumbtack, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Player } from 'src/app/models/player';


@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  // @Input() player:Player = {
  //   id: 0,
  //   fullname:"",
  //   position:"",
  //   image:"",
  //   likes: 0,
  //   dislikes: 0
  // };

  @Input() player:Player | null = null;
  iconLike = faThumbsUp;
  iconDislike = faThumbsDown;

  static liked:boolean = false;
  static disliked:boolean = false;

  constructor() { }

  setLike(){
    if(!this.player)
      return;
    if(!PlayerDetailsComponent.liked)
    {
      this.player.likes ++; 
      PlayerDetailsComponent.liked = true; 
    }
    else
    {
      this.player.likes--;
      PlayerDetailsComponent.liked = false;
    }
  }
  setDislike(){
    if(!this.player)
      return;
    if(!PlayerDetailsComponent.disliked)
    {
           this.player.dislikes ++;
           PlayerDetailsComponent.disliked = true; 
    }
    else
    {
      this.player.dislikes--;
      PlayerDetailsComponent.disliked = false;
    }
  }

  ngOnInit(): void {
  }

}
