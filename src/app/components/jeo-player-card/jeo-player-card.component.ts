import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Direction } from '../../models/direction.type';
import { Player } from '../../models/player.type';
import { BinarySize } from '../../models/size.type';
import { UtilsService as Utils } from '../../services/utils.service';

@Component({
	selector: 'jeo-player-card',
	templateUrl: './jeo-player-card.component.html',
})
export class JeoGamePlayerCardComponent implements OnChanges {
	avatarSize: BinarySize = 'medium';
	labelText: string = '';

	@Input() player!: Player;
	@Input() index: number = 0;
	@Input() activePlayerId: number = 1;
	@Input() direction: Direction = 'vertical';

	ngOnChanges(changes: SimpleChanges): void {
		const directionChange = changes['direction'];
		const playerChange = changes['player'];

		if (Utils.isValidChange(directionChange) && this.direction === 'horizontal') {
			this.direction = directionChange.currentValue;
			this.avatarSize = 'small';
		}

		if (Utils.isValidChange(playerChange)) {
			this.player = playerChange?.currentValue;
		}
	}
}
