import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  faThumbsUp,
  faThumbtack,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Player } from 'src/app/models/player';
import { AppState } from 'src/app/store/app-state';
import {
  setDislikeForPlayer,
  setLikeForPlayer,
} from 'src/app/store/players.actions';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  @Input() player: Player | null = null;
  iconLike = faThumbsUp;
  iconDislike = faThumbsDown;

  lastPlayer: Player = {
    id: 0,
    fullname: '',
    position: '',
    image: '',
    likes: 0,
    dislikes: 0,
  };
  liked: boolean = false;
  disliked: boolean = false;

  constructor(private store: Store<AppState>) { }

  checkPlayer() {
    if (this.lastPlayer.id !== this.player?.id) {
      this.liked = false;
      this.disliked = false;
      this.lastPlayer.id = this.player!.id;
    }
  }

  setLike() {
    this.checkPlayer();
    if (!this.player) return;
    if (!this.liked) {
      this.store.dispatch(
        setLikeForPlayer({
          player: {
            id: this.player.id,
            fullname: this.player.fullname,
            position: this.player.position,
            image: this.player.image,
            likes: this.player.likes + 1,
            dislikes: this.player.dislikes,
          },
        })
      );
      //this.player.likes ++;
      this.liked = true;
    } else {
      this.store.dispatch(
        setLikeForPlayer({
          player: {
            id: this.player.id,
            fullname: this.player.fullname,
            position: this.player.position,
            image: this.player.image,
            likes: this.player.likes - 1,
            dislikes: this.player.dislikes,
          },
        })
      );

      //this.player.likes--;
      this.liked = false;
    }
  }
  setDislike() {
    this.checkPlayer();
    if (!this.player) return;
    if (!this.disliked) {
      this.store.dispatch(
        setDislikeForPlayer({
          player: {
            id: this.player.id,
            fullname: this.player.fullname,
            position: this.player.position,
            image: this.player.image,
            likes: this.player.likes,
            dislikes: this.player.dislikes + 1,
          },
        })
      );
      //this.player.dislikes ++;
      this.disliked = true;
    } else {
      this.store.dispatch(
        setDislikeForPlayer({
          player: {
            id: this.player.id,
            fullname: this.player.fullname,
            position: this.player.position,
            image: this.player.image,
            likes: this.player.likes,
            dislikes: this.player.dislikes - 1,
          },
        })
      );
      //this.player.dislikes--;
      this.disliked = false;
    }
  }

  ngOnInit(): void {
    this.liked = false;
    this.disliked = false;
  }
}
