import { Component } from '@angular/core';
import { PlayerService } from '../services/player/player.service';

@Component({
	selector: 'jeo-home-page',
	templateUrl: './jeo-home-page.component.html',
})
export class JeoHomePageComponent {

	/**
	 * @param {PlayerService} playerService - Player service.
	 */
	constructor(private readonly playerService: PlayerService) {}

	/** Set default values before starting game. */
	setDefaultValues(): void {
		this.playerService.setDefaultValues();
	}
}
