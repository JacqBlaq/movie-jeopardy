import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPlayerCard, Player } from 'src/app/models/player.type';


@Injectable({
	providedIn: 'root',
})
export class PlayerService {
	private readonly _STORAGE_NAME = 'players';
	private _numOfPlayers: number = 1;

	players: Player[] = [{ id: 1, name: '' }];

	private readonly _PLAYERS$ = new BehaviorSubject<Player[]>([{ id: 1, name: '' }]);
	private readonly _ACTIVE_PLAYER_ID$ = new BehaviorSubject<number>(1);

	/**
	 * @description
	 * Get the current players.
	 *
	 * @returns {Player[]} Players array.
	 */
	getPlayers(): Player[] | IPlayerCard[] {
		return this._PLAYERS$.value;
	}

	/**
	 * @returns {number} Number of players.
	 */
	getPlayerCount(): number {
		return this._numOfPlayers;
	}

	/**
	 * @description
	 * Get the 'id' of the player whose turn it is currently.
	 *
	 * @returns {number} Player's 'id'.
	 */
	getActivePlayerId(): number {
		return this._ACTIVE_PLAYER_ID$.value;
	}

	/**
	 * Gets the active player.
	 * @returns {Player | undefined} Active player.
	 */
	getActivePlayerById(): Player {
		const foundPlayer =
			this.getPlayerSettings().find(
				(player) => player.id === this.getActivePlayerId()
			) ?? this.getPlayerSettings()[0];

		return foundPlayer;
	}

	/** Sets the default values for every player. */
	setDefaultValues(): void {
		this.players.forEach((player, index) => {
			if (player.name?.trim().length === 0) {
				player.name = `Player ${index + 1}`;
			}

			player.score = 0;
		});

		this.setPlayerSettings();
	}

	/** Add a new player to the game only if the max limit of 5 hasnt been reached. */
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
	 * Remove a previously added player from game.
	 * @param {number} id - Player's `id`.
	 */
	onRemovePlayer(id: number): void {
		if (this.players.length === 1) return;

		this.players = this.players.filter((player) => player.id !== id);
		this.setPlayerSettings();
	}

	/**
	 * Updates a player's score.
	 *
	 * @param {number} id - Player's `id`.
	 * @param {number} points - Points added to or deducted from player's overall score.
	 */
	onPointsAwarded(id: number, points: number): void {
		const player = this.players.find(player => player.id === id);

		if (player) {
			player.score = (player.score || 0) + points;
		}

		this.setPlayerSettings();
	}

	/**
	 * Sets the next active player.
	 *
	 * @param {number} id Previous player's `id`.
	 */
	nextPlayersTurn(id: number): void {
		const index = this.players.findIndex(player => player.id == id);

		let nextPlayer = this.players[index + 1];

		if (nextPlayer == null) nextPlayer = this.players[0];

		this._ACTIVE_PLAYER_ID$.next(nextPlayer.id);
	}

	/**
	 * Stores the uploaded image as a player's avatar at the given `id`.
	 *
	 * @param {number} id - Player's `id`.
	 * @param {string} src - Base64 string of image player uploaded.
	 */
	onAvatarUpload(id: number, src: string): void {
		const player = this.players.find(player => player.id === id);

		if (src.trim().length > 0 && player) {
			player.avatar = src;
			this.setPlayerSettings();
		}
	}

	/**
	 * Stores the updated value of a player's name.
	 * @param {number} id - Player's `id`.
	 * @param {string} change - Updated value of the player's name.
	 */
	onNameChange(id: number, change: string): void {
		const player = this.players.find(player => player.id === id);

		if (change.trim().length > 0 && change.trim().length <= 20 && player) {
			player.name = change;
		}
	}

	/** Sets the score for every player to 0. */
	resetPlayerScores(): void {
		this.players.forEach((player) => {
			player.score = 0;
		});

		this.setPlayerSettings();
	}

	/** Empty players array and update player settings. */
	resetPlayers(): void {
		this.players = [{ id: 1, name: '' }];
		this.setPlayerSettings();
	}

	/** Stores players in localStorage. */
	private setPlayerSettings(): void {
		this._PLAYERS$.next(this.players);
		this._numOfPlayers = this.players.length;
		localStorage.setItem(this._STORAGE_NAME, JSON.stringify(this.getPlayers()));
	}

	/**
	 * Gets array of players from localStorage.
	 * @returns {Player[]} List of players.
	 */
	getPlayerSettings(): Player[] {
		const data = localStorage.getItem(this._STORAGE_NAME);
		this.players = data ? JSON.parse(data) as unknown as Player[] : [];
		this._numOfPlayers = this.players.length;

		return this.players;
	}
}
