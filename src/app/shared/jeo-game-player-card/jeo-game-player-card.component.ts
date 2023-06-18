import { Component, Input } from '@angular/core';
import { Player } from 'src/app/models/player.type';

@Component({
	selector: 'jeo-game-player-card',
	templateUrl: './jeo-game-player-card.component.html',
})
export class JeoGamePlayerCardComponent {
	private _player!: Player;
	labelText: string = '';

	@Input() index: number = 0;
	@Input() activePlayerId: number = 1;
	@Input() direction: 'vertical' | 'horizontal' = 'vertical';

	/** Object containing player data. */
	@Input() get player(): Player {
		return this._player;
	}

	/**
	 * Updates player object whenever there's a change.
	 * @param {Player} value - Updated player object.
	 */
	set player(value: Player) {
		this._player = value;
	}
}
