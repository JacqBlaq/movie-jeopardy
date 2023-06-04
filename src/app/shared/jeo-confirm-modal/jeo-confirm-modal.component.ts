import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonTheme } from '../jeo-button/jeo-button.component';
import { HeaderTheme } from '../jeo-header/jeo-header.component';

export interface IConfirmModalData {
  headerText: string;
  headerTheme: HeaderTheme
  message: string;
  btnTheme: ButtonTheme;
};

@Component({
  selector: 'jeo-confirm-modal',
  templateUrl: './jeo-confirm-modal.component.html'
})
export class JeoConfirmModalComponent {

  modalData!: IConfirmModalData;

  constructor(
    public dialogRef: MatDialogRef<JeoConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmModalData) {
    this.modalData = data;
  }

  onCloseModal(): void {
    this.dialogRef.close();
  }

}
