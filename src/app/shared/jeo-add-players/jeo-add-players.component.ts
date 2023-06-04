import { Component } from '@angular/core';
import { IPlayer, PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'jeo-players',
  templateUrl: './jeo-add-players.component.html'
})
export class JeoAddPlayersComponent {

  currentPlayerIndex!: number;

  constructor(private playersService: PlayersService) { }

  /**
   * Get list of players.
   */
  get players(): IPlayer[] {
    return this.playersService.getPlayers();
  }

  /**
   * Add a new player.
   */
  onAddPlayer(): void {
    this.playersService.onAddPlayer();
  }

  /**
   * Remove a previously added player using their id.
   * @param id Unique player id.
   */
  onRemovePlayer(id: number): void {
    this.playersService.onRemovePlayer(id);
  }

  /**
   * Update a players name.
   * @param index Player index in array.
   * @param change Updated value for players name.
   */
  onNameChange(index: number, change: string): void {
    this.playersService.onNameChange(index, change);
  }

/**
 * Uploads an image for a player's avatar.
 * @param index Player index in array.
 * @param e Event.
 */
  onUploadAvatar(index: number, e: any): void {
    this.currentPlayerIndex = index;
    const file: File = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    if (file) {
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  _handleReaderLoaded(e: any) {
    let reader = e.target;
    if (this.currentPlayerIndex > -1)
      this.playersService.onAvatarUpload(this.currentPlayerIndex, reader.result);
  }

}
