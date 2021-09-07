import { Component, Input, OnInit } from '@angular/core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Player } from 'src/app/models/player';


@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  @Input() player:Player = {
    id: 0,
    fullname:"",
    position:"",
    image:"",
    likes: 0,
    dislikes: 0
  };

  iconLike = faThumbsUp;
  iconDislike = faThumbsDown;

  constructor() { }

  ngOnInit(): void {
  }

}
