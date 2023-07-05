import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from 'src/app/models/player.type';


@Injectable({
	providedIn: 'root',
})
export class PlayerService {
	private readonly _STORAGE_NAME = 'players';
	private readonly _PLAYERS$ = new BehaviorSubject<Player[]>([{ id: 1, name: '' }]);
	private readonly _ACTIVE_PLAYER_ID$ = new BehaviorSubject<number>(1);
	private _players: Player[] = [{ id: 1, name: '' }];

	players$ = this._PLAYERS$.asObservable();
	playerCount = this._players.length;

	/**
	 * Get the list of players.
	 * @returns Players array.
	 */
	private _getPlayers(): Player[] | Player[] {
		return this._PLAYERS$.value;
	}

	/**
	 * Get the `id` of the player whose turn it is currently.
	 * @returns Player's `id`.
	 */
	getActivePlayerId(): number {
		return this._ACTIVE_PLAYER_ID$.value;
	}

	/**
	 * Gets the active player.
	 * @returns Active player.
	 */
	getActivePlayerById(): Player {
		const foundPlayer =
			this.getStoredPlayers().find(
				(player) => player.id === this.getActivePlayerId()
			) ?? this.getStoredPlayers()[0];

		return foundPlayer;
	}

	/** Sets the default values for every player. */
	setDefaultValues(): void {
		this._players.forEach((player, index) => {
			if (player.name?.trim().length === 0) {
				player.name = `Player ${index + 1}`;
			}

			player.score = 0;
		});

		this.setPlayerSettings();
	}

	/** Add a new player to the game only if the max limit of 5 hasnt been reached. */
	onAddPlayer(): void {
		if (this._players.length === 5) return;

		const lastPlayer = this._players[this._players.length - 1];
		this._players.push({
			id: lastPlayer.id + 1,
			name: '',
		});

		this.setPlayerSettings();
	}

	/**
	 * Remove a previously added player from game.
	 * @param id - Player's `id`.
	 */
	onRemovePlayer(id: number): void {
		if (this._players.length === 1) return;

		this._players = this._players.filter((player) => player.id !== id);
		this.setPlayerSettings();
	}

	/**
	 * Updates a player's score.
	 * @param id - Player's `id`.
	 * @param points - Points added to or deducted from player's overall score.
	 */
	onPointsAwarded(id: number, points: number): void {
		const player = this._players.find(player => player.id === id);

		if (player) {
			player.score = (player.score || 0) + points;
		}

		this.setPlayerSettings();
	}

	/**
	 * Sets the next active player.
	 * @param id - Previous player's `id`.
	 */
	nextPlayersTurn(id: number): void {
		const index = this._players.findIndex(player => player.id == id);
		let nextPlayer = this._players[index + 1];

		if (nextPlayer == null) {
			nextPlayer = this._players[0];
		}

		this._ACTIVE_PLAYER_ID$.next(nextPlayer.id);
	}

	/**
	 * Stores the uploaded image as a player's avatar at the given `id`.
	 * @param id - Player's `id`.
	 * @param src - Base64 string of image player uploaded.
	 */
	onAvatarUpload(id: number, src: string): void {
		const player = this._players.find(player => player.id === id);

		if (src.trim().length > 0 && player) {
			player.avatar = src;
			this.setPlayerSettings();
		}
	}

	/**
	 * Stores the updated value of a player's name.
	 * @param id - Player's `id`.
	 * @param change - Updated value of the player's name.
	 */
	onNameChange(id: number, change: string): void {
		const player = this._players.find(player => player.id === id);

		if (change.trim().length > 0 && change.trim().length <= 20 && player) {
			player.name = change;
			this.setPlayerSettings();
		}
	}

	/** Sets the score for every player to 0. */
	resetPlayerScores(): void {
		this._players.forEach((player) => {
			player.score = 0;
		});

		this.setPlayerSettings();
	}

	/** Empty players array and update player settings. */
	resetPlayers(): void {
		this._players = [{ id: 1, name: '' }];
		this.setPlayerSettings();
	}

	/** Stores players in localStorage. */
	private setPlayerSettings(): void {
		this._PLAYERS$.next(this._players);
		localStorage.setItem(this._STORAGE_NAME, JSON.stringify(this._getPlayers()));
	}

	/** Gets list of players from localStorage. */
	getLocallyStoredPlayers(): void {
		const data = localStorage.getItem(this._STORAGE_NAME);
		this._players = data ? JSON.parse(data) as unknown as Player[] : [];
		this._PLAYERS$.next(this._players);
	}

	/**
	 * Gets list of players from localStorage to return.
	 * @returns List of players.
	 */
	getStoredPlayers(): Player[] {
		this.getLocallyStoredPlayers();

		return this._players;
	}
}
