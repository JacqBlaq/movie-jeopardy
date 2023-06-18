import { Component } from '@angular/core';
import { IPlayerCard } from 'src/app/models/player.type';
import { Theme } from 'src/app/models/theme.type';
import { PlayerService } from 'src/app/services/player/player.service';


@Component({
	selector: 'jeo-players',
	templateUrl: './jeo-add-players.component.html',
})
export class JeoAddPlayersComponent {
	private _nextPlayerTheme: Theme = 'secondary';

	/**
	 * @param {PlayerService} playerService - Service that handles player functions.
	 */
	constructor(private readonly playerService: PlayerService) {}

	/** Gets list of all players. */
	get players(): IPlayerCard[] {
		return this.playerService.getPlayers();
	}

	/** Adds a new player. */
	onAddPlayer(): void {
		this.playerService.onAddPlayer();

		const lastPlayer = this.players[this.players.length - 1];
		lastPlayer.theme = this._nextPlayerTheme;
		this.setNextTheme();
	}

	/** Sets the next theme. */
	private setNextTheme(): void {
		switch (this._nextPlayerTheme) {
			case 'primary':
				this._nextPlayerTheme = 'secondary';
				break;
			case 'secondary':
				this._nextPlayerTheme = 'tertiary';
				break;
			case 'tertiary':
				this._nextPlayerTheme = 'primary';
				break;
		}
	}

	/**
	 * Removes a previously added player.
	 * @param {number} id - Unique player id.
	 */
	onRemovePlayer(id: number): void {
		this.playerService.onRemovePlayer(id);
	}

	/**
	 * Updates a player's name.
	 * @param {number} id - Player's `id`.
	 * @param {string} change - Updated value for players name.
	 */
	onNameChange(id: number, change: string): void {
		this.playerService.onNameChange(id, change);
	}

	/**
	 * Uploads an image to be used as player's avatar.
	 * @param {number} id Player's `id`.
	 * @param {Event | any} event Upload event.
	 */
	onUploadAvatar(id: number, event: Event | any): void {
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
			this.playerService.onAvatarUpload(id, base64);
		};
	}
}
