import { Component } from '@angular/core';
import { GameboardService } from '../../services/gameboard.service';

@Component({
	selector: 'jeo-home-page',
	templateUrl: './jeo-home-page.component.html',
})
export class JeoHomePageComponent {
	gameRules: string[] = [];

	/**
	 * @param {PlayerService} playerService - Player service.
	 */
	constructor(private readonly gameboardService: GameboardService) {
		this.gameRules = this.gameboardService.rules;
	}
}
