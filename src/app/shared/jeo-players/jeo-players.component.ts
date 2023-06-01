import { Component } from '@angular/core';
import { IPlayer, PlayersService } from 'src/app/services/players.service';

@Component({
  selector: 'jeo-players',
  templateUrl: './jeo-players.component.html'
})
export class JeoPlayersComponent {

  currentPlayerIndex!: number;

  constructor(private playersService: PlayersService) { }

  get players() {
    return this.playersService.getPlayers();
  }

  onAddPlayer(): void {
    this.playersService.onAddPlayer();
  }

  onRemovePlayer(id: number): void {
    this.playersService.onRemovePlayer(id);
  }

  onNameChange(index: number, change: string): void {
    this.playersService.onNameChange(index, change);
  }


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
