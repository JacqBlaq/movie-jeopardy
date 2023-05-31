import { Component } from '@angular/core';

interface IPlayer {
  id: number;
  name: string;
  avatar?: string;
}

@Component({
  selector: 'jeo-add-player-card',
  templateUrl: './jeo-add-player-card.component.html'
})
export class JeoAddPlayerCardComponent {

  currentPlayerIndex!: number;

  players: IPlayer[] = [
    { id: 1, name: '' }
  ];

  constructor() { }

  onAddPlayer(): void {
    if (this.players.length === 5) { return; }

    const lastPlayer = this.players[this.players.length - 1]
    this.players.push({
      id: lastPlayer.id + 1,
      name: ''
    });
  }

  onRemovePlayer(id: number): void {
    this.players = this.players.filter(p => p.id !== id);
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
      this.players[this.currentPlayerIndex].avatar = reader.result;

    console.log(reader)
  }

}
