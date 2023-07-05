import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from 'src/app/models/player.type';

type DailyDoubleData = {
	activePlayer: Player,
	categoryLabel: string
}

@Component({
	selector: 'jeo-daily-double-modal',
	templateUrl: './jeo-daily-double-modal.component.html',
})
export class JeoDailyDoubleModalComponent {
	modalData!: DailyDoubleData;
	wagerAmount: number = 5;
	maxWager: number = 1000;

	/**
	 * @param dialogRef - Dialog reference.
	 * @param data - Data passed into modal.
	 */
	constructor(
		public dialogRef: MatDialogRef<JeoDailyDoubleModalComponent>,
		@Inject(MAT_DIALOG_DATA) private readonly data: DailyDoubleData) {

		this.modalData = data;
		if ((this.modalData.activePlayer.score || 0) > 0)
			this.maxWager = this.modalData.activePlayer.score || 1000;
	}

	/** Set the wager amount as the max amount. */
	onTrueDailyDouble(): void {
		this.wagerAmount = this.maxWager;
	}

	/** Close Modal. */
	onCloseModal(): void {
		this.dialogRef.close({
			wagerAmount: this.wagerAmount
		});
	}
}
