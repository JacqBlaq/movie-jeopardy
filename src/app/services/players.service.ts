import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IPlayer {
  id: number;
  name: string;
  avatar?: string;
  score?: number;
}

export interface IActivePlayer extends IPlayer {
  index: number;
}


@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private storageName: string = 'players';
  private players: IPlayer[] = [{ id: 1, name: '' }];

  private players$: BehaviorSubject<IPlayer[]> = new BehaviorSubject<IPlayer[]>([{ id: 1, name: '' }]);
  private activePlayerId$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  /**
   * Get the current players.
   *
   * @returns {IPlayer[]} Players array.
   */
  getPlayers(): IPlayer[] {
    return this.players$.value;
  }


  /**
   * Get the 'id' of the player whose turn it is currently.
   *
   * @returns {number} Player's 'id'.
   */
  getActivePlayerId(): number {
    return this.activePlayerId$.value;
  }


  /**
   * Get the index of the player whose turn it is currently.
   * @returns {number} Index of active player.
   */
  private getActivePlayerIndex(): number {
    return this.getPlayerSettings().findIndex(p => p.id === this.getActivePlayerId());
  }


  /**
   * Get the active player.
   *
   * @returns {IActivePlayer | undefined} Active player object.
   */
  getActivePlayerById(): IActivePlayer {
    const foundPlayer = this.getPlayerSettings()
      .find(p => p.id === this.getActivePlayerId()) || this.getPlayerSettings()[0];

      const player: IActivePlayer = {
      ...foundPlayer,
      index: this.getActivePlayerIndex()
    };

    return player;
  }


  /**
   * Add a new player to the game only if the max limit of 5 hasnt been reached.
   */
  onAddPlayer(): void {
    if (this.players.length === 5) { return; }

    const lastPlayer = this.players[this.players.length - 1]
    this.players.push({
      id: lastPlayer.id + 1,
      name: ''
    });

    this.setPlayerSettings();
  }


  /**
   * Remove a previously added player from game.
   *
   * @param {number} id - Unique player id.
   */
  onRemovePlayer(id: number): void {
    if (this.players.length === 1) { return; }

    this.players = this.players.filter(p => p.id !== id);
    this.setPlayerSettings();
  }


  /**
   * Update player's score when they get an answer correct.
   * @param {number} playerIndex - Index of player
   * @param {number} points - Points added to player's overall score.
   */
  onScoreIncrease(playerIndex: number, points: number): void {
    const score = this.players[playerIndex].score ?? 0;
    this.players[playerIndex].score = score + points;

    this.setPlayerSettings();
  }


  /**
   * Store the uploaded image as a player's avatar at the given index.
   *
   * @param {number} index - Index of player in array.
   * @param {string} src - Base64 string of image player uploaded.
   */
  onAvatarUpload(index: number, src: string): void {
    this.players[index].avatar = src;
    this.setPlayerSettings();
  }


  /**
   * Store the updated value of a player's name at the given index.
   *
   * @param {number} index - Index of player in array.
   * @param {string} change - Updated value of the player's name.
   */
  onNameChange(index: number, change: string): void {
    this.players[index].name = change;
    this.setPlayerSettings();
  }


  /**
   * Set the score for each player to 0.
   */
  onScoresReset(): void {
    this.players.forEach(p => {
      p.score = 0;
    });
    this.setPlayerSettings();
  }


  /**
   * Empty players array and update player settings.
   */
  onGameExit(): void {
    this.players = [{ id: 1, name: '' }];
    this.setPlayerSettings();
  }


  /**
   * Store players in localStorage.
   */
  private setPlayerSettings(): void {
    this.players$.next(this.players);
    localStorage.setItem(this.storageName, JSON.stringify(this.getPlayers()));
  }


  /**
   * Get array of players from localStorage.
   *
   * @returns {IPlayer[]} List of players.
   */
  getPlayerSettings(): IPlayer[] {
    const data = localStorage.getItem(this.storageName);
    return data ? JSON.parse(data) : [];
  }

}
