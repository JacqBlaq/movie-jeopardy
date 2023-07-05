import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { Player } from '../../models/player.type';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Route } from '../../models/route.enum';

@Component({
	selector: 'jeo-edit-players',
	templateUrl: './jeo-edit-players.component.html',
})
export class JeoEditPlayersComponent implements OnInit, OnDestroy {
	currentUrl?: string;
	routerEvent$?: Subscription;
	players: Player[] = [];

	route = {
		addPlayers: Route.addPlayers,
		editPlayers: Route.editPlayers,
		gameboard: Route.gameboard
	};

	unSubscribe$: Subject<any> = new Subject<any>();

	constructor(
		private readonly router: Router,
		private readonly playerService: PlayerService) {}

	ngOnInit(): void {
		this.currentUrl = this.router.url;
		this.getPlayers();
	}

	getPlayers(): void {
		switch(this.currentUrl) {
			case Route.addPlayers:
				this.playerService.players$
				.pipe(takeUntil(this.unSubscribe$))
				.subscribe((data: Player[]) => {
					this.players = data;
				});
				break;
			case Route.editPlayers:
				this.players = this.playerService.getStoredPlayers();
				break;
		}
	}

	/** Adds a new player. */
	onAddPlayer(): void {
		this.playerService.onAddPlayer();
		//const lastPlayer = this.players[this.players.length - 1];
	}

	/**
	 * Updates a player's name.
	 * @param change - Updated value for players name.
	 * @param id - Player's `id`.
	 */
	onNameChange(change: string, id: number): void {
		this.playerService.onNameChange(id, change);
	}

	/**
	 * Removes a previously added player.
	 * @param id - Unique player id.
	 */
	onRemovePlayer(id: number): void {
		this.playerService.onRemovePlayer(id);
	}

	/** Set default values before starting game. */
	setDefaultValues(): void {
		if (this.currentUrl === Route.addPlayers) {
			this.playerService.setDefaultValues();
		}
	}

	/**
	 *  Set player's avatar.
	 * @param avatarUrl - Base84 string.
	 * @param id - Player's id.
	 */
	onAvatarChange(avatarUrl: string, id: number): void {
		this.playerService.onAvatarUpload(id, avatarUrl);
	}

	/** @todo Reset players array before returning home.*/
	returnHome(): void {
		if (this.currentUrl == Route.addPlayers) {
			this.playerService.resetPlayers();
		}
	}

	trackByFn(index: number, item: Player): number {
		return index || item.id;
	}

	ngOnDestroy(): void {
		this.unSubscribe$.unsubscribe();
	}

}
