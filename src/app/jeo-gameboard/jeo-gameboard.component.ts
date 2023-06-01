import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../services/players.service';
import { GameboardService } from '../services/gameboard.service';

@Component({
  selector: 'jeo-gameboard',
  templateUrl: './jeo-gameboard.component.html'
})
export class JeoGameboardComponent implements OnInit {

  constructor(
    private playersService: PlayersService) { }

  ngOnInit(): void {
  }

  /**
   * Get list of players.
   */
  get players() {
    return this.playersService.getPlayerSettings();
  }

  /**
   * Reset scores to $0 for each player.
   */
  resetScores(): void {
    this.playersService.onScoresReset();
  }

  /**
   * Exit the game.
   */
  exitGame(): void {
    this.playersService.onGameExit();
  }

}
