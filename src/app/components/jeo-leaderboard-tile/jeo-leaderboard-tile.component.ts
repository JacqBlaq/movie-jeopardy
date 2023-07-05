import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '../../models/player.type';

@Component({
  selector: 'jeo-leaderboard-tile',
  template: `
	<ng-content select="jeo-avatar[size='big']"></ng-content>
	<ng-content select="jeo-leaderboard-content"></ng-content>
	<ng-content select="[jeo-button]"></ng-content>
  `
})
export class JeoLeaderboardTileComponent {
	private _player!: Player;

	@Input() get player(): Player {
		return this._player;
	}

	set player(value: Player) {
		this._player = value;
	}

	@Input() placement?: string | number;
	@Input() avatarToolTip: string = '';

	@Output() avatarChange: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * Uploads an image to be used as player's avatar.
	 * @param event - Upload event.
	 */
	onUploadAvatar(event: Event | any): void {
		const pattern = /image-*/;
		const reader = new FileReader();
		const file: File = event.target?.files[0];

		if (!file.type.match(pattern)) {
			alert('invalid format');
			return;
		}

		reader.readAsDataURL(file);
		reader.onload = (): void => {
			const base64 = reader.result as string;
			this.avatarChange.emit(base64);
		};
	}

}
