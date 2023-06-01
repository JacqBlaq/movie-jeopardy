import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IPlayer {
  id: number;
  name: string;
  avatar?: string;
  score?: number;
}


@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private storageName: string = 'players';
  private players: IPlayer[] = [{ id: 1, name: '' }];
  private players$: BehaviorSubject<IPlayer[]> = new BehaviorSubject<IPlayer[]>([{ id: 1, name: '' }]);


  /**
   * Get the current players.
   * @returns Players array.
   */
  getPlayers(): IPlayer[] {
    return this.players$.value;
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
   * @param id Unique player id.
   */
  onRemovePlayer(id: number): void {
    if (this.players.length === 1) { return; }

    this.players = this.players.filter(p => p.id !== id);
    this.setPlayerSettings();
  }


  /**
   * Store the uploaded image as a player's avatar at the given index.
   * @param index Index of player in array.
   * @param src Base64 string of image player uploaded.
   */
  onAvatarUpload(index: number, src: string): void {
    this.players[index].avatar = src;
    this.setPlayerSettings();
  }


  /**
   * Store the updated value of a player's name at the given index.
   * @param index Index of player in array.
   * @param change Updated value of the player's name.
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
    this.players = [{ id: 1, name: ''}];
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
   */
  getPlayerSettings(): IPlayer[] {
    const data = localStorage.getItem(this.storageName);
    return data ? JSON.parse(data) : [];
  }

}
