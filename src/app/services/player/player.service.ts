import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type IPlayer = {
	id: number;
	name: string;
	avatar?: string;
	score?: number;
};

export interface IActivePlayer extends IPlayer {
	index: number;
}

@Injectable({
	providedIn: 'root',
})
export class PlayerService {
	private readonly _storageName = 'players';

	players: IPlayer[] = [{ id: 1, name: '' }];

	private readonly _players$ = new BehaviorSubject<IPlayer[]>([{ id: 1, name: '' }]);
	private readonly _activePlayerId$ = new BehaviorSubject<number>(1);

	/**
	 * @description
	 * Get the current players.
	 *
	 * @returns {IPlayer[]} Players array.
	 */
	getPlayers(): IPlayer[] {
		return this._players$.value;
	}

	/**
	 * @description
	 * Get the 'id' of the player whose turn it is currently.
	 *
	 * @returns {number} Player's 'id'.
	 */
	getActivePlayerId(): number {
		return this._activePlayerId$.value;
	}

	/**
	 * @description
	 * Get the index of the player whose turn it is currently.
	 *
	 * @returns {number} Index of active player.
	 */
	private getActivePlayerIndex(): number {
		return this.getPlayerSettings().findIndex(
			(player) => player.id === this.getActivePlayerId()
		);
	}

	/**
	 * @description
	 * Get the active player.
	 *
	 * @returns {IActivePlayer | undefined} Active player object.
	 */
	getActivePlayerById(): IActivePlayer {
		const foundPlayer =
			this.getPlayerSettings().find(
				(player) => player.id === this.getActivePlayerId()
			) ?? this.getPlayerSettings()[0];

		const player: IActivePlayer = {
			...foundPlayer,
			index: this.getActivePlayerIndex(),
		};

		return player;
	}

	/**
	 * @description
	 * Set default values for all players.
	 */
	setDefaultValues(): void {
		this.players.forEach((player, index) => {
			if (player.name.trim().length === 0) {
				player.name = `Player ${index + 1}`;
			}

			player.score = 0;
		});
		this.setPlayerSettings();
	}

	/**
	 * @description
	 * Add a new player to the game only if the max limit of 5 hasnt been reached.
	 */
	onAddPlayer(): void {
		if (this.players.length === 5) return;

		const lastPlayer = this.players[this.players.length - 1];
		this.players.push({
			id: lastPlayer.id + 1,
			name: '',
		});

		this.setPlayerSettings();
	}

	/**
	 * @description
	 * Remove a previously added player from game.
	 *
	 * @param {number} playerId - Unique player id.
	 */
	onRemovePlayer(playerId: number): void {
		if (this.players.length === 1) return;

		this.players = this.players.filter((player) => player.id !== playerId);
		this.setPlayerSettings();
	}

	/**
	 * @description
	 * Update player's score when they get an answer correct.
	 *
	 * @param {number} playerIndex - Index of player
	 * @param {number} points - Points added to player's overall score.
	 */
	onPointsAwarded(playerIndex: number, points: number): void {
		const score = this.players[playerIndex].score ?? 0;
		this.players[playerIndex].score = score + points;

		this.setPlayerSettings();
	}

	/**
	 * @description
	 * Set the next active player.
	 *
	 * @param {number} index Previous player's index.
	 */
	nextPlayersTurn(index: number): void {
		let nextPlayer = this.players[index + 1];

		if (nextPlayer == null) nextPlayer = this.players[0];

		this._activePlayerId$.next(nextPlayer.id);
	}

	/**
	 * @description
	 * Store the uploaded image as a player's avatar at the given index.
	 *
	 * @param {number} index - Index of player in array.
	 * @param {string} src - Base64 string of image player uploaded.
	 */
	onAvatarUpload(index: number, src: string): void {
		if (src.trim().length > 0) {
			this.players[index].avatar = src;
			this.setPlayerSettings();
		}
	}

	/**
	 * @description
	 * Store the updated value of a player's name at the given index.
	 *
	 * @param {number} index - Index of player in array.
	 * @param {string} change - Updated value of the player's name.
	 */
	onNameChange(index: number, change: string): void {
		if (change.trim().length > 0 && change.trim().length <= 20) {
			this.players[index].name = change;
		}
	}

	/**
	 * @description
	 * Set the score for each player to 0.
	 */
	resetPlayerScores(): void {
		this.players.forEach((player) => {
			player.score = 0;
		});
		this.setPlayerSettings();
	}

	/**
	 * @description
	 * Empty players array and update player settings.
	 */
	onGameExit(): void {
		this.players = [{ id: 1, name: '' }];
		this.setPlayerSettings();
	}

	/**
	 * @description
	 * Store players in localStorage.
	 */
	private setPlayerSettings(): void {
		this._players$.next(this.players);
		localStorage.setItem(this._storageName, JSON.stringify(this.getPlayers()));
	}

	/**
	 * @description
	 * Get array of players from localStorage.
	 *
	 * @returns {IPlayer[]} List of players.
	 */
	getPlayerSettings(): IPlayer[] {
		const data = localStorage.getItem(this._storageName);
		return data ? JSON.parse(data) : [];
	}
}
