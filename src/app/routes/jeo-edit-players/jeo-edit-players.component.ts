import { Component } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';

@Component({
	selector: 'jeo-edit-players',
	templateUrl: './jeo-edit-players.component.html',
})
export class JeoEditPlayersComponent {
	/**
	 * @param {PlayerService} playerService - Player service.
	 */
	constructor(private readonly playerService: PlayerService) {}

	/** Set default values before starting game. */
	setDefaultValues(): void {
		this.playerService.setDefaultValues();
	}
}
