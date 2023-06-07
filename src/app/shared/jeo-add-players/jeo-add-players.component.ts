import { Component } from '@angular/core';
import { IPlayer, PlayerService } from 'src/app/services/player/player.service';

@Component({
	selector: 'jeo-players',
	templateUrl: './jeo-add-players.component.html',
})
export class JeoAddPlayersComponent {
	private _currPlayerIndex!: number;

	/**
	 * @param {PlayerService} playerService - Service that handles player functions.
	 */
	constructor(private readonly playerService: PlayerService) {}

	/**
	 * @description
	 * Get list of all players.
	 */
	get players(): IPlayer[] {
		return this.playerService.getPlayers();
	}

	/**
	 * @description
	 * Add a new player.
	 */
	onAddPlayer(): void {
		this.playerService.onAddPlayer();
	}

	/**
	 * @description
	 * Remove a previously added player.
	 *
	 * @param {number} playerId - Unique player id.
	 */
	onRemovePlayer(playerId: number): void {
		this.playerService.onRemovePlayer(playerId);
	}

	/**
	 * @description
	 * Update a player's name.
	 *
	 * @param {number} index - Player index in array.
	 * @param {string} change - Updated value for players name.
	 */
	onNameChange(index: number, change: string): void {
		this.playerService.onNameChange(index, change);
	}

	/**
	 * @description
	 * Upload an image to be used as a player's avatar.
	 *
	 * @param {number} index Player index in array.
	 * @param {Event | any} event Upload event.
	 */
	onUploadAvatar(index: number, event: Event | any): void {
		this._currPlayerIndex = index;
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

			if (this._currPlayerIndex > -1)
				this.playerService.onAvatarUpload(this._currPlayerIndex, base64);
		};
	}
}
