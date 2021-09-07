import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-player-thumbnail',
  templateUrl: './player-thumbnail.component.html',
  styleUrls: ['./player-thumbnail.component.css'],
})
export class PlayerThumbnailComponent implements OnInit {
  @Input() player: Player | null = null;
  @Output() onClick: EventEmitter<Player> = new EventEmitter<Player>();

  constructor() {}

  ngOnInit(): void {}

  clicked() {
    if (this.player) this.onClick.emit(this.player);
  }
}
