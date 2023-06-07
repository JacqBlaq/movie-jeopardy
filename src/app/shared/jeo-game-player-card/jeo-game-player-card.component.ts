import { Component, Input } from '@angular/core';
import { IPlayer } from 'src/app/services/player/player.service';

@Component({
	selector: 'jeo-game-player-card',
	templateUrl: './jeo-game-player-card.component.html',
})
export class JeoGamePlayerCardComponent {
	private _player!: IPlayer;
	labelText: string = '';

	@Input() index: number = 0;
	@Input() activePlayerId: number = 1;
	@Input() direction: 'vertical' | 'horizontal' = 'vertical';

	/** Object containing player data. */
	@Input() get player(): IPlayer {
		return this._player;
	}

	/**
	 * @description
	 * Updates player object whenever there's a change.
	 *
	 * @param {IPlayer} value - Updated player object.
	 */
	set player(value: IPlayer) {
		this._player = value;
	}
}
