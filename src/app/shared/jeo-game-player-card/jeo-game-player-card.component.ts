import { Component, Input, OnInit } from '@angular/core';
import { IPlayer } from 'src/app/services/players.service';

@Component({
  selector: 'jeo-game-player-card',
  templateUrl: './jeo-game-player-card.component.html'
})
export class JeoGamePlayerCardComponent implements OnInit {

  private _player!: IPlayer;
  labelText: string = '';

  @Input() index: number = 0;
  @Input() activePlayerId: number = 1;
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';

  @Input() get player(): IPlayer {
    return this._player;
  }

  set player(value: IPlayer) {
    this._player = value;

    const playerName = this.player.name || ('Player ' + (this.index+1));
    this.labelText = `${playerName}`;
  }

  constructor() { }

  ngOnInit(): void {

  }

}
