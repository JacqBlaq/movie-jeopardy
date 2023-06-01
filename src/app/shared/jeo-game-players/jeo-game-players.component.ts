import { Component, Input, OnInit } from '@angular/core';
import { IPlayer, PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'jeo-game-players',
  templateUrl: './jeo-game-players.component.html'
})
export class JeoGamePlayersComponent implements OnInit {

  @Input() players: IPlayer[] = [];

  constructor(private playersService: PlayersService) { }

  ngOnInit(): void {
  }


}
