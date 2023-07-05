import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Player } from '../../models/player.type';

@Component({
	selector: 'jeo-winner-modal',
	templateUrl: './jeo-winner-modal.component.html',
})
export class JeoWinnerModalComponent implements OnInit {
	/**
	 * @param {MatDialogRef} dialogRef - Reference to modal opened.
	 * @param {Player[]} data - Object passed in when modal is opened.
	 */
	constructor(
		public dialogRef: MatDialogRef<JeoWinnerModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Player[]
	) {
		console.log(data);
	}

	ngOnInit(): void {}
}
