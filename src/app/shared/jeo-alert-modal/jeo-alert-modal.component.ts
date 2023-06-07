import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonTheme } from '../jeo-button/jeo-button.component';
import { HeaderTheme } from '../jeo-header/jeo-header.component';

export type AlertModalData = {
	headerText: string;
	headerTheme: HeaderTheme;
	message: string;
	btnTheme: ButtonTheme;
};

@Component({
	selector: 'jeo-confirm-modal',
	templateUrl: './jeo-alert-modal.component.html',
})
export class JeoAlertModalComponent {
	//Object that contains modal customization properties.
	modalData!: AlertModalData;

	/**
	 * @param {MatDialogRef} dialogRef - Reference to modal opened.
	 * @param {AlertModalData} data - Object passed in when modal is opened.
	 */
	constructor(
		public dialogRef: MatDialogRef<JeoAlertModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: AlertModalData
	) {
		this.modalData = data;
	}

	/**
	 * @description
	 * Closes the open modal.
	 */
	onCloseModal(): void {
		this.dialogRef.close();
	}
}
